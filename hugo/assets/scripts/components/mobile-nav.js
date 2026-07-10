// MOBILE MENU

const mobileOverlay = document.querySelector('#mobile-nav-bg');
const mobileMenu = document.querySelector('#mobile-nav');
const mobileNavbarTogglers = document.querySelectorAll('.navbar-toggler');

let mobileToggle = false;

function mobileToggleIconToggle(e) {
    e.preventDefault();
    mobileToggle = !mobileToggle;
    mobileOverlay.classList.toggle('mobile-bg-open');
    mobileMenu.classList.toggle('mobile-menu-open');
    document.body.classList.toggle('body-noscroll');
    mobileNavbarTogglers.forEach((mobileNavbarToggler) => {
        mobileNavbarToggler.classList.toggle('open');
    });
}

window.addEventListener('resize', function () {
    const { innerWidth } = window;

    if (mobileMenu && mobileNavbarTogglers.length) {
        if (innerWidth >= 991) {
            mobileOverlay.classList.remove('mobile-bg-open');
            mobileMenu.classList.remove('mobile-menu-open');
            document.body.classList.remove('body-noscroll');
            mobileNavbarTogglers.forEach((mobileNavbarToggler) => {
                mobileNavbarToggler.classList.remove('open');
            });
            mobileMenu.style.right = '-500px';
        }
    }
});

if (mobileNavbarTogglers.length && !document.body.classList.contains('aws-microsite')) {
    mobileNavbarTogglers.forEach((mobileNavbarToggler) => {
        mobileNavbarToggler.addEventListener('click', mobileToggleIconToggle);
    });
}

const announcementBanner = document.querySelector('div.announcement-banner');

if ((announcementBanner && window.getComputedStyle(announcementBanner).getPropertyValue('display') === 'none') || (!announcementBanner)) {
  mobileMenu.style.paddingTop = '65px';
}

/* Open mobile nav (.dropdown-menu) 4th level where possible based off of desktop side nav state */
function openMenu(menuItem) {
    let currEl = menuItem
    // traverse the selected menu to the top (#main-nav) in order to open
    while(currEl.id != "mobile-nav"){
        if(currEl.classList.contains('sub-nav')){
            currEl.classList.remove('d-none') 
        }else if(currEl.classList.contains('dropdown-menu') || currEl.classList.contains('dropdown')){
            currEl.classList.add('show') 
        }
        currEl = currEl.parentElement
    }
}

export function closeMobileNav(){
    const activeDropdowns = document.querySelectorAll('#mobile-nav .dropdown-menu.show, #mobile-nav .dropdown.show')
    const activeSubNav = document.querySelector('#mobile-nav .sub-nav:not(.d-none)')
    const activeMobileSelection = document.querySelector('#mobile-nav a[data-path].active') || false
    if(activeSubNav){
        activeSubNav.classList.add('d-none')
    }
    activeDropdowns.forEach(dd => dd.classList.remove('show'))

    if(activeMobileSelection) {
      activeMobileSelection.classList.remove('active')
    }
}

export function setMobileNav () {
    const pathName = window.location.pathname.slice(1,-1)
    let mobileSelection = ''

    // redirect the AGENT/aggregating agent path to observability_pipelines/integrations/... on mobile nav
    if(pathName.includes('observability_pipelines/production_deployment_overview/integrate_datadog_and_the_observability_pipelines_worker')){
        const observabilityPipelineMobile = document.querySelector('#mobile-nav a[data-path$="observability_pipelines"]');

        mobileSelection = observabilityPipelineMobile.nextElementSibling.querySelector(
            'a[data-path*="observability_pipelines/production_deployment_overview/integrate_datadog_and_the_observability_pipelines_worker"]'
        );
    }else{
        const hash = window.location.hash
        const  hrefSelector = hash ? `[href$="${hash}"]`: ''
        mobileSelection = document.querySelector(`#mobile-nav a[data-path="${pathName}"][data-skip="false"]${hrefSelector}`) || false
    }

    const subMenu = document.querySelector(`#mobile-nav a[data-path="${pathName}"] + ul.d-none`)

    if (mobileSelection) {
        const parentMenu = mobileSelection.parentElement || false
        document.querySelectorAll('#mobile-nav li.dropdown .dropdown-menu a').forEach(e => e.classList.remove('active'))
        mobileSelection.classList.add('active')
        if(subMenu){
            openMenu(subMenu)
        }else if (parentMenu){
            openMenu(parentMenu)
        }
    }else if(!mobileSelection && pathName.match(/api\/latest$/)){
        // on `api/latest` path, open "Overview" mobile nav dropdown menu by default
        const firstMobileNavDropdown = document.querySelector('#mobile-nav .dropdown-menu')
        openMenu(firstMobileNavDropdown)
    } 
}