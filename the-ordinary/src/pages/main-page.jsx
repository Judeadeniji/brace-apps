import { Component } from "@mejor"
import Hero from "@app/components/hero";
import { AdBanner, ProductSection, ProductCard, SectionHeader, BlogCard } from "@app/components/reusables";

function Section({ title }) {
  return (
      <ProductSection title={title} link="/catalogue/best-sellers">
        <ProductCard title="The most descriptive title I could think of" price={33.00} discount={10} />
        <ProductCard title="The most descriptive title I could think of" price={33.00} discount={10} />
        <ProductCard title="The most descriptive title I could think of" price={33.00} discount={10} />
        <ProductCard title="The most descriptive title I could think of" price={33.00} discount={10} />
        <ProductCard title="The most descriptive title I could think of" price={33.00} discount={10} /> 
        <ProductCard title="The most descriptive title I could think of" price={33.00} discount={10} /> 
        <ProductCard title="The most descriptive title I could think of" price={33.00} discount={10} /> 
        <ProductCard title="The most descriptive title I could think of" price={33.00} discount={10} /> 
        <ProductCard title="The most descriptive title I could think of" price={33.00} discount={10} /> 
        <ProductCard title="The most descriptive title I could think of" price={33.00} discount={10} /> 
        <ProductCard title="The most descriptive title I could think of" price={33.00} discount={10} /> 
        <ProductCard title="The most descriptive title I could think of" price={33.00} discount={10} /> 
      </ProductSection>
  )
}

export default Component(() => {
return (
  <section key="main-page">
    <Hero />
    <div class="mt-10" />
    {/*<AdBanner />*/}
    <div class="mt-8">
      <Section title="Best Seller" />
      <section class="mt-10 w-full">
        <SectionHeader title="Catalogue" />
        <div class="flex flex-col md:flex-row md:gap-x-[9px] md:h-[280px] items-center w-full mt-1">
          <div class="w-full md:w-1/2 mb-1 md:mb-0 h-[250px] md:h-full">
            <figure class="w-full h-full bg-background rounded-md">
              <img class="w-[100%]" src alt />
            </figure>
          </div>
          <div class="mt-2 md:mt-0 md:flex md:flex-col h-auto md:h-full md:justify-between w-full md:w-1/2 mb-1 md:mb-0">
            <p class="text-[10.5px] text-gray-700 font-bold md:w-1/2 leading-[14px] justify-self-start">
              All our products are created with love and care for your skin to
              help you achieve healthy and relationship with a beautiful skin
            </p>
            <div class="mt-8 md:mt-0 justify-self-end w-full">
              <div class="flex items-center justify-between border-y border-b-0 border-y-black h-[30px]">
                <p class="uppercase text-[14px]">skincare</p>
                <i class="text-[16px] font-semibold bi bi-arrow-up-right"></i>
              </div>
              <div class="flex items-center justify-between border-y border-y-black border-b-0 h-[30px]">
                <p class="uppercase text-[14px]">cleansing</p>
                <i class="text-[16px] font-semibold bi bi-arrow-up-right"></i>
              </div>
              <div class="flex items-center justify-between border-y border-y-black border-b-0 h-[30px]">
                <p class="uppercase text-[14px]">body care</p>
                <i class="text-[16px] font-semibold bi bi-arrow-up-right"></i>
              </div>
              <div class="flex items-center justify-between border-y border-y-black h-[30px]">
                <p class="uppercase text-[14px]">makeup</p>
                <i class="text-[16px] font-semibold bi bi-arrow-up-right"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Section title="popular" />
      <Section title="Recommended" />
      <section class="mt-10 w-full">
        <SectionHeader title="From Our blog" text="read more" link="/blog" />
        <div class="mt-3 w-full md:flex md:gap-x-1 gap-y-2">
          <div class="w-full md:w-1/2">
            <BlogCard title="Our Story" desc="The captivating story of how a
            built a powerful JavaScript UI Library that powers this current
            application" />
          </div>
          <div class="w-full md:w-1/2">
            <BlogCard title="Mejor: A powerful client side framework" desc="The captivating story of how a
            built a powerful JavaScript UI Library that powers this current
            application" />
          </div>
        </div>
      </section>
      <Section title="People also liked" />
    </div>
  </section>
)})