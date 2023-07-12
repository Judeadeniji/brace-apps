import HtmlIcon from "@app/assets/svgs/html"
import Css3Icon from "@app/assets/svgs/css3"
import TwIcon from "@app/assets/svgs/tailwind"
import BsIcon from "@app/assets/svgs/bootstrap"
import GitIcon from "@app/assets/svgs/git"
import ReactIcon from "@app/assets/svgs/react"
import JsIcon from "@app/assets/svgs/javascript"
import SvIcon from "@app/assets/svgs/svelte"
import NgIcon from "@app/assets/svgs/angular"


const skills = [
  {
    Icon: HtmlIcon,
    title: 'HTML',
    brand: 'orange-800'
  },
  {
    Icon: Css3Icon,
    title: 'CSS',
    brand: 'blue-500'
  },
  {
    Icon: JsIcon,
    title: 'JavaScript',
    brand: 'yellow-400'
  },
  {
    Icon: SvIcon,
    title: 'Svelte',
    brand: 'red-600'
  },
  {
    Icon: ReactIcon,
    title: 'React',
    brand: 'cyan-600'
  },
  {
    Icon: BsIcon,
    title: 'Bootstrap',
    brand: 'indigo-500'
  },
  {
    Icon: TwIcon,
    title: 'Tailwind',
    brand: 'cyan-300'
  },
  {
    Icon: NgIcon,
    title: 'Angular',
    brand: 'red-500'
  },
  {
    Icon: GitIcon,
    title: 'Git',
    brand: 'git'
  }
];

function animateElement({ target }) {
//  target.style.animation = 'slide-in-rev 0.5s ease-in-out';
    target.style.opacity = 1;
  return () => {
    target.style.animation = '';
    target.style.opacity = 0;
  }
}

function SkillItem({ skill }) {
  let classes = "";
  switch (skill.brand) {
    case "orange-800":
      classes = "text-orange-800";
      break;
    case "blue-500":
      classes = "text-blue-500";
      break;
    case "yellow-400":
      classes = "text-yellow-400";
      break;
    case "cyan-600":
      classes = "text-cyan-600";
      break;
    case "indigo-500":
      classes = "text-indigo-500";
      break;
    case "cyan-300":
      classes = "text-cyan-300";
      break;
    case "red-500":
      classes = "text-red-500";
      break;
    case "red-600":
      classes = "text-red-600";
      break;
    case "git":
      classes = "text-[#ff5600]";
      break;
    default:
      classes = "";
      break;
  }
  return (
    <div class={classes} title={skill.title}>
      <span title={skill.title} class="text-4xl">
        <skill.Icon />
      </span>
    </div>
  );
}

export default function Skills() {
  return (
    <section class="bg-white transition-all duration-1000 opacity-0" id="skills" use:visible={animateElement}>
      <div class="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 class="text-4xl text-center font-extrabold mb-4 text-blue-900">
          <span class="bg-gradient-to-r from-yellow-600 to-amber-400 text-transparent bg-clip-text">
            My Stacks
          </span>
        </h2>
        <p class="text-lg text-center font-semibold my-6 mx-auto text-gray-600">
          Here are some of the technologies I'm proficient in:
        </p>
        <div class="w-full flex flex-row flex-wrap gap-3 justify-center">
          {skills.map((skill, index) => (
            <SkillItem key={index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}

