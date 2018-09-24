$(document).ready(function(){
	
	
	
	// Click button to get FB events list
	$("#submitEvents").click(function() {   // $(document).on("click", '.circle', function() {   // this  click  is  used  to   react  to  newly generated cicles;
        getFBEvents(); 
    });
	
	
	
	// Click button to get People list
	$("#submitPeople").click(function() {   // $(document).on("click", '.circle', function() {   // this  click  is  used  to   react  to  newly generated cicles;
        getFBPeople(); 
    });
	
	
	// exit not working
	$("#clear").click(function() {   // $(document).on("click", '.circle', function() {   // this  click  is  used  to   react  to  newly generated cicles;
        alert("oo"); 
		 FB.getLoginStatus(function(response) {
    console.log(response);
    if (response && response.status === 'connected') {
      FB.logout(function(response) {
        window.location.reload();
      });
    }
  });
    });
	
	
	
	
	
	//Getting FB events list
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	 function getFBEvents()
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
	
	
	
	
	
	//Constructs ajax response to htmll() resultsd to DIV 
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
			street = "Sorry no street available";
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
	
	
	
	
	
	
	
	
	
	
	//Getting FB People list
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     **
	 function getFBPeople()
	 {
		
		 
		 var cityX;
		 
		 //gets user city input value, if empty, set it to Kyiv
		 if($("#fbCity").val()==''){
			cityX = "Kyiv"; 
		 } else {
		     cityX = $("#fbCity").val();
		 }
		 
		 
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
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	 
	
	
	
	
	
    var MY_CONSTANT_APP_ID = '298209730993812';
	
	//==================================== FB PART ===============================
	
      // This is called with the results from from FB.getLoginStatus().
      function statusChangeCallback(response) {
		  
		  if (!response.status){ alert("OUTTTTTTT!!!");}
		  
		  
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
		
        if (response.status === 'connected') {
          // Logged into your app and Facebook.
          testAPI();
		  alert("IN");
		  
        } else if (response.status === 'not_authorized') {
          // The person is logged into Facebook, but not your app.
          console.log("The person is logged into Facebook, but not your app.");
		  alert("???OUT");
		  
		  //
		} else if (!response.status){ alert("OUTTTTTTT!!!");
		  //
		  
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
		  alert("OUT");
        }
      }

	  
      // This function is called when someone finishes with the Login
      // Button.  See the onlogin handler attached to it in the sample
      // code below.
      function checkLoginState() {
        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });   //, true
      }

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

        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });
		
		
		//FB.Event.subscribe('auth.authResponseChange', auth_response_change_callback);
        //FB.Event.subscribe('auth.statusChange', auth_status_change_callback);

		FB.Event.subscribe('auth.authResponseChange', function(response) {
            console.log('The status of the session changed to: '+response.status);
            alert('The status of the session changed to: '+response.status);
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

	  
	  
	  
      // Here we run a very simple test of the Graph API after login is
      // successful.  See statusChangeCallback() for when this call is made.
      function testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
          console.log("Fb response");
          console.log(response);
          console.log('Successful login for: ' + response.name);
		  
          document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!<br>' +
			 'Access Token is ' + FB.getAuthResponse()['accessToken'];
			
        });
      }
//=================================== END FB PART ===============================
	
	
	
	
	
	
	
	
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
	