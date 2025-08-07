---
app_id: pliant
categories:
- 自動化
- コンプライアンス
- notifications
- オーケストレーション
- プロビジョニング
custom_kind: インテグレーション
description: Pliant.io で IT プロセスを自動化
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Pliant
---
## 概要

Pliant.io により、Datadog の通知をローコードの自動ワークフローで強化し、真のクローズドループ自動化ソリューションを実現できます。トラブルシューティングや診断、自動修復などに便利です。

For more integration information, check out the [Pliant](https://pliant.io/) site.

例:

- サービスの再起動
- ロードバランサーのコンフィギュレーション
- システムプロビジョニング
- ディスク / 再プロビジョニング領域をクリア
- ロードに応じてさらに VM またはコンテナノードをプロビジョン
- ロードが低いときリソースの使用を停止

## セットアップ

### インストール

Datadog の通知からトリガーするワークフローを作成します。

### 設定

#### Pliant

1. **Pliant API キーを作成します** - Pliant にログインし、画面右上のユーザー名をクリックしてメニューを開きます。"API Keys" をクリックします。

![API Key Menu step1](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step1.png)

2. API キー画面で、右上の "+ Create" をクリックして新しい API キーに名前を付けます。"Save" をクリックして、テーブルに追加される API キーについて注意書きを作成します。

![Create API Key step2](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step2.png)

**Datadog でトリガーする Pliant ワークフローを作成**

1. Pliant でワークフロータブを開きます。"+ Create" をクリックし、"Create Flow" で新しいワークフローを作成します。ポップアップウィンドウでタイトルを入力したら "Create" をクリックしてエディターを新しいワークフローで起動します。

![Create Flow step1-a-](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step1-a-.png)

2. Populate the workflow with actions to take upon receiving the Datadog trigger.

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

![Expand](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/expand.png)

3. Datadog から HTTP リクエストでトリガーされる Pliant ワークフローのエンドポイントを取得するには、ワークフローの "Start" にある "Expand" アイコンをクリックします。

"cURL" > "Temporary Bearer Token" の順にクリックし、先ほど作成した API キーを選択します。

![curl](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/curl.png)

![select key](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/selectDDkey.png)

Your endpoint is enclosed in double quotes and resembles: ***https://\<YOUR_PLIANT_INSTANCE>/api/v1/trigger/\<YOUR_PLIANT_USERNAME>/User/\<PATH_TO_WORKFLOW>/\<WORKFLOW_NOW>?sync=true&api_key=\<YOUR_API_KEY>***

![endpoint](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/endpoint.png)

***https*** で始まる、二重引用符で囲まれた URL (その他のクエリパラメーターを含む場合もあります) 全体をコピーします。二重引用符は含まないよう注意してください。

#### Datadog のセットアップ

1. Datadog を開き、左側のサイドバーで **Integrations** > **Integrations** をクリックします。
   ![integrations](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/integrations_.png)

1. 検索バーに "webhooks" と入力し、**Webhook** エントリをクリックしてコンフィギュレーションウィンドウを開きます。
   ![webhookSearch](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhook_Search.png)

1. "webhooks" までスクロールします。**New** をクリックして、Pliant ワークフローにリンクする新しい Webhook を追加します。まず、"name" フィールドで Webhook に名前を付けます。この例では *RestartHost* という名前を使用します。
   ![webhooksConfig2](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhooksConfig3.png)

ステップ 4 でコピーした URL を貼り付けます。例: 

```
https://<YOUR_PLIANT_INSTANCE>/api/v1/trigger/<YOUR_PLIANT_USERNAME>/User/<PATH_TO_WORKFLOW>/<WORKFLOW_NOW>?sync=true&api_key=<YOUR_API_KEY>
```

これを、Webhook フォームの ***URL*** フィールドに貼り付けます。

![webhookForm](https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhookForm.png)

リクエストペイロードは事前設定されています。"ENCODE AS FORM" のボックスにチェックを入れ、Save をクリックします。

`@webhook-RestartHost` の受信者を追加して、このインテグレーションを Datadog 内の任意の通知に追加します。モニターでアラートがトリガーされると、Webhook が Pliant ワークフローをトリガー氏、入力変数が Datadog から Pliant へ送信されます。

## 収集されるデータ

### メトリクス

Pliant インテグレーションは、メトリクスを提供しません。

### サービス チェック

Pliant インテグレーションには、サービスのチェック機能は含まれません。

### イベント

Pliant インテグレーションには、イベントは含まれません。

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。