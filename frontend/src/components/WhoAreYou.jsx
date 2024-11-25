import Card from "./Card";
export default function Who({ setRole }) {
  return (
    <div className="flex flex-col  bg-white mx-2 px-6 rounded-lg w-1/3 h-80 font-cursive p-6 shadow-xl space-y-4 px-2	">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <img
          src="think.jpg"
          alt="panda sneak"
          className="w-20 h-20 rounded-full rounded-full border-zinc-600 border-2	"
        />
        <h1 className="font-bold text-2xl">Who Are You?</h1>
      </div>

      {/* Cards Section */}
      <div className="flex justify-center gap-x-6">
        <Card role="Admin" setRole={setRole} image="admin.jpg" />
        <Card role="Manager" setRole={setRole} image="manager.jpg" />
        <Card role="Guest" setRole={setRole} image="guest.jpeg" />
      </div>
    </div>
  );
}
