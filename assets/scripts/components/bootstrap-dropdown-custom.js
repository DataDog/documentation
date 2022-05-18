const bootstrapCustomDropdownNodeList = document.querySelectorAll('.bootstrap-dropdown-custom') || [];
const bootstrapCustomDropdownBtnNodeList = document.querySelectorAll('.bootstrap-dropdown-custom > .btn') || [];

const toggleChevronArrowIcon = (dropdownBtnElement) => {
  const chevronUp = dropdownBtnElement.querySelector('.chevron-up');
  const chevronDown = dropdownBtnElement.querySelector('.chevron-down');

  if(chevronUp && chevronDown) {
    if (chevronUp.classList.contains('d-none')) {
      chevronUp.classList.remove('d-none');
      chevronDown.classList.add('d-none');
    } else {
      chevronUp.classList.add('d-none');
      chevronDown.classList.remove('d-none');
    }
  }
}

const initBootstrapCustomDropdowns = () => {
  bootstrapCustomDropdownBtnNodeList.forEach(dropdown => {
    dropdown.addEventListener('click', (event) => {
      const targetClassList = event.target.classList.value;
      const dropdownBtnElement = targetClassList.includes('chevron') ? event.target.closest('button') : event.target;
      toggleChevronArrowIcon(dropdownBtnElement);
    })
  })

  document.body.addEventListener('click', () => {
    bootstrapCustomDropdownNodeList.forEach(dropdown => {
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');

      if(dropdownMenu) {
        if (dropdownMenu.classList.contains('show')) {
          toggleChevronArrowIcon(dropdown);
        }
      }
    })
  })
}

document.addEventListener('DOMContentLoaded', initBootstrapCustomDropdowns);
