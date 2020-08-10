---
title: ネットワークウィジェット
kind: documentation
description: ネットワークデータの時系列を表示します。
aliases:
  - /ja/graphing/widgets/network/
further_reading:
  - link: /network_performance_monitoring/
    tag: ドキュメント
    text: ネットワークパフォーマンスモニタリング
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
---
ネットワークウィジェットは、サービス、ホスト、コンテナ、その他の Datadog タグ間のトラフィックのボリュームおよび TCP 再送信カウントを含むネットワークデータの時系列を作成できるようにすることで、[ネットワークパフォーマンスモニタリング][1]機能を補完します。このウィジェットで作成された時系列は、ログ、トレース、プロセスデータの視覚化とともにダッシュボードに配置できます。

{{< img src="dashboards/widgets/network/network_1.png" alt="イメージ"  width="80%" >}}

**注**: このウィジェットは時系列の視覚化のみをサポートします。

## セットアップ

1. ドロップダウンメニューから "Network Traffic" を選択します。デフォルトでは、これは "Metric" に設定されています。

    {{< img src="dashboards/widgets/network/network_2.png" alt="イメージ"   width="80%" >}}

2. サービス、ホスト、コンテナ、アベイラビリティーゾーンなど、ネットワークページでグループ化するソースおよび宛先エンティティを選択します。

    {{< img src="dashboards/widgets/network/network_3.png" alt="イメージ"  width="80%" >}}

   また、ソースと宛先の検索バーにタグを追加することにより、特定のサービス、ホストなどに絞り込むことができます。

    {{< img src="dashboards/widgets/network/network_4-2.png" alt="イメージ"  width="80%" >}}

3. 表示するデータのタイプ（送信バイト、受信バイト、再送信）を選択します。

    {{< img src="dashboards/widgets/network/network_5-2.png" alt="イメージ"  width="80%" >}}

4. 視覚化設定を選択します。データを多くの色を使って、線、領域、またはバーとして表示することを選択できます。

    {{< img src="dashboards/widgets/network/network_6.png" alt="イメージ" responsive="false" style="width:60%;" >}}

## API

ネットワークウィジェットの[ウィジェット JSON スキーマ定義][2]は次のとおりです。

```text
{
  "viz": "timeseries",
  "requests": [
    {
      "network_query": {
        "index": "netflow-search",
        "search": {
          "query": ""
        },
        "groupBy": [
          {
            "facet": {source_entity_type}
          },
          {
            "facet": {destination_entity_type}
          }
        ],
        "compute": {
          "aggregation": "sum",
          "facet": {type of data you’d like to display}
        }
      },
      "style": {
        "palette": {color},
        "type": "solid",
        "width": "normal"
      },
      "type": "area",
      "conditional_formats": [],
      "aggregator": "avg"
    }
  ],
  "autoscale": true
}
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/network_performance_monitoring/
[2]: /ja/dashboards/graphing_json/widget_json/