let cells = document.querySelectorAll(".grid .cell");

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function () {
        let cCell = cells[i];
        // console.log(cCell);
        
        let rid = Number(cCell.getAttribute("rid"));
        let cid = Number(cCell.getAttribute("cid"));
        let address = String.fromCharCode(cid + 65) + (rid + 1);
        // console.log(address);
        
        addressBar.value = address;


        setMenuBar(rid, cid);

    })
}

function setMenuBar(rid, cid) {
    let cellObj = db[rid][cid];
    // boldButton
    if (cellObj.isBold) {
        boldButton.classList.add("selected");
    } else {
        boldButton.classList.remove("selected");
    }
    // italicButton
    if (cellObj.isItalic) {
        italicButton.classList.add("selected");
    } else {
        italicButton.classList.remove("selected");
    }
    // underlineButton
    if (cellObj.isUnderline) {
        underlineButton.classList.add("selected");
    } else {
        underlineButton.classList.remove("selected");
    }
    // font size
    fontSizeSelector.value = cellObj.fontSize;
    // font family
    fontFamilySelector.value = cellObj.fontFamily;
    // ui changes 
    for (let j = 0; j < alignmentBtns.length; j++) {
        alignmentBtns[j].classList.remove("selected");
    }
    for (let j = 0; j < alignmentBtns.length; j++) {
        let iscurrent = alignmentBtns[j].classList[2];
        if (iscurrent == cellObj.cAlignment) {
            alignmentBtns[j].classList.add("selected");
        }
    }
    // set formula in sync
    let formula = cellObj.formula;
    formulaBar.value = formula
}
