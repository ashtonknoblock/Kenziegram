//CLIENT SIDE
const picdiv = document.getElementById("picdiv"); //div that each new picture goes in

let USERtimestamp = new Date.now();

function Fetchfunction() {
    console.log("testing")
    const postOptions = {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify({
            latest: USERtimestamp,
        })
    }
    fetch("/latest", postOptions)
        .then(response => response.json())
        .then(data => { 
            if (data.timestamp > USERtimestamp) {
                data.images.forEach(src => {
                    const img = document.createElement("img");
                    img.src = src;
                    picdiv.body.appendChild(img);
                })
            }
            USERtimestamp = data.timestamp;
            // return USERtimestamp;
        })
}
setInterval(Fetchfunction, 5000);
