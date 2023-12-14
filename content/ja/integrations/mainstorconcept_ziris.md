---
algolia:
  subcategory: Marketplace インテグレーション
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
    z/OS Infrastructure: assets/dashboards/z_OS_Infrastructure.json
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
- mainframe
- マーケットプレイス
- ネットワーク
- OS & システム
- トレーシング
dependencies: []
display_on_public_website: true
draft: true
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
  unit_price: 4000.0
public_title: z/IRIS
short_description: メインフレームから IBM z/OS のパフォーマンスデータを収集する
supported_os:
- ibm z/os
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Mainframe
  - Category::Marketplace
  - Category::Network
  - Category::OS & System
  - Category::Tracing
  - Offering::Integration
  - Supported OS::IBM z/OS
  - Supported OS::Linux
  configuration: README.md#Setup
  description: メインフレームから IBM z/OS のパフォーマンスデータを収集する
  media:
  - caption: z/IRIS - メインフレーム包括的な観測可能性
    image_url: images/thumbnail_mainstorconcept_ziris.PNG
    media_type: ビデオ
    vimeo_id: 630489680
  - caption: z/IRIS で作成したスパン付きサービスマップ
    image_url: images/datadog-service-map-with-spans-created-by-ziris.png
    media_type: image
  - caption: z/IRIS ダッシュボード
    image_url: images/datadog-ziris-dashboards.png
    media_type: image
  - caption: トレースエクスプローラーで z/OS アプリケーションのパフォーマンスを分析する
    image_url: images/datadog-trace-explorer-filtering-zos-application-performance-measurements.png
    media_type: image
  - caption: z/IRIS はフレームグラフとスパンリストを拡張します
    image_url: images/datadog-annotated-zosconnect-cics-db2-trace-page.png
    media_type: image
  - caption: z/IRIS は Datadog とインテグレーションします
    image_url: images/ziris-otel-integration-with-datadog.png
    media_type: image
  - caption: CICS サービスページ
    image_url: images/datadog-annotated-cics-service-page.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: z/IRIS
  uninstallation: README.md#Uninstallation
---



## 概要

バックエンドのメインフレームアプリケーションからのトレースとメトリクスを追加して、エンタープライズ観測可能性の実践を強化し、[z/IRIS][1] で以下の利点を使用します。

* クラウドやサーバーにホストされているサービスやアプリケーションと、メインフレームとの関係を可視化します。
* メインフレームアプリケーションがエンドユーザーエクスペリエンスにどのように貢献しているかを検出します。
* [Datadog Watchdog][23] を活用して、デジタルビジネスサービスに影響を与える z/OS アプリケーションの異常を自動的に検出することにより、平均復元時間 (MTTR) を短縮します。
* 共有可能なダッシュボードとインターフェイスを使用して、クロスプラットフォームのインシデント分析を支援することにより、アプリケーションチームとメインフレームプラットフォーム管理者間のコミュニケーションを大幅に改善します。


z/IRIS は、IBM System Z メインフレーム上で動作するトランザクションやアプリケーションからのテレメトリー (トレースやメトリクス) を Datadog に送信します。

有効にすると、

 * Datadog [Service Map][24] には、CICS、MQ、Db2 などの z/OS サービスとのインテグレーションが表示されます。
 * コールレート、エラーレート、レイテンシーは、メインフレームのサービスで有効なパフォーマンス指標です。
 * フレームグラフとスパンリストが、メインフレームアプリケーションへのリクエストの流れを可視化します。
 * トレースページには、関連するエラーメッセージ z/OS システムを含みます。


z/IRIS テレメトリーは、メインフレームの内部オペレーションへの可視性を拡張することで、開発者と運用者の体験を向上させます。Datadog ユーザーは、以下のことができるようになります。

* z/IRIS ダッシュボードを有効にし、z/OS システムとアプリケーションの健全性を監視します。
* メインフレームアプリケーションの SLO 違反についてチームにアラートを出すためのモニターを作成します。
* メインフレームアプリケーションが総レスポンスタイムと全体的な可用性にどのように寄与しているかを分析します。
* メインフレーム内外の変化により、アプリケーションの動作や安定性がどのように変化するかを検証します。
* エンドユーザーエクスペリエンスに影響を与えるメインフレームアプリケーションから報告されるエラーメッセージにアクセスします。

### インテグレーション方法

z/IRIS は、2 つの方法で Datadog とインテグレーションします。

* **OpenTelemetry (OTEL):** この観測可能性フレームワークは、APM インテグレーションを標準化し、Datadog によって完全にサポートされています。z/IRIS は、Datadog 環境にテレメトリーをエクスポートするように構成された OpenTelemetry Collector にトレースとメトリクスをストリームします。
* **Datadog APIs (ベータ版):** z/IRIS は、Datadog Agent API を使用したトレース、および DatadogのHTTP REST API を使用したイベントのストリーミングが可能です。このインテグレーションは、z/IRIS を評価する際の管理工数を削減するためのトライアルや概念実証 (POC) プロジェクトでのみ利用でき、本番ユースケースには最適ではありません。

z/IRIS のインテグレーション可能性についての詳細な情報は、[z/IRIS ドキュメント][3]を参照してください。

### 分散型トレーシング

スパンは、作業単位またはプロセスを表します。スパンは、分散型トレーシングの構成要素で、リクエストがいつトリガーされたか、リクエストがアプリケーションやサービスをどのように流れたかを描写するものです。

z/IRIS は、IBM Z メインフレームアプリケーションのプロセスやトランザクションを表すスパンによって、Datadog のトレースを拡張します。トレースを拡張することで、メインフレーム上のサービスがクラウドやサーバーのアプリケーションによってどのように消費されるかについて、ユーザーは新たな洞察を得ることができます。メインフレームベースのアプリケーションのエラーレート、コールレート、リクエストレイテンシーなどのパフォーマンス指標が有効になるため、メインフレームインテグレーションの健全性を特定することができます。

#### スパン

z/IRIS は、以下のメインフレームシステムで処理されるトランザクションおよびオペレーションに対してスパンを作成します。

* [Db2 for z/OS][4]
* [z/OS Connect][5]
* [IBM MQ for z/OS][7]
* [CICS Transaction Server (CICS TS)][8]
* [一括ジョブ][6]
* [TSO ユーザーアクティビティ][6]

このリストは常に増加しています。上記に掲載されていない z/OS アプリケーションやサブシステムのサポートに関するリクエストは、[ziris@mainstorconcept.com][2] までご連絡ください。

#### ワークフローのトレース

z/IRIS は、メインフレーム上のオペレーションが外部のアプリケーションリクエストによってトリガーされたことを特定し、生成されたスパンがアプリケーションリクエストのトレースに追加されるようにします。例えば、クラウドアプリケーションがメインフレームアプリケーションにリクエストを送信して処理する場合、z/IRIS はメインフレームアプリケーションの処理が外部リクエストに関連していることを検出し、メインフレームアプリケーションからのスパンがクラウドアプリケーションリクエストのトレースに追加されるようにします。

z/IRIS Workflow トレースでは、以下のリクエストワークフローが追跡されます。

* REST API リクエスト -> z/OS Connect EE -> SOR (CICS TS、Db2 for z/OS、IMS または IBM MQ) -> Db2 for z/OS 
* JDBC -> Db2 for z/OS
* IBM MQ (Linux、Windows、AIX) -> IBM MQ for z/OS -> CICS TS -> Db2 for z/OS 
* CICS TS -> Db2 for z/OS


#### タグ

リクエスト、リソース使用率、関連する z/OS システムに関するメタデータは、[トレースエクスプローラー][9]でクエリを行うために使用できるタグを通して提供され、この情報は [Watchdog Insights][10] で処理され、メインフレームサービスで検出された異常をユーザーに警告します。

以下は、z/IRIS で作成されたすべてのタグの完全なリストです。

| トレースタグ名                                    | 説明                                   |
|---------------------------------------------------|-----------------------------------------------|
| db.db2.collection.id                              | Db2 コレクション ID                             |
| db.db2.instance_name                              | Db2 インスタンス名                             |
| db.system                                         | DB システム                                     |
| db.user                                           | DB ユーザー                                       |
| enduser.id                                        | エンドユーザー ID                                   |
| host.arch                                         | ホストアーキテクチャ                             |
| host.name                                         | ホスト名                                     |
| http.client_ip                                    | HTTP クライアント IP                                |
| http.method                                       | HTTP メソッド                                   |
| http.request_content_length                       | HTTP リクエストコンテンツ長                   |
| http.response_content_length                      | HTTP レスポンスコンテンツ長                  |
| http.status_code                                  | HTTP ステータスコード                              |
| ibm-mq.manager                                    | IBM MQ マネージャー                                |
| ibm.machine.logical_partition                     | IBM マシンの論理パーティション                 |
| ibm.machine.model                                 | IBM マシンモデル                             |
| ibm.machine.type                                  | IBM マシンタイプ                              |
| messaging.conversation_id                         | メッセージング会話 ID                     |
| messaging.destination                             | メッセージング宛先                         |
| messaging.destination_kind                        | メッセージング宛先の種類                    |
| messaging.system                                  | メッセージングシステム                              |
| net.peer.ip                                       | ネットピア IP                                   |
| net.peer.port                                     | ネットピアポート                                 |
| net.sock.peer.addr                                | ネットソックピアアドレス                            |
| net.sock.peer.cipher                              | ネットソックピアサイファー                          |
| net.sock.peer.port                                | ネットソックピアポート                            |
| os.type                                           | OS タイプ                                       |
| ziris.job.identifier                              | z/OS ジョブ識別子                           |
| zos.cf.calls                                      | CF コール                                      |
| zos.cf.elapsed.time_ms                            | CF 経過時間                               |
| zos.cics.application.name                         | CICS アプリケーション名                         |
| zos.cics.application.operation                    | CICS アプリケーションの操作                    |
| zos.cics.application.platform_name                | CICS アプリケーションプラットフォーム名                |
| zos.cics.application.version                      | CICS アプリケーションのバージョン                      |
| zos.cics.atom_service_name                        | CICS ATOM サービス名                        |
| zos.cics.bts.activity.id                          | CICS BTS アクティビティ ID                          |
| zos.cics.bts.activity.name                        | CICS BTS アクティビティ名                        |
| zos.cics.bts.process.id                           | CICS BTS プロセス ID                           |
| zos.cics.bts.process.name                         | CICS BTS プロセス名                         |
| zos.cics.bts.process.type                         | CICS BTS プロセスタイプ                         |
| zos.cics.connection.access_type                   | CICS 接続アクセスタイプ                   |
| zos.cics.connection.name                          | CICS 接続名                          |
| zos.cics.connection.type                          | CICS 接続タイプ                          |
| zos.cics.ipconn_name                              | CICS ipconn 名                              |
| zos.cics.net.peer.name                            | CICS ネットピア名                            |
| zos.cics.nodejs_application_name                  | CICS nodejs アプリケーション名                  |
| zos.cics.pipeline_name                            | CICS パイプライン名                            |
| zos.cics.region_name                              | CICS リージョン名                              |
| zos.cics.session.id                               | CICS セッション ID                               |
| zos.cics.session.type                             | CICS セッションタイプ                             |
| zos.cics.tcpipservice.name                        | CICS TCP/IP サービス名                      |
| zos.cics.tcpipservice.origin.client.ip            | CICS TCP/IP サービスのオリジンクライアント ip          |
| zos.cics.tcpipservice.origin.client.port          | CICS TCP/IP サービスのオリジンクライアントポート        |
| zos.cics.tcpipservice.origin.name                 | CICS TCP/IP サービスのオリジン名               |
| zos.cics.tcpipservice.origin.port                 | CICS TCP/IP サービスのオリジンポート               |
| zos.cics.tcpipservice.port                        | CICS TCP/IP サービスポート                      |
| zos.cics.transaction.api.requests                 | CICS トランザクション API リクエスト                 |
| zos.cics.transaction.auth.time_ms                 | CICS トランザクション認証時間                    |
| zos.cics.transaction.class                        | CICS トランザクションクラス                        |
| zos.cics.transaction.cpu.time_ms                  | CICS トランザクション CPU 時間                     |
| zos.cics.transaction.exception.wait.time_ms       | CICS トランザクション例外待ち時間          |
| zos.cics.transaction.gpu.time_ms                  | CICS トランザクション GPU 時間                     |
| zos.cics.transaction.group_id                     | CICS トランザクショングループ ID                     |
| zos.cics.transaction.id                           | CICS トランザクション ID                           |
| zos.cics.transaction.jvm.elapsed.time_ms          | CICS トランザクション JVM 経過時間             |
| zos.cics.transaction.jvm.init.time_ms             | CICS トランザクション JVM 開始時間                |
| zos.cics.transaction.jvm.wait.time_ms             | CICS トランザクション JVM 待ち時間                |
| zos.cics.transaction.number                       | CICS トランザクション番号                       |
| zos.cics.transaction.origin.adapter.data1         | CICS トランザクションオリジンアダプターデータ 1         |
| zos.cics.transaction.origin.adapter.data2         | CICS トランザクションオリジンアダプターデータ 2         |
| zos.cics.transaction.origin.adapter.data3         | CICS トランザクションオリジンアダプターデータ 3         |
| zos.cics.transaction.origin.adapter.product       | CICS トランザクションオリジンアダプター製品       |
| zos.cics.transaction.origin.application.id        | CICS トランザクションオリジンアプリケーション ID        |
| zos.cics.transaction.origin.id                    | CICS トランザクションオリジン ID                    |
| zos.cics.transaction.origin.network.id            | CICS トランザクションオリジンネットワーク ID            |
| zos.cics.transaction.origin.number                | CICS トランザクションオリジン番号                |
| zos.cics.transaction.origin.user_id               | CICS トランザクションオリジンユーザー ID               |
| zos.cics.transaction.priority                     | CICS トランザクションの優先順位                     |
| zos.cics.transaction.program.name                 | CICS トランザクションプログラム名                 |
| zos.cics.transaction.program.return_code_current  | CICS トランザクションプログラムの現在のリターンコード  |
| zos.cics.transaction.program.return_code_original | CICS トランザクションプログラムの元のリターンコード |
| zos.cics.transaction.remote.task.requests         | CICS トランザクションリモートタスクリクエスト         |
| zos.cics.transaction.rmi.elapsed.time_ms          | CICS トランザクション RMI 経過時間             |
| zos.cics.transaction.rmi.wait.time_ms             | CICS トランザクション RMI 待ち時間                |
| zos.cics.transaction.routed.host.name             | CICS トランザクションのルーティングホスト名             |
| zos.cics.transaction.start_type                   | CICS トランザクション開始タイプ                   |
| zos.cics.transaction.tcb.attachments              | CICS トランザクション  TCB アタッチメント              |
| zos.cics.transaction.tcb.cpu.time_ms              | CICS トランザクション TCB CPU 時間                 |
| zos.cics.transaction.tcb.elapsed.time_ms          | CICS トランザクション TCB 経過時間             |
| zos.cics.transaction.tcb.wait.time_ms             | CICS トランザクション TCB 待ち時間                |
| zos.cics.transaction.user_id                      | CICS トランザクションユーザー ID                      |
| zos.cics.transaction.wait.time_ms                 | CICS トランザクションの待ち時間                    |
| zos.cics.transaction.ziip.time_ms                 | CICS トランザクション ZIIP 時間                    |
| zos.cics.urimap.name                              | CICS urimap 名                              |
| zos.cics.urimap.program_name                      | CICS urimap プログラム名                      |
| zos.cics.webservice.name                          | CICS Web サービス名                         |
| zos.cics.webservice.operation_name                | CICS Web サービス操作名               |
| zos.connect.api.name                              | z/OS Connect の API 名                      |
| zos.connect.api.version                           | z/OS Connect の API バージョン                   |
| zos.connect.request.id                            | リクエスト ID                                    |
| zos.connect.request.timed_out                     | リクエストタイムアウト                              |
| zos.connect.request.user_name                     | リクエストユーザー名                             |
| zos.connect.service.name                          | サービス名                                  |
| zos.connect.service.version                       | サービスバージョン                               |
| zos.connect.service_provider.name                 | サービスプロバイダー名                         |
| zos.connect.sor.identifier                        | SOR 識別子                                |
| zos.connect.sor.reference                         | SOR リファレンス                                 |
| zos.connect.sor.request.received_time             | SOR リクエスト受信                          |
| zos.connect.sor.request.sent_time                 | SOR リクエスト送信時刻                         |
| zos.connect.sor.resource                          | SOR リソース                                  |
| zos.correlation.id                                | z/OS 相関 ID                           |
| zos.cpu.time_ms                                   | z/OS CPU 時間                                 |
| zos.db2.abort.requests                            | Db2 中止要求                             |
| zos.db2.ace                                       | Db2 ACE                                       |
| zos.db2.client.application.name                   | Db2 クライアントアプリケーション名                   |
| zos.db2.client.auth.id                            | Db2 クライアント認証 ID                            |
| zos.db2.client.platform                           | Db2 クライアントプラットフォーム                           |
| zos.db2.connection.id                             | Db2 接続 ID                             |
| zos.db2.consistency.token                         | Db2 整合性トークン                         |
| zos.db2.cpu.time_ms                               | Db2 CPU 時間                                  |
| zos.db2.deadlock.resources                        | Db2 デッドロックリソース                        |
| zos.db2.elapsed.time_ms                           | Db2 経過時間                              |
| zos.db2.end.timestamp                             | Db2 終了タイムスタンプ                             |
| zos.db2.location.name                             | Db2 ロケーション名                             |
| zos.db2.lock.duration                             | Db2 ロック時間                             |
| zos.db2.lock.request                              | Db2 ロック要求                              |
| zos.db2.lock.state                                | Db2 ロック状態                                |
| zos.db2.luw.id                                    | Db2 LUW ID                                    |
| zos.db2.plan.name                                 | Db2 プラン名                                 |
| zos.db2.product.id                                | Db2 プロダクト ID                                |
| zos.db2.program.name                              | Db2 プログラム名                              |
| zos.db2.received.bytes                            | Db2 受信バイト数                            |
| zos.db2.remote.location.name                      | Db2 リモートロケーション名                      |
| zos.db2.response.time_ms                          | Db2 応答時間                             |
| zos.db2.sent.bytes                                | Db2 送信バイト数                                |
| zos.db2.sql.lock.statements                       | Db2 SQL ロックステートメント                        |
| zos.db2.sql.open.statements                       | Db2 SQL オープンステートメント                        |
| zos.db2.sql.prepare.statements                    | Db2 SQL 準備ステートメント                     |
| zos.db2.sql.storedprocedure.statements            | Db2 SQL ストアドプロシージャ                      |
| zos.db2.start.timestamp                           | Db2 開始タイムスタンプ                           |
| zos.db2.statement.id                              | Db2 ステートメント ID                              |
| zos.db2.statement.type                            | Db2 ステートメントタイプ                            |
| zos.db2.su.factor                                 | Db2 su 要因                                 |
| zos.db2.thread.token                              | Db2 スレッドトークン                              |
| zos.db2.uniqueness.value                          | Db2 一意性値                          |
| zos.db2.unlock.requests                           | Db2 ロック解除要求                            |
| zos.db2.version                                   | Db2 バージョン                                   |
| zos.db2.wait.time_ms                              | Db2 待ち時間                                 |
| zos.db2.workload.service.class.name               | Db2 ワークロードのサービスクラス名               |
| zos.db2.ziip.time_ms                              | Db2 ZIIP 時間                                 |
| zos.jes.job.correlator                            | JES ジョブコリレーター                            |
| zos.job.class                                     | z/OS ジョブクラス                                |
| zos.job.step.cpu.time_ms                          | z/OS ジョブステップ CPU 時間                        |
| zos.job.step.cpu.units                            | z/OS ステップ CPU ユニット                           |
| zos.job.step.ended                                | z/OS ジョブステップ終了                           |
| zos.job.step.name                                 | z/OS ジョブステップ名                            |
| zos.job.step.number                               | z/OS ジョブステップ番号                          |
| zos.job.step.program_name                         | z/OS ジョブステッププログラム名                    |
| zos.job.step.return_code                          | z/OS ジョブステップリターンコード                     |
| zos.job.step.ziip.time_ms                         | z/OS ジョブステップ ZIIP 時間                       |
| zos.lu.name                                       | z/OS LU 名                                  |
| zos.mq.accounting_token                           | MQ アカウンティングトークン                           |
| zos.mq.buffer_pool                                | MQ バッファプール                                |
| zos.mq.calls                                      | MQ コール                                      |
| zos.mq.cf_structure                               | MQ CF 構造                               |
| zos.mq.channel.connection_name                    | MQ チャンネル接続名                    |
| zos.mq.channel.name                               | MQ チャンネル名                               |
| zos.mq.connection.auth_id                         | MQ 接続認証 ID                         |
| zos.mq.connection.name                            | MQ 接続名                            |
| zos.mq.connection.type                            | MQ 接続タイプ                            |
| zos.mq.connection.user_id                         | MQ 接続ユーザー ID                         |
| zos.mq.context_token                              | MQ コンテキストトークン                              |
| zos.mq.correlation_id                             | MQ 相関 ID                             |
| zos.mq.luw_id                                     | MQ LUW ID                                     |
| zos.mq.messages                                   | MQ メッセージ                                   |
| zos.mq.mqcb.calls                                 | MQ MQCb コール                                 |
| zos.mq.mqcb.cpu.time_ms                           | MQ MQCb CPU 時間                              |
| zos.mq.mqcb.elapsed.time_ms                       | MQ MQCb 経過時間                          |
| zos.mq.mqclose.calls                              | MQ MQClose コール                              |
| zos.mq.mqclose.cpu.time_ms                        | MQ MQClose CPU 時間                           |
| zos.mq.mqclose.elapsed.time_ms                    | MQ MQClose 経過時間                       |
| zos.mq.mqclose.suspended.calls                    | MQ MQClose サスペンドコール                    |
| zos.mq.mqclose.wait.time_ms                       | MQ MQClose の待ち時間                          |
| zos.mq.mqget.browse.specific.calls                | MQ MQGet ブラウズ特定コール                |
| zos.mq.mqget.browse.unspecific.calls              | MQ MQGet ブラウズ不特定コール              |
| zos.mq.mqget.calls                                | MQ MQGet コール                                |
| zos.mq.mqget.cpu.time_ms                          | MQ MQGet CPU 時間                             |
| zos.mq.mqget.destructive.specific.calls           | MQ MQGet 破壊的特定コール           |
| zos.mq.mqget.destructive.unspecific.calls         | MQ MQGet 破壊的不特定コール         |
| zos.mq.mqget.elapsed.time_ms                      | MQ MQGet 経過時間                         |
| zos.mq.mqget.errors                               | MQ MQGet エラー                               |
| zos.mq.mqget.expired.messages                     | MQ MQGet 期限切れメッセージ                     |
| zos.mq.mqget.log.forced.wait.time_ms              | MQ MQGet ログ強制待ち時間                 |
| zos.mq.mqget.log.forced.writes                    | MQ MQGet ログ強制書き込み                    |
| zos.mq.mqget.log.wait.time_ms                     | MQ MQGet ログ待ち時間                        |
| zos.mq.mqget.log.writes                           | MQ MQGet ログ書き込み                           |
| zos.mq.mqget.message.max.size_bytes               | MQ MQGet メッセージの最大サイズ                     |
| zos.mq.mqget.messages.min.size_bytes              | MQ MQGet メッセージの最小サイズ                     |
| zos.mq.mqget.pageset.reads                        | MQ MQGet ページセット読み込み                        |
| zos.mq.mqget.pageset.wait.time_ms                 | MQ MQGet ページセット待ち時間                    |
| zos.mq.mqget.persistent.messages                  | MQ MQGet 永続的メッセージ                  |
| zos.mq.mqget.skipped.messages                     | MQ MQGet スキップメッセージ                     |
| zos.mq.mqget.skipped.pages                        | MQ MQGet スキップページ                        |
| zos.mq.mqget.successful_calls                     | MQ MQGet 成功コール                     |
| zos.mq.mqget.suspended.calls                      | MQ MQGet サスペンドコール                      |
| zos.mq.mqget.wait.time_ms                         | MQ MQGet の待ち時間                            |
| zos.mq.mqinq.calls                                | MQ MQInq コール                                |
| zos.mq.mqinq.cpu.time_ms                          | MQ MQInq CPU 時間                             |
| zos.mq.mqinq.elapsed.time_ms                      | MQ MQInq 経過時間                         |
| zos.mq.mqopen.calls                               | MQ MQOpen コール                               |
| zos.mq.mqopen.cpu.time_ms                         | MQ MQOpen CPU 時間                            |
| zos.mq.mqopen.elapsed.time_ms                     | MQ MQOpen 経過時間                        |
| zos.mq.mqopen.suspended.calls                     | MQ MQOpen サスペンドコール                     |
| zos.mq.mqopen.wait.time_ms                        | MQ MQOpen の待ち時間                           |
| zos.mq.mqput.calls                                | MQ MQPut コール                                |
| zos.mq.mqput.cpu.time_ms                          | MQ MQPut CPU 時間                             |
| zos.mq.mqput.elapsed.time_ms                      | MQ MQPut 経過時間                         |
| zos.mq.mqput.log.forced.wait.time_ms              | MQ MQPut ログ強制待ち時間                 |
| zos.mq.mqput.log.forced.writes                    | MQ MQPut ログ強制書き込み                    |
| zos.mq.mqput.log.wait.time_ms                     | MQ MQPut ログ待ち時間                        |
| zos.mq.mqput.log.writes                           | MQ MQPut ログ書き込み                           |
| zos.mq.mqput.message.max.size_bytes               | MQ MQPut メッセージの最大サイズ                     |
| zos.mq.mqput.message.min.size_bytes               | MQ MQPut メッセージの最小サイズ                     |
| zos.mq.mqput.pageset.elapsed.time_ms              | MQ MQPut ページセット経過時間                 |
| zos.mq.mqput.pageset.writes                       | MQ MQPut ページセット書き込み                       |
| zos.mq.mqput.suspended.calls                      | MQ MQPut サスペンドコール                      |
| zos.mq.mqput.wait.time_ms                         | MQ MQPut の待ち時間                            |
| zos.mq.mqput1.calls                               | MQ MQPut1 コール                               |
| zos.mq.mqput1.cpu.time_ms                         | MQ MQPut1 CPU 時間                            |
| zos.mq.mqput1.elapsed.time_ms                     | MQ MQPut1 経過時間                        |
| zos.mq.mqput1.log.forced.wait.time_ms             | MQ MQPut1 ログ強制待ち時間                |
| zos.mq.mqput1.log.forced.writes                   | MQ MQPut1 ログ強制書き込み                   |
| zos.mq.mqput1.log.wait.time_ms                    | MQ MQPut1 ログ待ち時間                       |
| zos.mq.mqput1.log.writes                          | MQ MQPut1 ログ書き込み                          |
| zos.mq.mqput1.pageset.wait.time_ms                | MQ MQPut1 ページセット待ち時間                   |
| zos.mq.mqput1.pageset.writes                      | MQ MQPut1 ページセット書き込み                      |
| zos.mq.mqput1.suspended.calls                     | MQ MQPut1 サスペンドコール                     |
| zos.mq.mqput1.wait.time_ms                        | MQ MQPut1 待ち時間                           |
| zos.mq.mqset.calls                                | MQ MQSet コール                                |
| zos.mq.mqset.cpu.time_ms                          | MQ MQSet CPU 時間                             |
| zos.mq.mqset.elapsed.time_ms                      | MQ MQSet 経過時間                         |
| zos.mq.mqset.log.forced.wait.time_ms              | MQ MQSet ログ強制待ち時間                 |
| zos.mq.mqset.log.forced.writes                    | MQ MQSet ログ強制書き込み                    |
| zos.mq.mqset.log.wait.time_ms                     | MQ MQSet ログ待ち時間                        |
| zos.mq.mqset.log.writes                           | MQ MQSet ログ書き込み                           |
| zos.mq.mqsub.selection.calls                      | MQ MQSub 選択コール                      |
| zos.mq.pageset                                    | MQ ページセット                                    |
| zos.mq.put.delayed_messages                       | MQ Put 遅延メッセージ                       |
| zos.mq.put.errors                                 | MQ Put エラー                                 |
| zos.mq.put.successful_calls                       | MQ Put 成功コール                       |
| zos.mq.qsg_type                                   | MQ QSG タイプ                                   |
| zos.mq.queue.index_type                           | MQ キューインデックスタイプ                           |
| zos.mq.queue.max_depth                            | MQ キュー最大深度                            |
| zos.mq.topic.mqclose.srb.cpu.time_ms              | MQ トピック MQClose SRB CPU 時間                 |
| zos.mq.topic.mqopen.srb.cpu.time_ms               | MQ トピック MQOpen SRB CPU 時間                  |
| zos.mq.topic.mqput.srb.cpu.time_ms                | MQ トピック MQPut SRB CPU 時間                   |
| zos.mq.topic.mqput1.srb.cpu.time_ms               | MQ トピック MQPut1 SRB CPU 時間                  |
| zos.mq.topic.published_messages                   | MQ トピック公開メッセージ                   |
| zos.network.id                                    | z/OS ネットワーク ID                               |
| zos.racf.group.id                                 | z/OS RACF グループ ID                            |
| zos.subsystem.name                                | z/OS サブシステム名                           |
| zos.tape.mounts                                   | z/OS テープマウント                              |
| zos.uow                                           | z/OS UOW                                      |
| zos.user.id                                       | z/OS ユーザー ID                                  |
| zos.user.name                                     | z/OS ユーザー名                                |
| zos.vtam.application.id                           | VTAM アプリケーション ID                           |
| zos.wlm.report.class.name                         | WLM レポートクラス名                         |
| zos.wlm.service.class.name                        | WLM サービスクラス名                        |
| zos.ziip.time_ms                                  | z/OS ZIIP 時間                                |


### メインフレームメトリクス

* [インフラストラクチャーメトリクス][11] 
    * z/OS システムのリソース利用を監視します。インフラストラクチャーメトリクスは、CPU (一般的なプロセッサーや zIIP エンジンなど) の使用率と競合をサポートします。

* [z/OS Connect メトリクス][12]
    * 着信リクエスト、リターンコード、リクエストメソッド、サーバーレイテンシー、サービスプロバイダー (SOR など) のレイテンシーなど、z/OS Connect サーバーのアクティビティとパフォーマンスを監視します。

* [MQ メトリクス][13]
    * z/OS 上の MQ キューマネージャーのアクティビティと、そのリソース (ストレージ、バッファプール、ログ、チャネルなど) の健全性を監視します。

お探しのメトリクスはこれではありませんか？あなたの組織にとって重要な機能をお探しですか？機能のご要望は [ziris@mainstorconcept.com][2] までお送りください。

### 民間企業による製品提供

* メール: [mainstorconcept GmbH][2]
* 電話: +49 721 7907610

### ライセンシング

試用期間開始後、24 時間以内に z/IRIS の試用ライセンスをメールにて提供します。

### 検証

関連するコンポーネントが利用可能であり、[最小要件][14]を満たしていることを確認します。

## サポート

サポートまたは機能リクエストをご希望の場合は、以下のチャンネルから z/IRIS にお問い合わせください。

- メールでのお問い合わせ: [support@mainstorconcept.com][20] または Datadog を使用した z/IRIS の機能に関するデモやご質問は [ziris@mainstorconcept.com](mailto:ziris@mainstorconcept.com)
- サポート: [Mainstorconcept Portal][21]

### その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog Marketplace で mainstorconcept の製品でメインフレームのパフォーマンスを監視する][22]

[1]: https://www.mainstorconcept.com/z-iris-mainframe-observability/z-iris-datadog/?lang=en
[2]: mailto:ziris@mainstorconcept.com
[3]: https://public.mainstorconcept.com/home/observability-with-datadog
[4]: https://public.mainstorconcept.com/home/distributed-db2-for-z-os-observability
[5]: https://public.mainstorconcept.com/home/z-os-connect-observability
[6]: https://public.mainstorconcept.com/home/z-os-work-observability
[7]: https://public.mainstorconcept.com/home/ibm-mq-for-z-os-observability
[8]: https://public.mainstorconcept.com/home/cics-transaction-observability
[9]: https://docs.datadoghq.com/ja/tracing/trace_explorer/
[10]: https://docs.datadoghq.com/ja/watchdog/
[11]: https://public.mainstorconcept.com/home/rmf-metrics-streaming
[12]: https://public.mainstorconcept.com/home/z-os-connect-metrics-streaming
[13]: https://public.mainstorconcept.com/home/mq-metrics-streaming
[14]: https://public.mainstorconcept.com/home/troubleshooting-opentelemetry-integration
[15]: https://public.mainstorconcept.com/home/irontap-image
[16]: https://public.mainstorconcept.com/home/configure-irontap-container 
[17]: https://public.mainstorconcept.com/home/install-z-iris-clients
[18]: https://public.mainstorconcept.com/home/configure-z-iris-clients
[19]: https://public.mainstorconcept.com/home/z-iris-client-started-task
[20]: mailto:support@mainstorconcept.com
[21]: https://service.mainstorconcept.com/mscportal/login
[22]: https://www.datadoghq.com/blog/mainframe-monitoring-mainstorconcept-datadog-marketplace/
[23]: https://docs.datadoghq.com/ja/watchdog/
[24]: https://docs.datadoghq.com/ja/tracing/services/services_map/

---
このアプリケーションは Marketplace から入手でき、Datadog テクノロジーパートナーによってサポートされています。このアプリケーションを購入するには、<a href="https://app.datadoghq.com/marketplace/app/mainstorconcept-ziris" target="_blank">こちらをクリック</a>してください。