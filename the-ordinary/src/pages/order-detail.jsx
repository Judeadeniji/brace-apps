import { Component } from "@mejor";
import { Core } from "utiliti-js";
import OrderItems from "@app/components/order-item";
import { get_order } from "@app/services/cart-store";

const df = new Core.DateFilter();

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

const Details = Component(({ order_number, meta }) => {

  return (
    <div key="Details" class="w-full grid gap-y-8 md:gap-14 grid-cols-1 md:grid-cols-2 mt-8">
      <DetailItem head="order number" body={order_number} />
      <DetailItem head="order date" body={df.text(new Date(Date.now()))} />
      <DetailItem head="E-mail" body={meta.email} />
      <DetailItem head="contact number" body={meta.phone || "+12345678986"} />
      <DetailItem head="delivery options" body="Standard Delivery" />
      <DetailItem head="delivery address" body={meta.address || "15, Sapa Avenue, Pluto Way,Nigeria."} />
      <DetailItem head="payment method" body="Mastercard ************5677" />
    </div>
  )
});

export default Component(({ params }) => {
  /* Step 2 */
  const { data, meta } = get_order(`order-${params['order-number']}`);

  return (
    <div key={params['order-number']} class="w-full md:flex md:gap-x-3">
      <div class="mt-10 md:mt-0 md:w-3/5">
        <h4 class="text-[20px] md:text-[21px] mt-4 font-bold uppercase">
          Order details
        </h4>
        <Details {...{meta, order_number: data.orderNumber}} />
      </div>
      
      <div class="mt-10 md:mt-0 md:w-2/5">
        <h4 class="text-[20px] md:text-[21px] font-bold uppercase mt-4">
          Your order
        </h4>
        <OrderItems items={data.items} />
      </div>
      
    </div>
  );
});
