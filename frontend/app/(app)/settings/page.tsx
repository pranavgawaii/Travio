"use client";

import React from "react";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { Bell, CreditCard, Moon, Palette, Shield, User, Globe, Settings } from "lucide-react";
import { Button } from "@frontend/ui/ui/button";
import { THUMBNAIL_IMAGE_SIZES, normalizeRemoteImage } from "@shared/media";
import { cn } from "@shared/utils";

const SETTING_NAV = [
    { id: "account", label: "Account", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "billing", label: "Billing", icon: CreditCard },
];

export default function SettingsPage() {
    const { user } = useUser();
    const [activeTab, setActiveTab] = React.useState("account");

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-inter text-slate-900 pb-20 relative">
            {/* STITCH PATTERN BG */}
            <div className="fixed inset-0 pointer-events-none z-0" style={{
                backgroundImage: "radial-gradient(#E4E4E7 1px, transparent 1px)",
                backgroundSize: "24px 24px"
            }} />

            {/* Header */}
            <header className="sticky top-0 z-30 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 leading-none">Management</p>
                        <h1 className="text-[17px] font-semibold tracking-tight text-slate-900 mt-0.5 leading-none">Settings</h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="pl-2 flex items-center">
                        <UserButton appearance={{ elements: { avatarBox: "h-8 w-8 ring-1 ring-slate-200 shadow-sm" } }} />
                    </div>
                </div>
            </header>

            <main className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 py-10 w-full">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>Settings</h1>
                    <p className="text-sm text-slate-500">Manage your account preferences and configurations.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-10">
                    {/* Settings Sidebar Tab */}
                    <div className="w-full md:w-64 shrink-0">
                        <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar">
                            {SETTING_NAV.map((item) => {
                                const isActive = activeTab === item.id;
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shrink-0",
                                            isActive
                                                ? "bg-white text-[#2563eb] shadow-sm ring-1 ring-slate-200"
                                                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                                        )}
                                    >
                                        <Icon className={cn("h-4 w-4", isActive ? "text-[#2563eb]" : "text-slate-400")} />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Settings Content Area */}
                    <div className="flex-1">
                        {activeTab === "account" && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                    <div className="p-6 border-b border-slate-200">
                                        <h3 className="text-base font-bold text-slate-900 mb-1">Profile Details</h3>
                                        <p className="text-sm text-slate-500">View and update your personal information.</p>
                                    </div>
                                    <div className="p-6 flex items-start gap-6 bg-slate-50/50">
                                        <div className="h-16 w-16 bg-slate-200 rounded-full border border-slate-300 flex items-center justify-center overflow-hidden shrink-0">
                                            {user?.imageUrl ? (
                                                <div className="relative h-full w-full">
                                                    <Image
                                                        src={normalizeRemoteImage(user.imageUrl, 160, 70)}
                                                        alt="Profile"
                                                        fill
                                                        sizes={THUMBNAIL_IMAGE_SIZES}
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <User className="h-8 w-8 text-slate-400" />
                                            )}
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400 block mb-1">Display Name</label>
                                                <input type="text" disabled value={user?.fullName || user?.firstName || "Travio User"} className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 outline-none cursor-not-allowed opacity-80" />
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400 block mb-1">Email Address</label>
                                                <input type="email" disabled value={user?.primaryEmailAddress?.emailAddress || "user@example.com"} className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-500 outline-none cursor-not-allowed" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white border-t border-slate-200 flex justify-end">
                                        <Button className="bg-[#2563eb] hover:bg-blue-600 text-white font-semibold rounded-xl h-9 px-6 text-xs transition-colors">
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                    <div className="p-6 border-b border-slate-200">
                                        <h3 className="text-base font-bold text-slate-900 mb-1">Connected Accounts</h3>
                                        <p className="text-sm text-slate-500">Manage your connected Single Sign-On integrations.</p>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between py-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                                    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 15.01 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm text-slate-800">Google</p>
                                                    <p className="text-xs text-slate-500">Connected</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" className="text-xs font-semibold h-8 rounded-lg border-slate-200">Disconnect</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "appearance" && (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-slate-200">
                                    <h3 className="text-base font-bold text-slate-900 mb-1">Theme Preferences</h3>
                                    <p className="text-sm text-slate-500">Customize the look and feel of your experience.</p>
                                </div>
                                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="border-2 border-[#3b82f6] rounded-xl p-4 cursor-pointer bg-blue-50/20 flex flex-col items-center gap-3">
                                        <div className="h-16 w-full rounded-lg bg-[#FAFAFA] border border-slate-200 shadow-sm overflow-hidden flex">
                                            <div className="w-1/4 h-full border-r border-slate-200 bg-white"></div>
                                            <div className="w-3/4 h-full opacity-50 bg-gradient-to-b from-white to-slate-50"></div>
                                        </div>
                                        <p className="text-sm font-semibold text-slate-800">Light Mode (Active)</p>
                                    </div>
                                    <div className="border border-slate-200 rounded-xl p-4 cursor-pointer hover:border-slate-300 transition-colors flex flex-col items-center gap-3 opacity-60">
                                        <div className="h-16 w-full rounded-lg bg-slate-900 border border-slate-800 overflow-hidden flex">
                                            <div className="w-1/4 h-full border-r border-slate-800 bg-slate-950"></div>
                                            <div className="w-3/4 h-full bg-slate-900"></div>
                                        </div>
                                        <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5"><Moon className="w-3.5 h-3.5" /> Dark Mode (Coming Soon)</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "billing" && (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white">
                                    <div className="flex items-center gap-2 mb-2 text-[#2563eb]">
                                        <Globe className="h-5 w-5" />
                                        <h3 className="text-base font-bold">Travio Premium</h3>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-4">You are currently on the Free Trial. Unlock limitless travel planning for you and your friends.</p>
                                    <Button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl h-9 px-6 text-xs transition-colors">
                                        Upgrade to Premium
                                    </Button>
                                </div>
                            </div>
                        )}

                        {["notifications", "privacy"].includes(activeTab) && (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm border-dashed p-10 flex flex-col items-center justify-center text-center group cursor-default">
                                <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-500">
                                    <Settings className="w-5 h-5 text-slate-400" />
                                </div>
                                <h3 className="text-sm font-bold text-slate-800 mb-1">Configuration Coming Soon</h3>
                                <p className="text-xs text-slate-500 max-w-sm">We are currently fine-tuning these settings for an optimal user experience. Premium features unlocking shortly.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
