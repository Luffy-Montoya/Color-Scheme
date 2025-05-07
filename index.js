const baseColor = document.getElementById("base-color")
const count = document.getElementById("color-count")
const mode = document.getElementById("mode-select")
const form = document.getElementById("color-scheme")
const scheme = document.getElementById("scheme-container")
const hexNumber = document.getElementById("hex-number")
const splotch1 = document.getElementById("splotch-1")
const splotch2 = document.getElementById("splotch-2")
let htmlContent = ""

function baseSplotch() {
    hexNumber.textContent = `Base ${baseColor.value.toUpperCase()}`
    splotch1.style.background = splotch2.style.background = baseColor.value
}

function renderColors(data) {

    scheme.innerHTML = ""
    htmlContent = ""

    for(let i = 0; i < data.colors.length; i++){
        htmlContent += `<div class="color-box" id="color-${i}"></div>`
    }

    scheme.innerHTML = htmlContent

    for(let i = 0; i < data.colors.length; i++){
        let color = document.getElementById(`color-${i}`)
        let hex = data.colors[i].hex.value
        color.style.backgroundColor = hex
        color.addEventListener("click", function(){
            hexNumber.textContent = `${hex}`
            splotch1.style.background = splotch2.style.background = hex
        })  
    }

    baseSplotch()
}


fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor.value.replace("#", "")}&count=${count.value}&mode=${mode.value}`)
    .then(res => res.json())
    .then(data => renderColors(data))

form.addEventListener("submit", function(e) {
    e.preventDefault()
    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor.value.replace("#", "")}&count=${count.value}&mode=${mode.value}`)
    .then(res => res.json())
    .then(data => {
        renderColors(data)
        baseSplotch()
    })
    
})

baseColor.addEventListener("click", () =>
    {baseSplotch()})
