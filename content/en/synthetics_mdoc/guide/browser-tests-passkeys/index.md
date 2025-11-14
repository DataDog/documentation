---
title: Use Passkeys (FIDO2) In Browser Tests
description: >-
  Learn how to ensure your Synthetic browser tests can log in to your
  applications.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides > Use
  Passkeys (FIDO2) In Browser Tests
sourceUrl: https://docs.datadoghq.com/synthetics/guide/browser-tests-passkeys/index.html
---

# Use Passkeys (FIDO2) In Browser Tests

## Overview{% #overview %}

Passkeys (FIDO2) offer stronger security than the standard username and password tuple, and rely on cryptographic login credentials that are unique across every website. Passkeys never leave your user's devices and are never stored on a web application server. This security model eliminates the risks of phishing, all forms of password theft, and replay attacks.

You can use passkeys as a replacement for a username and password, or as a second factor authentication. By generating, storing, and leveraging passkeys, Synthetic Monitoring can help you test your critical passkey-protected user journeys without disabling this important security measure.

## Create your Virtual Authenticator global variable{% #create-your-virtual-authenticator-global-variable %}

Passkeys in Synthetic Monitoring are handled by Virtual Authenticator global variables. To create a Virtual Authenticator global variable storing your passkeys, see the [**Global Variables - Virtual Authenticator** section in Synthetic Monitoring ](https://docs.datadoghq.com/synthetics/platform/settings?tab=virtualauthenticator#global-variables).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/browser-tests-passkeys/new-variable-virtual-authenticator.48204631fd1225ef506c637b3d99606e.png?auto=format"
   alt="Create a Virtual Authenticator global variable" /%}

## Use passkeys in your Synthetic browser tests{% #use-passkeys-in-your-synthetic-browser-tests %}

{% alert level="warning" %}
Synthetic Monitoring supports passkeys in browser tests for Chrome and Edge.
{% /alert %}

### Add passkeys to a browser test{% #add-passkeys-to-a-browser-test %}

1. Click [Digital Experience > New Test > Browser Test](https://docs.datadoghq.com/synthetics/browser_tests/).
1. Click **Save & Edit Recording**.
1. On the recording page, click **Add Variable** > **Create variable from Global Variable**.
1. Supply the passkeys stored in your virtual authenticator global variable that you created in the previous step.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/browser-tests-passkeys/synthetics_add_variable.9d5fcc49eaefba4122b1c9738c3bb77c.png?auto=format"
   alt="Adding your Virtual Authenticator global variable to your browser test" /%}

### Test a registration flow{% #test-a-registration-flow %}

To test a registration flow using passkeys in your [browser tests](https://docs.datadoghq.com/synthetics/browser_tests/):

1. [Import your Virtual Authenticator global variable](https://docs.datadoghq.com/synthetics/browser_tests#use-global-variables) into your test.
1. Navigate to the page to register your passkey. When recording your test, Datadog automatically generates and stores a new passkey by using the imported virtual authenticator global variable.
1. After recording your test steps, click **Save & Launch Test**.

### Test a login flow{% #test-a-login-flow %}

To test a login flow using a passkey in your [browser tests](https://docs.datadoghq.com/synthetics/browser_tests/), you need to first register your Datadog passkey on the web application (see section above). This is required once per passkey and application.

Choose one of the following options:

- Create a test that embeds both steps for the registration and login flows
- Complete the registration flow from within the recorder, but without recording the registration steps

**Note**: To avoid creating a new user for each test scenario involving passkey authentication, it's recommended to combine user creation and authentication in the same step.

1. [Import your virtual authenticator global variable](https://docs.datadoghq.com/synthetics/browser_tests#use-global-variables).
1. Navigate to the page to login with your passkey. When recording your test, Datadog automatically logs in using the passkey previously registered on the web application with the selected virtual authenticator.
1. After recording your test steps, click **Save & Launch Test**.

## Further Reading{% #further-reading %}

- [Learn more about authentication in browser test](https://docs.datadoghq.com/synthetics/guide/app-that-requires-login/)
- [TOTPs for Multi-Factor Authentication (MFA) in browser tests](https://docs.datadoghq.com/synthetics/guide/browser-tests-totp)
- [Learn more about global variables](https://docs.datadoghq.com/synthetics/settings/?tab=specifyvalue#global-variables)
