 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDhx7HjwECIL0Xi_AdHPzR4mIqAt0NmDp8",
    authDomain: "train-time-5564a.firebaseapp.com",
    databaseURL: "https://train-time-5564a.firebaseio.com",
    projectId: "train-time-5564a",
    storageBucket: "",

  };

  firebase.initializeApp(config);

  const db = firebase.database();

  function calculateTrains() {
    var firstHours = parseInt(firstTrain.substring(0, 2));
    var firstMinutes = parseInt(firstTrain.substring(3, 5));
    var firstInMin = (firstHours * 60) + firstMinutes;

    var today = moment().format('hh:mm')
    var secondHours = parseInt(today.substring(0, 2));
    var secondMinutes = parseInt(today.substring(3, 5));
    var secondInMin = (secondHours * 60) + secondMinutes;

    var timeSinceFirst = secondInMin - firstInMin;

    var trains = Math.round((timeSinceFirst)/trainFrequency, 0)

    minutesAway = trainFrequency - (timeSinceFirst % trains);

    nextArrival = moment().add(minutesAway, 'minutes').calendar();

    db.ref().push({
    trainName : trainName,
    trainDestination : trainDestination,
    trainFrequency : trainFrequency,
    firstTrain : firstTrain,
    nextArrival : nextArrival,
    minutesAway : minutesAway
  })
  }

  var trainName = "";
  var trainDestination = "";
  var trainFrequency = "";
  var firstTrain = "";
  var nextArrival ="";
  var minutesAway = "";

$("#newTrain").on("click", e => {
  event.preventDefault();

  trainName = $("#trainName").val().trim();
  trainDestination = $("#destination").val().trim();
  trainFrequency = $("#frequency").val().trim();
  firstTrain = $("#firstTrain").val().trim();

  calculateTrains();

  console.log(minutesAway)
})

db.ref().on("child_added", childsnapshot => {
  var newRow = $("<tr>");

  var trainName = $("<td scope='col'>").text(childsnapshot.val().trainName);
  var trainDestination = $("<td scope='col'>").text(childsnapshot.val().trainDestination);
  var trainFrequency = $("<td scope='col'>").text(childsnapshot.val().trainFrequency);
  var nextArrival = $("<td scope='col'>").text(childsnapshot.val().nextArrival);
  var minutesAway = $("<td scope='col'>").text(childsnapshot.val().minutesAway);

  newRow.append(trainName)
    .append(trainDestination)
    .append(trainFrequency)
    .append(nextArrival)
    .append(minutesAway);

  $("#trainTable").append(newRow);

})




  

