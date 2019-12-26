const vowelsObject = {
  close: ["i", "y", "ɨ", "ʉ", "ɯ", "u"],
  nearClose: ["ɪ", "ʏ", "ʊ"],
  closeMid: ["e", "ø", "ɘ", "ɵ", "ɤ", "o"],
  mid: ["ə", "ɚ"],
  openMid: ["ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ"],
  nearOpen: ["æ", "ɐ"],
  open: ["a", "ä", "ɑ", "ɒ"]
};

const partsOfSpeech = ["a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "amoungst", "amount", "an", "and", "another", "any", "anyhow", "anyone", "anything", "anyway", "anywhere", "are", "around", "as", "at", "back", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom", "but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven", "else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own", "part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the"];

const vowels = ["i", "y", "ɨ", "ʉ", "ɯ", "u", "ɪ", "ʏ", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ", "o", "ə", "ɚ", "ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ", "æ", "ɐ", "a", "ä", "ɑ", "ɒ"];

const consonantsObject = {
  plosive: ["p", "b", "t", "d", "ʈ", "ɖ", "c", "ɟ", "k", "g",],
  nasal: ["m", "ɱ", "n", "ɳ", "ŋ"],
  tapFlap: ["ɾ", "ɽ"],
  fricative: ["ɸ", "β", "f", "v", "θ", "ð", "s", "z", "ʤ", "ʃ","ʧ", "ʒ", "ʂ", "ʐ","h"],
  lateralFricative: ["ɬ", "ɮ"],
  approximant: ["w", "ʋ", "ɹ", "ɻ", "j"],
  lateralApproximant: ["l", "ɭ"]
};

const consonants = ["p", "b", "t", "d", "ʈ", "ɖ", "c", "ɟ", "k", "g", "m", "ɱ", "n", "ɳ", "ŋ", "ɾ", "ɽ", "ɸ", "β", "f", "v", "θ", "ð", "s", "z", "ʃ","ʧ", "ʒ", "ʂ", "ʐ", "ɬ", "ɮ", "w", "ʋ", "ɹ", "ɻ", "j", "l", "ɭ", "ʤ","h"];

function ConvertSentenceToIPA(sentence) {
  //takes raw text and turns it into an ipa word array
  var lowercase = sentence.toLowerCase().replace(/[.,\/#!$%\^&\*<>|\+;:?{}=\-_`~()]/g, " ");
  var wordArray = lowercase.split(" ");
  var ipaArray = [];
  for (i in wordArray) {
    ipaArray.push(CleanUPORs(TextToIPA.lookup(wordArray[i]).text));
  }
  console.log("IPA word Array: " + ipaArray);

  return { arrIpa: ipaArray, arrWords: wordArray };
}

function ConvertIPAToMusic(ipaText) {
  //algorithim to convert IPA Text to Music, using TextToIPA.lookup(word)
  //Deletes "OR" and then the next word, evein in a sentence
  alert("IPATOMUSIC Function: " + ipaText);
  //First we need to clean up the places were the IPA Text repeats a pronunciation with the key word OR
  ipaText = CleanUPORs(ipaText);
  window.alert(ipaText);
}

function CleanUPORs(ipaText) {
  //this function cleans up all the OR pronunciations of the same word

  var ipaTextArray = ipaText.split(" ");//spliting string to array to parse each index to find a repeat pronunciation
  var deleteNextIndex = false;
  for (var i = 0; i < ipaTextArray.length; i++) {
    if (ipaTextArray[i].indexOf("OR") != -1) {
      ipaTextArray.splice(i, 1);
      i--;//reset the i value to the new length of the array
      //if this index has the word OR in it then the next index needs to be deleted
      deleteNextIndex = true;
    }
    else if (deleteNextIndex) {
      ipaTextArray.splice(i, 1);
      i--;//reset the i value to the new length of the array
      deleteNextIndex = false;
    }
  }
  var cleanedIPAText = ipaTextArray.join(" ");
  return cleanedIPAText;
}

function ConvertIPAtoSyllables(objIPA) {
  var arrIPA = objIPA.arrIpa;
  var arrWords = objIPA.arrWords;
  var syllables = [];
  var stresses = [];
  for (i in arrIPA) {
    //For each word...
    var word = arrIPA[i];
    var section = "";
    var struct = [];//BOolean array, true is consonant, false is vowel
    var stress = 1;

    for (l in word) {//For each letter in word...
      if(partsOfSpeech.indexOf(arrWords[i]) > -1 && document.getElementById("cadence").value > 0){
        stress = 2;
      }
      var type = "vowel";
      var newS = 0;
      //Check if its a stress
      if (word[l] == "ˌ" || word[l] == "ˈ") {
        type = "stress";
        section = section + word[l];
        if (stress != 2){
          if (word[l] == "ˌ") {
            stress = 4;
          }
          else if (word[l] == "ˈ") {
            stress = 6;
          }
        }
        else {
          if (word[l] == "ˌ") {
            stress = 5;
          }
          else if (word[l] == "ˈ") {
            stress = 3;
          }

        }
      }
      //Check if its a consonant
      else {
        for (c in consonants) {
          if (word[l] == consonants[c]) {
            type = "consonant";
          }
        }
      }
      if (type == "consonant") {
        section = section + word[l];
      }
      else if (type == "vowel") {//Determinaing if a vowel is a syllable and starting new syllable if it starts a syllable
        if ((struct[struct.length - 1] == "consonant" || struct[struct.length - 1] == "stress") && struct.indexOf("vowel") > -1) {
          var first = section.substring(section.length - 1);
          syllables.push(section.substring(0, section.length - 1));
          section = first;
          newS++;
        }
        else if (struct.indexOf("vowel") > -1) {//If theres already a vowel
          var combined = true;//If a second vowel is stressed, we may assume syllable


        }
        else {
        }

        section = section + word[l];
      }
      else if (type == "stress") {
        if (struct.indexOf("vowel", struct.length - 3/*how far back weaare checking*/) - struct.indexOf("vowel", struct.indexOf("vowel", struct.length - 3) + 1) == -1) {//if the last two letters are vowels then there is a new sylabe
          var index = struct.indexOf("vowel", struct.length - 3);
          var diff = struct.length - index;
          syllables.push(section.substring(0, section.length - diff));
          stresses.push(1);
          section = section.substring(section.length - diff);
        }
      }
      if (l == word.length - 1 && section != "") {//If the word is about to end, make the section a syllable
        syllables.push(section);
        newS++;
      }

      for (p = 0; p < newS; p++) {
        console.log("new syllable");
        stresses.push(stress);
        stress = 1;
      }
      struct.push(type);
    }
    //Makeing a break at the end of each word
    syllables.push("BREAK");

  }
  syllableObjs = [];
  for (i in syllables) {
    //Finding the tpye of letter of the
    var syllable = syllables[i];
    while (syllable === "BREAK") {
      syllables.splice(i, 1);
      syllableObjs.push({
        text: null,
        stress: "break",
        beginLetter: null,// begin and end have attributes type and index
        endLetter: null
      });
      syllable = syllables[i];
    }

    if (syllable){
      var beginLetter = "";
      var endLetter = "";

      // find beginning and end letters
      var index = 0;
      for (index; syllable[index] == "ˌ" || syllable[index] == "ˈ"; index++) {
      }
      beginLetter = syllable[index];
      index = syllable.length - 1;

      for (index; syllable[index] == "ˌ" || syllable[index] == "ˈ"; index--) {
      }
      endLetter = syllable[index];
      console.log(beginLetter);
      console.log(endLetter);
      //classifiying begin letter
      var beginObject = classifyLetter(beginLetter);
      var endObject = classifyLetter(endLetter);


      syllableObjs.push({
        text: syllables[i],
        stress: stresses[i],
        beginLetter: beginObject,// begin and end have attributes type and index
        endLetter: endObject
      });
    }// END FOR LOOP
  }
  console.log(syllableObjs);
  return syllableObjs;

}

function classifyLetter(letter) {// takes in a syllable string, returns a type and index begin beginObject
  var type = "";
  var index;
  if (consonants.indexOf(letter) > -1) {
    console.log("consonant");
    for (var typeName in consonantsObject) {
      if (consonantsObject[typeName].indexOf(letter) > -1) {
        index = consonantsObject[typeName].indexOf(letter);
        type = typeName;
      }
    }
  }
  else {
    type = "vowel"//due to change
    index = 0;
  }

  return { type: type, index: index }
}

function ConvertIPATextToCV(ipaText) {
  //this function converts a word to a Consant Vowel pattern
  var ipaArray = ipaText.split(" ");
  for (var i = 0; i < ipaArray.length; i++) {
    var ipaWordArray = Array(ipaArray[i].length);
    for (var c = 0; c < ipaArray[i].length; c++) {
      var ipaCharacter = ipaArray[i].substring(c, c + 1);
    }
  }
}
