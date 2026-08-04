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

適切なクラスターサイジングは、BYOC (Bring Your Own Cloud) Logs デプロイメントにおける最適なパフォーマンス、コスト効率、および信頼性の確保に役立ちます。サイジング要件は、ログの取り込み量、クエリパターン、保持期間、ログデータの複雑さなど、複数の要因によって異なります。

以下の[サイジング例](#sizing-examples)は、一般的な 1 日あたりのログ量に対する開始点となる構成を提供します。各コンポーネントの詳細なガイダンスについては、後続のセクションを参照してください。

<div class="alert alert-tip">
予想される 1 日あたりのログ量とピーク時の取り込み率を開始点として使用し、クラスターのパフォーマンスを監視して、必要に応じてサイジングを調整してください。
</div>

## サイジング例 {#sizing-examples}

以下のテーブルは、一般的な 1 日あたりのログ量に対する開始点となる構成を示しています。これらはベースラインとなる推奨事項です。実際のパフォーマンスに基づいて調整してください。

混合ワークロードの経験則として、1 日あたり 1 TB の取り込みごとに約 12 vCPU を計画してください (インデクサーに 4 vCPU、サーチャーに 8 vCPU)。負荷の高い分析ワークロードでは、2 倍のリソースが必要です。

これらの vCPU 推奨事項は、AWS m6 インスタンスタイプ (または他のクラウドにおける同等のインスタンスタイプ) などの最新の x86 CPU を前提としています。AWS Graviton などの ARM ベースの CPU は、同じスループットでより高いコスト効率を実現できる場合があります。

| 1 日あたりのログ量 | インデクサー Pod | インデクサー Pod サイズ | サーチャー Pod | サーチャー Pod サイズ | オブジェクトストレージ (30 日間保持、約 6 倍圧縮) |
|-------------|-------------|-----------------|---------------|-------------------|-----------------------------------------------------|
| **1 TB/日** | 2 | large | 2 | xlarge | 約 5 TB |
| **5 TB/日** | 5 | xlarge | 5 | 2xlarge | 約 25 TB |
| **10 TB/日** | 10 | xlarge | 5 | 4xlarge | 約 50 TB |
| **50 TB/日** | 25 | 2xlarge | 13 | 8xlarge | 約 250 TB |
| **100 TB/日** | 50 | 2xlarge | 25 | 8xlarge | 約 500 TB |

<div class="alert alert-info">
<strong>請求とプロビジョニング:</strong> プロビジョニングされた vCPU と請求対象の vCPU は異なります。本番環境のクラスターは、取り込みと検索の急増を吸収するために、意図的に過剰プロビジョニングされています。請求に関するガイダンスについては、Datadog の担当者にお問い合わせください。
</div>

## インデクサー {#indexers}

インデクサーは Datadog Agent からログを受信し、それらを処理、インデックス化して、インデックスファイル (_splits_ と呼ばれます) としてオブジェクトストレージに保存します。適切なサイジングは、取り込みスループットを維持し、クラスターがログ量を処理できるようにするために不可欠です。

| 仕様 | 推奨事項 | 注記 |
|---------------|----------------|-------|
| **パフォーマンス** | vCPU あたり 5 MB/s| 初期サイジングを決定するためのベースラインスループット。実際のパフォーマンスは、ログの特性 (サイズ、属性数、ネストレベル) に依存します |
| **メモリ** | vCPU あたり 4 GB RAM | |
| **最小 Pod サイズ** | 2 vCPU、8 GB RAM | インデクサー Pod の推奨最小構成 |
| **ストレージ容量** | 250 GB 以上 | インデックスファイルの作成およびマージ中に一時データを保存するために必要 |
| **ストレージタイプ** | ネットワーク接続型ブロックストレージ | 例: Amazon EBS gp3、Azure Managed Disks、または GCP Persistent Disk。データは、オブジェクトストレージにアップロードされる前に、先行書き込みログ (WAL) に一時的に保存されます。WAL はレプリケートされないため、ローカル (エフェメラル) SSD を使用すると、ディスク障害時に数分間のデータが失われるリスクが高まります。ネットワーク接続型ブロックストレージは、組み込みの冗長性を提供します。|
| **ディスク I/O** | 約 20 MB/s/vCPU | Amazon EBS の場合、vCPU あたり 320 IOPS に相当します (64 KB IOPS と仮定) |


{{% collapse-content title="例: 1 日あたり 1 TB のログのサイジング" level="h4" expanded=false %}}
1 日あたり 1 TB のログ (約 11.6 MB/s) をインデックス化するには、以下の手順に従ってください。

1. **vCPU の計算:** `11.6 MB/s ÷ 5 MB/s per vCPU ≈ 2.3 vCPUs`
2. **RAM の計算:** `2.3 vCPUs × 4 GB RAM ≈ 9 GB RAM`
3. **ヘッドルームの追加:** **3 vCPU、12 GB RAM、200 GB ディスク**で構成されたインデクサー Pod 1 つから開始しますこれらの値は、実際のパフォーマンスと冗長性の要件に基づいて調整してください。
{{% /collapse-content %}}

{{% collapse-content title="イベント数によるサイジング" level="h4" expanded=false %}}
1 日あたりのイベント数はわかっているが、バイト量がわからない場合は、この式を使用して推定します。

$$\text"Daily volume (TB)" = {\text"events per day" × \text"average event size (bytes)"} / 10^{12}$$

例: 1 日あたり 10 億イベントで、平均サイズが 1 KB の場合:

`1,000,000,000 × 1,000 / 1,000,000,000,000 = 1 TB/day`

一般的なログイベントのサイズは、500 バイト (短い syslog) から 2〜3 KB (Kubernetes タグ付きの JSON) の範囲です。正確な平均値を得るために、代表的なログサンプルを測定してください。
{{% /collapse-content %}}

## サーチャー {#searchers}

サーチャーは、Datadog UI からの検索クエリを処理し、Metastore からメタデータを読み取り、オブジェクトストレージからデータを取得します。

一般的な開始点として、インデクサーに割り当てられた vCPU の合計数の約 2 倍をプロビジョニングします。サイジング例を参照してください。

- **パフォーマンス:** 検索パフォーマンスは、ワークロード (クエリの複雑さ、同時実行数、スキャンされるデータ量) に大きく依存します。たとえば、タームクエリ (`status:error AND message:exception`) は、通常、ワイルドカード検索やイベント全体検索クエリよりも計算コストが低くなります。
- **メモリ:** サーチャー vCPU あたり 4 GB の RAM。同時集計リクエストが多数発生すると予想される場合は、より多くの RAM をプロビジョニングしてください。


## その他のサービス {#other-services}

これらの軽量コンポーネントには、以下のリソースを割り当ててください。

| サービス | vCPU | RAM | レプリカ |
|---------|-------|-----|----------|
| **Control Plane** | 2 | 4 GB | 1 |
| **メタストア** | 2 | 4GB | 2 |
| **Janitor** | 2 | 4GB | 1 |

## オブジェクトストレージの見積もり {#object-storage-estimation}

BYOC Logs は、ログデータをオブジェクトストレージに保存する前に、圧縮およびインデックス化を行います。圧縮率は、ログの形式、構造、およびデータ内の冗長性によって異なります。

| メトリック | 一般的な範囲 |
|--------|---------------|
| **圧縮率** | 5 倍〜8 倍 (生データから保存サイズ) |
| **1 日あたりの取り込み TB あたりのストレージ** | オブジェクトストレージ上で 1 日あたり 125〜200 GB |

オブジェクトストレージの要件を見積もるには、以下を行います。

$$\text"Stored data per day" = {\text"Daily volume"} / {\text"compression ratio"}$$

$$\text"Total storage" = \text"Stored data per day" × \text"retention period (days)"$$

{{% collapse-content title="例: 30 日間の保持期間で 1 日あたり 10 TB の場合のストレージ" level="h4" expanded=false %}}
圧縮率を 6 倍と仮定した場合:

1. **1 日あたりの保存量:** `10 TB / 6 ≈ 1.67 TB/day`
2. **30 日間の合計:** `1.67 TB × 30 ≈ 50 TB`

アクティブなデータには、標準ティアのオブジェクトストレージ (例: S3 Standard、GCS Standard) を使用してください。S3 Infrequent Access や GCS Nearline などの低コストティアは、BYOC Logs での使用が検証されていません。
{{% /collapse-content %}}

## PostgreSQL データベース {#postgresql-database}

- **インスタンスサイズ:** ほとんどのユースケースでは、1 vCPU および 4 GB の RAM を搭載した PostgreSQL インスタンスで十分です。
- **AWS RDS の推奨事項:** AWS RDS を使用する場合、`t4g.medium` インスタンスタイプは適切な開始点です。
- **高可用性:** 高可用性を実現するために、1 つのスタンバイレプリカを備えた Multi-AZ デプロイメントを有効にしてください。

## Helm チャートのサイジングティア {#helm-chart-sizing-tiers}

BYOC Logs Helm チャートは、`indexer.podSize` および `searcher.podSize` パラメーターを通じて、事前定義されたリソースティアを提供します。`podSize` は、Pod のリソース要件と関連する Quickwit チューニングパラメーターを選択します。デフォルトの `podSize` は、両方のコンポーネントで `xlarge` です。各プリセットは、Kubernetes システムコンポーネント、DaemonSet、およびアドオンのために、対応するノード上に余裕を残すように設計されています。

プリセットは、Kubernetes システムコンポーネント用に予約されたリソースを考慮しています。予約量は、[GKE ノード予約計算](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/plan-node-sizes#resource_reservations)に基づいています。DaemonSet およびアドオン用に、ノードあたり追加で 250m CPU と 512Mi メモリが予約されています。

```text
Actual CPU request = (nominal pod CPU - Kubernetes system CPU reservation - 250m), rounded down to the nearest 100m
Actual memory request/limit = (nominal pod memory - Kubernetes system memory reservation - 512Mi), rounded down to the nearest 100Mi
```

| `podSize` | 公称 CPU リクエスト | 実際の CPU リクエスト | 公称メモリリクエスト/制限 | 実際のメモリリクエスト/制限 |
|---|---:|---:|---:|---:|
| `large` | 2 | 1600m | 8Gi | 5700Mi |
| `xlarge` | 4 | 3600m | 16Gi | 13100Mi |
| `2xlarge` | 8 | 7600m | 32Gi | 28500Mi |
| `4xlarge` | 16 | 15600m | 64Gi | 59300Mi |
| `6xlarge` | 24 | 23600m | 96Gi | 90100Mi |
| `8xlarge` | 32 | 31600m | 128Gi | 120900Mi |

プリセットでは CPU 制限を設定しないため、Pod はスロットリングされることなく、ノード上のアイドル CPU を使用できます。メモリ使用量を割り当て可能なノード容量内に収めるため、メモリリクエストと制限は同じ値に設定されています。

取り込みキューサイズと検索キャッシュサイズを定義する値は、選択したティアに対して自動的に適用されます。完全な構成については、[Helm チャートのサイジングマップ][1] を参照してください。各パラメーターの詳細については、Quickwit ドキュメントの [インデクサーパラメーター][2]、[インジェスト API パラメーター][3]、および [サーチャーパラメーター][4] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/cloudprem/sizing-map.yaml
[2]: https://quickwit.io/docs/configuration/node-config#indexer-configuration
[3]: https://quickwit.io/docs/configuration/node-config#ingest-api-configuration
[4]: https://quickwit.io/docs/configuration/node-config#searcher-configuration