import { Component } from "@mejor";

const Loader = Component(() => (
  <div class="bg-white left-0 right-0 top-0 fixed h-screen w-screen m-0 mx-auto z-50 flex items-center justify-center text-[#3b3b3b]">
    <loader class="touch-none">
      <p class="text-xl md:text-2xl font-bold animate-pulse">The</p>
      <h1 class="leading-[1.75rem] md: leading-[2rem] md:8xl animate-pulse text-4xl font-extrabold">Ordinary.</h1>
    </loader>
  </div>
))


export default Loader