chrome.commands.onCommand.addListener(function(command, tab) {
	console.log(command);
	chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
		switch (command) {
			case 'go-to-next':
				update(tab[0], 1);
				break;
			case 'go-to-previous':
				update(tab[0], -1);
				break;
		}
	});
});

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