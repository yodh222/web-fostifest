"use server";

import { db } from "~/server/db";
import { teams, user, payments } from "~/server/db/schema";
import { auth } from "~/server/better-auth/config";
import { headers } from "next/headers";
import { eq, count } from "drizzle-orm";
import { supabase } from "./supabase";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

/** Helper to generate random 6-character team code */
function generateTeamCode() {
  return "FST-" + crypto.randomBytes(3).toString("hex").toUpperCase();
}

/** Get session in server action */
async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}

// ----------------------------------------------------------------------
// TEAM LOGIC
// ----------------------------------------------------------------------

export async function createTeamAction(name: string, category: string) {
  const session = await getSession();
  if (!session?.user) throw new Error("Unauthorized");
  
  if (session.user.teamId) {
    throw new Error("Anda sudah tergabung dalam tim.");
  }

  const teamId = crypto.randomUUID();
  const teamCode = generateTeamCode();

  // Create team
  await db.insert(teams).values({
    id: teamId,
    name,
    teamCode,
    category,
    leaderId: session.user.id,
    institution: "Unknown", // Can be extended
  });

  // Update user teamId
  await db.update(user).set({ teamId }).where(eq(user.id, session.user.id));
  
  // Create pending payment for this team
  await db.insert(payments).values({
    id: crypto.randomUUID(),
    teamId,
    amount: category === "software_dev" ? 150000 : 120000, // Example logic
    proofUrl: "", // pending
    status: "pending",
  });

  revalidatePath("/dashboard");
  return { success: true, teamCode };
}

export async function joinTeamAction(teamCode: string) {
  const session = await getSession();
  if (!session?.user) throw new Error("Unauthorized");
  
  if (session.user.teamId) {
    throw new Error("Anda sudah tergabung dalam tim.");
  }

  // Find team
  const existingTeam = await db.query.teams.findFirst({
    where: eq(teams.teamCode, teamCode.trim().toUpperCase()),
  });

  if (!existingTeam) {
    throw new Error("Kode tim tidak valid atau tim tidak ditemukan.");
  }

  // Check member count (max 3)
  const members = await db.select({ count: count() }).from(user).where(eq(user.teamId, existingTeam.id));
  if ((members[0]?.count ?? 0) >= 3) {
    throw new Error("Tim ini sudah penuh (maksimal 3 anggota).");
  }

  // Update user teamId
  await db.update(user).set({ teamId: existingTeam.id }).where(eq(user.id, session.user.id));
  
  revalidatePath("/dashboard");
  return { success: true };
}

// ----------------------------------------------------------------------
// PARTICIPANT LOGIC
// ----------------------------------------------------------------------

export async function getParticipantDataAction() {
  const session = await getSession();
  if (!session?.user || !session.user.teamId) return null;

  const team = await db.query.teams.findFirst({
    where: eq(teams.id, session.user.teamId)
  });
  const payment = await db.query.payments.findFirst({
    where: eq(payments.teamId, session.user.teamId)
  });

  return { team, payment };
}

// ----------------------------------------------------------------------
// FILE UPLOAD LOGIC
// ----------------------------------------------------------------------

export async function uploadRequirementAction(formData: FormData) {
  const session = await getSession();
  if (!session?.user || !session.user.teamId) {
    throw new Error("Unauthorized or not in a team");
  }

  const file = formData.get("file") as File;
  const requirementType = formData.get("type") as "ktm" | "twibbon" | "ig";
  
  if (!file || !requirementType) throw new Error("Invalid form data");

  // Upload to Supabase Storage
  const ext = file.name.split('.').pop();
  const fileName = `${session.user.id}/${requirementType}-${Date.now()}.${ext}`;
  
  const arrayBuffer = await file.arrayBuffer();
  
  const { data, error } = await supabase.storage
    .from("fostifest-files")
    .upload(fileName, arrayBuffer, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type
    });

  if (error) {
    throw new Error("Gagal mengunggah berkas: " + error.message);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from("fostifest-files")
    .getPublicUrl(fileName);

  // Save URL to DB
  if (requirementType === "ktm") {
    await db.update(user).set({ ktmUrl: publicUrl }).where(eq(user.id, session.user.id));
  } else if (requirementType === "twibbon") {
    await db.update(user).set({ twibbonUrl: publicUrl }).where(eq(user.id, session.user.id));
  } else if (requirementType === "ig") {
    await db.update(user).set({ igUrl: publicUrl }).where(eq(user.id, session.user.id));
  }
  
  revalidatePath("/dashboard");
  return { success: true, url: publicUrl };
}

export async function uploadPaymentAction(formData: FormData) {
  const session = await getSession();
  if (!session?.user || !session.user.teamId) {
    throw new Error("Unauthorized or not in a team");
  }

  const file = formData.get("file") as File;
  if (!file) throw new Error("Invalid form data");

  const ext = file.name.split('.').pop();
  const fileName = `payments/${session.user.teamId}-${Date.now()}.${ext}`;
  
  const arrayBuffer = await file.arrayBuffer();

  const { data, error } = await supabase.storage
    .from("fostifest-files")
    .upload(fileName, arrayBuffer, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type
    });

  if (error) {
    throw new Error("Gagal mengunggah bukti pembayaran: " + error.message);
  }

  const { data: { publicUrl } } = supabase.storage
    .from("fostifest-files")
    .getPublicUrl(fileName);

  await db.update(payments).set({ 
    proofUrl: publicUrl,
    status: "pending" 
  }).where(eq(payments.teamId, session.user.teamId));
  
  revalidatePath("/dashboard");
  return { success: true, url: publicUrl };
}

// ----------------------------------------------------------------------
// ADMIN LOGIC
// ----------------------------------------------------------------------

export async function getAdminDataAction() {
  const session = await getSession();
  if (!session?.user || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  // Fetch all teams
  const allTeams = await db.query.teams.findMany();
  const allUsers = await db.query.user.findMany();
  const allPayments = await db.query.payments.findMany();

  // Combine them
  const formattedTeams = allTeams.map((t) => ({
    ...t,
    members: allUsers.filter((u) => u.teamId === t.id),
    payment: allPayments.find((p) => p.teamId === t.id),
  }));

  return {
    teams: formattedTeams,
    users: allUsers,
    payments: allPayments
  };
}

export async function verifyPaymentAction(teamId: string, status: "verified" | "rejected") {
  const session = await getSession();
  if (!session?.user || session.user.role !== "admin") throw new Error("Unauthorized");

  await db.update(payments).set({ 
    status,
    verifiedBy: session.user.id
  }).where(eq(payments.teamId, teamId));

  revalidatePath("/dashboard");
  return { success: true };
}

export async function verifyRequirementsAction(userId: string, status: "verified" | "rejected") {
  const session = await getSession();
  if (!session?.user || session.user.role !== "admin") throw new Error("Unauthorized");

  await db.update(user).set({ 
    requirementsStatus: status 
  }).where(eq(user.id, userId));

  revalidatePath("/dashboard");
  return { success: true };
}

export async function promoteToAdminAction(email: string) {
  const session = await getSession();
  if (!session?.user || session.user.role !== "admin") throw new Error("Unauthorized");

  const targetUser = await db.query.user.findFirst({
    where: eq(user.email, email.trim())
  });

  if (!targetUser) throw new Error(`Pengguna dengan email ${email} tidak ditemukan.`);
  if (targetUser.role === "admin") throw new Error("Pengguna ini sudah menjadi panitia.");

  await db.update(user).set({ role: "admin" }).where(eq(user.email, email.trim()));
  revalidatePath("/dashboard");
  return { success: true };
}
