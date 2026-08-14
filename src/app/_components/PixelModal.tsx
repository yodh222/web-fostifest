"use client";

import React, { useEffect, useState } from "react";

interface PixelModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  type?: "info" | "error" | "success" | "confirm";
  onClose: () => void;
  onConfirm?: () => void;
}

export function PixelModal({ isOpen, title, message, type = "info", onClose, onConfirm }: PixelModalProps) {
  const [render, setRender] = useState(isOpen);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRender(true);
      // Let React render it first, then trigger animation frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    } else {
      setAnimate(false);
      const timer = setTimeout(() => setRender(false), 200); // match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!render) return null;

  // Determine colors based on type
  let borderColor = "border-[#3c2a1c]";
  let headerColor = "bg-[#3c2a1c]";
  let icon = "💬";

  if (type === "error") {
    borderColor = "border-red-900";
    headerColor = "bg-red-900";
    icon = "☠️";
  } else if (type === "success") {
    borderColor = "border-green-800";
    headerColor = "bg-green-800";
    icon = "🏆";
  }

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${animate ? "opacity-100" : "opacity-0"}`}>
      <div 
        className={`pixel-card-stone relative w-11/12 max-w-md shadow-2xl transition-transform duration-200 ${borderColor} border-4 p-0 ${animate ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
        style={{ boxShadow: "8px 8px 0px rgba(0,0,0,0.5)" }}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-4 py-2 ${headerColor} border-b-4 ${borderColor}`}>
          <div className="font-pixel text-sm text-white flex gap-2 items-center text-shadow-pixel-sm">
            <span>{icon}</span>
            <span>{title || (type === "error" ? "ERROR" : type === "success" ? "SUKSES" : "INFO")}</span>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-red-400 font-pixel text-sm focus:outline-none"
          >
            X
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-[#767676] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] text-white">
          <div className="font-vt323 text-2xl text-shadow-pixel-sm leading-relaxed mb-6 text-center">
            {message}
          </div>
          
          <div className="flex justify-center gap-4">
            {type === "confirm" && onConfirm ? (
              <>
                <button 
                  onClick={() => { onConfirm(); onClose(); }}
                  className="font-pixel px-6 py-2 text-sm text-white border-b-4 border-r-4 border-l-2 border-t-2 active:translate-y-1 active:border-b-2 bg-green-600 border-green-900 hover:bg-green-500"
                >
                  [ Y A ]
                </button>
                <button 
                  onClick={onClose}
                  className="font-pixel px-6 py-2 text-sm text-white border-b-4 border-r-4 border-l-2 border-t-2 active:translate-y-1 active:border-b-2 bg-red-600 border-red-900 hover:bg-red-500"
                >
                  [ BATAL ]
                </button>
              </>
            ) : (
              <button 
                onClick={() => { if (onConfirm) onConfirm(); onClose(); }}
                className={`font-pixel px-6 py-2 text-sm text-white border-b-4 border-r-4 border-l-2 border-t-2 active:translate-y-1 active:border-b-2 ${
                  type === "error" 
                    ? "bg-red-600 border-red-900 hover:bg-red-500" 
                    : type === "success"
                    ? "bg-green-600 border-green-900 hover:bg-green-500"
                    : "bg-blue-600 border-blue-900 hover:bg-blue-500"
                }`}
              >
                [ O K ]
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
