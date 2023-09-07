---
title: Compatibility Requirements
kind: documentation
type: multi-code-lang
further_reading:
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting Application Security Management"
- link: "/security/application_security/how-appsec-works/"
  tag: "Documentation"
  text: "How Application Security Management Works in Datadog"
---

The following ASM capabilities are supported relative to each language's tracing library:


| ASM capability                   | Java | .NET | Node.js | Python | Go | Ruby | PHP |
| -------------------------------- | ----------------------------------|----------------------------|----------------------------|----------------------------|----------------------------|----------------------------|----------------------------|
| Threat Detection| 1.8.0 | 2.23.0 | 3.13.1 | 1.9.0   | 1.47.0  | 1.9.0| 0.84.0 |
| Threat Protection | 1.9.0 | 2.26.0 | 3.19.0| 1.10.0  |  v1.50.0|  1.11.0    | 0.86.0   |
| Vulnerability Management for Open Source Software (OSS)  | 1.1.4 | 2.16.0 |2.23.0 for Node.js 12+, or 3.10.0 for Node.js 14+ | 1.5.0 | 1.49.0 | 1.11.0 | not supported|
| Vulnerability Management for Code-level (beta)   |1.15.0| private beta | 2.32.0 for NodeJS 12+, or 3.19.0 for NodeJS 14+ | private beta | not supported<br/>| not supported| not supported|
| Automatic user activity event tracking | x | x | x | x | x | 1.14.0 | x |


Select your application language for details about framework compatibility and feature support.

{{< partial name="security-platform/appsec-languages.html" >}}

<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

