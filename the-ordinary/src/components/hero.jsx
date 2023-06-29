import { Component } from "@mejor";
import HeroBg from "@app/static/hero-bg2.jpg";

const text = "Ordinary.";
let i = 0;

function updateText(el) {
 const id = setInterval(function() {
     if (el.textContent.length > 0 && !i) {
       el.innerHTML = '';
     }
    if (i < text.length) {
       el.textContent += text.charAt(i); // append next character
      i++;
    } else {
      clearInterval(id)
    }
  }, 100);
}


const Hero = Component(() => (
  <section class="w-full mt-3">
    <div class="relative flex flex-col w-full">
      <div class="absolute flex-grow left-0 right-0 top-0 bottom-0">
        <img class="w-full rounded flex-grow h-full" src={HeroBg} alt="Hero Background" />
      </div>
      <div class="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div class="md:flex md:flex-row md:items-center">
          <div class="md:w-1/3">
            <div class="mt-6 md:mt-12">
              <p class="font-bold text-2xl">The</p>
              <p class="font-extrabold text-4xl md:text-6xl text-white" bind:this={updateText}>{text}</p>
            </div>
          </div>
          <div class="md:w-2/3"></div>
        </div>
      </div>
    </div>
  </section>
));

export default Hero;