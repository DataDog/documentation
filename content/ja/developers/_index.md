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

開発者セクションには、Datadog で開発するための参考資料が含まれています。表示されていない製品に表示したいデータがある場合は、Datadog で開発することをお勧めします。この場合、Datadog は必要なテクノロジーをすでにサポートしている可能性があります。[一般的に要求されるテクノロジー](#commonly-requested-technologies)の表を参照して、ニーズを満たす可能性のある製品またはインテグレーションを見つけてください。

必要なソリューションが本当に利用できない場合は、[Datadog サポート][1]に連絡して機能をリクエストできます。このセクションの参考資料を使用して、[独自のソリューションを作成する](#creating-your-own-solution)こともできます。

### パートナーと Datadog マーケットプレイス

さらに、Datadog に協力し、Datadog Marketplace または Datadog のコミュニティインテグレーションに貢献するパートナーになることもできます。Datadog パートナーになるための詳細については、[パートナープログラム][2]を参照してください。

## 一般的に要求されるテクノロジー

現在表示されていない Datadog で監視したいデータがある場合は、カスタムを作成する前に、次の Datadog 製品とインテグレーションを検討してください。

{{< partial name="requests.html" links="requests" >}}

## 独自のソリューションを作成する

必要な種類のデータがまだ表示されていませんか？開発者には、サポートされていないデータを Datadog に送信するための選択肢がいくつかあります。

- [**DogStatsD**][3] は、カスタムメトリクス、イベント、サービスチェックを受け入れるメトリクス集計サービスです。

- [**カスタムチェック**][4]を使用すると、カスタムアプリケーションまたはシステムからメトリクスを収集できます。[カスタム Agent チェック][4]は多くのニーズに適しています。メトリクスの前処理などのより高度な要件については、[OpenMetrics][5] チェックを作成するという選択肢があります。

- [**インテグレーション**][6]を使用すると、カスタムアプリケーションまたはシステムからメトリクス、イベント、サービスチェックを収集することもできます。インテグレーションは再利用可能です。インテグレーションは非公開に保つことも、他の開発者が使用できるように Datadog の[コミュニティインテグレーションのリポジトリ][7]に貢献する公開インテグレーションを作成することもできます。


### カスタムチェックとインテグレーション

カスタムチェックとインテグレーションの主な違いは、インテグレーションは Datadog のエコシステムの一部になることができる再利用可能なコンポーネントであるということです。これは通常、より多くの労力 (開発にかかる時間) を要し、アプリケーションフレームワーク、オープンソースプロジェクト、または一般的に使用されるソフトウェアなどの一般的なユースケースに最適です。チームや組織の外部で広く使用されていない監視サービスなど、よりニッチなシナリオでは、カスタムチェックを作成するのが最も効率的なオプションです。

ただし、特定のユースケースでソリューションを Python ホイール (`.whl`) として公開およびデプロイする必要がある場合は、カスタムチェックの代わりにインテグレーションを作成することを選択できます。カスタムチェックを通じて発行されたメトリクスはカスタムメトリクスと見なされ、サブスクリプションプランに基づいてコストが関連付けられます。しかし、インテグレーションが Datadog エコシステムに受け入れられると、それが発行するメトリクスはカスタムメトリクスとは見なされなくなり、カスタムメトリクス数にカウントされなくなります。これがコストに与える影響の詳細については、[Datadog の料金][8]を参照してください。

**注**: 公開インテグレーション (つまり、Datadog のエコシステムの一部であり、`datadog-agent integration` コマンドでインストールでき、Datadog の [integrations-extras][7] または [integrations-core][9] リポジトリに受け入れられるインテグレーション) を作成するには、非公開インテグレーションよりも多くの作業が必要になることに注意してください。このインテグレーションは、すべての `ddev validate` ステップに合格し、使用可能なテストを行い、コードレビューを受ける必要があります。コード作成者であるあなたには、インテグレーションの保守管理者として、その機能を保証する責任があります。

サポートされていないデータを Datadog に送信する方法を決定する際の主な考慮事項は、労力 (開発にかかる時間) と予算 (カスタムメトリクスのコスト) です。Datadog がサポートしていないデータを表示しようとしている場合は、まずはデータの送信を開始するのに最も適切な方法を決定してください。

| タイプ                | 工数 | カスタムメトリクス | 言語 |
|---------------------|--------|----------------|----------|
| DogStatsD           | 最小 | 〇            | 任意      |
| カスタムチェック        | 小    | 〇            | Python   |
| プライベートインテグレーション | 中 | 〇            | Python   |
| パブリックインテグレーション  | 大   | ✕             | Python   |

Datadog Marketplace またはコミュニティインテグレーションのために開発を行っているパートナーの場合は、[Marketplace][10] および[インテグレーションの構築][6]のドキュメントを参照してください。

### カスタムチェックとサービスチェックの違いは何ですか？

[カスタムチェック][11]は、カスタム Agent チェックとも呼ばれるもので、これを使うと内部サービスデータを Datadog に送信することができます。[サービスチェック][12]はこれよりもはるかにシンプルなもので、これを使うと特定のサービスのアップまたはダウンステータスを監視することができます。これらは両方ともチェックですが、機能が大きく異なり、監視のニーズに基づいて個別に、または一緒に使用できます。それぞれの詳細については、[カスタムチェック][11]および[サービスチェック][12]のドキュメントセクションを参照してください。

### 一般的な開発者向けリソース

{{< whatsnext desc="独自のメトリクスを Datadog に送信します。" >}}
    {{< nextlink href="/developers/dogstatsd" >}}<u>DogStatsD</u>: セットアップ、データグラム形式、データ送信など、DogStatsD の機能の概要を説明します。{{< /nextlink >}}
    {{< nextlink href="/developers/write_agent_check" >}}<u>カスタム Agent チェック</u>: カスタムチェックで、メトリクス、イベント、およびサービスチェックを報告する方法を説明します。{{< /nextlink >}}
    {{< nextlink href="/developers/prometheus" >}}<u>カスタム OpenMetrics チェック</u>: 専用のカスタム Agent チェックで OpenMetrics を報告する方法を説明します。{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/" >}}<u>インテグレーション</u>: より複雑なタスクのために、パブリックまたはプライベートな Datadog インテグレーションを作成します。パブリックなインテグレーションはコミュニティと共有できます。{{< /nextlink >}}
{{< /whatsnext >}}

### データタイプ別のデータ送信

{{< whatsnext desc="Datadog に送信できるデータのタイプとその送信方法について説明します。" >}}
    {{< nextlink href="/developers/metrics" >}}<u>カスタムメトリクス</u>: Datadog のカスタムメトリクスについて掘り下げて説明します。メトリクスのタイプや、それぞれのタイプが表すもの、送信方法、および Datadog 全体でどのように使用されるかを、このセクションで説明します。{{< /nextlink >}}
    {{< nextlink href="events/guides/" >}}<u>イベント</u>: カスタム Agent チェック、DogStatsD、または Datadog API を使用して、Datadog にイベントを送信する方法について説明します。{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks" >}}<u>サービスチェック</u>: 特定のサービスのアップまたはダウンステータスを Datadog に送信する方法について説明します。{{< /nextlink >}}
{{< /whatsnext >}}

## コミュニティ

{{< whatsnext desc="Collaborate with the Datadog developer community:" >}}
    {{< nextlink href="/developers/libraries" >}}<u>ライブラリ</u>: Datadog API、DogStatsD クライアント、APM トレースと Continuous Profiler、および広範なプラットフォームを外部からサポートするコミュニティインテグレーションの、公式/コミュニティ寄稿のライブラリ一覧。{{< /nextlink >}}
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

[1]: /ja/help/
[2]: https://www.datadoghq.com/partner/
[3]: /ja/developers/dogstatsd/
[4]: /ja/developers/custom_checks/write_agent_check/
[5]: /ja/developers/custom_checks/prometheus/
[6]: /ja/developers/integrations/
[7]: https://github.com/DataDog/integrations-extras
[8]: https://www.datadoghq.com/pricing/
[9]: https://github.com/DataDog/integrations-core
[10]: /ja/developers/marketplace/
[11]: /ja/developers/custom_checks/
[12]: /ja/developers/service_checks/