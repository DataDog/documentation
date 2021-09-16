---
categories:
  - exceptions
ddtype: crawler
dependencies: []
description: イベントストリームで Honeybadger の例外を表示、検索、議論。
doc_link: https://docs.datadoghq.com/integrations/honeybadger/
draft: false
git_integration_title: honeybadger
has_logo: true
integration_id: honeybadger
integration_title: Honeybadger
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: honeybadger
public_title: Datadog-Honeybadger インテグレーション
short_description: イベントストリームで Honeybadger の例外を表示、検索、議論。
version: '1.0'
---
{{< img src="integrations/honeybadger/honeybadgerevent.png" alt="Honeybadger のイベント" popup="true">}}

## 概要

Honeybadger を Datadog に接続して、以下のことができます。

- ストリームでエラーをリアルタイムに確認できます。
- グラフでエラーを検索できます。
- エラーについてチームで議論できます。
- とても便利です。

## セットアップ

### インストール

Honeybadger からエラーをキャプチャするには、以下のようにします。

1. Honeybadger の[プロジェクトリスト][1]を開きます。
2. 監視するプロジェクトの "Settings" をクリックします。
3. "Alerts & Integrations" をクリックします。
4. 新しいインテグレーションとして "Datadog" を選択します。
5. [API キー][2]を追加します。
6. インテグレーションを保存します。
7. [Honeybadger インテグレーションタイル][3]の **Install Integration** ボタンをクリックします。

## 収集データ

### メトリクス

Honeybadger インテグレーションには、メトリクスは含まれません。

### イベント

Honeybadger インテグレーションには、イベントは含まれません。

### サービスのチェック

Honeybadger インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://app.honeybadger.io/users/sign_in
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://app.datadoghq.com/account/settings#integrations/honeybadger
[4]: https://docs.datadoghq.com/ja/help/