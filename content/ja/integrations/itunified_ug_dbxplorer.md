---
algolia:
  subcategory: Marketplace インテグレーション
app_id: itunified-ug-dbxplorer
app_uuid: 1349589a-6fc1-4ddd-99c7-7b23ba82903a
assets:
  dashboards:
    dbXplorer - ASH Monitor: assets/dashboards/itunified_ug_dbxplorer_ash_monitor.json
    dbXplorer - DB Performance Health: assets/dashboards/itunified_ug_dbxplorer_db_health_performance.json
    dbXplorer - Oracle LMS: assets/dashboards/itunified_ug_dbxplorer_oracle_lms.json
    dbXplorer - Space Monitoring: assets/dashboards/itunified_ug_dbxplorer_space_monitoring.json
    dbXplorer - Status Summary: assets/dashboards/itunified_ug_dbxplorer_status_summary.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: dbxplorer.oracle.database.availability.status
      metadata_path: metadata.csv
      prefix: dbxplorer.oracle
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 14507249
    source_type_name: itunified_ug_dbxplorer
  monitors:
    ASM diskgroup space is running low: assets/monitors/dbxplorer_space_prdictive_diskgroup_usage.json
    DB wait event higher than usual: assets/monitors/dbxplorer_db_health_anomaly_wait_events.json
    Database is unavailable: assets/monitors/dbxplorer_db_health_availability.json
    Database load higher than usual: assets/monitors/dbxplorer_db_health_anomaly_load.json
    Permanent tablespace usage predicted to be too high: assets/monitors/dbxplorer_space_predictive_tablespace_permanent.json
    Recovery area capacity is predicted to be too low: assets/monitors/dbxplorer_space_predictive_recovery_area.json
    SQL query CPU time higher than usual: assets/monitors/dbxplorer_ash_sql_id_cpu_time.json
    SQL query elapsed time higher than usual: assets/monitors/dbxplorer_ash_sql_id_elapsed_time.json
    SQL query elapsed time is longer than usual (1 week): assets/monitors/dbxplorer_ash_sql_id_1w.json
    SQL query elapsed time is longer than usual (4 hours): assets/monitors/dbxplorer_ash_sql_id_4h.json
    Temporary tablespace usage predicted to be too high: assets/monitors/dbxplorer_space_predictive_tablespace_temp.json
    Undo tablespace usage predicted to be too high: assets/monitors/dbxplorer_space_predictive_tablespace_undo.json
author:
  homepage: https://www.itunified.de
  name: ITUNIFIED UG
  sales_email: support.datadog@itunified.de
  support_email: support.datadog@itunified.de
  vendor_id: itunified
categories:
- marketplace
- クラウド
- oracle
- data stores
- モニター
- alerting
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: itunified_ug_dbxplorer
integration_id: itunified-ug-dbxplorer
integration_title: dbXplorer for Oracle DBMS
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: itunified_ug_dbxplorer
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.itunified_ug.itunified_ug_dbxplorer.dbxplorer.oracle.database.integration.status
  product_id: itunified-ug-dbxplorer
  short_description: Oracle クラスター、DB、およびファイルシステムを監視します。
  tag: db_unique_name
  unit_label: 一意の DB 名
  unit_price: 50.0
public_title: dbXplorer for Oracle DBMS
short_description: Oracle データベースの健全性とパフォーマンスを監視および分析
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Offering::Integration
  - Category::Marketplace
  - Category::Cloud
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Category::Oracle
  - Category::Data Stores
  - Category::Metrics
  - Category::Alerting
  configuration: README.md#Setup
  description: Oracle データベースの健全性とパフォーマンスを監視および分析
  media:
  - caption: dbXplorer - ASH Monitoring
    image_url: images/1.png
    media_type: image
  - caption: dbXplorer - ASH Monitoring sql_id 関連ログの表示
    image_url: images/2.png
    media_type: image
  - caption: dbXplorer - DB Performance Health
    image_url: images/3.png
    media_type: image
  - caption: dbXplorer - Space Monitoring
    image_url: images/4.png
    media_type: image
  - caption: dbXplorer - Status Summary
    image_url: images/5.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/itunified-datadog-marketplace/
  support: README.md#Support
  title: dbXplorer for Oracle DBMS
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## 概要

**dbXplorer** を使用すると、Oracle (19c 以降) データベースの監視が可能で、Datadog を通じてリアルタイムの分析やパフォーマンスメトリクスが利用できます。このインテグレーションにより、Oracle データベースインスタンスの健全性とパフォーマンスを詳細に可視化できます。

このインテグレーションを使用すると、以下のことができます。
- プロアクティブな監視: パフォーマンスのボトルネック、異常なアクティビティ、障害に関するリアルタイムアラートで潜在的な問題を早期に検出します。
- パフォーマンスの最適化: データベースのパフォーマンスに関する洞察を得ることで、クエリやリソースをチューニングし、最適な利用状況と応答時間を確保します。
- 管理の簡素化: 複数の Oracle データベースの監視を単一プラットフォームに集約し、管理プロセスを合理化して運用コストを削減します。

このインテグレーションは、Oracle データベースの以下の種類のデータを監視します。
- パフォーマンスメトリクス: クエリ応答時間、メモリ使用量 (例えば PGA および SGA 統計)、リソースボトルネックのデータを含みます。このデータは、パフォーマンス問題の特定やデータベース操作の最適化に役立ちます。
- ヘルスメトリクス: 接続時間、ユーザーセッション、システム可用性といった重要な健全性指標を追跡し、ダウンタイムを防ぐためのタイムリーな介入を可能にします。

**ITUnified について**: 20 年以上の経験を持つ ITUnified では、プロの Oracle 認定のデータベース管理者 (DBA) が、複雑なプロジェクトの処理やクライアントのデータベース管理をサポートするスキルを備えています。同社は詳細なニーズ評価に基づいたカスタマイズされたデータベースサポートとサービスを提供しています。

### メトリクス

dbXplorer インテグレーションは、8 つのカテゴリーにわたる 77 のメトリクスを収集します。

Oracle の内部 DBA_HIST_ACTIVE_SESS_HISTORY テーブルに基づく 11 のメトリクス。以前の SQL クエリや繰り返し実行された SQL クエリに関するデータを提供します。

Oracle の内部 DBA_HIST_SQLSTAT テーブルに基づく 28 のメトリクス。アプリケーション、CPU、ディスク読み書き、I/O、SQL クエリの同時実行待ち時間に関するデータを提供します。

Oracle の内部 V$OSSTAT テーブルに基づく 11 のメトリクス。このテーブルにはオペレーティングシステムの利用統計が含まれています。

2 つのメトリクスが V$SESSION_EVENT テーブルから取得され、セッションごとのイベント待ち時間に関するデータを表示します。

10 のメトリクスが v$system_event テーブルから取得され、イベントの合計待ち時間に関するデータを表示します。

1 つのメトリクスには統計名が含まれています。異なる統計名については[こちら][2]を参照してください。

データベースの復旧領域に関連する 5 つのメトリクス。

テーブルスペースの使用状況に関連する 8 つのメトリクス。

### モニター

12 のモニターが含まれており、以下の通知を受け取ることができます。
- CPU および経過時間に基づく SQL 実行の異常検出
- 負荷および待機イベントに関するデータベースの健全性アラート
- 一般的なデータベースの可用性
- 一時、恒久、および元に戻す操作のテーブルスペース使用状況に関する予測アラート
- 復旧領域使用状況の予測アラート
- ASM ディスク使用状況の予測アラート

### ダッシュボード

dbXplorer インテグレーションには、以下の 4 つのダッシュボードが含まれています。

#### dbXplorer - ASH Monitoring
「dbXplorer - ASH Monitoring」ダッシュボードは、SQLSTAT と ACTIVE SESSION HISTORY (ASH) データを活用し、Oracle Database の包括的なパフォーマンス分析を提供するように設計されています。このダッシュボードは、SQLSTAT の SQL 実行メトリクスと ASH のセッションレベルのアクティビティインサイトを組み合わせ、データベースパフォーマンスの全体像と最適化の機会を可視化します。経過時間、CPU 時間、I/O 操作などのさまざまなパフォーマンスメトリクスを監視し分析する詳細な時系列グラフやクエリテーブルを含む複数のウィジェットを備えています。主な機能には、特定の SQL 識別子に対する異常検出、履歴パフォーマンス分析、パフォーマンスの問題を診断しデータベース操作を最適化するトレンドモニターなどがあります。

#### dbXplorer - DB Performance Health
「dbXplorer - DB Performance Health」ダッシュボードは、負荷異常、セッション待機異常、CPU 使用率、メモリ使用率など、さまざまな重要な側面に焦点を当て、Oracle Database のパフォーマンスを総合的に監視するようにカスタマイズされています。複数のウィジェットを使用して、グラフや表を通じて視覚的にデータを表示し、データベース管理者はパフォーマンスのボトルネックを迅速に特定し、対処できます。主な機能には、v$session_event および v$session_wait ビューによるセッション待機イベントの詳細な分析が含まれ、これにより、特定の待機イベントとデータベースセッションへの影響を把握できます。さらに、v$system_event および v$osstat ビューを使用して、システム全体のパフォーマンスメトリクスの監視と分析を行い、データベースの動作に影響を与えるシステムレベルの待機やオペレーティングシステムの相互作用をカバーするツールが用意されています。

#### dbXplorer - Space Monitoring
「dbXplorer - Space Monitoring」ダッシュボードは、Oracle データベースのテーブルスペース、復旧領域、自動ストレージ管理 (ASM) ディスクグループの詳細な監視と予測を提供します。現在のデータ使用状況と履歴、重大なしきい値に対するアラート、さまざまな時間枠におけるスペース割り当ての傾向を視覚化できます。ダッシュボード内のウィジェットには、時系列グラフ、クエリテーブル、ステータスサマリーが含まれており、合計、使用中、使用可能スペースなどのメトリクスを効率的に追跡できます。さらに、テンプレート変数を使用した動的なフィルタリングオプションが提供され、特定のデータベースインスタンスやクラスターに対して高度なカスタマイズが可能です。このツールは、システムの最適なパフォーマンスを維持し、スペース関連の潜在的な問題を未然に防ぐために、データベース管理者にとって不可欠です。

#### dbXplorer - Status Summary
「dbXplorer - Status Summary」ダッシュボードは、データベース操作のステータスとログを簡潔に表示します。「Availability Logs」では、データベースの可用性に関連するイベントがタイムスタンプやインスタンス名などのパラメーターでソートされて表示されます。別のウィジェットである「dbXplorer Logs」では、データベーストランザクションのログデータを要約表示にまとめ、ロガー名でグループ化し、重大度ごとのログ件数を示します。「Status Summary」ウィジェットでは、問題の重大度に基づいてデータ表示を優先付けし、ステータスの概要をリストとカウント形式で表示します。

#### dbXplorer - Oracle LMS
「dbXplorer - Oracle LMS」ダッシュボードは、Oracle License Management Services (LMS) に焦点を当て、ライセンスに関連するデータベース機能の使用状況を追跡し、レポートします。CPU カウントの視覚化機能により、データベース操作の規模と潜在的なライセンス要件の把握に役立ちます。さらに、このダッシュボードには、データベース機能と製品を関連付けるための複雑なクエリを実行し、現在の使用状況や過去の使用状況などのカテゴリー別に使用状況を分類し、機能レポートの例外を管理する、詳細な機能使用統計が含まれています。このダッシュボードは、Oracle のライセンス要件へのコンプライアンスを確保するためにデータベース管理者にとって不可欠なツールですが、ライセンス目的のみに使用すべきではありません。


### 前提条件

- Oracle Grid Infrastructure を使用する 19c EE 以降の Oracle データベースバージョンがサポートされています。それ以前のデータベースバージョンやサーバーレスインストールからのデータ収集はサポートされていません。

- このインテグレーションには Oracle Diagnostic and Tuning Pack のライセンスが必要です。このパックを使用しない、またはライセンスを取得しない場合は、ASH および AWR メトリクスの収集を必ず無効にしてください。これらのメトリクスの収集または無効化の方法については、セットアップ手順を参照してください。

## サポート
サポートまたは機能リクエストについては、[support.datadog@itunified.de][1] までお問い合わせください。

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [ITUnified が Datadog Marketplace で提供するサービスで、Oracle データベースのパフォーマンスを最適化する][5]

[1]: mailto:support.datadog@itunified.de
[2]: https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/statistics-descriptions-2.html#GUID-2FBC1B7E-9123-41DD-8178-96176260A639
[3]: https://hub.docker.com/repository/docker/itunified/dbxagent/general
[4]: https://app.datadoghq.com/monitors/recommended?q=dbXplorer&only_installed=false&p=1
[5]: https://www.datadoghq.com/blog/itunified-datadog-marketplace/

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。利用するには、<a href="https://app.datadoghq.com/marketplace/app/itunified-ug-dbxplorer" target="_blank">Marketplace でこのアプリケーションを購入してください</a>。