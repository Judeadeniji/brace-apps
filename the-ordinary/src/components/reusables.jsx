import { Component, reactive } from "@mejor";
import { Link, navigate } from "@mejor/router";
import { maths, Core } from "utiliti-js";

const { roundTo } = maths;
const { DateFilter } = Core;
const df = new DateFilter();

export const ProductCard = Component(({
  title,
  price,
  discount,
  id
}) => (
    <Link data-br-preload="hover" to={`/catalog/skincare/${id}`} class="rounded-2xl hover:drop-shadow">
      <figure class="w-[140px] h-[175px] md:w-[160px] md:h-[185px]  bg-background relative">
        <img src="" alt="" />
        {discount ? (<div class="bg-accent text-basic px-[8px] py-[5px] absolute text-[10px] top-[7px] right-[7px]"> {discount}% </div>) :
          (<comment/>)}
      </figure>
      <div class="py-2 px-1 mt-2">
        <div class="flex items-center justify-between gap-x-2">
          <p class="text-[11px] font-bold text-black leading-4">{title}</p>
          <i class="self-end ml-1 text-xl bi bi-heart" />
        </div>
        <div class="mt-1">
          <p class="text-[12px] font-bold">${price}{" "} 
          { discount ? (<span
          class="text-[12px] text-gray-500 line-through">
            {roundTo(price - (price *(discount/100)), 2)}
          </span>) : <comment /> }
          </p>
        </div>
      </div>
    </Link>
));
  
 export const SectionHeader = Component(({
   title,
   link,
   text
 }) => (
   <div class="w-full flex items-center justify-between p-2 my-1">
    <h4 class="text-[18px] md:text-[21px] uppercase font-bold">{title}</h4>
    {link ? <Link class="underline uppercase text-[12px] font-semibold"
    to={link}>{text || "See All"}</Link> : <comment />}
   </div> 
 ));
 
 export const ProductSlider = Component(({ children }) => (
  <div class="no-scrollbar scroll-m-0 flex gap-x-[8px] w-full items-center overflow-x-scroll overflow-y-scroll">
    {children}
  </div>
))

export const ProductSection = Component(({
  title,
  link,
  children,
}) => (
  <section class="mt-14 w-full">
    <SectionHeader {...{title, link}} />
    <ProductSlider>
      {children}
    </ProductSlider>
  </section>
));


const sources = [
  "https://img.freepik.com/free-photo/black-friday-inscription-from-wooden-table_23-2147973768.jpg?size=626&ext=jpg",
  "https://img.freepik.com/free-photo/dark-landscape-with-bird-flying_1122-682.jpg?size=626&ext=jpg",
  "https://img.freepik.com/free-photo/eid-al-fitr-greeting-with-lanterns-dark-blue-background_1123-294.jpg?size=626&ext=jpg",
];
let idx = 1;
const currImgUrl = reactive(sources[idx]);/*
setInterval(function() {
  currImgUrl.value = sources[idx];
  idx++;
  if(idx % 3 === 0) {
    idx = 0;
  }
}, 5000);
*/


export const AdBanner = Component(() => (
  <div class="w-full h-[120px] md:h-[220px] lg:w-[320px] my-3">
    <div class="w-[95%] h-full mx-auto rounded-lg object-cover overflow-hidden">
      <img class="object-cover w-full h-full" sync:src={currImgUrl}
      loading="lazy" src={sources[2]} alt="ad" />
    </div>
  </div>
));

export const BlogCard = Component(({ title, desc }) => (
  <article class="my-4 overflow-hidden rounded-2xl mx-3 border hover:drop-shadow-lg">
    <div>
      <figure class="w-full h-[190px] md:h-[420px] bg-background rounded-t-lg">
      </figure>
      <div class="p-2 flex mt-1 ml-1 items-center justify-between w-[60%]">
        <span class="text-gray-500 font-semibold
        text-[10px]">{df.text(new Date())}</span>
        <span class="text-gray-500 font-semibold text-[10px]">Comments (29)</span>
      </div>
    </div>
    <div class="px-2 py-1 mt-3 mb-5">
      <h4 class="font-bold mb-3 text-[16px] uppercase">{title}</h4>
      <p class="w-[90%] leading-tight font-semibold text-[14px] text-gray-700">{desc}</p>
    </div>
  </article>
));

export const ProductCardLarge = Component(() => (
 []
));


export const Menu = (({ show }) => { 
  const close_menu = () => show.value = !show.value;
  const route_to = (to) => {
  close_menu();
  navigate(to);
}

  return show.value ? 
  (
     <div class="menu-container">
      <div class="menu">
        <button class="button" click$={close_menu}>
          <i class="bi bi-box-arrow-left text-2xl m-auto font-extrabold" />
        </button>
        <ul>
          <li><Link on:click$preventDefault$={() => route_to("/")} to="/">Home</Link></li>
          <li><Link on:click$preventDefault$={() => route_to("/catalog")} to="/catalog">Catalog</Link></li>
          <li><Link on:click$preventDefault$={() => route_to("/about")} to="/about">About</Link></li>
          <li><Link on:click$preventDefault$={() => route_to("/blog")} to="/blog">Blog</Link></li>
        </ul>
      </div>
    </div>
  ) : <comment />
});