window.isValide = (obj) => {
	let invalidObj = {};
	
	
	let findEmptyEl = (arr) => {
		if (arr) {
			let indexEmptyEl = [];
			arr.forEach((el, i)=>{
				if (el.length === 0) {
					indexEmptyEl.push(i);
				}
			});
			if (indexEmptyEl.length !== 0) {
				return indexEmptyEl;
			} else {
				return 
			}
		}
	}
	let buildInvalidBlockObj = (obj) => {
		for (let q in obj) {
			invalidObj[q] = Object.create(null);
			if (obj[q].question === ``) {
				Object.defineProperty(invalidObj[q], `emptyQuestion`, {value: `empty`});
			}
			let emptyAnswer = findEmptyEl(obj[q].answer);

			if (emptyAnswer) {
				Object.defineProperty(invalidObj[q], `emptyAnswerIndex`, {value: emptyAnswer});
			}
			if (obj[q].answer && !obj[q].rightAnswer) {
				Object.defineProperty(invalidObj[q], `emptyRightAnswer`, {value: `empty`});
			}
			
			function isEmpty(obj) {
			  return Object.getOwnPropertyNames(obj).length === 0;
			}
			if (isEmpty(invalidObj[q])) {
				delete invalidObj[q];
			}
		}
	}

	

	buildInvalidBlockObj(obj);

	if (Object.keys(invalidObj).length === 0 && invalidObj.constructor === Object) {
		return true;
	} else {
		return false;
	}
}
