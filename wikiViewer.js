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

		var newDiv = document.createElement("diV");
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
/*
Example Return:
[
    "boston",
    [
        "Boston",
        "Boston Marathon bombing",
        "Boston Red Sox",
        "Boston Celtics",
        "Boston University",
        "Boston Bruins",
        "Boston College",
        "Boston Tea Party",
        "Boston (band)",
        "Boston Marathon"
    ],
    [
        "Boston (pronounced /\u02c8b\u0252st\u0259n/ BOSS-t\u0259n) is the capital and most populous city of the Commonwealth of Massachusetts in the United States.",
        "On April 15, 2013, two homemade bombs detonated 12 seconds and 210 yards (190 m) apart at 2:49 p.m., near the finish line of the annual Boston Marathon, killing three people and injuring several hundred others, including 16 who lost limbs.",
        "The Boston Red Sox are an American professional baseball team based in Boston, Massachusetts. The Red Sox compete in Major League Baseball (MLB) as a member club of the American League (AL) East division.",
        "The Boston Celtics (/\u02c8s\u025blt\u026aks/) are an American professional basketball team based in Boston, Massachusetts.",
        "Boston University (commonly referred to as BU) is a private research university located in Boston, Massachusetts.",
        "The Boston Bruins are a professional ice hockey team based in Boston, Massachusetts. They are members of the Atlantic Division of the Eastern Conference of the National Hockey League (NHL).",
        "Boston College (also referred to as BC) is a private Jesuit Catholic research university located in the village of Chestnut Hill, Massachusetts, United States, 6 miles (9.7 km) west of downtown Boston.",
        "The Boston Tea Party was a political protest by the Sons of Liberty in Boston, on December 16, 1773. The demonstrators, some disguised as Native Americans, in defiance of the Tea Act of May 10, 1773, destroyed an entire shipment of tea sent by the East India Company.",
        "Boston is an American rock band from Boston, Massachusetts, that achieved their most notable successes during the 1970s and 1980s.",
        "The Boston Marathon is an annual marathon hosted by several cities in greater Boston in eastern Massachusetts, United States."
    ],
    [
        "https://en.wikipedia.org/wiki/Boston",
        "https://en.wikipedia.org/wiki/Boston_Marathon_bombing",
        "https://en.wikipedia.org/wiki/Boston_Red_Sox",
        "https://en.wikipedia.org/wiki/Boston_Celtics",
        "https://en.wikipedia.org/wiki/Boston_University",
        "https://en.wikipedia.org/wiki/Boston_Bruins",
        "https://en.wikipedia.org/wiki/Boston_College",
        "https://en.wikipedia.org/wiki/Boston_Tea_Party",
        "https://en.wikipedia.org/wiki/Boston_(band)",
        "https://en.wikipedia.org/wiki/Boston_Marathon"
    ]
]

*/