import { Knjiga } from "./Knjiga.js";
import { Zanr } from "./Zanr.js";
import { Autor } from "./Autor.js";

export class Biblioteka {
    constructor(id, naziv) {
        this.id = id;
        this.naziv = naziv;
    }

    crtajBiblioteku(host) {
        if (!host)
            throw new Error("Ne postoji roditeljski element");

        var body = document.createElement("div");
        body.className = "mainKontejner";
        host.appendChild(body);
        host = body;

        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("kontejner");
        host.appendChild(this.kontejner);

        let tabovi = document.createElement("div");
        tabovi.classList.add("tabovi");
        this.kontejner.appendChild(tabovi);

        let knjigeTab = document.createElement("button");
        knjigeTab.innerHTML = "Knjige";
        knjigeTab.classList.add("tab");
        knjigeTab.onclick = (ev) => {
            zanroviTab.classList.remove("active");
            autoriTab.classList.remove("active");
            knjigeTab.classList.add("active");

            this.crtajAddFormuKnjiga(this.kontejner);
            this.ucitajKnjige(this.kontejner);
        }
        tabovi.appendChild(knjigeTab);

        let autoriTab = document.createElement("button");
        autoriTab.innerHTML = "Autori";
        autoriTab.classList.add("tab");
        autoriTab.onclick = (ev) => {
            knjigeTab.classList.remove("active");
            zanroviTab.classList.remove("active");
            autoriTab.classList.add("active");

            // Brisanje prethodnog ekrana
            this.crtajAddFormuAutor(this.kontejner);
            this.ucitajAutore(this.kontejner);
        }
        tabovi.appendChild(autoriTab);

        let zanroviTab = document.createElement("button");
        zanroviTab.innerHTML = "Zanrovi";
        zanroviTab.classList.add("tab");
        zanroviTab.onclick = (ev) => {
            knjigeTab.classList.remove("active");
            autoriTab.classList.remove("active");
            zanroviTab.classList.add("active");

            this.crtajAddFormuZanr(this.kontejner);
            this.ucitajZanrove(this.kontejner);
        }
        tabovi.appendChild(zanroviTab);

        var loadItem = localStorage.getItem('loadItem');
        if (!loadItem || loadItem === 'knjiga') {
            this.crtajAddFormuKnjiga(this.kontejner);
            knjigeTab.classList.add("active");
            this.ucitajKnjige(this.kontejner);
        }
        else if (loadItem === 'autor') {
            this.crtajAddFormuAutor(this.kontejner);
            autoriTab.classList.add("active");
            this.ucitajAutore(this.kontejner);
        }
        else {
            this.crtajAddFormuZanr(this.kontejner);
            zanroviTab.classList.add("active");
            this.ucitajZanrove(this.kontejner);
        }
        localStorage.removeItem('loadItem');
    }

    // Add forme
    crtajAddFormuKnjiga(host) {
        let forma = document.getElementsByClassName("addFormaKnjiga")[0];
        if (forma) forma.remove();

        let labela = document.getElementsByClassName("labelAdd")[0];
        if (labela) labela.remove();

        labela = document.createElement("label");
        labela.innerHTML = "Dodaj novu knjigu";
        labela.className = "labelAdd";
        host.appendChild(labela);

        forma = document.createElement("div");
        forma.classList.add("forma");
        forma.classList.add("addFormaKnjiga");
        host.appendChild(forma);

        labela = document.createElement("label");
        labela.innerHTML = "Naziv knjige: ";
        forma.appendChild(labela);

        let element = document.createElement("input");
        element.className = "naziv";
        element.id = "nazivAdd";
        forma.appendChild(element);

        labela = document.createElement("label");
        element = document.createElement("select");
        labela.className = "naziv";
        labela.innerHTML = "Autor";
        element.id = "autorAdd";
        this.fillAutor(element);
        forma.appendChild(labela);
        forma.appendChild(element);

        labela = document.createElement("label");
        element = document.createElement("select");
        labela.className = "naziv";
        labela.innerHTML = "Zanr";
        element.id = "zanrAdd";
        this.fillZanr(element);
        forma.appendChild(labela);
        forma.appendChild(element);

        labela = document.createElement("label");
        labela.innerHTML = "Godina izdavanja: ";
        forma.appendChild(labela);

        element = document.createElement("select");
        element.className = "datum";
        element.id = "godinaAdd";
        this.fillGodina(element);
        forma.appendChild(element);

        labela = document.createElement("label");
        labela.innerHTML = "Procitano";
        forma.appendChild(labela);

        element = document.createElement("INPUT");
        element.setAttribute("type", "checkbox");
        element.id = "procitanoAdd";
        element.className = "naziv";
        forma.appendChild(element);

        const button = document.createElement("button");
        button.className = "button";
        button.innerHTML = "Dodaj knjigu";
        button.onclick = (ev) => {
            this.dodajKnjigu();
        }
        forma.appendChild(button);
    }

    crtajAddFormuAutor(host) {
        let forma = document.getElementsByClassName("addFormaAutor")[0];
        if (forma) forma.remove();

        let labela = document.getElementsByClassName("labelAdd")[0];
        if (labela) labela.remove();

        labela = document.createElement("label");
        labela.innerHTML = "Dodaj novog autora";
        labela.className = "labelAdd";
        host.appendChild(labela);

        forma = document.createElement("div");
        forma.classList.add("forma");
        forma.classList.add("addFormaAutor");
        host.appendChild(forma);

        labela = document.createElement("label");
        labela.innerHTML = "Ime: ";
        forma.appendChild(labela);

        let element = document.createElement("input");
        element.className = "naziv";
        element.id = "autorImeAdd";
        forma.appendChild(element);

        labela = document.createElement("label");
        labela.innerHTML = "Prezime: ";
        forma.appendChild(labela);

        element = document.createElement("input");
        element.className = "naziv";
        element.id = "autorPrezimeAdd";
        forma.appendChild(element);

        labela = document.createElement("label");
        labela.innerHTML = "Godina rodjenja: ";
        forma.appendChild(labela);

        element = document.createElement("select");
        element.className = "datum";
        element.id = "autorGodinaAdd";
        this.fillGodina(element);
        forma.appendChild(element);

        const button = document.createElement("button");
        button.className = "button";
        button.innerHTML = "Dodaj autora";
        button.onclick = (ev) => {
            this.dodajAutora();
        }
        forma.appendChild(button);
    }

    crtajAddFormuZanr(host) {
        let forma = document.getElementsByClassName("addFormaZanr")[0];
        if (forma) forma.remove();

        let labela = document.getElementsByClassName("labelAdd")[0];
        if (labela) labela.remove();

        labela = document.createElement("label");
        labela.innerHTML = "Dodaj novi zanr";
        host.appendChild(labela);
        labela.className = "labelAdd";

        forma = document.createElement("div");
        forma.classList.add("forma");
        forma.classList.add("addFormaZanr");
        host.appendChild(forma);

        labela = document.createElement("label");
        labela.innerHTML = "Naziv: ";
        forma.appendChild(labela);

        let element = document.createElement("input");
        element.className = "naziv";
        element.id = "zanrNazivAdd";
        forma.appendChild(element);

        labela = document.createElement("label");
        labela.innerHTML = "Opis: ";
        forma.appendChild(labela);

        element = document.createElement("textarea");
        element.className = "naziv";
        element.id = "zanrOpisAdd";
        forma.appendChild(element);

        const button = document.createElement("button");
        button.className = "button";
        button.innerHTML = "Dodaj zanr";
        button.onclick = (ev) => {
            this.dodajZanr();
        }
        forma.appendChild(button);
    }

    // Ucitavanje podataka
    ucitajKnjige(host) {
        // Brisanje prethodnog ekrana
        var autori = document.getElementsByClassName("kontejnerAutori")[0];
        var zanrovi = document.getElementsByClassName("kontejnerZanrovi")[0];
        var addFormaAutor = document.getElementsByClassName("addFormaAutor")[0];
        var addFormaZanr = document.getElementsByClassName("addFormaZanr")[0];

        if (autori) autori.remove();
        if (zanrovi) zanrovi.remove();
        if (addFormaAutor) addFormaAutor.remove();
        if (addFormaZanr) addFormaZanr.remove();

        let kontejnerKnjige = document.getElementsByClassName("kontejnerKnjige")[0];
        if (kontejnerKnjige) kontejnerKnjige.remove();
        kontejnerKnjige = document.createElement("div");
        kontejnerKnjige.classList.add("kontejnerKnjige");
        kontejnerKnjige.classList.add("kontejnerPrikaz");
        host.appendChild(kontejnerKnjige);
        fetch("https://localhost:5001/Knjiga/GetKnjige/" + this.id).then(p => {
            p.json().then(data => {
                data.forEach(knjiga => {
                    let k = new Knjiga(knjiga.knjigaId, knjiga.naziv, knjiga.godinaIzdavanja, knjiga.procitano, knjiga.zanr, knjiga.autor, this.id);
                    k.crtanjeKnjiga(kontejnerKnjige);
                });
            });
        });
    }

    ucitajAutore(host) {
        // Brisanje prethodnog ekrana
        var knjige = document.getElementsByClassName("kontejnerKnjige")[0];
        var zanrovi = document.getElementsByClassName("kontejnerZanrovi")[0];
        var addFormaKnjiga = document.getElementsByClassName("addFormaKnjiga")[0];
        var addFormaZanr = document.getElementsByClassName("addFormaZanr")[0];
        if (knjige) knjige.remove();
        if (zanrovi) zanrovi.remove();
        if (addFormaKnjiga) addFormaKnjiga.remove();
        if (addFormaZanr) addFormaZanr.remove();

        let kontejnerAutori = document.getElementsByClassName("kontejnerAutori")[0];
        if (kontejnerAutori) kontejnerAutori.remove();
        kontejnerAutori = document.createElement("div");
        kontejnerAutori.classList.add("kontejnerAutori");
        kontejnerAutori.classList.add("kontejnerPrikaz");
        host.appendChild(kontejnerAutori);
        fetch("https://localhost:5001/Autor/GetAutori/" + this.id).then(p => {
            p.json().then(data => {
                data.forEach(autor => {
                    let a = new Autor(autor.autorId, autor.ime, autor.prezime, autor.godinaRodjenja, this.id);
                    a.crtanjeAutora(kontejnerAutori);
                });
            });
        });
    }

    ucitajZanrove(host) {
        // Brisanje prethodnog ekrana
        var knjige = document.getElementsByClassName("kontejnerKnjige")[0];
        var autori = document.getElementsByClassName("kontejnerAutori")[0];
        var addFormaKnjiga = document.getElementsByClassName("addFormaKnjiga")[0];
        var addFormaAutor = document.getElementsByClassName("addFormaAutor")[0];
        if (knjige) knjige.remove();
        if (autori) autori.remove();
        if (addFormaAutor) addFormaAutor.remove();
        if (addFormaKnjiga) addFormaKnjiga.remove();

        let kontejnerZanrovi = document.getElementsByClassName("kontejnerZanrovi")[0];
        if (kontejnerZanrovi) kontejnerZanrovi.remove();
        kontejnerZanrovi = document.createElement("div");
        kontejnerZanrovi.classList.add("kontejnerZanrovi");
        kontejnerZanrovi.classList.add("kontejnerPrikaz");
        host.appendChild(kontejnerZanrovi);
        fetch("https://localhost:5001/Zanr/GetZanrovi/" + this.id).then(p => {
            p.json().then(data => {
                data.forEach(zanr => {
                    let z = new Zanr(zanr.zanrId, zanr.naziv,zanr.opis, this.id);
                    z.crtanjeZanra(kontejnerZanrovi);
                });
            });
        });
    }

    // Dodavanje podataka

    dodajKnjigu() {
        var naziv = document.getElementById("nazivAdd").value;
        var autorId = document.getElementById("autorAdd").value;
        var zanrId = document.getElementById("zanrAdd").value;
        var godinaIzdavanja = document.getElementById("godinaAdd").value;
        var procitano = document.getElementById("procitanoAdd").checked;

        // Validacija
        if (!naziv) { alert("Morate uneti naziv knjige!"); return; }
        if (!autorId) { alert("Morate uneti autora!"); return; }
        if (!zanrId) { alert("Morate uneti zanr!"); return; }

        var data = JSON.stringify({
            "naziv": naziv,
            "godinaIzdavanja": godinaIzdavanja,
            "procitano": procitano
        });

        fetch("https://localhost:5001/Knjiga/AddKnjiga/" + autorId + "/" + zanrId + "/" + this.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        }).then(r => {
            if (r.ok) {
                this.crtajAddFormuKnjiga(this.kontejner);
                this.ucitajKnjige(this.kontejner);
            }
            else {
                alert("Doslo je do greske priliko dodavanja knjige");
            }
        });
    }

    dodajAutora() {
        var ime = document.getElementById("autorImeAdd").value;
        var prezime = document.getElementById("autorPrezimeAdd").value;
        var godina = document.getElementById("autorGodinaAdd").value;

        // Validacija
        if (!ime) { alert("Morate uneti ime autora!"); return; }
        if (!prezime) { alert("Morate uneti prezime autora!"); return; }

        var data = JSON.stringify({
            "ime": ime,
            "prezime": prezime,
            "godinaRodjenja": godina
        });

        fetch("https://localhost:5001/Autor/AddAutor/" + this.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        }).then(r => {
            if (r.ok) {
                this.crtajAddFormuAutor(this.kontejner);
                this.ucitajAutore(this.kontejner);
            }
            else {
                alert("Doslo je do greske priliko dodavanja autora");
            }
        });
    }

    dodajZanr() {
        var naziv = document.getElementById("zanrNazivAdd").value;
        var opis = document.getElementById("zanrOpisAdd").value;

        // Validacija
        if (!naziv) { alert("Morate uneti naziv zanra!"); return; }

        var data = JSON.stringify({
            "naziv": naziv,
            "opis":opis
        });

        fetch("https://localhost:5001/Zanr/AddZanr/" + this.id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        }).then(r => {
            if (r.ok) {
                this.crtajAddFormuZanr(this.kontejner);
                this.ucitajZanrove(this.kontejner);
            }
            else {
                alert("Doslo je do greske priliko dodavanja zanra");
            }
        });
    }

    // Pomocne funkcije
    fillAutor(host) {
        var a = document.createElement("option");
        fetch("https://localhost:5001/Autor/GetAutori/" + this.id).then(p => {
            p.json().then(data => {
                data.forEach(autor => {
                    const stud = new Autor(autor.autorId, autor.ime, autor.prezime, autor.godinaRodjenja);
                    a = document.createElement("option");
                    a.innerHTML = autor.ime + " " + autor.prezime;
                    a.value = autor.autorId;
                    host.appendChild(a);
                });
            });
        });
    }

    fillZanr(host) {
        var z = document.createElement("option");
        fetch("https://localhost:5001/Zanr/GetZanrovi/" + this.id).then(p => {
            p.json().then(data => {
                data.forEach(zanr => {
                    const stud = new Zanr(zanr.zanrId, zanr.naziv);
                    z = document.createElement("option");
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
            dateOption.text = currentYear;
            dateOption.value = currentYear;
            host.add(dateOption);
            currentYear -= 1;
        }
    }
}