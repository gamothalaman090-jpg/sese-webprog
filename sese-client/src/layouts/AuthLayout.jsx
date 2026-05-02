import { Link, Outlet, useLocation } from 'react-router-dom';

const AuthLayout = () => {
    const { pathname } = useLocation();
    const isSignUp = pathname.includes('signup');

    return (
        <section className="min-h-screen bg-[#fafafa] text-[#0a0a0a]">
            <div className="grid min-h-screen w-full lg:grid-cols-[1fr_1fr]">

                <div className="relative hidden lg:flex flex-col justify-between bg-[#0a0a0a] text-zinc-50 border-r-2 border-[#0a0a0a] p-12 xl:p-16 overflow-hidden">

                    <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
                        <div className="absolute top-0 left-1/3 w-px h-full bg-zinc-50" />
                        <div className="absolute top-0 left-2/3 w-px h-full bg-zinc-50" />
                        <div className="absolute top-1/3 left-0 w-full h-px bg-zinc-50" />
                        <div className="absolute top-2/3 left-0 w-full h-px bg-zinc-50" />
                    </div>

                    <div className="relative z-10">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500 transition-colors duration-200 hover:text-zinc-300 mb-8 group"
                        >
                            <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
                            Back to Portfolio
                        </Link>
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-500">
                            {isSignUp ? '§02 — Registration' : '§01 — Authentication'}
                        </p>
                    </div>

                    <div className="relative z-10 flex-1 flex flex-col justify-center">
                        <h2 className="font-display text-7xl xl:text-8xl font-black leading-[0.95] mb-6">
                            EJ.<br />
                            <em>SESE.</em>
                        </h2>
                        <div className="w-12 h-0.5 bg-zinc-700 mb-6" />
                        <p className="text-sm leading-7 text-zinc-400 max-w-xs">
                            Access the archive. View projects, read case studies,
                            and explore the work behind the wireframes.
                        </p>
                    </div>

                    <div className="relative z-10 flex items-end justify-between border-t border-zinc-800 pt-6">
                        <div>
                            <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-600">
                                Sese_Lab_Archive_v4.0
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-600">
                                Manila, PH — {new Date().getFullYear()}
                            </p>
                        </div>
                    </div>
                </div>
                <main className="flex items-center bg-[#fafafa] px-6 py-12 sm:px-10 lg:px-16">
                    <div className="mx-auto w-full max-w-md">
                    
                        <div className="lg:hidden mb-8">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#71717a] transition-colors duration-200 hover:text-[#0a0a0a] group"
                            >
                                <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
                                Back to Portfolio
                            </Link>
                        </div>
                        <Outlet />
                    </div>
                </main>

            </div>
        </section>
    );
};

export default AuthLayout;