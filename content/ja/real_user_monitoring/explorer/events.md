---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: ドキュメント
  text: イベント検索
title: イベントサイドパネル
---

## 概要

Real User Monitoring (RUM) エクスプローラーは、このサイドパネル形式を含む個々のイベントを表示します。

{{< img src="real_user_monitoring/explorer/events/performance_side_panel.png" alt="Performance タブのアプリケーションパフォーマンスグラフとコア Web バイタル" width="80%" >}}

一般的なコンテキスト情報は、上部に記載されています。実際のイベントの内容を見るには、ウォーターフォールにスクロールしてください。

OS、国、コードバージョンなど、ユーザーとそのアプリケーションに関するコンテキストは、イベント発生時に取得されます。また、コンテキストはイベントそのものを指し、イベントタイプに応じた情報が含まれます。例えば、イベントサイドパネルにはビューパスが表示され、**Errors** サイドパネルにはエラーメッセージが表示されます。

## イベントのサイドパネル

[RUM エクスプローラー][1]でイベントサイドパネルを開くには、**List** 視覚化タイプのテーブルの行をクリックします。または、**Show related events** をクリックした後に表示されるサイドパネルのリスト内をクリックします。

イベントサイドパネルには、RUM のイベントに関連するすべての情報が表示されます。ウォーターフォールは、関連するリソース、エラー、ビュー、アクションを表示し、エラーが発生したイベントやロード時間が長すぎるイベントをタイムライン形式で可視化します (ビューミニマップ)。

また、ウォーターフォールの時間セレクターをドラッグアンドドロップすることで、時間軸を拡大し、関心のあるイベントに焦点を当てることができます。

{{< img src="real_user_monitoring/explorer/events/events_side_panel-1.mp4" alt="イベントのタイミングとモバイルバイタル" video="true" width="80%" >}}

## 属性

RUM は、デフォルトでコンテキスト情報を収集します。また、その他のコンテキスト属性は、[グローバルテキスト API][2] と一緒に追加できます。

{{< img src="real_user_monitoring/explorer/events/attributes.png" alt="Attribute タブ" width="80%" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/explorer
[2]: /ja/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#global-context