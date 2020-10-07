---
title: APM 使用量の推定と制御
kind: documentation
---
Datadog では、お客様のニーズに合うさまざまな料金プランを用意しています。詳細については、[料金プランのページ][1]を参照してください。
APM および分散型トレーシングの請求の仕組みについては、[APM 料金][2]の APM ドキュメントをお読みください。

App Analytics は、[Analyzed Span][3] のカウントに基づいて請求されます。次のツールを使用して、生成される Analyzed Span の数を手動で制御するために、サービスごとに [App Analytics][4] を構成することを選択できます。ただし、これにより、これらのサービスまたはインテグレーションの App Analytics の機能が制限されることに注意してください。

## Analyzed Span の保持を選択する

App Analytics の料金プランは、Analyzed Span の保持ポリシーに依存します。Analyzed Span が保持される期間を選択することにより、請求を制御できます。

| Analyzed Span の保持 | 料金                                    |
|--------------------------|--------------------------------------------|
| 15 日（デフォルト）        | Analyzed Span  100 万件あたり 1.70 ドル / 月 |
| 3 日                   | Analyzed Span 100 万件あたり 1.06 ドル / 月 |
| 7 日                   |  Analyzed Span 100 万件あたり 1.27 ドル / 月 |
| 30 日                  | Analyzed Span 100 万件あたり 2.50 ドル / 月 |

料金は年間請求を反映しています。お客様のアカウントのボリュームディスカウントについては、[営業担当者][5]または[カスタマーサクセス][6]マネージャーまでお問い合わせください。

## Analyzed Span Estimator

[Analyzed Span Estimator][7] は、使用状況とコストを管理しながら、App Analytics で構成するサービスを決定するのに役立つように設計されています。

1 日または 1 か月あたりのサービスごとに送信されることが予想される分析済みスパンの総数を推定するには、次の手順を実行します。

1. Analyzed Span のボリュームを推定するすべてのホストで APM を有効にします。
2. [**Analyzed Span Estimator** ビュー][7]で、"App Analytics Status" 列を "Not Enabled" で並べ替えます
3. **Total Estimated APM Volume** は、すべてのサービスの 1 日および 1 か月あたりの Analyzed Span の推定合計量を示します。サービスに対応する各行は、そのサービスの Analyzed Span の 1 日あたりの推定量を表します。

    {{< img src="account_management/billing/usage_control_apm/apm_span_estimator.png" alt="Analyzed Span Estimator" >}}

4. 総コストを見積もるには、合計量と[分析スパンの保持料金][8]を掛けます。

たとえば、1 か月あたり 1,750,000,000 の Analyzed Span が 15 日間ある場合（デフォルトの保持期間）、以下を計算できます。

1,750,000,000 Analyzed Span / 月 * $1.70 / 100 万 Analyzed Span = App Analytics に対して **$2,975 / 月**

## Analyzed Span のフィルタリング

[スパンのフィルタリング][9]は、デフォルトで 100% のスループットで Analyzed Span を送信するように構成されています。たとえば、100 個のリクエストを持つ Java サービスは、それぞれの `servlet.request` スパンが Analyzed Span を生成するため、`servlet.request` スパンから 100 個の Analyzed Span を生成します。

コスト管理のために、[Analyzed Span のフィルタリング][9]により、課金対象の Analyzed Span の数を減らすことができます。これは[トレースサンプリング][10]には影響しません。サービスが 100% 未満でフィルタリングされている場合、 Analyzed Span 分析はデフォルトで推定値を表示するようにスケールアップされるため、ユーザーはフィルタリングされた値を表示することができます。

また、[これらの言語固有の手順][11]を使用して、サービスごと、またはコードのインテグレーションごとに App Analytics を有効にすることもできます。

[1]: https://www.datadoghq.com/pricing
[2]: /ja/account_management/billing/apm_distributed_tracing/
[3]: /ja/tracing/visualization/#apm-event
[4]: /ja/tracing/app_analytics/
[5]: mailto:sales@datadoghq.com
[6]: mailto:success@datadoghq.com
[7]: https://app.datadoghq.com/apm/settings
[8]: /ja/account_management/billing/usage_control_apm/#choose-analyzed-span-retention
[9]: https://app.datadoghq.com/apm/settings?env=datadoghq.com&activeTab=0
[10]: /ja/tracing/guide/trace_sampling_and_storage/
[11]: /ja/tracing/app_analytics/?tab=java#configure-additional-services-optional