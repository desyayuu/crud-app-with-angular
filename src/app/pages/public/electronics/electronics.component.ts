import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../../core/models/products.model';
import { ProductsService } from '../../../core/products.service';

@Component({
  selector: 'app-electronics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './electronics.component.html',
  styleUrl: './electronics.component.css'
})
export class ElectronicsComponent {
  products: Products[] = []; 
  category: string = "Electronics"

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
