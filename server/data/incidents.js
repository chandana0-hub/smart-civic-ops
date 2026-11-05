export const incidents = [
  {
    id: "INC-1001",
    category: "Road Safety",
    description: "Deep pothole on 4th Main Road near City Metro Station causing traffic slowdown",
    location: "4th Main Road, City Center",
    priority: "High",
    status: "In Progress",
    assignedCrew: "Public Works Road Maintenance Crew #3",
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: "INC-1002",
    category: "Water & Sanitation",
    description: "Main water pipe burst near Green Park, water flooding street",
    location: "Green Park Avenue",
    priority: "Emergency",
    status: "Dispatched",
    assignedCrew: "Emergency Water Response Team #1",
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

export function addIncident(incident) {
  incidents.unshift(incident);
  return incident;
}

export function getAllIncidents() {
  return incidents;
}