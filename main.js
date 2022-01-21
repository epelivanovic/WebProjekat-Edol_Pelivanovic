import { Biblioteka } from "./Biblioteka.js"
var element = document.createElement("select");
element.className = "ddlBiblioteke";
var loadItem = localStorage.getItem('bibliotekaLoad');
if(!loadItem) loadItem = 1;
localStorage.removeItem('bibliotekaLoad')

fetch("https://localhost:5001/Biblioteka/GetBiblioteke").then(p => {
    p.json().then(data => {
        data.forEach(biblioteka => {
            const b = new Biblioteka(biblioteka.bibliotekaId, biblioteka.naziv);
            var a = document.createElement("option");
            a.className = "bibliotekeOption";
            if(b.id == loadItem) a.setAttribute("selected",true);
            a.innerHTML = b.naziv;
            a.value = b.id;
            element.appendChild(a);
        });
    });
});

const naslov = document.createElement("h1");
naslov.innerHTML = "Biblioteka";
document.body.appendChild(naslov);
document.body.appendChild(element);

loadBiblioteka(loadItem);
element.onchange = function () {
       loadBiblioteka(element.value);
};

function loadBiblioteka(bibliotekaId)
{
    var mainKontejner = document.getElementsByClassName("mainKontejner")[0];
    if (mainKontejner) mainKontejner.remove();
    fetch("https://localhost:5001/Biblioteka/GetBiblioteka/" + bibliotekaId).then(p => {
        p.json().then(data => {
            const b = new Biblioteka(data.bibliotekaId, data.naziv);
            b.crtajBiblioteku(document.body);
        });
    });
}