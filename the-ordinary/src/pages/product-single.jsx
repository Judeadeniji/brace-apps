import { Component, reactive } from "@mejor";
import { ProductSection, ProductCard } from "@app/components/reusables";
import Image from "@app/components/image";
import { add_to_cart } from "@app/services/cart-store";
import { get_recently_viewed, set_recently_viewed } from "@app/services/product-store";
import { findBySlug, getProductsByCategory } from "@app/services/methods";


const ProductImages = Component(({ src }) => {
  return (
    <div class="w-full h-[320px] md:h-full gap-y-2 flex flex-col overflow-hidden rounded-md m-0">
      <div class="w-full h-2/3">
        <figure class="bg-background w-full h-full">
          <Image class="w-full h-full object-cover" src={src} alt={src} width="auto" height="auto" />
        </figure>
      </div>
      <div class="w-full h-1/3 gap-x-2 flex">
        <figure class="w-1/3 bg-background h-full">
          <Image class="w-full h-full object-cover" src={src} alt={src} width="auto" height="auto" />
        </figure>
        <figure class="w-1/3 bg-background h-full">
          <Image class="w-full h-full object-cover" src={src} alt={src} width="auto" height="auto" />
        </figure>
        <figure class="w-1/3 bg-background h-full">
          <Image class="w-full h-full object-cover" src={src} alt={src} width="auto" height="auto" />
        </figure>
      </div>
    </div>
  )
})

const ProductMeta = Component(() => (
  <div class="w-full px-2 md:px-0">
    <div class="border-b-[0.8px] mb-1 border-b-accent py-1 w-full">
      <h5 class="mb-1 font-bold text-[16px] md:text-[18px]">
        Product Description
      </h5>
      <p class="text-[14px] mt-1 md:text-[16px]">
        Explore the remarkable features and benefits of this product.
      </p>
    </div>
  
    <div class="border-b-[0.8px] mb-1 border-b-accent py-1 w-full">
      <h5 class="mb-1 font-bold text-[16px] md:text-[18px]">
        Highlights
      </h5>
      <p class="text-[14px] mt-1 md:text-[16px]">
        Discover the key features and advantages of this product.
      </p>
    </div>
  
    <div class="border-b-[0.8px] mb-1 border-b-accent py-1 w-full">
      <h5 class="mb-1 font-bold text-[16px] md:text-[18px]">
        Suitable For
      </h5>
      <p class="text-[14px] mt-1 md:text-[16px]">
        Ideal for various uses and applications.
      </p>
    </div>
  
    <div class="border-b-[0.8px] mb-1 border-b-accent py-1 w-full">
      <h5 class="mb-1 font-bold text-[16px] md:text-[18px]">
        Format
      </h5>
      <p class="text-[14px] mt-1 md:text-[16px]">
        Available in different formats to suit your preferences.
      </p>
    </div>
  
    <div class="border-b-[0.8px] mb-1 border-b-accent py-1 w-full">
      <h5 class="mb-1 font-bold text-[16px] md:text-[18px]">
        Key Features
      </h5>
      <p class="text-[14px] mt-1 md:text-[16px]">
        Experience the power of the standout features that make this product exceptional.
      </p>
    </div>
  </div>
  ))

const ProductDetails = Component(({ item }) => {
  const product = { ...item, _count: reactive(1)};
  const { product_title, variant, review, price, discount, count, _count, id } = product;
  set_recently_viewed(id)
  const selectedVariant = reactive(product?.variant[0]);
  
  const increment = () => _count.value++
  const decrement = () => {
    if (_count.value < 2) return;
    _count.value--
  }
  
  const addToCart = () => {
    // store the count value
    const quantity = Number.parseInt(_count.value);
    add_to_cart({
      ...product,
         quantity,
    });
    // reset it back to 1
    _count.value = 1;
  }
  
  const renderStars = () => {
    const fullStars = Math.floor(review);
    const hasHalfStar = review - fullStars >= 0.5;
    
    const stars = [];
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} class="bi bi-star-fill" />);
    }
  
    if (hasHalfStar) {
      stars.push(<span key="half" class="bi bi-star-half" />);
    }
  
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={i + fullStars} class="bi bi-star" />);
    }
  
    return stars;
}

  
  return (
    <div class="w-full">
      <div class="flex flex-col gap-y-3">
        <h4 class="text-[18px] md:text-[24px] lg:text-[26px] font-semibold">
          {product_title}
        </h4>
        
        <div class="flex justify-between gap-x-2 w-[40%] text-[13px]">
          <div class="flex gap-x-1">
            {renderStars()}
          </div>
          
          <span class="text-gray-400">{review}</span>
          
          <span class="text-gray-400">({count})</span>
        </div>

        
        <div class="my-5 w-[45%] flex justify-between gap-x-4 items-center">
        {variant.length > 1 ? (
          <div class="flex border border-accent whitespace-nowrap h-[28px] w-auto">
            {variant.map((item, index) => (
              <div
                key={index}
                class={`w-1/${variant.length} px-2 h-full ${
                  item === selectedVariant.value ? 'bg-accent text-basic' :
                  `bg-basic text-accent ${index !== variant.length -1 ?
                  'border-r' : ''} border-r-accent`
                } flex items-center justify-center text-sm`}
              >
                {item.trim().split("").slice(0,5).join("")}
              </div>
            ))
            }
          </div>
        ) : <comment />}
          <p class="font-bold text-[13px]">${!discount ? price :
          (price - (price * (discount/100))).toFixed(2)}</p>
        </div>
        
        <ProductMeta />
        
        <div class="flex mt-4 gap-x-4 items-center h-[34px]">
          <div class="flex w-[100px] h-full border border-accent">
            <button click$={decrement} class="flex w-1/3 h-full items-center
            justify-center font-bold text-[12px] border-r border-r-accent">
              -
            </button>
            <p class="flex w-1/3 h-full items-center justify-center
            font-semibold text-[16px]" sync:textContent={_count} />
            <button click$={increment} class="flex w-1/3 h-full items-center
            justify-center font-bold text-[12px] border-l border-l-accent">
              +
            </button>
          </div>
          <button class="bg-accent w-[150px] h-full text-basic uppercase
          text-[12px] font-semibold"
          click$={addToCart}>
            Add to basket
          </button>
        </div>
      </div>
    </div>
  )
});

const section = reactive(1);


const ProductDescHeader = ({ index }) => {
  
  const active = "border-b-2 font-bold border-b-accent"
  
  return (
   <div class="transition-all duration-300 border-b h-[34px] text-[14px] font-semibold border-b-accent flex gap-x-6 items-start">
      <div class={`${index.value === 1 ? active : ""} h-full py-1 flex items-center justify-center`}
      click$={() => index.value = 1}>
        Description
      </div>
      
      <div class={`${index.value === 2 ? active : ""} h-full py-1 flex items-center justify-center`}
      click$={() => index.value = 2}>
        Additional Information
      </div>
      
      <div class={`${index.value === 3 ? active : ""} h-full py-1 flex items-center justify-center`} click$={() => index.value = 3}>
        Reviews (13)
      </div>
    </div>
  )
}

const ProductDescBody = Component(({ index }) => (
    <p class="font-semibold py-1 text-[12px]">
      zebra problem pencil joke churn skin care lorem dolor illness virtual festival work piano limit exchange festival.
      Tap on the headers to Switch rows.
    </p>
  )
)

const ProductAdditionalInfo = Component(() => (
    <p class="font-semibold py-1 text-[12px]">
      Any other Additional info will be seen here.
      Tap on the headers to Switch rows.
    </p>
))

const ProductReviews = Component(() => (
    <p class="font-semibold py-1 text-[12px]">
      Reviews will be here. Customer Reviews are a good thing.
    </p>
))

const ProductDesc = () => {
  
  return (
    <div class="h-full w-full">
      <ProductDescHeader index={section} />
      
      <div class="w-full mt-3 md:pr-5">
        {
          section.value === 1 ?
          <ProductDescBody index={section} /> : 
          section.value === 2 ?
          <ProductAdditionalInfo index={section} /> :
          <ProductReviews index={section} />
        }
      </div>
    </div>
  )
}

const Recent = () => {
  const recents = get_recently_viewed() || [];
  
  return (
      recents.length > 2 ?
      (<div class="w-full my-16">
        <ProductSection title="Recently Viewed">
        {recents.map(({id, image, product_title, price, discount, isFavorite, slug, category }) => (
          <ProductCard {...{id, image, price, discount, title: product_title, category, isFavorite, slug}} />
        ))
        }
        </ProductSection>
      </div>) : <comment />
  )
}

const Similar = ({ similar, item }) => (
    <ProductSection title="similar products" link={`/catalog/${item.category}`}>
        {
          similar.map(({id, image, product_title, price, discount, isFavorite, slug, category }) => (<ProductCard {...{id, image, price, discount, title: product_title, category, isFavorite, slug}} />)).reverse()
        }
    </ProductSection>
)

export default Component(({ params }) => {
  const item = findBySlug(params.slug);
  const similar = getProductsByCategory(item.category) || [];
  return (
    <div key={`product-${params.slug}`} class="mt-5 mb-0 mx-0">
      <div class="w-full md:gap-x-4 md:flex">
        <div class="mb-8 md:mb-0 md:w-1/2 lg:w-1/3">
          <ProductImages src={item.image} />
        </div>
        <div class="md:w-1/2 lg:w-2/3">
          <ProductDetails item={item} />
        </div>
      </div>
      
      <div class="w-full my-16">
        <ProductDesc />
      </div>
      
      <div class="w-full my-16">
        <Similar item={item} similar={similar} />
      </div>
      
      <Recent />
    </div>
  )
})
