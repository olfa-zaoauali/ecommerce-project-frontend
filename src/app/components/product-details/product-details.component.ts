import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  

  product:any; 

  constructor(private cartService : CartService,private productService:  ProductService, private route :ActivatedRoute ){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=> {
         this.getProductDetails();
    }
    )
  }

  getProductDetails(){
    const ProductId: number= +this.route.snapshot.paramMap.get("id")!; 
    this.productService.getProductDetails(ProductId).subscribe( 
      data => {
        this.product=data; 
      }
    )
  }
  addToCart(){
     console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
     const theCartItem= new CartItem(this.product);
     this.cartService.addToCart(theCartItem);
  }


}
