function afterLoad () {

	console.log("IN after load");
	var foodList = JSON.parse(this.responseText);

	foodInject(foodList);

	// this listens for one of the buttons to be pressed and launches the function to delete it from the list
	// document.getElementById("playback").addEventListener("click", songDelete);
	// document.getElementById("playback").addEventListener("click", moreSongs);
}

function ifXHRFails() {
	console.log("loading of file failed");
}

function foodInject(foodList, brands, foodTypes, foodPrice, foodSize) {

	
	var content = document.getElementById("foodSquare");

	// inject food content back into the DOM
	for (entry in foodList.dog_brands) {

		var brand = '';
		var img = '';
		var foodTypes = '';
		var foodPrice = '';
		var foodSize = '';

		// Go through the loop and list each brand here
		for (type in foodList.dog_brands[entry].types) {

			// foodTypes += `<div id=foodType>${foodList.dog_brands[entry].types[type].type}`;

			for (item in foodList.dog_brands[entry].types[type].volumes) {
				brand = `<div id=foodBrands><h1>${foodList.dog_brands[entry].name}</h1>`;

				if (foodList.dog_brands[entry].name === "Chuck Wagon"){
					img = `<img src="img/chuck.jpg" id=foodImg>`
				} else if (foodList.dog_brands[entry].name === "Purina") {
					img = `<img src="img/purina.png" id=foodImg>`
				}

				foodTypes = `<div id=foodType>Type: ${foodList.dog_brands[entry].types[type].type}`;
				foodSize = `<ul id=foodList><li>${foodList.dog_brands[entry].types[type].volumes[item].name}</li>`;
				foodPrice = `<li>${foodList.dog_brands[entry].types[type].volumes[item].price}</li></ul></div></div>`;
				
				//output content here

				content.innerHTML += brand + img + foodTypes + foodSize + foodPrice;
			}
		}

		// content.innerHTML += brand + foodTypes + foodSize + foodPrice;
	
	}
}

// Create an XHR object
var myRequest = new XMLHttpRequest();

// XHR objects emit events when their operation is complete, or an error occurs
myRequest.addEventListener("load", afterLoad);
myRequest.addEventListener("error", ifXHRFails);

// Then tell the XHR object exactly what to do
myRequest.open("GET", "dogfood.json");

// Tell the XHR object to start
myRequest.send();