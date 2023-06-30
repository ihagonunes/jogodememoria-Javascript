const input = document.querySelector('.start__input');
const button = document.querySelector('.start__button');
const form = document.querySelector('.start-forms');

const verifyInput = ( {target} ) => {
    if(target.value.length > 2){
        button.removeAttribute('disabled');
        return;
    } 
    
    button.setAttribute('disabled','')
}

const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('jogador', input.value);
    window.location = '../main.html';
}

input.addEventListener('input', verifyInput);

form.addEventListener('submit', handleSubmit);
