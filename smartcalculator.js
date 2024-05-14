//  Author:Shree Dhar Acharya
//  Date:2023/04/15
//  Student ID:8899288
//  Group: 7
//  Application:Smart Calculator

$(document).ready(function () {
  // Only initialize Slick slider on the home page
  //auto sliding image carousel view
  if ($("body").hasClass("home")) {
    $(".slider").slick({
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev">Previous</button>',
      nextArrow: '<button type="button" class="slick-next">Next</button>',
    });
  }

  $("#principal").focus(); // Move cursor to the first input field
  //Simple interest calculation
  $("#calculate").click(function () {
    var principal = $("#principal").val();
    var rate = $("#rate").val();
    var years = $("#years").val();

    // validate input for principal
    if (principal == "") {
      alert("Please enter the principal amount.");
      return false;
    }
    if (isNaN(principal)) {
      alert("Please enter a valid number for the principal amount.");
      return false;
    }

    // validate input for rate
    if (rate == "") {
      alert("Please enter the interest rate.");
      return false;
    }
    if (isNaN(rate)) {
      alert("Please enter a valid number for the interest rate.");
      return false;
    }

    // validate input for years
    if (years == "") {
      alert("Please enter the term (in years).");
      return false;
    }
    if (isNaN(years)) {
      alert("Please enter a valid number for the term (in years).");
      return false;
    }

    rate = rate / 100;
    var interest = principal * rate * years;
    var total = parseFloat(principal) + parseFloat(interest);
    $("#result").html(
      "Interest: $" + interest.toFixed(2) + "<br>Total: $" + total.toFixed(2)
    );
  });

  // Calculate sales tax
  $("#calculate-tax").click(function () {
    // Validate input fields
    if ($("#price").val() == "" || isNaN($("#price").val())) {
      alert("Please enter a valid price.");
      return;
    }
    if ($("#tax-rate").val() == "" || isNaN($("#tax-rate").val())) {
      alert("Please enter a valid tax rate.");
      return;
    }

    // Calculate sales tax
    var price = parseFloat($("#price").val());
    var taxRate = parseFloat($("#tax-rate").val()) / 100;
    var salesTax = price * taxRate;
    var afterTax = price + salesTax;

    // Display results
    $("#sales-tax").html("Sales Tax: $" + salesTax.toFixed(2));
    $("#after-tax").html("After Tax Price: $" + afterTax.toFixed(2));
  });

  //weight calculation based on gender and height
  $("#calculate-weight").click(function () {
    var height = $("#height").val();
    var gender = $("#gender").val();

    // Check if height is a positive number
    if (isNaN(height) || height <= 0) {
      alert("Please enter a valid height.");
      return;
    }

    // Check if gender is selected
    if (gender === "") {
      alert("Please select your gender.");
      return;
    }

    // Calculate ideal weight based on gender and height
    var idealWeight;
    if (gender === "male") {
      idealWeight = (height - 100) * 0.9;
    } else {
      idealWeight = (height - 100) * 0.85;
    }

    $("#weight").text(
      "Your ideal weight is " + idealWeight.toFixed(2) + " kg."
    );
  });

  // body mass index calculation based on height and weight
  $("#calculate-bmi").click(function () {
    var height = $("#height").val();
    var weight = $("#weight").val();

    // Check if height is a positive number
    if (isNaN(height) || height <= 0) {
      alert("Please enter a valid height.");
      return;
    }

    // Check if weight is a positive number
    if (isNaN(weight) || weight <= 0) {
      alert("Please enter a valid weight.");
      return;
    }

    const bmi = (weight / ((height * height) / 10000)).toFixed(2);

    $("#bmi").html("Your BMI is " + bmi);
  });

  // Length unit convertion such as meter to cm, milimeter to foot
  const CONVERSION_FACTORS = {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    mile: 1609.344,
  };

  // Get input and output elements
  const inputValue = $("#input-value");
  const inputUnit = $("#input-unit");
  const outputUnit = $("#output-unit");
  const outputValue = $("#output-value");

  // Convert function
  function convert() {
    // Get input value and units
    const value = parseFloat(inputValue.val());
    const input = inputUnit.val();
    const output = outputUnit.val();

    // Convert input value to meters
    const meters = value * CONVERSION_FACTORS[input];

    // Convert meters to output units
    const result = meters / CONVERSION_FACTORS[output];

    // Display result
    outputValue.text("The converted length is " + result + " " + output);
  }

  // Reset function
  function reset() {
    inputValue.val("");
    outputValue.text("");
  }

  // Attach event handlers
  $("#convert-btn").click(convert);
  $("#reset-btn").click(reset);

  //age calculation from the date of birth
  $("#dob").datepicker({
    dateFormat: "yy-mm-dd",
    changeMonth: true,
    changeYear: true,
    maxDate: 0,
    yearRange: "c-100:c",
  });

  $("#calculate-age").click(function (evn) {
    evn.preventDefault();
    let dob = $("#dob").datepicker("getDate");
    if (dob) {
      let today = new Date();
      let age = calculateAge(dob, today);
      $("#age").text(
        "You are " +
          age.years +
          " years, " +
          age.months +
          " months, and " +
          age.days +
          " days old."
      );
    } else {
      $("#age").text("Please enter a valid date of birth.");
    }
  });

  function calculateAge(dob, today) {
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    if (months < 0 || (months == 0 && today.getDate() < dob.getDate())) {
      years--;
      months = months + 12;
    }

    if (days < 0) {
      months--;
      let monthdays = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      days = days + monthdays;
    }

    return { years: years, months: months, days: days };
  }

  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const data = { name, email, message };
    emailjs
      .send(
        "service_a701tti",
        "template_kiafs64",
        data,
        "user_71grJDF4CU0kQQdZsnnxM"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Thank you for contacting us!. we will get back to you soon");
          form.reset();
        },
        (error) => {
          console.error("FAILED...", error);
          alert("An error occurred. Please try again later.");
        }
      );
  });
});
