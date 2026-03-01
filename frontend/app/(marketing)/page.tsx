import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { CirclePlus, MapPinned, PlaneTakeoff, UtensilsCrossed, UserPlus, Waves } from 'lucide-react';
import { AvatarGroup } from '@frontend/ui/ui/avatar-group';
import ExploreDemoButton from '@frontend/ui/explore-demo-button';
import { PhotoGallery } from '@frontend/ui/ui/gallery';
import { getLocalBlurDataURL, getLocalMediaSrc, HERO_IMAGE_SIZES, normalizeRemoteImage } from '@shared/media';


export default async function Home() {
    const { userId } = await auth();
    if (userId) {
        redirect('/dashboard');
    }

    const heroImage = getLocalMediaSrc('marketingHero', 1200) ?? '/hero-section.png';
    const heroBlur = getLocalBlurDataURL('marketingHero');
    const footerBackdrop = normalizeRemoteImage('https://images.unsplash.com/photo-1522205408450-add114ad53fe?auto=format&fit=crop&w=2000&q=80', 1200, 60);

    return (
        <main className="flex flex-col items-center bg-background-light selection:bg-primary/20 font-body w-full">
            <section className="relative pt-0 pb-4 md:pb-6 w-full px-2 md:px-4 lg:px-6 xl:px-8 max-w-[1800px] mx-auto" id="home">
                <div className="w-full mx-auto relative rounded-3xl lg:rounded-[2.5rem] overflow-hidden min-h-[600px] md:min-h-[700px] lg:h-[95vh] lg:min-h-[800px] max-h-[1200px] flex flex-col items-center justify-start text-center group border border-white/5">
                    <Image
                        alt="Adventure awaits with Travio"
                        className="absolute inset-0 h-full w-full object-cover object-[center_20%] transition-transform duration-[40s] group-hover:scale-105"
                        src="/hero-section.png"
                        fill
                        priority
                        sizes={HERO_IMAGE_SIZES}
                    />
                    <div className="absolute inset-0 bg-black/5" />
                    <div className="relative z-10 w-full h-full max-w-6xl mx-auto flex flex-col items-center pt-8 md:pt-12 pb-6 md:pb-8 px-4">
                        <div className="flex flex-col items-center w-full mt-2 lg:mt-8">
                            <div className="flex justify-center items-center gap-3 mb-6 animate-fade-in-up">
                                <div className="text-xs md:text-sm font-[600] text-gray-200 tracking-wider flex items-center gap-2 opacity-90 drop-shadow-sm">
                                    <div className="w-5 h-[1px] bg-gray-200" />
                                    <span>It&apos;s time to go 🚀</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-3 mb-8">
                                <div className="flex items-center py-0.5">
                                    <AvatarGroup
                                        avatars={[
                                            { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
                                            { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
                                            { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80" },
                                            { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" }
                                        ]}
                                        maxVisible={4}
                                        size={36}
                                        overlap={12}
                                    />
                                </div>
                                <span className="text-sm md:text-base font-[500] text-gray-100 drop-shadow-sm ml-2 border-l border-white/30 pl-4">+100 travel groups trusted us</span>

                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white leading-[1.1] tracking-tight text-center" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                Your next trip deserves<br />better than a <span style={{ color: '#25D366' }}>WhatsApp</span> group.
                            </h1>
                        </div>

                        <div className="w-full max-w-5xl mx-auto flex-grow flex flex-col justify-center items-center mt-2 lg:mt-6 pb-8 z-20">
                            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                                <Link href="/sign-up" className="h-14 flex items-center justify-center rounded-full bg-primary px-8 text-lg font-bold text-white hover:bg-blue-600 transition-all shadow-glow hover:-translate-y-0.5">
                                    Start Planning Free
                                </Link>
                                <ExploreDemoButton />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* 1. SOCIAL PROOF */}
            <section className="pt-20 pb-12 border-b border-slate-100 bg-white/50 backdrop-blur-sm z-20 relative -mt-4">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col items-center justify-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10 text-center" style={{ fontFamily: "'Quicksand', sans-serif" }}>Trusted by travel groups worldwide</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Abstract logos for social proof */}
                        <div className="h-8 flex items-center gap-2 font-bold text-slate-800 text-xl"><div className="w-8 h-8 rounded bg-slate-800" /> ACME</div>
                        <div className="h-8 flex items-center gap-2 font-bold text-slate-800 text-xl"><div className="w-8 h-8 rounded-full border-4 border-slate-800" /> GlobalNet</div>
                        <div className="h-8 flex items-center gap-2 font-bold text-slate-800 text-xl"><div className="w-8 h-8 rotate-45 bg-slate-800" /> Apex</div>
                        <div className="h-8 flex items-center gap-2 font-bold text-slate-800 text-xl"><div className="w-8 h-8 rounded-tl-xl rounded-br-xl bg-slate-800" /> Zenith</div>
                    </div>
                </div>
            </section>

            {/* 2. PROBLEM -> SOLUTION */}
            <section className="py-32 bg-white relative">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="bg-slate-50 border border-slate-200/60 rounded-[2rem] p-8 md:p-10 shadow-sm flex flex-col gap-4 relative overflow-hidden">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 rounded-full text-[10.5px] font-bold text-red-600 uppercase tracking-widest mb-4 w-max">
                                Without Travio
                            </div>
                            <h3 className="text-2xl md:text-3xl text-slate-800 mb-4" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>The endless chat scroll</h3>

                            {/* Mock WhatsApp bubbles */}
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm w-[85%] self-end relative">
                                <div className="absolute -right-2 top-4 w-4 h-4 bg-white border-t border-r border-slate-100 rotate-45"></div>
                                <p className="text-sm text-slate-600">Wait, which Airbnb did we finally agree on? Can someone resend the link?</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm w-[85%] self-start relative">
                                <div className="absolute -left-2 top-4 w-4 h-4 bg-blue-50 border-b border-l border-blue-100 rotate-45"></div>
                                <p className="text-sm text-slate-600">I think scroll up like 200 messages... it might be the second one?</p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm w-[85%] self-end relative">
                                <div className="absolute -right-2 top-4 w-4 h-4 bg-white border-t border-r border-slate-100 rotate-45"></div>
                                <p className="text-sm text-slate-600">Also who paid for dinner last night? I need to Venmo.</p>
                            </div>
                        </div>

                        <div className="px-4 lg:px-0">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full text-[10.5px] font-bold text-blue-600 uppercase tracking-widest mb-6">
                                With Travio
                            </div>
                            <h2 className="text-4xl md:text-5xl text-slate-800 mb-6 tracking-tight leading-[1.1]" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                A single source of truth for your entire trip.
                            </h2>
                            <p className="text-slate-500 text-lg leading-relaxed mb-10 w-11/12 font-medium">
                                Stop losing important links in group chats. Bring your itinerary, expenses, and discussions into one beautifully organized workspace that everyone can access and edit.
                            </p>
                            <ul className="space-y-5">
                                <li className="flex items-center gap-4 text-slate-700 font-bold text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold shadow-sm">✓</div>
                                    Centralized drag & drop itinerary
                                </li>
                                <li className="flex items-center gap-4 text-slate-700 font-bold text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold shadow-sm">✓</div>
                                    Automated expense splitting
                                </li>
                                <li className="flex items-center gap-4 text-slate-700 font-bold text-lg" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold shadow-sm">✓</div>
                                    Real-time live collaboration
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. KEY FEATURES GRID */}
            <section className="py-32 bg-[#FAF9F6] border-y border-slate-100 relative" id="features">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                    <div className="text-center mb-20 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 rounded-full text-[10.5px] font-bold text-orange-600 uppercase tracking-widest mb-6 border border-orange-100">
                            Features
                        </div>
                        <h2 className="text-4xl md:text-[3rem] text-slate-800 mb-6 tracking-tight leading-[1.1]" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                            Everything you need to travel smarter
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed font-medium">
                            Replace scattered spreadsheets and endless chat threads with powerful, purpose-built travel tools.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100/50 flex items-center justify-center mb-8 text-blue-500 shadow-sm">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            </div>
                            <h3 className="text-xl text-slate-800 mb-4" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>Collaborative Itinerary</h3>
                            <p className="text-slate-500 text-base leading-relaxed font-medium">
                                Drag and drop activities, sync time zones, and build your perfect schedule together in real-time.
                            </p>
                        </div>
                        {/* Feature 2 */}
                        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center mb-8 text-emerald-500 shadow-sm">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                            </div>
                            <h3 className="text-xl text-slate-800 mb-4" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>Expense Tracking</h3>
                            <p className="text-slate-500 text-base leading-relaxed font-medium">
                                Split bills instantly. Log expenses in any currency and see exactly who owes what at the end of the trip.
                            </p>
                        </div>
                        {/* Feature 3 */}
                        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                            <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100/50 flex items-center justify-center mb-8 text-orange-500 shadow-sm">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </div>
                            <h3 className="text-xl text-slate-800 mb-4" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>File Attachments</h3>
                            <p className="text-slate-500 text-base leading-relaxed font-medium">
                                Centralize tickets and bookings. Upload PDFs directly to specific itinerary items for easy access.
                            </p>
                        </div>
                        {/* Feature 4 */}
                        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                            <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100/50 flex items-center justify-center mb-8 text-purple-600 shadow-sm">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                            </div>
                            <h3 className="text-xl text-slate-800 mb-4" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>Invite via Link</h3>
                            <p className="text-slate-500 text-base leading-relaxed font-medium">
                                No sign-up friction. Send a magic link to your WhatsApp group and get everyone on board instantly.
                            </p>
                        </div>
                        {/* Feature 5 */}
                        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                            <div className="w-14 h-14 rounded-2xl bg-pink-50 border border-pink-100/50 flex items-center justify-center mb-8 text-pink-500 shadow-sm">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                            </div>
                            <h3 className="text-xl text-slate-800 mb-4" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>Smart Checklists</h3>
                            <p className="text-slate-500 text-base leading-relaxed font-medium">
                                Pre-made packing lists and to-do items. Assign tasks to specific people so nothing gets left behind.
                            </p>
                        </div>
                        {/* Feature 6 */}
                        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-start transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100/50 flex items-center justify-center mb-8 text-indigo-500 shadow-sm">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            </div>
                            <h3 className="text-xl text-slate-800 mb-4" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>Role-Based Access</h3>
                            <p className="text-slate-500 text-base leading-relaxed font-medium">
                                Assign roles like &apos;Admin&apos;, &apos;Editor&apos;, or &apos;Viewer&apos;. Keep the itinerary safe while letting everyone contribute.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. HOW IT WORKS */}
            <section className="py-32 bg-white relative" id="how-it-works">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 rounded-full text-[10.5px] font-bold text-blue-600 uppercase tracking-widest mb-6 border border-blue-100">
                            Workflow
                        </div>
                        <h2 className="text-4xl md:text-[3rem] text-slate-800 tracking-tight leading-[1.1]" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                            Three steps to takeoff
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative max-w-5xl mx-auto">
                        <div className="hidden md:block absolute top-[48px] left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-blue-50 via-blue-200 to-blue-50 z-0"></div>

                        <div className="relative z-10 flex flex-col justify-start items-center text-center group">
                            <div className="w-24 h-24 bg-white border border-slate-100 shadow-xl rounded-[2rem] flex items-center justify-center mb-8 relative transition-transform duration-500 group-hover:-translate-y-2">
                                <div className="absolute inset-0 bg-blue-500/5 rounded-[2rem]" />
                                <CirclePlus className="h-10 w-10 text-blue-600" />
                            </div>
                            <h3 className="text-2xl text-slate-800 mb-3" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>1. Create Trip</h3>
                            <p className="text-slate-500 text-lg leading-relaxed px-4 font-medium">Set your dates and destination instantly.</p>
                        </div>

                        <div className="relative z-10 flex flex-col justify-start items-center text-center mt-12 md:mt-0 group">
                            <div className="w-24 h-24 bg-white border border-slate-100 shadow-xl rounded-[2rem] flex items-center justify-center mb-8 relative transition-transform duration-500 group-hover:-translate-y-2">
                                <div className="absolute inset-0 bg-orange-500/5 rounded-[2rem]" />
                                <UserPlus className="h-10 w-10 text-orange-500" />
                            </div>
                            <h3 className="text-2xl text-slate-800 mb-3" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>2. Share Link</h3>
                            <p className="text-slate-500 text-lg leading-relaxed px-4 font-medium">No sign-ups required for guests to view.</p>
                        </div>

                        <div className="relative z-10 flex flex-col justify-start items-center text-center mt-12 md:mt-0 group">
                            <div className="w-24 h-24 bg-white border border-slate-100 shadow-xl rounded-[2rem] flex items-center justify-center mb-8 relative transition-transform duration-500 group-hover:-translate-y-2">
                                <div className="absolute inset-0 bg-emerald-500/5 rounded-[2rem]" />
                                <PlaneTakeoff className="h-10 w-10 text-emerald-600" />
                            </div>
                            <h3 className="text-2xl text-slate-800 mb-3" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>3. Pack & Go</h3>
                            <p className="text-slate-500 text-lg leading-relaxed px-4 font-medium">Execute your perfect itinerary stress-free.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. COLLABORATION PREVIEW */}
            <section className="py-32 bg-[#0B1120] relative overflow-hidden">
                <div className="absolute -top-[400px] -right-[400px] w-[800px] h-[800px] bg-blue-600/20 blur-[150px] rounded-full" />
                <div className="absolute -bottom-[400px] -left-[400px] w-[800px] h-[800px] bg-purple-600/20 blur-[150px] rounded-full" />

                <div className="max-w-[1280px] mx-auto px-6 lg:px-12 relative z-10">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-[10.5px] font-bold text-white uppercase tracking-widest mb-6 border border-white/10 text-center">
                            Multiplayer Engine
                        </div>
                        <h2 className="text-4xl md:text-[3.5rem] text-white mb-6 tracking-tight leading-[1.1]" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                            See what everyone is doing.
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto bg-[#1A2235] border border-white/10 rounded-[2.5rem] p-6 md:p-12 shadow-2xl relative">
                        {/* Fake UI Header */}
                        <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-8">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-blue-500/20 rounded-[1.2rem] flex items-center justify-center text-blue-400 border border-blue-500/30 shadow-inner">
                                    <MapPinned className="h-6 w-6" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <h4 className="text-white text-2xl font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Bali Getaway 🌴</h4>
                                    <span className="text-slate-400 text-sm font-medium">Last edited just now</span>
                                </div>
                            </div>
                            <AvatarGroup
                                avatars={[
                                    { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
                                    { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
                                    { src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80" }
                                ]}
                                maxVisible={3}
                                size={44}
                                overlap={12}
                                extraCountClassName="!bg-[#2A344A] !text-white !border-white/10 text-sm font-bold"
                            />
                        </div>

                        {/* Interactive UI mockup */}
                        <div className="space-y-4">
                            <div className="bg-[#2A344A]/80 border border-white/10 p-6 rounded-[1.5rem] flex items-center gap-5 relative shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                                <div className="absolute -left-2 -top-2 z-20 flex flex-col items-center animate-bounce-slow">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-pink-500 drop-shadow-lg"><path d="M5.65376 21.3113L3.10972 3.50422C2.86873 1.81717 4.70823 0.655829 6.13627 1.58882L20.8931 11.2307C22.2573 12.1221 22.0463 14.1953 20.5218 14.8879L15.3582 17.2346L11.5126 22.5694C10.6657 23.7441 8.82688 23.5135 8.3516 22.1706L5.65376 21.3113Z" fill="currentColor" /></svg>
                                    <div className="bg-pink-500 text-white text-[10px] font-bold px-2 py-[2px] rounded-md rounded-tl-none -mt-1 shadow-md">Sarah</div>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
                                    <UtensilsCrossed className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-white text-lg font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Dinner at Motel Mexicola</span>
                                        <span className="text-slate-400 text-sm font-bold">7:30 PM</span>
                                    </div>
                                    <div className="w-3/4 h-2.5 bg-[#1A2235] rounded-full overflow-hidden">
                                        <div className="w-full h-full bg-slate-700/50 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/5 p-6 rounded-[1.5rem] flex items-center gap-5 relative opacity-80 mix-blend-screen">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                                    <Waves className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-white text-lg font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>Morning Surf Lesson</span>
                                        <span className="text-slate-400 text-sm font-bold">9:00 AM</span>
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] rounded border font-bold uppercase tracking-widest shadow-inner">Confirmed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. EXPENSES & ORGANIZATION */}
            <section className="py-32 bg-slate-50 relative border-t border-slate-100">
                <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 border border-emerald-200 rounded-full text-[10.5px] font-bold text-emerald-700 uppercase tracking-widest mb-6 shadow-sm">
                                FinOps for friends
                            </div>
                            <h2 className="text-4xl md:text-5xl text-slate-800 mb-6 tracking-tight leading-[1.1]" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                                No more &quot;who owes who&quot;
                            </h2>
                            <p className="text-slate-500 text-xl leading-relaxed mb-10 w-11/12 font-medium">
                                Travio automatically tracks shared expenses across multiple currencies, calculates complex balances, and generates a simple settlement link at the end of the trip.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="bg-white border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 md:p-10 relative z-10 w-full max-w-lg mx-auto">
                                <div className="flex justify-between items-center mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <h4 className="font-bold text-slate-500 uppercase tracking-widest text-xs" style={{ fontFamily: "'Quicksand', sans-serif" }}>Total Trip Expenses</h4>
                                    <span className="text-3xl font-bold text-slate-800" style={{ fontFamily: "'Quicksand', sans-serif" }}>$1,240.00</span>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg border border-blue-200">JD</div>
                                            <span className="text-base font-bold text-slate-700" style={{ fontFamily: "'Quicksand', sans-serif" }}>John paid for Flights</span>
                                        </div>
                                        <span className="text-lg font-bold text-slate-800">$600</span>
                                    </div>
                                    <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-lg border border-pink-200">SA</div>
                                            <span className="text-base font-bold text-slate-700" style={{ fontFamily: "'Quicksand', sans-serif" }}>Sarah paid for Dinner</span>
                                        </div>
                                        <span className="text-lg font-bold text-slate-800">$120</span>
                                    </div>
                                    <div className="bg-red-50/50 rounded-2xl p-6 border border-red-100 mt-2 flex justify-between items-center relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
                                        <span className="text-base font-bold text-red-900" style={{ fontFamily: "'Quicksand', sans-serif" }}>You owe John</span>
                                        <span className="text-red-600 font-bold text-xl">$150.00</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -inset-4 blur-3xl bg-gradient-to-br from-emerald-100 to-transparent opacity-60 z-0"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. PHOTO GALLERY */}
            <PhotoGallery />

            {/* 8. FINAL CTA SECTION */}
            <section className="py-40 bg-white relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent blur-[80px] rounded-[100%] pointer-events-none" />
                <div className="max-w-[800px] mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-5xl md:text-6xl lg:text-[5rem] text-slate-900 mb-8 tracking-tight leading-[1] font-bold" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                        Start planning your<br />next trip today
                    </h2>
                    <p className="text-slate-500 text-xl mb-12 font-medium">Join over 100 travel groups who have already ditched the chaotic group chats.</p>
                    <div className="flex justify-center">
                        <Link href="/sign-up" className="h-16 flex items-center justify-center rounded-2xl bg-slate-900 px-12 text-xl font-bold text-white hover:bg-slate-800 transition-all hover:-translate-y-1 duration-300 shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)]">
                            Get Started for Free
                        </Link>
                    </div>
                </div>
            </section>

            {/* Call to action */}
            <section className="py-24 bg-[#0B1120] relative overflow-hidden w-full m-0 p-0" style={{ borderRadius: '0' }}>
                <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                    <Image
                        src={footerBackdrop}
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/90 to-transparent" />

                {/* Decorative Blobs */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 -right-12 w-80 h-80 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-[800px] mx-auto px-6 relative z-10 text-center py-24">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight leading-[1.1] drop-shadow-lg" style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700 }}>
                        Ready to revolutionize<br />your group trips?
                    </h2>
                    <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-medium">
                        Join over 100 travel groups who have already ditched the chaotic group chats. Start planning your next adventure today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/sign-up" className="w-full sm:w-auto h-14 flex items-center justify-center rounded-full bg-primary px-10 text-lg font-bold text-white hover:bg-blue-600 transition-all shadow-[0_0_40px_-10px_rgba(59,130,246,0.6)] hover:-translate-y-0.5">
                            Get Started for Free
                        </Link>
                        <a href="#home" className="w-full sm:w-auto h-14 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-10 text-lg font-bold text-white hover:bg-white/10 transition-all">
                            Back to Top
                        </a>
                    </div>
                    <div className="mt-12 flex justify-center items-center gap-6 opacity-60">
                        <span className="text-sm font-bold text-white tracking-widest uppercase">No Credit Card Required</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        <span className="text-sm font-bold text-white tracking-widest uppercase">Cancel Anytime</span>
                    </div>
                </div>
            </section>


        </main>
    );
}
