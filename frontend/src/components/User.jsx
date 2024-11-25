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
          <p className="text-md text-gray-500">{user.role}</p>
        </div>

        {/* Tasks Section */}
        <div>
          <h4 className="text-lg font-medium text-gray-700 mb-2">
            Assigned Tasks
          </h4>
          <ul className="space-y-2">
            {user.tasks.map((task) => (
              <li key={task} className="flex items-center gap-3">
                <input
                  type="checkbox"
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
