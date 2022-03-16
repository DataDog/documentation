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
- link: "/synthetics/guide/browser-tests-totp"
  tag: "Documentation"
  text: "TOTPs For Multi-Factor Authentication (MFA) in Browser Test"
- link: "https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable"
  tag: "Terraform"
  text: "Create and manage Synthetic Global Variables with Terraform"
---

On the [Synthetic Monitoring Settings page][1], you can adjust the following settings:

* [Global Variables](#global-variables)
* [Private Locations][2]
* [Default Settings](#default-settings)

## Global variables

Global variables are variables that are accessible from all your Synthetic tests. They can be used in all [single][3] and [multistep API tests][4] as well as [browser tests][5] of your test suite. To create a global variable, go to the [Global Variables][6] tab in the **Settings** page, and click **New Global Variable** on the upper right corner.

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

{{% tab "Create From HTTP Test" %}}

You can create variables from your existing [HTTP tests][1] by parsing their associated response headers and body:

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores.
2. Enter a **Description** for your variable (optional).
3. Select **Tags** to associate with your variable (optional).
4. Pick the **[HTTP test][1]** you want to extract your variable from.
5. Enable obfuscation of your variable to hide its value on test results (optional).
6. Decide whether to extract your variable from the response headers or from the response body.
    * Extract the value from **Response Header**: use the full response header for your variable or parse it with a [`regex`][2].
    * Extract the value from **Response Body**: parse the response body of the request with a [`regex`][2], a [`jsonpath`][3], an [`xpath`][4], or use the full response body.

{{< img src="synthetics/settings/variable_fromhttp_3.png" alt="Variable from HTTP Test" style="width:80%;">}}

**Note:** Variable values are updated whenever the test they are extracted from runs.

[1]: /synthetics/api_tests/http_tests/
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[3]: https://restfulapi.net/json-jsonpath/
[4]: https://www.w3schools.com/xml/xpath_syntax.asp
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

Once created, global variables can be used in all Synthetic tests by typing `{{` in the field of interest and selecting your global variable. For more information, see the [HTTP test][7], [Multistep API test][8], [Browser test configuration][9], and [Steps documentation][10].

### Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][11] can access the Synthetic Monitoring **Global Variables** page. You can get access to the **Global Variables** page by having your user upgraded to one of those two [default roles][11]. 

If you are using the [custom role feature][12], add your user to any custom role that includes `synthetics_global_variable_read` and `synthetics_global_variable_write` permissions. 

#### Restrict access

Access restriction is available for customers using [custom roles][13] on their accounts.

You can restrict access to a global variable based on the roles in your organization. When creating a global variable, choose which roles (in addition to your user) can read and write your global variable in **Permissions settings**. 

{{< img src="synthetics/settings/restrict_access.png" alt="Restrict access to a global variable" style="width:100%;" >}}

## Default settings

### Default locations

Choose the default locations for your [API test][3], [multistep API test][4], or [browser test][5] details. 

Your options include all of the available managed locations Datadog offers and the private locations you set up for your account.

### APM integration for browser tests

Allow URLs to add APM integration headers to that URL. Datadog's APM integration headers allow Datadog to link browser tests with APM. 

Define which endpoints should be sent the APM headers by adding a URL into this section.

Use `*` to allow wider domain names. For example, adding `https://*.datadoghq.com/*` allows everything on `https://datadoghq.com/`.

If the endpoint is being traced and is allowed, your browser test results are automatically tied to its corresponding trace.

### Tag enforcement

<div class="alert alert-warning">
Tag enforcement is an advanced feature included in the Enterprise plan. For all other plans, contact your account representative or <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> to request this feature.
</div>

Allows you to enforce selected tags on Synthetics tests. You can break down cost and usage by services, applications, or teams.

To enable tag enforcement, click **Enforce tags for usage attributions on all tests**.  

{{< img src="synthetics/settings/tag_enforcement.png" alt="Enforce tags for usage attributions on all tests" style="width:100%;">}}

For more information, see [Usage Attribution][14].

### Permissions

By default, only users with the [Datadog Admin and Datadog Standard roles][11] can access the Synthetic Monitoring **Default Settings** page. To get access to the **Default Settings** page, upgrade your user to one of those two [default roles][11]. 

If you are using the [custom role feature][12], add your user to any custom role that includes `synthetics_default_settings_read` and `synthetics_default_settings_write` permissions. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings
[2]: /synthetics/private_locations/
[3]: /synthetics/api_tests/
[4]: /synthetics/multistep/
[5]: /synthetics/browser_tests/
[6]: https://app.datadoghq.com/synthetics/settings/variables
[7]: /synthetics/api_tests/http_tests?tab=requestoptions#use-variables
[8]: /synthetics/multistep?tab=requestoptions#use-variables
[9]: /synthetics/browser_tests/?tab=requestoptions#use-global-variables
[10]: /synthetics/browser_tests/actions#using-variables
[11]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[12]: /account_management/rbac/?tab=datadogapplication#custom-role
[13]: /account_management/rbac/#create-a-custom-role
[14]: /account_management/billing/usage_attribution
