var inputTypes = ['String', 'String'];
var outputTypes = 'String';

function transform(context, input) {
    // Remove characters that HpALM does not allow in summary field(*,line breaks etc)
    var res = input[1].replace(/[*\n|\r]/gi, '');
    return  input[0] + ' ' + res;
	//return  input[0] + ' ' + input[1]
}