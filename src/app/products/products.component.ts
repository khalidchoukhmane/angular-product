import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products : Array<Product> = [];
  constructor(private productService : ProductService) {
  }
  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts()
      .subscribe({
        next: data => this.products = data,
        error: err => {
          console.log(err)
        }
      })
  }

  handleCheckProduct(product: Product) {
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
