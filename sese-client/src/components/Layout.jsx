import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';

const Layout = () => (
    <div className="min-h-screen bg-[#fafafa] text-[#0a0a0a]">
        <NavBar />
        <main className="pt-16">
            <Outlet />
        </main>
    </div>
);

export default Layout;