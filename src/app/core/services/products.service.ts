import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Products } from '../models/products.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Category } from '../models/category.model';

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
    let imagesArray: string = "";

    if (typeof product.images === 'string') {
      try {
        imagesArray = JSON.parse(product.images);
      } catch (error) {
        imagesArray = product.images.split(',').map((image: string) => image.trim()).join(',');
      }
    } else if (Array.isArray(product.images)) {
      imagesArray = product.images;
    }

    
    const updateProductsForApi = {
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.category.id
    };
    console.log("For api: ", updateProductsForApi)

    const url = `${this.endpoint}/${product.id}`; 
    return this.apiService.put<Products>(url, updateProductsForApi);
  }

  deleteProduct(id: number): Observable<void> {
    const url = `${this.endpoint}/${id}`; 
    return this.apiService.delete<void>(url);
  }

  getProductsByCategory(category: string): Observable<Products[]> {
    return this.getProducts().pipe(
      map(products => products.filter(product => product.category.name.toLowerCase() === category.toLowerCase()))
    );
  }

  getCategories(): Observable<Category[]> {
    const url = 'categories';
    return this.apiService.get<Category[]>(url);
  }

  createProduct(product: Products): Observable<Products> {
    let imagesArray: string = "";

    if (typeof product.images === 'string') {
      try {
        imagesArray = JSON.parse(product.images);
      } catch (error) {
        imagesArray = product.images.split(',').map((image: string) => image.trim()).join(',');
      }
    } else if (Array.isArray(product.images)) {
      imagesArray = product.images;
    }
    
    const productForApi = {
      title: product.title,
      price: product.price,
      description: product.description,
      images: imagesArray,
      categoryId: product.category.id
    };
    console.log(productForApi)

    return this.apiService.post<Products>(this.endpoint, productForApi);
  }
}
