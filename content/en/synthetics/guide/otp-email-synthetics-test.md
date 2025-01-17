---
title: Extract a One-Time-Passcode from an Email Body using Synthetic Browser Tests
description: Learn how to extract OTP an Email Body using Synthetic Browser Tests.
further_reading:
- link: "/synthetics/browser_tests"
  tag: "Documentation"
  text: "Learn about Browser tests"
- link: "/synthetics/api_tests/http_tests#variables"
  tag: "Documentation"
  text: "Learn about Synthetic test variables"
- link: 'https://www.datadoghq.com/blog/test-creation-best-practices/'
  tag: 'Blog'
  text: 'Best practices for creating end-to-end tests'
- link: "/synthetics/troubleshooting/?tab=common"
  tag: "Documentation"
  text: "Synthetic Monitoring Troubleshooting"
---

<div class="alert alert-info">Extracting one-time passcodes from an email body is only supported for synthetic browser tests.</div>

## Overview

 Synthetic browser tests are used monitor your applications such as how your customers experience your webpages end-to-end. When testing a sign up or login flow, a one-time-passcode (OTP) can be sent to an email address for authentication which you need to incorpate into your test. This OTP token can be extracted from an email body for testing within an application.

This guide walks you through how to configure the OTP extraction for a synthetic browser test.

## Setup

### Create an email variable

First you will need to create a email variable for the [browser test][3] to pull from. This can be either a unique generated email or a static one you define.

#### Dynamic Email

For the dynamic email creation under **Add Variable** click **Create a Local Variable**. Then add an email address variable to generate a unique email address for the synthetic test run.

{{< img src="synthetics/guide/otp-from-email-body/email_variable.png" alt="Add a unqiue email variable" style="width:80%;" >}}

#### Static Email

If you want to use a static email address instead first add it as a [global variable][4].

To create a global variable, navigate to the **Global Variables** tab on the [**Synthetic Monitoring & Continuous Testing** > **Settings** page][7] and click **+ New Global Variable**.

Then in your browser test under **Add Variable** click **Create a Global Variable** and then search for the email variable.
{{< img src="synthetics/guide/otp-from-email-body/add_global_var.png" alt="Add the global email variable to the test" style="width:80%;" >}}

### Inject the email address variable

Once the email variable is created you can add a step to imitate how a user would input the email address within your application. The email address variable can be injected into an input field to imitate this step.

{{< img src="synthetics/guide/otp-from-email-body/email_address_variable.png" alt="Inject the email variable" style="width:60%;" >}}

The synthetic test can now access the email body to be used in the rest of the sign-up flow.

### Extract the OTP from the email body

Under `Add a variable`, select `from Email body`. In this example, the variable is named `OTP_FROM_EMAIL` for later reference within the test. You can then define a test step to extract the relevant information from the email body once it has been sent. 

{{< img src="synthetics/guide/otp-from-email-body/otp_from_email.png" alt="OTP variable as used in the email body step" style="width:50%;" >}}

Here are some examples of regex that can be used to parse the OTP code from the email body:

| **Type**                           | **Example**                                  | **Regex Rule**                           |
|:-----------------------------------|:---------------------------------------------|:-----------------------------------------|
| 4 Digit OTP                        | 1234                                         | `/[0-9]{6,6}/`                           |
| 6 Digit OTP                        | 123456                                       | `/[0-9]{6,6}/`                           |
| 5 Character                        | abcde                                        | `/[0-9]{6,6}/`                           |
| Alphanumerical OTP                 | a1b2cd34                                     | `/[0-9,a-z]{8,8}/`                       |

### Use a JavaScript assertion to insert the OTP

Once you have extracted the OTP and stored it in a variable, you can use a [JavaScript assertion][5] to input the OTP into the appropriate field in your application.

{{< img src="synthetics/guide/otp-from-email-body/js_assertion.png" alt="Javascript assertion" style="width:50%;" >}}

JavaScript lets you trigger an event on a DOM element programmatically, making it possible to mimic user interactions or other events. Depending on how your input element is built, dispatching an event may be required to enable custom behaviors or testing event listeners tied to the element.

For example, the extracted variable can be inserted into a simple text field as follows:
{{< code-block lang="java" disable_copy="false" >}}
function (vars, element) {
  element.setAttribute('value', vars.OTP_FROM_EMAIL);
  element.dispatchEvent(new Event("input", { bubbles: true }));
  return true;
}
{{< /code-block >}}

**Note**: For both of the Javascript examples you need to replace the "OTP_FROM_EMAIL" field with the name of the email variable you defined if named differently in the earlier steps.

A more complex example might be that each digit of the OTP has its own respective input field. The OTP can be inserted as follows:
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

Below is a visual example of an OTP setup with seperately defined fields that the above query can be used for:

{{< img src="synthetics/guide/otp-from-email-body/bubble_otp.png" alt="example of an otp with individual numerical fields" style="width:40%;" caption="Example of an OTP with respective input fields" >}}

### Continue testing the rest of your application flow

Once the OTP is inserted and verified, you can continue recording the appropriate steps to assert that the user has completed the sign-up flow of your application. An example would be adding an [assertion][6] that specific text is present on the page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[2]: /synthetics/api_tests/http_tests/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /synthetics/settings/?tab=specifyvalue#global-variables
[5]: /synthetics/browser_tests/actions/?tab=testanelementontheactivepage#javascript
[6]: synthetics/browser_tests/actions/?tab=testanelementontheactivepage#assertion
[7]: https://app.datadoghq.com/synthetics/settings/variables
