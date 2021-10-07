---
categories:
  - コラボレーション
  - notification
ddtype: crawler
dependencies: []
description: Datadog のアラートとグラフをチームの Google Hangouts ルームへ送信
doc_link: 'https://docs.datadoghq.com/integrations/google_hangouts_chat/'
draft: false
further_reading:
  - link: 'https://www.datadoghq.com/blog/google-hangouts-chat-integration/'
    tag: ブログ
    text: Datadog と Google Hangouts Chat の統合
  - link: 'https://developers.google.com/hangouts/chat/'
    tag: 外部ドキュメント
    text: Google Hangouts Chat
git_integration_title: google_hangouts_chat
has_logo: true
integration_id: google-hangouts-chat
integration_title: Google Hangouts Chat
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: google_hangouts_chat
public_title: Datadog-Google Hangouts Chat インテグレーション
short_description: Datadog のアラートとグラフをチームの Google Hangouts ルームへ送信
version: '1.0'
---
{{< site-region region="us3,eu,gov" >}}
<div class="alert alert-warning">
  このインテグレーションは、米国のサイトを使用している Datadog のお客様にのみサポートされています。
</div>
{{< /site-region >}}

## 概要

Google Hangouts Chat を Datadog に接続し、次の方法でチームのコラボレーションを支援します。

- チームのプライベートチャンネルまたは公開チャンネルで、同僚とグラフを共有できます。
- Google Hangouts Chat 内で Datadog からのアラートや通知を受け取ることができます。

## セットアップ

### インストール

Hangouts Chat インテグレーションは、Datadog アプリケーションの[インテグレーションタイル][1]で、Hangouts ルームにボットを追加することでインストールされます。

### コンフィギュレーション

1. `@DataDog` を使用して Datadog チャットボットを Google Hangouts ルームに追加します。**注:** Datadog チャットボットをルームに追加するには、[それを許可リストに登録][2]する必要があります。
2. `@Datadog install` と入力して、Google Hangouts ルームに Datadog チャットボットをインストールします。
3. 表示されるボットの指示に従って Datadog アカウントにサインインし、Datadog アプリケーションを使用してボットを構成します。
4. [`@-notification` 機能][3]を使用して、ボットのポスト先とするルームの `names` と `urls` を追加します。

### Datadog チャットボットコマンドの概要

| コマンド                            | 説明                                                                                                                                                                                                                                                           |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@Datadog install`                 | インストールワークフローを開始します。**注:** 複数の Datadog アカウントに属している場合は、インストールワークフロー時に自動的に **Account selection** ページに移動します。                                                                                                   |
| `@Datadog list installed accounts` | Hangouts Chat がインストールされているすべてのアカウントのリストを返します。                                                                                                                                                                                                     |
| `@Datadog remove account`          | 特定の Datadog アカウントから Hangouts Chat を削除するワークフローを開始します。すべてのインストールアカウントのアンインストールリンクを含むカードが返されます。アンインストールするアカウントをクリックすると、Datadog チャットボットは、削除されたアカウント名を返します。 |

## Datadog アカウントからのアンインストール

Hangouts Chat を Datadog アカウントからアンインストールする方法には、次の 3 つがあります。

1. `@Datadog remove account` コマンドを使用して、ルームメンバーは、選択した Datadog アカウントからチャットボットをアンインストールできます。
2. Datadog アカウント内で、[Google Hangout Chat インテグレーションタイル][1]を使用してルームを削除できます。
3. ルームからチャットボットを削除して、任意のインストールアカウントからボットをアンインストールすることもできます。

## 収集データ

### メトリクス

Google Hangouts Chat インテグレーションには、メトリクスは含まれません。

### イベント

Google Hangouts Chat インテグレーションには、イベントは含まれません。

### サービスのチェック

Google Hangouts Chat インテグレーションには、サービスのチェック機能は含まれません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#integrations/google_hangouts_chat
[2]: https://support.google.com/a/answer/6089179
[3]: https://docs.datadoghq.com/ja/monitors/notifications/#notification