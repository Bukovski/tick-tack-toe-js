(function () {
	
	const FIELDS = {
		CELLS: document.getElementById("table").getElementsByTagName("td"),
		RESTART_BUTTON: document.getElementById('restart'),
		CURRENT_GAMER: document.getElementById('current-gamer')
	}
	
	
	const toggleGamer = (function () {
		let currentGamer = "X"; // default gamer
		let nextGamer = "";
		
		return function () {
			nextGamer = currentGamer;
			currentGamer = (currentGamer === 'X') ? "O" : "X";
			
			return {
				current: currentGamer,
				next: nextGamer
			}
		}
	})()
	
	
	function clickField() {
		const currentGamer = toggleGamer();
		
		this.innerHTML = currentGamer.current;
		
		stopFieldListener(this);
		showCurrentGamer(currentGamer.next);
		
		const winner = checkWinner(FIELDS.CELLS);
		
		if (!!winner) {
			gameOver({ fields: FIELDS.CELLS, winner });
		}
	}
	
	function activateFields(fields) {
		for (let i = 0; i < fields.length; i++) {
			fields[ i ].innerHTML = '';
			fields[ i ].addEventListener("click", clickField);
		}
	}
	
	function startGame() {
		const currentGamer = toggleGamer();
		
		activateFields(FIELDS.CELLS);
		showCurrentGamer(currentGamer.next);
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
	
	function stopFieldListener(field) {
		field.removeEventListener('click', clickField);
	}
	
	function stopFieldListeners(fields) {
		for (let i = 0; i < fields.length; i++) {
			stopFieldListener(fields[ i ]);
		}
	}
	
	function showWinner(winner) {
		if (winner !== "draw") {
			alert(winner + " is winner");
		} else {
			alert('Draw game');
		}
	}
	
	function showCurrentGamer(gamer) {
		FIELDS.CURRENT_GAMER.innerHTML = gamer;
	}
	
	function gameOver({ fields, winner }) {
		stopFieldListeners(fields);
		showWinner(winner);
		showCurrentGamer("-");
	}
	
	
	startGame();
	
	FIELDS.RESTART_BUTTON.addEventListener('click', startGame);
	
})();