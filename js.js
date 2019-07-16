window.onload = function() {
`use strict`

	let addQuestionBtn = document.querySelector(`.add-question`);
	let endTestBtn = document.querySelector(`.end-create-test`);
	// контейнер, де все відбувається
	let creatorList = document.querySelector(`.creator__list`);
	// шаблон для клонування
	let creatorItem = document.querySelector(`.template--creator-item`).content.querySelector(`li`);
	let creatorAnswer = document.querySelector(`.template--answer`).content.querySelector(`li`);
	// основний обєкт, куди зберігатиметься вся інфа
	let testDataObject = {};
	let resultDOM = document.querySelector(`.template--result-page`).content;
	let testList = resultDOM.querySelector(`.test__list`);

	//////////// РОБОТА З ІНТЕРФЕЙСОМ //////////////////

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

			if (e.target === removeQuestionBtn) {
				removeElement(this);
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





	// реалізація збереження сторінки в файлі
	let  download = (data, filename, type) => {
	    var file = new Blob([data], {type: type});
	    if (window.navigator.msSaveOrOpenBlob) // IE10+
	        window.navigator.msSaveOrOpenBlob(file, filename);
	    else { // Others
	        var a = document.createElement("a"),
	                url = URL.createObjectURL(file);
	        a.href = url;
	        a.download = filename;
	        document.body.appendChild(a);
	        a.click();
	        setTimeout(function() {
	            document.body.removeChild(a);
	            window.URL.revokeObjectURL(url);  
	        }, 0); 
	    }
	}






	/////////////// РОБОТА З ДАНИМИ /////////////////////


	endTestBtn.addEventListener(`click`, function() {
		
		let dataObjectDOM = document.querySelector(`.template--result-page`).content.querySelector(`.test-data-object-box`);
		
		dataObjectDOM.querySelector(`.test-data-object`).innerHTML = JSON.stringify(findAllData());

		window.renderTest();
		let beforeContainer = `<!DOCTYPE html> 
				<html lang="en"> 
					<head> 
						<meta charset="UTF-8"> 
						<title>Document</title> 
						
					</head> 
					<body>`;
		let afterContainer = `</body></html>`;
		let container = resultDOM.querySelector(`.container-here`).innerHTML;
		let styles = resultDOM.querySelector(`.styles-here`).innerHTML;
		let scripts = resultDOM.querySelector(`.script-here`).innerHTML;
		// зберігаємо сторінку в файл
		download(`${beforeContainer}${container}${afterContainer}${styles}${scripts}${dataObjectDOM.innerHTML}`, `index`, `text/html`);
	});


	// шукає всі дані в блоці запитання
	let findAllData = () => {
		let allQuestionBlocks = document.querySelectorAll(`.creator__item`);
		
		allQuestionBlocks.forEach(function(el, index) {
			createQuestionObject(index);

			testDataObject[`q${index+1}`][`question`] = findQuestionText(el);
			testDataObject[`q${index+1}`][`answer`] = findAnswerTextList(el);

			let rightAnswerTextList = findRightAnswerTextList(el);
			if (rightAnswerTextList.length != 0) {
				testDataObject[`q${index+1}`][`rightAnswer`] = rightAnswerTextList;
			}
		});
		return testDataObject;
		
		
	}

	let createQuestionObject = (index) => {
		testDataObject[`q${index+1}`] = {};
	}
	// вертає текст запитання в блоці запитання
	let findQuestionText = (element) => {
		let questionText = element.querySelector(`.question-text`);
		return questionText.value.trim();
	}
	// вертає список варіантів відповіді в блоці запитання
	let findAnswerTextList = (element) => {
		let answerTextList = [...element.querySelectorAll(`.answer-text`)].map((el)=>el.value.trim());
		return answerTextList;
	}
	// вертає список вірних відповідей в блоці запитання
	let findRightAnswerTextList = (element) => {
		let checkedList = [...element.querySelectorAll('.right-answer input:checked')];
		let rightAnswerTextList = checkedList.map((el)=>{
			return el.closest('.answer').querySelector('.answer-text').value.trim();
		});
		return rightAnswerTextList;
	}

	


	window.renderTest = () => {


	let createElement = (elType, ...classList) => {
		let element = document.createElement(elType);
		classList.forEach((className)=>{
			element.classList.add(className);
		});
		return element
	}


	// створення li.question__block
	let createQuestionBlock = (qNum) => {
		// створюємо li.question__block
		let questionBlock = createElement(`li`, `question__block`, `${qNum}`);
		testList.appendChild(questionBlock);

		// створюємо p.question__text
		let questionText = createElement(`p`, `question__text`);
		questionText.textContent = testDataObject[qNum].question;
		questionBlock.appendChild(questionText);

		// Якщо є тестові варіанти відповіді
		if (testDataObject[qNum][`rightAnswer`]) {
			// проходимось по масиву obj[qNum].answer
			testDataObject[qNum].answer.forEach((answerElement, i)=> {
				let answerVariant = createElement(`div`, `answer-variant`);
		
				let checkbox = createElement(`input`);
				checkbox.type = `checkbox`;
				checkbox.id = `${qNum}a${i + 1}`;
				checkbox.value = testDataObject[qNum].answer[i];
				answerVariant.appendChild(checkbox);

				let label = createElement(`label`, `answer`);
				label.setAttribute(`for`, `${qNum}a${i + 1}`);
				label.textContent = testDataObject[qNum].answer[i]
				answerVariant.appendChild(label);
				
				questionBlock.appendChild(answerVariant);
			});
				
			
			
		} else {
			let answerLabel = createElement(`label`, `answer`);
			let textarea = createElement(`textarea`);
			answerLabel.appendChild(textarea);
			questionBlock.appendChild(answerLabel);
		}
	}


	

	let generateQuestions = () => {
		for (let q in testDataObject) {
			createQuestionBlock(q);
		}
	}
	
	
	generateQuestions();

	
};








};

