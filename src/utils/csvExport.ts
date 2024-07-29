import { EmployeeLineItem } from "../interfaces/employees";

export const writeEmployeesToCsv = (employees: EmployeeLineItem[]): void => {
  // Prepare the CSV data
  const headers = "id,name,phone,occupation\n";
  const rows = employees
    .map(
      (employee) =>
        `${employee.id},${employee.name},${employee.phone},${employee.occupation}`
    )
    .join("\n");
  const csvData = headers + rows;
  // Create a Blob from the CSV data
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `EmployeeExport.csv`;
  anchor.click();
  window.URL.revokeObjectURL(url);
};
