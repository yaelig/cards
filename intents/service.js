const tbl=require('../pdfGenerator/createTable')
const pdf=require('../pdfGenerator/createPdf')
module.exports=function(){
  tbl.call()
  pdf.call()
  console.log("hi from service ")
 }
