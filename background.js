chrome.commands.onCommand.addListener(function(command, tab) {
	resolveAndPerformUpdate(command);
});

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
	resolveAndPerformUpdate(request.action);
	return true;
});

function resolveAndPerformUpdate(action) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
		switch (action) {
			case "go-to-next":
				update(tab[0], 1);
				break;
			case "go-to-previous":
				update(tab[0], -1);
				break;
		}
	});
}

function update(tab, increment) {
	chrome.tabs.update(tab.id, {url: getIncrementedUrl(tab.url, increment)});
}

function getIncrementedUrl(url, increment) {
	var numericEnding = url.match(/\d+$/)[0];
	if (!isNaN(numericEnding)) {
		return url.substring(0, url.lastIndexOf(numericEnding)) + (Number(numericEnding) + increment).toString();
	}
	return url;
}