---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/buddy/README.md'
display_name: Buddy
draft: false
git_integration_title: buddy
guid: 7b131269-e2ba-4279-b9dd-82e85764d389
integration_id: buddy
integration_title: Buddy
is_public: true
kind: インテグレーション
maintainer: support@buddy.works
manifest_version: 1.0.2
name: buddy
public_title: Datadog-Buddy インテグレーション
short_description: Web 開発者向けのワンクリック自動配信および作業中 Web サイトのプレビュー機能。
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このインテグレーションを有効化すると、以下のことができます。

- デプロイに関するイベントを Datadog に送信できます。
- デプロイの詳細を Datadog のメトリクスと関連付けることができます。
- パフォーマンススパイクの原因を検出できます。

![Datadog インテグレーション][1]

## セットアップ

- Datadog のアカウント設定で、[Integrations -> APIs][2] に移動し、**API キー**トークンをコピーします。

- [Buddy アカウントにサインイン][3]し、追跡したいデプロイアクションを含むパイプラインに移動します。

- パイプラインの末尾にあるプラス記号をクリックし、**Notifications** セクションで **Datadog** を選択します。

- Datadog アカウントの名前を入力し、コピーした API キーを貼り付けます。

- [Buddy のパラメーター][4]を使用して、送信されるイベントとコンテンツのタイトルを定義します。次に例を示します。

```text
# イベントタイトル
${'${execution.pipeline.name} execution #${execution.id}'}

# コンテンツ
${'${execution.to_revision.revision} - ${execution.to_revision.message}'}
```

- 準備ができたら、**Add action** をクリックしてパイプラインを実行します。すべての成功したデプロイについて、Buddy から Datadog にイベントが送信されます。

![スナップショット][5]

## 収集データ

### メトリクス

Buddy チェックには、メトリクスは含まれません。

### イベント

すべての Buddy デプロイイベントが [Datadog のイベントストリーム][6]に送信されます。

### サービスのチェック

Buddy チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/buddy/images/datadog-integration.png
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://app.buddy.works/login
[4]: https://buddy.works/knowledge/deployments/what-parameters-buddy-use
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/buddy/images/snapshot.png
[6]: https://docs.datadoghq.com/ja/events/
[7]: https://docs.datadoghq.com/ja/help/