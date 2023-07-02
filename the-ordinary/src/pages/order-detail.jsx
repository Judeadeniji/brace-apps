import { Component } from "@mejor";
import OrderItems from "@app/components/order-item";


const DetailItem = Component(({ head, body }) => (
  <div class="w-full">
    <h1 class="mb-3 text-[16px] text-gray-700 font-bold uppercase">
      {head}
    </h1>
    
    <p class="text-[14px] font-semibold text-gray-500">
      {body}
    </p>
  </div>
))

const Details = Component(() => {
  return (
    <div key="Details" class="w-full grid gap-y-8 md:gap-14 grid-cols-1 md:grid-cols-2 mt-8">
      <DetailItem head="order number" body="445945615125" />
      <DetailItem head="order date" body="July 1, 2023" />
      <DetailItem head="E-mail" body="adenijiferanmi64@gmail.com" />
      <DetailItem head="contact number" body="+23456789098654" />
      <DetailItem head="delivery options" body="Standard Delivery" />
      <DetailItem head="delivery address" body="15, Sapa Avenue, Pluto Way, Nigeria." />
      <DetailItem head="payment method" body="Mastercard ************5677" />
    </div>
  )
});

export default Component((p) => {
  /* Step 2 */
  alert(JSON.stringify(p))
  return (
    <div class="w-full md:flex md:gap-x-3">
      <div key="OrderDetails" class="mt-10 md:mt-0 md:w-3/5">
        <h4 class="text-[20px] md:text-[21px] mt-4 font-bold uppercase">
          Order details
        </h4>
        <Details />
      </div>
      
      <div class="mt-10 md:mt-0 md:w-2/5">
        <h4 class="text-[20px] md:text-[21px] font-bold uppercase mt-4">
          Your order
        </h4>
        <OrderItems />
      </div>
      
    </div>
  );
});
