---
title: Use Email Validation In Browser Tests
description: Verify an email and its content with browser test steps.
further_reading:
- link: "/synthetics/browser_tests/test_steps"
  tag: "Documentation"
  text: "Learn about steps for browser tests"
- link: "/synthetics/browser_tests/advanced_options/"
  tag: "Documentation"
  text: "Configure advanced options for steps"
site_support_id: synthetics_email_validation
---

## Overview

Web application journeys often involve emails being triggered and sent to users' mailboxes, such as an email verification after account creation, an email sent to reset forgotten passwords, an email sent to notify order confirmation, or an email confirmation after contact form submission.

Maintaining a great user experience on your website includes ensuring that your application's email mechanisms are working properly. 

## Create an email variable

Choose the email address type for your workflow:

- **Temporary** creates a unique mailbox for each test execution. Use it for sign-up flows that register a different account each run.
- **Persistent** reuses the same Datadog-managed address across executions. Create an account once and reuse it for login, password reset, and other emails sent to an existing user. Follow [Use persistent email addresses in browser tests][1] to create the email global variable and register the account.

To add a temporary email variable called `EMAIL`:

1. Under {{< ui >}}Variables{{< /ui >}}, add a variable and select {{< ui >}}Email Address{{< /ui >}}.
2. Select {{< ui >}}Temporary{{< /ui >}} if the address type selector is available, enter `EMAIL`, and add the variable.

To reuse a persistent address, select {{< ui >}}Persistent{{< /ui >}}, choose the email global variable, and click {{< ui >}}Done{{< /ui >}}. A test can use one email address variable.

{{< img src="synthetics/guide/email-validation/adding-variable-email.mp4" alt="Create an email variable" video="true" width="100%">}}

The following sign-up example uses a temporary address. The same email assertion and navigation steps also work with a persistent address. Persistent addresses share a mailbox across runs, so [plan for concurrent executions][2] when reusing an account.

## Record steps

After you have added an email variable, you can [confirm the email was sent correctly](#confirm-the-email-was-sent) after an in-app trigger. Trigger a new email during each run, including when using a persistent address.

Click {{< ui >}}Start Recording{{< /ui >}} and record all of the steps leading up to the email being triggered with your email variable. Click the hand icon in a variable to inject its value into the text input of a form or field.

{{< img src="synthetics/guide/email-validation/record_steps_2.mp4" alt="Record your steps" video="true" width="100%">}}

After recording your steps to complete the form, click the {{< ui >}}Sign Up{{< /ui >}} button to trigger an email notification. An email tailored to this recording session is sent to the Datadog mailbox, for example, `838-n3q-q2y.6238933596@synthetics.dtdg.co`.

### Confirm the email was sent

To confirm that the email was sent, click {{< ui >}}Assertion{{< /ui >}} and select {{< ui >}}Test that an email was received{{< /ui >}}. To ensure your email follows specific guidelines for content, you can add additional verifications on the subject and body.

{{< img src="synthetics/guide/email-validation/assertion-step_2.mp4" alt="Add an assertion" video="true" width="100%">}}

In this example, the assertion is successful if the email subject contains `Welcome to Shopist!`, the body contains the sentence `Your verification code is...`, and the verification code matches the `\d{1,6}` regex pattern.

### Navigate through links in an email

To have your browser test navigate through links inside sent emails:

1. Click {{< ui >}}Navigation{{< /ui >}} and select {{< ui >}}Go to email and click link{{< /ui >}}. Click {{< ui >}}Next{{< /ui >}}.
2. The email containing the links you want to test appears in the inbox. Click {{< ui >}}Next{{< /ui >}}.  
3. Select the link you want your browser test to navigate to. The iframe's or pop-up's URL immediately updates to the specified link. Click {{< ui >}}Save Navigation Step{{< /ui >}}.
4. The iframe redirects to the associated page URL. Continue recording your steps.

In this example, the browser test looks into the `Welcome to Shopist` email, clicks the `Verify your email by clicking here` link, and confirms the user registration mechanism is working as expected. 

{{< img src="synthetics/guide/email-validation/navigation-step.mp4" alt="Add a navigation step" video="true" width="100%">}} 

As the final step to your browser test, create an assertion to confirm that the `div` content triggers the proper account verification. For example, the page contains `Your account is now verified`.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/guide/persistent-email-otp/
[2]: /synthetics/guide/persistent-email-otp/#concurrent-executions
