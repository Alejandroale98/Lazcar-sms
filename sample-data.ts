import { addShipment } from "./database"
import { format, subDays, addDays } from "date-fns"

export function initializeSampleData() {
  const today = new Date()

  const sampleShipments = [
    {
      type: "Import",
      animalType: "Horses",
      numAnimals: 3,
      date: format(subDays(today, 2), "yyyy-MM-dd"),
      originCountry: "Germany",
      destinationCountry: "United States",
      originAirport: "FRA",
      destinationAirport: "JFK",
      agents: [
        { name: "John Smith", animalCount: 2 },
        { name: "Maria Garcia", animalCount: 1 },
      ],
      horseName: "Thunder",
      ownerName: "Robert Johnson",
    },
    {
      type: "Export",
      animalType: "Horses",
      numAnimals: 2,
      date: format(today, "yyyy-MM-dd"),
      originCountry: "United States",
      destinationCountry: "United Kingdom",
      originAirport: "LAX",
      destinationAirport: "LHR",
      agents: [{ name: "Maria Garcia", animalCount: 2 }],
      horseName: "Lightning",
      ownerName: "Sarah Williams",
    },
    {
      type: "In-Transit",
      animalType: "Horses",
      numAnimals: 4,
      date: format(addDays(today, 3), "yyyy-MM-dd"),
      originCountry: "France",
      destinationCountry: "Spain",
      originAirport: "CDG",
      destinationAirport: "MAD",
      agents: [
        { name: "John Smith", animalCount: 2 },
        { name: "Carlos Rodriguez", animalCount: 2 },
      ],
      horseName: "Storm",
      ownerName: "Michael Brown",
    },
  ]

  sampleShipments.forEach((shipment) => {
    addShipment(shipment)
  })
}

export function clearSampleData() {
  localStorage.clear()
}

