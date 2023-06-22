import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

function ShippingScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('FullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country, location }
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country
        }
      })
    );
    router.push('/payment');
  };
  console.log(state);
  return (
    <Layout title='Shipping'>
      <CheckoutWizard activeStep={1} />
      <form
        onSubmit={handleSubmit(submitHandler)}
        className='mx-auto max-w-screen-md'>
        <h1 className='mb-4 text-xl'>Shiping Address</h1>
        <div className='mb-4'>
          <label htmlFor='fullName'>Full Name</label>
          <input
            className='w-full'
            id='fullName'
            autoFocus
            {...register('fullName', {
              required: 'Please enter full name'
            })}
          />
          {errors.fullName && (
            <div className='text-red-500'>{errors.fullName.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor='address'>Address</label>
          <input
            className='w-full'
            id='address'
            {...register('address', {
              required: 'Please enter address',
              minLength: { value: 3, message: 'Address is more than 2 chars' }
            })}
          />
          {errors.address && (
            <div className='text-red-500'>{errors.address.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor='city'>City</label>
          <input
            className='w-full'
            id='city'
            {...register('city', {
              required: 'Please enter city'
            })}
          />
          {errors.city && (
            <div className='text-red-500 '>{errors.city.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor='postalCode'>Postal Code</label>
          <input
            className='w-full'
            id='postalCode'
            {...register('postalCode', {
              required: 'Please enter postal code'
            })}
          />
          {errors.postalCode && (
            <div className='text-red-500 '>{errors.postalCode.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <label htmlFor='country'>Country</label>
          <input
            className='w-full'
            id='country'
            {...register('country', {
              required: 'Please enter country'
            })}
          />
          {errors.country && (
            <div className='text-red-500 '>{errors.country.message}</div>
          )}
        </div>
        <button className='primary-button'>Next</button>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;

export default ShippingScreen;
