---
title: Extract a One-Time Passcode from an Email Body using Synthetic Browser Tests
description: Learn how to extract a OTP from an email body using Synthetic Browser Tests.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides >
  Extract a One-Time Passcode from an Email Body using Synthetic Browser Tests
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/guide/otp-email-synthetics-test/index.html
---

# Extract a One-Time Passcode from an Email Body using Synthetic Browser Tests
Available for:
{% icon name="icon-browser" /%}
 Browser Tests 
## Overview{% #overview %}

Synthetic Browser Tests are to used monitor your applications by reproducing how your customers experience your webpages end-to-end. When testing a sign-up or login flow, incorporate a one-time passcode (OTP) sent to an email address for authentication into your test. This OTP token can be extracted from an email body for testing within an application.

This guide walks you through how to configure the OTP extraction for a Synthetic Browser Test.

## Setup{% #setup %}

### Step 1 - Create an email variable{% #step-1---create-an-email-variable %}

Follow the steps below to create an email variable for the [Browser Test](https://app.datadoghq.com/synthetics/browser/create). This generates a unique [Datadog Synthetic Monitoring email address](https://docs.datadoghq.com/synthetics/browser_tests/actions/?tab=testanelementontheactivepage#email) for the Synthetic test run.

1. On a new or existing Browser Test, under **Variables** click **Add Variable**.

1. Next, select **Email Address** from the dropdown menu.

1. Name the variable and click **Create**.

   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/guide/otp-from-email-body/email_variable.a206a907d39458b0ed6925ae52496009.png?auto=format"
      alt="Add a unqiue email variable" /%}

This adds the email variable to the **Variables** section in the UI:

   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/guide/otp-from-email-body/email_var_example.5cd9d292f6043eed57eee09b7ab00e98.png?auto=format"
      alt="Example email variable in the UI" /%}

### Step 2 - Inject the email address variable{% #step-2---inject-the-email-address-variable %}

Next, [record steps](https://docs.datadoghq.com/synthetics/browser_tests/actions?tab=testanelementontheactivepage#automatically-recorded-steps) to insert the email address variable into an input field to imitate how a user would add the email address within your application.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/guide/otp-from-email-body/email_injection.mp4" /%}

1. Click **Record** at the top of the test. This automatically adds steps to the test based on the detected interactions and inputs.

1. Click the email input field, which creates a **Click** step.

1. Find the email variable created earlier, called `DD_EMAIL_ADDRESS` in this example. On the right, click **Inject variable in a text input** and click the desired text box, which is highlighted in the UI. The email gets inserted.

   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/guide/otp-from-email-body/synthetics-otp-inject-variable.6d229634a3aa710af802fa1c75176947.png?auto=format"
      alt="Inject the email variable" /%}

After the email containing the OTP is sent, the Browser Test can access the email body for use in the rest of the sign-up flow.

### Step 3 - Extract the OTP from the email body{% #step-3---extract-the-otp-from-the-email-body %}

Next, create a test step that extracts the OTP from the email body after it's sent and stores it in a variable. This example uses the variable name OTP_FROM_EMAIL throughout the rest of this guide.

1. Under **Add a variable** select **from Email body**.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/otp-from-email-body/otp_from_email.18b57a0f6ebb3850e4910f5eeca61264.png?auto=format"
   alt="OTP variable as used in the email body step" /%}
Under **Parsing Regex** add in the regex pattern that corresponds to the OTP.
The following are example regex patterns to parse the OTP token from the email body:

| **Type**           | **Example** | **Regex Rule**       |
| ------------------ | ----------- | -------------------- |
| 4 Digit OTP        | 1234        | `/[0-9]{4,4}/`       |
| 6 Digit OTP        | 123456      | `/[0-9]{6,6}/`       |
| 5 Character        | abcde       | `/[a-z]{5,5}/`       |
| Alphanumerical OTP | a1b2cd34    | `/[a-zA-Z0-9]{8,8}/` |

The OTP will be stored in the variable for use in your Browser Test.

### Step 4 - Use a JavaScript assertion to insert the OTP{% #step-4---use-a-javascript-assertion-to-insert-the-otp %}

JavaScript lets you trigger an event on a DOM element programmatically, making it possible to mimic user interactions or other events. Depending on how your input element is built, dispatching an event may be required to enable custom behaviors or testing event listeners tied to the element. You can use a Javascript assertion to add the saved OTP from the email and insert it into your application.

1. Add a [JavaScript assertion step](https://docs.datadoghq.com/synthetics/browser_tests/actions/?tab=testanelementontheactivepage#javascript) to input the stored OTP variable, in our example `OTP_FROM_EMAIL`, into the appropriate field in your application.

   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/guide/otp-from-email-body/js_assertion.cec0eb20db6c43aa92bf8a016ddb4518.png?auto=format"
      alt="Javascript assertion" /%}

1. Under **Custom JavaScript** add the extraction code. The code format varies depending on whether the OTP is inserted into a simple text field or respective input fields. Below are examples that illustrate both scenarios:

#### Simple text field{% #simple-text-field %}

To insert the OTP into a simple text field, use the following:

```java
function (vars, element) {
  element.setAttribute('value', vars.OTP_FROM_EMAIL);
  element.dispatchEvent(new Event("input", { bubbles: true }));
  return true;
}
```



Below is a visual example of an OTP setup with a simple text field that the above query can be used for:

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/otp-from-email-body/simple_otp.a4f3f53bfb9085e2ba958be733b0f438.png?auto=format"
   alt="example of an otp with a simple text field" /%}
Example of an OTP with with a simple text field
**Note**: For both of the Javascript examples, you need to replace the `OTP_FROM_EMAIL` field with the name of the email variable you defined if named differently in your browser test.

#### Respective input fields{% #respective-input-fields %}

To insert the OTP into separately defined fields, use the following:

```java
function (vars) {
  const inputList = document.querySelectorAll('input');
  inputList.forEach((element) => {
      element.setAttribute('value', vars.OTP_FROM_EMAIL);
      element.dispatchEvent(new Event("input", { bubbles: true }));
  });
  return true;
}
```



Below is a visual example of an OTP setup with separately defined fields that the above query can be used for:

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/otp-from-email-body/bubble_otp.e90bcadafc50881c653d3056bdcc260b.png?auto=format"
   alt="Example of an OTP with individual numerical fields" /%}
Example of an OTP with respective input fields
## Next steps{% #next-steps %}

Once the OTP is inserted and verified, you can continue adding steps to your Browser Test to verify that the user has completed the sign-up flow of your application such as adding an [assertion](https://docs.datadoghq.com/synthetics/browser_tests/actions/?tab=testanelementontheactivepage#assertion) that specific text is present on the page. From here, you can continue [recording the rest of your Browser Test](https://docs.datadoghq.com/synthetics/browser_tests/actions?tab=testanelementontheactivepage) and then verify your [Browser Test results](https://docs.datadoghq.com/synthetics/browser_tests/test_results).

## Further Reading{% #further-reading %}

- [Learn about Synthetic Browser Tests](https://docs.datadoghq.com/synthetics/browser_tests/?tab=requestoptions#overview)
- [Learn about Synthetic test variables](https://docs.datadoghq.com/synthetics/api_tests/http_tests#variables)
- [Learn about email validation in Browser Tests](https://docs.datadoghq.com/synthetics/guide/email-validation)
- [Synthetic Monitoring Troubleshooting](https://docs.datadoghq.com/synthetics/troubleshooting/?tab=common)
- [Best practices for creating end-to-end tests](https://www.datadoghq.com/blog/test-creation-best-practices/)
