// // src/App.tsx
// import {
//   Alert,
//   AlertIcon,
//   Flex,
//   Grid,
//   GridItem,
//   useColorModeValue,
// } from "@chakra-ui/react";

// import DesktopNav from "./components/DesktopNav";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import CustomerForm from "./pages/CustomerForm";

// import CustomerDetails from "./pages/CustomerDetails";
// import AssetHeadersForm from "./pages/AssetHeadersForm";

// import AssetHeadersDetails from "./pages/AssetHeadersDetails";
// import SimpleGridFeatures from "./pages/SimpleGridFeatures";
// import AssetItemsForm from "./pages/AssetItemsForm";

// import useAddUsers from "./hooks/useAddUsers";
// import useAddAssetHeaders from "./hooks/useAddAssetHeaders";
// import useAddAssetItems from "./hooks/useAddAssetItems";
// import AssetItemDetails from "./pages/AssetItemDetails";

// function App() {
//   // State for alert message
//   const { mutate: addCustomers, alertMessage: alertAddUsersMessage } =
//     useAddUsers();
//   const { mutate: addAssetHeaders, alertMessage: alertAddAssetHeadersMessage } =
//     useAddAssetHeaders();
//   const { mutate: addAssetItems, alertMessage: alertAddAssetItemsMessage } =
//     useAddAssetItems();

//   // const addCustomers = useMutation<Customer, Error, Customer>({
//   //   mutationFn: (customer: Customer) =>
//   //     customerService.create(customer).then((res) => res.data),
//   //   onSuccess: (savedCustomer) => {
//   //     queryClient.setQueryData<Customer[]>(["customer"], (customer) => [
//   //       savedCustomer,
//   //       ...(customer || []),
//   //     ]);

//   //     setAlertMessage(
//   //       `Customer "${savedCustomer.customerName}" has been created successfully!`
//   //     );

//   //     // Clear alert after 3 seconds
//   //     setTimeout(() => setAlertMessage(null), 3000);
//   //   },
//   // });

//   // const addAssetHeaders = useMutation<AssetHeader, Error, AssetHeader>({
//   //   mutationFn: (assetHeader: AssetHeader) =>
//   //     assetHeaderService.create(assetHeader).then((res) => res.data),
//   //   onSuccess: (savedAssetHeader) => {
//   //     queryClient.setQueryData<AssetHeader[]>(
//   //       ["assetHeader"],
//   //       (assetHeader) => [savedAssetHeader, ...(assetHeader || [])]
//   //     );

//   //     setAlertMessage(
//   //       `Customer "${savedAssetHeader.assetNumber}" has been created successfully!`
//   //     );

//   //     // Clear alert after 3 seconds
//   //     setTimeout(() => setAlertMessage(null), 3000);
//   //   },
//   // });

//   // const handleCustomer = (customer: Customer) => {
//   //   customerService.create(customer).then(({ data: savedCustomer }) => {
//   //     setCustomer([savedCustomer, ...customers]);
//   //     setAlertMessage(
//   //       `Customer "${savedCustomer.customerName}" has been created successfully!`
//   //     );

//   //     // Clear alert after 3 seconds
//   //     setTimeout(() => setAlertMessage(null), 3000);
//   //   });
//   // };

//   // const hadleAssetHeaders = (assetHeader: AssetHeader) => {
//   //   assetHeaderService
//   //     .create(assetHeader)
//   //     .then(({ data: savedAssetHeader }) => {
//   //       setAssetHeaders([savedAssetHeader, ...assetHeaders]);
//   //       setAlertMessage(
//   //         `Asset "${savedAssetHeader.assetNumber}" has been created successfully!`
//   //       );

//   //       // Clear alert after 3 seconds
//   //       setTimeout(() => setAlertMessage(null), 3000);
//   //     });
//   // };

//   // const handleAssetItems = (assetItem: AssetItems) => {
//   //   assetItemsService.create(assetItem).then(({ data: savedAssetItem }) => {
//   //     setAssetItems([savedAssetItem, ...assetItems]);
//   //     setAlertMessage(
//   //       `Asset Item "${savedAssetItem.assetHeaderId}" has been created successfully!`
//   //     );

//   //     setTimeout(() => setAlertMessage(null), 3000);
//   //   });
//   // };

//   return (
//     <>
//       <Grid
//         templateAreas={{
//           base: `"nav" "main"`,
//           lg: `"nav nav" "main main"`,
//         }}
//         templateColumns={{
//           base: "1fr",
//           lg: "200px 1fr",
//         }}
//       >
//         <GridItem area="nav">
//           <Flex
//             bg={useColorModeValue("white", "gray.800")}
//             color={useColorModeValue("gray.600", "white")}
//             minH={"60px"}
//             py={{ base: 2 }}
//             px={{ base: 4 }}
//             borderBottom={1}
//             borderStyle={"solid"}
//             borderColor={useColorModeValue("gray.200", "gray.900")}
//             align={"center"}
//           >
//             <Flex
//               flex={{ base: 1, md: "auto" }}
//               ml={{ base: -2 }}
//               display={{ base: "flex", md: "auto" }}
//             >
//               <DesktopNav />
//             </Flex>
//           </Flex>
//         </GridItem>
//         <GridItem area="main">
//           {(alertAddUsersMessage ||
//             alertAddAssetHeadersMessage ||
//             alertAddAssetItemsMessage) && (
//             <Alert status="success" marginBottom={4}>
//               <AlertIcon />
//               {alertAddUsersMessage ||
//                 alertAddAssetHeadersMessage ||
//                 alertAddAssetItemsMessage}
//             </Alert>
//           )}

//           {/*
//            */}

//           <Router>
//             <Routes>
//               <Route path="" element={<SimpleGridFeatures />}></Route>
//               <Route
//                 path="/createCustomer"
//                 element={
//                   <CustomerForm
//                     onSubmit={(customer) => addCustomers(customer)}
//                   />
//                 }
//               />
//               <Route
//                 path="/viewCustomers"
//                 element={<CustomerDetails />}
//               ></Route>
//               <Route
//                 path="/createAssetHeaders"
//                 element={
//                   <AssetHeadersForm
//                     onSubmit={(assetHeader) => addAssetHeaders(assetHeader)}
//                   />
//                 }
//               ></Route>
//               <Route
//                 path="/viewAssetHeaders"
//                 element={<AssetHeadersDetails />}
//               ></Route>
//               <Route
//                 path="/createAssetItems"
//                 element={
//                   <AssetItemsForm
//                     onSubmit={(assetItem) => addAssetItems(assetItem)}
//                   />
//                 }
//               ></Route>
//               <Route
//                 path="/viewAssetItems"
//                 element={<AssetItemDetails />}
//               ></Route>
//             </Routes>
//           </Router>
//         </GridItem>
//       </Grid>
//     </>
//   );
// }

// export default App;
