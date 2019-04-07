$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyCqR70MCikov5OiB4kdGir6iSMWcnJTMQ0",
        authDomain: "train-sark.firebaseapp.com",
        databaseURL: "https://train-sark.firebaseio.com",
        projectId: "train-sark",
        storageBucket: "train-sark.appspot.com",
        messagingSenderId: "317089221137"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    // Sets up the variables
    var train = "";
    var destination = "";
    var frequency = "";
    var nextArrival = "";
    var minsAway = "";

    // Submit button
    $('#submit-btn').on('click', function (event) {
        event.preventDefault();

        train = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        frequency = $("#frequency").val().trim();
        nextArrival = $("#next-arrival").val().trim();
        minsAway = $("#mins-away").val().trim();

        // Sends the values to Firebase
        database.ref("/trainInfo").push({
            train: train,
            destination: destination,
            frequency: frequency,
            arrival: nextArrival,
            minutes: minsAway,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        // Clears the values inputed once submit is clicked
        $("#train-name").val("");
        $("#destination").val("");
        $("#frequency").val("");
        $("#next-arrival").val("");
        $("#mins-away").val("");
    })

    // Firebase watcher + initial loader
    database.ref("/trainInfo").on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        var train = childSnapshot.val().train;
        var destination = childSnapshot.val().destination;
        var frequency = childSnapshot.val().frequency;
        var nextArrival = childSnapshot.val().arrival;
        var minsAway = childSnapshot.val().minutes;
    
        // Log the value of the various properties
        console.log(train);
        console.log(destination);
        console.log(frequency);
        console.log(nextArrival);
        console.log(minsAway);

        // Adds new  rows and table data below the original table headings at the top
        var newRow = $("<tr>").append(
            $("<td>").text(train),
            $("<td>").text(destination),
            $("<td>").text(frequency),
            $("<td>").text(nextArrival),
            $("<td>").text(minsAway),
        );
        // Sends the data above to the table id fromDatabase
        $("#fromDatabase").append(newRow);
    });
})