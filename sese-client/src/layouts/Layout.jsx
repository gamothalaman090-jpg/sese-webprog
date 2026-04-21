import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = () => (
    <div className="min-h-screen bg-[#fafafa] text-[#0a0a0a] flex flex-col pt-16">
        <Navbar />
        <main className="flex-1">
            <Outlet />
        </main>
        <Footer />
    </div>
);

export default Layout;
