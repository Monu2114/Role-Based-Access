export default function User(user) {
  return (
    <div className="flex justify-center items-center my-4">
      <div className="bg-white rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 p-6 max-w-sm w-80">
        {/* Image and Name Section */}
        <div className="flex justify-center items-center mb-4">
          <img
            src={`${user.role}.jpg`}
            className="w-24 h-24 rounded-full shadow-lg border-4 border-indigo-300"
            alt="user-pic"
          />
        </div>

        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-indigo-600">{user.name}</h3>

          <p
            className="text-md text-gray-500"
            onClick={() =>
              user.handleRole({
                key: user.index, // Pass the index
                role: user.role, // Current role (optional, for debugging)
              })
            } // Replace "NewRole" with logic to choose the role
          >
            {user.role}
          </p>
        </div>

        {/* Tasks Section */}
        <div>
          <div className="flex space-x-4">
            <h4 className="text-lg font-medium text-gray-700 mb-2">
              Assigned Tasks
            </h4>
            {/* <button
              className={`mt-4 px-6 py-2 ${
                user.role == "Admin" ? "bg-blue-500" : "bg-gray-500"
              } text-white rounded-lg`}
              onClick={() => user.handleTasks(user)}
              disabled={!user.role == "Admin"} // Disable the button for non-admins
            >
              Add Task
            </button> */}
          </div>
          <ul className="space-y-2">
            {user.tasks.map((task, index) => (
              <li key={index} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  onClick={() =>
                    user.handleTasks({
                      key: user.index,
                      task: task,
                      action: "delete",
                    })
                  }
                  className="form-checkbox h-5 w-5 text-indigo-500"
                />
                <span className="text-gray-600">{task}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
