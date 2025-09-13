console.log("Web Ratvarrot13!")

/* https://codereview.stackexchange.com/questions/132125/rot13-javascript */
function rot13(str) {
	var input     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var output    = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
	var index     = x => input.indexOf(x);
	var translate = x => index(x) > -1 ? output[index(x)] : x;
	return str.split('').map(translate).join('');
}

function toRatvar(msg) {
	var workingText = msg;
	workingText = workingText.replace(/(\w)\s([oO][fF])/gm, "$1-$2");
	workingText = workingText.replace(/([gG][uU])([aA])/gm, "$1-$2");
    workingText = workingText.replace(/([tT][hH]\w)(\w)/gm, "$1`$2");
    workingText = workingText.replace(/([tT][iI])(\w)/gm, "$1`$2");
    workingText = workingText.replace(/(\w)([eE][tT])/gm, "$1-$2");
    workingText = workingText.replace(/([tT][eE])(\w)/gm, "$1-$2");
    workingText = workingText.replace(/(\w)\s([aA][nN][dD])(\W)/gm, "$1-$2$3");
    workingText = workingText.replace(/(\W)([aA][nN][dD])\s(\w)/gm, "$1$2-$3");
    workingText = workingText.replace(/(\s)([tT][oO])\s(\w)/gm, "$1$2-$3");
    workingText = workingText.replace(/(\s)([mM][yY])\s(\w)/gm, "$1$2-$3");
	workingText = rot13(workingText);

	var reRatvarPreserve = /\b([E][nN][gG][Ii][nN][eE])\b/gm;
	while((match = reRatvarPreserve.exec(workingText)) != null) {
		var start = match.index;
		var end = start + 6; // ratvar is always 6-long

		var contentsPre = workingText.slice(0, start);
		var engineGet = workingText.slice(start, end);
		var contentsPost = workingText.slice(end, workingText.length);

		workingText = contentsPre + rot13(engineGet) + contentsPost;
	}

	return workingText;
};

function fromRatvar(msg) {
	var workingText = msg;
	workingText = rot13(workingText);

    workingText = workingText.replace(/([gG][uU])-([aA])/gm, "$1$2")
    workingText = workingText.replace(/(\w)-([aA][nN][dD])/gm, "$1 $2")
    workingText = workingText.replace(/([aA][nN][dD])-(\w)/gm, "$1 $2")
    workingText = workingText.replace(/([tTmM][oOyY])-/gm, "$1 ")
    workingText = workingText.replace(/([tT][eE])-/gm, "$1")
    workingText = workingText.replace(/-([eE][tT])/gm, "$1")
    workingText = workingText.replace(/-([oO][fF])/gm, " $1")
    workingText = workingText.replace(/`/gm, "")

	var reRatvarPreserve = /\b([E][nN][gG][Ii][nN][eE])\b/gm;
	while((match = reRatvarPreserve.exec(workingText)) != null) {
		var start = match.index;
		var end = start + 6; // ratvar is always 6-long

		var contentsPre = workingText.slice(0, start);
		var engineGet = workingText.slice(start, end);
		var contentsPost = workingText.slice(end, workingText.length);

		workingText = contentsPre + rot13(engineGet) + contentsPost;
	}

	return workingText;
}


var entryNormal = document.getElementById("normaltext")

var entryRatvar = document.getElementById("ratvariantext")

entryNormal.addEventListener("keyup", function(event) {
	var currentValue = entryNormal.value;

	entryRatvar.value = toRatvar(currentValue);
});

entryRatvar.addEventListener("keyup", function(event) {
	var currentValue = entryRatvar.value;

	entryNormal.value = fromRatvar(currentValue);
});