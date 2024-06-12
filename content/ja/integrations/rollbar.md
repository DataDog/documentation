---
categories:
  - notification
  - issue tracking
  - exceptions
ddtype: crawler
dependencies: []
description: Datadog イベントストリームに、例外、エラー、コードデプロイを送信。
doc_link: https://docs.datadoghq.com/integrations/rollbar/
draft: false
git_integration_title: rollbar
has_logo: true
integration_id: rollbar
integration_title: Rollbar
is_public: true
manifest_version: '1.0'
name: rollbar
public_title: Datadog-Rollbar インテグレーション
short_description: Datadog イベントストリームに、例外、エラー、コードデプロイを送信。
version: '1.0'
---
{{< img src="integrations/rollbar/rollbar_error.png" alt="Rollbar エラーイベント" popup="true">}}

## 概要

Rollbar は、開発者がより優れたソフトウェアを迅速に構築できるように支援します。Rollbar を使用すると、開発に関連するすべてのフレームワーク、プラットフォーム、環境から生成された例外を 1 つの場所に表示できます。

Rollbar を Datadog に接続して、以下のことができます。

- イベントストリームで例外、エラー、コードデプロイの通知を受けることができます。
- 重大度、環境、ホスト、ユーザーなどで通知を絞り込むことができます。
- グラフで例外を検索できます。
- 例外についてチームで議論できます。
- 問題のデバッグにかかる時間を短縮できます。

## セットアップ

### インストール

インストールは必要ありません。

### コンフィギュレーション

構成は、Rollbar でプロジェクトごとに行います。

1. Rollbar で、**Dashboard** → **Settings** → **Notifications** → **Datadog** を選択して、プロジェクトの通知設定ページに移動します。
2. Datadog で、**Integrations** → **APIs** の順に選択して [API ページに移動][1]し、API キーを取得 (クリップボードにコピー) します。
3. Rollbar に Datadog API キーを追加します。
4. [Enable Datadog Integration][2] をクリックします。

これで完了しました。例外が発生するたびに、イベントストリームに表示されます。

## 収集データ

### メトリクス

Rollbar インテグレーションには、メトリクスは含まれません。

### イベント

Rollbar インテグレーションは、例外、エラー、およびコードデプロイをイベントとして Datadog にプッシュします。

### サービスのチェック

Rollbar インテグレーションには、サービスチェックは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#api
[2]: https://app.datadoghq.com/account/settings#integrations/rollbar
[3]: https://docs.datadoghq.com/ja/help/