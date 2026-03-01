import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';
import Link from 'next/link';
import ExploreDemoButton from '@frontend/ui/explore-demo-button';

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                        <div className="flex items-center justify-center text-primary relative overflow-hidden h-8 w-8">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="absolute w-8 h-8 fill-current">
                                <path d="M120-120v-80h720v80H120Z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="absolute w-8 h-8 fill-current plane-animate">
                                <path d="M190-320L40-570l96-26 112 94 140-37-207-276 116-31 299 251 170-46q32-9 60.5 7.5T864-585q9 32-7.5 60.5T808-487L190-320Z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-900 font-display">Travio</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-8">
                        <Link className="text-base font-semibold text-slate-600 hover:text-primary transition-colors" href="/#features">Features</Link>
                        <Link className="text-base font-semibold text-slate-600 hover:text-primary transition-colors" href="/#how-it-works">How it works</Link>
                        <Link className="text-base font-semibold text-slate-600 hover:text-primary transition-colors" href="/#pricing">Pricing</Link>
                    </div>
                    <div className="flex items-center gap-6">
                        <SignedOut>
                            <Link href="/sign-in" className="hidden sm:flex items-center justify-center text-base font-bold text-slate-600 hover:text-slate-900 transition-colors">
                                Log In
                            </Link>
                            <ExploreDemoButton variant="nav" />
                        </SignedOut>
                        <SignedIn>
                            <Link href="/dashboard" className="hidden sm:flex items-center justify-center text-base font-bold text-slate-600 hover:text-slate-900 transition-colors">Dashboard</Link>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </div>
                </div>
            </nav>

            {children}

            <footer className="border-t border-border-light bg-white pt-16 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                        <div className="col-span-2 lg:col-span-2">
                            <Link href="/" className="flex items-center gap-2 mb-4 group cursor-pointer inline-flex">
                                <div className="flex items-center justify-center text-slate-900 relative overflow-hidden h-6 w-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="absolute w-6 h-6 fill-current">
                                        <path d="M120-120v-80h720v80H120Z" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="absolute w-6 h-6 fill-current plane-animate">
                                        <path d="M190-320L40-570l96-26 112 94 140-37-207-276 116-31 299 251 170-46q32-9 60.5 7.5T864-585q9 32-7.5 60.5T808-487L190-320Z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold tracking-tight text-slate-900 font-display">Travio</span>
                            </Link>
                            <p className="text-sm font-medium text-slate-500 max-w-xs mb-6">
                                Making group travel simple, collaborative, and fun again. Built with love for explorers.
                            </p>
                            <div className="flex gap-4">
                                <a className="text-slate-400 hover:text-slate-600" href="#"><span className="sr-only">Twitter</span>
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                    </svg>
                                </a>
                                <a className="text-slate-400 hover:text-slate-600" href="#"><span className="sr-only">GitHub</span>
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 mb-4">Product</h3>
                            <ul className="space-y-3 text-sm font-medium text-slate-500">
                                <li><Link className="hover:text-primary transition-colors" href="/#features">Features</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Integrations</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="/#pricing">Pricing</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Changelog</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 mb-4">Company</h3>
                            <ul className="space-y-3 text-sm font-medium text-slate-500">
                                <li><Link className="hover:text-primary transition-colors" href="#">About</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Careers</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Blog</Link></li>
                                <li><Link className="hover:text-primary transition-colors" href="#">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-border-light pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs font-medium text-slate-400">© 2024 Travio Inc. All rights reserved.</p>
                        <div className="flex gap-6 text-xs font-medium text-slate-400">
                            <a className="hover:text-slate-600 transition-colors" href="#">Privacy Policy</a>
                            <a className="hover:text-slate-600 transition-colors" href="#">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
