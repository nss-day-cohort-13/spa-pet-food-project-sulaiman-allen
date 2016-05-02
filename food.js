function afterLoad () {

	console.log("IN after load");
	var foodList = JSON.parse(this.responseText);

	if (foodList.dog_brands) {
		console.log("Dog");
		foodInject(foodList.dog_brands);
	} else {
		console.log(foodList)
		console.log("Cat");
	}

	

	// this listens for one of the buttons to be pressed and launches the function to delete it from the list
	// document.getElementById("playback").addEventListener("click", songDelete);
	// document.getElementById("playback").addEventListener("click", moreSongs);
}

function ifXHRFails() {
	console.log("loading of file failed");
}

function foodInject(foodList) {

	console.log("IN Foodinject");

	
	var content = document.getElementById("foodSquare");

	// inject food content back into the DOM
	for (entry in foodList) {

		var brand = '';
		var img = '';
		var foodTypes = '';
		var foodPrice = '';
		var foodSize = '';

		// Go through the loop and list each brand here
		for (type in foodList[entry].types) {
			for (item in foodList[entry].types[type].volumes) {
				brand = `<div id=foodBrands><h1>${foodList[entry].name}</h1>`;

				// Chose image for the product
				if (foodList[entry].name === "Chuck Wagon"){
					img = `<img src="img/chuck.jpg" id=foodImg>`
				} else if (foodList[entry].name === "Purina") {
					img = `<img src="img/purina.png" id=foodImg>`
				}

				foodTypes = `<div id=foodType>Type: ${foodList[entry].types[type].type}`;
				foodSize = `<ul id=foodList><li>Size: ${foodList[entry].types[type].volumes[item].name}</li>`;
				foodPrice = `<li>Price: ${foodList[entry].types[type].volumes[item].price}</li></ul></div></div>`;
				
				//output content here
				content.innerHTML += brand + img + foodTypes + foodSize + foodPrice;
			}
		}	
	}

	myRequest.open("GET", "catfood.json");

	myRequest.send();
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