status="";
objects = [];

function preload(){
  img=  loadImage('living_room.jpg');
}
function setup(){
    canvas = createCanvas(640 , 320);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML= "Detecting objects";
}
function modelLoaded(){
    console.log("MODEL LOADED!!");
    status = true;
    objectDetector.detect(img , gotResult);
}
function gotResult(error , results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(img , 0 , 0 , 640 , 420);
    if(status != ""){
      for(i = 0 ; i < objects.length ; i++){
        document.getElementById("status").innerHTML= "Status: Objects Detected";

        fill("#00008B");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + "" + percent + '%' , objects[i].x , objects[i].y);
        noFill();
        stroke("#00008B");
        rect(objects[i].x +15 , objects[i].y +15, objects[i].width , objects[i].height);
      }
    } 
}