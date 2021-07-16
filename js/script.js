$(document).ready(function () {
  //Global Variables
  var score = 0;
  var attempts = localStorage.getItem("total_attempts"); // web storage

  //Event Listener
  $("button").on("click", gradeQuiz);

  displayQ4Choices();
  displayQ6Choices();
  displayQ9Choices();

  //functions
  function isFormValid() {
    let isValid = true;
    if ($("#q1").val().trim() == "") {
      isValid = false;
      $("#validationFdbk").html("Question 1 was not answered!");
    }

    if ($('#q7-1').val().trim() == ""
      || $('#q7-2').val().trim() == "") {
      $("#validationFdbk").append("<br>Question 7 was not answered!");
    }
    return isValid;
  } //isFormValid

  function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);

    for (let i = 0; i < q4ChoicesArray.length; i++) {
      $("#q4Choices").append(`<input type="radio" name="q4" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}"><label for="${q4ChoicesArray[i]}">${q4ChoicesArray[i]} </label>`);
    }
  } //displayQ4Choices

  function displayQ6Choices() {
    q6ChoicesArray = [
      "Aloha State",
      "Sooner State",
      "Cornhusker State",
      "Gem State"];

    q6ChoicesArray = _.shuffle(q6ChoicesArray);
    q6ChoicesArray.unshift("Select one");

    for (let i = 1; i <= 3; i++) {
      for (let j = 0; j < q6ChoicesArray.length; j++) {
        $(`#q6-${i}`).append(`<option value="${q6ChoicesArray[j]}">${q6ChoicesArray[j]}</option>`);
      }
    }
  } //displayQ6Choices

  function displayQ9Choices() {
    let statesArray = ['Alabama', 'Arizona', 'Arkansas', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    let q9ChoicesArray = ["California", "Texas", "Alaska"];

    for (let i = 0; i < 6; i++) {
      let randomIndex = Math.floor(Math.random() * statesArray.length);
      q9ChoicesArray.push(statesArray.pop(randomIndex));
    }
    q9ChoicesArray = _.shuffle(q9ChoicesArray);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let choice = q9ChoicesArray.pop();
        $('#q9Choices').append(`<input type="checkbox" id="${choice}"> <label for="${choice}">${choice}</label>`)
      }
      $('#q9Choices').append("<br>");
    }
  } //displayQ9Choices

  function rightAnswer(index) {
    $(`#q${index}Feedback`).html("Correct!");
    $(`#q${index}Feedback`).attr("class", "bg-success text-white");
    $(`#markImg${index}`).html("<img src='img/checkmark.png'>");
    score += 10;
  } //rightAnswer

  function wrongAnswer(index) {
    $(`#q${index}Feedback`).html("Incorrect!");
    $(`#q${index}Feedback`).attr("class", "bg-warning text-white");
    $(`#markImg${index}`).html("<img src='img/xmark.png'>");
  } //wrongAnswer

  function gradeQuiz() {
    $("#validationFdbk").html(""); //resets validation feedback
    if (!isFormValid()) {
      return;
    }

    //variables
    score = 0;
    let q1Response = $("#q1").val().toLowerCase();
    let q2Response = $("#q2").val();
    let q4Response = $("input[name=q4]:checked").val();
    let q8Response = $('#q8').val();
    let q10Response = $("input[name=q10]:checked").val();

    //Grading question 1
    if (q1Response == "sacramento") {
      rightAnswer(1);
    }
    else {
      wrongAnswer(1);
    }

    // Grading question 2
    if (q2Response == "mo") {
      rightAnswer(2);
    }
    else {
      wrongAnswer(2);
    }

    //Grading question 3
    if ($("#Jefferson").is(":checked")
      && $("#Roosevelt").is(":checked")
      && $("#Jackson").is(":checked")
      && $("#Franklin").is(":checked")
    ) {
      rightAnswer(3);
    }
    else {
      wrongAnswer(3);
    }

    //Grading question 4
    if (q4Response == "Rhode Island") {
      rightAnswer(4);
    }
    else {
      wrongAnswer(4);
    }

    //Grading question 5
    if ($('#q5-1').val() == "Alaska"
      && $('#q5-2').val() == "Mount Denali"
    ) {
      rightAnswer(5);
    }
    else {
      wrongAnswer(5);
    }

    //Grading question 6
    if ($('#q6-1').val() == "Cornhusker State"
      && $('#q6-2').val() == "Gem State"
      && $('#q6-3').val() == "Sooner State"
    ) {
      rightAnswer(6);
    }
    else {
      wrongAnswer(6);
    }

    //Grading question 7
    if ($("#q7-1").val().toLowerCase().trim() == "oklahoma"
      && $("#q7-2").val().toLowerCase().trim() == "roosevelt"
    ) {
      rightAnswer(7);
    }
    else {
      wrongAnswer(7);
    }

    //Grading question 8
    q8Response == "1959-08-21" ? rightAnswer(8) : wrongAnswer(8);

    //Grading question 9
    if ($("#Alaska").is(":checked")
      && $("#California").is(":checked")
      && $("#Texas").is(":checked")
    ) {
      rightAnswer(9);
    }
    else {
      wrongAnswer(9);
    }

    //Grading question 10
    q10Response == "opt-1" ? rightAnswer(10) : wrongAnswer(10);

    $("#totalScore").html(`Total Score: ${score}`);

    // Change color of score and display congratulation message if score > 80
    if(score >= 80) {
      $("#totalScore").removeClass().addClass("text-success");
      $("#totalScore").append("<br>Congratulations! You have score well on the quiz!");
    }
    else {
      $("#totalScore").removeClass().addClass("text-danger");
    }

    //web storage
    $("#totalAttempts").html(`Total Attempts: ${++attempts}`);
    localStorage.setItem("total_attempts", attempts);
  } //gradeQuiz


}); //ready