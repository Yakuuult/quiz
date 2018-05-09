var client;

//**Changed codes based on the appendix in Web GIS practicals**//
// question id can not be extracted by .value
// question id can be extracted by.textContent 
function quizUpload() {
var questionid = document.getElementById("questionid").textContent;
// transfer text into string format
    questionid = String(questionid);
// value the variable 'quizString'
var quizString = "questionid="+questionid;

// now get the radio button values
if (document.getElementById("a1").checked) {
var user=document.getElementById("a1").value;
quizString=quizString+"&answernumber="+user;
}
if (document.getElementById("a2").checked) {
var user=document.getElementById("a2").value;
quizString=quizString+"&answernumber="+user;
}
if (document.getElementById("a3").checked) {
var user=document.getElementById("a3").value;
quizString=quizString+"&answernumber="+user;
}
if (document.getElementById("a4").checked) {
var user=document.getElementById("a4").value;
quizString=quizString+"&answernumber="+user;
}
processData(quizString);
}

//**Changed based on the appendix in Web GIS practicals**//
//upload question id and user's answer into the database
function processData(quizString) {
client = new XMLHttpRequest();
client.open('POST','http://developer.cege.ucl.ac.uk:30272/quizUpload',true);
client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
client.onreadystatechange = dataUploaded;
client.send(quizString);

}

// create the code to wait for the response from the data server, and process the response once it is received
function dataUploaded() {
// this function listens out for the server to say that the data is ready - i.e. has state 4
if (client.readyState == 4) {
// change the DIV to show the response
document.getElementById("dataUploadResult").innerHTML = client.responseText;
}
}