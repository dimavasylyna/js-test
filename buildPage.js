`use strict`
{
	let endTestBuildBtn = document.querySelector(`.end-create-test`);
	let resultDOM = document.querySelector(`.template--result-page`).content;
	let testList = resultDOM.querySelector(`.test__list`);

	// ф-ція збереження даних в файл
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

	// клік на end-create-test
	endTestBuildBtn.addEventListener(`click`, function() {
		// очищаємо обєкт для оновлення даних
		testDataObject = {};
		// оновлюємо дані обєкта
		let allDataObject = findAllData();
		if (testList.innerHTML.length > 0) {
			// очищаємо розмітку
			testList.innerHTML = ``;
		}
		if (!isValide(allDataObject)) {
			return false;
		}
		// оновлюємо розмітку
		generateQuestions();
		console.log(testDataObject);

		generateTestPage(allDataObject);
	});

	


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
		if (testDataObject[qNum][`answer`]) {
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
	
	
	let generateTestPage = (allDataObject) => {
		// контейнер DOM, де буде зберігатися обєкт з даними
		let dataObjectDOM = resultDOM.querySelector(`.test-data-object-box`);
		dataObjectDOM.querySelector(`.test-data-object`).innerHTML = JSON.stringify(allDataObject);

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
	}


}