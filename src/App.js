import React, { useState } from 'react';

const App = () => {
  const [language, setLanguage] = useState('ReactJS');
  const [topic, setTopic] = useState('');
  const [folderName, setFolderName] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [fieldCaption, setFieldCaption] = useState('');
  const [fieldTypeColumn, setFieldTypeColumn] = useState('');
  const [minColumn, setMinColumn] = useState('');
  const [maxColumn, setMaxColumn] = useState('');
  const [isMandatoryColumn, setIsMandatoryColumn] = useState(false);
  const [description, setDescription] = useState('');
  const [example, setExample] = useState('');
  const [systemContent, setSystemContent] = useState('');

  const handleSave = () => {
    const data = {
      Language: language,
      Topic: topic,
      'Folder Name': folderName,
      'Field Type': fieldType,
      Table: [
        {
          'Field Caption': fieldCaption,
          'Field Type': fieldTypeColumn,
          Min: minColumn,
          Max: maxColumn,
          'Is Mandatory': isMandatoryColumn,
        },
      ],
      Description: description,
      Example: example,
      'System Content': systemContent,
    };

    const jsonData = JSON.stringify(data);

    // Save the JSON data to a file with the caption as the filename
    const fileName = `${data.Topic}.json`;
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  };

  return (
    <div className="w-full max-w-screen-md p-4 mx-auto mt-8 border border-gray-300 rounded-lg">
      <h1 className="mb-4 text-2xl font-semibold">Header field details</h1>
      <div className="mb-4">
        <label className="block mb-2">Language</label>
        <select
          className="w-full p-2 border border-gray-300"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="ReactJS">ReactJS</option>
          <option value="Python">Python</option>
          <option value="Field">Field</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Topic:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Folder Name:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
      </div>

      {/* <div className="mb-4">
        <label className="block mb-2">Field Type:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300"
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
        />
      </div> */}

      <div className="mb-4">
        <h2 className="mb-2 text-xl font-semibold">Table Component</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="p-2">Field Caption</th>
              <th className="p-2">Field Type</th>
              <th className="p-2">Min</th>
              <th className="p-2">Max</th>
              <th className="p-2">Is Mandatory</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300"
                  value={fieldCaption}
                  onChange={(e) => setFieldCaption(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300"
                  value={fieldTypeColumn}
                  onChange={(e) => setFieldTypeColumn(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300"
                  value={minColumn}
                  onChange={(e) => setMinColumn(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300"
                  value={maxColumn}
                  onChange={(e) => setMaxColumn(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  className="w-full p-2 border border-gray-300"
                  checked={isMandatoryColumn}
                  onChange={(e) => setIsMandatoryColumn(e.target.checked)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Description:</label>
        <textarea
          className="w-full p-2 border border-gray-300"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Example:</label>
        <textarea
          className="w-full p-2 border border-gray-300"
          value={example}
          onChange={(e) => setExample(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">System Content:</label>
        <textarea
          className="w-full p-2 border border-gray-300"
          value={systemContent}
          onChange={(e) => setSystemContent(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <button
          className="px-4 py-2 mr-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={handleSave}
        >
          Save
        </button>
        <button className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
          Close
        </button>
      </div>
    </div>
  );
};

export default App;
