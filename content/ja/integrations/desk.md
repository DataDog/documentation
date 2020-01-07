---
categories:
  - Collaboration
  - issue tracking
ddtype: クローラー
dependencies: []
description: 新規、オープン状態、保留状態、および解決済みのケースを表示および議論 stream.
doc_link: 'https://docs.datadoghq.com/integrations/desk/'
git_integration_title: desk
has_logo: true
integration_title: Desk
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: desk
public_title: Datadog-Desk インテグレーション
short_description: 新規、オープン状態、保留状態、および解決済みのケースを表示および議論 event stream.
version: '1.0'
---
## 概要

Desk を Datadog に接続すると、以下のことが可能です。

  * イベントストリームで新しいケースイベントを受信できます。
  * ユーザーおよびステータス別にケース統計を可視化できます。
  * サポートチケットの傾向と DevOps の問題を並べて表示できます。

## セットアップ
### コンフィグレーション

Desk アカウントから、Settings -> API -> My Applications ページで、API アプリケーションを追加します (管理者権限が必要な場合があります)。
以下のようにフォームに入力します。最後の 2 つの URL フィールドは空白にしておきます。Desk がアプリケーションキー、アプリケーションシークレット、API アクセストークン、API アクセストークンシークレットを生成します。

{{< img src="integrations/desk/desk_config.png" alt="desk config"  >}}

Datadog アカウントから、対応する情報を [Desk タイル][1]に入力します。会社固有の Desk ドメイン名も入力する必要があります。
インストールボタンを押すと、設定は完了です。間もなく、desk.* メトリクスをカスタムダッシュボードで選択したり、提供されている [Desk ダッシュボード][2]で表示できるようになります。(このインテグレーションについては、[Datadog のブログ記事][3]も参照してください。)

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
[5]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}