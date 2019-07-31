window.isValide = (obj) => {

	let checkObjQuestion = (obj) => {
		for (let q in obj) {
			if (obj[q].question.length === 0) {
				console.log(obj[q].question.length);
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
	} 
	 else {
	 	return true;
	 }
}
