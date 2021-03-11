---
title: カスタムメトリクス
kind: documentation
aliases:
  - /ja/metrics/
  - /ja/guides/metrics/
  - /ja/metrictypes/
  - /ja/units/
  - /ja/developers/metrics/datagram_shell
  - /ja/developers/metrics/custom_metrics/
  - /ja/getting_started/custom_metrics
further_reading:
  - link: /developers/dogstatsd/
    tag: Documentation
    text: DogStatsD について
  - link: /developers/libraries/
    tag: Documentation
    text: 公式/コミュニティ作成の API および DogStatsD クライアントライブラリ
---
## 概要

メトリクスが [{{< translate key="integration_count" >}} 種以上の Datadog インテグレーション][1]から送信された場合、そのメトリクスはカスタムメトリクス<sup>[(1)][2]</sup>とみなされます。カスタムメトリクスを使うと、訪問者数、カスタムバケットの平均サイズ、リクエストレイテンシー、カスタムアルゴリズムのパフォーマンス分布など、アプリケーションの KPI を追跡することができます。

カスタムメトリクスは、**メトリクス名とタグ値 (ホストタグを含む) の組み合わせ**により、一意に識別されます。一般に、[DogStatsD][3] または[カスタム Agent チェック][4]を使用して送信されるメトリクスはすべて、カスタムメトリクスとなります。

**注**: Datadog 管理者のロールを持つユーザーは、[使用量の詳細ページ][5]で、アカウントの 1 時間当たりのカスタムメトリクスの月平均数と、上位 500 個のカスタムメトリクスを参照できます。詳しくは、[カスタムメトリクスの数え方][6]を参照してください。

## カスタムメトリクスのプロパティ

Datadog のカスタムメトリクスには、以下のプロパティがあります。Datadog 内でメトリクスをグラフ化する方法については、[メトリクスの概要のドキュメント][7]を参照してください。

| プロパティ         | 説明                                                                                                                                                  |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>`  | [メトリクスの名前](#naming-custom-metrics)。                                                                                                                  |
| `<METRIC_VALUE>` | メトリクスの値。                                                                                                                                    |
| `<TIMESTAMP>`    | メトリクスの値に関連付けられたタイムスタンプ。**注**: メトリクスのタイムスタンプは、未来は 10 分、過去は 1 時間を超えることはできません。 |
| `<TAGS>`         | メトリクスに関連付けられているタグセット。                                                                                                                 |
| `<METRIC_TYPE>`  | メトリクスのタイプ。[メトリクスのタイプのドキュメント][8]を参照してください。                                                                                             |
| `<INTERVAL>`     | メトリクスの `<TYPE>` が [RATE][9] または [COUNT][10] の場合は、その[間隔][11]を定義します。                                                       |

### カスタムメトリクスの名前

カスタムメトリクスの名前は、以下の命名規則に従う必要があります。

* メトリクス名は文字で開始する必要があります。
* メトリクス名に使用できるのは、ASCII 英数字、アンダースコア、およびピリオドだけです。
  * スペースなどの他の文字はアンダースコアに変換されます。
  * Unicode はサポートされません。
* メトリクス名は 200 文字以内で作成できますが、ユーザーインターフェイスの観点からは、100 文字未満をお勧めします。

**注**: Datadog のメトリクス名は大文字と小文字が区別されます。

## カスタムメトリクスの送信

{{< whatsnext desc="メトリクスを Datadog に送信する方法はいくつかあります。">}}
    {{< nextlink href="/developers/metrics/agent_metrics_submission" >}}カスタム Agent チェック{{< /nextlink >}}
    {{< nextlink href="/developers/metrics/dogstatsd_metrics_submission" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/developers/metrics/powershell_metrics_submission" >}}PowerShell{{< /nextlink >}}
    {{< nextlink href="/api/v1/metrics/#submit-metrics" >}}Datadog の HTTP API{{< /nextlink >}}
{{< /whatsnext >}}

[Datadog 公式/コミュニティ寄稿の API および DogStatsD クライアントライブラリ][12]のいずれかを使用して、カスタムメトリクスを送信することもできます。

**注**: カスタムメトリクスの送信に適用される[固定のレート制限][5]はありません。デフォルトの割り当てを超えた場合は、[Datadog のカスタムメトリクスの課金ポリシー][6]に従って課金されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br><sup>(1)</sup> *[インテグレーションによっては、カスタムメトリクスが生成されるものもあります][2]*

[1]: /ja/integrations/
[2]: /ja/account_management/billing/custom_metrics/#standard-integrations
[3]: /ja/developers/metrics/dogstatsd_metrics_submission/
[4]: /ja/developers/metrics/agent_metrics_submission/
[5]: https://app.datadoghq.com/account/usage/hourly
[6]: /ja/account_management/billing/custom_metrics/#counting-custom-metrics
[7]: /ja/metrics
[8]: /ja/developers/metrics/types/
[9]: /ja/developers/metrics/types/?tab=rate#metric-types
[10]: /ja/developers/metrics/types/?tab=count#metric-types
[11]: /ja/developers/dogstatsd/data_aggregation/#how-is-aggregation-performed-with-the-dogstatsd-server
[12]: /ja/developers/libraries/