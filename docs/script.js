let firstTap = true;
let h2head = 0;
let h2tail = -1;
let catCardId = 0;
let currentImg = 1;

async function faceClick(){
    if (firstTap) {
        const taptap = document.getElementById("taptap");
        taptap.remove();
        firstTap = false;
    }

    const popUpContainer = document.getElementById("popUpMaster");
    const Popup = document.createElement("h2");
    const money = document.getElementById("money");
    const currentMoney = parseInt(money.innerHTML.slice(12));
    const tarnFace = document.getElementById("tarnFace");
    const notRandomNumbers = [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5];
    const idx = Math.floor(Math.random() * notRandomNumbers.length);

    if (h2tail >= 1) {
        const unUsedPop = document.getElementById("popUp" + h2tail.toString());
        unUsedPop.remove();
    }

    h2head += 1;
    h2tail += 1;
    incMoney = Math.floor((Math.random() * 81) + 20);
    // incMoney = 10000; // for testing
    bot = Math.floor((Math.random() * 41) + 40);
    right = Math.floor((Math.random() * 41) + 30);

    if (notRandomNumbers[idx] != currentImg) {
        currentImg = notRandomNumbers[idx];
        tarnFace.src = "pics/" + currentImg.toString() + ".png";
    }
    money.innerHTML = "💸 Money - $" + (currentMoney + incMoney).toString();
    Popup.id = "popUp" + h2head.toString();
    Popup.className = "pointPopUp";
    Popup.style.bottom = bot.toString() + "%";
    Popup.style.right = right.toString() + "%";
    Popup.style.color = "green";
    Popup.innerHTML = "+ $" + incMoney.toString();
    popUpContainer.appendChild(Popup);

}

async function buyCat() {
    const money = document.getElementById("money");
    const currentMoney = parseInt(money.innerHTML.slice(12));
    if (currentMoney < 1000) {
        alert("เงินไม่พอ 😡");
    }

    else {
        try {
            let catUrl = 'https://api.thecatapi.com/v1/images/search';
            const response = await fetch(catUrl);
            const catData = await response.json();
            const catImgUrl = catData["0"]["url"];

            const catContainer = document.getElementById("catContainer");
            const divInner = document.createElement('div');
            const centerDiv = document.createElement('div');
            const divImg = document.createElement('div');
            const nameP = document.createElement('p');
            const nameButton = document.createElement('button');

            divInner.className = "cards-inner";
            centerDiv.className = "center";

            nameP.innerHTML = "ตั้งชื่อแมว 😻";
            nameP.id = "catName" + catCardId.toString();

            nameButton.innerHTML = "ตั้งชื่อ";
            nameButton.id = "INPcatName" + catCardId.toString();
            nameButton.setAttribute("onclick", "changeName(this.id)");
            nameButton.style.width = "80%";

            divImg.style.height = "120px";
            divImg.style.marginBottom = "10px";
            divImg.innerHTML = "<img style='width: 100%; height: 100%; overflow:hidden;' src='" + catImgUrl + "'/>";
            
            catCardId += 1;
            divInner.appendChild(divImg);
            divInner.appendChild(nameP);
            // centerDiv.appendChild(nameButton);
            // divInner.appendChild(centerDiv);
            divInner.appendChild(nameButton);
            catContainer.appendChild(divInner);
            money.innerHTML = "💸 Money - $" + (currentMoney - 1000).toString();
        }
        catch (error) {
            console.error(error);
        }
    }

}

async function changeName(id) {
    const nameP = document.getElementById(id.slice(3));

    const newName = prompt("แมวขื่ออะไร ??");
    if (newName != null) {
        nameP.innerHTML = newName;
    }
}

async function tapAnimated() {
    const tarnFace = document.getElementById("tarnFace");
    const money =document.getElementById("money");

    tarnFace.addEventListener("click", function(e) {
        e.preventDefault();
        
        // -> removing the class
        money.classList.remove("Money");
        tarnFace.classList.remove("faceAnimation");
        
        // -> triggering reflow /* The actual magic */
        // element.offsetWidth = element.offsetWidth;
        // Do this instead:
        void money.offsetWidth;
        
        // -> and re-adding the class
        money.classList.add("Money");
        tarnFace.classList.add("faceAnimation");
      }, false);
}