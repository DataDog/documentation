---
title: >-
  Use Time-based One-time Passwords (TOTPs) For Multi-Factor Authentication
  (MFA) In Browser Tests
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides > Use
  Time-based One-time Passwords (TOTPs) For Multi-Factor Authentication (MFA) In
  Browser Tests
sourceUrl: https://docs.datadoghq.com/synthetics/guide/browser-tests-totp/index.html
---

# Use Time-based One-time Passwords (TOTPs) For Multi-Factor Authentication (MFA) In Browser Tests

## Overview{% #overview %}

Multi-factor authentication methods such as TFA and MFA help protect your applications against unauthorized access, however, these methods can make testing features more difficult.

Datadog Synthetic MFA global variables allow you to test your application's TOTP-based MFA modules and critical user journeys without disabling critical security measures or manually entering authentication codes with disparate tools. You do not need to create or maintain dedicated environments to test MFA-enabled user journeys.

**Note**: If your TOTP token works in Google Authenticator, it is likely compatible with Datadog. Some QR codes are limited to specific verification methods and may not work across platforms. To ensure compatibility, use a QR code or secret that follows standard TOTP protocols.

## Store your secret key or QR code in a global variable{% #store-your-secret-key-or-qr-code-in-a-global-variable %}

Create a global variable where you enter a secret key or upload a QR code from your authentication provider. In the **Global Variables** tab of your **Settings** page, click **Create Global Variable**.

1. In **Choose variable type**, select **MFA Token**.
1. In **Define variable**, enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores.
1. Enter a **Description** for your variable (optional).
1. Select **Tags** to associate with your variable (optional).
1. Follow your authenticator app's documentation for instructions on creating a secret key or adding a new QR code.
1. Enter the **Secret Key** to your variable or upload a QR code image.
1. Click **+ Generate** to create a TOTP. You can copy the generated TOTP with the **Copy** icon.
1. In **Permissions settings**, restrict access to your variable based on roles in your org. For more information about roles, see the [RBAC documentation](https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication#custom-roles).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/browser-tests-totp/new-variable-totp.63e60c1eea0c4df60db294d5aafa880c.png?auto=format"
   alt="Create a MFA token" /%}

## Use TOTP in your Synthetic tests{% #use-totp-in-your-synthetic-tests %}

You can use the secret key or QR code stored in a global variable across all your Synthetic tests. When creating a [browser test](https://docs.datadoghq.com/synthetics/browser_tests/), inject the TOTP generated from the secret key or QR code stored in the global variable to verify your application's authentication workflow.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/guide/browser-tests-totp/mfa-token-totp.mp4" /%}

To use TOTP in your [browser tests](https://docs.datadoghq.com/synthetics/browser_tests/):

1. Import your global variable.
1. When recording your test, click the **Hand** icon to generate a TOTP.
1. In your test browser application, click in a field to paste the TOTP. Injecting the computed code into your test creates another test step.
1. After recording your test steps, click **Save & Launch Test**.

## Further Reading{% #further-reading %}

- [Introducing multi-factor authentication in Datadog Synthetic tests](https://www.datadoghq.com/blog/mfa-synthetic-testing-datadog/)
- [Learn about Passkeys in browser tests](https://docs.datadoghq.com/synthetics/guide/browser-tests-passkeys)
- [Learn more about global variables](https://docs.datadoghq.com/synthetics/settings/?tab=specifyvalue#global-variables)
- [How I helped my client scale their browser tests with Datadog](https://www.datadoghq.com/blog/ambassador-browser-tests/)
