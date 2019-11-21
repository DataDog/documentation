---
title: Synthetics Settings
kind: documentation
disable_toc: true
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetics"
- link: "synthetics/api_tests"
  tag: "Documentation"
  text: "Configure an API Test"
- link: "synthetics/browser_tests"
  tag: "Documentation"
  text: "Configure a Browser Test"
- link: "synthetics/identify_synthetics_bots"
  tag: "Documentation"
  text: "Identify Synthetics Bots"
---

On the [Synthetics settings page][1], you can adjust the following settings:

- [Variables](#variables)
- [Private Locations][2]
- [Default settings](#default-settings)
    - [Default Locations](#default-locations)
    - [APM integration for Browser Tests](#apm-integration-for-browser-tests)

## Variables

Variables are global and can be used by multiple [API tests][3] and [browser tests][4]. To create a new global variable, go to the `Variables` tab of your `Settings` page, and click *New Variable* in the upper right corner of your page.  
Choose the type of variable you want to create:

{{< tabs >}} 
{{% tab "Specify Value" %}} 

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores.
2. Enter the given **Value**.
3. Decide whether to make your variable secure or not. Securing your variable means that only a subset of chosen users in your organization will be able to access them.
4. Optional - Select **Tags** to associate to your variable.
5. Optional - Enter a **Description** for your variable.

{{< img src="synthetics/settings/variable_specifyvalue.png" alt="Global Variable Specify Value" responsive="true" style="width:80%;">}}

{{% /tab %}} 

{{% tab "Create From HTTP Test" %}} 

1. Enter a **Variable Name**. Your variable name can only use uppercase letters, numbers, and underscores.
2. Pick the test you want to extract your variable from.
3. Decide whether to make your variable secure or not. Securing your variable means that only a subset of chosen users in your organization will be able to access them.
4. Optional - Select **Tags** to associate to your variable.
5. Optional - Enter a **Description** for your variable.
6. Decide whether to extract your variable from the response headers, or from the response body.
    * **Extract the value from response header**: use the full response header for your variable, or you parse it with a [regex][1].
    * **Extract the value from response body**: parse the response body of the request with a JSON path, with a [regex][1], or use the full response body.

{{< img src="synthetics/settings/variable_fromhttp.png" alt="Credential" responsive="true" style="width:80%;">}}

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

{{% /tab %}} 

{{< /tabs >}}

## Default Settings

### Default Locations

Choose the default locations for your browser and API tests details. Options include all of the available managed locations Datadog offers and the private locations that you set up for your account.

### APM integration for Browser Tests

Whitelist URLs to add APM integration headers to that URL. Datadog's APM integration headers allow Datadog to link browser tests with APM. Define which endpoints should be sent the APM headers by adding a URL into this section. 

Use `*` to whitelist wider domain names. For example, adding `https://*.datadoghq.com/*` whitelists everything on `https://datadoghq.com/`.

If the endpoint is being traced and whitelisted, your browser test results are then automatically tied to its corresponding trace.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: https://app.datadoghq.com/synthetics/settings
[2]: /synthetics/private_locations
[3]: /synthetics/api_test#use-variables
[4]: /synthetics/browser_tests#use-variables
