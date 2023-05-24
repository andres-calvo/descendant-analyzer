import { animated, useTransition } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";
import { ArraySubscription } from "../utils/array-subscription";
import { analizeString } from "../utils/main";
export const AnimatedPila = () => {
  const [pila, setPila] = useState(["$", "E"]);
  const [stringToAnalize, setStringToAnalize] = useState("");

  const transitions = useTransition(pila, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0, color: "red" },
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const currentTimeline = useRef(300);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (stringToAnalize.length == 0) return;
    const timeoutsArr: Array<number> = [];
    const arraySubscription = new ArraySubscription({
      onPush: (newItems) => {
        currentTimeline.current = currentTimeline.current + 1000;
        newItems.forEach((item, i) => {
          currentTimeline.current = currentTimeline.current + 300;

          timeoutsArr.push(
            setTimeout(() => {
              setPila((prevPila) => prevPila.concat(item));
            }, currentTimeline.current)
          );
        });
      },
      onPop: () => {
        currentTimeline.current = currentTimeline.current + 500;
        timeoutsArr.push(
          setTimeout(() => {
            setPila((prevPila) => {
              //Si es el ultimo elemento a remover, habilita el boton de analizar
              if (prevPila.length == 1) {
                setIsAnimating(false);
                currentTimeline.current = 300;
              }
              return prevPila.slice(0, -1);
            });
          }, currentTimeline.current)
        );
      },
    });
    analizeString(stringToAnalize, arraySubscription);
    setIsAnimating(true);
    return () => {
      timeoutsArr.forEach((timeout) => {
        clearTimeout(timeout);
      });
    };
  }, [stringToAnalize]);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl  mt-10 ">
      <form
        className="flex w-full  gap-2 "
        onSubmit={(e) => {
          e.preventDefault();
          const input = inputRef.current;
          const newString = input?.value ?? "";
          if (newString.length == 0) return;
          setStringToAnalize(newString + " $");
          setPila(["$", "E"]);
        }}
      >
        <input
          type="text"
          name=""
          ref={inputRef}
          id="stringToAnalize"
          className="w-full flex-1 shadow-xl rounded-xl p-2"
          placeholder="Ej: num + id * num"
        />
        <button
          className="bg-blue-500 text-white p-2 shadow-lg rounded-xl disabled:opacity-30 disabled:cursor-not-allowed"
          type="submit"
          disabled={isAnimating}
        >
          Analizar
        </button>
      </form>
      <ul className="flex   flex-col-reverse w-52 min-h-[18rem]">
        {transitions((style, item) => (
          <animated.div
            style={style}
            className={
              "odd:bg-white border-b even:bg-gray-50 text-4xl flex justify-center"
            }
          >
            {item}
          </animated.div>
        ))}
      </ul>
      <span>Pila</span>
    </div>
  );
};
