import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { EmployeeTable } from "./components/EmpoyeeTable/EmployeeTable";
import { EmployeeLineItem } from "./interfaces/employees";
import { useEmployee } from "./hooks/useEmployee";
import EmployeeModal from "./components/EmployeeModal/EmployeeModal";
import { writeEmployeesToExcel } from "./utils/excel";
import { writeEmployeesToCsv } from "./utils/csvExport";

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    React.useState<EmployeeLineItem>();
  const { employees, createEmployee, updateEmployee, isLoading } =
    useEmployee();

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Social Pro Tech Task</Typography>
        <Box>
          <Button
            color="primary"
            sx={{ marginRight: 1 }}
            onClick={async () => {
              if (employees.length) {
                await writeEmployeesToExcel(employees);
              } else {
                alert("No employees to export");
              }
            }}
          >
            Export .xlsx
          </Button>
          <Button
            color="primary"
            sx={{ marginRight: 1 }}
            onClick={async () => {
              if (employees.length) {
                writeEmployeesToCsv(employees);
  
              } else {
                alert("No employees to export");
              }
            }}
          >
            Export .csv
          </Button>
          <Button
            color="primary"
            onClick={() => {
              setSelectedEmployee(undefined);
              setIsModalOpen(true);
            }}
          >
            Add
          </Button>
        </Box>
      </Box>
      <EmployeeTable
        loading={isLoading}
        employees={employees}
        handleEditEmployee={(employee: EmployeeLineItem): void => {
          setIsModalOpen(true);
          setSelectedEmployee(employee);
        }}
      />
      {isModalOpen ? (
        <EmployeeModal
          loading={isLoading}
          existingEmployee={selectedEmployee}
          createEmployee={createEmployee}
          updateEmployee={updateEmployee}
          handleClose={(): void => {
            setIsModalOpen(false);
            setSelectedEmployee(undefined);
          }}
        />
      ) : undefined}
    </Box>
  );
}

export default App;
