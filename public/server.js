const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Sample data
const places = {
  "1": {
    name: "Gateway of India",
    description:
      "An iconic waterfront monument in Mumbai, blending Indo-Saracenic architecture and a historical landmark.",
    image: "gateway.jpeg",
    travelOptions: ["Car: $30", "Bus: $10"]
  },
  "2": {
    name: "Marine Drive",
    description:
      "Popularly known as the Queen's Necklace, Marine Drive is a 3.6 km long boulevard with stunning views of the Arabian Sea.",
    image: "marine.jpeg",
    travelOptions: ["Car: $25", "Bus: $8"]
  }
};

app.get("/place/:id", (req, res) => {
  const place = places[req.params.id];
  if (place) {
    res.json(place);
  } else {
    res.status(404).json({ error: "Place not found" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
