import { Category } from "./category.model"

export interface Products{
    id: number, 
    title: string, 
    price: number, 
    description: string, 
    images: string[];
    category: Category
}