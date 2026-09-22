---
title: Kerberos Authentication for Synthetic Monitoring

further_reading:
  - link: 'https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog'
    tag: 'Blog'
    text: 'Monitor your Synthetic private locations with Datadog'
  - link: 'https://www.datadoghq.com/blog/kerberos-synthetics/'
    tag: 'Blog'
    text: 'Proactively monitor Kerberos-authenticated web apps and APIs with Datadog Synthetics'
  - link: '/synthetics/guide/browser-tests-passkeys'
    tag: 'Guide'
    text: 'Learn about Passkeys in Browser Tests'
products:
- name: Browser Tests
  url: /synthetics/browser_tests/
  icon: browser
- name: API Tests
  url: /synthetics/api_tests/
  icon: api
---

{{< product-availability names="Browser Tests,API Tests" >}}

## Overview

Datadog Synthetic Monitoring enables proactive monitoring of web applications and APIs using Kerberos SSO authentication with Microsoft Active Directory. This allows continuous testing of critical user journeys and HTTP endpoints on your internal Windows sites.

## Prerequisites

- A Windows site with Kerberos authentication integrated with Active Directory (usually hosted on IIS).
- A Windows server that is domain-joined to the Active Directory.
- A domain user account with Active Directory authentication access to the Windows site.
- Synthetic Monitoring tests must run on a Windows private location that is configured to authenticate with Active Directory (managed locations do not support Kerberos authentication). For more information, see the [Windows private locations][1] prerequisites documentation.

## Installation

1. Create your [Windows private location][2] on the Windows server joined to the Active Directory domain.
2. Set up the [Synthetic Monitoring private location worker][3] to run as a Windows service.
3. Configure the private location service to use your Active Directory domain account credentials:
   - Open `services.msc`, navigate to {{< ui >}}Datadog Synthetics Worker{{< /ui >}} > {{< ui >}}Properties{{< /ui >}} > {{< ui >}}log on{{< /ui >}} > {{< ui >}}this account{{< /ui >}}, and enter your domain account credentials.
4. Configure your tests:
   - **Browser Tests**: Record your test from a browser session running directly on a domain-joined Windows host. For example, connect to your Windows private location using Remote Desktop Protocol (RDP) and record from there. Recording from a machine outside the Active Directory domain sends requests over the public internet without any Kerberos credentials attached, causing a login prompt.
   - **API Tests**: Set the {{< ui >}}Domain{{< /ui >}} field under the {{< ui >}}Kerberos{{< /ui >}} tab to the full Service Principal Name (SPN) of the target service. For example, `HTTP/targetsite.yourdomain.com`, or `HTTP/targetsite.yourdomain.com:port` if the site is registered with a non-default port.

     {{< img src="synthetics/guide/kerberos-authentication/api_test_kerberos.png" alt="API Test creation with the Advanced options expanded, highlighting the Authentication tab and Kerberos authentication type" style="width:80%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/platform/private_locations?tab=windows#prerequisites
[2]: /synthetics/platform/private_locations?tab=windows#create-your-private-location
[3]: /synthetics/platform/private_locations/?tab=windowsviagui#install-your-private-location
