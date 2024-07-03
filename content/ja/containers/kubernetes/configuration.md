---
aliases:
- /ja/integrations/faq/gathering-kubernetes-events
- /ja/agent/kubernetes/event_collection
- /ja/agent/kubernetes/configuration
title: Further Configure the Datadog Agent on Kubernetes
---

## 概要

Kubernetes 環境に Datadog Agent をインストールした後、追加の構成オプションを選択することができます。

### Datadog による以下の収集を有効にします。
- [トレース (APM)](#enable-apm-and-tracing)
- [Kubernetes イベント](#enable-kubernetes-event-collection)
- [NPM](#enable-npm-collection)
- [ログ](#enable-log-collection)
- [プロセス](#enable-process-collection)

### その他の機能
- [Datadog Cluster Agent](#datadog-cluster-agent)
- [インテグレーション](#integrations)
- [コンテナビュー](#containers-view)
- [Orchestrator Explorer](#orchestrator-explorer)
- [外部メトリクスサーバー](#custom-metrics-server)

### その他の構成
- [環境変数](#environment-variables)
- [カスタムメトリクス用の DogStatsD](#configure-dogstatsd)
- [タグマッピング](#configure-tag-mapping)
- [シークレット](#using-secret-files)
- [コンテナを無視](#ignore-containers)
- [Kubernetes API サーバーのタイムアウト](#kubernetes-api-server-timeout)
- [Proxy 設定](#proxy-settings)
- [オートディスカバリー](#autodiscovery)
- [その他](#miscellaneous)

## APM とトレースの有効化

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Edit your `datadog-agent.yaml` to set `features.apm.enabled` to `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    apm:
      enabled: true
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

In Helm, APM is **enabled by default** over UDS or Windows named pipe.

To verify, ensure that `datadog.apm.socketEnabled` is set to `true` in your `values.yaml`.

```yaml
datadog:
  apm:
    socketEnabled: true    
```

{{% /tab %}}
{{< /tabs >}}

詳細については、[Kubernetes トレース収集][16]を参照してください。

## Kubernetes イベント収集の有効化

[Datadog Cluster Agent][2] を使用して Kubernetes イベントを収集します。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator では、イベント収集がデフォルトで有効になっています。これは `datadog-agent.yaml` の構成 `features.eventCollection.collectKubernetesEvents` で管理することができます。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    site: <DATADOG_SITE>

  features:
    eventCollection:
      collectKubernetesEvents: true
```

{{% /tab %}}
{{% tab "Helm" %}}

Datadog Cluster Agent で Kubernetes イベントを収集するには、`datadog-values.yaml` ファイルで `clusterAgent.enabled`、`datadog.collectEvents`、`clusterAgent.rbac.create` オプションが `true` に設定されていることを確認します。

```yaml
datadog:
  collectEvents: true
clusterAgent:
  enabled: true
  rbac: 
    create: true
```

Cluster Agent を使用しない場合でも、`datadog-values.yaml` ファイルで `datadog.leaderElection`、`datadog.collectEvents`、`agents.rbac.create` オプションを `true` に設定すれば、Node Agent に Kubernetes イベントを収集させることができます。

```yaml
datadog:
  leaderElection: true
  collectEvents: true
agents:
  rbac:
    create: true
```

[1]: /ja/containers/cluster_agent

{{% /tab %}}
{{< /tabs >}}

DaemonSet の構成については、[DaemonSet Cluster Agent のイベント収集][14]を参照してください。

## NPM 収集の有効化

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` で `features.npm.enabled` を `true` に設定します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    npm:
      enabled: true
```

次に、新しいコンフィギュレーションを適用します。

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

以下の構成で `datadog-values.yaml` を更新します。

```yaml
datadog:
  # (...)
  networkMonitoring:
    enabled: true
```

次に、Helm チャートをアップグレードします。

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

詳細については、[ネットワークパフォーマンスモニタリング][18]を参照してください。

## ログ収集の有効化

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`datadog-agent.yaml` で、`features.logCollection.enabled` と `features.logCollection.containerCollectAll` を `true` に設定します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

次に、新しいコンフィギュレーションを適用します。

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
以下の構成で `datadog-values.yaml` を更新します。

```yaml
datadog:
  # (...)
  logs:
    enabled: true
    containerCollectAll: true
```

次に、Helm チャートをアップグレードします。

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

詳細については、[Kubernetes ログ収集][17]を参照してください。

## プロセス収集の有効化

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`datadog-agent.yaml` で、`features.liveProcessCollection.enabled` を `true` に設定します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    liveProcessCollection:
      enabled: true
```

次に、新しいコンフィギュレーションを適用します。

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
以下の構成で `datadog-values.yaml` を更新します。

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
    processCollection: true
```

次に、Helm チャートをアップグレードします。

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

詳しくは、[ライブプロセス][23]をご覧ください。
## Datadog Cluster Agent

Datadog Cluster Agent は、クラスターレベルの監視データを収集するための合理化された一元的なアプローチを提供します。Datadog は、Kubernetes のモニタリングに Cluster Agent を使用することを強く推奨します。

Datadog Operator v1.0.0+ と Helm チャート v2.7.0+ では、**デフォルトで Cluster Agent が有効になります**。これ以上の構成は必要ありません。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator v1.0.0+ は、デフォルトで Cluster Agent を有効にします。Operator は必要な RBAC を作成し、 Cluster Agent をデプロイします。両方の Agent が同じ API キーを使用します。

Operator は、安全な通信のために Datadog Agent と Cluster Agent が共有する Kubernetes `Secret` にランダムなトークンを自動的に生成します。

このトークンは `datadog-agent.yaml` の `global.clusterAgentToken` フィールドに手動で指定することができます。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterAgentToken: <DATADOG_CLUSTER_AGENT_TOKEN>
```

あるいは、既存の `Secret` の名前と、このトークンを含むデータキーを参照して、このトークンを指定することもできます。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterAgentTokenSecret: 
      secretName: <SECRET_NAME>
      keyName: <KEY_NAME>
```

**注**: 手動で設定する場合、このトークンは 32 文字の英数字である必要があります。

次に、新しいコンフィギュレーションを適用します。

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm チャート v2.7.0+ はデフォルトで Cluster Agent を有効にします。

検証のため、`datadog-values.yaml` で `clusterAgent.enabled` が `true` に設定されていることを確認してください。

```yaml
clusterAgent:
  enabled: true
```

Helm は、安全な通信のために Datadog Agent と Cluster Agent が共有する Kubernetes `Secret` にランダムなトークンを自動的に生成します。

このトークンは `datadog-agent.yaml` の `clusterAgent.token` フィールドに手動で指定することができます。

```yaml
clusterAgent:
  enabled: true
  token: <DATADOG_CLUSTER_AGENT_TOKEN>
```

あるいは、既存の `Secret` の名前を参照してこのトークンを指定することもできます。ここで、トークンは `token` という名前のキーにあります。

```yaml
clusterAgent:
  enabled: true
  tokenExistingSecret: <SECRET_NAME>
```

{{% /tab %}}
{{< /tabs >}}

詳細については、[Datadog Cluster Agent のドキュメント][2]を参照してください。

## カスタムメトリクスサーバー

Cluster Agent の[カスタムメトリクスサーバー][22]機能を使用するには、Datadog の[アプリケーションキー][24]を提供し、メトリクスプロバイダーを有効にする必要があります。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`datadog-agent.yaml` で、`spec.global.credentials.appKey` にアプリケーションキーを指定し、`features.externalMetricsServer.enabled` を `true` に設定します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>

  features:
    externalMetricsServer:
      enabled: true
```

次に、新しいコンフィギュレーションを適用します。

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```
{{% /tab %}}
{{% tab "Helm" %}}
`datadog-values.yaml` で、`datadog.appKey` にアプリケーションキーを指定し、`clusterAgent.metricsProvider.enabled` を `true` に設定します。

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>

clusterAgent:
  enabled: true
  metricsProvider:
    enabled: true
```

次に、Helm チャートをアップグレードします。

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

## インテグレーション

クラスター内で Agent が実行されたら、[Datadog のオートディスカバリー機能][5]を使いポッドからメトリクスとログを自動的に収集します。

## コンテナビュー

Datadog の[コンテナエクスプローラー][3]を利用するには、Process Agent を有効にしてください。Datadog Operator と Helm チャートでは、**デフォルトで Process Agent が有効になります**。それ以上の構成は必要ありません。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator では、プロセスが Agent がデフォルトで有効になります。

検証のため、`datadog-agent.yaml` で`features.liveContainerCollection.enabled` が `true` に設定されていることを確認してください。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    liveContainerCollection:
      enabled: true
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm チャートでは、デフォルトで Process Agent が有効になります。

検証のため、`datadog-values.yaml` で `processAgent.enabled` が `true` に設定されていることを確認してください。

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
```

一部のセットアップでは、Process Agent と Cluster Agent で Kubernetes クラスター名が自動検出されません。この場合、機能は起動せず、Cluster Agent ログで以下のような警告が表示されます。`Orchestrator explorer enabled but no cluster name set: disabling.`。この場合、`datadog.clusterName` を `values.yaml` でクラスター名に設定する必要があります。

```yaml
datadog:
  #(...)
  clusterName: <YOUR_CLUSTER_NAME>
  #(...)
  processAgent:
    enabled: true
```

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

詳細は、[コンテナビュー][15]のドキュメントを参照してください。

## オーケストレーターエクスプローラー

Datadog Operator と Helm チャートでは、デフォルトで **Datadog の [Orchestrator Explorer][20] が有効になります**。これ以上の構成は必要ありません。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator では、オーケストレータエクスプローラーがデフォルトで有効になります。

検証のため、`datadog-agent.yaml` で`features.orchestratorExplorer.enabled` パラメーターが `true` に設定されていることを確認してください。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    orchestratorExplorer:
      enabled: true
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm チャートでは、デフォルトで Orchestrator Explorer が有効になります。

検証のため、 `datadog-values.yaml` ファイルで `orchestratorExplorer.enabled` パラメーターが `true` に設定されていることを確認してください。

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}

詳細は、[Orchestrator Explorer のドキュメント][21]を参照してください。

## 基本のコンフィギュレーション

Use the following configuration fields to configure the Datadog Agent.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

| パラメーター (v2alpha1) |  説明 |
| --------------------------- | ----------- |
| `global.credentials.apiKey` |  Datadog API キーを構成します。 |
| `global.credentials.apiSecret.secretName` | `global.credentials.apiKey` の代わりに、Datadog API キーを含む Kubernetes `Secret` の名前を指定します。|
| `global.credentials.apiSecret.keyName` | `global.credentials.apiKey` の代わりに、`global.credentials.apiSecret.secretName` で指定した Kubernetes の `Secret` のキーを指定します。|
| `global.credentials.appKey` |  Datadog アプリケーションキーを構成します。外部メトリクス サーバーを使用している場合は、メトリクスへの読み取りアクセス用に Datadog アプリケーション キーを設定する必要があります。 |
| `global.credentials.appSecret.secretName` | `global.credentials.apiKey` の代わりに、Datadog アプリキーを含む Kubernetes `Secret` の名前を指定します。|
| `global.credentials.appSecret.keyName` | `global.credentials.apiKey` の代わりに、`global.credentials.appSecret.secretName` で指定した Kubernetes の `Secret` のキーを指定します。|
| `global.logLevel` | ロギングの冗長性を設定します。これはコンテナによってオーバーライドできます。有効なログレベルは `trace`、`debug`、`info`、`warn`、`error`、`critical`、`off` です。デフォルト: `info`。 |
| `global.registry` | すべての Agent イメージに使用するイメージレジストリ。デフォルト: `gcr.io/datadoghq`。 |
| `global.site` | Agent データを送信する Datadog [インテークサイト][1]を設定します。サイトは {{< region-param key="dd_site" code="true" >}} です。(右側で正しい SITE が選択されていることを確認してください)。 |
| `global.tags` | 収集されるすべてのメトリクス、イベント、サービスチェックにアタッチされるタグのリスト。 |

For a complete list of configuration fields for the Datadog Operator, see the [Operator v2alpha1 spec][2]. For older versions, see the [Operator v1alpha1 spec][3]. Configuration fields can also be queried using `kubectl explain datadogagent --recursive`.

[1]: /ja/getting_started/
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[3]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v1alpha1.md 
{{% /tab %}}
{{% tab "Helm" %}}
|  Helm | 説明 |
|  ---- | ----------- |
|  `datadog.apiKey` | Datadog API キーを構成します。 |
| `datadog.apiKeyExistingSecret` | `datadog.apiKey` の代わりに、キー名 `api-key` で設定した Datadog API キーを含む既存の Kubernetes `Secret` の名前を指定します。 |
|  `datadog.appKey` | Datadog アプリケーションキーを構成します。外部メトリクス サーバーを使用している場合は、メトリクスへの読み取りアクセス用に Datadog アプリケーション キーを設定する必要があります。 |
| `datadog.appKeyExistingSecret` | `datadog.appKey`の代わりに、キー名 `app-key` で設定した Datadog アプリキーを含む既存の Kubernetes `Secret` の名前を指定します。 |
| `datadog.logLevel` | ロギングの冗長性を設定します。これはコンテナによってオーバーライドできます。有効なログレベルは `trace`、`debug`、`info`、`warn`、`error`、`critical`、`off` です。デフォルト: `info`。 |
| `registry` | すべての Agent イメージに使用するイメージレジストリ。デフォルト: `gcr.io/datadoghq`。 |
| `datadog.site` | Agent データを送信する Datadog [インテークサイト][1]を設定します。サイトは {{< region-param key="dd_site" code="true" >}} です。(右側で正しい SITE が選択されていることを確認してください)。 |
| `datadog.tags` | 収集したメトリクス、イベント、サービスチェックにアタッチするタグのリスト。 |

Helm チャートの環境変数の完全なリストについては、`datadog-values.yaml` の[オプションの完全なリスト][2]を参照してください。

[1]: /ja/getting_started/site
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#all-configuration-options
{{% /tab %}}
{{% tab "DaemonSet" %}}
| 環境変数         | 説明                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Datadog API キー (**必須**)                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | 送信されるすべてのデータのグローバルな `env` タグを設定します。                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | メトリクスに使用するホスト名 (自動検出に失敗した場合)                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`            | スペースで区切られたホストタグ。例: `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | メトリクス、トレース、ログの宛先サイト。`DD_SITE` は {{< region-param key="dd_site" code="true">}} です。デフォルトは `datadoghq.com` です。                                                                                                                                                                                               |
| `DD_DD_URL`          | メトリクス送信用の URL をオーバーライドするオプション設定。                                                                                                                                                                                                                                                                                      |
| `DD_URL` (6.36+/7.36+)            | `DD_DD_URL` のエイリアス。すでに `DD_DD_URL` が設定されている場合は無視されます。                                                                                                                                                                                                                                                                                    |
| `DD_CHECK_RUNNERS`   | Agent はデフォルトですべてのチェックを同時に実行します (デフォルト値 = `4` ランナー)。チェックを順次実行するには、値を `1` に設定します。多くのチェック (または遅いチェック) を実行する必要がある場合、`collector-queue` コンポーネントが遅れてヘルスチェックに失敗する可能性があります。ランナーの数を増やすことで、チェックを並列に実行することができます。 |
| `DD_LEADER_ELECTION` | Agent の複数のインスタンスがクラスターで動作している場合、イベント収集の重複を避けるためにこの変数を `true` に設定します。                                                                                                                                                                                                                         |
{{% /tab %}}
{{< /tabs >}}

## 環境変数
The containerized Datadog Agent can be configured by using environment variables. For an extensive list of supported environment variables, see the [Environment variables][26] section of the Docker Agent documentation.

### 例
{{< tabs >}}
{{% tab "Datadog Operator" %}}
When using the Datadog Operator, you can set additional environment variables in `override` for a component with `[key].env []object`, or for a container with `[key].containers.[key].env []object`. The following keys are supported: 

- `nodeAgent`
- `clusterAgent`
- `clusterChecksRunner`

Container-level settings take priority over any component-level settings.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: <ENV_VAR_NAME>
          value: <ENV_VAR_VALUE>
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
  - name: <ENV_VAR_NAME>
    value: <ENV_VAR_VALUE>
clusterAgent:
  env:
  - name: <ENV_VAR_NAME>
    value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{% tab "DaemonSet" %}}
Add environment variables to the DaemonSet or Deployment (for Datadog Cluster Agent).
```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          ...
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{< /tabs >}}

## DogStatsD の構成

DogStatsD は、StatsD プロトコルで UDP 経由でカスタムメトリクスを送信できます。**DogStatsD は Datadog Operator と Helm でデフォルトで有効になっています**。詳細は [DogStatsD ドキュメント][19]を参照してください。

以下の環境変数を使用して、DaemonSet で DogStatsD を構成できます。

| 環境変数                     | 説明                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | 他のコンテナからの DogStatsD パケットをリスニングします (カスタムメトリクスの送信に必要)。                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | 計算するヒストグラムのパーセンタイル (スペース区切り)。デフォルトは `0.95` です。                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | 計算するヒストグラムの集計 (スペース区切り)。デフォルトは `"max median avg count"` です。                                                          |
| `DD_DOGSTATSD_SOCKET`            | リスニングする Unix ソケットのパス。`rw` でマウントされたボリューム内にある必要があります。                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Unix ソケットのメトリクス用にコンテナの検出とタグ付けを有効にします。                                                                                            |
| `DD_DOGSTATSD_TAGS`              | この DogStatsD サーバーが受信するすべてのメトリクス、イベント、サービスのチェックに付加する追加タグ。たとえば `"env:golden group:retrievers"` のように追加します。 |

## タグマッピングの構成

Datadog は Kubernetes から共通のタグを自動的に収集します。

さらに、Kubernetes ノードラベル、ポッドラベル、アノテーションを Datadog タグにマッピングすることができます。このマッピングを構成するには、以下の環境変数を使用します。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

| パラメーター (v2alpha1) |  説明 |
| --------------------------- |  ----------- |
| `global.namespaceLabelsAsTags` |  Kubernetes ネームスペースラベルと Datadog タグのマッピングを提供します。`<KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>` |
| `global.nodeLabelsAsTags` | Kubernetes ノードラベルと Datadog タグのマッピングを提供します。`<KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>` |
| `global.podAnnotationsAsTags` |  Kubernetes アノテーションと Datadog タグのマッピングを提供します。`<KUBERNETES_ANNOTATION>: <DATADOG_TAG_KEY>` |
| `global.podLabelsAsTags` |  Kubernetes ラベルと Datadog タグのマッピングを提供します。`<KUBERNETES_LABEL>: <DATADOG_TAG_KEY>` |

### 例

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    namespaceLabelsAsTags:
      env: environment
      # <KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>
    nodeLabelsAsTags:
      beta.kubernetes.io/instance-type: aws-instance-type
      kubernetes.io/role: kube_role
      # <KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>
    podLabelsAsTags:
      app: kube_app
      release: helm_release
      # <KUBERNETES_LABEL>: <DATADOG_TAG_KEY>
    podAnnotationsAsTags:
      iam.amazonaws.com/role: kube_iamrole
       # <KUBERNETES_ANNOTATIONS>: <DATADOG_TAG_KEY>
```

{{% /tab %}}
{{% tab "Helm" %}}

|  Helm | 説明 |
| --------------------------- | ----------- |
|  `datadog.namespaceLabelsAsTags` | Kubernetes ネームスペースラベルと Datadog タグのマッピングを提供します。`<KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>` |
|  `datadog.nodeLabelsAsTags` | Kubernetes ノードラベルと Datadog タグのマッピングを提供します。`<KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>` |
|  `datadog.podAnnotationsAsTags` | Kubernetes アノテーションと Datadog タグのマッピングを提供します。`<KUBERNETES_ANNOTATION>: <DATADOG_TAG_KEY>` |
|  `datadog.podLabelsAsTags` | Kubernetes ラベルと Datadog タグのマッピングを提供します。`<KUBERNETES_LABEL>: <DATADOG_TAG_KEY>` |

### 例

```yaml
datadog:
  # (...)
  namespaceLabelsAsTags:
    env: environment
    # <KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>
  nodeLabelsAsTags:
    beta.kubernetes.io/instance-type: aws-instance-type
    kubernetes.io/role: kube_role
    # <KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>
  podLabelsAsTags:
    app: kube_app
    release: helm_release
    # <KUBERNETES_LABEL>: <DATADOG_TAG_KEY>
  podAnnotationsAsTags:
    iam.amazonaws.com/role: kube_iamrole
     # <KUBERNETES_ANNOTATIONS>: <DATADOG_TAG_KEY>
```

{{% /tab %}}
{{< /tabs >}}

## シークレットファイルの使用

インテグレーションの資格情報を Docker や Kubernetes のシークレットに格納し、オートディスカバリーテンプレートで使用できます。詳細については、[シークレット管理][12]を参照してください。

## コンテナの無視

ログの収集、メトリクスの収集、オートディスカバリーからコンテナを除外します。Datadog はデフォルトで Kubernetes と OpenShift の `pause` コンテナを除外します。これらの許可リストとブロックリストはオートディスカバリーにのみ適用されます。トレースと DogStatsD は影響を受けません。これらの環境変数は、その値において正規表現をサポートしています。

例については、[コンテナのディスカバリー管理][13]のページを参照してください。

**注**: `kubernetes.containers.running`、`kubernetes.pods.running`、`docker.containers.running`、`.stopped`、`.running.total`、`.stopped.total` の各メトリクスは、この設定の影響を受けません。すべてのコンテナを対象とします。

## Kubernetes API サーバーのタイムアウト

デフォルトでは、[Kubernetes State Metrics Core チェック][25]は、Kubernetes API サーバーからの応答を 10 秒間待ちます。大規模なクラスターでは、リクエストがタイムアウトし、メトリクスが欠落する可能性があります。

環境変数 `DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT` をデフォルトの 10 秒よりも大きな値に設定することで、これを避けることができます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
以下の構成で `datadog-agent.yaml` を更新します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    clusterAgent:
      env:
        - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
          value: <value_greater_than_10>
```

次に、新しいコンフィギュレーションを適用します。

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
以下の構成で `datadog-values.yaml` を更新します。

```yaml
clusterAgent:
  env:
    - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
      value: <value_greater_than_10>
```

次に、Helm チャートをアップグレードします。

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

## プロキシ設定

Agent v6.4.0 (トレース Agent の場合は v6.5.0) より、以下の環境変数を使用して Agent のプロキシ設定を上書きできるようになりました。

| 環境変数             | 説明                                                            |
|--------------------------|------------------------------------------------------------------------|
| `DD_PROXY_HTTP`          | `http` リクエスト用のプロキシとして使用する HTTP URL です。                     |
| `DD_PROXY_HTTPS`         | `https` リクエスト用のプロキシとして使用する HTTPS URL です。                   |
| `DD_PROXY_NO_PROXY`      | プロキシを使用すべきではない場合に必要となる、URL をスペースで区切ったリストです。      |
| `DD_SKIP_SSL_VALIDATION` | Agent と Datadog との接続で問題が発生した場合にテストを実施するオプションです。 |

## オートディスカバリー

| 環境変数                 | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_LISTENERS`               | 実行するオートディスカバリーリスナー。                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `DD_EXTRA_LISTENERS`         | 実行するオートディスカバリーリスナーを追加します。これは `datadog.yaml` コンフィギュレーションファイルの `listeners` セクションで定義された変数に加えて追加されます。                                                                                                                                                                                                                                                                                                                                    |
| `DD_CONFIG_PROVIDERS`        | Agent がチェック構成を収集するために呼び出すべきプロバイダー。利用可能なプロバイダーは次の通りです。 <br>`kubelet` - ポッドアノテーションに埋め込まれたテンプレートを処理します。 <br>`docker` - コンテナラベルに埋め込まれたテンプレートを処理します。 <br>`clusterchecks` - Cluster Agent からクラスターレベルのチェック構成を取得します。 <br>`kube_services` - クラスターのチェックのために Kubernetes サービスを監視します。 |
| `DD_EXTRA_CONFIG_PROVIDERS`  | 使用するオートディスカバリー構成プロバイダーを追加します。これは `datadog.yaml` コンフィギュレーションファイルの `config_providers` セクションで定義された変数に加えて追加されます。 |

## その他

| 環境変数                        | 説明                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | コンテナソースの自動検出を上書きして、1 つのソースに制限します (`"docker"`、`"ecs_fargate"`、`"kubelet"` など)。Agent v7.35.0 以降、不要になりました。                                                                                                     |
| `DD_HEALTH_PORT`                    | これを `5555` に設定すると、Agent のヘルスチェックをポート `5555` で公開します。                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | カスタム Kubernetes クラスター識別子を設定して、ホストエイリアスの衝突を回避します。クラスター名は最大 40 文字で、小文字、数字、およびハイフンのみという制限があります。また、文字で始める必要があり、 数字または文字で終わる必要があります。 |
| `DD_COLLECT_KUBERNETES_EVENTS ` | Agent でのイベント収集を有効にします。クラスターで複数の Agent インスタンスを実行している場合は、`DD_LEADER_ELECTION` も `true` に設定します。                                                                                                                       |


[1]: /ja/agent/
[2]: /ja/containers/cluster_agent/
[3]: https://app.datadoghq.com/containers
[5]: /ja/containers/kubernetes/integrations/
[12]: /ja/agent/configuration/secrets-management/
[13]: /ja/agent/guide/autodiscovery-management/
[14]: /ja/containers/guide/kubernetes_daemonset#cluster-agent-event-collection
[15]: /ja/infrastructure/containers/
[16]: /ja/containers/kubernetes/apm
[17]: /ja/containers/kubernetes/log
[18]: /ja/network_monitoring/performance/
[19]: /ja/developers/dogstatsd
[20]: https://app.datadoghq.com/orchestration/overview
[21]: /ja/infrastructure/containers/orchestrator_explorer
[22]: /ja/containers/guide/cluster_agent_autoscaling_metrics/?tab=helm
[23]: /ja/infrastructure/process/ 
[24]: /ja/account_management/api-app-keys/#application-keys
[25]: /ja/integrations/kubernetes_state_core/
[26]: /ja/containers/docker/?tab=standard#environment-variables