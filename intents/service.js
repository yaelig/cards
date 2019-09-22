//const tbl=require('../pdfGenerator/createTable')
module.exports=function(form,conv){
   console.log("form service ")
   console.log(JSON.stringify(form))
   tbl(form,conv)
}
