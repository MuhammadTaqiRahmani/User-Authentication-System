var config=require('./dbConfig');
const sql=require('msnodesqlv8');
const query = "select * from mytable";

async function getLoginDetails(){
 try {
  sql.query(config,query,(err,rows)=>{
   console.log(rows);
  })
 } catch (error ) {
  console.log(error);
 }
}
module.exports={
 getLoginDetails:getLoginDetails
}

