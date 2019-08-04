window.onload = function() {
`use strict`
	let endTestBtn = document.querySelector(`.end-create-test`);
	//// INTERFACE test generate
	let addQuestionBtn = document.querySelector(`.add-question`);
	// контейнер, де все відбувається
	let creatorList = document.querySelector(`.creator__list`);
	// шаблон для клонування
	let creatorItem = document.querySelector(`.template--creator-item`).content.querySelector(`li`);
	let creatorAnswer = document.querySelector(`.template--answer`).content.querySelector(`li`);
	
	let addOrRemoveEndTestBtn = () => {
		if (creatorList.innerHTML.trim().length > 0) {
			endTestBtn.classList.remove(`hidden`);
		} else {
			endTestBtn.classList.add(`hidden`);
		}
	}

	addQuestionBtn.addEventListener(`click`, function() {
		  addQuestion();
		addOrRemoveEndTestBtn();
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
				addOrRemoveEndTestBtn();
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
		// робимо клон блоку
		let cloneContainer = container.cloneNode(true);
		// вставляємо клон блоку в документ після його оригіналу
		container.parentNode.insertBefore(cloneContainer, container.nextSibling);
		// знаходимо клон блоку в документі
		cloneContainer.addEventListener(`click`, function(e){
			let removeQuestionBtn = this.querySelector(`.remove-question`);
			let addAnswerBtn = this.querySelector(`.add-answer`);
			let copyBtn = this.querySelector(`.copy-answer`);

			if (e.target === removeQuestionBtn) {
				removeElement(this);
				addOrRemoveEndTestBtn();
			} else if (e.target === addAnswerBtn) {
				addAnswer(this);
			} else if (e.target === copyBtn) {
				copyBlock(this);
			}
		});

		//  при клонуванні блоку з уже існуючими варіантами відповіді, навішуємо
		//  на їх кнопки також подію для видалення
		let copyAnswerList = cloneContainer.querySelectorAll(`.remove-answer`);
		copyAnswerList.forEach(btn=>{
			btn.addEventListener(`click`, function(e){
				let answerItem = this.closest(`.answer`);
				removeElement(answerItem);
			});
		});
	}

	let addAnswer = (container) => {
		let addAnswerList = container.querySelector(`.answer-variant`);
		let answerVariantItem = creatorAnswer.cloneNode(true);
		let removeAnswerBtn = answerVariantItem.querySelector(`.remove-answer`);
		addAnswerList.appendChild(answerVariantItem); 
		
		// ставимо прослуховування кліку для створеного варіанту відповіді
		answerVariantItem.addEventListener(`click`, function(e) {
			if (e.target === removeAnswerBtn) {
				removeElement(this);
			}
		});
	}


	

	

};

