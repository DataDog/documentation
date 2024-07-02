---
title: Synthetic ダッシュボード
description: すぐに使える Synthetic ダッシュボードで、Synthetic テストの詳細を確認することができます。  
aliases:
- /synthetics/dashboards
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
---

## 概要

Synthetic テストを作成すると、Datadog は[データを収集][1]し、スタック、ブラウザアプリケーション、またはテスト全体のパフォーマンス、プライベートロケーション、イベントに関するダッシュボードを生成します。

Synthetic ダッシュボードにアクセスするには、[**Dashboard List**][2] の検索クエリで `Synthetics` をフィルターするか、[Synthetic Monitoring & Continuous Testing ページ][4]の [**Dashboards**][3] のドロップダウンメニューをクリックします。

{{< img src="synthetics/dashboards/dashboards_homepage_blurred.png" alt="Synthetic Monitoring & Continuous Testing ホームページの Synthetic Monitoring ダッシュボード" style="width:100%;">}}

{{< whatsnext desc="すぐに使える Synthetic ダッシュボードには、以下のようなものが用意されています。" >}}
  {{< nextlink href="/synthetics/dashboards/api_test" >}}<u>API Test Performance</u>: エンドポイントやサービスを監視します。 {{< /nextlink >}}
  {{< nextlink href="/synthetics/dashboards/browser_test" >}}<u>Browser Test Performance</u>: ブラウザテストの Web パフォーマンス、サードパーティプロバイダーに関する洞察、コア Web バイタルを表示します。 {{< /nextlink >}}
  {{< nextlink href="/synthetics/dashboards/test_summary" >}}<u>Test Overview</u>: 地域、環境、チームごとの Synthetic テストに関する洞察を見ることができます。 {{< /nextlink >}}
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

[1]: /synthetics/metrics/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: https://app.datadoghq.com/synthetics/tests/
[4]: https://app.datadoghq.com/synthetics/tests
[5]: /dashboards/
[6]: /continuous_testing/explorer/saved_views/
[7]: /dashboards/template_variables/