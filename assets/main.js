 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyCVkghAvQYFGaH8dfK8ctL8CjmJBGCaAA4",
    authDomain: "train-scheduler-42547.firebaseapp.com",
    databaseURL: "https://train-scheduler-42547.firebaseio.com",
    projectId: "train-scheduler-42547",
    storageBucket: "train-scheduler-42547.appspot.com",
    messagingSenderId: "352242227361"
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();

// Button for adding a new train
$('#addTrain').on("click", function(){
	//Grabs user input ... turns train-time into time variable with moment.js ... turns train input into unit variable, converts everything into one line
	event.preventDefault();
	var trainName = $('#trainNameInput').val().trim();
	var destination = $('#trainDestinationInput').val().trim();
	var firstTrain = moment($('#trainTimeInput').val().trim(),"HH:mm").subtract(10,"years").format("X");
	var frequency = $('#trainFrequencyInput').val().trim();

	var newTrain = {
		name: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	}
	trainData.ref().push(newTrain);

	$('#trainNameInput').val("");
	$('#trainDestinationInput').val("");
	$('#trainTimeInput').val("");
	$('#trainFrequencyInput').val("");

	return false;
});

trainData.ref().on("child_added", function(snapshot){	
		var name = snapshot.val().name;
		var destination = snapshot.val().destination;
		var firstTrain = snapshot.val().firstTrain;
		var frequency = snapshot.val().frequency;

		var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
		var minutes = frequency - remainder;
		var arrival = moment().add(minutes, "m").format("hh:mm A");

		$("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination  + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td><tr>");
	});
