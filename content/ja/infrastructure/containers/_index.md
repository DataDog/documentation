---
aliases:
- /ja/guides/livecontainers
- /ja/graphing/infrastructure/livecontainers/
- /ja/infrastructure/livecontainers
further_reading:
- link: /infrastructure/livecontainers/configuration
  tag: Documentation
  text: コンテナビューの構成
- link: /infrastructure/hostmap/
  tag: Documentation
  text: ホストマップを使用してすべてのホストを 1 画面に表示
- link: /infrastructure/process/
  tag: Documentation
  text: システムのあらゆるレベルの事象の把握
- link: https://www.datadoghq.com/blog/monitor-kubernetes-anomalies/
  tag: ブログ
  text: Kubernetes Anomalies でインフラストラクチャー調査の迅速化
- link: https://www.datadoghq.com/blog/rightsize-kubernetes-workloads/
  tag: ブログ
  text: Kubernetes のワークロードをライトサイジングするための実践的なヒント
title: コンテナビュー
---

Datadog の [Containers][1] ページは、環境内のすべてのコンテナをリアルタイムで可視化します。

htop、ctop、kubectl などの基盤ツールを手本として、Containers ページはユーザーのコンテナインフラストラクチャーを完全にカバーし、解像度 2 秒のリソースメトリクス、ファセット検索、コンテナログストリーミングでテーブルを継続的に更新します。

Containers ページは、[Docker][2]、[Kubernetes][3]、[ECS][4] などのコンテナ技術と連動し、動的コンポーネントのタグ付けも組み込まれて、コンテナの健全性、リソース消費、ログ、デプロイなどの詳細な全体像をリアルタイムに提供します。

{{< img src="infrastructure/livecontainers/live-containers-overview.png" alt="ライブコンテナでサマリーを確認" >}}

## セットアップ

コンテナビューにデータを表示するには、プロセス Agent を有効にします。

{{< tabs >}}
{{% tab "Docker" %}}

`DD_PROCESS_AGENT_ENABLED` 環境変数を `true` に設定します。

例:

```
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_AGENT_ENABLED=true
```
{{% /tab %}}
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

[公式の Helm チャート][1]を使用している場合、[`values.yaml`][2] ファイルで `processAgent.enabled` パラメーターを有効にします。

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
```

次に、Helm チャートをアップグレードします。

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
{{% tab "Amazon ECS" %}}

以下の環境変数を使用して、タスク定義を更新します。

```json
{
  "name": "DD_PROCESS_AGENT_ENABLED",
  "value": "true"
}
```

{{% /tab %}}
{{< /tabs >}}

### コンフィギュレーション
コンテナのフィルタリングや機密情報のスクラビングなどの構成オプションについては、[コンテナビューの構成][16]を参照してください。古いバージョンの Agent 用 (Datadog Agent v7.21.1 から v7.27.0 および Cluster Agent v1.9.0 から 1.11.0) にこのページをセットアップするには、[ライブコンテナのレガシー構成][17]を参照してください。

## Kubernetes オーケストレータエクスプローラー

Containers ページ左上の **Select Resources** ボックスで、**Kubernetes** の見出しを展開表示させると、Kubernetes [オーケストレータエクスプローラー][18]でポッド、クラスター、ネームスペース、その他のリソースを確認することができます。詳細については、[オーケストレータエクスプローラーのドキュメント][19]を参照してください。

また、[Kubernetes ページ][20]を使用して Kubernetes のリソースの概要を見ることもできます。

## 検索、フィルタリング、ピボット

### 文字列検索

コンテナは、本質的に極めてカーディナリティの高いオブジェクトです。Datadog の柔軟な文字列検索は、コンテナ名、ID、またはイメージフィールドから一致する部分文字列を見つけます。

複合クエリで複数の文字列検索を組み合わせるには、以下のブール演算子を使用します。

`AND`
: **積**: 両方の条件を含むイベントが選択されます（何も追加しなければ、AND がデフォルトです）。<br>**例**: `java AND elasticsearch`

`OR`
: **和**: いずれかの条件を含むイベントが選択されます。<br> **例**: `java OR python`

`NOT` / `!`
: **排他**: 後続の条件はイベントに含まれません。単語  `NOT` または文字 `!` のどちらを使用しても、同じ演算を行うことができます。<br> **例**: `java NOT elasticsearch` または `java !elasticsearch`

演算子をグループ化するには括弧を使用します。例: `(NOT (elasticsearch OR kafka) java) OR python`。

### フィルタリングとピボット

下のスクリーンショットは、あるシステムがフィルタリングによって 25 のノードからなる 1 つの Kubernetes クラスターに絞り込まれたところを示しています。コンテナの RSS および CPU 使用率をレポートする際に、コンテナに制限がプロビジョニングされている場合は、制限との比較が示されます。ここでは、このクラスターのコンテナがオーバープロビジョニングになっていることは明らかです。制限とビンパッキングを厳しくすれば、リソースの使用率を改善できます。

{{< img src="infrastructure/livecontainers/filter-by.png" alt="システムを 25 のノードから 1 つの Kubernetes クラスターに絞り込み" style="width:80%;">}}

コンテナ環境は動的であり、追跡が困難な場合があります。下のスクリーンショットは、`kube_service` と `host` によってピボットされたビューです。システムノイズを減らすために、`kube_namespace:default` に絞り込まれています。どのサービスがどこで実行されているか、キーメトリクスの飽和状態などがわかります。

{{< img src="infrastructure/livecontainers/hostxservice.png" alt="ホスト x サービス" style="width:80%;">}}

ECS の `ecs_task_name` や `ecs_task_version` でピボットすると、更新時のリソース使用率の変化を把握できます。

{{< img src="infrastructure/livecontainers/tasksxversion2.png" alt="タスク x バージョン" style="width:80%;">}}

## タグ付け

コンテナは、すべての既存のホストレベルのタグおよび個別のコンテナに関連付けられたメタデータを使用して[タグ付け][6]されます。

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

[統合サービスタグ付け][7]のコンフィギュレーションがある場合、Datadog は自動的に `env`、`service`、`version` のタグを取得します。上記のタグが利用できることで、APM、ログ、メトリクス、コンテナデータを結びつけることができます。

## ビュー

Containers ページには、[散布図](#scatter-plot)および[時系列][8]ビューと、コンテナ名、ステータス、開始時刻などのフィールドでコンテナデータを整理できるテーブルが含まれています。

#### 散布図

散布図分析を使用すると、2 つのメトリクスを比較してコンテナのパフォーマンスをより的確に把握できます。

Containers ページの展開可能な **Summary Graphs** セクションで、"Scatter Plot" と "Timeseries" タブを切り替えることができます。

{{< img src="infrastructure/livecontainers/scatterplot_selection.png" alt="Scatter Plot を選択" style="width:80%;">}}

デフォルトでは、グラフは `short_image` タグキーでグループ化されます。ドットのサイズは、各グループ内のコンテナの数を表します。ドットをクリックすると、グループに参加しているすべてのコンテナとホストが表示されます。

散布図分析の上部にあるクエリを使用して、散布図分析を制御できます。

* 表示するメトリクスの選択。
* 2 つのメトリクスの集計方法の選択。
* X 軸と Y 軸の目盛の選択 (Linear/Log)。

{{< img src="infrastructure/livecontainers/scatterplot.png" alt="Scatter plot" style="width:80%;">}}

#### リアルタイムの監視

コンテナページをアクティブに使用している間、メトリクスは 2 秒の解像度で収集されます。これは、CPU などの揮発性のメトリクスで重要です。バックグラウンドでは、履歴を目的として、10 秒の解像度でメトリクスが収集されます。

### コンテナログ

`docker logs -f` や `kubectl logs -f` などのコンテナのストリーミングログを Datadog で表示します。テーブル内のコンテナをクリックして調べることができます。*Logs* タブをクリックすると、[Live Tail][13] からのリアルタイムデータや過去の任意の時間のインデックス化されたログが表示されます。

#### Live tail

Live Tail を使用すると、すべてのコンテナログがストリーミングされます。ストリームを一時停止すると、高速に書き込まれているログを読みやすくなります。一時停止を解除すると、ストリーミングが継続されます。

簡単な文字列マッチングでストリーミングログを検索できます。詳細については、[Live Tail][13]を参照してください。

**注**: ストリーミングログは永続化されません。新しい検索を入力するか、ページをリフレッシュすると、ストリームはクリアされます。

{{< img src="infrastructure/livecontainers/livecontainerlogssidepanel.mp4" alt="ログサイドパネルのプレビュー" video="true" >}}

#### インデックス化されたログ

対応するタイムフレームを選択することで、インデックス化して永続化するように選択したログを表示できます。インデックス化を使用すると、タグやファセットを使用してログをフィルタリングできます。たとえば、Error 状態のログを検索するには、検索ボックスに status:error と入力します。オートコンプリートによって目的のタグが見つけやすくなります。ログの重要な属性が既にタグに保存されているため、必要に応じて検索、フィルタリング、集計を行うことができます。

{{< img src="infrastructure/livecontainers/errorlogs.png" alt="ログサイドパネルのプレビュー" style="width:100%;">}}

## 注意事項と既知の問題

* リアルタイム (2 秒) データ収集は 30 分後にオフになります。リアルタイム収集を再開するには、ページをリフレッシュします。
* RBAC 設定によって Kubernetes のメタデータ収集を制限できます。[Datadog Agent の RBAC エンティティ][14]を参照してください。
* Kubernetes の `health` 値は、コンテナの readiness プローブです。liveness プローブではありません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: /ja/integrations/docker_daemon/
[3]: /ja/agent/kubernetes/
[4]: /ja/agent/amazon_ecs/
[5]: /ja/infrastructure/livecontainers/configuration
[6]: /ja/tagging/assigning_tags?tab=agentv6v7#host-tags
[7]: /ja/getting_started/tagging/unified_service_tagging
[8]: /ja/dashboards/widgets/timeseries/
[9]: /ja/logs
[10]: /ja/metrics
[11]: /ja/tracing
[12]: /ja/events
[13]: /ja/logs/explorer/live_tail
[14]: https://github.com/DataDog/datadog-agent/blob/7.23.1/Dockerfiles/manifests/cluster-agent/rbac.yaml
[15]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog
[16]: /ja/infrastructure/containers/configuration
[17]: /ja/infrastructure/faq/live-containers-legacy-configuration
[18]: https://app.datadoghq.com/orchestration/overview
[19]: /ja/infrastructure/containers/orchestrator_explorer/
[20]: /ja/infrastructure/containers/kubernetes_resources