// interface IButtonProps {
//   text: string;
//   handleClick: Function;
// }

import { useContext } from "react";
import { UserContext } from "../App";

interface IButtonProps {
  handleClick: Function;
}

export default function Button({ handleClick }: IButtonProps) {
  const text = useContext(UserContext);
  return (
    <button
      onClick={() => handleClick(text)}
      className={`p-5 rounded-md font-bold ${
        text !== "="
          ? "bg-indigo-600 hover:bg-indigo-800"
          : "bg-red-600 hover:bg-red-800 col-span-2"
      }`}
    >
      {text}
    </button>
  );
}
