"use client";

import React from "react";
import { Sidebar } from "@frontend/ui/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc]">
            {/* Persistent Sidebar */}
            <Sidebar />

            {/* Main scrollable content area */}
            <main className="flex-1 overflow-y-auto min-w-0">
                {children}
            </main>
        </div>
    );
}
