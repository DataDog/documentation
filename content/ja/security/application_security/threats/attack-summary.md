---
aliases:
- /ja/security/application_security/threats/threat-overview
title: Attack Summary
---

{{< img src="security/application_security/threats/appsec-threat-overview-page-top.png" alt="Screenshot of the ASM Attack Summary page"  >}}

The ASM **Attack Summary** provides a quick view of your application and API posture. It highlights trends, service exposure, attack traffic, and the impact on business logic. You can pivot from widgets to their related traces.

Each section of **Attack Summary** focuses on a different aspect of security with supporting information.

## Sections

Attack Surface Area
: This section provides insights into the exposed services, the tools attackers are using, and the commercial scanners that identify potential vulnerabilities.

Attack Traffic
: These graphs identify the classification of attacks, such as SSRF, LFI, SQL and command injection. They allow users to identify spikes in malicious traffic and patterns.

Business Logic
: This section focuses on fraud and business logic abuse such as account takeover attempts or any custom business logic events tracked by your application.

Attack Traffic Sources
: A global heatmap indicating the sources of attack traffic, providing a visual representation of threats by region.

## ベストプラクティス

1. Review trends and adopt a protection policy that meets your posture needs.
2. Regularly review the **Exposed Services** widget in **Attack Surface Area** to ensure only the correct services are accessible and have a protection policy that meets your risk profile.
3. Block attack tools and ensure that customer scanners are part of an authorized vulnerability management program.
4. Monitor business logic for spikes in credential stuffing attacks or risky payment activity.
5. Use **Attack Traffic Sources** to compare the attack traffic sources with your expected customer locations.
6. Use [Powerpacks](#using-powerpacks) to enhance your dashboards with the most relevant information.

### Using powerpacks

When adding a widget to a [new dashboard][1] in Datadog, choose the **Powerpacks** section in the tray. Filter on `tag:attack_summary` or type `Attack Summary` in the search box.

Each section in the **Attack Summary** page corresponds to a dedicated powerpack.

[1]: https://app.datadoghq.com/dashboard/lists