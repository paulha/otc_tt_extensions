var inputTypes = 'Web Links';
var outputTypes = 'Web Links';

// Possibilities for externalLinField are:
// _4EeekDP1y4xXYPQ - seems to be used a lot.  what does it refer to
// 1. This hard coded string below is global and the context is also global
//    This means that the data could be mixed when two threads are running
//    Will impact both bridges
// 2. This hard coded string refers only to Android and would cause problems
//    for all others.
// 3. It is not a global string and it is thread safe, therefore, if any
//    the issues are caused by an internal bug in the way the TaskTop accesses RTC
// 4. It is not a global string and it is thread safe, therefore, if any
//    the issues are caused by an internal bug in storing and retrieving the links

var externalLinkField = "external.ExternalLinkTo_-98R4a_4EeekDP1y4xXYPQ";

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