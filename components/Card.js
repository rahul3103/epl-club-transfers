import Image from "next/image";

function Card({ name, year, transferOut, transferIn, avatar }) {
  return (
    <li className="w-full max-w-md list-none rounded-lg border border-gray-200 bg-white px-4 py-3 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-4 sm:py-4">
      <div className="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <Image
            src={avatar}
            alt={name}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium text-gray-900 dark:text-white">
            {name}
          </p>
          <p class="truncate text-sm text-gray-500 dark:text-gray-400">
            {year}
          </p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <p>{transferIn}</p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          <p>{transferOut}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
