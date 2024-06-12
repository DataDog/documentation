---
categories:
- Collaboration
- issue tracking
dependencies: []
description: イベントストリームで、新規、オープン、保留中、解決済みのケースを確認および議論。
doc_link: https://docs.datadoghq.com/integrations/desk/
draft: false
git_integration_title: desk
has_logo: true
integration_id: desk
integration_title: Desk
integration_version: ''
is_public: true
manifest_version: '1.0'
name: desk
public_title: Datadog-Desk インテグレーション
short_description: イベントストリームで、新規、オープン、保留中、解決済みのケースを確認および議論。
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Desk を Datadog に接続すると、Salesforce サポートケースのデータをすぐに使えるダッシュボードで表示することができます。ダッシュボードでは以下のことが可能です。

- イベントストリームで新しいケースイベントをテールできます
- ユーザーおよびステータス別にケース統計を可視化できます。
- サポートチケットの傾向と DevOps の問題を並べて表示できます。

詳細については、[Salesforce Desk インテグレーションを利用して、サポートを情報面で一致させる][1]をご覧ください。

## 計画と使用

### ブラウザトラブルシューティング

Desk アカウントから、Settings -> API -> My Applications ページで API アプリケーションを追加します (管理者特権が必要な場合があります)。

後者の 2 つの URL フィールドは空白のまま、図のようにフォームに入力します。Desk はアプリケーションキー、アプリケーションシークレット、API アクセストークン、API アクセストークンシークレットを生成します。

{{< img src="integrations/desk/desk_config.png" alt="Desk コンフィグ" popup="true">}}

次に、Datadog アカウントから、対応する情報を [Desk タイル][2]、および会社固有の Desk ドメイン名を入力します。インストールボタンを押すと、設定が完了します。

インストール後、カスタムダッシュボードで `desk.*` メトリクスを選択するか、提供されている [Desk ダッシュボード][3]で表示することができます。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "desk" >}}


### ヘルプ

Desk インテグレーションには、イベントは含まれません。

### ヘルプ

Desk インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://www.datadoghq.com/blog/keep-support-team-page-salesforce-desk-integration
[2]: https://app.datadoghq.com/integrations/desk
[3]: https://app.datadoghq.com/screen/integration/desk
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/desk/desk_metadata.csv
[5]: https://docs.datadoghq.com/ja/help/