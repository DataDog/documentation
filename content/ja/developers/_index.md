---
aliases:
- /ja/developers/faq/how-to-monitor-logs-with-loggly-live-tail-and-datadog
cascade:
  algolia:
    rank: 70
description: Datadog でインテグレーションを開発する方法を説明します。
further_reading:
- link: /api/latest/
  tag: Documentation
  text: Datadog API について
- link: https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices
  tag: ベストプラクティス
  text: 優れたインテグレーションダッシュボードを作成する
- link: https://www.datadoghq.com/blog/engineering/druids-the-design-system-that-powers-datadog/
  tag: ブログ
  text: Datadog を支えるデザインシステム、DRUIDS
- link: https://www.datadoghq.com/blog/introducing-open-source-hub/
  tag: ブログ
  text: Datadog Open Source Hub のご紹介
kind: documentation
title: 開発者
---

## 概要

開発者セクションには、Datadog で開発するための参考資料が含まれています。表示されていない製品に表示したいデータがある場合は、Datadog で開発することをお勧めします。この場合、Datadog は必要なテクノロジーをすでにサポートしている可能性があります。[一般的に要求されるテクノロジー](#commonly-requested-technologies)の表を参照して、ニーズを満たす可能性のある製品またはインテグレーションを見つけてください。

## 一般的に要求されるテクノロジー

現在表示されていない Datadog で監視したいデータがある場合は、カスタムを作成する前に、次の Datadog 製品とインテグレーションを検討してください。

{{< partial name="requests.html" links="requests" >}}

必要なソリューションが本当に利用できない場合は、[Datadog サポート][1]に連絡して機能をリクエストできます。このセクションの参考資料を使用して、[独自のソリューションを作成する](#creating-your-own-solution)こともできます。

### パートナーと Datadog マーケットプレイス

また、Datadog を基盤として、[Datadog Marketplace][10] や Datadog のコミュニティ[インテグレーション][6]に貢献したいパートナーである場合もあります。

{{< whatsnext desc="製品を開発するには、適切なドキュメントを参照してください。" >}}
    {{< nextlink href="/developers/integrations/agent_integration" >}}Agent ベースのインテグレーションの作成{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/api_integration" >}}API インテグレーションの作成{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/log_integration" >}}ログインテグレーションの作成{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/marketplace_offering" >}}マーケットプレイス製品の構築{{< /nextlink >}}
{{< /whatsnext >}}

Datadog パートナーになるための詳細は、[Datadog パートナーネットワーク][2]をご覧ください。

## 独自のソリューションを作成する

必要な種類のデータがまだ表示されていませんか？開発者には、サポートされていないデータを Datadog に送信するための選択肢がいくつかあります。

- [**DogStatsD**][3] は、カスタムメトリクス、イベント、サービスチェックを受け入れるメトリクス集計サービスです。

- [**カスタムチェック**][4]を使用すると、カスタムアプリケーションまたはシステムからメトリクスを収集できます。[カスタム Agent チェック][4]は多くのニーズに適しています。メトリクスの前処理などのより高度な要件については、[OpenMetrics][5] チェックを作成するという選択肢があります。

- [**インテグレーション**][6]を使用すると、カスタムアプリケーションまたはシステムからメトリクス、イベント、サービスチェックを収集することもできます。インテグレーションは再利用可能です。インテグレーションは非公開に保つことも、他の開発者が使用できるように Datadog の[コミュニティインテグレーションのリポジトリ][7]に貢献する公開インテグレーションを作成することもできます。


### カスタムチェックとインテグレーション

カスタムチェックとインテグレーションの主な違いは、インテグレーションは Datadog のエコシステムの一部になることができる再利用可能なコンポーネントであるということです。これは通常、より多くの労力 (開発にかかる時間) を要し、アプリケーションフレームワーク、オープンソースプロジェクト、または一般的に使用されるソフトウェアなどの一般的なユースケースに最適です。チームや組織の外部で広く使用されていない監視サービスなど、よりユニークなシナリオでは、カスタムチェックを作成するのが最も効率的なオプションです。

ただし、特定のユースケースでソリューションを Python ホイール (`.whl`) として公開およびデプロイする必要がある場合は、カスタムチェックの代わりにインテグレーションを作成することを選択できます。カスタムチェックを通じて発行されたメトリクスはカスタムメトリクスと見なされ、サブスクリプションプランに基づいてコストが関連付けられます。しかし、インテグレーションが Datadog エコシステムに受け入れられると、それが発行するメトリクスはカスタムメトリクスとは見なされなくなり、カスタムメトリクス数にカウントされなくなります。これがコストに与える影響の詳細については、[Datadog の料金][8]を参照してください。

### インテグレーションを作成するには？

公開インテグレーション (つまり、Datadog のエコシステムの一部であり、`datadog-agent integration` コマンドでインストールでき、Datadog の [integrations-extras][7] または [integrations-core][9] リポジトリに受け入れられるインテグレーション) を作成するには、非公開インテグレーションよりも多くの作業が必要になることに注意してください。このインテグレーションは、すべての `ddev validate` ステップに合格し、使用可能なテストを行い、コードレビューを受ける必要があります。コード作成者であるあなたには、インテグレーションの保守管理者として、その機能を保証する責任があります。

初期目標は、小規模なコードを生成して信頼できる方法で希望するメトリクスを収集し、基本的なインテグレーションフレームワークを構築することです。カスタムチェックとして基本機能のコードを記述し、[Agent インテグレーションの作成][13]からフレームワークの詳細を入力してください。

次に、[`integrations-extras` リポジトリ][7]に対してプルリクエストを開いてください。これにより、コードレビューの準備が整ったことが Datadog に通知されます。テストや Datadog 内部の仕組み、その他の点について不明点がある場合は、Datadog Ecosystems チームがサポートしますのでご安心ください。プルリクエストを通じて効率的に懸念点を振り返ることができます。

インテグレーションは、機能性、フレームワークへの準拠、一般的なコード品質が検証されると、`integrations-extras` にマージされ、Datadog エコシステムの一部となります。

サポートされていないデータを Datadog に送信する方法を決定する際の主な考慮事項は、労力 (開発にかかる時間) と予算 (カスタムメトリクスのコスト) です。Datadog がサポートしていないデータを表示しようとしている場合は、まずはデータの送信を開始するのに最も適切な方法を決定してください。

| タイプ                | 工数 | カスタムメトリクス | 言語 |
|---------------------|--------|----------------|----------|
| DogStatsD           | 最小 | はい            | 任意      |
| カスタムチェック        | 小    | はい            | Python   |
| プライベートインテグレーション | 中 | はい            | Python   |
| パブリックインテグレーション  | 大   | いいえ             | Python   |

### インテグレーション作成のメリット

不定期にレポートを作成したい場合、またデータソースが特殊または非常に限られているなどの場合は[カスタムチェック][1]が有用です。アプリケーションのフレームワーク、オープンソースプロジェクト、一般的に使用されるソフトウェアなど、これよりも汎用的なユースケースに関してはインテグレーションを作成することをお勧めします。

許容されたインテグレーションから報告されるメトリクスは、カスタムメトリクスとしてはカウントされません、そのため、これがカスタムメトリクスの割り当てに影響することはありません。(ほぼ無制限にメトリクスを生成するインテグレーションは「カスタム」とみなされる場合があります。) Datadog によるネイティブサポートを実施することで、適応時の問題を緩和し、自社製品、サービス、プロジェクトのユーザー利用を促進することができます。また、Datadog エコシステムの一員として取り上げられることで認知度の飛躍的な向上も期待できます。

### カスタムチェックとサービスチェックの違いは何ですか？

[カスタムチェック][11]は、カスタム Agent チェックとも呼ばれるもので、これを使うと内部サービスデータを Datadog に送信することができます。[サービスチェック][12]はこれよりもはるかにシンプルなもので、これを使うと特定のサービスのアップまたはダウンステータスを監視することができます。これらは両方ともチェックですが、機能が異なり、監視のニーズに基づいて個別に、または一緒に使用できます。それぞれの詳細については、[カスタムチェック][11]および[サービスチェック][12]のドキュメントセクションを参照してください。

### インテグレーションタイプ別のメトリクス送信

{{< whatsnext desc="Datadog に独自のメトリクスを送信する方法を説明します。" >}}
    {{< nextlink href="/developers/dogstatsd" >}}<u>DogStatsD</u>: セットアップ、データグラム形式、データ送信など、DogStatsD の機能の概要を説明します。{{< /nextlink >}}
    {{< nextlink href="/developers/write_agent_check" >}}<u>カスタム Agent チェック</u>: カスタムチェックで、メトリクス、イベント、およびサービスチェックを報告する方法を説明します。{{< /nextlink >}}
    {{< nextlink href="/developers/prometheus" >}}<u>カスタム OpenMetrics チェック</u>: 専用のカスタム Agent チェックで OpenMetrics チェックを報告する方法を説明します。{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/" >}}<u>インテグレーション</u>: より複雑なタスクのために、パブリックまたはプライベートな Datadog インテグレーションを作成します。パブリックなインテグレーションはコミュニティと共有できます。{{< /nextlink >}}
{{< /whatsnext >}}

### データタイプ別のデータ送信

{{< whatsnext desc="Datadog に送信できるデータのタイプとその送信方法について説明します。" >}}
    {{< nextlink href="/metrics" >}}<u>カスタムメトリクス</u>: Datadog のカスタムメトリクスについて掘り下げて説明します。メトリクスのタイプや、それぞれのタイプが表すもの、送信方法、および Datadog 全体でどのように使用されるかを、このセクションで説明します。{{< /nextlink >}}
    {{< nextlink href="service_management/events/guides/" >}}<u>イベント</u>: カスタム Agent チェック、DogStatsD、または Datadog API を使用して、Datadog にイベントを送信する方法について説明します。{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks" >}}<u>サービスチェック</u>: 特定のサービスのアップまたはダウンステータスを Datadog に送信する方法について説明します。{{< /nextlink >}}
{{< /whatsnext >}}

## 開発者コミュニティとの連携

{{< whatsnext desc="Datadog 開発者コミュニティへの参加方法を説明します。" >}}
    {{< nextlink href="/developers/libraries" >}}<u>ライブラリ</u>: Datadog API、DogStatsD クライアント、APM トレースと Continuous Profiler、および広範なプラットフォームを外部からサポートするコミュニティインテグレーションの、公式/コミュニティ寄稿のライブラリ一覧。{{< /nextlink >}}
    {{< nextlink href="/developers/guide/" >}}<u>ガイド</u>: 詳しい技術情報やコードサンプル、その他の参考資料など、便利な記事をお読みください。{{< /nextlink >}}
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
[10]: /ja/developers/integrations/marketplace_offering
[11]: /ja/developers/custom_checks/
[12]: /ja/developers/service_checks/
[13]: /ja/developers/integrations/agent_integration