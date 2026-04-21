import Button from '../../components/Button';
import ArticleList from '../../components/ArticleList';
import articles from '../../assets/article-content.js';

const ArticleListPage = () => {
    return (
        <div className="flex w-full flex-col gap-12 bg-zinc-50 min-h-screen">
            {/* HER0 SECTION */}
            <section className="relative pt-24 pb-16 px-6 sm:px-12 lg:px-24">
                <div className="max-w-4xl">
                    <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">
                        §01 — Selected Works
                    </p>
                    <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black leading-[0.9] text-zinc-900 mb-8">
                        The convergence of <br />
                        <span className="text-zinc-500">Logic & Aesthetics</span>
                    </h1>
                    <p className="max-w-xl text-base sm:text-lg leading-relaxed text-zinc-600 mb-10">
                        An curated archive of projects where technical rigor meets architectural intent.
                        Each entry represents a specific challenge solved through code, design, or both.
                    </p>
                    <div className="flex gap-4">
                        <Button to="/" variant="secondary">Back Home</Button>
                        <Button to="/about" variant="primary">About Me</Button>
                    </div>
                </div>
            </section>

            {/* PROJECT GRID SECTION */}
            <section className="px-6 sm:px-12 lg:px-24 pb-24">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b-2 border-zinc-900 pb-8">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-2">
                            §02 — Archive
                        </p>
                        <h2 className="font-display text-3xl font-black text-zinc-900">Project Index</h2>
                    </div>
                    <p className="mt-4 sm:mt-0 text-[11px] font-medium text-zinc-500 max-w-xs text-right">
                        Showing {articles.length} featured items from the current academic cycle.
                    </p>
                </div>

                <ArticleList articles={articles} />
            </section>
        </div>
    );
}

export default ArticleListPage;