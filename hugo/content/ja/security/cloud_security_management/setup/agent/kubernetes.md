---
aliases:
- /ja/security/cloud_security_management/setup/csm_cloud_workload_security/agent/kubernetes/
- /ja/security/cloud_security_management/setup/csm_pro/agent/kubernetes/
- /ja/security/cloud_security_management/setup/csm_enterprise/agent/kubernetes/
code_lang: kubernetes
code_lang_weight: 60
title: Kubernetes での Cloud Security のセットアップ
type: multi-code-lang
---
下記の手順に従って、Misconfigurations and Vulnerability Management を有効にします。

{{< partial name="security-platform/CSW-billing-note.html" >}}

## 前提条件 {#prerequisites}

- Datadog Agent の最新バージョン。インストール手順については、[Agent の概要][5]を参照するか、[Datadog UI][6] から Agent をインストールしてください。

**注**: SBOM コレクションは、Google Kubernetes Engine (GKE) のイメージストリーミング機能とは互換性がありません。無効にするには、GKE ドキュメントの[イメージ ストリーミングを無効にする][7]セクションを参照してください。

## インストール{#installation}

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. `datadog-agent.yaml` ファイルの `spec` セクションに次の内容を追加します。

    ```yaml
    # datadog-agent.yaml file
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      features:
        # Enables Misconfigurations
        cspm:
          enabled: true
          hostBenchmarks:
            enabled: true

        # Enables Software Bill of Materials (SBOM) collection
        sbom:
          enabled: true

          # Enables Container Vulnerability Management
          containerImage:
            enabled: true
            # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
            analyzers: ["os", "languages"]

          # Enables Host Vulnerability Management
          host:
            enabled: true
            # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
            analyzers: ["os", "languages"]

          # Enables runtime package prioritization (Preview, Agent 7.79+)
          # See Runtime Package Prioritization section below.
          enrichment:
            usage:
              enabled: true
    ```

2. 変更を適用し、Agent を再起動します。

[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}

{{% tab "Helm" %}}

1. `datadog-values.yaml` ファイルの `datadog` セクションに次の内容を追加します。

    ```yaml
    # datadog-values.yaml file
    datadog:
      securityAgent:
        # Enables Misconfigurations
        compliance:
          enabled: true
          host_benchmarks:
            enabled: true

      # Enables Software Bill of Materials (SBOM) collection
      sbom:
        # Enables Container Vulnerability Management
        containerImage:
          enabled: true
          # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
          analyzers: ["os", "languages"]

        # Enables Host Vulnerability Management
        host:
          enabled: true
          # Enables scanning of application libraries in addition to OS packages (Agent 7.70+)
          analyzers: ["os", "languages"]

        # Enables runtime package prioritization (Preview, Agent 7.79+)
        # See Runtime Package Prioritization section below.
        enrichment:
          usage:
            enabled: true
    ```

2. Agent を再起動します。

{{% /tab %}}

{{% tab "DaemonSet" %}}

1. `agent`、`security-agent`、`system-probe` を含む `daemonset.yaml` ファイルのすべての Agent コンテナに次の環境変数を追加します。これらの変数は、Misconfigurations and Vulnerability Management、マウントベースのコンテナイメージスキャン、およびランタイムパッケージの優先順位付けを有効にします。

    ```yaml
    - name: DD_COMPLIANCE_CONFIG_ENABLED
      value: "true"
    - name: DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED
      value: "true"
    - name: DD_SBOM_ENABLED
      value: "true"
    - name: DD_SBOM_CONTAINER_IMAGE_ENABLED
      value: "true"
    - name: DD_SBOM_HOST_ENABLED
      value: "true"
    - name: DD_SBOM_CONTAINER_IMAGE_USE_MOUNT
      value: "true"
    - name: DD_SBOM_ENRICHMENT_USAGE_ENABLED
      value: "true"
    - name: HOST_ROOT
      value: /host/root
    ```

   DaemonSet がホストルートを別のパスにマウントしている場合は、各 Agent コンテナで `HOST_ROOT` をそのマウントパスに設定してください。

2. Pod 仕様で `hostPID: true` を設定し、`agent` コンテナに次の `securityContext` を追加します。これらの設定は、`DD_SBOM_CONTAINER_IMAGE_USE_MOUNT=true` を使用したマウントベースのコンテナイメージスキャンに必要です。

    ```yaml
      # Source: datadog/templates/daemonset.yaml
      apiVersion: apps/v1
      kind: DaemonSet
      [...]
      spec:
        [...]
        template:
          [...]
          spec:
            hostPID: true
            containers:
            [...]
              - name: agent
                [...]
                securityContext:
                  capabilities:
                    add:
                      - SYS_ADMIN
                  readOnlyRootFilesystem: true
                  appArmorProfile:
                    type: Unconfined
    ```

3. Agent を再起動します。

{{% /tab %}}

{{< /tabs >}}

**注**: `enrichment.usage.enabled: true` には Datadog Agent **7.79.0 以降**が必要です。要件については、[ランタイムパッケージの優先順位付け](#runtime-package-prioritization-preview)セクションを参照してください。

**注**: `languages` アナライザーには、Datadog Agent **7.70 以降**が必要です。有効にすると、OS パッケージに加えて、下記のパッケージマネージャーで管理されているアプリケーションライブラリの脆弱性を検出します。`analyzers` フィールドが省略された場合、Datadog はコンテナイメージの OS パッケージのみをスキャンします。

### サポートされているアプリケーションライブラリのパッケージマネージャー {#supported-application-library-package-managers}

`languages` アナライザーは、次のパッケージエコシステムを対象としています。

| エコシステム | パッケージマネージャー/フォーマット |
|-----------|------------------------|
| Ruby | Bundler、GemSpec |
| Rust | Cargo、Rust バイナリ |
| PHP | Composer |
| Java | Jar、Maven (pom.xml)、Gradle ロック、Sbt ロック |
| JavaScript | npm (package-lock.json)、Yarn、pnpm、Node パッケージ |
| .NET | NuGet、.NET Core、PackagesProps |
| Python | Python パッケージ (egg)、pip、Pipenv、Poetry、uv、Conda パッケージ、Conda 環境 |
| Go | Go バイナリ、Go モジュール |
| C/C++ | Conan ロック |
| Swift/Objective-C | CocoaPods、Swift |
| Dart | PubSpec ロック |
| Elixir | Mix ロック |
| Julia | Julia |

## ランタイムパッケージの優先順位付け (プレビュー){#runtime-package-prioritization-preview}

ランタイムパッケージの優先順位付けにより、コンテナイメージ内のどのパッケージがランタイムで使用されているかが特定されます。これにより、インストールされているが実行されていないパッケージの脆弱性よりも、実際に実行されているコードの脆弱性に優先的に対処できます。

有効にすると、Agent は eBPF を使用してワークロードでのファイルアクセスを監視し、そのイメージの脆弱性検出結果に次のシグナルを追加します。

| シグナル | 内容|
|--------|-------------------|
| Package is running | パッケージのファイルが、実行中のプロセスによってアクセスされていることが確認されました。|
| Accessed by root process | パッケージが、ルート (UID 0) として実行されているプロセスによってアクセスされました。|
| SUID binary present | パッケージに SUID ビットが設定されたバイナリが含まれています。これは権限昇格を可能にする可能性があります。|

*Package is running* は、[Runtime Prioritization Engine][9] の **Reachability** ディメンションに反映されます。これらのシグナルを直接クエリするには、[ランタイムシグナルによる検出結果のフィルター][10]を参照してください。

**要件**:
- Datadog Agent **7.79.0 以降**。Kubernetes では、最も完全なシグナルカバレッジを得るために **7.81.0 以降**を使用してください。
- Linux のみ(eBPF 依存関係)。サポートされているディストリビューションとカーネルバージョンについては、[Workload Protection のセットアップ][11]を参照してください。

ランタイムシグナルは、コンテナイメージの脆弱性の検出結果において、オペレーティングシステムのパッケージマネージャー (`apt`、`yum`、または `apk`) によってインストールされたパッケージに適用されます。

{{< tabs >}}

{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` ファイルの `sbom` セクションに `enrichment` ブロックを追加します。

```yaml
spec:
  features:
    sbom:
      enabled: true
      containerImage:
        enabled: true
      # Enables runtime package prioritization (Preview, Agent 7.79+)
      enrichment:
        usage:
          enabled: true
```

変更を適用し、Agent を再起動します。

{{% /tab %}}

{{% tab "Helm" %}}

`datadog-values.yaml` ファイルの `sbom` セクションに `enrichment` ブロックを追加します。

```yaml
datadog:
  sbom:
    containerImage:
      enabled: true
    # Enables runtime package prioritization (Preview, Agent 7.79+)
    enrichment:
      usage:
        enabled: true
```

Agent を再起動します。

{{% /tab %}}

{{% tab "DaemonSet" %}}

Pod 仕様で `hostPID: true` を設定し、`agent`、`security-agent`、`system-probe` を含む `daemonset.yaml` ファイルのすべての Agent コンテナに次の環境変数を追加します。

```yaml
# Pod spec
hostPID: true

# Add to each Agent container's env section.
- name: DD_SBOM_ENABLED
  value: "true"
- name: DD_SBOM_CONTAINER_IMAGE_ENABLED
  value: "true"
- name: DD_SBOM_ENRICHMENT_USAGE_ENABLED
  value: "true"
```

Agent を再起動します。

{{% /tab %}}

{{< /tabs >}}

セットアップを確認するには、[ランタイムシグナル][10]で脆弱性検出結果をフィルタリングします。

[1]: /ja/security/cloud_security_management/misconfigurations/
[2]: /ja/security/threats
[3]: /ja/security/cloud_security_management/vulnerabilities
[4]: /ja/security/cloud_security_management/setup#supported-deployment-types-and-features
[5]: /ja/getting_started/agent
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable
[8]: /ja/security/workload_protection/
[9]: /ja/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/
[10]: /ja/security/cloud_security_management/triage_and_prioritize/runtime_prioritization_engine/#filter-findings-by-runtime-signals
[11]: /ja/security/workload_protection/setup/