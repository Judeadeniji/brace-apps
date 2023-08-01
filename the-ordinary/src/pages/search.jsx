import { Component, reactive, onMounted } from "@mejor";
import { Link, Location } from "@mejor/router";
import { searchProducts } from "@app/services/methods";
import { maths } from "utiliti-js";
import { set_favorite, get_favorites } from "@app/services/product-store";
import Image from "@app/components/image";


const { roundTo } = maths;
const { setQueryParam, getQueryParams } = Location();

const searchStr = reactive("");
const isLoading = reactive(false);

const ProductCard = ({ title, price, discount, id, slug, image, category, isFavorite }) => (
  <div key={id} class="w-full rounded-2xl">
    <Link data-br-preload="hover" to={`/catalog/${category}/${slug}`} class="hover:drop-shadow">
      <figure class="h-[200px] md:h-[230px] w-full bg-background relative">
        <Image loading="lazy" class="h-full w-full object-fit" src={image} alt={title} width="100%" height="100%" />
        {discount ? (
          <div class="bg-accent text-basic px-[8px] py-[5px] absolute text-[10px] top-[7px] right-[7px]">
            {discount}%
          </div>
        ) : (
          <comment />
        )}
      </figure>
    </Link>
    <div class="py-2 w-full px-1 mt-2">
      <div class="flex items-center justify-between gap-x-2">
        <p class="text-[13px] font-semibold text-black leading-4">{title}</p>
        <i
          click$={() => set_favorite(id)}
          class={`self-end ml-1 text-xl bi ${isFavorite ? "text-black bi-heart-fill" : "bi-heart"}`}
        />
      </div>
      <div class="mt-1">
        <p class="text-[11px] font-bold">
          ${price}{" "}
          {discount ? (
            <span class="text-[12px] text-gray-500 line-through">
              {roundTo(price - (price * (discount / 100)), 2)}
            </span>
          ) : (
            <comment />
          )}
        </p>
      </div>
    </div>
  </div>
);

const SearchComponent = () => (
  <form class="touch-none w-full sticky" submit$preventDefault$={searchProductsFn}>
    <div class="flex font-semibold items-center gap-x-1">
      <input
        value={searchStr.value}
        input$={debounce(setValue)}
        name="search"
        type="text"
        placeholder="Search..."
        class="px-3 py-2 bg-background focus:outline-0 text-gray-700 my-auto h-[30px] w-4/5 rounded-full"
      />
      <button class="active:scale-95 active:text-red-500 border h-[30px] w-1/5 rounded-full text-blue-500">
        Search
      </button>
    </div>
  </form>
);

const SearchResults = () => {
  const str = searchStr.value;
  const searchResults = searchProducts(str, 25) || [];

  if (isLoading.value === true) {
    return <p key="isLoading" class="text-md mt-4 font-bold text-gray-400 text-center">Loading...</p>;
  } else
  if (!searchResults.length) {
    return <p key="searchResults" class="text-md mt-4 font-bold text-gray-400 text-center">No Search Result</p>;
  } else
  if (str.length < 1) {
    return <p key="string length" class="text-md mt-4 font-bold text-gray-400 text-center">Search Results will Appear Here</p>;
  }

  return (
    <div key="searchResults Component" class="mt-4 grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {searchResults.map(({ product_title: title, ...props }) => (
        <ProductCard {...{ ...props, title }} />
      ))}
    </div>
  );
};

export default Component(() => {
  searchStr.value = getQueryParams()?.q || "";

  return (
    <div key="search page" class="relative w-full h-full">
      <div class="border-b w-full h-[45px]">
        <SearchComponent />
      </div>
      <SearchResults />
    </div>
  );
});

function debounce(fn, n = 800) {
  return async function (...args) {
    isLoading.value = true
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fn.apply(this, args));
        isLoading.value = false
      }, n);
    });
  };
}

function setValue(e) {
  searchStr.value = e.target.value.trim();
  setQueryParam("q", searchStr.value);
}

function searchProductsFn() {}