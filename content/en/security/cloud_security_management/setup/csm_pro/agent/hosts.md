---
title: Enabling CSM Pro on Hosts
kind: documentation
code_lang: hosts
type: multi-code-lang
code_lang_weight: 70 # a number that represents relative weight. 
---

The following instructions enable container image metadata collection and [Software Bill of Materials (SBOM)][10] collection in the Datadog Agent for CSM Vulnerabilities. This allows you to scan the libraries in container images to detect vulnerabilities. Vulnerabilities are evaluated and and scanned against your containers every hour.

Add the following to your `datadog.yaml` configuration file:

```yaml
sbom:
  enabled: true
  container_image:
    enabled: true
container_image:
  enabled: true
```

[10]: https://www.cisa.gov/sbom