---
title: Inject and Auto-Refresh Auth Tokens in Mobile Application Tests
description: Pass a live, auto-refreshing authentication token into a mobile application test to bypass the login flow.
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

Logging in through your app UI at the start of every [mobile application test][1] adds duration and flakiness unrelated to the test. This guide shows how to skip that login step by injecting a live authentication token so the test starts already authenticated.

The flow has three parts:

1. An [API test][2] logs in to your authentication provider on a schedule and extracts an access token.
2. A [global variable][3] sourced from that test holds the token's value.
3. Your mobile app test passes the global variable into the app as a launch argument or intent extra. Your app reads it at startup and skips its normal login flow.

Because the API test refreshes the token on a schedule, the global variable's value updates on its own, without any manual work or Datadog API calls.

## Step 1: Create the token-fetch API test

If your authentication provider requires a client secret, store it as a secure [global variable][3] first, instead of hardcoding it in the request. Enter a name such as `AUTH_CLIENT_SECRET` and select {{< ui >}}Hide and obfuscate variable value{{< /ui >}} when you create it.

Create an [HTTP test][2] that requests a token from your provider's token endpoint:

- **Request**: `POST` to your token endpoint, such as `https://auth.yourdomain.com/oauth/token`.
- **Header**: `Content-Type: application/json`.
- **Body**: a JSON payload with your client credentials, referencing the `AUTH_CLIENT_SECRET` global variable:

{{< code-block lang="json" >}}
{
  "client_id": "synthetic_bot",
  "client_secret": "{{ AUTH_CLIENT_SECRET }}",
  "grant_type": "client_credentials"
}
{{< /code-block >}}

- **Assertion**: status code is `200`.
- **Extracted variable**: [extract a variable][4] named `EXTRACTED_TOKEN` from the response body, using a `jsonpath` expression that matches your token field, such as `$.access_token`. Select {{< ui >}}Hide and obfuscate variable value{{< /ui >}} so the token doesn't appear in test results.

Set the test [frequency][5] shorter than your token's expiration window, so the token doesn't go stale between runs. For example, run the test every 30 minutes for a token that expires after an hour. You can also attach a failure alert to the test to know if it stops refreshing the token.

## Step 2: Create a global variable from the test

[Create a global variable][3] from the token-fetch test so your mobile app test can reference its value:

1. Navigate to the {{< ui >}}Global Variables{{< /ui >}} tab on the [{{< ui >}}Settings{{< /ui >}} page][6]. Click {{< ui >}}\+ New Global Variable{{< /ui >}}.
2. Select the {{< ui >}}Create From Test{{< /ui >}} tab, and select your token-fetch test.
3. Enter a {{< ui >}}Variable Name{{< /ui >}}, such as `MOBILE_AUTH_TOKEN`.
4. Select {{< ui >}}Hide and obfuscate variable value{{< /ui >}} so the token doesn't appear in test results.
5. Select where to source the value from:
   - If your token-fetch test is a single HTTP request, select {{< ui >}}Response Body{{< /ui >}} and reuse the `jsonpath` expression from your test assertion, for example `$.access_token`.
   - If your token-fetch test has multiple steps, select the {{< ui >}}EXTRACTED_TOKEN{{< /ui >}} local variable you extracted in Step 1.

This variable's value updates automatically whenever the token-fetch test runs.

## Step 3: Pass the token to your mobile app test

Mobile app tests support passing `key:value` pairs to your app at launch through [advanced options][7]. Reference your global variable by typing `{{` in the field, so its current value is substituted in at runtime:

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

## Step 4: Handle the token in your app

Your app must read the injected value at startup, store it securely, and use it to skip its login flow. Gate this behavior behind a build flag so the code path only exists in your test or automation builds.

{{< tabs >}}
{{% tab "Android (Java)" %}}

{{< code-block lang="java" >}}
if (BuildConfig.AUTOMATION) {
    String authToken = getIntent().getStringExtra("auth_token");
    if (authToken != null) {
        SecureTokenStore.getInstance(this).save(authToken);
        SessionManager.getInstance().restoreSession(authToken);
    }
}
{{< /code-block >}}

Back `SecureTokenStore` with `EncryptedSharedPreferences` and a `MasterKey`, rather than storing the token in plain `SharedPreferences`.

{{% /tab %}}
{{% tab "iOS (Swift)" %}}

{{< code-block lang="swift" >}}
#if AUTOMATION
if let index = ProcessInfo.processInfo.arguments.firstIndex(of: "-auth_token"),
   index + 1 < ProcessInfo.processInfo.arguments.count {
    let authToken = ProcessInfo.processInfo.arguments[index + 1]
    KeychainManager.shared.save(token: authToken)
    SessionManager.shared.restoreSession(with: authToken)
}
#endif
{{< /code-block >}}

Store the token in the Keychain rather than `UserDefaults`, so it's protected at rest like a token your app receives from a real login.

{{% /tab %}}
{{% tab "React Native" %}}

{{< code-block lang="javascript" >}}
import { LaunchArguments } from 'react-native-launch-arguments';
import * as Keychain from 'react-native-keychain';

if (__DEV__ || Config.AUTOMATION) {
  const { auth_token: authToken } = LaunchArguments.value();
  if (authToken) {
    await Keychain.setGenericPassword('auth_token', authToken);
    SessionManager.restoreSession(authToken);
  }
}
{{< /code-block >}}

`react-native-launch-arguments` reads process arguments on iOS and intent extras on Android through one API. `react-native-keychain` stores the token in the platform Keychain or Keystore instead of `AsyncStorage`.

{{% /tab %}}
{{< /tabs >}}

## Security considerations

Accept an injected auth token only in test or automation builds, never in production. Check a build flag before reading the argument, and make sure that flag is unset in the builds you ship to app stores.

This matters most on Android. An intent extra sent to an exported launcher `Activity` can come from any app on the device, not only Datadog's test runner. Without a build-flag check, a production app that reads and trusts `auth_token` from its launch intent lets any local app authenticate as the test account.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/mobile_app_testing/
[2]: /synthetics/api_tests/http_tests/
[3]: /synthetics/platform/settings/#global-variables
[4]: /synthetics/api_tests/http_tests/#define-assertions
[5]: /synthetics/api_tests/http_tests/#specify-test-frequency
[6]: https://app.datadoghq.com/synthetics/settings
[7]: /synthetics/mobile_app_testing/#advanced-options
