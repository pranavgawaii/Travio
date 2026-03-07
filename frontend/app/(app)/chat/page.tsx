"use client";

import React from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { MessageSquare, Bell, Search, Plus, Send, Phone, Video, Info, MoreVertical, Paperclip, Smile, Image as ImageIcon } from "lucide-react";
import { Badge } from "@frontend/ui/ui/badge";
import { Button } from "@frontend/ui/ui/button";
import { Input } from "@frontend/ui/ui/input";

export default function ChatPage() {
    const { user } = useUser();

    return (
        <div className="flex flex-col h-screen font-inter text-slate-900 overflow-hidden">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-30 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-[#E5E7EB] h-[72px] flex items-center justify-between px-8" style={{ left: 'var(--sidebar-width, 260px)' }}>
                <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <Link href="/dashboard" className="hover:text-slate-900 transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-[#1A1A1A] font-medium">Chat</span>
                </div>

                <div className="flex items-center gap-4">
                    <button className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#1A1A1A] relative shadow-sm">
                        <Bell className="w-[16px] h-[16px]" />
                    </button>
                    <div className="flex items-center border-l border-[#E5E7EB] pl-4 h-6">
                        <UserButton appearance={{ elements: { avatarBox: "h-8 w-8 ring-1 ring-slate-200 shadow-sm" } }} />
                    </div>
                </div>
            </header>

            <main className="flex-1 mt-[72px] flex relative overflow-hidden">
                {/* COMING SOON OVERLAY */}
                <div className="absolute inset-0 bg-[#FAFAFA]/60 backdrop-blur-[4px] z-20 flex items-center justify-center pointer-events-none">
                    <div className="bg-white shadow-2xl border border-[#E5E7EB] px-10 py-8 rounded-3xl flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-700 pointer-events-auto max-w-sm text-center">
                        <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-2 rotate-3">
                            <MessageSquare className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2 tracking-tight" style={{ fontFamily: "'Quicksand', sans-serif" }}>Real-time Chat</h2>
                            <p className="text-[#6B7280] text-sm font-medium leading-relaxed">
                                Connect with your travel buddies instantly. We're putting the finishing touches on our messaging engine.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 w-full mt-2">
                            <Button asChild className="bg-[#1A1A1A] hover:bg-black text-white rounded-xl px-6 py-2.5 h-auto font-semibold shadow-lg">
                                <Link href="/dashboard">Back to Dashboard</Link>
                            </Button>
                            <span className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-[0.2em] mt-2">Arriving Q2 2026</span>
                        </div>
                    </div>
                </div>

                {/* SIDEBAR MOCKUP */}
                <div className="w-80 border-r border-[#E5E7EB] bg-white hidden lg:flex flex-col filter blur-[2px] opacity-40 select-none">
                    <div className="p-5 border-b border-[#E5E7EB]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                            <Input className="pl-9 bg-[#F9FAFB] border-none rounded-xl" placeholder="Search chats..." readOnly />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {[
                            { name: "Manali Adventure", msg: "Alex: Should we book the paragliding?", time: "2m", active: true },
                            { name: "Goa March 2026", msg: "Sarah: Just shared the resort link!", time: "1h" },
                            { name: "Sarah Miller", msg: "Are you ready for the trip?", time: "Yesterday" },
                        ].map((chat, i) => (
                            <div key={i} className={`p-3 rounded-xl flex items-center gap-3 ${chat.active ? 'bg-blue-50' : 'hover:bg-slate-50'}`}>
                                <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h4 className="text-sm font-bold truncate">{chat.name}</h4>
                                        <span className="text-[10px] text-[#9CA3AF]">{chat.time}</span>
                                    </div>
                                    <p className="text-xs text-[#6B7280] truncate">{chat.msg}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CHAT AREA MOCKUP */}
                <div className="flex-1 flex flex-col bg-white filter blur-[1px] opacity-40 select-none">
                    <div className="h-16 border-b border-[#E5E7EB] px-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">MA</div>
                            <div>
                                <h3 className="text-sm font-bold">Manali Adventure</h3>
                                <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">4 online</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost" className="rounded-full h-9 w-9 text-[#6B7280]"><Phone className="h-4 w-4" /></Button>
                            <Button size="icon" variant="ghost" className="rounded-full h-9 w-9 text-[#6B7280]"><Video className="h-4 w-4" /></Button>
                            <Button size="icon" variant="ghost" className="rounded-full h-9 w-9 text-[#6B7280]"><Info className="h-4 w-4" /></Button>
                        </div>
                    </div>
                    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                        <div className="flex justify-center"><Badge variant="outline" className="text-[10px] text-[#9CA3AF]">Today</Badge></div>
                        <div className="flex items-start gap-3 max-w-md">
                            <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
                            <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none">
                                <p className="text-sm">Hey everyone! Is the itinerary finalized?</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 max-w-md ml-auto flex-row-reverse">
                            <div className="w-8 h-8 rounded-full bg-[#0066FF] shrink-0" />
                            <div className="bg-[#0066FF] text-white p-3 rounded-2xl rounded-tr-none shadow-sm">
                                <p className="text-sm">Almost there! Just waiting for Sarah.</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border-t border-[#E5E7EB]">
                        <div className="flex items-center gap-2 bg-[#F9FAFB] p-2 rounded-2xl">
                            <Button size="icon" variant="ghost" className="rounded-xl text-[#9CA3AF]"><Plus className="h-5 w-5" /></Button>
                            <Input className="bg-transparent border-none focus-visible:ring-0 text-sm" placeholder="Type a message..." readOnly />
                            <div className="flex items-center gap-1 pr-1">
                                <Button size="icon" variant="ghost" className="rounded-xl text-[#9CA3AF] hidden sm:flex"><ImageIcon className="h-5 w-5" /></Button>
                                <Button size="icon" variant="ghost" className="rounded-xl text-[#9CA3AF] hidden sm:flex"><Paperclip className="h-5 w-5" /></Button>
                                <Button size="icon" variant="ghost" className="rounded-xl text-[#9CA3AF]"><Smile className="h-5 w-5" /></Button>
                                <Button size="icon" className="bg-[#0066FF] hover:bg-[#0066FF]/90 text-white rounded-xl h-9 w-9 shadow-md"><Send className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
