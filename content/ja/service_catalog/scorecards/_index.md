---
aliases:
- /ja/tracing/service_catalog/scorecards
further_reading:
- link: /tracing/service_catalog/
  tag: ドキュメント
  text: サービスカタログ
- link: /api/latest/service-scorecards/
  tag: ドキュメント
  text: Scorecards API
- link: https://www.datadoghq.com/blog/service-scorecards/
  tag: ブログ
  text: Scorecards を使ってサービスの可観測性におけるベストプラクティスを優先し、推進する
- link: https://www.datadoghq.com/blog/datadog-custom-scorecards/
  tag: ブログ
  text: カスタム Scorecards でベストプラクティスを形式化する
- link: /continuous_integration/dora_metrics/
  tag: ドキュメント
  text: Datadog を使用して DORA メトリクスを追跡する
- link: https://www.datadoghq.com/blog/scorecards-dogfooding/
  tag: ブログ
  text: 大規模にベストプラクティスを定義し、共有するために Scorecards をどのように活用しているか
title: Scorecards
---

{{< callout url="#" btn_hidden="true" header="false" >}}
Scorecards はプレビュー版です。
{{< /callout >}}

{{< img src="/tracing/service_catalog/scorecard-overview.png" alt="Scorecards ダッシュボード (Production Readiness のすぐに使えるルールをハイライト表示)" style="width:90%;" >}}

## 概要

Scorecards はサービスのヘルスとパフォーマンスを向上させるために、モニタリング、優先順位付け、計画、そして効果的な情報共有を支援します。各 Scorecard は Production Readiness、Observability Best Practices、Documentation & Ownership のステータスを表示します。Service Catalog に定義されたメタデータを持つすべてのサービスは、設定された合否基準に基づいて自動的に評価されます。

Scorecards に使用するルールを選択し、レポートを生成してチームの Slack チャンネルへ直接送信することで、Scorecard の結果を定期的に報告できます。

## 開始する

{{< whatsnext desc="Scorecards をセットアップし、それがチームにどのように役立つか探ってみましょう。" >}}
{{< nextlink href="/service_catalog/scorecards/scorecard_configuration/" >}}Scorecards を構成する{{< /nextlink >}}
{{< nextlink href="/service_catalog/scorecards/custom_rules/" >}}カスタムルールを作成する{{< /nextlink >}}
{{< nextlink href="/service_catalog/scorecards/using_scorecards/" >}}Scorecards でできることを学ぶ{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ja/service_management/service_level_objectives/
[3]: https://app.datadoghq.com/monitors/recommended
[4]: /ja/tracing/services/deployment_tracking/
[5]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[6]: /ja/tracing/service_catalog/
[7]: /ja/getting_started/tagging/unified_service_tagging/
[8]: https://app.datadoghq.com/services/scorecard
[9]: /ja/service_management/workflows/
[10]: /ja/api/latest/service-scorecards/