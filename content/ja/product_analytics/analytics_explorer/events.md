---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: ドキュメント
  text: イベント検索
title: イベントサイドパネル
---

## 概要

The Product Analytics Explorer displays individual events in a side panel format:

{{< img src="real_user_monitoring/explorer/events/performance_side_panel.png" alt="Performance タブのアプリケーションパフォーマンスグラフとコア Web バイタル" width="80%" >}}

一般的なコンテキスト情報は、上部に記載されています。実際のイベントの内容を見るには、ウォーターフォールにスクロールしてください。

OS、国、コードバージョンなど、ユーザーとそのアプリケーションに関するコンテキストは、イベント発生時に取得されます。また、コンテキストはイベントそのものを指し、イベントタイプに応じた情報が含まれます。例えば、イベントサイドパネルにはビューパスが表示され、**Errors** サイドパネルにはエラーメッセージが表示されます。

## イベントのサイドパネル

To open the event side panel in the [Analytics Explorer][1], click on a table row in the **List** visualization type. Alternatively, click in the side panel list displayed after you click on **Show related events**. 

The event side panel displays all the information relative to a Product Analytics event. The waterfall displays related views and actions.

## 属性

Product Analytics collects contextual information by default. You can also add additional context attributes with the [Global Context API][2].

{{< img src="real_user_monitoring/explorer/events/attributes.png" alt="Attribute タブ" width="80%" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/explorer
[2]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context