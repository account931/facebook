<?php
session_start();
//error_reporting(-1);
header('Content-Type: text/html; charset=utf-8'); //sets for russian letters
		
class StopPersonalSession {



    //STOP personal php session based on facebook successfull login
    // **************************************************************************************
    // **************************************************************************************
    // **                                                                                  **
    // **                                                                                  **

    public function StopSession(){
		
		

			//STOP session
			$_SESSION['connected'] = false;
	        session_destroy();
			unset($_SESSION['connected']);
			unset($_SESSION['userX']);
			$status = "Session is stopped";
			
			
	
		//JSOn output all SESSION vars
		echo json_encode($status);
		
		//heading back to main FB page
		//header("Location: ../");  // if eader("Location: ../") crashes make sure there are no echoes above
		//die();
    }


    // **                                                                                  **
    // **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************







} // end  Class



//runs the Class method to start php Session
$stop = new StopPersonalSession();
$stop->StopSession();



















?>
