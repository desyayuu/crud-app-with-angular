import { Component } from '@angular/core';
import { ProductsService } from '../../core/products.service';
import { Products } from '../../core/models/products.model';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Products[] = []; 

  constructor(private productsService: ProductsService) {}

  ngOnInit(){
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe(
      (data: Products[]) => {
        this.products = data;
        console.log('Berhasil get data', data);
      },
      (error) => {
        console.error('Gagal mengambil data user', error);
      }
    )
  }
}
