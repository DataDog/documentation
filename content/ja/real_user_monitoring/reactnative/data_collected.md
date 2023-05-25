---
description: React Native Monitoring で収集されるデータについて説明します。
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: dd-sdk-reactnative ソースコード
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: RUM データの調査方法
kind: documentation
title: RUM React Native データ収集
---
## 概要

Datadog React Native SDK for RUM は、関連するメトリクスと属性を持つイベントを生成します。メトリクスとは、イベント関連の計測に使用される定量化可能な値のことです。属性は、RUM エクスプローラーでメトリクスデータをスライス（グループ化）するために使用する定量化できない値です。

React Native Monitoring のデータのほとんどは、RUM 用のネイティブな Datadog iOS および Android SDK によって収集され、同じ期間保持されます。

* iOS イベント固有のメトリクスや属性については、[RUM iOS データ収集][1]を参照してください。
* Android イベント固有のメトリクスや属性については、[RUM Android データ収集][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/ios/data_collected/#event-specific-metrics-and-attributes
[2]: /ja/real_user_monitoring/android/data_collected/#event-specific-metrics-and-attributes