---
title: Compatibility Requirements
type: multi-code-lang
aliases:
  - /security/application_security/threats/setup/compatibility/
further_reading:
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting App and API Protection"
- link: "/security/application_security/how-it-works/"
  tag: "Documentation"
  text: "How App and API Protection Works in Datadog"
---

The following AAP capabilities are supported relative to each language's tracing library:

| AAP capability                         | Java    | .NET     | Node.js                                          | Python        | Go              | Ruby          | PHP           |
|----------------------------------------|---------|----------|--------------------------------------------------|---------------|-----------------|---------------|---------------|
| Threat Detection                       | 1.8.0   | 2.23.0   | 4.0.0                                            | 1.9.0         | 1.47.0          | 1.9.0         | 0.84.0        |
| API Security                           | 1.31.0  | 2.42.0   | 4.30.0 for Node.js 16+, or 5.6.0 for Node.js 18+ | 2.6.0         | 1.59.0          | 2.4.0        | 0.98.0        |
| Threat Protection                      | 1.9.0   | 2.26.0   | 4.0.0                                            | 1.10.0        | v1.50.0         | 1.11.0        | 0.86.0        |
| Customize response to blocked requests | 1.11.0  | 2.27.0   | 4.1.0                                            | 1.19.0        | v1.53.0         | 1.15.0        | 0.86.0        |
| Automatic user activity event tracking | 1.38.0  | 2.32.0   | support pending                                            | 2.11.0        | support pending   | support pending        | support pending        |
| Automatic user activity event tracking (deprecated modes) | 1.20.0  | 2.32.0   | 4.4.0                                            | 1.17.0        | not supported   | 1.14.0        | 0.89.0        |

Select your application language for details about framework compatibility and feature support.


{{< partial name="security-platform/appsec-languages.html" >}}

<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

