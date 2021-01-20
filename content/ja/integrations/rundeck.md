---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - orchestration
  - notification
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/rundeck/README.md'
display_name: Rundeck
draft: false
git_integration_title: rundeck
guid: 2e3492d3-14fd-409d-b339-fb1bc14d7db9
integration_id: rundeck
integration_title: Rundeck
is_public: true
kind: インテグレーション
maintainer: forrest@rundeck.com
manifest_version: 1.0.0
metric_prefix: rundeck.
metric_to_check: ''
name: Rundeck
public_title: Datadog-Rundeck インテグレーション
short_description: Rundeck の Webhook を使用して修復アクションを自動化
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
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

### コンフィギュレーション

#### Rundeck のセットアップ

1. Rundeck プロジェクト内でナビゲーションの **Webhooks** オプションをクリックします。
2. **Add** をクリックします。
3. Webhook に名前を設定します。(例: *Datadog-Restart Service*)
4. **Choose Webhook Plugin** ボタンをクリックして **Run Job** を選択します。
5. Webhook がトリガーされたら実行したいジョブを選択します。
6. [オプション] **Options** の行に次のテキストを入力します:
`-raw ${raw} -event_type ${data.event_type}`
(これで、ジョブ入力オプションの一部として完全な Datadog のペイロードが利用できるようになります)
7. **Create Webhook** をクリックします。URL フィールドは Webhook が作成された後に自動入力されます。

![rundeck-setup][2]

#### Datadog のセットアップ
1. Datadog を開いて **Integrations** > **Integrations** を開きます。
2. "webhooks" を検索します。

![search-dd][3]


3. 上記の Webhook エントリをクリックします。するとコンフィギュレーションウィンドウが開きます。

![webhooks-config][4]

4. **New** ボタンをクリックしてフォームに必要な情報を入力します。
  - Webhook に名前を付けます。(a)
  - URL 行に Rundeck Webhook から URL をコピーして貼り付けます。これは上記セクションのステップ 7 に該当します。(b)
  - **Save** をクリックします。(c)

![webhook-fill][5]

`@webhook-Rundeck_Restart_Service` の受信者を追加して、このインテグレーションを Datadog 内の任意の通知に追加します。ここでの名前は、ステップ 4a で設定した Webhook 名によって異なります。モニターからアラートがトリガーされると、Webhook が関連するジョブを実行します。

場合に応じて、Advanced Run Job などのその他プラグインも利用可能です。


## 収集データ

### メトリクス

Rundeck インテグレーションは、メトリクスを提供しません。

### サービスのチェック

Rundeck インテグレーションには、サービスのチェック機能は含まれません。

### イベント

Rundeck インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://www.rundeck.com
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/rundeck-setup.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/dd-search.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/webhooks-config.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/webhook-fill.png
[6]: https://docs.datadoghq.com/ja/help/