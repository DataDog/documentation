---
categories:
- issue tracking
- Collaboration
- exceptions
ddtype: クローラー
dependencies: []
description: Sentry 例外を Datadog イベントストリームに表示
doc_link: https://docs.datadoghq.com/integrations/sentry/
git_integration_title: sentry
has_logo: true
integration_title: Sentry
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: sentry
public_title: Datadog-Sentry インテグレーション
short_description: Sentry 例外を Datadog イベントストリームに表示
version: '1.0'
---

{{< img src="integrations/sentry/sentry.png" alt="sentry event"  >}}

## 概要

Sentry を Datadog に接続して、以下のことができます。

* ストリームで例外をリアルタイムに確認できます。
* グラフで例外を検索できます。
* 例外についてチームで議論できます。

## セットアップ
### インストール

次の手順で Sentry インテグレーションをセットアップします。

1. Sentry にログインします。
2. プロジェクトに移動します。
3. プロジェクトの設定ページに移動します。
4. 左側で、Legacy Integrations をクリックします。
5. Webhooks インテグレーションまで下にスクロールし、スライダトグルをクリックしてこのインテグレーションを有効化したら、Configure Plugin をクリックします。
7. **Callback URLs'** の下に、`https://app.datadoghq.com/intake/webhook/sentry?api_key=<YOUR_DATADOG_API_KEY>` を入力します。
8. **Save changes** をクリックします。

デフォルトでは、Sentry は、(既にログに記録された例外の新しいインスタンスではなく) 新しい例外が発生するたびに、Webhook にイベントデータを ping します。別の (または追加の) トリガーが必要な場合は、プロジェクト設定の Alerts セクションで構成できます。

### Sentry エラーへのホスト名の追加 (オプション)

Sentry が報告するサーバー名が Datadog が認識するホスト名と一致しないことがあります。これを解決するには、各イベントにアタッチされている `server_name` タグにカスタム値を設定します。

別の方法として、イベントに `hostname` タグを設定して、Sentry のデフォルトの `server_name` の値を維持したまま、別のホスト名を使用することもできます。ご使用の言語でこれを行う方法については、[Sentry のイベントのタグ付けに関するドキュメント][1]を参照してください。

## トラブルシューティング
### Sentry エラーが Datadog に表示されないのはなぜですか

おそらく、Sentry Webhook がトリガーされていません。この原因として、以下が考えられます。

* **アラートはルールがトリガーされたときにのみ送信される**<br>
たとえば、ルール条件が「イベントが最初に表示されたとき」である場合、新しい問題が作成されるまでアラートはディスパッチされません。(プロジェクトが受け取っている一意の問題の数によっては、これには時間がかかる場合があります。)

* **通知インテグレーションが無効になっている**<br>
通知インテグレーションが、ルールアクションで特定のサービスとして有効になっているか、「すべての有効なサービス」に含まれていることを確認してください。

[1]: https://docs.sentry.io/enriching-error-data/context/?platform=javascript#tagging-events


{{< get-dependencies >}}
