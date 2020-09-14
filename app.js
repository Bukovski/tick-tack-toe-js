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
		const winningCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		
		function fieldComparison (combination, callback) {
			if (
				fields[ combination[ 0 ] ].innerHTML === fields[ combination[ 1 ] ].innerHTML
				&& fields[ combination[ 0 ] ].innerHTML === fields[ combination[ 2 ] ].innerHTML
				&& fields[ combination[ 0 ] ].innerHTML !== ""
			) {
				callback();
			}
		}
		
		for (let i = 0, combinationLength = winningCombinations.length; i < combinationLength; i++) {
			const combination = winningCombinations[ i ];
			
			fieldComparison(combination, function () {
				console.log("Winner", currentGamer)
			});
		}
		
		
	}



	console.log("loaded");
})();