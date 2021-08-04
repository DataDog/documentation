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
  text: "Time-based one time passwords (TOTPs) for multi-factor authentication (MFA)"
---

On the [Synthetic Monitoring settings page][1], you can adjust the following settings:

* [Global Variables](#global-variables)
* [Private Locations][2]
* [Default settings](#default-settings)
  * [Default Locations](#default-locations)
  * [APM integration for Browser Tests](#apm-integration-for-browser-tests)

Only [Admin and Standard users][3] can access Synthetic Monitoring `Settings` page.

## Global variables

Variables are global and can be used by multiple [API tests][4] and [browser tests][5]. To create a new global variable, go to the [Global Variables][6] tab of your **Settings** page, and click **New Global Variable** in the upper right corner of your page.
Choose the type of variable you want to create:

{{< tabs >}}
{{% tab "Specify Value" %}}

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores.
2. Enter a **Description** for your variable (optional).
3. Select **Tags** to associate with your variable (optional).
4. Enter the **Value** you want to assign to your variable.
3. Decide whether to make your variable **Secure**. Securing your variable obfuscates its value for all users on your test results.

{{< img src="synthetics/settings/variable_value.png" alt="Global Variable Specify Value"  style="width:80%;">}}

{{% /tab %}}

{{% tab "Create From HTTP Test" %}}

You can create variables from your existing [HTTP tests][1] by parsing their associated response headers and body:

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores.
2. Enter a **Description** for your variable (optional).
3. Select **Tags** to associate with your variable (optional).
4. Pick the **[HTTP test][1]** you want to extract your variable from.
6. Decide whether to make your variable **Secure**. Securing your variable obfuscates its value for all users on your test results.
6. Decide whether to extract your variable from the response headers, or from the response body.
    * Extract the value from **Response Header**: use the full response header for your variable, or parse it with a [regex][2].
    * Extract the value from **Response Body**: parse the response body of the request with a [jsonpath][3], a [regex][2], or use the full response body.

{{< img src="synthetics/settings/variable_fromhttp.png" alt="Variable from http"  style="width:80%;">}}

Note: Variable values are updated whenever the test they are extracted from runs.

[1]: /synthetics/api_tests/?tab=httptest
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[3]: https://restfulapi.net/json-jsonpath/
{{% /tab %}}

{{% tab "MFA Token" %}}  
 
In the **Global Variables** tab of your **Settings** page, click **Create Global Variable** and enter a secret key or upload a QR code from your authentication provider:

1. In **Choose variable type**, select **MFA Token**.
2. In **Define Variable**, enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores.
3. Enter a **Description** for your variable (optional).
4. Select **Tags** to associate with your variable (optional).
5. Enter the **Secret Key** to your variable or upload a QR code image.
6. Click **+ Generate** to create an OTP. You can copy the generated OTP with the **Copy** icon.
7. In **Permissions settings**, restrict access to your variable based on roles in your org. For more information about roles, see the [RBAC documentation][1].

{{< img src="synthetics/settings/synthetic-mfa-setup.png" alt="Create a new MFA token" border="true" popup="true">}}

[1]: /account_management/rbac/?tab=datadogapplication#custom-roles

{{% /tab %}}

{{< /tabs >}}

## Default settings

### Default locations

Choose the default locations for your browser and API tests details. Options include all of the available managed locations Datadog offers and the private locations that you set up for your account.

### APM integration for browser tests

Allow URLs to add APM integration headers to that URL. Datadog's APM integration headers allow Datadog to link browser tests with APM. Define which endpoints should be sent the APM headers by adding a URL into this section.

Use `*` to allow wider domain names. For example, adding `https://*.datadoghq.com/*` allows everything on `https://datadoghq.com/`.

If the endpoint is being traced and allowed, your browser test results are then automatically tied to its corresponding trace.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/settings
[2]: /synthetics/private_locations/
[3]: /account_management/users/default_roles/
[4]: /synthetics/api_tests/#use-global-variables
[5]: /synthetics/browser_tests/#use-global-variables
[6]: https://app.datadoghq.com/synthetics/settings/variables
