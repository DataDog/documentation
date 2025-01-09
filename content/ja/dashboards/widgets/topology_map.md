---
aliases:
- /ja/dashboards/widgets/service_map
description: 1 つのサービスについて、それを呼び出したすべてのサービスおよびそれから呼び出されたすべてのサービスを表すマップを表示する
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築
- link: /tracing/services/services_map/
  tag: ドキュメント
  text: サービスマップ
title: Topology Map ウィジェット
widget_type: topology_map
---

Topology Map ウィジェットには、データソースとその関係が視覚化されており、データがアーキテクチャ内をどのように流れているかを理解するのに役立ちます。

## セットアップ

### 構成

1. グラフ化するデータを選択します。
    * サービスマップ: ウィジェットの中央にあるノードは、マップされたサービスを表します。マッピングされたサービスを呼び出すサービスは、呼び出し元からサービスへの矢印で表示されます。サービスマップの詳細については、[APM のサービスマップ機能][1]を参照してください。

2. グラフのタイトルを入力します。

## API

このウィジェットは **[Dashboards API][2]** で使用できます。[ウィジェット JSON スキーマ定義][3]については、以下の表を参照してください。

{{< dashboards-widgets-api >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/services/services_map/
[2]: /ja/api/latest/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/