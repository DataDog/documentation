---
title: Use Passkeys (FIDO2) In Browser Tests
kind: guide
description: Learn how to ensure your Synthetic browser tests can log in to your applications. 
further_reading:
  - link: '/synthetics/guide/app-that-requires-login/'
    tag: 'Documentation'
    text: 'Learn more about authentication in browser test'
  - link: '/synthetics/guide/browser-tests-totp'
    tag: 'Documentation'
    text: 'TOTPs for Multi-Factor Authentication (MFA) in browser tests'
  - link: 'synthetics/settings/?tab=specifyvalue#global-variables'
    tag: 'Documentation'
    text: 'Learn more about global variables'
---

## Overview

Passkeys (FIDO2) offer stronger security than the standard username and password tuple, and rely on cryptographic login credentials that are unique across every website. Passkeys never leave your user's devices and are never stored on a web application server. This security model eliminates the risks of phishing, all forms of password theft, and replay attacks.

You can use passkeys as a replacement for a username and password, or as a second factor authentication. By generating, storing, and leveraging passkeys, Synthetic Monitoring can help you test your critical passkey-protected user journeys without disabling this important security measure.

## Create your Virtual Authenticator global variable

Passkeys in Synthetic Monitoring are handled by Virtual Authenticator global variables. To create a Virtual Authenticator global variable storing your passkeys, see the [**Global Variables** section in Synthetic Monitoring & Continuous Testing Settings][4].

{{< img src="synthetics/guide/browser-tests-passkeys/new-variable-virtual-authenticator.png" alt="Create a Virtual Authenticator global variable" style="width:70%;" >}}

## Use passkeys in your Synthetic browser tests
<div class="alert alert-warning">Synthetic Monitoring supports passkeys in browser tests for Chrome and Edge.</div>

### Add passkeys to a browser test

1. Click [Digital Experience > New Test > Browser Test][3].
2. Click **Save & Edit Recording**.
3. On the recording page, click **Add Variable** > **Create variable from Global Variable**.
4. Supply the passkeys stored in your virtual authenticator global variable that you created in the [previous step](#create-your-virtual-authenticator-global-variable).

{{< img src="synthetics/guide/browser-tests-passkeys/synthetics_add_variable.png" alt="Adding your Virtual Authenticator global variable to your browser test" style="width:70%;" >}}

### Test a registration flow

To test a registration flow using passkeys in your [browser tests][3]:

1. [Import your Virtual Authenticator global variable][5] into your test. 
2. Navigate to the page to register your passkey. When recording your test, Datadog automatically generates and stores a new passkey by using the imported virtual authenticator global variable.
3. After recording your test steps, click **Save & Launch Test**.

### Test a login flow

To test a login flow using a passkey in your [browser tests][3], you need to first register your Datadog passkey on the web application (see section above). This is required once per passkey and application.

You can either:

- Complete the registration flow from within the recorder, but without recording the registration steps, or
- Create a test that embeds both steps for the registration and login flows.

1. [Import your virtual authenticator global variable][5]. 
2. Navigate to the page to login with your passkey. When recording your test, Datadog automatically logs in using the passkey previously registered on the web application with the selected virtual authenticator.
3. After recording your test steps, click **Save & Launch Test**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings/variables
[2]: /account_management/rbac/?tab=datadogapplication#custom-roles
[3]: /synthetics/browser_tests/
[4]: /synthetics/settings/?tab=virtualauthenticator
[5]: /synthetics/browser_tests#use-global-variables
