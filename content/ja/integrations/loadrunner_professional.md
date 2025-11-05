---
app_id: loadrunner-professional
app_uuid: e6b5ab52-139d-4dde-a4ad-94fedeac7f29
assets:
  dashboards:
    loadrunner_professional_overview: assets/dashboards/loadrunner_professional_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - loadrunner.vusers.running
      - loadrunner.vusers.ready
      - loadrunner.vusers.finished
      - loadrunner.vusers.error
      - loadrunner.total.transactions.passed.per.sec
      - loadrunner.transaction.response_time
      - loadrunner.transaction.passed
      - loadrunner.transaction.failed
      - loadrunner.transaction.stopped
      metadata_path: metadata.csv
      prefix: loadrunner.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8492858
    source_type_name: LoadRunner Professional
  logs:
    source: loadrunner
author:
  homepage: https://www.microfocus.com/en-us/products/loadrunner-professional/overview
  name: OpenText
  sales_email: dmcleish@opentext.com
  support_email: MFI-Supportline@opentext.com
categories:
- テスト
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/loadrunner_professional/README.md
display_on_public_website: true
draft: false
git_integration_title: loadrunner_professional
integration_id: loadrunner-professional
integration_title: LoadRunner Professional
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: loadrunner_professional
public_title: LoadRunner Professional
short_description: LoadRunner Professional のメトリクスおよびシナリオ実行に関する情報を Datadog に送信します
supported_os:
- windows
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Supported OS::Linux
  - Category::Testing
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: LoadRunner Professional のメトリクスおよびシナリオ実行に関する情報を Datadog に送信します
  media:
  - caption: コントローラデザインタブ
    image_url: images/controller_design.png
    media_type: image
  - caption: コントローラ実行タブ
    image_url: images/controller_run.png
    media_type: image
  - caption: 解析サマリレポート
    image_url: images/analysis_summary.png
    media_type: image
  - caption: Vugen 新規スクリプト
    image_url: images/vugen_new.png
    media_type: image
  - caption: Datadog 設定ウィンドウ
    image_url: images/datadog_configuration_window.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: LoadRunner Professional
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

OpenText LoadRunner Professional は、多様なアプリケーションのパフォーマンスをテストし、稼働前に問題を特定・解決できるロードテストソリューションです。

LoadRunner Controller は、LoadRunner Professional のシナリオを作成および制御するためのツールです。シナリオでは、各テストセッション中に発生するイベントを定義します。エミュレートするユーザー (仮想ユーザー、Vuser) の数、実行するアクション、およびエミュレーションを実行するマシンを制御します。シナリオを使用して、サーバーの信頼性と強度をチェックするためのロードテストを作成します。

このインテグレーションを使用すると、Controller はシナリオ実行から得られるリアルタイムのメトリクスとデータを Datadog にプッシュします。

|   |   |
|---|---|
|__シナリオ情報を送信__| シナリオ実行に関する情報 (開始・終了時間、実行時間、含まれているスクリプトなど) をログとして送信します。
|__実行メトリクスを送信__| Vuser のステータスやトランザクションの応答時間など、シナリオ実行から得られるメトリクスを送信します。 |

## セットアップ

LoadRunner Controller を設定して Datadog にデータをプッシュします。シナリオ情報、実行メトリクス、またはその両方を送信するかを選択できます。設定が完了すると、このインテグレーションでは事前構成されたウィジェットでデータを表示できる Datadog ダッシュボードが利用できます。

1.  Controller を開きます。
2.  Controller のツールバーで、__Tools > Datadog Configuration__ を選択します。
3.  __Site__ フィールドで、[Datadog サイト][1]を選択します。
4.  __API key__ フィールドに、Datadog で生成された [API キー][2]を入力します。
5.  __Test Connection__ をクリックします。
6.  接続に成功したら、シナリオ情報、実行メトリクス、またはその両方を Datadog に送信するかを選択します。
7.  Controller でシナリオ情報を送信するように有効化した場合、このインテグレーションに含まれるログパイプラインがログを自動処理し、関連するタグを追加します。パイプラインの詳細については、Datadog の Logs > Pipelines に移動してください。
8.  Datadog では、このインテグレーションとともに __LoadRunner Professional Dashboard__ が自動的にインストールされます。ダッシュボードには、(Controller が送信するように設定したデータに応じて) 実行メトリクスやシナリオ情報を表示するウィジェットが含まれます。

Controller を Datadog にデータをプッシュするように設定すると、Controller でシナリオを実行するたびにデータがプッシュされます。Controller から Datadog へのデータ プッシュを無効化するには、__Tools > Datadog Configuration__ を選択し、Datadog Configuration ダイアログボックスのフィールドをクリアします。

![Datadog 設定ウィンドウ][3]

## 収集データ

### メトリクス
{{< get-metrics-from-git "loadrunner-professional" >}}


### サービスチェック

LoadRunner Professional にはサービスチェックは含まれていません。

### イベント

LoadRunner Professional にはイベントは含まれていません。

## トラブルシューティング

ヘルプが必要ですか？ [LoadRunner Professional のドキュメント][5]を参照するか、[Datadog サポート][6]にお問い合わせください。


[1]: https://docs.datadoghq.com/ja/getting_started/site/
[2]: https://docs.datadoghq.com/ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/loadrunner_professional/images/datadog_configuration_window.png
[4]: https://github.com/DataDog/integrations-extras/blob/master/loadrunner_professional/metadata.csv
[5]: https://admhelp.microfocus.com/lr
[6]: https://docs.datadoghq.com/ja/help/