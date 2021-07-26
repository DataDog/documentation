---
title: カスタムメトリクスの課金
kind: documentation
aliases:
  - /ja/integrations/faq/what-standard-integrations-emit-custom-metrics/
---
メトリクスが [{{< translate key="integration_count" >}} 種以上の Datadog インテグレーション][1]以外から送信された場合、そのメトリクスは[カスタムメトリクス][2]<sup>[(1)](#標準インテグレーション)</sup>とみなされます。

**カスタムメトリクスはメトリクス名とタグ値 (ホストタグを含む) の組み合わせにより、一意に識別されます。**

カスタムメトリクスの月間請求額（使用量ページにあります）は、当月全時間の個別カスタムメトリクスの平均数を表します。

## カスタムメトリクスの数え方

特定のメトリクス名に関連付けられたカスタムメトリクスの数は、メトリクスの[送信タイプ][3]により異なります。次のシナリオを使って、カスタムメトリクスの数え方をいくつかご紹介します。

エンドポイントリクエストのレイテンシーを測定する 2 つのホスト (`host:A` と `host:B`) から、`request.Latency` というメトリクスを送信しているとします。このメトリクスを 2 つのタグキーと共に送信します。

- `endpoint` の値は `endpoint:X` または `endpoint:Y` とします。
- `status` の値は `status:200` または `status:400` とします。

下記に示すように、データの `endpoint:X` は両ホストでサポートされていますが、`host:B` でのみ失敗するとします。また、`endpoint:Y` へのリクエストは常に成功し、`host:B` でのみ表示されます。

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="リクエストのレイテンシー"  style="width:80%;">}}

{{< tabs >}}
{{% tab "Count, Rate, Gauge" %}}

[COUNT][1]、[RATE][2]、[GAUGE][3] の各メトリクスタイプから送信されるカスタムメトリクスの数は、同じロジックにより計算されます。

このタグスキームで GAUGE メトリクスに送信された一意のタグ値の組み合わせ数は **4** です。

- `host:A`、`endpoint:X`、`status:200`
- `host:B`、`endpoint:X`、`status:200`
- `host:B`、`endpoint:X`、`status:400`
- `host:B`、`endpoint:Y`、`status:200`

これにより、`request.Latency` では **4 つの異なるカスタムメトリクス**が報告されます。

### タグ追加の影響

タグを追加してもカスタムメトリクスが増えるとは**限りません**。カスタムメトリクス数は、一般的に、最小粒度または最も詳細なタグに対応します。例えば、米国の気温を測定しており、国と地域ごとに `temperature` メトリクスでタグ付けしたとします。その場合、次のように Datadog に送信します。

| メトリクス名   | タグ値                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`、`region: Northeast` |
| `temperature` | `country:USA`、`region: Southeast` |

3 つの値 `NYC`、`Miami`、`Orlando`  を持つ `city` という タグを追加するとします。 このタグを追加すると、以下の表に示すように、より詳細でより粒度の小さい情報をデータセットに加えることになるため、カスタムメトリクスの数が増えます。

| メトリクス名   | タグ値                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`、`region: Northeast`、`city: NYC`     |
| `temperature` | `country:USA`、`region: Southeast`、`city: Orlando` |
| `temperature` | `country:USA`、`region: Southeast`、`city: Miami`   |

`temperature` から報告されるカスタムメトリクス数は、最小粒度のタグ `city` に対応します。

次に、temperature メトリクスを `state` メトリクス (`NY` と `Florida` の 2 つの値を持つ) でタグ付けするとします。この場合、`country`、`region`、`state`、`city` で temperature をタグ付けしています。state タグを追加しても、データセットにすでに存在する city タグの粒度レベルは変わりません。

Florida の気温を入手するには、単に次のようにカスタムメトリクスの組み合わせを変更します。

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**注意**: タグ値の順序を変えても一意性は増えません。次の組み合わせは共に同じカスタムメトリクスです。

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

[1]: /ja/developers/metrics/types/?tab=count#metric-types
[2]: /ja/developers/metrics/types/?tab=rate#metric-types
[3]: /ja/developers/metrics/types/?tab=gauge#metric-types
{{% /tab %}}
{{% tab "Histogram" %}}

**HISTOGRAM メトリクスは、一意のメトリクス名とタグ値の組み合わせごとに 5 つのカスタムメトリクスをデフォルトで生成し、Agent 側の `max`、`median`、`avg`、`95pc`、`count` の集計をサポートします。詳細については、[HISTOGRAM メトリクスタイプ][1]をご参照ください。

このタグスキームで HISTOGRAM メトリクスに送信された一意のタグ値の組み合わせ数は **4** です。

- `host:A`、`endpoint:X`、`status:200`
- `host:B`、`endpoint:X`、`status:200`
- `host:B`、`endpoint:X`、`status:400`
- `host:B`、`endpoint:Y`、`status:200`

デフォルトでは、Agent は元の 4 つのタグ値の組み合わせそれぞれに 5 つのカスタムメトリクスを生成して、`avg`、`count`、`median`、`95percentile`、`max` の [Agent 側の各集計を有効にします][2]。結果的に、`request.Latency` から報告される**カスタムメトリクスの総数は 4×*5 = 20** になります。

**注意**: HISTOGRAM メトリクスに集計を追加すると、個別のカスタムメトリクスの報告数が増えます。集計を削除すると、カスタムメトリクスの報告数が減ります。

- どの集計を Datadog に送信するかは、[datadog.yaml 構成ファイル][3]の `histogram_aggregates` パラメーターで構成します。デフォルトでは、`max`、`median`、`avg`、`count` の集計だけが Datadog に送信されます。必要に応じて `sum` および `min` も利用できます。
- Datadog に送信するパーセンタイル集計を、[datadog.yaml 構成ファイル][3]の `histogram_percentiles` パラメーターで構成します。デフォルトでは、パーセンタイル順位が 95 の `95percentile` だけが Datadog に送信されます。


[1]: /ja/developers/metrics/types/?tab=histogram#metric-types
[2]: /ja/developers/metrics/types/?tab=histogram#definition
[3]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Distribution" %}}

**DISTRIBUTION メトリクスは、一意のメトリクス名とタグ値の組み合わせごとに 5 つのカスタムメトリクスをデフォルトで生成し**、値の全体的な分布を表示します。これら 5 つのカスタムメトリクスは、サーバー側の `count`、`sum`、`min`、`max`、`avg` の集計をサポートします。詳細については、[DISTRIBUTION メトリクスタイプ][1]をご参照ください。

このタグスキームで分布メトリクスに送信された一意のタグ値の組み合わせ数は **4** です。

- `host:A`、`endpoint:X`、`status:200`
- `host:B`、`endpoint:X`、`status:200`
- `host:B`、`endpoint:X`、`status:400`
- `host:B`、`endpoint:Y`、`status:200`

[DISTRIBUTION メトリクス][1]のカスタムメトリクス数は、メトリクス名とタグ値の一意の組み合わせ数に 5 を掛けた数になります。結果として、`request.Latency` から報告される**カスタムメトリクスの総数は 5×*4 = 20** になります。

##### パーセンタイル集計の追加

パーセンタイル集計 (`p50`、`p75`、`p90`、`p95`、`p99`) をディストリビューションメトリクスに含めることができます。これら追加のパーセンタイル集計を含めることで、メトリクス名とタグ値の一意の組み合わせ数に 5 を掛けた数字になります。(**5\*4 = 20 カスタムメトリクス**)。そのため、パーセンタイル集計付きのこのディストリビューションメトリクスから送信されるカスタムメトリクスは、次のとおりです。**2 * (5\*4) = 40 カスタムメトリクス** 。

この表は、パーセンタイル集計をディストリビューションメトリクスに追加した場合の効果をまとめたものです。

| メトリクス                                                                                    | 課金対象となるカスタムメトリクスの数 |
|--------------------------------------------------------------------------------------------|-----------------------------------|
| ベースラインディストリビューションからのカスタムメトリクスの数 (count、sum、min、max、avg)          | `5*(tag value combinations)`      |
| パーセンタイル集計（p50、p75、p90、p95、p99）を含むカスタムメトリクスの数  | `5*(tag value combinations)`      |
| 合計                                                                                      | `2*5(tag value combinations)`     |

##### タグ付けのカスタマイズ

DISTRIBUTION メトリクスを集計する[タグの組み合わせ][2]をカスタマイズできます。`request.Latency` メトリクスに関連付けられた `endpoint` タグと `status` タグのみを維持すると、結果として次の 3 つのタグの組み合わせができます。

- `endpoint:X`、`status:200`
- `endpoint:X`、`status:400`
- `endpoint:Y`、`status:200`

[DISTRIBUTION メトリクス][1]のカスタムメトリクス数は、メトリクス名とタグ値の一意の組み合わせ数に 5 を掛けた数になります。タグをカスタマイズした結果として、`request.Latency` から報告される**カスタムメトリクス総数は 5×*3 = 15** になります。

[1]: /ja/developers/metrics/types/?tab=distribution#definition
[2]: /ja/metrics/distributions/#customize-tagging
{{% /tab %}}
{{< /tabs >}}

## カスタムメトリクスの追跡

管理ユーザー ([Datadog 管理者の役割を持つユーザー][4]) は、[使用量の詳細ページ][5]で、アカウントの 1 時間当たりのカスタムメトリクスの月平均数と上位 5000 個のカスタムメトリクスを参照できます。詳細については、[使用量の詳細][6]に関するドキュメントをご参照ください。

特定のメトリクス名のカスタムメトリクス数をリアルタイムで追跡するには、[Metrics Summary ページ][7]でメトリクス名をクリックします。以下に示すように「Currently reporting # distinct metrics...」として一覧表示されます。

{{< img src="account_management/billing/custom_metrics/tracking_metric.mp4" alt="メトリクスの追跡" video="true" >}}

## 割り当て

Datadog では、料金プランごとに一定数のカスタムメトリクスが割り当てられています。

- プロ : 1 ホストにつき 100 個のカスタムメトリクス。
- エンタープライズ : 1 ホストにつき 200 個のカスタムメトリクス。

割り当ては、インフラストラクチャー全体でカウントされます。たとえば、プロプランを利用しており、3 ホスト分のライセンスを取得している場合、300 個のカスタムメトリクスが割り当てられます。300 個のカスタムメトリクスは、ホストごとに均等に振り分けることも、1 つのホストでのみ使用することもできます。例として、割り当てられたカスタムメトリクス数を超えないシナリオを下記に示しています。

{{< img src="account_management/billing/custom_metrics/host_custom_metrics.png" alt="ホストのカスタムメトリクス"  >}}

課金されるカスタムメトリクスの数は、特定の月の (有料ホストすべての) カスタムメトリクスの 1 時間当たりの平均に基づきます。アカウントのカスタムメトリクスについてのご相談や、カスタムメトリクスパッケージの追加購入については、[セールス][8]チームまたは担当の[カスタマーサクセス][9]マネージャーまでお問い合わせください。

## 標準インテグレーション

以下の標準インテグレーションでは、カスタムメトリクスを生成することができます。

| インテグレーションの種類                           | インテグレーション                                                                                   |
|------------------------------------------------|------------------------------------------------------------------------------------------------|
| デフォルトで上限 350 個のカスタムメトリクス。      | [ActiveMQ XML][10] / [Go-Expvar][11] / [Java-JMX][12]                                          |
| カスタムメトリクスの収集では既定の上限なし。 | [Nagios][13] /[PDH チェック][14] /[Prometheus][15] /[SNMP][16] /[Windows Service][17] /[WMI][18] |
| カスタムメトリクス収集の構成が可能。   | [MySQL][19] /[Oracle][20] /[Postgres][21] /[SQL Server][22]                                    |
| クラウドインテグレーションから送信されたカスタムメトリクス    | [AWS][23]                                                                                      |

## トラブルシューティング

技術的な質問については、[Datadog サポートチーム][24]にお問い合わせください。

請求に関するご質問は、[カスタマーサクセス][9]マネージャーにお問い合わせください。

[1]: /ja/integrations/
[2]: /ja/developers/metrics/custom_metrics/
[3]: /ja/developers/metrics/types/#metric-types
[4]: /ja/account_management/users/default_roles/
[5]: https://app.datadoghq.com/account/usage/hourly
[6]: /ja/account_management/billing/usage_details/
[7]: https://app.datadoghq.com/metric/summary
[8]: mailto:sales@datadoghq.com
[9]: mailto:success@datadoghq.com
[10]: /ja/integrations/activemq/#activemq-xml-integration
[11]: /ja/integrations/go_expvar/
[12]: /ja/integrations/java/
[13]: /ja/integrations/nagios/
[14]: /ja/integrations/pdh_check/
[15]: /ja/integrations/prometheus/
[16]: /ja/integrations/snmp/
[17]: /ja/integrations/windows_service/
[18]: /ja/integrations/wmi_check/
[19]: /ja/integrations/mysql/
[20]: /ja/integrations/oracle/
[21]: /ja/integrations/postgres/
[22]: /ja/integrations/sqlserver/
[23]: /ja/integrations/amazon_web_services/
[24]: /ja/help/