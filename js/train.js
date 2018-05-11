

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDbz4JVNBfslXUTpQTBJQYdvZyCT76m10o",
    authDomain: "trainscheduler-13d72.firebaseapp.com",
    databaseURL: "https://trainscheduler-13d72.firebaseio.com",
    projectId: "trainscheduler-13d72",
    storageBucket: "",
    messagingSenderId: "20397537095"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrain").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#destination").val().trim();
    var trainStart = moment($("#firstTrain").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#frequency").val().trim();

    firebase.database().ref().push({
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      frequency: trainFrequency
    });
    $("input").val("");
  });

  database.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;

    var difference = moment().diff(moment.unix(trainStart), "HH:mm");
    var timeLeft = moment().diff(moment.unix(trainStart), "minutes") % trainFrequency;
    var mins = moment(trainFrequency - timeLeft, "minutes").format("mm");
    var minutesAway = moment().add(mins, "minutes").format("HH:mm");

    var trainPlacement = $("#trainTable tbody");
    var trainRowCell = $("<tr>");
    var trainLineCell = $("<th class='trainLineCell'><p>" + trainName + "</p></th>");
    var trainDestCell = $("<td class='desinationCell'><p>" + trainDestination + "</p></td>");
    var trainFreqCell = $("<td class='freqCell'><p>" + trainFrequency + "</p></td>");
    var trainMinAwayCell = $("<td class='minAwayCell'><p>" + minutesAway + "</p></td>");
    var trainMinCell = $("<td class='minCell'><p>:" + mins + " mins</p></td>");
    trainRowCell.append(trainLineCell, trainDestCell, trainFreqCell, trainMinAwayCell, trainMinCell);
    trainPlacement.append(trainRowCell);
    // colorizeTrain();
    $(".trainLineCell p").each(function(){
      var color = $(this).text();
      $(this).css("background-color", color);
      // if ($(this).text() === 'yellow' || 'pink'){
      //   $(this).css("color", "black")
      // }
      // if ($(".trainLineCell p").text() === 'yellow' || 'pink'){
      //   $(this).css("color", "black", "background-color", color);
      // } else {
      //   $(this).css("background-color", color);
      // }
      // if ($(".trainLineCell p").css('background-color') === 'yellow') {
      //   $(".trainLineCell p").css("color", "black");
      //   console.log("background color is running");
      // }
      // var bg = $(".trainLineCell p").css('background-color');
      //
      // if (bg !== 'yellow') {
      //     $(".trainLineCell p").css('color', 'black');
      // }
      // else {
      //     $(".trainLineCell p").css('color', 'white');
      // }
    });
  });
