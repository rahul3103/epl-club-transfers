import Image from "next/image";

function Card({ name, yearIn, yearOut, avatar, dragOverlay }) {
  const cursor = dragOverlay ? "cursor-grabbing" : "cursor-grab";
  return (
    <div
      className={`p flex w-fit list-none items-center rounded-lg border border-gray-200 bg-white p-2 shadow  dark:border-gray-700 dark:bg-gray-800 lg:w-full ${cursor}`}
    >
      <Image
        src={avatar}
        alt={name}
        width={32}
        height={32}
        className="h-8 w-8 rounded-full shadow-lg"
      />
      <div className="hidden flex-col lg:flex ">
        <h5 className="text-xs font-medium text-gray-900 dark:text-white">
          {name}
        </h5>
        <span className="text-[10px] text-gray-500 dark:text-gray-400">
          {yearIn} - {yearOut}
        </span>
      </div>
    </div>
  );
}

export default Card;
