import Button from '../../components/Button';

const stats = [
    { value: '3rd', label: 'Year Standing' },
    { value: 'IT', label: 'Degree Program' },
    { value: 'NU', label: 'Manila Campus' },
    { value: 'PH', label: 'Country' },
];

const skills = [
    'Web Development', 'UI/UX Design', 'JavaScript',
    'React', 'Python', 'Mobile Apps', 'Open Source', 'Typography',
];

const AboutPage = () => (
    <div className="flex w-full flex-col">

        {/* §01 NAME HERO */}
        <section className="border-b-2 border-[#0a0a0a] px-4 sm:px-6 lg:px-8 py-12">
            <div className="mx-auto max-w-6xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#71717a] mb-8">
                    §01 — The Person
                </p>
                <h1 className="font-display text-5xl sm:text-6xl font-black text-[#0a0a0a] leading-tight">
                    Eunich John Sese
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6">
                    {['BS Information Technology', 'Mobile & Web Applications', 'National University Manila'].map((t, i, a) => (
                        <span key={t} className="flex items-center gap-4">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#71717a]">{t}</span>
                            {i < a.length - 1 && <span className="w-px h-4 bg-[#d4d4d8] inline-block" />}
                        </span>
                    ))}
                </div>
            </div>
        </section>

        {/* §02 BIO + PORTRAIT */}
        <section className="border-b-2 border-[#0a0a0a] px-4 sm:px-6 lg:px-8 py-12">
            <div className="mx-auto max-w-6xl grid lg:grid-cols-[300px_1fr] gap-12 items-start">

                {/* Portrait */}
                <div className="relative">
                    <div className="border-2 border-[#0a0a0a] overflow-hidden">
                        <img
                            src="/images/about.png"
                            alt="Eunich John Sese"
                            className="w-full aspect-[3/4] object-cover grayscale"
                        />
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-[#d4d4d8] -z-10" />
                </div>

                {/* Bio */}
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#71717a] mb-6">§02 — Bio</p>
                    <div className="space-y-4 text-sm leading-7 text-[#3f3f46]">
                        <p>
                            Hi — I'm Eunich John, most people call me EJ. I'm a BS Information Technology
                            student at National University Manila, specializing in Mobile and Web Applications.
                        </p>
                        <p>
                            I build things for the web. From React frontends to backends, I care
                            about the full picture — how things work, how they look, and how they feel when
                            someone actually uses them.
                        </p>
                        <p>
                            Between debugging sessions and design critiques, I'm probably overthinking a
                            UI detail or going down a rabbit hole about something completely unrelated to my
                            current deadline. Typical IT student behavior.
                        </p>
                        <blockquote className="font-display text-lg italic text-[#0a0a0a] border-l-2 border-[#0a0a0a] pl-4 mt-6">
                            "The details are not the details. They make the design."
                            <span className="block text-[11px] not-italic font-sans text-[#71717a] mt-2">— Charles Eames</span>
                        </blockquote>
                    </div>
                    <div className="mt-8">
                        <Button to="/articles" variant="primary">View My Projects</Button>
                    </div>
                </div>
            </div>
        </section>

        {/* §03 STATS */}
        <section className="border-b-2 border-[#0a0a0a] px-4 sm:px-6 lg:px-8 py-12">
            <div className="mx-auto max-w-6xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#71717a] mb-8">§03 — Snapshot</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 border-2 border-[#0a0a0a]">
                    {stats.map((s, i) => (
                        <div
                            key={s.label}
                            className={`p-6 ${i < stats.length - 1 ? 'border-r-2 border-[#0a0a0a]' : ''}`}
                        >
                            <p className="font-display text-4xl font-black text-[#0a0a0a]">{s.value}</p>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#71717a] mt-2">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* §04 SKILLS */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
            <div className="mx-auto max-w-6xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#71717a] mb-8">§04 — Skills & Interests</p>
                <div className="flex flex-wrap gap-3">
                    {skills.map(t => (
                        <span
                            key={t}
                            className="border-2 border-[#0a0a0a] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#fafafa] transition-colors duration-200"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </section>

    </div>
);

export default AboutPage;