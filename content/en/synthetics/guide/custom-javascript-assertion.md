---
title: Use Custom JavaScript Assertions In Browser Tests

description: Learn how to use custom JavaScript assertions in your Synthetic browser tests.
further_reading:
- link: '/synthetics/browser_tests/test_steps/'
  tag: 'Documentation'
  text: 'Learn about browser test steps'
- link: '/synthetics/browser_tests/advanced_options/'
  tag: 'Documentation'
  text: 'Learn how to configure advanced options for test steps'
- link: '/synthetics/guide/popup/#moving-popups'
  tag: 'Documentation'
  text: 'Learn how to handle pop-ups triggered at unknown times'
- link: "https://www.datadoghq.com/blog/ambassador-browser-tests/"
  tag: "Blog"
  text: "How I helped my client scale their browser tests with Datadog"
---

## Overview

This guide describes how you can test a user interface (UI) using custom JavaScript in a [browser test][1]. JavaScript assertions support synchronous and asynchronous code.

<div class="alert alert-info">JavaScript assertions are not supported in Windows private locations.</div>

To create an assertion using custom JavaScript:

1. Click **Assertion** and select **Test custom JavaScript assertion**.
2. Write the body of your assertion.
3. Optionally, select a target element in the UI. 
4. Click **Apply**.

For more information about assertions, see [Browser Test Steps][2].

## Assert that an element is not on the page

To verify that an element with a specific ID is *not* on the page, use `return !document.getElementById("<ELEMENT_ID>");`.

To verify that elements are *not* on the page and return the number of elements in the console error, add the following in the body assertion:

{{< code-block lang="javascript" >}}
var element = document.querySelectorAll("<SELECTORS>");
if ( element.length > 0 ){
    console.error(element.length+"  "+"elements exist");
} 
return element.length === 0;
{{< /code-block >}}

Your browser test results include `console.error` logs, with a maximum of 4 logs allowed per JavaScript function. Consider combining the logs for improved clarity and efficiency.

{{< img src="synthetics/guide/custom-javascript-assertion/step_results.png" alt="Console error logs appearing in the Errors & Warnings tab on the test step side panel" style="width:80%;" >}}

## Assert that a radio button is checked

To verify that a radio button is checked, use `return document.querySelector("<SELECTORS>").checked === true;` in the body assertion.

## Set the value of a specified local storage item

To set the value of a specified local storage item, add the following in the body assertion:

{{< code-block lang="javascript" >}}
localStorage.setItem(keyName, keyValue);
return true
{{< /code-block >}}

For example, to set the number of milliseconds elapsed since January 1, 1970, 00:00:00 UTC to "mytime":

{{< code-block lang="javascript" >}}
localStorage.setItem("mytime", Date.now());
return true
{{< /code-block >}}

`localStorage` can be accessed in other JavaScript assertions if you need to compare specific values:

{{< code-block lang="javascript" >}}
localStorage.getItem("mytime");
return true
{{< /code-block >}}

## Assert on text contained in a rendered PDF

You can use an external library to test the content of a rendered PDF. 

To load external libraries, use a promise in the body assertion:

{{< code-block lang="javascript" filename="Custom JavaScript" collapsible="true" >}}
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
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/
[2]: /synthetics/browser_tests/test_steps/?tab=testanelementontheactivepage#assertion
