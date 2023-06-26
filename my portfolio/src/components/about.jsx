import aboutImage from "../assets/about-image.png";
import aboutImagePl from "../assets/about-placeholder.jpg";

function animateElement({ target }) {
  target.style.animation = 'slide-in 0.5s ease-in-out';
    target.style.opacity = 1;
  return () => {
    // target.style.animation = '';
    // target.style.opacity = 0;
  }
}


export default function About() {
  
  return (
  <section class="bg-gray-100" id="about">
  <div class="container mx-auto px-4 py-16 sm:px-6 lg:px-8" use:visible={animateElement}>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="md:col-span-2">
      <h2 class="text-3xl font-extrabold sm:text-4xl mb-6 text-center">
        <span className="bg-gradient-to-r from-blue-800 to-blue-600
        text-transparent bg-clip-text" >About Me</span>
      </h2>
        <p class="text-gray-600 text-lg mb-8">Hi, I'm Adeniji Oluwaferanmi. I'm a web developer passionate about creating modern and responsive web applications. I have experience with HTML, CSS, JavaScript, React, and Node.js. I'm always eager to learn new technologies and improve my skills.</p>
        <ul class="text-gray-600 text-lg mb-8">
          <li><span class="font-bold text-black-0">Education:</span> B.S. in Computer Science, University of XYZ (2015-2019)</li>
          <li><span class="font-bold text-black-0">Experience:</span> Web Developer, ABC Company (2019-2022)</li>
          <li><span class="font-bold text-black-0">Skills:</span> HTML, CSS, JavaScript,
          React, Brace.js, Node.js</li>
        </ul>
        <button class="bg-black-0 text-white py-4 px-5 rounded-lg
        font-bold hover:bg-blue-700 transition-colors duration-300">Download
        Resume</button>
      </div>
      <div class="w-full flex content-center items-center sm:mt-10 md:col-span-1">
        <img loading="lazy" src={""}
        alt="About Image" class="w-full rounded-lg shadow-lg" width="640"
        height="640" use:visible={({ target }) => (target.src === globalThis.location.href ?
        target.src = (aboutImage) : null)} />
      </div>
    </div>
  </div>
</section>
    )
}