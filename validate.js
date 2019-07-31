window.isValide = (obj) => {
	console.log(obj);

	
	let hasEmpty = (arr)=> {
		arr.some((elem)=>{
			console.log(elem.trim().length === 0);
			return elem.trim().length === 0;
		});
	}

	let checkObjQuestion = (obj) => {
		for (let q in obj) {
			if (obj[q].question.length === 0) {
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
	}  else {
	 	return true;
	 }
}
