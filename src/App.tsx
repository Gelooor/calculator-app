import { useEffect, useState } from "react";

import Button from "./components/Button";

export default function App() {
  const [number, setNumber] = useState({
    current: "0",
    prev: "",
  });
  const [display, setDisplay] = useState("0");
  const [operator, setOperator] = useState("");

  const handleClick = (text: string) => {
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
  };

  const numberHandleClick = (text: string) => {
    if (!display.includes(".") && text === ".") return;

    setNumber({ ...number, current: number.current + text });
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

  const decimalHandleClick = (text: string) => {
    if (!display.includes(".")) {
      setNumber({ ...number, current: number.current + text });
    }
  };

  const operatorHandleClick = (text: string) => {
    setOperator(text);

    if (number.prev !== "") {
      equalHandleClick();
      // setNumber({
      //   ...number,
      //   current: "0",
      // });
    } else {
      setNumber({
        ...number,
        current: "0",
        prev: number.current,
      });
    }
  };

  useEffect(() => {
    setDisplay(number.current);
  }, [number.current]);

  // const handleClick = (text: string) => {
  //   const value = parseInt(text, 10);

  //   if (!Number.isNaN(value) || text === ".") {
  //     inputNum(text);
  //   } else {
  //     if (text === "C") {
  //       clear();
  //     } else if (text === "+-") {
  //       plusMinus();
  //     } else if (text === "%") {
  //       percent();
  //     } else if (text === "=") {
  //       equals(text);
  //     } else {
  //       operation(text);
  //     }
  //   }
  // };

  // const inputNum = (text: string) => {
  //   // prevents spamming of period
  //   if (currentValue.includes(".") && text === ".") return;

  //   if (total) {
  //     setPrevValue("");
  //   }

  //   // if current value is not empty, concatenate
  //   currentValue || currentValue === "0"
  //     ? setCurrentValue((prevValue) => prevValue + text)
  //     : setCurrentValue(text);
  //   setTotal(false);
  // };

  // const clear = () => {
  //   setCurrentValue("");
  //   setPrevValue("");
  //   setDisplay("0");
  // };

  // const plusMinus = () => {
  //   setCurrentValue((Number(currentValue) * -1).toString());
  // };

  // const percent = () => {
  //   setCurrentValue((Number(currentValue) / 100).toString());
  // };

  // const operation = (text: string) => {
  //   setTotal(false);
  //   setOperator(text);

  //   if (currentValue === "") return;

  //   if (prevValue !== "") {
  //     equals(text);
  //   } else {
  //     setPrevValue(currentValue);
  //     setCurrentValue("");
  //     setDisplay("");
  //   }
  // };

  // const equals = (text: string) => {
  //   if (text === "=") {
  //     setTotal(true);
  //   }

  //   let calculation = "";
  //   switch (operator) {
  //     case "/":
  //       calculation = String(Number(prevValue) / Number(currentValue));
  //       break;
  //     case "x":
  //       calculation = String(Number(prevValue) * Number(currentValue));
  //       break;
  //     case "-":
  //       calculation = String(Number(prevValue) - Number(currentValue));
  //       break;
  //     case "+":
  //       calculation = String(Number(prevValue) + Number(currentValue));
  //       break;
  //     default:
  //       return;
  //   }

  //   setDisplay("");
  //   setPrevValue(calculation);
  //   setCurrentValue("");
  // };

  // useEffect(() => {
  //   setDisplay(currentValue);
  // }, [currentValue]);

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
                <Button key={index} text={text} handleClick={handleClick} />
              );
            });
          })}
        </div>
      </div>
    </div>
  );
}
