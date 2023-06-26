import { For } from "brace-js";
const skills = [
  {
    icon: 'bxl-html5',
    title: 'HTML',
    description: 'I have a strong foundation in HTML5 and can create semantic, accessible markup. I strive to write clean, maintainable code that adheres to best practices.',
    brand: 'orange-800'
  },
  {
    icon: 'bxl-css3',
    title: 'CSS',
    description: 'I have a solid understanding of CSS3 and can create responsive, visually appealing designs. I am proficient in using CSS frameworks like Bootstrap and Tailwind CSS.',
    brand: 'blue-500'
  },
  {
    icon: 'bxl-javascript',
    title: 'JavaScript',
    description: 'I am proficient in JavaScript and have experience working with modern frameworks like React and Angular. I strive to write modular, reusable code that is easy to maintain.',
    brand: 'yellow-400'
  },
  {
    icon: 'bxl-react',
    title: 'React',
    description: 'I have experience building complex applications with React and Redux. I am proficient in using popular libraries and tools like React Router, Axios, and Jest.',
    brand: 'cyan-600'
  },
  {
    icon: 'bxl-bootstrap',
    title: 'BraceJs',
    description: 'I am familiar with BraceJS and its core functionalities. I have created projects using BraceJS and its associated modules.',
    brand: 'indigo-500'
  },
  {
    icon: 'bxl-tailwind-css',
    title: 'Tailwind',
    description: 'I am proficient in using Tailwind CSS and its utility classes to rapidly prototype and style web applications. I am familiar with its configuration options and plugins.',
    brand: 'cyan-300'
  },
  {
    icon: 'bxl-angular',
    title: 'Angular',
    description: 'I have experience building complex applications with Angular and RxJS. I am proficient in using popular libraries and tools like Angular Material, NgRx, and Karma.',
    brand: 'red-500'
  },
  {
    icon: 'bxl-git',
    title: 'Git',
    description: 'I am proficient in using Git for version control and collaborative development. I am familiar with common Git workflows like Gitflow and the GitHub workflow.',
    brand: 'git'
  }
];

function animateElement({ target }) {
  target.style.animation = 'slide-in-rev 0.5s ease-in-out';
    target.style.opacity = 1;
  return () => {
    // target.style.animation = '';
    // target.style.opacity = 0;
  }
}

function SkillItem({ skill }) {
  let classes = "";
  switch (skill.brand) {
    case "orange-800":
      classes = "border hover:border-orange-800 hover:shadow-md hover:text-orange-800";
      break;
    case "blue-500":
      classes = "border hover:border-blue-500 hover:shadow-md hover:text-blue-500";
      break;
    case "yellow-400":
      classes = "border hover:border-yellow-400 hover:shadow-md hover:text-yellow-400";
      break;
    case "cyan-600":
      classes = "hover:text-cyan-600 border hover:border-cyan-600 hover:shadow-md";
      break;
    case "indigo-500":
      classes = "hover:text-indigo-500 border hover:border-indigo-500 hover:shadow-md";
      break;
    case "cyan-300":
      classes = "hover:text-cyan-300 border hover:border-cyan-300 hover:shadow-md";
      break;
    case "red-500":
      classes = "hover:text-red-500 border hover:border-red-500 hover:shadow-md";
      break;
    case "git":
      classes = "hover:text-[#ff5600] border hover:border-[#ff5600] hover:shadow-md";
      break;
    default:
      classes = "";
      break;
  }
  return (
    <div className={`p-4 rounded-2xl flex flex-col items-center bg-white
    transition-all text-gray-800 ${classes}`} use:visible={({target}) => {
        target.style.animation = 'fade-in 0.9s ease-in';
        target.style.display = 'flex';
        return () => {
        // target.style.animation = '';
        // target.style.display = 'hidden';
      }
    }}>
      <div className="rounded-full w-20 h-20 flex justify-center items-center mb-4">
        <i className={`bx ${skill.icon} text-8xl`}></i>
      </div>
      <h3 className="text-lg font-bold mb-2">{skill.title}</h3>
      <p className={`text-gray-600 font-semibold text-center`}>{skill.description}</p>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="bg-white" id="skills">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-4xl text-center font-extrabold mb-4 text-blue-900">
          <span className="bg-gradient-to-r from-yellow-600 to-amber-400 text-transparent bg-clip-text">
            My Stacks
          </span>
        </h2>
        <p className="text-lg text-center font-semibold my-6 mx-auto text-gray-600">
          Here are some of the technologies I'm proficient in:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" use:visible={animateElement}>
          {skills.map((skill, index) => (
            <SkillItem key={index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}

