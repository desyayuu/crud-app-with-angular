import { Component, OnInit} from '@angular/core';
import { Category } from '../../../core/models/category.model'; 
import { CategoryService } from '../../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm} from '@angular/forms';

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

  constructor(private categoryService: CategoryService) {}
  
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
    }
  }
}
