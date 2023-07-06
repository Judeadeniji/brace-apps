const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, 'db.json');

// Read the JSON file
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);

    // Remove objects with duplicate IDs
    const filteredData = removeDuplicates(jsonData);

    // Replace the file with the updated data
    fs.writeFile(jsonFilePath, JSON.stringify(filteredData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return;
      }

      console.log('File updated successfully!');
    });
  } catch (err) {
    console.error('Error parsing JSON:', err);
  }
});

// Function to remove objects with duplicate IDs and titles
function removeDuplicates(data) {
  const idMap = new Map();
  const titleMap = new Map();
  const filteredData = [];

  for (const obj of data) {
    const id = obj.id;
    const title = obj.product_title;

    if (!idMap.has(id) && !titleMap.has(title)) {
      // If the ID and title are not duplicates, add the object to the filtered data
      filteredData.push(obj);

      idMap.set(id, true);
      titleMap.set(title, true);
    }
  }

  return filteredData;
}

