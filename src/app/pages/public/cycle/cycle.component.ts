import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from '../../../core/models/products.model';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-cycle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cycle.component.html',
  styleUrl: './cycle.component.css'
})
export class CycleComponent {
  products: Products[] = []; 
  category: string = "Miscellaneous"; 
  loading: boolean = true;

  constructor (private productsService: ProductsService) {}

  ngOnInit(): void{
    this.productsService.getProductsByCategory(this.category).subscribe(
      (products) =>{
        this.products = products;
        this.loading=false;
      }, 
      (error) => {
        console.error();
        this.loading=false;
      }
    )
  }

}
