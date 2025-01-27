import { Link } from "react-router";
import { AuthContextType } from "./AuthContext";
import Clock from "./Clock";
import Column from "./Column";
import { getVerboseStatus } from "./functions";
import { Status, TodoElement } from "./types";

export default function MainPage({
  username,
  userId,
  logout,
  todos,
}: AuthContextType & { todos: TodoElement[] | undefined }) {
  return (
    <div className="flex flex-col pt-12 w-screen h-screen overflow-x-hidden">
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
        </p>
      </div>
      <div className="flex flex-row justify-evenly flex-wrap">
        {
            Array.from({length: 4}).map((_, index) => {
                const status = getVerboseStatus(index) as keyof typeof Status
                
                return (

                    <Column key={index} userId={userId!} status={index} elements={todos?.filter((todo) => todo.status.toString() === status) || []} />
                )
            }
        )
        }
        
      </div>
    </div>
  );
}
