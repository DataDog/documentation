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

## Secure Credential

Secure Credentials are a secure Username / password pair that can be used as [variables][1] for Browser Tests. These credentials are secured by Datadog so that only a subset of chosen users in your organization can access them. To create a new Secure Crendential

1. Click on *New Secure Crendential* in the upper right corner of the Setting page.
2. Enter a **Crendential Name**.
3. Enter the given  `Username`/`Password`.
4. Select **tags** to associate to your Credential.
5. Optional - Enter a Description for your Credential.

{{< img src="synthetics/settings/credential.png" alt="Credential" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /synthetics/browser_tests/#variable
