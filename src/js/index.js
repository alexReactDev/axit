"use strict"
window.addEventListener("load", () => {
	const burger = document.querySelector(".burger");
	burger.onclick = openMenu;
})

function openMenu() {
	const burger = document.querySelector(".burger");
	const menu = document.querySelector(".header__nav");
	burger.classList.add("burger_active");
	menu.classList.add("header__nav_active");
	burger.onclick = closeMenu;
}

function closeMenu() {
	const burger = document.querySelector(".burger");
	const menu = document.querySelector(".header__nav");
	burger.classList.remove("burger_active");
	menu.classList.remove("header__nav_active");
	burger.onclick = openMenu;
}