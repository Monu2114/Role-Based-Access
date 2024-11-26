// Card for Who Are You page
export default function Card(card) {
  return (
    <div
      className="h-28 bg-indigo-50 rounded-lg "
      onClick={() => {
        card.setRole(card.role);
        card.setWho(false);
        console.log(` ${card.role} card clicked`); // Debug log
      }}
    >
      <div className="flex flex-col items-center gap-y-4 bg-indigo-100 rounded-lg shadow-md hover:shadow-2xl hover:bg-indigo-200 transition-all duration-300 p-4 w-36 h-40 transform hover:scale-105">
        <img src={card.image} className="w-20 h-20 rounded-full" alt="pic" />
        {card.role}
      </div>
    </div>
  );
}
