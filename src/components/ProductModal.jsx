import { useState } from 'react';

export default function ProductModal({ product, onClose }) {
  // 1. State for interactivity
  const [activeImage, setActiveImage] = useState(product?.image_urls?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.available_colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product?.available_sizes?.[0] || null);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans">
      <div className="bg-[#0f172a] border border-gray-800 rounded-xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800/50 rounded-full p-2 z-10 transition-colors"
        >
          ✕
        </button>

        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 p-6 flex flex-col bg-black/20">
          {/* Main Hero Image */}
          <div className="w-full aspect-square bg-white rounded-lg overflow-hidden flex items-center justify-center mb-4 shadow-inner">
            <img 
              src={activeImage} 
              alt={product.title} 
              className="w-full h-full object-contain transition-all duration-500"
            />
          </div>

          {/* Sub-Hero Thumbnails (Interactive) */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {product.image_urls?.map((url, index) => (
              <div 
                key={index}
                onClick={() => setActiveImage(url)}
                className={`w-20 h-20 flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 transition-all duration-200 ${
                  activeImage === url 
                    ? 'border-cyan-400 scale-105 shadow-[0_0_10px_rgba(34,211,238,0.3)]' 
                    : 'border-transparent hover:border-gray-600 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={url} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto max-h-[85vh]">
          
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-gray-800 border border-gray-700 text-[10px] font-bold tracking-widest text-gray-300 rounded-full uppercase">
              ⚡ {product.category || 'TECH'}
            </span>
            <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase animate-pulse">
              • System Online
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-white leading-tight mb-2 uppercase italic tracking-tighter">
            {product.title}
          </h2>
          
          <div className="flex items-center gap-2 mb-6 text-xs text-gray-500 font-bold tracking-widest">
            <span className="text-cyan-400">★★★★★</span>
            <span>VEXA-CERTIFIED (163 REVIEWS)</span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium">
            {product.description}
          </p>

          {/* Dynamic Selection Engine */}
          <div className="flex flex-col gap-6 mb-8">
            
            {/* Colors */}
            {product.available_colors && product.available_colors.length > 0 && (
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black block mb-3">Colorway Selection</span>
                <div className="flex flex-wrap gap-2">
                  {product.available_colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-xs font-bold rounded border transition-all duration-200 uppercase tracking-wider ${
                        selectedColor === color 
                          ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                          : 'border-gray-800 text-gray-500 hover:border-gray-600 hover:text-white'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes / Plugs */}
            {product.available_sizes && product.available_sizes.length > 0 && (
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black block mb-3">Hardware Variant</span>
                <div className="flex flex-wrap gap-2">
                  {product.available_sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-xs font-bold rounded border transition-all duration-200 uppercase tracking-wider ${
                        selectedSize === size 
                          ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                          : 'border-gray-800 text-gray-500 hover:border-gray-600 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex-grow"></div>

          {/* Pricing & Checkout */}
          <div className="pt-6 border-t border-gray-800 mt-4">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black block mb-1">Global Unit Price</span>
            <div className="text-4xl font-black text-white mb-6 tracking-tighter">
              R {product.price_zar || '0.00'}
            </div>
            
            <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black tracking-[0.2em] py-5 rounded-lg uppercase transition-all shadow-[0_0_25px_rgba(34,211,238,0.2)] active:scale-95">
              Initialize Order
            </button>
            <div className="text-center mt-4 text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">
              Secure Vexa-Sync Protocol Active
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}