"use client";
import { useSelector, useDispatch } from "react-redux";
import { toggleToBC, toggleToFF } from "@/redux/slices/gameslice";
import Image from "next/image";

const Gameselection = () => {
  const game = useSelector((state) => state.game.value);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const language = useSelector((state) => state.lan.language);

  return (
    <div
    style={{
      backgroundImage: 'url("/assets/game-selection-bg.png")',
      direction: language === "ar" ? "ltr" : "rtl",
    }}
    className="bg-[#efefef] w-full h-[200px] flex items-end flex-col justify-center pt-6"
  >
    <div className="mx-auto flex flex-col w-full max-w-5xl items-end justify-between px-3 md:px-4">
      <p className="font-ar text-2xl font-bold mb-5">
        {language === "en" ? "Game Selection" : "اختيار اللعبة"}
      </p>
      <div className="flex items-center justify-end gap-8">
        {user.loggedIn ? (
          <>
            {user.game === "blackclover" ? (
              <div
                onClick={() => dispatch(toggleToBC())}
                className="flex items-center gap-2 justify-center flex-col"
              >
                <Image
                  className={`${
                    game === "blackclover" && "border-4 rounded-[20px] border-[#d81a0d]"
                  } hover:cursor-pointer`}
                  src="/assets/blackclover-selector.png"
                  alt="selector"
                  height={80}
                  width={80}
                />
                <p
                  className={
                    game === "blackclover"
                      ? "font-custom font-semibold text-[#d81a0d]"
                      : "font-custom font-[500] text-[15px]"
                  }
                >
                  Black Clover M
                </p>
              </div>
            ) : (
              <div
                onClick={() => dispatch(toggleToFF())}
                className="flex items-center gap-2 justify-center flex-col"
              >
                <Image
                  className={`${
                    game === "freefire" && "border-4 rounded-[20px] border-[#d81a0d]"
                  } hover:cursor-pointer`}
                  src="/assets/freefire-selector.png"
                  alt="selector"
                  height={80}
                  width={80}
                />
                <p
                  className={
                    game === "freefire"
                      ? "font-custom font-semibold text-[#d81a0d]"
                      : "font-custom font-[500] text-[15px]"
                  }
                >
                  Free Fire
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <div
              onClick={() => dispatch(toggleToBC())}
              className="flex items-center gap-2 justify-center flex-col"
            >
              <Image
                className={`${
                  game === "blackclover" && "border-4 rounded-[20px] border-[#d81a0d]"
                } hover:cursor-pointer`}
                src="/assets/blackclover-selector.png"
                alt="selector"
                height={80}
                width={80}
              />
              <p
                className={
                  game === "blackclover"
                    ? "font-custom font-semibold text-[#d81a0d]"
                    : "font-custom font-[500] text-[15px]"
                }
              >
                Black Clover M
              </p>
            </div>
            <div
              onClick={() => dispatch(toggleToFF())}
              className="flex items-center gap-2 justify-center flex-col"
            >
              <Image
                className={`${
                  game === "freefire" && "border-4 rounded-[20px] border-[#d81a0d]"
                } hover:cursor-pointer`}
                src="/assets/freefire-selector.png"
                alt="selector"
                height={80}
                width={80}
              />
              <p
                className={
                  game === "freefire"
                    ? "font-custom font-semibold text-[#d81a0d]"
                    : "font-custom font-[500] text-[15px]"
                }
              >
                Free Fire
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
  );
};

export default Gameselection;