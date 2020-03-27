const burger = document.querySelector('.burger');
const modal = document.getElementById('modal');

burger.addEventListener('click',function(){
    modal.classList.toggle('hide')
})