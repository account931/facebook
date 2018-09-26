FaceBook api, works on localhost Only, due to SSL absence on hosting server.
Functionality: 
1.FB log_in/log_out buttons, if user logs to your application, it gets user's name, id, access token, photo and can made requests to diffrent user's facebook sections.
2.You can print city name in form, press button "Places" and FB will return a list of places for that city(info/images)
3.Clicking button "People" not working due to FB privacy, it returns only logged user info
=================================================

How it works:
1. FB log_in/log_out button switches automatically, embedded in html=> <fb:login-button autologoutlink="true" > </fb:login-button>
2. JS/myFacebook.js-> Facebook JS API loads with (function(d, s, id)... }(document, 'script', 'facebook-jssdk')), {FB.init} should contain FB appId.
3. onLogin runs {FB.getLoginStatus(function(response)}, that triggers function with callback response {myStatusChangeCallback(response)}
4. {myStatusChangeCallback(response)} checks response.status from callback, if (response.status === 'connected'), it runs function  {testAPI(startingPhpSession_ajax)}
   testAPI() uses function startingPhpSession_ajax() as a callback to make sure it runs only after testAPI() ends.
   testAPI() makes request to FB endpoint "/me" to get user name and id, html them to div and pass them go startingPhpSession_ajax();
   startingPhpSession_ajax() constructs an atrificial form with userName/userID <input> and emulates form POST submitting to action {Classes/StartPersonalSession.php}
5. Classes/StartPersonalSession.php checks if $_POST['id'] exists and start personal session (to use FB Api as personal registration/authorization).

6. JS/myFacebook.js-> FB.Event.subscribe('auth.authResponseChange', function(response) { is used to subscribe to detect any changes in logged/unlogged status.
===============================================================================================================================

#It is not possible to view other people page info, unless the logged to gheir accounts using FB OAUTH on your site and grant access to your application

#IT LOOKS LIKE U CAN GET USER PAGE DETAILS(feeds, pictures, etc), IF ONLY THIS USER LOGS TO YOUR APP USING FB OAUTH, 
 then u can address him with "/me", u can not simply get user info by his ID, like in VK

#Mega fixes: logging out was crashing, fixed by adding "localhost" to "domain" in FB account/settings/basic + added {,true} to FB.getLoginStatus(function(response) {}, true); 
 It {,true} forces to check connection status not from cache, but from FB originally.
 
 
 #Ternal->
 echo  ($_SESSION['connected']) ? $_SESSION['connected'] : " not started"; == if($_SESSION['connected']){echo $_SESSION['connected'];} else {echo "not started";}
 