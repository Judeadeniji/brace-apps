import fs from 'node:fs';
import fetch from 'node-fetch';

const forEach = (arr, cb) => arr.forEach(cb);

const host = "http://localhost:8123/api";

// Function to fetch the image URL from a remote host based on the product title
async function fetchImage(productTitle) {
  return null;
  try {
    const response = await fetch(`${host}/image?q=${encodeURIComponent(productTitle)}`);
    const images = await response.json();
    return images.response[5];
  } catch (err) {
    console.error('Error fetching image:', err);
    return null;
  }
}

// Function to convert image to base64
async function imageToBase64(imageUrl) {
  try {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer.toString('base64');
  } catch (err) {
    console.error('Error converting image to base64:', err);
    return null;
  }
}

// Function to update the image property on each product object
async function updateProductImages(_products) {
  const products = [..._products];
  for (const product of products) {
    console.log(product.product_title, `(${products.indexOf(product) + 1}/${products.length})`);
   // const imageUrl = await fetchImage(product.product_title);
    if (product.image.includes("encrypted")) {
      const base64Image = await imageToBase64(product.image);
      product.image = base64Image || product.image;
    }
  }
  return products;
}

// Read the "db.json" file
fs.readFile('./db.json', 'utf8', async (err, data) => {
  if (err) {
    console.error('Error reading "db.json" file:', err);
    return;
  }

  try {
    const products = JSON.parse(data);

    // Update product images
    const updatedProducts = await updateProductImages(products);

    // Save the updated JSON file back
    fs.writeFile('./db.json', JSON.stringify(updatedProducts, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error saving updated "db.json" file:', err);
      } else {
        console.log('Updated "db.json" file successfully.');
      }
    });
  } catch (err) {
    console.error('Error parsing JSON:', err);
  }
});