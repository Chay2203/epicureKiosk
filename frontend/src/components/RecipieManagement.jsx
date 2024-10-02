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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash2 } from 'lucide-react'

export function RecipeManagement({ machine, recipes, onUpdate }) {
  const [editingRecipe, setEditingRecipe] = useState(null)
  const [newRecipe, setNewRecipe] = useState({ name: '', ingredients: [] })
  const [isAddingRecipe, setIsAddingRecipe] = useState(false)

  const handleEdit = (recipe) => {
    setEditingRecipe({ ...recipe })
  }

  const handleSave = () => {
    const updatedRecipes = recipes.map((r) =>
      r.id === editingRecipe.id ? editingRecipe : r
    )
    onUpdate(updatedRecipes)
    setEditingRecipe(null)
  }

  const handleAdd = () => {
    if (newRecipe.name && newRecipe.ingredients.length > 0) {
      const updatedRecipes = [
        ...recipes,
        { id: Date.now(), machineId: machine.id, ...newRecipe },
      ]
      onUpdate(updatedRecipes)
      setNewRecipe({ name: '', ingredients: [] })
      setIsAddingRecipe(false)
    } else {
      alert("Please enter a recipe name and at least one ingredient.")
    }
  }

  const handleDelete = (id) => {
    const updatedRecipes = recipes.filter((r) => r.id !== id)
    onUpdate(updatedRecipes)
  }

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...editingRecipe.ingredients]
    updatedIngredients[index][field] = value
    setEditingRecipe({ ...editingRecipe, ingredients: updatedIngredients })
  }

  const handleNewIngredientChange = (index, field, value) => {
    const updatedIngredients = [...newRecipe.ingredients]
    updatedIngredients[index][field] = value
    setNewRecipe({ ...newRecipe, ingredients: updatedIngredients })
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Recipe Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Recipe Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipes.map((recipe) => (
              <TableRow key={recipe.id}>
                <TableCell>{recipe.name}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(recipe)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(recipe.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button className="mt-4" onClick={() => setIsAddingRecipe(true)}>
          Add New Recipe
        </Button>

        <Dialog open={!!editingRecipe} onOpenChange={() => setEditingRecipe(null)}>
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
                      onChange={(e) => handleIngredientChange(index, 'quantity', parseInt(e.target.value) || 0)}
                      placeholder="Quantity"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        const updatedIngredients = editingRecipe.ingredients.filter((_, i) => i !== index)
                        setEditingRecipe({ ...editingRecipe, ingredients: updatedIngredients })
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setEditingRecipe({
                    ...editingRecipe,
                    ingredients: [...editingRecipe.ingredients, { name: '', quantity: 0 }]
                  })}
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
                    onChange={(e) => handleNewIngredientChange(index, 'quantity', parseInt(e.target.value) || 0)}
                    placeholder="Quantity"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      const updatedIngredients = newRecipe.ingredients.filter((_, i) => i !== index)
                      setNewRecipe({ ...newRecipe, ingredients: updatedIngredients })
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setNewRecipe({
                  ...newRecipe,
                  ingredients: [...newRecipe.ingredients, { name: '', quantity: 0 }]
                })}
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