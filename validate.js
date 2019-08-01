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

	let showErrorMsg = (invalidObj) => {
		document.querySelectorAll(`.error`).forEach((el)=>{el.classList.remove(`error`)});
		for (let q in invalidObj) {
			let numBlock = q.match(/\d+/)[0] - 1;
			let questionBlockError = document.querySelectorAll(`.creator__item`)[numBlock];
			
			if (invalidObj[q].emptyQuestion) {
				questionBlockError.querySelector(`.question-text`).classList.add(`error`);
			}
			
		}
	}

	buildInvalidBlockObj(obj);
	showErrorMsg(invalidObj);
	if (Object.keys(invalidObj).length === 0 && invalidObj.constructor === Object) {
		return true;
	} else {
		return false;
	}
}
