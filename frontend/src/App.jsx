import { useState, useEffect } from "react";
import Who from "./components/WhoAreYou";
import User from "./components/User";

function App() {
  const [who, setWho] = useState(false);
  const [role, setRole] = useState("Guest");
  useEffect(() => {
    console.log(`Role updated in App: ${role}`);
  }, [role]);

  return (
    <>
      {/* Parent div with background image */}
      <div
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: "url('green.jpg')" }}
      >
        {/* Overlaying content */}
        <div className="absolute inset-0 bg-slate-200 bg-opacity-20 h-screen flex flex-col items-center justify-center">
          <div className="font-cursive font-bold">
            <h1 className="text-3xl">Pandagram - Role Based Access</h1>
          </div>

          <button
            onClick={() => setWho(!who)}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            Login
          </button>
          <h1 className="text-3xl">{role}</h1>

          {/* Conditionally render the Who component as a popup */}
          {who && <Who setRole={setRole} />}

          {/* User Cards */}
          {!who && (
            <div className="flex space-x-10 mt-8">
              <User
                image="guest.jpeg"
                role="Guest"
                tasks={["Test site", "Internship"]}
                name="Simbu"
              />
              <User
                image="admin.jpg"
                role="admin"
                tasks={["Frontend Task", "Eat Lunch"]}
                name="Monu"
              />
              <User
                image="manager.jpg"
                role="manager"
                tasks={["Meeting", "Testing"]}
                name="Sahas"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
