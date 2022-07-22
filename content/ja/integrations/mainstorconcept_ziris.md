---
app_id: mainstorconcept-ziris
app_uuid: dc8b4d40-72a3-46c2-9f9a-ffaadaeacb83
assets:
  dashboards:
    JDBC and z/OS: assets/dashboards/JDBC_Dashboard.json
    MQ Buffer Pool Manager: assets/dashboards/MQ_Buffer_Pool_Manager.json
    MQ Channel Initiator: assets/dashboards/MQ_Channel_Initiator.json
    MQ Data Manager: assets/dashboards/MQ_Data_Manager.json
    MQ Log Manager: assets/dashboards/MQ_Log_Manager.json
    MQ Message Manager: assets/dashboards/MQ_Message_Manager.json
    MQ Storage Manager: assets/dashboards/MQ_Storage_Manager.json
    z/OS Connect Metrics: assets/dashboards/z_OS_Connect_Metrics.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: mainstorconcept.zos.connect.elapsed_time
      metadata_path: metadata.csv
      prefix: mainstorconcept.zos.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: mainstorconcept-ziris
  monitors:
    MQ Active Dataset Reads: assets/monitors/mq_active_dataset_reads_monitor.json
    MQ Archive Dataset Reads: assets/monitors/mq_archive_dataset_reads_monitor.json
    MQ Checkpoints: assets/monitors/mq_checkpoints_monitor.json
    MQ Insufficient Storage Events: assets/monitors/mq_insufficient_storage_events_monitor.json
    MQ Storage Contractions: assets/monitors/mq_storage_contractions_monitor.json
    MQ Suspensions: assets/monitors/mq_suspensions_monitor.json
author:
  homepage: https://mainstorconcept.com
  name: mainstorconcept GmbH
  sales_email: sales@mainstorconcept.com
  support_email: support@mainstorconcept.com
  vendor_id: mainstorconcept
categories:
- マーケットプレイス
- mainframe
- トレーシング
- モニタリング
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: mainstorconcept_ziris
integration_id: mainstorconcept-ziris
integration_title: z/IRIS
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: EULA.pdf
manifest_version: 2.0.0
name: mainstorconcept_ziris
oauth: {}
pricing:
- billing_type: flat_fee
  includes_assets: false
  product_id: ziris
  short_description: 価格は、メインフレーム上の 50 MSU を対象としています。
  unit_price: 4800.0
public_title: z/IRIS
short_description: メインフレームから IBM z/OS のパフォーマンスデータを収集する
supported_os:
- linux
- ibm z/os
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::IBM z/OS
  - Category::Marketplace
  - Category::Mainframe
  - Category::Tracing
  - Category::Monitoring
  - Offering::Integration
  configuration: README.md#Setup
  description: メインフレームから IBM z/OS のパフォーマンスデータを収集する
  media:
  - caption: z/IRIS - メインフレーム包括的な観測可能性
    image_url: images/thumbnail_mainstorconcept_ziris.PNG
    media_type: ビデオ
    vimeo_id: 630489680
  - caption: z/OS と JDBC ダッシュボード
    image_url: images/datadog_Dashboard_JDBC.PNG
    media_type: image
  - caption: z/OS MQ Buffer Pool Manager
    image_url: images/datadog_Dashboard_z_OS_MQ_Buffer_Pool_Manager.png
    media_type: image
  - caption: z/OS MQ Log Manager
    image_url: images/datadog_Dashboard_z_OS_MQ_Log_Manager.png
    media_type: image
  - caption: z/OS Connect ダッシュボード
    image_url: images/datadog_Dashboard_z_OS_Connect.PNG
    media_type: image
  - caption: z/OS Infrastructure Dashboard
    image_url: images/datadog_Dashboard_z_OS_Infrastructure.png
    media_type: image
  - caption: z/IRIS - メインフレーム包括的な観測可能性
    image_url: images/thumbnail_mainstorconcept_ziris.PNG
    media_type: image
  - caption: 'z/IRIS: コンポーネントデザイン'
    image_url: images/datadog_ziris_opentelemetry_traces.PNG
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: z/IRIS
---



## 概要

[z/IRIS](https://www.mainstorconcept.com/mainframe/z-iris-mainframe-observability/z-iris-datadog/?lang=en) は、メインフレーム以外の世界で、メインフレームを包括するパフォーマンス監視を提供するために構築されたプラグインソフトウェアソリューションです。

DevOps チームは、ビジネスアプリケーションに対するメインフレームのパフォーマンスと、ピークパフォーマンスをどのように維持または達成できるかを理解したいと考えています。
z/IRIS では、DevOps のためのメインフレームの観測可能性がコアコンセプトとなっています。チームは、Datadog を使用して、メインフレームリソースの使用状況を評価し、パフォーマンスを継続的に分析し、アプリケーション間でメトリクスとデータを比較することができます。

z/IRIS をアクティブにした後、Datadog ユーザーは次のことを行うことができます。
* メインフレームでホストされているサービスやアプリケーションに依存しているアプリケーションを特定する。
* メインフレームサービスのレイテンシーを 1 リクエストレベルまで監視する。
* 組織の SLI に関連する異常やしきい値を超えた場合に対応するモニターを作成する。
* メインフレームアプリケーションのパフォーマンスを、ビジネスサービスのコンテキスト内でエンドツーエンドで分析する。

### インテグレーション方法

z/IRIS は、2 つの方法で Datadog とインテグレーションします。

* **OpenTelemetry (OTEL):** この観測可能性フレームワークは、APM インテグレーションを標準化し、Datadog によって完全にサポートされています。Datadog 環境にトレースとメトリクスをエクスポートするように構成された OpenTelemetry Collector にトレースとメトリクスをストリームするように、z/IRIS を簡単に構成することができます。
* **Datadog API (ベータ版):** また、Datadog Agent API と HTTP REST API を経由して、それぞれトレースとイベントをストリーミングすることも可能です。このインテグレーションは、OpenTelemetry がまだ組織内で利用できない場合に、概念実証を加速するのに役立ちます。

z/IRIS のインテグレーションに関するより詳細な情報は、[ドキュメント](https://public.mainstorconcept.com/home/Observability-with-Datadog.1383596033.html)に記載されています。

### 収集データ

### トレース

APM トレースは、リクエストがいつサービスによって受信され、処理されたかを示します。また、サービス層とインフラストラクチャーにまたがるアプリケーションの関係を描写することも可能です。z/IRIS によって作成されたトレースは、メインフレームでホストされたアプリケーションにこれらの洞察を提供します。業界標準をインテグレーションし、Datadog の強力な相関性と統合機能を使用することで、ユーザーはすべてのインターフェイスで一貫したエクスペリエンスを得ることができます。

z/IRIS トレースでは、以下のメインフレームシステムがサポートされています。リンク先のドキュメントでは、タグやトレース構造など、各トレース機能の詳細について説明しています。

* [分散型 Db2 for z/OS](https://public.mainstorconcept.com/home/Distributed-Db2-for-z%2FOS-Observability.1121746973.html)
* [z/OS Connect](https://public.mainstorconcept.com/home/z%2FOS-Connect-Observability.641040548.html)
* [バッチジョブと TSO ユーザーセッション](https://public.mainstorconcept.com/home/z%2FOS-Work-observability.1148813324.html)


### トレースタグ

|トレースタグ名                        | 説明                    |
|--------------------------------------|--------------------------------|
|zos.connect.api.name                  | z/OS Connect の API 名       | 
|zos.connect.api.version               | z/OS Connect の API バージョン    |
|zos.connect.request.id                | リクエスト ID                     |
|zos.connect.request.timed_out         | リクエストタイムアウト               | 
|zos.connect.request.user_name         | リクエストユーザー名              | 
|zos.connect.service.name              | サービス名                   | 
|zos.connect.service.version           | サービスバージョン                | 
|zos.connect.service_provider.name     | サービスプロバイダー名          | 
|zos.connect.sor.identifier            | SOR 識別子                 |  
|zos.connect.sor.reference             | SOR リファレンス                  |  
|zos.connect.sor.request.received_time | SOR リクエスト受信           |  
|zos.connect.sor.request.sent_time     | SOR リクエスト送信時刻          |  
|zos.connect.sor.resource              | SOR リソース                   |  
|zos.job.class                         | z/OS ジョブクラス                 |  
|ziris.job.identifier                  | z/OS ジョブ識別子            |  
|zos.jes.job.correlator                | JES ジョブコリレーター             |  
|zos.job.step.cpu.units                | z/OS ステップ CPU ユニット            |  
|zos.job.step.program_name             | z/OS ジョブステッププログラム名     |  
|zos.job.step.ended                    | z/OS ジョブステップ終了            |  
|zos.job.step.name                     | z/OS ジョブステップ名             |  
|zos.job.step.number                   | z/OS ジョブステップ番号           |  
|zos.job.step.cpu.time_ms              | z/OS ジョブステップ CPU 時間         |  
|zos.job.step.ziip.time_ms             | z/OS ジョブステップ ZIIP 時間        |  
|zos.tape.mounts                       | z/OS テープマウント               |  
|zos.job.step.return_code              | z/OS ジョブステップリターンコード      |  
|zos.racf.group.id                     | z/OS RACF グループ ID             |  
|zos.user.id                           | z/OS ユーザー ID                   |  
|zos.user.name                         | z/OS ユーザー名                 |  
|host.name                             | ホスト名                      |  
|http.method                           | HTTP メソッド                    |  
|http.response_content_length          | HTTP レスポンスコンテンツ長   |  
|http.request_content_length           | HTTP リクエストコンテンツ長    |  
|http.status_code                      | HTTP ステータスコード               |  
|http.client_ip                        | HTTP クライアント IP                 |  
|db.system                             | DB システム                      |  
|net.peer.ip                           | ネットピア IP                    |  
|net.peer.port                         | ネットピアポート                  |  
|enduser.id                            | エンドユーザー ID                    |  
|db.db2.collection.id                  | Db2 コレクション ID              |  
|db.db2.instance_name                  | Db2 インスタンス名              |  
|db.user                               | DB ユーザー                        |  
|zos.db2.wait.time_ms                  | Db2 待ち時間                  |  
|zos.db2.unlock.requests               | Db2 ロック解除要求             |  
|zos.db2.sql.storedprocedure.statements| Db2 SQL ストアドプロシージャ       |  
|zos.db2.start.timestamp               | Db2 開始タイムスタンプ            |  
|zos.db2.end.timestamp                 | Db2 終了タイムスタンプ              |  
|zos.db2.response.time_ms              | Db2 応答時間              |  
|zos.db2.elapsed.time_ms               | Db2 経過時間               |  
|zos.cpu.time_ms                       | CPU 時間                       |  
|zos.db2.abort.requests                | Db2 中止要求              |  
|zos.db2.su.factor                     | Db2 su 要因                  |  
|zos.db2.workload.service.class.name   | Db2 ワークロードのサービスクラス名|  
|zos.db2.cpu.time_ms                   | Db2 CPU 時間                   |  
|zos.ziip.time_ms                      | ZIIP 時間                      |  
|zos.db2.ziip.time_ms                  | Db2 ZIIP 時間                  |  
|zos.db2.remote.location.name          | Db2 リモートロケーション名       |  
|zos.db2.product.id                    | Db2 プロダクト ID                 |  
|zos.db2.sent.bytes                    | Db2 送信バイト数                 |  
|zos.db2.received.bytes                | Db2 受信バイト数             |  
|zos.db2.client.application.name       | Db2 クライアントアプリケーション名    |  
|zos.db2.client.platform               | Db2 クライアントプラットフォーム            |  
|zos.db2.client.auth.id                | Db2 クライアント認証 ID             |  
|zos.db2.sql.prepare.statements        | Db2 SQL 準備ステートメント      |  
|zos.db2.sql.open.statements           | Db2 SQL オープンステートメント         |  
|zos.db2.sql.lock.statements           | Db2 SQL ロックステートメント         |  
|zos.db2.connection.id                 | Db2 接続 ID              |  
|zos.db2.consistency.token             | Db2 整合性トークン          | 
|zos.correlation.id                    | Db2 相関 ID             |  
|zos.db2.plan.name                     | Db2 プラン名                  |  
|zos.db2.program.name                  | Db2 プログラム名               |  
|zos.db2.lock.state                    | Db2 ロック状態                 |  
|zos.db2.statement.id                  | Db2 ステートメント ID               |  
|zos.db2.statement.type                | Db2 ステートメントタイプ             |  
|zos.db2.thread.token                  | Db2 スレッドトークン               |  
|zos.uow                               | UOW                            |  
|zos.db2.lock.request                  | Db2 ロック要求               |  
|zos.db2.lock.duration                 | Db2 ロック時間              |  
|zos.db2.deadlock.resources            | Db2 デッドロックリソース         |  
|zos.db2.ace                           | Db2 ACE                        |  
|zos.db2.location.name                 | Db2 ロケーション名              |  
|zos.db2.luw.id                        | Db2 LUW ID                     |  
|zos.db2.uniqueness.value              | Db2 一意性値           |  
|zos.db2.version                       | Db2 バージョン                    |  
|zos.lu.name                           | LU 名                        |  
|zos.network.id                        | z/OS ネットワーク ID                |  
|zos.subsystem.name                    | z/OS サブシステム名            |  


### メインフレームメトリクス

* [RMF メトリクス](https://public.mainstorconcept.com/home/RMF-Metrics-Streaming.636715153.html) 
    * RMF メトリクスは、カスタマイズ可能な間隔で、カスタマイズ可能な詳細レベルで、リソース使用率メトリク スを提供します。

* [z/OS Connect メトリクス](https://public.mainstorconcept.com/home/z%2FOS-Connect-Metrics-Streaming.641040425.html)
    * z/IRIS ストリームは、IBM の z/OS Connect SMF タイプ 123 バージョン 1 および 2 のレコードのデータを使用して作成されたメトリクスです。

* [MQ メトリクス](https://public.mainstorconcept.com/home/MQ-Metrics-Streaming.1424359429.html)
    * MQ 統計レコード (SMF タイプ 115) には、システム内のさまざまなリソースからの多数の統計情報が含まれています。z/IRIS は、監視、分析、およびアラートを目的とした最も重要なパフォーマンス指標に焦点を当て、z/OS MQ メトリクスを導入します。

お探しのメトリクスはこれではありませんか？あなたの組織にとって重要な機能をお探しですか？機能のご要望は [info@mainstorconcept.com](mailto:info@mainstorconcept.com) までお送りください。

### 地域別パートナー

北米に拠点を置く企業は、当社のパートナーである SEA にお問い合わせください。
* メール: [SEA- Software Engineering of America](mailto:support@seasoft.com)
* 電話: (800) 272-7322 (音声フリーダイヤル)
* 電話: 516-328-7000

その他の地域はお問い合わせください。
* メール: [mainstorconcept GmbH](mailto:sales@mainstorconcept.com)
* 電話: +49 721 7907610

## サポート

z/IRIS に関するご質問は、[サポートリクエスト](https://service.mainstorconcept.com/mscportal/login)を開くか、[support@mainstorconcept.com](mailto:support@mainstorconcept.com) にご連絡ください。

デモをご希望の方は、[sales@mainstorconcept.com](mailto:sales@mainstorconcept.com) までご連絡ください。

北米地域のローカルサポートをお探しの場合は、パートナーである [SEA- Software Engineering of America](mailto:support@seasoft.com) にメールまたは電話 (800) 272-7322 でお問い合わせください。