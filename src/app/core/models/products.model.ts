import { Category } from "./category.model"

export interface Products{
    id: number, 
    title: string, 
    price: number, 
    description: string, 
    image: string
    category: Category
}