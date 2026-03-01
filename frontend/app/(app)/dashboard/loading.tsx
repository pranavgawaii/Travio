export default function DashboardLoading() {
    return (
        <div className="grid min-h-[calc(100vh)] grid-cols-1 grid-rows-1 bg-[#FAFAFA] font-inter text-slate-900">
            <div className="col-start-1 row-start-1 flex flex-col pb-32">
                <header className="sticky top-0 flex items-center justify-between border-b border-[#E5E7EB] bg-[#FAFAFA]/90 px-8 py-5 backdrop-blur-md">
                    <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200" />
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
                        <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200" />
                    </div>
                </header>
                <main className="flex-1 bg-[#FAFAFA]">
                    <div className="mx-auto w-full max-w-6xl space-y-10 px-8 pb-20 pt-4">
                        <div className="flex items-end justify-between">
                            <div className="space-y-2">
                                <div className="h-9 w-56 animate-pulse rounded-full bg-slate-200" />
                                <div className="h-4 w-80 animate-pulse rounded-full bg-slate-100" />
                            </div>
                            <div className="h-11 w-32 animate-pulse rounded-xl bg-blue-100" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <div key={idx} className="rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
                                    <div className="mb-3 h-3 w-24 animate-pulse rounded-full bg-slate-100" />
                                    <div className="h-8 w-16 animate-pulse rounded-full bg-slate-200" />
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <div className="mb-5 h-5 w-32 animate-pulse rounded-full bg-slate-200" />
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {Array.from({ length: 4 }).map((_, idx) => (
                                        <div key={idx} className="rounded-2xl border-2 border-dashed border-[#E5E7EB] bg-white p-2 shadow-sm">
                                            <div className="mb-3 h-48 animate-pulse rounded-xl bg-slate-200" />
                                            <div className="space-y-3 px-2 pb-2">
                                                <div className="h-5 w-2/3 animate-pulse rounded-full bg-slate-200" />
                                                <div className="h-3 w-1/3 animate-pulse rounded-full bg-slate-100" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="mb-5 h-5 w-28 animate-pulse rounded-full bg-slate-200" />
                                <div className="space-y-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                                    {Array.from({ length: 4 }).map((_, idx) => (
                                        <div key={idx} className="flex items-start gap-4">
                                            <div className="h-8 w-8 animate-pulse rounded-full bg-slate-100" />
                                            <div className="flex-1 space-y-2 pt-1">
                                                <div className="h-3 w-20 animate-pulse rounded-full bg-slate-100" />
                                                <div className="h-4 w-40 animate-pulse rounded-full bg-slate-200" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
