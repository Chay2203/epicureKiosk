import React, { useState, useEffect } from 'react';
import { MachineList } from '../components/MachineList';
import { MachineDetails } from '../components/MachineDetails';
import { RecipeManagement } from '../components/RecipieManagement';
import { DispenserManagement } from '../components/DispenserManagement';
import { mockMachines, mockRecipes } from '../mockData';

export default function DashBoard() {
  const [machines, setMachines] = useState(mockMachines);
  const [recipes, setRecipes] = useState(mockRecipes);
  const [selectedMachine, setSelectedMachine] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMachines(prevMachines => 
        prevMachines.map(machine => ({
          ...machine,
          sensors: {
            ...machine.sensors,
            temperature: Math.floor(Math.random() * 30) + 20, 
          }
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Epicure Kiosks Admin Dashboard</h1>
        </div>
      </header>
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="w-full lg:w-1/4">
            <MachineList 
              machines={machines} 
              onSelectMachine={setSelectedMachine} 
            />
          </div>
          <div className="w-full lg:w-3/4">
            {selectedMachine ? (
              <div className="space-y-4">
                <MachineDetails machine={selectedMachine} />
                <DispenserManagement 
                  machine={selectedMachine} 
                  onUpdate={(updatedMachine) => {
                    setMachines(machines.map(m => 
                      m.id === updatedMachine.id ? updatedMachine : m
                    ));
                  }} 
                />
                <RecipeManagement 
                  machine={selectedMachine} 
                  recipes={recipes.filter(r => r.machineId === selectedMachine.id)}
                  onUpdate={(updatedRecipes) => {
                    setRecipes(recipes.map(r => 
                      updatedRecipes.find(ur => ur.id === r.id) || r
                    ));
                  }}
                />
              </div>
            ) : (
              <div className="text-center text-gray-500 bg-white p-6 rounded-lg shadow">
                Select a machine to view details
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}