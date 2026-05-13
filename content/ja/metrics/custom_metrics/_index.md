---
algolia:
  tags:
  - custom metrics
aliases:
- /ja/guides/metrics/
- /ja/metrictypes/
- /ja/units/
- /ja/developers/metrics/datagram_shell
- /ja/developers/metrics/custom_metrics/
- /ja/getting_started/custom_metrics
- /ja/developers/metrics/
- /ja/metrics/guide/tag-configuration-cardinality-estimation-tool/
further_reading:
- link: /extend/dogstatsd/
  tag: よくあるご質問
  text: DogStatsD について
- link: /extend/community/libraries/
  tag: よくあるご質問
  text: 公式/コミュニティ作成の API および DogStatsD クライアントライブラリ
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: よくあるご質問
  text: カスタムメトリクスの課金
- link: /metrics/guide/custom_metrics_governance/
  tag: ガイド
  text: カスタムメトリクスのガバナンスに関するベストプラクティス
- link: https://www.datadoghq.com/blog/metrics-without-limits/
  tag: ブログ
  text: Metrics without Limits™ でカスタムメトリクスのボリュームをダイナミックにコントロール
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: ブログ
  text: Datadogで効果的な経営層向けダッシュボードを設計します。
title: Custom Metrics
---
{{< learning-center-callout header="エンゲージメントウェビナーセッションに参加する" hide_image="true" btn_title="サインアップ" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Metrics">}}
  カスタムメトリクス向けのFoundation Enablementセッションについて、その内容を確認の上、参加登録してください。カスタムメトリクスが、訪問者数、平均顧客バスケットサイズ、リクエストのレイテンシ、またはカスタムアルゴリズムのパフォーマンス分布など、アプリケーションのKPIを追跡するのにどのように役立つかを学びます。
{{< /learning-center-callout >}}

## 概要{#overview}

カスタムメトリクスは、訪問者数、平均顧客バスケットサイズ、リクエストのレイテンシ、またはカスタムアルゴリズムのパフォーマンス分布など、アプリケーションのKPIを追跡するのに役立ちます。カスタムメトリクスは、**メトリクス名とタグ値（ホストタグを含む）のユニークな組み合わせ**によって識別されます。以下の例では、メトリクス`request.Latency`は、2つのタグキーから4通りのユニークなタグ値の組み合わせがあります。

- `endpoint`、その値は`endpoint:X`または`endpoint:Y`です。
- `status`、その値は`status:200`または`status:400`です。

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="リクエストのレイテンシ" style="width:80%;">}}

以下もカスタムメトリクスと見なされます。
- 一般的に、[DogStatsD][3]または[カスタムAgent Check][4]を通じて送信されたメトリクスは、
- [Marketplaceインテグレーション][29]によって送信されたメトリクス
- 特定の[標準インテグレーション](#standard-integrations)は、カスタムメトリクスを送信する可能性があります。
- は、[Datadogインテグレーション][1]に該当しないインテグレーションから送信されたメトリクスです。 {{< translate key="integration_count" >}} [Datadogインテグレーション][1]

**注**: Datadog Adminロールまたは`usage_read`権限を持つユーザーは、[使用量の詳細ページ][5]で、アカウントの1時間あたりのカスタムメトリクスの月平均数と、上位5000個のカスタムメトリクスを参照できます。[カスタムメトリクスの数え方][6]について詳しく学びます。

##  カスタムメトリクスのプロパティ {#custom-metrics-properties}

Datadogのカスタムメトリクスには、以下のプロパティがあります。[メトリクスの紹介][7]を読んで、Datadog内でメトリクスをグラフ化する方法を学びます。

| プロパティ | 説明 |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | メトリクスの[名前](#naming-custom-metrics)                                                                                                                 |
| `<METRIC_VALUE>` | メトリクスの値。**注**: メトリクスの値は32ビットでなければなりません。値は日付やタイムスタンプを反映してはいけません。                                                                                                                               |
| `<TIMESTAMP>`    | メトリクス値に関連付けられたタイムスタンプ。**注**: メトリクスのタイムスタンプは、未来の場合は10分以上先、あるいは過去の場合は1時間以上前であってはなりません。|
| `<TAGS>`         | メトリクスに関連付けられているタグセット。                                                                                                                |
| `<METRIC_TYPE>`  | メトリクスのタイプ。[メトリクスタイプ][8]について読む。                                                                                            |
| `<INTERVAL>`     | メトリクスの`<TYPE>`が[RATE][9]または[COUNT][10]の場合、対応する[間隔][11]を定義します。                                                      |

### カスタムメトリクスの名前付け {#naming-custom-metrics}

カスタムメトリクスの名前は、以下の命名規則に従う必要があります。

* メトリクス名は文字で開始する必要があります。
* メトリクス名にはASCII英数字、アンダースコア、およびピリオドのみを含める必要があります。
  * スペースなどの他の文字はアンダースコアに変換されます。
  * Unicodeは_サポートされていません_
* メトリクス名は200文字を超えてはいけません。UIの観点からは100未満が望ましいです。

**注**: メトリクス名はDatadogで大文字と小文字が区別されます。

### メトリクス単位 {#metric-units}

[Metrics Summary][12]を使用してメトリクス単位を設定するか、可視化のグラフエディタで[単位オーバーライド][13]機能を使用してカスタムメトリクス単位を設定できます。詳細については、[メトリクス単位][14]のドキュメントを参照してください。

## カスタムメトリクスの送信{#submitting-custom-metrics}

{{< whatsnext desc="メトリクスを Datadog に送信する方法はいくつかあります。">}}
    {{< nextlink href="/metrics/custom_metrics/agent_metrics_submission" >}}カスタム Agent チェック{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/metrics/custom_metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/serverless/custom_metrics" >}}AWS Lambda{{< /nextlink >}}
    {{< nextlink href="/api/v1/metrics/#submit-metrics" >}}DatadogのHTTP API{{< /nextlink >}}
    {{< nextlink href="/logs/log_configuration/logs_to_metrics/#generate-a-log-based-metric" >}}ログベースのメトリクスを生成する{{< /nextlink >}}
    {{< nextlink href="/tracing/generate_metrics/" >}}APMスパンベースのメトリクスを生成する{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/platform/generate_metrics/" >}}RUMイベントベースのメトリクスを生成する{{< /nextlink >}}
    {{< nextlink href="/infrastructure/process/increase_process_retention/#generate-a-process-based-metric" >}}ライブプロセスベースのメトリクスを生成する{{< /nextlink >}}
{{< /whatsnext >}}

[Datadog 公式およびコミュニティ寄稿の API および DogStatsD クライアントライブラリ][15]のいずれかを使用して、カスタムメトリクスを送信することもできます。

**注意**: カスタムメトリクスの送信に対して強制的な固定レート制限はありません。デフォルトの割り当てを超えた場合、[Datadogのカスタムメトリクスに関する請求ポリシー][6]に従って請求されます。

## 標準インテグレーション{#standard-integrations}

以下の標準インテグレーションでは、カスタムメトリクスを生成することができます。

| インテグレーションの種類| インテグレーション|
|------------------------------------------------|------------------------------------------------------------------------------------|
| デフォルトで350個のカスタムメトリクスに制限されています。     | [ActiveMQ XML][16] / [Go-Expvar][17] / [Java-JMX][18]|
| カスタムメトリクスの収集に対するデフォルトの制限はありません。| [Nagios][19] /[PDHチェック][20] /[OpenMetrics][21] /[Windowsパフォーマンスカウンター][22] /[WMI][23] /[Prometheus][21]|
| カスタムメトリクスを収集するように構成できます。  | [MySQL][24] /[Oracle][25] /[Postgres][26] /[SQL Server][27]                        |
| クラウドインテグレーションから送信されたカスタムメトリクス| [AWS][28]|

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/
[2]: /ja/account_management/billing/custom_metrics/#standard-integrations
[3]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /ja/metrics/custom_metrics/agent_metrics_submission/
[5]: https://app.datadoghq.com/account/usage/hourly
[6]: /ja/account_management/billing/custom_metrics/#counting-custom-metrics
[7]: /ja/metrics
[8]: /ja/metrics/types/
[9]: /ja/metrics/types/?tab=rate#metric-types
[10]: /ja/metrics/types/?tab=count#metric-types
[11]: /ja/extend/dogstatsd/data_aggregation/#how-is-aggregation-performed-with-the-dogstatsd-server
[12]: /ja/metrics/summary/#metric-unit
[13]: /ja/dashboards/guide/unit-override/
[14]: /ja/metrics/units/
[15]: /ja/extend/community/libraries/
[16]: /ja/integrations/activemq/#activemq-xml-integration
[17]: /ja/integrations/go_expvar/
[18]: /ja/integrations/java/
[19]: /ja/integrations/nagios
[20]: /ja/integrations/pdh_check/
[21]: /ja/integrations/openmetrics/
[22]: /ja/integrations/windows_performance_counters/
[23]: /ja/integrations/wmi_check/
[24]: /ja/integrations/mysql/
[25]: /ja/integrations/oracle/
[26]: /ja/integrations/postgres/
[27]: /ja/integrations/sqlserver/
[28]: /ja/integrations/amazon_web_services/
[29]: /ja/integrations/#cat-marketplace