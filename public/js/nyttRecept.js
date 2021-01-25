console.log("Hello")

function addIngredient() {
    var id = Math.random()
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
    removeButton.setAttribute('onclick', 'removeIngredient(' + id + ')')
    removeButton.innerText = 'Ta bort'
    var div = document.createElement('div')
    div.setAttribute('class', 'ingredient')
    div.setAttribute('id', id)
    div.appendChild(antal)
    div.appendChild(enhet)
    div.appendChild(vara)
    div.appendChild(removeButton)
    document.getElementById('ingredients').appendChild(div)



}

function addInstruction() {
    var id = Math.random()
    var instruction = document.createElement('input')
    instruction.setAttribute('type', 'text') 
    instruction.setAttribute('name', 'instruction')
    instruction.setAttribute('placeholder', 'Instruktion')
    var removeButton = document.createElement('button')
    removeButton.setAttribute('onclick', 'removeInstruction(' + id + ')')
    removeButton.innerText = 'Ta bort'
    var div = document.createElement('div')
    div.setAttribute('class', 'instruction')
    div.setAttribute('id', id)
    div.appendChild(instruction)
    div.appendChild(removeButton)
    document.getElementById('instructions').appendChild(div)

}

function removeIngredient(i) {
    document.getElementById(i).remove()
    //console.log(i)
}

function removeInstruction(i) {
    document.getElementById(i).remove()
    //console.log(i)
}

function submitRecipe() {
    var ingredients = []
    const ings = document.querySelectorAll(".ingredient");
    for(var i = 0; i < ings.length; i++) {
        var ingredient = ings[i].getElementsByTagName('input')
        // console.log(ingredient)
        var temp = {
            amount: ingredient[0].value,
            unit: ingredient[1].value,
            product: ingredient[2].value
        }
        ingredients.push(temp)
        for(var j = 0; j < ingredient.length; j++) {
            console.log(ingredient[j].value)
        }
    }
    console.log("Alla ingredienter: " + ingredients)

    var instructions = []
    const instrucs = document.querySelectorAll(".instruction");
    for(var i = 0; i < instrucs.length; i++) {
        var instruction = instrucs[i].getElementsByTagName('input')
        //console.log(instruction)
        for(var j = 0; j < instruction.length; j++) {
            console.log(instruction[j].value)
            instructions.push(instruction[j].value)
        }
    }
    console.log("Alla instruktioner: " + instructions)

    var toSend = {
        title: document.querySelector("#title").value,
        ingredients: ingredients,
        instructions: instructions
    }
    
    fetch('http://localhost:3000/submit-recipe', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(toSend),
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}