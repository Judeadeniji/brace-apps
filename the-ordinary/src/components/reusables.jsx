import { Component, reactive, signal, signalEffect } from "@mejor";
import { Link, navigate } from "@mejor/router";
import Image from "./image";
import { set_favorite } from "@app/services/product-store";
import { maths, Core } from "utiliti-js";

const { roundTo } = maths;
const { DateFilter } = Core;
const df = new DateFilter();

const LikeButton = ({ id, isFavorite }) => (
  <i click$={() => set_favorite(id)} class={`self-end ml-1 text-xl bi ${isFavorite ? 'text-black bi-heart-fill' : 'bi-heart'}`} />
)

export const ProductCard = Component(({
  title,
  price,
  discount,
  id,
  slug,
  isFavorite,
  category,
  image
}) => {
  
 return (
   <div key={id} class="rounded-2xl">
    <Link data-br-preload="hover" to={`/catalog/${category}/${slug}`} class="hover:drop-shadow">
      <figure class="overflow-hidden rounded-t-md w-[160px] h-[185px] md:w-[180px] md:h-[195px] relative">
        <Image loading="lazy" class="h-full w-full object-fit" src={image} alt={title} width="100%" height="100%" />
        {discount ? (<div class="bg-accent text-basic px-[8px] py-[5px] absolute text-[10px] top-[7px] right-[7px]"> {discount}% </div>) :
          (<comment/>)}
      </figure>
    </Link>
      <div class="py-2 px-1 mt-2 max-w-[140px] md:max-w-[160px]">
        <div class="flex items-center justify-between gap-x-2">
          <p class="text-[11px] font-bold text-black leading-4">{title}</p>
          <LikeButton {...{id, isFavorite}} />
        </div>
        <div class="mt-1">
          <p class="text-[12px] font-bold">${!discount ? price : roundTo(price -
          (price *(discount/100)), 2)}{" "} 
          { discount ? (<span
          class="text-[12px] text-gray-500 line-through">
            {price}
          </span>) : <comment /> }
          </p>
        </div>
      </div>
    </div>
  );
})
  
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
  <div class="no-scrollbar scroll-m-0 flex gap-x-[8px] md:gap-x-[12px] w-full items-start overflow-x-scroll overflow-y-scroll">
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


export const AdBanner = Component(() => {
    
  return (
  <div class="w-full h-[120px] md:h-[320px] lg:h-[380px] my-3">
    <div class="w-[95%] h-full mx-auto rounded-lg object-cover overflow-hidden">
      <Image class="object-cover w-full h-full" loading="lazy" src="https://camo.envatousercontent.com/aef97db195009b6cbcad1bf9d17c707e91c89487/68747470733a2f2f6164616e696d6174652e636f6d2f656e7661746f2f636f646563616e796f6e2f68746d6c352f61642d74656d706c617465732f646573632d696d67732f637573746f6d6572732e676966" alt="ads banner" width="95%" height="100%" />
    </div>
  </div>
  )
});

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

export const Menu = (({ show }) => { 
  const close_menu = () => show.value = !show.value;
  const route_to = (to) => {
    close_menu();
    navigate(to);
  }

  return (
   <div style:display={show.value ? "flex" : "none"} class = "menu-container">
    <div class="menu slide-left">
      <button class="button" click$={close_menu}>
        <i class="bi bi-box-arrow-left text-2xl m-auto font-extrabold" />
      </button>
      <ul>
        <li><Link on:click$preventDefault$={() => route_to("/")} to="/">Home</Link></li>
        <li><Link on:click$preventDefault$={() => route_to("/catalog")} to="/catalog">Catalog</Link></li>
        <li><Link on:click$preventDefault$={() => route_to("/about")} to="/about">About</Link></li>
        <li><a href="https://judeadeniji.github.io">Blog</a></li>
      </ul>
    </div>
   </div>
  )
});