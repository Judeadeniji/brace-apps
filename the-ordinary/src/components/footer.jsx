import { Component } from "@mejor";

const Footer = Component(() => (
  <footer class="w-full relative bottom-0 py-4 mt-14">
    <div class="flex w-full items-center">
      <div class="justify-self-start w-1/3 md:w-1/4 lg:w-1/5">
        <div class="w-full h-full">
          <p class="text-sm text-gray-800 font-bold">The</p>
          <h1 class="leading-[1rem] text-2xl font-extrabold">Ordinary.</h1>
        </div>
      </div>
    </div>
<div class="hidden md:h-[240px] mt-6 border-t md:flex items-start flex-col justify-between md:flex-row gap-x-6 gap-y-3 pt-8 pb-2">
  <div class="w-full md:w-2/9 grid place-content-center">
    <ul class="mt-2 space-y-1 uppercase text-2xl text-accent font-bold">
      <li><a href="#" class="text-gray-600 hover:text-gray-800">Link 1</a></li>
      <li><a href="#" class="text-gray-600 hover:text-gray-800">Link 2</a></li>
      <li><a href="#" class="text-gray-600 hover:text-gray-800">Link 3</a></li>
    </ul>
  </div>
  <div class="w-full md:w-2/9 grid place-content-center">
    <h4 class="text-lg uppercase font-bold">Catalog</h4>
    <ul class="mt-2 space-y-1">
      <li><a href="#" class="text-gray-600 hover:text-gray-800">Sub Link 1</a></li>
      <li><a href="#" class="text-gray-600 hover:text-gray-800">Sub Link 2</a></li>
      <li><a href="#" class="text-gray-600 hover:text-gray-800">Sub Link 3</a></li>
    </ul>
  </div>
  <div class="w-full md:w-2/9 grid place-content-center">
    <h4 class="text-lg uppercase font-bold">Customer Care</h4>
    <ul class="mt-2 space-y-1">
      <li><a href="#" class="text-gray-600 hover:text-gray-800">Sub Link 1</a></li>
      <li><a href="#" class="text-gray-600 hover:text-gray-800">Sub Link 2</a></li>
      <li><a href="#" class="text-gray-600 hover:text-gray-800">Sub Link 3</a></li>
      <li><a href="#" class="text-gray-600 hover:text-gray-800">Sub Link 4</a></li>
    </ul>
  </div>
  <div class="w-full">
    <form class="w-full mt-2">
      <div class="mt-1 transition-all duration-200 relative">
        <input type="email" id="newsletter" name="newsletter" placeholder="Give
        an email, get the newsletter" class="text-[12px] w-full pl-1 py-1 border-0 border-b
        border-b-[silver] focus:border-b-black focus:outline-0 focus:bg-background"
        />
        <button type="submit" class="active:scale-90 hover:bg-[#00000040]
        rounded-full bg-none outline-0 h-6 w-6 border-0 absolute bottom-1 right-1">
          <i class="text-[14px] m-auto font-extrabold bi bi-arrow-right" />
        </button>
      </div>
      <div class="mt-2 flex items-center">
        <input type="checkbox" id="consent" name="consent" class="form-checkbox
        text-black h-3 w-3 mr-2" />
        <label for="consent" class="text-[10px] text-gray-600">I agree to receive promotional emails</label>
      </div>
    </form>
  </div> 
</div>

    <div class="mt-4 px-2 flex items-center justify-between">
      <p class="text-[#717178] text-[10px]">© 2023 The Ordinary. <a
      class="underline">Terms of use privacy and policy</a></p>
      <div class="flex p-1 justify-between items-center text-[#717178] gap-x-4">
          <i class="text-sm md:text-xl lg:text-2xl bi bi-facebook"/>
          <i class="text-sm md:text-xl lg:text-2xl bi bi-twitter"/>
          <i class="text-sm md:text-xl lg:text-2xl bi bi-instagram" />
      </div>
    </div>
  </footer>
))

export default Footer 