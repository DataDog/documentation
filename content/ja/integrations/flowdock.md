---
categories:
- collaboration
- notifications
dependencies: []
description: Datadog のアラートとグラフをチームのフローに送信。
doc_link: https://docs.datadoghq.com/integrations/flowdock/
draft: false
git_integration_title: flowdock
has_logo: true
integration_id: ''
integration_title: Flowdock
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: flowdock
public_title: Datadog-Flowdock インテグレーション
short_description: Datadog のアラートとグラフをチームのフローに送信。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/flowdock/flowdock_overview.png" alt="Flowdock 概要" popup="true">}}

## 概要

FlowDock と統合して、以下のことができます。

- ストリームでポストが行われたときに通知を受けることができます。
- モニターアラートやインテグレーションステータスの変更などをフローに直接取り込むことができます。

Datadog は、Flowdock のスレッドを利用して、フローに余計な通知が紛れ込むことを防ぎます。それぞれのフローで、各通知はそれ自身のスレッドに送られ、その後のそれに関連する通知も同じスレッドに送られます (たとえば、あるモニターアラートがトリガーされ、その後解決された場合は、対応する通知が Flowdock でグループ化されます)。

## セットアップ

### インストール

Flowdock を Datadog と統合するには、Flowdock の **Configuration** タブを使用します。開いているすべてのフローが取得されます。フローのすべてにポストする必要がない場合は、オートコンプリートリストで表示しないフローを削除できます。これで、ユーザーメッセージまたはモニターで `@flowdock` ハンドルを使用して、メッセージをフローにポストできます。

ユーザーメッセージとスナップショットはフローのメインスレッドに送られますが、各アラートはそれぞれ独自の Flowdock スレッドにポストされます。これにより、メインスレッドに余計なアラートが紛れ込むことを防ぎ、チームのチャットをクリーンで整理された状態に維持できます。同時に、最近報告されたモニターのステータスは、Inbox ビューでいつでも即座に確認できます。

## 収集データ

### メトリクス

Flowdock インテグレーションには、メトリクスは含まれません。

### イベント

Flowdock インテグレーションには、イベントは含まれません。

### サービスのチェック

Flowdock インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][1]までお問合せください。

[1]: https://docs.datadoghq.com/ja/help/