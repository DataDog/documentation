---
aliases:
- /ja/account_management/billing/profiler/
- /ja/account_management/billing/apm_distributed_tracing/
- /ja/account_management/billing/apm_tracing_profiling/
title: APM 料金
---
APM は、APM、APM Pro、APM Enterprise の 3 つのティアで利用できます。APM は、分散トレーシング機能、トレース、ログ、その他のテレメトリ間のシームレスな相関付け、およびサービス向けのすぐに利用できるパフォーマンスダッシュボードにより、アプリケーションを詳細に可視化します。APM Enterprise の Continuous Profiler を使用すると、サービスレベルとエンドポイントレベルで集計した、最も処理速度が遅く、リソース消費の多いメソッドを特定できます。また、個々の分散トレースについても特定できます。APM Pro および APM Enterprise の Data Streams Monitoring (DSM) を使用すると、Kafka、SQS、RabbitMQ を使用するデータストリーミングパイプラインとイベント駆動型アプリケーションのエンドツーエンドのパフォーマンスを簡単に追跡できます。


| 課金パラメーター  | 価格                                      | Ingested Spans および Indexed Spans                                                                 | 課金                                                                                                                                                                                                                                                                                                                          |
|--------------------|--------------------------------------------|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [APM Host][5] | 基盤となる [APM host][5] 1 ホストあたり月額 31 USD | 各 APM host に、月間 100 万 Indexed Spans と 150 GB の Ingested Spans が含まれます。  | Datadog は、Datadog APM サービスでお客様が同時に監視している [APM hosts][5] の数を 1 時間に 1 回記録します。高水準プラン (HWMP) では、月末にこれらの 1 時間ごとの測定値を高い順に並べ、9 番目に高い測定値に基づいて課金します。2 月は例外で、Datadog は 8 番目に高い測定値に基づいて課金します。[APM の料金に関する詳細情報。][5] |
| APM Pro (Data Streams Monitoring を含む APM Host) | 基盤となる [APM host][5] 1 ホストあたり月額 35 USD。Data Streams Monitoring が含まれます。| APM Host の場合と同様 | Datadog は、Datadog APM サービスでお客様が同時に監視している一意の APM hosts の数と、一意の DSM hosts の数を 1 時間に 1 回記録します。APM Pro の 1 時間ごとの測定と課金は、APM Hosts の場合と同様です。 |
| APM Enterprise (Data Streams Monitoring と [Continuous Profiler][6] を含む APM Host) | 基盤となる [APM host][5] 1 ホストあたり月額 40 USD。Data Streams Monitoring と [Continuous Profiler][6] が含まれ、1 [APM host] あたり月間 4 つのプロファイル済みコンテナが対象となります。| APM Host の場合と同様 | Datadog は、APM サービスでお客様が同時に監視している一意の APM hosts の数、一意の DSM hosts の数、および一意の Continuous Profiler host の数を 1 時間に 1 回記録します。APM Enterprise の 1 時間ごとの測定と課金は、APM Hosts の場合と同様です。|
| [Fargate][4]       | 同時実行タスク 1 件あたり月額 6 USD              | 195,000 件の Indexed Spans と 30 GB の Ingested Spans が料金に含まれます。             | Datadog は、お客様が Datadog APM サービスで監視しているタスクインスタンスの数を 5 分間隔で記録します。Datadog は月末に間隔ごとの測定値を集計し、アプリケーションが実行および監視された平均時間数に基づいて課金します。[Fargate の料金に関する詳細情報。][16]              |
| [Indexed span][5] | 100 万 Indexed Spans あたり月額 1.70 USD | 各 APM host に含まれる Indexed Spans の使用量を超えた場合に課金されます | Indexed span とは、スタック内の個々のサービスに対する個別のリクエストです。Datadog は月末に、保持フィルターまたは従来の分析スパンによって Datadog APM サービスにインデックス化されたスパンの総数に基づいて課金します。[APM の料金に関する詳細情報。][5]                                                                                          |
| [Ingested span][5] | Ingested Spans 1 GB あたり月額 0.10 USD | 各 APM host に含まれる Ingested Spans の使用量を超えた場合に課金されます | Ingested span とは、スタック内の個々のサービスに対する個別のリクエストです。Datadog は、月末に Datadog に取り込まれたスパンの総ギガバイト数に基づいて課金します。[APM の料金に関する詳細情報。][5]                                                                                          |

**注**: 
   - Fargate 以外のコンテナベースの環境を使用している場合、Datadog Agent をデプロイしている基盤となるホストに対して課金されます。
   - プロファイル済みコンテナとは、Continuous Profiler サービスを実行しているコンテナです。プロファイルされていないコンテナは含まれません。たとえば、プロファイルされていない DNS サービスコンテナが、プロファイルされているアプリケーションコンテナと同時に実行されている場合、その DNS コンテナはプロファイル済みコンテナ 4 つの割り当てには含まれません。
   - [Universal Service Monitoring][15] は、すべての APM ティア (APM、APM Pro、APM Enterprise) に追加料金なしで含まれています。

詳細については、[料金ページ][7]を参照してください。

## Database Monitoring {#database-monitoring}

| 課金パラメーター  | 正規化クエリ                | 課金                                          |
|--------------------|-----------------------------------|--------------------------------------------------|
| データベースホスト | すべてのデータベースホストに、月間 200 件の正規化クエリが含まれます。| Datadog は、お客様が Database Monitoring で同時に監視しているデータベースホストの数を 1 時間に 1 回記録します。高水準プラン (HWMP) では、月末にこれらの 1 時間ごとの測定値を高い順に並べ、9 番目に高い測定値に基づいて課金します。2 月は例外で、Datadog は 8 番目に高い測定値に基づいて課金します。|
| 正規化クエリ | 構成したしきい値が、各データベースホストに含まれる正規化クエリを超えた場合に課金されます。| _正規化クエリ_とは、クエリパラメーターのみが異なる、類似した構造のクエリを集計したものです。Datadog は、任意の時点で追跡されている、構成した正規化クエリの総数に基づいて課金します。|

詳細については、[料金ページ][7]を参照してください。

## デプロイのシナリオ {#deployment-scenarios}

**サンプルケースは、Indexed Span の保持期間をデフォルトの 15 日間とした場合の年間請求料金を示しています。お客様のアカウントのボリュームディスカウントについては、[Sales][8] または [Customer Success][9] Manager にお問い合わせください。**

### APM Hosts、Indexed Spans、および追加の Ingested Spans {#apm-hosts-indexed-spans-and-extra-ingested-spans}

APM hosts を 5 つ使用し、合計 900 GB の Ingested Spans で 3,000 万件の Indexed Spans を送信。

| 課金対象ユニット  | 数量   | 価格                                                                                           | 計算式       | 小計              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Hosts      | 5          | ホストあたり $31                                                                                    | 5 * $31       | $155                  |
| Indexed Spans | 30 million | 5 つの APM hosts に 500 万件が含まれます。追加の 2,500 万件の Indexed Spans について、100 万件あたり $1.70 | 25 * $1.70    | $42.50                |
| Ingested Spans | 900 GB          | 5 つの APM hosts に 750 GB が含まれます。追加の 150 GB の Ingested Spans について、1 GB あたり $0.10。                                                                                | 150 * $.10      | $15                  |
| 合計          |            |                                                                                                 | $155 + $42.50 + $15 | **月額 $212.50** |

### APM Pro Hosts、Indexed Spans、および追加の Ingested Spans {#apm-pro-hosts-indexed-spans-and-extra-ingested-spans}

APM Pro hosts を 5 つ使用し、合計 900 GB の Ingested Spans で 3,000 万件の Indexed Spans を送信。

| 課金対象ユニット  | 数量   | 価格                                                                                           | 計算式       | 小計              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Pro Hosts      | 5          | ホストあたり $35                                                                                    | 5 * $35       | $175                  |
| Indexed Spans | 30 million | 5 つの APM hosts に 500 万件が含まれます。追加の 2,500 万件の Indexed Spans について、100 万件あたり $1.70 | 25 * $1.70    | $42.50                |
| Ingested Spans | 900 GB          | 5 つの APM hosts に 750 GB が含まれます。追加の 150 GB の Ingested Spans について、1 GB あたり $0.10。                                                                                | 150 * $.10      | $15                  |
| 合計          |            |                                                                                                 | $175 + $42.50 + $15 | **月額 $232.50** |

### 1 ホストあたり 6 つのプロファイル済みコンテナを使用する APM Enterprise Hosts {#apm-enterprise-hosts-with-six-profiled-containers-per-host}

5 つの APM Enterprise hosts を使用し、各ホストで別々のコンテナに 6 つのアプリを実行。

| 課金対象ユニット  | 数量   | 価格                                                                                           | 計算式       | 小計              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------|-----------------------|
| APM Enterprise Hosts       | 5          | ホストあたり $40                                                                                    | 5 * $40v| $200                  |
| プロファイル済みコンテナ | ホストあたり 6 | ホストあたりの追加コンテナ 1 つにつき $2。この場合、各ホストには 6 - 4 = 2 つの追加コンテナがあります | 2 * $2 * 5 hosts | $20 |
| 合計          |            |                                                                                                 | $200 + $20      | **月額 $220**    |

### APM Hosts、Fargate、および Indexed Spans {#apm-hosts-fargate-and-indexed-spans}

5 つの APM hosts を使用し、20 million の Indexed Spans を送信し、1 か月の平均で 20 個の Fargate Tasks に APM をデプロイ。

| 課金対象ユニット  | 数量   | 価格                                                                                           | 計算式             | 小計              |
|----------------|------------|-------------------------------------------------------------------------------------------------|---------------------|-----------------------|
| APM Hosts      | 5          | ホストあたり $31                                                                                    | 5 * $31             | $155                  |
| Fargate タスク  | 20         | タスクあたり $6                                                                                     | 20 * $6             | $120                   |
| Indexed Spans | 2,000 万件 | 5 つの APM hosts に 500 万件が含まれています。20 個の Fargate タスクに 130 万件が含まれています。追加の 1,370 万件の Indexed Spans に対して、100 万件あたり $1.70 | 13.7 * $1.70          | $23.29                |
| 合計          |            |                                                                                                 | $155 + $120 + $23.29 | **月額 $298.29** |

### APM Enterprise Hosts、サービス、コンテナ、Indexed Spans {#apm-enterprise-hosts-services-containers-and-indexed-spans}

APM Enterprise: コンテナ 1 でサービス 1、コンテナ 2 でサービス 2 を実行します。両方のコンテナは 1 つのホスト上で稼働し、App Analytics で 2,000 万件の Indexed Spans を送信します。

| 課金対象ユニット  | 数量   | 価格                                                                                          | 計算式      | 小計             |
|----------------|------------|------------------------------------------------------------------------------------------------|--------------|----------------------|
| APM Enterprise Hosts      | 1          | ホストあたり $40                                                                                   | 1 * $40      | $40                  |
| プロファイルされたコンテナ | 2 | $0、プロファイルされたコンテナは APM Host あたり 4 個の割り当ての範囲内であるため。
| Indexed Spans | 2,000 万件 | 1 つの APM host に 100 万件が含まれます。追加の 1,900 万件の Indexed Spans に対して、100 万件あたり $1.70 | 19 * $1.70 | $32.30               |
| 合計          |            |                                                                                                | $40 + $32.30 | **月額 $72.30** |

### 動的スケーリングを使用する APM hosts、コンテナ、Fargate、Indexed Spans なし {#apm-hosts-with-dynamic-scaling-containers-fargate-and-no-indexed-spans}

アプリ 1 は 20～40 個のコンテナで実行され、4～8 個のホストインスタンスにデプロイされています。アプリ 2 は 10～30 個の Fargate タスクで実行されています。EC2 インスタンスの 99 パーセンタイル使用量が 7、月間の Fargate タスクの平均が 28 であると仮定します。

| 課金対象ユニット | 数量 | 価格        | 計算式    | 小計           |
|---------------|----------|--------------|------------|--------------------|
| APM Hosts     | 7        | ホストあたり $31| 7 * $31    | $217               |
| Fargate Tasks | 28       | タスクあたり $6  | 28 * $6    | $168                |
| 合計         |          |              | $217 + $168 | **月額 $385** |

**注**: EC2 インスタンスに Agent がデプロイされている場合、コンテナの数は料金に影響しません。

### Kubernetes ノードと Indexed Spans を使用する APM Enterprise Hosts {#apm-enterprise-hosts-with-kubernetes-nodes-and-indexed-spans}

Kubernetes の 20 個のワーカーノードで Datadog Agent を実行し、20,000,000 件の Indexed Spans を送信するアプリ向けの APM Enterprise。これらのワーカーノードのうち 10 個にはそれぞれ 8 個の Pod があり、各 Pod に 1 個のコンテナがあります。残りの 10 個にはそれぞれ 2 個の Pod があり、各 Pod に 1 個のコンテナがあります。

| 課金対象ユニット     | 数量   | 価格                                                                       | 計算式   | 小計           |
|-------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| APM Enterprise Hosts (ノード) | 20         | ホストあたり $40                                                                | 20 * $40 | $800               |
| プロファイルされたコンテナ | 合計 100 個 | 追加コンテナ 1 個あたり $2。この場合、20 ホストで最大 80 個のコンテナが許可されますが、2 ホストで合計 20 個のコンテナがあります。100 - 80 = 20 個の追加コンテナ        | ホスト 20 台 × 2 USD        | 40 USD                    |
| Indexed Spans    | 2,000 万件| 20 APM hosts (ノード) に 2,000 万件の Indexed Spans が含まれます。追加の Indexed Spans なし| 0 × 1.70 USD | 0                  |
| 合計             |            |                                                                             | 800 USD + 40 USD| **月額 840 USD** |

Kubernetes の場合、APM および Continuous Profiler はポッドではなくノードごとに課金されます。

### Lambda 関数と Indexed Spans{#lambda-functions-and-indexed-spans}

1 か月に 1,000 万回呼び出され、1,000 万件の Indexed Spans を送信する AWS Lambda ベースのサーバーレスアプリケーション。

| 課金対象ユニット                  | 数量   | 価格                                                                       | 計算式   | 小計           |
|--------------------------------|------------|-----------------------------------------------------------------------------|-----------|--------------------|
| Lambda 関数の呼び出し| 1,000 万回| [月額 5 USD][10]                                                           | 10 × 5 USD  | 50 USD               |
| Indexed Spans                  | 1,000 万個| 100 万回の Lambda 呼び出しごとに 150,000 個の Indexed Spans が含まれています。追加の Indexed Spans 100 万個あたり 1.70 USD| 8.5 × 1.70 USD| 14.45 USD               |
| 合計                          |            |                                                                             | 50 USD + 14.45 USD| **月額 64.45 USD** |

## APM Edge Devices{#apm-edge-devices}

APM Edge Devices は、POS システム、医療機器、自律走行車、産業システムなどの Edge デバイスや IoT デバイスを APM で監視するための課金オプションです。APM Edge Devices は、標準の APM 課金と同じ APM 製品ですが、Edge デバイスや IoT デバイスのフリート向けに設計された課金モデルです。価格については、[営業担当者][8]または[カスタマーサクセスマネージャー][9]にお問い合わせください。

APM Edge Devices には、標準の Datadog Agent バージョン 7.75.0 以降が必要です。[Datadog IoT Agent][17] は APM をサポートしていません。

デバイスを APM Edge Device として識別するには、以下のいずれかの方法で Datadog Agent を APM Edge モードで実行するように構成します。

- 環境変数 `DD_APM_MODE` を `edge` に設定します。

  ```shell
  DD_APM_MODE=edge
  ```

- Agent の `datadog.yaml` 構成ファイルに以下を追加します。

  ```yaml
  apm_config:
    mode: edge
  ```

**注**: APM Edge Devices は OpenTelemetry をサポートしていません。Edge デバイスまたは IoT デバイスで OpenTelemetry インスツルメンテーションが必要な場合は、[営業担当者][8]または[カスタマーサクセスマネージャー][9]までお問い合わせください。

## よくあるご質問 {#faq}

**1. 課金対象として分類される APM host とは何ですか**

[ホスト][4]とは、物理または仮想のオペレーティングシステムインスタンスのことです。Datadog は、お客様が Datadog Infrastructure サービスで同時に監視しているホスト数を 1 時間に一度記録します。APM の課金については、[APM がインストールされ][12]、トレースを送信しているホストの数が 1 時間ごとに計算されます。月末に、[APM hosts][5] の 99 パーセンタイル使用量に基づいて請求が行われます。

**2. コンテナごとに 1 つの Agent をデプロイする場合、料金はどのように計算されますか**

コンテナのデプロイでは、_基盤となるホストごとに 1 つの Agent_ をセットアップすることをお勧めします。代わりにコンテナごとに 1 つの Agent を実行することを選択した場合、各コンテナは 1 つのホストとして扱われます。その場合、料金は (APM host あたりの料金) * (コンテナ数) となります。

**3. 課金対象として分類される APM Fargate タスクとは何ですか**

Fargate タスクとは、サーバーレスコンピューティングエンジンである AWS Fargate 上で実行されるようにスケジュールされたコンテナの集合です。Datadog は、Datadog で同時に監視しているタスクの数を 5 分間隔で記録します。APM の課金について、Datadog はアカウントの月間を通じて、1 時間あたりに Datadog へトレースを送信した Fargate タスクの平均数に基づいて請求します。

**4. 環境をスケーリングした場合、請求額はどうなりますか**

APM の料金は、毎月、1 時間ごとにトレースを送信しているアクティブな Agent の 99 パーセンタイル値を使用して計算されます。月末に、Datadog は上位 1% の値を除外することで、予期しない急増による課金を防ぎます。

**5. Kubernetes の pause コンテナに対して課金されますか**

Kubernetes は、各 Pod の IP アドレスを取得し、その Pod に参加するほかのすべてのコンテナのネットワーク名前空間を設定するために、pause コンテナを作成します。Datadog はすべての pause コンテナをクォータから除外しており、課金対象にはなりません (Agent 5.8 以降が必要です)。Kubernetes の場合、APM はポッドではなくノードごとに課金されます。

**6. ホストの請求はサービスとどのように関連していますか**

APM は、サービス単位ではなく、トレースを送信する Agent がデプロイされた [ホスト][5]単位で課金されます。さらに、ホストごとの月間割り当てを超えた場合、APM は取り込まれたスパンのボリュームとインデックス化されたスパンの数に基づいて課金されます。各サービスが送信している取り込み済みスパンとインデックス化済みスパンの数を見積もるには、[取り込み][2]および[保持][13]のドキュメントを参照してください。

**7. 既存の App Analytics フィルターはどうなりますか**

2020 年 10 月 20 日以降、既存のすべての App Analytics フィルターは自動的に Retention Filters に移行されます。フィルターはそのままにしておくことも、必要に応じて変更することもできます。移行されたフィルターには、[保持フィルター][3]ページで Legacy App Analytics Filters であることを示す *i* が表示されます。

**8. 取り込み済みスパンまたはインデックス化済みスパンのボリュームをどのように見積もりますか**

Datadog は、取り込み済みスパンおよびインデックス化済みスパンのボリュームを監視するためのメトリクス `datadog.estimated_usage.apm.ingested_bytes` と `datadog.estimated_usage.apm.ingested_spans` を提供しています。詳細については、[使用量メトリクス][14]ドキュメントをご覧ください。

**9. Continuous Profiler はスタンドアロン製品として利用できますか**

はい。Continuous Profiler を APM なしで購入することに関心がある場合は、Datadog までご連絡ください。[営業][8]または[カスタマーサクセスマネージャー][9]までお問い合わせください。

**10. Data Streams Monitoring はスタンドアロン製品として利用できますか**

はい。Data Streams Monitoring を APM なしで購入することに関心がある場合は、Datadog までご連絡ください。[営業][8]または[カスタマーサクセスマネージャー][9]までお問い合わせください。


## 参考資料 {#further-reading}

{{< whatsnext >}}
    {{< nextlink href="account_management/billing/usage_monitor_apm/" >}}APM 使用量の表示とアラート{{< /nextlink >}}
    {{< nextlink href="account_management/billing/usage_control_apm/" >}}APM 使用量の推定と制御{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /ja/tracing/
[2]: /ja/tracing/trace_pipeline/ingestion_controls
[3]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters
[4]: /ja/account_management/billing/pricing/#infrastructure-monitoring
[5]: /ja/account_management/billing/pricing/#apm
[6]: /ja/profiler/
[7]: https://www.datadoghq.com/pricing/
[8]: mailto:sales@datadoghq.com
[9]: mailto:success@datadoghq.com
[10]: /ja/account_management/billing/serverless/#serverless-functions
[11]: /ja/account_management/billing/
[12]: /ja/tracing/trace_collection/dd_libraries/
[13]: /ja/tracing/trace_pipeline/trace_retention/
[14]: /ja/tracing/trace_pipeline/metrics
[15]: /ja/universal_service_monitoring/
[16]: https://www.datadoghq.com/pricing/?product=serverless-monitoring&tab=aws-fargate#products
[17]: /ja/agent/iot/