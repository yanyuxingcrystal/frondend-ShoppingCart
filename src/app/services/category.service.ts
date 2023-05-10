import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiURLCategories = environment.apiURL + '/categories';
  constructor(private http : HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.apiURLCategories);
  }

  getCategory(categoryId:string):Observable<Category>{
    return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`);
  }

  createCategory(category:Category):Observable<Category>{
    return this.http.post<Category>(`${this.apiURLCategories}`, category);
  }

  updateCategory(category:Category):Observable<Category>{
    return this.http.put<Category>(`${this.apiURLCategories}/${category._id}`, category);
  }

  deleteCategory(categoryId:string):Observable<Category>{
    return this.http.delete<Category>(`${this.apiURLCategories}/${categoryId}`);
  }
}
