import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private endpoint = 'categories';

  constructor(private apiService: ApiService) { }

  getCategories(): Observable<Category[]> {
    return this.apiService.get<Category[]>(this.endpoint);
  }

  createCategory(category: Category): Observable<Category> {
    return this.apiService.post<Category>(this.endpoint, category);
  }
}
