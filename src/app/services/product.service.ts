import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //injectoin de dependance de http permet la communication avec notre back-end json
  constructor(private http:HttpClient) { }

  public getProduct(){
    return this.http.get<Array<any>>("http://localhost:8089/products");
  }
  public checkProduct(product: any){
    return this.http.patch(`http://localhost:8089/products/${product.id}`, {checked:!product.checked});
  }
}
