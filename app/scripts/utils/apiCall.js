/**
  * @desc Requests a network call via ajax
*/

var apiCall = {
	
  get:function(obj){

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function(res) {

        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
              obj.successCB(xmlhttp.responseText);
           }
           else if (xmlhttp.status == 400) {
              obj.failureCB(xmlhttp.responseText);
              alert('There was an error 400');
           }
           else {
              obj.failureCB(xmlhttp.responseText); 
              alert('Some error occured');
           }
        }
    };
    xmlhttp.open("GET", obj.api , true);
    xmlhttp.send();
	}
};

module.exports = apiCall;