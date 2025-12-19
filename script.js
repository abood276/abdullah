// Get button and title elements
const button = document.getElementById("myButton");
const title = document.getElementById("title");

// Add click event
button.addEventListener("click", function () {
    title.textContent = "Button Clicked!";
    alert("You clicked the button!");
});
