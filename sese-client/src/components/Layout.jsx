import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';
import Footer from './Footer';

const Layout = () => (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
        <NavBar />
        <main className="flex-1 pt-12">
            <Outlet />
        </main>
        <Footer />
    </div>
);

export default Layout;