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
	
	function toggleNextGamer(currentGamer) {
		if (currentGamer === 'X') {
			return 'O';
		} else {
			return 'X';
		}
	}
	
	
	function clickField() {
		this.innerHTML = currentGamer;
		
		stopFieldListener(this);
		
		currentGamer = toggleNextGamer(currentGamer);
		
		const winner = checkWinner(fields);
		
		if (!!winner) {
			gameOver({ fields, winner });
		}
	}
	
	
	
	/**
	 * Checks all fields and returns a winner if the combination matched when comparing arrays or false
	 * @param fields
	 * @returns {"", "X", "O", "draw"}
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
		
		const countCurrentFields = 8;
		let countFilledFields = 0;
		
		function fieldComparison (combination) {
				return fields[ combination[ 0 ] ].innerHTML === fields[ combination[ 1 ] ].innerHTML
				&& fields[ combination[ 0 ] ].innerHTML === fields[ combination[ 2 ] ].innerHTML
				&& fields[ combination[ 0 ] ].innerHTML !== ""
		}
		
		/**
		 * Checks the availability of fields fields for the game
		 * @param field
		 * @returns {boolean}
		 */
		function allFieldsFilled(field) {
				return field.innerHTML !== ''
		}
		
		for (let i = 0, combinationLength = winningCombinations.length; i < combinationLength; i++) {
			const combination = winningCombinations[ i ];
			
			if (fieldComparison(combination)) {
				return fields[ combination[ 0 ] ].innerHTML;
			}
			
			if (allFieldsFilled(fields[ i ])) {
				countFilledFields += 1
			}
		}
		
		if (countCurrentFields === countFilledFields) {
			return "draw"
		}
		
		return "";
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
		if (winner !== "Draw") {
			alert(winner + " is winner");
		} else {
			alert('Draw game');
		}
	}

})();