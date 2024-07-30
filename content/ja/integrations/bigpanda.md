---
aliases: []
categories:
- notifications
- ai/ml
dependencies: []
description: BigPanda と Datadog アラートを相関付け、アクションにつながるインシデントを作成します。
doc_link: https://docs.datadoghq.com/integrations/bigpanda/
draft: false
git_integration_title: bigpanda
has_logo: true
integration_id: ''
integration_title: BigPanda
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: bigpanda
public_title: Datadog-BigPanda インテグレーション
short_description: Datadog アラートを BigPanda のアカウントに送信
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

BigPanda を Datadog に接続すると、以下のことが可能になります。

- Datadog からアラートを受信して情報の相関付けを行う。

## 計画と使用

### インフラストラクチャーリスト

BigPanda インテグレーションは、Datadog サイトの[インテグレーションタイル][1]を使用してインストールします。

### ブラウザトラブルシューティング

1. BigPanda アカウントのインテグレーションページで新しいインテグレーションを選択します。
2. _Datadog_ --> _Add Integration_, の順にクリックし、アプリキーを作成します。
3. 作成された Webhook URL には必要なアクセストークンとアプリキーが含まれています。
4. Datadog で BigPanda タイルを開き、_New Account_ をクリックします。
5. お好みの **BigPanda Account Name** を追加します。これは通知ハンドルの名前になります。
6. それぞれのフィールドに**アクセストークン**と**アプリキー**を貼り付けます。
7. **Endpoint Type** を選択します。アカウントの地域を選択するか、カスタム URL を設定することができます。
8. _Save_ をクリックします。

**注**:
- 現在サポートされている BigPanda のアカウント数は最大 5 つです。
- **Route All Monitor Events** (すべてのモニターイベントをルーティング) オプションを有効にして、すべてのモニターイベントを BigPanda に自動的に送信するには、[Datadog サポート][2]にお問い合わせください。デフォルトでは、**@bigpanda-<account-name>** を含むモニターイベントのみが送信されます。

### API

BigPanda は Datadog からイベントを受信し、インシデントを作成します。インシデントにはトリガーされたモニター名やアラートの発生源となった条件などの関連する情報が含まれています。

インシデントはモニターの遷移が変更されるにつれて、Active から Resolved に移動させることができます。Datadog から BigPanda　へのアラート送信を中止する場合は、インテグレーションタイルから目的のアカウントを削除してください。

## リアルユーザーモニタリング

### データセキュリティ

BigPanda インテグレーションは、メトリクスを提供しません。

### ヘルプ

BigPanda インテグレーションには、イベントは含まれません。

### ヘルプ

BigPanda インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: https://app.datadoghq.com/integrations/bigpanda
[2]: https://docs.datadoghq.com/ja/help/