import { Component, reactive } from "@mejor";

const ProductImages = Component(() => {
  return (
    <div class="w-full gap-y-2 flex flex-col overflow-hidden rounded-md m-0">
      <div class="w-full">
        <figure class="bg-background w-full h-[200px] md:h-[220px]">
        </figure>
      </div>
      <div class="w-full h-[100px] md:h-[130px] gap-x-2 flex">
        <figure class="w-1/3 bg-background h-full">
        </figure>
        <figure class="w-1/3 bg-background h-full">
        </figure>
        <figure class="w-1/3 bg-background h-full">
        </figure>
      </div>
    </div>
  )
})

const ProductMeta = Component(() => {
  
  return (
    <div class="w-full px-2 md:px-0">
      <div class="border-b-[0.8px] mb-1  border-b-accent py-1 w-full">
        <h5 class="leading-3 font-bold text-[10px] md:text-[12px]">
          Regimen Step 2: Treat
        </h5>
        <p class="text-[9px] mt-1 md:text-[11px]">
          A high strength exfoliator that works hard to reveal a smoother skin.
        </p>
      </div>
      
      <div class="border-b-[0.8px] mb-1  border-b-accent py-1 w-full">
        <h5 class="leading-3 font-bold text-[10px] md:text-[12px]">
          Targets
        </h5>
        <p class="text-[9px] mt-1 md:text-[11px]">
          Uneven Skin Tone, Texture Irregularities, Dullness.
        </p>
      </div>
      
      <div class="border-b-[0.8px] mb-1  border-b-accent py-1 w-full">
        <h5 class="leading-3 font-bold text-[10px] md:text-[12px]">
          Suited To
        </h5>
        <p class="text-[9px] mt-1 md:text-[11px]">
          Dry Skin.
        </p>
      </div>
      
      <div class="border-b-[0.8px] mb-1  border-b-accent py-1 w-full">
        <h5 class="leading-3 font-bold text-[10px] md:text-[12px]">
          Format
        </h5>
        <p class="text-[9px] mt-1 md:text-[11px]">
          Water Based Serum.
        </p>
      </div>
      
      <div class="border-b-[0.8px] mb-1  border-b-accent py-1 w-full">
        <h5 class="leading-3 font-bold text-[10px] md:text-[12px]">
          Key Ingredients
        </h5>
        <p class="text-[9px] mt-1 md:text-[11px]">
          Lactic Acid, Sodium Hyaluronate Crosspolymer, Tasmania Lanceolate Fruit/Leaf extract.
        </p>
      </div>
    </div>
  )
})

const count = reactive(0);

const increment = () => count.value++
const decrement = () => {
  if (count.value < 1) return;
  count.value--
}

const ProductDetails = Component(() => {
  
  return (
    <div class="w-full">
      <div class="flex flex-col gap-y-3">
        <h4 class="text-[18px] md:text-[24px] lg:text-[26px] font-semibold">
          Lactic Acid 10% + HA
        </h4>
        
        <div class="flex justify-between gap-x-2 w-[40%] text-[13px]">
          <div class="flex gap-x-1">
            <span class="bi bi-star-fill"/>
            <span class="bi bi-star-fill"/>
            <span class="bi bi-star-fill"/>
            <span class="bi bi-star-half"/>
            <span class="bi bi-star"/>
          </div>
          
          <span class="text-gray-400">3.5</span>
          
          <span class="text-gray-400">(181)</span>
        </div>
        
        <div class="my-5 w-[45%] flex justify-between gap-x-4 items-center">
          <div class="flex border border-accent whitespace-nowrap h-[28px] w-[107px]">
            <div class="w-1/2 h-full bg-accent text-basic flex items-center justify-center text-sm">60 ml</div>
            <div class="w-1/2 text-sm flex items-center justify-center bg-basic text-accent text-[10px]">30 ml</div>
          </div>
          <p class="font-bold text-[13px]">$8.99</p>
        </div>
        
        <ProductMeta />
        
        <div class="flex mt-4 gap-x-4 items-center h-[34px]">
          <div class="flex w-[100px] h-full border border-accent">
            <button click$={increment} class="flex w-1/3 h-full items-center
            justify-center font-bold text-[12px] border-r border-r-accent">
              +
            </button>
            <p class="flex w-1/3 h-full items-center justify-center
            font-semibold text-[16px]" sync:textContent={count} />
            <button click$={decrement} class="flex w-1/3 h-full items-center
            justify-center font-bold text-[12px] border-l border-l-accent">
              -
            </button>
          </div>
          <button class="bg-accent w-[150px] h-full text-basic uppercase
          text-[12px] font-semibold">
            Add to basket
          </button>
        </div>
      </div>
    </div>
  )
})

export default Component(() => {

  return (
    <div key="product-single" class="mt-5 mb-0 mx-0">
      <div class="w-full md:gap-x-4 md:flex">
        <div class="mb-8 md:flex-grow md:flex-shrink md:mb-0 md:w-1/2 lg:w-1/3">
          <ProductImages />
        </div>
        <div class="md:w-1/2 lg:w-2/3">
          <ProductDetails />
        </div>
      </div>
    </div>
  )
})
