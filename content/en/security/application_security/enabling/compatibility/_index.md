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
| -------------------------------- | ----------------------------|----------------------------|----------------------------|----------------------------|----------------------------|----------------------------|----------------------------|
| Threat Detection <br/>  | 1.8.0 <br/>   | 2.23.0 <br/> | 3.31.1 <br/> | 1.9.0<br/>   | 1.47.0 <br/>  | 1.9.0<br/>   | 0.84.0 <br/>   |
| Threat Protection <br/> --> IP blocking <br/> --> Suspicious request blocking <br> --> User blocking   | 1.9.0<br/>    | 2.26.0 <br/> | <br/> --> 3.11.0<br/> --> 3.19.0<br/><br/> --> 3.11.0     | 1.10.0<br/>    |  <br/>--> 1.48.0<br/> --> v1.50.0<br/><br/> --> 1.48.0     |  1.11.0<br/>    | 0.86.0<br/>    |
| Risk Management <br/> --> Third-party vulnerability detection <br/> --> Custom code vulnerability detection | 1.1.4 <br/> | 2.16.0 <br/> | 2.23.0 for Node.js 12+, or 3.10.0 for Node.js 14+ <br/>| 1.5.0 <br/>| not supported<br/>| not supported<br/>| not supported<br/>|

Select your application language for details about framework compatibility and feature support.

{{< partial name="security-platform/appsec-languages.html" >}}

<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

