---
title: Handle Pop-Ups In Browser Tests
kind: guide
further_reading:
  - link: 'https://www.datadoghq.com/blog/browser-tests/'
    tag: 'Blog'
    text: 'User experience monitoring with Datadog Browser Tests'
  - link: 'synthetics/browser_tests'
    tag: 'Documentation'
    text: 'Learn about Synthetic browser tests'
---
## Overview

This guide describes how to manage pop-ups such as modals or application windows in a Synthetic [browser test][5].

## Modals

### JavaScript

Synthetic browser tests automatically handle [JavaScript modals][1]:

 - `alert` modals are immediately dismissed for OK. 
 - `prompt` modals are filled with `Lorem Ipsum` for tests on Google Chrome or Microsoft Edge.
 - `confirm` modals that ask for confirmation are accepted.

### Basic authentication

For basic authentication pop-ups, specify the associated credentials in your browser test configuration's [**Advanced Options**][2].

{{< img src="synthetics/guide/popup/http_authentication.png" alt="Basic Auth Pop-up" style="width:90%" >}}

## Application pop-ups

### Anchored pop-ups

If a pop-up appears at a specific point of your journey, you can record a step to close it and allow this step to fail using the [corresponding option][3]. This way, your test knows how to behave in case a pop-up appears. If the pop-up does not show up, the step fails without causing the whole test to fail. 

{{< img src="synthetics/guide/popup/allow_fail_option.png" alt="Allow step to fail to handle pop-up" style="width:60%" >}}

### Moving pop-ups

If the time at which these pop-ups appear in a session is not predictable, check with the third party providing the pop-up to see if they can create a rule that prevents the pop-up from appearing during your browser test execution. They can, for example, provide you with a cookie that you can input in the [**Advanced Options** section][2] of your test.

Alternatively, use one of these methods to ensure your pop-up is closed and your test is able to continue its journey:
  * Create a [JavaScript assertion][4] at the beginning of your browser test to regularly try to close the pop-up:

    ```javascript
    if (document.querySelector("<ELEMENT>")) {
      return true;
    } else {
      return new Promise((resolve, reject) => {
        const isPopupDisplayed = () => {
          if (document.querySelector("<ELEMENT>")) {
            clearInterval(popup);
            resolve(true);
          }
        };
        let popup = setInterval(isPopupDisplayed, 500);
      });
    }
    ```

  * Record steps to close the pop-up, add them between all your other browser test steps, and select the [**Allow this step to fail** option][3] for each of them.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://javascript.info/alert-prompt-confirm
[2]: /synthetics/browser_tests/#test-configuration
[3]: /synthetics/browser_tests/advanced_options/#optional-step
[4]: /synthetics/browser_tests/actions#test-your-ui-with-custom-javascript
[5]: /synthetics/browser_tests