---
title: Using Synthetics to monitor an application that requires a login
kind: guide
further_reading:
    - link: 'https://www.datadoghq.com/blog/introducing-synthetic-monitoring/'
      tag: 'Blog'
      text: 'Introducing Datadog Synthetics'
    - link: 'synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Configure a Browser Test'
---

## Including the login in your recording

When you set up the new browser test, be sure to [start the test recording][2] by logging into your application. By default, the iframe pop up of the recorder uses your browser. If you start the recording already logged into your application, the iframe pop up might directly display a post-login page, which prevents you from recording your login steps without logging out first. An easy way to trigger a new login in session is to use the private browser recorder - this forces a log out.

{{< img src="synthetics/guide/app_that_requires_login/login_test.mp4" video="true" alt="Demo of recording a login">}}

**Note:** Use [the subtest feature][3] to group your login steps into a single subtest that you can then reuse across any other browser tests that require a login.

### SSO login

If your website uses SSO for login, input your application's URL as the starting URL of your Browser test. The test performs the required redirections as part of the first default "Navigate to URL" step.

Some SSO providers might detect our Browser tests as bots and prevent them from logging in, for example, by adding a re-Captcha. If that is your case, consider reaching out to your SSO provider to see if it is possible to turn off bot detection for a specific set of credentials for testing purposes.

An alternative would be to use a non-SSO approach and leverage a regular username and password combination to go through login.

### Multi-factor authentication

Browser tests can reproduce any actions a regular user can take inside their Chrome browser. If you perform the multi-factor (or 2FA, or TFA) authentication step inside of a Chrome browser, you can record the required steps to set up browser tests. 

Some MFA providers might detect our Browser tests as bots and prevent them from logging in, for example, by adding a re-Captcha. If that is your case, consider reaching out to your MFA provider to see if it is possible to turn off bot detection for a specific set of credentials for testing purposes.

If your MFA process involves steps outside of the browser, such as voice, text message, or opening a mobile application, it is not possible to set up a browser test. If this is your case, consider reaching out to your MFA provider to see if it is possible to turn off bot detection for a specific set of credentials for testing purposes.

## Account security

### Using global variables

Store your credentials as [global variables][4] (for example, one global variable for username, another one for password) and  set these variables as secure to obfuscate their values from anyone else who has access to your instance of Datadog:

Once you create the secure variables, you can then import these global variables into your browser tests and leverage them for your login steps: 

**Note:** Although Datadog global variables are securely stored and encrypted, we strongly recommend using an account dedicated to testing with dummy credentials as a general testing best practice.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: /#record-browser-tests-in-incognito-mode
[2]: /synthetics/browser_tests/actions
[3]: /synthetics/browser_tests/advanced_options/#subtests
[4]: /synthetics/settings/?tab=specifyvalue#global-variables
