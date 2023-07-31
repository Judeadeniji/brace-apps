import { maths } from "utiliti-js";
import { Component } from "@mejor";
import { Link, Location } from "@mejor/router";
import { getProductsByCategory, getUniqueCategories } from "@app/services/methods";
import { set_favorite, get_favorites } from "@app/services/product-store";
import Image from "@app/components/image";


const { roundTo } = maths;

export const ProductCard = (({
  title,
  price,
  discount,
  id,
  slug,
  image,
  category,
  isFavorite
}) => (
    <div key={id} class="w-full rounded-2xl">
    <Link data-br-preload="hover" to={`/catalog/${category}/${slug}`} class="hover:drop-shadow">
      <figure class="h-[200px] md:h-[230px] w-full bg-background relative">
        <Image width="100%" height="100%" class="h-full w-full object-cover" src={image} alt={title} />
        {discount ? (<div class="bg-accent text-basic px-[8px] py-[5px] absolute text-[10px] top-[7px] right-[7px]"> {discount}% </div>) :
          (<comment/>)}
      </figure>
      </Link>
      <div class="py-2 w-full px-1 mt-2">
        <div class="flex items-center justify-between gap-x-2">
          <p class="text-[13px] font-semibold text-black leading-4">{title}</p>
          <i click$={() => set_favorite(id)} class={`self-end ml-1 text-xl bi
          ${isFavorite ? 'text-black bi-heart-fill' : 'bi-heart'}`} /> 
        </div>
        <div class="mt-1">
          <p class="text-[11px] font-bold">${price}{" "} 
          { discount ? (<span
          class="text-[12px] text-gray-500 line-through">
            {roundTo(price - (price *(discount/100)), 2)}
          </span>) : <comment /> }
          </p>
        </div>
      </div>
    </div>
));

const ShopBy = Component(() => (
  <div class="bg-white w-[200px] z-50 overflow-hidden shadow-md flex flex-col rounded">
    <div class="py-3 px-4 w-full hover:bg-background text-sm font-semibold">
      Fashion
    </div>
    <div class="py-3 px-4  w-full hover:bg-background text-sm font-semibold">
      Skincare
    </div>
    <div class="py-3 px-4  w-full hover:bg-background text-sm font-semibold">
      Mobile Phones
    </div>
    <div class="py-3 px-4  w-full hover:bg-background text-sm font-semibold">
      Pharmaceuticals
    </div>
  </div>
))
const SortBy = Component(() => (
  <div class="bg-white w-[200px] z-50 overflow-hidden shadow-md flex flex-col rounded">
    <div class="py-3 px-4 w-full hover:bg-background text-sm font-semibold">
      Popular
    </div>
    <div class="py-3 px-4  w-full hover:bg-background text-sm font-semibold">
      Alphabetical
    </div>
    <div class="py-3 px-4  w-full hover:bg-background text-sm font-semibold">
      Newest
    </div>
    <div class="py-3 px-4  w-full hover:bg-background text-sm font-semibold">
      Oldest
    </div>
  </div>
));

const SidebarLinks = () => {
  const categories = getUniqueCategories();
  const { getCurrentPath } = Location();
  const cPath = getCurrentPath();
  const active_class = (c) => getCurrentPath().replace("%20", " ") === c ? "bg-blue-100 text-blue-600" : "";
  
  
  return (
    <div class="w-full flex flex-col gap-x-2">
      <ul class="min-w-full">
        {
          categories.map((c) => (
            <li class="w-full" key={c}>
              <Link class={`whitespace-nowrap ${active_class('/catalog/'+c)}`}
              to={`/catalog/${c}`}>{c}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

const Sidebar = Component(() => (
  <aside class="w-[250px] sdbr pt-5 px-5 hidden md:block h-full bg">
    <h1 class="text-[18px] font-bold uppercase">Filter</h1>
    <form class="mt-6">
      <div class="relative h-[35px] my-4">
        <input placeholder="Search..." type="text" class="px-2
        focus:outline-[2px] outline-gray-600 rounded-sm outline-0 bg-background
        placeholder-gray-600 text-[16px]
        h-full" />
      </div>
      <div class="relative dropdown h-[35px] my-2">
        <div class="h-full border border-accent flex items-center justify-between px-2">
          Shopy By
        </div>
        <div class="absolute animate-pulse z-50 dropdown-menu  hidden top-[40px]">
          <ShopBy />
        </div>
      </div>
      <div class="relative dropdown h-[35px] my-2">
        <div class="h-full border border-accent flex -z-50 items-center justify-between px-2">
          Sort By
        </div>
        <div class="absolute z-50 dropdown-menu hidden top-[40px]">
          <SortBy />
        </div>
      </div>
      
      <div class="mt-8 w-full">
        <input name="price-range" type="range" value="32" class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700" />
        
      <div class="w-full flex justify-between mt-1 text-[8px]">
        <p class="font-bold">$10</p>
        <p class="font-bold">$50,000</p>
      </div>
      </div>

    </form>
    
    <h1 class="text-[24px] font-semibold uppercase my-3">
      categories
    </h1>
    <SidebarLinks />
  </aside>
  ))

export default (({ params }) => {
  let category_name;
  category_name = params.category_name;
  if (params.category_name.includes('%20')) {
    category_name = params.category_name.replace('%20', ' ')
  }
  
  let items = getProductsByCategory(category_name);
  
  if (params.category_name.toLowerCase().includes("favorite")) {
    items = get_favorites();
  }
  
  return (
    <div key="single-catalog" class="w-full md:h-screen md:flex md:gap-x-6 m-0 bg-white">
      <Sidebar />
      <section class="pt-5 no-scrollbar w-full h-full md:overflow-x-hidden md:overflow-y-scroll">
        <div class="flex items-center justify-between">
          <h1 class="text-[18px] md:text-[21px] font-bold uppercase">{category_name}</h1>
          
          <button class="hidden text-2xl bg-transparent h-8 w-8 rounded-full active:scale-95 hover:bg-background font-extrabold">
            <i class="bi bi-filter text-2xl m-0 font-extrabold"></i>
          </button>
        </div>
        <div class="mt-6 grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map(({id, image, product_title: title, price, discount, slug,
          category, isFavorite }) => (
            <ProductCard {...{id, image, price, discount, title, category, slug, isFavorite}} />
          ))}
        </div>
      </section>
    </div>
  );
});