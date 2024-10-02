import React, { useState } from 'react'
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
  const [editingDispenser, setEditingDispenser] = useState(null)
  const [newIngredient, setNewIngredient] = useState({ name: '', quantity: 0 })

  const handleEdit = (dispenser) => {
    setEditingDispenser({ ...dispenser })
  }

  const handleSave = () => {
    const updatedMachine = {
      ...machine,
      dispensers: machine.dispensers.map(d => 
        d.id === editingDispenser.id ? editingDispenser : d
      )
    }
    onUpdate(updatedMachine)
    setEditingDispenser(null)
  }

  const handleAdd = () => {
    if (newIngredient.name && newIngredient.quantity > 0) {
      const updatedMachine = {
        ...machine,
        dispensers: [
          ...machine.dispensers,
          { id: Date.now(), ...newIngredient }
        ]
      }
      onUpdate(updatedMachine)
      setNewIngredient({ name: '', quantity: 0 })
    }
  }

  const handleDelete = (id) => {
    const updatedMachine = {
      ...machine,
      dispensers: machine.dispensers.filter(d => d.id !== id)
    }
    onUpdate(updatedMachine)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Dispenser Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {machine.dispensers.map((dispenser) => (
                <TableRow key={dispenser.id}>
                  <TableCell className="font-medium">{dispenser.name}</TableCell>
                  <TableCell>{dispenser.quantity}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => handleEdit(dispenser)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Dispenser</DialogTitle>
                          </DialogHeader>
                          {editingDispenser && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Name
                                </Label>
                                <Input
                                  id="name"
                                  value={editingDispenser.name}
                                  onChange={(e) => setEditingDispenser({ ...editingDispenser, name: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="quantity" className="text-right">
                                  Quantity
                                </Label>
                                <Input
                                  id="quantity"
                                  type="number"
                                  value={editingDispenser.quantity}
                                  onChange={(e) => setEditingDispenser({ ...editingDispenser, quantity: parseInt(e.target.value) })}
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button onClick={handleSave}>Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the dispenser.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(dispenser.id)}>
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

        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Add New Ingredient</h4>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              type="text"
              value={newIngredient.name}
              onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
              placeholder="Ingredient name"
              className="w-full sm:w-auto"
            />
            <Input
              type="number"
              value={newIngredient.quantity}
              onChange={(e) => setNewIngredient({ ...newIngredient, quantity: parseInt(e.target.value) })}
              placeholder="Quantity"
              className="w-full sm:w-auto"
            />
            <Button onClick={handleAdd} className="w-full sm:w-auto">Add</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}