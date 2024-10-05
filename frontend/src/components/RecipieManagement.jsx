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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Pencil, Trash2, PlusCircle } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export function RecipeManagement({ machine, recipes: initialRecipes, onUpdate }) {
  const [recipes, setRecipes] = useState(initialRecipes)
  const [editingRecipe, setEditingRecipe] = useState(null)
  const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: [] })
  const [isAddingRecipe, setIsAddingRecipe] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  useEffect(() => {
    const storedRecipes = localStorage.getItem(`recipes_${machine.id}`)
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes))
    } else {
      setRecipes(initialRecipes)
    }
  }, [machine.id, initialRecipes])

  useEffect(() => {
    localStorage.setItem(`recipes_${machine.id}`, JSON.stringify(recipes))
    onUpdate(recipes)
  }, [recipes, machine.id, onUpdate])

  const handleEdit = (recipe) => {
    setEditingRecipe({ ...recipe })
    setIsEditDialogOpen(true)
  }

  const handleSave = () => {
    if (editingRecipe) {
      setRecipes(prevRecipes => 
        prevRecipes.map(r => r.id === editingRecipe.id ? editingRecipe : r)
      )
      setIsEditDialogOpen(false)
      setEditingRecipe(null)
    }
  }

  const handleAdd = () => {
    if (newRecipe.name && newRecipe.ingredients.length > 0) {
      const newRecipeWithId = {
        id: Date.now(),
        machineId: machine.id,
        ...newRecipe,
      }
      setRecipes(prevRecipes => [...prevRecipes, newRecipeWithId])
      setNewRecipe({ name: '', ingredients: [] })
      setIsAddingRecipe(false)
    } else {
      alert("Please enter a recipe name and at least one ingredient.")
    }
  }

  const handleDelete = (id) => {
    setRecipes(prevRecipes => prevRecipes.filter(r => r.id !== id))
  }

  const handleIngredientChange = (index, field, value) => {
    setEditingRecipe(prevRecipe => {
      const updatedIngredients = [...prevRecipe.ingredients]
      updatedIngredients[index] = { ...updatedIngredients[index], [field]: value }
      return { ...prevRecipe, ingredients: updatedIngredients }
    })
  }

  const handleNewIngredientChange = (index, field, value) => {
    setNewRecipe(prevRecipe => {
      const updatedIngredients = [...prevRecipe.ingredients]
      updatedIngredients[index] = { ...updatedIngredients[index], [field]: value }
      return { ...prevRecipe, ingredients: updatedIngredients }
    })
  }

  return (
    <Card className="mb-6 dark:bg-gray-800 dark:text-white">
      <CardHeader>
        <CardTitle className="dark:text-white">Recipe Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="dark:border-gray-700">
              <TableHead className="dark:text-gray-300">Recipe Name</TableHead>
              <TableHead className="text-right dark:text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipes.map((recipe) => (
              <TableRow key={recipe.id} className="dark:border-gray-700">
                <TableCell className="dark:text-white">{recipe.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(recipe)} className="dark:border-gray-600 dark:text-gray-300">
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
                            This action cannot be undone. This will permanently delete the recipe.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="dark:bg-gray-700 dark:text-white">Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(recipe.id)} className="dark:bg-red-600 dark:text-white">
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
        
        <Button className="mt-4" onClick={() => setIsAddingRecipe(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Recipe
        </Button>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Recipe</DialogTitle>
            </DialogHeader>
            {editingRecipe && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="recipe-name" className="text-right">
                    Recipe Name
                  </Label>
                  <Input
                    id="recipe-name"
                    value={editingRecipe.name}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                {editingRecipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="grid grid-cols-4 items-center gap-4">
                    <Input
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      placeholder="Ingredient Name"
                      className="col-span-2"
                    />
                    <Input
                      type="number"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                      placeholder="Quantity"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        setEditingRecipe(prevRecipe => ({
                          ...prevRecipe,
                          ingredients: prevRecipe.ingredients.filter((_, i) => i !== index)
                        }))
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setEditingRecipe(prevRecipe => ({
                    ...prevRecipe,
                    ingredients: [...prevRecipe.ingredients, { name: '', quantity: '' }]
                  }))}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Ingredient
                </Button>
              </div>
            )}
            <DialogFooter>
              <Button onClick={handleSave}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isAddingRecipe} onOpenChange={setIsAddingRecipe}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Recipe</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-recipe-name" className="text-right">
                  Recipe Name
                </Label>
                <Input
                  id="new-recipe-name"
                  value={newRecipe.name}
                  onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              {newRecipe.ingredients.map((ingredient, index) => (
                <div key={index} className="grid grid-cols-4 items-center gap-4">
                  <Input
                    value={ingredient.name}
                    onChange={(e) => handleNewIngredientChange(index, 'name', e.target.value)}
                    placeholder="Ingredient Name"
                    className="col-span-2"
                  />
                  <Input
                    type="number"
                    value={ingredient.quantity}
                    onChange={(e) => handleNewIngredientChange(index, 'quantity', e.target.value)}
                    placeholder="Quantity"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      setNewRecipe(prevRecipe => ({
                        ...prevRecipe,
                        ingredients: prevRecipe.ingredients.filter((_, i) => i !== index)
                      }))
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setNewRecipe(prevRecipe => ({
                  ...prevRecipe,
                  ingredients: [...prevRecipe.ingredients, { name: '', quantity: '' }]
                }))}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Ingredient
              </Button>
            </div>
            <DialogFooter>
              <Button onClick={handleAdd}>Add Recipe</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}