class ToDoList {

    constructor(){
        this.items = [];
    };

    get numItems(){
        return this.items.length;
    };

    

    hasItem(name){
        for (const i in this.items){
            let item = this.items[i];

            if (item.itemName === name) {
                return true;
            };
        };
        return false;
    }

    addItem(addName=""){
        var name = addName;
        if (name === "") name = prompt("Name of item add:");
        if (this.hasItem(name)) {
            alert(`item is already named ${name}`)
            return
        }
        if (name==="") {
            alert(`Please add a name!`)
            return
        }
        var obj = {
            itemName:name,
            finished:false,
        };
        
        this.items.push(obj);
        this.update(["add",name,this.numItems-1]);
    };


    finishItem(completeName=""){
        var name = completeName
        if (name===""){
            name = prompt("Name of item to complete:");
        }
        if (!this.hasItem(name)){
            alert(`item named: ${name} does not exist`);
            return
        }
        for (const i in this.items){
            let item = this.items[i];

            if (item.itemName === name) {
                if (item.finished == true) break;
                item.finished = true;
                this.update(["finish",name]);
                break
            };
        };
    };

    redoItem(redoName = ""){
        var name = redoName
        if (redoName===""){
            name = prompt("Name of item to redo:");
        }
        if (!this.hasItem(name)){
            alert(`item named: ${name} does not exist`);
            return
        }
        this.removeItem(name);
        this.addItem(name);
    }

    finishAll(){
        // var canDo = confirm("Finish all items? All items will be marked as done.")
        // if (!canDo) return;

        this.items.forEach((item)=>{
            if (item.finished) return
            item.finished = true;
            this.update(["finish",item.itemName]);
        });
    }

    unfinishAll(){
        // var canDo = confirm("Redo all items? All items will be marked as NOT done.")
        // if (!canDo) return;

        this.items.forEach((item)=>{
            this.redoItem(item.itemName)
        });
    }

    removeItem(removeName=""){
        
        var name = removeName
        if (name  === "") {
            name = prompt("Name of item to remove:");
            if (!this.hasItem(name)){
                alert(`item named: ${name} does not exist`);
                return
            }
        }
        // Used arrow here because function(), would ovveride the this keyword
        this.items.forEach((item) => {
            if (item.itemName == name){
                delete this.items[this.items.indexOf(item)]
                
                this.update(["remove",name]);
            }
        });
    };

    update(args = "all"){
        if (args === "all"){
            console.log(this.items)
        }else if (args[0]==="add"){
            const list = document.getElementById('BasicList');
            const newItem = document.createElement('li');

            newItem.textContent = args[1];
            newItem.id = args[1];
            
            newItem.classList.add("incomplete");

            list.appendChild(newItem);

            newItem.addEventListener('click', () => {
                if (this.items[args[2]].finished){
                    this.redoItem(newItem.id);
                }else{
                    this.finishItem(newItem.id);
                }
                // You can also change the bullet or perform other actions here
            })
            
        }else if (args[0]==="finish"){
            const list = document.getElementById('FinishedList');
            const item = document.getElementById(args[1]);

            item.classList.remove("incomplete");
            item.classList.add("complete");

            list.appendChild(item);

        }else if (args[0]==="remove"){
            const element = document.getElementById(args[1]);
            element.remove();   
        };
    };

    restart(){
        var canRestart = confirm("This will DELETE all PROGRESS. Are you sure you want to DELETE ALL?");
        if (canRestart){
            this.items.forEach((v, i) => {
                this.removeItem(v.itemName);
            });
        }
    };

};


function dope(x=1){
    console.log(x);
}

dope(5);

document.addEventListener("DOMContentLoaded", (event)=>{
    //     button.style.display = "none";

    var myList = new ToDoList();
    const addB = document.getElementById("AddItemButton");
    const finishB = document.getElementById("FinishItemButton");
    const removeB = document.getElementById("RemoveItemButton");
    const redoB = document.getElementById("RedoItemButton");

    const finishAllB = document.getElementById("FinishAllButton");
    const redoAllB = document.getElementById("RedoAllButton");
    const printB = document.getElementById("PrintToConsole");
    const restartB = document.getElementById("RestartButton");

    addB.addEventListener('click', () => myList.addItem());
    removeB.addEventListener('click', () =>myList.removeItem());
    finishB.addEventListener('click', () => myList.finishItem());
    redoB.addEventListener('click', () => myList.redoItem());

    printB.addEventListener('click', () => myList.update());
    restartB.addEventListener('click', () => myList.restart());
    finishAllB.addEventListener('click', () => myList.finishAll());
    redoAllB.addEventListener('click', () => myList.unfinishAll());

});
