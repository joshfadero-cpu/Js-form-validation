// 1. Selecting all elements
const form = document.getElementById("registrationForm");
const fullName = document.getElementById("fullName");
const age = document.getElementById("age");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const feedbackMessage = document.getElementById(`feedback-message`);

//2. Event Listener
// Without this, the form would submit and refresh the page
form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateInputs();
});

// Real-time validation on blur event
fullName.addEventListener(`blur`, validateFullName);
age.addEventListener(`blur`, validateAge);
email.addEventListener("blur", validateEmail);
password.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);

// 3. Helper Functions
// For setError
function setError(element, message) {
  const inputGroup = element.parentElement;
  const errorDisplay = inputGroup.querySelector("small");

  errorDisplay.innerText = message; // Show error message
  inputGroup.classList.add("error"); //Add red styling from css
  inputGroup.classList.remove("success"); // Remove green styling from css
}

// For setSuccess
function setSuccess(element) {
  const inputGroup = element.parentElement;
  const errorDisplay = inputGroup.querySelector("small");

  errorDisplay.innerText = ""; // Clear error message
  inputGroup.classList.add("success"); // Add green styling from css
  inputGroup.classList.remove("error"); // Remove red styling from css
}

// 4. Validation Function
function validateFullName() {
  const fullNameValue = fullName.value.trim();
  if (fullNameValue === "") {
    setError(fullName, "Full Name is required");
    return false;
  }

  // Split by spaces and check if at least two words
  const words = fullNameValue.split(" ").filter((word) => word.length > 0); // Filter out empty strings
  // Check if there are at least two words
  if (words.length < 2) {
    setError(fullName, "Please enter at least first and last name");
    return false;
  } else {
    setSuccess(fullName);
    return true;
  }
}

// 5. Email validation function
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//Breaking it down:
// ^[^\s@]+     : Start with one or more characters that are not whitespace or '@'
// @            : Followed by a single '@' symbol
// [^\s@]+      : Then one or more characters that are not whitespace or '@'
// \.           : Followed by a literal dot '.'
// [^\s@]+$     : Ends with one or more characters that are not whitespace or '@'

function validateEmail() {
  const emailValue = email.value.trim();
  if (emailValue === "") {
    setError(email, "Email is required");
    return false;
  } else if (!emailPattern.test(emailValue)) {
    setError(email, "Please enter a valid email address");
    return false;
  } else {
    setSuccess(email);
    return true;
  }
}

// 6. Password validation function
function validatePassword() {
  const passwordValue = password.value.trim(); // Trim whitespace

  // Check if password is empty
  if (passwordValue === "") {
    setError(password, "Password is required");
    return false;
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be at least 8 characters");
    return false;
  }

  //Check for upercase letter
  else if (!/[A-Z]/.test(passwordValue)) {
    setError(password, "Password must contain at least one uppercase letter");
    return false;
  }

  // Check for number
  else if (!/[0-9]/.test(passwordValue)) {
    setError(password, "Password must contain at least one number");
    return false;
  }

  // Check for special character
  else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
    setError(password, "Password must contain at least one special character");
    return false;
  }

  // If all checks pass
  else {
    setSuccess(password);
    return true;
  }
}

// 7. Confirm Password validation function
function validateConfirmPassword() {
  const confirmPasswordValue = confirmPassword.value.trim();
  // Cross-field validation - Validating one field based on another field's value
  const passwordValue = password.value.trim();

  if (confirmPasswordValue === "") {
    // Check if confirm password is empty
    setError(confirmPassword, "Please confirm your password");
    return false;
  } else if (confirmPasswordValue !== passwordValue) {
    // Check if passwords match
    setError(confirmPassword, "Passwords do not match");
    return false; // Passwords do not match
  }

  // If passwords match
  else {
    setSuccess(confirmPassword);
    return true; // Passwords match
  }
}

// 8. Age validation function

function validateAge() {
  const ageValue = age.value.trim();

  if (ageValue === "") {
    // Check if age is empty
    setError(age, "Age is required");
    return false;
  }

  // Convert to number and check if at least 18
  const ageNumber = parseInt(ageValue);

  // Check if age is a number and at least 18
  if (isNaN(ageNumber) || ageNumber < 18) {
    // isNaN checks if the value is not a number
    setError(age, "You must be at least 18 years old");
    return false;
  } else {
    setSuccess(age);
    return true;
  }
}

// 9. Main validation function
function validateInputs() {
  // Run all validation functions and store results
  const isFullNameValid = validateFullName();
  const isAgeValid = validateAge();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();

  // Check if all validations passed
  const isFormValid =
    isFullNameValid &&
    isAgeValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  // If form is valid, show success message
  if (isFormValid) {
    feedbackMessage.innerText = "Registration Successful! Welcome aboard!";
    feedbackMessage.className = "success-message"; // Apply success styling

    // reset the form after successful submission
    setTimeout(() => {
    form.reset();
      feedbackMessage.innerText = "";
      feedbackMessage.className = "";

      // Clear success and error styles
      document.querySelectorAll(".form-group").forEach((group) => {
        group.classList.remove("success");
        group.classList.remove("error");
      });
    }, 3000); // Clear message after 3 seconds
  } else {

    // If form is not valid, clear any previous success message
    feedbackMessage.textContent = "";
    feedbackMessage.className = "";
  }
}
