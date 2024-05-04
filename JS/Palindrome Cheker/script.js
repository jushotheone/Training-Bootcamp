// Select relevant DOM elements

const button = document.querySelector("#btn");
const inputText = document.querySelector("#input-text")
const result = document.querySelector("#result");

// Add event listener to the button
button.addEventListener("click", () => {
    // Get the input value and trim any whitespaces
    const text = inputText.value.trim();
    
    // check if the input is empty
    if (text.length == 0) {
        //show an alert if the input is empty
        alert("Please enter a text to check if it is a palindrome");
        return; // exit the function
    }
    // Remove any non-alphanumeric characters from the input text and convert to lowercase
    const cleanText = text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    // check if the clean text is a palindrome by comparing the original and reversed strings
    const isPalindrome = cleanText === cleanText.split("").reverse("").join("");
    
    // create a message
    const message = isPalindrome
        ? `<span> Yes.</span> It is a palindrome`
        : `<span> No.</span> It is not a palindrome`;

    // display the message
    result.innerHTML = message
    result.classListremove("error", "success");
    setTimeout(() => {
        result.classList.add(isPalindrome ? "success" : "error");
    }, 10);
});
