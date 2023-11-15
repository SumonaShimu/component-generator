import React, { useEffect, useState } from "react";
import DynamicTable from "../components/DynamicTable";
import { gptApiCall } from "../services/gpt-services";
const FormComponent = () => {
  const [tableData, setTableData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [formData, setFormData] = useState({
    language: "ReactJS",
    topic: "",
    command: `make a complete react component {topic}.jsx`,
    note: `i want final result in div tag with className "form-responseBox-common-styles". use tailwind css for styles . i don't need any supporting text. add the top most div element will be starting with  | and end with |
    here is an example:  
   |<div> 
   <h1> New summer friendly clothes for you</h1>
    <div> <h3>25% discount <h3>
    <p> top notch meterials </p>
    </div>
   </div>|`,
    rowCount: rowCount,
    tableData: { tableData },
    description: "",
    example: "",
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      rowCount: rowCount,
      tableData: tableData,
    }));
  }, [tableData, rowCount]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    const topicFileName = `${formData.topic}.json`;
    console.log("Save data to file:", topicFileName, formData);
    const jsonData = JSON.stringify(formData);

    // Save the JSON data to a file with the caption as the filename

    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = topicFileName;
    a.click();
  };

  const handleGenerate = () => {
    const url = "method/whatagptapi.whatagpt.get";
    const jsonData = JSON.stringify(formData);
    const jsxFileName = `${formData.topic}.jsx`;
    const temp = {
      user_content: jsonData,
      client_id: "X1KInbxiNaguMLcimaP36vVH06D3",
      version: "2.0",
      chat_topic: "0",
      systemContent: "",
    };
    console.log(temp);
    gptApiCall(url, temp)
      .then((response) => {
        const res = response.data.message;
        console.log(res);
        if (res?.error_code === 1001 || res?.error_code === 1006) {
          console.log(res.error_message);
          return;
        }
        const data = response.data.message.message;
        console.log("response : ", data);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = jsxFileName;
        a.click();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="container p-4 mx-auto my-10 bg-gray-300 rounded-md shadow-md md:max-w-[70%]">
      {/* <button
        onClick={handleshowList}
        className="absolute px-4 py-2 bg-pink-400 rounded-md hover:bg-purple-600 left-5"
      >
        Show list
      </button> */}
      <h1 className="mb-4 text-2xl font-bold">Jsx Component Details</h1>
      {/* Language Dropdown */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold" htmlFor="language">
          Language
        </label>
        <select
          id="language"
          className="w-full p-2 border rounded"
          value={formData.language}
          onChange={(e) => handleChange("language", e.target.value)}
        >
          <option value="ReactJS">ReactJS</option>
          <option value="Python">Python</option>
          <option value="Field">C++</option>
        </select>
      </div>

      {/* Topic Text Input */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold" htmlFor="topic">
          Topic
        </label>
        <input
          id="topic"
          type="text"
          className="w-full p-2 border rounded"
          value={formData.topic}
          onChange={(e) => handleChange("topic", e.target.value)}
        />
      </div>

      <DynamicTable
        table={tableData}
        rowCount={rowCount}
        setRowCount={setRowCount}
        setTableData={setTableData}
      />

      {/* Description Textarea */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className="w-full p-2 border rounded"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      {/* Example Textarea */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold" htmlFor="example">
          Example
        </label>
        <textarea
          id="example"
          className="w-full p-2 border rounded"
          value={formData.example}
          onChange={(e) => handleChange("example", e.target.value)}
        />
      </div>

      {/* System Content Textarea */}
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold" htmlFor="systemContent">
          System Content
        </label>
        <textarea
          id="systemContent"
          className="w-full p-2 border rounded"
          value={formData.systemContent}
          onChange={(e) => handleChange("systemContent", e.target.value)}
        />
      </div>

      {/* Save and Close buttons */}
      <div className="flex justify-end">
        <button
          className="px-4 py-2 mr-4 font-bold text-white bg-green-500 rounded hover:bg-green-800"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          onClick={handleGenerate}
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
        >
          Save and Generate JSX
        </button>
      </div>
    </div>
  );
};

export default FormComponent;
