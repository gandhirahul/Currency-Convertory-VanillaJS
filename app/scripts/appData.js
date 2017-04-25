/**
  * AppData - Contains the currency and conversion data for the app
*/

var appData = {
	
  data:{},
  currency:'EUR',

  getData:function(currency){
  
    if(currency){
      return this.data[currency];
    }
    return this.data;

	},
  setData:function(data){

    this.setCurrency(data.base);
    this.data[data.base] = data.rates;

  },
  getCurrency:function(){

    return this.currency;
	},
  setCurrency:function(currency){

    this.currency = currency;
  },
  ifDataExists:function(value){

    var data = this.getData(value);
    var keys = data && Object.keys(data);
    var isExists = (keys && keys.length) ? true : false;
    return isExists;

  }

};

module.exports = appData;
