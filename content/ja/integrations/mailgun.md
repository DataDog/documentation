---
app_id: mailgun
categories:
- ログの収集
- モニター
custom_kind: インテグレーション
description: 開発者のメール送信、追跡、受信を支援するクラウドベースのメールサービス
further_reading:
- link: https://www.datadoghq.com/blog/email-performance-integrations/
  tag: blog
  text: 'インテグレーションまとめ: Datadog を使ってメールパフォーマンスを把握する'
integration_version: 1.0.0
media: []
title: Mailgun
---
## 概要

Mailgun は API ベースのメール配信プラットフォームで、これにより以下のことが可能になります。

- 大規模なメールマーケティングアプリケーションを構築し、管理する。
- トランザクションメッセージを送信し、追跡する。
- 無効なメールアドレスをリストから削除する。
- 配信率を向上させ、コンバージョン率を高める。

Datadog とインテグレーションすることで、メール配信やエンゲージメントのメトリクスやログを収集し、Mailgun サービスのパフォーマンスを追跡することができます。

## セットアップ

### ドメインの追加と確認

1. [Mailgun アカウント](https://login.mailgun.com/login/)にログインします。
1. 左側のサイドバーで、**Sending** をクリックします。メニューが展開されます。**Domains** を選択します。
1. 右上の **Add New Domain** をクリックします。
1. ドメイン名とリージョンを入力し、**Add Domain** をクリックします。
1. [Mailgun ドキュメントの指示](https://help.mailgun.com/hc/en-us/articles/360026833053)に従って、ドメインを確認します。

### Mailgun API キーの表示

Mailgun にサインアップすると、プライマリアカウントの API キーがあなたのために作成されます。
このキーは、私たちの様々な API エンドポイントを通して、そしてあなたの送信ドメインのいずれに対しても、すべての CRUD 操作を実行することができます。

1. [Mailgun アカウント](https://login.mailgun.com/login/)にログインします。
1. 右上の自分の名前をクリックし、ドロップダウンを開きます。
1. **API Keys** をクリックします。
1. **Private API Key** の横にある目のアイコンをクリックします。

### メトリクスの収集を有効にする

1. Datadog の [Mailgun インテグレーションタイル](https://app.datadoghq.com/integrations/mailgun)内のコンフィギュレーションタブに移動します。
1. ドメイン名とドメインのリージョンを入力します。
1. 上記の手順で確認した API キーを貼り付けます。
1. オプションで、カスタムタグを追加して、このインテグレーションのために収集されたすべてのメトリクスにタグを関連付けます。

### ログ収集の有効化

イベントをログとして Datadog に転送するように Mailgun を構成することができます。詳しくは、[Mailgun ドキュメント](https://documentation.mailgun.com/en/latest/user_manual.html#webhooks-1)の**メッセージの追跡 - Webhooks** のセクションをご覧ください。

1. [Mailgun インテグレーションタイル](https://app.datadoghq.com/integrations/mailgun)の説明から、生成された URL をコピーします。
1. Mailgun アカウントにログインします。
1. 左側列の **Sending** をクリックします。
1. ドロップダウンの **Webhooks** をクリックします。
1. 右上の **Add webhook** をクリックします。
1. 追跡したいイベントの種類を選択します。
1. ステップ 1 で生成した URL を **URL** に貼り付けます。
1. **Create Webhook** をクリックします。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **mailgun.emails.accepted.total** <br>(count) | メールの受け付け総数 (受信と送信の両方を含む)<br>_email として表示_ |
| **mailgun.emails.accepted.incoming** <br>(count) | 受信メールの受け付け数<br>_email として表示_ |
| **mailgun.emails.accepted.outgoing** <br>(count) | 送信メールの受け付け数<br>_email として表示_ |
| **mailgun.emails.delivered.total** <br>(count) | 送信され、受信者のメールサーバーにより受け付けられたメールの総数<br>_email として表示_ |
| **mailgun.emails.delivered.smtp** <br>(count) | 送信され、受信者のメールサーバーにより受け付けられた SMTP メールの総数<br>_email として表示_ |
| **mailgun.emails.delivered.http** <br>(count) | 送信され、受信者のメールサーバーにより受け付けられた HTTP メールの総数<br>_email として表示_ |
| **mailgun.emails.delivered.optimized** <br>(count) | 送信され、受信者のメールサーバーにより受け付けられた送信時間最適化メールの総数<br>_email として表示_ |
| **mailgun.emails.failed.temporary.total** <br>(count) | 受信者のメールサーバーへの送信が一時的に失敗したメールの数<br>_email として表示_ |
| **mailgun.emails.failed.temporary.espblock** <br>(count) | メールサービスプロバイダーによりブロックされたメールの数<br>_email として表示_ |
| **mailgun.emails.failed.permanent.total** <br>(count) | 受信者のメールサーバーへの送信が完全に失敗したメールの数<br>_email として表示_ |
| **mailgun.emails.failed.permanent.suppress_bounce** <br>(count) | 前回バウンスしたために削除されたメールの数<br>_email として表示_ |
| **mailgun.emails.failed.permanent.suppress_unsubscribe** <br>(count) | 前回配信が停止されために削除されたメールの数<br>_email として表示_ |
| **mailgun.emails.failed.permanent.suppress_complaint** <br>(count) | 前回苦情が報告されたために削除されたメールの数<br>_email として表示_ |
| **mailgun.emails.failed.permanent.bounce** <br>(count) | 配信されずにバウンスしたメールの数<br>_email として表示_ |
| **mailgun.emails.failed.permanent.delayed_bounce** <br>(count) | 遅延後にバウンスしたメールの数<br>_email として表示_ |
| **mailgun.emails.failed.permanent.webhook** <br>(count) | 失敗した Webhook リクエストの数<br>_request として表示_ |
| **mailgun.emails.failed.permanent.optimized** <br>(count) | 失敗した送信時間最適化メールの数<br>_email として表示_ |
| **mailgun.emails.opened.total** <br>(count) | 受信者によりメールが開かれた合計回数<br>_email として表示_ |
| **mailgun.emails.clicked.total** <br>(count) | メール内のリンクの合計クリック数<br>_email として表示_ |
| **mailgun.emails.unsubscribed.total** <br>(count) | 配信を停止した受信者数<br>_email として表示_ |
| **mailgun.emails.complained.total** <br>(count) | 苦情を報告した受信者数<br>_email として表示_ |
| **mailgun.emails.stored.total** <br>(count) | 保存された受信メールの数<br>_email として表示_ |
| **mailgun.emails.hourly.accepted.total** <br>(count) | メールの 1 時間ごとの受け付け総数 (受信と送信の両方を含む)<br>_email として表示_ |
| **mailgun.emails.hourly.accepted.incoming** <br>(count) | 受信メールの 1 時間ごとの受け付け数<br>_email として表示_ |
| **mailgun.emails.hourly.accepted.outgoing** <br>(count) | 送信メールの 1 時間ごとの受け付け数<br>_email として表示_ |
| **mailgun.emails.hourly.delivered.total** <br>(count) | 送信され、受信者のメールサーバーにより受け付けられたメールの 1 時間ごとの総数<br>_email として表示_ |
| **mailgun.emails.hourly.delivered.smtp** <br>(count) | 送信され、受信者のメールサーバーにより受け付けられた SMTP メールの 1 時間ごとの総数<br>_email として表示_ |
| **mailgun.emails.hourly.delivered.http** <br>(count) | 送信され、受信者のメールサーバーにより受け付けられた HTTP メールの 1 時間ごとの総数<br>_email として表示_ |
| **mailgun.emails.hourly.delivered.optimized** <br>(count) | 送信され、受信者のメールサーバーにより受け付けられた送信時間最適化メールの 1 時間ごとの総数<br>_email として表示_ |
| **mailgun.emails.hourly.failed.temporary.total** <br>(count) | 受信者のメールサーバーへの送信が一時的に失敗したメールの 1 時間ごとの数<br>_email として表示_ |
| **mailgun.emails.hourly.failed.temporary.espblock** <br>(count) | メールサービスプロバイダーによりブロックされたメールの 1 時間ごとの数<br>_email として表示_ |
| **mailgun.emails.hourly.failed.permanent.total** <br>(count) | 受信者のメールサーバーへの送信が完全に失敗したメールの 1 時間ごとの数<br>_email として表示_ |
| **mailgun.emails.hourly.failed.permanent.suppress_bounce** <br>(count) | 前回バウンスしたために削除されたメールの 1 時間ごとの数<br>_email として表示_ |
| **mailgun.emails.hourly.failed.permanent.suppress_unsubscribe** <br>(count) | 前回配信停止されたために削除されたメールの 1 時間ごとの数<br>_email として表示_ |
| **mailgun.emails.hourly.failed.permanent.suppress_complaint** <br>(count) | 前回苦情が報告されたために削除されたメールの 1 時間ごとの数<br>_email として表示_ |
| **mailgun.emails.hourly.failed.permanent.bounce** <br>(count) | 配信されずにバウンスしたメールの 1 時間ごとの数<br>_email として表示_ |
| **mailgun.emails.hourly.failed.permanent.delayed_bounce** <br>(count) | 遅延後にバウンスしたメールの 1 時間ごとの数<br>_email として表示_ |
| **mailgun.emails.hourly.failed.permanent.webhook** <br>(count) | 失敗した Webhook リクエストの 1 時間ごとの数<br>_request として表示_ |
| **mailgun.emails.hourly.failed.permanent.optimized** <br>(count) | 失敗した送信時間最適化メールの 1 時間ごとの数<br>_email として表示_ |
| **mailgun.emails.hourly.opened.total** <br>(count) | 受信者によりメールが開かれた 1 時間ごとの合計回数<br>_email として表示_ |
| **mailgun.emails.hourly.clicked.total** <br>(count) | メール内のリンクの 1 時間ごとの合計クリック数<br>_email として表示_ |
| **mailgun.emails.hourly.unsubscribed.total** <br>(count) | 配信を停止した 1 時間ごとの受信者数<br>_email として表示_ |
| **mailgun.emails.hourly.complained.total** <br>(count) | 苦情を報告した 1 時間ごとの受信者数<br>_email として表示_ |
| **mailgun.emails.hourly.stored.total** <br>(count) | 保存された受信メールの 1 時間ごとの数<br>_email として表示_ |

### ログ

Mailgun のイベントは、ソース `mailgun` の下にログとして表示されます。

### イベント

Mailgun インテグレーションには、イベントは含まれません。

### サービス チェック

Mailgun インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ヘルプが必要ですか？[Datadog サポート](https://docs.datadoghq.com/help)にお問い合わせください。