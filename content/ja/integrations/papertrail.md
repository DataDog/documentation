---
categories:
  - monitoring
ddtype: crawler
dependencies: []
description: Papertrail のログを Datadog のイベントストリームで表示、検索、議論。
doc_link: https://docs.datadoghq.com/integrations/papertrail/
draft: false
git_integration_title: papertrail
has_logo: true
integration_id: papertrail
integration_title: PaperTrail
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: papertrail
public_title: Datadog-PaperTrail インテグレーション
short_description: Papertrail のログを Datadog のイベントストリームで表示、検索、議論。
version: '1.0'
---
{{< img src="integrations/papertrail/papertrailexample.png" alt="Papertrail 例" popup="true">}}

## 概要

Papertrail と Datadog を使用して、以下のことができます。

- 自由形式のログデータをすぐに使用できるメトリクスに変換できます。
- 運用情報のサイロ化を避けることができます。ログ由来のメトリクスをアプリ/システムレベルのメトリクスと共に表示し、相互に関連付けることができます。

## セットアップ

### インストール

Papertrail からのメトリクスをキャプチャするには、以下のようにします。

1. Papertrail の[イベントビューア][1]で、グラフ化するログイベントの検索を保存します。
2. 検索の名前を入力し、**Save & Setup an Alert** ボタンをクリックします。
3. Graphing & Metrics で Datadog を選択します。
    {{< img src="integrations/papertrail/papertrailnotify.png" style="max-width:500px;" alt="Papertrail 通知" popup="true">}}

4. アラート頻度などの詳細を選択します。
5. Datadog API キーを指定して、メトリクスに付ける名前を入力し、オプションで、メトリクスと関連付けるタグを入力します。
    {{< img src="integrations/papertrail/papertraildetails.png" style="max-width:500px;" alt="Papertrail 通知" popup="true">}}

6. **Create Alert** ボタンをクリックします。

Papertrail が、選択された間隔で Datadog を更新します。

### コンフィギュレーション

このインテグレーションに構成手順は必要ありません。

## 収集データ

### メトリクス

Papertrail インテグレーションには、メトリクスは含まれません。

### イベント

Papertrail インテグレーションには、イベントは含まれません。

### サービスのチェック

Papertrail インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: https://papertrailapp.com/events
[2]: https://docs.datadoghq.com/ja/help/