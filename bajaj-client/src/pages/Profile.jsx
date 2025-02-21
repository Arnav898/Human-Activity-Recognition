import { useAuth } from "@/context/AuthContext";

const Profile = () => {
    const {user} = useAuth();
    return (
        <div>
            <h1>Name: {user.name}</h1>
        </div>
    )
}

export default Profile;