---
title: Monitor An Application That Requires Authentication With Browser Testing
description: >-
  Learn how to ensure your Synthetic browser tests can log in to your
  applications.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Browser Testing > Monitor An
  Application That Requires Authentication With Browser Testing
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/browser_tests/app-that-requires-login/index.html
---

# Monitor An Application That Requires Authentication With Browser Testing

## Overview{% #overview %}

{% alert level="info" %}
If you are interested in testing applications sitting behind MFA, see the Multi-factor authentication section.
{% /alert %}

You may need to monitor user journeys located behind a login. There are two ways to ensure that your Datadog browser tests can go through the login steps of your application to perform validation on post-login pages:

- Include the login steps in your browser test recording
- Leverage advanced options in your browser tests

To ensure your credentials are securely stored and obfuscated across the application, use obfuscated global variables.

## Include the login steps in your recording{% #include-the-login-steps-in-your-recording %}

The first method is to record the steps that are needed to perform the login at the beginning of your browser tests: input your username, input your password, and click log in. You can then go on and [start recording subsequent steps](https://docs.datadoghq.com/synthetics/browser_tests/actions/). At test execution, the browser test systematically executes the first login steps before going through the rest of the journey.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/guide/app_that_requires_login/login_test_2.mp4" /%}

By default, the iframe/pop-up of the recorder uses your own browser. If you start the recording already logged into your application, the iframe/pop-up might directly display a post-login page, which prevents you from recording your login steps without logging out first.

To record your steps without logging out of your application, use the recorder's incognito mode.

{% video
   url="https://datadog-docs.imgix.net/images/synthetics/guide/app_that_requires_login/incognito_2.mp4" /%}

Opening a pop-up in incognito mode allows you to start your test's recording from the start URL set in your test configuration with a session completely isolated from your own browser's main session and user data. The freshly opened incognito pop-up ignores all your previous browser history including cookies and local data. You are automatically logged out from your account and can start recording your login steps as if you were visiting your website for the first time.

**Note:** Use [the subtest feature](https://docs.datadoghq.com/synthetics/browser_tests/actions/#subtests) to group your login steps into a single subtest that you can then reuse across any other browser tests that require a login.

### SSO login{% #sso-login %}

If your website uses SSO for login, input your application's URL as the starting URL of your browser test. The test performs the required redirections as part of the first default **Navigate to URL** step.

Some SSO providers might detect Datadog's browser tests as bots and prevent them from logging in, for example, by adding a reCAPTCHA. If that is your case, consider reaching out to your SSO provider to see if it is possible to turn off bot detection when [identifying requests as coming from Synthetic browser tests](https://docs.datadoghq.com/synthetics/guide/identify_synthetics_bots/) (such as for a specific set of credentials or Synthetic tests specific headers) for testing purposes.

An alternative would be to use a non-SSO approach and leverage a regular username and password combination to go through login.

### Passkeys{% #passkeys %}

Datadog Synthetic Monitoring supports [Passkeys](https://docs.datadoghq.com/synthetics/guide/browser-tests-passkeys), a security method that eliminates the risks of phishing, all forms of password theft, and replay attacks.

Create a Virtual Authenticator global variable and import it in your test. Then, record any passkey-related steps inside the browser.

### Multi-factor authentication{% #multi-factor-authentication %}

Datadog Synthetic Monitoring supports [Time-based One Time Passwords (TOTP)](https://docs.datadoghq.com/synthetics/guide/browser-tests-totp), a multi-factor authentication method that combines a secret key and the current time to generate a one-time password.

Browser tests can reproduce any actions a regular user take inside their browser. When setting up your test, record any multi-factor (including 2FA or TFA) authentication steps inside the browser.

Some MFA providers may detect Datadog's browser tests as bots and prevent them from logging in, for instance, by adding a reCAPTCHA. In this case, contact your MFA provider to see if it is possible to turn off bot detection when [identifying requests as coming from Synthetic browser tests](https://docs.datadoghq.com/synthetics/guide/identify_synthetics_bots/) (such as for a specific set of credentials or Synthetic tests specific headers).

If your MFA process involves steps performed outside of the browser (such as voice, text message, or opening a mobile application that does not leverage TOTP), consider reaching out to your MFA provider to ask if your MFA settings can be modified or if MFA can be turned off when [identifying requests as coming from Synthetic browser tests](https://docs.datadoghq.com/synthetics/guide/identify_synthetics_bots/) (such as for a specific set of credentials or Synthetic tests specific headers) for testing purposes. Depending on the type of MFA leveraged by your application, [JavaScript steps](https://docs.datadoghq.com/synthetics/browser_tests/actions/#test-your-ui-with-custom-javascript) can help to work around that.

{% alert level="info" %}
Datadog is constantly adding features to help you record test scenarios more easily. [Sending feedback](https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link) about the MFA systems that matter the most to you is appreciated.
{% /alert %}

## Leverage browser test configuration options{% #leverage-browser-test-configuration-options %}

Alternatively, you can configure your Datadog Browser Tests to authenticate using built-in browser test configuration options. You can apply the following:

- Specific headers
- Cookies
- Basic Auth, Digest Auth, AWS Signature, NTLM, Kerberos, or Auth 2.0 credentials

See [authentication methods](https://docs.datadoghq.com/synthetics/guide/authentication-protocols/?tab=basicaccess#authentication-methods) for more information.

These configuration options are set at every test execution and apply to every step of your browser test at execution time, not recording time.

You can manually apply these headers, cookies, and credentials to the recording page, then record the steps your test performs after login. During test execution, the browser test automatically authenticates using your specified configuration and executes all recorded steps.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/app_that_requires_login/browser_test_adv_options_2.2f75873ae30aee3c6c0925e2f2d3dbb8.png?auto=format"
   alt="Login to your app with browser test configuration options" /%}

## Account security{% #account-security %}

### Secure your authentication data{% #secure-your-authentication-data %}

Store your credentials as [global variables](https://docs.datadoghq.com/synthetics/settings/?tab=specifyvalue#global-variables) (for example, one global variable for username, another one for password) and select **Hide and obfuscate variable value** to hide their values from test results. You can restrict permissions on a browser test for individuals who have access to your instance of Datadog.

After you create the obfuscated variables, you can then [import these global variables](https://docs.datadoghq.com/synthetics/browser_tests/actions#a-global-variable) into your browser tests and use them in your login steps.

**Note:** Although Datadog global variables are securely stored and encrypted, it is strongly recommended that you use an account dedicated to testing with dummy credentials as a general testing best practice.

For more information about account security, see [Synthetic Monitoring Data Security](https://docs.datadoghq.com/data_security/synthetics).

## Further Reading{% #further-reading %}

- [Best practices for creating end-to-end tests](https://www.datadoghq.com/blog/test-creation-best-practices/)
- [TOTPs for Multi-Factor Authentication (MFA) in browser tests](https://docs.datadoghq.com/synthetics/guide/browser-tests-totp)
- [Learn about Passkeys in browser tests](https://docs.datadoghq.com/synthetics/guide/browser-tests-passkeys)
- [Learn about browser test steps](https://docs.datadoghq.com/synthetics/browser_tests/actions)
- [Kerberos Authentication for Synthetic Monitoring](https://docs.datadoghq.com/synthetics/guide/kerberos-authentication/)
