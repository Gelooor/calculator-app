interface IButtonProps {
  text: string;
  handleClick: Function;
}

export default function Button({ text, handleClick }: IButtonProps) {
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
