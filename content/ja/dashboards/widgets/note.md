---
title: ノート &amp; リンクウィジェット
kind: documentation
description: スクリーンボードにテキストを表示する
aliases:
  - /ja/graphing/widgets/note/
further_reading:
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/timeboards/
    tag: ドキュメント
    text: Timeboards
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
ノート &amp; リンクウィジェットは、[フリーテキストウィジェット][1]に似ていますが、より多くの書式オプションを利用できます。

## セットアップ

{{< img src="dashboards/widgets/note/using_link_note_widget.mp4" alt="ノートおよびリンクウィジェットのセットアップ" video="true" style="width:80%;" >}}

1. 表示したいテキストを入力します。マークダウンがサポートされています。
2. テキストサイズとノートの背景色を選択します。
3. ポインターの位置を選択します。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][2] ドキュメントをご参照ください。

ノートウィジェットの[ウィジェット JSON スキーマ定義][3]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/widgets/free_text/
[2]: /ja/api/v1/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/