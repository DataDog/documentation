---
aliases:
- /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes
code_lang: kubernetes
code_lang_weight: 20
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: ドキュメント
  text: ランタイムメトリクスを有効にする
- link: /tracing/guide/init_resource_calc/
  tag: ドキュメント
  text: init コンテナのリソース使用量の詳細
- link: /tracing/guide/local_sdk_injection
  tag: ドキュメント
  text: ローカル SDK 注入を使用してアプリケーションをインスツルメントする
- link: https://learn.datadoghq.com/courses/configuring-ssi-k8s
  tag: ラーニングセンター
  text: Kubernetes でのシングルステップインスツルメンテーションの構成
title: Kubernetes での Single Step APM インスツルメンテーション
type: multi-code-lang
---
## 概要 {#overview}

Kubernetes 環境では、APM 用のシングルステップインスツルメンテーション (SSI) を利用して Datadog Agent をインストールし、Datadog SDK を使ってアプリケーションを 1 ステップで[インスツルメント][3]します。

## 要件 {#requirements}

- Kubernetes v1.20 以降。
- [`Helm`][1] (Datadog Operator デプロイ用)。
- [`Kubectl` CLI][2] (Datadog Agent インストール用)。
- [シングルステップインスツルメンテーション互換性環境][36] に基づいて環境互換性確認済み。


## アプリケーションで APM を有効にする {#enable-apm-on-your-applications}

<div class="alert alert-info">シングルステップインスツルメンテーションは、Datadog Agent がインストールされているネームスペースのアプリケーションをインスツルメントしません。アプリケーションを実行していない別のネームスペースに Agent をインストールしてください。</div>

クラスター全体でシングルステップインスツルメンテーションを有効にするための手順に従ってください。これにより、サポートされている言語で作成されたすべてのアプリケーションからトレースが自動的に送信されます。

**注:** 特定のネームスペースや Pod だけをインスツルメントするには、[高度なオプション](#advanced-options)のワークロードターゲティングを参照してください。

1. Datadog で、[Kubernetes に Datadog Agent をインストールする][11]のページに移動します。
1. 画面の指示に従ってインストール方法を選択し、API キーを選択して、Operator または Helm のリポジトリをセットアップします。
1. **構成`datadog-agent.yaml`**セクションで、**追加構成** >**アプリケーションの監視可能性**に移動し、**APM インスツルメンテーション**をオンにします。

   {{< img src="tracing/trace_collection/k8s-apm-instrumentation-toggle.jpg" alt="Datadog アプリを通じて Kubernetes に Datadog Agent をインストールするための構成ブロック" style="width:100%;" >}}

1. 生成される構成ファイルを使用して Agent をデプロイします。
1. アプリケーションを再起動します。

<div class="alert alert-info">SSI は、インスツルメントされたアプリケーションに若干の起動時間を追加します。このオーバーヘッドが実際の状況で受け入れられない場合は、<a href="/help/">Datadog サポート</a>に連絡してください。</div>

## 統合サービスタグを構成する {#configure-unified-service-tags}

統合サービスタグ (UST) は、トレース、メトリクス、ログを通じて一貫したタグを適用し、監視可能性データのナビゲートと相関を容易にします。UST は、自動ラベル抽出 (推奨)、`ddTraceConfigs` による明示的な構成、またはデプロイメントマニフェストで構成できます。

<div class="alert alert-warning">
<a href="/agent/remote_config/">Remote Configuration</a> を使用している場合、<a href="#recommended-configure-usts-through-automatic-label-extraction">自動ラベル抽出</a>には互換性がありません。次のものを使用して、<a href="#configure-usts-explicitly-with-ddtraceconfigs">UST を明示的に構成する</a>必要があります: <code>ddTraceConfigs</code>。
</div>

### (推奨) 自動ラベル抽出を通じて UST を構成する {#recommended-configure-usts-through-automatic-label-extraction}

SSI を使用すると、個々のデプロイメントに変更を加えることなく、Pod ラベルとメタデータから UST 値を自動的に抽出できます。そのためには、既存の Kubernetes ラベルを Datadog サービスタグにマッピングするように `kubernetesResourcesLabelsAsTags` を構成します。

**注:** この方法は Remote Configuration と互換性がありません。Remote Configuration を使用している場合は、[ddTraceConfigs で UST を明示的に構成する](#configure-usts-explicitly-with-ddtraceconfigs)を参照してください。

#### 前提条件 {#prerequisites}

| コンポーネント | 最小バージョン  |
|-----------|------------------|
| `datadog-agent` | 7.69        |
| `datadog-operator` | 1.16.0   |
| `datadog-helm-chart` | 3.120.0 |

#### 構成 {#configuration}

次の例では、`app.kubernetes.io/name` を、サービス名が含まれる任意のラベルに置き換えてください (例:`service.kubernetes.io/name` や `component`)。この方法で複数のラベルを構成できます。

```yaml
datadog:
  # Automatically extract service names from Kubernetes labels
  kubernetesResourcesLabelsAsTags:
    pods:
      app.kubernetes.io/name: service     # Modern Kubernetes label
    deployments.apps:
      app.kubernetes.io/name: service
    replicasets.apps:
      app.kubernetes.io/name: service

  # Set environment globally for the entire cluster
  tags:
    - "env:production"

  apm:
    instrumentation:
      enabled: true
```

この構成により、Datadogはこのラベルを含むインスツルメントされた任意のワークロードに対して、`app.kubernetes.io/name` ラベルの値を使用することにより、`service` タグを自動的に設定します。

### ddTraceConfigs を使用して UST を明示的に構成する {#configure-usts-explicitly-with-ddtraceconfigs}

ほとんどの場合、自動構成で十分です。とはいえ、特定のワークロードの設定を詳細に制御する必要がある場合は、`ddTraceConfigs` を使用することにより、明示的にラベルをサービス構成にマッピングします。

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    pods:
      app.kubernetes.io/name: service
    deployments.apps:
      app.kubernetes.io/name: service

  # Set environment globally for the entire cluster
  tags:
    - "env:production"

  apm:
    instrumentation:
      enabled: true
      targets:
        - name: frontend-services
          podSelector:
            matchLabels:
              tier: frontend
          ddTraceConfigs:
            - name: DD_SERVICE       # Explicitly override service name
              valueFrom:
                fieldRef:
                  fieldPath: metadata.labels['app.kubernetes.io/name']
            # DD_ENV inherited from cluster-level tags above
            # DD_VERSION automatically extracted from image tags
```


### デプロイメントマニフェストで UST を構成する {#configure-usts-in-deployment-manifests}

UST 抽出に適したラベルを使用していないセットアップの場合は、環境変数を使用してデプロイメントマニフェストの中で直接 UST を設定できます。この方法では各デプロイメントに個別に変更を加える必要がありますが、細かい制御が可能になります。

手順について詳しくは、[Kubernetesサービスの UST 設定][5]を参照してください。

## SDK に依存する製品と機能を有効にする {#enable-sdk-dependent-products-and-features}

SSI がアプリケーションに Datadog SDK をロードし、分散トレーシングを有効にした後、SDK に依存する追加の製品を構成できます。

{{< ssi-products >}}

以下のいずれかのセットアップ方法を使用します。

- **[ワークロードターゲティングで構成する (推奨)](#target-specific-workloads)**:

  デフォルトの場合、シングルステップインスツルメンテーションはすべてのネームスペースのすべてのサービスをインスツルメントします。ワークロードターゲティングを使用して、インスツルメンテーションを特定のネームスペース、Pod、またはワークロードに制限し、カスタム構成を適用します。

- **[環境変数を設定する][7]**:

  アプリケーション構成で環境変数を直接設定することにより製品を有効にします。

## 高度なオプション {#advanced-options}

以下の高度なオプションを使用することにより、シングルステップインスツルメンテーションが環境内でどのように動作するかをカスタマイズできます。これらの設定はオプションであり、通常、それらが必要になるのは特別なセットアップの場合だけです。

### 注入モードを構成する {#configure-injection-modes}

SSI で複数の注入モードがサポートされており、それらは、インジェクターと APM ライブラリファイルがアプリケーションコンテナにどのように配信されるかを制御します。通常、この設定を手動で構成する必要はありません。Pod の初期化中に、顕著な Pod 起動遅延や予想以上のリソース消費 (CPU、メモリ) に気付いた場合は、調整を検討してください。インジェクターの動作について詳しくは、[シングルステップインスツルメンテーションによるインジェクターの動作][41]を参照してください。


| モード | 説明 | 要件 |
|------|-------------|--------------|
| `init_container` | init コンテナは、アプリケーションコンテナにインジェクターと APM ライブラリファイルをコピーするために使用します。| Helm チャートまたは Datadog Operator でデプロイされたエージェント |
| `csi` | **プレビュー中。**[Datadog CSI ドライバー][37]を使用して、インジェクターと APM ライブラリファイルをマウントします。init コンテナモードと比較して、Pod の起動時間を短縮します。| Agent 7.76.0 以上、CSI ドライバー 1.2.0 以上、Helm Chart 3.178.1 以上、または Datadog Operator 1.25.0 以上|

`csi` モードを使用する前に、Datadog CSI ドライバーをインストールし、アクティブにしてください。Helm でデプロイする場合は、`datadog.csi.enabled: true` を `datadog-values.yaml` に設定してください。インストール手順や GKE オートパイロットなど、環境固有の要件については、[CSI ドライバーのドキュメント][37]を参照してください。

#### 注入モードをグローバルに構成する {#configure-injection-mode-globally}

{{< tabs >}}
{{% tab "Helm" %}}

クラスター全体で注入モードを設定するには、`injectionMode` を `datadog-values.yaml` に追加します。

```yaml
datadog:
  apm:
    instrumentation:
      injectionMode: <mode>
```

サポートされている値: `init_container`、`csi`。

{{% /tab %}}
{{% tab "Datadog Operator" %}}

クラスター全体で注入モードを設定するには、`injectionMode` を `datadog-agent.yaml` に追加します。

```yaml
features:
  apm:
    instrumentation:
      injectionMode: <mode>
```

サポートされている値: `init_container`、`csi`。

Datadog Operator のバージョンが 1.25.0 未満の場合は、特定の Pod のインジェクションモードをオーバーライドするために、[Pod アノテーション](#configure-injection-mode-per-pod)を使用してください。

{{% /tab %}}
{{< /tabs >}}

#### Pod ごとにインジェクションモードを構成する {#configure-injection-mode-per-pod}

特定の Pod のインジェクションモードをオーバーライドするには、Pod の指定に次のアノテーションを追加します。

```yaml
metadata:
  annotations:
    admission.datadoghq.com/apm-inject.injection-mode: "<mode>"
```

サポートされている値: `init_container`、`csi`。

### 特定のワークロードをターゲットにする {#target-specific-workloads}

デフォルトの場合、SSI はクラスター内のすべてのネームスペースのすべてのサービスをインスツルメントします。Agent のバージョンに応じて、インスツルメンテーションするサービスとその方法を微調整するために、以下の構成方法のいずれかを使用してください。

{{< tabs >}}

{{% tab "Agent v7.64 以上 (推奨)" %}}

`targets` ラベルを使用してターゲティングブロックを作成し、インスツルメンテーションするワークロードと適用する構成を指定します。

各ターゲットブロックには以下のキーがあります。

| キー             | 説明 |
|------------------|-------------|
| `name`            | ターゲットブロックの名前。これは監視状態には影響せず、メタデータとしてのみ使用されます。|
| `namespaceSelector` | インスツルメンテーションするネームスペース。以下のいずれかを使用して指定します: <br> ～ `matchNames`: 1 つ以上のネームスペース名のリスト。<br> ～ `matchLabels`: `{key,value}` のペアで定義される 1 つ以上のラベルのリスト。<br> ～ `matchExpressions`: ネームスペースセレクタ要件のリスト。<br><br>ネームスペースはすべての基準を満たす必要があります。詳細については、[Kubernetes セレクタのドキュメント][10]を参照してください。|
| `podSelector`     | インスツルメンテーションする Pod。以下のいずれかを使用して指定します: <br> ～ `matchLabels`: `{key,value}` のペアで定義される 1 つ以上のラベルのリスト。<br> ～ `matchExpressions`: Pod セレクタ要件のリスト。<br><br> Pod はすべての基準を満たす必要があります。詳細については、[Kubernetes セレクタのドキュメント][10]を参照してください。|
| `ddTraceVersions` | 各言語で使用する [Datadog APM SDK][9] のバージョン。|
| `ddTraceConfigs`  | [統合サービスタグ][8]を設定できる APM SDK 構成、トレースを超えた [SDK 依存製品](#enable-sdk-dependent-products-and-features)を有効にし、他の [APM 設定][14]をカスタマイズします。|

構成する必要があるファイルは、Single Step Instrumentation を有効にした方法によって異なります:
- Datadog Operator で SSI を有効にした場合は、`datadog-agent.yaml` を編集します。
- Helm で SSI を有効にした場合は、`datadog-values.yaml` を編集します。

**注**: ターゲットは順番に評価され、最初の一致が優先されます。

#### 構成例 {#example-configurations}

特定のサービスを選択する方法を示す以下の例をご確認ください。

{{< collapse-content title="例 1: 1 つを除くすべてのネームスペースを有効にする" level="h4" >}}

この構成:
-  は `jenkins` ネームスペースを除くすべてのネームスペースに対して APM を有効にします。
  - **注**: リストに記載されているネームスペース以外のすべてのネームスペースで無効にするには、`enabledNamespaces` を使用します。
-  は、デフォルトの Java SDK を使用してJavaアプリケーションを、また `v.3.1.0` の Python SDK を使用して Python アプリケーションをインスツルメントするよう、Datadog に対して指示します。

{{< highlight yaml "hl_lines=4-10" >}}
   apm:
     instrumentation:
       enabled: true
       disabledNamespaces:
         - "jenkins"
       targets:
         - name: "all-remaining-services"
           ddTraceVersions:
             java: "default"
             python: "3.1.0"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="例 2: 名前とラベルに基づいてネームスペースのサブセットをインスツルメントする" level="h4" >}}

この構成は 2 つのターゲットブロックを作成します。

- 最初のブロック (名前は `login-service_namespace`):
  -  はネームスペース `login-service` 内のサービスに対して APM を有効にします。
  -  は、このネームスペース内のサービスをデフォルトの Java SDK のバージョンでインスツルメントするよう、Datadog に対して指示します。
  -  は、このターゲットグループの環境変数 `DD_PROFILING_ENABLED` を設定します。
- 2 番目のブロック (名前は `billing-service_apps`)
  -  は、ラベル `app:billing-service` のネームスペース内のサービスに対して APM を有効にします。
  -  は、このサービスセットを `v3.1.0` の Python SDK でインスツルメントするよう、Datadog に対して指示します。

{{< highlight yaml "hl_lines=4-28" >}}
  apm:
    instrumentation:
      enabled: true
      targets:
        - name: "login-service_namespace"
          namespaceSelector:
            matchNames:
              - "login-service"
          ddTraceVersions:
            java: "default"
          ddTraceConfigs:
            - name: "DD_PROFILING_ENABLED"  ## profiling is enabled for all services in this namespace
              value: "auto"
        - name: "billing-service_apps"
          namespaceSelector:
            matchLabels:
              app: "billing-service"
          ddTraceVersions:
            python: "3.1.0"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="例 3: 異なるトレーサーで異なるワークロードをインスツルメントする" level="h4" >}}

この構成は次のことをします。
-  は、次のラベルの Pod に APM を有効にします。
  - `app:db-user` は、`db-user` アプリケーションを実行している Pod をマークします。
  - `webserver:routing` は、`request-router` アプリケーションを実行している Pod をマークします。
-  は、Datadog Tracer SDK のデフォルトバージョンを使用するよう、Datadog に対して指示します。
-  は、各ターゲットグループに適用される Datadog 環境変数を設定し、SDK を構成します。

{{< highlight yaml "hl_lines=4-28" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "db-user"
           podSelector:
             matchLabels:
               app: "db-user"
           ddTraceVersions:
             java: "default"
           ddTraceConfigs:   ## trace configs set for services in matching pods
             - name: "DD_DATA_STREAMS_ENABLED"
               value: "true"
         - name: "user-request-router"
           podSelector:
             matchLabels:
               webserver: "user"
           ddTraceVersions:
             php: "default"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="例 4: ネームスペース内の Pod をインスツルメントする" level="h4" >}}

この構成:
-  は、`login-service` ネームスペース内で、`app:password-resolver` のラベルの付いた Pod に対して APM を有効にします。
-  は、Datadog Java Tracer SDK のデフォルトバージョンを使用するよう、Datadog に対して指示します。
-  は、このターゲットに適用する Datadog 環境変数を設定します。

{{< highlight yaml "hl_lines=4-28" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "login-service-namespace"
           namespaceSelector:
             matchNames:
               - "login-service"
           podSelector:
             matchLabels:
               app: "password-resolver"
           ddTraceVersions:
             java: "default"
           ddTraceConfigs:
             - name: "DD_PROFILING_ENABLED"
               value: "auto"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="例 5: 一部の Pod をインスツルメントする <code>matchExpressions</code>" level="h4" >}}

この構成は、`app=app1` または `app=app2` のいずれかのラベルの付いた Pod を除くすべての Pod に対して APM を有効にします。

{{< highlight yaml "hl_lines=4-28" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "default-target"
           podSelector:
               matchExpressions:
                 - key: app
                   operator: NotIn
                   values:
                   - app1
                   - app2
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="例 6: 追加の製品を有効にする <code>ddTraceConfigs</code>" level="h4" >}}

この構成は、`web-apps` ネームスペース内のサービスに [App and API protection (AAP)][12] および [Continuous Profiler][11] を有効にし、`ddTraceConfigs` を使用することにより必要な環境変数を設定します。

{{< highlight yaml "hl_lines=4-20" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "web-apps-with-security"
           namespaceSelector:
             matchNames:
               - "web-apps"
           ddTraceVersions:
             java: "default"
             python: "default"
           ddTraceConfigs:
             - name: "DD_APPSEC_ENABLED"
               value: "true"
             - name: "DD_PROFILING_ENABLED"
               value: "auto"
{{< /highlight >}}

SSI を通じて有効にできる製品の完全なリストについては、[SDK 依存の製品と機能を有効にする](#enable-sdk-dependent-products-and-features)を参照してください。

{{< /collapse-content >}}

[8]: /ja/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[9]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/#tracer-libraries
[10]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#resources-that-support-set-based-requirements
[11]: /ja/profiler/
[12]: /ja/security/application_security/
[14]: /ja/tracing/trace_collection/library_config/

{{% /tab %}}

{{% tab "Agent <=v7.63 (レガシー)" %}}

#### ネームスペースのインスツルメンテーションを有効または無効にする {#enable-or-disable-instrumentation-for-namespaces}

特定のネームスペース内のアプリケーションに対してインスツルメンテーションを有効または無効にすることができます。enabledNamespaces または disabledNamespaces のいずれか一方のみを設定できます。両方を設定することはできません。

どのファイルを編集するかは、Datadog Operator か Helm で Single Step Instrumentation を有効にしたかによって異なります。

{{< collapse-content title="Datadog Operator" level="h5" >}}

特定のネームスペースでインスツルメンテーションを有効にするには、`enabledNamespaces` の構成を `datadog-agent.yaml` に追加します:

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         enabledNamespaces: # Add namespaces to instrument
           - default
           - applications
{{< /highlight >}}

特定のネームスペースでインスツルメンテーションを無効にするには、`disabledNamespaces` の構成を `datadog-agent.yaml` に追加します:

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         disabledNamespaces: # Add namespaces to not instrument
           - default
           - applications
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h5" >}}

特定のネームスペースでインスツルメンテーションを有効にするには、`enabledNamespaces` の構成を `datadog-values.yaml` に追加します:

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          enabledNamespaces: # Add namespaces to instrument
             - namespace_1
             - namespace_2
{{< /highlight >}}

特定のネームスペースでインスツルメンテーションを無効にするには、`disabledNamespaces` の構成を `datadog-values.yaml` に追加します:

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          disabledNamespaces: # Add namespaces to not instrument
            - namespace_1
            - namespace_2
{{< /highlight >}}

{{< /collapse-content >}}

#### SDK バージョンを指定する {#specify-sdk-versions}

<div class="alert alert-info">Datadog Cluster Agent v7.52.0 以上の場合、指定する SDK に基づいて、一部のアプリケーションのみを自動的にインスツルメントできます。</div>

それらの言語で作成されたアプリケーションを自動的にインスツルメントするには、Datadog SDK とそのバージョンを指定します。これは、次の優先順位で適用される 2 つの方法で構成できます。

1. [サービスレベルで指定する](#specify-at-the-service-level)、または
2. [クラスターレベルで指定する](#specify-at-the-cluster-level)。

**デフォルト**: ライブラリバージョンを一切指定しない場合、サポートされている言語で作成されたアプリケーションは、最新の SDK バージョンを使用して自動的にインスツルメントされます。

##### サービスレベルで指定する {#specify-at-the-service-level}

特定のポッドで動作するアプリケーションを自動的にインスツルメントするには、Pod の仕様にアプリケーション対応の言語アノテーションとライブラリバージョンを追加してください。

| 言語   | Pod アノテーション                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| Node.js    | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"`   |
| PHP        | `admission.datadoghq.com/php-lib.version: "<CONTAINER IMAGE TAG>"`   |

`<CONTAINER IMAGE TAG>` を、目的のライブラリのバージョンに置き換えてください。利用可能なライブラリのバージョンは、[Datadog コンテナレジストリ](#change-the-default-image-registry)、および各言語のトレーサーソースリポジトリに記載されています。

- [Java][34]
- [Node.js][35]
- [Python][36]
- [.NET][37]
- [Ruby][38]
- [PHP][39]

<div class="alert alert-danger">注意が必要な場合として、 <code>latest</code> タグを使う場合があります。ライブラリのリリースの多くでは、それによって破壊的な変更をもたらされる可能性があります。</div>

たとえば、Java アプリケーションを自動的にインスツルメントする場合は以下のようになります。

{{< highlight yaml "hl_lines=10" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    # ...
spec:
  template:
    metadata:
      annotations:
        admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"
    spec:
      containers:
        - # ...
{{< /highlight >}}

##### クラスターレベルで指定する {#specify-at-the-cluster-level}

特定のPod に対してアノテーションを使用して自動インスツルメンテーションを有効にしていない場合、SSI 構成を使用してクラスター全体でインスツルメンテーションする言語を指定できます。`apm.instrumentation.libVersions` が設定されている場合、指定されたライブラリのバージョンを使用してインスツルメンテーションされるのは、指定された言語で作成されたアプリケーションだけです。

どのファイルを編集するかは、Datadog Operator か Helm で Single Step Instrumentation を有効にしたかによって異なります。

{{< collapse-content title="Datadog Operator" level="h5" >}}

たとえば、.NET、Python、Node.js のアプリケーションをインスツルメントする場合、`datadog-agent.yaml` ファイルに以下の構成を追加します。

{{< highlight yaml "hl_lines=5-8" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         libVersions: # Add any libraries and versions you want to set
            dotnet: "x.x.x"
            python: "x.x.x"
            js: "x.x.x"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h5" >}}

たとえば、.NET、Python、Node.js のアプリケーションをインスツルメントする場合、`datadog-values.yaml` ファイルに以下の構成を追加します。

{{< highlight yaml "hl_lines=5-8" >}}
   datadog:
     apm:
       instrumentation:
         enabled: true
         libVersions: # Add any libraries and versions you want to set
            dotnet: "x.x.x"
            python: "x.x.x"
            js: "x.x.x"
{{< /highlight >}}

{{< /collapse-content >}}


[34]: https://github.com/DataDog/dd-trace-java/releases
[35]: https://github.com/DataDog/dd-trace-js/releases
[36]: https://github.com/DataDog/dd-trace-py/releases
[37]: https://github.com/DataDog/dd-trace-dotnet/releases
[38]: https://github.com/DataDog/dd-trace-rb/releases
[39]: https://github.com/DataDog/dd-trace-php/releases


{{% /tab %}}
{{< /tabs >}}

### デフォルトのイメージレジストリを変更する {#change-the-default-image-registry}

Datadog は、以下の gcr.io、Docker Hub、Amazon ECR にインスツルメンテーションライブラリのイメージを公開しています。

| 言語   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][15]   | [hub.docker.com/r/datadog/dd-lib-java-init][16]   | [gallery.ecr.aws/datadog/dd-lib-java-init][17]   |
| Node.js    | [gcr.io/datadoghq/dd-lib-js-init][18]     | [hub.docker.com/r/datadog/dd-lib-js-init][19]     | [gallery.ecr.aws/datadog/dd-lib-js-init][20]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][21] | [hub.docker.com/r/datadog/dd-lib-python-init][22] | [gallery.ecr.aws/datadog/dd-lib-python-init][23] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][24] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][25] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][26] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][27] | [hub.docker.com/r/datadog/dd-lib-ruby-init][28] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][29] |
| PHP        | [gcr.io/datadoghq/dd-lib-php-init][30] | [hub.docker.com/r/datadog/dd-lib-php-init][31] | [gallery.ecr.aws/datadog/dd-lib-php-init][32] |

Datadog Cluster Agent の構成の中の `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` 環境変数は、Admission Controller が使用するレジストリを指定します。デフォルト値は `gcr.io/datadoghq` です。

ローカルコンテナレジストリでイメージをホストしている場合は、`docker.io/datadog`、`public.ecr.aws/datadog`、または他の URL に変更することによって、別のレジストリから SDK をプルできます。

コンテナレジストリを変更する手順については、[コンテナレジストリの変更][33]を参照してください。

### プライベートコンテナレジストリを使用する {#use-a-private-container-registry}

組織で公開レジストリ (`gcr.io`、`docker.io`、`public.ecr.aws` など) からの直接プルが許可されていない場合は、必要な Datadog イメージを内部でホスティングし、Admission Controller がそれらを使用するように構成できます。

プライベートコンテナレジストリで SSI を使用するには、次のようにします。

1. Datadog のコンテナイメージをプライベートレジストリにミラーリングするには、[これらの手順][34]に従ってください。

   必要なのは、インスツルメントする言語のイメージだけです。どのイメージが必要か不明な場合、ほとんどのケースをカバーする基本的なラインを以下に示します。

   - `apm-inject`
   - `dd-lib-java-init`
   - `dd-lib-python-init`
   - `dd-lib-dotnet-init`
   - `dd-lib-php-init`
   - `dd-lib-ruby-init`
   - `dd-lib-js-init`

   これらのイメージは、[gcr.io][12]、[Docker Hub][13]、または [Amazon ECR Public Gallery][14] にあります。

2. イメージを構成に従ってタグ付けします。

   ミラーリングするバージョンは、ワークロードで設定されているバージョンと一致している必要があります。これらは以下のいずれかの方法で設定されていることがあります。
   - `ddTraceVersions` を使用してAgent の設定でグローバルに、または
   - `admission.datadoghq.com/java-lib.version` のようにアノテーションを使用して Pod ごとに。

   明示的にバージョンが設定されていない場合は、デフォルトバージョン (`0`) が使用されます。

   たとえば、次のとおりです。

   ```
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "default-target"
           ddTraceVersions:
             java: "1"
             python: "3"
   ```

   この構成には、以下のイメージタグが必要です。
   - `apm-inject:0`
   - `dd-lib-java-init:1`
   - `dd-lib-python-init:3`

3. プライベートレジストリを使用するよう、クラスター Agent 構成を更新します。

   プライベートレジストリを使用するように、クラスター Agent 構成の中で `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` 環境変数を設定します。

コンテナレジストリを変更する詳細については、[コンテナレジストリの変更][33]を参照してください。

### EKS でのコンテナネットワークインターフェースの使用 {#using-a-container-network-interface-on-eks}

Calicoのような CNI を使用する場合、コントロールプレーンノードは Datadog の Admission Controller へのネットワーク接続を開始できず、「アドレスが許可されていない」というエラーが報告されます。
シングルステップインスツルメンテーションを使用するには、`useHostNetwork: true`パラメーターにより Datadog のクラスターエージェントに変更を加えます。

```
datadog:
  ...

clusterAgent:
  useHostNetwork: true

  admissionController:
    ...
```

## シングルステップ APM インスツルメンテーションを Agent から削除する {#remove-single-step-apm-instrumentation-from-your-agent}

特定のサービス、ホスト、VM、またはコンテナでトレースデータを収集したくない場合は、以下の手順を実行してください。

### 特定のサービスのインスツルメンテーションを削除する {#remove-instrumentation-for-specific-services}

特定のサービスの APM インスツルメンテーションを削除してトレース送信を停止する場合は、以下のいずれかのようにすることができます。

#### インスツルメンテーションルールを使用して、特定のワークロードをターゲットにします (推奨)。{#use-instrumentation-rules-to-target-specific-workloads-recommended}

インスツルメンテーションルール (Agent v7.64 以上で利用可能) を使用すると、特定のアプリケーションのトレースを有効または無効にできます。[構成の詳細についてはこちらでご確認ください](#advanced-options)。

#### Datadog Admission Controller を使用する {#use-the-datadog-admission-controller}

代替手段として、またはインスツルメンテーションルールをサポートしていないエージェントバージョンの場合、Pod にラベルを追加することにより、Pod の変更を無効にすることもできます。

<div class="alert alert-danger">SSI を無効にすることに加えて、以下の手順により他の変更操作 Webhook は無効になります。注意して使用してください。</div>

1. Pod 指定で `admission.datadoghq.com/enabled:` ラベルを `"false"` に設定します。
   ```yaml
   spec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"
   ```
2. 構成を適用します。
   ```shell
   kubectl apply -f /path/to/your/deployment.yaml
   ```
3. インスツルメンテーションを削除したいサービスを再起動します。

### インフラストラクチャー上のすべてのサービスについて APM を削除する {#remove-apm-for-all-services-on-the-infrastructure}

トレースの送信を停止するには、APM をアンインストールしてインフラストラクチャーを再起動してください:

どのファイルを編集するかは、Datadog Operator か Helm で Single Step Instrumentation を有効にしたかによって異なります。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. `datadog-agent.yaml` の中で `instrumentation.enabled=false` を設定します。
   ```yaml
   features:
     apm:
       instrumentation:
         enabled: false
   ```

2. 更新したコンフィギュレーションファイルで Datadog Agent をデプロイします。
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
{{% /tab %}}

{{% tab "Helm" %}}

1. `datadog-values.yaml` の中で `instrumentation.enabled=false` を設定します。
   ```yaml
   datadog:
     apm:
       instrumentation:
         enabled: false
   ```

2. 次のコマンドを実行します。
   ```shell
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog
   ```
{{% /tab %}}
{{< /tabs >}}

## ベストプラクティス {#best-practices}

SSI を有効にすると、クラスターのうちサポートされているすべてのプロセスが自動的にインスツルメントされ、数分以内にトレース生成が開始されます。

どこで APM を有効にするかを制御して、オーバーヘッドを削減するため、以下のベストプラクティスを考慮してください。

{{% collapse-content title="制御された APM 展開のためにオプトインラベルを使用します。" level="h3" expanded=false id="id-for-anchoring" %}}

#### デフォルトとオプトインインスツルメンテーション {#default-vs-opt-in-instrumentation}
| モード    | 動作    | 使用する場合 |
| ---  | ----------- | ----------- |
| デフォルト | クラスター内のサポートされている全プロセスがインスツルメントされます。| 小さなクラスターまたはプロトタイプ。|
| オプトイン | インスツルメンテーションを特定のネームスペースまたは Pod に制限するために、[インスツルメンテーションルール][4]を使用します。| プロダクションクラスター、段階的ロールアウト、またはコストが大きな問題となるユースケース。|

#### 特定の Pod のインスツルメンテーションを有効にする {#example-enable-instrumentation-for-specific-pods}

1. デプロイメントメタデータと Pod テンプレートの両方にとって意味のあるラベル (`datadoghq.com/apm-instrumentation: "enabled"` など) を追加します。

   ```
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: checkout-api
     labels:
       app: checkout-api
       datadoghq.com/apm-instrumentation: "enabled"   # opt-in label (cluster-wide)
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: checkout-api
     template:
       metadata:
         labels:
           app: checkout-api
           datadoghq.com/apm-instrumentation: "enabled"   # opt-in label must be on *template*, too
           # Unified Service Tags (recommended)
           tags.datadoghq.com/service: "checkout-api"
           tags.datadoghq.com/env:     "prod"
           tags.datadoghq.com/version: "2025-06-10"
       spec:
         containers:
           - name: api
             image: my-registry/checkout:latest
             ports:
               - containerPort: 8080
   ```

2. Datadog Agent Helm の構成で、SSI を有効にし、`podSelector` を使用することにより、オプトインラベルが一致する Pod のみに注入します。

   ```
     apm:
       instrumentation:
         enabled: true
         targets:
           - name: apm-instrumented
             podSelector:
               matchLabels:
                 datadoghq.com/apm-instrumentation: "enabled"
   ```

追加の例については、[インスツルメンテーションルール][4]を参照してください。

{{% /collapse-content %}}


{{% collapse-content title="どの Datadog SDK がロードされるかを制御する" level="h3" expanded=false id="id-for-anchoring" %}}

Agent Helm の構成で `ddTraceVersions` を使用することにより、Datadog SDK の言語とバージョンの両方を制御します。これにより、不必要な SDK がダウンロードされるのを防ぎ、init コンテナのフットプリントを最小限に抑え、イメージサイズを削減し、より意図的なトレースのアップグレードが可能になります (たとえば、コンプライアンス要件を満たすため、またはデバッグを簡素化するため)。

#### 例: ネームスペースの Java SDK を指定する {#example-specify-a-java-sdk-for-a-namespace}

`login-service` ネームスペースで、Java アプリケーションだけが実行されます。他の SDK のダウンロードを避けるため、そのネームスペースをターゲットとするように Agent を構成し、Java SDK バージョン 1.48.2 のみを注入します。


```
targets:
  - name: login-service
    namespaceSelector:
      matchNames: ["login-service"]
    ddTraceVersions:
      java: "1.48.2"    # pin version
```

#### デフォルトの構成 {#default-configuration}

Pod が `ddTraceVersions` ルールに一致しない場合、デフォルトのターゲットが適用されます。

```
targets:
  - name: default-target          # tag any pod *without* an override
    ddTraceVersions:
      java:   "1"   # stay on latest v1.x
      python: "3"   # stay on latest v3.x
      js:     "5"   # NodeJS
      php:    "1"
      dotnet: "3"
```

{{% /collapse-content %}}

## トラブルシューティング {#troubleshooting}

SSI で APM を有効にする際に問題が発生した場合は、[SSI トラブルシューティングガイド][35]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /ja/tracing/glossary/#instrumentation
[4]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/?tab=agentv764recommended#configure-instrumentation-for-namespaces-and-pods
[5]: /ja/getting_started/tagging/unified_service_tagging/?tab=kubernetes#containerized-environment
[7]: /ja/tracing/trace_collection/library_config/
[11]: https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes
[12]: https://gcr.io/datadoghq
[13]: https://hub.docker.com/u/datadog
[14]: https://gallery.ecr.aws/datadog
[15]: http://gcr.io/datadoghq/dd-lib-java-init
[16]: http://hub.docker.com/r/datadog/dd-lib-java-init
[17]: http://gallery.ecr.aws/datadog/dd-lib-java-init
[18]: http://gcr.io/datadoghq/dd-lib-js-init
[19]: http://hub.docker.com/r/datadog/dd-lib-js-init
[20]: http://gallery.ecr.aws/datadog/dd-lib-js-init
[21]: http://gcr.io/datadoghq/dd-lib-python-init
[22]: http://hub.docker.com/r/datadog/dd-lib-python-init
[23]: http://gallery.ecr.aws/datadog/dd-lib-python-init
[24]: http://gcr.io/datadoghq/dd-lib-dotnet-init
[25]: http://hub.docker.com/r/datadog/dd-lib-dotnet-init
[26]: http://gallery.ecr.aws/datadog/dd-lib-dotnet-init
[27]: http://gcr.io/datadoghq/dd-lib-ruby-init
[28]: http://hub.docker.com/r/datadog/dd-lib-ruby-init
[29]: http://gallery.ecr.aws/datadog/dd-lib-ruby-init
[30]: http://gcr.io/datadoghq/dd-lib-php-init
[31]: http://hub.docker.com/r/datadog/dd-lib-php-init
[32]: http://gallery.ecr.aws/datadog/dd-lib-php-init
[33]: /ja/containers/guide/changing_container_registry/
[34]: /ja/containers/guide/sync_container_images/#copy-an-image-to-another-registry-using-crane
[35]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[36]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/
[37]: /ja/containers/kubernetes/csi_driver/
[41]: /ja/tracing/guide/injectors/