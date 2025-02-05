const shipmentStatuses = ["delivered", "pending", "failed"];
const locations = [
  [40.7128, -74.006], // New York
  [34.0522, -118.2437], // Los Angeles
  [41.8781, -87.6298], // Chicago
  [29.7604, -95.3698], // Houston
  [51.5074, -0.1278], // London
  [48.8566, 2.3522], // Paris
  [35.6895, 139.6917], // Tokyo
  [55.7558, 37.6173], // Moscow
  [39.9042, 116.4074], // Beijing
  [-33.4489, -70.6693], // Santiago
];

const generateShipmentData = (startYear: number, endYear: number) => {
  const shipmentData = [];
  let id = 1;

  for (let year = startYear; year <= endYear; year++) {
    for (let month = 0; month < 12; month++) {
      const numberOfShipments = Math.floor(Math.random() * 10) + 1;

      for (let i = 0; i < numberOfShipments; i++) {
        const date = new Date(year, month, Math.floor(Math.random() * 28) + 1);
        const status = shipmentStatuses[Math.floor(Math.random() * shipmentStatuses.length)];
        const value = Math.floor(Math.random() * 100) + 1; 
        const location = locations[Math.floor(Math.random() * locations.length)];

        shipmentData.push({
          id: id++,
          status,
          value,
          date: date.toISOString().split('T')[0], 
          location,
        });
      }
    }
  }

  return shipmentData;
};

export default generateShipmentData;
