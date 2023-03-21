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

Passkeys (FIDO2) offer stronger security than the standard username and password tuple, and rely on cryptographic login credentials that are unique across every website. These passkeys never leave your user's devices and are never stored on a web application server. This security model eliminates the risks of phishing, all forms of password theft, and replay attacks.

You can use passkeys as a replacement for a username and password or as a second factor authentication. Synthetic FIDO2 Key global variables allow you to test your application’s FIDO2-based authentication modules and critical user journeys without disabling critical security measures. You do not need to create or maintain dedicated environments to test FIDO2-enabled user journeys.

## Generate your secret key in a global variable

{{< img src="synthetics/guide/browser-tests-fido2/new-variable-fido2.png" alt="Create a FIDO2 key" style="width:80%;" >}}

To create a global variable storing your FIDO2 key, see the [**Global Variables** section in Synthetic Monitoring & Continuous Testing Settings][4].

## Use FIDO2 keys in your Synthetic tests

You can use the FIDO2 key stored in a global variable across all your Synthetic tests. 

When [creating a browser test][3], complete your application's FIDO2 challenges using the FIDO2 key stored in a global variable.
**Note:** Today Passkeys are only supported in Chrome and Edge Synthetics browser tests

### Test a registration flow

To test a registration flow using FIDO2 keys in your [browser tests][3]:

1. Import your global variable.
2. Navigate to the page to register with FIDO2. When recording your test, Datadog automatically completes any FIDO2 challenges with the FIDO2 key stored in the imported global variable.
3. After recording your test steps, click **Save & Launch Test**.

### Test a login flow

To test a login flow using FIDO2 keys in your [browser tests][3], you need to have your Datadog FIDO2 key registered on the web application. This is required once per key and application.

**Note:**
This can be done either by completing the registration form from within the recorder without recording the registration steps, or by creating a test that embeds both the recording and the login.

1. Import your global variable.
2. Navigate to the page to login with FIDO2. When recording your test, Datadog automatically completes any FIDO2 challenges with the FIDO2 key stored in the imported global variable.
3. After recording your test steps, click **Save & Launch Test**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings/variables
[2]: /account_management/rbac/?tab=datadogapplication#custom-roles
[3]: /synthetics/browser_tests/
[4]: /synthetics/settings/?tab=fido2key