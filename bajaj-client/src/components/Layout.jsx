import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
	return (
		<div className="min-h-screen w-full bg-background">
			<Navbar/>
			<main className="p-6">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
