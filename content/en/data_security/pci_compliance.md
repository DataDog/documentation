---
title: PCI DSS Compliance
further_reading:
- link: "https://trust.datadoghq.com/"
  tag: "Datadog Trust Center"
  text: "Learn about Datadog's security posture and review security documentation"
---

## Overview

The Payment Card Industry (PCI) Data Security Standard (DSS) has rigorous monitoring and data security requirements for all merchants, service providers, and financial institutions. To meet these requirements, organizations often separate PCI-regulated data (such as cardholder data) and non-regulated data into different applications for monitoring and compliance purposes.

**Datadog's tools and policies comply with PCI v4.0**. To understand the full scope of Datadog's environment and how it relates to customer responsibilities under the relevant PCI-DSS controls, download the Customer Responsibility Matrix and the Attestation of Compliance (AoC) from the [Datadog Trust Center][1].

Datadog's Attestation of Compliance (AoC) reflects the tools and policies we have in place to maintain a Connected PCI environment as a service provider. The Datadog platform supports connections to cardholder data environments (CDE) as a Connected PCI environment, but does not serve as a CDE itself for storing, processing, or transmitting cardholder data (CHD).
It is your responsibility to prevent any CHD from entering the Datadog platform. 

## Recommended tools for PCI compliance

To help maintain PCI compliance, **Datadog strongly recommends** the use of the following tools and process:
- [**Sensitive Data Scanner**][2]: discover, classify, and redact sensitive cardholder data
- [**Audit Trail**][3]: search and analyze detailed audit events for up to 90 days for long-term retention and archiving
- [**File Integrity Monitoring**][4]: watch for changes to key files and directories
- [**Cloud Security Management**][5]: track conformance to requirements of industry benchmarks and other controls

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://trust.datadoghq.com/?itemUid=53e1508c-665e-45a8-9ce0-03fdf9ae1efb&source=click
[2]: /security/sensitive_data_scanner/
[3]: /account_management/audit_trail/
[4]: /security/workload_protection/
[5]: /security/cloud_security_management/#track-your-organizations-health