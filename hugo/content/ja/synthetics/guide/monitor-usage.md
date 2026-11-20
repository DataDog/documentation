---
description: Synthetic テストから生成される推定使用量メトリクスについて説明します。
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: ブログ
  text: エンドツーエンドテスト作成のベストプラクティス
- link: /synthetics/api_tests
  tag: ドキュメント
  text: API テストを作成する
- link: /synthetics/multistep
  tag: ドキュメント
  text: マルチステップ API テストを作成する
- link: /synthetics/browser_tests
  tag: ドキュメント
  text: ブラウザテストを作成する
title: 推定使用量メトリクスを使用する
---
## 概要 {#overview}

Synthetic テストには、使用量を追跡するために使用できる[推定使用量メトリクス][1]が用意されています。これらのメトリクスの主な用途は以下のとおりです。

* 使用量の経時的変化を把握します。
* Synthetic Monitoring の使用量への影響度が最も高いチーム、アプリケーション、サービスを可視化します。
* 請求に影響する可能性がある予期しない使用量の急増時に、アラートを送信します。

Synthetic Monitoring の使用量を可視化したり、使用量についてアラートを送信したりするには、次のクエリを使用します。

* [シングル API テスト][2]および[マルチステップ API テスト][3]: `sum:datadog.estimated_usage.synthetics.api_test_runs{*}.as_count()`

* [ブラウザテスト][4]: `sum:datadog.estimated_usage.synthetics.browser_test_runs{*}.as_count()`

  **注:** ブラウザの {{< tooltip glossary="テスト実行">}}の料金は、ステップ数に応じて決まります。詳細については、[料金に関するドキュメント][7]を参照してください。

さらに細かく絞り込むには、`team` や `application` など、テストに関連付けられたタグを使って、これらのメトリクスのスコープを設定するか、グループ化します。

これらのメトリクスを静的なしきい値を基準にグラフ化およびモニターできるほか、[異常検知][5]や[予測][6]といった機械学習ベースのアルゴリズムを使用して、使用量の増大が予想されるものである場合にアラートが送信されないようにすることができます。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/billing/usage_metrics/estimated_usage_metrics/#types-of-usage
[2]: /ja/synthetics/api_tests
[3]: /ja/synthetics/multistep
[4]: /ja/synthetics/browser_tests
[5]: /ja/monitors/types/anomaly/
[6]: /ja/monitors/types/forecasts
[7]: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#synthetic-monitoring-api--browser-what-counts-as-a-browser-test-run