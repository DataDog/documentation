---
title: Inject and Auto-Refresh Auth Tokens in Mobile Application Tests
description: Pass a live, auto-refreshing authentication token into a Mobile Application Test to bypass the login flow.
further_reading:
- link: '/synthetics/guide/authentication-protocols/'
  tag: 'Documentation'
  text: 'Use authentication in API and multistep API tests'
- link: '/synthetics/mobile_app_testing/'
  tag: 'Documentation'
  text: 'Create a mobile application test'
- link: '/synthetics/platform/settings/#global-variables'
  tag: 'Documentation'
  text: 'Create a global variable'
---

## Overview

Logging in through your app's UI at the start of every [mobile application test][1] adds time and flakiness unrelated to what you're testing. This guide describes how to skip that login step. Inject a live authentication token into your mobile app test, so it starts already authenticated.

The flow has three parts:

1. An [API test][2] logs in to your authentication provider on a schedule and extracts an access token into a [global variable][3].
2. Your mobile app test passes that global variable into the app as a launch argument or intent extra.
3. Your app reads the argument at startup, and if present, uses it to skip its normal login flow.

Because the API test refreshes the token on a schedule, the token available to your mobile test stays valid without any manual updates.

## Create a token-fetch API test

Create an [HTTP test][2] that requests a token from your authentication provider's token endpoint. For example, use a `POST` request to `https://auth.yourdomain.com/oauth/token` with your client credentials in the body.

If your provider requires a client secret, store it as a secure [global variable][3] instead of hardcoding it in the request. Select {{< ui >}}Hide and obfuscate variable value{{< /ui >}} when you create it.

In the test's assertions, [extract a variable][4] from the response body using a `jsonpath` expression that matches your token field, such as `$.access_token`.

Set the test to run [on a schedule][5] at an interval shorter than your token's expiration window. This keeps the extracted token from going stale before your mobile test runs.

## Create a global variable from the test

[Create a global variable][3] from the token-fetch test:

1. Navigate to the {{< ui >}}Global Variables{{< /ui >}} tab on the [{{< ui >}}Settings{{< /ui >}} page][6]. Click {{< ui >}}+ New Global Variable{{< /ui >}}.
2. Select the {{< ui >}}Create From Test{{< /ui >}} tab.
3. Enter a {{< ui >}}Variable Name{{< /ui >}}, such as `MOBILE_AUTH_TOKEN`.
4. Select {{< ui >}}Hide and obfuscate variable value{{< /ui >}} so the token doesn't appear in test results.
5. Select your token-fetch test, extract the value from {{< ui >}}Response Body{{< /ui >}}, and use the same `jsonpath` expression as your test assertion (for example, `$.access_token`).

This variable's value updates automatically whenever the token-fetch test runs.

## Pass the token to your mobile test

Mobile app tests support passing `key:value` pairs to your app at launch through [Advanced Options][7]. Reference your global variable with handlebar syntax, so its current value is substituted in at runtime:

{{< tabs >}}
{{% tab "Android (Initial Intent Extras)" %}}

```json
{
  "auth_token": "{{ MOBILE_AUTH_TOKEN }}"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_android.png" alt="Mobile app test creation page, showing an example of an advanced option for an Android device." style="width:100%;" >}}

{{% /tab %}}
{{% tab "iOS (Process Arguments)" %}}

```json
{
  "auth_token": "{{ MOBILE_AUTH_TOKEN }}"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_iOS.png" alt="Mobile app test creation page, showing an example of an advanced option for an iOS device." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Handle the token in your app

Your app must read the injected value at startup and use it to skip its login flow. Gate this behavior behind a build flag so the code path only exists in your test or automation builds.

{{< tabs >}}
{{% tab "iOS (Swift)" %}}

```swift
#if AUTOMATION
if let index = ProcessInfo.processInfo.arguments.firstIndex(of: "-auth_token"),
   index + 1 < ProcessInfo.processInfo.arguments.count {
    let authToken = ProcessInfo.processInfo.arguments[index + 1]
    SessionManager.shared.restoreSession(with: authToken)
}
#endif
```

{{% /tab %}}
{{% tab "Android (Java)" %}}

```java
if (BuildConfig.AUTOMATION) {
    String authToken = getIntent().getStringExtra("auth_token");
    if (authToken != null) {
        SessionManager.getInstance().restoreSession(authToken);
    }
}
```

{{% /tab %}}
{{% tab "React Native" %}}

```javascript
if (__DEV__ || Config.AUTOMATION) {
  const authToken = NativeModules.LaunchArguments?.auth_token;
  if (authToken) {
    SessionManager.restoreSession(authToken);
  }
}
```

{{% /tab %}}
{{< /tabs >}}

## Security considerations

Only accept an injected auth token in test or automation builds, never in production. Check a build flag before reading the argument, and make sure that flag is unset in the builds you ship to app stores.

This matters most on Android. An intent extra sent to an exported launcher `Activity` can come from any app on the device, not only Datadog's test runner. Without a build-flag check, a production app that reads and trusts `auth_token` from its launch intent lets any local app authenticate as the test account.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/mobile_app_testing/
[2]: /synthetics/api_tests/http_tests/
[3]: /synthetics/platform/settings/#global-variables
[4]: /synthetics/api_tests/http_tests/#define-assertions
[5]: /synthetics/api_tests/http_tests/#specify-test-frequency
[6]: https://app.datadoghq.com/synthetics/settings
[7]: /synthetics/mobile_app_testing/#advanced-options
