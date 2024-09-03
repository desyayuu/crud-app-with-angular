import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../../core/models/products.model';
import { ProductsService } from '../../../core/services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css'] 
})
export class ShoesComponent {
  products: Products[] = [];
  category: string = "Shoes";
  loading: boolean = true;
  priceMin: number = 0;
  priceMax: number = 0;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productsService.getProductsByCategory(this.category, this.priceMin, this.priceMax).subscribe(
      (products) => {
        this.products = products;
        this.loading = false;  
      },
      (error) => {
        console.error(error);
        this.loading = false;  
      }
    );
  }

  onFilterByPrice(): void {
    this.loadProducts();
  }
}
