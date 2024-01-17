---
title: Enabling CSM Pro on Kubernetes
kind: documentation
code_lang: kubernetes
type: multi-code-lang
code_lang_weight: 60 # a number that represents relative weight. 
---

The following instructions enables container image metadata collection and [Software Bill of Materials (SBOM)][10] collection in the Datadog Agent for CSM Vulnerabilities. This allows you to scan the libraries in container images to detect vulnerabilities. Vulnerabilities are evaluated and and scanned against your containers every hour.

{{< tabs >}}

{{% tab "Operator" %}}

Image collection is enabled by default with Datadog Operator version `>= 1.3.0`.</br>
Or, add the following to the spec section of your `values.yaml` file:

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
      containerImage:
        enabled: true
```

{{% /tab %}}

{{% tab "Helm" %}}

If you are using helm version `>= 3.46.0`, image collection is [enabled by default][1].</br>
Or, add the following to your `values.yaml` helm configuration file:

```yaml
datadog:
  containerImageCollection:
    enabled: true
  sbom:
    containerImage:
      enabled: true
```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L651
{{% /tab %}}

{{< /tabs >}}

[10]: https://www.cisa.gov/sbom