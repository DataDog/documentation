document.addEventListener('DOMContentLoaded', function () {
    var ref = document.querySelector('.my-button');
    var pop = document.getElementById('popper');
    if(ref && pop) {
        ref.addEventListener('click', function (e) {
            pop.style.display = (pop.style.display === 'none') ? 'block' : 'none';
            var p = new Popper(ref, pop, {
                placement: "start-bottom",
                modifiers: {
                    preventOverflow: {enabled: false},
                    hide: {
                        enabled: false
                    }
                }
            });
            return false;
        });
    }
});