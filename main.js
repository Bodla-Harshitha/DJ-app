song="";
leftHandWristX="";
leftHandWristY="";

rightHandWristX="";
rightHandWristY="";

scoreleftWristY="";
scorerightWrist="";

function preload(){
    song=loadSound("music.mp3");
    
}

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("Model has loaded!")
}

function gotPoses(result){
    if(result.length > 0){

        console.log(result);
    scoreleftWristY=result[0].pose.keypoints[9].score;
    console.log('score of left wrist ='+scoreleftWristY) ;

    scorerightWrist=result[0].pose.keypoints[10].score;
    console.log('score of right wrist ='+ scorerightWrist);

        leftHandWristX=result[0].pose.leftWrist.x;
    leftHandWristY=result[0].pose.leftWrist.y;
    console.log("leftHandWristX="+leftHandWristX);
    console.log("leftHandWristY="+leftHandWristY);

    rightHandWristX=result[0].pose.rightWrist.x;
    rightHandWristY=result[0].pose.rightWrist.y;
    console.log("rightHandWristX="+rightHandWristX);
    console.log("rightHandWristY="+rightHandWristY);
    }
}
function draw(){
    image(video,0,0,600,500);

    fill('#00FFFF');
    stroke('#00FFFF');

    if(scoreleftWristY > 0.02){
        circle(leftHandWristX,leftHandWristY,20);
        numberleftwristY=Number(leftHandWristY);
        remove_decimals=floor(numberleftwristY);
        volume=remove_decimals/500;
        document.getElementById("show_volume").innerHTML="Volume ="+volume;
        song.setVolume(volume);
    }
    
      if(scorerightWrist > 0.02){
     
        circle(rightHandWristX,rightHandWristY,20);
        if(rightHandWristY>0 && rightHandWristY<100){
            speed=0.5;
            song.rate(speed);
            document.getElementById("show_speed").innerHTML="Speed ="+speed;
        }
        if(rightHandWristY>100 && rightHandWristY<200){
            speed=1;
            song.rate(speed);
            document.getElementById("show_speed").innerHTML="Speed ="+speed;
        }
        if(rightHandWristY>200 && rightHandWristY<300){
            speed=1.5;
            song.rate(speed);
            document.getElementById("show_speed").innerHTML="Speed ="+speed;
        }
        if(rightHandWristY>300 && rightHandWristY<400){
            speed=2;
            song.rate(speed);
            document.getElementById("show_speed").innerHTML="Speed ="+speed;
        }
        if(rightHandWristY>400 && rightHandWristY<500){
            speed=2.5;
            song.rate(speed);
            document.getElementById("show_speed").innerHTML="Speed ="+speed;
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}