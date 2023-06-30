import { Component, reactive } from "@mejor";
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
}
const Header = Component(() => {
  return (
    <header class="px-1 md:px-0 py-2 md:py-4 flex items-center justify-between md:border-b w-full">
      <Link to="/" class="rounded-md flex items-center justify-center inline-block h-[40px] w-[100px]">
        <div class="w-[90%] h-full">
          <p class="text-sm font-bold">The</p>
          <h1 class="leading-[0.75rem] text-lg font-extrabold">Ordinary.</h1>
        </div>
      </Link>
      <nav class="hidden md:flex items-center justify-evenly mx-auto gap-x-8 lg:gap-x-10">
        <Link to="/catalogue" class="hover:font-bold">Catalogue</Link>
        <Link to="/catalogue/best-sellers" class="hover:font-bold">Best Sellers</Link>
        <Link to="/about" class="hover:font-bold">About The Ordinary</Link>
        <Link to="/blog" class="hover:font-bold">Blog</Link>
      </nav>
      <div class="flex items-center justify-between my-auto gap-x-8 md:gap-0 md:inline-block">
        <div class="flex items-center justify-between my-auto gap-4 lg:gap-5">
        <Link to="/search" class="text-xl md:text-2xl">
          <i class="bi bi-search"/>
        </Link>
        <Link to="/account/saved" class="text-xl md:text-2xl">
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