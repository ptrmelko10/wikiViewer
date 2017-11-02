window.onload = function() {
	var search = document.getElementById("searchButton");
	search.onclick = handleSearch;
};

function handleSearch() {
	var searchResults = document.getElementById("searchResults");
	while(searchResults.firstChild) {
		searchResults.removeChild(searchResults.firstChild);
	}

	var searchTerm = document.getElementById("searchTerm").value;
	getResults(searchTerm);
}

function getResults(term) {
	var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + term + "&namespace=0&limit=10";
	$.ajax({
		type: "GET",
		url: url,
		dataType: "jsonp",
		success: function(data) {
			displayResults(data);
		}
	});
}

function displayResults(data) {
	var searchResults = data;
	var title = 1;
	var description = 2;
	var url = 3;
	var parentDiv = document.getElementById("searchResults");

	for(var i = 0; i < searchResults[title].length; i++) {

		var newP = document.createElement("p");
		newP.setAttribute("class", "description")
		newP.setAttribute("style", "white-space: normal; text-align: left;")
		newP.innerHTML = searchResults[description][i];

		var newH4 = document.createElement("h4");
		newH4.setAttribute("class", "resultTitle");
		newH4.innerHTML = searchResults[title][i];

		var newDiv = document.createElement("div");
		newDiv.setAttribute("class","resultBody text-center well");

		var newButton = document.createElement("a");
		newButton.setAttribute("class", "btn btn-default btn-block searchResult");
		newButton.setAttribute("href", searchResults[url][i]);
		newButton.setAttribute("target", "_blank");
		newButton.setAttribute("role", "button");

		newDiv.appendChild(newH4);
		newDiv.appendChild(newP);
		newButton.appendChild(newDiv);
		parentDiv.appendChild(newButton);
	}

}
