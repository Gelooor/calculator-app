import { useCallback, useEffect, useState, createContext } from "react";

import Button from "./components/Button";

export const UserContext = createContext("");

export default function App() {
  const [number, setNumber] = useState({
    current: "0",
    prev: "",
  });
  const [display, setDisplay] = useState("");
  const [operator, setOperator] = useState("");

  const handleClick = useCallback(
    (text: string) => {
      const num = Number(text);
      if (Number.isInteger(num) || text === ".") {
        numberHandleClick(text);
      } else {
        switch (text) {
          case "C":
            clearHandleClick();
            break;
          case "+-":
            reverseHandleClick();
            break;
          case "%":
            percentHandleClick();
            break;
          case "=":
            equalHandleClick();
            break;
          // case ".":
          //   decimalHandleClick(text);
          default:
            operatorHandleClick(text);
        }
      }
    },
    [number.current, number.prev, operator, display]
  );

  const numberHandleClick = (text: string) => {
    if (number.current.includes(".") && text === ".") return;

    setNumber({
      ...number,
      current: number.current !== "0" ? number.current + text : text,
    });
  };

  const clearHandleClick = () => {
    setNumber({ ...number, current: "0", prev: "" });
    setOperator("");
  };

  const reverseHandleClick = () => {
    setNumber({ ...number, current: (Number(number.current) * -1).toString() });
  };

  const percentHandleClick = () => {
    setNumber({
      ...number,
      current: (Number(number.current) / 100).toString(),
    });
  };

  const equalHandleClick = () => {
    let calculation = "";
    switch (operator) {
      case "/":
        calculation = String(Number(number.prev) / Number(number.current));
        break;
      case "x":
        calculation = String(Number(number.prev) * Number(number.current));
        break;
      case "-":
        calculation = String(Number(number.prev) - Number(number.current));
        break;
      case "+":
        calculation = String(Number(number.prev) + Number(number.current));
        break;
      default:
        return;
    }

    setDisplay("");
    setNumber({ ...number, current: "", prev: calculation });
  };

  // not working
  const decimalHandleClick = (text: string) => {
    if (!number.current.includes(".")) {
      setNumber({ ...number, current: number.current + text });
    }
  };

  const operatorHandleClick = (text: string) => {
    setOperator(text);

    if (number.prev !== "") {
      equalHandleClick();
    } else {
      setNumber({
        ...number,
        current: "",
        prev: number.current,
      });
    }
  };

  useEffect(() => {
    setDisplay(number.current);
  }, [number.current]);

  // useEffect(() => {
  //   setDisplay("0");
  // }, []);

  return (
    <div className='h-screen bg-yellow-400 flex justify-center items-center text-white'>
      <div className='grid gap-2 bg-gray-800 p-2 rounded-md'>
        <div className='bg-gray-700 p-3 rounded-md'>
          <input
            type='text'
            disabled
            value={display ? display : number.prev}
            className='bg-transparent text-white text-right text-4xl w-60'
          />
        </div>
        <div className='grid grid-cols-4 gap-2'>
          {[
            ["C", "+-", "%", "/"],
            ["7", "8", "9", "x"],
            ["4", "5", "6", "-"],
            ["1", "2", "3", "+"],
            ["0", ".", "="],
          ].map((arr: string[]) => {
            return arr.map((text: string, index: number) => {
              return (
                <UserContext.Provider value={text}>
                  <Button key={index} handleClick={handleClick} />
                </UserContext.Provider>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
}
