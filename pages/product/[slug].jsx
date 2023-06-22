import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '@/utils/Store';
import dataBase from '@/utils/db';
import { Product } from '@/models/Product';
import axios from 'axios';
import { toast } from 'react-toastify';

function ProductScreen({ product }) {
  const { state, dispatch } = useContext(Store);

  const router = useRouter();

  if (!product) {
    return (
      <Layout title='Product not found'>
        <div>Product not found</div>
      </Layout>
    );
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find(x => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    console.log(data);
    if (data.countInStock < quantity) {
      return toast.error('Sorry, product is out of stock');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={product.name}>
      <div className='py-2'>
        <Link href='/'>Back to products...</Link>
      </div>
      <div className='grid md:grid-cols-4 md:gap-3'>
        <div className='md:col-span-2'>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout='responsive'
          />
        </div>
        <div className='border-2'>
          <ul>
            <li>
              <h1 className='text-lg'>{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className='card p-5'>
            <div className='mb-2 flex justify-around'>
              <h1>PRICE :</h1>
              <h1>${product.price}</h1>
            </div>
            <div className='mb-2 flex justify-around'>
              <h1>STATUS :</h1>
              <h1>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</h1>
            </div>
            <button
              className='primary-button w-full'
              onClick={addToCartHandler}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductScreen;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await dataBase.connect();
  const product = await Product.findOne({ slug }).lean();
  await dataBase.disconnect();
  return {
    props: {
      product: product ? dataBase.convertDocToObj(product) : null
    }
  };
}
