const baseColor = document.getElementById("base-color")
const count = document.getElementById("color-count")
const mode = document.getElementById("mode-select")
const form = document.getElementById("color-scheme")
const scheme = document.getElementById("scheme-container")
const hexContainer = document.getElementById("hex-container")
let htmlContent = ""

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
            hexContainer.textContent = `${hex}`
        })  
    }

    hexContainer.textContent = `Base - ${baseColor.value.toUpperCase()}`

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
        hexContainer.textContent = `Base - ${baseColor.value.toUpperCase()}`
    })
    
})

baseColor.addEventListener("click", () =>
    {hexContainer.textContent = `Base - ${baseColor.valuetoUpperCase()}`})