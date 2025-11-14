---
title: Use Custom JavaScript Assertions In Browser Tests
description: Learn how to use custom JavaScript assertions in your Synthetic browser tests.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides > Use
  Custom JavaScript Assertions In Browser Tests
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/guide/custom-javascript-assertion/index.html
---

# Use Custom JavaScript Assertions In Browser Tests

## Overview{% #overview %}

This guide describes how you can test a user interface (UI) using custom JavaScript in a [browser test](https://docs.datadoghq.com/synthetics/browser_tests/). JavaScript assertions support synchronous and asynchronous code.

{% alert level="info" %}
JavaScript assertions are not supported in Windows private locations.
{% /alert %}

To create an assertion using custom JavaScript:

1. Click **Assertion** and select **Test custom JavaScript assertion**.
1. Write the body of your assertion.
1. Optionally, select a target element in the UI.
1. Click **Apply**.

For more information about assertions, see [Browser Test Steps](https://docs.datadoghq.com/synthetics/browser_tests/actions/?tab=testanelementontheactivepage#assertion).

## Assert that an element is not on the page{% #assert-that-an-element-is-not-on-the-page %}

To verify that an element with a specific ID is *not* on the page, use `return !document.getElementById("<ELEMENT_ID>");`.

To verify that elements are *not* on the page and return the number of elements in the console error, add the following in the body assertion:

```javascript
var element = document.querySelectorAll("<SELECTORS>");
if ( element.length > 0 ){
    console.error(element.length+"  "+"elements exist");
} 
return element.length === 0;
```

Your browser test results include `console.error` logs, with a maximum of 4 logs allowed per JavaScript function. Consider combining the logs for improved clarity and efficiency.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/custom-javascript-assertion/step_results.690a3d8cf72ddc2fb63956b2a8fccb7f.png?auto=format"
   alt="Console error logs appearing in the Errors & Warnings tab on the test step side panel" /%}

## Assert that a radio button is checked{% #assert-that-a-radio-button-is-checked %}

To verify that a radio button is checked, use `return document.querySelector("<SELECTORS>").checked === true;` in the body assertion.

## Set the value of a specified local storage item{% #set-the-value-of-a-specified-local-storage-item %}

To set the value of a specified local storage item, add the following in the body assertion:

```javascript
localStorage.setItem(keyName, keyValue);
return true
```

For example, to set the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC to "mytime":

```javascript
localStorage.setItem("mytime", Date.now());
return true
```

`localStorage` can be accessed in other JavaScript assertions if you need to compare specific values:

```javascript
localStorage.getItem("mytime");
return true
```

## Assert on text contained in a rendered PDF{% #assert-on-text-contained-in-a-rendered-pdf %}

You can use an external library to test the content of a rendered PDF.

To load external libraries, use a promise in the body assertion:

In the `Custom JavaScript` file:

```javascript
const script = document.createElement('script');
script.type = 'text/javascript';
//load external library
script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

var loadingTask = pdfjsLib.getDocument("<PDF_URL>");
return await loadingTask.promise.then(function(pdf) {
    return pdf.getPage(1).then(function(page) {
        return page.getTextContent().then(function(content) {
            return content.items[0].str.includes("<CONTENT_STRING>")
        })
    })
});
```

## Further reading{% #further-reading %}

- [Learn about browser test steps](https://docs.datadoghq.com/synthetics/browser_tests/actions/)
- [Learn how to configure advanced options for test steps](https://docs.datadoghq.com/synthetics/browser_tests/advanced_options/)
- [Learn how to handle pop-ups triggered at unknown times](https://docs.datadoghq.com/synthetics/guide/popup/#moving-popups)
- [How I helped my client scale their browser tests with Datadog](https://www.datadoghq.com/blog/ambassador-browser-tests/)
