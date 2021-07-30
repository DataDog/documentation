---
title: Synthetic Monitoring Settings
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
- link: "/synthetics/api_tests/"
  tag: "Documentation"
  text: "Configure an API Test"
- link: "/synthetics/browser_tests/"
  tag: "Documentation"
  text: "Configure a Browser Test"
- link: "/synthetics/identify_synthetics_bots/"
  tag: "Documentation"
  text: "Identify Synthetic Bots"
---

On the [Synthetic Monitoring Settings page][1], you can adjust the following settings:

* [Global Variables](#global-variables)
* [Private Locations][2]
* [Default settings](#default-settings)
  * [Default Locations](#default-locations)
  * [APM integration for Browser Tests](#apm-integration-for-browser-tests)

## Global variables

Global variables can be used in [single][5] and [multistep API tests][link] as well as [browser tests][6] of your test suite. To create a global variable, go to the [Global Variables][7] tab of the **Settings** page, and click **New Global Variable** in the upper right corner.

Choose the type of variable you want to create:

{{< tabs >}}
{{% tab "Specify Value" %}}

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores.
2. Enter a **Description** for your variable (optional).
3. Select **Tags** to associate with your variable (optional).
4. Enter the **Value** you want to assign to your variable.
5. Enable obfuscation of your variable to hide its value on test results (optional).

{{< img src="synthetics/settings/variable_value.png" alt="Global Variable Specify Value"  style="width:100%;">}}

[1]: /account_management/rbac/permissions/
{{% /tab %}}

{{% tab "Create From HTTP Test" %}}

You can create variables from your existing [HTTP tests][1] by parsing their associated response headers and body:

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores.
2. Enter a **Description** for your variable (optional).
3. Select **Tags** to associate with your variable (optional).
4. Pick the **[HTTP test][1]** you want to extract your variable from.
5. Enable obfuscation of your variable to hide its value on test results (optional).
6. Decide whether to extract your variable from the response headers or from the response body.
    * Extract the value from **Response Header**: use the full response header for your variable or parse it with a [regex][2].
    * Extract the value from **Response Body**: parse the response body of the request with a [jsonpath][3], a [regex][2], or use the full response body.

{{< img src="synthetics/settings/variable_fromhttp.png" alt="Variable from http"  style="width:100%;">}}

**Note:** Variable values are updated whenever the test they are extracted from runs.

[4]:/account_management/rbac/permissions/

[1]: /synthetics/api_tests/?tab=httptest
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[3]: https://restfulapi.net/json-jsonpath/
{{% /tab %}}

{{< /tabs >}}

### Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][3] can access the Synthetic Monitoring **Global Variables** page. You can get access to the **Global Variables** page by having your user upgraded to one of these two [default roles][link]. 

If you have access to the custom role feature (link to https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication#custom-roles), have your user added to a custom role that includes permissions for global variables (`synthetics_global_variable_read` and `synthetics_global_variable_write` permissions). 

#### Restrict access

<div class="alert alert-warning">
RBAC restrict access to global variables is in beta. To request access, contact <a href="https://docs.datadoghq.com/help/">Datadog support</a>.</div>

This features allows you to restrict access to individual global variable based on roles in your org. This results in an additional **Permissions settings** step in the global variable creation flow where you can choose which roles in addition to your user can read and write your global variable.

## Default settings

### Default locations

Choose the default locations for your [API test][10], [multistep API test ][11], or [browser test][12] details. Options include all of the available managed locations Datadog offers and the private locations you set up for your account.

### APM integration for browser tests

Allow URLs to add APM integration headers to that URL. Datadog's APM integration headers allow Datadog to link browser tests with APM. 

Define which endpoints should be sent the APM headers by adding a URL into this section.

Use `*` to allow wider domain names. For example, adding `https://*.datadoghq.com/*` allows everything on `https://datadoghq.com/`.

If the endpoint is being traced and allowed, your browser test results are automatically tied to its corresponding trace.

### Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][3] can access the Synthetic Monitoring **Default Settings** page. You can get access to the **Default Settings** page by having your user upgraded to one of these two [default roles][link]. 

If you have access to the custom role feature (link to https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication#custom-roles), have your user added to a custom role that includes permissions for default settings (`synthetics_default_settings_read` and `synthetics_default_settings_write` permissions). 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings
[2]: /synthetics/private_locations/
[3]: /account_management/users/default_roles/
[4]: /account_management/rbac/permissions/
[5]: /synthetics/api_tests/#use-global-variables
[6]: /synthetics/browser_tests/#use-global-variables
[7]: https://app.datadoghq.com/synthetics/settings/variables
[8]: /help/
[9]: /synthetics/api_tests/
[10]: /synthetics/multistep/
[11]: /synthetics/browser_tests
