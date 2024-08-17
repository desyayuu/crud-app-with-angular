import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../../core/models/products.model';
import { ProductsService } from '../../../core/products.service';

@Component({
  selector: 'app-shoes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shoes.component.html',
  styleUrl: './shoes.component.css'
})
export class ShoesComponent {
  products: Products[] = []; 
  category: string = "Shoes"

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
