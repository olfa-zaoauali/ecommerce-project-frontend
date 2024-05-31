import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-ist',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-ist.component.css']
})
export class ProductIstComponent implements OnInit {
  
  products: Product[]=[];
  currentCategoryId:number=1;
  previousCategoryId: number=1;

  searchMode: boolean= false ;
  thePageNumber: number=1;
  thePageSize:number=5;
  theTotalElement:number=0;
  previousKeyword: string= ""; 

  constructor(private cartService : CartService,private productService: ProductService, private route:ActivatedRoute){}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.ListProducts();
      console.log("id2", this.currentCategoryId)

    });
    
  }

  ListProducts(){
    this.searchMode= this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProduct();

    }
    else{
      this.handleListProduct();

    }
  }
  handleListProduct(){
    //check id "id " parametre is availble 
    const hasCategoryId: boolean= this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
     const categoryId= this.route.snapshot.paramMap.get('id');
     if (categoryId!=null ){
       //get the "id" param string . covert string to a nuber using the + symbol 
       this.currentCategoryId=+categoryId;
     }
    }
    else{
     //not category id availble .. default category id 
     this.currentCategoryId=1;
    }
    // Note: ANgular will reuse a component if it is currently being viwed
    // 
    //if we have a different category id then previous 
    //then set the Page number back to 1 
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber=1;
    }
    this.previousCategoryId=this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)
    this.productService.getProductlistPaginate(this.thePageNumber-1 , this.thePageSize, this.currentCategoryId).subscribe(this.processResult())

  }
  handleSearchProduct(){
    const theKeyword: string= this.route.snapshot.paramMap.get('keyword')!;
    // if we have a different keyword then previous 
    //then set thePageNiumber to 1 
    if(this.previousKeyword!= theKeyword){
      this.thePageNumber=1;
    }
    this.previousKeyword=theKeyword;
    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`)
    this.productService.SearchProductsPaginate(this.thePageNumber,this.thePageSize,theKeyword).subscribe(this.processResult());
  }
  updatePageSize(pageSize: string){
    this.thePageSize= +pageSize;
    this.thePageNumber=1;
    this.ListProducts();
  }
  processResult(){
    return (data:any)=>{
      this.products= data._embedded.products;
       this.thePageNumber= data.page.number+1;
       this.thePageSize= data.page.size;
       this.theTotalElement= data.page.totalElements;

    };
  }
  addToCart(product: Product){
    console.log(`Adding to cart : ${product.name}, ${product.unitPrice}`)
    const theCartItem= new CartItem(product);
    this.cartService.addToCart(theCartItem);

  }

}
