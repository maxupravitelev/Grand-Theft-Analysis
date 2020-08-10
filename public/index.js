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

// document.write(analysis);

// const postToServer = () => {
//     console.log("sf")
// }

/////////////////////////////
    
let access_token = ''

fetch('http://localhost:8888/api/token')
    .then(response => response.json())
    .then(data => {
        access_token = data;
        console.log(access_token)
    })



