---
title: Getting Started with Datadog Sites
kind: documentation
further_reading:
- link: "https://learn.datadoghq.com/courses/dashboards-slos"
  tag: Learning Center
  text: Create Business-Critical Insights Using Dashboards and SLOs
- link: /agent/configuration/dual-shipping/
  tag: Guide
  text: Dual Shipping
algolia:
  tags: [site,datadog site]
---

## Overview

Datadog offers different sites throughout the world. Each site is completely independent, and you cannot share data across sites. Each site gives you benefits (for example, government security regulations) or allows you to store your data in specific locations around the world.

## Shared responsibility

The responsibility of keeping user data secure is shared between Datadog and developers who leverage Datadog products.

Datadog is responsible for:
- Providing a reliable product that handles data securely when it is transmitted to and stored on the Datadog platform.
- Ensuring that security issues are identified in accordance with internal policies.

Developers are responsible for:
- Leveraging configuration values and data privacy options as provided by Datadog.
- Ensuring the integrity of code within their environments.

## Access the Datadog site

You can identify which site you are on by matching your Datadog website URL to the site URL in the table below.

{{< img src="getting_started/site/site.png" alt="The site URL in your browser tab" style="width:40%" >}}

| Site    | Site URL                    | Site Parameter      | Location |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | US       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | US       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | US       |
| EU1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | EU (Germany) |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | US       |
| AP1     | `https://ap1.datadoghq.com` | `ap1.datadoghq.com` | Japan |

**Note**: To send data to more than one destination through multiple endpoints, see the [Dual Shipping][2] guide.

## SDK domains

See [Supported endpoints for SDK domains][3].

## Navigate the Datadog documentation by site

Different Datadog sites may support different functionalities depending on the instance's security requirements. Therefore, documentation may vary between sites. You can use the site selector dropdown menu on the right side of any page in the Datadog documentation to select the Datadog site you want to see information about.

{{< img src="getting_started/site/site-selector-gs-with-tags.png" alt="The site selector dropdown menu on the right hand side of the Documentation site" style="width:100%" >}}

For example, to see the documentation for the Datadog for Government site, select **US1-FED**.

{{% site-region region="gov" %}}

## Access the Datadog for Government site

The Datadog for Government site (US1-FED) is meant to allow US government agencies and partners to monitor their applications and infrastructure. For information about the Datadog for Government site's security and compliance controls and frameworks, as well as how it supports FedRAMP, see the [Security page][1].

[1]: https://www.datadoghq.com/security/
{{% /site-region %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: /agent/configuration/dual-shipping/
[3]: /real_user_monitoring/#supported-endpoints-for-sdk-domains
