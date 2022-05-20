// HTML Elements

function intersparse(str, token) {
  var i, l = Math.min(str.length, token.length), tempStr1 = "";
  for (i = 0; i < l; i++) {
    tempStr1 += str[i] + token[i];
  }
  return tempStr1 + str.slice(i) + token.slice(i);
}

function StringChallenge(str) { 

  // code goes here  
  const ChallengeToken = "1234567890";
  let strRegex = /\<.*?\>/g;
  let strArray = str.match(strRegex);
  const openingTags = new Array();
  const closingTags = new Array();
  let tempStr1 = new String("");
  let tempStr2 = new String("");

  for (let i = 0; i < strArray.length; i++) {
    if (strArray[i].startsWith("</")) {
      closingTags.push(strArray[i]);
    } else {
      openingTags.push(strArray[i]);
    }
  }

  for (let j = 0; j < openingTags.length; j++) {
    tempStr1 = new String("");
    for (let l = 0; l < openingTags[j].length; l++) {
      if (openingTags[j][l] !== "<" && openingTags[j][l] !== ">") {
        tempStr1 += openingTags[j][l];
      }
    }

    for (let a = 0; a < closingTags.length; a++) {
      tempStr2 = new String("");
      for (let b = 0; b < closingTags[a].length; b++) {
        if (closingTags[a][b] !== "<" && closingTags[a][b] !== "/" && closingTags[a][b] !== ">") {
          tempStr2 += closingTags[a][b];
        }
      }
      if (tempStr1 === tempStr2) {
        openingTags.splice(j, 1);
        j--;
        closingTags.splice(a, 1);
        break;
      }
    }
  }

  if (openingTags.length == 0) {
    return intersparse("true", ChallengeToken);
  } else {
    let nStr = (openingTags[openingTags.length - 1].slice(1).slice(0, openingTags[0].length - 2));
    return intersparse(nStr, ChallengeToken);
  }
}
   
// keep this function call here 
console.log(StringChallenge(readline()));
