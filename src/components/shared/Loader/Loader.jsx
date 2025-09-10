import React from "react";

export default function Loader() {
  return (
    <>
      {/* <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div> */}

      <div className="flex justify-center items-center h-screen">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 120 120"
          width="350"
          height="350"
          role="img"
          aria-label="Loading cart"
        >
          <style>
            {`
      @keyframes cart-bob {
        0%   { transform: translateX(0) translateY(0); }
        50%  { transform: translateX(6px) translateY(-3px); }
        100% { transform: translateX(0) translateY(0); }
      }
      @keyframes wheel-spin {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes item-pop {
        0%   { transform: translateY(6px) scaleY(0.9); opacity: 0; }
        40%  { transform: translateY(-2px) scaleY(1.02); opacity: 1; }
        100% { transform: translateY(0) scaleY(1); opacity: 1; }
      }
      .cart { animation: cart-bob 1.3s ease-in-out infinite; transform-origin: 60px 60px; }
      .wheel { transform-origin: center; animation: wheel-spin 1s linear infinite; }
      .wheel.right { animation-delay: 0.05s; }
      .item-1 { animation: item-pop 1.1s ease-in-out infinite; animation-delay: 0s; }
      .item-2 { animation: item-pop 1.1s ease-in-out infinite; animation-delay: 0.15s; }
      .item-3 { animation: item-pop 1.1s ease-in-out infinite; animation-delay: 0.28s; }
    `}
          </style>

          <g
            className="cart"
            stroke="#0aad0a"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 30 H86 L98 64 H44 L38 48 H24 Z" fill="none" />
            <line x1="20" y1="30" x2="12" y2="12" />
            <g fill="#0aad0a">
              <rect
                className="item-1"
                x="46"
                y="36"
                width="10"
                height="8"
                rx="1"
              />
              <rect
                className="item-2"
                x="58"
                y="30"
                width="14"
                height="12"
                rx="1"
              />
              <rect
                className="item-3"
                x="76"
                y="38"
                width="8"
                height="6"
                rx="1"
              />
            </g>
            <circle className="wheel left" cx="44" cy="78" r="8" fill="none" />
            <circle className="wheel right" cx="86" cy="78" r="8" fill="none" />
            <circle cx="44" cy="78" r="2.5" fill="#0aad0a" />
            <circle cx="86" cy="78" r="2.5" fill="#0aad0a" />
          </g>
        </svg>
      </div>
    </>
  );
}
