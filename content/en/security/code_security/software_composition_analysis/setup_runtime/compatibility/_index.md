---
title: Compatibility Requirements
type: multi-code-lang
aliases:
- /security/application_security/software_composition_analysis/setup/compatibility/
---

The following capabilities are supported relative to each language's tracing library:

| Code Security Capability                        | Java    | .NET     | Node.js                                          | Python        | Go              | Ruby          | PHP           |
|------------------------------------------------|---------|----------|--------------------------------------------------|---------------|-----------------|---------------|---------------|
| Runtime Software Composition Analysis (SCA)    | 1.1.4   | 2.16.0   | 4.0.0                                            | 1.5.0         | 1.49.0          | 1.11.0        | 0.90.0        |

**Note**: **Static Software Composition Analysis (SCA)** and **Static Code Analysis (SAST)** capabilities do not require Datadog's tracing library. Therefore, the requirements listed below do not apply to these two Code Security capabilities.

Select your application language for details about framework compatibility and feature support.

{{< partial name="security-platform/appsec-languages-sca.html" >}}

<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

