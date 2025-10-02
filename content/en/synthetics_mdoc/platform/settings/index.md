---
title: Synthetic Testing and Monitoring Settings
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Platform > Synthetic Testing and
  Monitoring Settings
sourceUrl: https://docs.datadoghq.com/synthetics/platform/settings/index.html
---

# Synthetic Testing and Monitoring Settings

## Overview{% #overview %}

On the [Synthetic Monitoring & Continuous Testing Settings page](https://app.datadoghq.com/synthetics/settings), you can access and control the following topics:

- Default Settings
- Private Locations
- Global Variables
- Integration Settings
- [Continuous Testing Settings](https://docs.datadoghq.com/continuous_testing/settings/)
- [Mobile Applications Settings](https://docs.datadoghq.com/synthetics/mobile_app_testing/settings/)

## Default settings{% #default-settings %}

### Enforced tags settings{% #enforced-tags-settings %}

#### Enforce tags for **usage attribution** on all tests{% #enforce-tags-for-usage-attribution-on-all-tests %}

On the Usage Attribution page, you can configure up to three tags by which to break down cost and usage attributes. Select **Enforce tags for usage attribution on all tests** to require that users enter all configured Usage Attribution tags when creating or editing Synthetic tests. With this setting enabled, users cannot save tests without entering all required tags.

#### Enforce required **monitor tag policies** on all tests{% #enforce-required-monitor-tag-policies-on-all-tests %}

On the [Synthetic Monitoring and Testing settings](https://app.datadoghq.com/synthetics/settings/default) page, select **Enforce required monitor tag policies on all tests** to require that user-defined monitor tag policies are enforced on Synthetic tests. With this setting enabled, users cannot save tests without entering all required tags.

1. Configure monitor tags on the [**Monitors** > **Settings** > **Policies** page](https://app.datadoghq.com/monitors/settings/policies):

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/settings/monitor_tag_policy.934ce6094e127f4655276905dcda9d2d.png?auto=format"
   alt="Monitor Settings page, showing monitor policy tags that are configured" /%}
Create a Synthetic browser test, and add the required policy tags:
{% image
   source="https://datadog-docs.imgix.net/images/synthetics/settings/monitor_tags.3a873056b834d3c282871c90641a347d.png?auto=format"
   alt="New Synthetics test page, highlighting Policy tags feature" /%}

### Default locations{% #default-locations %}

Choose the default locations for your [API test](https://docs.datadoghq.com/synthetics/api_tests/), [multistep API test](https://docs.datadoghq.com/synthetics/multistep/), or [browser test](https://docs.datadoghq.com/synthetics/browser_tests/) details.

Your options include all of the available managed locations Datadog offers and the private locations you set up for your account.

When you are done selecting locations, click **Save Default Locations**.

### Default browsers and devices{% #default-browsers-and-devices %}

Choose the default browser and device types for your [browser test](https://docs.datadoghq.com/synthetics/browser_tests/) details.

Your options for browsers include Google Chrome, Mozilla Firefox, and Microsoft Edge. Your options for devices include a large laptop, a tablet, and a small mobile device.

When you are done selecting browsers and devices, click **Save Default Browsers & Devices**.

### Default tags{% #default-tags %}

Choose or add the default tags for your [API test](https://docs.datadoghq.com/synthetics/api_tests/), [multistep API test](https://docs.datadoghq.com/synthetics/multistep/), or [browser test](https://docs.datadoghq.com/synthetics/browser_tests/) details.

When you are done selecting related tags, click **Save Default Tags**.

### Default timeout{% #default-timeout %}

Add the default timeouts for your [API test](https://docs.datadoghq.com/synthetics/api_tests/) details.

When you are done entering the new timeouts, click **Save Default Timeouts**.

### Default frequency{% #default-frequency %}

Choose or add the default frequencies for your [API test](https://docs.datadoghq.com/synthetics/api_tests/), [browser test](https://docs.datadoghq.com/synthetics/browser_tests/), or [mobile test](https://docs.datadoghq.com/synthetics/mobile_app_testing/) details.

When you are done selecting related tags, click **Save Default Frequencies**.

### Default retries{% #default-retries %}

Choose or add the default number of times you'd like your test to retry on failure for your [API test](https://docs.datadoghq.com/synthetics/api_tests/), [browser test](https://docs.datadoghq.com/synthetics/browser_tests/), or [mobile test](https://docs.datadoghq.com/synthetics/mobile_app_testing/) details.

When you are done entering the default retry values, click **Save Default Retries**.

### Default mobile devices{% #default-mobile-devices %}

Choose or add the default mobile devices you want to use in your [mobile test](https://docs.datadoghq.com/synthetics/mobile_app_testing/) details.

When you are done entering the default mobile devices, click **Save Default Devices**.

### Permissions{% #permissions %}

By default, only users with the [Datadog Admin and Datadog Standard roles](https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication#datadog-default-roles) can access the Synthetic Monitoring **Default Settings** page. To get access to the **Default Settings** page, upgrade your user to one of those two [default roles](https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication#datadog-default-roles).

If you are using the [custom role feature](https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication#custom-roles), add your user to any custom role that includes `synthetics_default_settings_read` and `synthetics_default_settings_write` permissions.

## Private locations{% #private-locations %}

For more information, see [Run Synthetic Tests from Private Locations](https://docs.datadoghq.com/synthetics/private_locations/).

## Global variables{% #global-variables %}

Global variables are variables that are accessible from all your Synthetic tests. They can be used in all [single](https://docs.datadoghq.com/synthetics/api_tests/), [multistep API tests](https://docs.datadoghq.com/synthetics/multistep/), [browser tests](https://docs.datadoghq.com/synthetics/browser_tests/), and [mobile app tests](https://docs.datadoghq.com/synthetics/mobile_app_testing/) of your test suite.

To create a global variable, navigate to the **Global Variables** tab on the [**Synthetic Monitoring & Continuous Testing** > **Settings** page](https://app.datadoghq.com/synthetics/settings/variables) and click **+ New Global Variable**.

Choose the type of variable you want to create:

{% tab title="Specify Value" %}

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores. This name should be unique across your global variables.
1. Optionally, enter a **Description** and select **Tags** to associate with your variable.
1. Enter the **Value** you want to assign to your variable.
1. Optionally, use built-ins to assign values to your variable. For example, click on the `{{ alphabetic(n) }}` built-in to populate the **Value** field with an example of an alphabetic value.
1. Optionally, enable obfuscation of your variable to hide its value on test results.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/settings/variable_value_3.98c2be5732ad8b5a65518723a0709bec.png?auto=format"
   alt="Global Variable Specify Value" /%}

The following built-ins are available:

{% dl %}

{% dt %}
{{ numeric(n) }}
{% /dt %}

{% dd %}
Generates a numeric string with `n` digits.
{% /dd %}

{% dt %}
{{ alphabetic(n) }}
{% /dt %}

{% dd %}
Generates an alphabetic string with `n` letters.
{% /dd %}

{% dt %}
{{ alphanumeric(n) }}
{% /dt %}

{% dd %}
Generates an alphanumeric string with `n` characters.
{% /dd %}

{% dt %}
{{ date(n unit, format) }}
{% /dt %}

{% dd %}
Generates a date in one of Datadog's accepted formats with a value corresponding to the UTC date the test is initiated at, plus or minus `n` units.
{% /dd %}

{% dt %}
{{ timestamp(n, unit) }}
{% /dt %}

{% dd %}
Generates a timestamp in one of Datadog's accepted units with a value corresponding to the UTC timestamp the test is initiated at, plus or minus `n` units.
{% /dd %}

{% dt %}
{{ uuid }}
{% /dt %}

{% dd %}
Generates a version 4 universally unique identifier (UUID).
{% /dd %}

{% dt %}
{{ public-id }}
{% /dt %}

{% dd %}
Injects the Public ID of your test.
{% /dd %}

{% dt %}
{{ result-id }}
{% /dt %}

{% dd %}
Injects the Result ID of your test run.
{% /dd %}

{% /dl %}

{% /tab %}

{% tab title="Create From Test" %}
You can create variables from your existing [HTTP tests](https://docs.datadoghq.com/synthetics/api_tests/http_tests/) by parsing their associated response headers and body or from your existing [Multistep API tests](https://docs.datadoghq.com/synthetics/multistep/) by using their extracted variables.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/settings/global_variable.21266c3ff5f2696926c2cd78ff3b8d54.png?auto=format"
   alt="Available variables that you can extract from a multistep API test" /%}

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores.

1. Optionally, enter a **Description** and select **Tags** to associate with your variable.

1. Enable obfuscation of your variable to hide its value on test results (optional).

1. Select the **test** you want to extract a variable from.

1. If you are using a multistep API test, extract your local variable from the test. If you are using an HTTP test, choose to extract your variable from the response header or the response body.

   - Extract the value from **Response Header**: Use the full response header for your variable or parse it with a [`regex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).
   - Extract the value from **Response Body**: Parse the response body of the request with a [`regex`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), a [`jsonpath`](https://restfulapi.net/json-jsonpath/), an [`xpath`](https://www.w3schools.com/xml/xpath_syntax.asp), or use the full response body.
   - Extract the value from the **Response Status Code**.

In addition to extracting a value with a regex, you can also use a [regex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) to parse the following:

- Match not only the first instance of a pattern, but also all instances of the supplied pattern
- Ignore the case of the matching pattern
- Match strings over multiple lines
- Treat the passed regex pattern as unicode
- Allow period symbols to identify new lines
- Match from a given index within a regex pattern
- Substitute the matching pattern with a supplied value

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/settings/parsing_regex_field.8623cc2e66bed89ba294a8fa669de80e.png?auto=format"
   alt="Parse the response body from an HTTP Test with a regular expression" /%}

Variable values are updated whenever the test they are extracted from runs.
{% /tab %}

{% tab title="MFA Token" %}
To generate and use a TOTP in your tests, create a global variable where you enter a secret key or upload a QR code from your authentication provider. **Note:** Currently, only the SHA1 hashing algorithm is supported for TOTP.

1. In **Choose variable type**, select **MFA Token**.
1. In **Define Variable**, enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores.
1. Optionally, enter a **Description** and select **Tags** to associate with your variable.
1. Enter the **Secret Key** to your variable or upload a QR code image.
1. Click **+ Generate** to create an OTP. You can copy the generated OTP with the **Copy** icon.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/browser-tests-totp/new-variable-totp.63e60c1eea0c4df60db294d5aafa880c.png?auto=format"
   alt="Create a MFA token" /%}

**Note**: If your TOTP token works in Google Authenticator, it is likely compatible with Datadog. Some QR codes are limited to specific verification methods and may not work across platforms. To ensure compatibility, use a QR code or secret that follows standard TOTP protocols.

For more information about TOTP-based MFA in a browser test, see [TOTPs For Multi-Factor Authentication (MFA) In Browser Tests](https://docs.datadoghq.com/synthetics/guide/browser-tests-totp).
{% /tab %}

{% tab title="Virtual Authenticator" %}
To complete a user journey with a passkey in your Synthetics tests, create a Virtual Authenticator global variable. This global variable is used to generate and store passkeys for all your Synthetics browser tests. For more information, see [Using passkeys In Browser Tests](https://docs.datadoghq.com/synthetics/guide/browser-tests-passkeys).

1. Navigate to the **Global Variables** tab in [**Synthetic Monitoring & Continuous Testing** > **Settings**](https://docs.datadoghq.com/synthetics/guide/browser-tests-passkeys) and click **+ New Global Variable**.

1. In the **Choose variable type** section, select **Virtual Authenticator**.

1. In the **Specify variable details** section, enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores.

1. Optionally, enter a **Description**, and select **Tags** to associate with your variable. Datadog then creates a virtual authenticator used to generate and store your passkeys.

1. In the **Permissions settings** section, restrict access to your variable based on roles in your organization. For more information about roles, see the [RBAC documentation](https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication#custom-roles).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/browser-tests-passkeys/new-variable-virtual-authenticator.48204631fd1225ef506c637b3d99606e.png?auto=format"
   alt="Create a Virtual Authenticator" /%}

{% /tab %}

Once created, global variables can be used in all Synthetic tests. To import your global variables into your test, click **+ Variables**, type `{{` in a field you want to add the variable, and select your global variable.

For more information about variables, see the [HTTP test](https://docs.datadoghq.com/synthetics/api_tests/http_tests?tab=requestoptions#use-variables), [Multistep API test](https://docs.datadoghq.com/synthetics/multistep?tab=requestoptions#use-variables), [Browser test](https://docs.datadoghq.com/synthetics/browser_tests/?tab=requestoptions#use-global-variables), [Mobile app test](https://docs.datadoghq.com/synthetics/mobile_app_testing/#use-global-variables), and [Browser Test Steps documentation](https://docs.datadoghq.com/synthetics/browser_tests/actions/#use-variables).

### Permissions{% #permissions-1 %}

By default, only users with the [Datadog Admin and Datadog Standard roles](https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication#datadog-default-roles) can access the Synthetic Monitoring **Global Variables** page. You can get access to the **Global Variables** page by having your user upgraded to one of those two [default roles](https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication#datadog-default-roles).

If you are using the [custom role feature](https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication#custom-roles), add your user to any custom role that includes `synthetics_default_settings_read` and `synthetics_default_settings_write` permissions.

### Restrict access{% #restrict-access %}

Use [granular access control](https://docs.datadoghq.com/account_management/rbac/granular_access) to limit who has access to your test based on roles, teams, or individual users:

1. Open the permissions section of the form.
1. Click **Edit Access**.
   {% image
      source="https://datadog-docs.imgix.net/images/synthetics/settings/grace_2.09d79bb84cb15017d170b008af71c0f9.png?auto=format"
      alt="Set permissions for your test from Private Locations configuration form" /%}
1. Click **Restrict Access**.
1. Select teams, roles, or users.
1. Click **Add**.
1. Select the level of access you want to associate with each of them.
1. Click **Done**.

{% alert level="info" %}
**Note**: You can view results from a Private Location even without Viewer access to that Private Location.
{% /alert %}

| Access level | View GV value | View GV metadata | Use GV in test | Edit GV value/metadata |
| ------------ | ------------- | ---------------- | -------------- | ---------------------- |
| No access    |
| Viewer       | yes           | yes              | yes            |
| Editor       | yes           | yes              | yes            | yes                    |

## Integration settings{% #integration-settings %}

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/settings/integration_settings.9d2fb429fed3539331bbf3c6c03ef16b.png?auto=format"
   alt="Integration Settings page" /%}

### APM integration for browser tests{% #apm-integration-for-browser-tests %}

Allow URLs to add APM integration headers to those URLs. Datadog's APM integration headers allow Datadog to link browser tests with APM.

Define which endpoints you want to send the APM headers to by entering a URL in the **Value** field. If the endpoint is being traced and is allowed, your browser test results are automatically tied to its corresponding trace.

Use `*` to allow wider domain names. For example, adding `https://*.datadoghq.com/*` allows everything on `https://datadoghq.com/`. When you are done adding URLs, click **Save APM Integration Settings**.

For more information, see [Connect Synthetics and APM Traces](https://docs.datadoghq.com/synthetics/apm/#prerequisites).

### Synthetic browser test data collection and RUM applications{% #synthetic-browser-test-data-collection-and-rum-applications %}

To allow Datadog to collect RUM data from your browser test runs, click **Enable Synthetic RUM data collection**. If disabled, you cannot edit the RUM setting in the browser test recorder. When you are done enabling data collection, click **Save RUM Data Collection**.

Select a RUM application from the **Default Application** dropdown menu that collects browser test data. When you are done specifying a default application, click **Save RUM Data Applications**.

For more information, see [Explore RUM & Session Replay](https://docs.datadoghq.com/synthetics/guide/explore-rum-through-synthetics/).

### Synthetic mobile application test data collection{% #synthetic-mobile-application-test-data-collection %}

To allow Datadog to collect RUM data from your mobile application test runs, configure and package the RUM [iOS SDK](https://docs.datadoghq.com/real_user_monitoring/mobile_and_tv_monitoring/ios/setup?tab=swiftpackagemanagerspm) or [Android SDK](https://docs.datadoghq.com/real_user_monitoring/mobile_and_tv_monitoring/android/setup?tab=rum) with your `.ipa` or `.apk` file. This automatically links RUM data, giving you end-to-end observability of test runs.

## Further Reading{% #further-reading %}

- [Introducing Datadog Synthetic Monitoring](https://www.datadoghq.com/blog/introducing-synthetic-monitoring/)
- [Create and manage Synthetic Global Variables with Terraform](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable)
- [Configure an API Test](https://docs.datadoghq.com/synthetics/api_tests/)
- [Configure a Multistep API Test](https://docs.datadoghq.com/synthetics/multistep/)
- [Configure a Browser Test](https://docs.datadoghq.com/synthetics/browser_tests/)
- [Configure a Mobile Test](https://docs.datadoghq.com/mobile_app_testing/)
- [Create a Private Location](https://docs.datadoghq.com/synthetics/private_locations/)
- [Explore RUM & Session Replay in Synthetics](https://docs.datadoghq.com/synthetics/guide/explore-rum-through-synthetics/)
- [TOTPs For Multi-Factor Authentication (MFA) in Browser Test](https://docs.datadoghq.com/synthetics/guide/browser-tests-totp)
