---
aliases:
- /ja/cloudprem/configure/cluster_sizing/
- /ja/cloudprem/operate/sizing/
description: BYOC Logs のクラスターサイジングについて確認する
further_reading:
- link: /byoc-logs/configure/ingress/
  tag: ドキュメント
  text: BYOC Logs Ingress の構成
- link: /byoc-logs/configure/pipelines/
  tag: ドキュメント
  text: BYOC Logs Log Processing の構成
- link: /byoc-logs/introduction/architecture/
  tag: ドキュメント
  text: BYOC Logs Architecture の詳細を確認する
title: クラスターサイジング
---
{{< jqmath-vanilla >}}

## 概要 {#overview}

BYOC (Bring Your Own Cloud) Logs クラスターのサイズを 3 つのステップで決定します。

1. 1 日あたりの取り込み量を TB/日単位で推定します。
2. その取り込み量に対する [スターター構成](#starter-configurations) を選択します。
3. クラスターを監視し、レプリカ数と Pod サイズを調整します。

サーチャーの容量は、取り込み量だけでなく、クエリの同時実行数、クエリの複雑さ、およびスキャンするデータ量によって決まります。

これらの推奨事項は、AWS M6 インスタンスタイプで使用されているような最新の x86 CPU、または他のクラウドプロバイダーが提供する同等の CPU を前提としています。AWS Graviton のような ARM ベースの CPU は、同等のスループットでより高いコスト効率を実現できる可能性があります。

## スターター構成 {#starter-configurations}

これらの合計値を出発点として使用します。

- **インデクサー:** 1 TB/日の取り込み量につき 2 vCPU
- **コンパクター:** 2 TB/日の取り込み量につき 1 vCPU
- **サーチャー:** インデクサーの vCPU 合計の約 2 倍。分析負荷の高いワークロードでは、テーブルに示す値の最大 2 倍が必要になる場合があります。

オブジェクトストレージの合計値は、30 日間の保持期間と 6 倍の圧縮率を前提としています。

|   1 日あたりの取り込み量 |  インデクサー | コンパクター |  サーチャー | オブジェクトストレージ |
|---------------:|----------:|-----------:|-----------:|---------------:|
|   **1 TB/日** |   2 vCPU |   0.5 vCPU |    4 vCPU |          ～ 5 TB|
|  **10 TB/日** |  20 vCPU |     5 vCPU |   40 vCPU |         ～ 50 TB|
| **100 TB/日** | 200 vCPU |    50 vCPU |  400 vCPU |        ～ 500 TB|

各 Pod の推奨サイズ:

| 1 日あたりの取り込み量 | インデクサー | コンパクター | サーチャー |
|---------------------|----------------:|----------------:|-----------------:|
| **30 TB/日以下** |  4 vCPU、16 GB |  4 vCPU、16 GB |  16 vCPU、64 GB |
| **30 TB/日超** |  8 vCPU、32 GB |  8 vCPU、32 GB | 64 vCPU、256 GB |

<div class="alert alert-info">
<strong>請求とプロビジョニング:</strong> プロビジョニングされた vCPU と請求対象の vCPU は異なります。本番環境のクラスターは、取り込みと検索の急増を吸収するために、意図的に過剰プロビジョニングされています。請求に関するガイダンスについては、Datadog の担当者にお問い合わせください。
</div>

## 各コンポーネントのサイズを設定します{#size-each-component}

スターター構成をコンポーネントごとに調整します。各コンポーネントの役割については、[アーキテクチャ][2]を参照してください。

### インデクサー{#indexers}

- **パフォーマンス:** 1 TB/日あたり 2 vCPU
- **メモリ:** vCPU あたり 4 GB RAM
- **ストレージタイプ:** 先行書き込みログ用のネットワーク接続型ブロックストレージ。[インデクサーの永続ストレージの設定][3]を参照してください。

{{% collapse-content title="イベント数によるサイジング" level="h4" expanded=false %}}
1 日あたりのイベント数はわかっているが、バイト量がわからない場合は、この式を使用して推定します。

$$\text"Daily volume (TB)" = {\text"events per day" × \text"average event size (bytes)"} / 10^{12}$$

例: 1 日あたり 10 億イベントで、平均サイズが 1 KB の場合:

`1,000,000,000 × 1,000 / 1,000,000,000,000 = 1 TB/day`

一般的なログイベントのサイズは、500 バイト (短い syslog) から 2〜3 KB (Kubernetes タグ付きの JSON) の範囲です。正確な平均値を得るために、代表的なログサンプルを測定してください。
{{% /collapse-content %}}

### コンパクター{#compactors}

- **パフォーマンス:** 2 TB/日あたり 1 vCPU
- **メモリ:** vCPU あたり 4 GB RAM
- **ストレージタイプ:** ローカル SSD。AWS M8gd などのローカル SSD を備えたインスタンスを使用してください。

### サーチャー{#searchers}

サーチャーのサイズは、取り込み量だけでなく、想定される検索ワークロードに合わせて決定してください。開始時の目安は、インデクサーの vCPU 合計の約 2 倍です。

- **パフォーマンス:** タームクエリ (`status:error AND message:exception`) は通常、ワイルドカード検索やイベント全体検索よりも CPU 使用率が低くなります。集計クエリには、より多くの CPU とメモリが必要です。
- **メモリ:** サーチャー vCPU あたり 4 GB の RAM。同時集計リクエストが多数発生すると予想される場合は、より多くの RAM をプロビジョニングしてください。

検索レイテンシが高い場合は、サーチャーレプリカを追加するか、Pod あたりのメモリを増やしてください。[クエリパターンに基づくサーチャーのスケール][4]を参照してください。

### その他のサービス {#other-services}

これらの軽量コンポーネントには、以下のリソースを割り当ててください。

| サービス | vCPU | RAM | レプリカ |
|---------|-------|-----|----------|
| **Control Plane** | 2 | 4 GB | 1 |
| **メタストア** | 2 | 4GB | 2 |
| **Janitor** | 2 | 4GB | 1 |

### PostgreSQL データベース {#postgresql-database}

- **インスタンスサイズ:** ほとんどのユースケースでは、1 vCPU および 4 GB の RAM を搭載した PostgreSQL インスタンスで十分です。
- **Amazon RDS の推奨事項:** Amazon RDS では、`t4g.medium` インスタンスタイプから開始してください。
- **高可用性:** 1 つのスタンバイレプリカを備えた Multi-AZ デプロイメントを有効にしてください。

メタストアデータベースで自動バックアップを有効にしてください。[メタストアデータベースで自動バックアップを有効にする][5]を参照してください。

### オブジェクトストレージ {#object-storage}

BYOC Logs は、ログデータをオブジェクトストレージに保存する前に、圧縮およびインデックス化を行います。圧縮率は通常 5 倍から 8 倍であり、これは 1 日あたり 1 TB の取り込みに対して約 125 ～ 200 GB のストレージ容量に相当します。

$$\text"Stored data per day" = {\text"Daily volume"} / {\text"compression ratio"}$$

$$\text"Total storage" = \text"Stored data per day" × \text"retention period (days)"$$

<div class="alert alert-info">
アクティブなデータには、標準ティアのオブジェクトストレージ (例: S3 Standard、GCS Standard) を使用してください。S3 Infrequent Access や GCS Nearline などの低コストティアは、BYOC Logs での使用が検証されていません。
</div>

PUT リクエストのボリュームとコストを見積もるには、[オブジェクトストレージのリクエスト見積もり][6]を参照してください。

## Helm チャートのサイジングティア {#helm-chart-sizing-tiers}

[スターター構成](#starter-configurations)の Pod ごとの CPU およびメモリに合わせて、`indexer.podSize` と `searcher.podSize` を設定してください。デフォルトは `xlarge` です。各プリセットは、取り込みキューと検索キャッシュのサイズにも適用されます。

| `podSize` | CPU | メモリ |
|---|---:|---:|
| `large` | 2 | 8Gi |
| `xlarge` | 4 | 16Gi |
| `2xlarge` | 8 | 32Gi |
| `4xlarge` | 16 | 64Gi |
| `6xlarge` | 24 | 96Gi |
| `8xlarge` | 32 | 128Gi |

{{% collapse-content title="実際の Kubernetes リクエスト" level="h3" expanded=false %}}
各 `podSize` は、kube-system、DaemonSets、およびアドオンのための余地を残すため、公称 CPU およびメモリよりも少ない量を要求します。予約量は [GKE ノード予約計算](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/plan-node-sizes#resource_reservations) に従い、さらに DaemonSet およびアドオン用にノードあたり 250m の CPU と 512 Mi のメモリが追加されます。

| `podSize` | 実際の CPU リクエスト | 実際のメモリリクエスト/制限 |
|---|---:|---:|
| `large` | 1600m | 5700Mi |
| `xlarge` | 3600m | 13100Mi |
| `2xlarge` | 7600m | 28500Mi |
| `4xlarge` | 15600m | 59300Mi |
| `6xlarge` | 23600m | 90100Mi |
| `8xlarge` | 31600m | 120900Mi |

```text
Actual CPU request = (nominal pod CPU - Kubernetes system CPU reservation - 250m), rounded down to the nearest 100m
Actual memory request/limit = (nominal pod memory - Kubernetes system memory reservation - 512Mi), rounded down to the nearest 100Mi
```
{{% /collapse-content %}}

完全な構成については、[Helm チャートのサイジングマップ][1] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/sizing-map.yaml
[2]: /ja/byoc-logs/introduction/architecture/
[3]: /ja/byoc-logs/operate/best_practices/#configure-persistent-storage-for-indexers
[4]: /ja/byoc-logs/operate/best_practices/#scale-searchers-based-on-your-query-patterns
[5]: /ja/byoc-logs/operate/best_practices/#enable-automated-backups-on-your-metastore-database
[6]: /ja/byoc-logs/operate/object_storage_requests/