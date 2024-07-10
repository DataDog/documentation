---
categories:
- コラボレーション
- notifications
dependencies: []
description: Datadog のアラートとグラフをチームの Google Chat スペースへ送信
doc_link: https://docs.datadoghq.com/integrations/google_hangouts_chat/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/google-hangouts-chat-integration/
  tag: ブログ
  text: Datadog と Google Chat のインテグレーション
- link: https://developers.google.com/hangouts/chat/
  tag: 外部ドキュメント
  text: Google Chat
git_integration_title: google_hangouts_chat
has_logo: true
integration_id: google-hangouts-chat
integration_title: Google Chat
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_hangouts_chat
public_title: Datadog-Google Chat インテグレーション
short_description: Datadog のアラートとグラフをチームの Google Chat スペースへ送信
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Google Chat を Datadog に接続し、次の方法でチームのコラボレーションを支援します。

- チームのプライベートスペースまたは公開スペースで、同僚とグラフを共有できます。
- Google Chat 内で Datadog からのアラートや通知を受け取ることができます。

## 計画と使用

### インフラストラクチャーリスト

Google Chat インテグレーションは、Datadog サイトの[インテグレーションタイル][1]で、Google Chat スペースにボットを追加することでインストールされます。

### ブラウザトラブルシューティング

1. `@Datadog` を使用して Datadog アプリケーションを Google Chat スペースに追加します。**注:** Datadog チャットボットをルームに追加するには、[それを許可リストに登録][2]する必要があります。
2. `@Datadog install` と入力して Google Chat スペースに Datadog アプリケーションをインストールします。**注:** デフォルトドメイン (`app.datadoghq.com`) 以外のサイトにインストールするには、`@Datadog install mydomain.datadoghq.eu` のようにこのコマンドにドメインを追加します。
3. 表示されるボットの指示に従って Datadog アカウントにサインインし、Datadog サイトを使用してボットを構成します。
4. [`@-notification` 機能][3]を使用して、ボットのポスト先とするルームの `names` と `urls` を追加します。

{{% site-region region="us" %}}
### Datadog チャットボットコマンドの概要
| コマンド                            | 説明                                                                                                                                                                                                                                   |
|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@Datadog install (domain)`        | インストールワークフローを開始します。**注:** 複数の Datadog アカウントに属している場合は、インストールワークフロー時に **Account selection** ページが表示されます。                                                                                |
| `@Datadog list installed accounts` | Google Chat がインストールされているすべてのアカウントのリストを返します。                                                                                                                                                                               |
| `@Datadog remove account`          | 特定の Datadog アカウントから Google Chat を削除するワークフローを開始します。すべてのインストールアカウントのアンインストールリンクを含むカードが返されます。アンインストールするアカウントをクリックすると、Datadog チャットボットは、削除されたアカウント名を返します。 |
{{% /site-region %}}

## Datadog アカウントからのアンインストール
{{% site-region region="us" %}} 
Google Chat を Datadog アカウントからアンインストールする方法には、次の 3 つがあります。
1. `@Datadog remove account` コマンドを使用して、スペースメンバーは、選択した Datadog アカウントからチャットボットをアンインストールできます。
2. Datadog アカウント内で、Google Chat インテグレーションタイルからスペースを削除できます。
3. スペースからチャットボットを削除して、任意のインストールアカウントからボットをアンインストールすることもできます。
{{% /site-region %}}

{{% site-region region="ap1,us5,us3,eu,gov" %}}
Datadog アカウント内で、Google Chat インテグレーションタイルからスペースを削除できます。 
{{% /site-region %}}


## リアルユーザーモニタリング

### データセキュリティ

Google Chat インテグレーションには、メトリクスは含まれません。

### ヘルプ

Google Chat インテグレーションには、イベントは含まれません。

### ヘルプ

Google Chat インテグレーションには、サービスのチェック機能は含まれません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/google_hangouts_chat
[2]: https://support.google.com/a/answer/6089179
[3]: https://docs.datadoghq.com/ja/monitors/notifications/#notification