import { Component, reactive } from "@mejor";
import { ProductSection, ProductCard } from "@app/components/reusables";

export default ({ ChildOutlet: Checkout }) => {
  return (
    <div class="w-full px-1 mt-4">
      {Checkout ? (<Checkout />) : (<Cart/>)}
    </div>
  )
}

const PromoCodeForm = Component(() => (
  <div class="my-8 w-full md:h-[40px] md:flex items-center md:gap-x-2">
    <input placeholder="Enter Promo Code" class="rounded-t-sm placeholder-gray-500 h-[40px] md:h-full w-full focus:bg-background md:w-2/3 text-[12px] focus:outline-0 outline-0 border-0 border-b border-b-gray-500 focus:border-b-accent" />
    <button class="uppercase mt-3 md:mt-0 h-[40px] md:h-full md:w-1/4 w-full
    border border-accent bg-transparent hover:bg-accent text-accent
    hover:text-white text-[14px] font-semibold">
      Apply Code
    </button>
  </div>
))

const Checkout = Component(() => (
  <div class="mt-3 md:mt-0 md:w-1/3">
    <h1 class="mb-8 text-[21px] uppercase font-bold">cart total</h1>
    <div class="w-full">
      <div class="mb-4">
        <div class="flex items-center justify-between mb-2">
           <p class="text-sm font-bold uppercase">subtotal</p>
           <p class="text-sm font-semibold">50.99 $</p>
        </div>
        <div class="flex items-center justify-between mb-3">
           <p class="text-sm font-bold uppercase">vat</p>
           <p class="text-sm font-semibold">+ 4.47 $</p>
        </div>
      </div>
      
      <div class="mt-4">
        <div class="flex items-center justify-between mb-3">
           <p class="text-sm font-bold uppercase">Total</p>
           <p class="text-sm font-semibold">55.46 $</p>
        </div>
        
        <button class="uppercase h-[40px] w-full bg-accent text-white text-[14px] font-semibold">
          proceed to checkout 
        </button>
      </div>
    </div>
  </div>
))

const Cart = Component(() => {
  return (
    <div class="w-full" key="cart-component">
      <h1 class="mt-3 mb-4 text-[21px] uppercase font-bold">shopping cart</h1>
      <div class="w-full md:gap-x-3 md:flex md:items-start">
        <div class="mb-4 sm:mb-0 md:w-2/3">
          <CartItem />
          <Divider />
          <CartItem />
          <Divider />
          <CartItem />
          
          <PromoCodeForm />
        </div>

        <Checkout />
      </div>
        <RecentlyViewed />
    </div>
  )
})

const QuantityControl = Component(({ count }) => {
  
  const increment = () => count.value++
  const decrement = () => {
    if (count.value < 2) return;
    count.value--
  }
  
  return (
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
  )
})

function CartItem() {
  return (
    <div class="flex gap-x-4 w-full">
      <figure class="bg-background h-[160px] w-[120px] md:h-[180px] md:w-[140px]" />
      
       <div class="flex flex-col justify-between">
        <div class="flex flex-col gap-y-2">
          <p class="text-sm">
            Lactic Acid 10% HA
          </p>
          <p class="font-semibold text-sm">
            30 ml
          </p>
          <p class="font-semibold text-sm">
            $26.58
          </p>
        </div>
        
        <div class="h-[28px] justify-self-end">
          <QuantityControl count={reactive(1)} />
        </div>
       </div>
    </div>
  )
}

function Divider() {
  return (
    <div class="border-b my-2 p-0 h-0 w-full" />
  )
}

function RecentlyViewed() {
  return (
    <div class="w-full my-16">
      <ProductSection title="Recently Viewed">
        <ProductCard title="A Demo Title" price={55.63} discount={10} />
        <ProductCard title="A Demo Title" price={104.99} />
        <ProductCard title="A Demo Title" price={26.95} />
        <ProductCard title="A Demo Title" price={55.63} />
        <ProductCard title="A Demo Title" price={104.99} discount={10} />
        <ProductCard title="A Demo Title" price={104.99} />
      </ProductSection>
    </div>
  )
}