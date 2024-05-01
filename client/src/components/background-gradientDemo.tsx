"use client";
import { Link } from "react-router-dom";
import { BackgroundGradient } from "./ui/background-gradient";

export function BackgroundGradientDemo({image, name, description, link}: {image: string, name: string, description: string, link: string}) {
  return (
    <div className="border rounded-[22px] shadow-2xl">
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 dark:bg-zinc-900">
        <img
          src={image}
          alt="product image"
          height="400"
          width="400"
          className="object-contain"
        />
        <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {name}
        </p>

        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
        <Link to={link}>
        <button className="rounded-full px-4 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <span>More info </span>
        </button>
        </Link>
      </BackgroundGradient>
    </div>
  );
}
