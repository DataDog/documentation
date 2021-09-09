---
categories:
  - Collaboration
  - issue tracking
ddtype: crawler
dependencies: []
description: イベントストリームで、新規、オープン、保留中、解決済みのケースを確認および議論。
doc_link: https://docs.datadoghq.com/integrations/desk/
draft: false
git_integration_title: desk
has_logo: true
integration_id: desk
integration_title: Desk
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: desk
public_title: Datadog-Desk インテグレーション
short_description: イベントストリームで、新規、オープン、保留中、解決済みのケースを確認および議論。
version: '1.0'
---
## 概要

Desk を Datadog に接続すると、以下のことが可能です。

- イベントストリームで新しいケースイベントを受信できます。
- ユーザーおよびステータス別にケース統計を可視化できます。
- サポートチケットの傾向と DevOps の問題を並べて表示できます。

## セットアップ

### コンフィギュレーション

Desk アカウントから、Settings -> API -> My Applications ページで、API アプリケーションを追加します (管理者権限が必要な場合があります)。
以下のようにフォームに入力します。最後の 2 つの URL フィールドは空白にしておきます。Desk がアプリケーションキー、アプリケーションシークレット、API アクセストークン、API アクセストークンシークレットを生成します。

{{< img src="integrations/desk/desk_config.png" alt="Desk コンフィグ" popup="true">}}

次に、Datadog アカウントから、対応する情報を [Desk タイル][1]に入力します。会社固有の Desk ドメイン名も入力する必要があります。
インストールボタンを押すと、設定が完了します。すぐに、desk.\* メトリクスをカスタムダッシュボードで選択したり、所定の [Desk ダッシュボード][2]で表示できるようになります。(このインテグレーションについては、[Datadog のブログ記事][3]も参照してください。)

## 収集データ

### メトリクス
{{< get-metrics-from-git "desk" >}}


### イベント

Desk インテグレーションには、イベントは含まれません。

### サービスのチェック

Desk インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/desk
[2]: https://app.datadoghq.com/screen/integration/desk
[3]: https://www.datadoghq.com/blog/keep-support-team-page-salesforce-desk-integration
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/desk/desk_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/