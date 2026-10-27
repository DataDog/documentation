---
description: Product Analytics 内のクライアント側のデータを補完するために、サーバーからカスタムイベントを送信します。
further_reading:
- link: /api/latest/product-analytics/#send-server-side-events
  tag: API リファレンス
  text: Product Analytics API
- link: /product_analytics/
  tag: ドキュメント
  text: Product Analytics
- link: /product_analytics/data_collected/
  tag: ドキュメント
  text: Product Analytics で収集されるデータ
title: サーバー側イベントの追跡
---
## 概要 {#overview}

サーバー側イベントとは、サーバーから [Product Analytics API][1] を通じて送信されるカスタムイベントです。ページビューやボタンクリックなど、RUM SDK によってキャプチャされるクライアント側イベントとは異なり、サーバー側イベントは、チェックアウトの完了や決済の処理など、バックエンドで発生するアクションを追跡します。

サーバー側イベントは、以下の目的で使用します。

- クライアントサイドの動作とは無関係に、サーバー上の信頼できる唯一の情報源でイベントをキャプチャする
- 決済確認やサブスクリプションの更新など、クライアントサイドに対応する処理が存在しないバックエンドのアクションを追跡する
- クライアント側のデータにサーバー側のコンテキストを補完する

## 前提条件 {#prerequisites}

サーバー側イベントを送信する前に、アプリケーションの [Datadog SDK をセットアップ][2]し、[Product Analytics を有効化][3]します。

## サーバー側イベントの送信{#send-server-side-events}

サーバーからイベントを送信するには、[Product Analytics API][1] を使用します。サーバー側イベントをクライアントセッションに関連付けるには、クライアントのアクティブな RUM セッションから `session_id` を含めます。セッション ID を含めることで、サーバー側イベントがクライアント側のデータに紐付けられ、ユーザージャーニーの全容を視覚化できます。

認証、必須フィールド、リクエストパラメーターを含む完全な API リファレンスについては、[サーバー側イベントの送信][1]を参照してください。

## サーバー側イベントの分析 {#analyze-server-side-events}

サーバー側イベントを送信すると、Product Analytics の任意のチャートで利用できるようになります。イベントピッカーで **Server Events** を選択し、分析のスコープをサーバー側データに絞り込みます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/product-analytics/#send-server-side-events
[2]: /ja/product_analytics/#track-client-side-events-sdk
[3]: /ja/product_analytics/#enable-product-analytics