function OrderLine(){
    this.product = {
        name:'tiger print',
        price: 295.00
    };
    this.quantity = 2;

    ko.defineProperty(this,'subtotal',function(){
        console.log('Evaluating Subtotal');
        return this.product ? this.product.price*this.product.quantity:0;
    });

    ko.track(this);
}