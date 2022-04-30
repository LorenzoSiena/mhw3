function CreatePodcast(event) {
    console.log("ho premutotasto");
    event.preventDefault(); //non viene ricaricata la pagina

    fetch(urlSpotify, {
        method: 'GET',
        headers: {

            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token

        }
    }

    ).then(onResponsePodcast).then(onJsonPodcast);

}



function onResponsePodcast(response) {
    return response.json();
}

//Crea il riquadro e lo stampa
function onJsonPodcast(json) {

    const LastPodcast = document.querySelector("#podcastdiv");
    LastPodcast.innerHTML = ''; //lo svuoto per sicurezza

    const result = json.items[0];  // OGGETTO
    const url = result.external_urls.spotify; // LINK
    const title = result.name; // NOME PUNTATA
    const img_album = result.images[0].url; // immagine 640*640

    const title1 = document.createElement('span');
    title1.textContent= "Ascolta il nostro ultimo podcast!"
    const sub = document.createElement('span');
    sub.textContent = title;

    const div1 = document.createElement('div');
    

    const img = document.createElement('img');
    img.src = img_album;
 
    const par = document.createElement('p');
    par.textContent = "Ascolta su spotify!";

    const a = document.createElement('a');
    const link = document.createTextNode("Play");
    a.appendChild(link);
    a.href = url;

    LastPodcast.appendChild(title1);
    LastPodcast.appendChild(div1);
    div1.appendChild(img);
    img.appendChild(sub);
    
    div1.appendChild(par);
    par.appendChild(a);
    
}

//TASTO PODCAST
const button = document.querySelector('#podcast');
button.addEventListener('click', CreatePodcast);




/*

//RICHIESTA SU WEB
//https://api.spotify.com/v1/shows/79AqdlUNncp3KZQJqKv8I7/episodes?limit=3&offset=0
/*

// ULTIMA PUNTATA DEL PODCAST
curl -X "GET" "https://api.spotify.com/v1/shows/79AqdlUNncp3KZQJqKv8I7/episodes?limit=1&offset=0" 
-H "Accept: application/json" 
-H "Content-Type: application/json" 
-H "Authorization: Bearer BQB_sBeKl_zxs-YtcMyVX8Pgeb7YSXexy_wXUd20qRA-6pnOjXZC02IFoMr6RxIRHzT43GWJPTzxq4IEt9g4lrQOiq0GF4LVLGnUWzB9Y4WEMrsB_tJ_54FiPE4qeezShu-Y8zDXtBmJuEwyEQ8"
*/


//CHIAVI
const client_id = "009e83cc31424b339485bfd72d98c2c1"; //Identificatore della mia app [pubblica(?)]
const client_secret = "2683260904db45cf94243ca61cd79e56"; //"Password" della mia app [per me e per spotify](dovrebbe rimanere nascosta al pubblico)7
let token;
const urlSpotify = "https://api.spotify.com/v1/shows/79AqdlUNncp3KZQJqKv8I7/episodes?market=IT&limit=1&offset=0";

//Token Request
fetch("https://accounts.spotify.com/api/token",
    {
        method: "post",
        body: 'grant_type=client_credentials',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
        }
    }
).then(onTokenResponse).then(onTokenJson);

function onTokenJson(json) {
    token = json.access_token;
}

function onTokenResponse(response) {
    return response.json();
}