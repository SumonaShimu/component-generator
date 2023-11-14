import React, { useState } from "react";

const DynamicTable = ({ rowCount, setTableData, setRowCount }) => {
  const [table, setTable] = useState([]);

  const handleRowCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setRowCount(count);
    setTable(
      Array.from({ length: count }, () => ({
        fieldCaption: "",
        fieldType: "",
        min: 0,
        max: 0,
        isMandatory: false,
      }))
    );
  };

  const handleTableChange = (index, field, value) => {
    const updatedTable = [...table];
    updatedTable[index][field] = value;
    setTable(updatedTable);
    setTableData(table);
  };
  return (
    <div className="mx-auto my-8">
      <label className="block mb-2 text-sm font-bold" htmlFor="rowCount">
        Table Row Count
      </label>
      <input
        id="rowCount"
        type="number"
        className="w-full p-2 mb-4 border rounded"
        value={rowCount}
        onChange={handleRowCountChange}
      />

      {rowCount > 0 && (
        <table className="w-full">
          <thead>
            <tr>
              <th>Field Caption</th>
              <th>Field Type</th>
              <th>Min</th>
              <th>Max</th>
              <th>Is Mandatory</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    className="w-full"
                    value={row.fieldCaption}
                    onChange={(e) =>
                      handleTableChange(index, "fieldCaption", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="w-full text-center"
                    value={row.fieldType}
                    onChange={(e) =>
                      handleTableChange(index, "fieldType", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="w-full text-center"
                    value={row.min}
                    onChange={(e) =>
                      handleTableChange(
                        index,
                        "min",
                        parseInt(e.target.value, 10)
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="w-full text-center"
                    value={row.max}
                    onChange={(e) =>
                      handleTableChange(
                        index,
                        "max",
                        parseInt(e.target.value, 10)
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    className="w-full text-center"
                    checked={row.isMandatory}
                    onChange={(e) =>
                      handleTableChange(index, "isMandatory", e.target.checked)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* show table data
      <div className="mt-4">
        <h2 className="mb-2 text-lg font-bold">Table Data</h2>
        <pre>{JSON.stringify(table, null, 2)}</pre>
      </div> */}
    </div>
  );
};

export default DynamicTable;
