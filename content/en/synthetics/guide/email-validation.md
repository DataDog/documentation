---
title: Email Validation with Browser Tests
kind: documentation
description: Verify an email and its content with browser test steps
further_reading:
- link: "/synthetics/browser_tests/actions"
  tag: "Documentation"
  text: "Learn about steps for browser tests"
- link: "/synthetics/browser_tests/advanced_options/"
  tag: "Documentation"
  text: "Configure advanced options for steps"
---

## Overview

Classic web application journeys often involve emails being triggered and sent to a users’ mailbox, such as email verification after account creation, email sent to reset forgotten passwords, order confirmations, or mail confirmation after contact form submission.

Making sure your application’s email mechanisms are working as expected is key to ensuring a great user experience on your website.

Datadog [Browser Tests][1] allow you to:

- Confirm an email was correctly sent following up on an in-app trigger
- Check an email's content
- Click on the links located within the sent emails in order to navigate to other URLs and validate your whole flows, including web and email steps

To perform email validation inside a Datadog Browser test:

## Create an email variable

After filling your Browser test details (start URL, devices, locations, frequency, notification), navigate to **Save Details & Record Test**, select **Variables** and then select **Email** from the email variable dropdown list:

{{< img src="synthetics/guide/email-validation/adding-variable.mp4" alt="Create an email variable" video="true"  width="100%">}}

In the above example, an email variable called `EMAIL` is created. The newly created email variable generates a unique mailbox maintained by Datadog at every test execution. This is key to avoid any conflicts among your Browser test runs.

## Record steps

In the upper left corner of the UI, click the **Start Recording** button and record the steps leading to the email being triggered using your freshly created email variable. Use the hand icon to input variables in the text inputs of the form.

{{< img src="synthetics/guide/email-validation/record-steps.mp4" alt="Record your steps" video="true"  width="100%">}}

The steps to fill the form are recorded and the click on the `Sign up` button triggers the email. An email is sent to the Datadog mailbox that was created for this recording session as a result (for example, `838-n3q-q2y.6238933596@synthetics.dtdg.co` in this example).

## Confirm the email was sent

You can now confirm that an email was sent. Click the **Assertion** button and select the `Test that an email was received` assertion.

{{< img src="synthetics/guide/email-validation/assertion-step.mp4" alt="Add an assertion" video="true"  width="100%">}}

If you want to make sure your email respects specific guidelines for its content, you can add more verifications against its subject and body.

In the above example, the assertion is set to be successful if the email subject is `Welcome to Shopist!` and if its body contains the sentence `Your verification code is` and a verification code matches the `\d{1,6}` regex pattern.

## Navigate links in email

You can now go even further and have your browser test navigate to links contained inside the newly sent emails.

To do this, create a **Navigation** step, choose `Go to email and click link`, pick the email containing the links you want to test. Choose the link you want your browser test to navigate to. The iframe’s or pop up’s URL is immediately set to the chosen link and you can keep on recording your steps normally.

{{< img src="synthetics/guide/email-validation/navigation-step.mp4" alt="Add a navigation step" video="true"  width="100%">}}

In the above example, the browser test looks into the “Welcome to Shopist” email to click a verification link in order to confirm the user registration mechanism is working as expected. The “Welcome to Shopist” email is selected and the “Verify your email by clicking here” link is chosen. As soon as the step is saved, the iframe is redirected to the associated page.

You can now go ahead and create a final assertion to test the `div` content to make sure this triggered a proper account verification (page contains `Your account is now verified.`).


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests
