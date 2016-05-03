function afterLoad () {

	var foodList = JSON.parse(this.responseText);

	// Load the dog list in
	if (foodList.dog_brands) {
		foodInject(foodList.dog_brands);

		//Load catfood file
		myRequest.open("GET", "catfood.json");
		myRequest.send();
		
	} else { // Or load the cat list
		foodInject(foodList.brands)
	}
}

function ifXHRFails() {
	console.log("loading of file failed");
}

function foodInject(foodList) {

	var content = document.getElementById("foodSquare");

	// inject food content back into the DOM
	for (entry in foodList) {

		var brand = '';
		var img = '';
		var foodTypes = '';
		var foodPrice = '';
		var foodSize = '';
		var breeds = '';

		// Go through the loop and list each brand here
		for (type in foodList[entry].types) {
			for (item in foodList[entry].types[type].volumes) {
				brand = `<div id=foodBrands><h1>${foodList[entry].name}</h1>`;

				// Chose image for the product
				if (foodList[entry].name === "Chuck Wagon"){
					img = `<img src="img/chuck.jpg" id=foodImg>`
				} else if (foodList[entry].name === "Purina") {
					img = `<img src="img/purina.png" id=foodImg>`
				} else if (foodList[entry].name === "Purrina") {
					img = `<img src="img/purrina.png" id=foodImg>`
				} else {
					img = `<img src="img/meowmeal.jpg" id=foodImg>`
				}
				// If catfood is chosen, the breeds need to be added to the product
				if (foodList[entry].breeds){
					breeds = `<ul>`;
					for (var i = 0; i < foodList[entry].breeds.length; i++) {
						breeds += `<li>${foodList[entry].breeds[i]}</li>`;
					}
					breeds += `</ul>`;
				}

				foodTypes = `<div id=foodType>Type: ${foodList[entry].types[type].type}`;
				foodSize = `<ul id=foodList><li>Size: ${foodList[entry].types[type].volumes[item].name}</li>`;
				foodPrice = `<li>Price: ${foodList[entry].types[type].volumes[item].price}</li></ul></div></div>`;
				
				//output content here
				content.innerHTML += brand + img + breeds + foodTypes + foodSize + foodPrice;
			}
		}
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