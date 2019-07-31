window.isValide = (obj) => {

	// перевіряє, чи в масиві є хоча б один пустий елемент
	let hasEmpty = (arr)=> {
		if (arr) {
			let result = arr.some((elem)=>{
				return elem.length === 0;
			});
			return result;
		}
	}
	// повертає результат в залежності від наявності елементів в numberErrorList
	let getResultCheck = (numberErrorList) => {
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

	// перевіряємо чи всі поля варіантів відповідей () заповнені
	let checkObjAnswer = (obj) => {
		let numberErrorList = [];
		for (let q in obj) {
			// якщо є пусте поле, то додаємо його номер в масив numberErrorList
			if (hasEmpty(obj[q].answer)) {	
				numberErrorList.push(q.match(/\d+/)[0]);
			} 
		}
		return getResultCheck(numberErrorList);
	}
	// перевіряємо, чи вказані вірні відповіді при наявності варіантів відповідей
	let checkObjRightAnswer = (obj) => {
		let numberErrorList = [];
		for (let q in obj) {
			// якщо є пусте поле, то додаємо його номер в масив numberErrorList
			if (obj[q].answer && !obj[q].rightAnswer) {	
				numberErrorList.push(q.match(/\d+/)[0]);
			} 
		}
		return getResultCheck(numberErrorList);
	}

	// перевіряє, чи заповнені поля тексту запитення
	let checkObjQuestion = (obj) => {
		let numberErrorList = [];
		for (let q in obj) {
			// якщо є пусте поле, то додаємо його номер в масив numberErrorList
			if (obj[q].question.length === 0) {	
				numberErrorList.push(q.match(/\d+/)[0]);
			} 
		}
		return getResultCheck(numberErrorList);
	}
let checkObjQuestionRes = checkObjQuestion(obj);
let checkObjRightAnswerRes = checkObjRightAnswer(obj);
let checkObjAnswerRes = checkObjAnswer(obj);



// ф-ція, яка дає класи невалідним елементам
// elementClass - клас елементів, які будуть перевірятися і їм же додаватиметься клас error
// numberErrorListOfQuestionBlock - масив номерів невалідних питань
let addClassError = (elementClass, numberErrorListOfQuestionBlock) => {
	let questionBlockList = document.querySelectorAll(elementClass);
	// для оновлення стану, видаляємо всі класи error
	questionBlockList.forEach((questionBlock)=>{
		questionBlock.classList.remove(`error`);
	});
	numberErrorListOfQuestionBlock.forEach((num)=>{
		questionBlockList[num - 1].classList.add(`error`);
	});
	// скролимо до першого невалідного блоку
	questionBlockList[numberErrorListOfQuestionBlock[0]-1].scrollIntoView({ behavior: "smooth" });;
}


	if (Object.keys(obj).length === 0 && obj.constructor === Object) {
		alert(`Не створено жодного запитання!`);
		return false;
	} else if (!checkObjQuestionRes.result) {
		addClassError(`.creator__item`, checkObjQuestionRes.numberErrorList);
		alert(`Заповніть поле запитання!`);
		return false;
	}  else if (!checkObjAnswerRes.result) {
		addClassError(`.creator__item`, checkObjAnswerRes.numberErrorList);
		alert(`Заповніть варіант відповіді!`);
		return false;
	} else if (!checkObjRightAnswerRes.result) {
		addClassError(`.creator__item`, checkObjRightAnswerRes.numberErrorList);
		alert(`Виберіть вірні відповіді!`);
		return false;
	} else {
		// в разі успіного проходження всіх перевірок, видаляємо усі класи помилки
		document.querySelectorAll(`.error`).forEach(el=>{el.classList.remove(`error`)});
		return true;
	}
	
}
