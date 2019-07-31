window.isValide = (obj) => {

	
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
	
	let checkObjQuestion = (obj) => {
		for (let q in obj) {
			if (obj[q].question.length === 0) {
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

	
	
	
	if (Object.keys(obj).length === 0 && obj.constructor === Object) {
		alert(`Не створено жодного запитання!`);
		return false;
	} else if (!checkObjQuestion(obj)) {
		alert(`Не всі поля заповнені!`);
		return false;
	} else if (!checkObjAnswer(obj)) {
		alert(`Не всі відповіді заповнені!`);
		return false;
	} else if (!checkObjRightAnswer(obj)) {
		alert(`Не вказано вірних відповідей для автопідрахунку`);
		return false;
	}  else {
	 	return true;
	 }
}
