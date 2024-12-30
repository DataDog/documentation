---
title: Filter Selector Menu Design
---

<style>
    /*
    * {
        outline: 1px solid red;
    }
    */

    p.cdocs-filter-label {
        margin-top: 0px;
        margin-bottom: 10px;
        font-weight: 400;
        text-transform: uppercase;
        font-size: 14px;
        line-height: 18px;
    }
    
    .cdocs-dropdown-container .btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
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

    .cdocs-dropdown-options-list {
        background-color: rgb(255, 255, 255);
        box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 20px 0px;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }

    .cdocs-btn-label {
        /* margin-right: 0.5em; */
    }

    .cdocs-dropdown-option:hover {
        background-color: rgb(246, 246, 246);
        color: rgb(99, 44, 166);
    }

    .cdocs-dropdown-option {
        display: block;
        width: 100%;
        padding-bottom: 4px;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 4px;
        clear: both;
        font-weight: 400;
        color: black;
        text-align: inherit;
        white-space: nowrap;
        background-color: transparent;
        border: 0;
    }

    button.cdocs-dropdown-btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.6em;
        height: 31px;
        color: rgb(99, 44, 166);
        border: 1px solid rgb(199, 199, 199);
        border-radius: 4px 4px 0 0;
        padding-block-end: 1.6px;
        padding-block-start: 0px;
        padding-bottom: 1.6px;
        padding-inline-end: 9.6px;
        padding-inline-start: 9.6px;
        padding-left: 9.6px;
        padding-right: 9.6px;
        padding-top: 0px;
        background-color: rgb(246, 246, 246);
        font-weight: 600;
        line-height: 20px;
        box-sizing: border-box;
    }

    .cdocs-chevron {
        width: 8px;
        height: 8px;
        display: inline-block;
        border: 2px solid rgb(99, 44, 166);
        border-top: none;
        border-left: none;
    }

    .cdocs-dropdown {
        position: relative;
    }

    .cdocs-dropdown .cdocs-chevron.cdocs-up {
        display: none;
    }

    .cdocs-dropdown.cdocs-dropdown__expanded .cdocs-chevron.cdocs-down {
        display: none;
    }

    .cdocs-dropdown.cdocs-dropdown__expanded .cdocs-chevron.cdocs-up {
        display: inline-block;
    }

    .cdocs-chevron.cdocs-up {
        transform: rotate(-135deg);
    }

    .cdocs-chevron.cdocs-down {
        transform: rotate(45deg);
    }

    /*
    .cdocs-dropdown-options-list {
        display: none;
    }

    .cdocs-dropdown.cdocs-dropdown__expanded .cdocs-dropdown-options-list {
        position: absolute;
        bottom: -7px;
        box-sizing: border-box;
        display: block;
    }
    */
</style>

## Set of dropdowns

<div class="cdocs-dropdown-container">
    <p class="cdocs-filter-label">Color</p>
    <div class="cdocs-dropdown cdocs-dropdown__expanded">
      <button class="cdocs-dropdown-btn" type="button">
        <span class="cdocs-btn-label">Red</span>
        <div class="cdocs-chevron cdocs-down"></div>
        <div class="cdocs-chevron cdocs-up"></div>
      </button>
      <div class="cdocs-dropdown-options-list">
        <a class="cdocs-dropdown-option">Red</a>
        <a class="cdocs-dropdown-option">Blue</a>
        <a class="cdocs-dropdown-option">Chartreuse</a>
      </div>
    </div>
</div>
<div class="cdocs-dropdown-container">
    <p class="cdocs-filter-label">Size</p>
    <div class="cdocs-dropdown">
      <button class="cdocs-dropdown-btn" type="button">
        <span class="cdocs-btn-label">Medium</span>
        <div class="cdocs-chevron cdocs-down"></div>
        <div class="cdocs-chevron cdocs-up"></div>
      </button>
      <div class="cdocs-dropdown-options-list">
        <a class="cdocs-dropdown-option">Small</a>
        <a class="cdocs-dropdown-option">Medium</a>
        <a class="cdocs-dropdown-option">Large</a>
      </div>
    </div>
</div>
<div class="cdocs-dropdown-container">
    <p class="cdocs-filter-label">Shape</p>
    <div class="cdocs-dropdown">
      <button class="cdocs-dropdown-btn" type="button">
        <span class="cdocs-btn-label">A big rectangle</span>
        <div class="cdocs-chevron cdocs-down"></div>
        <div class="cdocs-chevron cdocs-up"></div>
      </button>
      <div class="cdocs-dropdown-options-list">
        <a class="cdocs-dropdown-option">Circle</a>
        <a class="cdocs-dropdown-option">A big rectangle</a>
        <a class="cdocs-dropdown-option">Octagon</a>
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

