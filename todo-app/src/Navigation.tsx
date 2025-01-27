import { Link } from "react-router";
import Clock from "./Clock";

export default function Navigation({userId, username, logout}: {userId: number, username: string, logout: () => void}) {
    return (

        <div className="w-full h-12 fixed top-0 bg-blue-500 text-white flex justify-between px-12 items-center">
    <Clock />
    <p className="flex flex-row-reverse items-center">
      <Link to={`/profile/${userId}`} className="mr-2">
      Logged in as {username}
      </Link>
      <button
        className="border border-red-500 mr-2 bg-red-500 font-bold text-lg px-2 rounded-lg"
        onClick={() => {
            logout();
        }}
        >
        Log Out
      </button>
      <Link to="/" className="mr-2">
      Home</Link>
    </p>
  </div>
    )
}