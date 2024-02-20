import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  //products$! : Observable<Array<Product>>;
  public products : Array<Product> = [];
  public keyword : string = "";
  constructor(private productService : ProductService) {
  }
  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    //first method
    this.productService.getProducts(1,2)
      .subscribe({
        next: data => {
          this.products = data
        },
        error: err => {
          console.log(err)
        }
      })

    //second methods
    //this.products$ = this.productService.getProducts();
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

  handleDeleteProduct(product: Product) {
    if(confirm("Etes vous sure?"))
    this.productService.deleteProduct(product).subscribe({
      next : value => {
        //call all list
        //this.getProducts();
        //call what left from the left after delete
        this.products = this.products.filter(p=>p.id!=product.id);
      }
    });
  }

  searchProduct() {
    this.productService.searchProducts(this.keyword).subscribe({
      next: data=>{
        this.products = data;
      }
    });
  }
}
