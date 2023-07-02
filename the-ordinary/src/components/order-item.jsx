import { Component } from "@mejor"

const OrderItem = Component(({ name, price }) => {
  return (
    <div class="font-semibold flex items-center justify-between">
      <p class="uppercase">{name}</p>
      <p class="">{price}</p>
    </div>
  );
});

const OrderItems = Component(() => {
  return (
    <div class="bg-background rounded my-4 p-5">
      <div class="border-b border-b-gray-600 flex py-2 mb-6 items-center justify-between">
        <p class="text-sm font-bold uppercase text-accent">Your Order</p>
        <p class="text-sm font-bold uppercase text-accent">total</p>
      </div>

      <div class="flex mb-6 flex-col gap-y-1 text-gray-500 text-[12px] md:text-[14px]">
        <OrderItem name="Lactic Acide 10% + HA" price="$19.50" />
        <OrderItem name="Lactic Acide 10% + HA" price="$19.50" />
        <OrderItem name="Lactic Acide 10% + HA" price="$19.50" />
      </div>

      <div class="border-b border-b-gray-600 flex py-2 my-3 items-center justify-between">
        <p class="text-sm font-bold uppercase text-accent">Shipping</p>
        <p class="text-gray-500 text-[12px] md:text-[14px] font-semibold">FREE</p>
      </div>

      <div class="border-b border-b-gray-600 flex py-2 my-3 items-center justify-between">
        <p class="text-sm font-bold uppercase text-accent">VAT</p>
        <p class="text-gray-500 text-[12px] md:text-[14px] font-semibold">$4.55</p>
      </div>

      <div class="border-b border-b-gray-600 flex py-2 items-center justify-between">
        <p class="text-sm font-bold uppercase text-accent">Total</p>
        <p class="text-accent text-[14px] md:text-[16px] font-bold">$63.20</p>
      </div>
    </div>
  );
});

export default OrderItems