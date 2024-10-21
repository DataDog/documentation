---
further_reading:
- link: bits_ai/
  tag: ドキュメント
  text: Bits AI 概要
- link: bits_ai/query_examples
  tag: ドキュメント
  text: 自然言語クエリの例
- link: bits_ai/managing_incidents/
  tag: ドキュメント
  text: インシデントの管理
title: はじめに
---

## Datadog でのクエリ

### チャットパネルで

アプリ内でチャットパネルを開くには、ナビゲーションメニューの左下にある **Bits AI** をクリックするか、`Cmd + /` を使用してチャットパネルを表示または非表示にします。

Bits AI からの一部の応答には **suggestions** ボタンが含まれています。これをクリックすると、会話のコンテキストに適用される追加のクエリが表示されます。

{{< img src="bits_ai/getting_started/chat_panel_star_service.png" alt="「サービスにスターを付けるには？」という質問と Bits AI の回答を示す Bits AI チャットパネル" style="width:90%;">}}

### 検索バーで

一部の Datadog 検索バーは自然言語クエリをサポートしています。

{{< img src="bits_ai/getting_started/ai-enabled-search-bar.png" alt="自然言語クエリが有効になった検索バー" style="width:90%;">}}

利用可能な場合、検索バーにスペースを入力し、提案されたクエリから選択するか、新しいクエリを入力することで機能にアクセスできます。

{{< img src="bits_ai/getting_started/search-bar-with-ai-suggestions.png" alt="提案された自然言語クエリを表示する検索バー" style="width:90%;">}}

### モバイルアプリで

{{< img src="bits_ai/getting_started/bitsai_mobile_app.PNG" alt="Bits AI を使用したモバイルアプリのホームダッシュボードのビュー" style="width:40%;" >}}

モバイルアプリで Bits AI をクリックすると、ブラウザと同じクエリ機能にアクセスできます。

## Slack でのクエリ

1. [Datadog アカウントを Slack ワークスペースに接続][1]します。
1. Slack で `/dd connect` コマンドを使用して、接続するアカウントのリストを表示します。
1. ドロップダウンから Datadog アカウントの名前を選択します。
1. Bits AI に必要な追加の権限を承認します。

セットアップが完了すると、`@Datadog` に自然言語でクエリを送信できます: `@Datadog Are there any issues with example-service's dependencies?` (@Datadog example-service の依存関係に何か問題がありますか？)

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="Slack でのサービス依存関係のクエリ例の出力" style="width:60%;">}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/slack/?tab=applicationforslack