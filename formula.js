// *********************************************set value*****************************
for (let i = 0; i < cells.length; i++) {
    // when a cell is clicked -> element
    cells[i].addEventListener("blur", function () {
        // db set value
        let { rid, cid } = getRidCidFromUI(cells[i]);
        let dbCell = db[rid][cid];
        if (dbCell.formula != "" &&
            dbCell.value != cells[i].innerText) {
            let cCell = addressBar.value;
            removeFormula(dbCell, cCell);
        }
        dbCell.value = cells[i].innerText;

        evaluateChildren(dbCell.children);
    })
}
function evaluateChildren(children) {
    for (let i = 0; i < children.length; i++) {
        let cChildren = children[i];
        let { rid, cid } = getRidCidFromStringAddress(cChildren);
        let dbChildrenCell = db[rid][cid];

        let cFormula = dbChildrenCell.formula;
        let ans = evaluate(cFormula);
        setCell(ans, rid, cid);

        let grandChildren = dbChildrenCell.children;
        console.log(grandChildren);
        evaluateChildren(grandChildren);
    }
}
// *******************************************set formula***************************************
const formulaBar = document.querySelector(".formula_bar");
formulaBar.addEventListener("keypress", function (e) {
    if (e.key == "Enter" && formulaBar.value != "") {
        let formula = formulaBar.value;
        let cCell = addressBar.value;
        let { rid, cid } = getRidCidFromAddressBar();
        let dbCell = db[rid][cid];
        let oldFormula = dbCell.formula;
        if (oldFormula == formula) {
            return;
        }
        // remove 
        if (oldFormula != "") {
            removeFormula(dbCell, cCell);
        }
        // add
        let ans = evaluate(formula);
        // console.log(ans);
        setCell(ans, rid, cid);
        setFormulaInDb(formula, rid, cid, ans, cCell);
    }
})

function removeFormula(dbCell, cCell) {
    let formula = dbCell.formula
    let formulaEntities = formula.split(" ");
    
    for (let i = 0; i < formulaEntities.length; i++) {
        let cEntity = formulaEntities[i];
        let ascii = cEntity.charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            let { rid, cid } = getRidCidFromStringAddress(cEntity);
            let children = db[rid][cid].children;
            let idx = children.indexOf(cCell);
            if (idx != -1) {
                children.splice(idx, 1);
            }
        }
    }
    dbCell.formula = "";



}

function evaluate(formula) {
    // ( A1 + A2 )-> split(" ")-> array -> [(,A1,+,A2,)]
    let formulaEntities = formula.split(" ");
    for (let i = 0; i < formulaEntities.length; i++) {
        let cEntity = formulaEntities[i];
        let ascii = cEntity.charCodeAt(0);
        // / lies b/w -> A to Z we want that  
        if (ascii >= 65 && ascii <= 90) {
            // this is our cell
            // replace values with cells in the formula
            // console.log(cEntity);
            let { rid, cid } = getRidCidFromStringAddress
                (cEntity)
            let value = db[rid][cid].value;
            // console.log(value);
            formulaEntities[i] = value;
        }
    }
   
    // replaced with values 
    let formulaToEvaluate = formulaEntities.join("");
    console.log(formulaToEvaluate);
    let ans = eval(formulaToEvaluate);
    return ans;
}
function setCell(ans, rid, cid) {
    let cell = document.querySelector
        (`.grid .cell[rid="${rid}"][cid="${cid}"]`);
    cell.innerText = ans;
    // db change 
    db[rid][cid].value = ans;
}
function setFormulaInDb(formula, rid, cid, ans, cCell) {
    db[rid][cid].formula = formula;
    let formulaEntities = formula.split(" ");
    for (let i = 0; i < formulaEntities.length; i++) {
        let cEntity = formulaEntities[i];
        let ascii = cEntity.charCodeAt(0);
        if (ascii >= 65 && ascii <= 90) {
            let { rid, cid } = getRidCidFromStringAddress(cEntity);
            let children = db[rid][cid].children;
            children.push(cCell);
        }
    }

}
// *************************helper*************** 
function getRidCidFromUI(uicell) {
    // console.log(uicell, " ", uicell.innerText);
    let rid = uicell.getAttribute("rid");
    let cid = uicell.getAttribute("cid");
    return { rid, cid };
};
function getRidCidFromStringAddress(stringAddress) {
    // console.log(stringAddress);
    let ciChar = stringAddress.charCodeAt(0);
    let rowid = stringAddress.substr(1);
    let cid = Number(ciChar) - 65;
    let rid = Number(rowid) - 1;
    // console.log(rid, " ", cid);
    return { "rid": rid, "cid": cid }
}
