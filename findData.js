`use strict`
{
	
	// основний обєкт, куди зберігатиметься вся інфа по тесту
	window.testDataObject = {};
	// шукає всі дані в блоці запитання
	window.findAllData = () => {
		let allQuestionBlocks = document.querySelectorAll(`.creator__item`);
		
		allQuestionBlocks.forEach(function(el, index) {
			createQuestionObject(index);

			testDataObject[`q${index+1}`][`question`] = findQuestionText(el);
			
			
			let answerTextList = findAnswerTextList(el);
			if (answerTextList.length != 0) {
				testDataObject[`q${index+1}`][`answer`] = answerTextList;
			}

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

	setInterval(findAllData, 1000);
}
