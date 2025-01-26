import { Box, Button, HStack, Input } from "@chakra-ui/react";
import DataTable from "../components/DataTable";
import { customerColumns } from "../components/TableDefinitions";
import CardForms from "../components/CardForms";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Customer } from "../services/customer-service";

import AlertBanner from "../components/AlertBanner";
import useAddUsers from "../hooks/useAddUsers";
import Loading from "../components/Loading";

const ImportCustomers = () => {
  //const { data: customers } = useCustomers();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    mutate: addCustomers,
    isSuccess,
    showAlert,
    message,
    setShowAlert,
    isPending,
  } = useAddUsers(() => {
    //Reset fields on success
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  });
  const [excelData, setExcelData] = useState<Customer[]>([]);

  const handleSubmit = () => {
    addCustomers(excelData);
  };

  const handleSelectFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async (e) => {
      const data = e.target?.result;

      // Parse the ArrayBuffer using XLSX
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      //Convert the sheet to JSON
      const jsonData: Customer[] =
        XLSX.utils.sheet_to_json<Customer>(worksheet);
      setExcelData(jsonData);
    };
  };
  // Type Guard to check if excelData is of type Customer[]
  const isCustomerData = (data: Customer[]): data is Customer[] => {
    return (
      Array.isArray(data) &&
      data.every(
        (item) =>
          item?.customerName && item?.customerSite && item?.customerContact
      )
    );
  };

  return (
    <>
      {/* Display alert when success or when error */}
      {showAlert && (
        <AlertBanner
          message={message}
          isSuccess={isSuccess}
          onClose={() => {
            setShowAlert(false);
          }}
        />
      )}

      {isPending && <Loading></Loading>}
      <Box overflowX="auto">
        <CardForms>
          {isCustomerData(excelData) && excelData.length > 0 ? (
            <DataTable
              caption="Customers"
              columns={customerColumns}
              data={excelData.map((item, index) => ({
                ...item,
                id: index,
              }))}
            />
          ) : (
            <Box>No valid data to display!</Box>
          )}
          <Input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="mb-4"
            hidden
          />
          <HStack>
            <Button
              colorScheme="teal"
              size="md"
              marginTop={5}
              type="submit"
              onClick={handleSelectFiles}
            >
              Select File
            </Button>
            <Button
              colorScheme="teal"
              size="md"
              marginTop={5}
              type="submit"
              onClick={handleSubmit}
              disabled={isPending || excelData.length === 0}
            >
              {isPending ? " Submitting" : "Submit"}
            </Button>
          </HStack>
        </CardForms>
      </Box>
    </>
  );
};

export default ImportCustomers;
