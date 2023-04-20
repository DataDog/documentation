---
title: Using Passkeys (FIDO2) In Browser Tests
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

You can use Passkeys as a replacement for a username and password or as a second factor authentication. Synthetic Monitoring can now generate, store and use Passkeys to test your application’s Passkeys-based authentication modules and critical user journeys without disabling this critical security measure.

## Create your Virtual Authenticator global variable

{{< img src="synthetics/guide/browser-tests-passkeys/new-variable-fido2.png" alt="Create a FIDO2 key" style="width:70%;" >}}

Passkeys in Synthetic Monitoring are handled by Virtual Authenticator Global Variables. 
To create a Virtual Authenticator global variable storing your Passkeys, see the [**Global Variables** section in Synthetic Monitoring & Continuous Testing Settings][4].

## Use Passkeys in your Synthetic tests
When [creating a browser test][3], complete your application's Passkeys login/registering using the Passkeys stored in your virtual authenticator global variable.
**Note:** Today Passkeys are only supported in Chrome and Edge Synthetics browser tests

### Test a registration flow

To test a registration flow using Passkeys in your [browser tests][3]:

1. Import your Virtual Authenticator global variable into your test.[Documentation][5] 
2. Navigate to the page to register your Passkey. When recording your test, Datadog automatically completes any Passkey registration challenge by generating a Passkey using the virtual authenticator. The Passkey will then be store on Datadog.
3. After recording your test steps, click **Save & Launch Test**.

### Test a login flow

To test a login flow using a Passkey in your [browser tests][3], you need to have your Datadog Passkey registered on the web application (see section above). This is required once per key and application.

**Note:**
This can be done either by completing the registration form from within the recorder without recording the registration steps, or by creating a test that embeds both the recording and the login.

1. Import your virtual authenticator global variable. [Documentation][5] 
2. Navigate to the page to login with your Passkey. When recording your test, Datadog automatically log in using the Passkey previously registered on the web application with the selected virtual authenticator global variable.
3. After recording your test steps, click **Save & Launch Test**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings/variables
[2]: /account_management/rbac/?tab=datadogapplication#custom-roles
[3]: /synthetics/browser_tests/
[4]: /synthetics/settings/?tab=virtualauthenticator
[5]: /synthetics/browser_tests#use-global-variables