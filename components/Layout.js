import Cookies from 'js-cookie';
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { Store } from '@/utils/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from '@headlessui/react';

function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const [cartItemsCount, setCartItemsCount] = useState();

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <Head>
        <title>{title ? title + '- Amazona' : 'Amazona'}</title>
        <meta name='description' content='Ecommerce web site' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ToastContainer position='bottom-center' limit={1} />
      <div className='flex flex-col min-h-screen justify-between '>
        <header>
          <nav className='flex justify-between py-4 px-[3rem] shadow-md'>
            <Link href='/' className='text-lg font-bold'>
              Amazona
            </Link>
            <div className='flex gap-4'>
              <Link href='/cart'>
                Cart
                {cartItemsCount > 0 && (
                  <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {status === 'loading' ? (
                'Loading...'
              ) : session?.user ? (
                <Menu as='div' className='relative inline-block'>
                  <Menu.Button className='text-blue-600 '>
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className='absolute right-0 w-56 origin-top-right shadow-lg'>
                    <Menu.Item>
                      <Link href='/profile' className='dropdown-link'>
                        Profile
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link href='/order-history' className='dropdown-link'>
                        Order History
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        href='#'
                        onClick={logoutClickHandler}
                        className='dropdown-link'>
                        Logout
                      </a>
                    </Menu.Item>
                    {/* <Menu.Item>
                      <DropdownLink
                        href='/order-history'
                        className='dropdown-link'>
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink href='/login' className='dropdown-link'>
                        <span onClick={logoutClickHandler}>Logout</span>
                      </DropdownLink>
                    </Menu.Item> */}
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href='/login'>Login</Link>
              )}
            </div>
          </nav>
        </header>
        <main className='container m-auto border-2 mt-4 px-2'>{children}</main>
        <footer className='flex justify-center items-center shadow-inner p-4'>
          footer
        </footer>
      </div>
    </>
  );
}

export default Layout;
