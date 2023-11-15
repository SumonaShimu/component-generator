import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const FileViewer = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [jsonFiles, setJsonFiles] = useState([]);
  const [checkedFiles, setCheckedFiles] = useState([]);

  const handleFolderChange = (event) => {
    const folderPath = event.target.files[0]?.webkitRelativePath;

    if (folderPath) {
      const folderName = folderPath.split("/")[0];
      setSelectedFolder(folderName);

      // Fetch the JSON files inside the selected folder
      const folderFiles = Array.from(event.target.files).filter(
        (file) =>
          file.type === "application/json" &&
          file.webkitRelativePath.startsWith(folderName)
      );

      setJsonFiles(folderFiles);
    }
  };

  const handleCheckboxChange = (fileName) => {
    const isChecked = checkedFiles.includes(fileName);

    if (isChecked) {
      // Remove the file name from the checkedFiles array
      setCheckedFiles(checkedFiles.filter((name) => name !== fileName));
    } else {
      // Add the file name to the checkedFiles array
      setCheckedFiles([...checkedFiles, fileName]);
    }
  };

  const handleLogCheckedFiles = () => {
    checkedFiles.forEach((fileName) => {
      const file = jsonFiles.find((jsonFile) => jsonFile.name === fileName);

      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const fileContent = event.target.result;
          console.log(`Contents of ${fileName}:`, fileContent);
        };

        // Read the file as text
        reader.readAsText(file);
      }
    });
  };

  const handleEditFile = (fileName) => {
    // Handle file editing logic here
    console.log(`Editing ${fileName}`);
  };

  const handleDeleteFile = (fileName) => {
    // Find the file by name
    const fileToDelete = jsonFiles.find((file) => file.name === fileName);

    if (fileToDelete) {
      // Revoke the object URL to release the resources
      URL.revokeObjectURL(fileToDelete);

      // Update the state to remove the file
      setJsonFiles(jsonFiles.filter((file) => file.name !== fileName));

      // Log or perform other actions as needed
      console.log(`Deleted file: ${fileName}`);
    }
  };

  return (
    <div className="container p-4 mx-auto my-10 md:max-w-[70%]">
      <input
        type="file"
        directory=""
        webkitdirectory=""
        className="w-full mx-auto mb-4 bg-gray-300 rounded"
        onChange={handleFolderChange}
      />
      {selectedFolder && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">
            JSON Files in {selectedFolder}:
          </h2>
          <ul className="pl-4 list-disc">
            {jsonFiles.map((file, index) => (
              <li
                key={index}
                className="flex items-center mb-2 space-x-2 border-b-2"
              >
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(file.name)}
                  className="h-5 text-indigo-600 form-checkbox"
                />
                <span className="w-full text-gray-800">{file.name}</span>
                
                  <button
                    onClick={() => handleEditFile(file.name)}
                    className="ml-2 text-blue-500"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteFile(file.name)}
                    className="ml-2 text-red-500"
                  >
                    <AiOutlineDelete />
                  </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleLogCheckedFiles}
            className="px-4 py-2 mt-4 text-white bg-indigo-500 rounded"
          >
            Log Checked Files
          </button>

          <div id="file-content"></div>
        </div>
      )}
    </div>
  );
};

export default FileViewer;
