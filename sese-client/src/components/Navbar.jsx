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

const Navbar = () => (
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

            {/* Right: label + divider + nav */}
            <div className="flex items-center gap-5">
                <span className="hidden md:block text-[10px] tracking-[0.3em] text-[#a1a1aa] uppercase font-medium">
                    Portfolio
                </span>
                <div className="hidden md:block w-px h-5 bg-[#d4d4d8]" />
                <nav className="flex items-center gap-6">
                    {links.map(l => (
                        <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
                            {l.label}
                        </NavLink>
                    ))}
                </nav>
            </div>

        </div>
    </header>
);

export default Navbar;