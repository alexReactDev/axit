function isInViewport(element, mode="brink", callback) {
	let top = element.getBoundingClientRect().top;

	if(callback) {
		window.addEventListener("scroll", () => {
			top = element.getBoundingClientRect().top;
			callback(helper());
		})

		window.addEventListener("resize", () => {
			top = element.getBoundingClientRect().top;
			callback(helper());
		})
	}
	else {
		return helper();
	}

	function helper() {
		if(mode === "brink") {
			return  top < document.documentElement.clientHeight && top > element.clientHeight - element.clientHeight * 2 + 1 ? true : false;
		}
		else if(mode === "half") {
			return top + element.clientHeight / 2 <= document.documentElement.clientHeight && top > element.clientHeight - element.clientHeight * 1.5 ? true : false;
		}
		else if(mode === "all") {
			return top + element.clientHeight <= document.documentElement.clientHeight && top > 0 ? true : false;
		}
	}
}

export default isInViewport;