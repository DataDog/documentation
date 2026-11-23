---
aliases:
- /ja/tracing/software_catalog/scorecards
- /ja/tracing/service_catalog/scorecards
- /ja/service_catalog/scorecards
- /ja/software_catalog/scorecards
cascade:
  site_support_id: idp
description: Catalog 内のエンティティを定義済みの基準に照らして自動的に評価し、ソフトウェアの健全性を測定して、チーム全体でエンジニアリングのベストプラクティスを促進します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: ブログ
  text: Datadog Forms を使用して、エンジニアリング組織全体でフィードバックを行動に変える
- link: /internal_developer_portal/catalog/
  tag: ドキュメント
  text: カタログ
- link: /api/latest/service-scorecards/
  tag: ドキュメント
  text: Scorecards API
- link: https://www.datadoghq.com/blog/service-scorecards/
  tag: ブログ
  text: Scorecards を使ってサービスの可観測性におけるベストプラクティスを優先し、推進する
- link: https://www.datadoghq.com/blog/datadog-custom-scorecards/
  tag: ブログ
  text: カスタム Scorecards でベストプラクティスを形式化する
- link: /delivery_performance/dora_metrics/
  tag: ドキュメント
  text: Datadog を使用して DORA Metrics を追跡する
- link: https://www.datadoghq.com/blog/scorecards-dogfooding/
  tag: ブログ
  text: 大規模にベストプラクティスを定義し、共有するために Scorecards をどのように活用しているか
title: Scorecards
---
{{< img src="/tracing/software_catalog/scorecard-overview-updated.png" alt="ルールのパフォーマンスを示す Scorecards ダッシュボード" style="width:90%;" >}}

## 概要 {#overview}

Scorecards は、ソフトウェアの健全性とパフォーマンスを測定し、継続的に改善するのに役立ちます。プラットフォームエンジニアは、Scorecards を作成して Catalog 内のエンティティを定義済みの基準に照らして自動敵に評価し、対応が必要な領域を明らかにできます。

Scorecards の定義方法は、完全に制御できます。Datadog プラットフォームが提供する、Production Readiness (本番環境への対応準備)、Observability Best Practices (監視可能性のベストプラクティス)、Documentation & Ownership (ドキュメントと所有権) に関する 3 つのコア Scorecards に加えて、デフォルトルールをカスタマイズしたり、新しいルールを作成したりして、チームの優先事項に合わせ、独自の運用基準を反映できます。この柔軟性により、組織のエンジニアリング文化や成熟度に合わせて Scorecards を調整できます。

Datadog は、Catalog に登録されているすべてのエンティティについて、デフォルトの Scorecards を 24 時間ごとに一連の合否基準に照らして評価します。これらのデフォルト評価は、いつでもオフにできます。カスタマイズしたルールについては、[Scorecards API][1] または [Datadog Workflow Automation][2] を使用して、データ入力、評価基準、評価頻度を構成できます。 

Datadog は、Scorecard の結果を自動レポートにまとめて Slack に直接配信できます。これにより、チーム内で認識をそろえ、改善状況を追跡し、課題に効率よく対応できます。

{{< callout url="https://www.datadoghq.com/product-preview/?product=internal-developer-portal-idp" header="近日公開予定の機能への早期アクセスにお申し込みください。" >}}
{{< /callout >}}

## 使い始める {#get-started}

{{< whatsnext desc="Scorecards を設定して、チームにどのように役立つかを確認します。" >}}
    {{< nextlink href="/internal_developer_portal/scorecards/scorecard_configuration/" >}}Scorecards の構成{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards/custom_rules/" >}}カスタムルールの作成{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards/using_scorecards/" >}}Scorecards でできることを確認{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/service-scorecards/
[2]: /ja/actions/workflows/