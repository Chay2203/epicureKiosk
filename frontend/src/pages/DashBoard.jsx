'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MachineList } from '../components/MachineList'
import { MachineDetails } from '../components/MachineDetails'
import { RecipeManagement } from '../components/RecipieManagement'
import { DispenserManagement } from '../components/DispenserManagement'
import { mockMachines, mockRecipes, mockSalesData } from '../mockData'
import { Sun, Moon, Coffee, AlertTriangle, TrendingUp, Hammer, Package, Bot, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Checkbox } from '@/components/ui/checkbox'

const API_URL = 'https://epicurekiosk.onrender.com'

export default function Dashboard() {
  const [machines, setMachines] = useState(mockMachines)
  const [recipes, setRecipes] = useState(mockRecipes)
  const [selectedMachine, setSelectedMachine] = useState(null)
  const [darkMode, setDarkMode] = useState(false)
  const [aiInsights, setAiInsights] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [completedActions, setCompletedActions] = useState([])

  useEffect(() => {
    const fetchAiInsights = async () => {
      setLoading(true)
      try {
        const response = await axios.post(`${API_URL}/ai_insights`, {
          machines: machines,
          salesData: mockSalesData,
        })
        setAiInsights(response.data.insights)
        console.log('Function called')
        console.log('AI Insights:', response.data.insights)
        setError(null)
      } catch (error) {
        console.error('Error fetching AI insights:', error)
        setError('Failed to fetch AI insights. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchAiInsights()
  }, [machines])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const toggleActionCompletion = (index) => {
    setCompletedActions(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    )
  }

  return (
    <div className={`min-h-screen p-4 transition-colors duration-200 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className="flex justify-between items-center mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold">Kiosk Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Sun className="h-6 w-6" />
          <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
          <Moon className="h-6 w-6" />
        </div>
      </header>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Machines</CardTitle>
          </CardHeader>
          <CardContent>
            <MachineList
              machines={machines}
              onSelectMachine={setSelectedMachine}
              selectedMachineId={selectedMachine?.id}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>{selectedMachine ? selectedMachine.name : 'Machine Details'}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMachine ? (
              <Tabs defaultValue="details" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="dispensers">Dispensers</TabsTrigger>
                  <TabsTrigger value="recipes">Recipes</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <MachineDetails
                    machine={selectedMachine}
                    onUpdate={(updatedMachine) => {
                      setMachines(machines.map(m => m.id === updatedMachine.id ? updatedMachine : m))
                    }}
                  />
                </TabsContent>
                <TabsContent value="dispensers">
                  <DispenserManagement
                    machine={selectedMachine}
                    onUpdate={(updatedMachine) => {
                      setMachines(machines.map(m => m.id === updatedMachine.id ? updatedMachine : m))
                    }}
                  />
                </TabsContent>
                <TabsContent value="recipes">
                  <RecipeManagement
                    machine={selectedMachine}
                    recipes={recipes.filter(r => r.machineId === selectedMachine.id)}
                    onUpdate={(updatedRecipes) => {
                      setRecipes(recipes.map(r => updatedRecipes.find(ur => ur.id === r.id) || r))
                    }}
                  />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Coffee className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">Select a machine to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Bot className="h-8 w-8 mr-2 text-primary" />
            AI Insights Dashboard
          </CardTitle>
          <CardDescription>
            Real-time analysis and recommendations for your kiosk operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((index) => (
                  <Card key={index}>
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator />

              <div>
                <Skeleton className="h-6 w-1/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              <div>
                <Skeleton className="h-6 w-1/3 mb-2" />
                <div className="space-y-2">
                  {[1, 2, 3].map((index) => (
                    <Skeleton key={index} className="h-8 w-full" />
                  ))}
                </div>
              </div>
            </div>
          ) : aiInsights ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                      Sales Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{aiInsights.salesTrend || 'No sales trend data available.'}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                    <Hammer className="h-5 w-5 mr-2 text-red-500" />
                      Maintenance Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{aiInsights.maintenanceInsight || 'No maintenance insights available.'}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Package className="h-5 w-5 mr-2 text-blue-500" />
                      Inventory Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{aiInsights.inventoryRecommendation || 'No inventory recommendations available.'}</p>
                  </CardContent>
                </Card>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold mb-2">Detailed Analysis</h3>
                <p className="text-sm whitespace-pre-line">{aiInsights.detailedAnalysis || 'No detailed analysis available.'}</p>
              </div>

              {aiInsights.anomalyDetected && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Anomaly Detected</AlertTitle>
                  <AlertDescription>{aiInsights.anomalyDescription}</AlertDescription>
                </Alert>
              )}

              {aiInsights.actionItems && aiInsights.actionItems.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Recommended Actions</h3>
                  <div className="space-y-2">
                    {aiInsights.actionItems.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`action-${index}`}
                          checked={completedActions.includes(index)}
                          onCheckedChange={() => toggleActionCompletion(index)}
                        />
                        <label
                          htmlFor={`action-${index}`}
                          className={`text-sm ${completedActions.includes(index) ? 'line-through text-gray-500' : ''}`}
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40">
              <p className="text-lg text-gray-500">No AI insights available. Please try again later.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}