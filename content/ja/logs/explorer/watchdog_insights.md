---
aliases:
- /ja/logs/explorer/insights
description: 調査を開始またはフォローアップする地点に関するインサイトを得る
further_reading:
- link: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/
  tag: ブログ
  text: Watchdog Insights を使用してログ調査を加速します
- link: logs/explorer/side_panel
  tag: Documentation
  text: ログサイドパネルの詳細情報
- link: logs/explorer/#list-of-logs
  tag: Documentation
  text: ログエクスプローラーの詳細
title: ログ用 Watchdog Insights
---

## 概要

Datadog Log Management は、ログエクスプローラーでコンテキストに沿ったインサイトを提供し、インシデントの迅速な解決を支援する Watchdog Insights を提供します。Watchdog Insights は、ユーザーのサブセットに影響を与える疑わしい異常値、外れ値、潜在的なパフォーマンスのボトルネックを表面化することにより、専門知識と直感を補完します。

{{< img src="logs/explorer/watchdog_insights/insights-for-log-explorer.png" alt="Watchdog Insights のバナーと 5 つのログ異常が表示されたログエクスプローラー" style="width:100%;" >}}

## ナビゲーション

Watchdog Insights バナーが[ログエクスプローラー][1]に表示され、現在のクエリに関するインサイトが表示されます。

{{< img src="logs/explorer/watchdog_insights/banner_collapsed.png" alt="折りたたみ表示時の Watchdog Insights バナー" style="width:100%;" >}}

すべてのインサイトの概要を確認するには、Watchdog Insight バナーを展開します。

{{< img src="logs/explorer/watchdog_insights/banner_expanded.png" alt="3 つのエラー外れ値を示す Watchdog Insights バナー" style="width:100%;" >}}

Watchdog Insights サイドパネル全体にアクセスするには、**View all** をクリックします。

{{< img src="logs/explorer/watchdog_insights/side_panel.png" alt="Watchdog Insights のサイドパネルに表示されるエラー外れ値に関する詳細な情報" style="width:100%;" >}}

すべてのインサイトには、インタラクションが埋め込まれ、トラブルシューティング情報が記載されたサイドパネルが付属しています。インサイトインタラクションとサイドパネルは、Watchdog Insights タイプによって異なります。

## インサイトの種類

### ログ異常検出

取り込まれたログはインテークレベルで分析され、Watchdog は検出されたパターンと `environment`、`service`、`source`、`status` タグの集計を実行します。
これらの集計されたログは、以下のような異常な動作がないかスキャンされます。

- 警告またはエラーステータスを持つログの出現。
- 警告やエラーステータスのログの急増。


ログは、検索コンテキストとロールに適用される制限に一致する、ログエクスプローラーのインサイトとして表示されます。

{{< img src="logs/explorer/watchdog_insights/log-anomalies-light.mp4" alt="特定のインサイトの詳細をスクロールしているユーザー" video="true">}}

特定のインサイトをクリックすると、検出された異常の詳細な説明と、その異常の原因となるパターンのリストが表示されます。

Watchdog が特に重大と判断した異常は、[Watchdog アラートフィード][6]にも表示され、[Watchdog ログモニター][7]を設定することで通知を受けることができます。
重大な異常は次のように定義されます。

* エラーログが含まれている
* 10 分以上続いている (一時的なエラーを除外するため)
* 大幅に増加している (小幅な増加を除外するため)

ログエクスプローラーでのログ検索については、[ログ検索構文][2]、[カスタムタイムフレーム][3]を参照してください。

### エラー外れ値

エラー外れ値は、現在のクエリに一致するエラーの特性を含む[ファセットタグまたは属性][4]などのフィールドを表示します。エラー間で統計的に過大評価されている `key:value` ペアは、問題の根本原因へのヒントになります。

典型的なエラー外れ値の例として、`env:staging`、`docker_image:acme:3.1`、`http.useragent_details.browser.family:curl` が挙げられます。

**バナーカード**ビューでは、次のことがわかります。

  * フィールド名。
  * フィールドが寄与するエラーと全体的なログの割合。

{{< img src="logs/explorer/watchdog_insights/error_outlier_s_card.png" alt="エラー全体の 73.3% を占める赤いバーと、8.31% を占める青いバーを示すエラー外れ値カード" style="width:50%;" >}}

**サイドパネルカード**ビューでは、エラーログのメイン[ログパターン][5]をフィールドで確認できます。

{{< img src="logs/explorer/watchdog_insights/error_outlier_l_card.png" alt="エラー外れ値カード (L)" style="width:100%;" >}}

**フルサイドパネル**ビューでは、次のことがわかります。

  * フィールドを含むエラーログの時系列。
  * エラーログに関連付けられることが多いタグ。
  * [ログパターン][5]の包括的なリスト。

{{< img src="logs/explorer/watchdog_insights/error_outlier_side_panel.png" alt="エラー外れ値サイドパネル" style="width:100%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://app.datadoghq.com/logs
[2]: /ja/logs/search-syntax
[3]: /ja/dashboards/guide/custom_time_frames
[4]: /ja/logs/explorer/facets/
[5]: /ja/logs/explorer/analytics/patterns
[6]: https://app.datadoghq.com/watchdog
[7]: /ja/monitors/types/watchdog/