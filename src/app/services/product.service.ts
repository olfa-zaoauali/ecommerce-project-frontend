import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs'
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl='http://localhost:8080/api/products'
  private categoryUrl='http://localhost:8080/api/product-category'


  constructor(private httpClient: HttpClient) { }
  
  getProductlist(theCategoryId: number):Observable<Product[]>{
    // need to build URl BADSED ON CATEGORY ID 
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);

  }
  getProductlistPaginate(thePage:number,thepageSize:number,theCategoryId: number):Observable<GetResponseProducts>{
    // need to build URl BADSED ON CATEGORY ID 
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thePage}&size=${thepageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);

  } 
  
  getProductCategory():Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
      );
  }
  SearchProduct(value: string):Observable<Product[]>{
     const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${value}`;
    return this.getProducts(searchUrl);
  }
  SearchProductsPaginate(thePage:number,thepageSize:number,theKeyword: string):Observable<GetResponseProducts>{
    // need to build URl BADSED ON CATEGORY ID 
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}&page=${thePage}&size=${thepageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);

  } 

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
  getProductDetails(ProductId: number): Observable<Product>{
    const productUrl= `${this.baseUrl}/${ProductId}`
    return this.httpClient.get<Product>(productUrl); 
  }
}


interface GetResponseProducts{
  _embedded:{
    products:Product[]
  },
  page:{
    size: number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}
interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[]
  }
}

