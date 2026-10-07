---
title: Extract a One-Time Passcode from an Email Body using Synthetic Browser Tests
description: Learn how to extract a OTP from an email body using Synthetic Browser Tests.
further_reading:
- link: "/synthetics/browser_tests/?tab=requestoptions#overview"
  tag: "Documentation"
  text: "Learn about Synthetic Browser Tests"
- link: "/synthetics/api_tests/http_tests#variables"
  tag: "Documentation"
  text: "Learn about Synthetic test variables"
- link: "/synthetics/guide/email-validation"
  tag: "Documentation"
  text: "Learn about email validation in Browser Tests"
- link: "/synthetics/troubleshooting/?tab=common"
  tag: "Documentation"
  text: "Synthetic Monitoring Troubleshooting"
- link: 'https://www.datadoghq.com/blog/test-creation-best-practices/'
  tag: 'Blog'
  text: 'Best practices for creating end-to-end tests'
products:
- name: Browser Tests
  url: /synthetics/browser_tests/
  icon: browser
---

{{< product-availability names="Browser Tests" >}}

## Overview

Synthetic Browser Tests monitor your applications by reproducing how your customers experience your webpages end-to-end. For sign-up or login flows, extract a one-time passcode (OTP) from an email body and use it to authenticate in your application.

For sign-up flows, use a temporary email address generated for each run. For login with an existing user, use a [persistent email global variable][12]. Create the application account once and reuse its address across runs. Each run still requests and extracts a new OTP.

This guide walks you through how to configure the OTP extraction for a Synthetic Browser Test.

## Setup

### Step 1 - Create an email variable

Add an email variable to the [browser test][3]. Choose its type based on whether the test creates an account or logs in to an existing account:

1. On a new or existing Browser Test, under {{< ui >}}Variables{{< /ui >}} click {{< ui >}}Add Variable{{< /ui >}}.
2. Select {{< ui >}}Email Address{{< /ui >}} from the dropdown menu.
3. Choose the email type for your workflow:
   - For a sign-up test, select {{< ui >}}Temporary{{< /ui >}} if the address type selector is available. Name the variable and click {{< ui >}}Create{{< /ui >}}.
   - For a login test, [create a persistent email global variable and register its application account][12]. Select {{< ui >}}Persistent{{< /ui >}}, choose that variable, and click {{< ui >}}Done{{< /ui >}}.

   The following images show a temporary email variable:

   {{< img src="synthetics/guide/otp-from-email-body/email_variable.png" alt="Add a temporary email variable" style="width:80%;" >}}

   This adds the email variable to the {{< ui >}}Variables{{< /ui >}} section in the UI:

   {{< img src="synthetics/guide/otp-from-email-body/email_var_example.png" alt="Example email variable in the UI" style="width:50%;" >}}

### Step 2 - Inject the email address variable

Next, [record steps][11] to insert the email address variable into an input field to imitate how a user would add the email address within your application.

{{< img src="synthetics/guide/otp-from-email-body/email_injection.mp4" alt="Example of recording the email address injection steps" video="true" width="100%">}}

1. Click {{< ui >}}Record{{< /ui >}} at the top of the test. This automatically adds steps to the test based on the detected interactions and inputs.
2. Click the email input field, which creates a {{< ui >}}Click{{< /ui >}} step.
3. Find the email variable created earlier, called `DD_EMAIL_ADDRESS` in this example. On the right, click {{< ui >}}Inject variable in a text input{{< /ui >}} and click the desired text box, which is highlighted in the UI. The email gets inserted.

   {{< img src="synthetics/guide/otp-from-email-body/synthetics-otp-inject-variable.png" alt="Inject the email variable" style="width:60%;" >}}

Record the action that requests the OTP. For a persistent address, start from the existing account's login flow and request a fresh code during every execution. After the email is sent, the browser test can access its body for the remaining authentication steps.

### Step 3 - Extract the OTP from the email body

Next, create a test step that extracts the OTP from the email body after it's sent and stores it in a variable. This example uses the variable name OTP_FROM_EMAIL throughout the rest of this guide.

1. Under {{< ui >}}Add a variable{{< /ui >}} select {{< ui >}}from Email body{{< /ui >}}.

{{< img src="synthetics/guide/otp-from-email-body/otp_from_email.png" alt="OTP variable as used in the email body step" style="width:50%;" >}}

2. Under {{< ui >}}Parsing Regex{{< /ui >}} add in the regex pattern that corresponds to the OTP.

The following are example regex patterns to parse the OTP token from the email body:

| **Type**                           | **Example**                                  | **Regex Rule**                           |
|:-----------------------------------|:---------------------------------------------|:-----------------------------------------|
| 4 Digit OTP                        | 1234                                         | `/[0-9]{4,4}/`                           |
| 6 Digit OTP                        | 123456                                       | `/[0-9]{6,6}/`                           |
| 5 Character                        | abcde                                        | `/[a-z]{5,5}/`                           |
| Alphanumerical OTP                 | a1b2cd34                                     | `/[a-zA-Z0-9]{8,8}/`                       |

The OTP will be stored in the variable for use in your Browser Test.

Extraction uses the first value that matches the configured pattern and fails if no email yields a match. Tests using the same persistent address share an inbox, so broad patterns like these can extract another parallel test's OTP and cause login failures. Use temporary email addresses or different persistent addresses to isolate tests. See [Persistent email limitations][13].

### Step 4 - Use a JavaScript assertion to insert the OTP

JavaScript lets you trigger an event on a DOM element programmatically, making it possible to mimic user interactions or other events. Depending on how your input element is built, dispatching an event may be required to enable custom behaviors or testing event listeners tied to the element. You can use a Javascript assertion to add the saved OTP from the email and insert it into your application.

1. Add a [JavaScript assertion step][5] to input the stored OTP variable, in our example `OTP_FROM_EMAIL`, into the appropriate field in your application. 

   {{< img src="synthetics/guide/otp-from-email-body/js_assertion.png" alt="Javascript assertion" style="width:50%;" >}}

2. Under {{< ui >}}Custom JavaScript{{< /ui >}} add the extraction code. The code format varies depending on whether the OTP is inserted into a simple text field or respective input fields. Below are examples that illustrate both scenarios:

#### Simple text field
To insert the OTP into a simple text field, use the following:
{{< code-block lang="java" disable_copy="false" >}}
function (vars, element) {
  element.setAttribute('value', vars.OTP_FROM_EMAIL);
  element.dispatchEvent(new Event("input", { bubbles: true }));
  return true;
}
{{< /code-block >}}

Below is a visual example of an OTP setup with a simple text field that the above query can be used for:

{{< img src="synthetics/guide/otp-from-email-body/simple_otp.png" alt="example of an otp with a simple text field" style="width:40%;" caption="Example of an OTP with with a simple text field" >}}

**Note**: For both of the Javascript examples, you need to replace the `OTP_FROM_EMAIL` field with the name of the email variable you defined if named differently in your browser test.

#### Respective input fields
To insert the OTP into separately defined fields, use the following:
{{< code-block lang="java" disable_copy="false" >}}
function (vars) {
  const inputList = document.querySelectorAll('input');
  inputList.forEach((element) => {
      element.setAttribute('value', vars.OTP_FROM_EMAIL);
      element.dispatchEvent(new Event("input", { bubbles: true }));
  });
  return true;
}
{{< /code-block >}}

Below is a visual example of an OTP setup with separately defined fields that the above query can be used for:

{{< img src="synthetics/guide/otp-from-email-body/bubble_otp.png" alt="Example of an OTP with individual numerical fields" style="width:40%;" caption="Example of an OTP with respective input fields" >}}

## Next steps

After the OTP is inserted and verified, add steps to confirm that the user completed sign-up or login. For example, [assert][6] that specific text is present on the page. With a persistent address, retain the application account for later runs and continue testing the journeys available after login.
From here, you can continue [recording the rest of your Browser Test][9] and then verify your [Browser Test results][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/?tab=requestoptions#create-local-variables
[2]: https://app.datadoghq.com/synthetics/settings/variables
[3]: https://app.datadoghq.com/synthetics/browser/create
[4]: /synthetics/settings/?tab=specifyvalue#global-variables
[5]: /synthetics/browser_tests/test_steps/?tab=testanelementontheactivepage#javascript
[6]: /synthetics/browser_tests/test_steps/?tab=testanelementontheactivepage#assertion
[7]: /synthetics/browser_tests/test_steps/?tab=testanelementontheactivepage#email
[8]: /synthetics/guide/email-validation/#create-an-email-variable
[9]: /synthetics/browser_tests/test_steps?tab=testanelementontheactivepage
[10]: /synthetics/browser_tests/test_results
[11]: /synthetics/browser_tests/test_steps?tab=testanelementontheactivepage#automatically-recorded-steps
[12]: /synthetics/guide/persistent-email-otp/
[13]: /synthetics/guide/persistent-email-otp/#limitations
