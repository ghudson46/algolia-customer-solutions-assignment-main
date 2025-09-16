// add dependencies
import { readFile } from "fs/promises";
import dotenv from "dotenv";
import { algoliasearch } from "algoliasearch";

// load environmental variables
dotenv.config();

const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
const ALGOLIA_INDEX = process.env.ALGOLIA_INDEX;

// make connection to Algolia to allow requests
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

async function uploadData() {
  try {
    // get data from products.json and converts it to JSON
    const originalData = await readFile("./data/products.json", "utf-8");
    const products = JSON.parse(originalData);

    // iterate through products and find the ones where "camera" is in the category/hierarchical category
    const updatedProducts = products.map(product => {
      const isCameraCategory =
        product.categories?.some(cat => cat.toLowerCase().includes("camera")) ||
        Object.values(product.hierarchicalCategories || {}).some(cat =>
          cat.toLowerCase().includes("camera")
        );

    // if the category contains "camera", take 20% off the price and round down to nearest whole number
      if (isCameraCategory) {
        const discountedPrice = Math.floor(product.price * 0.8);
        return { 
            ...product, 
            price: discountedPrice 
        };
      }
      return product;
    });

    // save all the updated product data into my Algolia instance in the products index 
    const response = await client.saveObjects({
      indexName: ALGOLIA_INDEX,
      objects: updatedProducts,
      autoGenerateObjectIDIfNotExist: true // <-- creates unique objectID
    });

    console.log(`Successfully submitted ${updatedProducts.length} products to Algolia.`);
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
}

uploadData();
