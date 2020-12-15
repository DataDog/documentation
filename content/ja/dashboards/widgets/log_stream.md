---
title: ログストリームウィジェット
kind: documentation
description: Datadog のダッシュボードにフィルター処理したログストリームを表示する
aliases:
  - /ja/graphing/widgets/log_stream/
further_reading:
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
ログストリームは、定義したクエリと一致するログフローを表示します。

{{< img src="dashboards/widgets/log_stream/log_stream.png" alt="ログストリーム" >}}

## セットアップ

### コンフィギュレーション

{{< img src="dashboards/widgets/log_stream/log_stream_setup.gif" alt="ログストリームのセットアップ"  style="width:80%;">}}

ログストリームを絞り込むための[ログクエリ][1]を入力します。

### オプション

#### 列

[ファセット][2]と[メジャー][3]の値を列で表示します。

#### グローバルタイム

スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][3] ドキュメントをご参照ください。

ログストリームウィジェットの[ウィジェット JSON スキーマ定義][4]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/search/
[2]: /ja/logs/explorer/facets/
[3]: /ja/api/v1/dashboards/
[4]: /ja/dashboards/graphing_json/widget_json/