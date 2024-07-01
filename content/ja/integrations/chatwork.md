---
categories:
- collaboration
- notifications
dependencies: []
description: Datadog のアラートとグラフをチームの Chatwork ルームに送信。
doc_link: https://docs.datadoghq.com/integrations/chatwork/
draft: false
git_integration_title: chatwork
has_logo: true
integration_id: chatwork
integration_title: Chatwork
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: chatwork
public_title: Datadog-Chatwork インテグレーション
short_description: Datadog のアラートとグラフをチームの Chatwork ルームに送信。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/chatwork/chatwork_event.png" alt="Chatwork イベント" popup="true">}}

## 概要

Chatwork と統合すると、以下のことが可能です。

- ストリームでポストが行われたときに通知を受けることができます。
- メトリクスアラートがトリガーされたときに通知を受けることができます。

## セットアップ

### インストール

1. まず、Datadog 更新をポストする ChatWork オーガニゼーションアカウントに Datadog ユーザーを作成します。
2. Chatwork API は現在プレビュー段階なので、[アクセスを申請する][1]必要があります。
3. 確認の電子メールを待ちます (最大 2 日かかります)。
4. [この手順][2]を実行してトークンを取得します。
5. トークンをこの[フィールド][3]にコピーします。
6. アクセスするチャット名と ID を入力します。(ID はチャットルームの URL に示されています)
7. すべてのコメントについての通知を受ける場合は、チェックボックスをオンにします。それ以外の場合は、`@chatwork-chat_namesyntax` を使用する必要があります。
   {{< img src="integrations/chatwork/chatwork_tile.png" alt="Chatwork タイル" popup="true">}}

8. [構成を保存します][3]

## 収集データ

### メトリクス

Chatwork インテグレーションには、メトリクスは含まれません。

### イベント

Chatwork インテグレーションには、イベントは含まれません。

### サービスのチェック

Chatwork インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://www.chatwork.com/login.php?redirect=apply_beta&package=chatwork&subpackage=api&args=
[2]: http://developer.chatwork.com/ja/authenticate.html
[3]: https://app.datadoghq.com/integrations/chatwork
[4]: https://docs.datadoghq.com/ja/help/