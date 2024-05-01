"use client";
import { motion } from "framer-motion";
import { ImagesSlider } from "./ui/images-slider";

export function ImagesSliderDemo() {
  const images = [
    "https://res.cloudinary.com/dfpzyjix2/image/upload/v1713701976/g8xnxiigar9xyexgsfga.jpg",
    "https://res.cloudinary.com/dfpzyjix2/image/upload/v1713702104/ReSculpt/welqbbw4tnvoickj1wt1.jpg",
    "https://res.cloudinary.com/dfpzyjix2/image/upload/v1713702106/ReSculpt/gogmgi9oai6vtwgkrue0.jpg",
  ];
  return (
    <ImagesSlider className="h-64 mt-20 sm:h-screen mt-0" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          ReSculpt <br /> "Transforming Waste Into Opportunity."
        </motion.p>
        {/* <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Join now →</span>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button> */}
      </motion.div>
    </ImagesSlider>
  );
}
