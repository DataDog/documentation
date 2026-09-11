---
title: Synthetic Testing and Monitoring Settings
aliases:
- /synthetics/settings
further_reading:
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable"
  tag: "External Site"
  text: "Create and manage Synthetic Global Variables with Terraform"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Configure an API Test"
- link: "/synthetics/multistep/"
  tag: "Documentation"
  text: "Configure a Multistep API Test"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Configure a Browser Test"
- link: "/mobile_app_testing/"
  tag: "Documentation"
  text: "Configure a Mobile Test"
- link: "/synthetics/private_locations/"
  tag: "Documentation"
  text: "Create a Private Location"
- link: "/synthetics/guide/explore-rum-through-synthetics/"
  tag: "Documentation"
  text: "Explore RUM & Session Replay in Synthetics"
---

## Overview

On the [Synthetic Monitoring & Continuous Testing Settings page][1], you can access and control the following topics:

* [Default Settings](#default-settings)
* [Downtimes][25]
* [Private Locations](#private-locations)
* [Global Variables](#global-variables)
* [Integration Settings](#integration-settings)
* [Continuous Testing Settings][2]
* [Mobile Applications Settings][18]

## Default settings

### Enforced tags settings

#### Enforce tags for **usage attribution** on all tests

On the Usage Attribution page, you can configure up to three tags by which to break down cost and usage attributes. Select {{< ui >}}Enforce tags for usage attribution on all tests{{< /ui >}} to require that users enter all configured Usage Attribution tags when creating or editing Synthetic tests. With this setting enabled, users cannot save tests without entering all required tags.

#### Enforce required **monitor tag policies** on all tests

On the [Synthetic Monitoring and Testing settings][20] page, select {{< ui >}}Enforce required monitor tag policies on all tests{{< /ui >}} to require that user-defined monitor tag policies are enforced on Synthetic tests. With this setting enabled, users cannot save tests without entering all required tags.

  <br>

  1. Configure monitor tags on the [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} page][21]:

  <br>

   {{< img src="synthetics/settings/monitor_tag_policy.png" alt="Monitor Settings page, showing monitor policy tags that are configured" style="width:80%;">}}

  2. Create a Synthetic browser test, and add the required policy tags:

  <br>

  {{< img src="synthetics/settings/monitor_tags.png" alt="New Synthetics test page, highlighting Policy tags feature" style="width:80%;">}}

### Default locations

Choose the default locations for your [API test][4], [multistep API test][5], or [browser test][6] details.

Your options include all of the available managed locations Datadog offers and the private locations you set up for your account.

When you are done selecting locations, click {{< ui >}}Save Default Locations{{< /ui >}}.

### Default browsers and devices

Choose the default browser and device types for your [browser test][6] details.

Your options for browsers include Google Chrome, Mozilla Firefox, and Microsoft Edge. Your options for devices include a large laptop, a tablet, and a small mobile device.

When you are done selecting browsers and devices, click {{< ui >}}Save Default Browsers & Devices{{< /ui >}}.

### Default tags

Choose or add the default tags for your [API test][4], [multistep API test][5], or [browser test][6] details.

When you are done selecting related tags, click {{< ui >}}Save Default Tags{{< /ui >}}.

### Default timeout

Add the default timeouts for your [API test][4] details.

When you are done entering the new timeouts, click {{< ui >}}Save Default Timeouts{{< /ui >}}.

### Default frequency

Choose or add the default frequencies for your [API test][4], [browser test][6], or [mobile test][17] details.

When you are done selecting related tags, click {{< ui >}}Save Default Frequencies{{< /ui >}}.

### Default retries

Choose or add the default number of times you'd like your test to retry on failure for your [API test][4], [browser test][6], or [mobile test][17] details.

When you are done entering the default retry values, click {{< ui >}}Save Default Retries{{< /ui >}}.

### Default mobile devices

Choose or add the default mobile devices you want to use in your [mobile test][17] details.

When you are done entering the default mobile devices, click {{< ui >}}Save Default Devices{{< /ui >}}.

### Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][11] can access the Synthetic Monitoring {{< ui >}}Default Settings{{< /ui >}} page. To get access to the {{< ui >}}Default Settings{{< /ui >}} page, upgrade your user to one of those two [default roles][11].

If you are using the [custom role feature][12], add your user to any custom role that includes `synthetics_default_settings_read` and `synthetics_default_settings_write` permissions.

## Downtimes

For more information, see [Scheduled Downtime][25].

## Private locations

For more information, see [Run Synthetic Tests from Private Locations][3].

## Global variables

Global variables are variables that are accessible from all your Synthetic tests. They can be used in all [single][4], [multistep API tests][5], [browser tests][6], and [mobile app tests][17] of your test suite.

To create a global variable, navigate to the {{< ui >}}Global Variables{{< /ui >}} tab on the [{{< ui >}}Synthetic Monitoring & Continuous Testing{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} page][7] and click {{< ui >}}+ New Global Variable{{< /ui >}}.

Choose the type of variable you want to create:

{{< tabs >}}
{{% tab "Specify Value" %}}

1. Enter a {{< ui >}}Variable Name{{< /ui >}}. Your variable name can only use uppercase letters, numbers, and underscores. This name should be unique across your global variables.
2. Optionally, enter a {{< ui >}}Description{{< /ui >}} and select {{< ui >}}Tags{{< /ui >}} to associate with your variable.
3. Enter the {{< ui >}}Value{{< /ui >}} you want to assign to your variable.
4. Optionally, use built-ins to assign values to your variable. For example, click on the `{{ alphabetic(n) }}` built-in to populate the {{< ui >}}Value{{< /ui >}} field with an example of an alphabetic value.
5. Optionally, enable obfuscation of your variable to hide its value on test results.

{{< img src="synthetics/settings/variable_value_3.png" alt="Global Variable Specify Value" style="width:100%;">}}

The following built-ins are available:

&#x7b;&#x7b; numeric(n) &#x7d;&#x7d;
: Generates a numeric string with `n` digits.

&#x7b;&#x7b; alphabetic(n) &#x7d;&#x7d;
: Generates an alphabetic string with `n` letters.

&#x7b;&#x7b; alphanumeric(n) &#x7d;&#x7d;
: Generates an alphanumeric string with `n` characters.

&#x7b;&#x7b; date(n unit, format) &#x7d;&#x7d;
: Generates a date in one of Datadog's accepted formats with a value corresponding to the UTC date the test is initiated at, plus or minus `n` units.

&#x7b;&#x7b; timestamp(n, unit) &#x7d;&#x7d;
: Generates a timestamp in one of Datadog's accepted units with a value corresponding to the UTC timestamp the test is initiated at, plus or minus `n` units.

&#x7b;&#x7b; uuid &#x7d;&#x7d;
: Generates a version 4 universally unique identifier (UUID).

&#x7b;&#x7b; public-id &#x7d;&#x7d;
: Injects the Public ID of your test.

&#x7b;&#x7b; result-id &#x7d;&#x7d;
: Injects the Result ID of your test run.

{{% /tab %}}

{{% tab "Create From Test" %}}

You can create variables from your existing [HTTP tests][1] by parsing their associated response headers and body or from your existing [Multistep API tests][2] by using their extracted variables.

{{< img src="synthetics/settings/global_variable.png" alt="Available variables that you can extract from a multistep API test" style="width:100%;" >}}

1. Enter a {{< ui >}}Variable Name{{< /ui >}}. Your variable name can only use uppercase letters, numbers, and underscores.
2. Optionally, enter a {{< ui >}}Description{{< /ui >}} and select {{< ui >}}Tags{{< /ui >}} to associate with your variable.
3. Enable obfuscation of your variable to hide its value on test results (optional).
4. Select the **test** you want to extract a variable from.
5. If you are using a multistep API test, extract your local variable from the test. If you are using an HTTP test, choose to extract your variable from the response header or the response body.

    * Extract the value from {{< ui >}}Response Header{{< /ui >}}: Use the full response header for your variable or parse it with a [`regex`][3].
    * Extract the value from {{< ui >}}Response Body{{< /ui >}}: Parse the response body of the request with a [`regex`][3], a [`jsonpath`][4], an [`xpath`][5], or use the full response body.
    * Extract the value from the {{< ui >}}Response Status Code{{< /ui >}}.

In addition to extracting a value with a regex, you can also use a [regex][3] to parse the following:

  - Match not only the first instance of a pattern, but also all instances of the supplied pattern
  - Ignore the case of the matching pattern
  - Match strings over multiple lines
  - Treat the passed regex pattern as unicode
  - Allow period symbols to identify new lines
  - Match from a given index within a regex pattern
  - Substitute the matching pattern with a supplied value

{{< img src="synthetics/settings/parsing_regex_field.png" alt="Parse the response body from an HTTP Test with a regular expression" style="width:80%;">}}

Variable values are updated whenever the test they are extracted from runs.

[1]: /synthetics/api_tests/http_tests/
[2]: /synthetics/multistep/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
{{% /tab %}}

{{% tab "MFA Token" %}}

To generate and use a TOTP in your tests, create a global variable where you enter a secret key or upload a QR code from your authentication provider. **Note:** Currently, only the SHA1 hashing algorithm is supported for TOTP.

1. In {{< ui >}}Choose variable type{{< /ui >}}, select {{< ui >}}MFA Token{{< /ui >}}.
2. In {{< ui >}}Define Variable{{< /ui >}}, enter a {{< ui >}}Variable Name{{< /ui >}}. Your variable name can only use uppercase letters, numbers, and underscores.
3. Optionally, enter a {{< ui >}}Description{{< /ui >}} and select {{< ui >}}Tags{{< /ui >}} to associate with your variable.
4. Enter the {{< ui >}}Secret Key{{< /ui >}} to your variable or upload a QR code image.
5. Click {{< ui >}}+ Generate{{< /ui >}} to create an OTP. You can copy the generated OTP with the {{< ui >}}Copy{{< /ui >}} icon.

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="Create a MFA token" style="width:100%;" >}}

**Note**: If your TOTP token works in Google Authenticator, it is likely compatible with Datadog.
Some QR codes are limited to specific verification methods and may not work across platforms. To ensure compatibility, use a QR code or secret that follows standard TOTP protocols.

For more information about TOTP-based MFA in a browser test, see [TOTPs For Multi-Factor Authentication (MFA) In Browser Tests][1].

[1]: /synthetics/guide/browser-tests-totp
{{% /tab %}}
{{% tab "Virtual Authenticator" %}}

To complete a user journey with a passkey in your Synthetics tests, create a Virtual Authenticator global variable. This global variable is used to generate and store passkeys for all your Synthetics browser tests. For more information, see [Using passkeys In Browser Tests][1].

1. Navigate to the {{< ui >}}Global Variables{{< /ui >}} tab in [{{< ui >}}Synthetic Monitoring & Continuous Testing{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1] and click {{< ui >}}+ New Global Variable{{< /ui >}}.

1. In the {{< ui >}}Choose variable type{{< /ui >}} section, select {{< ui >}}Virtual Authenticator{{< /ui >}}.
2. In the {{< ui >}}Specify variable details{{< /ui >}} section, enter a {{< ui >}}Variable Name{{< /ui >}}. Your variable name can only use uppercase letters, numbers, and underscores.
3. Optionally, enter a {{< ui >}}Description{{< /ui >}}, and select {{< ui >}}Tags{{< /ui >}} to associate with your variable. Datadog then creates a virtual authenticator used to generate and store your passkeys.
4. In the {{< ui >}}Permissions settings{{< /ui >}} section, restrict access to your variable based on roles in your organization. For more information about roles, see the [RBAC documentation][2].

{{< img src="synthetics/guide/browser-tests-passkeys/new-variable-virtual-authenticator.png" alt="Create a Virtual Authenticator" style="width:80%;" >}}

[1]: /synthetics/guide/browser-tests-passkeys
[2]: /account_management/rbac/?tab=datadogapplication#custom-roles
{{% /tab %}}
{{< /tabs >}}

Once created, global variables can be used in all Synthetic tests. To import your global variables into your test, click {{< ui >}}+ Variables{{< /ui >}}, type `{{` in a field you want to add the variable, and select your global variable.


For more information about variables, see the [HTTP test][8], [Multistep API test][9], [Browser test][10], [Mobile app test][19], and [Browser Test Steps documentation][16].

### Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][11] can access the Synthetic Monitoring {{< ui >}}Global Variables{{< /ui >}} page. You can get access to the {{< ui >}}Global Variables{{< /ui >}} page by having your user upgraded to one of those two [default roles][11].

If you are using the [custom role feature][12], add your user to any custom role that includes `synthetics_default_settings_read` and `synthetics_default_settings_write` permissions.

### Restrict access

Use [granular access control][22] to limit who has access to your test based on roles, teams, or individual users:

1. Open the permissions section of the form.
2. Click {{< ui >}}Edit Access{{< /ui >}}.
  {{< img src="synthetics/settings/grace_2.png" alt="Set permissions for your test from Private Locations configuration form" style="width:100%;" >}}
3. Click {{< ui >}}Restrict Access{{< /ui >}}.
4. Select teams, roles, or users.
5. Click {{< ui >}}Add{{< /ui >}}.
6. Select the level of access you want to associate with each of them.
7. Click {{< ui >}}Done{{< /ui >}}.

<div class="alert alert-info">You can view results from a Private Location even without Viewer access to that Private Location.</div>

| Access level | View GV value | View GV metadata | Use GV in test | Edit GV value/metadata  |
| ------------ | --------------| ---------------- | -------------- | ----------------------- |
| No access    |               |                  |                |                         |
| Viewer       | {{< X >}}     | {{< X >}}        | {{< X >}}      |                         |
| Editor       | {{< X >}}     | {{< X >}}        | {{< X >}}      | {{< X >}}               |

**Note**: Restricting a variable prevents other users from adding it to a test and using it; it does not hide the name of the variable if it is already used in an existing test.

## Integration settings

{{< img src="synthetics/settings/integration_settings.png" alt="Integration Settings page" style="width:100%;">}}

### APM integration for browser tests

Allow URLs to add APM integration headers to those URLs. Datadog's APM integration headers allow Datadog to link browser tests with APM.

Define which endpoints you want to send the APM headers to by entering a URL in the {{< ui >}}Value{{< /ui >}} field. If the endpoint is being traced and is allowed, your browser test results are automatically tied to its corresponding trace.

Use `*` to allow wider domain names. For example, adding `https://*.datadoghq.com/*` allows everything on `https://datadoghq.com/`. When you are done adding URLs, click {{< ui >}}Save APM Integration Settings{{< /ui >}}.

For more information, see [Connect Synthetics and APM Traces][15].

### Synthetic browser test data collection and RUM applications

To allow Datadog to collect RUM data from your browser test runs, click {{< ui >}}Enable Synthetic RUM data collection{{< /ui >}}. If disabled, you cannot edit the RUM setting in the browser test recorder. When you are done enabling data collection, click {{< ui >}}Save RUM Data Collection{{< /ui >}}.

Select a RUM application from the {{< ui >}}Default Application{{< /ui >}} dropdown menu that collects browser test data. When you are done specifying a default application, click {{< ui >}}Save RUM Data Applications{{< /ui >}}.

For more information, see [Explore RUM & Session Replay][14].

### Synthetic mobile application test data collection

To allow Datadog to collect RUM data from your mobile application test runs, configure and package the RUM [iOS SDK][23] or [Android SDK][24] with your `.ipa` or `.apk` file. This automatically links RUM data, giving you end-to-end observability of test runs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings
[2]: /continuous_testing/settings/
[3]: /synthetics/private_locations/
[4]: /synthetics/api_tests/
[5]: /synthetics/multistep/
[6]: /synthetics/browser_tests/
[7]: https://app.datadoghq.com/synthetics/settings/variables
[8]: /synthetics/api_tests/http_tests?tab=requestoptions#use-variables
[9]: /synthetics/multistep?tab=requestoptions#use-variables
[10]: /synthetics/browser_tests/?tab=requestoptions#use-global-variables
[11]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[12]: /account_management/rbac/?tab=datadogapplication#custom-roles
[13]: /account_management/billing/usage_attribution
[14]: /synthetics/guide/explore-rum-through-synthetics/
[15]: /synthetics/apm/#prerequisites
[16]: /synthetics/browser_tests/test_steps/#use-variables
[17]: /synthetics/mobile_app_testing/
[18]: /synthetics/mobile_app_testing/settings/
[19]: /synthetics/mobile_app_testing/#use-global-variables
[20]: https://app.datadoghq.com/synthetics/settings/default
[21]: https://app.datadoghq.com/monitors/settings/policies
[22]: /account_management/rbac/granular_access
[23]: https://docs.datadoghq.com/real_user_monitoring/application_monitoring/ios/setup?tab=swiftpackagemanagerspm
[24]: https://docs.datadoghq.com/real_user_monitoring/application_monitoring/android/setup?tab=rum
[25]: /synthetics/platform/downtime/
