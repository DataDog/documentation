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

Synthetic Browser Tests are to used monitor your applications by reproducing how your customers experience your webpages end-to-end. When testing a sign-up or login flow, incorporate a one-time passcode (OTP) sent to an email address for authentication into your test. This OTP token can be extracted from an email body for testing within an application.

This guide walks you through how to configure the OTP extraction for a Synthetic Browser Test.

## Setup

### Step 1 - Create an email variable

Follow the steps below to create an email variable for the [Browser Test][3]. This generates a unique [Datadog Synthetic Monitoring email address][7] for the Synthetic test run.

1. On a new or existing Browser Test, under **Variables** click **Add Variable**.
2. Next, select **Email Address** from the dropdown menu.
3. Name the variable and click **Create**.

   {{< img src="synthetics/guide/otp-from-email-body/email_variable.png" alt="Add a unqiue email variable" style="width:80%;" >}}

   This adds the email variable to the **Variables** section in the UI:

   {{< img src="synthetics/guide/otp-from-email-body/email_var_example.png" alt="Example email variable in the UI" style="width:50%;" >}}

### Step 2 - Inject the email address variable

Next, [record steps][11] to insert the email address variable into an input field to imitate how a user would add the email address within your application.

{{< img src="synthetics/guide/otp-from-email-body/email_injection.mp4" alt="Example of recording the email address injection steps" video="true" width="100%">}}

1. Click **Record** at the top of the test. This automatically adds steps to the test based on the detected interactions and inputs.
2. Click the email input field, which creates a **Click** step.
3. Find the email variable created earlier, called `DD_EMAIL_ADDRESS` in this example. On the right, click **Inject variable in a text input** and click the desired text box, which is highlighted in the UI. The email gets inserted.

   {{< img src="synthetics/guide/otp-from-email-body/synthetics-otp-inject-variable.png" alt="Inject the email variable" style="width:60%;" >}}

After the email containing the OTP is sent, the Browser Test can access the email body for use in the rest of the sign-up flow.

### Step 3 - Extract the OTP from the email body

Next, create a test step that extracts the OTP from the email body after it's sent and stores it in a variable. This example uses the variable name OTP_FROM_EMAIL throughout the rest of this guide.

1. Under **Add a variable** select **from Email body**.

{{< img src="synthetics/guide/otp-from-email-body/otp_from_email.png" alt="OTP variable as used in the email body step" style="width:50%;" >}}

2. Under **Parsing Regex** add in the regex pattern that corresponds to the OTP.

The following are example regex patterns to parse the OTP token from the email body:

| **Type**                           | **Example**                                  | **Regex Rule**                           |
|:-----------------------------------|:---------------------------------------------|:-----------------------------------------|
| 4 Digit OTP                        | 1234                                         | `/[0-9]{4,4}/`                           |
| 6 Digit OTP                        | 123456                                       | `/[0-9]{6,6}/`                           |
| 5 Character                        | abcde                                        | `/[a-z]{5,5}/`                           |
| Alphanumerical OTP                 | a1b2cd34                                     | `/[a-zA-Z0-9]{8,8}/`                       |

The OTP will be stored in the variable for use in your Browser Test.

### Step 4 - Use a JavaScript assertion to insert the OTP

JavaScript lets you trigger an event on a DOM element programmatically, making it possible to mimic user interactions or other events. Depending on how your input element is built, dispatching an event may be required to enable custom behaviors or testing event listeners tied to the element. You can use a Javascript assertion to add the saved OTP from the email and insert it into your application.

1. Add a [JavaScript assertion step][5] to input the stored OTP variable, in our example `OTP_FROM_EMAIL`, into the appropriate field in your application. 

   {{< img src="synthetics/guide/otp-from-email-body/js_assertion.png" alt="Javascript assertion" style="width:50%;" >}}

2. Under **Custom JavaScript** add the extraction code. The code format varies depending on whether the OTP is inserted into a simple text field or respective input fields. Below are examples that illustrate both scenarios:

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

Once the OTP is inserted and verified, you can continue adding steps to your Browser Test to verify that the user has completed the sign-up flow of your application such as adding an [assertion][6] that specific text is present on the page.
From here, you can continue [recording the rest of your Browser Test][9] and then verify your [Browser Test results][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/?tab=requestoptions#create-local-variables
[2]: https://app.datadoghq.com/synthetics/settings/variables
[3]: https://app.datadoghq.com/synthetics/browser/create
[4]: /synthetics/settings/?tab=specifyvalue#global-variables
[5]: /synthetics/browser_tests/actions/?tab=testanelementontheactivepage#javascript
[6]: /synthetics/browser_tests/actions/?tab=testanelementontheactivepage#assertion
[7]: /synthetics/browser_tests/actions/?tab=testanelementontheactivepage#email
[8]: /synthetics/guide/email-validation/#create-an-email-variable
[9]: /synthetics/browser_tests/actions?tab=testanelementontheactivepage
[10]: /synthetics/browser_tests/test_results
[11]: /synthetics/browser_tests/actions?tab=testanelementontheactivepage#automatically-recorded-steps
