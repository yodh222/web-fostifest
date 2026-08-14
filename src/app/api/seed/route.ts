import { NextResponse } from "next/server";
import { auth } from "~/server/better-auth/config";

export async function GET() {
  try {
    const admin = await auth.api.signUpEmail({
      body: {
        email: "panitia.fosti_secret_x99@fostiums.org",
        password: "FostiAdmin_X99_#2026",
        name: "Supreme Admin",
        role: "admin",
        isWorkshopParticipant: false,
        requirementsStatus: "verified"
      },
    });

    const user = await auth.api.signUpEmail({
      body: {
        email: "dummy_team_xyz88@tester.com",
        password: "TestAccount_88_!",
        name: "Tim Alpha Tester X",
        role: "participant",
        isWorkshopParticipant: false,
        requirementsStatus: "pending"
      },
    });

    return NextResponse.json({ 
      success: true, 
      message: "Seed berhasil! Akun dummy telah dibuat di database.",
      accounts: {
        admin: admin.user?.email,
        participant: user.user?.email
      }
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: error.message || "Gagal melakukan seed atau akun sudah ada." 
    }, { status: 500 });
  }
}
