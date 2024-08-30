import { Component } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Products} from '../../../core/models/products.model';
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
    price: 0, 
    images: '', 
    updatedAt: new Date(),
    creationAt: new Date(),
    category: {
      id: 0, name: '',
      image: ''
    } 
  };
  queries: any = {
    sort: '-updatedAt',
  };

  constructor(private productsService: ProductsService, private toast: ToastrService) {}

  ngOnInit(){
    this.getProducts();
    this.getCategories();
  }

  getProducts(): void {
    this.isLoading = true;
    this.productsService.getProducts().subscribe(
      (data: Products[]) => {
        this.products = data;
        this.isLoading = false;
        console.log(this.products);
        console.log('Berhasil get data', data);
        this.sortProduct(this.queries.sort === '-creationAt' ? 'Terlama' : 'Terbaru');
      },
      (error) => {
        console.error('Gagal mengambil data user', error);
        this.isLoading = false;
      }
    );
  }
  


  selectProduct(product: Products): void {
    this.selectedProduct = product;
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(product => product.id !== id);
          this.toast.success('Berhasil menghapus produk');
        },
        error: (err) => {
          console.error('Error menghapus produk:', err);
          this.toast.error('Gagal menghapus produk');
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

  createProduct(product: Products):void {
    this.productsService.createProduct(product).subscribe(
      (createdProduct: Products) => {
        console.log('Berhasil menambahkan produk', createdProduct);
        this.getProducts();
        this.toast.success('Berhasil menambahkan produk');
      },
      (error) => {
        console.error('Error menambahkan produk:', error);
        this.toast.error('Gagal menambahkan produk');
      }
    );
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

  onSubmit(form: NgForm): void {
    if(this.selectedProduct){
      this.saveChanges();
    }else{
      if (form.valid) {
        const formData = form.value;
        const imagesArray = formData.images.split(',').map((image: string) => image.trim());
  
        const newProduct: Products = {
          id: 0,
          title: formData.title,
          price: formData.price,
          description: formData.description,
          images: imagesArray,
          updatedAt: new Date(),
          creationAt: new Date(),
          category: formData.category
        };
        this.createProduct(newProduct);
      } else {
        this.toast.error('Silahkan isi form terlebih dahulu');
      }
    }
  }

  sortProduct(sort: string): void {
    console.log('Sort By:', sort);
    
    if (sort === 'Terbaru') {
      this.products.sort((a, b) => new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime());
    } else if (sort === 'Terlama') {
      this.products.sort((a, b) => new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime());
    } else{
      this.products.sort((a, b) => new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime());
    }
  }
}

