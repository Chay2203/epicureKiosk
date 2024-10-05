'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2 } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export function DispenserManagement({ machine, onUpdate }) {
  const [localMachine, setLocalMachine] = useState(machine)
  const [editingDispenser, setEditingDispenser] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newIngredient, setNewIngredient] = useState({ name: '', quantity: '' })

  useEffect(() => {
    const storedMachine = localStorage.getItem(`machine_${machine.id}`)
    if (storedMachine) {
      setLocalMachine(JSON.parse(storedMachine))
    } else {
      setLocalMachine(machine)
    }
  }, [machine])

  useEffect(() => {
    localStorage.setItem(`machine_${localMachine.id}`, JSON.stringify(localMachine))
    onUpdate(localMachine)
  }, [localMachine, onUpdate])

  const handleEdit = (dispenser) => {
    setEditingDispenser({ ...dispenser, quantity: dispenser.quantity.toString() })
    setIsEditDialogOpen(true)
  }

  const handleSave = () => {
    if (editingDispenser) {
      setLocalMachine(prevMachine => ({
        ...prevMachine,
        dispensers: prevMachine.dispensers.map(d => 
          d.id === editingDispenser.id ? {...editingDispenser, quantity: parseInt(editingDispenser.quantity) || 0} : d
        )
      }))
      setIsEditDialogOpen(false)
      setEditingDispenser(null)
    }
  }

  const handleAdd = () => {
    if (newIngredient.name && newIngredient.quantity !== '') {
      setLocalMachine(prevMachine => ({
        ...prevMachine,
        dispensers: [
          ...prevMachine.dispensers,
          { id: Date.now(), ...newIngredient, quantity: parseInt(newIngredient.quantity) || 0 }
        ]
      }))
      setNewIngredient({ name: '', quantity: '' })
    }
  }

  const handleDelete = (id) => {
    setLocalMachine(prevMachine => ({
      ...prevMachine,
      dispensers: prevMachine.dispensers.filter(d => d.id !== id)
    }))
  }

  return (
    <Card className="mb-6 dark:bg-gray-800 dark:text-white">
      <CardHeader>
        <CardTitle className="dark:text-white">Dispenser Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="dark:border-gray-700">
                <TableHead className="dark:text-gray-300">Ingredient</TableHead>
                <TableHead className="dark:text-gray-300">Quantity</TableHead>
                <TableHead className="text-right dark:text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localMachine.dispensers.map((dispenser) => (
                <TableRow key={dispenser.id} className="dark:border-gray-700">
                  <TableCell className="font-medium dark:text-white">{dispenser.name}</TableCell>
                  <TableCell className="dark:text-gray-300">{dispenser.quantity}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(dispenser)} className="dark:border-gray-600 dark:text-gray-300">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="dark:bg-gray-800 dark:text-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="dark:text-white">Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription className="dark:text-gray-300">
                              This action cannot be undone. This will permanently delete the dispenser.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="dark:bg-gray-700 dark:text-white">Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(dispenser.id)} className="dark:bg-red-600 dark:text-white">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="dark:bg-gray-800 dark:text-white">
            <DialogHeader>
              <DialogTitle className="dark:text-white">Edit Dispenser</DialogTitle>
            </DialogHeader>
            {editingDispenser && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right dark:text-gray-300">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={editingDispenser.name}
                    onChange={(e) => setEditingDispenser({ ...editingDispenser, name: e.target.value })}
                    className="col-span-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right dark:text-gray-300">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={editingDispenser.quantity}
                    onChange={(e) => setEditingDispenser({ ...editingDispenser, quantity: e.target.value })}
                    className="col-span-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={handleSave} className="dark:bg-blue-600 dark:text-white">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2 dark:text-white">Add New Ingredient</h4>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              type="text"
              value={newIngredient.name}
              onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
              placeholder="Ingredient name"
              className="w-full sm:w-auto dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <Input
              type="number"
              value={newIngredient.quantity}
              onChange={(e) => setNewIngredient({ ...newIngredient, quantity: e.target.value })}
              placeholder="Quantity"
              className="w-full sm:w-auto dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <Button onClick={handleAdd} className="w-full sm:w-auto dark:bg-blue-600 dark:text-white">Add</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}