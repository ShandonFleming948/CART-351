/* PLEASE DO NOT CHANGE THIS FRAMEWORK ....
the get requests are all implemented and working ... so there is no need to alter ANY of the existing code: rather you just ADD your own ... */

$(document).ready (function(){
//create once :)
let description = document.getElementById("Ex4_title");
//array to hold the dataPoints
let dataPoints = [];

/**** GeT THE DATA initially :: default view *******/
/*** no need to change this one  **/
    $.get("../runQueries.php",{"select-query":"onload"}, function(response)
    {
      console.log(response);
      let parsedJSON = JSON.parse(response);
    //  console.log(parsedJSON);
      displayAsDefault(parsedJSON);
    });

/***** Get the data from drop down selection ****/
let querySelectDropDown = document.getElementById('queryChoice');

querySelectDropDown.onchange = function() {
  console.log(this.value);
  let copyVal = this.value;
  //will make a get request for the data ...

  /**************************MODIFY********************/
  $.get("../runQueries.php",{"select-query":copyVal}, function(response)
  {
    let parsedJSON = JSON.parse(response);
    $("#childOne").empty();
    description.textContent = "";
    document.getElementById("parent-wrapper").style.background = "rgba(51,102,255,.2)"
    switch (copyVal){

      case "default":{
        displayAsDefault(parsedJSON);
        break;
      }
      case "one":{
        //sabine done
        displayInCirclularPattern(parsedJSON);
        break;
      }
      case "two":{
        //sabine done
        displayByGroups(parsedJSON,"weather","eventName");
        break;
      }
      /***** TO DO FOR EXERCISE 4 *************************
      ** 1: once you have implemented the sqlite query in runQueries.php,
      ** you will receive it from the get request (here and will enter into the correct selct case
      **  - based on the value that the user chose from the drop down list...)
      ** call a custom display function FOR EACH query that you construct ... i.e.
      ** 4 queries - I want 4 UNIQUE display functions - you can use the ones I created
      ** as inspiration ONLY - DO NOT just copy and change colors ... experiment, explore, change ...
      ** you can create your own custom objects - but NO images, video or sound... (will get 0).
      ** bonus: if your visualizations(s) are interactive or animate.
      ****/
      case "three":{
       // TODO
       displayRandomPattern(parsedJSON);
        break;
      }
      case "four":{
        // TODO
        displayJumbledUpPattern(parsedJSON);
        break;
      }

      case "five":{
        // TODO
        displayMessedUpPattern(parsedJSON);
        break;
      }
      case "six":{
        // TODO
        displayRidiculousPattern(parsedJSON);
        break;
      }
      default:{
        console.log("default case");
            break;
      }

    } //switch

    //FOR DEBUGGING
    console.log(parsedJSON);
    console.log(parsedJSON.length)


  });
  /***********************************************/

};

  /*******************DISPLAY AS GROUP****************************/

    function displayByGroups(resultSet,propOne,propTwo){
      dataPoints =[];
      let finalHeight =0;
      //order by WEATHER and Have the event names as the color  ....

      //set background of parent ... for fun ..
        document.getElementById("parent-wrapper").style.background = "rgba(51, 153, 102,1)";
        description.textContent = "BY WEATHER AND ALSO HAVE EVENT NAMES {COLOR}";
        description.style.color = "rgb(179, 230, 204)";

        let coloredEvents = {}

        //reget
        let possibleEvents = resultSet[resultSet.length-1];
        let possibleColors = ['rgb(198, 236, 217)','rgb(179, 230, 204)','rgb(159, 223, 190)','rgb(140, 217, 177)','rgb(121, 210, 164)','rgb(102, 204, 151)','rgb(83, 198, 138)','rgb(64, 191, 125)','rgb(255, 204, 179)','rgb(255, 170, 128)','rgb(255, 153, 102)','rgb(255, 136, 77)','rgb(255, 119, 51)','rgb(255, 102, 26)','rgb(255, 85, 0)','rgb(230, 77, 0)','rgb(204, 68, 0)'];

        for(let i = 0; i< possibleColors.length; i++){
          coloredEvents[possibleEvents[i]] = possibleColors[i];

          }


      let offsetX =-200;
      let offsetY =150;
      // find the weather of the first one ...
      let currentGroup = resultSet[0][propOne];
      let xPos =offsetX;
      let yPos =offsetY;

        for(let i = 0; i<resultSet.length-1; i++){
          dataPoints.push(new myDataPoint(resultSet[i].dataId,
            resultSet[i].day,
            resultSet[i].weather,
            resultSet[i].start_mood,
            resultSet[i].after_mood,
            resultSet[i].after_mood_strength,
            resultSet[i].event_affect_strength,
            resultSet[i].eID,
            //map to the EVENT ...
            coloredEvents[resultSet[i].eventName],
            //last parameter is where should this go...
            document.getElementById("childOne"),
            //which css style///
            "point_two"
          ));
          /** check if we have changed group ***/
        if(resultSet[i][propOne] !== currentGroup){
          //update
          currentGroup=resultSet[i][propOne];
          offsetX+=150;
          offsetY=150;
          xPos =offsetX;
          yPos =offsetY;

        }
        //if not just keep on....
        else
        {
          if(i%10 ===0){
            xPos =offsetX;
            yPos = yPos+15;
          }

          else{ xPos=xPos+15;}
        } //end outer else

          dataPoints[i].update(xPos,yPos);
          finalHeight = yPos;
        }//for

  document.getElementById("childOne").style.height = `${finalHeight+20}px`;

  } //function

/*****************DISPLAY IN CIRCUlAR PATTERN:: <ONE>******************************/
  function displayInCirclularPattern(resultSet){
    //reset
    dataPoints =[];
    let xPos = 0;
    let yPos= 0;
    //for circle drawing
    let angle = 0;
    let centerX = 400;
    let centerY = 350;

    let scalar= 250;
    let yHeight = Math.cos(angle)*scalar+centerY;


    let coloredMoods = {}

    let possibleMoods = resultSet[resultSet.length-1];
    let possibleColors = ['rgba(0, 64, 255,.5)','rgba(26, 83, 255,.5)','rgba(51, 102, 255,.7)','rgba(51, 102, 255,.4)', 'rgba(77, 121,255,.6)','rgba(102, 140, 255,.6)','rgba(128, 159, 255,.4)','rgba(153, 179, 255,.3)','rgba(179, 198, 255,.6)','rgba(204, 217, 255,.4)'];

    for(let i = 0; i< possibleMoods.length; i++){
      coloredMoods[possibleMoods[i]] = possibleColors[i];

      }

      //set background of parent ... for fun ..
        document.getElementById("parent-wrapper").style.background = "rgba(0, 26, 102,1)";
        description.textContent = "BY AFTER MOOD";
        description.style.color = 'rgba(0, 64, 255,.5)';



        for(let i = 0; i<resultSet.length-1; i++){
          dataPoints.push(new myDataPoint(resultSet[i].dataId,
            resultSet[i].day,
            resultSet[i].weather,
            resultSet[i].start_mood,
            resultSet[i].after_mood,
            resultSet[i].after_mood_strength,
            resultSet[i].event_affect_strength,
            resultSet[i].eID,
            //map to the day ...
            coloredMoods[resultSet[i].after_mood],
            //last parameter is where should this go...
            document.getElementById("childOne"),
            //which css style///
            "point_two"
          ));
/*** circle drawing ***/
xPos = Math.sin(angle)*scalar+centerX;
yPos = Math.cos(angle)*scalar+centerY;
angle +=0.13;

if (angle > 2*Math.PI){
  angle =0;
  scalar-=20;
}
   dataPoints[i].update(xPos,yPos);
  }//for

    document.getElementById("childOne").style.height = `${yHeight}px`;
}//function

/*****************DISPLAY AS DEFAULT GRID :: AT ONLOAD******************************/
function displayAsDefault(resultSet){
  //reset
  dataPoints =[];
  let xPos = 0;
  let yPos =0;
  const NUM_COLS =50;
  const CELL_SIZE = 20;
  let coloredDays = {}
  /*
  1: get the array of days (last element in the result set  -- see runQueries.php)
  2: for each possible day (7)  - create a key value pair -> day: color and put in the
  coloredDays object
  */
  let possibleDays = resultSet[resultSet.length-1];
  let possibleColors = ['rgb(255, 102, 153)', 'rgb(255, 77, 136)','rgb(255, 51, 119)','rgb(255, 26, 102)','rgb(255, 0, 85)','rgb(255, 0, 85)','rgb(255, 0, 85)'];

  for(let i = 0; i< possibleDays.length; i++){
    coloredDays[possibleDays[i]] = possibleColors[i];
  }
/* for through each result  / not last as last is the days array and:
1: create a new MyDataPoint object and pass the properties from the db result entry to the object constructor
2: set the color using the coloredDays object associated with the resultSet[i].day
3:  put into the dataPoints array.
**/
//set background of parent ... for fun ..
 document.getElementById("parent-wrapper").style.background = "rgba(255,0,0,.4)";
  description.textContent = "DEfAULT CASE";
  description.style.color = 'rgb(255, 0, 85)';

//last  element is the helper array...
  for(let i = 0; i<resultSet.length-1; i++){
    dataPoints.push(new myDataPoint(resultSet[i].dataId,
      resultSet[i].day,
      resultSet[i].weather,
      resultSet[i].start_mood,
      resultSet[i].after_mood,
      resultSet[i].after_mood_strength,
      resultSet[i].event_affect_strength,
      resultSet[i].eID,
      //map to the day ...
      coloredDays[resultSet[i].day],
      //last parameter is where should this go...
      document.getElementById("childOne"),
      //which css style///
      "point"
    ));
/** this code is rather brittle - but does the job for now .. draw a grid of data points ..
//*** drawing a grid ****/
  if(i%NUM_COLS ===0){
    //reset x and inc y (go to next row)
    xPos =0;
    yPos+=CELL_SIZE;
  }
  else{
    //just move along in the column
    xPos+=CELL_SIZE;
  }
  //update the position of the data point...
  dataPoints[i].update(xPos,yPos);
}//for
  document.getElementById("childOne").style.height = `${yPos+CELL_SIZE}px`;

}//function

function displayRandomPattern(resultSet){
  //reset
  dataPoints =[];
  let xPos = 2;
  let yPos= 1;
  //for circle drawing
  let angle = 10;
  let centerX = 240;
  let centerY = 530;

  let scalar= 255;
  let yHeight = Math.cos(angle)*scalar+centerY;


  let coloredMoods = {}

  let possibleMoods = resultSet[resultSet.length-1];
  let possibleColors = ['rgba(30, 14, 25,65)','rgba(46, 53, 445,75)','rgba(41, 52, 345,53)','rgba(51, 102, 255,.4)', 'rgba(77, 121,255,.6)','rgba(102, 140, 255,.6)','rgba(128, 159, 255,.4)','rgba(153, 179, 255,.3)','rgba(179, 198, 255,.6)','rgba(204, 217, 255,.4)'];

  for(let i = 0; i< possibleMoods.length; i++){
    coloredMoods[possibleMoods[i]] = possibleColors[i];

    }

    //set background of parent ... for fun ..
      document.getElementById("parent-wrapper").style.background = "rgba(0, 26, 102,1)";
      description.textContent = "BY AFTER MOOD";
      description.style.color = 'rgba(0, 64, 255,.5)';



      for(let i = 0; i<resultSet.length-1; i++){
        dataPoints.push(new myDataPoint(resultSet[i].dataId,
          resultSet[i].day,
          resultSet[i].weather,
          resultSet[i].start_mood,
          resultSet[i].after_mood,
          resultSet[i].after_mood_strength,
          resultSet[i].event_affect_strength,
          resultSet[i].eID,
          //map to the day ...
          coloredMoods[resultSet[i].after_mood],
          //last parameter is where should this go...
          document.getElementById("childOne"),
          //which css style///
          "point_two"
        ));
/*** circle drawing ***/
xPos = Math.sin(angle)*scalar+centerX;
yPos = Math.cos(angle)*scalar+centerY;
angle +=0.13;

if (angle > 2*Math.PI){
angle =3;
scalar-=23;
}
 dataPoints[i].update(xPos,yPos);
}//for

  document.getElementById("childOne").style.height = `${yHeight}px`;
}//function

function displayJumbledUpPattern(resultSet){
  //reset
  dataPoints =[];
  let xPos = 5;
  let yPos= 5;
  //for circle drawing
  let angle = 78;
  let centerX = 73;
  let centerY = 276;

  let scalar= 222;
  let yHeight = Math.cos(angle)*scalar+centerY;


  let coloredMoods = {}

  let possibleMoods = resultSet[resultSet.length-1];
  let possibleColors = ['rgba(22, 22, 55,55)','rgba(55, 55, 22,33)','rgba(11, 11, 11,11)','rgba(51, 102, 255,.4)', 'rgba(77, 121,255,.6)','rgba(333, 333, 333,333)','rgba(128, 159, 255,.4)','rgba(132, 321, 123,321)','rgba(179, 198, 255,.6)','rgba(204, 217, 255,.4)'];

  for(let i = 0; i< possibleMoods.length; i++){
    coloredMoods[possibleMoods[i]] = possibleColors[i];

    }

    //set background of parent ... for fun ..
      document.getElementById("parent-wrapper").style.background = "rgba(0, 88, 102,99)";
      description.textContent = "BY AFTER MOOD";
      description.style.color = 'rgba(0, 77, 255,64)';



      for(let i = 0; i<resultSet.length-1; i++){
        dataPoints.push(new myDataPoint(resultSet[i].dataId,
          resultSet[i].day,
          resultSet[i].weather,
          resultSet[i].start_mood,
          resultSet[i].after_mood,
          resultSet[i].after_mood_strength,
          resultSet[i].event_affect_strength,
          resultSet[i].eID,
          //map to the day ...
          coloredMoods[resultSet[i].after_mood],
          //last parameter is where should this go...
          document.getElementById("childOne"),
          //which css style///
          "point_two"
        ));
/*** circle drawing ***/
xPos = Math.sin(angle)*scalar+centerX;
yPos = Math.cos(angle)*scalar+centerY;
angle +=0.33;

if (angle > 2*Math.PI){
angle =0;
scalar-=60;
}
 dataPoints[i].update(xPos,yPos);
}//for

  document.getElementById("childOne").style.height = `${yHeight}px`;
}//function

function displayMessedUpPattern(resultSet){
  //reset
  dataPoints =[];
  let xPos = 77;
  let yPos= 33;
  //for circle drawing
  let angle = 48;
  let centerX = 83;
  let centerY = 432;

  let scalar= 99;
  let yHeight = Math.cos(angle)*scalar+centerY;


  let coloredMoods = {}

  let possibleMoods = resultSet[resultSet.length-1];
  let possibleColors = ['rgba(0, 0, 49,92)','rgba(26, 83, 255,.5)','rgba(51, 102, 255,.7)','rgba(123, 241, 333,0)', 'rgba(77, 121,444,.6)','rgba(255, 255, 255,255)','rgba(48, 88, 255,.4)','rgba(153, 179, 47,.3)','rgba(179, 198, 255,.6)','rgba(0,0,0,0)'];

  for(let i = 0; i< possibleMoods.length; i++){
    coloredMoods[possibleMoods[i]] = possibleColors[i];

    }

    //set background of parent ... for fun ..
      document.getElementById("parent-wrapper").style.background = "rgba(0, 26, 102,1)";
      description.textContent = "BY AFTER MOOD";
      description.style.color = 'rgba(0, 0, 0,.5)';



      for(let i = 0; i<resultSet.length-1; i++){
        dataPoints.push(new myDataPoint(resultSet[i].dataId,
          resultSet[i].day,
          resultSet[i].weather,
          resultSet[i].start_mood,
          resultSet[i].after_mood,
          resultSet[i].after_mood_strength,
          resultSet[i].event_affect_strength,
          resultSet[i].eID,
          //map to the day ...
          coloredMoods[resultSet[i].after_mood],
          //last parameter is where should this go...
          document.getElementById("childOne"),
          //which css style///
          "point_two"
        ));
/*** circle drawing ***/
xPos = Math.sin(angle)*scalar+centerX;
yPos = Math.cos(angle)*scalar+centerY;
angle +=0.83;

if (angle > 2*Math.PI){
angle =93;
scalar-=39;
}
 dataPoints[i].update(xPos,yPos);
}//for

  document.getElementById("childOne").style.height = `${yHeight}px`;
}//function

function displayRidiculousPattern(resultSet){
  //reset
  dataPoints =[];
  let xPos = 90;
  let yPos= 0.9;
  //for circle drawing
  let angle = 100;
  let centerX = 321;
  let centerY = 123;

  let scalar= 83;
  let yHeight = Math.cos(angle)*scalar+centerY;


  let coloredMoods = {}

  let possibleMoods = resultSet[resultSet.length-1];
  let possibleColors = ['rgba(0, 0, 0,50)','rgba(26, 83, 255,.5)'];

  for(let i = 0; i< possibleMoods.length; i++){
    coloredMoods[possibleMoods[i]] = possibleColors[i];

    }

    //set background of parent ... for fun ..
      document.getElementById("parent-wrapper").style.background = "rgba(0, 300, 10,1)";
      description.textContent = "BY AFTER MOOD";
      description.style.color = 'rgba(20,200,20,200)';



      for(let i = 0; i<resultSet.length-1; i++){
        dataPoints.push(new myDataPoint(resultSet[i].dataId,
          resultSet[i].day,
          resultSet[i].weather,
          resultSet[i].start_mood,
          resultSet[i].after_mood,
          resultSet[i].after_mood_strength,
          resultSet[i].event_affect_strength,
          resultSet[i].eID,
          //map to the day ...
          coloredMoods[resultSet[i].after_mood],
          //last parameter is where should this go...
          document.getElementById("childOne"),
          //which css style///
          "point_two"
        ));
/*** circle drawing ***/
xPos = Math.sin(angle)*scalar+centerX;
yPos = Math.cos(angle)*scalar+centerY;
angle +=0.89;

if (angle > 2*Math.PI){
angle =58;
scalar-=600;
}
 dataPoints[i].update(xPos,yPos);
}//for

  document.getElementById("childOne").style.height = `${yHeight}px`;
}//function


/***********************************************/
});
