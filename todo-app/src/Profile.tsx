import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ProfileProps } from "./types";
import Navigation from "./Navigation";
import { useAuth } from "./AuthContext";

export default function Profile() {
  const { userId } = useParams();
  const {logout} = useAuth()
  const [user, setUser] = useState<ProfileProps | undefined>();
  useEffect(() => {
    
      async function fetchUser(id: string) {
        
      const res = await fetch(`http://localhost:5000/api/${id}/profile`);
      const data = await res.json()
        setUser(data);
    }

      fetchUser(userId!);
  }, []);
  return (
    <>
    <Navigation userId={parseInt(userId!)} username={user?.username!} logout={() => {}} />
    <div className="flex justify-center h-screen items-center flex-col">
        <h1 className="text-4xl">Profile</h1>
        <h3 className="text-2xl font-bold">{user?.username}</h3>
        <h4>{user?.todoCount} items recorded</h4>
    </div>
    </>
  );
}
