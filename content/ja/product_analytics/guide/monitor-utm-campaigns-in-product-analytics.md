---
description: Learn how to use Product Analytics & Session Replay to monitor the performance
  of UTM campaigns.
title: How to Monitor UTM Campaigns in Product Analytics
---

## 概要

Urchin Tracking Module (UTM) tracking is a parameter that can be added to a URL for tracking the performance of specific campaigns and identifying attribution paths for how visitors arrived on your website. This guide walks you through the types of UTM parameters Datadog Product Analytics collects and how you can use Product Analytics to monitor their use.

## データ収集

UTM campaigns are connected to [View][1] events in Product Analytics. The campaign data is collected automatically by the Browser SDK and can be viewed as facets in the Analytics Explorer. The UTM parameters Datadog collects can be defined as the following:

| フィールド                | タイプ   | 説明                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `view.url_query.utm_source`     | 文字列 | トラフィックのソースを追跡する URL のパラメーター。 |
| `view.url_query.utm_medium`        | 文字列 | トラフィックの発信元チャンネルを追跡する URL のパラメーター。    |
| `view.url_query.utm_campaign`  | 文字列 | そのビューに関連付けられた特定のマーケティングキャンペーンを識別する URL のパラメーター。              |
| `view.url_query.utm_content`  | 文字列 | マーケティングキャンペーン内でユーザーがクリックした特定の要素を特定する URL 内のパラメーター。           |
| `view.url_query.utm_term` | 文字列 | ユーザーが特定のキャンペーンをトリガーするために検索したキーワードを追跡する URL のパラメーター。             |

## ユースケース

### ユーザーがどのようにサイトに到達したかを特定する

ユーザーがどのようにサイトに到達したかを測定するには、'@view.url_query.utm_medium' ファセットを使用できます。このファセットは、ソーシャル、オーガニック、検索、Google キャンペーン、あるいはウェビナーのような特定のイベントなど、様々な媒体を表示します。異なる媒体から Web サイトにアクセスしたユーザーのセッションリプレイを観察し、様々なグループ間で顕著なパターンが発生しているかどうかを観察することができます。

### 特定のキャンペーンが他のキャンペーンよりトラフィックが多いかどうかを追跡する

{{< img src="real_user_monitoring/guide/UTM-campaign-tracking.png" alt="特定のキャンペーンページに対するすべてのビューのスクリーンショット" style="width:90%;">}}

As in the above query, you can count all views of a page, such as the landing page, where the campaign is running. This can help you understand if certain pages are getting more visits and you should increase advertising spend toward that specific page.

### 国別に UTM ソースを分析する

{{< img src="real_user_monitoring/guide/UTM-by-country.png" alt="国別の UTM ソースのスクリーンショット" style="width:90%;">}}

この例では、広告とオーガニックトラフィックの比較のように、キャンペーンの異なるソースを追跡することができます。さらに、国によって視聴パターンが変わるかどうかを把握するために、地理などのレイヤーを追加することもできます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/#views