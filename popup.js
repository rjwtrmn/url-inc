document.addEventListener('DOMContentLoaded', function () {
	let next = document.getElementById("next");
	let previous = document.getElementById("previous");
	next.addEventListener("click", function () {
		chrome.runtime.sendMessage({ action: "go-to-next" }, function () {});
	});
	previous.addEventListener("click", function () {
		chrome.runtime.sendMessage({ action: "go-to-previous" }, function () {});
	});
});