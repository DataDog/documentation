---
app_id: rundeck
app_uuid: beb808d2-cc12-4bc5-8ff7-b63552b35e0a
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: rundeck.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10099
    source_type_name: Rundeck
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Rundeck
  sales_email: forrest@rundeck.com
  support_email: forrest@rundeck.com
categories:
- 自動化
- インシデント
- notifications
- orchestration
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rundeck/README.md
display_on_public_website: true
draft: false
git_integration_title: rundeck
integration_id: rundeck
integration_title: Rundeck
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: rundeck
public_title: Rundeck
short_description: Rundeck の Webhook を使用して修復アクションを自動化
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Incidents
  - Category::Notifications
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Rundeck の Webhook を使用して修復アクションを自動化
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Rundeck
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Rundeck のワークフロー自動化機能は Datadog の通知と併せて使える便利な拡張機能です。問題の診断を助けるだけでなく、オプションでそれらを修復することができます。

ランブックを自動化してインシデント時間を短縮する方法について、詳しくは [Rundeck のウェブサイト][1]を参照してください。

ユースケースの一例は以下の通りです。

- Windows/Linux サービスがダウンした場合に再起動をかける
- NTP 同期がオフになった場合に、そのマシンで NTP サービスを再起動する
- ディスク領域が不足しそうな場合に、ログおよびその他不要なファイルをクリーンアップする
- 作業キューが停滞した場合にサービスを再起動する
- 使用率が高くなった場合に容量のプロビジョニングを行う

以下の指示に従って Datadog/Rundeck インテグレーションを構成してください。

## セットアップ

### インストール
Datadog アラートを使ってトリガーしたい Rundeck ジョブを最低 1 つ準備してください。

### 構成

#### Rundeck

1. Rundeck プロジェクト内でナビゲーションの **Webhooks** オプションをクリックします。
2. **Add** をクリックします。
3. Webhook に名前を設定します。(例: `Datadog-Restart Service`)
4. **Choose Webhook Plugin** ボタンをクリックして **Run Job** を選択します。
5. Webhook がトリガーされたら実行したいジョブを選択します。
6. [オプション] **Options** の行に次のテキストを入力します:
`-raw ${raw} -event_type ${data.event_type}`
(これで、ジョブ入力オプションの一部として完全な Datadog のペイロードが利用できるようになります)
7. **Create Webhook** をクリックします。URL フィールドは Webhook が作成された後に自動入力されます。

![rundeck-setup][2]

**注**: ファイアウォールを使用している場合は、[Datadog IP 範囲][3]を許可リストに追加してください。

#### Datadog のセットアップ
1. Datadog を開いて **Integrations** > **Integrations** を開きます。
2. "webhooks" を検索します。

    ![search-dd-2024][4]

3. 上記の Webhook エントリをクリックします。するとコンフィギュレーションウィンドウが開きます。

    ![webhooks-config][5]

4. **New** ボタンをクリックしてフォームに必要な情報を入力します。
  - Webhook に名前を付けます。(a)
  - URL 行に Rundeck Webhook から URL をコピーして貼り付けます。これは上記セクションのステップ 7 に該当します。(b)
  - **Save** をクリックします。(c)

    ![webhook-fill][6]

`@webhook-Rundeck_Restart_Service` の受信者を追加して、このインテグレーションを Datadog 内の任意の通知に追加します。ここでの名前は、ステップ 4a で設定した Webhook 名によって異なります。モニターからアラートがトリガーされると、Webhook が関連するジョブを実行します。

場合に応じて、Advanced Run Job などのその他プラグインも利用可能です。

## 収集データ

### メトリクス

Rundeck インテグレーションは、メトリクスを提供しません。

### サービスチェック

Rundeck インテグレーションには、サービスのチェック機能は含まれません。

### イベント

Rundeck インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

[1]: https://www.rundeck.com
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/rundeck-setup.png
[3]: https://docs.datadoghq.com/ja/api/latest/ip-ranges/
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/dd-search.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/webhooks-config.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/webhook-fill.png
[7]: https://docs.datadoghq.com/ja/help/
