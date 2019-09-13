const form = document.querySelector('form')
const img = document.querySelector('img')
const para = document.querySelector('p')
const div1 = document.getElementsByClassName('form-group')[0]
const div2 = document.getElementsByClassName('form-group')[1]
const inputName = document.createElement('input')
const inputPassword = document.createElement('input')
const btnLogIn = document.createElement('button')
const btnLogOut = document.createElement('button')
const error = document.createElement('div')

const testUser = 'test'
const testPassword = '1234'

// ##############    Functions #################################

// Funktioner för uppsättning av atributer för bootstrap styling
const setInputBootstrapAttributes = function(input) {
    input.setAttribute('type','text')
    input.setAttribute('class','form-control')
    input.setAttribute('autocomplete','off')
    input.setAttribute('required','true')
}

const setButtonBootstrapAttributes = function(button) {
    button.setAttribute('class', 'btn btn-dark btn-block')
}

// Logga in och Logga ut knappar
const addLogInButton = function() {
    const btnLogInNodeText = document.createTextNode('Logga in')

    form.appendChild(btnLogIn)
    btnLogIn.appendChild(btnLogInNodeText)
    setButtonBootstrapAttributes(btnLogIn)
}

const addLogOutButton = function() {
    const btnLogOutNodeText = document.createTextNode('Logga ut')

    form.appendChild(btnLogOut)
    btnLogOut.appendChild(btnLogOutNodeText)
    setButtonBootstrapAttributes(btnLogOut)
}

// Funktioner för att ladda upp form.
const initForm = function(name, password) {
    div1.appendChild(name)
    name.setAttribute('id','user-name')
    name.setAttribute('placeholder', 'Användare')
    setInputBootstrapAttributes(name)

    div2.appendChild(password)
    password.setAttribute('id','user-password')
    password.setAttribute('placeholder','Lösenord')
    setInputBootstrapAttributes(password)

    div1.insertAdjacentElement("beforebegin", error)
    error.setAttribute('id', 'error')
    error.setAttribute('class', 'text-danger')
    error.innerHTML = ''

    addLogInButton()
}

initForm(inputName, inputPassword)

// #####################  Loop  ##########################
// Få värdet från localSTorage och skriva ut det på browser
for (let i=0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    const user = localStorage.getItem(key)

    img.removeAttribute('hidden')
    form.removeChild(div1)
    form.removeChild(div2)
    form.removeChild(btnLogIn)
    para.innerHTML = `${user.toUpperCase()}`
    
    addLogOutButton()
    
}

// Events

btnLogIn.onclick = function(event) {
    const user = inputName.value
    const password = inputPassword.value
    
    if(user.length > 0 && password.length > 0){  // Ingen event om användarnamn eller lösenord ej anges

        if(user == testUser && password == testPassword){ // Kollar om användare och lösenord finns
            localStorage.setItem(password, user)
        } else {
            event.preventDefault()  // avvaktiverar default inställning - reload. 
            error.innerHTML = `Felaktigt användarnamn eller lösenord !`
            inputName.value = ''
            inputPassword.value = ''
        }

    }
}

btnLogOut.onclick = function(){
    localStorage.clear()

    para.innerHTML = ''
    img.setAttribute('hidden', true)
    form.appendChild(div1)
    form.appendChild(div2)
    div1.appendChild(inputName)
    div2.appendChild(inputPassword)
    form.appendChild(btnLogIn)
    form.removeChild(btnLogOut)
}