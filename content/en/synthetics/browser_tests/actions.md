---
title: Browser Test Steps
kind: documentation
description: Record Steps for a Synthetic Browser Test
further_reading:
- link: "/synthetics/browser_tests/advanced_options/"
  tag: "Documentation"
  text: "Learn how to configure advanced options for steps"
---

## Overview

Steps are a series of actions that you can record for a browser test, which you can then edit or build on. You can define the steps you want your browser test to go through either by directly recording them with the Datadog test recorder extension or by manually adding the step of interest. All steps come with a set of [advanced options][1] that you can configure.

**Note**: The default timeout for each step is approximately 60 seconds. You can override this default timeout through the dedicated [advanced option][2].

## Automatically Recorded Steps

The following steps are automatically recorded with the [Datadog browser test recorder extension][3]:

## Click

[Datadog browser test recorder extension][3] automatically records clicks on your page. Specify the type of click you want your browser test to perform at execution time:

{{< img src="synthetics/browser_tests/browser_test_click_step.mp4" alt="Browser Test Click Step" video="true" width="60%">}}

Choose from:

* Primary click (corresponds to a left click)
* Double click
* Contextual click (corresponds to a right click)

## Type text

[Datadog browser test recorder extension][3] automatically records text inputted in any fields of your website (forms, text areas, etc.):

{{< img src="synthetics/browser_tests/input_text.mp4" alt="Browser Test Input Text Step" video="true" width="100%">}}

## Select option

[Datadog browser test recorder extension][3] automatically records options being selected from `select` dropdown menu:

{{< img src="synthetics/browser_tests/select_options.png" alt="Select options step"  style="width:60%;">}}

## Upload file

You can record the uploading of files as a step. To record an **Upload** step you can:

* Either open your desktop from the browser,
* Or drag and drop your file in the recording iframe.

{{< img src="synthetics/browser_tests/upload_file_step.png" alt="Create an upload file step"  style="width:60%;">}}

This is limited to 10 files with a limit of 5MB each.

## Manually Added Steps

The following steps can be manually added to a browser test by configuring them on the the browser test recorder page:

## Assertion

{{< img src="synthetics/browser_tests/browser_test_assertions.png" alt="Browser Test Assertion"  style="width:60%;">}}

Assertions allow you to validate that your browser test is in the state you expect it to be in, at any given point of a simulated user journey. This is why you must end your browser tests by an **Assertion** to confirm it ended up in an expected state.

Some assertions are performed on the **active page**. Active page refers to the page that has experienced the last interaction like using a **Click** or an **Assertion** on a given page element for instance.

### Test an element's content

Selects an element and checks if it contains a specific value. For instance, you could select a `div` and check whether it contains the word "hello".

### Test an element's attribute

Selects an element of your page and checks if one of its attributes matches the expected content. For instance, you could test that an `src` attribute value matches the path of the expected image.

### Test that some text is present on the active page

Asserts that some specific text is present on the current page.

### Test that some text is not present on the active page

Asserts that some specific text is **NOT** present on the current page.

### Test the content of the URL of the active page

Takes the URL of the last page that was interacted with, then asserts whether a specific value (`string`, `number`, `regex`) is present within it.

### Test that an element is present on the active page

Asserts that an element (such as a specific `span`, `div`, `h`, `a`, etc.) is present on the current page.

### Test that an email was received

Asserts that an email was sent and whether specific values (`string`, `number`, `regex`) are present within the email subject or body. This assertion leverages [email variables][4], you consequently first need to create an email variable to be able to use a `Test that an email was received` assertion.

### Test your UI with custom JavaScript

Test a custom assertion on the active page using your own JavaScript code.

**Note**: JavaScript assertions support both synchronous and asynchronous code.

The JavaScript assertion function comes with the following parameters and requires a return statement.

* The `return` (mandatory) statement should reflect the condition the assertion needs to meet for your browser test step to be successful. Any type can be returned, but the value is automatically casted as a boolean.

* `vars` (optional): A string containing your browser test [variables][5]. Use `vars.<YOUR_VARIABLE>` to refer to a browser test variable in your JavaScript snippet. For example, if your browser test contains a `USERNAME` variable, call it in your JavaScript snippet using `vars.USERNAME`.

* `element` (optional): The locator of the element on the page. To set this up, use the **Select** and **Update** target element buttons. The selected element automatically leverages Datadog's browser test multi-locating algorithm.

{{< img src="synthetics/browser_tests/js_assertion.mp4" alt="Browser Test JavaScript Assertion" video="true" width="100%">}}

Since JavaScript assertions run in the context of the active page, these steps can access all the objects defined in the active page (libraries, built-ins, global variables, etc.). To load external libraries, use a promise. For example:

```javascript
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://code.jquery.com/jquery-3.5.1.slim.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

// Script is now loaded

return jQuery().jquery.startsWith('3.5.1')
```

**Note**: The way Browser tests load external JavaScript is by adding it to the page, so it will only work if your website accepts it.

### Test a downloaded file

Perform verifications on files downloaded in previous steps. You can check that a file was correctly downloaded and assert on: the file name, size, and MD5 value.

**Note**: You can find out more on how to test downloads on [this dedicated guide][6].

## Navigation

{{< img src="synthetics/browser_tests/navigation_step.png" alt="Browser Test Navigation Step"  style="width:60%;">}}

### Refresh a page

Refresh the current page of the scenario.

### Go to an email and click on a link

This step allows you to access unique Synthetic mail inboxes after creating an [email variable][4]. Choose the email you are interested in and click the link you want your browser test to click on. This step brings your test to the corresponding page and allows you to move on with the rest of your journey from that specific page.

### Follow a specific link

Go to a specific page.

**Note**: You must prepend your URLs with `http` or `https` in the **Enter link URL** box.

## Special Actions

The [Datadog browser test recorder extension][3] is able to record most steps associated to user journeys you might want to monitor. However, some steps—such as **Hover**, **Press Key**, and **Scroll**—are not recorded automatically. Explicitly add a step for them using the **Special Actions** menu located at the top left-hand corner of the recorder.

### Hover

To avoid generating a step at each element hovering during recording, this browser test step is not added through an actual hovering mechanism but using a dedicated step with a click.

After selecting the **Hover** step, click on the element you want to choose to create a new step.

### Press key

You can simulate users entering keystrokes using **Press Key** steps. The keys below can be recorded using the [Datadog browser test recorder extension][3]:

* Enter
* Arrows (up, down, right, and left)
* Tab (outside a form)
* Escape
* Backspace

To press keys that are not being automatically recorded, specify which values need to be pressed in the value box of the **Press Key** special step:

{{< img src="synthetics/browser_tests/browser_test_press_key.png" alt="Browser Test Press Key"  style="width:60%;">}}

The below modifiers can also be applied to the inputted value:

* Alt
* Control
* Meta
* Shift

### Scroll

Browser tests automatically scroll to the element they need to interact with. Consequently, in most cases, you do not need to manually add a scroll step. The scroll step should only be added when needed to trigger an additional network request, such as in an infinite scroll.

{{< img src="synthetics/browser_tests/browser_test_scroll_step.png" alt="Browser Test Scroll Step"  style="width:60%;">}}

You need to specify the number of pixels your browser test should scroll vertically or horizontally.

By default, the **Scroll** step scrolls on the whole page. If you need to scroll on a specific element (for instance a specific `<div>`), use the **Target Element** option to select the element you want your browser test to scroll on.

## Variable

### Create a variable

{{< img src="synthetics/browser_tests/variables.png" alt="Browser Test Variables"  style="width:60%;">}}

To create a variable, first give it a name then define its value from:

#### A Pattern

Create a variable by defining its value from one of the below available builtins:

`{{ numeric(n) }}`
: Generates a numeric string with `n` digits.

`{{ alphabetic(n) }}`
: Generates an alphabetic string with `n` letters.

`{{ alphanumeric(n) }}`
: Generates an alphanumeric string with `n` characters.

`{{ date(n, format) }}`
: Generates a date in one of our accepted formats with a value of the date the test is initiated + `n` days.

`{{ timestamp(n, unit) }}` 
: Generates a timestamp in one of our accepted units with a value of the timestamp the test is initiated at +/- `n` chosen unit.

#### An Element

Create a variable out of a `span`, `div`, etc. content by extracting the text of this element.

#### JavaScript

Write the custom JavaScript code returning the value you want your variable to be assigned to.

**Note**: JavaScript steps support both synchronous and asynchronous code.

The JavaScript function comes with the following parameters and requires a return statement.

* The `return` (mandatory) statement should return the value you want to associate to your JavaScript variable. Any type can be returned, but the value is automatically casted as a string.

* `vars` (optional): A string containing any existing browser test [variables][5] you would want to leverage inside of your code. Use `vars.<YOUR_VARIABLE>` to refer to a browser test variable in your JavaScript snippet. For example, if your browser test already features a `PRICE` variable, call it in your JavaScript snippet using `vars.PRICE`.

* `element` (optional): The locator of the element on the page. To set this up, use the **Select** and **Update** target element buttons. The selected element automatically leverages Datadog's browser test multi-locating algorithm.

{{< img src="synthetics/browser_tests/js_variable.mp4" alt="Browser Test JavaScript Variable" video="true" width="100%">}}

Since JavaScript assertions run in the context of the active page, these steps can access all the objects defined in the active page (libraries, built-ins, global variables, etc.). To load external libraries, use a promise, for example:

```javascript
const script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://code.jquery.com/jquery-3.5.1.slim.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

// Script is now loaded

return jQuery().jquery.startsWith('3.5.1')
```

**Note**: The way Browser tests load external JavaScript is by adding it to the page, so it will only work if your website accepts it.

#### A Global Variable

Pick any global variables that was defined through [Synthetic  Monitoring Settings][7].

#### An Email

Generate a random Synthetic email address that can be used in your test steps to [assert if an email was correctly sent][8] or to [navigate to a link contained within the email][9] (e.g. click a confirmation link). A unique mailbox is generated at each test execution to avoid any conflicts between test runs.

### Use the variable

All steps input fields with a `{{` indication support variables:

{{< img src="synthetics/browser_tests/autocomplete.png" alt="Variable autocompletion indicator"  style="width:70%;">}}

If you want to record a step leveraging a variable, you can use the little hand on your variable box:

{{< img src="synthetics/browser_tests/variable_input.mp4" alt="Variable Input" video="true"  width="100%" >}}

At recording, this translates into the actual value of the variable being injected on your website's input (consequently allowing you to move on with the rest of your steps) and creates an associated `Type text` step featuring `{{ <YOUR_VARIABLE_NAME> }}`.
At test execution, `{{ <YOUR_VARIABLE_NAME> }}` is systematically replaced by your variable's associated value.

**Note**: Some variables only get computed at runtime (For example, variable from HTTP request or variable from JavaScript step). To record a step using one of these variables, record a step with the actual variable value, then replace the actual value with `{{ <YOUR_VARIABLE_NAME> }}` on your step definition before saving your test. 

## Wait

By default, Datadog waits for a page to be fully loaded before performing a step or a next step—with a timeout after 60 seconds. In some cases, however, you may wish to set a custom waiting time. For instance, if you know that a page or a page element is taking more than 60 seconds to load, you can leverage the wait step in order to extend that default timeout. If you choose to use this functionality, the value for your wait step must not exceed 300 seconds.

**Note**: This additional time is systematically added to **each run** of your browser test scenario.

## Subtests

{{< img src="synthetics/browser_tests/subtest.png" alt="Browser Test Subtest"  style="width:60%;">}}

You can run browser tests within other browser tests in order to reuse existing workflows (up to two levels of nesting). Find out more about why you should use subtests and see some examples in [this dedicated guide][10].

Variables from subtests can be overriden in parent tests if you ensure the variables created at the parent test level have the same names as the variables present in the subtest. By default, the subtest is executed in sequence with the previous steps of the parent test but this can be tweaked using [**Subtest Advanced options**][11].

**Note**: If it does not make sense for you to run your subtest independently, you can pause it. It will continue to be called as part of your main test, but it will not be executed individually.

## HTTP requests

You can run HTTP requests as part of your browser tests.

{{< img src="synthetics/browser_tests/recorder_http_requests.png" alt="HTTP Request step"  style="width:70%;" >}}

### Setup

To define your HTTP request:

1. Choose the **Method** and **URL** to query. Available methods are: `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE`, and `OPTIONS`.
2. Optionally specify **Advanced Options**:
     * Follow redirects: Toggle to have the monitored endpoint follow up to ten redirects.
     * Allow insecure certificates: Toggle to have your HTTP test continue the connection even if there is an error when validating the certificate.
     * Headers: Defined headers override the default browser headers.
     * Authentication: HTTP basic authentication with username and password
     * Body: Request body and body type (`text/plain`, `application/json`, `text/xml`, `text/html`, or `None`). **Note**: The request body is limited to a maximum size of 50 kilobytes.
     * Cookies: Defined cookies are added to the default browser cookies. Set multiple cookies using the format `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.
3. Click **Test URL** to test your request configuration. This results in a preview showing response data.

{{< img src="synthetics/browser_tests/http_request.png" alt="Make HTTP Request"  style="width:60%;" >}}

### Add assertions

Optionally, you can base your step success on assertions about the defined HTTP request:

| Type          | Operator                                                                                               | Value type                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| body          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][12] | _String_ <br> _[Regex][13]_ <br> _String_, _[Regex][13]_ |
| header        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                       | _String_ <br> _[Regex][13]                                      |
| response time | `is less than`                                                                                         | _Integer (ms)_                                                  |
| status code   | `is`, `is not`                                                                                         | _Integer_                                                      |

If you click on **Test URL**, then the basic assertions are automatically filled:

- `Response time` _lessThan_ 2000 ms
- `Header content-type` _is_ "returned value"
- `Status code` _is_ "returned value"

### Extract a variable from the response

You can also optionally extract a variable from the response of your HTTP request by parsing its response headers or body. The value of the variable is updated each time the HTTP request step is being run.

To parse your variable:

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores and must have at least three characters.
2. Decide whether to extract your variable from the response headers, or from the response body:

    * Extract the value from **response header**: use the full response header of your HTTP request as variable value or parse it with a [regex][13].
    * Extract the value from **response body**: use the full response body of your HTTP request as variable value, parse it with a [regex][13] or a [JSONPath][12].

{{< img src="synthetics/browser_tests/browser_test_vft.mp4" alt="Create a variable from HTTP request in Browser test" video="true"  width="80%" >}}

Once created this variable can be used in the following steps of your browser test.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/advanced_options/
[2]: /synthetics/browser_tests/advanced_options/#timeout
[3]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[4]: /synthetics/guide/email-validation/#create-an-email-variable
[5]: /synthetics/browser_tests/actions#use-variables-in-javascript-steps
[6]: /synthetics/guide/testing-file-upload-and-download/#testing-a-file-download
[7]: /synthetics/settings/
[8]: /synthetics/browser_tests/actions#test-that-an-email-was-received
[9]: /synthetics/browser_tests/actions#go-to-an-email-and-click-on-a-link
[10]: /synthetics/guide/reusing-browser-test-journeys
[11]: /synthetics/browser_tests/advanced_options/#subtests
[12]: https://restfulapi.net/json-jsonpath/
[13]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
