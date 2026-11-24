---
aliases:
- /ja/cloud_cost_management/real_time_costs
description: クラウドコストをリアルタイムで表示および分析します。
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について
- link: /cloud_cost_management/cost_changes/monitors/#create-a-real-time-anomaly-monitor
  tag: ドキュメント
  text: リアルタイム異常モニターを作成する
title: リアルタイムコスト
---
<div class="alert alert-info">Azure および Google Cloud のリアルタイムコストはプレビュー版です。</div>

## 概要 {#overview}

リアルタイムコストは、AWS、Azure、および Google Cloud のコンピューティングコストをほぼリアルタイムで見積もるため、数日ではなく数分または数時間でコストの変化に対応できます。Datadog は、Datadog Agent が収集したリアルタイムの使用状況データから見積もりを生成し、Cloud Cost Management 請求データから得られる最近の平均時間単価を使用してその使用量を価格設定します。

リアルタイムコストを使用して、以下を行います。
- 異常を早期検出し、[リアルタイム異常モニター][3]で異常についてのアラートを送信する
- 最近の変更の影響を観察する
- 時間単位または時間未満のコスト傾向を監視する
- 急速に変化する Kubernetes クラスターの可視性を深める

リアルタイムコストは以下で利用可能です。

| プロバイダー | 対象支出 | リアルタイムメトリクス | 価格設定元 |
|---|---|---|---|
| AWS | Amazon EC2 インスタンスおよび EC2 上で実行されているKubernetes | `aws.cost.net.amortized.realtime.estimated` | インスタンスタイプ、リージョン、AWS アカウント別の最近の平均時間あたりの正味減価償却 EC2 価格 |
| Azure (プレビュー) | Azure Virtual Machines のコンピューティングおよび Azure VM 上で実行されている Kubernetes | `azure.cost.amortized.realtime.estimated` | インスタンスタイプ、リージョン、Azure サブスクリプション別の最近の平均時間あたりの償却 VM 価格 |
| Google Cloud (プレビュー) | Compute Engine インスタンス (vCPU およびメモリ) および Compute Engine 上で実行されている Kubernetes | `gcp.cost.amortized.realtime.estimated` | マシンタイプ、リージョン、Google Cloud プロジェクト別の最近の平均時間あたりの償却 vCPU およびメモリ価格 |

リアルタイムコストはコンピューティングのみを対象としています。以下の料金は除外されます。
- **AWS**: EBS、ネットワーキング、および Amazon EC2 インスタンスのコンピューティング以外の料金。
- **Azure**: マネージドディスク、ストレージ、帯域幅、ネットワーキング、および Virtual Machines のコンピューティング使用量以外の料金 (`chargetype:Usage`)。未使用の Azure 容量予約も除外されます。
- **Google Cloud**: Persistent Disk、GPU、ネットワーキング、OS ライセンス、外部 IP アドレス、および Compute Engine インスタンスの vCPU (コア) とメモリ (RAM) SKU 以外の料金。クレジットおよび予約料金も除外されます。

## 要件 {#requirements}

リアルタイムコストは、Cloud Cost Management Enterprise のお客様が利用できます。開始する前に、以下を確認します。

- AWS アカウント、Azure サブスクリプション、または Google Cloud プロジェクトで Cloud Cost Management が有効になっていること。
- 各 EC2 インスタンス、Azure VM、または Compute Engine インスタンスに Datadog Agent がインストールされていること。
- (オプション) リアルタイムの Kubernetes コストの場合、クラスターで Datadog Container Monitoring が有効になっていること。セットアップについては、[コンテナコスト割り当て][2]を参照してください。

## リアルタイムコストのクエリ {#query-real-time-costs}

リアルタイムコストは、Metrics Explorer およびダッシュボードの標準 {{< ui >}}Metrics{{< /ui >}} ソースの下にあります。プロバイダーに対応するクエリを使用してください。

| プロバイダー | クエリ |
|---|---|
| AWS | `sum:aws.cost.net.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |
| Azure | `sum:azure.cost.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |
| Google Cloud | `sum:gcp.cost.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` |

リアルタイムコストのクエリには、以下を使用します。
- `sum` または `sum by` 集計
- `.as_count()` 修飾子 ([レートとカウントメトリクスの比較][1]についての詳細をご覧ください)
- 少なくとも 5 分間の `sum` ロールアップ (リアルタイムコストは 5 分ごとに更新されるため、前述のクエリでは 300 秒)

ロールアップは 1 時間など、より長く設定して、時間単位でコストを確認することも可能です。時間単位のコストは、Savings Plans や予約を購入する前に使用パターンを把握する上で役立ちます。

## ダッシュボードでリアルタイムコストを表示する {#view-real-time-costs-in-dashboards}

各プロバイダーには、すぐに使える {{< ui >}}Real-Time Cost Overview{{< /ui >}} ダッシュボードがあります。これらのダッシュボードには、確定した請求データが利用可能になる前にリアルタイムのコスト傾向と前日比のコスト変化が表示されます。これらは、[{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Analyze{{< /ui >}} > {{< ui >}}Dashboards{{< /ui >}}][5] ページまたは [Dashboard List][6] で確認できます。

ダッシュボードには、[リアルタイムコスト要件][7]を満たした後のデータが表示されます。追加のセットアップは不要です。

## リアルタイムの Kubernetes 割り当て {#real-time-kubernetes-allocation}

コンテナコスト割り当てと同様、Datadog は、EC2 インスタンス、Azure VM、Compute Engine インスタンスのコストを、それらで実行された Kubernetes Pod に配分します。Pod で使用されているすべてのタグはリアルタイムで利用可能です。これには、チーム、サービス、env などの **Pod のカスタムタグ**や、**標準 Kubernetes タグ**が含まれます。
- `allocated_spend_type`これはコンピューティングコストを、ワークロードによって使用された CPU およびメモリ (`usage`)、ワークロードによって要求されたが使用されなかったもの (`workload_idle`)、およびどのワークロードによっても予約されていないもの (`cluster_idle`) に分割します。
- `kube_cluster_name`
- `kube_namespace`
- `kube_deployment`
- `kube_stateful_set`
- `kube_daemon_set`
- `pod_name`
- `pod_phase`
- `pod_status`

アイドル状態のノードや Pod が実行されていないノードも Kubernetes タグ (`kube_cluster_name` や `orchestrator:kubernetes` など) を保持しているため、完全にアイドル状態のクラスターのコストをグループ化して表示できます。

## タグ {#tags}

リアルタイムコストのタグは、他の Cloud Cost Management メトリクスのタグとは以下の点で異なります。
- すべてのタグ値は小文字で、メトリクスデータと同様に正規化されます。
- Tag Pipelines および Custom Allocation Rules は適用されません。
- 一部の請求固有のタグ (AWS Cost and Usage Report、Azure コストエクスポート、または Google Cloud 請求エクスポートからのもの) や FOCUS タグは、リアルタイムコストメトリクスには存在しない場合があります。リアルタイムコストは、主に請求データからではなく、Datadog Agent が収集する使用状況データから算出されます。

## 精度 {#accuracy}

Agent によって監視されているインスタンスの場合、Datadog は請求データにおける 1 日のコンピューティングコストの 10% 以内のリアルタイムコスト見積もりを目標としています。比較に使用される請求データは、プロバイダーによって異なります。
- **AWS**: AWS Cost and Usage Report からの EC2 コスト
- **Azure**: Azure コストエクスポートからの償却済み Virtual Machines 使用コスト
- **Google Cloud**: Google Cloud 請求エクスポートからの償却済み Compute Engine vCPU およびメモリコスト

リアルタイムコストは低レイテンシー配信向けに最適化されているため、特にプレビュー期間中の Azure と Google Cloud では、データが一時的に減少したり途切れたりする場合があります。長期的なコスト傾向分析の場合、Datadog は請求データに基づく Cloud Cost Management メトリクスの使用を推奨しています。これらのメトリクスには最終的なクレジットが含まれます。

- 分散のソースには以下が含まれます。
  - オンデマンド (従量課金)、コミットメント (Savings Plans、予約、コミットされた利用割引)、スポットの支出の直近の構成比に応じて変動する、1 時間ごとの平均値
  - インスタンスの実際の開始および終了時間と、Agent が報告する時間との間のわずかな差異
- 過小評価は次のような場合に発生する可能性があります。
  - インスタンスが Datadog Agent によって監視されていない
  - 新しく使用されたインスタンスタイプやリージョンがまだ CCM の請求データに反映されていない
  - 見積もりを、コンピューティング以外の料金も含む合計支出と比較している ([概要][4]セクションを参照)
- 過大評価は次のような場合に発生する可能性があります。
  - インスタンスが Datadog Agent によって監視されているものの、CCM の請求データに含まれていない

分散を減らすには、Cloud Cost Management が対象としており、かつすべてのインスタンスで Datadog Agent が実行されているアカウント、サブスクリプション、またはプロジェクトに絞り込んでください。

`estimated_hourly_cost` および `estimated_daily_cost` タグを使用して、インスタンスタイプごとの 1 時間および 1 日あたりの推定コストを確認します。

[1]: /ja/metrics/types/?tab=rate#metric-types
[2]: /ja/cloud_cost_management/allocation/container_cost_allocation/
[3]: /ja/cloud_cost_management/cost_changes/monitors/#create-a-real-time-anomaly-monitor
[4]: #overview
[5]: https://app.datadoghq.com/cost/analyze/dashboards
[6]: https://app.datadoghq.com/dashboard/lists?q=type%3Aintegration%20cost%20real
[7]: #requirements