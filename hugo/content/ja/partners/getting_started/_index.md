---
cascade:
  algolia:
    subcategory: Getting Started
description: Sales & Services パートナー向けの Datadog 入門
title: はじめに
---
Datadog は、クライアントのハイブリッドクラウドインフラストラクチャーとアプリケーションに関するインサイトを提供します。直感的な UI と強力な API により、クライアントの多様な環境のオンボード、プロビジョニング、管理を実現し、各アカウントのデータセキュリティを確立することができます。

このセクションでは、ベストプラクティスを紹介し、以下の内容を通じてクライアントの環境の監視を開始する方法を説明します。以下のトピックについて説明します。

- [基礎固め][1]: どのように始めるか、最初の段階でどのような重要な決定を下すかについての情報が記載されています。
- [データの取り込み][2]: Datadog にデータを取り込む方法と、環境で満たす必要のある前提条件について説明します。
- [価値の提供][3]: Datadog にデータを流した後の推奨ステップを説明します。
- [請求と使用量報告][4]: 単一組織および複数組織のアカウント設定における、Datadog プラットフォームの個々のクライアントおよび集計使用量の監視について説明します。
- [マルチテナント使用量計測と請求][12]: エンドカスタマーの使用量、コスト、請求を一元管理するために使用する管理組織 (Admin Org) について説明します。

## パートナーセールスイネーブルメントガイド {#partner-sales-enablement-guide}

Datadog のセールスエンジニアリングプロセスに備えるためのトレーニングロードマップについては、[パートナーセールスイネーブルメントガイド][5]を参照してください。
## Datadog の最新情報 {#staying-up-to-date-with-datadog}

Datadog の最新情報を入手し、新機能を知るための方法は複数あります。
- Datadog サイトで[リリースノートを見る][6]ことができます
- Datadog Partner Network のメンバーは、[Datadog Partner Network ポータル][7]に特別にアクセスすることができます。そこには、以下のものがあります。
  - 資料・トレーニング教材
  - 四半期ごとの DPN ライブブリーフィングウェビナー: 録画セッションをアセットライブラリで見るか、受信トレイで招待状を確認します。
- Datadog は、クラウドにおけるスケーラブルな分散システムについて学んだ多くの教訓を、[Datadog on...][8] シリーズで紹介しています。

### ステータス情報 {#status-information}

Datadog は、最新のサービスステータス情報を取得するために、以下のリソースを提供しています。
- US 地域: [https://status.datadoghq.com][9]
- EU 地域: [https://status.datadoghq.eu][10]

このページを購読すると、ステータス変更に関するお知らせを受け取ることができます。

Datadog で有効化したサードパーティインテグレーションのステータスを確認したい場合は、[https://datadogintegrations.statuspage.io][11] を参照してください。

### その他のリソース {#other-resources}

Datadog の最新情報を入手するためのその他の重要なリソースをご覧ください。

{{< whatsnext desc="GitHub リポジトリ" >}}
    {{< nextlink href="https://github.com/DataDog/datadog-agent/" >}}Datadog Agent: Datadog Agent バージョン 7 およびバージョン 6 のソースコード。{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/integrations-core/" >}}Integrations core: Datadog が公式に開発およびサポートしている Agent Integrations。{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/integrations-extras/" >}}Integrations extras: コミュニティが管理する Datadog Integrations。{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/Miscellany" >}}Miscellany: Datadog のその他のスクリプトおよびツール。{{< /nextlink >}}
    {{< nextlink href="https://github.com/DataDog/dpn" >}}DPN: パートナー向けのサンプルアプリケーション。{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Datadog ブログおよびソーシャルメディア" >}}
    {{< nextlink href="https://www.datadoghq.com/blog/" >}}Datadog ブログ{{< /nextlink >}}
    {{< nextlink href="https://www.linkedin.com/company/datadog/" >}}LinkedIn{{< /nextlink >}}
    {{< nextlink href="https://x.com/datadoghq" >}}X{{< /nextlink >}}
    {{< nextlink href="https://www.facebook.com/datadoghq/" >}}Facebook{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="YouTube" >}}
    {{< nextlink href="https://www.youtube.com/user/DatadogHQ" >}}公式 YouTube チャンネル{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE" >}}Tips and Tricks プレイリスト{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Dash Conferences プレイリスト" >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaPzYWUp9NA8IfbC47zxM57M" >}}Dash 2026{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaO91zHnerkZ5EZJ-qcqK4ib" >}}Dash 2025{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaNd5cmcY3ey4QoeyDk6aMKz" >}}Dash 2024{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaPhn1p7Sz6nc_6-9YInd__u" >}}Dash 2023{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaOlLse2WlvFXYRJ8iirG2QO" >}}Dash 2022{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaO-_rgnDSBn221gWacNCkDr" >}}Dash 2021{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaMlgvtlJRyXGgt4i-9Oiyi1" >}}Dash 2020{{< /nextlink >}}
    {{< nextlink href="https://www.youtube.com/playlist?list=PLdh-RwQzDsaPkMoleskq9YcWMWvYfBCRB" >}}Dash 2019{{< /nextlink >}}

{{< /whatsnext >}}

[1]: /ja/partners/laying-the-groundwork/
[2]: /ja/partners/data-intake/
[3]: /ja/partners/delivering-value/
[4]: /ja/partners/billing-and-usage-reporting/
[5]: /ja/partners/sales-enablement/
[6]: https://app.datadoghq.com/release-notes
[7]: https://partners.datadoghq.com/
[8]: https://datadogon.datadoghq.com/
[9]: https://status.datadoghq.com
[10]: https://status.datadoghq.eu
[12]: /ja/partners/multi_tenant_billing/
[11]: https://datadogintegrations.statuspage.io