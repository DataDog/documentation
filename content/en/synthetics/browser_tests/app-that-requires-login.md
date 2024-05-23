---
title: Monitor An Application That Requires Authentication With Browser Testing
kind: guide
description: Learn how to ensure your Synthetic browser tests can log in to your applications. 
aliases:
  - /synthetics/guide/app-that-requires-login
further_reading:
  - link: 'https://www.datadoghq.com/blog/test-creation-best-practices/'
    tag: 'Blog'
    text: 'Best practices for creating end-to-end tests'
  - link: '/synthetics/guide/browser-tests-totp'
    tag: 'Documentation'
    text: 'TOTPs for Multi-Factor Authentication (MFA) in browser tests'
  - link: '/synthetics/guide/browser-tests-passkeys'
    tag: 'Documentation'
    text: 'Learn about Passkeys in browser tests'
  - link: '/synthetics/browser_tests/actions'
    tag: 'Documentation'
    text: 'Learn about browser test steps'
---

## Overview 

<div class="alert alert-info">If you are interested in testing applications sitting behind MFA, visit the <a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">Multi-factor authentication section</a> and <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">send feedback</a> to help Datadog work on the systems that matter the most to your teams.</div>

You may need to monitor user journeys located behind a login. There are two ways to ensure that your Datadog browser tests can go through the login steps of your application to perform validation on post-login pages:

- [Include the login steps in your browser test recording](#include-the-login-steps-in-your-recording)
- [Leverage advanced options in your browser tests](#leverage-browser-test-configuration-options)

To ensure your credentials are securely stored and obfuscated across the application, use [obfuscated global variables](#account-security).

## Include the login steps in your recording

The first method is to record the steps that are needed to perform the login at the beginning of your browser tests: input your username, input your password, and click log in. You can then go on and [start recording subsequent steps][1].
At test execution, the browser test systematically executes the first login steps before going through the rest of the journey.

{{< img src="synthetics/guide/app_that_requires_login/login_test.mp4" video="true" alt="Demo of recording a login">}}

By default, the iframe/pop-up of the recorder uses your own browser. If you start the recording already logged into your application, the iframe/pop-up might directly display a post-login page, which prevents you from recording your login steps without logging out first.

To record your steps without logging out of your application, use the recorder's incognito mode.

{{< img src="synthetics/guide/app_that_requires_login/incognito.mp4" video="true" alt="Demo of recording a login in incognito">}}

Opening a pop-up in incognito mode allows you to start your test's recording from the start URL set in your test configuration with a session completely isolated from your own browser's main session and user data. The freshly opened incognito pop-up ignores all your previous browser history including cookies and local data. You are automatically logged out from your account and can start recording your login steps as if you were visiting your website for the first time.

**Note:** Use [the subtest feature][2] to group your login steps into a single subtest that you can then reuse across any other browser tests that require a login.

### SSO login

If your website uses SSO for login, input your application's URL as the starting URL of your browser test. The test performs the required redirections as part of the first default **Navigate to URL** step.

Some SSO providers might detect Datadog's browser tests as bots and prevent them from logging in, for example, by adding a reCAPTCHA. If that is your case, consider reaching out to your SSO provider to see if it is possible to turn off bot detection when [identifying requests as coming from Synthetic browser tests][3] (such as for a specific set of credentials or Synthetic tests specific headers) for testing purposes.

An alternative would be to use a non-SSO approach and leverage a regular username and password combination to go through login.

### Passkeys
Datadog Synthetic Monitoring supports [Passkeys][4], a security method that eliminates the risks of phishing, all forms of password theft, and replay attacks.

Create a Virtual Authenticator global variable and import it in your test. Then, record any passkey-related steps inside the browser.

### Multi-factor authentication

Datadog Synthetic Monitoring supports [Time-based One Time Passwords (TOTP)][5], a multi-factor authentication method that combines a secret key and the current time to generate a one-time password.

Browser tests can reproduce any actions a regular user take inside their browser. When setting up your test, record any multi-factor (including 2FA or TFA) authentication steps inside the browser.

Some MFA providers may detect Datadog's browser tests as bots and prevent them from logging in, for instance, by adding a reCAPTCHA. In this case, contact your MFA provider to see if it is possible to turn off bot detection when [identifying requests as coming from Synthetic browser tests][3] (such as for a specific set of credentials or Synthetic tests specific headers).

If your MFA process involves steps performed outside of the browser (such as voice, text message, or opening a mobile application that does not leverage TOTP), consider reaching out to your MFA provider to ask if your MFA settings can be modified or if MFA can be turned off when [identifying requests as coming from Synthetic browser tests][3] (such as for a specific set of credentials or Synthetic tests specific headers) for testing purposes.
Depending on the type of MFA leveraged by your application, [JavaScript steps][6] can help to work around that.

<div class="alert alert-info">Datadog is constantly adding features to help you record test scenarios more easily. <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">Sending feedback</a> about the MFA systems that matter the most to you is appreciated.</div>

## Leverage browser test configuration options

The second way to ensure that your Datadog Browser tests can login into your applications is to leverage one or several of the available browser test configurations. You can indeed decide to apply:

- Specific headers
- Cookies
- Basic Auth, Digest Auth, or NTLM credentials

These configuration options are set at every test execution and apply to every step of your browser test at execution time, not recording time. 

You can manually apply these configured headers, cookies, and credentials on the page you are recording from and then record steps your test performs post-login. By default, the browser test automatically passes through authentication with your specified headers, cookies, and/or credentials at execution time and then goes through all recorded steps.

{{< img src="synthetics/guide/app_that_requires_login/bt_adv_options.jpg" alt="Login to your app with browser test configuration options">}}

## Account security

### Secure your authentication data

Store your credentials as [global variables][7] (for example, one global variable for username, another one for password) and select **Hide and obfuscate variable value** to hide their values from test results. You can restrict permissions on a browser test for individuals who have access to your instance of Datadog.

Once you create the obfuscated variables, you can then [import these global variables][8] into your browser tests and leverage them for your login steps.

**Note:** Although Datadog global variables are securely stored and encrypted, it is strongly recommended that you use an account dedicated to testing with dummy credentials as a general testing best practice.

For more information about account security, see [Synthetic Monitoring Data Security][9].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/actions/
[2]: /synthetics/browser_tests/actions/#subtests
[3]: /synthetics/guide/identify_synthetics_bots/
[4]: /synthetics/guide/browser-tests-passkeys
[5]: /synthetics/guide/browser-tests-totp
[6]: /synthetics/browser_tests/actions/#test-your-ui-with-custom-javascript
[7]: /synthetics/settings/?tab=specifyvalue#global-variables
[8]: /synthetics/browser_tests/actions#a-global-variable
[9]: /data_security/synthetics
