---
title: フリーテキストウィジェット
kind: documentation
description: スクリーンボードにテキストを表示する
aliases:
  - /ja/graphing/widgets/free_text/
further_reading:
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
フリーテキストは、[スクリーンボード][1]に見出しを追加できるウィジェットです。

ダッシュボード全体の目的を示すためによく使用されます。

{{< img src="dashboards/widgets/free_text/free_text.png" alt="フリーテキスト" >}}

## セットアップ

{{< img src="dashboards/widgets/free_text/free_text_setup.png" alt="フリーテキストのセットアップ"  style="width:80%;">}}

### コンフィギュレーション

1. 表示するテキストを入力します。
2. テキストの書式を選択します。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][2] ドキュメントをご参照ください。

フリーテキストウィジェットの[ウィジェット JSON スキーマ定義][3]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/screenboard/
[2]: /ja/api/v1/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/