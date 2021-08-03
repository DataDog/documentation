---
title: Time-based one time passwords (TOTPs) for multi-factor authentication (MFA)
kind: guide
further_reading:
   - link: 'https://www.datadoghq.com/blog/mfa-synthetic-testing-datadog/'
     tag: 'Blog'
     text: 'Introducing multi-factor authentication in Datadog Synthetic tests'
   - link: 'synthetics/settings/?tab=specifyvalue#global-variables'
     tag: 'Documentation'
     text: 'Learn more about global variables'
   - link: 'synthetics/browser_tests/actions/'
     tag: 'Documentation'
     text: 'Learn more about browser test steps'
 
---

### Store your secret key or QR code in a global variable

In the Global Variables tab of your Settings page, click Create Global Variable and enter a secret key or upload a QR code from your authentication provider:


1. In *Choose variable type*, select *MFA Token*.
2. In *Define variable*, enter a *Variable Name*. Your variable name can only use uppercase letters, numbers, and underscores.
3. Enter a *Description* for your variable (optional).
4. Select *Tags* to associate with your variable (optional).
5. Enter the *Secret Key* to your variable or upload a QR code image.
6. Click **+ Generate** to create a TOTP. You can copy the generated TOTP with the Copy icon.
7. In *Permissions settings*, restrict access to your variable based on roles in your org. For more information about roles, see the [RBAC documentation][1].

{{< img src="synthetics/guide/browser-tests-totp/synthetic-mfa-setup.png" alt="Create a new MFA token" border="true" popup="true">}}

### Test your workflows with TOTP
When creating a browser or API test, inject the TOTP generated from the secret key stored in the global variable to verify your application’s authentication workflow.

#### TOTP in a browser test recording
When recording your test, click the Hand icon to generate a TOTP.
In your test browser application, click in a field to paste the TOTP. Injecting the computed code into your test creates another test step. 
After recording your test steps, click *Save & Launch Test*.

{{< img src="synthetics/guide/browser-tests-totp/totp_login.mp4" video="true" alt="Demo of recording a TOTP validation">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/?tab=datadogapplication#custom-roles