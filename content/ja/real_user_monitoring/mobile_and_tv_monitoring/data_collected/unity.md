---
aliases:
- /ja/real_user_monitoring/unity/data_collected/
code_lang: unity
code_lang_weight: 30
description: Unity Monitoring で収集されるデータについて学びます。
further_reading:
- link: https://github.com/DataDog/dd-sdk-unity
  tag: ソースコード
  text: dd-sdk-unity のソースコード
- link: real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM データの調査方法
title: RUM Unity で収集されるデータ
type: multi-code-lang
---
## 概要

RUM 向け Datadog Unity SDK は、関連するメトリクスおよび属性を伴うイベントを生成します。メトリクスは、イベントに関連する測定に使用できる定量的な値です。属性は定量化できない値で、RUM Explorer でメトリクス データをスライスするために使用されます (group by)。

Unity Monitoring のデータの大部分は、RUM 向け Datadog iOS および Android SDK によってネイティブに収集され、同一の保持期間で保持されます。

* iOS イベント固有のメトリクスや属性については、[RUM iOS データ収集][1]を参照してください。
* Android イベント固有のメトリクスや属性については、[RUM Android データ収集][2]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/ios/data_collected/#event-specific-metrics-and-attributes
[2]: /ja/real_user_monitoring/android/data_collected/#event-specific-metrics-and-attributes