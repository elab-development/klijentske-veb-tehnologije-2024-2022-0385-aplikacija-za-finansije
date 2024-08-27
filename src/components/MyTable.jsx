import { Table } from "@mantine/core"
import "./MyTable.css"

// eslint-disable-next-line react/prop-types
export default function MyTable({transactions}){

    { /*
        id: transactions.length + 1,
        isIncome: dialogType === 'add',
        amount: value,
        date: new Date(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        description: description || (dialogType === 'add' ? "Income" : "Expense")  
      */}


  return (
    <div className="tableContainer">
      <Table
        horizontalSpacing="xl"
        verticalSpacing="sm"
        captionSide="top"
        withTableBorder 
        highlightOnHover
        withColumnBorders
      >
        <Table.Caption>All Transactions</Table.Caption>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>+/-</Table.Th>
            <Table.Th>Amount:</Table.Th>
            <Table.Th>DateStamp</Table.Th>
            <Table.Th>Description</Table.Th>
          </Table.Tr>
        </Table.Thead>  

        <Table.Tbody>
          {
            // eslint-disable-next-line react/prop-types
            transactions.map((element) => (
              <Table.Tr key={element.id}>
                <Table.Td>{element.isIncome ? "Income" : "Expense"}</Table.Td>
                <Table.Td>{element.amount}</Table.Td>
                <Table.Td>{element.date.toLocaleDateString()}</Table.Td>
                <Table.Td>{element.description}</Table.Td>
              </Table.Tr>
            ))
          } 
        </Table.Tbody>
      </Table>
    </div>
  );
}
