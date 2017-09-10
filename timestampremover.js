function tryClear(text){
    Length = text.length;
    FirstSumbol = true;
    CancelExit = false;
    var strOut = "";

    for(i=0; i<Length; i++){
        ch = text.substring(i,i+1);
        if(FirstSumbol){
            if(ch >= '0' && ch <= '9' ){
                CancelExit =true;
                FirstSumbol = false;
            }
            else {
                CancelExit =false;
                strOut += '\n';
                FirstSumbol = false;
            }
        }
        if(ch == '\n'){
            FirstSumbol = true;
        }

        if((!CancelExit) && (!FirstSumbol)){
            strOut += ch;
            //document.all.TextFields.Output.value = i;
        }
        else continue;
    }
    //document.all.TextFields.Output.value = strOut;
    return strOut;
}

var str = '1\n00:01:21,927 --> 00:01:26,921\nI should\'ve known that you would be here, Professor McGonagall.\n\n2\n00:01:38,151 --> 00:01:41,318\nGood evening, Professor Dumbledoor.\n';

console.log(tryClear(str));