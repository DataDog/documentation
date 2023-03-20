---
title: Passkeys (FIDO2) In Browser Tests
kind: guide
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

Passkeys (a.k.a FIDO2) offer stronger security than the standard username/password tuple we have been used to for decades. Indeed, FIDO2 keys rely on cryptographic login credentials that are unique across every website, never leave the user's device and are never stored on a server. This security model eliminates the risks of phishing, all forms of password theft and replay attacks.
Also, passkeys can be used as a replacement of username/password or as a second factor authentication.

Datadog Synthetic **FIDO2 Key** global variables allow you to test your application’s FIDO2-based authentication modules and critical user journeys without disabling critical security measures or manually entering authentication credentials with disparate tools. You do not need to create or maintain dedicated environments to test FIDO2-enabled user journeys.

## Generate your secret key in a global variable

Create a global variable storing your FIDO2 key. In the **Global Variables** tab of your **Settings** page, click **Create Global Variable**.
1. In **Choose variable type**, select **FIDO2 Key**.
2. In **Define variable**, enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores.
3. Enter a **Description** for your variable (optional).
4. Select **Tags** to associate with your variable (optional).
5. Datadog generates and store an obfuscated FIDO2 secret key. 
6. In **Permissions settings**, restrict access to your variable based on roles in your org. For more information about roles, see the [RBAC documentation][1].
<div class="alert alert-warning">
RBAC restrict access to global variables is in beta. To request access, contact <a href="https://docs.datadoghq.com/help/">Datadog support</a>.</div>  

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="Create a MFA token" style="width:100%;" >}}

## Use FIDO2 keys in your Synthetic tests
You can use the FIDO2 key stored in a global variable across all your Synthetic tests. When creating a [browser test][2], complete your application's FIDO2 challenges using the FIDO2 key stored in the global variable.

To test a registering flow using FIDO2 keys in your [browser tests][2]:

1. Import your global variable.
2. Navigate to the page to register with FIDO2.
3. When recording your test, Datadog will automatically complete any FIDO2 challenge with the FIDO2 key stored in the imported global variable.
4. After recording your test steps, click **Save & Launch Test**.

To test a login flow using FIDO2 keys in your [browser tests][2]:

0. You will need to have you Datadog FIDO2 key registered first. It needs to be done only once per key.
You can do it by completing the registering form from within the recorder without recording the registering steps, or by having a test that embeds both the recording and the login
1. Import your global variable.
2. Navigate to the page to login with FIDO2.
3. When recording your test, Datadog will automatically complete any FIDO2 challenge with the FIDO2 key stored in the imported global variable.
4. After recording your test steps, click **Save & Launch Test**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/?tab=datadogapplication#custom-roles
[2]: /synthetics/browser_tests/
