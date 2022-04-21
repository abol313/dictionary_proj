/*<!--In the name of kindly generous ALLAH-->
<!--Thanks ALLAH-->
*/

const input_search = document.getElementById("input_search");
const main = document.getElementsByTagName("main")[0];


input_search.addEventListener("input",()=>{
    if(/^[ضصثقفغعهخحجچشسیبلاتنمکگظطزرذدپو.]/.test(input_search.values))
        document.body.className = "direction_rtl"
    else
        document.body.className = "direction_ltr"
})

input_search.addEventListener("keyup",ev=>{
    if(ev.key == "Enter" && input_search.value.length>0)
        search(input_search.value);
})

function search(word){
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+word)
    .then(j=>j.json())
    .then(arr=>{
        console.log(arr)
        let word = arr[0]['word']
        let phonetic =  arr[0]['phonetics'][0]['text'] || arr[0]['phonetics'][1]['text']
        let partOfSpeech = arr[0]['meanings'][0]['partOfSpeech']
        let definition = arr[0]['meanings'][0]['definitions'][0]['definition']
        console.log(word,phonetic,partOfSpeech,definition)
        main.innerHTML = "";

        main.innerHTML = `
        <section>
            <h2 class="word">${word}</h2>
            <h3 class="phonetic">${phonetic}</h3>
            <h3 class="type">${partOfSpeech}</h3>
            <p class="definition">${definition}</p>
        </section>
        `;
    })
    .catch(e=>{
        main.innerHTML = `
        <section>
            <h1 class="no_match">sorr:( , no match !</h1>
        </section>
        `;       
    });

}