---
title: Filter Selector Menu Design
---

<style>
    /*
    * {
        outline: 1px solid red;
    }
    */

    p.cdoc-filter-label {
        margin-top: 0px;
        margin-bottom: 10px;
        font-weight: 400;
        text-transform: uppercase;
        font-size: 14px;
        line-height: 18px;
    }

    .cdoc-dropdown-container {
        /* width: 22%; */
        margin-bottom: 1em;
        display: inline-block;
        margin-right: 1em;
    }

    .cdoc-dropdown-options-list {
        /* width: 100%; */
        background-color: rgb(255, 255, 255);
        box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 20px 0px;
        border-radius: 6px;
    }

    .cdoc-dropdown-option:hover {
        background-color: rgb(246, 246, 246);
        color: rgb(99, 44, 166);
    }

    .cdoc-dropdown-option {
        display: block;
        width: 100%;
        padding-bottom: 8px;
        padding-left: 10px;
        padding-right: 16px;
        padding-top: 4px;
        font-weight: 400;
        color: black;
        text-align: inherit;
        white-space: nowrap;
        background-color: transparent;
        border: 0;
        line-height: 20px;
    }

    button.cdoc-dropdown-btn {
        /* width: 100%; */
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.6em;
        height: 31px;
        color: rgb(99, 44, 166);
        border: 1px solid rgb(199, 199, 199);
        border-radius: 4px;
        padding: 0rem 0.6rem 0.1rem;
        background-color: rgb(246, 246, 246);
        font-weight: 600;
        line-height: 20px;
        box-sizing: border-box;
    }

    .cdoc-chevron {
        width: 8px;
        height: 8px;
        display: inline-block;
        border: 2px solid rgb(99, 44, 166);
        border-top: none;
        border-left: none;
    }

    .cdoc-dropdown {
        display: block;
        position: relative;
    }

    .cdoc-dropdown .cdoc-chevron.cdoc-up {
        display: none;
    }

    .cdoc-dropdown__expanded .cdoc-chevron.cdoc-down {
        display: none;
    }

    .cdoc-dropdown__expanded .cdoc-chevron.cdoc-up {
        display: inline-block;
    }

    .cdoc-chevron.cdoc-up {
        transform: rotate(-135deg);
        margin-top: 5px;
    }

    .cdoc-chevron.cdoc-down {
        transform: rotate(45deg);
    }

    .cdoc-dropdown-options-list {
        display: none;
    }

    .cdoc-dropdown.cdoc-dropdown__expanded .cdoc-dropdown-options-list {
        display: block;
        position: absolute;
        top: 39px;
    }
</style>

## Set of dropdowns

<div class="cdoc-dropdown-container">
    <p class="cdoc-filter-label">Color</p>
    <div class="cdoc-dropdown cdoc-dropdown__expanded">
      <button class="cdoc-dropdown-btn" type="button">
        <span class="cdoc-btn-label">Red</span>
        <div class="cdoc-chevron cdoc-down"></div>
        <div class="cdoc-chevron cdoc-up"></div>
      </button>
      <div class="cdoc-dropdown-options-list">
        <a class="cdoc-dropdown-option">Red</a>
        <a class="cdoc-dropdown-option">Blue</a>
        <a class="cdoc-dropdown-option">Burgundy</a>
      </div>
    </div>
</div>
<div class="cdoc-dropdown-container">
    <p class="cdoc-filter-label">Size</p>
    <div class="cdoc-dropdown">
      <button class="cdoc-dropdown-btn" type="button">
        <span class="cdoc-btn-label">Medium</span>
        <div class="cdoc-chevron cdoc-down"></div>
        <div class="cdoc-chevron cdoc-up"></div>
      </button>
      <div class="cdoc-dropdown-options-list">
        <a class="cdoc-dropdown-option">Small</a>
        <a class="cdoc-dropdown-option">Medium</a>
        <a class="cdoc-dropdown-option">Large</a>
      </div>
    </div>
</div>
<div class="cdoc-dropdown-container">
    <p class="cdoc-filter-label">Shape</p>
    <div class="cdoc-dropdown">
      <button class="cdoc-dropdown-btn" type="button">
        <span class="cdoc-btn-label">A big rectangle</span>
        <div class="cdoc-chevron cdoc-down"></div>
        <div class="cdoc-chevron cdoc-up"></div>
      </button>
      <div class="cdoc-dropdown-options-list">
        <a class="cdoc-dropdown-option">Circle</a>
        <a class="cdoc-dropdown-option">A big rectangle</a>
        <a class="cdoc-dropdown-option">Octagon</a>
      </div>
    </div>
</div>
<div class="cdoc-dropdown-container">
    <p class="cdoc-filter-label">Count</p>
    <div class="cdoc-dropdown">
      <button class="cdoc-dropdown-btn" type="button">
        <span class="cdoc-btn-label">Ten</span>
        <div class="cdoc-chevron cdoc-down"></div>
        <div class="cdoc-chevron cdoc-up"></div>
      </button>
      <div class="cdoc-dropdown-options-list">
        <a class="cdoc-dropdown-option">Ten</a>
        <a class="cdoc-dropdown-option">Twenty</a>
        <a class="cdoc-dropdown-option">Thirty</a>
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

