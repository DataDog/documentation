---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: ドキュメント
  text: イベント検索
title: イベントサイドパネル
---

## 概要

Product Analytics Explorer は、個々のイベントをサイドパネル形式で表示します。

{{< img src="real_user_monitoring/explorer/events/performance_side_panel.png" alt="Performance タブのアプリケーションパフォーマンスグラフとコア Web バイタル" width="80%" >}}

一般的なコンテキスト情報は、上部に記載されています。実際のイベントの内容を見るには、ウォーターフォールにスクロールしてください。

OS、国、コードバージョンなど、ユーザーとそのアプリケーションに関するコンテキストは、イベント発生時に取得されます。また、コンテキストはイベントそのものを指し、イベントタイプに応じた情報が含まれます。例えば、イベントサイドパネルにはビューパスが表示され、**Errors** サイドパネルにはエラーメッセージが表示されます。

## イベントのサイドパネル

Analytics Explorer でイベントのサイドパネルを開くには、**List** 可視化タイプのテーブル行をクリックします。あるいは、**Show related events** をクリックした後に表示されるサイドパネルの一覧をクリックします。

イベントのサイドパネルには、Product Analytics イベントに関するすべての情報が表示されます。ウォーターフォールには関連するビューとアクションが表示されます。

## 属性

Product Analytics ではデフォルトでコンテキスト情報を収集します。[Global Context API][2] を使用して、追加のコンテキスト属性を付加することもできます。

{{< img src="real_user_monitoring/explorer/events/attributes.png" alt="Attribute タブ" width="80%" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/explorer
[2]: /ja/real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context