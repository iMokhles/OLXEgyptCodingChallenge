// Boggle Solver

function MatrixChallenge(strArr) { 

  // code goes here  
  let boggle = [];
  let matrixWords = strArr[0].split(', ');
  matrixWords.forEach(value => {
    boggle.push(value.split(''))
  });
  let row = boggle.length;
  let col = boggle[0].length;

  let wordToFind = strArr[1].split(',');
  let Node = function() {
    this.keys = new Map();
    this.end = false;
    this.setEnd = function() {
      this.end = true;
    };
    this.isEnd = function() {
      return this.end;
    };
  };

  let Trie = function() {
    this.root = new Node();
    this.add = function(input, node = this.root) {
      if (input.length == 0) {
        node.setEnd();
        return;
      } else if (!node.keys.has(input[0])) {
        node.keys.set(input[0], new Node());
        return this.add(input.substr(1), node.keys.get(input[0]));
      } else {
        return this.add(input.substr(1), node.keys.get(input[0]));
      }
    };

    this.isWord = function(word) {
      let node = this.root;
      while (word.length > 1) {
        if (!node.keys.has(word[0])) {
          return false;
        } else {
          node = node.keys.get(word[0]);
          word = word.substr(1);
        }
      };
      return (node.keys.has(word) && node.keys.get(word).isEnd()) ? true : false;
    };
  };

  function isSafe(i, j, visitedArray) {
    return (i >= 0 && i < row && j >= 0 && j < col && !visitedArray[i][j]);
  }

  let wordsFound = [];
  let visitedArray = Array.from({length: row}, () => Array.from({length: col}, () => false));
  function searchWord(myTrie, boggle, i, j, visitedArray, str) {
    if (myTrie.end == true) {
      wordsFound.push(str);
    }
    if (isSafe(i, j, visitedArray)) {
      visitedArray[i][j] = true;
      let alphabet = "abcdefghijklmnopqrstuvwxyz".split('')
      for (let k = 0; k < alphabet.length; k++) {
        if (myTrie.keys.get(alphabet[k]) != undefined) {
          let ch = alphabet[k];
          if (isSafe(i + 1, j + 1, visitedArray) && boggle[i + 1][j + 1] == ch) {
            searchWord(myTrie.keys.get(alphabet[k]), boggle, i + 1, j + 1, visitedArray, str + ch);
          }

          if (isSafe(i, j + 1, visitedArray) && boggle[i][j + 1] == ch) {
            searchWord(myTrie.keys.get(alphabet[k]), boggle, i, j + 1, visitedArray, str + ch);
          }

          if (isSafe(i - 1, j + 1, visitedArray) && boggle[i - 1][j + 1] == ch) {
            searchWord(myTrie.keys.get(alphabet[k]), boggle, i - 1, j + 1, visitedArray, str + ch);
          }

          if (isSafe(i + 1, j, visitedArray) && boggle[i + 1][j] == ch) {
            searchWord(myTrie.keys.get(alphabet[k]), boggle, i + 1, j, visitedArray, str + ch);
          }

          if (isSafe(i + 1, j - 1, visitedArray) && boggle[i + 1][j - 1] == ch) {
            searchWord(myTrie.keys.get(alphabet[k]), boggle, i + 1, j - 1, visitedArray, str + ch);
          }

          if (isSafe(i, j - 1, visitedArray) && boggle[i][j - 1] == ch) {
            searchWord(myTrie.keys.get(alphabet[k]), boggle, i, j - 1, visitedArray, str + ch);
          }

          if (isSafe(i - 1, j - 1, visitedArray) && boggle[i - 1][j - 1] == ch) {
            searchWord(myTrie.keys.get(alphabet[k]), boggle, i - 1, j - 1, visitedArray, str + ch);
          }

          if (isSafe(i - 1, j, visitedArray) && boggle[i - 1][j] == ch) {
            searchWord(myTrie.keys.get(alphabet[k]), boggle, i - 1, j, visitedArray, str + ch);
          }
        }
      }
      visitedArray[i][j] = false;
    }
  }

  let myTrie = new Trie();
  for (let i = 0; i < wordToFind.length; i++) {
    myTrie.add(wordToFind[i]);
  }

  let str = '';
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (myTrie.root.keys.get(boggle[i][j]) != undefined) {
        str += boggle[i][j];
        searchWord(myTrie.root.keys.get(boggle[i][j]), boggle, i, j, visitedArray, str);
        str = '';
      }
    }
  }
  let result = [];
  wordToFind.forEach((element => {
    if (!wordsFound.includes(element)) {
      result.push(element);
    }
  }));
  let retStr = result.join(',');
  return retStr ? retStr : 'true';

}
   
// keep this function call here 
console.log(MatrixChallenge(readline()));
