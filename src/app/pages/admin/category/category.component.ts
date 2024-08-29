import { Component, OnInit} from '@angular/core';
import { Category } from '../../../core/models/category.model'; 
import { CategoryService } from '../../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CategoryComponent, CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  category: Category[] = [];
  isLoading: boolean = true;
  newCategory: Category = { id: 0, name: '', image: ''};
  selectedCategory: Category | null = null;

  constructor(private categoryService: CategoryService, private toast: ToastrService) {}
  
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: Category[])=> {
        this.category=data; 
        this.isLoading = false;
      }
    )
  }

  addCategory(): void {
    this.categoryService.createCategory(this.newCategory).subscribe(
      (response) => {
        console.log('Kategori berhasil ditambahkan', response);
        this.getCategories();
      },
      (error) => {
        console.error('Gagal menambahkan kategori', error);
      }
    );
  }

  onSubmited(form: NgForm): void {
    if (form.valid) {
      this.addCategory();
    }else if(this.selectedCategory){
      this.saveChanges();
    }
  }

  deleteCategory(id: number): void{
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(
        (response) => {
          console.log('Kategori berhasil dihapus', response);
          this.toast.success('Kategori berhasil dihapus');
          this.getCategories();
        },
        (error) => {
          console.error('Gagal menghapus kategori', error);
          this.toast.error('Gagal menghapus kategori', error);
        }
      );
    }
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
  }

  saveChanges(): void {
    if (this.selectedCategory) {
      this.categoryService.updateCategory(this.selectedCategory).subscribe(
        (response) => {
          console.log('Produk berhasil diperbarui', response);
          this.getCategories();
          this.toast.success('Produk berhasil diperbarui');
        },
        (error) => {
          console.error('Gagal memperbarui produk', error);
          this.toast.error('Gagal memperbarui produk');
        }
      );
    }
  }
}
