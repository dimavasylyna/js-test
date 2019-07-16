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
		setClassCounter(`.creator__item`, `q`);
		// ставимо прослуховування кліку для створеного блоку
		newCreatorItem.addEventListener(`click`, function(e){
			let removeQuestionBtn = this.querySelector(`.remove-question`);
			let addAnswerBtn = this.querySelector(`.add-answer`);

			if (e.target === removeQuestionBtn) {
				removeElement(this);
				setClassCounter(`.creator__item`, `q`);
			} else if (e.target === addAnswerBtn) {
				addAnswer(this);
			}
		});
	}

	let removeElement = (element) => {
		element.remove();
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


	let setClassCounter = (classForSearch, addClassName) => {
		let elements = document.querySelectorAll(classForSearch);
		elements.forEach((el, i)=>{
			
			console.log(el.className.match(/q\d+/g));
					
			
			el.classList.add(`${addClassName}${i+1}`);

		});
	}

};

