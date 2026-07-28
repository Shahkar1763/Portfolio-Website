const bar = document.getElementById("bar")

const nav = document.querySelector(".navbar")
const close= document.querySelector("#close")

if(bar){
    bar.addEventListener('click', ()=>{
        nav.classList.add('active')
    })
}
if(close){
     close.addEventListener('click', ()=>{
        nav.classList.remove('active')
    })
}


 let mainImage = document.getElementById("main-image")
    let smallImage = document.querySelectorAll(".small-image")
      
    smallImage.forEach((img) => {
        img.addEventListener("click",()=>{
            mainImage.src = img.src;
        })
    });
