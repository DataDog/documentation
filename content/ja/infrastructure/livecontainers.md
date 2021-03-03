---
title: ライブコンテナ
kind: documentation
aliases:
  - /ja/guides/livecontainers
  - /ja/graphing/infrastructure/livecontainers/
further_reading:
  - link: /infrastructure/hostmap/
    tag: グラフ
    text: ホストマップを使用してすべてのホストを 1 画面に表示
  - link: /infrastructure/process/
    tag: グラフ
    text: システムのあらゆるレベルの事象の把握
---
## 概要

[Datadog ライブコンテナ][1]は、環境内のすべてのコンテナをリアルタイムに表示できるようにします。

htop、ctop、kubectl などの基盤ツールを手本として、ライブコンテナはユーザーのコンテナインフラストラクチャーを完全にカバーしつつ、解像度 2 秒のリソースメトリクス、ファセット検索、コンテナログストリーミングでテーブルを継続的に更新します。

ライブコンテナビューは、[Docker][2]、[Kubernetes][3]、[ECS][4] などのコンテナ技術と連動し、動的コンポーネントのタグ付けも組み込まれて、コンテナの健全性、リソース消費、ログ、デプロイなどの詳細な全体像をリアルタイムに提供します。

{{< img src="infrastructure/livecontainers/livecontainersoverview.png" alt="ライブコンテナでサマリーを確認"  >}}

## コンフィギュレーション

### Kubernetes リソース

Datadog Agent と Cluster Agent は、[ライブコンテナ][5]の Kubernetes リソースを取得するように構成できます。この機能により、特定のネームスペースまたはアベイラビリティーゾーンのポッド、デプロイメント、その他の Kubernetes の概念の状態を監視したり、デプロイメント内で失敗したポッドのリソース仕様を確認したり、ノードアクティビティを関係するログに関連付けたりすることが可能になります。

ライブコンテナの Kubernetes リソースには、以下を構成する前に [Agent バージョン >= 7.21.1][6] および [Cluster Agent バージョン >= 1.9.0][7] が必要です。

{{< tabs >}}
{{% tab "Helm" %}}

公式の [Datadog Helm チャート][1]を使用している場合、

- バージョン 2.4.5 以降のチャートを使用します。
  **注**: Agent および Cluster Agent のバージョンが、Helm チャート [values.yaml][2] ファイルで必要最低限以上のバージョンでハードコードされるようにしてください。
- [values.yaml][2] で `datadog.orchestratorExplorer.enabled` を `true` に設定します
- 新しいリリースのデプロイ

一部のセットアップでは、Process Agent と Cluster Agent で Kubernetes クラスター名が自動検出されません。この場合、機能は起動せず、Cluster Agent ログで以下のような警告ログが表示されます。`Orchestrator explorer enabled but no cluster name set: disabling`。この場合、`datadog.clusterName` を [values.yaml][2] でクラスター名に設定する必要があります。

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "DaemonSet" %}}

1. [Cluster Agent][1] バージョン >= 1.9.0 は、DaemonSet を構成する前に必要となります。Cluster Agent が実行中で Agent と通信できることを確認してください。コンフィギュレーションの詳細は、[Cluster Agent のセットアップドキュメント][2]を参照してください。

    - 以下の環境変数を使用して、Cluster Agent コンテナを設定します。

        ```yaml
          - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
            value: "true"
        ```

    - 以下の RBAC アクセス許可を使用して、Cluster Agent ClusterRole を設定します。
特に `apps` apiGroups の場合は、ライブコンテナに
一般的な Kubernetes リソース (`pods`、`services`、`nodes` など) を収集する権限が必要です。
これは、[Cluster Agent のセットアップ用ドキュメント][2]に従っていれば、すでに RBAC にあります。
ない場合は、追加されていることを確認してください
（`deployments`、`replicasets` の後）。
        ```yaml
          ClusterRole:
          - apiGroups:  # To create the datadog-cluster-id CM
            - ""
            resources:
            - configmaps
            verbs:
            - create
            - get
            - update
          ...
          - apiGroups:  # Required to get the kube-system namespace UID and generate a cluster ID
            - ""
            resources:
            - namespaces
            verbs:
            - get
          ...
          - apiGroups:  # To collect new resource types
            - "apps"
            resources:
            - deployments
            - replicasets
            # Below are in case RBAC was not setup from the above linked "Cluster Agent Setup documentation"
            - pods 
            - nodes
            - services
            verbs:
            - list
            - get
            - watch
        ```
    これらのアクセス許可は、Agent DaemonSet や Cluster Agent Deployment と同じネームスペースに `datadog-cluster-id` ConfigMap を作成したり、デプロイや ReplicaSets を収集するために必要です。

    Cluster Agent により `cluster-id` ConfigMap が作成されない場合、Agent ポッドは起動せず、`CreateContainerConfigError` ステータスに陥ります。この ConfigMap が存在しないために Agent ポッドが動かない場合は、Cluster Agent アクセス許可を更新しポッドを再起動して ConfigMap を作成すると、Agent ポッドは自動的に回復します。

2. Agent DaemonSet で実行される Process Agent は、有効かつ実行中（プロセス収集を実行する必要はありません）であり、かつ以下のオプションで構成されている必要があります。

    ```yaml
    - name: DD_ORCHESTRATOR_EXPLORER_ENABLED
      value: "true"
    - name: DD_ORCHESTRATOR_CLUSTER_ID
      valueFrom:
        configMapKeyRef:
          name: datadog-cluster-id
          key: id
    ```

一部のセットアップでは、Process Agent と Cluster Agent で Kubernetes クラスター名が自動検出されません。この場合、機能は起動せず、Cluster Agent ログで以下のような警告ログが表示されます。`Orchestrator explorer enabled but no cluster name set: disabling`。この場合、Cluster Agent と Process Agent の両方の `env` セクションに以下のオプションを追加する必要があります。

  ```yaml
  - name: DD_CLUSTER_NAME
    value: "<YOUR_CLUSTER_NAME>"
  ```

[1]: /ja/agent/cluster_agent/
[2]: /ja/agent/cluster_agent/setup/
{{% /tab %}}
{{< /tabs >}}

### コンテナを対象に入れる/除外する

コンテナは、リアルタイム収集の対象に入れたり、除外したりすることができます。

* メインコンフィギュレーションファイル  `datadog.yaml` に環境変数 `DD_CONTAINER_EXCLUDE` を渡すか、`container_exclude:` を追加することで、コンテナを対象から除外することができます。
* メインコンフィギュレーションファイル `datadog.yaml` に環境変数 `DD_CONTAINER_INCLUDE` を渡すか、`container_include:` を追加することで、コンテナを対象に入れることができます。

どちらの引数も値は**イメージ名**になります。正規表現もサポートされています。

たとえば、名前が frontend で始まるコンテナ以外のすべての Debian イメージを除外するには、`datadog.yaml` ファイルに次の 2 つの構成行を追加します。
```yaml
  env:
    - name: DD_LOGS_ENABLED
      value: "true"
    - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
      value: "true"

  volumeMounts:
    - name: pointerdir
      mountPath: /opt/datadog-agent/run

volumes:
  - hostPath:
      path: /opt/datadog-agent/run
    name: pointerdir
```

```shell
container_exclude: ["image:debian"]
container_include: ["name:frontend.*"]
```

**注**: Agent 5 の場合は、これをメインの `datadog.conf` 構成ファイルに追加する代わりに、`datadog.yaml` ファイルを明示的に `/etc/datadog-agent/` に追加してください。プロセス Agent は、ここにすべての構成オプションがあることを前提とするためです。この構成は、コンテナをリアルタイム収集から除外するだけで、オートディスカバリーからは**除外しません**。

## はじめに

[コンテナページ][1]に移動します。これにより、自動的に **Containers** ビューが表示されます。

## 検索、フィルタリング、ピボット

### 文字列検索

コンテナは、本質的に極めてカーディナリティの高いオブジェクトです。Datadog の柔軟な文字列検索は、コンテナ名、ID、またはイメージフィールドから一致する部分文字列を見つけます。

Kubernetes Resources を有効にしている場合、`pod`、`deployment`、`ReplicaSet`、`service name` などの文字列と Kubernetes ラベルは [Kubernetes Resources ビュー](#kubernetes-resources-view)で検索可能です。

複合クエリで複数の文字列検索を組み合わせるには、以下のブール演算子を使用します。

|              |                                                                                                                                  |                                                                 |
|:-------------|:---------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------|
| **演算子** | **説明**                                                                                                                  | **例**                                                     |
| `AND`        | **積**: 両方の条件を含むイベントが選択されます (何も追加しなければ、AND がデフォルトで採用されます)。                           | java AND elasticsearch                                          |
| `OR`         | **和**: いずれかの条件を含むイベントが選択されます。                                                                       | java OR python                                                  |
| `NOT` / `!`  | **排他**: 後続の条件はイベントに含まれません。単語 `NOT` と文字 `!` のどちらを使用しても、同じ演算を行うことができます。 | java NOT elasticsearch <br> java !elasticsearch でも**同じ** |

演算子をグループ化するには括弧を使用します。例: `(NOT (elasticsearch OR kafka) java) OR python`。

### フィルタリングとピボット

下のスクリーンショットは、あるシステムがフィルタリングによって 9 つのノードからなる 1 つの Kubernetes クラスターに絞り込まれたところを示しています。コンテナの RSS および CPU 使用率をレポートする際に、コンテナに制限がプロビジョニングされている場合は、制限との比較が示されます。ここでは、このクラスターのコンテナがオーバープロビジョニングになっていることは明らかです。制限とビンパッキングを厳しくすれば、リソースの使用率を改善できます。

{{< img src="infrastructure/livecontainers/overprovisioned.png" alt="オーバープロビジョニング"  style="width:80%;">}}

コンテナ環境は動的であり、追跡が困難な場合があります。下のスクリーンショットは、`kube_service` と `host` によってピボットされたビューです。システムノイズを減らすために、`kube_namespace:default` に絞り込まれています。どのサービスがどこで実行されているか、キーメトリクスの飽和状態などがわかります。

{{< img src="infrastructure/livecontainers/hostxservice.png" alt="ホスト x サービス"  style="width:80%;">}}

ECS の `ecs_task_name` や `ecs_task_version` でピボットすると、更新時のリソース使用率の変化を把握できます。

{{< img src="infrastructure/livecontainers/tasksxversion.png" alt="タスク x バージョン"  style="width:80%;">}}

Kubernetes リソースの場合、フィルターに使用する `environment`、`service`、または `pod_phase` などの Datadog タグを選択します。左側のコンテナファセットを使用して、特定の Kubernetes リソースをフィルタリングすることもできます。ポッドを Datadog タグでグループ化して、情報をすばやく見つけることができる集約ビューを取得します。

## タグ付け

コンテナは、すべての既存のホストレベルのタグおよび個別のコンテナに関連付けられたメタデータを使用して[タグ付け][8]されます。

よく使用されるオーケストレーターとのインテグレーションを含め、すべてのコンテナは `image_name` でタグ付けされます。[ECS][4] と [Kubernetes][3] には、さらにいくつかのコンテナレベルのタグが提供されます。また、各コンテナには Docker、ECS、または Kubernetes のアイコンが付くため、どれがオーケストレーション中であるかが一目でわかります。

ECS コンテナは以下でタグ付けされます。

* `task_name`
* `task_version`
* `ecs_cluster`

Kubernetes コンテナは以下でタグ付けされます。

* `pod_name`
* `kube_pod_ip`
* `kube_service`
* `kube_namespace`
* `kube_replica_set`
* `kube_daemon_set`
* `kube_job`
* `kube_deployment`
* `kube_cluster`

[統合サービスタグ付け][9]のコンフィギュレーションがある場合、`env`、`service`、`version` も自動的に取得されます。上記のタグが利用できることで、APM、ログ、メトリクス、ライブコンテナデータを結びつけることができます。

## ビュー

### コンテナビュー

**Containers** ビューには、[散布図](#scatter-plot)および[時系列][10]ビューと、コンテナ名、ステータス、開始時刻などのフィールドでコンテナデータを整理できるテーブルが含まれています。

#### 散布図

散布図分析を使用すると、2 つのメトリクスを比較してコンテナのパフォーマンスをより的確に把握できます。

[Containers ページ][1]で散布図分析にアクセスするには、Show Summary graph ボタンをクリックし、"Scatter Plot" タブを選択します。

{{< img src="infrastructure/livecontainers/scatterplot_selection.png" alt="Scatter Plot を選択"  style="width:60%;">}}

デフォルトでは、グラフは `short_image` タグキーでグループ化されます。ドットのサイズは、各グループ内のコンテナの数を表します。ドットをクリックすると、グループに参加しているすべてのコンテナとホストが表示されます。

散布図分析の上部にあるクエリを使用して、散布図分析を制御できます。

* 表示するメトリクスの選択。
* 2 つのメトリクスの集計方法の選択。
* X 軸と Y 軸の目盛の選択 (Linear/Log)。

{{< img src="infrastructure/livecontainers/scatterplot.png" alt="Scatter Plot"  style="width:80%;">}}

#### リアルタイムの監視

コンテナページをアクティブに使用している間、メトリクスは 2 秒の解像度で収集されます。これは、CPU などの揮発性が高いメトリクスで重要です。バックグラウンドでは、履歴を目的として、10 秒の解像度でメトリクスが収集されます。

### Kubernetes リソースビュー

ライブコンテナ向け Kubernetes Resources を有効にしている場合は、ページ左上の **View** ドロップダウンメニューで **Pods**、**Deployments**、**ReplicaSets**、**Services** ビューを切り替えます。これらの各ビューには、ステータス、名前、Kubernetes ラベルなどのフィールドでデータを整理できるデータテーブルと、ポッドと Kubernetes クラスターの全体像を示す詳細なクラスターマップが含まれています。

#### クラスターマップ

Kubernetes クラスターマップは、ポッドと Kubernetes クラスターの全体像を示します。カスタマイズされたグループとフィルターを使用して、すべてのリソースを 1 つの画面にまとめて表示し、ポッドの色を塗りつぶすメトリクスを選択できます。

サークルまたはグループをクリックしてクラスターマップからリソースにドリルダウンし、詳細パネルを表示します。

#### 情報パネル

テーブルの行またはクラスターマップのオブジェクトをクリックすると、サイドパネルに特定のリソースに関する情報が表示されます。このパネルは、選択したコンテナまたはリソースに関する次のような情報のトラブルシューティングと検索に役立ちます。

* [**Logs**][11]: コンテナまたはリソースからログを確認。関連ログを Logs Explorer で表示するには、ログをクリックします。
* [**Metrics**][12]: コンテナまたはリソースのライブメトリクスを確認。グラフを全画面表示したり、スナップショットを共有したりできるほか、このタブからエクスポートすることが可能です。
* **Network**: ソース、宛先、送受信ボリューム、スループットフィールドなど、コンテナまたはリソースのネットワークパフォーマンスを表示します。**Destination** フィールドを使用して `DNS` や `ip_type` などのタグで検索するか、このビューで **Group by** フィルターを使用してネットワークデータを `pod_name` や `service` などのタグでグループ化します。
* [**Traces**][13]: コンテナまたはリソースのトレース（日付、サービス、期間、メソッド、トレースのステータスコードを含む）を確認。

Kubernetes Resources ビューには、いくつかの追加のタブがあります。

* **Processes**: このリソースのコンテナで実行されているすべてのプロセスを表示します。
* **YAML**: リソースの詳細な YAML の概要。
* [**Events**][14]: リソースのすべての Kubernetes イベントを表示。

このリソースの詳細なダッシュボードについては、このパネルの右上隅にある **View Dashboard** をクリックしてください。

### コンテナログ

`docker logs -f` や `kubectl logs -f` などのコンテナのストリーミングログを Datadog で表示します。テーブル内のコンテナをクリックして調べることができます。*Logs* タブをクリックすると、[Live Tail][15] からのリアルタイムデータや過去の任意の時間のインデックス化されたログが表示されます。

#### Live tail

Live Tail を使用すると、すべてのコンテナログがストリーミングされます。ストリームを一時停止すると、高速に書き込まれているログを簡単に読むことができます。一時停止を解除すると、ストリーミングが継続されます。

簡単な文字列マッチングでストリーミングログを検索できます。Live Tail の詳細については、[Live Tail のドキュメント][15]を参照してください。

**注**: ストリーミングログは永続化されません。新しい検索を入力するか、ページをリフレッシュすると、ストリームはクリアされます。

{{< img src="infrastructure/livecontainers/livecontainerlogssidepanel.mp4" alt="ログサイドパネルのプレビュー" video="true"  >}}

#### インデックス化されたログ

対応するタイムフレームを選択することで、インデックス化して永続化するように選択したログを表示できます。インデックス化を使用すると、タグやファセットを使用してログをフィルタリングできます。たとえば、`Error` 状態のログを検索するには、検索ボックスに `status:error` と入力します。オートコンプリートによって目的のタグが見つけやすくなります。ログの重要な属性が既にタグに保存されているため、必要に応じて検索、フィルタリング、集計を行うことができます。

{{< img src="infrastructure/livecontainers/errorlogs.png" alt="ログサイドパネルのプレビュー"  style="width:100%;">}}

## 注意事項と既知の問題

* リアルタイム (2 秒) データ収集は 30 分後にオフになります。リアルタイム収集を再開するには、ページをリフレッシュします。
* RBAC 設定によって Kubernetes のメタデータ収集を制限できます。[Datadog Agent の RBAC エンティティ][16]を参照してください。
* Kubernetes の `health` 値は、コンテナの readiness プローブです。liveness プローブではありません。

### Kubernetes リソースesources

* データは一定の間隔で自動的に更新されます。ベータ版の更新間隔は変更される可能性があります。
* 1000 以上のデプロイまたは ReplicaSets を持つクラスターでは、Cluster Agent からの CPU 使用率が上昇する場合があります。Helm チャートにはコンテナのスクラブを無効にするオプションがあります。詳細については、[Helm チャートリポジトリ][17]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: /ja/integrations/docker_daemon/
[3]: /ja/agent/kubernetes/
[4]: /ja/agent/amazon_ecs/
[5]: https://app.datadoghq.com/orchestration/overview
[6]: /ja/agent/
[7]: /ja/agent/cluster_agent/setup/
[8]: /ja/tagging/assigning_tags?tab=agentv6v7#host-tags
[9]: /ja/getting_started/tagging/unified_service_tagging
[10]: /ja/dashboards/widgets/timeseries/
[11]: /ja/logs
[12]: /ja/metrics
[13]: /ja/tracing
[14]: /ja/events
[15]: /ja/logs/live_tail/
[16]: https://github.com/DataDog/datadog-agent/blob/7.23.1/Dockerfiles/manifests/cluster-agent/rbac.yaml
[17]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog