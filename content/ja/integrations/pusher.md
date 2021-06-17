---
categories:
  - processing
  - messaging
ddtype: crawler
dependencies: []
description: Pusher から Datadog にメトリクスを取り込み、アプリエンゲージメントを参照および監視。
doc_link: 'https://docs.datadoghq.com/integrations/pusher/'
draft: false
git_integration_title: pusher
has_logo: true
integration_id: pusher
integration_title: Pusher
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: pusher
public_title: Datadog-Pusher インテグレーション
short_description: Pusher から Datadog にメトリクスを取り込み、アプリエンゲージメントを参照および監視。
version: '1.0'
---
## 概要

Pusher アプリ全体のリアルタイムメッセージと接続分析を監視して、以下のことができます。

- 同時接続をリアルタイムに可視化できます。
- ブロードキャスト、クライアントイベント、Webhook、API メッセージなどのタイプ別に、送信されたメッセージを追跡できます。
- 平均値、中央値、最大値、95 パーセンタイルなど、メッセージサイズの統計詳細データを取得できます。
- 課金タイムテーブル内の使用状況を監視できます。

## セットアップ

### インストール

Pusher からのメトリクスを監視するには、以下の手順に従ってください。

1. [Datadog API キー][1]をコピーします。

2. Pusher アカウント設定に移動してDatadog インテグレーションを選択するか、[こちら][2]に移動します

3. Datadog API キーを貼り付け、Save をクリックします。

4. Datadog ダッシュボードに戻り、デフォルトの Pusher ダッシュボードビューにメトリクスの表示が開始されたことを確認します。

<div class="alert alert-info">
メトリクスはリアルタイムに入力されるため、インテグレーションが正しく完了すると、直ちに履歴データが入力され始めます。
</div>

## 収集データ

### メトリクス
{{< get-metrics-from-git "pusher" >}}


### イベント

Pusher インテグレーションには、イベントは含まれません。

### サービスのチェック

Pusher インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#api
[2]: https://dashboard.pusher.com/accounts/sign_in
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/pusher/pusher_metadata.csv
[4]: https://docs.datadoghq.com/ja/help/