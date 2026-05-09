import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// ─── Design System ───────────────────────────────────────────────────
// Aesthetic: Editorial Brutalism — stark contrast, structured grid, intentional weight
// Differentiation: Navigation reads like a journal masthead, not a SaaS header

const roleMeta = {
    admin:  { label: 'Admin',  dot: 'bg-black' },
    editor: { label: 'Editor', dot: 'bg-zinc-500' },
    viewer: { label: 'Viewer', dot: 'bg-zinc-300' },
};

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    const token     = localStorage.getItem('token');
    const firstName = localStorage.getItem('firstName');
    const userType  = localStorage.getItem('type');
    const isLoggedIn = !!token;

    const role = roleMeta[userType] || roleMeta.viewer;

    // Viewers cannot see the Dashboard link
    const links = [
        { label: 'Home',      to: '/',         end: true },
        { label: 'About',     to: '/about' },
        { label: 'Projects',  to: '/articles' },
        ...(isLoggedIn && userType !== 'viewer'
            ? [{ label: 'Dashboard', to: '/dashboard' }]
            : []),
    ];

    const handleLogout = () => {
        localStorage.clear();
        navigate('/auth/signin');
    };

    const NavLinkItem = ({ to, end, label }) => (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) => [
                'text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-150',
                'border-b-2 pb-0.5',
                isActive
                    ? 'text-[#0a0a0a] border-[#0a0a0a]'
                    : 'text-[#9a9a9a] border-transparent hover:text-[#0a0a0a] hover:border-[#0a0a0a]',
            ].join(' ')}
        >
            {label}
        </NavLink>
    );

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-[#fafafa] border-b-2 border-[#0a0a0a]">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">

                {/* ── Masthead ─────────────────────────────────────── */}
                <NavLink to="/" className="flex flex-col leading-none group select-none">
                    <span className="font-display text-xl font-black tracking-tight text-[#0a0a0a] group-hover:italic transition-all duration-200">
                        EJ.SESE
                    </span>
                    <span className="text-[8px] font-semibold uppercase tracking-[0.4em] text-[#a1a1aa] mt-0.5">
                        IT · NU Manila · '27
                    </span>
                </NavLink>

                {/* ── Desktop Nav ───────────────────────────────────── */}
                <div className="hidden md:flex items-center gap-6">
                    {/* Section label */}
                    <span className="text-[9px] font-bold tracking-[0.4em] text-[#c4c4c8] uppercase select-none">
                        Portfolio
                    </span>
                    {/* Hairline separator */}
                    <div className="w-px h-4 bg-[#d4d4d8]" />

                    {/* Page links */}
                    <nav className="flex items-center gap-7">
                        {links.map(l => <NavLinkItem key={l.to} {...l} />)}
                    </nav>

                    {/* Hairline separator */}
                    <div className="w-px h-4 bg-[#d4d4d8]" />

                    {isLoggedIn ? (
                        /* ── Logged-in identity strip ── */
                        <div className="flex items-center gap-4">
                            {/* Avatar + name + role */}
                            <div className="flex items-center gap-2.5">
                                {/* Square avatar */}
                                <div className="w-7 h-7 bg-[#0a0a0a] flex items-center justify-center flex-shrink-0">
                                    <span className="text-[10px] font-black text-white tracking-wide">
                                        {firstName ? firstName[0].toUpperCase() : '?'}
                                    </span>
                                </div>
                                {/* Name + role pill */}
                                <div className="flex flex-col leading-none">
                                    <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0a0a0a]">
                                        {firstName}
                                    </span>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <span className={`inline-block w-1.5 h-1.5 rounded-full ${role.dot}`} />
                                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#71717a]">
                                            {role.label}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Sign out */}
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9a9a9a] hover:text-[#0a0a0a] border-b-2 border-transparent hover:border-[#0a0a0a] pb-0.5 transition-all duration-150 cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <NavLinkItem to="/auth/signin" label="Sign In" />
                    )}
                </div>

                {/* ── Hamburger (mobile) ────────────────────────────── */}
                <button
                    type="button"
                    onClick={() => setMobileOpen(p => !p)}
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] cursor-pointer"
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                >
                    <span className={['block w-5 h-[2px] bg-[#0a0a0a] transition-all duration-300 origin-center', mobileOpen ? 'rotate-45 translate-y-[7px]' : ''].join(' ')} />
                    <span className={['block w-5 h-[2px] bg-[#0a0a0a] transition-all duration-300', mobileOpen ? 'opacity-0 scale-x-0' : ''].join(' ')} />
                    <span className={['block w-5 h-[2px] bg-[#0a0a0a] transition-all duration-300 origin-center', mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''].join(' ')} />
                </button>
            </div>

            {/* ── Mobile Panel ─────────────────────────────────────── */}
            <div className={['md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-[#0a0a0a]', mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'].join(' ')}>
                <nav className="px-6 py-4 flex flex-col gap-1 bg-[#fafafa]">
                    {links.map(l => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            end={l.end}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) => [
                                'block text-[11px] font-bold uppercase tracking-[0.3em] py-3 border-b border-zinc-200 transition-colors',
                                isActive ? 'text-[#0a0a0a]' : 'text-[#9a9a9a] hover:text-[#0a0a0a]',
                            ].join(' ')}
                        >
                            {l.label}
                        </NavLink>
                    ))}

                    {isLoggedIn ? (
                        <>
                            <div className="flex items-center gap-2.5 py-3 border-b border-zinc-200">
                                <div className="w-6 h-6 bg-[#0a0a0a] flex items-center justify-center">
                                    <span className="text-[9px] font-black text-white">{firstName?.[0]?.toUpperCase()}</span>
                                </div>
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0a0a0a]">{firstName}</span>
                                <span className={`inline-block w-1.5 h-1.5 rounded-full ${role.dot}`} />
                                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#71717a]">{role.label}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => { setMobileOpen(false); handleLogout(); }}
                                className="text-left text-[11px] font-bold uppercase tracking-[0.3em] py-3 text-[#9a9a9a] hover:text-[#0a0a0a] transition-colors cursor-pointer"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <NavLink to="/auth/signin" onClick={() => setMobileOpen(false)}
                            className="block text-[11px] font-bold uppercase tracking-[0.3em] py-3 text-[#9a9a9a] hover:text-[#0a0a0a] transition-colors">
                            Sign In
                        </NavLink>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;