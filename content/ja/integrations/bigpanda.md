---
categories:
  - notification
ddtype: crawler
dependencies: []
description: BigPanda と Datadog アラートを相関付け、アクションにつながるインシデントを作成します。
doc_link: 'https://docs.datadoghq.com/integrations/bigpanda/'
draft: false
git_integration_title: bigpanda
has_logo: true
integration_id: ''
integration_title: BigPanda
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: bigpanda
public_title: Datadog-BigPanda インテグレーション
short_description: Datadog アラートを BigPanda のアカウントに送信
version: '1.0'
---
## 概要

BigPanda を Datadog に接続すると、以下のことが可能になります。

- Datadog からアラートを受信して情報の相関付けを行う。
- すべての Datadog モニターをまとめて簡単にルーティングする。

## セットアップ

### インストール

BigPanda インテグレーションは、Datadog アプリケーション内の[インテグレーションタイル][1]を使用してインストールします。

### コンフィギュレーション

1. BigPanda アカウントのインテグレーションページで新しいインテグレーションを選択します。
2. _Datadog_ --> _Add Integration_, の順にクリックし、アプリキーを作成します。
3. 作成された Webhook URL には必要なアクセストークンとアプリキーが含まれています。
4. Datadog で BigPanda タイルを開き、_Add Account_ をクリックします。
5. 任意の **BigPanda アカウント名**を追加します。
6. それぞれのフィールドに**アクセストークン**と**アプリキー**を貼り付けます。
7. _Save_ をクリックします。

### 使用方法

BigPanda は Datadog からイベントを受信し、インシデントを作成します。インシデントにはトリガーされたモニター名やアラートの発生源となった条件などの関連する情報が含まれています。

インシデントはモニターの遷移が変更されるにつれて、Active から Resolved に移動させることができます。Datadog から BigPanda　へのアラート送信を中止する場合は、インテグレーションタイルからアンインストールを行ってください。

## 収集データ

### メトリクス

BigPanda インテグレーションは、メトリクスを提供しません。

### イベント

BigPanda インテグレーションには、イベントは含まれません。

### サービスのチェック

BigPanda インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/bigpanda
[2]: https://docs.datadoghq.com/ja/help/