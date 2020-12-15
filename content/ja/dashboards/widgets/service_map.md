---
title: サービスマップウィジェット
kind: documentation
description: 1 つのサービスについて、それを呼び出したすべてのサービスおよびそれから呼び出されたすべてのサービスを表すマップを表示する
widget_type: servicemap
aliases:
  - /ja/graphing/widgets/service_map/
further_reading:
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
このウィジェットは、1 つのサービスについて、それを呼び出したすべてのサービスおよびそれから呼び出されたすべてのサービスを表すマップを表示します。ウィジェットの中央にあるノードは、マッピング対象のサービスを表します。マッピング対象のサービスを呼び出したサービスは、左側に表示され、呼び出し元からサービスへ矢印が引かれます。マッピング対象のサービスから呼び出されたサービスは、右側に表示され、呼び出しの方向に矢印が引かれます。

サービスマップウィジェットは、タイムスコープに対応しません。常に、過去 2 週間に呼び出しを行ったサービスを表示します。また、直近の 1 時間について、サービスごとにリアルタイムにメトリクスが計算されます。

{{< img src="dashboards/widgets/service_map/test_service_map.png" alt="サービスマップのセットアップ"  style="width:80%;">}}

## セットアップ

{{< img src="dashboards/widgets/service_map/service_map.png" alt="サービスマップのセットアップ"  style="width:80%;">}}

### コンフィギュレーション

1. [環境][1]スコープ、[プライマリタグ][2] (アカウントに設定されている場合。または `*`)、および[サービス][3]名を選択します。
2. グラフのタイトルを入力します。

### 結果

ノードは、リクエスト率に基づいて相対的な大きさになります。ノードの円は、モニターステータスに基づく色で表されます。緑色は OK、黄色は警告、赤色はアラート、灰色はデータなしを表します。

マッピング対象のサービスに接続されているサービスは、リクエスト率に応じて中心から外側へと並べられます。デフォルトでは、リクエスト率が最も高い 5 つのサービスがラベル付きで表示されます。また、モニターでアラート状態になっているサービスも、必ずラベル付きで表示されます。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][4] ドキュメントをご参照ください。

サービスマップウィジェットの[ウィジェット JSON スキーマ定義][5]は次のとおりです。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/send_traces/
[2]: /ja/tracing/guide/setting_primary_tags_to_scope/
[3]: /ja/tracing/visualization/service/
[4]: /ja/api/v1/dashboards/
[5]: /ja/dashboards/graphing_json/widget_json/