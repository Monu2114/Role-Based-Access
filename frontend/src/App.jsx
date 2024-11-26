import { useState, useEffect } from "react";
import Who from "./components/WhoAreYou";
import User from "./components/User";
import NewUser from "./components/NewUser";

function App() {
  const [who, setWho] = useState(false);
  const [role, setRole] = useState("Guest");
  const [showForm, setShowForm] = useState(false); // State for showing/hiding the form
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  const [users, setUsers] = useState(() => {
    // Retrieve users from local storage, or initialize with default users
    const savedUsers = localStorage.getItem("users");
    return savedUsers
      ? JSON.parse(savedUsers)
      : [
          {
            name: "Simbu",
            role: "Guest",
            tasks: ["Test site", "Internship"],
          },
          {
            name: "Monu",
            role: "Admin",
            tasks: ["Frontend Task", "Eat Lunch"],
          },
          {
            name: "Sahas",
            role: "Manager",
            tasks: ["Meeting", "Testing"],
          },
        ];
  });
  const handleAddUser = (userData) => {
    setUsers((prevUsers) => [...prevUsers, userData]);
    setShowForm(false);
    setIsLoggedIn(true); // Mark the user as logged in

    setWho(false);
    // Hide the form
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
            } // Update the role for the matching user
          : user
      )
    );
    console.log(updatedUser);
  };

  const handleTasks = (Task) => {
    if (isGuest) {
      setMessage("Guests can't update tasks");
      return; // Prevents further execution
    }
    if (Task.action == "delete") {
      setMessage("");
      setUsers((prevUsers) =>
        prevUsers.map((user, index) =>
          index === Task.key
            ? {
                ...user,
                tasks: user.tasks.filter((t) => t != Task.task), // Remove task with the matching task ID
              }
            : user
        )
      );
    }
    if (Task.action == "Add") {
      setMessage("");
      setUsers((prevUsers) =>
        prevUsers.map((user, index) =>
          index === Task.key
            ? {
                ...user,
                tasks: user.tasks.push(Task.task), // Remove task with the matching task ID
              }
            : user
        )
      );
    }
  };

  useEffect(() => {
    // Update local storage whenever users change
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const isAdmin = role === "Admin";
  const isManager = role === "Manager";
  const isGuest = role === "Guest";

  return (
    <>
      {/* Parent div with background image */}
      <div
        className="relative bg-cover bg-center min-h-screen "
        style={{ backgroundImage: "url('green.jpg')" }}
      >
        {/* Overlaying content */}
        <div className="absolute inset-0 bg-slate-200 bg-opacity-20 h-screen flex flex-col items-center  mt-4">
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
            disabled={!isAdmin} // Disable the button for non-admins
          >
            New User
          </button>
          {message}
          {showForm && <NewUser onAddUser={handleAddUser} />}

          <h1 className="text-3xl">{role}</h1>

          {/* Conditionally render the Who component as a popup */}
          {who && <Who setRole={setRole} setWho={setWho} />}

          {/* User Cards */}
          {!who && (
            <div className="grid grid-cols-4 space-x-10 mt-8 ">
              {users.map((user, index) => {
                return (
                  <User
                    key={index}
                    index={index} // Pass index as a prop
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
    </>
  );
}

export default App;
