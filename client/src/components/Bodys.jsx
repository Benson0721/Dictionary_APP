import { useContext } from "react";
import ThemeContext from "../hooks/ThemeContext";
import newWindow from "../assets/icons/icon-new-window.svg";
export function BodyM({ data, listStyle }) {

  const { isNight } = useContext(ThemeContext);
  const { definition, example } = data;

  return (
    <li
      className={`text-[15px] md:text-[18px] font-normal leading-6 mb-3 marker:text-Purple-2 ${listStyle} ${
        isNight ? "text-white" : "text-Black-3"
      } transition duration-400 ease-in-out`}
    >
      {definition}
      {example && example.length ? (
        <i className="block text-gray-500 mt-2">"{example}"</i>
      ) : (
        <></>
      )}
    </li>
  );
}
export function BodyM_Gray({ data }) {

  const { isNight } = useContext(ThemeContext);
  return (
    <p
      className={`text-[18px] font-normal leading-6   ${
        isNight ? "text-Gray-4" : "text-Gray-1"
      } transition duration-400 ease-in-out`}
    >
      {data}
    </p>
  );
}

export function BodyS({ data }) {

  const { isNight } = useContext(ThemeContext);
  return (
    <p
      className={`text-[14px] font-normal leading-6   ${
        isNight ? "text-Gray-4" : "text-Gray-1"
      } transition duration-400 ease-in-out`}
    >
      {data}
    </p>
  );
}
export function BodyS_a({ data }) {

  const { isNight } = useContext(ThemeContext);
  return (
    <a
      href={data}
      className={`text-[14px] font-normal leading-6 inline-block ${
        isNight ? "text-white" : "text-Black-3"
      } underline decoration-solid transition duration-400 ease-in-out md:ml-6`}
    >
      {data}
      <img
        src={newWindow}
        alt="open source url"
        className="inline-block ml-4"
      />
    </a>
  );
}
