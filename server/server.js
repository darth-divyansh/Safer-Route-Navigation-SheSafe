const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve crime data
app.get('/api/crime-data', (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'data', 'crimeData.json');
    const raw = fs.readFileSync(dataPath, 'utf8');
    const json = JSON.parse(raw);
    res.json(json);
  } catch (err) {
    console.error('Error reading crime data:', err);
    res.status(500).json({ error: 'Failed to load crime data' });
  }
});

// In production, serve client build (optional)
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
