// Data of Exercise************************************************************************************************************************************************************************************
var exercise = ["Physical Arousal", "Upper Limb Exercise", "Lower Limb Exercise"];

var step1 = ["Lower your body with your hands crossed; while you stand up, draw a maximum circle with your hands to the top of your head", "Stand upright with your feet open and shoulder-width apart to keep your body stable; raise your hands flat and your wrists tightly against each other; turn your wrists from top to bottom and keep your wrists apart", "Hold your knees firmly with your hands and lift them up against your abdomen; lift your knees and lift your toes"];

var step2 = ["Tighten the waist and abdomen, the arms are tightened tightly; lift the arms with the strength of the shoulders, push the arms down with the strength of the back, and use the arms to drive the body to jump; while the body moves laterally, your feet and hands alternately open and close", "Stand straight with your feet open as wide as your shoulders, keep your body stable, hold your fingers imaginary, and place your thumbs on your shoulders; bend your arms and shoulders in a circular motion, the bigger the better", "Your feet should be about twice as wide as your shoulders. Your toes should be facing obliquely forward. Place your weight on one leg and squat until the other leg is completely straight. Make the other side after touching the ground; keep your heels off the ground"];

var step3 = ["Heels are as wide as shoulders, straight back, palms facing each other, arms raised flat; hips sit back, knees are aligned with toes, squat until thighs are 45 ° from the ground, and hips are higher than thighs, you can get back up Move as smoothly and coherently as possible", "Facing the wall with both hands, the wall is slightly wider than the width of the shoulders. The elbows are retracted inward. The arms and torso are at an angle of about 70 degrees. The body is stretched in a straight line and the feet are slightly apart. Get closer, until your face is close to the wall; pause briefly; push your body back to the original position with your elbows slightly bent at the highest point", "Tighten your whole body, swing your body from side to side with your legs when you jump left and right"];

var step4 = ["Stand with your feet at the same width as your shoulders, lean down, and stomp your feet quickly, the faster the better; the arms naturally follow the legs", "The knees and hands are supported on the cushion, the back is straight, the torso and thighs are in a straight line when viewed from the side, the hands are supported on both sides of the chest, and the distance is as wide as the shoulders; Then support the ground with both hands, stretch out your arms to restore", "Lie on your back on the yoga mat with your legs flexed slightly wider than your shoulders, and your heels step on the ground; lift your hips until your thighs are in a straight line with your body, and your upper back will support the ground when your hips are raised"];

var step5 = ["Facing the wall with both hands, the wall is slightly wider than the width of the shoulders. The elbows are retracted inward. The arms and torso are at an angle of about 70 degrees. The body is stretched in a straight line and the feet are slightly apart. Get closer, until your face is close to the wall; pause briefly; push your body back to the original position with your elbows slightly bent at the highest point", "Cross your feet, kneel on the mat, your back straight, look at your body in a straight line when viewed from the side, and support your hands on both sides of your chest, slightly wider than your shoulders", "Tighten the waist and abdomen, and tighten your arms. Use your shoulders to lift your arms and your back to push down on your arms. Use your arms to drive your body. Jump with your feet open and closed. Keep your calves as relaxed as possible"];

var exercise_type = -1;
var exercise_step = 1;
var face_status = 0;
var exercise_step_copy = 1;
var exercise_type_copy = -1;

var voice = window.setInterval(startRecognition, 200);


//Eyes ************************************************************************************************************************************************************************************
var blink;

function moveEye(event){
  let mouseX = event.clientX;
  let mouseY = event.clientY;
  // let text = document.getElementById("text");
  // text.innerHTML = "I'm watching you!";
  
  let svg = document.getElementById("face");
  let eyeL = document.getElementById("leftEye");
  let eyeLI = document.getElementById("inner_leftEye");
  let eyeR = document.getElementById("rightEye");
  let eyeRI = document.getElementById("inner_rightEye");
  

  let eyeLrect = eyeL.getBoundingClientRect();
  let eyeRrect = eyeR.getBoundingClientRect();
  let rec = svg.getBoundingClientRect();
  
  LXM = 0.3 * rec.width + 30 * (mouseX - 0.3 * rec.width) / rec.width;
  LYM = 0.45 * rec.height + 30 * (mouseY - 0.45 * rec.height) / rec.height;
  eyeLI.setAttribute('cx', LXM);
  eyeLI.setAttribute('cy', LYM);

  RXM = 0.7 * rec.width + 30 * (mouseX - 0.7 * rec.width) / rec.width;
  RYM = 0.45 * rec.height + 30 * (mouseY - 0.45 * rec.height) / rec.height;
  eyeRI.setAttribute('cx', RXM);
  eyeRI.setAttribute('cy', RYM);


}

function eyeClose(){

  let eyeLI = document.getElementById("inner_leftEye");
  let eyeRI = document.getElementById("inner_rightEye");
  
  eyeLI.setAttribute("r", 0);
  eyeRI.setAttribute('r', 0);  
}

function eyeOpen(){

  let eyeLI = document.getElementById("inner_leftEye");
  let eyeRI = document.getElementById("inner_rightEye");
  
  eyeLI.setAttribute("r", 30);
  eyeRI.setAttribute('r', 30);  
}

function closeOpen(){
  eyeClose();
  var open;
  open = setTimeout(eyeOpen, 100);
  
  // Randomly blinking (Between 1s ~ 6s)
  clearInterval(blink);
  randomNumber = (Math.floor(Math.random() * 6) + 1) * 1000;
  blink = setInterval(closeOpen, randomNumber);
}

function Blink(){ 

  randomNumber = (Math.floor(Math.random() * 6) + 1) * 1000;
  blink = setInterval(closeOpen, randomNumber);
}


// Start Video************************************************************************************************************************************************************************************
/* This function checks and sets up the camera */
var mainStream = null;
var repeat = null;
var check = null;
function startVideo() {
  check = window.setInterval(process, 200);
  var exerciseHL = document.getElementById("exercise");
  var preHL = document.getElementById("previous");
  var nextHL = document.getElementById("next");
  var finHL = document.getElementById("finish");
  var tipspHL = document.getElementById("tipSpeech");
  if(exercise_type != -1 && exercise_step_copy != 5){
    preHL.style.visibility = "visible";
    nextHL.style.visibility = "visible";
    tipspHL.style.visibility = "visible";
  }
  else if(exercise_type != -1 && exercise_step_copy == 5){
    finHL.style.visibility = "visible";
  }
  
  if (navigator.mediaDevices && 
      navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video: true})
      .then(handleUserMediaSuccess)
      .catch(handleUserMediaError);
  }
}

function handleUserMediaError(error){
  console.log(error);
}

function handleUserMediaSuccess(stream){
  var video = document.getElementById("myVideo");
  video.srcObject = stream;
  mainStream = stream;
  // video.play();
  console.log("success");
  repeat = window.setInterval(captureImageFromVideo, 200);
}

// The variable that holds the detected face information, which will be updated through Firebase callbacks
var detection = null;

function captureImageFromVideo() {
  const canvas = document.getElementById("CameraCanvas");
  const context = canvas.getContext("2d");
  
  const video = document.getElementById("myVideo");
  canvas.setAttribute("width", video.width);
  canvas.setAttribute("height", video.height);  
  // Draw video image onto Canvas
  context.drawImage(video, 0, 0, video.width, video.height);
  sendFaceRequest(canvas);
  sendWordRequest(canvas);
  
}

// Stop Video************************************************************************************************************************************************************************************
function stopCamera(){
  mainStream.getTracks().forEach(track => track.stop())
  clearInterval(repeat);
  clearInterval(check);
  var exerciseHL = document.getElementById("exercise");
  var preHL = document.getElementById("previous");
  var nextHL = document.getElementById("next");
  var finHL = document.getElementById("finish");
  var tipspHL = document.getElementById("tipSpeech");
  exerciseHL.innerHTML = "<strong>I am waiting for you!</strong>";
  if(exercise_type != -1){
    preHL.style.visibility = "hidden";
    nextHL.style.visibility = "hidden";
    tipspHL.style.visibility = "hidden";
    finHL.style.visibility = "hidden";
  }
}

// Face detect************************************************************************************************************************************************************************************
// Google Vison
function sendFaceRequest(picture)
{
  var url =
  "https://vision.googleapis.com/v1/images:annotate?key=[Your Key]";
  
  var baseurl = picture.toDataURL();
  var base64 = baseurl.slice(22);
  
 
  /*The is the request that will be sent as JSON*/
  var request = {
    requests: [
      {
        image: {
          content: base64
        },
        features: [
          {
            type: "FACE_DETECTION",
            maxResults: 10
          }
        ]
      }
    ]
  };  
  
  ajaxRequest("POST", url, handleFaceResponse, JSON.stringify(request));
  
}

function handleFaceResponse() {
  if (successfulRequest(this)) {
    var response = JSON.parse(this.responseText);
    
    var face = response.responses[0].faceAnnotations;
    if(typeof(face) == "undefined"){
      console.log("No face");
      face_status = 0;
    }else{
      face_status = 1;
    }
    // 标记框
//     for (var i = 0; i < annotations.length; i++) {
//       var ann = annotations[i];
//       var bb = ann.boundingPoly.vertices;

//       context.beginPath();
//       context.moveTo(bb[0].x, bb[0].y);
//       context.lineTo(bb[1].x, bb[1].y);
//       context.lineTo(bb[2].x, bb[2].y);
//       context.lineTo(bb[3].x, bb[3].y);
//       context.lineTo(bb[0].x, bb[0].y);
//       context.lineWidth = 10;
//       context.strokeStyle = "#0F0";
//       context.fillStyle = "#0F0";
//       context.stroke();
//     }    
      // context.font = "36px Arial";
      // context.fillText(ann.description, bb[0].x, bb[0].y - 10);
    
  } else {
    // console.log("Ready state: " + this.readyState);
    // console.log("Status: " + this.status);
    // console.log("Status text: " + this.statusText);
  }
}

// Word detect************************************************************************************************************************************************************************************
function sendWordRequest(picture){
  var url =
  "https://vision.googleapis.com/v1/images:annotate?key=[Your Key]";
  
  var baseurl = picture.toDataURL();
  var base64 = baseurl.slice(22);
  
 
  /*The is the request that will be sent as JSON*/
  var request = {
    requests: [
      {
        image: {
          content: base64
        },
        features: [
          {
            type: "TEXT_DETECTION"
          }
        ]
      }
    ]
  };  
  
  ajaxRequest("POST", url, handleWordResponse, JSON.stringify(request));
}

function handleWordResponse() {
  if (successfulRequest(this)) {
    var response = JSON.parse(this.responseText);
    // console.log(response);
    var words = response.responses[0].textAnnotations;
    
    if(typeof(words) == "undefined"){
      console.log("No Word");
    }else{
      // console.log(words[0].description);
      if(words[1].description == "Lower" && words[2].description == "Limb" && words[3].description == "Exercise" && words.length == 4){
        exercise_type = 2;
        exercise_type_copy = 2;
        console.log("Lower Limb Exercise");
        startRecognition();
      }
      else if(words[1].description == "Upper" && words[2].description == "Limb" && words[3].description == "Exercise" && words.length == 4){
        exercise_type = 1;
        exercise_type_copy = 1;
        console.log("Upper Limb Exercise");
      }
      else if(words[1].description == "Physical" && words[2].description == "Arousal" && words.length == 3){
        exercise_type = 0;
        exercise_type_copy = 0;
        console.log("Physical Arousal");
      }
      
    }
    
  } else {
    // console.log("Ready state: " + this.readyState);
    // console.log("Status: " + this.status);
    // console.log("Status text: " + this.statusText);
  }
}

/*Helper function: sends an XMLHTTP request*/
function ajaxRequest(method, url, handlerFunction, content) {
  var xhttp = new XMLHttpRequest();
  xhttp.open(method, url);
  xhttp.onreadystatechange = handlerFunction;
  xhttp.send(content);
}

/*Helper function: checks if the response to the request is ready to process*/
function successfulRequest(request) {
  return request.readyState === 4 && request.status == 200;
}

//Speech************************************************************************************************************************************************************************************
// function robotText(wrod){

// }

//Speech************************************************************************************************************************************************************************************
// function textToSpeech(T) {
// 	// get all voices that browser offers
// 	var available_voices = window.speechSynthesis.getVoices();

// 	// this will hold an english voice
// 	var english_voice = '';

// 	// find voice by language locale "en-US"
// 	// if not then select the first voice
// 	for(var i=0; i<available_voices.length; i++) {
// 		if(available_voices[i].lang === 'en-US') {
// 			english_voice = available_voices[i];
// 			break;
// 		}
// 	}
// 	if(english_voice === '')
// 		english_voice = available_voices[0];

// 	// new SpeechSynthesisUtterance object
// 	var utter = new SpeechSynthesisUtterance();
// 	utter.rate = 1;
// 	utter.pitch = 0.5;
// 	utter.text = T;
// 	utter.voice = english_voice;

// 	// event after text has been spoken
// 	utter.onend = function() {
// 		console.log('Speech has finished');
// 	}

// 	// speak
// 	window.speechSynthesis.speak(utter);
// }

//Voice detect************************************************************************************************************************************************************************************
//Speech Recognition
var grammar =
  "#JSGF V1.0; grammar emar; public <greeting> = hello | hi; <person> = maya | alisa;";
var recognition = new window.webkitSpeechRecognition();
var speechRecognitionList = new window.webkitSpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

function startRecognition() {
  recognition.start();
};

recognition.onresult = processSpeech;
  
function processSpeech(event) {
  var inputSpeech = event.results[0][0].transcript;
  console.log(inputSpeech);
  if(inputSpeech == "just do it"){
    startVideo();
  }
  else if(inputSpeech == "stop"){
    stopCamera();
  }
  else if(inputSpeech == "next"){
    if(face_status != 0 && exercise_type != -1 && exercise_step <= 5){
      exercise_step = exercise_step + 1;
      exercise_step_copy = exercise_step_copy + 1;
    }
  }
  else if(inputSpeech == "back"){
    if(face_status != 0 && exercise_type != -1 && exercise_step >= 2){
      exercise_step = exercise_step - 1;
      exercise_step_copy = exercise_step_copy - 1;
    }
  }
  else if(inputSpeech == "okay"){
    if(face_status == 1 && exercise_step_copy == 5){
      done();
    }
  }  
  recognition.stop();
}
recognition.onend = recognitionEnded;

function recognitionEnded() {
  console.log("onend happened");
  recognition.stop();
}

function process(){
  console.log("Face" + face_status + "***type" + exercise_type+exercise_type + "***step" + exercise_step+exercise_step_copy);
  var exerciseHL = document.getElementById("exercise");
  var preHL = document.getElementById("previous");
  var nextHL = document.getElementById("next");
  var finHL = document.getElementById("finish");
  var tipspHL = document.getElementById("tipSpeech");
  var smile = document.getElementById("smile");
  if(face_status == 1 ){
    if(exercise_type_copy != -1){
      if(exercise_step_copy != 5){
        preHL.style.visibility = "visible";
        nextHL.style.visibility = "visible";
        tipspHL.style.visibility = "visible";      
      }
      else if(exercise_step_copy == 5){
        preHL.style.visibility = "hidden";
        nextHL.style.visibility = "hidden";
        tipspHL.style.visibility = "hidden";   
        finHL.style.visibility = "visible";
      }    
      
      if(exercise_step_copy == 1){
        exerciseHL.innerHTML = "<strong>Step 1: </strong>" + step1[exercise_type_copy];
      }
      else if(exercise_step_copy == 2){
        exerciseHL.innerHTML = "<strong>Step 2: </strong>" + step2[exercise_type_copy];                 
      }
      else if(exercise_step_copy == 3){
        exerciseHL.innerHTML = "<strong>Step 3: </strong>" + step3[exercise_type_copy];                   
      }   
      else if(exercise_step_copy == 4){
        exerciseHL.innerHTML = "<strong>Step 4: </strong>" + step4[exercise_type_copy];                 
      }        
      else if(exercise_step_copy == 5){
        exerciseHL.innerHTML = "<strong>Final Step: </strong>" + step5[exercise_type_copy] + "<br><strong>Congratulations! You have complete the exercise. </strong>";   
        smile.style.visibility = "visible";
        exercise_type = -1;
        exercise_step = 1;
      }           
    }
    else{
      exerciseHL.innerHTML = "Hi, please show your exercise card in front of camera.";
      smile.style.visibility = "hidden";
    }
  }
  else if(face_status != 1){
    var exerciseHL = document.getElementById("exercise");
    exerciseHL.innerHTML = "<strong>I am waiting for you!</strong>";
    if(exercise_step_copy != 5){
      preHL.style.visibility = "hidden";
      nextHL.style.visibility = "hidden";
      tipspHL.style.visibility = "hidden";      
    }
    else if(exercise_step_copy == 5){
      preHL.style.visibility = "hidden";
      nextHL.style.visibility = "hidden";
      tipspHL.style.visibility = "hidden";   
      finHL.style.visibility = "hidden";
    }
  }
}

function next(){
  if(exercise_step <= 5){
    exercise_step = exercise_step + 1;
    exercise_step_copy = exercise_step_copy + 1;
  }
}

function previous(){
  if(exercise_step >= 2){
    exercise_step = exercise_step - 1;
    exercise_step_copy = exercise_step_copy - 1;
  }
}

function done(){
  var preHL = document.getElementById("previous");
  var nextHL = document.getElementById("next");
  var finHL = document.getElementById("finish");
  var tipspHL = document.getElementById("tipSpeech");
  var exerciseHL = document.getElementById("exercise");
  // exerciseHL.innerHTML = "<strong>Congratulations! You have complete the exercise. </strong>";
  finHL.style.visibility = "hidden";
  exercise_step_copy = 1;
  exercise_type_copy = -1;
}
