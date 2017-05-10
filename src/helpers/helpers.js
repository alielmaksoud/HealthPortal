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
		const string = value.replace("_", "-");
		return string;
	}
}

export function modifyLineThrough(value) {
	if(!value || value.length === 0 || parseInt(value) <= 0) {
		return value;
	} else {
		// in our case, only two words 
		const string = value.replace("-", "_");
		return string;
	}
}