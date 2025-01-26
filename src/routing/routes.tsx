import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";
import AssetHeadersDetails from "../pages/AssetHeadersDetails";
import CustomerForm from "../pages/CustomerForm";
import CustomerDetails from "../pages/CustomerDetails";
import AssetHeadersForm from "../pages/AssetHeadersForm";
import AssetItemsForm from "../pages/AssetItemsForm";
import AssetItemTables from "../pages/AssetItemTables";
import AssetItemDetails from "../pages/AssetItemDetails";
import PhotoUpload from "../pages/PhotoUpload";
import ImportCustomers from "../pages/ImportCustomers";

//   const { mutate: addCustomers } = useAddUsers();
//   const { mutate: addAssetHeaders } = useAddAssetHeaders();
//   const { mutate: addAssetItems } = useAddAssetItems();

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      //Customers
      { path: "/createCustomer", element: <CustomerForm /> },
      { path: "/viewCustomers", element: <CustomerDetails /> },
      { path: "/importCustomers", element: <ImportCustomers /> },
      //Asset Headers
      { path: "/createAssetHeaders", element: <AssetHeadersForm /> },
      { path: "/viewAssetHeaders", element: <AssetHeadersDetails /> },
      //Asset Items
      { path: "/createAssetItems", element: <AssetItemsForm /> },
      { path: "/viewAssetItems", element: <AssetItemTables /> },
      {
        path: "/viewAssetItem/:id",
        element: <AssetItemDetails />,
      },
      { path: "/uploadPhotos", element: <PhotoUpload /> },
    ],
  },
]);

// State for alert message

export default routes;
