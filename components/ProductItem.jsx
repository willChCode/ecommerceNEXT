import React from 'react';
import Link from 'next/link';

function ProductItem({ product, addToCartHandler }) {
  return (
    <div className='card'>
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className='rounded shadow'
        />
      </Link>
      <div className='flex flex-col items-center justify-center border-2 py-4'>
        <Link href={`/product/${product.slug}`} className='text-lg'>
          {product.name}
        </Link>
        <p className='mb-2'>{product.branch}</p>
        <p>${product.price}</p>
        <button
          onClick={() => addToCartHandler(product)}
          className='primary-button mt-2'
          type='button'>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
