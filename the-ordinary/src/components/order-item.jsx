import { Component, testMount } from "@mejor"
import { get_cart_items } from "@app/services/cart-store";
const OrderItem = Component(({ name, price, quantity, id }) => {
  return (
    <div key={id} class="font-semibold flex items-center justify-between">
      <p class="uppercase">{name}</p>
      <p class="">{quantity} x {price}</p>
    </div>
  );
});

const OrderItems = (({ items }) => {
  const cart_items = items ? items : get_cart_items();
  const subtotal = cart_items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const vat = Number.parseFloat(subtotal) * 0.045;
  const total = Number.parseFloat(subtotal + vat).toFixed(2);
  
  return (
    <div class="bg-background rounded my-4 p-5">
      <div class="border-b border-b-gray-600 flex py-2 mb-6 items-center justify-between">
        <p class="text-sm font-bold uppercase text-accent">Your Order</p>
        <p class="text-sm font-bold uppercase text-accent">total</p>
      </div>

      <div class="flex mb-6 flex-col gap-y-1 text-gray-500 text-[12px] md:text-[16px]">
      {
        cart_items.map(({ product_title, price, id, quantity }) => (
          <OrderItem name={product_title} price={price} quantity={quantity} id={id} />
        ))
      }
      </div>

      <div class="border-b border-b-gray-600 flex py-2 my-3 items-center justify-between">
        <p class="text-sm font-bold uppercase text-accent">Shipping</p>
        <p class="text-green-600 text-[12px] md:text-[14px] font-semibold">FREE</p>
      </div>

      <div class="border-b border-b-gray-600 flex py-2 my-3 items-center justify-between">
        <p class="text-sm font-bold uppercase text-accent">VAT</p>
        <p class="text-gray-500 text-[12px] md:text-[14px]
        font-semibold">${vat.toFixed(2)}</p>
      </div>

      <div class="border-b border-b-gray-600 flex py-2 items-center justify-between">
        <p class="text-sm font-bold uppercase text-accent">Total</p>
        <p class="text-accent text-[14px] md:text-[16px] font-bold">${total}</p>
      </div>
    </div>
  );
});

export default OrderItems