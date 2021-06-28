import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OrderFood';
  menuList:any[]=[
    {id:1,name:'Burger',price:10},
    {id:2,name:'Momos',price:20},
    {id:3,name:'Dosa',price:30},
    {id:4,name:'Noodles',price:40},
    {id:5,name:'Soup',price:50},
  ];
  orderList:any[]=[];
  getOrder:boolean=false;
  getBill:boolean=false;
  tipPercentage:number=10;

  OrderList(id:number){
    if(this.orderList.length<1 || this.orderList.filter(e => e.id === id).length <1){
      let item=this.menuList.find(x=> x.id==id);
      item['quantity']=1;
      this.orderList.push(item);
    }
    else{
      let index=this.orderList.findIndex(x=> x.id==id);
      this.orderList[index]['quantity']=parseInt(this.orderList[index]['quantity'])+1;
    }
  }

  BillAmount():number{
    let amount:number=0;
    if(this.orderList.length>0){
      this.orderList.forEach(food=>{
        amount += food.price * food.quantity;
      });
    }
    amount= this.ApplyTip(amount);
    return amount;
  }
ApplyTip(amount:number){
if(this.tipPercentage>0){
  amount += ((amount*this.tipPercentage)/100);
}
return amount;
}
  CancelFoodOrder(id:number){
    if(this.orderList.length>0){
      let index=this.orderList.findIndex(x=> x.id==id);
      if(index>-1){
        if(this.orderList[index]['quantity']>1){
          this.orderList[index]['quantity']=parseInt(this.orderList[index]['quantity'])-1;          
        }
        else{
          this.orderList.splice(index, 1);
        }
      }
    }
  }
}
