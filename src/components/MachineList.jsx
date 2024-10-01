import React from 'react';

export function MachineList({ machines, onSelectMachine }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {machines.map((machine) => (
          <li key={machine.id}>
            <button
              onClick={() => onSelectMachine(machine)}
              className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out w-full text-left"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm leading-5 font-medium text-indigo-600 truncate">
                    {machine.name}
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      machine.status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {machine.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0">
                      Temperature: {machine.sensors.temperature}°C
                    </p>
                  </div>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}