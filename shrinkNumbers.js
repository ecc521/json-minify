function shrinkNumber(num) {	
	//Remove plus from 1e+21
	let exponential = num.toExponential().split("+").join("")
	let str = num.toString()
	
	//Although using hexadecimal and octal can sometimes yield smaller representations, JSON does not allow them.
	
	//Remove starting 0
	if (str.startsWith("0.")) {str = str.slice(1)}
	
	else if (exponential.length < str.length) {
		return exponential
	}
	else {
		return str
	}
}



//My attempt to parse numbers
//Not sure if it fully works - I didn't finish testing negative exponents.
//Not exported. Kept for historical purposes, or if some use case found in future.
function toShorterVersion(num) {
	let str = num.toString()

	if (str.includes("e")) {
		//Remove the + from 1e+21 - plus is inferred.
		return str.split("+").join("")
	}
	
	//Has to be greater than or equal to 1000 to be able to save space
	if (num >= 1e3) {
		//Match trailing zeros
		let match = /0+$/.exec(str)

		let trailingZeros = (match && match[0].length) || 0
		let matchIndex = (match && match["index"]) || 0

		//1 trailing zero longer. 2 is even. 3+ smaller.
		if (trailingZeros > 2) {
			let beginning = str.slice(0, matchIndex)
			return beginning + "e" + trailingZeros
		}
	}
	//Has to be less than or equal to 0.009 to be able to save space. 
	else if (num <= 9e-3) {
		//Match zeros after decimal point.
		let match = /.0+/.exec(a)
		if (match) {
			//Remove the . from the matched string
			match[0] = match[0].slice(1)
			match["index"]++
		}
		let leadingZeros = (match && match[0].length) || 0
		let matchIndex = (match && match["index"]) || 0
		
		//1-2 is bigger, 3 is even, 4+ is smaller.
		if (leadingZeros > 3) {
			let ending = str.slice(matchIndex + leadingZeros)
			return ending + "e-" + leadingZeros + 1 //Add 1 to leadingZeros - because ending is 1 digit AFTER them.
		}
	}
	return str
}


module.exports = {
  shrinkNumber
}
