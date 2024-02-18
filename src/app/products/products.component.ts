import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products : Array<any> = [];
  constructor(private productService : ProductService) {
  }
  ngOnInit() {
    /*this.http.get<Array<any>>("http://localhost:8089/products")
      .subscribe({
        next: data => this.products = data,
        error: err => {
          console.log(err)
        }
      })*/
    this.getProducts();
  }

  getProducts(){
    this.productService.getProduct()
      .subscribe({
        next: data => this.products = data,
        error: err => {
          console.log(err)
        }
      })
  }

  handleCheckProduct(product: any) {
    //we used patch here because we only need to change one thing that checked value.
    this.productService.checkProduct(product)
      .subscribe({
        next : updatedProduct => {
          product.checked = !product.checked;
          //this.getProducts();
        }
      })
  }
}
