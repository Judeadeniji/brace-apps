import { Component, createData } from "@mejor";
import { replaceView } from "@mejor/router";
import OrderItems from "@app/components/order-item";


const userData = createData({
  state: "idle",
  billing_details: {
    is_valid: false
  },
  payment_details: {
    is_valid: false
  },
})

const Input = Component((props) => {
  return (
    <input {...props} class="focus:bg-background border-0
    focus:border-b-gray-600 font-semibold text-[14px] md:text-[16px] focus:outline-0 border-b
    border-b-gray-200 h-[38px] md:h-[42px] px-2 rounded-t-sm"
    />
  )
})


const BillingForm = (() => {
  return (
    <form key="form" class="w-full mt-8" submit$preventDefault$={handleBillingForm}>
      <div class="flex flex-col gap-y-5 justify-start">
        <Input name="first_name" type="text" placeholder="First Name*" required />
        <Input name="last_name" placeholder="Last Name" />
        <Input name="email" autocomplete="on" placeholder="Email*" required />
        <Input type="number" name="phone" placeholder="Phone Number*" required />
        <Input name="country" placeholder="Country*" required />
        <Input name="city" placeholder="City*" required />
        <Input name="address" placeholder="Address*" required />
        <Input name="zip" type="number" placeholder="Postal Code*" required />
      </div>
    
      <button type="submit" class="rounded-sm mt-10 uppercase active:scale-95
      transition-all duration-100 w-full
      bg-accent h-[40px] md:h-[45px] text-basic text-[16px] font-semibold">
        { userData.value.state === "idle"  ? "proceed" : "processing..." }
      </button>
    </form>
  );
})

const BillingDetails = (() => {
  /* Step 1 */
  return (
    <div class="w-full md:flex md:gap-x-3">
      <div key="BillingDetails" class="mt-10 md:mt-0 md:w-3/5">
        <h4 class="text-[20px] md:text-[21px] mt-4 font-bold uppercase">
         Billing details
        </h4>
         <BillingForm />
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

export default Component(() => {
  
  return (
    <div key="checkout-component" class="w-full h-full">
      <BillingDetails />
    </div>
  )
})

async function handleBillingForm() {
  userData.mutate({ state: "pending" })
  await new Promise(r => {
    setTimeout(async function() {
      r();
      userData.mutate({ state: "idle" })
      await replaceView("/order/12345")
    }, 5000);
  })
}