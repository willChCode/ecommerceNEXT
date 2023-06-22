import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';
import ProductItem from '@/components/ProductItem';
import { Product } from '@/models/Product';
import dataBase from '@/utils/db';
import axios from 'axios';
import { Store } from '@/utils/Store';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export default function Home({ products }) {
  console.log(products);
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async product => {
    const existItem = state.cart.cartItems.find(x => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry, product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    toast.success('Product added to cart');
  };

  return (
    <Layout title='Home page'>
      <div
        className={`${inter} grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 `}>
        {products.map(product => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await dataBase.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(dataBase.convertDocToObj)
    }
  };
}
