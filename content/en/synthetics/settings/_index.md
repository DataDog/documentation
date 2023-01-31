---
title: Synthetic Monitoring Settings
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable"
  tag: "Terraform"
  text: "Create and manage Synthetic Global Variables with Terraform"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Configure an API Test"
- link: "/synthetics/multistep/"
  tag: "Documentation"
  text: "Configure a Multistep API Test"
- link: "/synthetics/private_locations/"
  tag: "Documentation"
  text: "Create a Private Location"
- link: "/synthetics/guide/explore-rum-through-synthetics/"
  tag: "Documentation"
  text: "Explore RUM & Session Replay in Synthetics"
- link: "/synthetics/guide/browser-tests-totp"
  tag: "Documentation"
  text: "TOTPs For Multi-Factor Authentication (MFA) in Browser Test"
---

## Overview

On the [Synthetic Monitoring Settings page][1], you can access and control the following topics:

* [Private Locations](#private-locations)
* [Global Variables](#global-variables)
* [Default Settings](#default-settings)
* [Integration Settings](#integration-settings)
* [Continuous Testing Settings][2]

## Private locations

For more information, see [Run Synthetic Tests from Private Locations][3].

## Global variables

Global variables are variables that are accessible from all your Synthetic tests. They can be used in all [single][4] and [multistep API tests][5] as well as [browser tests][6] of your test suite. To create a global variable, go to the [Global Variables][7] tab in the **Settings** page, and click **New Global Variable** on the upper right corner.

Choose the type of variable you want to create:

{{< tabs >}}
{{% tab "Specify Value" %}}

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores. This name should be unique across your global variables.
2. Enter a **Description** for your variable (optional).
3. Select **Tags** to associate with your variable (optional).
4. Enter the **Value** you want to assign to your variable.
5. Enable obfuscation of your variable to hide its value on test results (optional).

{{< img src="synthetics/settings/variable_value_2.png" alt="Global Variable Specify Value" style="width:100%;">}}

{{% /tab %}}

{{% tab "Create From Test" %}}

You can create variables from your existing [HTTP tests][1] by parsing their associated response headers and body or from your existing [Multistep API tests][2] by using their extracted variables.

{{< img src="synthetics/settings/global_variable.png" alt="Available variables that you can extract from a multistep API test" style="width:100%;" >}}

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores.
2. Enter a **Description** for your variable (optional).
3. Select **Tags** to associate with your variable (optional).
4. Enable obfuscation of your variable to hide its value on test results (optional).
5. Select the **test** you want to extract a variable from.
6. If you are using a multistep API test, extract your local variable from the test. If you are using an HTTP test, choose to extract your variable from the response header or the response body.

    * Extract the value from **Response Header**: Use the full response header for your variable or parse it with a [`regex`][3].
    * Extract the value from **Response Body**: Parse the response body of the request with a [`regex`][3], a [`jsonpath`][4], an [`xpath`][5], or use the full response body.
    * Extract the value from the **Response Status Code**. 

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
 
To generate and use a TOTP in your tests, create a global variable where you enter a secret key or upload a QR code from your authentication provider.

1. In **Choose variable type**, select **MFA Token**.
2. In **Define Variable**, enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores.
3. Enter a **Description** for your variable (optional).
4. Select **Tags** to associate with your variable (optional).
5. Enter the **Secret Key** to your variable or upload a QR code image.
6. Click **+ Generate** to create an OTP. You can copy the generated OTP with the **Copy** icon.

{{< img src="synthetics/guide/browser-tests-totp/new-variable-totp.png" alt="Create a MFA token" style="width:100%;" >}}

**Note**: For more information about TOTP-based MFA in a browser test, see the [TOTP guide][1].

[1]: /synthetics/guide/browser-tests-totp
{{% /tab %}}

{{< /tabs >}}

Once created, global variables can be used in all Synthetic tests. To import your global variables into your test, click **+ Variables**, type `{{` in a field you want to add the variable, and select your global variable. 

For more information, see the [HTTP test][7], [Multistep API test][8], [Browser test configuration][9], and [Steps documentation][10].

### Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][11] can access the Synthetic Monitoring **Global Variables** page. You can get access to the **Global Variables** page by having your user upgraded to one of those two [default roles][11]. 

### Restrict access

Access restriction is available for customers using [custom roles][11] on their accounts. If you are using the [custom role feature][12], add your user to any custom role that includes `synthetics_global_variable_read` and `synthetics_global_variable_write` permissions. 

You can restrict access to a global variable based on the roles in your organization. When creating a global variable, choose which roles (in addition to your user) can read and write your global variable in **Permissions settings**. 

{{< img src="synthetics/settings/restrict_access.png" alt="Restrict access to a global variable" style="width:100%;" >}}

## Default settings

### Default locations

Choose the default locations for your [API test][4], [multistep API test][5], or [browser test][6] details. 

Your options include all of the available managed locations Datadog offers and the private locations you set up for your account.

When you are done selecting locations, click **Save Default Locations**.

### Default browsers and devices

Choose the default browser and device types for your [browser test][6] details.

Your options for browsers include Google Chrome, Firefox, and Microsoft Edge. Your options for devices include a large laptop, a tablet, and a small mobile device.

When you are done selecting browsers and devices, click **Save Default Browsers & Devices**.

### Default tags

Choose or add the default tags for your [API test][4], [multistep API test][5], or [browser test][6] details.

When you are done selecting related tags, click **Save Default Tags**.

### Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][11] can access the Synthetic Monitoring **Default Settings** page. To get access to the **Default Settings** page, upgrade your user to one of those two [default roles][11]. 

If you are using the [custom role feature][12], add your user to any custom role that includes `synthetics_default_settings_read` and `synthetics_default_settings_write` permissions. 

## Integration settings

{{< img src="synthetics/settings/integration_settings.png" alt="Integration Settings page" style="width:100%;">}}

### APM integration for browser tests

Allow URLs to add APM integration headers to those URLs. Datadog's APM integration headers allow Datadog to link browser tests with APM. 

Define which endpoints you want to send the APM headers to by entering a URL in the **Value** field. If the endpoint is being traced and is allowed, your browser test results are automatically tied to its corresponding trace.

Use `*` to allow wider domain names. For example, adding `https://*.datadoghq.com/*` allows everything on `https://datadoghq.com/`.

When you are done adding URLs, click **Save APM Integration Settings**.

### Synthetic data collection and RUM applications

To allow Datadog to collect RUM data from your test runs, click **Enable Synthetic RUM data collection**. If disabled, you cannot edit the RUM setting in the browser test recorder. When you are done enabling data collection, click **Save RUM Data Collection**.

Select a RUM application from the **Default Application** dropdown menu that collects browser test data. When you are done specifying a default application, click **Save RUM Data Applications**.

For more information, see [Explore RUM & Session Replay][14].

### Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][11] can access the Synthetic Monitoring **Integration Settings** page. To get access to the **Integration Settings** page, upgrade your user to one of those two [default roles][11]. 

If you are using the [custom role feature][12], add your user to any custom role that includes `synthetics_default_settings_read` and `synthetics_default_settings_write` permissions. 

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
[12]: /account_management/rbac/?tab=datadogapplication#custom-role
[13]: /account_management/billing/usage_attribution
[14]: /synthetics/guide/explore-rum-through-synthetics/
