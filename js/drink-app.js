
var drinkApp = {};

drinkApp.init = function(){
//code to kick off app goes here/ event handlers go here
	

	$(".sweet").on("click", function (e){
		e.preventDefault();
		drinkApp.getDrinks("sweet");
		// the "sweet" string is passed into query in getDrinks()
		$(".pageSuggestions").show();
	});

	$(".sour").on("click", function (e){
		e.preventDefault();
		drinkApp.getDrinks("sour");
		// the "sour" string is passed into query in getDrinks()
		$(".pageSuggestions").show();
	});

	$(".bitter").on("click", function (e){
		e.preventDefault();
		drinkApp.getDrinks("bitter");
		// the "bitter" string is passed into query in getDrinks()
		$(".pageSuggestions").show();
	});
};

drinkApp.getDrinks = function(query){

	var parametersToSend = {};

	if (query=="sweet") {
		parametersToSend = {
			q: "cocktails",
			"allowedCourse[]": "course^course-Beverages",
			maxResult: 20,
			start: 0,
			'flavor.sweet.min': 0.8,
			'flavor.sweet.max': 1 
		}
	};

	if (query=="sour") {
		parametersToSend = {
			q: "cocktails",
			"allowedCourse[]": "course^course-Beverages",
			maxResult: 20,
			start: 0,
			'flavor.sour.min': 0.8,
			'flavor.sour.max': 1 
		}
	};

	if (query=="bitter") {
		parametersToSend = {
			q: "cocktails",
			"allowedCourse[]": "course^course-Beverages",
			maxResult: 20,
			start: 0,
			'flavor.bitter.min': 0.8,
			'flavor.bitter.max': 1 
		}
	};


	//Make a request to the server to get our list of drinks (but we have to wait for that response)
	$.ajax({
		url: "http://api.yummly.com/v1/api/recipes?_app_id=ad0101db&_app_key=8f2727d7b1dc61d591aa890a0b75e635",
		type: "GET",
		data: parametersToSend,
		dataType: "jsonp",
		success: function(result){
			//Server comes back and gives us a list (result)
			drinkApp.displayDrinks(result.matches);
		}
	});
};

drinkApp.displayDrinks = function(data){
//Display Drinks

	$(".cocktailDrinks").empty();
	
	$.each(data, function(i, drink){
	// goes through list and give it a name of drink
		var imageLarge = ""; 

		var name = $("<h2>").text(drink.recipeName);
		var image = $("<img>").attr("src", drink.imageUrlsBySize["90"]);
		var placeholder = $("<div>").addClass("placeholder").append(image);
		
		var ingredients = $("<p>").text("Ingredients: " + drink.ingredients.join(", "));
		// .join joins all items in an array
		var drinkRecipe = $("<li>").addClass("cocktail").append(placeholder, name, ingredients);

		$(".cocktailDrinks").append(drinkRecipe);
	});

	var $container = $('.pageSuggestions');
	// init
	// $container.isotope({
	//   // options
	//   itemSelector: '.cocktail',
	//   // layoutMode: 'masonryHorizontal',
	//   layoutMode: 'fitRows'
	// });


	$container.isotope({
	  itemSelector: '.cocktail',
	  layoutMode: 'masonry',
	});

	// $(".pageHome").slideUp();
	// $(".pageSuggestions").slideDown();
};


$(document).ready(function(){
	 drinkApp.init();
});
