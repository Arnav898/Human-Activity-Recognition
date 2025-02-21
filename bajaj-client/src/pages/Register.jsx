import { useState } from "react";

import { useNavigate,Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BACKEND_URL } from "@/constants";

const Register = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleRegister = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(`${BACKEND_URL}/api/users/register`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			if (response.ok) {
				navigate("/login");
			} else {
				alert("Registration failed");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow">
			<h2 className="text-2xl font-semibold text-center">Register</h2>

			<form onSubmit={handleRegister} className="mt-4 space-y-4">
				<Input
					type="text"
					name="name"
					placeholder="Name"
					onChange={handleChange}
				/>

				<Input
					type="email"
					name="email"
					placeholder="Email"
					onChange={handleChange}
				/>

				<Input
					type="password"
					name="password"
					placeholder="Password"
					onChange={handleChange}
				/>
				
				<Button type="submit" className="w-full">
					Register
				</Button>
			</form>

			<p className="mt-4 text-center">
				Already have an account?{" "}
				<Link to="/login" className="text-blue-600 hover:underline">
					Login
				</Link>
			</p>
		</div>
	);
};

export default Register;
