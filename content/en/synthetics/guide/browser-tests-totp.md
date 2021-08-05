---
title: TOTPs For Multi-Factor Authentication (MFA) in Browser test
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

The first step is to create a global variable where you enter a secret key or upload a QR code from your authentication provider. In the **Global Variables** tab of your **Settings** page, click **Create Global Variable**.
1. In **Choose variable type**, select **MFA Token**.
2. In **Define variable**, enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores.
3. Enter a **Description** for your variable (optional).
4. Select **Tags** to associate with your variable (optional).
5. Enter the **Secret Key** to your variable or upload a QR code image.
6. Click **+ Generate** to create a TOTP. You can copy the generated TOTP with the **Copy** icon.
7. In **Permissions settings**, restrict access to your variable based on roles in your org. For more information about roles, see the [RBAC documentation][1].
<div class="alert alert-warning">
RBAC restrict access to global variables is in beta. To request access, contact <a href="https://docs.datadoghq.com/help/">Datadog support</a>.</div>  

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="Create a MFA token" style="width:100%;" >}}

### Use TOTP in your Synthetic tests
**Note**: You can use the secret key or QR code stored in a global variable across Synthetic tests.  
When creating a browser or API test, inject the TOTP generated from the secret key or QR code stored in the global variable to verify your application’s authentication workflow.

To use TOTP in your browser tests:
1. Import your global variable.
2. When recording your test, click the **Hand** icon to generate a TOTP. 
3. In your test browser application, click in a field to paste the TOTP. Injecting the computed code into your test creates another test step. 
4. After recording your test steps, click **Save & Launch Test**.

{{< img src="synthetics/guide/browser-tests-totp/mfa-token-totp.mp4" alt="Recording a TOTP validation" video="true" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/?tab=datadogapplication#custom-roles
