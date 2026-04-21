import { Link } from 'react-router-dom';

const ArticleList = ({ articles }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-2 border-zinc-900 bg-zinc-900 gap-[2px]">
            {articles.map((project) => (
                <Link
                    key={project.id}
                    to={`/articles/${project.id}`}
                    className="group relative flex flex-col bg-zinc-50 overflow-hidden transition-colors hover:bg-white"
                >
                    {/* Visual Anchor: Image with grayscale hover effect */}
                    <div className="aspect-[16/10] border-b-2 border-zinc-900 overflow-hidden">
                        <img
                            src={project.img}
                            alt={project.title}
                            className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                        />
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                                §{project.no} — {project.type}
                            </span>
                        </div>

                        <h3 className="font-display text-2xl font-black text-zinc-900 leading-tight mb-3">
                            {project.title}
                        </h3>

                        <p className="text-sm text-zinc-600 leading-relaxed mb-6 line-clamp-3">
                            {project.desc}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-100">
                            <span className="text-[9px] font-semibold tracking-widest uppercase text-zinc-500">
                                {project.stack}
                            </span>
                            <div className="w-8 h-8 rounded-full border border-zinc-900 flex items-center justify-center transition-transform group-hover:translate-x-1">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14m-7-7 7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ArticleList;