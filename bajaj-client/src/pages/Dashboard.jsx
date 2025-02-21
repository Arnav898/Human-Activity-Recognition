import { Button } from "@/components/ui/button";

const Dashboard = () => {
	return (
		<div className="max-w-4xl p-6 mx-auto mt-10 bg-white rounded-lg shadow">
			<h2 className="text-2xl font-semibold">Welcome, to Dashboard</h2>
			<p className="text-gray-600">Manage your barter transactions here.</p>
			<Button className="mt-4">View My Trades</Button>
		</div>
	);
};

export default Dashboard;
