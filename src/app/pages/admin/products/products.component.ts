import { Component } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Products } from '../../../core/models/products.model';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import * as XLSX from 'xlsx';
import { Category } from '../../../core/models/category.model';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Products[] = []; 
  categories: Category[] = [];
  selectedProduct: Products | null = null;
  isLoading: boolean = true; 

  constructor(private productsService: ProductsService) {}

  ngOnInit(){
    this.getProducts();
    this.getCategories();
  }

  getProducts(): void {
    this.productsService.getProducts().subscribe(
      (data: Products[]) => {
        this.products = data;
        this.isLoading = false;
        console.log('Berhasil get data', data);
      },
      (error) => {
        console.error('Gagal mengambil data user', error);
      }
    )
  }

  selectProduct(product: Products): void {
    this.selectedProduct = product;
  }

  saveChanges(): void {
    if (this.selectedProduct) {
      this.productsService.updateProducts(this.selectedProduct).subscribe(
        (response) => {
          console.log('Pengguna berhasil diperbarui', response);
          this.getProducts();
        },
        (error) => {
          console.error('Gagal memperbarui pengguna', error);
        }
      );
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.products = this.products.filter(product => product.id !== id);
      console.log(`Product with ID ${id} deleted from UI`);
    }
  }

  getCategories(): void {
    this.productsService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
        console.log('Berhasil mendapatkan kategori', data);
      },
      (error) => {
        console.error('Gagal mengambil kategori', error);
      }
    );
  }

  exportToExcel() {
    const productInExcel = this.products.map(product => ({
      ID: product.id, 
      NamaProduk: product.title, 
      KategoriProduk: product.category.name,
      Harga: '$' + product.price, 
    }))

    const ws = XLSX.utils.json_to_sheet(productInExcel); 
    const wb = XLSX.utils.book_new(); 

    XLSX.utils.book_append_sheet(wb, ws); 
    XLSX.writeFile(wb, 'Data Produk.xlsx')
  }

}

