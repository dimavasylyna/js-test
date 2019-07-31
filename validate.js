window.isValide = (obj) => {
// console.log(obj);
	
	let hasEmpty = (arr)=> {
		if (arr) {
			let result = arr.some((elem)=>{
				return elem.length === 0;
			});
			return result;
		}
		
	}

	let checkObjAnswer = (obj) => {
		for (let q in obj) {
			if (hasEmpty(obj[q].answer)) {
				return false;
			}
		}
		return true;
	}

	let checkObjRightAnswer = (obj) => {
		for (let q in obj) {
			if (obj[q].answer && !obj[q].rightAnswer) {
				return false;
			}
		}
		return true;
	}

	let checkObjQuestion = (obj) => {
		let numberErrorList = [];
		for (let q in obj) {
			// якщо є пусте поле, то додаємо його номер в масив numberErrorList
			if (obj[q].question.length === 0) {	
				numberErrorList.push(q.match(/\d+/)[0]);
			} 
		}
		if (numberErrorList.length > 0) {
			return {
				numberErrorList: numberErrorList,
				result: false
			}
		} else {
			return {
				result: true
			}
		}
	}
	
let checkObjQuestionRes = checkObjQuestion(obj);


// ф-ція, яка дає класи невалідним елементам
// elementClass - клас елементів, які будуть перевірятися і їм же додаватиметься клас error
// numberErrorListOfQuestionBlock - масив номерів невалідних питань
let addClassError = (elementClass, numberErrorListOfQuestionBlock) => {
	let questionBlockList = document.querySelectorAll(elementClass);
	questionBlockList.forEach((questionBlock)=>{
		questionBlock.classList.remove(`error`);
	});
	numberErrorListOfQuestionBlock.forEach((num)=>{
		questionBlockList[num - 1].classList.add(`error`);
	});
}





	
	if (Object.keys(obj).length === 0 && obj.constructor === Object) {
		alert(`Не створено жодного запитання!`);
		return false;
	} else if (!checkObjQuestionRes.result) {
		addClassError(`.creator__item`, checkObjQuestionRes.numberErrorList);
		// console.log(document.querySelectorAll(`.creator__item`)[0]);
		return false;
	} else {
		return true;
	}
	
	// if (Object.keys(obj).length === 0 && obj.constructor === Object) {
	// 	alert(`Не створено жодного запитання!`);
	// 	return false;
	// } else if (!checkObjQuestion(obj).result) {
	// 	console.log(checkObjQuestion(obj).emptyElementNumber);
	// 	alert(`Не всі поля заповнені!`);
	// 	return false;
	// } else if (!checkObjAnswer(obj)) {
	// 	alert(`Не всі відповіді заповнені!`);
	// 	return false;
	// } else if (!checkObjRightAnswer(obj)) {
	// 	alert(`Не вказано вірних відповідей для автопідрахунку`);
	// 	return false;
	// }  else {
	//  	return true;
	//  }
}
