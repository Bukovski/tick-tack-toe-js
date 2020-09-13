(function () {

	const table = document.getElementById("fields");
	const fields = table.getElementsByTagName("td");
	
	let currentGamer = "X";
	
	for (let i = 0; i < fields.length; i++) {
		fields[ i ].addEventListener("click", tdClick);
	}
	
	function tdClick(event) {
		this.innerHTML = currentGamer;
		
		this.removeEventListener("click", tdClick);
		
		checkWinner();
		
		if (currentGamer === "X") {
			currentGamer = "O";
		} else {
			currentGamer = "X";
		}
	}
	
	function checkWinner() {
		if (
			fields[ 0 ].innerHTML === fields[ 1 ].innerHTML
			&& fields[ 0 ].innerHTML === fields[ 2 ].innerHTML
		) {
			console.log("Winner", currentGamer)
		}
	}



	console.log("loaded");
})();