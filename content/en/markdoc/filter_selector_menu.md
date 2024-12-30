---
title: Filter Selector Menu Design
---

<style>
    p.filter-label {
        font-size: 14px !important;
        line-height: 18px;
        color: black !important;
        margin-bottom: 10px;
        font-weight: 400; 
    }
    
    .cdocs-dropdown-container .btn {
        border: 1px solid #c7c7c7;
        background: #f6f6f6;
        border-radius: 4px;
        height: 31px;
        padding: 0rem 0.6rem 0.1rem;
        color: #632CA6;
        /* width: 100px; */
        font-size: 16px;
        line-height: 20px;
        z-index: 3;
        font-variant: lining-nums;
    }

    .cdocs-dropdown-container {
        margin-bottom: 1em;
        display: inline-block;
        margin-right: 1em;
    }

    .cdocs-dropdown-menu {
        background-color: rgb(255, 255, 255);
        border-bottom-color: rgba(0, 0, 0, 0.176);
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        border-image-outset: 0;
        border-image-repeat: stretch;
        border-image-slice: 100%;
        border-image-source: none;
        border-image-width: 1;
        /* border-bottom-style: solid; */
        /* border-bottom-width: 1px; */
        /* border-left-color: rgba(0, 0, 0, 0.176); */
        /* border-left-style: solid; */
        /* border-left-width: 1px; */
        /* border-right-color: rgba(0, 0, 0, 0.176); */
        /* border-right-style: solid; */
        /* border-right-width: 1px; */
        /* border-top-color: rgba(0, 0, 0, 0.176); */
        /* border-top-style: solid; */
        /* border-top-width: 1px; */
        box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 20px 0px;
    }

    .btn-label {
        margin-right: 0.5em;
    }

    .cdocs-dropdown-item {
        display: block;
        width: 100%;
        padding-bottom: 4px;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 4px;
        clear: both;
        font-weight: 400;
        color: var(--bs-dropdown-link-color);
        text-align: inherit;
        white-space: nowrap;
        background-color: transparent;
        border: 0;
    }
</style>

## Set of dropdowns

<div class="cdocs-dropdown-container">
    <p class="text-uppercase filter-label">Color</p>
    <div class="dropdown bootstrap-dropdown-custom">
      <button class="btn d-flex align-items-center justify-content-between" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="btn-label">Red</span>
        <div class="chevron chevron-down"></div>
        <div class="chevron chevron-up d-none"></div>
      </button>
      <div class="cdocs-dropdown-menu">
        <a class="cdocs-dropdown-item">Red</a>
        <a class="cdocs-dropdown-item">Blue</a>
        <a class="cdocs-dropdown-item">Green</a>
      </div>
    </div>
</div>
<div class="cdocs-dropdown-container">
    <p class="text-uppercase filter-label">Size</p>
    <div class="dropdown bootstrap-dropdown-custom">
      <button class="btn d-flex align-items-center justify-content-between" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span class="btn-label">Medium</span>
        <div class="chevron chevron-down"></div>
        <div class="chevron chevron-up d-none"></div>
      </button>
      <div class="dropdown-menu">
        <a class="dropdown-item">Small</a>
        <a class="dropdown-item">Medium</a>
        <a class="dropdown-item">Large</a>
      </div>
    </div>
</div>
<div class="cdocs-dropdown-container">
    <p class="text-uppercase filter-label">Shape</p>
    <div class="dropdown bootstrap-dropdown-custom">
        <button class="btn d-flex align-items-center justify-content-between" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="btn-label">An oblong rectangle</span>
            <div class="chevron chevron-down"></div>
            <div class="chevron chevron-up d-none"></div>
        </button>
        <div class="dropdown-menu">
            <a class="dropdown-item">Circle</a>
            <a class="dropdown-item">A big rectangle</a>
            <a class="dropdown-item">Octagon</a>
        </div>
    </div>
</div>

## Duis aute irure dolor

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

### Culpa qui officia

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Lorem ipsum dolor sit amet

Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Nisi ut aliquip 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

