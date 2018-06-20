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
var extFieldId = 'USER-03' //External Item ID

function transform(context, input) {
    if(!input) return
    var typeId = '105'
	var query = '{' + almFieldId + '[' + input + ']'+';type-id['+typeId+']}'
	var almQuerySearch = createQuery(context, artifacts, query, '105')
    var result = runQuery(artifacts, almQuerySearch)
    var parent = artifacts.retrieveArtifact(result)

	var externalItemId = parent['RQ_USER_03']
	var externalTypeId = '102'
	var ucisTypeId = '101'
	var featureTypeId='102'
	var queryl = '{' + extFieldId + '[' + externalItemId + ']'+';type-id['+ucisTypeId+']}'
	var almQuerySearchl = createQuery(context, artifacts, queryl, '101')
    var resultl = runQuery(artifacts, almQuerySearchl)
    var parentl = artifacts.retrieveArtifact(resultl)
    return parentl['test-coverage']
}

function createQuery(context, artifacts, query, typeId) {

    var almQuerySearch = artifacts.getSearchDefinition('server-query-language')

    almQuerySearch['domain'] = context.targetRepositoryArtifact['domain']
    almQuerySearch['project'] = context.targetRepositoryArtifact['project']
    almQuerySearch['type'] = context.targetRepositoryArtifact['type']

    almQuerySearch['query'] = query
	return almQuerySearch
}

function runQuery(artifacts, almQuerySearch){
	var results = artifacts.search('server-query-language', almQuerySearch)

    if(results.length < 1) {
        throw 'No results found for query:'
    }
    if(results.length > 1) {
        throw 'Multiple results found for query:'
    }
	return results[0]
}