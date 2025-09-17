// src/data/checkProducts.js

// Import your product list (ES module syntax)
import { PRODUCT_LIST } from "./productList.js"; // make sure the path is correct

// Extract all IDs
const ids = PRODUCT_LIST.map(p => p.id);

// Find duplicates
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

// Get unique duplicate IDs
const uniqueDuplicates = [...new Set(duplicates)];

// Count total products
const totalProducts = PRODUCT_LIST.length;

// Output results
console.log("Total products:", totalProducts);
if (uniqueDuplicates.length > 0) {
  console.log("Duplicate IDs found:", uniqueDuplicates);
  uniqueDuplicates.forEach(id => {
    const dupProducts = PRODUCT_LIST.filter(p => p.id === id).map(p => p.name);
    console.log(`ID ${id} is used by products:`, dupProducts);
  });
} else {
  console.log("No duplicate IDs found!");
}
