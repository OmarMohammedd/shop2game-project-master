"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Playerlogincard from "./playerlogincard";
import Topupamountcard from "./topupamountcard";
import { useSelector, useDispatch } from "react-redux";
import { changeLan } from "@/redux/slices/settingsSlice";

const Gamequery = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.lan.language);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      dispatch(changeLan(savedLanguage));
    }
  }, [dispatch]);

  const game = useSelector((state) => state.game.value);
  return (
    <div
      style={{
        direction: language === "ar" ? "ltr" : "rtl",
      }}
      className="w-full h-fit flex flex-col items-center justify-end py-8 px-5 "
    >
      <div
        style={{
          marginBottom: "-1rem",
          direction: language === "en" ? "ltr" : "rtl",
        }}
        className="w-full max-w-5xl"
      >
        <div className="relative flex items-center overflow-hidden transition-all">
          <div
            className={`absolute h-full w-full rounded-t-lg bg-[#BDBDC5] bg-cover bg-center ${
              game === "freefire" || game === "blackclover"
                ? language === "ar" ? "transform scale-x-[-1]": ""
                : ""
            } lg:rounded-lg`}
            style={{
              backgroundImage:
                game === "freefire"
                  ? 'url("https://cdn-gop.garenanow.com/gop/mshop/www/live/assets/FF-2cb78e7c.jpg")'
                  : game === "blackclover"
                  ? 'url("https://cdn-gop.garenanow.com/gop/mshop/www/live/assets/BCM-cdbb237f.jpg")'
                  : "none",
            }}
          ></div>

          <div className="relative flex items-center p-4 lg:p-6">
            <img
              className="h-11 w-11 lg:h-[72px] lg:w-[72px]"
              src={
                game === "freefire"
                  ? "https://cdn-gop.garenanow.com/gop/app/0000/100/067/icon.png"
                  : game === "blackclover"
                  ? "https://cdn-gop.garenanow.com/gop/app/0000/100/130/icon.png"
                  : ""
              }
            />

            <div className="ms-3 flex flex-col items-start lg:ms-5">
              <div className="mb-1 text-base/none font-bold text-white lg:text-2xl/none">
                {game === "freefire"
                  ? "Free Fire"
                  : game === "blackclover"
                  ? "Black Clover M"
                  : ""}
              </div>

              <div className="flex items-center rounded border border-white/50 bg-black/[0.65] px-1.5 py-[5px] text-xs/none font-medium text-white lg:text-sm/none">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="me-1"
                >
                  <path
                    d="M54.125 34.1211C55.2966 32.9495 55.2966 31.05 54.125 29.8784C52.9534 28.7069 51.0539 28.7069 49.8823 29.8784L38.0037 41.7571L32.125 35.8784C30.9534 34.7069 29.0539 34.7069 27.8823 35.8784C26.7108 37.05 26.7108 38.9495 27.8823 40.1211L35.8823 48.1211C37.0539 49.2926 38.9534 49.2926 40.125 48.1211L54.125 34.1211Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M43.4187 3.4715C41.2965 2.28554 38.711 2.28554 36.5889 3.4715L8.07673 19.4055C6.19794 20.4555 4.97252 22.4636 5.02506 24.7075C5.36979 39.43 10.1986 63.724 37.0183 76.9041C38.8951 77.8264 41.1125 77.8264 42.9893 76.9041C69.809 63.724 74.6377 39.43 74.9825 24.7075C75.035 22.4636 73.8096 20.4555 71.9308 19.4055L43.4187 3.4715ZM39.5159 8.7091C39.8191 8.53968 40.1885 8.53968 40.4916 8.7091L68.9826 24.6313C68.6493 38.3453 64.2154 59.7875 40.343 71.5192C40.135 71.6214 39.8725 71.6214 39.6646 71.5192C15.7921 59.7875 11.3583 38.3453 11.025 24.6313L39.5159 8.7091Z"
                    fill="currentColor"
                  />
                </svg>{" "}
                {language === "en" ? "100% Secure Payment" : "100% الدفع الآمن"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" max-w-5xl" style={{ direction: language === "ar" ? "rtl" : "ltr"  ,width:'100%' }}>
        <Playerlogincard />
      </div>
      <Topupamountcard />
    </div>
  );
};

export default Gamequery;
