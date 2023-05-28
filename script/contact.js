document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  var nameError = document.getElementById("nameError");
  var emailError = document.getElementById("emailError");
  var subjectError = document.getElementById("subjectError");
  var messageError = document.getElementById("messageError");

  var valid = true;

  if (name.length <= 5) {
    nameError.textContent = "Name must be more than 5 characters";
    valid = false;
  } else {
    nameError.textContent = "";
  }

  if (!validateEmail(email)) {
    emailError.textContent = "Invalid email address";
    valid = false;
  } else {
    emailError.textContent = "";
  }

  if (subject.length <= 15) {
    subjectError.textContent = "Subject must be more than 15 characters";
    valid = false;
  } else {
    subjectError.textContent = "";
  }

  if (message.length <= 25) {
    messageError.textContent = "Message must be more than 25 characters";
    valid = false;
  } else {
    messageError.textContent = "";
  }

  if (valid) {
    var successMessage = document.getElementById("successMessage");
    successMessage.textContent = "Your form submitted successfully.";

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Message:", message);
  }
});

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
