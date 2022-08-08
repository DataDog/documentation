---
description: すぐに使える Synthetics ダッシュボードで、Synthetic テストの詳細を確認することができます。
further_reading:
- link: /synthetics/
  tag: ドキュメント
  text: Synthetic モニタリングについて
- link: /synthetics/ci_results_explorer
  tag: ドキュメント
  text: CI Results Explorer について学ぶ
kind: documentation
title: Synthetics ダッシュボード
---

## 概要

Synthetics テストを作成すると、Datadog は[データを収集][1]し、スタック、ブラウザアプリケーション、またはテスト全体のパフォーマンス、プライベートロケーション、イベントに関するダッシュボードを生成します。

Synthetics ダッシュボードにアクセスするには、[**Dashboard List**][2] の検索クエリで `Synthetics` をフィルターにかけるか、または [Synthetic モニタリング ホームページ ][4]の [**Dashboards**][3] でドロップダウンメニューをクリックしてください。

{{< img src="synthetics/dashboards/synthetic_tests_dashboards.png" alt="Synthetic モニタリングダッシュボード" style="width:100%;">}}

{{< whatsnext desc="すぐに使える Synthetics ダッシュボードには、以下のようなものが用意されています。" >}}
  {{< nextlink href="/synthetics/dashboards/api_test" >}}<u>API Test Performance</u>: エンドポイントやサービスを監視します。 {{< /nextlink >}}
  {{< nextlink href="/synthetics/dashboards/browser_test" >}}<u>Browser Test Performance</u>: ブラウザテストの Web パフォーマンス、サードパーティプロバイダーに関する洞察、コア Web バイタルを表示します。 {{< /nextlink >}}
  {{< nextlink href="/synthetics/dashboards/testing_coverage" >}}<u>Testing Coverage</u>: ブラウザテストのアプリケーションカバレッジを評価し、RUM と Synthetic のデータを使用して追跡するアプリケーションの人気要素を特定します。 {{< /nextlink >}}
  {{< nextlink href="/synthetics/dashboards/test_summary" >}}<u>Test Summary</u>: 地域、環境、チームごとの Synthetic テストに関する洞察を見ることができます。 {{< /nextlink >}}
{{< /whatsnext >}}

## Synthetics ダッシュボードの操作

[ダッシュボード][5]を複製し、テンプレート変数を使ってチーム、環境、地域ごとにカスタマイズすることが可能です。

### テンプレート変数

生成された Synthetics ダッシュボードには、自動的にデフォルトのテンプレート変数が含まれます。テンプレート変数のドロップダウンメニューを使用すると、ダッシュボードに表示されるデータを絞り込むことができます。例えば、`Browser` テンプレート変数を使えば、特定のブラウザの種類をフィルターにかけることができます。

### 保存済みビュー

Synthetics ダッシュボードには、デフォルトのビューがあります。ダッシュボードの表示を調整するには、**Edit** アイコンをクリックし、テンプレート変数をカスタマイズしてください。

編集が終わったら、** Save** をクリックし、左側のドロップダウンメニューから **Save selections as view** を選択します。保存したビューの名前を入力し、**Save** をクリックします。

### ダッシュボードのカスタマイズ

Synthetics ダッシュボードを複製するには、**Settings** アイコンをクリックし、**Clone dashboard** を選択します。ウィジェット、パワーパック、アプリを追加するには、一番下までスクロールして、**+** アイコンをクリックします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/metrics/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: https://app.datadoghq.com/synthetics/tests/
[4]: https://app.datadoghq.com/synthetics/tests
[5]: /ja/dashboards/