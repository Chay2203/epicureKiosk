import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import React, { useState } from 'react'


const products = [
  {
    id: "1",
    name: "Aampanna",
    ingredients: ["Powder1", "Powder2", "Powder3", "Liquid1", "Liquid2", "Liquid3"],
    price: 1,
  },
  {
    id: "2",
    name: "Orange",
    ingredients: ["Liquid1", "Liquid2", "Liquid3"],
    price: 1,
  },
  {
    id: "3",
    name: "pump-4",
    ingredients: ["Liquid1"],
    price: 1,
  },
];

const sendMessageToFlutter = () => {
  if (window.BluetoothChannel) {
    window.BluetoothChannel.postMessage(message);
  } else {
    console.error('BluetoothChannel is not available.');
  }
};


function Product() {
  const [message, setMessage] = useState('');
  return (
    <Card className="mt-6 dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl dark:text-white">
          <ShoppingCart className="h-6 w-6 mr-2" />
          Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden dark:bg-gray-700">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">{product.name}</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ingredients: {product.ingredients.join(", ")}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold dark:text-white">₹{product.price}</p>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter message to send"
                    />
                    <Button
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={sendMessageToFlutter}                      
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Order Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Product; 
