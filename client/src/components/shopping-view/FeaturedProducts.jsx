// src/components/shopping-view/FeaturedProducts.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { Loader2 } from "lucide-react";

export default function FeaturedProducts() {
  const dispatch = useDispatch();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  // Safe destructuring
  const shopProductsState = useSelector((state) => state.shopProducts) || {};
  const { productList = [], productDetails = null, isLoading = false } = shopProductsState;

  // Fetch all products on mount
  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "" }));
  }, [dispatch]);

  // Open modal when productDetails updates
  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  // Pick 6 random products
  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const featuredProducts = getRandomProducts(productList || [], 6);

  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };

  return (
    <section className="py-10 bg-gray-50 mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🌟 Featured Products
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
          <span className="ml-3 text-gray-600">Loading featured products...</span>
        </div>
      ) : featuredProducts?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-10">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => handleGetProductDetails(product._id)}
              className="cursor-pointer"
            >
              <ShoppingProductTile
                product={{
                  ...product,
                  image: product.image || product.imageUrl, // fallback for image
                }}
                handleGetProductDetails={handleGetProductDetails}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No featured products found.</p>
      )}

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </section>
  );
}

