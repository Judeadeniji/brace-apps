import { Component, useEffect } from "@mejor"
import { Link } from "@mejor/router";
import Hero from "@app/components/hero";
import Image from "@app/components/image";
import { AdBanner, ProductSection, ProductCard, SectionHeader, BlogCard } from "@app/components/reusables";
import { getProductsByCategory, getUniqueCategories } from "@app/services/methods";
import { get_products } from "@app/services/product-store";

const Section = Component(({ title }) => {
  const products = getProductsByCategory(title);
  if(!products.length) {
    // this was don because of the "people also liked" category
    // it's not a real category so getProductsByCategory returns an empty Array
    
    const _products = get_products();
    // we fix fix this by pushing random products from the main products array
    // to products;
    useEffect(() => {
      for (let i = 0; i < 17; i++) {
        const idx = Math.floor(Math.random() * 100);
        const exists = products.find(i => i.id === _products[idx]);
        if(!exists) products.push(_products[idx]);
      }
    }, []);
  }
  return (
      <ProductSection title={title} link={`/catalog/${title}`}>
      {
        products.map(({id, image, product_title, price, discount, isFavorite, slug, category }) => (
          <ProductCard {...{id,image, price, discount, title: product_title, category, isFavorite, slug}} />
        ))
      }
      </ProductSection>
  )
})

export default Component(() => {
  const categories = getUniqueCategories().slice(0, 7);
  
  return (
    <section key="main-page">
      <Hero />
      <div class="mt-10" />
      <AdBanner />
      <div class="mt-8">
        <Section title={categories[0]} />
        <section class="mt-10 w-full">
          <SectionHeader title="Catalogue" />
          <div class="flex flex-col md:flex-row md:gap-x-[9px] md:h-[280px] items-center w-full mt-1">
            <div class="w-full md:w-1/2 mb-1 md:mb-0 h-[250px] md:h-full">
              <figure class="w-full h-full overflow-hidden rounded-md">
                <Image loading="lazy" class="h-full object-cover w-[100%]"
                src="https://img.freepik.com/free-photo/beauty-young-latin-woman-with-ideal-skin_633478-419.jpg?w=740&t=st=1688678947~exp=1688679547~hmac=d96482bd5f7a21da9e9baec7c60e94d44c2074a606d47c78bc48bae2eb51641a"
                alt="beauty-young-latin-woman-with-ideal-skin" />
              </figure>
            </div>
            <div class="mt-2 md:mt-0 md:flex md:flex-col h-auto md:h-full md:justify-between w-full md:w-1/2 mb-1 md:mb-0">
              <p class="text-[16px] text-gray-700 font-semibold md:w-2/3 leading-5 justify-self-start">
                All our products are created with love and care for your skin to help you achieve healthy and relationship with a beautiful skin
              </p>
              <div class="mt-8 md:mt-0 justify-self-end w-full">
                <Link to="/catalog/Fashion" class="flex items-center justify-between border-y border-b-0 border-y-black h-[30px]">
                  <p class="uppercase text-[14px]">Fashion</p>
                  <i class="text-[16px] font-semibold bi bi-arrow-up-right"></i>
                </Link>
                
                {
                  categories.slice(0,3).map(c => (
                <Link key={c} to={`/catalog/${c}`} class="flex items-center justify-between border-y border-b-0 border-y-black h-[30px]">
                  <p key={c} class="uppercase text-[14px]">{c}</p>
                  <i class="text-[16px] font-semibold bi bi-arrow-up-right"></i>
                </Link>
                  ))
                }
              </div>
            </div>
          </div>
        </section>
       {
         categories.slice(1, 5).map(category => (
          <Section title={category} />
         ))
       }
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
       {
         categories.slice(5, categories.length).map(category => (
          <Section title={category} />
         ))
       }
        <Section title="People also liked" />
      </div>
    </section>
  )
})