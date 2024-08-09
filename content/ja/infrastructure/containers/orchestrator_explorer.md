---
title: オーケストレータエクスプローラー
---

{{< img src="infrastructure/livecontainers/orch_ex.png" alt="オーケストレータエクスプローラーにKubernetes のポッドが表示されている様子。" style="width:80%;">}}

## 概要

Datadog Agent と Cluster Agent は、[オーケストレータエクスプローラー][1]用に Kubernetes リソースを取得できます。この機能により、特定のネームスペースまたはアベイラビリティーゾーンのポッド、デプロイメント、その他の Kubernetes の概念の状態を監視したり、デプロイメント内で失敗したポッドのリソース仕様を確認したり、ノードアクティビティを関係するログに関連付けたりすることが可能になります。

オーケストレータエクスプローラーでは、**Agent バージョン >= 7.27.0** および **Cluster Agent バージョン >= 1.11.0** が必要です。

**注**: Kubernetes バージョン 1.25 以上の場合、必要な最小限の Cluster Agent のバージョンは 7.40.0 です。

## セットアップ

[プロセス Agentが有効になっている][2]ことを確認してください。Datadog Operator または公式の Helm チャートを利用している場合は、オーケストレータエクスプローラーがデフォルトで有効になります。

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

[公式の Helm チャート][3]を利用している場合は、オーケストレータエクスプローラーがデフォルトで有効になります。

検証のため、 [`values.yaml`][4] ファイルで `orchestratorExplorer.enabled` パラメーターが `true` に設定されていることを確認してください。

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

次に、Helm チャートをアップグレードします。

[3]: https://github.com/DataDog/helm-charts
[4]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "手動" %}}
手動セットアップについては、[DaemonSet を使用してオーケストレータエクスプローラーをセットアップする][5]を参照してください。

[5]: /ja/infrastructure/faq/set-up-orchestrator-explorer-daemonset
{{% /tab %}}
{{< /tabs >}}

## 使用方法

### ビュー

ページの左上にある **Select Resources** ドロップダウンメニューで、**Pods**、**Clusters**、**Namespaces* その他の *Kubernetes リソースを切り替えます。

それぞれのビューには、ステータス、名前、Kubernetes ラベルなどのフィールドごとにデータをよりよく整理するために役立つデータテーブルと、ポッドと Kubernetes クラスターの全体像を把握するための詳細なクラスターマップが含まれています。

{{< img src="infrastructure/livecontainers/orch_ex_replicasets.png" alt="オーケストレータエクスプローラーが開かれ、サマリーモードで Workloads > Replica Sets が表示されている様子" style="width:80%;">}}

### 機能およびファセットごとにグループ化

タグや Kubernetes ラベルでポッドをグループ化することで集計ビューを表示し、情報をすばやく見つけることができます。グループ化を行うには、ページ右上の "Group by" バーを使用するか、下図のように特定のタグやラベルをクリックしてコンテキストメニューから "Group by" 機能を選択します。

{{< img src="infrastructure/livecontainers/orch_ex_groupby.png" alt="チームごとにグループ化した例" style="width:80%;">}}

また、ページの左側にあるファセットを利用することで、リソースをグループ化したり、ポッドステータスが CrashLoopBackOff のポッドなど、最も気になるリソースをフィルタリングすることができます。

{{< img src="infrastructure/livecontainers/crashloopbackoff.mp4" alt="CrashLoopBackOff ポッドステータスのグループ化例" video=true style="width:80%;">}}

### クラスターマップ

クラスターマップは、ポッドと Kubernetes クラスターの全体像を示します。カスタマイズされたグループとフィルターを使用して、すべてのリソースを 1 つの画面にまとめて表示し、どのメトリクスを使ってポッドに色を付けるかを選択することができます。

サークルまたはグループをクリックして詳細パネルを表示し、クラスターマップからリソースを調べます。

カスタマイズされたグループやフィルターを使って、すべてのリソースを 1 つの画面にまとめて表示し、どのメトリクスを使ってポッドに色を付けるかを選択することができます。

{{< img src="infrastructure/livecontainers/cluster-map.mp4" alt="カスタマイズしたグループとフィルターのクラスターマップ" video=true style="width:80%;">}}

### 情報パネル

表内の任意の行、またはクラスターマップの任意のオブジェクトをクリックすると、特定のリソースに関する情報がサイドパネルに表示されます。

{{< img src="infrastructure/livecontainers/orch_ex_panel.png" alt="プロセスに対して開かれた、サイドパネルのリソースビュー。" style="width:80%;">}}

サイドパネルの **YAML** タブには、リソースの完全な定義が表示されます。**Agent バージョン 7.44.0** 以降は、定義の履歴も 7 日分表示されるため、時間の経過とともに各バージョンでどのような変更が行われたのかを比較することができます。

{{< img src="infrastructure/livecontainers/orch_ex_manifest_history.png" alt="yaml の履歴機能が表示されたサイドパネルのリソースビュー" style="width:80%;">}}

その他のタブには、選択したリソースのトラブルシューティングに利用できる詳しい情報が表示されます。

* [**Logs**][9]: コンテナまたはリソースからログを確認。関連ログを Logs Explorer で表示するには、ログをクリックします。
* [**APM**][11]: コンテナまたはリソースのトレース (日付、サービス、期間、メソッド、トレースのステータスコードを含む) を確認。
* [**Metrics**][10]: コンテナまたはリソースのライブメトリクスを確認。グラフを全画面表示したり、スナップショットを共有したりできるほか、このタブからエクスポートすることが可能です。
* **Processes**: このリソースのコンテナで実行されているすべてのプロセスを表示します。
* **Network**: ソース、宛先、送受信ボリューム、スループットフィールドなど、コンテナまたはリソースのネットワークパフォーマンスを表示します。**Destination** フィールドを使用して `DNS` や `ip_type` などのタグで検索するか、このビューで **Group by** フィルターを使用してネットワークデータを `pod_name` や `service` などのタグでグループ化します。
* [**Events**][12]: リソースのすべての Kubernetes イベントを表示。
* **Monitors**: このリソースのタグ付け、スコープ設定、グループ化されたモニターを表示。

このリソースの詳細なダッシュボードについては、このパネルの右上隅にある View Dashboard をクリックしてください。

{{< img src="infrastructure/livecontainers/view-pod-dashboard.png" alt="ライブコンテナの概要からポッドダッシュボードへのリンク" style="width:80%;">}}

### リソース使用状況

**Cluster Map** ボタンの右側にある **Resource Utilization** をクリックします。

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization.png" alt="コンテナリソース使用状況" style="width:80%;">}}

このビューは、CPU とメモリの使用量を時系列で表示します。この情報は、リソースのプロビジョニングが過剰または不足している場所を検出するのに役立ちます。

表中の任意の行をクリックすると、サイドパネルに特定のリソースの情報が表示されます。

{{< img src="infrastructure/livecontainers/resource_utilization_panel.png" alt="コンテナリソース使用状況サイドパネル詳細" style="width:80%;">}}

上のスクリーンショットでは、ポッドはクラスタ名でグループ化されています。サイドパネルは、特定のクラスター内のポッドに対して開かれます。これらのポッドの平均 CPU およびメモリ使用量が表示されます。

## 注意事項と既知の問題

* データは一定の間隔で自動的に更新されます。ベータ版の更新間隔は変更される可能性があります。
* 1000 以上のデプロイまたは ReplicaSets を持つクラスターでは、Cluster Agent からの CPU 使用率が上昇する場合があります。Helm チャートにはコンテナのスクラブを無効にするオプションがあります。詳細については、[Helm チャートリポジトリ][15]を参照してください。

[1]: https://app.datadoghq.com/orchestration/overview
[2]: /ja/infrastructure/containers/?tab=datadogoperator#setup

[9]: /ja/logs
[10]: /ja/metrics
[11]: /ja/tracing
[12]: /ja/events
[15]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog