---
title: Use Email Validation In Browser Tests
description: Verify an email and its content with browser test steps.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides > Use
  Email Validation In Browser Tests
sourceUrl: https://docs.datadoghq.com/synthetics/guide/email-validation/index.html
---

# Use Email Validation In Browser Tests

{% callout %}
# Important note for users on the following Datadog sites: app.ddog-gov.com

{% alert level="warning" %}
This product is not supported for your selected [Datadog site](https://docs.datadoghq.com/getting_started/site). ().
{% /alert %}

{% /callout %}

## Overview{% #overview %}

Web application journeys often involve emails being triggered and sent to users' mailboxes, such as an email verification after account creation, an email sent to reset forgotten passwords, an email sent to notify order confirmation, or an email confirmation after contact form submission.

Maintaining a great user experience on your website includes ensuring that your application's email mechanisms are working properly.

## Create an email variable{% #create-an-email-variable %}

To add an email variable called `EMAIL`:

1. Click **Variables** and select **Email** from the dropdown menu.
1. Click **Add Variable** to make the variable available for you to use when you start recording.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/guide/email-validation/adding-variable-email.mp4" /%}

The email variable generates a unique mailbox maintained by Datadog at every test execution, which enables your browser tests to run without conflicts.

## Record steps{% #record-steps %}

Once you have created an email variable, you can confirm the email was sent correctly after an in-app trigger.

Click **Start Recording** and record all of the steps leading up to the email being triggered with your email variable. Click the hand icon in a variable to inject its value into the text input of a form or field.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/guide/email-validation/record_steps_2.mp4" /%}

After recording your steps to complete the form, click the **Sign Up** button to trigger an email notification. An email tailored to this recording session is sent to the Datadog mailbox, for example, `838-n3q-q2y.6238933596@synthetics.dtdg.co`.

### Confirm the email was sent{% #confirm-the-email-was-sent %}

To confirm that the email was sent, click **Assertion** and select **Test that an email was received**. To ensure your email follows specific guidelines for content, you can add additional verifications on the subject and body.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/guide/email-validation/assertion-step_2.mp4" /%}

In this example, the assertion is successful if the email subject contains `Welcome to Shopist!`, the body contains the sentence `Your verification code is...`, and the verification code matches the `\d{1,6}` regex pattern.

### Navigate through links in an email{% #navigate-through-links-in-an-email %}

To have your browser test navigate through links inside sent emails:

1. Click **Navigation** and select **Go to email and click link**. Click **Next**.
1. The email containing the links you want to test appears in the inbox. Click **Next**.
1. Select the link you want your browser test to navigate to. The iframe's or pop-up's URL immediately updates to the specified link. Click **Save Navigation Step**.
1. The iframe redirects to the associated page URL. Continue recording your steps.

In this example, the browser test looks into the `Welcome to Shopist` email, clicks the `Verify your email by clicking here` link, and confirms the user registration mechanism is working as expected.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/guide/email-validation/navigation-step.mp4" /%}

As the final step to your browser test, create an assertion to confirm that the `div` content triggers the proper account verification. For example, the page contains `Your account is now verified`.

## Further reading{% #further-reading %}

- [Learn about steps for browser tests](https://docs.datadoghq.com/synthetics/browser_tests/actions)
- [Configure advanced options for steps](https://docs.datadoghq.com/synthetics/browser_tests/advanced_options/)
