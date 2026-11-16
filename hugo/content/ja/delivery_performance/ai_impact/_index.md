---
aliases:
- /ja/dora_metrics/ai-impact/
- /ja/dora_metrics/ai_impact/
description: AI コーディングアシスタントがソフトウェアデリバリーのパフォーマンスに与える影響を測定します。
further_reading:
- link: /delivery_performance/ai_impact/setup
  tag: ドキュメント
  text: AI Impact をセットアップする
- link: /delivery_performance/dora_metrics/
  tag: ドキュメント
  text: DORA Metrics について
- link: /delivery_performance/dora_metrics/setup/
  tag: ドキュメント
  text: DORA Metrics のセットアップ
- link: /delivery_performance/dora_metrics/calculation/
  tag: ドキュメント
  text: DORA メトリクスの計算方法を学ぶ
- link: https://www.datadoghq.com/blog/devex-measurement-pitfalls-ai-era/
  tag: ブログ
  text: AI 時代に開発者エクスペリエンスを測定する際に避けるべき 5 つの落とし穴
- link: https://www.datadoghq.com/blog/ai-impact/
  tag: ブログ
  text: Datadog AI Impact を使用して、AI コーディングツールがソフトウェアデリバリーに与える真の影響を測定する
- link: https://www.datadoghq.com/blog/how-to-measure-developer-experience-in-the-ai-era/
  tag: ブログ
  text: AI 時代の開発者エクスペリエンスの測定方法
title: AI Impact
---
{{< callout url="#" btn_hidden="true" header="プレビューに参加しましょう。" >}}
AI Impact はプレビュー中で、Datadog のお客様すべてにご利用いただけます。
{{< /callout >}}

## 概要{#overview}

AI Impact は、コーディングアシスタント、レビューエージェント、自律型エージェントなどの AI コーディングツールが、ソフトウェアデリバリーのパフォーマンスにどのような影響を与えるかを測定します。Datadog では、数種類のソースから AI の貢献を検出します。ソースには、コミットメタデータの共同作成者パターン、プロバイダーインテグレーション、プルリクエストラベル、およびユーザー自身が送信するデータなどがあります。

## はじめに{#getting-started}

Datadog は、[DORA Metrics][1] がデプロイメント、コミット、プルリクエストのデータでセットアップされた後、一部の AI アクティビティを自動的に検出します。AI ツールは、一般に AI の関与を示す、コミット内の共同作成者の署名、レビューコメント、およびその他の作成者情報によって識別されます。組織内の AI アクティビティをより完全に把握するには、「[AI Impact をセットアップする][2]」を参照して、特定の AI ツールとその貢献を識別するソースとマッピングルールを構成してください。

## インパクトメトリクス {#impact-metrics}

| メトリクス | 定義 |
|--------|------------|
| AI-assisted PRs (AI 支援 PR) | 少なくとも 1 つの AI 支援のコミットを含む PR を、PR の総数で割った値。|
| PR Throughput (PR スループット) | AI 支援の作成者の 1 日あたり、ユーザー 1 人あたりの PR デプロイ数の、非 AI 支援の作成者のデプロイ数に対する比率。|
| PR Cycle Time (PR サイクルタイム) | AI 支援の PR の PR の最初のコミットからマージまでの時間の中央値の、非 AI 支援の PR の中央値に対する比率。|
| Change Failure Rate (変更失敗率) | 各デプロイメントにおける AI 支援のコミットの割合で重み付けされた失敗率の、非 AI 支援のコミットの重みづけされた失敗率に対する比率。たとえば、失敗したデプロイメントの 10 個のコミットのうち 3 個で AI が利用されている場合、その失敗の 30% のみが AI に起因するものとなります。|
| Recovery Time (復旧時間) | AI 支援のコミットを含む失敗したデプロイメントの復旧時間の中央値の、AI 支援のコミットを含まないデプロイメントの中央値に対する比率。|

<div class="alert alert-info">変更失敗率には、コード変更に関連付けられたデプロイメントのみが含まれます。構成のみまたはインフラストラクチャーのデプロイメントは、AI がコード関連の失敗に与える影響が比較に反映されるようにするために除外されています。これは、すべてのデプロイメントタイプが考慮される標準の DORA 変更失敗率とは異なります。</div>

<div class="alert alert-info">GitHub の場合のみ、PR レベルのメトリクスでは、コミットが完全にボットによって作成された PR が除外されます。これにより、自動アクティビティが非 AI の基準から除外されます。</div>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/delivery_performance/dora_metrics/setup/
[2]: /ja/delivery_performance/ai_impact/setup/