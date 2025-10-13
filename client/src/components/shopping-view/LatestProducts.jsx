// src/components/shopping-view/LatestProducts.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import ProductDetailsDialog from "@/components/shopping-view/product-details";

export default function LatestProducts() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { isLoading, productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  // 🟢 Fetch all products
  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "newest" }));
  }, [dispatch]);

  // 🕐 Filter only products added in last 24 hours
  const latestProducts = productList?.filter((product) => {
    const addedTime = new Date(product.createdAt);
    const now = new Date();
    const diffInHours = (now - addedTime) / (1000 * 60 * 60);
    return diffInHours <= 24;
  });

  const productsToDisplay = latestProducts?.length > 0 ? latestProducts : productList;

  // 🟢 Open details dialog when productDetails updates
  useEffect(() => {
    if (productDetails) setOpenDetailsDialog(true);
  }, [productDetails]);

  // 🛒 Add to cart logic
  function handleAddtoCart(productId, totalStock) {
    const cartList = cartItems.items || [];

    const existingItem = cartList.find((item) => item.productId === productId);
    if (existingItem && existingItem.quantity + 1 > totalStock) {
      toast({
        title: `Only ${existingItem.quantity} quantity can be added for this item.`,
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product added to cart!" });
      }
    });
  }

  // 🟢 Get details of clicked product
  function handleGetProductDetails(productId) {
    dispatch(fetchProductDetails(productId));
  }

  return (
    <section className="py-10  mt-30">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🆕 Latest Products
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center py-10 lg: mt-20">
          <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
          <span className="ml-3 text-gray-600">Loading latest products...</span>
        </div>
      ) : productsToDisplay?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-10">
          {productsToDisplay.map((productItem) => (
            <ShoppingProductTile
              key={productItem._id}
              product={productItem}
              handleGetProductDetails={handleGetProductDetails}
              handleAddtoCart={handleAddtoCart}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found in the last 24 hours.</p>
      )}

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </section>
  );
}

