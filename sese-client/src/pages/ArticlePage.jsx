import Button from '../components/Button';

const projects = [
    {
        no: '01',
        type: 'Web Application',
        stack: 'React · Python',
        title: 'Full-Stack Web App',
        desc: 'A full-stack web application with a React frontend and Python REST API backend. Features user authentication, CRUD data management, and a responsive interface.',
        img: '/images/project-1.png',
    },
    {
        no: '02',
        type: 'UI/UX Design',
        stack: 'Figma · React',
        title: 'Mobile-First Interface',
        desc: 'A mobile-first interface design project. Accessible by design, minimal by intention, built with component-driven React.',
        img: '/images/project-2.png',
    },
    {
        no: '03',
        type: 'Mobile Application',
        stack: 'React Native · JS',
        title: 'Cross-Platform Mobile App',
        desc: 'A cross-platform mobile application exploring modern navigation patterns, offline-first architecture, and native device integrations.',
        img: '/images/project-1.png',
    },
    {
        no: '04',
        type: 'Frontend Project',
        stack: 'Vanilla JS · CSS',
        title: 'JavaScript Interactive UI',
        desc: 'A frontend JavaScript project featuring interactive data display and dynamic DOM manipulation built without external libraries.',
        img: '/images/project-2.png',
    },
];

const ArticlePage = () => {
    const featured = projects[0];
    const rest = projects.slice(1);

    return (
        <div className="flex w-full flex-col">

            {/* HEADER */}
            <section className="border-b-2 border-[#0a0a0a] px-4 sm:px-6 lg:px-8 py-12">
                <div className="mx-auto max-w-6xl">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#71717a] mb-4">
                        §01 — The Work
                    </p>
                    <h1 className="font-display text-5xl sm:text-6xl font-black text-[#0a0a0a]">Projects</h1>
                    <p className="mt-4 text-sm leading-7 text-[#71717a] max-w-lg">
                        Placeholder projects, built with real skills. Each one represents a technology,
                        a challenge, or an idea worth executing properly.
                    </p>
                </div>
            </section>

            {/* FEATURED */}
            <section className="border-b-2 border-[#0a0a0a] px-4 sm:px-6 lg:px-8 py-12">
                <div className="mx-auto max-w-6xl">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#71717a] mb-8">§02 — Featured</p>
                    <article className="grid lg:grid-cols-[1fr_440px] border-2 border-[#0a0a0a]">
                        <div className="p-8 lg:p-10 flex flex-col justify-between">
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#71717a] mb-4">
                                    {featured.no} — {featured.type} · {featured.stack}
                                </p>
                                <h2 className="font-display text-3xl lg:text-4xl font-bold text-[#0a0a0a] leading-tight mb-4">
                                    {featured.title}
                                </h2>
                                <p className="text-sm leading-7 text-[#52525b]">{featured.desc}</p>
                            </div>
                            <div className="mt-8">
                                <Button variant="primary">View Project</Button>
                            </div>
                        </div>
                        <div className="border-t-2 lg:border-t-0 lg:border-l-2 border-[#0a0a0a]">
                            <img
                                src={featured.img}
                                alt={featured.title}
                                className="w-full h-64 lg:h-full object-cover grayscale"
                            />
                        </div>
                    </article>
                </div>
            </section>

            {/* GRID */}
            <section className="px-4 sm:px-6 lg:px-8 py-12">
                <div className="mx-auto max-w-6xl">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#71717a] mb-8">§03 — More Projects</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-2 border-[#0a0a0a]">
                        {rest.map((p, i) => (
                            <article
                                key={p.no}
                                className={`flex flex-col border-b-2 border-[#0a0a0a] ${
                                    i % 3 !== 2 ? 'lg:border-r-2' : ''
                                } ${i % 2 !== 1 ? 'sm:border-r-2 lg:border-r-0' : ''} ${
                                    (i % 3 !== 2) && !(i % 2 !== 1) ? 'lg:border-r-2' : ''
                                }`}
                            >
                                <div className="border-b-2 border-[#0a0a0a] overflow-hidden">
                                    <img src={p.img} alt={p.title} className="w-full h-44 object-cover grayscale" />
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#71717a] mb-1">
                                        {p.no} — {p.type}
                                    </p>
                                    <p className="text-[10px] tracking-[0.2em] text-[#a1a1aa] mb-3">{p.stack}</p>
                                    <h3 className="font-display text-xl font-bold text-[#0a0a0a] mb-3">{p.title}</h3>
                                    <p className="text-sm leading-6 text-[#52525b] flex-1 mb-4">{p.desc}</p>
                                    <Button>View Project</Button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ArticlePage;