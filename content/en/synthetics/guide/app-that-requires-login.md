---
title: Running tests on an application that requires authentication
kind: guide
further_reading:
    - link: 'synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Configure a Browser Test'
    - link: '/synthetics/browser_tests/actions'
      tag: 'Documentation'
      text: 'Create Browser Test Steps'
    - link: 'https://www.datadoghq.com/blog/test-creation-best-practices/'
      tag: 'Blog'
      text: 'Best practices for creating end-to-end tests'

---

You might need to monitor journeys located behind a login. There are two ways to ensure that your Datadog Browser tests can go through the login steps of your application to perform validation on post login pages:

- [Include the login steps in your recording](#include-the-login-in-your-recording)
- [Leverage browser test configuration options](#leverage-browser-test-configuration-options)

You can also ensure your credentials are securely stored and obfuscated across the application [using secured global variables](#account-security).

<div class="alert alert-info"> Are you interested in testing applications sitting behind MFA? Visit the <a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">below section</a> and <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">send us feedback</a> to help us work on the systems that matter the most to your teams.</div>

## Include the login steps in your recording

The first method is to record the steps that are needed to perform the login at the beginning of your browser tests: input your username, input your password, hit log in. You can then go on and [start recording subsequent steps][1].
At test execution, the browser test systematically executes the first login steps before going through the rest of the journey.

{{< img src="synthetics/guide/app_that_requires_login/login_test.mp4" video="true" alt="Demo of recording a login">}}

By default, the iframe/pop up of the recorder uses your own browser. If you start the recording already logged into your application, the iframe/pop up might directly display a post-login page, which prevents you from recording your login steps without logging out first.

To record your steps without logging out of your application, use the recorder's incognito mode.

{{< img src="synthetics/guide/app_that_requires_login/incognito.mp4" video="true" alt="Demo of recording a login in incognito">}}

Opening a pop up in incognito mode allows you to start your test's recording from the start URL set in your test configuration with a session completely isolated from your own browser's main session and user data. The freshly opened incognito pop up ignores all your previous browser history: cookies, local data, etc. You are automatically logged out from your account and can start recording your login steps as if you were visiting your website for the first time.

**Note:** Use [the subtest feature][2] to group your login steps into a single subtest that you can then reuse across any other browser tests that require a login.

### SSO login

If your website uses SSO for login, input your application's URL as the starting URL of your browser test. The test performs the required redirections as part of the first default **Navigate to URL** step.

Some SSO providers might detect Datadog's browser tests as bots and prevent them from logging in, for example, by adding a reCAPTCHA. If that is your case, consider reaching out to your SSO provider to see if it is possible to turn off bot detection when [identifying requests as coming from Synthetic browser tests][3] (for example, for a specific set of credentials, Synthetic tests specific headers, etc.) for testing purposes.

An alternative would be to use a non-SSO approach and leverage a regular username and password combination to go through login.

### Multi-factor authentication

Browser tests can reproduce any actions a regular user can take inside their Chrome browser. If you perform the multi-factor (or 2FA, or TFA) authentication step inside of a Chrome browser, you can record it when setting up your browser test. Some MFA providers might however detect Datadog's browser tests as bots and prevent them from logging in, for example, by adding a reCAPTCHA. If that is your case, consider reaching out to your MFA provider to see if it is possible to turn off bot detection when [identifying requests as coming from Synthetic browser tests][3] (for example, for a specific set of credentials, Synthetic tests specific headers, etc.) for testing purposes.

If your MFA process involves steps performed outside of the browser, such as voice, text message, or opening a mobile application, also consider reaching out to your MFA provider to ask if your MFA settings could be modified or if MFA could be turned off when [identifying requests as coming from Synthetic browser tests][3] (for example, for a specific set of credentials, Synthetic tests specific headers, etc.) for testing purposes.
Depending on the type of MFA leveraged by your application, [JavaScript steps][4] could help to work around that.

<div class="alert alert-info">We are constantly adding features to help you record test scenarios more easily. Help us work on the MFA systems that matter the most to you by <a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">sending us feedback</a>.</div>

## Leverage browser test configuration options

The second way to ensure that your Datadog Browser tests can login into your applications is to leverage one or several of the available browser test configurations. You can indeed decide to apply:

- Specific headers
- Cookies
- Basic, Digest, Bearer or NTLM credentials

These are set at every test execution and consequently allow you to start the recording of your steps directly post login. 

{{< img src="synthetics/guide/app_that_requires_login/browser_test_conf.png" alt="Login to your app with browser test configuration options">}}

## Account security

### Secure your authentication data

Store your credentials as [global variables][5] (for example, one global variable for username, another one for password) and  set these variables as secure to obfuscate their values from anyone else who has access to your instance of Datadog.

Once you create the secure variables, you can then [import these global variables][6] into your browser tests and leverage them for your login steps. 

**Note:** Although Datadog global variables are securely stored and encrypted, it is strongly recommended that you use an account dedicated to testing with dummy credentials as a general testing best practice.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/actions/
[2]: /synthetics/browser_tests/actions/#subtests
[3]: /synthetics/guide/identify_synthetics_bots/
[4]: /synthetics/browser_tests/actions/#test-your-ui-with-custom-javascript
[5]: /synthetics/settings/?tab=specifyvalue#global-variables
[6]: /synthetics/browser_tests/actions#a-global-variable
