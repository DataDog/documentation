---
code_lang: kubernetes
code_lang_weight: 60
title: Kubernetes で CSM Cloud Workload Security を有効にする
type: multi-code-lang
---

以下の手順を使用して、Kubernetes 上で [CSM Threats][1] を有効にします。各 CSM 機能でサポートされるデプロイメントタイプの詳細については、[Cloud Security Management のセットアップ][2]を参照してください。

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. `datadog-agent.yaml` ファイルの `spec` セクションに以下を追加します。

    ```yaml
    # datadog-agent.yaml file
    spec:
      features:
        remoteConfiguration:
          enabled: true
        cws:
          enabled: true
    ```

2. 変更を適用し、Agent を再起動します。


[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}

{{% tab "Helm" %}}

1. `datadog-values.yaml` ファイルの `datadog` セクションに以下を追加します。

    ```yaml
    # datadog-values.yaml file
    datadog:
      remoteConfiguration:
        enabled: true
      securityAgent:
        runtime:
          enabled: true
    ```

2. Agent を再起動します。

{{% /tab %}}

{{% tab "DaemonSet" %}}

`daemonset.yaml` ファイルの `security-agent` と `system-probe` の `env` セクションに次の設定を追加します。

```bash
  # ソース: datadog/templates/daemonset.yaml
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

[1]: /ja/security/threats
[2]: /ja/security/cloud_security_management/setup#supported-deployment-types-and-features