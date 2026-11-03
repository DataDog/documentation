---
aliases:
- /ja/security/workload_protection/setup/agent/kubernetes
description: Datadog Operator、Helm、または DaemonSet を使用して、Kubernetes で Workload Protection
  を有効にします。
disable_toc: false
title: Kubernetes での Workload Protection のセットアップ
---
Workload Protection を有効にするには、以下の手順に従います。

<div class="alert alert-info">Fargate コンピューティングオプションで構成された Amazon EKS に Workload Protection をデプロイするには、<a href="/security/workload_protection/setup/fargate/">Fargate デプロイメントに関するページ</a>を参照してください。</div>

{{< partial name="security-platform/WP-billing-note.html" >}}

## 前提条件 {#prerequisites}

- 最新バージョンの Datadog Agent。インストール手順については、「[Agent の概要][5]」を参照するか、[Datadog UI][6] から Agent をインストールしてください。

**注**: SBOM 収集には、GKE (Google Kubernetes Engine) のイメージストリーミング機能との互換性がありません。無効にするには、GKE ドキュメントの [イメージストリーミングの無効化][7] に関するセクションを参照してください。

## インストール {#installation}

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. `datadog-agent.yaml` ファイルの `spec` セクションに以下の内容を追加します。

    ```yaml
    # datadog-agent.yaml file
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      features:
        # (Optional) Integrate with Kubernetes to enrich Workload Protection events with Kubernetes user identities
        admissionController:
          enabled: true
          cwsInstrumentation:
            enabled: true

        remoteConfiguration:
          enabled: true
        # Enables Threat Detection
        cws:
          enabled: true
        # Enables Misconfigurations
        cspm:
          enabled: true
          hostBenchmarks:
            enabled: true
        # Enables the image metadata collection and Software Bill of Materials (SBOM) collection
        sbom:
          enabled: true
          # Enables Container Vulnerability Management
          # Image collection is enabled by default with Datadog Operator version `>= 1.3.0`
          containerImage:
            enabled: true

            # Uncomment the following line if you are using Google Kubernetes Engine (GKE) or Amazon Elastic Kubernetes (EKS)
            # uncompressedLayersSupport: true

          # Enables Host Vulnerability Management
          host:
            enabled: true
    ```

2. 変更を適用し、Agent を再起動します。

[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}

{{% tab "Helm" %}}

1. `datadog-values.yaml` ファイルの `datadog` セクションに以下の内容を追加します。

    ```yaml
    # datadog-values.yaml file

    # (Optional) Integrate with Kubernetes to enrich Workload Protection events with Kubernetes user identities
    clusterAgent:
      admissionController:
        enabled: true
        cwsInstrumentation:
          enabled: true

    datadog:
      remoteConfiguration:
        enabled: true
      securityAgent:
        # Enables Threat Detection
        runtime:
          enabled: true
        # Enables Misconfigurations
        compliance:
          enabled: true
          host_benchmarks:
            enabled: true
      sbom:
        containerImage:
          enabled: true

          # Uncomment the following line if you are using Google Kubernetes Engine (GKE) or Amazon Elastic Kubernetes (EKS)
          # uncompressedLayersSupport: true

        # Enables Host Vulnerability Management
        host:
          enabled: true

        # Enables Container Vulnerability Management
        # Image collection is enabled by default with Datadog Helm version `>= 3.46.0`
        # containerImageCollection:
        #   enabled: true
    ```

2. Agent を再起動します。

RBAC の問題を解決するには、`clusterRole` に対して `clusterRole.allowCreatePodsExec` オプションを有効にしてチャートを実行します。

```sh
helm install datadog-operator datadog/datadog-operator --set clusterRole.allowCreatePodsExec=true
```

{{% /tab %}}

{{% tab "DaemonSet" %}}

1. `daemonset.yaml` ファイルの `security-agent` および `system-probe` の `env` セクションに以下の設定を追加します。Workload Protection イベントに Kubernetes ユーザーの ID を付与するには、`cluster-agent-deployment.yaml` で、オプションの `DD_ADMISSION_CONTROLLER_ENABLED` 変数および `DD_RUNTIME_ADMISSION_CONTROLLER_CWS_INSTRUMENTATION_ENABLED` 変数も設定します。

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
                  - name: DD_SBOM_CONTAINER_IMAGE_USE_MOUNT
                    value: "true"
              [...]

      # Source: datadog/templates/cluster-agent-deployment.yaml
      apiVersion:app/1
      kind: Deployment
      [...]
      spec:
        [...]
        template:
          [...]
          spec:
            [...]
            containers:
            [...]
              - name: cluster-agent
                [...]
                env:
                  - name: DD_ADMISSION_CONTROLLER_ENABLED
                    value: "true"
                  - name: DD_RUNTIME_ADMISSION_CONTROLLER_CWS_INSTRUMENTATION_ENABLED
                    value: "true"
    ```

{{% /tab %}}
{{< /tabs >}}


[5]: /ja/getting_started/agent
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable