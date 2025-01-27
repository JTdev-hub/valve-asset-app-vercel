export interface Column {
  header: string;
  accessor: string;
}

export const assetItemColumns: Column[] = [
  { header: "Asset Number", accessor: "assetNumber" },
  { header: "Asset Item", accessor: "id" },
  { header: "Duty", accessor: "duty" },
  { header: "Specification", accessor: "specification" },
  { header: "Valve Type", accessor: "valveType" },
  { header: "Valve Size", accessor: "valveSize" },
  { header: "Model", accessor: "model" },
  { header: "Actuation", accessor: "actuation" },
  { header: "Actuation Type", accessor: "actuationType" },
  { header: "Flange Connection", accessor: "flangeConnection" },
  { header: "Instrumentation", accessor: "instrumentation" },
  { header: "OEM Part Number", accessor: "oemPartNumber" },
  { header: "ANSI", accessor: "ansi" },
  { header: "General Notes", accessor: "generalNotes" },
  { header: "", accessor: "link" },
];

export const assetHeaderColumns: Column[] = [
  { header: "Asset Number", accessor: "assetNumber" },
  { header: "Asset Serial Number", accessor: "assetSerialNo" },
  { header: "Asset Description", accessor: "assetDescription" },
  { header: "Site Section", accessor: "siteSection" },
];

export const customerColumns: Column[] = [
  { header: "Customer Name", accessor: "customerName" },
  { header: "Customer Site", accessor: "customerSite" },
  { header: "Customer Contact", accessor: "customerContact" },
];
