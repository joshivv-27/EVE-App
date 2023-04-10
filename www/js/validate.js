//Local Storage
$( document ).on( "pageinit","#form", function(event) {

	var dataArray = [];
	
	//Submit Function
	$( "#btnSubmit" ).on( "click", function(event, ui) {

	    //validation
    	var number=/^[0-9]+$/;	
	
		let lsfname =  $('#fname' ).val();
		let lslname = $('#lname' ).val();	
		let lsstate =  $('#state' ).val();	
		let lsemail =  $('#email' ).val();
		let lsage = $('#age' ).val();

		if(lsfname != "" && lslname != "" && lsstate != "def" && lsemail != "" && lsage != "" && lsage > 0 && lsage < 120 && lsage.match(number)) {

			var tmp = {fname : lsfname, lname: lslname, state: lsstate, email: lsemail, age: lsage} ;
			dataArray.push(tmp); 
			localStorage.formdata = JSON.stringify(dataArray);
			clearFields();
    		alert("data stored");

		} else {
    		alert("Ente valid data");
		}

	}); //End Submit Function
	
	//Clear Function
	$( "#btnClear" ).on( "click", function(event, ui) {

		clearFields();

	}); //End Clear Function

	//Clear All Fields Function
	function clearFields() {

    	$('#fname').val('');
    	$('#lname').val('');
    	$('#state').val("def");
    	$('#email').val('');
    	$('#age').val('');
		
	}//Clear All Fields Function

});// Local Storage Function








//Data Form Function
$( document ).on( "pageinit","#formdata", function(event) {

	let html = '';
    let htmlSegment = "";

    var i;
    let data = JSON.parse( localStorage.formdata );
	for (i = 0; i < data.length; i++) {
		let seg = data[i];
		let fname = seg["fname"];
		let lname = seg["lname"];
		let state = seg["state"];
		let email = seg["email"];
		let age = seg["age"];	

      	htmlSegment = "<tr>";
        htmlSegment += "<td>" + fname + "</td>" +
        				"<td>" + lname + "</td>" +
        				"<td>" + state + "</td>" +
        				"<td>" + email + "</td>" +
        				"<td>" + age + "</td>";
      	htmlSegment += '</tr>';
      	html += htmlSegment ;	
	}

  	$('.fdata').append(html);

});//End Data Form Function