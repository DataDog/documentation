---
title: Enabling CSM Cloud Workload Security on Kubernetes
code_lang: kubernetes
type: multi-code-lang
code_lang_weight: 60 # a number that represents relative weight. 
---

Use the following instructions to enable [CSM Threats][1] on Kubernetes. To learn more about the supported deployment types for each CSM feature, see [Setting Up Cloud Security Management][2].

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. Add the following to the `spec` section of the `datadog-agent.yaml` file:

    ```yaml
    # datadog-agent.yaml file
    spec:
      features:
        remoteConfiguration:
          enabled: true
        cws:
          enabled: true
    ```

2. Apply the changes and restart the Agent.


[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}

{{% tab "Helm" %}}

1. Add the following to the `datadog` section of the `datadog-values.yaml` file:

    ```yaml
    # datadog-values.yaml file
    datadog:
      remoteConfiguration:
        enabled: true
      securityAgent:
        runtime:
          enabled: true
    ```

2. Restart the Agent.

{{% /tab %}}

{{% tab "DaemonSet" %}}

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
          [...]
```

{{% /tab %}}

{{< /tabs >}}

[1]: /security/threats
[2]: /security/cloud_security_management/setup#supported-deployment-types-and-features