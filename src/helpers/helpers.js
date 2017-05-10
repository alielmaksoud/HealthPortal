export function validate(value) {
	if(!value || value.length === 0 || parseInt(value) <= 0) {
		return false;
	} else {
		return true;
	}
}

export function hasUnderscore(value) {
	if(!value || value.length === 0 || parseInt(value) <= 0) {
		return false;
	} else {
		// in our case, only two words 
		const temp = value.split("");
		if(temp.indexOf("_") >= 0) {
			return true;
		} else {
			return false;
		}
	}
}

export function modifyUnderscore(value) {
	if(!value || value.length === 0 || parseInt(value) <= 0) {
		return value;
	} else {
		// in our case, only two words 
		const temp = value.split("_");
		const capitalized = temp[1].charAt(0).toUpperCase() + temp[1].slice(1);
		return temp[0] + capitalized
	}
}

export function sortNum(nums, decsOrAsc) {
	
}

export function sortLetter(words, alphabeticallOrNot) {

}