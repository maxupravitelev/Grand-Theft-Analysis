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

let spotifyURI = urlParams.get('query')

console.log(spotifyURI);

if (spotifyURI === null) {
    spotifyURI = 'No URI entered'
}

document.write(spotifyURI);

const postToServer = () => {
    console.log("sf")
}