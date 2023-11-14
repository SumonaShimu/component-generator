import React from 'react';

const JsonFileSaver = () => {
  const handleDownload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.style.display = 'none';

    input.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        // Implement file download logic with the chosen location
        console.log('Selected file location:', file.path);
        // Replace 'your_file_url' with the actual URL of your file
        fetch('your_file_url')
          .then(response => response.blob())
          .then(blob => {
            // Create a temporary link element
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement('a');
            a.href = url;

            // Set the default file name (you can change this)
            a.download = 'your_file_name';

            // Append the link to the body and trigger the click event
            document.body.appendChild(a);
            a.click();

            // Remove the link from the DOM
            document.body.removeChild(a);

            // Revoke the URL to free up resources
            window.URL.revokeObjectURL(url);
          })
          .catch(error => console.error('Error downloading file:', error));
      }
    });

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  return (
    <div>
      <button onClick={handleDownload}>Download File</button>
    </div>
  );
};

export default JsonFileSaver;
