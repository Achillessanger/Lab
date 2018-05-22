
const sel1 = document.getElementById('sel1');
const sel2 = document.getElementById('sel2');
const tableName = document.getElementById('tableName');
const tableCol = document.getElementById('tableCol');
const inputAr = [];
const div1 = document.getElementById('div1');
const btCom = document.getElementById('btCom');
const tablediv = document.getElementById('tablediv');
const tableAr = [];
let ifShowBt = 0;
const optionAr = [];

sel1.onchange = function (ev) {
    if(sel1.value == 1){
        tableName.classList.add('hide');
        tableCol.classList.add('hide');
        document.getElementById('btCom').style.display = 'none';
        div1.innerHTML = "";
    }
    if(sel1.value == 2){
        div1.innerHTML = "";
        if(ifShowBt == 1){
            showCombt();
            document.getElementById('btCom').style.display = 'block';
            document.getElementById('btCom').className = 'center';
            tableCol.onchange();
        }
        showCombt();
        createTable();
    }
    if(sel1.value == 3){
        ifShowBt = 1;
        addRow();
    }
    if(sel1.value == 4){
        ifShowBt = 1;
        delectRow();
    }
    if(sel1.value == 5){
        ifShowBt = 1;
        deleteTable();
    }
}


function showCombt() {
    // document.getElementById('btCom').style.display = 'block';
    // document.getElementById('btCom').className = 'center';
    tableName.classList.remove('hide');
    tableCol.classList.remove('hide');
}
function createTable() {
    ifShowBt == 1;
    tableCol.onchange = function (ev) {
        div1.innerHTML = "";
        for (var i = 0; i < document.getElementById('tableCol').value; i++) {
            inputAr[i] = document.createElement('input');
            inputAr[i].type = 'text';
            inputAr[i].placeholder = 'Attribute';
            inputAr[i].style.display = "inline";
            div1.appendChild(inputAr[i]);
        }
            document.getElementById('btCom').style.display = 'block';
            document.getElementById('btCom').className = 'center';
    }


    btCom.onclick = function (e) {
        sel2.innerHTML += '<option value="'+ sel2.options.length + '">' + tableName.value + '</option>';
        sel2.children[sel2.options.length - 1].selected = true; //sel2.options.length初始为1

        var thconinput = [];
        for (var i = 0; i < tableCol.value; i++) {
            thconinput[i] = inputAr[i].value;
        }

        tableAr[tableAr.length] = new Table(tableName,tableCol.value,thconinput);
        tablediv.innerHTML = "";
        tablediv.appendChild(tableAr[tableAr.length-1].table);
        tableAr[tableAr.length-1].table.className = "center";
    }
}

sel2.onchange = function (ev) {
    tablediv.innerHTML = "";
    tablediv.appendChild(tableAr[sel2.selectedIndex-1].table);
    tableAr[sel2.selectedIndex-1].table.className = "center";
}


function addRow() {
    ifShowBt == 1;
    div1.innerHTML = "";
    tableName.classList.add('hide');
    tableCol.classList.add('hide');
    // tableName.style.display = "none";
    // tableCol.style.display = "none";
    for (var i = 0; i < tableAr[sel2.selectedIndex-1].col; i++) {
        inputAr[i] = document.createElement('input');
        inputAr[i].type = 'text';
        inputAr[i].placeholder = 'Attribute'+(i+1);
        inputAr[i].style.display = "inline";
        div1.appendChild(inputAr[i]);
    }
    btCom.onclick = function (ev) {
        let tablex = tableAr[sel2.selectedIndex-1].table;

        let newTr = document.createElement("tr");
        newTr = tablex.tBodies[0].insertRow(tablex.length);
        for(var i = 0; i < tableAr[sel2.selectedIndex-1].col; i++){
            let newTds = document.createElement("td");
            newTr.appendChild(newTds);
            newTds.innerText = inputAr[i].value;
        }
        tablex.appendChild(newTr);
    }
}

function delectRow() {
    ifShowBt == 1;
    div1.innerHTML = "";
    tableName.classList.add('hide');
    tableCol.classList.add('hide');
    for (var i = 0; i < tableAr[sel2.selectedIndex-1].col; i++) {
        inputAr[i] = document.createElement('input');
        inputAr[i].type = 'text';
        inputAr[i].placeholder = 'Attribute'+(i+1);
        inputAr[i].style.display = "inline";
        inputAr[i].value = "";
        div1.appendChild(inputAr[i]);
    }

    btCom.onclick = function (ev) {
        let tabley = tableAr[sel2.selectedIndex-1].table;
        let deleteRow = [];
        loop1: for(let i = 1; i < tabley.rows.length; i++){
                for(var k = 0; k < tableAr[sel2.selectedIndex-1].col; k++ ){
                if(!(inputAr[k].value == tabley.rows[i].cells[k].innerText || inputAr[k].value == "")){
                    continue loop1;
                }
            }
            deleteRow[deleteRow.length] = i;
        }
        if(deleteRow.length > 0){
            for(var i = deleteRow.length-1; i >= 0; i--){
                tabley.rows[deleteRow[0]].parentNode.removeChild(tabley.rows[deleteRow[i]]);
            }

        }
    }
}

function deleteTable() {
    ifShowBt == 1;
    tableName.classList.add('hide');
    tableCol.classList.add('hide');
    document.getElementById('btCom').style.display = 'block';
    document.getElementById('btCom').className = 'center';
    div1.innerHTML = '<p>WARNING: You cannot undo this action!</p>';
    
    btCom.onclick = function (ev) {
        var deleteTableNo = sel2.selectedIndex - 1;
        if(sel2.selectedIndex > 0) {
            tableAr.splice(deleteTableNo, 1);
            // delete tableAr[deleteTableNo];

            sel2.options.remove(deleteTableNo + 1);
            sel2.children[deleteTableNo].selected = true;

            tablediv.innerHTML = "";
            tablediv.appendChild(tableAr[sel2.selectedIndex - 1].table);
            tableAr[sel2.selectedIndex - 1].table.className = "center";
        }else if(sel2.selectedIndex == 0){

        }



        // tablediv.innerHTML = '<option id="default" value="0">SELECT (default: last created)</option>';
        // tablediv.appendChild(tableAr[deleteTableNo-1].table);
        // tableAr[deleteTableNo-1].table.className = "center";
    }
}

class Table{
    constructor(name,col,thcon){
        this.name = name;
        this.col = col;
        this.thcon = thcon;
        this.table = document.createElement("table");
        let thead = this.table.createTHead();
        let tr = document.createElement("tr");

        for(var i = 0; i < this.col; i++){
            let ths = document.createElement("th");
            ths = tr.appendChild(ths);
            ths.innerText = thcon[i];
        }
        thead.appendChild(tr);
        this.table.createTBody();
    }
}

