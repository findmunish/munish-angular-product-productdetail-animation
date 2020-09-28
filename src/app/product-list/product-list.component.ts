import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import{ Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Observable } from 'rxjs';

import {ProductService} from '../product.service';
import {Product} from '../product';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [
                trigger('showHideProducts',[
                  state('show', style({
                      backgroundColor: "gray",
                      display: 'block'
                    })
                  ),
                  state('hide', style({
                      display: "none"
                    })
                  ),
                  transition("* =>*", [animate("1s")]),
                ])
              ]
})
export class ProductListComponent implements OnInit {

  products:Observable<Product[]>;
  selectedId:number;

  constructor(
    private service: ProductService,
    private route: ActivatedRoute

  ) { }

  productList = []
  ngOnInit() {
    this.products=this.route.paramMap.pipe(
      switchMap(params =>{
        this.selectedId =+params.get('id');
        return this.service.getProducts();
      })
    )
    this.products.forEach((product) => {
      product.forEach((item) => {
        this.productList.push({isShow:false, ...item})
      })
    })
  }
  toggleDisplay(product) {
    product.isShow = !product.isShow
  }
  passProduct(product) {
    return product;
  }
  showProductTitle(product) {
    return `${product.id}: ${product.name}`
  }
}