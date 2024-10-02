import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function MachineDetails({ machine }) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Machine Details</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="divide-y divide-gray-200">
          <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Machine Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{machine.name}</dd>
          </div>
          <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                machine.status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {machine.status}
              </span>
            </dd>
          </div>
          <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Temperature</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{machine.sensors.temperature}°C</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}