import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MachineList } from '../components/MachineList'
import { MachineDetails } from '../components/MachineDetails'
import { RecipeManagement } from '../components/RecipieManagement'
import { DispenserManagement } from '../components/DispenserManagement'
import { mockMachines, mockRecipes, mockSalesData } from '../mockData'
import { Sun, Moon, Coffee, AlertTriangle, TrendingUp, Hammer, Package, Bot, CheckCircle2, ShoppingCart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import Product from '../components/ProductSection';

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
  const [hasFetchedInsights, setHasFetchedInsights] = useState(false) 
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    const fetchAiInsights = async () => {
      if (hasFetchedInsights) return; 
      setLoading(true)
      try {
        const response = await axios.post(`${API_URL}/ai_insights`, {
          machines: machines,
          salesData: mockSalesData,
        })
        setAiInsights(response.data.insights)
        console.log('AI Insights:', response.data.insights)
        setError(null)
        setHasFetchedInsights(true) 
      } catch (error) {
        console.error('Error fetching AI insights:', error)
        setError('Failed to fetch AI insights. Please refresh the page to try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchAiInsights() 

  }, [hasFetchedInsights])

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

  const sendMessageToFlutter = () => {
    if (window.BluetoothChannel) {
      window.BluetoothChannel.postMessage(message);
    } else {
      console.error('BluetoothChannel is not available.');
    }
  };

  useEffect(() => {
    const handleReceivedMessage = (event) => {
      console.log('Received message from Flutter:', event.detail); 
      setReceivedMessage(event.detail); 
    };

    document.addEventListener('bluetoothMessageReceived', handleReceivedMessage);

    return () => {
      document.removeEventListener('bluetoothMessageReceived', handleReceivedMessage);
    };
  }, []);

  return (
    <div className={`min-h-screen p-4 transition-colors duration-200 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className="flex justify-between items-center mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold dark:text-white">Kiosk Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleDarkMode}
            className={`w-[80px] h-[40px] rounded-full transition-colors duration-200 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          >
            <Sun className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 ${
              darkMode ? 'text-white' : 'text-yellow-500'
            }`} />
            <Moon className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 ${
              darkMode ? 'text-white' : 'text-gray-400'
            }`} />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      {error && (
        <Alert variant="destructive" className="mb-6 dark:bg-red-900 dark:border-red-800">
          <AlertTriangle className="h-4 w-4 dark:text-red-100" />
          <AlertTitle className="dark:text-red-100">Error</AlertTitle>
          <AlertDescription className="dark:text-red-100">{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 dark:bg-gray-800 dark:text-white">
          <CardHeader>
            <CardTitle className="dark:text-white">Machines</CardTitle>
          </CardHeader>
          <CardContent>
            <MachineList
              machines={machines}
              onSelectMachine={setSelectedMachine}
              selectedMachineId={selectedMachine?.id}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 dark:bg-gray-800 dark:text-white">
          <CardHeader>
            <CardTitle className="dark:text-white">{selectedMachine ? selectedMachine.name : 'Machine Details'}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMachine ? (
              <Tabs defaultValue="details" className="space-y-4">
                <TabsList className="dark:bg-gray-700">
                  <TabsTrigger value="details" className="dark:text-white dark:data-[state=active]:bg-gray-600">Details</TabsTrigger>
                  <TabsTrigger value="dispensers" className="dark:text-white dark:data-[state=active]:bg-gray-600">Dispensers</TabsTrigger>
                  <TabsTrigger value="recipes" className="dark:text-white dark:data-[state=active]:bg-gray-600">Recipes</TabsTrigger>
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
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Coffee className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-gray-300" />
                <p className="text-lg dark:text-white">Select a machine to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 dark:bg-gray-800 dark:text-white">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl dark:text-white">
            <Bot className="h-8 w-8 mr-2 text-primary dark:text-white" />
            AI Insights Dashboard
          </CardTitle>
          <CardDescription className="dark:text-gray-300">
            Real-time analysis and recommendations for your kiosk operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((index) => (
                  <Card key={index} className="dark:bg-gray-700">
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4 dark:bg-gray-600" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2 dark:bg-gray-600" />
                      <Skeleton className="h-4 w-5/6 dark:bg-gray-600" />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator className="dark:bg-gray-600" />

              <div>
                <Skeleton className="h-6 w-1/4 mb-2 dark:bg-gray-600" />
                <Skeleton className="h-4 w-full mb-2 dark:bg-gray-600" />
                <Skeleton className="h-4 w-full mb-2 dark:bg-gray-600" />
                <Skeleton className="h-4 w-3/4 dark:bg-gray-600" />
              </div>

              <div>
                <Skeleton className="h-6 w-1/3 mb-2 dark:bg-gray-600" />
                <div className="space-y-2">
                  {[1, 2, 3].map((index) => (
                    <Skeleton key={index} className="h-8 w-full dark:bg-gray-600" />
                  ))}
                </div>
              </div>
            </div>
          ) : aiInsights ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="dark:bg-gray-700 dark:text-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center dark:text-white">
                      <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                      Sales Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm dark:text-gray-300">{aiInsights.salesTrend || 'No sales trend data available.'}</p>
                  </CardContent>
                </Card>
                <Card className="dark:bg-gray-700 dark:text-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center dark:text-white">
                    <Hammer className="h-5 w-5 mr-2 text-red-500" />
                      Maintenance Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm dark:text-gray-300">{aiInsights.maintenanceInsight || 'No maintenance insights available.'}</p>
                  </CardContent>
                </Card>
                <Card className="dark:bg-gray-700 dark:text-white">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center dark:text-white">
                      <Package className="h-5 w-5 mr-2 text-blue-500" />
                      Inventory Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm dark:text-gray-300">{aiInsights.inventoryRecommendation || 'No inventory recommendations available.'}</p>
                  </CardContent>
                </Card>
              </div>

              <Separator className="dark:bg-gray-600" />

              <div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Detailed Analysis</h3>
                <p className="text-sm whitespace-pre-line dark:text-gray-300">{aiInsights.detailedAnalysis || 'No detailed analysis available.'}</p>
              </div>

              {aiInsights.anomalyDetected && (
                <Alert variant="destructive" className="dark:bg-red-900 dark:border-red-800 dark:text-red-100">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Anomaly Detected</AlertTitle>
                  <AlertDescription>{aiInsights.anomalyDescription}</AlertDescription>
                </Alert>
              )}

              {aiInsights.actionItems && aiInsights.actionItems.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Recommended Actions</h3>
                  <div className="space-y-2">
                    {aiInsights.actionItems.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`action-${index}`}
                          checked={completedActions.includes(index)}
                          onCheckedChange={() => toggleActionCompletion(index)}
                          className="dark:border-gray-400"
                        />
                        <label
                          htmlFor={`action-${index}`}
                          className={`text-sm ${completedActions.includes(index) ? 'line-through text-gray-500 dark:text-gray-400' : 'dark:text-white'}`}
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
              <p className="text-lg text-gray-500 dark:text-gray-400">No AI insights available. Please try again later.</p>
            </div>
          )}
        </CardContent>
      </Card>
      <div style={{ padding: '20px' }}>
        <h1>Bluetooth Message Sender</h1>
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message to send"
          />
          <button onClick={sendMessageToFlutter}>Send Message</button>
        </div>
        {receivedMessage && (
          <div style={{ marginTop: '20px' }}>
            <h2>Received Message:</h2>
            <p>{receivedMessage}</p>
          </div>
        )}
      </div>
      <Card className="mt-6 dark:bg-gray-800 dark:text-white">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl dark:text-white">
            <ShoppingCart className="h-6 w-6 mr-2" />
            Available Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Product />
        </CardContent>
      </Card>
    </div>
  )
}