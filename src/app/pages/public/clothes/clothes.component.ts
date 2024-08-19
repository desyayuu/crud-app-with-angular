import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../../core/models/products.model';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-clothes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css'] 
})
export class ClothesComponent {
  products: Products[] = [];
  category: string = "Clothes";
  loading: boolean = true; 

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProductsByCategory(this.category).subscribe(
      (products) => {
        this.products = products;
        this.loading = false;  
      },
      (error) => {
        console.error();
        this.loading = false;  
      }
    );
  }
}
