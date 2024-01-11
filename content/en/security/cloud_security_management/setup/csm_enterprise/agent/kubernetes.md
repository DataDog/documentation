---
title: Enabling CSM Enterprise on Kubernetes
kind: documentation
code_lang: kubernetes
type: multi-code-lang
code_lang_weight: 60 # a number that represents relative weight. 
---

{{< tabs >}}

{{% tab "Operator" %}}

1. Add the following to the `spec` section of the `values.yaml` file:

    ```yaml
    # values.yaml file
    spec:
      features:
        remoteConfiguration:
          enabled: true
        cws:
          enabled: true
        cspm:
          enabled: true
          hostBenchmarks:
            enabled: true
    ```

2. Restart the Agent.

[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}

{{% tab "Helm" %}}

1. Add the following to the `datadog` section of the `values.yaml` file:

    ```yaml
    # values.yaml file
    datadog:
      remoteConfiguration:
        enabled: true
      securityAgent:
        runtime:
          enabled: true
        compliance:
          enabled: true
          host_benchmarks:
            enabled: true
    ```
2. Restart the Agent.

{{% /tab %}}

{{% tab "Daemonset" %}}

Add the following settings to the `env` section of `security-agent` and `system-probe` in the `daemonset.yaml` file:

```bash
  # Source: datadog/templates/daemonset.yaml
  apiVersion:app/1
  kind: DaemonSet
  [...]
  spec:
  [...]
  spec:
      [...]
        containers:
        [...]
          - name: agent
            [...]
            env:
              - name: DD_REMOTE_CONFIGURATION_ENABLED
                value: "true"
          - name: system-probe
            [...]
            env:
              - name: DD_RUNTIME_SECURITY_CONFIG_ENABLED
                value: "true"
              - name: DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED
                value: "true"
              - name: DD_COMPLIANCE_CONFIG_ENABLED
                value: "true"
              - name: DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED
                value: "true"
          [...]
```

{{% /tab %}}
{{< /tabs >}}

### Configure the Agent for Vulnerabilities

The following instructions enables the image metadata collection and [Software Bill of Materials (SBOM)][11] collection in the Datadog Agent. This allows you to scan the libraries in your container images and hosts to detect vulnerabilities. Vulnerabilities are evaluated and and scanned against your containers and hosts every hour.

#### Containers

{{< tabs >}}

{{% tab "Kubernetes (Operator)" %}}

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

{{% tab "Kubernetes (Helm)" %}}

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
{{% tab "ECS EC2" %}}

To enable container image vulnerability scanning on your [ECS EC2 instances][7], add the following environment variables to your `datadog-agent` container definition:

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
             ...
            "environment": [
              ...
              {
                "name": "DD_CONTAINER_IMAGE_ENABLED",
                "value": "true"
              },
              {
                "name": "DD_SBOM_ENABLED",
                "value": "true"
              },
              {
                "name": "DD_SBOM_CONTAINER_IMAGE_ENABLED",
                "value": "true"
              }
            ]
        }
    ]
  ...
}
```

If the Agent fails to extract the SBOM from the container image, increase the Agent memory in the container definition:

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "memory": 256,
            ...
        }
     ]
    ...
}
```

[7]: /containers/amazon_ecs/?tab=awscli#setup

{{% /tab %}}

{{% tab "Hosts" %}}

Add the following to your `datadog.yaml` configuration file:

```yaml
sbom:
  enabled: true
  container_image:
    enabled: true
container_image:
  enabled: true
```

{{% /tab %}}
{{< /tabs >}}

#### Hosts

**Note**: CSM Enterprise customers can enable both container and host SBOM collection at the same time by combining the [containers](#containers) setup with the following setup for hosts configuration:

{{< tabs >}}

{{% tab "Kubernetes (Operator)" %}}

Add the following to the spec section of your `values.yaml` file:

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
      host:
        enabled: true
```
{{% /tab %}}

{{% tab "Kubernetes (Helm)" %}}

```yaml
datadog:
  sbom:
    host:
      enabled: true
```

{{% /tab %}}

{{% tab "ECS EC2" %}}

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
             ...
            "environment": [
              ...
              {
                "name": "DD_SBOM_ENABLED",
                "value": "true"
              },
              {
                "name": "DD_SBOM_HOST_ENABLED",
                "value": "true"
              }
            ]
        }
    ]
  ...
}
```

{{% /tab %}}

{{% tab "Hosts" %}}

```yaml
sbom:
  enabled: true
  host:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}