import { memo } from "brace-js";
import { showMenu } from "./footer";
import scrollTo from "../helper/scroll";

function Header() {
  return (
   <header class="flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8
   top-0 absolute left-0 right-0 z-10 backdrop-blur-sm" id="header">
  <div>
    <a class="font-bold text-xl text-gray-50
    hover:text-amber-400 uppercase">Apex</a>
  </div>
<div class="block md:hidden">
  <button id="menu-toggle" class="flex items-center justify-center w-10 h-10
  bg-white hover:bg-transparent border  hover:border-white hover:text-white
  text-black-200 rounded-full focus:outline-none" on:click={() => showMenu.set(true)}>
    <i class='bx bx-menu-alt-left text-3xl'></i>
  </button>
</div>

  <nav class="hidden md:block">
    <ul class="flex space-x-4">
      <li><a on:click={() => scrollTo('.content')} class="text-white hover:text-yellow-600">Home</a></li>
      <li><a on:click={() => scrollTo('#projects')} class="text-white hover:text-yellow-600">Projects</a></li>
      <li><a on:click={() => scrollTo('#skills')} class="text-white hover:text-yellow-600">Skills</a></li>
      <li><a on:click={() => scrollTo('#contact')} class="text-white hover:text-yellow-600">Contact</a></li>
    </ul>
  </nav>
</header>
    )
}
export default memo(Header);