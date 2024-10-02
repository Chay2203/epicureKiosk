// mockData.js

export const mockSalesData = [
  { recipeId: 1, machineId: 1, quantitySold: 15, date: '2024-09-01' },
  { recipeId: 2, machineId: 1, quantitySold: 25, date: '2024-09-02' },
  { recipeId: 3, machineId: 2, quantitySold: 10, date: '2024-09-01' },
  { recipeId: 4, machineId: 2, quantitySold: 5, date: '2024-09-03' },
  { recipeId: 5, machineId: 2, quantitySold: 20, date: '2024-09-04' },
  { recipeId: 1, machineId: 1, quantitySold: 30, date: '2024-09-05' },
  { recipeId: 2, machineId: 2, quantitySold: 12, date: '2024-09-06' },
  { recipeId: 1, machineId: 2, quantitySold: 40, date: '2024-09-07' },
  { recipeId: 3, machineId: 1, quantitySold: 22, date: '2024-09-08' },
  { recipeId: 2, machineId: 2, quantitySold: 18, date: '2024-09-09' },
];

export const mockMachines = [
  {
    id: 1,
    name: 'Coffee Machine',
    status: 'operational',
    sensors: {
      temperature: 25,
      humidity: 50,
      pressure: 1.2,
    },
    dispensers: [
      { id: 1, name: 'Coffee', quantity: 1000 },
      { id: 2, name: 'Sugar', quantity: 500 },
      { id: 3, name: 'Cream', quantity: 750 },
    ],
    maintenanceRecords: [
      { date: '2024-08-01', issue: 'Cleaned filters', resolved: true },
      { date: '2024-08-15', issue: 'Replaced pump', resolved: true },
      { date: '2024-09-10', issue: 'Regular maintenance', resolved: false },
    ],
  },
  {
    id: 2,
    name: 'Tea Machine',
    status: 'maintenance',
    sensors: {
      temperature: 22,
      humidity: 45,
      pressure: 1.0,
    },
    dispensers: [
      { id: 4, name: 'Tea', quantity: 800 },
      { id: 5, name: 'Lemon', quantity: 300 },
      { id: 6, name: 'Honey', quantity: 400 },
    ],
    maintenanceRecords: [
      { date: '2024-07-10', issue: 'Checked water levels', resolved: true },
      { date: '2024-08-20', issue: 'Replaced heating element', resolved: true },
      { date: '2024-09-15', issue: 'Inoperable, under repair', resolved: false },
    ],
  },
];

export const mockRecipes = [
  {
    id: 1,
    machineId: 1,
    name: 'Espresso',
    ingredients: [
      { name: 'Coffee', quantity: 20 },
    ],
  },
  {
    id: 2,
    machineId: 1,
    name: 'Cappuccino',
    ingredients: [
      { name: 'Coffee', quantity: 20 },
      { name: 'Milk', quantity: 100 },
    ],
  },
  {
    id: 3,
    machineId: 2,
    name: 'Lemon Tea',
    ingredients: [
      { name: 'Tea', quantity: 10 },
      { name: 'Lemon', quantity: 5 },
      { name: 'Honey', quantity: 10 },
    ],
  },
  {
    id: 4,
    machineId: 1,
    name: 'Latte',
    ingredients: [
      { name: 'Coffee', quantity: 20 },
      { name: 'Milk', quantity: 150 },
      { name: 'Sugar', quantity: 10 },
    ],
  },
  {
    id: 5,
    machineId: 2,
    name: 'Green Tea',
    ingredients: [
      { name: 'Tea', quantity: 15 },
      { name: 'Honey', quantity: 5 },
    ],
  },
];
