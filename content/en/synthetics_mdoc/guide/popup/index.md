---
title: Handle Pop-Ups In Browser Tests
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides > Handle
  Pop-Ups In Browser Tests
sourceUrl: https://docs.datadoghq.com/synthetics/guide/popup/index.html
---

# Handle Pop-Ups In Browser Tests

## Overview{% #overview %}

This guide describes how to manage pop-ups such as modals or application windows in a Synthetic [browser test](https://docs.datadoghq.com/synthetics/browser_tests).

## Modals{% #modals %}

### JavaScript{% #javascript %}

Synthetic browser tests automatically handle [JavaScript modals](https://javascript.info/alert-prompt-confirm):

- `alert` modals are immediately dismissed for OK.
- `prompt` modals are filled with `Lorem Ipsum` for tests on Google Chrome or Microsoft Edge.
- `confirm` modals that ask for confirmation are accepted.

### Basic authentication{% #basic-authentication %}

For basic authentication pop-ups, specify the associated credentials in your browser test configuration's [**Advanced Options**](https://docs.datadoghq.com/synthetics/browser_tests/#test-configuration).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/popup/http_authentication.805eaa88d5e0c1a858b7bce1d5b9bee4.png?auto=format"
   alt="Basic Auth Pop-up" /%}

## Application pop-ups{% #application-pop-ups %}

### Anchored pop-ups{% #anchored-pop-ups %}

If a pop-up appears at a specific point of your journey, you can record a step to close it and allow this step to fail using the [corresponding option](https://docs.datadoghq.com/synthetics/browser_tests/advanced_options/#optional-step). This way, your test knows how to behave in case a pop-up appears. If the pop-up does not show up, the step fails without causing the whole test to fail.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/popup/allow_fail_option.ec5deac787c9862e3006ef2ee5f6cd93.png?auto=format"
   alt="Allow step to fail to handle pop-up" /%}

### Moving pop-ups{% #moving-pop-ups %}

If the time at which these pop-ups appear in a session is not predictable, check with the third party providing the pop-up to see if they can create a rule that prevents the pop-up from appearing during your browser test execution. They can, for example, provide you with a cookie that you can input in the [**Advanced Options** section](https://docs.datadoghq.com/synthetics/browser_tests/#test-configuration) of your test.

Alternatively, use one of these methods to ensure your pop-up is closed and your test is able to continue its journey:

- Create a [JavaScript assertion](https://docs.datadoghq.com/synthetics/browser_tests/actions#test-your-ui-with-custom-javascript) at the beginning of your browser test to regularly try to close the pop-up:

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

- Record steps to close the pop-up, add them between all your other browser test steps, and select the [**Allow this step to fail** option](https://docs.datadoghq.com/synthetics/browser_tests/advanced_options/#optional-step) for each of them.

## Further Reading{% #further-reading %}

- [User experience monitoring with Datadog Browser Tests](https://www.datadoghq.com/blog/browser-tests/)
- [Learn about Synthetic browser tests](https://docs.datadoghq.com/synthetics/browser_tests)
