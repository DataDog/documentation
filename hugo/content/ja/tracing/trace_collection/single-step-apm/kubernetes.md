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
  text: ローカル SDK インジェクションを使用してアプリケーションをインスツルメントする
- link: https://learn.datadoghq.com/courses/configuring-ssi-k8s
  tag: ラーニングセンター
  text: Kubernetes でのシングルステップインスツルメンテーションの構成
title: Kubernetes でのシングルステップ APM インスツルメンテーション
type: multi-code-lang
---
## 概要 {#overview}

APM 用のシングルステップインスツルメンテーション (SSI) を利用して Datadog Agent をインストールし、Datadog SDK を使ってapplicationsアプリケーションを[インスツルメント][3]します。

{{< skill-callout
    title="エージェントを使用して APM をセットアップする"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## 要件{#requirements}

- Kubernetes v1.20 以上。
- [`Helm`][1] (Datadog Operator デプロイ用)。
- [`Kubectl` CLI][2] (Datadog Agent インストール用)。
- [シングルステップインスツルメンテーション互換性環境][36]に基づいて環境互換性確認済み。


## アプリケーションで APM を有効にする {#enable-apm-on-your-applications}

<div class="alert alert-info">シングルステップインスツルメンテーションは、Datadog Agent がインストールされているネームスペースのアプリケーションをインスツルメントしません。アプリケーションを実行していない別のネームスペースに Agent をインストールしてください。</div>

クラスター全体でシングルステップインスツルメンテーションを有効にすると、サポートされている言語で記述されたすべてのアプリケーションからトレースが自動的に送信されます。

**注:** 特定のネームスペースや Pod だけをインスツルメントするには、[高度なオプション](#advanced-options)のワークロードターゲティングを参照してください。

次のコマンドを使用して SSI を有効にします。その際、以下を置き換えてください。

- `<YOUR_DD_API_KEY>` をご自身の [Datadog API キー][40]に置き換えてください
- `<YOUR_CLUSTER_NAME>` をご自身のクラスター名に置き換えてください
- `<DATADOG_SITE>` をご自身の [Datadog サイト][43]に置き換えてください。{{< region-param key="dd_site" code="true" >}}

この例では `apm.instrumentation.enabled: true` で SSI を有効にし、`datadog` ネームスペースを使用します。Agent が他の場所にインストールされている場合は、ネームスペースを置き換えてください。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Datadog Operator をインストールし、API キーを保持するシークレットを作成します。

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   helm install datadog-operator datadog/datadog-operator --namespace datadog --create-namespace
   kubectl create secret generic datadog-secret --from-literal api-key=<YOUR_DD_API_KEY> -n datadog
   ```

1. APM インスツルメンテーションを有効にする `datadog-agent.yaml` ファイルを作成します。

   ```yaml
   kind: "DatadogAgent"
   apiVersion: "datadoghq.com/v2alpha1"
   metadata:
     name: "datadog"
     namespace: "datadog"
   spec:
     global:
       clusterName: "<YOUR_CLUSTER_NAME>"
       site: "<DATADOG_SITE>"
       credentials:
         apiSecret:
           secretName: "datadog-secret"
           keyName: "api-key"
     features:
       apm:
         instrumentation:
           enabled: true
   ```

   最新バージョンではなく特定の SDK バージョンを固定するには、`ddTraceVersions` を含む `targets` ブロックを追加してください。完全なスキーマについては、[特定のワークロードをターゲットにする](#target-specific-workloads)を参照してください。

1. Agent をデプロイします。

   ```shell
   kubectl apply -f datadog-agent.yaml
   ```

既存の Operator インストールを更新するには、SSI 構成を `datadog-agent.yaml` に追加し、`kubectl -n datadog apply -f datadog-agent.yaml` で再適用してください。

{{% /tab %}}
{{% tab "Helm" %}}

1. Datadog Helm リポジトリを追加し、`datadog` ネームスペースを作成し、API キーを保持するシークレットを作成します。

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   kubectl create namespace datadog
   kubectl -n datadog create secret generic datadog-secret --from-literal api-key=<YOUR_DD_API_KEY>
   ```

1. APM インスツルメンテーションを有効にする `datadog-values.yaml` ファイルを作成します。

   ```yaml
   datadog:
     site: "<DATADOG_SITE>"
     clusterName: "<YOUR_CLUSTER_NAME>"
     apiKeyExistingSecret: "datadog-secret"
     apm:
       instrumentation:
         enabled: true
   ```

   最新バージョンではなく特定の SDK バージョンを固定するには、`ddTraceVersions` を含む `targets` ブロックを追加してください。完全なスキーマについては、[特定のワークロードをターゲットにする](#target-specific-workloads)を参照してください。

1. Agent をデプロイします。

   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog --namespace datadog
   ```

既存の Helm インストールを更新するには、SSI 構成を `datadog-values.yaml` に追加し、`helm upgrade -n datadog -f datadog-values.yaml <RELEASE_NAME> datadog/datadog` を実行してください。

{{% /tab %}}
{{< /tabs >}}

Agent をデプロイした後、アプリケーションを再起動してください。

<div class="alert alert-info">SSI は、インスツルメントされたアプリケーションに若干の起動時間を追加します。このオーバーヘッドが実際の状況で受け入れられない場合は、<a href="/help/">Datadog サポート</a>に連絡してください。</div>

### Datadog から構成を生成する {#generate-the-configuration-from-datadog}

UI を通じて構成を生成するには、[Kubernetes への Datadog Agent のインストール][11]ページに移動し、画面の指示に従ってインストール方法と API キーを選択してください。{{< ui >}}Configure `datadog-agent.yaml`{{< /ui >}} セクションで、{{< ui >}}Additional configuration{{< /ui >}} > {{< ui >}}Application Observability{{< /ui >}} に移動し、{{< ui >}}APM Instrumentation{{< /ui >}} をオンにします。その後、生成された構成ファイルを使用して Agent をデプロイします。

{{< img src="tracing/trace_collection/k8s-apm-instrumentation-toggle.jpg" alt="Datadog アプリを通じて Kubernetes に Datadog Agent をインストールするための構成ブロック" style="width:100%;" >}}

## インストールを検証する {#verify-the-installation}

1. Agent Pod が実行されていることを確認します。

   ```shell
   kubectl get pods -n datadog
   ```

1. Agent が正常であり、APM Agent が実行されていることを確認します。`<AGENT_POD>` をノード Agent Pod の名前に置き換えてください。

   ```shell
   kubectl exec <AGENT_POD> -n datadog -- agent status
   ```

   出力の **APM Agent** セクションをチェックします。

1. インジェクションがインスツルメントされたアプリケーション Pod に到達したことを確認します。`<APP_POD>` と `<APP_NAMESPACE>` をご自身のアプリケーション Pod とそのネームスペースに置き換えてください。

   ```shell
   kubectl get pod <APP_POD> -n <APP_NAMESPACE> -o jsonpath='{.spec.initContainers[*].name}'
   ```

   出力には、`datadog-init-apm-inject` と、インスツルメントされた各言語用の `datadog-lib-<language>-init` コンテナが含まれます。

1. アプリケーションがトラフィックを受信した後、[APM サービスページ][42]にサービスが表示されることを確認します。数分以内に表示されない場合は、[SSI トラブルシューティングガイド][35]に従います。

## 統合サービスタグを構成する {#configure-unified-service-tags}

統合サービスタグ (UST) は、トレース、メトリクス、ログを通じて一貫したタグを適用し、監視可能性データのナビゲートと相関を容易にします。UST は、自動ラベル抽出 (推奨)、`ddTraceConfigs` による明示的な構成、またはデプロイメントマニフェストで構成できます。

<div class="alert alert-warning">
<a href="/agent/remote_config/">Remote Configuration</a> を使用している場合、<a href="#recommended-configure-usts-through-automatic-label-extraction">自動ラベル抽出</a>には互換性がありません。次のものを使用して、<a href="#configure-usts-explicitly-with-ddtraceconfigs">UST を明示的に構成する</a>必要があります。 <code>ddTraceConfigs</code>です。
</div>

### (推奨) 自動ラベル抽出を通じて UST を構成する {#recommended-configure-usts-through-automatic-label-extraction}

SSI を使用すると、個々のデプロイメントに変更を加えることなく、Pod ラベルとメタデータから UST 値を自動的に抽出できます。そのためには、既存の Kubernetes ラベルを Datadog サービスタグにマッピングするように `kubernetesResourcesLabelsAsTags` を構成します。

**注:** この方法は Remote Configuration と互換性がありません。Remote Configuration を使用している場合は、[ddTraceConfigs で UST を明示的に構成する](#configure-usts-explicitly-with-ddtraceconfigs)を参照してください。

#### 前提条件 {#prerequisites}

| コンポーネント | 最小バージョン |
|-----------|------------------|
| `datadog-agent` | 7.69        |
| `datadog-operator` | 1.16.0   |
| `datadog-helm-chart` | 3.120.0 |

#### 構成{#configuration}

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

この構成により、Datadog はこのラベルを含むインスツルメントされた任意のワークロードに対して、`app.kubernetes.io/name` ラベルの値を使用することにより、`service` タグを自動的に設定します。

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

完全な手順については、[Kubernetes サービスの UST 設定][5]を参照してください。

## SDK に依存する製品と機能を有効にする {#enable-sdk-dependent-products-and-features}

SSI がアプリケーションに Datadog SDK をロードし、分散トレーシングを有効にした後、SDK に依存する追加の製品を構成できます。

{{< ssi-products >}}

以下のいずれかのセットアップ方法を使用します。

- **[Agent ターゲティングルールを使用して構成する](?tab=targetingrulesv764#target-specific-workloads)**:

  Agent で構成されたターゲットで `ddTraceConfigs` を使用して、ネームスペースまたは Pod のグループに対して製品を有効にします。

- **[環境変数を設定する][7]**:

  アプリケーション構成で環境変数を直接設定することにより製品を有効にします。

## 高度なオプション {#advanced-options}

以下の高度なオプションを使用することにより、シングルステップインスツルメンテーションが環境内でどのように動作するかをカスタマイズできます。これらの設定はオプションであり、通常、それらが必要になるのは特別なセットアップの場合だけです。

### インジェクションモードを構成する {#configure-injection-modes}

SSI で複数のインジェクションモードがサポートされており、それらは、インジェクターと APM ライブラリファイルがアプリケーションコンテナにどのように配信されるかを制御します。通常、この設定を手動で構成する必要はありません。Pod の初期化中に、顕著な Pod 起動遅延や予想以上のリソース消費 (CPU、メモリ) に気付いた場合は、調整を検討してください。インジェクターの動作について詳しくは、[シングルステップインスツルメンテーションによるインジェクターの動作][41]を参照してください。


| モード | 説明 | 要件 |
|------|-------------|--------------|
| `auto` | **デフォルト。**Cluster Agent は、クラスターとワークロードに最適なインジェクションモードを選択します。選択ロジックは Agent バージョン間で変わる可能性があります。| Agent 7.76.0 以上 |
| `init_container` | init コンテナは、アプリケーションコンテナにインジェクターと APM ライブラリファイルをコピーするために使用します。| Helm チャートまたは Datadog Operator でデプロイされた Agent |
| `csi` | [Datadog CSI ドライバー][37]を使用して、インジェクターと APM ライブラリファイルをマウントします。init コンテナモードと比較して、Pod の起動時間を短縮します。| Agent 7.76.0 以上、CSI ドライバー 1.2.0 以上、Helm Chart 3.178.1 以上、または Datadog Operator 1.25.0 以上 |

`csi` モードを使用する前に、Datadog CSI ドライバーをインストールし、アクティブにしてください。Helm でデプロイする場合は、`datadog-values.yaml` で `datadog.csi.enabled: true` も設定してください。Datadog Operator でデプロイする場合は、`datadog-agent.yaml` で `spec.global.csi.enabled: true` を設定してください。インストール手順や GKE オートパイロットなど、環境固有の要件については、[CSI ドライバーのドキュメント][37]を参照してください。`auto` モードでは、Cluster Agent は CSI ドライバーがインストールされていてクラスターで安全に使用できる場合にのみ、CSI ドライバーを選択します。

#### インジェクションモードをグローバルに構成する {#configure-injection-mode-globally}

{{< tabs >}}
{{% tab "Helm" %}}

クラスター全体でインジェクションモードを設定するには、`injectionMode` を `datadog-values.yaml` に追加します。

```yaml
datadog:
  apm:
    instrumentation:
      injectionMode: <mode>
```

サポートされている値: `auto` (デフォルト)、`init_container`、`csi`。

{{% /tab %}}
{{% tab "Datadog Operator" %}}

クラスター全体でインジェクションモードを設定するには、`injectionMode` を `datadog-agent.yaml` に追加します。

```yaml
spec:
  features:
    apm:
      instrumentation:
        injectionMode: <mode>
```

サポートされている値: `auto` (デフォルト)、`init_container`、`csi`。

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

サポートされている値: `auto`、`init_container`、`csi`。

### 特定のワークロードをターゲットにする {#target-specific-workloads}

デフォルトの場合、SSI はクラスター内のすべてのネームスペースのすべてのサービスをインスツルメントします。インスツルメントするワークロードを調整するには、Datadog でインスツルメンテーションルールを定義するか、Agent 構成または `DatadogInstrumentation` リソースを使用してターゲティングを構成します。Datadog のインスツルメンテーションルールを使用すると、Agent 構成を変更することなく、一致する Pod のインスツルメンテーションを許可またはブロックできます。利用可能な方法は、ご使用の Agent または Cluster Agent のバージョンによって異なります。

{{< tabs >}}
{{% tab "Datadog のインスツルメンテーションルール (v7.84.2+)" %}}

<div class="alert alert-info">Kubernetes 用のインスツルメンテーションルールはプレビュー版です。<a href="https://www.datadoghq.com/product-preview/instrumentation-rules-kubernetes/">アクセスをお申し込みください。</a></div>

{{< site-region region="gov" >}}
<div class="alert alert-warning">インスツルメンテーションルールは、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では利用できません。</div>
{{< /site-region >}}

各インスツルメンテーションルールは、ネームスペースまたは Pod の属性と照合され、一致する Pod に対してインスツルメンテーションを許可またはブロックします。ルールをすべての対象クラスターにデプロイすること、または 1 つ以上の [クラスターグループ](#create-cluster-groups) にスコープを絞って適用範囲を制限することができます。

インスツルメンテーションルールを表示および管理するには、[{{< ui >}}APM{{< /ui >}}] > [{{< ui >}}Instrument a Service{{< /ui >}}] (サービスのインスツルメント) > [[{{< ui >}}Instrumentation Rules{{< /ui >}}] (インスツルメンテーションルール)][102] に移動し、ページタイトルのドロップダウンから [{{< ui >}}Kubernetes{{< /ui >}}] を選択します。

{{< img src="tracing/trace_collection/apm-instrumentation-rules-for-kubernetes.png" alt="[APM Instrumentation Rules] (APM インスツルメンテーションルール) ページ。Kubernetes が選択され、[Default Behavior] (デフォルトの動作)、[Clusters in Scope] (スコープ内のクラスター)、[Deployment Status] (デプロイメントステータス) カードが表示されており、その下にインスツルメンテーションルールの空のリストがあります。" style="width:100%;" >}}

#### インスツルメンテーションルールの前提条件 {#prerequisites-for-instrumentation-rules}

- **Cluster Agent**: 各クラスターで v7.84.2 以降の Cluster Agent、かつ [Remote Configuration][101] が有効であること。これらの要件を満たすクラスターが、インスツルメンテーションルールの対象となります。
- **権限**: インスツルメンテーションルールとクラスターグループの作成および管理に必要な **APM Workload Selection Write** [権限][103]。

#### デフォルトの動作を設定する {#set-the-default-behavior}

デフォルトの動作は、Datadog でインスツルメンテーションルールを使用する際に、Agent 構成 (`targets` および `enabledNamespaces`) のワークロードターゲティングが引き続き適用されるかどうかを制御します。デフォルトの動作に関係なく、一部の Pod がインスツルメンテーションから除外され、他のターゲティング方法がインスツルメンテーションルールよりも優先される場合があります。「[インスツルメンテーションルールの例外](#exceptions-to-instrumentation-rules)」および「[構成の優先順位](#configuration-precedence)」のセクションを参照してください。

<div class="alert alert-warning">SSI がクラスター全体で <code>targets</code>なしで有効になっている場合、ルールを作成する前に、デフォルトの動作を [<strong>Allow everything else</strong>] (その他をすべて許可) に設定します。このように設定しないと、最初のルールによってクラスター全体のインスツルメンテーションが無効になり、ルールに一致しない Pod がインスツルメンテーションの対象外になります。</div>

1. [インスツルメンテーションルール][102]ページで [{{< ui >}}Default Behavior{{< /ui >}}] (デフォルトの動作) カードに移動し、[{{< ui >}}Edit{{< /ui >}}] (編集) をクリックします。
1. 次のいずれかのオプションを選択します。
   - [{{< ui >}}No default{{< /ui >}}] (デフォルトなし) (初期設定): Agent 構成でのワークロードターゲティングは引き続き適用されますが、Datadog で定義されたルールによって上書きされる場合があります。ルールにも Agent 構成にも一致しない Pod はインスツルメントされません。
   - {{< ui >}}Block everything else{{< /ui >}}: Agent 構成のワークロードターゲティングは無視されます。許可ルールに一致しない Pod はインスツルメントされません。
   - {{< ui >}}Allow everything else{{< /ui >}}: Agent 構成のワークロードターゲティングは無視されます。ブロックルールに一致しない Pod はインスツルメントされます。
1. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

{{< img src="tracing/trace_collection/k8s-default-behavior.png" alt="Kubernetes のデフォルト動作オプション: [No default] (デフォルトなし)、[Block everything else] (他をすべてブロック)、[Allow everything else] (他をすべて許可)" style="width:50%;" >}}

#### クラスターグループを作成する {#create-cluster-groups}

クラスターグループは、インスツルメンテーションルールのターゲットにできる Kubernetes クラスターの再利用可能なコレクションです。

クラスターグループを作成するには:

1. [インスツルメンテーションルール][102]ページで [{{< ui >}}Clusters in Scope{{< /ui >}}] (スコープ内のクラスター) カードに移動し、[{{< ui >}}Manage cluster groups{{< /ui >}}] (クラスターグループの管理) をクリックします。
1. [{{< ui >}}New Cluster Group{{< /ui >}}] (新規クラスターグループ) をクリックし、グループの名前を入力します。
1. [{{< ui >}}Add Clusters{{< /ui >}}] (クラスターを追加) をクリックし、追加するクラスターを検索して選択します。

   <div class="alert alert-info">クラスターグループは静的です。新しいクラスターは、既存のグループに自動的には追加されません。代わりに、グループに追加するまでは [<strong>All clusters</strong>] (すべてのクラスター) グループに表示されます。クラスターは複数のグループに所属できます。</div>

   {{< img src="tracing/trace_collection/k8s-add-clusters.png" alt="[Add Clusters] (クラスターを追加) リストで 4 つのクラスターのうち 2 つが選択されている新しいクラスターグループのフォーム" style="width:80%;" >}}

1. [{{< ui >}}Save Group{{< /ui >}}] (グループを保存) をクリックします。

Datadog は [{{< ui >}}All clusters{{< /ui >}}] (すべてのクラスター) グループを自動的に維持します。このグループには、他のグループに属していない対象クラスターが一覧表示されるため、どのクラスターがグループ化されていないかを確認できます。このクラスターリストは編集できません。

クラスターグループを削除すると、Datadog でそのグループのルールが削除され、Cluster Agent が次回 Remote Configuration をポーリングするときに、そのルールの適用が停止します。

クラスターグループの順序を変更するには、グループリストでグループのハンドルを使用してグループをドラッグします。グループの順序は[インスツルメンテーションルールの評価方法](#how-instrumentation-rules-are-evaluated)に影響します。

{{< img src="tracing/trace_collection/k8s-cluster-groups.png" alt="[Cluster Groups for Kubernetes] (Kubernetes のクラスターグループ) ページ。Canary グループが [All clusters] (すべてのクラスター) グループの上に配置され、[All clusters] (すべてのクラスター) グループ内のクラスターが一覧表示されています。" style="width:100%;" >}}

#### インスツルメンテーションルールを作成する {#create-instrumentation-rules}

**注**: Bits AI を使用して、自然言語でインスツルメンテーションルールを作成できます。[Create instrumentation rule] (インスツルメンテーションルールの作成) ウィンドウで [{{< ui >}}Generate with Bits{{< /ui >}}] (Bits を使用して生成) をクリックし、インスツルメンテーション対象の Pod を記述します。Bits AI により対応するルールが生成されます。

インスツルメンテーションルールを作成するには:

1. [インスツルメンテーションルール][102]ページで [{{< ui >}}New Rule{{< /ui >}}] (新規ルール) をクリックします。または、クラスターグループページでグループを選択し、その [{{< ui >}}Rules{{< /ui >}}] (ルール) タブを開いて [{{< ui >}}Create a new rule{{< /ui >}}] (新規ルールを作成) をクリックします。
1. 1 つ以上の条件を定義し、[{{< ui >}}Block Instrumentation{{< /ui >}}] (インスツルメンテーションをブロックする) または [{{< ui >}}Allow Instrumentation{{< /ui >}}] (インスツルメンテーションを許可する) を選択します。「[サポートされている Kubernetes 属性](#supported-kubernetes-attributes)」セクションを参照してください。
1. [{{< ui >}}Set cluster targeting{{< /ui >}}] (クラスターターゲティングの設定) で、[{{< ui >}}All clusters{{< /ui >}}] (すべてのクラスター) または [{{< ui >}}Select cluster groups{{< /ui >}}] (クラスターグループを選択) を選択します。

   複数のグループを選択した場合、それらのグループは 1 つのルールを共有します。後でそのルールを編集すると、選択したすべてのグループが更新されます。

   {{< img src="tracing/trace_collection/k8s-create-rule.png" alt="Kubernetes の [Create instrumentation rule] (インスツルメンテーションルールの作成) ウィンドウ。条件は Namespace Name equals default、アクションは [Allow Instrumentation] (インスツルメンテーションを許可)、[Select cluster groups] (クラスターグループを選択) で Canary グループが選択されています。" style="width:100%;" >}}

1. ルールに名前を付けて、[{{< ui >}}Next{{< /ui >}}] (次へ) をクリックします。
1. ルールを確認します。各ターゲットグループのルールリストの末尾に新しいルールが追加されます。必要に応じて、[{{< ui >}}Set evaluation order{{< /ui >}}] (評価順序の設定) でルールをドラッグして、各グループ内の順序を変更します。「[インスツルメンテーションルールの評価方法](#how-instrumentation-rules-are-evaluated)」セクションを参照してください。
1. [{{< ui >}}Create Rule{{< /ui >}}] (ルールを作成) をクリックします。

Datadog は、50 秒以内にRemote Configuration を介して対象クラスターへルールをデプロイします。ルールがデプロイされたら、影響を受けるワークロードを再起動して変更を反映させます。[[Instrumentation Rules] (インスツルメンテーションルール)][102] ページの [{{< ui >}}Deployment Status{{< /ui >}}] (デプロイメントステータス) カードに、現在のルールのロールアウト状況が表示されます。

#### インスツルメンテーションルールの評価方法 {#how-instrumentation-rules-are-evaluated}

Datadog は各 Pod に対して以下の順序でインスツルメンテーションルールを評価し、最初に一致したルールを適用します。

1. Pod のクラスターが属するグループのルール (グループ順に上から下へ)。各グループ内では、ルールは [{{< ui >}}Set evaluation order{{< /ui >}}] (評価順序の設定) で設定された順序で評価されます。
1. [{{< ui >}}All clusters{{< /ui >}}] (すべてのクラスター) ターゲティングオプションを使用するルール。これらのルールは、クラスターグループ内のクラスターを含め、すべての対象クラスターに適用されます。

一致するルールがない場合は、[デフォルトの動作](#set-the-default-behavior)が適用されます。

<div class="alert alert-info">Pod SDK アノテーションと <code>DatadogInstrumentation</code> リソースは、デフォルトの動作に関係なく、インスツルメンテーションルールよりも優先されます。完全な順序については、「<a href="#configuration-precedence">構成の優先順位</a>」セクションを参照してください。</div>

#### インスツルメンテーションルールの例外 {#exceptions-to-instrumentation-rules}

以下の Pod は、インスツルメンテーションルールやデフォルトの動作に関係なく、インスツルメントされません。

- `kube-system` ネームスペース内の Pod
- Datadog Agent がインストールされているネームスペース内の Pod
- `disabledNamespaces` にリストされているネームスペース内の Pod
- `admission.datadoghq.com/enabled: "false"` というラベルが付いている Pod

#### サポートされている Kubernetes 属性 {#supported-kubernetes-attributes}

Kubernetes のインスツルメンテーションルールでは、以下の属性がサポートされています。ルールが適用されるには、Pod がそのルールのすべての条件に一致している必要があります。ラベル属性の場合は、ラベルキーと一致させる値を指定します。

| 属性 | 説明 | 演算子 | 例 |
| --------- | ----------- | --------- | ------- |
| ネームスペース名 | Pod のネームスペースの名前。| `equals`、`not equals`、`prefix`、`contains` | `default`、`production` |
| ネームスペースラベル | Pod のネームスペースのラベル。| `equals`、`not equals`、`prefix` | ラベルキー `team`、値 `checkout` |
| Pod ラベル | Pod のラベル。| `equals`、`not equals`、`prefix` | ラベルキー `app`、値 `web` |

[101]: /ja/remote_configuration/
[102]: https://app.datadoghq.com/apm/service-setup/workload-selection
[103]: /ja/account_management/rbac/permissions/

{{% /tab %}}

{{% tab "ターゲティングルール (v7.64+)" %}}

`targets` ラベルを使用してターゲティングブロックを作成し、インスツルメントするワークロードと適用する構成を指定します。

各ターゲットブロックには以下のキーがあります。

| キー             | 説明 |
|------------------|-------------|
| `name`            | ターゲットブロックの名前。これは監視状態には影響せず、メタデータとしてのみ使用されます。|
| `namespaceSelector` | インスツルメントするネームスペース。以下のいずれかを使用して指定します。<br> - `matchNames`: 1 つ以上のネームスペース名のリスト。<br> - `matchLabels`: `{key,value}` のペアで定義される 1 つ以上のラベルのリスト。<br> - `matchExpressions`: ネームスペースセレクター要件のリスト。<br><br>ネームスペースはすべての基準を満たす必要があります。詳細については、[Kubernetes セレクターのドキュメント][10]を参照してください。|
| `podSelector`     | インスツルメントする Pod。以下のいずれかを使用して指定します。<br> - `matchLabels`: `{key,value}` のペアで定義される 1 つ以上のラベルのリスト。<br> - `matchExpressions`: Pod セレクター要件のリスト。<br><br> Pod はすべての基準を満たす必要があります。詳細については、[Kubernetes セレクターのドキュメント][10]を参照してください。|
| `ddTraceVersions` | 各言語で使用する [Datadog APM SDK][9] のバージョン。|
| `ddTraceConfigs`  | [統合サービスタグ][8]を設定できる APM SDK 構成、トレースを超えた [SDK 依存製品](#enable-sdk-dependent-products-and-features)を有効にし、他の [APM 設定][14]をカスタマイズします。|

構成する必要があるファイルは、シングルステップインスツルメンテーションを有効にした方法によって異なります。
- Datadog Operator で SSI を有効にした場合は、`datadog-agent.yaml` を編集します。
- Helm で SSI を有効にした場合は、`datadog-values.yaml` を編集します。

**注**: ターゲットは順番に評価され、最初の一致が優先されます。

#### 構成例 {#example-configurations}

特定のサービスを選択する方法を示す以下の例をご確認ください。

{{< collapse-content title="例 1: 1 つを除くすべてのネームスペースを有効にする" level="h5" >}}

この構成について:
- `jenkins` ネームスペースを除くすべてのネームスペースに対して APM を有効にします。
  - **注**: リストに記載されているネームスペース以外のすべてのネームスペースで無効にするには、`enabledNamespaces` を使用します。
- デフォルトの Java SDK を使用して Java アプリケーションを、また `v.3.1.0` の Python SDK を使用して Python アプリケーションをインスツルメントするよう、Datadog に指示します。

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

{{< collapse-content title="例 2: 名前とラベルに基づいてネームスペースのサブセットをインスツルメントする" level="h5" >}}

この構成は 2 つのターゲットブロックを作成します。

- 最初のブロック (名前は `login-service_namespace`):
  - ネームスペース `login-service` 内のサービスに対して APM を有効にします。
  - このネームスペース内のサービスをデフォルトの Java SDK のバージョンでインスツルメントするよう、Datadog に指示します。
  - このターゲットグループの環境変数 `DD_PROFILING_ENABLED` を設定します
- 2 番目のブロック (名前は `billing-service_apps`):
  - ラベル `app:billing-service` のネームスペース内のサービスに対して APM を有効にします。
  - このサービスセットを `v3.1.0` の Python SDK でインスツルメントするよう、Datadog に指示します。

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

{{< collapse-content title="例 3: 異なるトレーサーで異なるワークロードをインスツルメントする" level="h5" >}}

この構成は次のことをします。
- 次のラベルの Pod に APM を有効にします。
  - `app:db-user`。`db-user` アプリケーションを実行している Pod をマークします。
  - `webserver:routing`。`request-router` アプリケーションを実行している Pod をマークします。
- Datadog Tracer SDK のデフォルトバージョンを使用するよう、Datadog に指示します。
- 各ターゲットグループに適用される Datadog 環境変数を設定し、SDK を構成します。

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

{{< collapse-content title="例 4: ネームスペース内の Pod をインスツルメントする" level="h5" >}}

この構成について:
- `login-service` ネームスペース内で、`app:password-resolver` のラベルの付いた Pod に対して APM を有効にします。
- Datadog Java Tracer SDK のデフォルトバージョンを使用するよう、Datadog に指示します。
- このターゲットに適用する Datadog 環境変数を設定します。

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

{{< collapse-content title="例 5: 一部の Pod をインスツルメントする <code>matchExpressions</code>" level="h5" >}}

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

{{< collapse-content title="例 6: 追加の製品を有効にする <code>ddTraceConfigs</code>" level="h5" >}}

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

{{% tab "DatadogInstrumentation CRD (v7.85+)" %}}

`DatadogInstrumentation` カスタムリソースを使用して SSI を有効にし、特定のワークロードセットに対して SDK を構成します。

この方法では、Datadog Agent および Cluster Agent **v7.85.0 以上**が必要であり、以下のいずれかを使用して `DatadogInstrumentation` CRD がインストールされている必要があります。

- Datadog Operator **v1.31.0 以上**。
- Datadog Helm チャート **v3.255.0 以上**。

##### ワークロードをターゲットとするリソースを作成する {#enable-apm-with-datadoginstrumentation}

ターゲットとするワークロードと同じネームスペースで `DatadogInstrumentation` リソースを作成して適用します。この例では、デフォルトの Java SDK を使用して `apps` ネームスペースで `checkout` Deployment をインスツルメントします。

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: checkout-apm
  namespace: apps
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: checkout
  config:
    apm:
      ddTraceVersions:
        java: "default"
      ddTraceConfigs:
        - name: DD_SERVICE
          value: checkout
        - name: DD_ENV
          value: production
```

ワークロード名、ネームスペース、トレーサー言語、およびサービスタグを、アプリケーションの正しい値に置き換えます。`targetRef` は、API バージョン、種類、および名前によってワークロードを識別します。一度に 1 つの `DatadogInstrumentation` カスタムリソースのみが特定のワークロードをターゲットにできます。そのワークロードのリソースがすでに存在する場合は、そのリソースに `config.apm` を追加します。
適用後、対象ワークロードに属する新しい Pod は、リソースで定義されたトレーサーと設定によってインスツルメントされます。

サポートされているターゲットの種類は、`Deployment`、`StatefulSet`、`DaemonSet`、`Job`、`CronJob`、および Argo `Rollout` です。

##### 構成設定 {#configuration-settings}

`spec.config.apm` の下に以下のフィールドを設定します。

| フィールド | 説明 |
|-------|-------------|
| `enabled` | [ワークロードのインスツルメンテーションを無効にする](#disable-instrumentation-with-datadoginstrumentation)には、`false` に設定します。|
| `ddTraceVersions` | SDK 言語識別子をバージョンにマッピングします。[SSI 互換性要件][36]に従い、`java`、`js` (Node.js)、`python`、`dotnet`、`ruby`、`php`、または `c` を指定します。リストされている SDK のみが挿入されます。`"default"` を使用して Agent のデフォルトの SDK バージョンを使用するか、特定のバージョンを固定します。省略した場合、Agent はサポートされている SDK のデフォルトセットを使用します。|
| `ddTraceConfigs` | SDK 環境変数のリスト。各 `name` は `DD_` で始まる必要があります。リテラル文字列には `value` を、Kubernetes 環境変数リファレンスには `valueFrom` を使用します。|

たとえば、Continuous Profiler を有効にし、Pod ラベルからサービス名を読み取るには、これらのエントリを `ddTraceConfigs` に追加します。

```yaml
ddTraceConfigs:
  - name: DD_PROFILING_ENABLED
    value: "auto"
  - name: DD_SERVICE
    valueFrom:
      fieldRef:
        fieldPath: metadata.labels['app.kubernetes.io/name']
```

参照先のラベルはアプリケーションの Pod 上に存在する必要があります。その他の SDK オプションについては、[ライブラリ構成][7]を参照してください。

##### 他のターゲティング方法に対する優先順位 {#precedence-over-other-targeting-methods}

一致する DDI 構成は、`spec.config.apm.enabled` が `false` である場合を含め、優先度の低いソースよりも優先されます。Pod SDK アノテーションで上書きできます。DDI のみでワークロードを管理するには、Pod の仕様から競合するアノテーションを削除してください。完全な順序については、「[構成の優先順位](#configuration-precedence)」セクションを参照してください。

[7]: /ja/tracing/trace_collection/library_config/
[36]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/

{{% /tab %}}

{{% tab "レガシー (<=v7.63)" %}}

#### ネームスペースのインスツルメンテーションを有効または無効にする {#enable-or-disable-instrumentation-for-namespaces}

特定のネームスペース内のアプリケーションに対してインスツルメンテーションを有効または無効にすることができます。enabledNamespaces または disabledNamespaces のいずれか一方のみを設定できます。両方を設定することはできません。

どのファイルを編集するかは、Datadog Operator と Helm のどちらでシングルステップインスツルメンテーションを有効にしたかによって異なります。

{{< collapse-content title="Datadog Operator" level="h5" >}}

特定のネームスペースでインスツルメンテーションを有効にするには、`enabledNamespaces` の構成を `datadog-agent.yaml` に追加します。

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         enabledNamespaces: # Add namespaces to instrument
           - default
           - applications
{{< /highlight >}}

特定のネームスペースでインスツルメンテーションを無効にするには、`disabledNamespaces` の構成を `datadog-agent.yaml` に追加します。

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

特定のネームスペースでインスツルメンテーションを有効にするには、`enabledNamespaces` の構成を `datadog-values.yaml` に追加します。

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          enabledNamespaces: # Add namespaces to instrument
             - namespace_1
             - namespace_2
{{< /highlight >}}

特定のネームスペースでインスツルメンテーションを無効にするには、`disabledNamespaces` の構成を `datadog-values.yaml` に追加します。

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

特定の Pod で動作するアプリケーションを自動的にインスツルメントするには、Pod の仕様にアプリケーション対応の言語アノテーションとライブラリバージョンを追加してください。

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

<div class="alert alert-danger">注意が必要なケースとして、 <code>latest</code> タグを使う場合があります。ライブラリのリリースの多くでは、それによって破壊的な変更をもたらされる可能性があります。</div>

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

特定の Pod に対してアノテーションを使用して自動インスツルメンテーションを有効にしていない場合、SSI 構成を使用してクラスター全体でインスツルメンテーションする言語を指定できます。`apm.instrumentation.libVersions` が設定されている場合、指定されたライブラリのバージョンを使用してインスツルメントされるのは、指定された言語で作成されたアプリケーションだけです。

どのファイルを編集するかは、Datadog Operator と Helm のどちらでシングルステップインスツルメンテーションを有効にしたかによって異なります。

{{< collapse-content title="Datadog Operator" level="h6" >}}

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

{{< collapse-content title="Helm" level="h6" >}}

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

#### 構成の優先順位 {#configuration-precedence}

アドミッションの対象となる Pod の場合、Cluster Agent は以下の順序 (優先度の高い順) で APM 構成を選択します。

1. `admission.datadoghq.com/java-lib.version` などの Pod アノテーション。
1. ワークロードの `DatadogInstrumentation` APM 構成。
1. [Datadog で定義されたインスツルメンテーションルール](?tab=instrumentationrulesindatadogv7842#target-specific-workloads) (有効な場合)。
1. Agent で構成された `apm.instrumentation.targets` または `enabledNamespaces`。インスツルメンテーションルールの [デフォルトの動作](?tab=instrumentationrulesindatadogv7842#set-the-default-behavior)が [{{< ui >}}Block everything else{{< /ui >}}] (その他をすべてブロック) または [{{< ui >}}Allow everything else{{< /ui >}}] (その他をすべて許可) の場合、これらの設定は無視されます。
1. クラスター全体のインスツルメンテーション (`apm.instrumentation.targets` なし、かつ Datadog にインスツルメンテーションルールがない状態で有効にした場合)。

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

1. Datadog のコンテナイメージをプライベートレジストリにミラーリングするには、[これらの手順][34]に従います。

   必要なのは、インスツルメントする言語のイメージだけです。どのイメージが必要か不明な場合、ほとんどのケースをカバーする基本的なラインを以下に示します。

   - `apm-inject`
   - `dd-lib-java-init`
   - `dd-lib-python-init`
   - `dd-lib-dotnet-init`
   - `dd-lib-php-init`
   - `dd-lib-ruby-init`
   - `dd-lib-js-init`

   これらのイメージは、[gcr.io][12]、[Docker Hub][13]、または [Amazon ECR Public Gallery][14] にあります。

2. 構成に従ってイメージをタグ付けします。

   ミラーリングするバージョンは、ワークロードで設定されているバージョンと一致している必要があります。これらは以下のいずれかの方法で設定されていることがあります。
   - DDI リソース内の `spec.config.apm.ddTraceVersions` でワークロードごとに、
   - `ddTraceVersions` を使用する Agent で構成されたターゲットで、または
   - `admission.datadoghq.com/java-lib.version` のようにアノテーションを使用して Pod ごとに。

   明示的にバージョンが設定されていない場合は、デフォルトバージョン (`0`) が使用されます。

   たとえば、次のようになります。

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

3. プライベートレジストリを使用するよう、Cluster Agent 構成を更新します。

   プライベートレジストリを使用するように、Cluster Agent 構成の中で `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` 環境変数を設定します。

コンテナレジストリを変更する詳細については、[コンテナレジストリの変更][33]を参照してください。

### EKS でのコンテナネットワークインターフェイスの使用 {#using-a-container-network-interface-on-eks}

Calico のような CNI を使用する場合、コントロールプレーンノードは Datadog の Admission Controller へのネットワーク接続を開始できず、「アドレスが許可されていない」というエラーが報告されます。
シングルステップインスツルメンテーションを使用するには、`useHostNetwork: true` パラメーターにより Datadog の Cluster Agent に変更を加えます。

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

#### DatadogInstrumentationでインスツルメンテーションを無効にする {#disable-instrumentation-with-datadoginstrumentation}

ワークロードの DDI リソースで `spec.config.apm.enabled` を `false` に設定し、その `targetRef` とチェックまたはログの構成を保持します。

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: checkout-apm
  namespace: apps
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: checkout
  config:
    apm:
      enabled: false
```

リソースを適用し、ステータスに変更が反映されていることを確認し、ワークロードを再起動します。既存の Pod は、置き換えられるまでインスツルメントされたままになります。

#### ターゲティングルールを使用して特定のワークロードをターゲットにする {#use-targeting-rules-to-target-specific-workloads}

ターゲティングルール (Agent v7.64 以上で利用可能) を使用すると、特定のアプリケーションのトレースを有効または無効にできます。構成の詳細については、「[高度なオプション](#advanced-options)」セクションを参照してください。

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

クラスター全体で SSI を停止するには、以下を実行します。

1. 各 DDI リソースで `spec.config.apm.enabled: false` を設定するか、その APM セクションを削除します。
1. Pod SDK 選択アノテーションを削除し、すべての Remote Configuration インスツルメンテーションポリシーを無効にします。
1. 以下に示すように、Agent で構成されたインスツルメンテーションを無効にします。
1. 構成の変更を適用した後、アプリケーションの Pod を置き換えます。

どのファイルを編集するかは、Datadog Operator と Helm のどちらでシングルステップインスツルメンテーションを有効にしたかによって異なります。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. `datadog-agent.yaml` で `instrumentation.enabled=false` を設定します。
   ```yaml
   features:
     apm:
       instrumentation:
         enabled: false
   ```

2. 更新した構成ファイルで Datadog Agent をデプロイします。
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
{{% /tab %}}

{{% tab "Helm" %}}

1. `datadog-values.yaml` で `instrumentation.enabled=false` を設定します。
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

APM の有効化を正確に制御するには、[DatadogInstrumentation (DDI)](#target-specific-workloads) を使用して特定のワークロードをインスツルメントします。少数のワークロードから開始し、トレースを確認し、対象のワークロードを拡大します。

Agent で構成されたターゲティングルールを使用する場合、以下の例でラベルとネームスペースセレクターを使用してインスツルメンテーションを制御する方法を示します。

{{% collapse-content title="制御された APM 展開のためにオプトインラベルを使用します。" level="h3" expanded=false id="opt-in-labels-controlled-apm-rollout" %}}

#### デフォルトとオプトインインスツルメンテーション {#default-vs-opt-in-instrumentation}
| モード    | 動作    | 使用する場合 |
| ---  | ----------- | ----------- |
| デフォルト | クラスター内のサポートされている全プロセスがインスツルメントされます。| 小さなクラスターまたはプロトタイプ。|
| オプトイン | インスツルメンテーションを特定のネームスペースまたは Pod に制限するために、[インスツルメンテーションルール][4]を使用します。| プロダクションクラスター、段階的ロールアウト、またはコストが大きな問題となるユースケース。|

#### 例: 特定の Pod のインスツルメンテーションを有効にする {#example-enable-instrumentation-for-specific-pods}

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

2. Datadog Agent Helm の構成で、SSI を有効にし、`podSelector` を使用することにより、オプトインラベルが一致する Pod のみに挿入します。

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


{{% collapse-content title="どの Datadog SDK がロードされるかを制御する" level="h3" expanded=false id="control-loaded-datadog-sdks" %}}

Agent Helm の構成で `ddTraceVersions` を使用することにより、Datadog SDK の言語とバージョンの両方を制御します。これにより、不必要な SDK がダウンロードされるのを防ぎ、init コンテナのフットプリントを最小限に抑え、イメージサイズを削減し、より意図的なトレースのアップグレードが可能になります (たとえば、コンプライアンス要件を満たすため、またはデバッグを簡素化するため)。

#### 例: ネームスペースの Java SDK を指定する {#example-specify-a-java-sdk-for-a-namespace}

`login-service` ネームスペースで、Java アプリケーションだけが実行されます。他の SDK のダウンロードを避けるため、そのネームスペースをターゲットとするように Agent を構成し、Java SDK バージョン 1.48.2 のみを挿入します。


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

## トラブルシューティング{#troubleshooting}

SSI で APM を有効にする際に問題が発生した場合は、[SSI トラブルシューティングガイド][35]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /ja/tracing/glossary/#instrumentation
[4]: /ja/tracing/trace_collection/single-step-apm/kubernetes/#target-specific-workloads
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
[40]: https://app.datadoghq.com/organization-settings/api-keys
[42]: https://app.datadoghq.com/apm/services
[41]: /ja/tracing/guide/injectors/
[43]: /ja/getting_started/site/