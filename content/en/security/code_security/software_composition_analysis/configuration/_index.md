---
title: Software Composition Analysis (SCA) Configuration
description: Learn how to customize Datadog Software Composition Analysis for your repositories.
---

## Customize your configuration

You can exclude paths from SCA analysis. You can customize these settings locally in your repository or within the Datadog App.

The following configuration format applies to all configuration locations: org-level, repository-level, and repository-level (file).

To configure SCA analysis, the configuration file must begin with `schema-version: v1.1`, followed by a `sca` key containing the analysis configuration. The `sca` section supports the following field:

| **Property** | **Type** | **Description** | **Default** |
| --- | --- | --- | --- |
| `ignore-paths` | Array | File paths or glob patterns to exclude from SCA analysis. | None |

Example:

```yaml
schema-version: v1.1
sca:
  ignore-paths:
    - "vendor/"
    - "**/node_modules/**"
    - "third_party/"
```

For more information on configuration locations, precedence, and merging, see [Code Security configuration file][1].

[1]: /security/code_security/configuration/
