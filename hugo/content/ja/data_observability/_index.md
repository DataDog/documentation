---
description: Data Observability でデータの品質、パフォーマンス、コストを監視し、異常の検知、データリネージの分析、およびダウンストリームシステムに影響を及ぼす問題の防止を実現します。
further_reading:
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-metaplane-aquistion/
  tag: ブログ
  text: Datadog が Metaplane を買収し、データチームに Data Observability をもたらします。
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: ブログ
  text: Datadog で Google Cloud AI スタックを評価、最適化、保護します。
- link: https://www.datadoghq.com/blog/data-pipeline-monitoring/
  tag: ブログ
  text: 'データパイプライン監視の基礎: データスタック全体の健全性とパフォーマンスを追跡します。'
title: Data Observability の概要
---
## 概要 {#overview}
Data Observability（DO）は、データチームが分析やAIアプリケーション向けのデータの信頼性を向上させ、データパイプラインのパフォーマンスとコストを最適化するのに役立ちます。本番環境から消費に至るまでの Quality Monitoring と Jobs Monitoring を統合することで、チームはコストとパフォーマンスを最適化しながら、問題をより迅速に検知および修復できます。

{{< img src="data_observability/do_suite_root_cause_analysis-1.png" alt="Datadog Data Observability のSparkジョブトレースによるエンドツーエンドのリネージ。" style="width:100%;" >}}

## 主な機能 {#key-capabilities}

- **障害を早期に検知**: Snowflake、Databricks、BigQuery などのウェアハウス内の不正なデータを、ML を活用したモニターで、ダッシュボード、関係者、または AI モデルに影響が及ぶ前に検知します。Databricks、Spark、Airflow、またはdbtで実行されるジョブのアップストリームパイプラインの障害を検知します。
- **修復を加速**: エンドツーエンドのリネージを使用して根本原因を特定し、インシデントの影響範囲を評価し、適切な担当者に割り当てることで、トリアージを迅速化します。パイプライン内のどのジョブが失敗または遅延したかを表示し、ジョブ実行トレースとログに切り替えて原因を特定します。
- **コストとパフォーマンスを最適化**: SparkやDatabricksのジョブとクラスターのコストと効率を可視化し、推奨事項を活用してクラスター構成、コード、クエリを最適化します。
- **エンドツーエンドの可観測性を統合**: データ品質、パイプライン実行、インフラストラクチャーのシグナルを1か所で関連付け、データライフサイクル全体を網羅します。

## 始める {#get-started}

{{< whatsnext desc="Data Observability は、以下で構成されています。" >}}
   {{< nextlink href="/data_observability/data_catalog/" >}}データカタログ: 接続された統合全体にわたるデータ資産の集中インベントリを閲覧および検索します。{{< /nextlink >}}
   {{< nextlink href="/data_observability/lineage/" >}}リネージ: データスタック全体にわたるアップストリームの依存関係とダウンストリームのコンシューマーをトレースします。{{< /nextlink >}}
   {{< nextlink href="/data_observability/quality_monitoring/" >}}Quality Monitoring: ダウンストリームのBIおよびAIアプリケーションに影響が及ぶ前に、データの問題を特定します。{{< /nextlink >}}
   {{< nextlink href="/data_observability/jobs_monitoring/" >}}Jobs Monitoring: データパイプライン全体のジョブを監視、トラブルシューティング、最適化します。{{< /nextlink >}}
   {{< nextlink href="/data_observability/cicd/" >}}CI/CD: データ品質の問題がマージされる前に防止します。{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}