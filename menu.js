let fontSizeSelector = document.querySelector(".select_f_size");
let fontFamilySelector = document.querySelector(".select_f_family");
let boldButton = document.querySelector(".fa-bold");
let italicButton = document.querySelector(".fa-italic");
let underlineButton = document.querySelector(".fa-underline");
let addressBar = document.querySelector(".address_bar");
let alignmentBtns = document
    .querySelectorAll(".alignment_container i");


fontSizeSelector.addEventListener("change", function () {
    //   **************UI*************************
    let fontSize = fontSizeSelector.value;
    let cellToBeChanged = getCell();
    cellToBeChanged.style.fontSize = fontSize + "px";

    // *********************db******************* 
    let { rid, cid } = getRidCidFromAddressBar();
    let dbCellObj = db[rid][cid];
    dbCellObj.fontSize = fontSize;
})
fontFamilySelector.addEventListener("change", function () {
    let fontFamily = fontFamilySelector.value;
    
    let cellToBeChanged = getCell();
    
    cellToBeChanged.style.fontFamily = fontFamily;

    // db update 
    let { rid, cid } = getRidCidFromAddressBar();
    let dbCellObj = db[rid][cid];
    dbCellObj.fontFamily = fontFamily;
})


boldButton.addEventListener("click", function () {
    let isSelected = boldButton.classList[2];
    
    let cellToBeChanged = getCell();
    let { rid, cid } = getRidCidFromAddressBar();
    let dbCellObj = db[rid][cid];
    
    if (isSelected == "selected") {
        boldButton.classList.remove("selected");
        cellToBeChanged.style.fontWeight = "normal";
        
        dbCellObj.isBold = false;
    } else {
        boldButton.classList.add("selected");
        cellToBeChanged.style.fontWeight = "bold";

        dbCellObj.isBold = true;
    }
})


italicButton.addEventListener("click", function () {
    let isSelected = italicButton.classList[2];
    let cellToBeChanged = getCell();
    let { rid, cid } = getRidCidFromAddressBar();
    let dbCellObj = db[rid][cid];
    if (isSelected == "selected") {
        italicButton.classList.remove("selected");
        cellToBeChanged.style.fontStyle = "normal";
        dbCellObj.isItalic = false;
    } else {
        italicButton.classList.add("selected");
        cellToBeChanged.style.fontStyle = "italic";
        dbCellObj.isItalic = true;

    }
})

underlineButton.addEventListener("click", function () {
    let isSelected = underlineButton.classList[2];
    let cellToBeChanged = getCell();
    let { rid, cid } = getRidCidFromAddressBar();
    let dbCellObj = db[rid][cid];
    if (isSelected == "selected") {
        underlineButton.classList.remove("selected");
        cellToBeChanged.style.textDecoration = "none";
        dbCellObj.isUnderline = false;
    } else {
        underlineButton.classList.add("selected");
        cellToBeChanged.style.textDecoration = "underline";
        dbCellObj.isUnderline = true;
    }
})

// alignment 
for (let i = 0; i < alignmentBtns.length; i++) {
    alignmentBtns[i].addEventListener("click", function () {
        let curElem = alignmentBtns[i];
        for (let j = 0; j < alignmentBtns.length; j++) {
            alignmentBtns[j].classList.remove("selected");
        }
        curElem.classList.add("selected");
        let alignment = curElem.classList[2];

        let cellToBeChanged = getCell();
        console.log("cellToBeChanged", cellToBeChanged);
        cellToBeChanged.style.textAlign = alignment;
         
        let { rid, cid } = getRidCidFromAddressBar();
        let dbCellObj = db[rid][cid];
        dbCellObj.cAlignment = alignment;
    })

}


// ********************helper function*****************
function getCell() {
    let { rid, cid } = getRidCidFromAddressBar();
    let cell = document.querySelector
        (`.grid .cell[rid="${rid}"][cid="${cid}"]`);
    return cell;
}
function getRidCidFromAddressBar() {
    let address = addressBar.value;
    // console.log(address);
    let ciChar = address.charCodeAt(0);
    let rowid = address.substr(1);
    let cid = Number(ciChar) - 65;
    let rid = Number(rowid) - 1;
    return { "rid": rid, "cid": cid }
}
