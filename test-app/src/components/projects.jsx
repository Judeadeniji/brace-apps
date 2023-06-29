import { createData, Component } from "brace-js";
import { Core } from "utiliti-js";
import scrollTo from "../helper/scroll";
const http = new Core.Http();
const LoaderUtils = ["","",""]
const projects$ = createData({
  posts: [],
  fetched: false,
});
const host = "https://port-api.onrender.com" 

function Project({ key, data }) {
  const img_url = data.img_url.includes('http') ? data.img_url :
  `${host}${data.img_url}`
  return (
    <div
      class="relative block overflow-hidden rounded-lg h-[250px] md:h-[320px] w-full"
      id={`project-${key}`}
    >
      <img
        class="object-cover w-full h-full transform transition-transform duration-500 hover:scale-110"
        src=""
        alt="Project Image"
        use:visible={({ target }) => (target.src !== img_url ? target.src = (img_url) : null)}
      />
      <div class="absolute inset-0 bg-black-0 bg-opacity-50 flex flex-col items-center justify-center transition-opacity duration-500 opacity-0 hover:opacity-100">
        <h3 class="text-white font-bold text-xl mb-2">{data.title}</h3>
        <p class="text-white text-center mb-4">{data.body}</p>
        <div class="flex justify-center">
          <a
            href={data?.repo || "https://github.com/judeadeniji"}
            class="bg-gray-100 text-gray-800 rounded-full grid
          place-content-center mr-4 py-2 px-4"
          >
            <i class="bx bxl-github bx-sm"></i>
          </a>
          <a
            href={data.link}
            class="bg-gray-100 text-gray-800 rounded-full grid
          place-content-center py-2 px-4"
          >
            <i class="bx bx-link-external bx-sm"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

const Loader2 = Component(function Loader2() {
  return (
    <div
      class="relative block overflow-hidden rounded-lg h-[250px] md:h-[320px] w-full">
      <div
        class="object-cover w-full h-full bg-gradient-to-br from-[#d5d5d5bc]
        to-[#7979796b] transition-all duration-200 ease-linear"
        bind:this={async (img) => {
           const id = setInterval(function() {
             img.style.backgroundColor = img.style.backgroundColor == "rgba(121, 121, 121, 0.42)" ? "rgba(236, 236, 236 , 0.972)" : "rgba(121, 121, 121, 0.42)"
           }, 400);
        }}
        />
    </div>
  );
})

export const Newsletter = Component(function Newsletter() {
  return (
    <section class="bg-black-600 hover:bg-blue-900 py-10 px-2 my-20 mx-auto rounded-2xl
      flex items-center justify-center md:py-16" style={{ width: '94%' }} id="newsletter">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold m-auto mb-4 text-center text-white">
          Don't Miss Out, Sign Up Now!
        </h2>
        <p class="text-md mb-8 text-center text-white">
          Get the latest updates on our projects and collaborations delivered straight to your inbox by signing up for our newsletter today.
        </p>
        <form action="#" method="POST" class="flex flex-col md:flex-row
        justify-center md:h-12">
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            class="bg-transparent text-white border-white border
            rounded-md py-2 md:py-0 px-4 h-full mb-4 md:mr-4 focus:outline-none"
            required
          />
          <button
            type="submit"
            class="bg-[#dddddd] text-black-600 h-full py-2 md:py-0 px-4 rounded-md font-bold hover:bg-white hover:text-blue-800 transition-colors duration-300 md:mt-0"
          >
            Subscribe
          </button>
        </form> 
      </div>
    </section>
  );
})


  http.get(`${host}/api/projects`)
  .then(response => response.json())
  .then(data => projects$.set({ posts:
  data.posts, fetched: true }))
  .catch((error) => {
      // TODO: handle error
  })
  
const ProjectItem = () => {
  return projects$.value.posts.slice(0, 10).map(
    (item, index) => (<Project key={item._id} data={item} />)
  );
};


export function Projects() {
  return (
    <div class="bg-gray-50 shadow-lg rounded-2xl p-8 md:p-12" id="projects">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl text-center font-extrabold mb-4 text-blue-900">
          <span class="bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">
            My Projects
          </span>
        </h2>
        <p class="text-lg text-center font-semibold my-6 mx-auto text-gray-600">
          Explore some of the projects I've built over the years
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects$.value.posts.length > 0 ? ProjectItem() : LoaderUtils.map(() => <Loader2 key={Math.random()} />)}
        </div>
      </div>
    </div>
  );
}
