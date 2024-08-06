---
categories:
- collaboration
- notifications
dependencies: []
description: Datadog のアラートとグラフをチームの Hipchat ルームに送信。
doc_link: https://docs.datadoghq.com/integrations/hipchat/
draft: false
git_integration_title: hipchat
has_logo: true
integration_id: ''
integration_title: HipChat
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: hipchat
public_title: Datadog-HipChat インテグレーション
short_description: Datadog のアラートとグラフをチームの Hipchat ルームに送信。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/hipchat/hipchat_graph.png" alt="Hipchat グラフ" popup="true">}}

## 概要

Hipchat インテグレーションを使用して、Datadog は、HipChat ルームまたは個別のハンドルに次のような通知を送信できます。

- Datadog モニターがトリガーしたときにメッセージやグラフを送信できます。
- イベントストリームアクティビティに関するメッセージ (チームメンバーからのコメント) を送信できます。

## セットアップ

### コンフィギュレーション

1. Datadog 用に[新しいアクセストークンを作成します][1]。通知レベルのアクセスだけが必要です。
2. キーをコピーして、[HipChat インテグレーションタイル][2]に入力します。
3. Datadog がメッセージを送信できるようにするルームの名前の入力します。
   構成したすべてのルームで、すべてのコメントについて通知を受ける場合は、チェックボックスをオンにします。オンにしない場合は、HipChat に送信する各メッセージに、コメント作成者が `@hipchat-<CHAT_NAME>` を挿入する必要があります。

4. 構成を保存します。

`@hipchat-<CHAT_NAME>` を使用して、HipChat ルームとグラフを共有したり、Monitor アラートを送信することもできます。

<div class="alert alert-warning">
HipChat API V1 トークンを使用している場合、チャットハンドルにカンマや角括弧などの特殊文字が含まれていても、ハンドルの入力時に特殊文字をエスケープする必要はありません。オートコンプリートボックスが自動的にこれを行います。
</div>

#### HipChat サーバー

独自の HipChat サーバーをホストしている場合は、サーバーのホスト名を [Datadog-Hipchat タイル][2]に入力します。サーバーは、インターネットからアクセスできる必要があります。

HipChat サーバーの証明書が自己署名の場合にのみ、**Ignore SSL** チェックボックスをオンにします。

{{< img src="integrations/hipchat/hipchat_hostname.png" alt="Hipchat ホスト名" popup="true">}}

## 収集データ

### メトリクス

Hipchat インテグレーションには、メトリクスは含まれません。

### イベント

Hipchat インテグレーションには、イベントは含まれません。

### サービスのチェック

Hipchat インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://www.hipchat.com/admin/api
[2]: https://app.datadoghq.com/integrations/hipchat
[3]: https://docs.datadoghq.com/ja/help/