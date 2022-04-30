
function createPoster(released,name,background_image,description,data_type_id){
                        //data_type_id= a = primo (nes)
                        //                b= secondo (atari)
                        //                c= terzo    (sega)
                        //released : "1985-09-15" ->(SOLO ANNO) ->H1
                        // name : "Ultima IV: Quest of the Avatar" ->H1
                        // background_image	:	"https://media.rawg.io/media/screenshots/773/7730495e8fc0fe7e1e747cb9449399ac.jpeg"->img
                        //description : "<p>Battletoads are here to fight aliens form other words.</p>" -> dentro un div
                        const year=released.substring(0, 4); // ESTRAE SOLO L'ANNO
                        
                        const game =document.querySelector("[data-type-id="+`${data_type_id}`+"]");
                        game.innerHTML='';
                        const A1=document.createElement('div');
                        const A2=document.createElement('div');
                        
                        const title=document.createElement('h1');
                        const date=document.createElement('h1');
                        const img=document.createElement('img');
                        const par=document.createElement('div');
                        
                        img.src=background_image;
                        
                        title.textContent=name;
                        
                        date.textContent=year;
                        
                        par.innerHTML=description;
                        
                        A1.classList.add('A1');
                        A2.classList.add('A2');
 
                        img.classList.add('img_announce');
                        
                         game.appendChild(A1);
                         game.appendChild(A2);
                         A1.appendChild(date);
                         A1.appendChild(img);
                         A2.appendChild(title);
                         A2.appendChild(par);
                    }



function getGameInfo(url,url2,url_game,key_api,id_console,data_type_id){
    const url_search= url+key_api+url2+id_console;
    const result = fetch(url_search)


    .then(response => response.json())
    .then(json => {  
        
                      const num = Math.floor(Math.random() * 19);
                      const slug = json.results[num].slug;
                   return fetch(`${url_game}${slug}?key=${key_api}`); // make a 2nd request and return a promise
                    
                  })
    .then(response => response.json())
    .catch(err => {
      console.error('Request failed', err)
    })
    result.then(
      r => {
          createPoster(r.released,r.name,r.background_image,r.description,data_type_id);
    });    
}




const key_api='394f8ac2db054cfda1189e604c4d08dc';
const id_c1=49;
const id_c2=23;
const id_c3=43;
const url = 'https://api.rawg.io/api/games?key=';
const url2= '&ordering=-added&platforms=';
url_game='https://api.rawg.io/api/games/';

getGameInfo(url,url2,url_game,key_api,id_c1,"a");

getGameInfo(url,url2,url_game,key_api,id_c2,"b");

getGameInfo(url,url2,url_game,key_api,id_c3,"c");
