import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function MachineDetails({ machine }) {
  return (
    <Card className="mb-6 dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="dark:text-white">Machine Details</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Machine Name</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{machine.name}</dd>
          </div>
          <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                machine.status === 'operational' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                  : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
              }`}>
                {machine.status}
              </span>
            </dd>
          </div>
          <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Temperature</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{machine.sensors.temperature}°C</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}