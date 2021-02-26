---
title: APM の DDSketch ベースのメトリクス
kind: ガイド
aliases:
  - /ja/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/
further_reading:
  - link: 'https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/'
    tag: ブログ
    text: DDSketch を使用した正確なパーセンタイルの計算
  - link: 'https://docs.datadoghq.com/metrics/distributions/'
    tag: Documentation
    text: ディストリビューションの詳細
  - link: 'https://docs.datadoghq.com/tracing/guide/metrics_namespace/'
    tag: Documentation
    text: トレースメトリクスの詳細
---
トレースメトリクスは、サービスとリソースに対して自動的に収集され、15 か月間保持されます。レイテンシーパーセンタイルは、個々の時系列として存在します。これらのパーセンタイルは、[Datadog ディストリビューションメトリクス][1]としても利用できます。パーセンタイルごとに異なるメトリクスを使用したり、サービス、リソース、または 2 番目のプライマリタグに個別のメトリクスを使用する代わりに、Datadog は次の単純なメトリクスを提供します。

- `trace.<SPAN_NAME>`:
  - *前提条件:* このメトリクスは、すべての APM サービスに存在します。
  - *説明:* さまざまな環境と 2 番目のプライマリタグにわたるすべてのサービス、リソース、バージョンのレイテンシー分布を表します。
  - *メトリクスタイプ:* [DISTRIBUTION][3]
  - *タグ:* `env`、`service`、`version`、`resource`、[2 番目のプライマリタグ][2]。

APM サービスページとリソースページは、このメトリクスタイプを自動的に使用します。これは、これらのメトリクスを使用してダッシュボードとモニターを強化できることを意味します。

**このメトリクスは私にとってどのような意味がありますか？**
- [ディストリビューションメトリクス][1]は、(ロールアップ機能の代わりに) 一定期間にわたる正確なパーセンタイル計算などの新機能を提供し、将来的により優れた視覚化と機能につながります。

**この新しいメトリクスの完全な履歴はどのように確認できますか？**
- Datadog は、新しいメトリクスの既存のクエリを、既存のレイテンシーメトリクスに基づく同等のクエリにまとめるため、複数のクエリを作成する必要はありません。

**レイテンシーの値に変化が見られますが、どうなっていますか？**
- Datadog ディストリビューションメトリクスは [DDSketch][4] を利用しています。これには、ランクエラー保証から相対エラー保証への変更が含まれます。その結果、すべてのパーセンタイル推定値が真のパーセンタイル値に近づくことが保証されます。
- 具体的には、この違いが最も顕著である p99 値の減少が見られることが予想される場合があります。新しい値は、正確な p99 値により密接に集中しています。
- 注意すべき点の 1 つは、APM メトリクスの計算は、コード内で計算される Datadog ディストリビューションカスタムメトリクスとまったく同じではないということです。計算はバックエンドで行われるため、いくつかの違いが発生する可能性があります。

**これらの新規メトリクスの利用環境**
- これらのメトリクスは米国のお客様にご利用いただけます。まもなく EU 地域のお客様に向けても公開予定です。
- Datadog がこれをより多くのお客様に展開するにつれて、ディストリビューションメトリクスによって APM サービスページとリソースページが強化されています。
- Datadog はダッシュボードおよびモニターからのすべての手動クエリを、お客様に代わって自動で新規メトリクスへと移行しています。既存のメトリクスは保持されるため、引き続き履歴ビューをご利用いただけます。

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/metrics/distributions/
[2]: /ja/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[3]: /ja/developers/metrics/types/?tab=distribution#metric-types
[4]: https://www.datadoghq.com/blog/engineering/computing-accurate-percentiles-with-ddsketch/