---
categories:
  - notification
  - issue tracking
  - exceptions
ddtype: クローラー
dependencies: []
description: Datadog イベントストリームに例外、エラー、およびコードデプロイを送信
doc_link: 'https://docs.datadoghq.com/integrations/rollbar/'
git_integration_title: rollbar
has_logo: true
integration_title: Rollbar
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: rollbar
public_title: Datadog-Rollbar インテグレーション
short_description: Datadog イベントストリームに例外、エラー、およびコードデプロイを送信 stream.
version: '1.0'
---
{{< img src="integrations/rollbar/rollbar_error.png" alt="Rollbar error event"  >}}

## 概要

Rollbar は、開発者がより優れたソフトウェアを迅速に構築できるように支援します。Rollbar を使用すると、開発に関連するすべてのフレームワーク、プラットフォーム、環境から生成された例外を 1 つの場所に表示できます。

Rollbar を Datadog に接続して、以下のことができます。

* イベントストリームで例外、エラー、コードデプロイの通知を受けることができます。
* 重大度、環境、ホスト、ユーザーなどで通知を絞り込むことができます。
* グラフで例外を検索できます。
* 例外についてチームで議論できます。
* 問題のデバッグにかかる時間を短縮できます。

## セットアップ
### インストール

インストールは必要ありません。

### コンフィグレーション

構成は、Rollbar でプロジェクトごとに行います。

* Rollbar で、**Dashboard** → **Settings** → **Notifications** → **Datadog** を選択して、プロジェクトの通知設定ページに移動します。

* Datadog で、**Integrations** → **APIs** を選択して、[API ページに移動][1]し、API キーを取得 (クリップボードにコピー) します。

* Rollbar に Datadog API キーを追加します。

* [Enable Datadog Integration][2] をクリックします。

これで完了しました。例外が発生するたびに、イベントストリームに表示されます。

## 収集されたデータ
### メトリック

Redmine インテグレーションには、メトリクスは含まれません。

### イベント

Redmine インテグレーションは、例外、エラー、およびコードデプロイをイベントとして Datadog にプッシュします。

### サービスチェック
Redmine インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#api
[2]: https://app.datadoghq.com/account/settings#integrations/rollbar
[3]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}