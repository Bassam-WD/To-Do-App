// setting up varibles
let input = document.getElementById("input-task");
let addbotton = document.querySelector("button");
let tasksUl = document.querySelector("ul");
let img = document.querySelector("img");
let container = document.querySelector(".container");
let delAll = document.querySelector(".hidden");



//focus to input


let taskes = JSON.parse(localStorage.taskes||"[]");

if(localStorage.getItem("taskes")){
    addTaskes();
}else{
        img.style.display="block";
    }


addbotton.onclick = (e)=>{
    e.preventDefault();
    if(input.value.trim() === ""){
        Swal.fire({
        icon: "error",
        title: "No Value...",
        text: "Write Your Task!",
});}else{
        let dataTask ={
        titel : input.value ,
        id : "",
        done : false,
    };
    taskes.push(dataTask);
    localeSorege()
    addTaskes()
    input.value = "";
}
    
}

// Add Tasks To Ul
function addTaskes(){
    tasksUl.innerHTML = "";
    for (let i =0; i<taskes.length;i++){
        taskes[i].id=i;
        let span = document.createElement("span");
        span.setAttribute("task-id",taskes[i].id) // id ==== index
        let li = document.createElement("li");
        li.innerHTML = taskes[i].titel ;

        if(taskes[i].done){
            li.classList.add("checkd");
        }
        span.appendChild(li);

        let but = document.createElement("button");
        but.id = "del"
        but.innerHTML = `X`;
        span.appendChild(but);

        tasksUl.appendChild(span)
        console.log(span)
        
    }
    buttonDeleteAll()
    counter()
}

tasksUl.addEventListener("click",e=>{
    if(e.target.tagName==="LI"){
        checkd(e.target,e.target.parentElement.getAttribute("task-id"))
        console.log(e.target);
    }else if(e.target.tagName==="BUTTON"){
        dell(e.target.parentElement.getAttribute("task-id"))
        
    }
})


function localeSorege(){
    localStorage.setItem("taskes",JSON.stringify(taskes));
}



// delat
function dell(ele){
    taskes.splice(ele,1);
    localStorage.taskes = JSON.stringify(taskes);
    counter()
    addTaskes()
}

// checkd
function checkd(ele,index){
    ele.classList.toggle("checkd")
    ele.classList.contains("checkd")?taskes[index].done = true :taskes[index].done = false ;
    counter()
    localeSorege()
}

// counter
function counter(){
    let num = document.getElementById("numbers");
    let allTaskes= taskes.length;
    let doneTaskes = taskes.filter(e=>e.done===true).length;
    num.innerHTML =`${doneTaskes}/${allTaskes}`;

    let progress = document.getElementById("progress");
    allTaskes === 0 ? progress.style.width = 0 :progress.style.width = `${(doneTaskes/allTaskes)*100}%`;
    allTaskes&&doneTaskes>0 &&allTaskes===doneTaskes? animation():"";
}



// show delete all button
function buttonDeleteAll(){
    if(taskes.length !== 0){
        delAll.classList.add("allDel")
    }else{
        delAll.classList.remove("allDel")
        img.style.display="block";
    }
}

delAll.onclick = function(){
    taskes = [];
    localStorage.clear();
    img.style.display="block";
    tasksUl.innerHTML =`<img src="img/61760cd316b4808125ba590abd3626ae.png" style="max-width: 100%;" alt="">`;
    counter()
}

// showwwww
function animation() {
    const defaults = {
  spread: 360,
  ticks: 50,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  shapes: ["star"],
  colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
};

function shoot() {
  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
    shapes: ["star"],
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 0.75,
    shapes: ["circle"],
  });
}

setTimeout(shoot, 0);
setTimeout(shoot, 100);
setTimeout(shoot, 200);
}
