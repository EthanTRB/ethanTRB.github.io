/*
Name: Ethan Bascombe
File: main.js
Date: 29 July 2026
Description: JavaScript for an interactive image gallery.
*/

const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

const imageAlts = {
  "pic1.jpg": "Closeup of a human eye",
  "pic2.jpg": "Rock that looks like a wave",
  "pic3.jpg": "Purple and white pansies",
  "pic4.jpg": "Section of wall from a pharaoh's tomb",
  "pic5.jpg": "Large moth on a leaf",
};

for (let i = 1; i <= 5; i++) {
  const newImage = document.createElement("img");

  const imageName = `pic${i}.jpg`;
  const imageSource =
    `https://mdn.github.io/shared-assets/images/examples/learn/gallery/${imageName}`;

  newImage.setAttribute("src", imageSource);
  newImage.setAttribute("alt", imageAlts[imageName]);

  thumbBar.appendChild(newImage);

  newImage.addEventListener("click", (event) => {
    displayedImage.src = event.target.src;
    displayedImage.alt = event.target.alt;
  });
}

btn.addEventListener("click", () => {
  const buttonClass = btn.getAttribute("class");

  if (buttonClass === "dark") {
    btn.setAttribute("class", "light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgb(0 0 0 / 50%)";
  } else {
    btn.setAttribute("class", "dark");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgb(0 0 0 / 0%)";
  }
});