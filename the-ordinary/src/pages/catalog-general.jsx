import { Component } from "@mejor";
import { Link } from "@mejor/router";
import { AdBanner, ProductSection, ProductCard, SectionHeader } from "@app/components/reusables";
import { getProductsByCategory, getUniqueCategories } from
"@app/services/methods";

const Section = Component(({ title }) => {
  const products = getProductsByCategory(title);
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

const Sidebar = Component(({ categories }) => (
  <aside class="w-[250px] sdbr pt-5 hidden md:block h-full bg">
    <h1 class="text-[24px] font-semibold uppercase my-3">
      categories
    </h1>
    <div class="w-full flex flex-col gap-x-2">
      <ul class="min-w-full">
        {
          categories.map((c) => (
            <li class="w-full" key={c}>
              <Link class="whitespace-nowrap" to={`/catalog/${c}`}>{c}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  </aside>
))

export default Component(() => {
  const categories = getUniqueCategories();
  return (
    <div key="main-catalog-page" class="w-full h-full md:flex md:gap-x-6 m-0 bg-white">
      <Sidebar categories={categories} />
      <section class="pt-5 no-scrollbar w-full h-full md:overflow-x-hidden md:overflow-y-scroll">
        {
           categories.map(category => (
            <Section title={category} />
           ))
         }
      </section>
    </div>
  );
});