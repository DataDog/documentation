---
aliases:
- /ja/cloudprem/configure/cluster_sizing/
description: CloudPrem のクラスター サイジングについて
further_reading:
- link: /cloudprem/configure/ingress/
  tag: ドキュメント
  text: CloudPrem Ingress を設定する
- link: /cloudprem/configure/pipelines/
  tag: ドキュメント
  text: CloudPrem のログ処理を設定する
- link: /cloudprem/introduction/architecture/
  tag: ドキュメント
  text: CloudPrem アーキテクチャの詳細
title: クラスター サイズの見積もり
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

適切なクラスター サイジングを行うことで、CloudPrem デプロイメントのパフォーマンス、コスト効率、信頼性を高い水準で維持できます。必要なサイズは、ログの取り込み量、クエリ パターン、ログ データの複雑さなど、いくつかの要因によって変わります。

このガイドでは、CloudPrem クラスターを構成する indexer、searcher、補助サービス、PostgreSQL データベースについて、初期設計の目安となる推奨値をまとめています。

<div class="alert alert-tip">
まずは、想定する 1 日あたりのログ量とピーク時の取り込みレートを基準に見積もり、運用開始後にクラスターのパフォーマンスを監視しながら必要に応じて調整してください。
</div>

## Indexer

Indexer は Datadog Agent からログを受け取り、処理、インデックス化を行ったうえで、オブジェクト ストレージに _splits_ と呼ばれるインデックス ファイルとして保存します。取り込みスループットを安定して確保し、想定ログ量を無理なく処理するためには、適切なサイジングが欠かせません。

| 項目 | 推奨値 | 補足 |
|---------------|----------------|-------|
| **パフォーマンス** | vCPU あたり 5 MB/s | 初期サイジングの目安となる基準スループットです。実際の性能は、ログの特性 (サイズ、属性数、ネストの深さ) に左右されます。 |
| **メモリ** | vCPU あたり 4 GB RAM | |
| **最小 Pod サイズ** | 2 vCPU、8 GB RAM | indexer Pod の推奨最小構成です。 |
| **ストレージ容量** | 最低 200 GB | インデックス ファイルの作成およびマージ中に発生する一時データの保存に必要です。 |
| **ストレージ種別** | ローカル SSD (推奨) | ローカル HDD やネットワーク接続型ブロック ストレージ (Amazon EBS、Azure Managed Disks) も使用できます。 |
| **ディスク I/O** | vCPU あたり約 20 MB/s | Amazon EBS では、vCPU あたり 320 IOPS に相当します (64 KB IOPS を前提)。 |


{{% collapse-content title="例: 1 日あたり 1 TB のログを処理する場合のサイジング" level="h4" expanded=false %}}
1 日あたり 1 TB のログ (~11.6 MB/s) をインデックス化するには、次のように見積もります:

1. **vCPU を計算する**: `11.6 MB/s ÷ vCPU あたり 5 MB/s ≈ 2.3 vCPU`
2. **RAM を計算する**: `2.3 vCPU × 4 GB RAM ≈ 9 GB RAM`
3. **余裕を持たせる**: まずは **3 vCPU、12 GB RAM、200 GB ディスク** を割り当てた indexer Pod 1 つから始めます。実際のパフォーマンスや冗長性の要件に応じて調整してください。
{{% /collapse-content %}}

## Searcher

Searcher は Datadog UI からの検索クエリを処理し、Metastore からメタ データを読み取り、必要なデータをオブジェクト ストレージから取得します。

一般的な出発点としては、indexer に割り当てた vCPU の合計数のおよそ 2 倍を searcher 用に見込むのが目安です。

- **パフォーマンス**: 検索性能はワークロードに大きく左右されます (クエリの複雑さ、同時実行数、スキャン対象データ量など)。たとえば、ターム クエリ (`status:error AND message:exception`) は、通常、集計クエリよりも計算負荷が低くなります。
- **メモリ**: searcher の vCPU あたり 4 GB RAM を目安にしてください。同時に多数の集計リクエストが発生する見込みがある場合は、さらに多めの RAM を割り当ててください。

## その他のサービス

これらの軽量コンポーネントには、次のリソースを割り当てます:

| サービス | vCPU | RAM | レプリカ数 |
|---------|-------|-----|----------|
| **Control Plane** | 2 | 4 GB | 1 |
| **Metastore** | 2 | 4 GB | 2 |
| **Janitor** | 2 | 4 GB | 1 |

## PostgreSQL データベース

- **インスタンス サイズ**: 多くのユース ケースでは、1 vCPU と 4 GB RAM の PostgreSQL インスタンスで十分です。
- **AWS RDS の推奨構成**: AWS RDS を使う場合は、`t4g.medium` インスタンス タイプを出発点にするのが適しています。
- **高可用性**: 高可用性を確保するには、待機レプリカ 1 台を含む Multi-AZ デプロイを有効にしてください。

## Helm チャートのサイジング ティア

CloudPrem Helm チャートには、`indexer.podSize` と `searcher.podSize` パラメーターを通じて、あらかじめ定義されたサイジング ティアが用意されています。各ティアでは、Pod の vCPU とメモリのリソース上限が設定され、あわせてコンポーネント固有の設定も自動で調整されます。

| サイズ | vCPU | メモリ |
|------|-------|--------|
| medium | 1 | 4 GB |
| large | 2 | 8 GB |
| xlarge | 4 | 16 GB |
| 2xlarge | 8 | 32 GB |
| 4xlarge | 16 | 64 GB |
| 6xlarge | 24 | 96 GB |
| 8xlarge | 32 | 128 GB |

{{% collapse-content title="ティアごとの Indexer 設定" level="h4" expanded=false %}}

Helm チャートで `indexer.podSize` を設定すると、次の値が自動的に適用されます。各パラメーターの詳細は、[Quickwit Indexer の設定][1] を参照してください。

| サイズ | split_store_max_num_bytes | split_store_max_num_splits |
|------|---------------------------|----------------------------|
| medium | 200G | 10000 |
| large | 200G | 10000 |
| xlarge | 200G | 10000 |
| 2xlarge | 200G | 10000 |
| 4xlarge | 200G | 10000 |
| 6xlarge | 200G | 10000 |
| 8xlarge | 200G | 10000 |

{{% /collapse-content %}}

{{% collapse-content title="ティアごとの Ingest API 設定" level="h4" expanded=false %}}

Helm チャートで `indexer.podSize` を設定すると、次の値が自動的に適用されます。各パラメーターの詳細は、[Quickwit Ingest API の設定][2] を参照してください。

| サイズ | max_queue_memory_usage | max_queue_disk_usage |
|------|------------------------|----------------------|
| medium | 2GiB | 4GiB |
| large | 4GiB | 8GiB |
| xlarge | 8GiB | 16GiB |
| 2xlarge | 16GiB | 32GiB |
| 4xlarge | 32GiB | 64GiB |
| 6xlarge | 48GiB | 96GiB |
| 8xlarge | 64GiB | 128GiB |

{{% /collapse-content %}}

{{% collapse-content title="ティアごとの Searcher 設定" level="h4" expanded=false %}}

Helm チャートで `searcher.podSize` を設定すると、searcher の構成に次の値が自動的に適用されます。各パラメーターの詳細は、[Quickwit Searcher の設定][3] を参照してください。

| サイズ | fast_field_cache_capacity | split_footer_cache_capacity | partial_request_cache_capacity | max_num_concurrent_split_searches | aggregation_memory_limit |
|------|---------------------------|-----------------------------|-------------------------------|-----------------------------------|--------------------------|
| medium | 1GiB | 500MiB | 64MiB | 2 | 500MiB |
| large | 2GiB | 1GiB | 128MiB | 4 | 1GiB |
| xlarge | 4GiB | 2GiB | 256MiB | 8 | 2GiB |
| 2xlarge | 8GiB | 4GiB | 512MiB | 16 | 4GiB |
| 4xlarge | 16GiB | 8GiB | 1GiB | 32 | 8GiB |
| 6xlarge | 24GiB | 12GiB | 1536MiB | 48 | 12GiB |
| 8xlarge | 32GiB | 16GiB | 2GiB | 64 | 16GiB |

{{% /collapse-content %}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://quickwit.io/docs/configuration/node-config#indexer-configuration
[2]: https://quickwit.io/docs/configuration/node-config#ingest-api-configuration
[3]: https://quickwit.io/docs/configuration/node-config#searcher-configuration