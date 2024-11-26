import { useState, useEffect } from "react";
import Who from "./components/WhoAreYou";
import User from "./components/User";
import NewUser from "./components/NewUser";

function App() {
  const [who, setWho] = useState(false);
  const [role, setRole] = useState("Guest");
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers
      ? JSON.parse(savedUsers)
      : [
          { name: "Simbu", role: "Guest", tasks: ["Test site", "Internship"] },
          {
            name: "Monu",
            role: "Admin",
            tasks: ["Frontend Task", "Eat Lunch"],
          },
          { name: "Sahas", role: "Manager", tasks: ["Meeting", "Testing"] },
        ];
  });

  const handleAddUser = (userData) => {
    setUsers((prevUsers) => [...prevUsers, userData]);
    setShowForm(false);
    setIsLoggedIn(true);
    setWho(false);
  };

  const handleRole = (updatedUser) => {
    if (!isAdmin) {
      setMessage("Only Admins can change roles.");
      return;
    }
    setUsers((prevUsers) =>
      prevUsers.map((user, key) =>
        key === updatedUser.key
          ? {
              ...user,
              role:
                user.role === "Guest"
                  ? "Manager"
                  : user.role === "Manager"
                  ? "Admin"
                  : "Guest",
            }
          : user
      )
    );
  };

  const handleTasks = (Task) => {
    if (isGuest) {
      setMessage("Guests can't update tasks");
      return;
    }
    if (Task.action === "delete") {
      setUsers((prevUsers) =>
        prevUsers.map((user, index) =>
          index === Task.key
            ? { ...user, tasks: user.tasks.filter((t) => t !== Task.task) }
            : user
        )
      );
    }
    if (Task.action === "Add") {
      setUsers((prevUsers) =>
        prevUsers.map((user, index) =>
          index === Task.key
            ? { ...user, tasks: [...user.tasks, Task.task] }
            : user
        )
      );
    }
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const isAdmin = role === "Admin";
  const isManager = role === "Manager";
  const isGuest = role === "Guest";

  return (
    <div
      className="relative bg-cover bg-center min-h-screen"
      style={{ backgroundImage: "url('green.jpg')" }}
    >
      <div className="absolute inset-0 bg-slate-200 bg-opacity-20 h-screen flex flex-col items-center mt-4">
        <h1 className="font-cursive font-bold text-3xl">
          Pandagram - Role Based Access
        </h1>

        {!isLoggedIn && (
          <button
            onClick={() => setWho(!who)}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            Login
          </button>
        )}
        <button
          className={`mt-4 px-6 py-2 ${
            isAdmin ? "bg-blue-500" : "bg-gray-500"
          } text-white rounded-lg`}
          onClick={() => setShowForm(true)}
          disabled={!isAdmin}
        >
          New User
        </button>
        {message}
        {showForm && <NewUser onAddUser={handleAddUser} />}

        <h1 className="text-3xl">{role}</h1>

        {who && <Who setRole={setRole} setWho={setWho} />}

        {/* User Cards */}
        {!who && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
            {users.map((user, index) => {
              return (
                <User
                  key={index}
                  index={index}
                  image={user.role}
                  role={user.role}
                  tasks={user.tasks}
                  name={user.name}
                  handleRole={handleRole}
                  handleTasks={handleTasks}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
