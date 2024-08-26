import { Component } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Products } from '../../../core/models/products.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm} from '@angular/forms';
import * as XLSX from 'xlsx';
import { Category } from '../../../core/models/category.model';
import { ToastrService } from 'ngx-toastr';



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
  newProduct: Products = {
    id: 0, 
    title: '', 
    description: '', 
    price:0, 
    images: [], 
    category: {
      id: 0, name: '',
      image: ''
    } 
  }

  constructor(private productsService: ProductsService, private toast: ToastrService) {}

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
          console.log('Produk berhasil diperbarui', response);
          this.getProducts();
          this.toast.success('Produk berhasil diperbarui');
        },
        (error) => {
          console.error('Gagal memperbarui produk', error);
          this.toast.error('Gagal memperbarui produk');
        }
      );
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== id);
          this.toast.success('Product deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting product:', err);
          this.toast.error('Failed to delete product.');
        }
      });
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

  createProduct(form: NgForm): void {
    if (form.valid) {
      const formData = form.value;
      const imagesArray = formData.images.split(',').map((image: string) => image.trim());

      const product = {
        title: formData.title,
        price: formData.price,
        description: formData.description,
        images: imagesArray, 
        category: formData.category
      };

      this.productsService.createProduct(product).subscribe({
        next: (response) => {
          console.log('Berhasil menambahkan Produk', response);
          this.getProducts();
          this.toast.success('Berhasil menambahkan Produk');
        },
        error: (error) => {
          console.error('Error creating product:', error);
          this.toast.error('Gagal menambahkan produk');
        }
      });
    } else {
      this.toast.error('Please fill in all required fields.');
    }
  }
}

