const { reset } = require('nodemon');
 const dboperations = require('./dbOperations');
//  var Db=require('./dbOperations');
 
 dboperations.getLoginDetails().then(result=>{
  console.log(result);
 })