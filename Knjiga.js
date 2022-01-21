import { Autor } from "./Autor.js"
import { Zanr } from "./Zanr.js"
export class Knjiga {
    constructor(id, naziv, godinaIzdavanja, procitano, zanr, autor, bibliotekaId) {
        this.id = id;
        this.naziv = naziv;
        this.godinaIzdavanja = godinaIzdavanja;
        this.procitano = procitano;
        this.zanr = zanr;
        this.autor = autor;
        this.bibliotekaId = bibliotekaId;
    }

    crtanjeKnjiga(host) {
        this.miniKontejner = document.createElement("div");
        this.miniKontejner.classList.add("entitet");
        this.miniKontejner.classList.add("knjiga");
        if (this.naziv) {
            var headLabel = document.createElement("label");
            headLabel.innerHTML = this.naziv + "<br>";
            headLabel.className = "headLabel";
            this.miniKontejner.appendChild(headLabel);
            this.miniKontejner.innerHTML += "<br>";
            if (this.godinaIzdavanja != 0) {
                var labelInfo = document.createElement("label");
                labelInfo.innerHTML = "Godina izdavanja: " + this.godinaIzdavanja + "<br>";
                this.miniKontejner.appendChild(labelInfo);
            }
            else {
                var labelInfo = document.createElement("label");
                labelInfo.innerHTML = "Godina izdavanja: Nepoznato" + "<br>";
                this.miniKontejner.appendChild(labelInfo);
            }
            if (this.autor) {
                var labelInfo = document.createElement("label");
                labelInfo.innerHTML = "Autor: " + this.autor.ime + " " + this.autor.prezime + "<br>";
                this.miniKontejner.appendChild(labelInfo);
            }
            if (this.zanr) {
                var labelInfo = document.createElement("label");
                labelInfo.innerHTML = "Zanr: " + this.zanr.naziv + "<br>";
                this.miniKontejner.appendChild(labelInfo);
            }
            if (this.procitano) {
                var labelInfo = document.createElement("label");
                labelInfo.innerHTML = "Procitano" + "<br>";
                this.miniKontejner.appendChild(labelInfo);
            }
            else {
                var labelInfo = document.createElement("label");
                labelInfo.innerHTML = "Nije procitano" + "<br>";
                this.miniKontejner.appendChild(labelInfo);
            }
            let buttonUpdate = document.createElement("button");
            buttonUpdate.className = "button";
            buttonUpdate.innerHTML = "Izmeni knjigu";
            buttonUpdate.onclick = (ev) => {
                this.updateScreen(this.id);
            }
            var buttonDiv = document.createElement("div");
            buttonDiv.className = "buttonDiv";
            buttonDiv.appendChild(buttonUpdate);

            let buttonDelete = document.createElement("button");
            buttonDelete.className = "button";
            buttonDelete.innerHTML = "Obrisi knjigu";
            buttonDelete.onclick = (ev) => {
                this.obrisiKnjigu(this.id);
            }
            buttonDiv.appendChild(buttonDelete);
            this.miniKontejner.appendChild(buttonDiv);

        }
        else {
            this.miniKontejner.innerHTML = "Slobodno mesto u biblioteci";
        }
        host.appendChild(this.miniKontejner);
    }

    //Delete 
    obrisiKnjigu(id) {
        fetch("https://localhost:5001/Knjiga/DeleteKnjiga/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(p => {
            if (p.ok) {
                localStorage.setItem('loadItem', 'knjiga');
                localStorage.setItem('bibliotekaLoad', this.bibliotekaId);
                document.location.reload();
            }
            else {
                alert("Doslo je do greske prilikom brisanja");
            }
        });
    }

    // Update prozor otvaranje
    updateScreen(id) {
        let kontejner = document.getElementsByClassName("kontejner")[0];
        let kontejnerKnjige = document.getElementsByClassName("kontejnerKnjige")[0];
        let host = document.getElementsByClassName("forma")[0];
        this.disableButtons();
        host.style.opacity = "0.2";
        kontejnerKnjige.style.opacity = "0.2";
        const updateScreen = document.createElement("div");
        updateScreen.className = "updateScreen";
        kontejner.appendChild(updateScreen);

        let labela = document.createElement("label");
        labela.className = "headLabel";
        labela.innerHTML = "Izmeni knjigu";
        updateScreen.appendChild(labela);

        labela = document.createElement("label");
        labela.innerHTML = "Naziv knjige: ";
        updateScreen.appendChild(labela);

        let element = document.createElement("input");
        element.id = "nazivUpdate";
        element.value = this.naziv;
        element.className = "naziv";
        updateScreen.appendChild(element);

        labela = document.createElement("label");
        element = document.createElement("select");
        element.id = "autorUpdate";
        labela.className = "naziv";
        labela.innerHTML = "Autor";
        this.fillAutor(element);
        updateScreen.appendChild(labela);
        updateScreen.appendChild(element);

        labela = document.createElement("label");
        element = document.createElement("select");
        element.id = "zanrUpdate";
        labela.className = "naziv";
        labela.innerHTML = "Zanr";
        this.fillZanr(element);
        updateScreen.appendChild(labela);
        updateScreen.appendChild(element);

        labela = document.createElement("label");
        labela.innerHTML = "Godina izdavanja: ";
        updateScreen.appendChild(labela);

        element = document.createElement("select");
        element.id = "godinaUpdate";
        element.className = "datum";
        this.fillGodina(element);
        updateScreen.appendChild(element);

        labela = document.createElement("label");
        labela.innerHTML = "Procitano";
        updateScreen.appendChild(labela);

        element = document.createElement("INPUT");
        element.checked = this.procitano;
        element.id = "procitanoUpdate";
        element.setAttribute("type", "checkbox");
        element.className = "naziv";
        updateScreen.appendChild(element);

        const buttonDiv = document.createElement("div");
        buttonDiv.className = "buttonDivUpdate";

        let buttonUpdate = document.createElement("button");
        buttonUpdate.className = "button";
        buttonUpdate.innerHTML = "Izmeni knjigu";
        buttonUpdate.onclick = (ev) => {
            this.updateKnjiga(id);
        }
        buttonDiv.appendChild(buttonUpdate);

        let buttonCancel = document.createElement("button");
        buttonCancel.className = "button";
        buttonCancel.innerHTML = "Odustani";
        buttonCancel.onclick = (ev) => {
            updateScreen.remove();
            this.enableButtons();
            host.style.opacity = "0.7";
            kontejnerKnjige.style.opacity = "0.7";
        }
        buttonDiv.appendChild(buttonCancel);
        updateScreen.appendChild(buttonDiv);
    }

    // Update knjiga
    updateKnjiga(id) {
        var naziv = document.getElementById("nazivUpdate").value;
        var autorId = document.getElementById("autorUpdate").value;
        var zanrId = document.getElementById("zanrUpdate").value;
        var godinaIzdavanja = document.getElementById("godinaUpdate").value;
        var procitano = document.getElementById("procitanoUpdate").checked;

        var data = JSON.stringify({
            "knjigaId": id,
            "naziv": naziv,
            "godinaIzdavanja": godinaIzdavanja,
            "procitano": procitano
        });

        fetch("https://localhost:5001/Knjiga/UpdateKnjiga/" + autorId + "/" + zanrId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        }).then(r => {
            if (r.ok) {
                localStorage.setItem('loadItem', 'knjiga');
                localStorage.setItem('bibliotekaLoad', this.bibliotekaId);
                document.location.reload();
            }
            else {
                alert("Doslo je do greske priliko azuriranja knjige");
            }
        });
    }

    // Pomocne funkcije
    disableButtons() {
        let buttons = document.getElementsByClassName("button");
        let tabButtons = document.getElementsByClassName("tab");
        for (var button of buttons) {
            button.disabled = true;
        }
        for (var button of tabButtons) {
            button.disabled = true;
        }
    }

    enableButtons() {
        let buttons = document.getElementsByClassName("button");
        let tabButtons = document.getElementsByClassName("tab");
        for (var button of buttons) {
            button.disabled = false;
        }
        for (var button of tabButtons) {
            button.disabled = false;
        }
    }

    fillAutor(host) {
        var a = document.createElement("option");
        fetch("https://localhost:5001/Autor/GetAutori/" + this.bibliotekaId).then(p => {
            p.json().then(data => {
                data.forEach(autor => {
                    const stud = new Autor(autor.autorId, autor.ime, autor.prezime, autor.godinaRodjenja);
                    a = document.createElement("option");
                    if (autor.autorId == this.autor.autorId) a.setAttribute("selected", true);
                    a.innerHTML = autor.ime + " " + autor.prezime;
                    a.value = autor.autorId;
                    host.appendChild(a);
                });
            });
        });
    }

    fillZanr(host) {
        var z = document.createElement("option");
        fetch("https://localhost:5001/Zanr/GetZanrovi/" + this.bibliotekaId).then(p => {
            p.json().then(data => {
                data.forEach(zanr => {
                    const stud = new Zanr(zanr.zanrId, zanr.naziv);
                    z = document.createElement("option");
                    if (zanr.zanrId == this.zanr.zanrId) z.setAttribute("selected", true);
                    z.innerHTML = zanr.naziv;
                    z.value = zanr.zanrId;
                    host.appendChild(z);
                });
            });
        });
    }

    fillGodina(host) {
        let unknownOption = document.createElement('option');
        unknownOption.text = "Nepoznato";
        unknownOption.value = 0;
        host.add(unknownOption);

        let currentYear = new Date().getFullYear();
        let earliestYear = 1800;
        while (currentYear >= earliestYear) {
            let dateOption = document.createElement('option');
            if (currentYear == this.godinaIzdavanja) dateOption.setAttribute("selected", true);
            dateOption.text = currentYear;
            dateOption.value = currentYear;
            host.add(dateOption);
            currentYear -= 1;
        }
    }
}