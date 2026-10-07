---
description: Datadog プラットフォームの機能を活用して RUM の機能を最大限に引き出す方法をご紹介します。
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM エクスプローラーについて
title: プラットフォーム
---

## 概要

RUM アプリケーションのデータ収集を開始したら、Datadog プラットフォームの機能を活用して、RUM やその他の関連スタック全体のデータを可視化、監視、分析できます。

## ダッシュボードの作成
[ダッシュボード][1]を使用して、主要なパフォーマンスや使用量メトリクスを追跡、分析、表示します。

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="RUM ダッシュボード" >}}

## モニターの構成
[モニター][2]を構成してチームに通知し、アラートプラットフォームでアラートを一目で管理します。

{{< img src="monitors/monitor_types/rum/rum_multiple_queries_2.png" alt="カートページのエラー率についてアラートを出すように構成されたモニターです。このモニターには 2 つのクエリ (a、b) があり、数式 (a/b)*100 が含まれています。" style="width:80%;" >}}

## カスタムメトリクスの生成
[カスタムメトリクス][3]を生成して、アプリケーションの KPI を最大 15 か月にわたって追跡します。

{{< img src="real_user_monitoring/generate_metrics/generate_metric_example.png" alt="RUM ベースのカスタムメトリクスを生成する" width="80%" >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/platform/dashboards
[2]: /ja/monitors/types/real_user_monitoring/
[3]: /ja/real_user_monitoring/platform/generate_metrics