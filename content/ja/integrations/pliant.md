---
app_id: pliant
app_uuid: 28fb0874-e3be-4171-819d-142f1c9dd3cc
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: pliant.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10102
    source_type_name: Pliant
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Pliant
  sales_email: hello@pliant.io
  support_email: hello@pliant.io
categories:
- 自動化
- コンプライアンス
- notifications
- orchestration
- プロビジョニング
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/pliant/README.md
display_on_public_website: true
draft: false
git_integration_title: pliant
integration_id: pliant
integration_title: Pliant
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: pliant
public_title: Pliant
short_description: Pliant.io で IT プロセスを自動化
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - カテゴリ::コンプライアンス
  - Category::Notifications
  - Category::Orchestration
  - Category::Provisioning
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Pliant.io で IT プロセスを自動化
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Pliant
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Pliant.io により、Datadog の通知をローコードの自動ワークフローで強化し、真のクローズドループ自動化ソリューションを実現できます。トラブルシューティングや診断、自動修復などに便利です。

インテグレーションに関する詳細は、[Pliant][1] のサイトをご参照ください。

例:

- サービスの再起動
- ロードバランサーのコンフィギュレーション
- システムプロビジョニング
- ディスク / 再プロビジョニング領域をクリア
- ロードに応じてさらに VM またはコンテナノードをプロビジョン
- ロードが低いときリソースの使用を停止

## 計画と使用
### インフラストラクチャーリスト

Datadog の通知からトリガーするワークフローを作成します。

### ブラウザトラブルシューティング
#### Pliant

1. **Pliant API キーを作成します** - Pliant にログインし、画面右上のユーザー名をクリックしてメニューを開きます。"API Keys" をクリックします。

![API キー メニューステップ 1][2]

2. API キー画面で、右上の "+ Create" をクリックして新しい API キーに名前を付けます。"Save" をクリックして、テーブルに追加される API キーについて注意書きを作成します。

![API キーの作成ステップ 2][3]

**Datadog でトリガーする Pliant ワークフローを作成**

1. Pliant でワークフロータブを開きます。"+ Create" をクリックし、"Create Flow" で新しいワークフローを作成します。ポップアップウィンドウでタイトルを入力したら "Create" をクリックしてエディターを新しいワークフローで起動します。

![フローの作成ステップ 1-a-][4]

2. Datadog のトリガーを受信すると実行するアクションをワークフローに入力します。

この "RestartHost" というタイトルのサンプルワークフローは、Datadog がこのワークフローにトリガーしたデータからホストを再起動します。

このワークフローはトリガーしたリクエスト本文をもとに初期に割り当てられた入力変数を実行します。また、入力された情報を使用して、このワークフローで希望するインフラストラクチャーの自動化アクションをトリガー/実施することもできます。この例では、Datadog が特定のパラメーターで自動化ワークフローをトリガーした状況下において、SSH でホストを再起動します。

  - Datadog から送信されたデータで生成される入力変数を追加するには、ワークフローの "Start" にある "Expand" アイコンをクリックして変数パネルを開きます。一致する **Input** 変数を作成するには、すべての入力変数を同等の空要素 `""` に設定します。Datadog では、デフォルトで以下のデータを送信します。
    ```
    body
    last_updated
    event_type
    title
    date
    org
    id
    ```

また、初期化されたその他の出力変数 (`host`、`meta`、`ip`) も存在します。ワークフローはこれらの出力変数を割り当て、完了時に結果値を出力します。入力でも出力でもない変数を特定し、ワークフローのロジック内部で使用することもできます。

![拡張][5]

3. Datadog から HTTP リクエストでトリガーされる Pliant ワークフローのエンドポイントを取得するには、ワークフローの "Start" にある "Expand" アイコンをクリックします。

"cURL" > "Temporary Bearer Token" の順にクリックし、先ほど作成した API キーを選択します。

![curl][6]

![キーを選択][7]

エンドポイントは二重引用符で囲まれており、次のように表示されます : ***https://<YOUR_PLIANT_INSTANCE>/api/v1/trigger/<YOUR_PLIANT_USERNAME>/User/<PATH_TO_WORKFLOW>/<WORKFLOW_NOW>?sync=true&api_key=<YOUR_API_KEY>***

![エンドポイント][8]

***https*** で始まる、二重引用符で囲まれた URL (その他のクエリパラメーターを含む場合もあります) 全体をコピーします。二重引用符は含まないよう注意してください。

#### Datadog のセットアップ
1. Datadog を開き、左側のサイドバーで **Integrations** > **Integrations** をクリックします。
![インテグレーション][9]

2. 検索バーに "webhooks" と入力し、**Webhook** エントリをクリックしてコンフィギュレーションウィンドウを開きます。
![webhook 検索][10]


3. "webhooks" までスクロールします。**New** をクリックして、Pliant ワークフローにリンクする新しい Webhook を追加します。まず、"name" フィールドで Webhook に名前を付けます。この例では *RestartHost* という名前を使用します。
![webhook コンフィグ2][11]

ステップ 4 でコピーした URL を貼り付けます。例: 

```
https://<YOUR_PLIANT_INSTANCE>/api/v1/trigger/<YOUR_PLIANT_USERNAME>/User/<PATH_TO_WORKFLOW>/<WORKFLOW_NOW>?sync=true&api_key=<YOUR_API_KEY>
```

これを、Webhook フォームの ***URL*** フィールドに貼り付けます。

![webhook フォーム][12]

リクエストペイロードは事前設定されています。"ENCODE AS FORM" のボックスにチェックを入れ、Save をクリックします。

`@webhook-RestartHost` の受信者を追加して、このインテグレーションを Datadog 内の任意の通知に追加します。モニターでアラートがトリガーされると、Webhook が Pliant ワークフローをトリガー氏、入力変数が Datadog から Pliant へ送信されます。

## リアルユーザーモニタリング

### データセキュリティ

Pliant インテグレーションは、メトリクスを提供しません。

### ヘルプ

Pliant インテグレーションには、サービスのチェック機能は含まれません。

### ヘルプ

Pliant インテグレーションには、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

[1]: https://pliant.io/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step1.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step2.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step1-a-.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/expand.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/curl.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/selectDDkey.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/endpoint.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/integrations_.png
[10]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhook_Search.png
[11]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhooksConfig3.png
[12]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhookForm.png
[13]: https://docs.datadoghq.com/ja/help/