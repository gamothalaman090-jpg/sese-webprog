import Button from '../../components/Button';

const skills = ['Web Dev', 'UI/UX', 'JavaScript', 'React', 'Python'];

const featured = [
    {
        no: '01',
        type: 'Web Application',
        stack: 'React · Python',
        title: 'Portfolio Project One',
        desc: 'A full-stack web application with a React frontend and Python backend. Clean interface, thoughtful UX.',
        img: '/images/project-1.png',
    },
    {
        no: '02',
        type: 'UI/UX Design',
        stack: 'Figma · React',
        title: 'Portfolio Project Two',
        desc: 'A mobile-first interface design project. Accessible by design, minimal by intention.',
        img: '/images/project-2.png',
    },
];

const HomePage = () => (
    <div className="flex w-full flex-col">

        {/* §01 HERO */}
        <section className="border-b-2 border-[#0a0a0a] px-4 sm:px-6 lg:px-8 py-14">
            <div className="mx-auto max-w-6xl grid lg:grid-cols-[1fr_360px] gap-12 items-start">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-[#71717a] mb-8">
                        §01 — Hello, World
                    </p>
                    <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black leading-[1.0] text-[#0a0a0a] mb-6">
                        Eunich<br />John<br /><em>Sese.</em>
                    </h1>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#71717a] mb-5">
                        Information Technology · Mobile &amp; Web Applications
                    </p>
                    <p className="text-sm leading-7 text-[#52525b] max-w-md mb-8">
                        BSc IT student at National University Manila. I build things for the web —
                        from React frontends to Python backends — and care deeply about how they look and feel.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button to="/articles" variant="primary">View Projects</Button>
                        <Button to="/about">About Me</Button>
                    </div>
                    <div className="mt-10 pt-6 border-t border-[#e4e4e7] flex flex-wrap items-center gap-x-6 gap-y-2">
                        {skills.map(s => (
                            <span key={s} className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a1a1aa]">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Portrait */}
                <div className="relative hidden lg:block">
                    <div className="border-2 border-[#0a0a0a] overflow-hidden">
                        <img
                            src="/images/hero.png"
                            alt="Eunich John Sese"
                            className="w-full aspect-[4/5] object-cover grayscale"
                        />
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-[#d4d4d8] -z-10" />
                </div>
            </div>
        </section>

        {/* §02 FEATURED WORK */}
        <section className="border-b-2 border-[#0a0a0a] px-4 sm:px-6 lg:px-8 py-12">
            <div className="mx-auto max-w-6xl">
                <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-[#e4e4e7]">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#71717a] mb-1">§02</p>
                        <h2 className="font-display text-3xl font-bold text-[#0a0a0a]">Featured Work</h2>
                    </div>
                    <Button to="/articles">All Projects</Button>
                </div>
                <div className="grid sm:grid-cols-2 border-2 border-[#0a0a0a] divide-x-2 divide-[#0a0a0a]">
                    {featured.map(p => (
                        <article key={p.no} className="flex flex-col">
                            <div className="border-b-2 border-[#0a0a0a] overflow-hidden">
                                <img src={p.img} alt={p.title} className="w-full h-52 object-cover grayscale" />
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#71717a] mb-2">
                                    {p.no} — {p.type} · {p.stack}
                                </p>
                                <h3 className="font-display text-xl font-bold text-[#0a0a0a] mb-3">{p.title}</h3>
                                <p className="text-sm leading-6 text-[#52525b] flex-1">{p.desc}</p>
                                <Button className="mt-5">View Project</Button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>

        {/* §03 ABOUT STRIP */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
            <div className="mx-auto max-w-6xl grid md:grid-cols-[4px_1fr] gap-8 items-center">
                <div className="hidden md:block self-stretch bg-[#0a0a0a]" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#71717a] mb-2">
                            §03 — The Person
                        </p>
                        <p className="font-display text-2xl font-bold text-[#0a0a0a]">
                            IT student. Amateur builder.<br />
                            <em>Permanent work in progress.</em>
                        </p>
                    </div>
                    <div className="shrink-0">
                        <Button to="/about">Read About</Button>
                    </div>
                </div>
            </div>
        </section>

    </div>
);

export default HomePage;