"use client"

import { Button } from "@/components/ui/button"
import { Utensils, Coffee, Cookie, Candy, ChefHat } from "lucide-react"

export type Category = "All" | "Food" | "Drink" | "Snacks" | "Biscuits" | "Chocolate"

interface CategoryFilterProps {
  selectedCategory: Category
  onCategoryChange: (category: Category) => void
}

const categories: { name: Category; icon: React.ElementType }[] = [
  { name: "All", icon: ChefHat },
  { name: "Food", icon: Utensils },
  { name: "Drink", icon: Coffee },
  { name: "Snacks", icon: Cookie },
  { name: "Biscuits", icon: Cookie },
  { name: "Chocolate", icon: Candy },
]

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(({ name, icon: Icon }) => (
        <Button
          key={name}
          variant={selectedCategory === name ? "default" : "secondary"}
          size="sm"
          onClick={() => onCategoryChange(name)}
          className="gap-2 rounded-full px-4"
        >
          <Icon className="h-4 w-4" />
          {name}
        </Button>
      ))}
    </div>
  )
}
