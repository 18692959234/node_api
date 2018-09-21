//var oRanNum=Math.floor(Math.random()*52);
var oN="abcdefghijklmnopqrstuvwsyzABCDEFGHIJKLMNOPQRSTUVWSYZ"
var aNum=oN.split("");
var StringN="";


for(var i=0;i<10;i++)
{
	var oRanNum=Math.floor(Math.random()*52);
	StringN+=aNum[oRanNum];
}

module.exports=StringN;