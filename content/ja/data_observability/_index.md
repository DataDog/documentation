---
further_reading:
- link: /data_observability/datasets
  tag: ドキュメント
  text: データセット
- link: /data_jobs
  tag: ドキュメント
  text: Data Jobs Monitoring
- link: /data_streams
  tag: ドキュメント
  text: Data Streams Monitoring
- link: /database_monitoring
  tag: ドキュメント
  text: Database Monitoring
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-metaplane-aquistion/
  tag: ブログ
  text: Datadog が Metaplane を買収し、データ チームに可観測性を提供
title: Data Observability
---

<div class="alert alert-info">Data Observability はプレビュー版です。</div>

Data Observability はデータ チームがデータの品質、パフォーマンス、コストに影響を与える問題を検出、解決、防止するのに役立ちます。これにより、チームは異常を監視し、より迅速にトラブルシューティングを行い、下流システムを支えるデータへの信頼性を維持できます。

{{< img src="data_observability/data_observability_overview.png" alt="失敗した Spark ジョブが Snowflake テーブルの上流にあり、アラートと「Upstream issue」とラベル付けされた 4 つの下流ノードを示すリネージ グラフ。" style="width:100%;" >}}

Datadog はメトリクス、メタデータ、リネージ、ログなど、データ スタック全体の主要なシグナルを監視することで、これを実現します。これらのシグナルにより、問題を早期に検出し、信頼性が高く高品質なデータを維持できます。

## 主な機能

Data Observability を使用すると、次のことができます:

- ボリューム、新鮮度、Null 率、分布の異常を検出
- リネージを分析して、ソースからダッシュボードまでのデータ 依存関係を追跡
- パイプラインと統合し、ジョブ実行、データ ストリーム、インフラ イベントと問題を相関付け

## データ品質を監視

{{< img src="data_observability/data_observability_lineage_quality.png" alt="quoted_pricing Snowflake テーブルを中心に、pricing metric のアラートと freshness、row count、size のサイドバー チャートを含むリネージ グラフ。" style="width:100%;" >}}

Datadog は次のようなメトリクスとメタデータを継続的に追跡します:

- Null 数、Null 率、一意性、平均、標準偏差などのデータ メトリクス
- スキーマ、行数、新鮮度などのメタデータ

静的なしきい値を設定するか、自動異常検知に依存して次のような予期しない変化を検出できます:

- 更新の欠落または遅延
- 行数の想定外の変化
- 主要メトリクスの外れ値

## リネージを追跡して影響を把握

{{< img src="data_observability/data_observability_lineage_trace.png" alt="Kafka から失敗した Spark ジョブを経由して Snowflake テーブルに至るデータ フローを追跡し、アラートと「Upstream issue」とラベル付けされた 4 つの下流ノードを示すリネージ グラフ。" style="width:100%;" >}}

Data Observability はエンド ツー エンドのリネージを提供し、次のことを支援します:

- テーブル、列、ダッシュボード間の依存関係を可視化
- 上流の根本原因を特定し、下流への影響を評価
- より迅速にデバッグし、安全にスキーマや変換を変更

## パイプラインとインフラのアクティビティと相関付け

{{< img src="data_observability/data_observability_pipeline_infra_correlation.png" alt="S3 path エラーで失敗した Spark ジョブを示し、job run stats と duration trends のサイド パネルも表示するリネージ グラフ。" style="width:100%;" >}}

パイプライン アクティビティとインフラ イベントがデータにどのような影響を与えるかを把握できます。Datadog はパイプライン ツールやユーザー操作からログとメタデータを取り込み、次のようなデータ品質問題のコンテキストを提供します:

- ジョブ の失敗や遅延 (例: Spark、Airflow)
- クエリ アクティビティとダッシュボードの使用状況 (例: Tableau)

これらの運用コンテキストにより、データ インシデントの原因を追跡し、より迅速に対応できます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}