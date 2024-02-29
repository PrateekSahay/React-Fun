import { useState } from "react";
import {tableData} from "./data";

const TableHeaderSortHome = () => {
  const [sortedData, setSortedData] = useState(tableData);

  const onAgeClick = () => {
    const updatedData = [...sortedData].sort((a, b) => a.age - b.age);

    console.log({ updatedData });
    // setSortedData(null);
    setSortedData(updatedData);
  };

  const onNameClick = () => {
    console.log("sortedData", sortedData);
    const updatedData = [...sortedData].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    console.log({ updatedData });
    // setSortedData(null);
    setSortedData(updatedData);
  };

  const onIdClick = () => {
    console.log("sortedData", sortedData);
    const updatedData = [...sortedData].sort((a, b) =>
      a.id.localeCompare(b.id)
    );
    console.log({ updatedData });
    // setSortedData(null);
    setSortedData(updatedData);
  };

  console.log("sortedData", sortedData);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th onClick={onNameClick}>Name</th>
            <th onClick={onAgeClick}>Age</th>
            <th onClick={onNameClick}>ID</th>
          </tr>
        </thead>
        <tbody>
          {sortedData?.map((row, i) => (
            <tr key={i}>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td>{row.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableHeaderSortHome;

// table
// name - string
// age - number
// id - alphanumeric
