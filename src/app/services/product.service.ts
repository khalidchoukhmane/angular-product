import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //injectoin de dependance de http permet la communication avec notre back-end json
  constructor(private http:HttpClient) { }

  public getProducts():Observable<Array<Product>>{
    return this.http.get<Array<Product>>("http://localhost:8089/products");
  }
  public checkProduct(product: Product) : Observable<Product>{
    return this.http.patch<Product>(`http://localhost:8089/products/${product.id}`, {checked:!product.checked});
  }
}
