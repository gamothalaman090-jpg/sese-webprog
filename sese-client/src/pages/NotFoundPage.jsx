import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFoundPage = () => {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-950 px-6 py-24 text-center overflow-hidden relative">
            {/* Visual Noise Elements for Brutalist Aesthetic */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 border-2 border-zinc-500 rounded-full" />
                <div className="absolute bottom-10 right-10 w-96 h-96 border-2 border-zinc-500" />
            </div>

            <div className="relative z-10">
                <p className="text-[12px] font-bold uppercase tracking-[0.5em] text-zinc-500 mb-8 border-b border-zinc-800 pb-2 inline-block">
                    Status: 404 — Access Denied
                </p>
                <h1 className="font-display text-7xl sm:text-9xl font-black text-zinc-50 mb-10 leading-none tracking-tighter">
                    OUT OF <br/>BOUNDS.
                </h1>
                <p className="max-w-md mx-auto text-base leading-relaxed text-zinc-400 mb-14">
                    The requested data node does not exist in the current architecture. 
                    Redirection suggested to maintain system integrity.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Button to="/" variant="primary" className="min-w-[200px]">Return Home</Button>
                    <Button to="/projects" variant="secondary" className="min-w-[200px] border-zinc-700 text-zinc-300">Browse Projects</Button>
                </div>
            </div>

            <div className="absolute bottom-8 left-8 text-[10px] font-mono text-zinc-800 uppercase tracking-widest hidden sm:block">
                Sese_Lab_Archive_v4.0
            </div>
        </div>
    );
};

export default NotFoundPage;
