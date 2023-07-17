import { Component } from "@mejor";

export function Metadata () {
  return {
    title: "About Page | The Ordinary E-commerce website"
  }
}

export default Component(() => (
  <section key="about-page" class="mx-auto">
    <div class="flex flex-col about-container bg-white rounded-lg
    shadow-lg">
      <div class="p-6">
        <h1 class="text-4xl font-bold mb-8">About - The <span class="gradient-text">Ordinary</span></h1>
        <p class="text-gray-800 mb-6">The Ordinary is a showcase project created by me, <span class="p-1 border-b-2 border-b-yellow-600 font-semibold">Adeniji Oluwaferanmi</span>, for my web development portfolio. Inspired by the concept of providing high-quality yet affordable products to consumers, this e-commerce web application demonstrates my skills and expertise in front-end development.</p>
        <p class="text-gray-800 mb-6">The objective of The Ordinary is to provide an intuitive and seamless shopping experience for users, while also highlighting the use of various modern web technologies.</p>
        
        <div class="mb-8">
          <h2 class="text-2xl font-bold mb-4">Tech Stacks Used</h2>
         <div class="md:flex w-full flex-row gap-x-2">
          <div class="border hover:shadow-md md:w-1/2 rounded-md p-4 mb-4 bg-white">
            <h3 class="text-xl font-semibold mb-2">Mejor (Brace-js)</h3>
            <p class="text-gray-800">Mejor is a JavaScript framework I utilized to build a scalable and maintainable web application. It forms the foundation of The Ordinary's architecture. It provides an easy-to-use and intuitive syntax for writing efficient and modular JavaScript code.</p>
          </div>
          
          <div class="border hover:shadow-md md:w-1/2 rounded-md p-4 mb-4 bg-white">
            <h3 class="text-xl font-semibold mb-2">Utiliti-js</h3>
            <p class="text-gray-800">Utiliti-js is a JavaScript utility library that enhances common tasks and improves code efficiency within the web app. It provides a collection of helper functions and modules that streamline development and improve overall performance.</p>
          </div>
          
          <div class="border hover:shadow-md md:w-1/2 rounded-md p-4 mb-4 bg-white">
            <h3 class="text-xl font-semibold mb-2">Tailwind CSS</h3>
            <p class="text-gray-800">Tailwind CSS is a highly customizable CSS framework chosen for its ability to rapidly create responsive and visually appealing designs, thereby streamlining the UI development process. It provides a comprehensive set of utility classes that enable developers to build complex layouts with ease.</p>
          </div>
          
          <div class="border hover:shadow-md md:w-1/2 rounded-md p-4 mb-4 bg-white">
            <h3 class="text-xl font-semibold mb-2">JavaScript</h3>
            <p class="text-gray-800">JavaScript is the core programming language I employed to add interactivity and dynamic features, enhancing the overall user experience. It enables The Ordinary to handle user interactions, data manipulation, and communication with external APIs.</p>
          </div>
         </div>
        </div>
        
        <p class="text-gray-800 mb-6">By utilizing these cutting-edge technologies, The Ordinary strives to exemplify my expertise in developing modern, user-centric web applications.</p>
        <p class="text-gray-800 mb-6">The inspiration behind The Ordinary stems from my desire to create an e-commerce platform that offers quality products at affordable prices. By doing so, I aim to contribute to the democratization of online shopping and provide a platform that caters to a wide range of consumers.</p>
        <p class="text-gray-800 mb-6">Thank you for taking the time to explore The Ordinary. It represents my passion for web development and dedication to delivering exceptional user experiences.</p>
        <p class="text-gray-800 mb-6">To see more of my work, please visit <a
        class="p-1 border-b-2 border-b-black font-semibold" href="https://judeadeniji.github.io" target="_blank" rel="noopener
        noreferrer">my portfolio</a>.</p>
      </div>
    </div>
  </section>
));