

const express = require('express');
const fs = require('fs');
const { join } = require('path');
const app = express();

const folderPath = join(__dirname, 'files');

// Create text file with current timestamp
app.post('/create-file', (req, res) => {
  const timestamp = new Date().toISOString();
  const filename = `${timestamp}.txt`;
  const filePath = join(folderPath, filename);

  fs.writeFile(filePath, timestamp, (err) => {
    if (err) {
      console.error('Error creating file:', err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('File created successfully:', filename);
      res.status(201).send('File created successfully');
    }
  });
});

// Retrieve all text files in folder
app.get('/get-files', (req, res) => {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      res.status(500).send('Internal Server Error');
    } else {
      const textFiles = files.filter(file => file.endsWith('.txt'));
      res.status(200).json(textFiles);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
