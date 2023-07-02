import { Component } from "@mejor";
import { navigate } from '@mejor/router';
import { ProductSection, ProductCard } from "@app/components/reusables";
import { 
  get_cart_items,
  increase_item_quantity,
  decrease_item_quantity,
  remove_from_cart
  } from "@app/services/cart-store";

export default Component(() => {
  return (
    <div class="w-full px-1 mt-4">
      <Cart />
    </div>
  )
})

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
        
        <button class="uppercase h-[40px] w-full bg-accent text-white
        text-[14px] font-semibold" click$={() => navigate("/cart/checkout")}>
          proceed to checkout 
        </button>
      </div>
    </div>
  </div>
))

const QuantityControl = (({ quantity, id }) => {
  
  const increment = () => {
    increase_item_quantity(id)
  }
  const decrement = () => {
    decrease_item_quantity(id)
  }
  
  return (
    <div class="flex w-[100px] h-full border border-accent">
      <button click$={increment} class="flex w-1/3 h-full items-center
      justify-center font-bold text-[12px] border-r border-r-accent">
        +
      </button>
      <p class="flex w-1/3 h-full items-center justify-center
      font-semibold text-[16px]">{quantity}</p>
      <button click$={decrement} class="flex w-1/3 h-full items-center
      justify-center font-bold text-[12px] border-l border-l-accent">
        -
      </button>
    </div>
  )
})

const CartItem = (({ product }) => {
  return (
    <div key={"cart-item-"+product.id} class="flex relative gap-x-4 w-full">
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
          <QuantityControl id={product.id} quantity={product.quantity} />
        </div>
       </div>
       
       <button click$={() => remove_from_cart(product.id)} class="h-9 w-9 rounded-full absolute top-0 right-0 active:scale-95 hover:bg-background bg-transparent">
         <span class="bi bi-x text-lg" />
       </button>
    </div>
  )
});

const Divider = Component(() => {
  return (
    <div class="border-b my-2 p-0 h-0 w-full" />
  )
});

const Cart = () => {
  const cart_items = get_cart_items();
  return (
    <div class="w-full" key="cart-component">
      <h1 class="mt-3 mb-4 text-[21px] uppercase font-bold">shopping cart</h1>
      <div class="w-full md:gap-x-3 md:flex md:items-start">
        <div class="mb-4 sm:mb-0 md:w-2/3">
        {
          cart_items.length > 0 ?
          cart_items.map((product,i) => {
            return (
            <div key={product.id}>
            <CartItem product={product} />
            {i !== cart_items.length - 1 ? <Divider /> : 
            (<comment> End </comment>) }
            </div>
            )
          }) :
          <h1 class="text-xl my-5">Cart is empty</h1>
        }
          
          <PromoCodeForm />
        </div>

        <Checkout />
      </div>
        <RecentlyViewed />
    </div>
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