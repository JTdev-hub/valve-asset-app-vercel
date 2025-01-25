import { Flex } from "@chakra-ui/react";
import useCustomers from "../hooks/useCustomers";
import CardForms from "../components/CardForms";
import SkeletonLoading from "../components/SkeletonLoading";
import DataTable from "../components/DataTable";
import { customerColumns } from "../components/TableDefinitions";
import { useState } from "react";

const CustomerDetails = () => {
  const [customerQuery, setCustomerQuery] = useState<string>("");
  const { data: customers, isLoading } = useCustomers(
    undefined,
    customerQuery ? customerQuery : undefined
  );

  if (isLoading)
    return (
      <Flex justifyContent="center">
        <CardForms>
          <SkeletonLoading loadingType="table" />
        </CardForms>
      </Flex>
    );

  return (
    <DataTable
      caption="Customers"
      columns={customerColumns}
      data={
        customers?.map((item) => ({
          ...item,
          link: `/viewAssetItem/${item.id}`,
        })) ?? []
      }
      onSearch={(customerQuery) => setCustomerQuery(customerQuery)}
    ></DataTable>
  );
};

export default CustomerDetails;
