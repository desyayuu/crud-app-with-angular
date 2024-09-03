import { Component } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { Products} from '../../../core/models/products.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm} from '@angular/forms';
import * as XLSX from 'xlsx';
import { Category } from '../../../core/models/category.model';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
    title: '', 
  };
  // currentOffset: number = 0; 
  // currentPageLimit: number = 10;
  // itemsPerPage: number = 10;
  // totalItems: number = 0;
  searchTitle: string = '';
  private searchSubject = new Subject<string>();

  constructor(private productsService: ProductsService, private toast: ToastrService) {
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe((searchText) => {
      this.getProducts();
    });
  }

  ngOnInit(){
    this.getProducts();
    this.getCategories();
  }

  onSearchTitleChange(): void {
    this.searchSubject.next(this.searchTitle);
  }

  getProducts(): void {
    this.isLoading = true;
    this.productsService.getProducts(
      {
        // offset: this.currentOffset, 
        // limit: this.currentPageLimit, 
        title: this.searchTitle, 
      }).subscribe(
      (data: Products[]) => {
        this.products = data
          .map(product => ({
            ...product,
            creationAt: new Date(product.creationAt)
          }))
          .sort((a, b) => b.creationAt.getTime() - a.creationAt.getTime());
        this.isLoading = false;
        // this.totalItems = this.products.length;
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
        this.resetForm();
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
      this.productsService.updateProducts(this.selectedProduct).subscribe(() => {
          this.resetForm();
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


  resetForm(): void {
    this.newProduct = {
      id: 0,
      title: '',
      description: '',
      price: 0,
      images: '',
      updatedAt: new Date(),
      creationAt: new Date(),
      category: {
        id: 0,
        name: '',
        image: ''
      }
    }
  }

  // nextPage(): void {
  //   this.currentOffset += this.currentPageLimit;
  //   this.getProducts();
  // }

  // prevPage(): void {
  //   this.currentOffset -= this.currentPageLimit;
  //   this.getProducts();
  // }

  // goToPage(page: number): void {
  //   this.currentOffset = (page - 1) * this.currentPageLimit;
  //   this.getProducts();
  // }

}

