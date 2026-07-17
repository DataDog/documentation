---
title: Software Composition Analysis (SCA) Configuration
description: Reference documentation for Datadog Software Composition Analysis (SCA) configuration, including path exclusion.
further_reading:
- link: /security/code_security/software_composition_analysis/
  tag: Documentation
  text: Software Composition Analysis
- link: /security/code_security/guides/configuration/
  tag: Documentation
  text: Code Security Configuration Reference
---

Datadog Software Composition Analysis (SCA) detects open source libraries and their vulnerabilities in your code. You can exclude specific paths from Static SCA analysis. Configure this setting under the `sca` key in the Code Security configuration, either in Datadog or in a `code-security.datadog.yaml` file.

The `sca` key requires `schema-version: v1.1` and supports the following field:

| **Property** | **Type** | **Description** | **Default** |
| --- | --- | --- | --- |
| `ignore-paths` | Array | File paths or glob patterns to exclude from Static SCA analysis. | None |

Example:

```yaml
schema-version: v1.1
sca:
  ignore-paths:
    - "vendor/"
    - "**/node_modules/**"
    - "third_party/"
```

For more information on configuration locations, precedence, and merging, see [Code Security Configuration Reference][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/guides/configuration/
