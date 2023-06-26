import { createData, memo } from "brace-js";
import scrollTo from "../helper/scroll";
import bgImage from "../assets/output2.jpg";
import heroImage from "../assets/hero-image.png";
import heroImagePl from "../assets/hero-placeholder.jpg";

function textValue(h1) {
  const typingSpeed = 95; // adjust this to change the typing speed

  const nameValue = "Hi, I'm Adeniji Oluwaferanmi";
  let i = 0;
  let prevChar = '';
  const typeTextValue = setInterval(() => {
    if (i < nameValue.length) {
       h1.innerText = prevChar + nameValue.charAt(i); // append next character
       prevChar += nameValue.charAt(i); // store the prev character
      i++;
    } else {
      clearInterval(typeTextValue);
    }
  }, typingSpeed);
}


const HeroImage = memo(function HeroImage() {
  return (
          <div class="md:col-span-1">
            <img
              src={heroImagePl}
              alt="Hero Image"
              class="w-full h-auto rounded-lg shadow-lg" width="640" height="480"
              use:visible={({ target }) => (target.src === heroImagePl ? target.src = heroImage : null)}/>
          </div>
    )
})

export default function Hero() {
    const backgroundStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  };
  return (
    <section
      class="backdrop-blur-3xl bg-no-repeat bg-blend-overlay"
      style={backgroundStyle} id="hero">
      <div class="container mx-auto px-4 py-32 sm:px-6 lg:px-8 z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div class="md:col-span-1">
            <h1 class="text-gray-300 text-4xl md:text-5xl font-extrabold mb-4"
            bind:this={textValue} />
            <p class="text-gray-300 text-xl md:text-2xl mb-8">
              I'm a web developer passionate about creating modern and
              responsive web applications.
            </p>
           <div class="flex items-center justify-items-start">
            <button
              on:click={() => scrollTo("#projects")}
              class="bg-black-1000 text-black-100 py-3 px-4 rounded-md font-bold
              hover:bg-blue-700 hover:text-white hover:py-2 hover:px-3
              duration-100 flex-shrink transition-all"
            >
              View My Work
            </button>
            </div>
          </div>
          <HeroImage />
        </div>
      </div>
    </section>
  );
}
