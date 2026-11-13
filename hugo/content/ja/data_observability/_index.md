---
description: Data Observability でデータの品質、パフォーマンス、コストを監視し、異常を検知してデータリネージを分析し、ダウンストリームシステムに影響する問題の発生を防ぎます。
further_reading:
- link: https://www.datadoghq.com/about/latest-news/press-releases/datadog-metaplane-aquistion/
  tag: ブログ
  text: Datadog が Metaplane を買収し、データ チームに可観測性を提供
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: ブログ
  text: Datadog を使用して Google Cloud AI スタックを評価、最適化、保護する
- link: https://www.datadoghq.com/blog/data-pipeline-monitoring/
  tag: ブログ
  text: 'データパイプライン監視の基礎: データスタック全体の健全性とパフォーマンスを追跡する'
- link: https://www.datadoghq.com/blog/monitor-warehouse-data-quality-beyond-pipeline-health/
  tag: ブログ
  text: パイプラインの健全性だけでなくウェアハウスのデータ品質も監視する
- link: https://www.datadoghq.com/architecture/monitoring-financial-data-mesh-on-aws-using-datadog/
  tag: Architecture Center
  text: Datadog を使用した AWS 上の金融データメッシュの監視
- link: https://www.datadoghq.com/architecture/monitoring-insurance-data-lakes-on-aws-using-datadog/
  tag: Architecture Center
  text: Datadog を使用した AWS 上の保険データレイクの監視
title: Data Observability の概要
---
## 概要{#overview}
Data Observability (DO) は、データチームが分析や AI アプリケーション向けのデータの信頼性を向上させ、データパイプラインのパフォーマンスとコストを最適化するのに役立ちます。本番環境から利用に至るまで品質監視とジョブ監視を統合することで、チームはコストとパフォーマンスを最適化しながら、問題をより迅速に検知して修復できます。

{{< img src="data_observability/do_suite_root_cause_analysis-1.png" alt="Spark ジョブトレースを含む Datadog Data Observability のエンドツーエンドのリネージ。" style="width:100%;" >}}

## 主な機能 {#key-capabilities}

- **障害を早期に検知**: ML を活用したモニターにより、Snowflake、Databricks、BigQuery などのウェアハウス内の品質に問題のあるデータを、ダッシュボード、ステークホルダー、AI モデルに影響が及ぶ前の時点で検出します。Databricks、Spark、Airflow、または dbt で実行されるジョブでアップストリームパイプラインの障害を検知します。
- **修復を迅速に実行**: 根本原因を特定し、インシデントの影響範囲を評価し、適切な担当者に割り当てるためのエンドツーエンドのリネージを使用したトリアージが迅速化されます。パイプライン内で失敗または遅延したジョブを確認し、ジョブ実行のトレースとログに切り替えて原因を特定します。
- **コストとパフォーマンスを最適化**: Spark および Databricks のジョブとクラスターのコストと効率を可視化し、推奨事項を活用してクラスター構成、コード、クエリを最適化します。
- **エンドツーエンドの可観測性を統合**: データ品質、パイプラインの実行、インフラストラクチャーのシグナルを 1 か所で関連付け、データライフサイクル全体を網羅します。

## 始める {#get-started}

{{< whatsnext desc="Data Observability は以下の機能で構成されています。" >}}
   {{< nextlink href="/data_observability/data_catalog/" >}}Data Catalog: 接続されているインテグレーション全体のデータ資産をまとめた一元的なインベントリを閲覧、検索します。{{< /nextlink >}}
   {{< nextlink href="/data_observability/lineage/" >}}Lineage: データスタック全体にわたるアップストリームの依存関係とダウンストリームのコンシューマーをトレースします。{{< /nextlink >}}
   {{< nextlink href="/data_observability/quality_monitoring/" >}}Quality Monitoring: ダウンストリームの BI および AI アプリケーションに影響が及ぶ前にデータの問題を特定します。{{< /nextlink >}}
   {{< nextlink href="/data_observability/jobs_monitoring/" >}}Jobs Monitoring: データパイプライン全体でジョブを監視、トラブルシューティング、最適化します。{{< /nextlink >}}
   {{< nextlink href="/data_observability/cicd/" >}}CI/CD: データ品質の問題がマージする前に防ぎます。{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}