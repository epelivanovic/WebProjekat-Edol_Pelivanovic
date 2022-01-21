export class Autor {
    constructor(id, ime, prezime, godinaRodjenja, bibliotekaId) {
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.godinaRodjenja = godinaRodjenja;
        this.bibliotekaId = bibliotekaId;
    }

    crtanjeAutora(host) {
        this.miniKontejner = document.createElement("div");
        this.miniKontejner.classList.add("entitet");
        this.miniKontejner.classList.add("autor");
        if (this.ime && this.prezime) {
            var headLabel = document.createElement("label");
            headLabel.innerHTML = this.ime + " " + this.prezime + "<br>";
            headLabel.className = "headLabel";
            this.miniKontejner.appendChild(headLabel);
            this.miniKontejner.innerHTML += "<br>";
            if(this.godinaRodjenja != 0)
            {
                this.miniKontejner.innerHTML += "Godina rodjenja: " + this.godinaRodjenja + "<br>";
            }
            else{
                this.miniKontejner.innerHTML += "Godina rodjenja: Nepoznato " +  "<br>";
            }
            let buttonUpdate = document.createElement("button");
            buttonUpdate.className = "button";
            buttonUpdate.innerHTML = "Izmeni autora";
            buttonUpdate.onclick = (ev) => {
                this.updateScreen(this.id);
            }
            var buttonDiv = document.createElement("div");
            buttonDiv.className = "buttonDiv";
            buttonDiv.appendChild(buttonUpdate);

            let buttonDelete = document.createElement("button");
            buttonDelete.className = "button";
            buttonDelete.innerHTML = "Obrisi autora";
            buttonDelete.onclick = (ev) => {
                this.obrisiAutor(this.id);
            }
            buttonDiv.appendChild(buttonDelete);
            this.miniKontejner.appendChild(buttonDiv);
        }
        host.appendChild(this.miniKontejner);
    }

    // Update screen
    updateScreen(id) {
        let kontejner = document.getElementsByClassName("kontejner")[0];
        let kontejnerKnjige = document.getElementsByClassName("kontejnerAutori")[0];
        let host = document.getElementsByClassName("forma")[0];
        this.disableButtons();
        host.style.opacity = "0.2";
        kontejnerKnjige.style.opacity = "0.2";
        const updateScreen = document.createElement("div");
        updateScreen.className = "updateScreen";
        kontejner.appendChild(updateScreen);

        let labela = document.createElement("label");
        labela.classList.add("labelUpdate");
        labela.classList.add("headLabel");
        labela.innerHTML = "Izmeni autora";
        updateScreen.appendChild(labela);

        labela = document.createElement("label");
        labela.className = "labelUpdate";
        labela.innerHTML = "Ime: ";
        updateScreen.appendChild(labela);

        let element = document.createElement("input");
        element.id = "imeUpdate";
        element.value = this.ime;
        element.className = "naziv";
        updateScreen.appendChild(element);

        labela = document.createElement("label");
        labela.className = "labelUpdate";
        labela.innerHTML = "Prezime: ";
        updateScreen.appendChild(labela);

        element = document.createElement("input");
        element.id = "prezimeUpdate";
        element.value = this.prezime;
        element.className = "naziv";
        updateScreen.appendChild(element);

        labela = document.createElement("label");
        labela.className = "labelUpdate";
        labela.innerHTML = "Godina rodjenja: ";
        updateScreen.appendChild(labela);

        element = document.createElement("select");
        element.id = "godinaUpdate";
        element.className = "datum";
        this.fillGodina(element);
        updateScreen.appendChild(element);

        const buttonDiv = document.createElement("div");
        buttonDiv.className = "buttonDivUpdate";

        let buttonUpdate = document.createElement("button");
        buttonUpdate.className = "button";
        buttonUpdate.innerHTML = "Izmeni autora";
        buttonUpdate.onclick = (ev) => {
            this.updateAutor(id);
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

    // Delete && update
    obrisiAutor(id) {
        fetch("https://localhost:5001/Autor/DeleteAutor/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(p => {
            if (p.ok) {
                localStorage.setItem('loadItem', 'autor');
                localStorage.setItem('bibliotekaLoad', this.bibliotekaId);
                document.location.reload();
            }
            else if(p.status == 403){
                alert("Autor ne moze biti obrisan jer je povezan sa postojecom knjigom!");
            }
            else {
                alert("Doslo je do greske prilikom brisanja");
            }
        });
    }

    updateAutor(id) {
        var ime = document.getElementById("imeUpdate").value;
        var prezime = document.getElementById("prezimeUpdate").value;
        var godinaRodjenja = document.getElementById("godinaUpdate").value;

        var data = JSON.stringify({
            "autorId": id,
            "ime": ime,
            "prezime": prezime,
            "godinaRodjenja": godinaRodjenja
        });

        fetch("https://localhost:5001/Autor/UpdateAutor", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        }).then(r => {
            if (r.ok) {
                localStorage.setItem('loadItem', 'autor');
                localStorage.setItem('bibliotekaLoad', this.bibliotekaId);
                document.location.reload();
            }
            else {
                alert("Doslo je do greske priliko azuriranja autora");
            }
        });
    }

    // Pomocne funkcije
    fillGodina(host) {
        let unknownOption = document.createElement('option');
        unknownOption.text = "Nepoznato";
        unknownOption.value = 0;
        host.add(unknownOption);

        let currentYear = new Date().getFullYear();
        let earliestYear = 1800;
        while (currentYear >= earliestYear) {
            let dateOption = document.createElement('option');
            if (currentYear == this.godinaRodjenja) dateOption.setAttribute("selected", true);
            dateOption.text = currentYear;
            dateOption.value = currentYear;
            host.add(dateOption);
            currentYear -= 1;
        }
    }

    disableButtons() {
        let buttons = document.getElementsByClassName("button");
        let tabButtons = document.getElementsByClassName("tab");
        console.log("tab buttons: ",tabButtons);
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
}