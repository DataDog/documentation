---
title: 開発者
kind: documentation
description: 構成やコードのサンプルなど、Datadog 向けの開発のための参考資料
aliases:
  - /ja/developers/faq/how-to-monitor-logs-with-loggly-live-tail-and-datadog'
further_reading:
  - link: /api
    tag: Documentation
    text: Datadog API
---
## 概要

開発者セクションには、Datadog 向けの開発のための参考資料があります。

## Data

### 非サポート

開発者には、サポートされていないデータを Datadog に送信する際、いくつかの選択肢があります。考慮すべき点として、労力（開発にかかる時間）と予算（カスタムメトリクスのコスト）があります。

| タイプ                | 工数 | カスタムメトリクス | 言語 |
|---------------------|--------|----------------|----------|
| DogStatsD           | 最小 | 〇            | 任意      |
| カスタムチェック        | 小    | 〇            | Python   |
| プライベートインテグレーション | 中 | 〇            | Python   |
| パブリックインテグレーション  | 大   | ✕             | Python   |

{{< whatsnext desc="Send unsupported metrics to Datadog:" >}}
    {{< nextlink href="/developers/dogstatsd" >}}<u>DogStatsD</u>: セットアップ、データグラム形式、データ送信など、DogStatsD の機能の概要を説明します。{{< /nextlink >}}
    {{< nextlink href="/developers/write_agent_check" >}}<u>カスタム Agent チェック</u>: カスタムチェックで、メトリクス、イベント、およびサービスチェックを報告する方法を説明します。{{< /nextlink >}}
    {{< nextlink href="/developers/prometheus" >}}<u>カスタム OpenMetrics チェック</u>: 専用のカスタム Agent チェックで OpenMetrics を報告する方法を説明します。{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/" >}}<u>インテグレーション</u>: より複雑なタスクのために、パブリックまたはプライベートな Datadog インテグレーションを作成します。パブリックなインテグレーションはコミュニティと共有できます。{{< /nextlink >}}
{{< /whatsnext >}}

### 種類

{{< whatsnext desc="Learn about the types of data you can submit to Datadog:" >}}
    {{< nextlink href="/developers/metrics" >}}<u>カスタムメトリクス</u>: Datadog のカスタムメトリクスについて掘り下げて説明します。メトリクスのタイプや、それぞれのタイプが表すもの、送信方法、および Datadog 全体でどのように使用されるかを、このセクションで説明します。{{< /nextlink >}}
    {{< nextlink href="/developers/events" >}}<u>イベント</u>: カスタム Agent チェック、DogStatsD、または Datadog API を使用して、Datadog にイベントを送信する方法について説明します。{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks" >}}<u>サービスチェック</u>: カスタム Agent チェック、DogStatsD、または Datadog API を使用して、Datadog にサービスチェックを送信する方法について説明します。{{< /nextlink >}}
{{< /whatsnext >}}

## コミュニティ

{{< whatsnext desc="Collaborate with the Datadog developer community:" >}}
    {{< nextlink href="/developers/libraries" >}}<u>ライブラリ</u>: Datadog API、DogStatsD クライアント、APM トレースと分散型トレース、および広範なプラットフォームを外部からサポートするコミュニティインテグレーションの、公式/コミュニティ寄稿のライブラリ一覧。{{< /nextlink >}}
    {{< nextlink href="/developers/office_hours" >}}<u>Community Office Hours</u>: 定期的に実施される Datadog Office Hours です。Datadog の開発について、エンジニアとチャットで直接話すことができます。{{< /nextlink >}}
    {{< nextlink href="/developers/guide/" >}}<u>ガイド</u>: 詳しい技術情報やコードサンプル、その他の参考資料など、便利な記事をご紹介します。{{< /nextlink >}}
{{< /whatsnext >}}

## その他

{{< whatsnext desc="Other developer resources:" >}}
    {{< nextlink href="/developers/marketplace" >}}<u>マーケットプレイス</u>: Datadog 上にサービスを構築し、顧客に提供します。{{< /nextlink >}}
    {{< nextlink href="/developers/amazon_cloudformation" >}}<u>Amazon CloudFormation</u>: テンプレートを使用して、お使いの環境内のすべての AWS リソースを一度に記述、構成、プロビジョニングできます。{{< /nextlink >}}
{{< /whatsnext >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}