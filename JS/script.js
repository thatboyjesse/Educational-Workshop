let emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
let phoneRegex = /^\+?(\d[.\- ]*){9,12}(e?xt?\d{1,5})?$/
let aErr = document.getElementById('aErr')
let bErr = document.getElementById('bErr')
let cErr = document.getElementById('cErr')
let dErr = document.getElementById('dErr')
let valid = true
document.getElementById('login').addEventListener('submit', function(e){
    e.preventDefault()
    let firstName = document.getElementById('first_name').value
    let lastName = document.getElementById('last_name').value
    let phone = document.getElementById('phone').value
    let email = document.getElementById('email').value
    let fullName = { firstName, lastName}
    let login = {
        fullName,
        phone,
        email
    }
    valid = true
    if(firstName == ''){
        aErr.textContent = 'please Enter your first name'
        valid = false
    }
    else{
        aErr.textContent = ''
    }
    if(lastName == ''){
        bErr.textContent = 'please Enter your last name'
        valid = false
    }
    else{
        aErr.textContent = ''
    }
    if(phone == ''){
        cErr.textContent = 'please Enter your Phone Number'
        valid = false
    }
    else if(!phoneRegex.test(phone)){
        cErr.textContent = 'invalid Phone Number'
        valid = false
    }
    else{
        cErr.textContent = ''
    }
    if(email == ''){
        dErr.textContent = 'please Enter your Email Address'
        valid = false
    }
    else if(!emailRegex.test(email)){
        dErr.textContent = 'invalid Email Address'
        valid = false
    }
    else{
        dErr.textContent = ''
    }
    if(valid){
        localStorage.setItem('login', JSON.stringify(login) )
        window.location.href = 'home.html';
    }
    return valid
})

