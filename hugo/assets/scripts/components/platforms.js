document.addEventListener('DOMContentLoaded', function () {
    const ref = document.querySelector('.my-button');
    const pop = document.getElementById('popper');
    if(ref && pop) {
        ref.addEventListener('click', function (e) {
            e.preventDefault();
            pop.style.display = (pop.style.display === 'none') ? 'block' : 'none';
            return false;
        });
    }
});
