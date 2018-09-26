$(document).ready(function(){
	
	
	
	// Click button to get FB city places list---------------
	$("#submitEvents").click(function() {   // $(document).on("click", '.circle', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	    if(checkIfLoggedtoFB()){
            getFB_CityPlace(); 
		}
    });
	
	
	
	// Click button to get People list-----------------
	//not working due to FB privacy, it returns only logged user info
	$("#submitPeople").click(function() {   // $(document).on("click", '.circle', function() {   // this  click  is  used  to   react  to  newly generated cicles;
        if(checkIfLoggedtoFB()){
		    getFB_UserInfo(); 
		}
    });
	
	
	// Clear the input
	$("#clear").click(function() {   // $(document).on("click", '.circle', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	    $("#fbCity").val('');  //sets to empty
        /*
		alert("oo"); 
		FB.getLoginStatus(function(response) {
            console.log(response);
            if (response && response.status === 'connected') {
                FB.logout(function(response) {
                   window.location.reload();
                });
            }
        });
        */
    });
	
	
	 //check if u are logged to FB by access token, if no - return FALSE
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	function checkIfLoggedtoFB()
	{
		var accessTokenZ;
		try{
			accessTokenZ = FB.getAuthResponse()['accessToken'];
			//throw "Crash";
		} catch(e){
			alert(e);
		}
		
		if(typeof accessTokenZ === 'undefined'){
			alert('log in first');
			return false;
		} else {
			return true;
		}
	}
	
	
	
	
	
	
	//Getting FB places list by city
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	 function getFB_CityPlace()
	 {
		/*
	     FB.login(function(response) {
         if (response.authResponse) {
             var access_token = FB.getAuthResponse()['accessToken'];
             console.log('Access Token = '+ access_token);
             FB.api('/me', function(response) {
                 console.log('Good to see you, ' + response.name + '.');
            });
         } else {
             console.log('User cancelled login or did not fully authorize.');
         }
         }, {scope: ''});
		 */
		 
		 var cityX;
		 
		 //gets user city input value, if empty, set it to Kyiv
		 if($("#fbCity").val()==''){
			cityX = "Kyiv"; 
		 } else {
		     cityX = $("#fbCity").val();
		 }
		 
		 
		 
		 var accessToken = FB.getAuthResponse()['accessToken']; //getting acces token 
		 var FB_URL = 'https://graph.facebook.com/search?type=place&fields=name,location,picture.type(large)&limit=45&q=' + cityX + '&access_token=' + accessToken;  //crashes
		 //var FB_URL = 'https://graph.facebook.com/search?type=place&q=FITNESS_RECREATION&fields=name,location,picture.type(large)&limit=15&access_token=' + accessToken;
		 //https://graph.facebook.com/search?type=place&fields=name,location,picture.type(large)&q=Kyiv&access_token=EAAEPOF0VnpQBAAP0iMXvnPqO43bTEuQS4H4b7NlKsm71t9iUDCf5AlfkC9ZAd71mCt9dmsnNBu0lVx73qE6rIUgNdz9xhmYpKXqarWJNuQp5ObmUZC2KXvaGAXuKR2fUAD1beOUxchWQih2QuIyvMKwf5be9Neiim9uGwbe7ZCns2ZBcNNymN0niaeRSAiDZB7SBj8U7y0gZDZD
		 //alert(FB_URL);
		 
		 // send  ajax data  to  PHP handler  ************ 
         $.ajax({
            url: FB_URL,
            type: 'GET',  //Mega ERROR Fix - should be GET, not POST
			dataType: 'JSON', // without this it returned string(that can be alerted), now it returns object
			//passing the city
            data: { 
			    //serverCity:window.cityX
			},
            success: function(data) {
                // do something;
                 //$("#resultX").stop().fadeOut("slow",function(){ $(this).html(data) }).fadeIn(2000);
				 console.log(JSON.stringify(data, null, 4));
				 construct_ajax_Events_Answer(data);
			     
				
            },  //end success
			error: function (error) {
				$("#resultX").stop().fadeOut("slow",function(){ $(this).html("<h4 style='color:red;padding:3em;'>ERROR!!! <br> Facebook crashed</h4>")}).fadeIn(2000);
            }	
        });
                                               
       //  END AJAXed  part 
	   
	   scrollResults('#resultX');
		 
	   
	 }
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	//Constructs ajax response (FB places) to html() resultsd to DIV 
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	
	function construct_ajax_Events_Answer(data)        //data must-have arg
	{
		var answerLength = Object.keys(data.data).length;
		//alert("Found places " + answerLength);
		
		
		var alls = "<div class='col-sm-12 col-xs-12'><br><br><h3 class='red myShadow textShadow'>All Places => " + answerLength + " </h3>";
		
		for (var i = 0; i < answerLength; i++ ) {
	    //for (var i = 0; i < l; i++){  
		
		
		//checks if street is set, if not just return default value
		if (typeof data.data[i].location.street !== 'undefined') {
			street = data.data[i].location.street
		} else {
			street = "Sorry, no street available";
		}
		//checks if street is set, if not just return default value
		
		
		
			alls = alls + "<div class='col-sm-12 col-xs-12'><br>" + 
			               data.data[i].name + "<br>" +
			               data.data[i].location.city + "<br>" +
						   street + "<br>" +
						   "<img src=" + data.data[i].picture.data.url + "><br>" +
			               "</div><br><br><hr style='height:3px;width:99%;color;white;'>" ;
			              
		}
	    alls = alls + "</div>";
	//html weather result with animation
    $("#resultX").stop().fadeOut("slow",function(){ $(this).html(alls)}).fadeIn(2000);
	}
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	
	
	//not working due to FB privacy, it returns only logged user info
	//Getting FB People list
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	 function getFB_UserInfo()  
	 {
		
		 /*
		 var cityX;
		 
		 //gets user city input value, if empty, set it to Kyiv
		 if($("#fbCity").val()==''){
			cityX = "Kyiv"; 
		 } else {
		     cityX = $("#fbCity").val();
		 }
		 */
		 
		 //IT LOOKS LIKE U CAN GET USER PAGE DETAILS(feeds, pictures, etc), IF ONLY THIS USER LOGS TO YOUR APP USING FB OAUTH, then u can address him with "/me", u can not simply get user info by his ID, like in VK
		 var accessToken = FB.getAuthResponse()['accessToken']; //getting acces token 
		 var FB_URL_People = 'https://graph.facebook.com/me?access_token=' + accessToken;  // https://graph.facebook.com/1842556035811135?fields=id,name,picture
		  //1842547059145366
		 
		 // send  ajax data  to  PHP handler  ************ 
         $.ajax({
            url: FB_URL_People,
            type: 'GET',  //Mega ERROR Fix - should be GET, not POST
			dataType: 'JSON', // without this it returned string(that can be alerted), now it returns object
			//passing the city
            data: { 
			    //serverCity:window.cityX
			},
            success: function(data) {
                // do something;
                 //$("#resultX").stop().fadeOut("slow",function(){ $(this).html(data) }).fadeIn(2000);
				 console.log(JSON.stringify(data, null, 4));
				 //construct_ajax_Events_Answer(data);
				 $("#resultX").stop().fadeOut("slow",function(){ $(this).html("<h4 style='color:red;padding:3em;'>Your ID is " +  data.id + "<br>Name: " + data.name + "</h4>")}).fadeIn(2000);
			     
				
            },  //end success
			error: function (error) {
				$("#resultX").stop().fadeOut("slow",function(){ $(this).html("<h4 style='color:red;padding:3em;'>ERROR!!! <br> Facebook crashed</h4>")}).fadeIn(2000);
            }	
        });
                                               
       //  END AJAXed  part 
	   
	   scrollResults('#resultX');
		 
	   
	 }
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	 
	
	
	
	
	//FB application ID
    var MY_CONSTANT_APP_ID = '298209730993812';
	
	//================================================ FB API Connect PART ===========================================
	
      // This is called with the results from from FB.getLoginStatus() or FB.Event.subscribe('auth.authResponseChange', function(response)
      function myStatusChangeCallback(response) {
		  
	   //if (!response.status){ alert("OUTTTTTTT!!! !response.status");} //DELETE???
		  
		  
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
		
		//for logged users
        if (response.status === 'connected') {
          // Logged into your app and Facebook.
          testAPI(startingPhpSession_ajax);  //function {startingPhpSession_ajax} is used as a callback( sends ajax to start Php $_SESSION)
		  alert("IN");
		  
		  
        } else if (response.status === 'not_authorized') {
          // The person is logged into Facebook, but not your app.
          console.log("The person is logged into Facebook, but not your app.");
		  alert("USER refused access for your application");
		  
		//FOR logged out users  
        } else { //response.status === 'unknown'
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
		  alert("LOGGED OUT");
		  
		  //Clears divs with user details on log out
		  clearUserInfoDiv();
		  
		  //sends ajax to Classes/StopPersonalSession.php to destroy Php $_SESSION
		  stopPhpSession_ajax();
        }
      }

	  
      // This function is called when someone finishes with the Login
      // Button.  See the onlogin handler attached to it in the sample
      // code below.
	  //WILL NOT FIRE!!!, NOT TRIGERED IN CODE!!!!!!!!!!
	  /*
      function checkLoginState() {
        FB.getLoginStatus(function(response) {
          myStatusChangeCallback(response);
        });   //, true
      }
      */
	  
	  
      window.fbAsyncInit = function() {
        FB.init({
          appId: MY_CONSTANT_APP_ID,  //defined in CONST   
          cookie: true, // enable cookies to allow the server to access 
          // the session
          xfbml: true, // parse social plugins on this page
          version: 'v2.2' // use version 2.2
        });

        // Now that we've initialized the JavaScript SDK, we call 
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into
        //    your app or not.
        //
        // These three cases are handled in the callback function.

		
		//Core FB API method to check if the user is logged CAN NOT BE TURNED OFF
        FB.getLoginStatus(function(response) { 
		   alert("FB.getLoginStatus");
           //myStatusChangeCallback(response);
        }, true);  //MEGA FIX-> added {,true}, it forces to check connection status not from cache, but from FB originally
		
		
		
		//FB.Event.subscribe('auth.authResponseChange', auth_response_change_callback);
        //FB.Event.subscribe('auth.statusChange', auth_status_change_callback);
		
		
        //subscribing to any changes in auth status(log in/log out) ->
		FB.Event.subscribe('auth.authResponseChange', function(response) {    //auth.logout=(logOut only), auth.authResponseChange=(both logIn & logOUT)
            console.log('The status of the session changed to: '+response.status);
            alert('The status of the session changed to: '+response.status);
			myStatusChangeCallback(response);
        });
		
		
      };

	  
	  
	  
	  
      // Load the SDK asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));

	  
	  
	  //It runs onSuccess Login, additionally it runs {function startingPhpSession_ajax(nameFB)} to start PHP session with received response.name 
      // Here we run a very simple test of the Graph API after login is
      // successful.  See myStatusChangeCallback() for when this call is made.
	  // **************************************************************************************
      // **************************************************************************************
      //                                                                                     **
      function testAPI(callbackX) { //callbackX is {function startingPhpSession_ajax(nameFB)}
		var nameX;
        console.log('Welcome!  Fetching your information.... ');
		
		//Addressing FB Endpoint with user info
        FB.api('/me', function(response) {
          console.log("Fb response");
          console.log(response);
          console.log('Successful login for: ' + response.name);
		  
		  nameX = response.name; //getting the user name from response
		  idX = response.id; //user ID
		  //alert("nameX " + nameX);
		  
		  
		  //HTML div ('#status') with user name, id, image, access token
          document.getElementById('status').innerHTML =
                 '<h3>Welcome back, ' + response.name + '!</h3>' +  //name
				 '<img src="http://graph.facebook.com/' + response.id + '/picture?type=normal" alt="profile">' +  //picture //http://graph.facebook.com/FACEBOOK_USER_ID/picture?type=large
				 '<br><br>Your ID is -> ' + response.id +                       //id
			     '<br><br>Access Token is ' + FB.getAuthResponse()['accessToken'] +   //access token
				 '<br><br>';
		
		  //starting function {startingPhpSession_ajax(nameX)} - sends ajax to Classes/StartPersonalSession.php to start $_SESSION
		  callbackX(nameX, idX); //here callbackX() is function {startingPhpSession_ajax(nameX)} //Must be inserted inside {FB.api('/me', function(response)}, to be executed the last, because FB.api('/me', function(response)} is a callback itself. Otherwise {function startingPhpSession_ajax(nameX)} will start before the response.name is gotten
        });  //END  FB.api('/me', function(response) 
		
		
		//Addressing FB Endpoint with user INBOX
        FB.api('me/inbox', function(response) {
			alert("Inbox messages: " + JSON.stringify(response, null, 4));
		}); 
		//END Addressing FB Endpoint with user INBOX
		
		
		 //callbackX();	  
		 //sends user profile detail via <form> POST to same page to start Php Session
		 //startingPhpSession_ajax(nameX);  
		  
		  
      }
	  
	  
	  
	  
	  
//=================================== END FB PART ===============================








   
    //function sends user profile detail(name, id) via <form> POST to same page to start Php Session. 
	//This functions is triggered as callback in {function testAPI(callbackX)}
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	function startingPhpSession_ajax(nameFB, idFB)
	{
		alert("response.name " + nameFB + " id " + idFB); //gets users name and id 
		
		
		//creates a form with action to {'Classes/StartPersonalSession.php'} and pass user id/name with $_POST + attificially submit it
		/*
		var url = 'Classes/StartPersonalSession.php'; 
        var form = $('<form id="generForm" action="' + url + '" method="post">' +
            '<input type="text" name="api_FB_id" value="' + idFB + '" />' +      //passed ID 
			'<input type="text" name="api_FB_name" value="' + nameFB + '" />' +  //passes name 
            '</form>');
        $('body').append(form);
        form.submit();
		*/
		
		
		 // send  data  to  PHP handler  ************ 
        $.ajax({
            url: 'Classes/StartPersonalSession.php',
            type: 'POST',
			dataType: 'JSON', //'JSON' causes crash //without this it returned string(that can be alerted), now it returns object
			//passing the city
            data: { 
			    api_FB_id: idFB,     //passed ID 
				api_FB_name: nameFB //passes name 
			},
            success: function(data) {
                // do something;
                //$("#weatherResult").stop().fadeOut("slow",function(){ $(this).html(data) }).fadeIn(2000);
			    //alert(JSON.stringify(data, null, 4));
				alert("ajax SESSION started for -> " + data.userX);
				
				
            },  //end success
			error: function (error) {
				alert("START SESSION Ajax crashed");
            }	
        });
                                               
       //  END AJAXed  part 
		
	 } 
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************

	
	
	
	
	
	
	
	
	
	

	//This functions send ajax to stop PHP SESSION
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	function stopPhpSession_ajax()
	{	
		// send  data  to  PHP handler  ************ 
        $.ajax({
            url: 'Classes/StopPersonalSession.php',
            type: 'POST',
			dataType: 'JSON', //'JSON' causes crash //without this it returned string(that can be alerted), now it returns object
			//passing the city
            data: { 
			   
			},
            success: function(data) {
                // do something;
				alert("Stopping session... -> " + data.status);
				$("#sessionX").html("SESSION IS GONE");
				
				
            },  //end success
			error: function (error) {
				alert("STOP SESSION Ajax crashed");
            }	
        });
                                               
       //  END AJAXed  part 
		
	 } 
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************

	
	
	


	//Clears divs with user details on log out
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	function clearUserInfoDiv()
	{
		$("#status, #generForm, #resultX").html("");
		
	 } 
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	
	/*
	
    // In your JavaScript
    var auth_response_change_callback = function(response) {
        console.log("auth_response_change_callback");
        console.log(response);
        alert("LOGGED");
     }
	
	
	var auth_status_change_callback = function(response) {
       console.log("auth_status_change_callback: " + response.status);
       alert("LOGGED OUT");
    }
	
	*/
	
	
	
	
	
	// Scroll the page to results  #resultFinal
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function scrollResults(divName) 
	{
		 
         $('html, body').animate({
            
            scrollTop: $(divName).offset().top
			//scrollTop: $('.footer').offset().top
            //scrollTop: $('.your-class').offset().top
        }, 'slow'); 
		// END Scroll the page to results
	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	
	function scroll_toTop() 
	{
	    $("html, body").animate({ scrollTop: 0 }, "slow");	
	}
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	

});
// end ready	
	