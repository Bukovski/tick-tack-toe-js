(function () {

	const table = document.getElementById("table");
	const fields = table.getElementsByTagName("td");
	
	
	activateFields(fields);
	
	
	function activateFields(fields) {
		for (let i = 0; i < fields.length; i++) {
			fields[ i ].addEventListener("click", clickField);
		}
	}
	
	
	let currentGamer = "X";
	
	function getNextGamer(currentGamer) {
		if (currentGamer === 'X') {
			return 'O';
		} else {
			return 'X';
		}
	}
	
	
	function clickField(event) {
		this.innerHTML = currentGamer;
		
		stopFieldListener(this);
		
		currentGamer = getNextGamer(currentGamer);
		
		const winner = checkWinner(fields);
		
		if (winner || allFieldsFilled(fields)) {
			gameOver({ fields, winner });
		}
	}
	
	function allFieldsFilled(fields) {
		for (let i = 0; i < fields.length; i++) {
			if (fields[ i ].innerHTML === '') {
				return false;
			}
		}
		
		return true;
	}
	
	/**
	 * Checks all fields and returns a winner if the combination matched when comparing arrays or false
	 * @param fields
	 * @returns {false, "X", "O"}
	 */
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
		
		
		function fieldComparison (combination) {
				return fields[ combination[ 0 ] ].innerHTML === fields[ combination[ 1 ] ].innerHTML
				&& fields[ combination[ 0 ] ].innerHTML === fields[ combination[ 2 ] ].innerHTML
				&& fields[ combination[ 0 ] ].innerHTML !== ""
		}
		
		for (let i = 0, combinationLength = winningCombinations.length; i < combinationLength; i++) {
			const combination = winningCombinations[ i ];
			
			if (fieldComparison(combination)) {
				return fields[ combination[ 0 ] ].innerHTML;
			}
		}
		
		return false;
	}
	
	function gameOver({ fields, winner }) {
		showWinner(winner);
		stopFieldListeners(fields);
		
	}
	
	function stopFieldListener(field) {
		field.removeEventListener('click', clickField);
	}
	
	function stopFieldListeners(fields) {
		for (let i = 0; i < fields.length; i++) {
			stopFieldListener(fields[ i ]);
		}
	}
	
	function showWinner(winner) {
		if (winner !== false) {
			alert(winner + " is winner");
		} else {
			alert('Draw game');
		}
	}


	console.log("loaded");
})();