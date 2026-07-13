---
title: Use Time-based One-time Passwords (TOTPs) For Multi-Factor Authentication (MFA) In Browser Tests

further_reading:
  - link: 'https://www.datadoghq.com/blog/mfa-synthetic-testing-datadog/'
    tag: 'Blog'
    text: 'Introducing multi-factor authentication in Datadog Synthetic tests'
  - link: '/synthetics/guide/browser-tests-passkeys'
    tag: 'Documentation'
    text: 'Learn about Passkeys in browser tests'
  - link: 'synthetics/settings/?tab=specifyvalue#global-variables'
    tag: 'Documentation'
    text: 'Learn more about global variables'
  - link: "https://www.datadoghq.com/blog/ambassador-browser-tests/"
    tag: "Blog"
    text: "How I helped my client scale their browser tests with Datadog"
 
---

## Overview

Multi-factor authentication methods such as TFA and MFA help protect your applications against unauthorized access, however, these methods can make testing features more difficult.

Datadog Synthetic MFA global variables allow you to test your application's TOTP-based MFA modules and critical user journeys without disabling critical security measures or manually entering authentication codes with disparate tools. You do not need to create or maintain dedicated environments to test MFA-enabled user journeys.

**Note**: If your TOTP token works in Google Authenticator, it is likely compatible with Datadog.
Some QR codes are limited to specific verification methods and may not work across platforms. To ensure compatibility, use a QR code or secret that follows standard TOTP protocols.


## Store your secret key or QR code in a global variable

Create a global variable where you enter a secret key or upload a QR code from your authentication provider. In the {{< ui >}}Global Variables{{< /ui >}} tab of your {{< ui >}}Settings{{< /ui >}} page, click {{< ui >}}Create Global Variable{{< /ui >}}.
1. In {{< ui >}}Choose variable type{{< /ui >}}, select {{< ui >}}MFA Token{{< /ui >}}.
2. In {{< ui >}}Define variable{{< /ui >}}, enter a {{< ui >}}Variable Name{{< /ui >}}. Your variable name can only use uppercase letters, numbers, and underscores.
3. Enter a {{< ui >}}Description{{< /ui >}} for your variable (optional).
4. Select {{< ui >}}Tags{{< /ui >}} to associate with your variable (optional).
5. Follow your authenticator app's documentation for instructions on creating a secret key or adding a new QR code.
6. Enter the {{< ui >}}Secret Key{{< /ui >}} to your variable or upload a QR code image.
7. Click {{< ui >}}+ Generate{{< /ui >}} to create a TOTP. You can copy the generated TOTP with the {{< ui >}}Copy{{< /ui >}} icon.
8. In {{< ui >}}Permissions settings{{< /ui >}}, restrict access to your variable based on roles in your org. For more information about roles, see the [RBAC documentation][1].

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="Create a MFA token" style="width:100%;" >}}

## Use TOTP in your Synthetic tests
You can use the secret key or QR code stored in a global variable across all your Synthetic tests. When creating a [browser test][2], inject the TOTP generated from the secret key or QR code stored in the global variable to verify your application's authentication workflow.

{{< img src="synthetics/guide/browser-tests-totp/mfa-token-totp.mp4" alt="Recording a TOTP validation" video="true" >}}

To use TOTP in your [browser tests][2]:

1. Import your global variable.
2. When recording your test, click the {{< ui >}}Hand{{< /ui >}} icon to generate a TOTP. 
3. In your test browser application, click in a field to paste the TOTP. Injecting the computed code into your test creates another test step. 
4. After recording your test steps, click {{< ui >}}Save & Launch Test{{< /ui >}}.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/?tab=datadogapplication#custom-roles
[2]: /synthetics/browser_tests/
