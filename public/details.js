document.addEventListener("DOMContentLoaded", () => {
    // Extract query parameters from URL
    const params = new URLSearchParams(window.location.search);
    const placeId = params.get("id");
  
    // Placeholder data (this should come from your backend in real-world applications)
    const placeData = {
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
      // Add more data as needed
    };
  
    // Retrieve place details
    const place = placeData[placeId];
  
    if (place) {
      document.getElementById("place-name").textContent = place.name;
      document.getElementById("place-description").textContent =
        place.description;
      document.getElementById("place-image").src = place.image;
  
      const travelOptionsContainer = document.getElementById("travel-options");
      place.travelOptions.forEach((option) => {
        const li = document.createElement("li");
        li.textContent = option;
        travelOptionsContainer.appendChild(li);
      });
    } else {
      document.body.innerHTML = "<h1>Place not found</h1>";
    }
  });
  