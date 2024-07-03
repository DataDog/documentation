---
description: Discover performance issues in your application impacting end users with
  Watchdog Impact Analysis.
further_reading:
- link: https://www.datadoghq.com/blog/watchdog-impact-analysis/
  tag: Blog
  text: Understand the scope of user impact with Watchdog Impact Analysis
- link: real_user_monitoring/explorer/watchdog_insights/
  tag: Documentation
  text: Learn about Watchdog Insights for RUM
- link: real_user_monitoring/connect_rum_and_traces/
  tag: Documentation
  text: Connect RUM and Traces
title: Watchdog Impact Analysis
---

## 概要

Watchdog は、APM の異常を発見するたびに、RUM SDK から送信されるさまざまなレイテンシーとエラーのメトリクスを同時に分析し、その異常がユーザーが訪れる Web ページやモバイルページに悪影響を与えていないかどうかを評価します。

Watchdog がエンドユーザーエクスペリエンスに影響があると判断した場合、Watchdog APM Alert でその影響の概要を提供します。これには以下が含まれます。

- 影響を受ける RUM ビューのリスト
- 影響を受けるユーザーの推定数
- 必要であれば、影響を受けるユーザーに連絡を取ることができるように、影響を受けるユーザーのリストへのリンク。

{{< img src="watchdog/watchdog_impact_analysis.mp4" alt="ユーザーとビューのピルにカーソルを合わせて、影響を受けたユーザーと影響を受けたビューの数に関する詳細情報を表示するユーザー" video=true >}}

この機能は、すべての APM および RUM のユーザーに対して自動的に有効になります。Watchdog APM アラートがエンドユーザーへの影響と関連付けられると、影響を受ける**ユーザー**と**ビューパス**が Watchdog アラートの ** Impacts** セクションに表示されます。影響を受けるユーザーに連絡を取る必要がある場合、**ユーザー**をクリックすると、そのユーザーの連絡先が表示されます。**ビューパス**をクリックすると、影響を受ける RUM ビューにアクセスし、詳細情報を確認することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}