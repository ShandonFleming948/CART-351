<?php
//check if there has been something posted to the server to be processed
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
// need to process
 $course = $_POST['a_course'];
 $teacher = $_POST['a_teacher'];
 $classroom = $_POST['a_classroom'];
 $description = $_POST['a_descript'];
 $dueDate = $_POST['a_date'];
 if($_FILES)
  {
    //echo "file name: ".$_FILES['filename']['name'] . "<br />";
    //echo "path to file uploaded: ".$_FILES['filename']['tmp_name']. "<br />";
   $fname = $_FILES['filename']['name'];
   move_uploaded_file($_FILES['filename']['tmp_name'], "images/".$fname);
    echo "done";
    //exit;
    //package the data and echo back...
    /* make  a new generic php object (note:: php also supports objects -
   but we are NOT doing that in this class - you can if you want ;)  )*/
    $myPackagedData=new stdClass();
    $myPackagedData->course = $course ;
    $myPackagedData->teacher = $teacher ;
    $myPackagedData->classroom = $classroom ;
    $myPackagedData->description = $description ;
    $myPackagedData->due_Date = $dueDate ;
    $myPackagedData->fileName = $fname ;
     /* Now we want to JSON encode these values as a JSON string ..
     to send them to $.ajax success  call back function... */
    $myJSONObj = json_encode($myPackagedData);
    echo $myJSONObj;
  }//FILES
}//POST
?>

<html>
<head>
<title>Sample Insert into Gallery Form USING JQUERY AND AJAX </title>
<!-- get JQUERY -->
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<!--set some style properties::: -->
<link rel="stylesheet" type="text/css" href="gallery_style.css">
</head>
<body>
  <!-- NEW for the result -->
<div id = "result"></div>

<div class= "formContainer">
<!--form done using more current tags... -->
<form id="insertGallery" action="" enctype ="multipart/form-data">
<!-- group the related elements in a form -->
<h2>Homework Agenda/To Do List :::</h2>
<fieldset>

  <p><strong>Select a Course:</strong></p>

  <!-- <form action="/action_page.php"> -->
    <label for="course">Choose a course:</label>
    <select id="course" name='a_course'>
      <option value="course1">CART 351</option>
      <option value="course2">CART 360</option>
      <option value="course3">CART 345</option>
      <option value="course4">THEO 202</option>
      <option value="course5">FMST 200</option>
    </select>
    <input type="submit">
  </form>

  <p><strong>Select a Teacher:</strong></p>

  <!-- <form action="/action_page.php"> -->
    <label for="teacher">Choose a teacher:</label>
    <select id="teacher" name='a_teacher'>
      <option value="teacher1">Ms. Sabine</option>
      <option value="teacher2">Mr. Elio</option>
      <option value="teacher3">Mr. Jhave</option>
      <option value="teacher4">Mr. Eric</option>
      <option value="teacher5">Mr. Totaro</option>
    </select>
    <input type="submit">
  </form>

  <p><strong>Select a Classroom:</strong></p>

  <!-- <form action="/action_page.php"> -->
    <label for="classroom">Choose a classroom:</label>
    <select id="classroom" name='a_classroom'>
      <option value="classroom1">EV-5.709</option>
      <option value="classroom2">EV-7.765</option>
      <option value="classroom3">EV 6.761</option>
      <option value="classroom4">Remote</option>
    </select>
    <input type="submit">
  </form>

<!-- <p><label>Course/Class:</label><input type="text" size="24" maxlength = "40" name = "a_name" required></p>
<p><label>Teacher:</label><input type = "text" size="24" maxlength = "40"  name = "a_title" required></p>
<p><label>Classroom:</label><input type = "text" size="24" maxlength = "40" name = "a_classroom" required></p> -->
<p><strong>Description of Assignment:</strong></p>
<p><textarea type = "text" rows="4" cols="50" name = "a_descript" required></textarea></p>
<p><strong>Due Date (DD-MM-YYYY):</strong><input type="date" name="a_date" required></p>
<p><strong>Upload Assignment:</strong> <input type ="file" name = 'filename' size=10 required/></p>
<p class = "sub"><input type = "submit" name = "submit" value = "submit my assignment" id ="buttonS" /></p>
 </fieldset>
</form>
</div>
<script>
// here we put our JQUERY
$(document).ready (function(){
    $("#insertGallery").submit(function(event) {
       //stop submit the form, we will post it manually. PREVENT THE DEFAULT behaviour ...
      event.preventDefault();
     console.log("button clicked");
     let form = $('#insertGallery')[0];
     let dataForSending = new FormData(form);
     /*console.log to inspect the data */
     for (let pair of dataForSending.entries()) {
       console.log(pair[0]+ ', ' + pair[1]);
     }

     /*https://api.jquery.com/jQuery.ajax/*/
     $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "insertGallery.php",
            data: dataForSending,
            processData: false,//prevents from converting into a query string
            /*contentType option to false is used for multipart/form-data forms that pass files.
            When one sets the contentType option to false, it forces jQuery not to add a Content-Type header, otherwise, the boundary string will be missing from it.
            Also, when submitting files via multipart/form-data, one must leave the processData flag set to false, otherwise, jQuery will try to convert your FormData into a string, which will fail. */

            /*contentType: "application/x-www-form-urlencoded; charset=UTF-8", // this is the default value, so it's optional*/

            contentType: false, //contentType is the type of data you're sending,i.e.application/json; charset=utf-8
            cache: false,
            timeout: 600000,
            success: function (response) {
            //response is a STRING (not a JavaScript object -> so we need to convert)
            console.log("we had success!");
            console.log(response);
           },
           error:function(){
          console.log("error occurred");
        }
      });
   });
});
</script>
</body>
</html>
