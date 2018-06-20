/* Copyright [2013-2018] Tasktop Technologies Incorporated.  All rights reserved.
 CONFIDENTIAL: The information contained in this document is the property of Tasktop Technologies Incorporated ("Tasktop").
 This document is for internal use only. Except as specifically authorized in writing by Tasktop, the holder of this document
 shall keep the information contained herein confidential and shall protect same in whole or in part from disclosure or dissemination
 to third parties. No part of the contents of this document may be reproduced or transmitted in any form or by any means without the
 expressed written permission of Tasktop.
*/
// Takes input String field and searches ALM for one single artifact with
// a specified field having that same string value and returns relationship
//
var inputTypes = 'String'
var outputTypes = 'Relationships'

//TODO change to field ID of the desired ALM field
var almFieldId = 'USER-24'

function transform(context, input) {

   if(!input) return

    var almQuerySearch = artifacts.getSearchDefinition('server-query-language')

    almQuerySearch['domain'] = context.targetRepositoryArtifact['domain']
    almQuerySearch['project'] = context.targetRepositoryArtifact['project']
    almQuerySearch['type'] = context.targetRepositoryArtifact['type']


    var typeId = '105'

    var query = '{' + almFieldId + '[' + input + ']'+';type-id['+typeId+']}'
    almQuerySearch['query'] = query

    var results = artifacts.search('server-query-language', almQuerySearch)


    if(results.length < 1) {
        throw 'No results found for query: ' + query
    }

    if(results.length > 1) {
        var result = [results[0]] + ' ' + [results[1]]
       // for( int i = 0; i < results.length; i++ ){
    //        result =  result+ '  ' + result[i]
        //}
        throw 'Multiple results found for query: ' + results.length + '=>'+result
    }

    return [results[0]]
}