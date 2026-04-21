import { Link } from 'react-router-dom';
import Button from './Button';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
        { label: 'Projects', to: '/articles' },
    ];

    const socials = [
        { label: 'GitHub', href: 'https://github.com/gamothalaman090-jpg' },
        { label: 'Facebook', href: '#' },
        { label: 'Instagram', href: '#' },
    ];

    return (
        <footer className="w-full bg-zinc-950 text-zinc-50 border-t-4 border-zinc-900 pt-16 pb-10 px-6 sm:px-12 lg:px-24">
            <div className="mx-auto max-w-7xl">

                {/* TIER 01: PRIMARY BRANDING & CTA */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 pb-12 border-b border-zinc-800">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-500 mb-6">
                            §01 — Direct Communications
                        </p>
                        <h2 className="font-display text-4xl sm:text-6xl font-black leading-tight mb-8">
                            Let's build <br />
                            <span className="text-zinc-600">the next iteration.</span>
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            <Button to="mailto:ej.sese@example.com" variant="secondary" className="border-zinc-700 text-zinc-300 hover:border-zinc-500">
                                Copy Email
                            </Button>
                            <Button to="/articles" variant="secondary" className="border-zinc-700 text-zinc-300 hover:border-zinc-500">
                                Start a Project
                            </Button>
                        </div>
                    </div>

                    <div className="flex lg:justify-end items-end">
                        <div className="text-right">
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-2">Current Node</p>
                            <p className="font-display text-3xl font-black text-zinc-50">Manila, PH</p>
                            <p className="text-[10px] font-mono text-zinc-600 mt-1 tracking-widest">
                                14.5995° N, 120.9842° E
                            </p>
                        </div>
                    </div>
                </div>

                {/* TIER 02: GRID NAV & SOCIALS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-zinc-800">
                    {/* Navigation */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-4">Sitemap</h4>
                        <ul className="flex flex-col gap-3">
                            {navLinks.map(link => (
                                <li key={link.label}>
                                    <Link to={link.to} className="text-xs font-semibold hover:text-zinc-400 transition-colors uppercase tracking-wider">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-4">Socials</h4>
                        <ul className="flex flex-col gap-3">
                            {socials.map(social => (
                                <li key={social.label}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-semibold hover:text-zinc-400 transition-colors uppercase tracking-wider flex items-center group"
                                    >
                                        {social.label}
                                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0">↗</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Technical Specs */}
                    <div className="lg:col-span-2 flex lg:justify-end">
                        <div className="max-w-xs lg:text-right">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-4">Technical Mandate</h4>
                            <p className="text-[10px] leading-relaxed text-zinc-400 font-medium italic opacity-70">
                                Designed and developed by Eunich John Sese. Built with React 19,
                                Tailwind CSS v4, and a strict adherence to Editorial Brutalism.
                            </p>
                        </div>
                    </div>
                </div>

                {/* TIER 03: SUB-FOOTER */}
                <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
                        © {currentYear} — SESE_LAB_ARCHIVE_v4.0
                    </p>
                    <div className="flex gap-6">
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-800">All Rights Reserved</span>
                        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-800">Encoded in PH</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;