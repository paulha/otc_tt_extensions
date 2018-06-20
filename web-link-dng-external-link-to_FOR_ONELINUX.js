var inputTypes = 'Web Links';
var outputTypes = 'Web Links';

// This code is beging changed to point to the One Linux instead of One Android
// Eventually this needs to be replaced with a code that determined the key value
// from the context
//var externalLinkField = "external.ExternalLinkTo_-98R4a_4EeekDP1y4xXYPQ";
var externalLinkField = "external.ExternalLinkTo_7ScuAdSLEeeZ_sawASH9YQ";


var NOT_FOUND = -1;

function transform(context, input) {
    // Input is an ARRAY of length 1!
    console.log("targetRepositoryArtifact: " + JSON.stringify(context.targetRepositoryArtifact));
    var links = context.targetRepositoryArtifact[externalLinkField];
    var item = input[0];

    // Find by location:
    var pos = NOT_FOUND;
    for (var i = 0; i < links.length; i++) {
        if (links[i].location === item.location) {
            pos = i;
            break
        }
    }

    if (pos===NOT_FOUND) {
        // Wasn't found, add to array
        links.push(item)
    }
    else {
        // Has the label changed?
        if (links[pos].label===item.label) {
            // No, just return the item
            return links
        }
        else {
            // Yes, update, then sort below
            links[pos].label = item.label
        }
    }

    // Sort: new item added or label was changed:
    links = links.sort(function (a, b) {
        return a.label.localeCompare(b.label);
    });

    return links
}

