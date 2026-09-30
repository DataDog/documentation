---
title: Software Composition Analysis (SCA) Configuration
description: Reference documentation for Datadog Software Composition Analysis (SCA) configuration, including path, ecosystem, and package exclusion.
further_reading:
- link: /security/code_security/software_composition_analysis/
  tag: Documentation
  text: Software Composition Analysis
- link: /security/code_security/guides/configuration/
  tag: Documentation
  text: Code Security Configuration Reference
---

Datadog Software Composition Analysis (SCA) detects open source libraries and their vulnerabilities in your code. You can exclude specific paths, ecosystems, or packages from Static SCA analysis. Configure these settings under the `sca` key in the Code Security configuration, either in Datadog or in a `code-security.datadog.yaml` file.

The `sca` key was introduced in `schema-version: v1.1` and supports the following fields. Each field has its own minimum `schema-version`, so use the highest version required by the fields you configure:

| **Property** | **Type** | **Description** | **Default** | **Minimum `schema-version`** |
| --- | --- | --- | --- | --- |
| `ignore-paths` | Array | File paths or glob patterns to exclude from Static SCA analysis. | None | `v1.1` |
| `ignore-ecosystems` | Array | Ecosystems, such as `npm`, `Go`, `PyPI`, to exclude from Static SCA analysis. | None | `v1.7` |
| `ignore-packages` | Array | Packages to exclude from Static SCA analysis, regardless of version. Each entry uses the `<ecosystem>:<name>` format, such as `npm:lodash`. | None | `v1.7` |

Example:

{{< code-block lang="yaml" >}}
schema-version: v1.7
sca:
  ignore-paths:
    - "vendor/"
    - "**/node_modules/**"
    - "third_party/"
  ignore-ecosystems:
    - "npm"
  ignore-packages:
    - "Go:golang.org/x/text"
{{< /code-block >}}

<div class="alert alert-warning">Ecosystem and package names in <code>ignore-ecosystems</code> and <code>ignore-packages</code> are matched case-sensitively. For example, <code>go:golang.org/x/text</code> does not match the <code>Go</code> ecosystem, and <code>npm:Lodash</code> does not match the <code>lodash</code> package.</div>

If you run the SCA scanner directly from the CLI, the equivalent `--exclude`, `--exclude-ecosystem`, and `--exclude-package` flags are unioned with the exclusions configured above.

For more information on configuration locations, precedence, and merging, see [Code Security Configuration Reference][1].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/guides/configuration/
