import { useState } from "react";

export default function NewUser({ onAddUser }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Guest");
  const [tasks, setTasks] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      role,
      tasks: tasks.split(",").map((task) => task.trim()), // Convert tasks string to an array
    };
    onAddUser(userData); // Send data back to parent
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add New User</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </label>
        <label className="block mb-2">
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Guest">Guest</option>
          </select>
        </label>
        <label className="block mb-2">
          Tasks (comma-separated):
          <input
            type="text"
            value={tasks}
            onChange={(e) => setTasks(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
