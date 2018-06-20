var inputTypes = ['Location', 'String'];
var outputTypes = 'Web Links';

function transform(context, input) {

	var newLink = {
		label:input[1],
		location:input[0]
	}

    console.log('===== Creating Web Link =====')
    console.log(newLink.label + " : " + newLink.location)

	return [newLink]
}