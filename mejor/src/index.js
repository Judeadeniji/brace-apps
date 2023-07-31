import "./index.css"
import { Mount, createElement, Component$ } from "mejor";

const Div = Component$(({ children, ...props }) => {
  return <div {...props}>{children}</div>;
});

const Header = Component$(() => {
  return (
    <header class="py-6 bg-white text-center">
      <h1 class="text-4xl font-bold">Welcome to Mejor Landing Page</h1>
      <p class="mt-4 text-xl">The best library for building web interfaces</p>
    </header>
  );
});

const Features = Component$(() => {
  return (
    <section
      class="py-12 px-2 bg-gray-200"
      use:animation={{
        keyframes: [
          { opacity: 0, transform: 'translateY(50px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        options: {
          duration: 1000,
          easing: 'ease-in-out',
          fill: 'forwards',
        },
        onviewPort: true,
      }}
    >
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center mb-8">Features</h2>
        <div class="grid gap-8 md:grid-cols-2">
          <div>
            <h3 class="text-xl font-bold">Simple and Intuitive API</h3>
            <p class="mt-2">Mejor provides an easy-to-use API that allows you to create components and handle UI updates effortlessly.</p>
          </div>
          <div>
            <h3 class="text-xl font-bold">Reactive Architecture</h3>
            <p class="mt-2">With Mejor's reactive architecture, your web applications will be dynamic and interactive, reacting to changes efficiently.</p>
          </div>
        </div>
      </div>
    </section>
  );
});

const AboutMejor = Component$(() => {
  return (
    <section
      class="py-12 px-2 bg-white"
      use:animation={{
        keyframes: [
          { opacity: 0, transform: 'translateY(50px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        options: {
          duration: 1000,
          easing: 'ease-in-out',
          fill: 'forwards',
        },
        onviewPort: true,
      }}
    >
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center mb-8">About Mejor</h2>
        <p class="text-xl text-center">Mejor is a powerful JavaScript library that simplifies the process of building modern web interfaces. It empowers developers to create engaging, responsive, and interactive applications with ease.</p>
      </div>
    </section>
  );
});

const Contact = Component$(() => {
  return (
    <section
      class="py-12 px-2 bg-gray-200"
      use:animation={{
        keyframes: [
          { opacity: 0, transform: 'translateY(50px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        options: {
          duration: 1000,
          easing: 'ease-in-out',
          fill: 'forwards',
        },
        onviewPort: true,
      }}
    >
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center mb-8">Contact</h2>
        <form class="max-w-md mx-auto">
          <div class="mb-4">
            <label for="name" class="block mb-2 font-bold">Name</label>
            <input type="text" id="name" class="w-full px-4 py-2 border rounded" placeholder="Your name" required />
          </div>
          <div class="mb-4">
            <label for="email" class="block mb-2 font-bold">Email</label>
            <input type="email" id="email" class="w-full px-4 py-2 border rounded" placeholder="Your email" required />
          </div>
          <div class="mb-4">
            <label for="message" class="block mb-2 font-bold">Message</label>
            <textarea id="message" class="w-full px-4 py-2 border rounded" placeholder="Your message" rows="4" required></textarea>
          </div>
          <button type="submit" class="w-full px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600">Send Message</button>
        </form>
      </div>
    </section>
  );
});

const App = Component$(() => {
  return (
    <div>
      <Header />
      <Features />
      <AboutMejor />
      <Contact />
    </div>
  );
});

Mount(() => <App />, document.querySelector("#root"));