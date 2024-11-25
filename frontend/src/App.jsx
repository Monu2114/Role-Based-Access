import { useState } from "react";
import Who from "./components/WhoAreYou";
import User from "./components/User";
function App() {
  const [who, setWho] = useState(false);

  return (
    <>
      <div className="bg-slate-200 h-screen	">
        {/* <div className="header">
          <img
            src="panda-sneak.jpg"
            alt=""
            className="w-16 h-16 rounded-full"
          />
          <h1 className="font-cursive font-">Pandagram</h1>
        </div> */}
        <button onClick={() => setWho(!who)}>Login</button>
        {/* Conditionally render the Who component as a popup */}
        {who && <Who />}
        <User
          image="guest.jpeg"
          role="admin"
          tasks={["Frontend Task", "Eat Lunch"]}
          name="Monu"
        />
      </div>
    </>
  );
}

export default App;
