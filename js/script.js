// Sets first form field "name" in focus
const nameField = document.getElementById("name");
nameField.focus();

// Hides other job input until the 'other option' is selected

const jobRole = document.getElementById("title");
const otherJob = document.getElementById("other-job-role");
otherJob.style.display = "none";
jobRole.addEventListener("change", function (e) {
  // e.preventDefault();

  if (e.target.value === "other") {
    otherJob.style.display = "inline-block";
  } else {
    otherJob.style.display = "none";
  }
});

// Disables color options until a theme is chosen, then shows color available for each theme

const designSection = document.getElementById("design");
const colorSection = document.getElementById("color");
const colorKids = colorSection.children;

colorSection.disabled = true;

designSection.addEventListener("change", function (e) {
  // e.preventDefault();
  colorSection.disabled = false;
  let currentDesign = e.target.value;

  for (let i = 0; i < colorKids.length; i++) {
    let colorKidTheme = colorKids[i].getAttribute("data-theme");

    if (currentDesign == colorKidTheme) {
      // Only showing the options that match the current data-theme
      // console.log('I did it');

      colorKids[i].hidden = false;
      colorKids[i].setAttribute("selected", true);
    } else {
      //hiding non matches
      colorKids[i].hidden = true;
      colorKids[i].removeAttribute("selected", false);
    }
  }
});

// Register checked items and add totals

const activities = document.getElementById("activities");
const activityCostElement = document.getElementById("activities-cost");
const activityNoneElement = document.getElementById("activities-hint");

let totalCost = 0;

activities.addEventListener("change", function (e) {
  // e.preventDefault();
  let activityCost = parseInt(e.target.getAttribute("data-cost"));

  // got cost, but it hasn't been added to the total yet ^^
  if (e.target.checked) {
    totalCost += activityCost;
  } else {
    totalCost -= activityCost;
  }

  activityCostElement.innerHTML = `Total: $${totalCost}`;
});

// Preferred payment options shown, all others hidden

const preferredPayment = document.getElementById("payment");
const card = document.getElementById("credit-card");
const payPal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

payPal.hidden = true;
bitcoin.hidden = true;
preferredPayment.children[1].setAttribute("selected", true);

preferredPayment.addEventListener("change", function (e) {
  switch (e.target.value) {
    case "credit-card":
      card.hidden = false;
      payPal.hidden = true;
      bitcoin.hidden = true;
      break;
    case "paypal":
      payPal.hidden = false;
      card.hidden = true;
      bitcoin.hidden = true;
      break;
    case "bitcoin":
      bitcoin.hidden = false;
      card.hidden = true;
      payPal.hidden = true;
  }
});

// Form Validation - prevent submission if 1+ fields is entered incorrectly

const form = document.querySelector("form");
// nameField
const email = document.getElementById("email");
// activities
const cardNo = document.getElementById("cc-num");
const zip = document.getElementById("zip");
const cvv = document.getElementById("cvv");



// Begin submit event 
form.addEventListener("submit", function (e) {

  // e.preventDefault();
  // -----> validations

  // name isn't blank
  let nameVal = nameField.value;
  let nameTest = /\S/;
  let isNameValid = nameTest.test(nameVal);
  validIndividually(isNameValid, nameField);

  // email --> properly formatted
  let emailVal = email.value;
  let emailTest = /^[^@]+@[^@]+\.[^@]+$/i;
  let isEmailValid = emailTest.test(emailVal);

  
  

  validIndividually(isNameValid, email);

  // activity - at least one selected (This is true if a cost is associated with an activity  )

  let isActValid;
  if (totalCost > 0) {
    isActValid = true;
  } else {
    isActValid = false;
  }

  validIndividually(isActValid, activities.firstElementChild);

  // elseif Data -day-and time  isActValid false

  //card no. 13-16 digits, reformat to 4 sets of 4?
  if (preferredPayment.value === "credit-card") {
    let cardVal = cardNo.value;
    let cardTest = /^\d{13,16}$/;
    let isCardValid = cardTest.test(cardVal);
    validIndividually(isCardValid, cardNo);

    // // zip code ... 5 digits {5}
    let zipVal = zip.value;
    let zipTest = /^\d{5}$/;
    let isZipValid = zipTest.test(zipVal);
    validIndividually(isZipValid, zip);

    // // cvv code  3 digits {3}
    let cvvVal = cvv.value;
    let cvvTest = /^\d{3}$/;
    let isCvvValid = cvvTest.test(cvvVal);
    validIndividually(isCvvValid, cvv);
  } else {
    isCardValid = true;
    isZipValid = true;
    isCvvValid = true;
  
  }

  if (
    isEmailValid == false ||
    isZipValid == false ||
    isCvvValid == false ||
    isCardValid == false ||
    isActValid == false ||
    isNameValid == false
  ) {
    e.preventDefault();
    console.log('invalid');
   
  } 
  else {
    console.log("success");
  }

  // Field Indicator
  function validIndividually(field, element) {
    if (field === false) {
      element.parentElement.classList.add("not-valid");
      element.parentElement.classList.remove("valid");
      element.parentElement.lastElementChild.style.display = 'inline-block';
    } else {
      element.parentElement.classList.add("valid");
      element.parentElement.classList.remove("not-valid");
      element.parentElement.lastElementChild.style.display = 'none';
    }
  }
});

// OnFocus

let activeInput = document.querySelectorAll("#activities input");
for (let i = 0; i < activeInput.length; i++) {
  activeInput[i].addEventListener("blur", function () {
    activeInput[i].parentElement.classList.remove("focus");
  });
  activeInput[i].addEventListener("focus", function () {
    activeInput[i].parentElement.classList.add("focus");
  });
}
