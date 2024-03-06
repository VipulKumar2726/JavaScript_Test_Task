// name

function validateName() {
  var name = document.getElementById("name").value;
  var nameError = document.getElementById("nameError");

  var nameCheck = /^[A-Za-z. ]{3,30}$/;

  if (nameCheck.test(name)) {
    nameError.innerHTML = "";
    enableSubmitButton(); // Enable the submit button
  } else {
    nameError.innerHTML = " ** please enter name  ";
    disableSubmitButton(); // Disable the submit button
  }
}

// ajax.js
async function loadUsernames() {
  try {
    const response = await fetch("/users.json"); // Replace with your JSON file path
    const data = await response.json();
    return data.usernames;
  } catch (error) {
    console.error("Error loading usernames:", error);
    return [];
  }
}

let existingUsernames = [];

// Load the usernames when the page is loaded
document.addEventListener("DOMContentLoaded", async () => {
  existingUsernames = await loadUsernames();
});

async function checkUsernameAvailability() {
  const usernameInput = document.getElementById("username");
  const availabilityMessage = document.getElementById("availabilityMessage");

  const username = usernameInput.value.trim();

  if (!username) {
    availabilityMessage.textContent = "Please enter a username.";
    return;
  }

  // Check if the username exists in the loaded data
  const isUsernameAvailable = !existingUsernames.includes(username);

  if (isUsernameAvailable) {
    availabilityMessage.textContent = "Username is available!";
    availabilityMessage.className = "text-success";
  } else {
    availabilityMessage.textContent =
      "Username is not available. Please choose another.";
    availabilityMessage.className = "text-danger";
  }
}
///password check

function checkPasswordStrength() {
  var userpass = document.getElementById("userpass");
  var msg = document.getElementById("msg");

  var minLength = 8; // Minimum length requirement
  var maxLength = 10; // Maximum length requirement

  var lengthScore =
    userpass.value.trim().length >= minLength &&
    userpass.value.trim().length <= maxLength
      ? 1
      : 0;
  var uppercaseScore = /[A-Z]/.test(userpass.value) ? 1 : 0;
  var lowercaseScore = /[a-z]/.test(userpass.value) ? 1 : 0;
  var numberScore = /\d/.test(userpass.value) ? 1 : 0;
  var specialCharScore = /[!@#$%^&*]/.test(userpass.value) ? 1 : 0;

  var totalScore =
    lengthScore +
    uppercaseScore +
    lowercaseScore +
    numberScore +
    specialCharScore;

  if (totalScore < 3 || userpass.value.trim().length > maxLength) {
    msg.innerHTML =
      " ** Password is Weak. Minimum requirements: " +
      minLength +
      " characters, at least one uppercase, one lowercase, one digit, and one special character. Maximum length: " +
      maxLength +
      " characters.";
    msg.style.color = "red";
    userpass.style.outline = "1px solid red";
    userpass.style.border = "none";
  } else if (totalScore < 5) {
    msg.innerHTML =
      "** Password is Average. Minimum requirements: " +
      minLength +
      " characters, at least one uppercase, one lowercase, one digit, and one special character. Maximum length: " +
      maxLength +
      " characters.";
    msg.style.color = "orange";
    userpass.style.outline = "1px solid orange";
    userpass.style.border = "none";
  } else {
    msg.innerHTML = "** Password is Strong";
    msg.style.color = "lightgreen";
    userpass.style.outline = "1px solid lightgreen";
    userpass.style.border = "none";
  }
}

function checkPasswordMatch() {
  var userpass = document.getElementById("userpass");
  var confirmPass = document.getElementById("confirmPass");
  var matchMsg = document.getElementById("matchMsg");

  if (userpass.value === confirmPass.value) {
    matchMsg.innerHTML = "Passwords match";
    matchMsg.style.color = "lightgreen";
    confirmPass.style.outline = "1px solid lightgreen";
    confirmPass.style.border = "none";
  } else {
    matchMsg.innerHTML = "Passwords do not match";
    matchMsg.style.color = "red";
    confirmPass.style.outline = "1px solid red";
    confirmPass.style.border = "none";
  }
}

// UserName validation

async function validateUsername() {
  var username = document.getElementById("username").value;
  var usererror = document.getElementById("usererror");

  var usercheck = /^[A-Za-z. ]{3,30}$/;

  if (usercheck.test(username)) {
    usererror.innerHTML = "";
    // Check username availability using AJAX
    const isAvailable = await checkUsernameAvailability(username);
    if (isAvailable) {
      usererror.innerHTML = "";
      enableSubmitButton(); // Enable the submit button
    } else {
      usererror.innerHTML = " ** username is not available ";
      disableSubmitButton(); // Disable the submit button
    }
  } else {
    usererror.innerHTML = " **  please enter username ";
    disableSubmitButton(); // Disable the submit button
  }
}

function checkUsernameAvailability(username) {
  // Simulate an AJAX request to check username availability
  // Replace this with an actual AJAX call to your server-side endpoint
  return new Promise((resolve) => {
    setTimeout(() => {
      const isAvailable = Math.random() > 0.5; // Simulating server response
      resolve(isAvailable);
    }, 500);
  });
}

function enableSubmitButton() {
  document.getElementById("submitButton").disabled = false;
}

function disableSubmitButton() {
  document.getElementById("submitButton").disabled = true;
}

//date of birth

function validateDOB() {
  var dob = document.getElementById("dob").value;
  var dobError = document.getElementById("dobError");

  // Check if a valid date is entered
  if (!Date.parse(dob)) {
    dobError.innerHTML = " ** Invalid date format";
    disableSubmitButton(); // Disable the submit button
    return;
  }

  // Calculate age based on the entered date
  var currentDate = new Date();
  var enteredDate = new Date(dob);
  var age = currentDate.getFullYear() - enteredDate.getFullYear();

  // Check if the user is at least 18 years old
  if (age < 18) {
    dobError.innerHTML = " ** Must be at least 18 years old";
    disableSubmitButton(); // Disable the submit button
  } else {
    dobError.innerHTML = "";
    enableSubmitButton(); // Enable the submit button
  }
}

function enableSubmitButton() {
  document.getElementById("submitButton").disabled = false;
}

function disableSubmitButton() {
  document.getElementById("submitButton").disabled = true;
}

//Phone number validation

function validatePhoneNumber() {
  var phoneNumber = document.getElementById("number").value;
  var numberError = document.getElementById("numberError");

  // Validate that the phone number includes a country code
  var phoneRegex = /^[6789][0-9]{9}$/;

  if (phoneRegex.test(phoneNumber)) {
    numberError.innerHTML = "";
    enableSubmitButton(); // Enable the submit button
  } else {
    numberError.innerHTML = " ** Invalid phone number format";
    disableSubmitButton(); // Disable the submit button
  }
}

///email check

var emailcheck = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

function validateEmail() {
  var email = document.getElementById("email").value;
  var emailError = document.getElementById("emailerror");

  if (emailcheck.test(email)) {
    emailError.innerHTML = "";
    enableSubmitButton(); // Enable the submit button
  } else {
    emailError.innerHTML = " ** Invalid email format";
    disableSubmitButton(); // Disable the submit button
  }
}

function validateConfirmEmail() {
  var email = document.getElementById("email").value;
  var confirmEmail = document.getElementById("confirmEmail").value;
  var emailMatchError = document.getElementById("emailMatchError");

  if (email === confirmEmail) {
    emailMatchError.innerHTML = "";
    enableSubmitButton(); // Enable the submit button
  } else {
    emailMatchError.innerHTML = " ** Email addresses do not match";
    disableSubmitButton(); // Disable the submit button
  }

  //terms and submit
  function validateForm() {
    var termsCheckbox = document.getElementById("termsCheckbox");
    var checkboxError = document.getElementById("checkboxError");

    if (!termsCheckbox.checked) {
      checkboxError.innerHTML = " ** Please accept the Terms and Conditions";
      return false;
    } else {
      checkboxError.innerHTML = "";
      return true;
    }
  }
}

///////onsubmit popup

function handleFormSubmission() {
  // Perform any form validation if needed

  // Show an alert indicating successful form submission
  alert("Form submitted successfully!");

  // Prevent the default form submission behavior
  return false;
}
