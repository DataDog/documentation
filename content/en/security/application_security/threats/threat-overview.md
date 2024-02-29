---
title: Threat Overview
kind: documentation
aliases:  
---

{{< img src="security/application_security/threats/appsec-threat-overview-page-top.png" alt="Screenshot of the ASM Threat Overview page"  >}}

## Introduction

The ASM Threats Overview provides an at a glance view of your application and API posture, highlighting trends, service exposure, attack traffic, and the impact on business logic. Users can quickly pivot from widgets to related traces.

Each section of Threats Overview focuses on a different aspect of security with supporting information.

## Sections

**Attack Surface Area**: This section provides insights into the exposed services, the tools attackers are using, and the commercial scanners that identify potential vulnerabilities.

**Attack Traffic**: These graphs identify the classification of attacks, such as SSRF, LFI, SQL and command injection. They allow users to identify spikes in malicious traffic and patterns.

**Business Logic**: This section focuses on the application-specific operations, such as account takeover attempts and custom business logic metrics, to help you understand trending attacks related to user accounts or fraud.

**Geographic Overview**: A global heatmap indicating the sources of attack traffic, providing a visual representation of threats by region.

## Best Practices

1. Review trends and adopt a corresponding protection policy to meet your posture needs.
2. Regularly review the Exposed Services widget to ensure only intended services are accessible and that they have a protection policy that meets your risk profile.
3. Block attack tools and ensure that customer scanners are part of an authorized vulnerability management program.
4. Monitor business logic for changes in detection profiles related to distributed credential stuffing campaigns or risky payment activity.
5. Use the geographic overview to compare the attack traffic sources with your expected customer sources.
6. Use the [linked Powerpacks](#using-the-powerpacks) to enhance your own Dashboards with the most relevant information.

### Using the Powerpacks

When adding a Widget to a [new dashboard][1] in Datadog, choose the **Powerpacks** section in the right-hand drawer. Filter on `tag:threat_overview` or type *Threat Overview* in the search box.
 
Each section in the Threat Overview page corresponds to a dedicated Powerpack.

{{< img src="security/application_security/threats/appsec-threat-overview-powerpacks.png" alt="Screenshot of the new dashboard page with the Powerpacks drawer open, filtering on tag:threat_overview"  >}}

[1]: /dashboards/