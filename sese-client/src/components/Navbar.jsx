import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
    { label: 'Home', to: '/', end: true },
    { label: 'About', to: '/about' },
    { label: 'Projects', to: '/articles' },
];

const linkClass = ({ isActive }) =>
    [
        'text-[11px] font-semibold uppercase tracking-[0.28em] pb-1 border-b-2 transition-colors duration-200',
        isActive
            ? 'text-[#0a0a0a] border-[#0a0a0a]'
            : 'text-[#71717a] border-transparent hover:text-[#0a0a0a] hover:border-[#0a0a0a]',
    ].join(' ');

const mobileLinkClass = ({ isActive }) =>
    [
        'block text-[11px] font-semibold uppercase tracking-[0.28em] py-3 border-b border-zinc-200 transition-colors duration-200',
        isActive
            ? 'text-[#0a0a0a]'
            : 'text-[#71717a] hover:text-[#0a0a0a]',
    ].join(' ');

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-[#fafafa] border-b-2 border-[#0a0a0a]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">

                {/* Logo / Masthead */}
                <NavLink to="/" className="flex flex-col leading-none group">
                    <span className="font-display text-2xl font-black tracking-tight text-[#0a0a0a] group-hover:italic transition-all duration-200">
                        EJ.SESE
                    </span>
                    <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#71717a] mt-0.5">
                        IT · NU Manila · '27
                    </span>
                </NavLink>

                {/* Right: label + divider + nav + sign in (desktop) */}
                <div className="hidden md:flex items-center gap-5">
                    <span className="text-[10px] tracking-[0.3em] text-[#a1a1aa] uppercase font-medium">
                        Portfolio
                    </span>
                    <div className="w-px h-5 bg-[#d4d4d8]" />
                    <nav className="flex items-center gap-6">
                        {links.map(l => (
                            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                                {l.label}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="w-px h-5 bg-[#d4d4d8]" />
                    <NavLink
                        to="/auth/signin"
                        className={linkClass}
                    >
                        Sign In
                    </NavLink>
                </div>

                {/* Hamburger button (mobile) */}
                <button
                    type="button"
                    onClick={() => setMobileOpen(prev => !prev)}
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] cursor-pointer group"
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileOpen}
                >
                    <span
                        className={[
                            'block w-5 h-[2px] bg-[#0a0a0a] transition-all duration-300 origin-center',
                            mobileOpen ? 'rotate-45 translate-y-[7px]' : '',
                        ].join(' ')}
                    />
                    <span
                        className={[
                            'block w-5 h-[2px] bg-[#0a0a0a] transition-all duration-300',
                            mobileOpen ? 'opacity-0 scale-x-0' : '',
                        ].join(' ')}
                    />
                    <span
                        className={[
                            'block w-5 h-[2px] bg-[#0a0a0a] transition-all duration-300 origin-center',
                            mobileOpen ? '-rotate-45 -translate-y-[7px]' : '',
                        ].join(' ')}
                    />
                </button>
            </div>

            {/* Mobile dropdown panel */}
            <div
                className={[
                    'md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-zinc-200 bg-[#fafafa]',
                    mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 border-t-0',
                ].join(' ')}
            >
                <nav className="px-4 sm:px-6 py-2 pb-4">
                    {links.map(l => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            end={l.end}
                            className={mobileLinkClass}
                            onClick={() => setMobileOpen(false)}
                        >
                            {l.label}
                        </NavLink>
                    ))}
                    <div className="my-2 h-px bg-zinc-300" />
                    <NavLink
                        to="/auth/signin"
                        className={mobileLinkClass}
                        onClick={() => setMobileOpen(false)}
                    >
                        Sign In
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;