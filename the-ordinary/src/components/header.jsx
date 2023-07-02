import { Component, useRef,reactive, mergeReactives } from "@mejor";
import { Link } from "@mejor/router";
import { Menu } from "@app/components/reusables";
import { get_total_cart_items } from "@app/services/cart-store";

const show_menu = reactive(false);

const toggle_menu = () => show_menu.value = !show_menu.value;

const CartIcon = () => {
  const total = get_total_cart_items();
  return (
    <Link to="/cart" class="text-xl md:text-2xl relative">
      <i class="bi bi-bag inline-block" />
      <span class="absolute top-0 -right-1 bg-accent rounded-full w-4 h-4 flex items-center justify-center text-white text-[10px]">
        {total}
      </span>
    </Link>
  )
};

const CatalogList = Component(() => (
  <div class="bg-white overflow-hidden shadow-md flex flex-col rounded">
    <Link class="py-3 px-4  w-full hover:bg-background text-sm font-semibold" to="/catalog/fashion">
      Fashion
    </Link>
    <Link class="py-3 px-4  w-full hover:bg-background text-sm font-semibold"
    to="/catalog/Skincare">
      Skincare
    </Link>
    <Link class="py-3 px-4  w-full hover:bg-background text-sm font-semibold"
    to="/catalog/mobile-phones">
      Mobile Phones
    </Link>
    <Link class="py-3 px-4  w-full hover:bg-background text-sm font-semibold"
    to="/catalog/pharmaceuticals">
      Pharmaceuticals
    </Link>
  </div>
));

export const params = mergeReactives({
  headerClass: reactive("")
})


let y = 0;
let lastY = 0;
let offset = 30;
let tolerance = 50;
let duration = 150;

function deriveClass(y, dy) {
  if (y < offset) {
    return "";
  }

  if (Math.abs(dy) <= tolerance) {
    return params.headerClass;
  }

  if (dy < 50) {
    return "show bg-opacity-80 z-50 backdrop-blur-sm border-b border-b-background fixed top-0 left-0 right-0";
  }
  
 
  return "";
}

function updateClass(y) {
  const dy = lastY - y;
  lastY = y;
  const dx = deriveClass(y, dy);
  return dx
}

function setTransitionDuration(node) {
  node.style.transitionDuration = duration;
}

function handleScroll() {
  const newY = window.scrollY;
  const dy = lastY - newY;
  y = newY;
  const dx = deriveClass(newY, dy);
  params.headerClass = dx;
}

const Header = (() => {
  window.addEventListener('scroll', handleScroll);
  return (
    <header bind:this={setTransitionDuration} class={`bg-basic px-1 md:px-0 py-2 md:py-4 flex items-center justify-between md:border-b w-full ${params.headerClass}`}>
      <Link to="/" class="rounded-md flex items-center justify-center inline-block h-[40px] w-[100px]">
        <div class="w-[90%] h-full">
          <p class="text-sm font-bold">The</p>
          <h1 class="leading-[0.75rem] text-lg font-extrabold">Ordinary.</h1>
        </div>
      </Link>
      <nav class="hidden md:flex items-center justify-evenly mx-auto gap-x-8 lg:gap-x-10">
        <div role="dialog" class="hover:font-bold dropdown relative">
          <p>Catalogue</p>
          <div class="dropdown-menu z-10 hidden absolute">
            <CatalogList /> 
          </div>
        </div>
        <Link to="/catalogue/best-sellers" class="hover:font-bold">Best Sellers</Link>
        <Link to="/about" class="hover:font-bold">About The Ordinary</Link>
        <Link to="/blog" class="hover:font-bold">Blog</Link>
      </nav>
      <div class="flex items-center justify-between my-auto gap-x-8 md:gap-0 md:inline-block">
        <div class="flex items-center justify-between my-auto gap-4 lg:gap-5">
        <Link to="/search" class="text-xl md:text-2xl">
          <i class="bi bi-search"/>
        </Link>
        <Link to="/catalog/favorites" class="text-xl md:text-2xl">
          <i class="bi bi-heart"/>
        </Link>
        <CartIcon />

        </div>
        <div class="md:hidden py-1 my-auto flex flex-col gap-y-[5px] items-end" click$={toggle_menu}>
          <span class="border-[1.5px] border-black w-[28px] rounded-lg" />
          <span class="border-[1.5px] border-black w-[18px] rounded-lg" />
          <span class="border-[1.5px] border-black w-[23px] rounded-lg" />
        </div>
      </div>
      <Menu show={show_menu} />
    </header>
  )
});

export default Header;