---
aliases:
- /ja/cloud_cost_management/real_time_costs
description: クラウドコストをリアルタイムで表示および分析します。
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について
title: リアルタイムコスト
---
## 概要 {#overview}

リアルタイムコストは、Kubernetes のコスト配分を含む Amazon EC2 コストのほぼリアルタイムの見積もりを提供するため、数日ではなく数分から数時間でコストの変化に対応できます。見積もりは、インスタンスタイプ、リージョン、AWS アカウントごとの最近の平均時間単価 (正味減価償却) に基づき、Datadog Agent からのリアルタイムの使用状況データを使用して生成されます。

リアルタイムコストを使用して、以下を行います。
- 異常を早期に検出する
- 最近の変更の影響を観察する
- 時間単位または時間未満のコスト傾向を監視する
- 急速に変化する Kubernetes クラスターの可視性を深める

リアルタイムコストは以下で利用可能です。
- Amazon EC2 コスト (EBS、ネットワーキング、および類似のサービスを除く)
- EC2 上で実行されている Kubernetes

## 要件 {#requirements}

リアルタイムコストは、Cloud Cost Management Enterprise のお客様が利用できます。

- AWS アカウントで Cloud Cost Management が有効になっていること
- 各 EC2 インスタンスに Datadog Agent がインストールされていること
- (オプション) Kubernetes のコストをリアルタイムで確認するには、[コンテナコスト割り当て][2]のセットアップガイドに従ってクラスターで Datadog Container Monitoring を有効にします。

## リアルタイムコストのクエリ方法 {#how-to-query-real-time-costs}

リアルタイムコストは、Metrics Explorer およびダッシュボードの標準 {{< ui >}}Metrics{{< /ui >}} ソースの下にあり、`sum:aws.cost.net.amortized.realtime.estimated{*}.as_count().rollup(sum, 300)` を使用してクエリする必要があります。
- `sum` または `sum by` 集計
-  `count` として ([レートとカウントメトリクスの比較][1]についての詳細をご覧ください)
- ロールアップ `sum`、最小 5 分間 (上記のクエリでは 300秒。リアルタイムコストは 5 分ごとに更新されるため)

ロールアップは 1 時間など、より長く設定して、時間単位でコストを確認することも可能です。時間単位のコストは、節約プランや予約を購入する前に使用パターンをより深く理解する上で役立ちます。

## リアルタイムの Kubernetes 割り当て {#real-time-kubernetes-allocation}

既存のコンテナコスト割り当てと同様に、EC2 インスタンスのコストはその上で実行された Kubernetes Pod ごとに分類されます。Pod で使用されているすべてのタグはリアルタイムで利用可能です。これには、チーム、サービス、env などの **Pod のカスタムタグ**や、**標準 Kubernetes タグ**が含まれます。
- `allocated_spend_type`これはコンピューティングコストを、ワークロードによって使用された CPU およびメモリ (`usage`)、ワークロードによって要求されたが使用されなかったもの (`workload_idle`)、およびどのワークロードによっても予約されていないもの (`cluster_idle`) に分割します。
- `kube_cluster_name`
- `kube_namespace`
- `kube_deployment`
- `kube_stateful_set`
- `pod_name`
- `pod_phase`
- `pod_status`

アイドル状態のノードや Pod が実行されていないノードも Kubernetes タグ (`kube_cluster_name` や `orchestrator:kubernetes` など) を保持しているため、完全にアイドル状態のクラスターのコストをグループ化して表示できます。

## タグ {#tags}

リアルタイムコストのタグは、他の Cloud Cost Management メトリクスのタグと似ていますが、同一ではありません。
- すべてのタグ値は小文字で、メトリクスデータと同様に正規化されます
- Tag Pipelines および Custom Allocation Rules は適用されません
- 一部のコストおよび使用状況レポート (CUR) 固有のタグや FOCUS タグは、リアルタイムコストメトリクスには存在しない場合があります。これは、リアルタイムコストが主に Datadog Agent によって収集された使用状況データから算出されており、CUR から算出されているわけではないためです

## 精度 {#accuracy}

リアルタイムコストは、Datadog Agent によって監視されている EC2 ホストについて、CUR の日次 EC2 コストデータの 10% 以内の精度を目指しています。リアルタイムコストは低レイテンシーでの配信を優先しているため、一時的なデータの欠落やギャップが発生することがあります。長期的なコスト傾向分析の場合、Datadog は AWS の直接的な請求データに基づく Cloud Cost メトリクスの使用を推奨しています。

`estimated_hourly_cost` タグを使用して、インスタンスタイプごとの 1 時間あたりの推定単価を把握できます。

- 分散のソースには以下が含まれます。
  - オンデマンド、コミットメント、スポット支出の最近の組み合わせによって変動する時間平均
  - インスタンスの実際の開始および終了時間と、エージェントが報告する時間との間のわずかな差異
- 過小評価は次のような場合に発生する可能性があります。
  - EC2 インスタンスが Datadog Agent によって監視されていない
  - 新しく使用されたインスタンスタイプやリージョンがまだ CCM の請求データに反映されていない
  - 見積もりがコンピューティングのみを対象としている (EBS やネットワークなどは含まれません)
- 過大評価は次のような場合に発生する可能性があります。
  - インスタンスが Datadog Agent によって監視されているものの、CCM の請求データに含まれていない

[1]: /ja/metrics/types/?tab=rate#metric-types
[2]: /ja/cloud_cost_management/allocation/container_cost_allocation/