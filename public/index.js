//

// var inputElement = document.createElement('input');
// inputElement.type = "button"
// inputElement.addEventListener('click', function(){
//     gotoNode(result.name);
// });

// // ​document.body.appendChild(inputElement);​

// var mi = document.createElement("input");
// mi.setAttribute('type', 'text');
// mi.setAttribute('value', 'default');

// document.body.appendChild(mi)

let urlParams = new URLSearchParams(window.location.search);

let spotifyID = urlParams.get('query')
let analysis = ''

console.log(spotifyID);

if (spotifyID === null) {
    analysis = 'No URI entered'
} else {

    let url = 'http://localhost:8888/api/' + spotifyID
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => {
            analysis = data;
            console.log(data);
        });

}

document.write(analysis);

const postToServer = () => {
    console.log("sf")
}