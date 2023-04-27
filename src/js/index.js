"use strict"
window.addEventListener("load", () => {
	const burger = document.querySelector(".burger");
	burger.onclick = openMenu;

	const tabs = document.querySelectorAll(".tabs__link");
	for (let tab of tabs) {
		tab.onclick = tabsChange;
	}

	const itemsList = document.querySelector(".tabs__controls-list");
	let itemWidth = (itemsList.clientWidth - 1 * (itemsList.children.length - 2)) / (itemsList.children.length - 1);
	let itemsListOffset = 0;

	function tabsChange(e) {
		e.preventDefault();
		const link = e.target.closest(".tabs__link");
		itemsListOffset = +link.href.match(/.$/) - 1;
		const activeShield = document.querySelector(".tabs__active");

		if(window.innerWidth > 1023) {
			activeShield.style.top = `${(110 + 1) * (itemsListOffset)}px`;
		}
		else {
			activeShield.style.left = `${(itemWidth + 1) * (itemsListOffset)}px`;
		}

		document.querySelector(".tabs__tab_active")?.classList.remove("tabs__tab_active");
		document.querySelector(`${link.href.match(/#.+/)}`)?.classList.add("tabs__tab_active");
	}

	window.addEventListener("resize", () => {
		const activeShield = document.querySelector(".tabs__active");

		itemWidth = (itemsList.clientWidth - 1 * (itemsList.children.length - 2)) / (itemsList.children.length - 1);

		if(window.innerWidth <= 1023) {
			activeShield.style.left = `${itemWidth * itemsListOffset + 1 * itemsListOffset}px`;
			activeShield.style.top = "0px";
		}
		else {
			activeShield.style.top = `${110 * itemsListOffset + 1 * itemsListOffset}px`;
			activeShield.style.left = "0px";
		}
	})

	document.getElementById("city-tabs-1").classList.add("tabs__tab_active");
	document.querySelector(".tabs__active").style.display = "block";

	const trialFormPassword = document.querySelector("#trial-form__password");
	trialFormPassword.addEventListener("input", openRetypePassword);

	const trialFormInputs = document.querySelectorAll(".trial-form__input");
	for (let input of trialFormInputs) {
		input.addEventListener("focus", hideInputLabel);
		input.addEventListener("blur", showInputLabel);
	}
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

function openRetypePassword() {
	document.querySelector("#trial-form__retype-password").closest(".trial-form__field").classList.remove("trial-form__field_hidden");
}

function hideInputLabel(e) {
	const label = e.target.previousElementSibling;
	label.classList.add("trial-form__label_hidden");
}

function showInputLabel(e) {
	if(e.target.value === "") {
		const label = e.target.previousElementSibling;
		label.classList.remove("trial-form__label_hidden");
	}
}