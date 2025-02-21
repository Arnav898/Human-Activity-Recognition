import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-background">
			<div className="max-w-2xl p-8 text-center bg-white rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold text-foreground">
					Welcome to Community Barter System
				</h1>
				<p className="mt-2 text-foreground/65">
					Exchange goods and services easily with trusted community members.
				</p>
				<div className="mt-6 space-x-4">
					<Link to="/register">
						<Button className="px-6">Get Started</Button>
					</Link>
					<Link to="/login">
						<Button variant="outline" className="px-6">
							Login
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
