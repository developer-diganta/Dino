const TitleCase = (string) => {
    var result = [];
    var a = string.toLowerCase().split(" ");
    // reset to lower case and split where the spaces are.

    for(let i = 0; i < a.length; i++){ // do every word
        a[i] = a[i][0].toUpperCase() + a[i].substr(1); 
      // first letter to upper case and then add the rest
        result.push(a[i]); // collect results in an array
      }

    return result.join(' '); // et voila.
};

const SentenceCase = (string) => {
    var result = [];
    let words = string.toLowerCase().split(" ");
    let newsentence = true;

    for(let i = 0; i < words.length; i++){
    
      if (newsentence==true || words[i]=="i"){
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        newsentence = false;
      }
        
      if (words[i][words[i].length-1] === "." || words[i][words[i].length-1] === "?" || words[i][words[i].length-1] === "!" ){            
        newsentence = true;
      }
    
    }

    return words.join(" ");

  };

var memo = document.getElementById("text");

document.getElementById("lower").addEventListener("click", function(){
memo.value = memo.value.toLowerCase();
});

document.getElementById("upper").addEventListener("click", function(){
memo.value = memo.value.toUpperCase();
});

document.getElementById("sentence").addEventListener("click", function(){
memo.value = SentenceCase(memo.value);
});

document.getElementById("title").addEventListener("click", function(){
memo.value = TitleCase(memo.value);
});