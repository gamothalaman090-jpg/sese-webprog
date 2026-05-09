import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchArticle } from '../../services/ArticleService';
import Button from '../../components/Button';

const ArticlePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchArticle(id)
            .then(({ data }) => {
                setProject(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch article", err);
                setError(true);
                setLoading(false);
            });
    }, [id]);

    if (error) {
        return <Navigate to="/articles" />;
    }

    if (loading || !project) {
        return (
            <div className="flex w-full flex-col bg-zinc-50 min-h-screen pt-24 px-6 sm:px-12 lg:px-24">
                <div className="max-w-6xl w-full animate-pulse">
                    <div className="h-8 w-32 bg-zinc-200 mb-12" />
                    <div className="h-4 w-48 bg-zinc-200 mb-6" />
                    <div className="h-20 w-3/4 bg-zinc-300 mb-10" />
                    <div className="h-96 w-full bg-zinc-200 mt-16" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col bg-zinc-50 min-h-screen">
            {/* HER0 / HEADER */}
            <header className="px-6 sm:px-12 lg:px-24 pt-15 pb-16 border-b-2 border-zinc-900">
                <div className="max-w-6xl">
                    <div className="mb-12">
                        <Button to="/articles" variant="secondary" className="px-0 border-none text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-zinc-900 group">
                            <span className="inline-block transition-transform group-hover:-translate-x-1 mr-2">←</span>
                            Back to Index
                        </Button>
                    </div>

                    <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">
                        §{project.no} — Featured Project
                    </p>
                    <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black leading-[0.85] text-zinc-900 mb-10">
                        {project.title}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-zinc-200">
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1 flex items-center gap-2">
                                <span className="w-1 h-1 bg-zinc-900 rounded-full"></span> Role / Type
                            </p>
                            <p className="text-sm font-semibold text-zinc-900">{project.type}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 mb-1 flex items-center gap-2">
                                <span className="w-1 h-1 bg-zinc-900 rounded-full"></span> Technologies
                            </p>
                            <p className="text-sm font-semibold text-zinc-900">{project.stack}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* CONTENT GRID */}
            <main className="px-6 sm:px-12 lg:px-24 py-16">
                <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16">

                    {/* Main Content Area */}
                    <div className="order-2 lg:order-1">
                        <div className="aspect-video w-full border-2 border-zinc-900 mb-12 overflow-hidden bg-zinc-200">
                            <img
                                src={project.img}
                                alt={project.title}
                                className="w-full h-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                            />
                        </div>

                        <div
                            className="prose prose-zinc lg:prose-xl max-w-none 
                            prose-h3:font-display prose-h3:text-3xl prose-h3:font-black prose-h3:mt-12 
                            prose-p:text-zinc-600 prose-p:leading-relaxed prose-p:mb-6
                            prose-strong:text-zinc-900 prose-li:text-zinc-600"
                            dangerouslySetInnerHTML={{ __html: project.content || '<p>No content provided for this project.</p>' }}
                        />
                    </div>

                    {/* Meta / Sidebar */}
                    <aside className="order-1 lg:order-2 flex flex-col gap-12">
                        <section className="p-8 border-2 border-zinc-900 bg-white shadow-[8px_8px_0px_0px_rgba(24,24,27,1)]">
                            <h3 className="font-display text-xl font-bold mb-6 pb-4 border-b border-zinc-100 uppercase tracking-tighter">
                                Project Abstract
                            </h3>
                            <p className="text-sm leading-relaxed text-zinc-500 italic mb-8">
                                "{project.desc}"
                            </p>
                            <div className="flex flex-col gap-4">
                                <Button variant="primary" className="w-full">Live Demo</Button>
                                <Button variant="secondary" className="w-full">Source Code</Button>
                            </div>
                        </section>

                        <section className="p-8 border-2 border-zinc-900 bg-zinc-900 text-zinc-50">
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-zinc-400">Context</h4>
                            <p className="text-xs leading-relaxed text-zinc-300">
                                This project was completed as part of the advanced web programming laboratory.
                                It adheres to the technical constraints and design mandates established for the '26 cohort.
                            </p>
                        </section>
                    </aside>
                </div>
            </main>

            {/* BOTTOM NAV */}
            <footer className="px-6 sm:px-12 lg:px-24 py-24 border-t-2 border-zinc-900 bg-zinc-100">
                <div className="mx-auto max-w-6xl text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-400 mb-8">
                        End of Project
                    </p>
                    <h3 className="font-display text-4xl sm:text-6xl font-black text-zinc-900 mb-12">
                        Ready to see more?
                    </h3>
                    <Button to="/articles" variant="primary" className="h-16 px-12 text-lg">
                        Return to Archive
                    </Button>
                </div>
            </footer>
        </div>
    );
};

export default ArticlePage;