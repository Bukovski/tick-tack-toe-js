(function () {

	const table = document.getElementById("table");
	const fields = table.getElementsByTagName("td");
	
	let currentGamer = "X";
	
	activateFields(fields);
	
	
	function activateFields(fields) {
		for (let i = 0; i < fields.length; i++) {
			fields[ i ].addEventListener("click", clickField);
		}
	}
	
	function getNextGamer(currentGamer) {
		if (currentGamer === 'X') {
			return 'O';
		} else {
			return 'X';
		}
	}
	
	function clickField(event) {
		this.innerHTML = currentGamer;
		
		this.removeEventListener("click", clickField);
		
		checkWinner(fields);
		
		currentGamer = getNextGamer(currentGamer);
	}
	
	function checkWinner(fields) {
		const winningCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			
			[0, 4, 8],
			[2, 4, 6]
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