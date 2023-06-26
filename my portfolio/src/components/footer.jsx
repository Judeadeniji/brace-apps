import { createData, If } from "brace-js";
import scrollTo from "../helper/scroll";
import { Core } from "utiliti-js";
const http = new Core.Http();
export const showMenu = createData(false);

export default function Footer() {
  return (
    <footer class="bg-gray-200 text-white" id="footer">
      <Contact />
      <div class="mt-3 px-4 py-6 sm:px-6 md:flex md:justify-between">
        <div class="flex justify-center md:order-2">
          <a
            href="https://github.com/Judeadeniji"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 hover:text-white mx-3"
          >
            <span class="sr-only">GitHub</span>
            <i class="bx bxl-github text-2xl" style={{ color: "#6B7280" }}></i>
            <span class="sr-only">(opens in new tab)</span>
          </a>
          <a
            href="https://www.linkedin.com/in/oluwaferanmi-adeniji-537416252"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 hover:text-white mx-3"
          >
            <span class="sr-only">LinkedIn</span>
            <i
              class="bx bxl-linkedin text-2xl"
              style={{ color: "#6B7280" }}
            ></i>
            <span class="sr-only">(opens in new tab)</span>
          </a>
          <a
            href="https://twitter.com/feranmiwebdev"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 hover:text-white mx-3"
          >
            <span class="sr-only">Twitter</span>
            <i class="bx bxl-twitter text-2xl" style={{ color: "#6B7280" }}></i>
            <span class="sr-only">(opens in new tab)</span>
          </a>
        </div>
        <div class="mt-8 md:mt-0 md:order-1">
          <p class="text-center text-base font-semibold text-gray-700">
            &copy; 2023{" "}
            <span
              class="text-black
            hover:text-blue-700 font-bold"
            >
              Adeniji Oluwaferanmi
            </span>{" "} • All rights reserved.
          </p>
        </div>
      </div>
      {showMenu.value ?
        <Modal /> :
        <comment>
          Menu Modal
        </comment>
      }
    </footer>
  );
}

const formData = createData({});
const Stats = createData("idle");
const isPending = createData(false);

async function handleSubmit(e, DataForm) {
  isPending.set(true);
  e.preventDefault();
  const formValue = new DataForm(e.target);
  formValue.forEach((value, key) =>
    formData.mutate({ [key]: value }, { silent: true })
  );

  e.target.reset();
  const response = await http.post(
    "https://port-api.onrender.com/api/contact",
    formData.value,
    {
      "Content-Type": "application/json",
    }
  );
  const data = await response.json();
  if (!response.ok || data?.error) {
    isPending.set(false);
    Stats.set("error");
    console.error("something went wrong");
  }
  isPending.set(false);
  Stats.set("success");
}

function Contact() {
  return (
    <section class="bg-gray-100 py-16" id="contact">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-lg mx-auto">
          <h2
            class="text-3xl font-extrabold text-gray-900 sm:text-4xl
      md:text-center"
          >
            <span
              class="bg-gradient-to-r from-blue-800 to-blue-600
        text-transparent bg-clip-text"
            >
              Get in touch
            </span>
          </h2>
          <p class="mt-4 text-lg text-gray-600">
            Fill out the form below to send us a message and we'll get back to
            you as soon as possible!
          </p>
          <form
            class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
            use:formData={handleSubmit}
            type="reset"
          >
            <div>
              <label for="name" class="block text-lg font-medium text-gray-700">
                Name
              </label>
              <div class="mt-1">
                <input
                  type="hidden"
                  name="subject"
                  value="from BraceJs portfolio"
                  required
                />
                <input
                  type="text"
                  name="name"
                  id="name"
                  autocomplete="given-name"
                  class="py-3 px-4 block w-full shadow-sm border-gray-300
            focus:ring-blue-700 focus:border-blue-700 rounded-md text-black-0"
                  required
                />
              </div>
            </div>
            <div>
              <label
                for="email"
                class="block text-lg font-medium text-gray-700"
              >
                Email
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  class="py-3 px-4 block w-full shadow-sm border-gray-300
            focus:ring-blue-700 focus:border-blue-700 rounded-md text-black-0"
                  required
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                for="message"
                class="block text-lg font-medium text-gray-700"
              >
                Message
              </label>
              <div class="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  class=" text-gray-800
            py-3 px-4 block w-full shadow-sm border-gray-300 focus:ring-blue-700
            focus:border-blue-700 rounded-md"
                  required
                ></textarea>
              </div>
            </div>
            <div class="sm:col-span-2">
              <button
                type="submit"
                class="w-full inline-flex justify-center py-2 border border-transparent shadow-sm text-lg font-medium
          rounded-md text-white bg-black-700 hover:bg-blue-700 focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disable={isPending.value}
              >
                {isPending.value ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
          {Stats.value === "success" ? (
            <Alert type={Stats.value} />
          ) : (
            <comment>Alert Modal</comment>
          )}
        </div>
      </div>
    </section>
  );
}

const Alert = ({ type }) => {
  setTimeout(() => Stats.set("idle"), 5000);
  return (
    <div
      class="bg-green-100 border border-green-400 text-green-700 px-4 py-3
rounded relative mt-5"
      role="alert"
      animate={{
        keyframes: [
          { opacity: 0.4, transform: "translateY(50px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        options: {
          duration: 350,
          fill: "forwards",
          easing: "ease-in-out",
        },
      }}
    >
      <strong class="font-bold">Success!</strong>
      <span class="block sm:inline">Your message has been sent.</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          class="fill-current h-6 w-6 text-green-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 5.652a.999.999 0 1 0-1.414 1.414L11 7.414l-1.934 1.934a.999.999 0 1 0 1.414 1.414L12.414 9l1.934 1.934a.999.999 0 1 0 1.414-1.414L13.828 7l1.52-1.52z" />
        </svg>
      </span>
    </div>
  );
};

function Modal() {
  return (
    <div
      class="fixed z-20 inset-0 overflow-y-auto"
      animate={{
        keyframes: [
          { opacity: 0.4, backdropFilter: "blur(0)" },
          { opacity: 1, backdropFilter: "blur(12px)" },
        ],
        options: {
          duration: 300,
          fill: "forwards",
        },
      }}
    >
      <div
        class="flex items-center justify-center min-h-screen
      overflow-hidden"
      >
        <div
          class="fixed inset-0 backdrop-blur-sm bg-blend-darken"
          on:click={() => showMenu.set(false)}
        ></div>
        <div
          class="relative bg-white rounded-lg w-fit sm:max-w-screen-sm
        md:max-w-screen-md lg:max-w-screen-lg mx-4 md:mx-auto p-8"
        >
          <div class="absolute top-0 right-0 mt-4 mr-4">
            <button
              class="text-gray-600 hover:text-gray-800
            focus:outline-none"
              on:click={() => showMenu.set(false)}
            >
              <i class="bx bx-x text-2xl"></i>
            </button>
          </div>
          <div class="text-center">
            <div class="flex flex-col justify-center">
              <p
                class="block text-gray-700 hover:text-blue-600
              py-2"
                on:click={() => {
                  showMenu.set(false);
                  scrollTo("#top");
                }}
              >
                Home
              </p>
              <p
                class="block text-gray-700 hover:text-blue-600
              py-2"
                on:click={() => {
                  showMenu.set(false);
                  scrollTo("#projects");
                }}
              >
                Projects
              </p>
              <p
                class="block text-gray-700 hover:text-blue-600
              py-2"
                on:click={() => {
                  showMenu.set(false);
                  scrollTo("#skills");
                }}
              >
                Skills
              </p>
              <p
                class="block text-gray-700 hover:text-blue-600
              py-2"
                on:click={() => {
                  showMenu.set(false);
                  scrollTo("#contact");
                }}
              >
                Contact
              </p>
            </div>
            <div class="flex flex-row items-center justify-center mt-8">
              <a href="https://github.com/Judeadeniji" class="text-black-0 hover:text-blue-600 mx-4">
                <i class="bx bxl-github text-2xl"></i>
              </a>
              <a href="/" class="text-gray-500 hover:text-gray-600 mx-4">
                <i class="bx bxs-moon text-2xl"></i>
              </a>
              <a href="https://twitter.com/feranmiwebdev" class="text-black-0 hover:text-blue-600 mx-4">
                <i class="bx bxl-twitter text-2xl"></i>
              </a>
              <a
              href="https://www.linkedin.com/in/oluwaferanmi-adeniji-537416252"
              class="text-black-0 hover:text-blue-400 mx-4">
                <i class="bx bxl-linkedin text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
