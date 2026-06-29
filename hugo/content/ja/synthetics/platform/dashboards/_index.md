---
aliases:
- /ja/synthetics/dashboards
description: すぐに使える Synthetic ダッシュボードで、Synthetic テストの詳細を確認することができます。
further_reading:
- link: /synthetics/
  tag: ドキュメント
  text: Synthetic モニタリングについて
- link: /continuous_testing/explorer/
  tag: ドキュメント
  text: Learn about the Synthetic Monitoring & Testing Results Explorer
- link: /continuous_testing/explorer/saved_views
  tag: ドキュメント
  text: 保存ビューについて
title: Synthetic ダッシュボード
---

## 概要

Synthetic テストを作成すると、Datadog は[データを収集][1]し、スタック、ブラウザアプリケーション、またはテスト全体のパフォーマンス、プライベートロケーション、イベントに関するダッシュボードを生成します。

Access your Synthetic Monitoring dashboards by filtering for `Synthetic Monitoring` in the search query of the [**Dashboard List**][2] or by clicking on the dropdown menu under [**Dashboards**][3] on the [Synthetic Monitoring & Continuous Testing page][4].

{{< img src="synthetics/dashboards/dashboards_homepage_blurred.png" alt="Synthetic Monitoring & Continuous Testing ホームページの Synthetic Monitoring ダッシュボード" style="width:100%;">}}

{{< whatsnext desc="You can explore the following out-of-the-box Synthetic dashboards:" >}}
  {{< nextlink href="/synthetics/dashboards/api_test" >}}<u>API Test Performance</u>: Monitor your endpoints and services. {{< /nextlink >}}
  {{< nextlink href="/synthetics/dashboards/browser_test" >}}<u>Browser Test Performance</u>: View your browser tests' web performance, insights into third-party providers, and Core Web Vitals. {{< /nextlink >}}
  {{< nextlink href="/synthetics/dashboards/test_summary" >}}<u>Test Overview</u>: See insights about your Synthetic Monitoring tests by region, environment, or team. {{< /nextlink >}}
{{< /whatsnext >}}

## Synthetic ダッシュボードのカスタマイズ

[ダッシュボード][5]を複製し、テンプレート変数を使ってチーム、環境、地域ごとにカスタマイズできます。また、ビューをカスタマイズし、複製したダッシュボードの[保存ビュー][6]を作成することもできます。

### テンプレート変数の編集

生成された Synthetic ダッシュボードには、自動的にデフォルトのテンプレート変数が含まれます。テンプレート変数のドロップダウンメニューを使用すると、ダッシュボードに表示されるデータを絞り込むことができます。例えば、`Browser` テンプレート変数を使えば、特定のブラウザの種類をフィルターにかけることができます。詳細については、[テンプレート変数][7]のドキュメントを参照してください。Synthetic ダッシュボードを複製するには、**Configure** アイコンの隣にある **Clone** ボタンをクリックします。

{{< img src="synthetics/dashboards/clone.png" alt="ダッシュボードの複製" style="width:100%;">}}

Synthetic ダッシュボードにはデフォルトのビューがあり、これは調整できます。**Edit** アイコンをクリックして編集モードに入り、テンプレート変数をカスタマイズします。

{{< img src="synthetics/dashboards/synthetics_template_variable_edit.png" alt="Synthetic ダッシュボードでテンプレート変数を編集します" style="width:100%;">}}

### 保存ビューの作成

編集が終わったら、**Done** をクリックし、左側のドロップダウンメニューから **Save selections as view** を選択します。

{{< img src="synthetics/dashboards/saved_view.png" alt="Synthetic ダッシュボードに保存ビューを作成します" style="width:60%;">}}

保存ビューの名前を入力し、**Save** をクリックします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/metrics/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: https://app.datadoghq.com/synthetics/tests/
[4]: https://app.datadoghq.com/synthetics/tests
[5]: /ja/dashboards/
[6]: /ja/continuous_testing/explorer/saved_views/
[7]: /ja/dashboards/template_variables/