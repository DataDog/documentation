---
title: Enabling CSM Pro on Linux
code_lang: linux
type: multi-code-lang
code_lang_weight: 75 # a number that represents relative weight. 
---

Use the following instructions to enable container image metadata collection and [Software Bill of Materials (SBOM)][1] collection in the Datadog Agent for [CSM Vulnerabilities][2]. This allows you to scan the libraries in container images to detect vulnerabilities. Vulnerabilities are evaluated and and scanned against your containers every hour.

To learn more about the supported deployment types for each CSM feature, see [Setting Up Cloud Security Management][3].

1. Add the following to the `datadog.yaml` configuration file:

    ```yaml
    sbom:
      enabled: true
      container_image:
        enabled: true
    container_image:
      enabled: true
    ```

2. Restart the Agent.

[1]: https://www.cisa.gov/sbom
[2]: /security/cloud_security_management/vulnerabilities
[3]: /security/cloud_security_management/setup#supported-deployment-types-and-features