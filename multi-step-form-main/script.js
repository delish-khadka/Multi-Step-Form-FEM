let currentStep = 1;
let selectedPlan = null;
let selectedBillingType = "monthly";

function showStep(step) {
  debugger;
  // // Hide all steps

  const allSteps = document.querySelectorAll(".form-step");
  console.log(allSteps); // Log the selected elements
  allSteps.forEach((stepElement) => {
    stepElement.classList.remove("current-step");
  });
  // Show the specified step
  document.getElementById(`step${step}`).classList.add("current-step");
}

function validateStep(step) {
  debugger;
  // Simple validation, you can customize this based on your requirements
  const currentStepElement = document.getElementById(`step${step}`);
  const inputs = currentStepElement.querySelectorAll("input, textarea");

  let isValid = true;

  inputs.forEach((input) => {
    if (input.checkValidity() === false) {
      isValid = false;
      alert(`Please enter a valid ${input.name}.`);
    }
  });

  if (isValid) {
    if (step < 4) {
      currentStep++;
      showStep(currentStep);
    } else {
      // You can submit the form or perform final actions here
      alert("Form submitted successfully!");
    }
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
  }
}

function selectPlan(plan) {
  debugger;
  selectedPlan = plan;
  updateCost(selectedPlan, selectedBillingType);

  // Remove the 'selected' class from all plans
  document.querySelectorAll(".plan").forEach((planElement) => {
    planElement.classList.remove("selected");
  });

  // Add the 'selected' class to the clicked plan
  const clickedPlanElement = document.querySelector(`.plan[data-plan="${plan}"]`);
  clickedPlanElement.classList.add("selected");
}

function toggleBillingOption() {
  debugger;
  const toggleSwitch = document.querySelector(".toggle-switch input");
  selectedBillingType = toggleSwitch.checked ? "yearly" : "monthly";

  // Log to check if the function is being called
  console.log("Toggle Billing Option:", selectedBillingType);

  // Iterate over all plan elements and update their display based on the selected billing type
  const planElements = document.querySelectorAll(".plan");
  planElements.forEach((planElement) => {
    const monthlyCostElement = planElement.querySelector(".monthly-cost");
    const yearlyCostElement = planElement.querySelector(".yearly-cost");

    if (selectedBillingType === "monthly") {
      monthlyCostElement.style.display = "block";
      yearlyCostElement.style.display = "none";
    } else {
      monthlyCostElement.style.display = "none";
      yearlyCostElement.style.display = "block";
    }
  });

  // Check if a plan is selected before calling updateCost
  if (selectedPlan) {
    updateCost(selectedPlan, selectedBillingType);
  }
}

function updateCost(plan, billingType = "monthly") {
  debugger;
  const monthlyCostElements = document.querySelectorAll(`.plan[data-plan="${plan}"][data-billing="monthly"]`);
  const yearlyCostElements = document.querySelectorAll(`.plan[data-plan="${plan}"][data-billing="yearly"]`);

  if (billingType === "monthly") {
    monthlyCostElements.forEach((element) => (element.style.display = "block"));
    yearlyCostElements.forEach((element) => (element.style.display = "none"));
  } else {
    monthlyCostElements.forEach((element) => (element.style.display = "none"));
    yearlyCostElements.forEach((element) => (element.style.display = "block"));
  }
  // Display the selected plan and price in the next section
  debugger;

  document.getElementById("selectedPlanDisplay").textContent = `${billingType} ${plan}`;

  // Get the plan element
  const planElement = document.querySelector(`.plan[data-plan="${plan}"]`);

  if (planElement) {
    // Extract the price from the innerText
    const priceText = planElement.innerText;
    const priceMatch = priceText.match(/\$\d+/); // Match the dollar sign and digits

    const selectedPriceDisplay = document.getElementById("pricePlanDisplay");
    if (priceMatch && priceMatch.length > 0 && selectedPriceDisplay) {
      document.getElementById("pricePlanDisplay").textContent = priceMatch[0];
    } else {
      document.getElementById("pricePlanDisplay").textContent = "Price not available";
    }
  } else {
    document.getElementById("pricePlanDisplay").textContent = "Price not available";
  }
}
