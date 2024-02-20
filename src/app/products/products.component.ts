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
  totalPages: number = 0;
  pageSize: number = 3;
  currentPage: number = 1;
  constructor(private productService : ProductService) {
  }
  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    //first method
    this.productService.getProducts(this.currentPage,this.pageSize)
      .subscribe({
        next: (resp) => {
          this.products = resp.body as Product[];
          console.log(this.products);
          let totalProducts:number = parseInt(resp.headers.get('x-total-count')!);
          console.log(totalProducts);
          this.totalPages = Math.floor(totalProducts / this.pageSize);
          if(totalProducts % this.pageSize != 0){
            this.totalPages = this.totalPages+1;
          }
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

  handleGoToPage(page: number) {
    this.currentPage = page;
    this.getProducts();
  }
}
