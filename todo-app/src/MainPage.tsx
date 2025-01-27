import { AuthContextType } from "./AuthContext";
import Column from "./Column";

export default function MainPage({username, userId, login, logout}: AuthContextType) {
    return (
        <div className="flex flex-col pt-12 w-screen h-screen overflow-x-hidden">
      <div className='w-full h-12 fixed top-0 bg-blue-500 text-white flex justify-between px-12 items-center'>
        <h1 className='text-2xl font-bold'>Todo App</h1>
        <p>Logged in as {username}
          
          <button className='border border-red-500 ml-2 px-2 rounded-lg' onClick={() => {logout()}}>
              Log Out
          </button>
        </p>
      </div>
      <div className='flex flex-row justify-evenly flex-wrap'>
        <Column status={0} color='red-500' elements={[
          {
            id: 1,
            description: 'This is a description',
            dueDate: '2021-12-31',
            priority: 3,
            status: 0,
            title: 'This is a title'
          }
        ]} />
        <Column status={1} color='red-500' elements={[
          {
            id: 1,
            description: 'This is a description',
            dueDate: '2021-12-31',
            priority: 3,
            status: 0,
            title: 'This is a title'
          }
        ]} />
        <Column status={2} color='red-500' elements={[
          {
            id: 1,
            description: 'This is a description',
            dueDate: '2021-12-31',
            priority: 3,
            status: 0,
            title: 'This is a title'
          }
        ]} />
        <Column status={3} color='red-500' elements={[
          {
            id: 1,
            description: 'This is a description',
            dueDate: '2021-12-31',
            priority: 3,
            status: 0,
            title: 'This is a title'
          }
        ]} />

      </div>
    </div>
    )
}