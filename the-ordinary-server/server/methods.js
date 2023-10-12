import didYouMean from "didyoumean";
import db from "../db.json" assert { type: "json" };


function get_products() {
  return db;
}

function getUniqueCategories() {
  const products = get_products() || [];
  const categories = new Set();

  for (let i = 0; i < products.length; i++) {
    categories.add(products[i].category);
  }

  return Array.from(categories);
}

function getProductsByCategory(categoryName) {
  const products = get_products() || [];
  const filteredProducts = products.filter(
    (product) => {
     return product?.category === categoryName;
    }
  );

  return filteredProducts;
}

function searchProducts(searchString, limit = 10) {
  const products = get_products() || [];
  
  const matchingProducts = products.filter((product) => {
    const productTitle = product.product_title.toLowerCase();
    const category = product.category.toLowerCase();
    const slug = product.slug.toLowerCase();
    const search = searchString.toLowerCase();

    // Check if the product title, category, or slug contains the search string
    return (
      productTitle.includes(search) ||
      category.includes(search) ||
      slug.includes(search)
    );
  });

  // If no matching products found, search for the suggestion and append it to the matching products
  if (matchingProducts.length === 0) {
    const options = products.map((product) => product.product_title);
    const suggestion = didYouMean(searchString, options);
    if (suggestion) {
      const suggestedProduct = products.find((product) => product.product_title === suggestion);
      if (suggestedProduct) {
        matchingProducts.push(suggestedProduct);
      }
    }
  }

  // Sort the matching products based on similarity to the search string
  matchingProducts.sort((a, b) => {
    const productTitleA = a.product_title.toLowerCase();
    const productTitleB = b.product_title.toLowerCase();
    const categoryA = a.category.toLowerCase();
    const categoryB = b.category.toLowerCase();
    const slugA = a.slug.toLowerCase();
    const slugB = b.slug.toLowerCase();
    const search = searchString.toLowerCase();

    // Calculate the similarity score for product titles, categories, and slugs
    const similarityScoreA =
      (productTitleA.match(new RegExp(search, "g")) || []).length +
      (categoryA.match(new RegExp(search, "g")) || []).length +
      (slugA.match(new RegExp(search, "g")) || []).length;

    const similarityScoreB =
      (productTitleB.match(new RegExp(search, "g")) || []).length +
      (categoryB.match(new RegExp(search, "g")) || []).length +
      (slugB.match(new RegExp(search, "g")) || []).length;

    // Sort in descending order of similarity score
    return similarityScoreB - similarityScoreA;
  });

  // Return the limited result based on the specified limit
  return matchingProducts.slice(0, limit);
}

  didYouMean.threshold = 0.7;
  didYouMean.caseSensitive = false;
  
function getSuggestions(userInput) {
  const products = get_products() || [];
  const options = products.map((product) => product.product_title);
  const suggestions = didYouMean(userInput, options);
  return suggestions || [];
}


function findBySlug(slug) {
  const products = get_products() || [];
  const product = products.find(product => product.slug === slug);
  return product;
}

export { getProductsByCategory, getUniqueCategories, searchProducts, findBySlug };