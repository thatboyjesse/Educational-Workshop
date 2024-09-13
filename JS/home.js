const logins =  localStorage.getItem('login')
const login = JSON.parse(logins)
console.log(login.fullName.firstName)
let dob_err = document.getElementById('dob-err') 
let time_err = document.getElementById('time-err') 
let dob = document.getElementById("dob")
let time = document.getElementById('time')
let type = document.getElementById('type')
let date = document.getElementById('date')
let email = document.getElementById('email')
let user_age = document.getElementById('age')
let contact = document.getElementById('contact')
let minor = document.getElementById('legality')
let title = document.getElementById('title')
let modalName = document.getElementById('name')
let timeopt = document.getElementById('timeopt')
let timePrice = document.getElementById('timePrice')
let typePrice = document.getElementById('typePrice')
let studPrice = document.getElementById('studPrice')
let availPrice = document.getElementById('AvailPrice')
let typeopt = document.getElementById('typeopt')
let studopt = document.getElementById('studopt')
// let availopt = document.getElementById('Availopt')
let right = document.getElementById('right')
let error = document.getElementById('error')
let participants = document.getElementById('participants')
let participants_err = document.getElementById('participants-err')
let date_err = document.getElementById('date-err')
let type_err = document.getElementById('type-err')
let totalPrice = document.getElementById('bill')
let hide = document.getElementById('hide')

let bill = 0
// console.log(login)
document.getElementById('greeting').innerHTML = `Welcome ${login.fullName.firstName} ${login.fullName.lastName}, please fill <br/> out the Form to proceed`;
docum
ent.getElementById('form').addEventListener('submit', function(e){
    e.preventDefault()
    let selectedDay = new Date(date.value).getDay()
    let valid = true
    let availability = 'false'
    if(dob.value == ""){
        dob_err.textContent = `Date of Birth can not be left empty`
        dob_err.style.color = 'red'
        dob_err.style.fontSize = '11px'
        valid = false
    }
    else{
        dob_err.textContent = `Date of Birth`
        dob_err.style.color = '#111'
        let date_of_birth = new Date(dob.value)
        // console.log(login)
        let currentDate = new Date()
        let ageMS = currentDate - date_of_birth
        let age = ageMS / 31536000000
        console.log(age)
        if(age < 18){
            let Age = {
                dateOfBirth: dob.value,
                age,
                legality: false,
            }
            Object.assign(login, Age)
            // console.log(login)
        }
        else{
            let Age = {
                dateOfBirth: dob.value,
                age,
                legality: true,
            }
            Object.assign(login, Age)
            // console.log(login)
        }
    }
    
    if(time.value == ""){
        time_err.textContent = `please select a period for your class`
        time_err.style.color = 'red'
        time_err.style.fontSize = '11px'
        time_err.style.textAlign = 'center'
        valid = false
    }
    else{
        time_err.textContent = ''
        let timeCost = parseInt(time.value)
        bill += timeCost
        // console.log(bill)
    }

    if(date.value == ""){
        date_err.textContent = `Date can not be left empty`
        date_err.style.color = 'red'
        date_err.style.fontSize = '11px'
        valid = false
    }
    else{
        date_err.textContent = `Date of Workshop`
        date_err.style.color = '#111'
        console.log(selectedDay)
        if(selectedDay > 0 && selectedDay < 6 ){
            availability = 'true'
            // Object.assign(login, availability)
            
        }
        else{
            availability = 'false'

        }
    }

    if(type.value == ""){
        type_err.textContent = `please select the desired workshop type`
        type_err.style.color = 'red'
        type_err.style.fontSize = '11px'
        type_err.style.textAlign = 'center'
        valid = false
    }
    else{
        type_err.textContent = ''
        bill += parseInt(type.value)
        // console.log(bill)
    }

    if(participants.value == ""){
        participants_err.textContent = `please select how many students will be joining`
        participants_err.style.color = 'red'
        participants_err.style.fontSize = '11px'
        participants_err.style.textAlign = 'center'
        valid = false
    }
    else{
        participants_err.textContent = ''
        bill += parseInt(participants.value)
        console.log(bill)
    }
    if(valid){
        right.style.display = 'flex'
        let payment = {
            bill,
            availability
        }
        Object.assign(login, payment)
        modalName.textContent = `Name: ${login.fullName.firstName} ${login.fullName.lastName}`
        contact.textContent = `Phone Number: ${login.phone}`
        email.textContent = `Email Address: ${login.email}`
        user_age.textContent = `Date of Birth: ${login.dateOfBirth}`

        if(login.legality){
            minor.textContent = ''
        }
        else{
            minor.textContent = 'Minor'
        }
        if(time.value == "100"){
            timeopt.textContent = '06:10 - 10:00'
        }
        else if(time.value == "150"){
            timeopt.textContent = '10:10 - 14:00'
        }
        else{
            timeopt.textContent = '14:10 - 18:00'
        }
        timePrice.textContent = `$${parseInt(time.value)}`

        if(type.value == "99"){
            typeopt.textContent = 'Art'
            title.textContent = 'Art Workshop'
        }
        else if(type.value == "149"){
            typeopt.textContent = 'Music'
            title.textContent = 'Music Workshop'
        }
        else{
            typeopt.textContent = 'Coding'
            title.textContent = 'Coding Workshop'
        }
        typePrice.textContent = `$${parseInt(type.value)}`

        
        if(participants.value == "101"){
            studopt.textContent = '10 - 30'
        }
        else if(participants.value == "151"){
            studopt.textContent = '31 - 60'
        }
        else{
            studopt.textContent = '61 - 90'
        }
        studPrice.textContent = `$${parseInt(participants.value)}`

        if(selectedDay > 0 && selectedDay < 6 ){
            availPrice.textContent = 'available'
            availPrice.style.color = 'green'
            totalPrice.textContent = `$${login.bill}`
            hide.style.display = 'flex'
            document.getElementById('confirm').textContent = 'Make Payment'
            document.getElementById('confirm').addEventListener('click', function(){
                window.location.href = '/pages/workshops.html'

            })
        }
        else{
            availPrice.textContent = 'Not available'
            availPrice.style.color = 'red'
            totalPrice.textContent = 'please select another date'
            hide.style.display = 'flex'
            document.getElementById('confirm').textContent = 'Change WorkShop Date'
            document.getElementById('confirm').addEventListener('click', function(){
                hide.style.display = 'none'
            })
        }
        document.getElementById('cancel').addEventListener('click', function(e){
            e.preventDefault()
            hide.style.display = 'none'
        })

        // localStorage.setItem('login', JSON.stringify(login))
    }
    else{
        console.log('unsuccesful')
    }
    bill = 0
})
