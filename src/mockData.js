// mockData.js

export const mockMachines = [
    {
      id: 1,
      name: 'Coffee Machine',
      status: 'operational',
      sensors: {
        temperature: 25,
      },
      dispensers: [
        { id: 1, name: 'Coffee', quantity: 1000 },
        { id: 2, name: 'Sugar', quantity: 500 },
        { id: 3, name: 'Cream', quantity: 750 },
      ],
    },
    {
      id: 2,
      name: 'Tea Machine',
      status: 'maintenance',
      sensors: {
        temperature: 22,
      },
      dispensers: [
        { id: 4, name: 'Tea', quantity: 800 },
        { id: 5, name: 'Lemon', quantity: 300 },
        { id: 6, name: 'Honey', quantity: 400 },
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
  ];