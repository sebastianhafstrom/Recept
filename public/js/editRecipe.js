function addIngredient() {
    var id = Math.floor(Math.random() * Math.floor(1e6))
    var antal = document.createElement('input')
    antal.setAttribute('type', 'text') 
    antal.setAttribute('name', 'antal')
    antal.setAttribute('placeholder', 'Antal')
    var enhet = document.createElement('input')
    enhet.setAttribute('type', 'text') 
    enhet.setAttribute('name', 'enhet')
    enhet.setAttribute('placeholder', 'Enhet')
    var vara = document.createElement('input')
    vara.setAttribute('type', 'text') 
    vara.setAttribute('name', 'vara')
    vara.setAttribute('placeholder', 'Vara')
    var removeButton = document.createElement('button')
    removeButton.setAttribute('onclick', 'removeIngredient(ing' + id + ')')
    removeButton.innerText = 'Ta bort'
    var div = document.createElement('div')
    div.setAttribute('class', 'ingredient')
    div.setAttribute('id', 'ing'+id)
    div.appendChild(antal)
    div.appendChild(enhet)
    div.appendChild(vara)
    div.appendChild(removeButton)
    document.getElementById('ingredients').appendChild(div)
}

function addInstruction() {
    var id = Math.floor(Math.random() * Math.floor(1e6))
    var instruction = document.createElement('input')
    instruction.setAttribute('type', 'text') 
    instruction.setAttribute('name', 'instruction')
    instruction.setAttribute('placeholder', 'Instruktion')
    var removeButton = document.createElement('button')
    removeButton.setAttribute('onclick', 'removeInstruction(ins' + id + ')')
    removeButton.innerText = 'Ta bort'
    var div = document.createElement('div')
    div.setAttribute('class', 'instruction')
    div.setAttribute('id', 'ins' + id)
    div.appendChild(instruction)
    div.appendChild(removeButton)
    document.getElementById('instructions').appendChild(div)
}

function removeIngredient(i) {
    i.remove()
}

function removeInstruction(i) {
    i.remove()
}

function submitRecipe(id, url) {
    if(document.querySelector("#title").value == ""){
        alert("The title is empty")
        return
    }
    var ingredients = []
    const ings = document.querySelectorAll(".ingredient");
    for(var i = 0; i < ings.length; i++) {
        var ingredient = ings[i].getElementsByTagName('input')
        if(ingredient[0].value = "" | ingredient[1].value == "" | ingredient[2].value == ""){
            alert("There is an empty ingredient-input")
            return
        }
        var temp = {
            amount: ingredient[0].value,
            unit: ingredient[1].value,
            product: ingredient[2].value
        }
        ingredients.push(temp)
    }
    var instructions = []
    const instrucs = document.querySelectorAll(".instruction");
    for(var i = 0; i < instrucs.length; i++) {
        var instruction = instrucs[i].getElementsByTagName('input')
        for(var j = 0; j < instruction.length; j++) {
            if(instruction[j].value == ""){
                alert("There is an empty instruction-input")
                return
            }
            instructions.push(instruction[j].value)
        }
    }
    var toSend = {
        _id: id,
        title: document.querySelector("#title").value,
        ingredients: ingredients,
        instructions: instructions
    }
    fetch(url + '/update-recipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(toSend),
    })
    .then( (response) => {
        if (response.status == 200) {
            window.location.href = url
            console.log("Redirecting...")
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}