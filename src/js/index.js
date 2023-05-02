import isInViewport from "./isInViewport.js";

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

	//=======Blur/unblur sublist sections======================

	let sublists = document.querySelectorAll(".sublist");

	for (let sublist of sublists) {
		if(!isInViewport(sublist, "half")) {
			sublist.classList.add("sublist_blur");
		}

		isInViewport(sublist, "half", (isInViewport) => {
			if(isInViewport) {
				sublist.classList.remove("sublist_blur");
			}
			else {
				sublist.classList.add("sublist_blur");
			}
		});
	}

	//Add/remove menu links tabindex on resize
	const navLinks = document.querySelectorAll(".nav__link");

	if(window.innerWidth <= 786) {
		for (let link of navLinks) {
			link.setAttribute("tabindex", -1);
		}
	}

	window.addEventListener("resize", () => {
		if(window.innerWidth > 768) {
			for (let link of navLinks) {
				link.removeAttribute("tabindex");
			}
		}
		else if (window.innerWidth <= 786 && window.location.hash !== "#menu") {
			for (let link of navLinks) {
				link.setAttribute("tabindex", -1);
			}
		}
	}) 

	//Hide/show contact form labels
	const contactFormInputs = Array.from(document.querySelectorAll(".contact-form__input"));
	for(let input of contactFormInputs) {
		input.addEventListener("focus", hideInputLabel);
		input.addEventListener("blur", showInputLabel);
	}

	const contactFormMessage = document.querySelector(".contact-form__textarea");
	contactFormMessage?.addEventListener("focus", hideInputLabel);
	contactFormMessage?.addEventListener("blur", showInputLabel);
})

function openMenu() {
	document.body.classList.add("locked");

	const burger = document.querySelector(".burger");
	const menu = document.querySelector(".header__nav");

	burger.classList.add("burger_active");
	burger.onclick = closeMenu;

	burger.setAttribute("aria-label", "close menu (menu opened)");

	menu.classList.add("header__nav_active");

	const navLinks = document.querySelectorAll(".nav__link");
	for (let link of navLinks) {
		link.removeAttribute("tabindex");
	}
}

function closeMenu(e) {
	e.preventDefault();
	document.body.classList.remove("locked");

	const burger = document.querySelector(".burger");
	const menu = document.querySelector(".header__nav");

	burger.classList.remove("burger_active");
	burger.onclick = openMenu;

	burger.setAttribute("aria-label", "open menu (menu closed)");

	window.location.hash = '';
	
	menu.classList.remove("header__nav_active");

	const navLinks = document.querySelectorAll(".nav__link");
	for (let link of navLinks) {
		link.setAttribute("tabindex", -1);
	}
}

function openRetypePassword() {
	document.querySelector("#trial-form__retype-password").closest(".trial-form__field").classList.remove("trial-form__field_hidden");
}

function hideInputLabel(e) {
	const label = e.target.parentElement.querySelector("label");
	label?.classList.add("visibly-hidden");
}

function showInputLabel(e) {
	if(e.target.value === "") {
		const label = e.target.parentElement.querySelector("label");;
		label?.classList.remove("visibly-hidden");

		console.log(e.target.previousElementSibling);
	}
}