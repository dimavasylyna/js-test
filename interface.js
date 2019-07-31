window.onload = function() {
`use strict`
	
	//// INTERFACE test generate
	let addQuestionBtn = document.querySelector(`.add-question`);
	// контейнер, де все відбувається
	let creatorList = document.querySelector(`.creator__list`);
	// шаблон для клонування
	let creatorItem = document.querySelector(`.template--creator-item`).content.querySelector(`li`);
	let creatorAnswer = document.querySelector(`.template--answer`).content.querySelector(`li`);
	

	addQuestionBtn.addEventListener(`click`, function() {
		  addQuestion();
	});


	// додає новий блок створення запитання
	let addQuestion = () => {
		let newCreatorItem = creatorItem.cloneNode(true);
		creatorList.appendChild(newCreatorItem);
		
		// ставимо прослуховування кліку для створеного блоку
		newCreatorItem.addEventListener(`click`, function(e){
			let removeQuestionBtn = this.querySelector(`.remove-question`);
			let addAnswerBtn = this.querySelector(`.add-answer`);
			let copyBtn = this.querySelector(`.copy-answer`);
			if (e.target === removeQuestionBtn) {
				removeElement(this);
			} else if (e.target === addAnswerBtn) {
				addAnswer(this);
			} else if (e.target === copyBtn) {
				copyBlock(this);
			}
		});
	}

	let removeElement = (element) => {
		element.remove();
	}

	let copyBlock = (container) => {
		let cloneContainer = container.cloneNode(true);
		let removeQuestionBtn = cloneContainer.querySelector(`.remove-question`);
		let addAnswerBtn = cloneContainer.querySelector(`.add-answer`);
		let copyBtn = cloneContainer.querySelector(`.copy-answer`);
		let removeAnswerBtn = cloneContainer.querySelector(`.remove-answer`);


		cloneContainer.addEventListener(`click`, function(e) {
			if (e.target === removeAnswerBtn) {
				removeElement(cloneContainer);
			} else if (e.target === addAnswerBtn) {
				addAnswer(cloneContainer);
			} else if (e.target === copyBtn) {
				copyBlock(cloneContainer);
			}
		});
		creatorList.insertBefore(cloneContainer, container);
	}

	let addAnswer = (container) => {
		let addAnswerBtn = container.querySelector(`.answer-variant`);
		let answerVariantList = creatorAnswer.cloneNode(true);
		let removeAnswerBtn = answerVariantList.querySelector(`.remove-answer`);
		addAnswerBtn.appendChild(answerVariantList); 

		// ставимо прослуховування кліку для створеного варіанту відповіді
		answerVariantList.addEventListener(`click`, function(e) {
			if (e.target === removeAnswerBtn) {
				removeElement(this);
			}
		});
	}


	

};

