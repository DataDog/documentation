---
description: Synthetic テストで作成された推定使用量メトリクスについて説明します。
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
  tag: Documentation
  text: ブラウザテストを作成する
title: 推定使用量メトリクスを使用する
---

## 概要 

Synthetic テストには[推定使用量メトリクス][1]が付属しており、使用量を追跡できます。このメトリクスにより、特に次のことが可能になります。

* 時間の経過とともに使用量がどのように変化するかを理解します。
* Synthetics の使用量に最も寄与しているチーム、アプリケーション、またはサービスを視覚化します。
* 請求に影響を与える可能性のある予期しない使用量の急増について警告します。

Synthetics の使用量を視覚化または警告するには、次のクエリを使用します。

* [単一][2]および[マルチステップ API テスト][3]: `sum:datadog.estimated_usage.synthetics.api_test_runs{*}.as_count()`

* [ブラウザテスト][4]: `sum:datadog.estimated_usage.synthetics.browser_test_runs{*}.as_count()`.

より高いレベルの調整を行うには、これらのメトリクスを、`team` や `application など、テストに関連付けられたタグでスコープまたはグループ化します。

これらのメトリクスを静的なしきい値に対してグラフ化して監視したり、[異常検出][5]や[予測][6]などの機械学習ベースのアルゴリズムを使用して、予想される使用量の増加についてアラートを受け取らないようにすることができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/billing/usage_metrics/#types-of-usage
[2]: /ja/synthetics/api_tests
[3]: /ja/synthetics/multistep
[4]: /ja/synthetics/browser_tests
[5]: /ja/monitors/types/anomaly/
[6]: /ja/monitors/types/forecasts