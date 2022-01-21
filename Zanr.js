export class Zanr {
    constructor(id, naziv, opis, bibliotekaId) {
        this.id = id;
        this.naziv = naziv;
        this.opis = opis;
        this.bibliotekaId = bibliotekaId;
    }

    crtanjeZanra(host) {
        this.miniKontejner = document.createElement("div");
        this.miniKontejner.classList.add("entitet");
        this.miniKontejner.classList.add("zanr");
        if (this.naziv) {
            var headLabel = document.createElement("label");
            headLabel.innerHTML = this.naziv + "<br>";
            headLabel.className = "headLabel";
            this.miniKontejner.appendChild(headLabel);
            this.miniKontejner.innerHTML += "<br>";

            if (this.opis) {
                var infoLabel = document.createElement("label");
                infoLabel.innerHTML = this.opis + "<br>";
                this.miniKontejner.appendChild(infoLabel);
                this.miniKontejner.innerHTML += "<br>";
            }

            let buttonUpdate = document.createElement("button");
            buttonUpdate.className = "button";
            buttonUpdate.innerHTML = "Izmeni zanr";
            buttonUpdate.onclick = (ev) => {
                this.updateScreen(this.id);
            }
            var buttonDiv = document.createElement("div");
            buttonDiv.className = "buttonDiv";
            buttonDiv.appendChild(buttonUpdate);


            let buttonDelete = document.createElement("button");
            buttonDelete.className = "button";
            buttonDelete.innerHTML = "Obrisi zanr";
            buttonDelete.onclick = (ev) => {
                this.obrisiZanr(this.id);
            }
            buttonDiv.appendChild(buttonDelete);
            this.miniKontejner.appendChild(buttonDiv);
        }
        host.appendChild(this.miniKontejner);
    }

    // Update screen
    updateScreen(id) {
        let kontejner = document.getElementsByClassName("kontejner")[0];
        let kontejnerKnjige = document.getElementsByClassName("kontejnerZanrovi")[0];
        let host = document.getElementsByClassName("forma")[0];
        this.disableButtons();
        host.style.opacity = "0.2";
        kontejnerKnjige.style.opacity = "0.2";
        const updateScreen = document.createElement("div");
        updateScreen.className = "updateScreen";
        kontejner.appendChild(updateScreen);

        let labela = document.createElement("label");
        labela.className = "headLabel";
        labela.innerHTML = "Izmeni zanr";
        updateScreen.appendChild(labela);

        labela = document.createElement("label");
        labela.classList.add("labelUpdate");
        labela.innerHTML = "Naziv: ";
        updateScreen.appendChild(labela);

        let element = document.createElement("input");
        element.id = "nazivUpdate";
        element.value = this.naziv;
        element.className = "naziv";
        updateScreen.appendChild(element);

        labela = document.createElement("label");
        labela.classList.add("labelUpdate");
        labela.innerHTML = "Opis: ";
        updateScreen.appendChild(labela);

        element = document.createElement("textarea");
        element.id = "opisUpdate";
        element.value = this.opis;
        element.className = "naziv";
        updateScreen.appendChild(element);

        const buttonDiv = document.createElement("div");
        buttonDiv.className = "buttonDivUpdate";

        let buttonUpdate = document.createElement("button");
        buttonUpdate.className = "button";
        buttonUpdate.innerHTML = "Izmeni zanr";
        buttonUpdate.onclick = (ev) => {
            this.updateZanr(id);
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
    obrisiZanr(id) {
        fetch("https://localhost:5001/Zanr/DeleteZanr/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(p => {
            if (p.ok) {
                localStorage.setItem('loadItem', 'zanr');
                localStorage.setItem('bibliotekaLoad', this.bibliotekaId);
                document.location.reload();
            }
            else if (p.status == 403) {
                alert("Zanr ne moze biti obrisan jer je povezan sa postojecom knjigom!");
            }
            else {
                alert("Doslo je do greske prilikom brisanja");
            }
        });
    }

    updateZanr(id) {
        var naziv = document.getElementById("nazivUpdate").value;
        var opis = document.getElementById("opisUpdate").value;

        var data = JSON.stringify({
            "zanrId": id,
            "naziv": naziv,
            "opis": opis
        });

        fetch("https://localhost:5001/Zanr/UpdateZanr", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        }).then(r => {
            if (r.ok) {
                localStorage.setItem('loadItem', 'zanr');
                localStorage.setItem('bibliotekaLoad', this.bibliotekaId);
                document.location.reload();
            }
            else {
                alert("Doslo je do greske priliko azuriranja zanra");
            }
        });
    }

    // Pomocne funkcije
    disableButtons() {
        let buttons = document.getElementsByClassName("button");
        let tabButtons = document.getElementsByClassName("tab");
        console.log("tab buttons: ", tabButtons);
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