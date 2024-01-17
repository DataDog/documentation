---
title: Enabling CSM Pro on Hosts
kind: documentation
code_lang: hosts
type: multi-code-lang
code_lang_weight: 70 # a number that represents relative weight. 
---

Add the following to your `datadog.yaml` configuration file:

```yaml
sbom:
  enabled: true
  container_image:
    enabled: true
container_image:
  enabled: true
```