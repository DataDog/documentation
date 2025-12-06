---
title: Kerberos Authentication for Synthetic Monitoring
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides >
  Kerberos Authentication for Synthetic Monitoring
sourceUrl: https://docs.datadoghq.com/synthetics/guide/kerberos-authentication/index.html
---

# Kerberos Authentication for Synthetic Monitoring
Available for:
{% icon name="icon-browser" /%}
 Browser Tests | 
{% icon name="icon-api" /%}
 API Tests 
## Overview{% #overview %}

Datadog Synthetic Monitoring enables proactive monitoring of web applications and APIs using Kerberos SSO authentication with Microsoft Active Directory. This allows continuous testing of critical user journeys and HTTP endpoints on your internal Windows sites.

## Prerequisites{% #prerequisites %}

- A Windows site with Kerberos authentication integrated with Active Directory (usually hosted on IIS).
- A Windows server that is domain-joined to the Active Directory.
- A domain user account with Active Directory authentication access to the Windows site.
- Synthetic Monitoring tests must run on a Windows private location that is configured to authenticate with Active Directory. For more information, see the [Windows private locations](https://docs.datadoghq.com/synthetics/platform/private_locations?tab=windows#prerequisites) prerequisites documentation.

## Installation{% #installation %}

1. Create your [Windows private location](https://docs.datadoghq.com/synthetics/platform/private_locations?tab=windows#create-your-private-location) on the Windows server joined to the Active Directory domain.
1. Set up the [Synthetic Monitoring private location worker](https://docs.datadoghq.com/synthetics/platform/private_locations/?tab=windowsviagui#install-your-private-location) to run as a Windows service.
1. Configure the private location service to use your Active Directory domain account credentials:
   - Open `services.msc`, navigate to **Datadog Synthetics Worker** > **Properties** > **log on** > **this account**, and enter your domain account credentials.
1. Configure your tests to run from the Windows private location (managed locations do not support Kerberos authentication).
*No further configuration is necessary for Browser Tests.*
Optionally, for API tests, you must also set the Domain field to your Active Directory domain name under the **Kerberos** tab. Navigate to **Create/Edit API Test** > **Define Request** > **Advanced Options** > **Authentication**.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/kerberos-authentication/api_test_kerberos.8e5f388b0979e30a62dc30cc1aacb129.png?auto=format"
   alt="API Test creation with the Advanced options expanded, highlighting the Authentication tab and Kerberos authentication type" /%}

## Further Reading{% #further-reading %}

- [Monitor your Synthetic private locations with Datadog](https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog)
- [Proactively monitor Kerberos-authenticated web apps and APIs with Datadog Synthetics](https://www.datadoghq.com/blog/kerberos-synthetics/)
- [Learn about Passkeys in Browser Tests](https://docs.datadoghq.com/synthetics/guide/browser-tests-passkeys)
