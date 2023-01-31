---
aliases:
- /ja/tracing/trace_ingestion/control_page
- /ja/tracing/trace_ingestion/ingestion_control_page
- /ja/account_management/billing/usage_control_apm/
- /ja/tracing/app_analytics/
- /ja/tracing/guide/ingestion_control_page/
description: APM で取り込み率を制御する方法。
further_reading:
- link: /tracing/trace_ingestion/mechanisms/
  tag: ドキュメント
  text: 取り込みのメカニズム
- link: /tracing/trace_retention/
  tag: ドキュメント
  text: トレースの保持
- link: /tracing/trace_retention/usage_metrics/
  tag: ドキュメント
  text: 使用量メトリクス
kind: documentation
title: Ingestion Controls
---

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-1.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースジャーニー" >}}

Ingestion controls により、アプリケーションから Datadog へ送信されるトレースが決定します。統計および[メトリクス][1]は、常にすべてのトレースに基づき算出されるため、Ingestion controls による影響を受けません。

Ingestion Control ページは、アプリケーションとサービスの取り込み構成について、Agent とトレースライブラリレベルで可視性を提供します。[Ingestion Control 構成ページ][2]からは、以下のことができます。
- 取り込み構成の潜在的な問題 (Agent の CPU または RAM リソースの制限など) を調査し、対処します。
- サービスレベルの取り込み構成を確認し、高スループットサービスの 1 秒あたりのトレース数のサンプリングレートを調整します。
- どの取り込みメカニズムがトレースの多くをサンプリングしているかを理解します。

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_control_page.png" style="width:100%;" alt="Ingestion Control ページ概要" >}}

このページで使用されているすべてのメトリクスは、**過去 1 時間**のライブトラフィックデータに基づいています。Agent やライブラリの構成変更はすべてこのページに反映されます。

## すべての環境の概要

過去 1 時間の総取り込みデータの概要と、アクティブな APM のインフラストラクチャー (ホスト、Fargateタスク、サーバーレス関数) で計算した、月間割り当てに対する月間使用量の推定値を得ることができます。

月間使用量が `100%` 未満であれば、取り込まれるデータの予測値は[ホストごとの月間割り当て][3]に収まることになります。クォータが `100%` 以上であれば、月間の取り込み量が月間割り当てを超えると予測されることを意味します。

## サービステーブルビュー

サービステーブルには、取り込み構成に関するサービス別の情報が含まれています。

Name
: Datadog にトレースを送信している各サービスの名前。このテーブルには、過去 1 時間にデータが取り込まれたルートサービスと非ルートサービスが含まれています。

Ingested Traces/s
: 過去 1 時間にサービスのために Datadog に取り込まれた 1 秒あたりの平均トレース数。

Ingested Bytes/s
: 過去 1 時間にサービスのために Datadog に取り込まれた 1 秒あたりの平均バイト数。

Downstream Bytes/s
: このサービスで取り込み判定を行うダウンストリームサービスからのスパンを含む、平均取り込みバイト数/秒。これは、すべての降順の子スパンのバイトと、[Error sampler][4]、[Rare sampler][5]、[App Analytics][6] のメカニズムによってキャッチされたスパンが含まれます。

Traffic Breakdown
: サービスによって生成されたすべてのトレースの宛先の詳細な内訳。詳細は、[トラフィックの内訳](#traffic-breakdown)を参照してください。

Ingestion Configuration
: Agent からの[デフォルトのヘッドベースのサンプリングメカニズム][7]が適用される場合、`Automatic` と表示されます。トレーシングライブラリで[ユーザー定義ルール][8]を使って取り込みを構成した場合、そのサービスは `Configured` と表示されます。サービスの取り込み構成についての詳細は、[デフォルトの取り込み率を変更する](#configure-the-service-ingestion-rate)を参照してください。

Infrastructure
: サービスが実行しているホスト、コンテナ、および関数。

Service status
: Datadog Agent が CPU や RAM の限界に達したために一部のスパンがドロップされた場合は `Limited Resource`、一部のスパンがレガシーの[App Analytics メカニズム][6]を通じて取り込まれた場合は `Legacy Setup`、残りの時間は `OK` と表示されます。

環境、構成、ステータスでページを絞り込み、対策が必要なサービスを表示します。グローバルな取り込み量を減らすために、テーブルを`Downstream Bytes/s` 列でソートして、取り込み量の最も大きな割合を占めるサービスを表示します。

**注**: このテーブルは、[使用量メトリクス][9] `datadog.estimated_usage.apm.ingested_spans` と `datadog.estimated_usage.apm.ingested_bytes` によって提供されます。これらのメトリクスは `service`、`env`、`ingestion_reason` でタグ付けされています。

### トラフィックの内訳

Traffic Breakdown の列は、サービスを起点とするすべてのトレースの行き先を分解して表示します。これにより、トラフィックがどのような理由で取り込まれ、どのような理由でドロップされたかを推定することができます。

{{< img src="tracing/trace_indexing_and_ingestion/service_traffic_breakdown.png" style="width:100%;" alt="トレース取り込みのトラフィック内訳" >}}

詳細は、以下の部分に分かれています。

- **Complete traces ingested** (青色): Datadog により取り込まれたトレースの割合。
- **Complete traces not retained** (グレー): Agent またはトレーサーにより、意図的に Datadog へ転送されなかったトレースの割合。コンフィギュレーションによって、以下の 2 つの理由のいずれかにより発生します。

    1. デフォルトでは、Agent はサービスのトラフィックに応じて、サービスに[取り込み率を配分][7]しています。
    2. トレースライブラリレベルで一定の割合のトレースを取り込むよう、サービスを手動で[構成][8]した場合。

- **Complete traces dropped by the tracer rate limiter** (オレンジ色): ルールでサービスの取り込み率を手動で設定することを選択した場合、デフォルトで 100 トレース/秒に設定されているレートリミッターが自動的に有効になっています。このレートを構成で設定するには、[レートリミッター][8]のドキュメントを参照してください。

- **Traces dropped due to the Agent CPU or RAM limit** (赤色): このメカニズムにより、スパンが削除され、不完全なトレースが作成される場合があります。この問題を解決するには、Agent が実行されるインフラストラクチャーの CPU とメモリの割り当てを増やします。

## サービス取り込みの概要

サービスの行をクリックすると、サービスの取り込み構成に関する実用的な洞察を提供する詳細なビューである、Service Ingestion Summary が表示されます。

{{< img src="tracing/trace_indexing_and_ingestion/service_ingestion_summary.png" style="width:100%;" alt="Service Ingestion Summary" >}}

**Ingestion reasons breakdown** で、どのメカニズムがサービスの取り込みを担っているかを確認します。各取り込みの理由は、1 つの特定の[取り込みメカニズム][10]に関連しています。サービス取り込み構成を変更した後、過去 1 時間の取り込みデータに基づき、この時系列グラフで取り込まれたバイトとスパンの増減を観察することができます。

サービス取り込みのほとんどが上流サービスによる決定である場合、上流のトップ決定者の詳細を調査してください。たとえば、サービスが非ルート (トレースのサンプリングを**決定しない**) の場合、非ルートサービスの取り込みに関与するすべての上流サービスを調査してください。上流のルートサービスを構成して、全体的な取り込み量を減らすことができます。

[APM Trace - Estimated Usage Dashboard][11] は、グローバルな取り込み情報と、`service`、`env`、`ingestion reason` 別の内訳グラフを提供し、さらなる調査を行うことができます。

### サービス取り込み率を構成する

**Manage Ingestion Rate** をクリックすると、サービスの取り込み率を構成することができます。

{{< img src="tracing/trace_indexing_and_ingestion/service_ingestion_rate_config.png" style="width:100%;" alt="サービス取り込み率の変更" >}}

サービスのトラフィックの特定の割合を送信するように指定するには、そのサービスのトレーサー構成に生成されたコードスニペットを追加します。

1. 取り込まれたスパンのパーセントを変更するサービスを選択します。
2. サービス言語を選択します。
3. 必要な取り込み率を選択します。
4. これらの選択から生成された適切なコンフィギュレーションを、示されたサービスに適用し、再デプロイします。
5. 新しい割合が適用されたことを Ingestion Control ページで確認します。Ingestion Reason Breakdown のシェアは、`ingestion_reason:rule` に割り当てられる必要があります。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/guide/metrics_namespace/
[2]: https://app.datadoghq.com/apm/traces/ingestion-control
[3]: https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler
[4]: /ja/tracing/trace_ingestion/mechanisms#error-traces
[5]: /ja/tracing/trace_ingestion/mechanisms#rare-traces
[6]: /ja/tracing/trace_ingestion/mechanisms#single-spans-app-analytics
[7]: /ja/tracing/trace_ingestion/mechanisms#in-the-agent
[8]: /ja/tracing/trace_ingestion/mechanisms#in-tracing-libraries-user-defined-rules
[9]: /ja/tracing/trace_retention_and_ingestion/usage_metrics
[10]: /ja/tracing/trace_ingestion/mechanisms
[11]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage