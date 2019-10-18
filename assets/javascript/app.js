// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB0GjeUqutro2hoLGBNvVJ1VtqIxEADNKg",
    authDomain: "train-schedule-f9261.firebaseapp.com",
    databaseURL: "https://train-schedule-f9261.firebaseio.com",
    projectId: "train-schedule-f9261",
    storageBucket: "train-schedule-f9261.appspot.com",
    messagingSenderId: "282033301567",
    appId: "1:282033301567:web:ae83cc3324f056bb64308a",
    measurementId: "G-NZNMN2XGXH"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Database
var database = firebase.database();

var trainRef = database.ref("/trains");


$(".submit-btn").on("click",function(event){
    // Prevent Refreshing
    event.preventDefault();

    // Declaring variables
    var name = $("#input-name").val();
    var destination = $("#input-destination").val();
    var firstTime = $("#input-first-time").val();
    var occurrence = $("#input-occurrence").val();

    if (trainRef){
        trainRef.push({
            name: name,
            destination: destination,
            firstTime: firstTime,
            occurrence: occurrence
        })
    }

    $("#input-name").val("");
    $("#input-destination").val("");
    $("#input-first-time").val("");
    $("#input-occurrence").val("");
});


trainRef.on("child_added",function(snapshot){
    var newTr = $("<tr>");
    $(".train-table").append(newTr);

    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var firstTime = moment(snapshot.val().firstTime, "hh:mm").subtract(1,"years");
    var occurrence = snapshot.val().occurrence;
    // diffTrain: time difference between current and first train
    var diffTrain = moment().diff(moment(firstTime), "minutes");
    var trainRemainder = diffTrain % occurrence;
    var minAway = occurrence - trainRemainder;
    var nextTrainTime = moment().add(minAway, "m").format("hh:mm A");
    // console.log(firstTime);
    // console.log(diffTrain);
    // console.log(trainRemainder);
    // console.log(minAway);
    // console.log(nextTrainTime);

    addTd(name,newTr);
    addTd(destination,newTr);
    addTd(occurrence,newTr);
    addTd(nextTrainTime,newTr);s
    addTd(trainRemainder,newTr);    
});


// function to add the td into the table row
function addTd(item,Tr){
    var Td = $("<td>").text(item);
    Tr.append(Td);
}





// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.2.1/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyB0GjeUqutro2hoLGBNvVJ1VtqIxEADNKg",
//     authDomain: "train-schedule-f9261.firebaseapp.com",
//     databaseURL: "https://train-schedule-f9261.firebaseio.com",
//     projectId: "train-schedule-f9261",
//     storageBucket: "train-schedule-f9261.appspot.com",
//     messagingSenderId: "282033301567",
//     appId: "1:282033301567:web:ae83cc3324f056bb64308a",
//     measurementId: "G-NZNMN2XGXH"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>