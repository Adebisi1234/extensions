const button = document.createElement("button");
button.style.padding = "12px";
button.style.backgroundColor = "black";
button.style.color = "white";
button.style.textAlign = "center";
button.style.position = "absolute";
button.style.inset = "50%";
button.style.width = "fit-content";
button.style.height = "fit-content";
button.textContent = "Hi there I'm listening to this button";

button.addEventListener("click", () => {
  alert("Click event listener was added");
  // document.body.removeChild(button)
});
console.log("hello from chrome extension");

// document.readyState === "complete"
document.body.insertBefore(button, document.body.firstElementChild);
