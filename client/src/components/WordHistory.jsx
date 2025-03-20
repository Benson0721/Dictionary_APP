export default function WordHistory({ history, searchByClick }) {
  return (
    <nav className="w-full mb-3 md:mb-10">
      <ul className="flex justify-start items-center">
        {history.map((word, idx) => {
          return (
            <li
              onClick={() => {
                searchByClick(word);
              }}
              key={idx}
              className="text-[13px] md:text-[16px] font-medium text-Purple-1 cursor-pointer mr-4"
            >
              {word}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
