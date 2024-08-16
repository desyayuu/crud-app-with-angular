import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Products } from './models/products.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private endpoint= 'products'; 
  constructor(private apiService: ApiService) { }

  getProducts(): Observable<Products[]>{
    return this.apiService.get<Products[]>(this.endpoint);
  }

  updateProducts(product: Products): Observable<Products> { 
    const url = `${this.endpoint}/${product.id}`; 
    return this.apiService.put<Products>(url, product);
  }
}
