---
title: Enabling CSM Pro on Kubernetes
kind: documentation
code_lang: kubernetes
type: multi-code-lang
code_lang_weight: 60 # a number that represents relative weight. 
---

The following instructions enable container image metadata collection and [Software Bill of Materials (SBOM)][1] collection in the Datadog Agent for [CSM Vulnerabilities][2]. This allows you to scan the libraries in container images to detect vulnerabilities. Vulnerabilities are evaluated and and scanned against your containers every hour.

{{< tabs >}}

{{% tab "Operator" %}}

1. Add the following to the `spec` section of the `values.yaml` file:

    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      features:
        # ...
        sbom:
          enabled: true
          # Image collection is enabled by default with Datadog Operator version `>= 1.3.0`.
          containerImage:
            enabled: true
    ```

2. Restart the Agent.

{{% /tab %}}

{{% tab "Helm" %}}

1. Add the following to the `datadog` section of the `values.yaml` file:

    ```yaml
    datadog:
      # Image collection is enabled by default with Datadog Helm version `>= 3.46.0`.
      containerImageCollection:
        enabled: true
      sbom:
        containerImage:
          enabled: true
    ```

2. Restart the Agent.

{{% /tab %}}

{{< /tabs >}}

[1]: https://www.cisa.gov/sbom
[2]: /security/vulnerabilities