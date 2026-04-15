/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingCart, Star, Heart } from 'lucide-react';

// Types
type Variant = { id: string; colorName: string; colorHex: string; image: string; };
type Product = { id: string; name: string; price: string; rating: number; reviews: number; variants: Variant[]; };

// Mock Data for Products
const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Classic Cotton T-Shirt',
    price: '$24.99',
    rating: 4.5,
    reviews: 128,
    variants: [
      { id: 'v1-1', colorName: 'Navy Blue', colorHex: '#1e3a8a', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80' },
      { id: 'v1-2', colorName: 'Heather Gray', colorHex: '#9ca3af', image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=500&q=80' },
      { id: 'v1-3', colorName: 'Crimson Red', colorHex: '#991b1b', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80' },
    ]
  },
  {
    id: 'p2',
    name: 'Everyday Canvas Sneakers',
    price: '$59.00',
    rating: 4.8,
    reviews: 342,
    variants: [
      { id: 'v2-1', colorName: 'Off White', colorHex: '#f3f4f6', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=80' },
      { id: 'v2-2', colorName: 'Midnight Black', colorHex: '#111827', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=500&q=80' },
    ]
  },
  {
    id: 'p3',
    name: 'Minimalist Backpack',
    price: '$85.00',
    rating: 4.2,
    reviews: 89,
    variants: [
      { id: 'v3-1', colorName: 'Olive Green', colorHex: '#4d7c0f', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80' },
      { id: 'v3-2', colorName: 'Charcoal', colorHex: '#374151', image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=500&q=80' },
      { id: 'v3-3', colorName: 'Sand', colorHex: '#d6d3d1', image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=500&q=80' },
    ]
  },
  {
    id: 'p4',
    name: 'Athletic Performance Shorts',
    price: '$34.50',
    rating: 4.6,
    reviews: 215,
    variants: [
      { id: 'v4-1', colorName: 'Cobalt Blue', colorHex: '#2563eb', image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=500&q=80' },
      { id: 'v4-2', colorName: 'Black', colorHex: '#000000', image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&w=500&q=80' },
    ]
  }
];

function ProductCard({ product, onAddToCart, isWishlisted, onToggleWishlist }: { product: Product; onAddToCart: (variant: Variant) => void; isWishlisted: boolean; onToggleWishlist: (productId: string) => void; key?: React.Key }) {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const displayVariant = selectedVariant || product.variants[0];

  return (
    <div className="group flex flex-col text-[#222222] no-underline">
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-[#f6f6f6] mb-[16px] flex items-center justify-center overflow-hidden">
        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.preventDefault(); onToggleWishlist(product.id); }}
          className="absolute top-[10px] right-[10px] p-[8px] bg-white/90 rounded-full text-[#222222] hover:bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222] z-10 shadow-sm"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
        </button>
        <img 
          src={displayVariant.image} 
          alt={`${product.name} in ${displayVariant.colorName}`}
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        
        {/* Quick View Button */}
        <button className="absolute bottom-[10px] left-1/2 -translate-x-1/2 bg-white/90 px-[12px] py-[6px] text-[10px] uppercase tracking-[1px] border border-[#e5e5e5] opacity-0 group-hover:opacity-100 transition-opacity text-[#222222] focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#222222]">
          Quick View
        </button>
      </div>

      {/* Product Details */}
      <div className="text-left flex flex-col flex-grow">
        <div className="text-[14px] font-semibold mb-[4px] whitespace-nowrap overflow-hidden text-ellipsis">
          <a href="#" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222]">
            {product.name}
          </a>
        </div>
        <div className="text-[14px] text-[#757575] mb-[12px]">{product.price}</div>

        <div className="flex items-center justify-between mb-[12px]">
          <div className="flex items-center gap-1">
            <div className="flex text-[#222222]" aria-label={`Rating: ${product.rating} out of 5 stars`}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-[#e5e5e5] fill-current'}`} aria-hidden="true" />
              ))}
            </div>
            <span className="text-[11px] text-[#757575] ml-1">({product.reviews})</span>
          </div>
          
          {/* Color Swatches */}
          <div 
            className="flex items-center gap-[8px]" 
            role="radiogroup" 
            aria-label={`Color options for ${product.name}`}
          >
            {product.variants.map((variant) => {
              const isSelected = selectedVariant?.id === variant.id;
              // Determine if color is light to ensure contrast on the border
              const isLightColor = ['#ffffff', '#f3f4f6', '#e2e8f0', '#fefcbf', '#c6f6d5', '#f7fafc', '#d6d3d1'].includes(variant.colorHex.toLowerCase());
              
              return (
                <button
                  key={variant.id}
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`Select ${variant.colorName} color`}
                  title={variant.colorName}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedVariant(variant);
                  }}
                  className={`
                    relative w-[18px] h-[18px] rounded-full cursor-pointer transition-shadow
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222]
                    ${isSelected ? 'shadow-[0_0_0_1px_#fff,0_0_0_2px_#3b3b3b]' : 'hover:shadow-[0_0_0_1px_#fff,0_0_0_1px_#757575]'}
                    ${isLightColor ? 'border border-[#cccccc]' : 'border border-transparent'}
                  `}
                  style={{ backgroundColor: variant.colorHex }}
                />
              );
            })}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-auto pt-2">
          <button 
            disabled={!selectedVariant}
            aria-disabled={!selectedVariant}
            onClick={() => selectedVariant && onAddToCart(selectedVariant)}
            className={`w-full py-[8px] text-[12px] font-medium uppercase tracking-[1px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222] ${
              selectedVariant 
                ? 'bg-[#222222] text-white hover:bg-[#3b3b3b] cursor-pointer' 
                : 'bg-[#f6f6f6] text-[#757575] border border-[#e5e5e5] cursor-not-allowed'
            }`}
          >
            {selectedVariant ? 'Add to Cart' : 'Select a Color'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState<{product: Product, variant: Variant}[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Get all unique colors for the filter
  const allColors = Array.from(new Set(PRODUCTS.flatMap(p => p.variants.map(v => v.colorName)))).sort();

  // Filter products based on selected colors
  const filteredProducts = PRODUCTS.filter(p => 
    selectedColors.length === 0 || p.variants.some(v => selectedColors.includes(v.colorName))
  );

  const handleAddToCart = (product: Product, variant: Variant) => {
    setCart(prev => [...prev, { product, variant }]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const toggleColorFilter = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  return (
    <div className="min-h-screen bg-[#ffffff] font-sans text-[#222222] flex flex-col">
      {/* Header */}
      <header className="h-[80px] border-b border-[#e5e5e5] flex items-center justify-between px-[40px]">
        <div className="text-[20px] font-[800] tracking-[2px] uppercase">CORNERSTONE.</div>
        <nav className="hidden md:flex">
          <a href="#" className="ml-[24px] text-[13px] uppercase tracking-[1px] font-medium text-[#222222] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#222222]">New Arrivals</a>
          <a href="#" className="ml-[24px] text-[13px] uppercase tracking-[1px] font-medium text-[#222222] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#222222]">Apparel</a>
          <a href="#" className="ml-[24px] text-[13px] uppercase tracking-[1px] font-medium text-[#222222] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#222222]">Accessories</a>
          <a href="#" className="ml-[24px] text-[13px] uppercase tracking-[1px] font-medium text-[#222222] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#222222]">Sale</a>
        </nav>
        <div className="flex items-center gap-4">
          <button 
            className="p-2 hover:bg-[#f6f6f6] rounded-full transition-colors relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222]" 
            aria-label={`Wishlist with ${wishlist.length} items`}
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span 
                className="absolute -top-1 -right-1 bg-[#222222] text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center"
                aria-live="polite"
              >
                {wishlist.length}
              </span>
            )}
          </button>
          <button 
            className="p-2 hover:bg-[#f6f6f6] rounded-full transition-colors relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222]" 
            aria-label={`Cart with ${cart.length} items`}
          >
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span 
                className="absolute -top-1 -right-1 bg-[#222222] text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center"
                aria-live="polite"
              >
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-[40px] flex flex-col max-w-[1440px] mx-auto w-full">
        <div className="mb-[30px] border-l-[4px] border-[#3b3b3b] pl-[20px]">
          <h1 className="text-[28px] font-normal mb-[8px]">Contemporary Essentials</h1>
          <p className="text-[#757575] text-[14px]">Refined basics for the modern minimalist. {filteredProducts.length} Items.</p>
        </div>

        {/* Color Filters */}
        <div className="mb-[40px] flex flex-wrap gap-[8px] items-center" role="group" aria-label="Filter products by color">
          <span className="text-[13px] font-medium text-[#757575] mr-[8px]" id="color-filter-label">Filter by Color:</span>
          {allColors.map(color => {
            const isSelected = selectedColors.includes(color);
            return (
              <button
                key={color}
                aria-pressed={isSelected}
                aria-labelledby="color-filter-label"
                onClick={() => toggleColorFilter(color)}
                className={`
                  px-[12px] py-[6px] text-[12px] border rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222]
                  ${isSelected 
                    ? 'bg-[#222222] text-white border-[#222222]' 
                    : 'bg-white text-[#222222] border-[#e5e5e5] hover:border-[#757575]'
                  }
                `}
              >
                {color}
              </button>
            );
          })}
          {selectedColors.length > 0 && (
            <button 
              onClick={() => setSelectedColors([])} 
              className="text-[12px] text-[#757575] hover:text-[#222222] underline ml-[8px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222]"
              aria-label="Clear all color filters"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px]">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={(variant) => handleAddToCart(product, variant)}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="py-[60px] text-center text-[#757575] bg-[#f6f6f6] rounded-lg border border-[#e5e5e5]">
            <p className="text-[16px] mb-[8px]">No products match the selected colors.</p>
            <button 
              onClick={() => setSelectedColors([])}
              className="text-[14px] text-[#222222] underline font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#222222]"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      <footer className="h-[60px] px-[40px] border-t border-[#e5e5e5] flex items-center justify-between text-[11px] text-[#757575]">
        <div>&copy; 2024 Cornerstone Light. All Rights Reserved.</div>
        <div>Dev Contact: rafaela.kurumoto@coalitiontechnologies.com</div>
      </footer>
    </div>
  );
}
