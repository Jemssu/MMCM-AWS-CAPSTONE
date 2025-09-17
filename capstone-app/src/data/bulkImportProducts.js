import { getProducts } from "./importProducts.js";
import { AWSAppSyncClient, AUTH_TYPE } from "aws-appsync";
import gql from "graphql-tag";
import fetch from "cross-fetch";
import { v4 as uuidv4 } from "uuid"; // to generate unique IDs

// AppSync client config
const client = new AWSAppSyncClient({
    url: "https://bdrldptzdfh4hpmu3lxtfgc3rm.appsync-api.ap-southeast-1.amazonaws.com/graphql",
    region: "ap-southeast-1",
    auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: "da2-xgfdc64x4fdlnolvnqorixbgcq",
    },
    disableOffline: true,
    fetch,
});

// GraphQL mutation
const CREATE_PRODUCT = gql`
    mutation CreateProduct($input: CreateProductInput!) {
        createProduct(input: $input) {
            id
            name
            salePrice
        }
    }
`;

// Test connection
const TEST_QUERY = gql`query { __typename }`;

const bulkImport = async () => {
    try {
        await client.query({ query: TEST_QUERY });
        console.log("✅ Connected to AppSync successfully!");
    } catch (err) {
        console.error("❌ Failed to connect to AppSync:", err);
        return;
    }

    const products = getProducts(); // array of products

    // Ensure unique IDs
    const seenIds = new Set();
    products.forEach(p => {
        if (!p.id || seenIds.has(p.id)) {
            p.id = uuidv4(); // generate new unique ID
        }
        seenIds.add(p.id);
    });

    for (const product of products) {
        const input = {
            id: product.id,
            name: product.name,
            category: product.category,
            variant: product.variant || null,
            description: product.description || null,
            originalPrice: product.originalPrice,
            onSale: product.onSale,
            salePrice: product.salePrice || 0.0,
            imageUrl: product.imageUrl || null,
            baseUrl: product.baseUrl || null,
            stock: product.stock,
            isActive: product.isActive,
        };

        try {
            const result = await client.mutate({
                mutation: CREATE_PRODUCT,
                variables: { input },
            });
            console.log(`✅ Created: ${result.data.createProduct.name}`);
        } catch (err) {
            console.error(`❌ Error creating product ${product.name}:`, err);
        }
    }

    console.log("🎉 Bulk import complete!");
};

bulkImport();
