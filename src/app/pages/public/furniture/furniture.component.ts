import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../../core/models/products.model';
import { ProductsService } from '../../../core/products.service';

@Component({
  selector: 'app-furniture',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './furniture.component.html',
  styleUrl: './furniture.component.css'
})
export class FurnitureComponent {
  products: Products[] = []; 
  category: string = "Furniture"

  constructor (private productsService: ProductsService) {}

  ngOnInit(): void{
    this.productsService.getProductsByCategory(this.category).subscribe(
      (products) =>{
        this.products = products;
        console.log(products)
      }, 
      (error) => {
        console.error();
      }
    )
  }

}
