---
title: Kubernetes
kind: documentation
aliases:
  - /ja/guides/basic_agent_usage/kubernetes
  - /ja/agent/basic_agent_usage/kubernetes
  - /ja/tracing/kubernetes/
  - /ja/tracing/setup/kubernetes
  - /ja/integrations/faq/using-rbac-permission-with-your-kubernetes-integration
  - /ja/integrations/faq/gathering-kubernetes-events
  - /ja/agent/kubernetes/event_collection
  - /ja/agent/kubernetes/daemonset_setup
  - /ja/agent/kubernetes/helm
  - /ja/agent/autodiscovery
further_reading:
  - link: agent/kubernetes/log
    tag: ドキュメント
    text: アプリケーションログの収集
  - link: agent/kubernetes/host_setup
    tag: ドキュメント
    text: アプリケーショントレースの収集
  - link: /agent/kubernetes/prometheus
    tag: ドキュメント
    text: Prometheus メトリクスの収集
  - link: /agent/kubernetes/integrations
    tag: ドキュメント
    text: アプリケーションのメトリクスとログを自動で収集
  - link: /agent/guide/autodiscovery-management
    tag: ドキュメント
    text: データ収集をコンテナのサブセットのみに制限
  - link: /agent/kubernetes/tag
    tag: ドキュメント
    text: コンテナから送信された全データにタグを割り当て
---
## 概要

クラスターやアプリケーションのメトリクス、トレース、ログを収集するには、Kubernetes クラスターで Datadog Agent を DaemonSet として実行します。[Helm チャート](?tab=helm)または [DaemonSet](?tab=daemonset) オブジェクトの YAML 定義を使用して直接デプロイできます。

**注**: Agent バージョン 6.0 以降は、1.7.6 より上のバージョンの Kubernetes のみをサポートします。以前のバージョンの Kubernetes については、[「レガシー Kubernetes バージョン」][1]を参照してください。

## インストール

{{< tabs >}}
{{% tab "Helm" %}}

カスタムリリース名でチャートをインストールするには、`<RELEASE_NAME>` (例 `datadog-agent`):

1. [Helm のインストール][1]
2. [Datadog `value.yaml` コンフィギュレーションファイル][2]をダウンロードします。
3. これが新規インストールの場合は、Helm Datadog リポジトリおよび Helm 安定版リポジトリ (Kube State Metrics チャート用) を追加します。
    ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo add stable https://charts.helm.sh/stable
    helm repo update
    ```
4. [Agent のインストール手順][3]から Datadog API キーを取得し、次を実行します:

- **Helm v3+**

    ```bash
    helm install <RELEASE_NAME> -f values.yaml  --set datadog.apiKey=<DATADOG_API_KEY> datadog/datadog --set targetSystem=<TARGET_SYSTEM>
    ```

    `<対象システム>` を OS 名（`linux` または `windows`）で置き換えます。

- **Helm v1/v2**

    ```bash
    helm install -f values.yaml --name <RELEASE_NAME> --set datadog.apiKey=<DATADOG_API_KEY> datadog/datadog
    ```

このチャートは、DaemonSet 経由でクラスター内のすべてのノードに Datadog Agent を追加します。また、オプションで、[kube-state-metrics チャート][4]をデプロイし、それをクラスターに関するメトリクスの追加ソースとして使用します。インストール後数分すると、Datadog はホストとメトリクスの報告を開始します。

次に、使用する Datadog の機能を有効にします: [APM][5], [Logs][6]

**注**:

- Datadog チャートの構成可能なパラメーターとそのデフォルト値の完全なリストについては、[Datadog Helm リポジトリの README][7] を参照してください。
- 現在のデプロイリージョンで Google Container Registry ([gcr.io/datadoghq][8]) にアクセスが不可能な場合は、`values.yaml` ファイルで下記のコンフィギュレーションで イメージ [datadog/agent][9] および [datadog/cluster-agent][10] とともに Docker Hub レジストリを使用します。

    ```yaml
    agents:
      image:
        repository: datadog/agent

    clusterAgent:
      image:
        repository: datadog/cluster-agent

    clusterChecksRunner:
      image:
        repository: datadog/agent
    ```

### チャート v1 からのアップグレード

v2.0 では、Datadog のチャートはリファクタリングされており、`values.yaml` パラメーターがより論理的に再グループ化されています。

現在、デプロイされているチャートバージョンが `v2.0.0` 以前の場合は、[移行ガイド][11]に従って設定を新しいフィールドにマッピングしてください。

### 非特権

(オプション) 非特権インストールを実行するには、`values.yaml` ファイルに以下を追加します。

```yaml
datadog:
  securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

`<USER_ID>` が、Agent を実行する UID で、`<DOCKER_GROUP_ID>` が、Docker または Containerd ソケットを所有するグループ ID の場合。

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://github.com/helm/charts/tree/master/stable/kube-state-metrics
[5]: /ja/agent/kubernetes/apm?tab=helm
[6]: /ja/agent/kubernetes/log?tab=helm
[7]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog
[8]: https://gcr.io/datadoghq
[9]: https://hub.docker.com/r/datadog/agent
[10]: https://hub.docker.com/r/datadog/cluster-agent
[11]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/docs/Migration_1.x_to_2.x.md
{{% /tab %}}
{{% tab "DaemonSet" %}}

DaemonSet を利用して、すべてのノード (または [nodeSelectors を使用して][1]特定のノード) に Datadog Agent をデプロイします。

Datadog Agent を Kubernetes クラスターにインストールするには:

1. **Agent のアクセス許可を構成**: Kubernetes で RBAC (ロールベースのアクセス制御) が有効になっている場合は、Datadog Agent サービスアカウントに対する RBAC アクセス許可を構成します。Kubernetes 1.6 以降では、RBAC はデフォルトで有効になっています。適切な ClusterRole、ServiceAccount、および ClusterRoleBinding を、以下のコマンドで作成します。

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
    ```

    **注**: RBAC 構成は、デフォルトで `default` ネームスペースに設定されています。カスタムネームスペースを使用している場合、適用する前に `namespace` パラメーターを更新します。

2. **Datadog API キーを含むシークレットを作成**: 下の`<DATADOG_API_KEY>` を[組織の API キー][2]に置き換えます。このシークレットはマニフェストで Datadog Agent をデプロイするために使用されます。

    ```shell
    kubectl create secret generic datadog-agent --from-literal api-key="<DATADOG_API_KEY>" --namespace="default"
    ```

    **注**: これにより、`default` ネームスペースでシークレットが作成されます。カスタムネームスペースを使用している場合、実行前にコマンドの `namespace` パラメーターを更新します。

3. **Datadog Agent マニフェストを作成**。以下のテンプレートを使用して、`datadog-agent.yaml` マニフェストを作成します

    | メトリクス | ログ | APM | プロセス | NPM | Linux                  | Windows                 |
    |---------|------|-----|---------|-----|------------------------|-------------------------|
    | X       | X    | X   | X       |     | [マニフェストテンプレート][3] | [マニフェストテンプレート][4] |
    | X       | X    | X   |         |     | [マニフェストテンプレート][5] | [マニフェストテンプレート][6] |
    | X       | X    |     |         |     | [マニフェストテンプレート][7] | [マニフェストテンプレート][8] |
    | X       |      | X   |         |     | [マニフェストテンプレート][9] | [マニフェストテンプレート][10] |
    |         |      |     |         | X   | [マニフェストテンプレート][11] | テンプレートなし             |
    | X       |      |     |         |     | [マニフェストテンプレート][12] | [マニフェストテンプレート][13] |

   トレース収集を完全に有効にするには、[アプリケーションのポッドコンフィギュレーションで追加の手順が必要となります][14]。それぞれの機能を個別に有効にする方法については、[ログ][15]、[APM][16]、[プロセス][17]、[ネットワークパフォーマンスモニタリング][18]に関するドキュメントページを参照してください。

    **注**: これらのマニフェストは、デフォルトで `default` ネームスペースに設定されています。カスタムネームスペースを使用している場合、適用する前に `metadata.namespace` パラメーターを更新します。

4. `datadog-agent.yaml` マニフェストで、`DD_SITE` 環境変数を使用して **Datadog サイト**を {{< region-param key="dd_site" code="true" >}} に設定します。

5. 次のコマンドで **DaemonSet をデプロイ**します。

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

6. **検証**: 現在の環境で Datadog Agent が DaemonSet として動作していることを検証するには、次を実行します。

    ```shell
    kubectl get daemonset
    ```

   Agent がデプロイされた場合は、以下のようなテキスト出力が表示されます。`DESIRED` と `CURRENT` はクラスター内で実行中のノードの数と等しくなります。

    ```shell
    NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog-agent   2         2         2         2            2           <none>          10s
    ```

7. オプション - **Kubernetes State メトリクスを設定**: [Kube-State マニフェストフォルダー][19]をダウンロードし Kubernetes クラスターに適用すると、[kube-state metrics][20] を自動的に収集できます。

    ```shell
    kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
    ```

### 非特権

(オプション) 非特権インストールを実行するには、[ポッドテンプレート][2]に以下を追加します。

```yaml
  spec:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

`<USER_ID>` が、Agent を実行する UID で、`<DOCKER_GROUP_ID>` が、Docker または Containerd ソケットを所有するグループ ID の場合。

[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: https://app.datadoghq.com/account/settings#api
[3]: /resources/yaml/datadog-agent-all-features.yaml
[4]: /resources/yaml/datadog-agent-windows-all-features.yaml
[5]: /resources/yaml/datadog-agent-logs-apm.yaml
[6]: /resources/yaml/datadog-agent-windows-logs-apm.yaml
[7]: /resources/yaml/datadog-agent-logs.yaml
[8]: /resources/yaml/datadog-agent-windows-logs.yaml
[9]: /resources/yaml/datadog-agent-apm.yaml
[10]: /resources/yaml/datadog-agent-windows-apm.yaml
[11]: /resources/yaml/datadog-agent-npm.yaml
[12]: /resources/yaml/datadog-agent-vanilla.yaml
[13]: /resources/yaml/datadog-agent-windows-vanilla.yaml
[14]: /ja/agent/kubernetes/apm/#setup
[15]: /ja/agent/kubernetes/log/
[16]: /ja/agent/kubernetes/apm/
[17]: /ja/infrastructure/process/?tab=kubernetes#installation
[18]: /ja/network_monitoring/performance/setup/
[19]: https://github.com/kubernetes/kube-state-metrics/tree/master/examples/standard
[20]: /ja/agent/kubernetes/data_collected/#kube-state-metrics
{{% /tab %}}
{{% tab "Operator" %}}

<div class="alert alert-warning">Datadog Operator は公開ベータ版です。フィードバックや質問がございましたら、<a href="/help">Datadog サポートチーム</a>までお寄せください。</div>

[Datadog Operator][1] は Kubernetes や OpenShift にDatadog Agent をデプロイする方法です。カスタムリソースステータスでデプロイ状況、健全性、エラーを報告し、高度なコンフィギュレーションオプションでコンフィギュレーションミスのリスクを抑えます。

## 前提条件

Datadog Operator を使用するには、次の前提条件が必要です。

- **Kubernetes Cluster バージョン >= v1.14.X**: テストはバージョン >= `1.14.0` で行われましたが、バージョン `>= v1.11.0` で動作するはずです。以前のバージョンでは、CRD サポートが制限されているため、Operator が期待どおりに機能しない場合があります。
- `datadog-operator` をデプロイするための [`Helm`][2]。
- `datadog-agent` をインストールするための [`Kubectl` CLI][3]。

## Operator を使用して Agent をデプロイする

最小限のステップ数で Operator を使用して Datadog Agent をデプロイするには、[`datadog-agent-with-operator`][4] Helm チャートを使用します。
手順は次のとおりです。

1. [チャートをダウンロードします][5]。

   ```shell
   curl -Lo datadog-agent-with-operator.tar.gz https://github.com/DataDog/datadog-operator/releases/latest/download/datadog-agent-with-operator.tar.gz
   ```

2. Agent の仕様を使用してファイルを作成します。最も単純なコンフィギュレーションは次のとおりです。

   ```yaml
   credentials:
     apiKey: <DATADOG_API_KEY>
     appKey: <DATADOG_APP_KEY>
   agent:
     image:
       name: "gcr.io/datadoghq/agent:latest"
   ```

   `<DATADOG_API_KEY>` と `<DATADOG_APP_KEY>` を [Datadog API とアプリケーションキー][6]に置き換えます

3. 上記のコンフィギュレーションファイルを使用して Datadog Agent をデプロイします。
   ```shell
   helm install --set-file agent_spec=/path/to/your/datadog-agent.yaml datadog datadog-agent-with-operator.tar.gz
   ```

## クリーンアップ

次のコマンドは、上記の手順で作成されたすべての Kubernetes リソースを削除します。

```shell
kubectl delete datadogagent datadog
helm delete datadog
```

許容範囲の使用に関する情報を含む、Operator の設定の詳細については、[Datadog Operator の高度な設定ガイド][7]を参照してください。

## 非特権

(オプション) 非特権インストールを実行するには、[Datadog カスタムリソース (CR)][8] に以下を追加します。

```yaml
agent:
  config:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

`<USER_ID>` が、Agent を実行する UID で、`<DOCKER_GROUP_ID>` が、Docker または Containerd ソケットを所有するグループ ID の場合。

[1]: https://github.com/DataDog/datadog-operator
[2]: https://helm.sh
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: https://github.com/DataDog/datadog-operator/tree/master/chart/datadog-agent-with-operator
[5]: https://github.com/DataDog/datadog-operator/releases/latest/download/datadog-agent-with-operator.tar.gz
[6]: https://app.datadoghq.com/account/settings#api
[7]: /ja/agent/guide/operator-advanced
[8]: https://github.com/DataDog/datadog-operator/blob/master/docs/configuration.md
{{% /tab %}}
{{< /tabs >}}

## 追加のコンフィギュレーション

### ライブコンテナ用 Kubernetes リソース

[Datadog Agent][2] と [Cluster Agent][3] は、[ライブコンテナ][4]の Kubernetes リソースを取得するように構成できます。この機能により、特定のネームスペースまたはアベイラビリティーゾーンのポッド、デプロイメント、その他の Kubernetes の概念の状態を監視したり、デプロイメント内で失敗したポッドのリソース仕様を確認したり、ノードアクティビティを関係するログに関連付けたりすることが可能になります。

コンフィギュレーションの説明や追加の情報については、[ライブコンテナ][5]ドキュメントを参照してください。

## イベント収集

{{< tabs >}}
{{% tab "Helm" %}}

Kubernetes イベント収集を有効にするには、`value.yaml` ファイルの順序で `datadog.leaderElection`、`datadog.collectEvents`、`agents.rbac.create` オプションを `true` に設定します。

{{% /tab %}}
{{% tab "DaemonSet" %}}

Kubernetes クラスターからイベントを収集する場合は、Agent マニフェストで環境変数 `DD_COLLECT_KUBERNETES_EVENTS` と `DD_LEADER_ELECTION` を `true` に設定します。または、[Datadog Cluster Agent イベント収集][1]を使用します

[1]: /ja/agent/cluster_agent/event_collection/
{{% /tab %}}
{{% tab "Operator" %}}

`datadog-agent.yaml` マニフェストで `agent.config.collectEvents` を `true` に設定します。

例:

```
agent:
  config:
    collectEvents: true
```

{{% /tab %}}
{{< /tabs >}}

## インテグレーション

クラスター内で Agent が実行されたら、[Datadog のオートディスカバリー機能][6]を使いポッドからメトリクスとログを自動的に収集します。

## 環境変数

Datadog Agent で使用可能な環境変数のリストを以下に示します。これらを Helm でセットアップする場合は、[helm/charts Github リポジトリ][7]の `datadog-value.yaml` ファイルのコンフィギュレーションオプションの完全なリストを参照してください。

### グローバルオプション

| 環境変数         | 説明                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Datadog API キー (**必須**)                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | 出力されるすべてのデータにグローバル `env` タグを設定します。                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | メトリクスに使用するホスト名 (自動検出が失敗した場合)                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`            | スペース区切りのホストタグ。例: `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | メトリクス、トレース、ログの送信先サイト。`DD_SITE` は {{< region-param key="dd_site" code="true">}} で、デフォルトは `datadoghq.com` です。                                                                                                                                                                                               |
| `DD_DD_URL`          | メトリクス送信用 URL を上書きします。設定は任意です。                                                                                                                                                                                                                                                                                      |
| `DD_CHECK_RUNNERS`   | Agent はデフォルトですべてのチェックを同時に実行します (デフォルト値は `4` ランナーです)。チェックを順次実行する場合は、値を `1` に設定してください。ただし、多数のチェック (または時間のかかるチェック) を実行する必要がある場合、`collector-queue` コンポーネントが遅延して、ヘルスチェックに失敗する可能性があります。ランナーの数を増やすと、チェックを並行して実行できます。 |
| `DD_LEADER_ELECTION` | クラスターで複数の Agent が実行されている場合は、この変数を `true` に設定して、イベント収集の重複を回避します。                                                                                                                                                                                                                         |

### プロキシ設定

Agent v6.4.0 (トレース Agent の場合は v6.5.0) より、以下の環境変数を使用して Agent のプロキシ設定を上書きできるようになりました。

| 環境変数             | 説明                                                            |
|--------------------------|------------------------------------------------------------------------|
| `DD_PROXY_HTTP`          | `http` リクエスト用のプロキシとして使用する HTTP URL です。                     |
| `DD_PROXY_HTTPS`         | `https` リクエスト用のプロキシとして使用する HTTPS URL です。                   |
| `DD_PROXY_NO_PROXY`      | プロキシを使用すべきではない場合に必要となる、URL をスペースで区切ったリストです。      |
| `DD_SKIP_SSL_VALIDATION` | Agent と Datadog との接続で問題が発生した場合にテストを実施するオプションです。 |

プロキシ設定の詳細については、[Agent v6 プロキシのドキュメント][8]を参照してください。

### オプションの収集 Agent

セキュリティまたはパフォーマンス上の理由により、オプションの収集 Agent はデフォルトで無効になっています。このエージェントを有効にするには、以下の環境変数を使用します。

| 環境変数                    | 説明                                                                                                                                                                                                                                                  |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_ENABLED`                | トレース Agent による [トレースの収集][5]を有効にします。                                                                                                                                                                                                           |
| `DD_LOGS_ENABLED`               | ログ Agent による[ログの収集][6]を有効にします。                                                                                                                                                                                                              |
| `DD_PROCESS_AGENT_ENABLED`      | プロセス Agent による[ライブプロセスの収集][7]を有効にします。Docker ソケットがある場合、[ライブコンテナービュー][8]はすでにデフォルトで有効になっています。`false` に設定すると、[ライブプロセスの収集][7]と[ライブコンテナービュー][8]が無効になります。 |
| `DD_COLLECT_KUBERNETES_EVENTS ` | Agent でのイベント収集を有効にします。クラスターで複数の Agent を実行している場合は、`DD_LEADER_ELECTION` も `true` に設定します。                                                                                                                       |

ライブコンテナビューを有効にするには、DD_PROCESS_AGENT_ENABLED を `true` に設定した上でプロセス Agent を実行していることをご確認ください。

### DogStatsD (カスタムメトリクス)

カスタムメトリクスを [StatsD プロトコル][9]で送信します。

| 環境変数                     | 説明                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | 他のコンテナからの DogStatsD パケットをリスニングします (カスタムメトリクスの送信に必要)。                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | 計算するヒストグラムのパーセンタイル (スペース区切り)。デフォルトは `0.95` です。                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | 計算するヒストグラムの集計 (スペース区切り)。デフォルトは "max median avg count" です。                                                          |
| `DD_DOGSTATSD_SOCKET`            | リスニングする Unix ソケットのパス。`rw` でマウントされたボリューム内にある必要があります。                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | UNIX ソケットのメトリクス用にコンテナの検出とタグ付けを有効にします。                                                                                            |
| `DD_DOGSTATSD_TAGS`              | この DogStatsD サーバーが受信するすべてのメトリクス、イベント、サービスのチェックに付加する追加タグ。たとえば `["env:golden", "group:retrievers"]` のように追加します。 |

詳しくは、[Unix ドメインソケット上の DogStatsD][10] を参照してください。

### タグ付け

Datadog は Kubernetes から一般的なタグを自動的に収集します。さらに多くのタグを抽出するには、次のオプションを使用します。

| 環境変数                            | 説明             |
|-----------------------------------------|-------------------------|
| `DD_KUBERNETES_POD_LABELS_AS_TAGS`      | ポッドラベルを抽出します      |
| `DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS` | ポッドアノテーションを抽出します |

詳細については、[Kubernetes タグの抽出][11]ドキュメントを参照してください。

### シークレットファイルの使用

インテグレーションの資格情報を Docker や Kubernetes のシークレットに格納し、オートディスカバリーテンプレートで使用できます。詳細については、[シークレット管理のドキュメント][12]を参照してください。

### コンテナの無視

ログの収集、メトリクスの収集、オートディスカバリーからコンテナを除外します。Datadog はデフォルトで Kubernetes と OpenShift の `pause` コンテナを除外します。これらの許可リストとブロックリストはオートディスカバリーにのみ適用されます。トレースと DogStatsD は影響を受けません。これらの環境変数の値は、正規表現をサポートしています。

| 環境変数    | 説明                                                                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DD_CONTAINER_INCLUDE` | 処理対象に入れるコンテナの許可リスト (スペース区切り)。すべてを対象に入れる場合は、`.*` を使用します。例: `"image:image_name_1 image:image_name_2"`、`image:.*`  |
| `DD_CONTAINER_EXCLUDE` | 処理対象から除外するコンテナのブロックリスト (スペース区切り)。すべてを対象から除外する場合は、`.*` を使用します。例: `"image:image_name_3 image:image_name_4"`、`image:.*` |
| `DD_CONTAINER_INCLUDE_METRICS` | メトリクスを含めたいコンテナの許可リスト。  |
| `DD_CONTAINER_EXCLUDE_METRICS` | メトリクスを除外したいコンテナのブロックリスト。 |
| `DD_CONTAINER_INCLUDE_LOGS` | ログを含めたいコンテナの許可リスト。  |
| `DD_CONTAINER_EXCLUDE_LOGS` | ログを除外したいコンテナのブロックリスト。 |
| `DD_AC_INCLUDE` | **非推奨**: 処理対象に入れるコンテナの許可リスト (スペース区切り)。すべてを対象に入れる場合は、`.*` を使用します。例: `"image:image_name_1 image:image_name_2"`、`image:.*`  |
| `DD_AC_EXCLUDE` | **非推奨**: 処理対象から除外するコンテナのブロックリスト (スペース区切り)。すべてを対象から除外する場合は、`.*` を使用します。例: `"image:image_name_3 image:image_name_4"` (**注**: この変数はオートディスカバリーに対してのみ有効)、`image:.*` |

その他の例は[コンテナのディスカバリー管理][13] ページでご確認いただけます。

**注**: `kubernetes.containers.running`、`kubernetes.pods.running`、`docker.containers.running`、`.stopped`、`.running.total`、`.stopped.total` の各メトリクスは、この設定の影響を受けません。すべてのコンテナを対象とします。コンテナごとの課金にも影響しません。

### その他

| 環境変数                        | 説明                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | コンテナソースの自動検出を上書きして、1 つのソースに制限します (`"docker"`、`"ecs_fargate"`、`"kubelet"` など)。                                                                                                                                                    |
| `DD_HEALTH_PORT`                    | これを `5555` に設定すると、Agent のヘルスチェックをポート `5555` で公開します。                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | カスタム Kubernetes クラスター識別子を設定して、ホストエイリアスの衝突を回避します。クラスター名は最大 40 文字で、小文字、数字、およびハイフンのみという制限があります。また、文字で始める必要があり、 数字または文字で終わる必要があります。 |

リスナーおよび構成プロバイダーを追加するには、`DD_EXTRA_LISTENERS` と `DD_EXTRA_CONFIG_PROVIDERS` の環境変数を使用します。これらは `datadog.yaml` 構成ファイルの `listeners` セクションと `config_providers` セクションに定義する変数に追加されます。

## コマンド

すべての Docker Agent コマンドは [Agent コマンドガイド][14]でご確認いただけます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/faq/kubernetes-legacy/
[2]: /ja/agent/
[3]: /ja/agent/cluster_agent/
[4]: https://app.datadoghq.com/containers
[5]: /ja/infrastructure/livecontainers/?tab=helm#configuration
[6]: /ja/agent/kubernetes/integrations/
[7]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog#all-configuration-options
[8]: /ja/agent/proxy/#agent-v6
[9]: /ja/developers/dogstatsd/
[10]: /ja/developers/dogstatsd/unix_socket/
[11]: /ja/agent/kubernetes/tag/
[12]: /ja/security/agent/#secrets-management
[13]: /ja/agent/guide/autodiscovery-management/
[14]: /ja/agent/guide/agent-commands/