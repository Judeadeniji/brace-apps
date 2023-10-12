import { Component, reactive } from "@mejor";
import { Link } from "@mejor/router";
import { get_total_cart_items } from "@app/services/cart-store";
import { getUniqueCategories } from "@app/services/methods";

export const show_menu = reactive(false);

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

const CatalogList = Component(() => {
  const c = getUniqueCategories().slice(0, 6)

  return (
    <div class="bg-white overflow-hidden shadow-md flex flex-col rounded">
    {
      c.map(_c => (
        <Link class="py-3 px-4  w-full hover:bg-background text-sm font-semibold" to={`/catalog/${_c}`}>
          {_c}
        </Link>
      ))
    }
    </div>
  )
});


const Header = (() => {
  return (
    <header class="bg-basic bg-opacity-80 z-10 backdrop-blur-md px-2 py-2
    md:py-5 md:px-4 flex items-center justify-between border-b fixed w-full
    left-0 right-0 top-0">
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
        <a href="https://judeadeniji.github.io" class="hover:font-bold">Blog</a>
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
    </header>
  )
});

export default Header;