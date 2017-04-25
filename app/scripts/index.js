/**
 * Binds the event for the currency convertor and manages the data
 */

var apiCall = require("./utils/apiCall");
var cacheDOMelm = require('./utils/cacheDOMelm');

var appConstants = require('./constants/appconstants');
var appData = require('./appData');
var hideShowElm = require('./hideShowElm');

var index={

	init:function(){
		
		var successCB = this.successCallback.bind(index);
		var failureCB = this.failureCallback.bind(index);
		var currency = appData.getCurrency();
		
		var obj = {
	     api: appConstants.API_CLIENT.LATEST_CURRENCY + currency,
	     successCB: successCB,
	     failureCB: failureCB
	    }

		apiCall.get(obj);
		this.bindChangeEvent();
	},
	bindChangeEvent:function(){

		var currency = cacheDOMelm.getElm('currency','id');
		
		var that = this;
		currency.onkeyup = function(event) {
		    event = event || window.event;
		    var value = Number(event.target.value);
		    that.computeCurrencies(value);
		};

		var dp = document.getElementById('catagory');
		dp.onchange = function(event){
			var value = event.target.value;
			that.fetchCurrencyDetails(value)
		}

	},
	computeCurrencies:function(value){

		if(isNaN(value)){
			alert('Enter correct currency');
			return false;
		}
		
		var data = appData.getData(appData.getCurrency());
		var outputContainer = cacheDOMelm.getElm('output-container','id');
		var frag = document.createDocumentFragment();
		var keys = Object.keys(data);

		for(var x = 0; x < keys.length; x++) {
			var div = document.createElement("div");
			div.className = "output-div";
			div.innerHTML = Number(value*data[keys[x]]).toFixed(2) + " " + keys[x];
			frag.appendChild(div);
		}
		outputContainer.innerHTML = '';
		outputContainer.appendChild(frag);

	},
	fetchCurrencyDetails:function(value){
		
		var currency = cacheDOMelm.getElm('currency','id');
		
		if(appData.ifDataExists(value)){
			appData.setCurrency(value);
			this.computeCurrencies(Number(currency.value));
			return false;
		}

		hideShowElm.showElm('loader');
		hideShowElm.hideElm('conversion');

		var successCB = this.successCallback.bind(index);
		var failureCB = this.failureCallback.bind(index);
		var obj = {
	     api: appConstants.API_CLIENT.LATEST_CURRENCY + value,
	     successCB: successCB,
	     failureCB: failureCB
	    }
		apiCall.get(obj);

	},
	populateDropDown:function(data){

		var catagory = cacheDOMelm.getElm('catagory','id');
		
		if (data && data.length == 0){
			catagory.innerHTML = "<option></option>";
		}
        else {
            var catOptions = "<option selected='selected' >" + data.base + "</option>";
            var rates = Object.keys(data.rates);
            for (i in rates) {
        		catOptions += "<option>" + rates[i] + "</option>";
            }
            catagory.innerHTML = catOptions;

        }
	},
	successCallback:function(res){
		
		var currency = cacheDOMelm.getElm('currency','id');

		var res = JSON.parse(res);
		appData.setData(res);
		
		hideShowElm.hideElm('loader');
		hideShowElm.showElm('conversion');
		
		this.populateDropDown(res);

		if(currency.value){
			this.computeCurrencies(Number(currency.value));	
		}
	},
	failureCallback:function(res){
		console.log('hello world',res);
	}

}


module.exports = index;