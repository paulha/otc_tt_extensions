// Declares the expected input and output types of the transform:
// Valid type names are:
//
// Boolean, Container, Date Time, Date, Double, Duration, Location, Long
// Multi Select, Relationship, Relationships, Rich Text, Single Select, String
// Web Links
//
var inputTypes = 'String';
var outputTypes = 'Location';


function transform(context, input) {
   // returns the result of the transformation
   var result = input.replace("Configuration-Context", "oslc_config.context");
   console.log("patch_to_oslc_config_context: '"+input+"'-->'"+result+"'")
   return result
}
