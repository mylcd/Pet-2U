import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/HomePage';
import CartPage from '../components/CartPage';
import OrderPage from '../components/OrderPage';
import ProductSearchPage from '../components/ProductSearchPage';
import StorePage from '../components/StorePage';
import StoreCreateForm from '../components/StoreCreateForm';
import StoreEditForm from '../components/StoreEditForm';
import ProductCreateForm from '../components/ProductCreateForm';
import ProductPage from '../components/ProductPage';
import ProductEditForm from '../components/ProductEditForm';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "carts",
        element: <CartPage />,
      },
      {
        path: "orders",
        element: <OrderPage />,
      },
      {
        path: "products/:id/edit",
        element: <ProductEditForm />,
      },
      {
        path: "products/:id",
        element: <ProductPage />,
      },
      {
        path: "products",
        element: <ProductSearchPage />,
      },
      {
        path: "stores/new",
        element: <StoreCreateForm />,
      },
      {
        path: "stores/:id/edit",
        element: <StoreEditForm />,
      },
      {
        path: "stores/:id/new",
        element: <ProductCreateForm />,
      },
      {
        path: "stores/:id",
        element: <StorePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
