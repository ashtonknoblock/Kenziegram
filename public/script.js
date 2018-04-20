const picdiv = document.getElementById("picdiv"); //div that each new picture goes in
const time = 1524152913743;

const postRequestOptions = { 
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({time: time}), //time sent thru fetch
};

function fetchFunction() {
    fetch("/latest", postRequestOptions) 
    .then(response => response.json())
    .then(response => function(data) {
        
    })
}; 

setTimeout(fetchFunction(), 5000);
