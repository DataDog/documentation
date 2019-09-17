---
title: Settings
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

- [Secure credentials](#secure-credentials)
- [Private locations][2]
- [Variables][3]
- [Default settings](#default-settings)
    - [Default locations](#default-locations)
    - [APM integration for Browser Tests](#apm-integration-for-browser-tests)

## Secure Credentials

Secure Credentials are a secure Username / password pair that can be used as [variables][3] for Browser Tests. These credentials are secured by Datadog so that only a subset of chosen users in your organization can access them. To create a new Secure Credential

1. Click on *New Secure Credential* in the upper right corner of the Setting page.
2. Enter a **Credential Name**.
3. Enter the given  `Username`/`Password`.
4. Select **tags** to associate to your Credential.
5. Optional - Enter a Description for your Credential.

{{< img src="synthetics/settings/credential.png" alt="Credential" responsive="true" style="width:80%;">}}

## Default settings

### Default locations

Decide on the locations you want your Browser and API tests details to have on by default. Options include all of the available Managed Locations Datadog offers and the Private Locations that you set up for your account.

### APM integration for Browser Tests

Whitelist URLs to add APM integration headers to that URL. Datadog's APM integration headers allow Datadog to link Browser tests with APM. Define which endpoints should be sent the APM headers by adding a URL into this section. 

Use `*` to whitelist wider domain names. For example, adding `https://*.datadoghq.com/*` whitelists everything on `https://datadoghq.com/`.

If the endpoint is being traced and whitelisted, your browser test results are then automatically tied to its corresponding trace.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: https://app.datadoghq.com/synthetics/settings
[2]: /synthetics/private_locations
[3]: /synthetics/browser_tests/#variable
