---
aliases:
- /ja/tracing/trace_ingestion/control_page
- /ja/tracing/trace_ingestion/ingestion_control_page
- /ja/account_management/billing/usage_control_apm/
- /ja/tracing/app_analytics/
- /ja/tracing/guide/ingestion_control_page/
- /ja/tracing/trace_ingestion/ingestion_controls
description: Learn how to control Ingestion rates with APM.
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tag: Documentation
  text: Ingestion Mechanisms
- link: /tracing/trace_pipeline/metrics/
  tag: Documentation
  text: Usage Metrics
title: Ingestion Controls
---

{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="取り込みサンプリングルール" >}}

Ingestion controls により、アプリケーションから Datadog へ送信されるトレースが決定します。[APM メトリクス][1]は、常にすべてのトレースに基づき算出されるため、Ingestion controls による影響を受けません。

Ingestion Control ページは、アプリケーションとサービスの取り込み構成について、Agent とトレースライブラリレベルで可視性を提供します。[Ingestion Control 構成ページ][2]からは、以下のことができます。
- サービスレベルの取り込み構成を可視化し、高スループットのサービス用にトレースサンプリング速度を調整します。
- どの取り込みメカニズムがトレースの多くをサンプリングしているかを理解します。
- 取り込み構成の潜在的な問題 (Agent の CPU または RAM リソースの制限など) を調査し、対処します。

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_controls_page.png" style="width:100%;" alt="Ingestion Control ページ概要" >}}

このページで使用されているすべてのメトリクスは、**過去 1 時間**のライブトラフィックデータに基づいています。Agent やライブラリの構成変更はすべてこのページに反映されます。

## すべての環境の概要

過去 1 時間の総取り込みデータの概要と、アクティブな APM のインフラストラクチャー (ホスト、Fargateタスク、サーバーレス関数) で計算した、月間割り当てに対する月間使用量の推定値を得ることができます。

月間使用量が `100%` 以下であれば、取り込まれるデータの予測値が[月間割り当て][3]に収まることを意味します。月間使用量が `100%` 以上であれば、取り込みデータが月間割り当てを超えると予測されます。

## Agent レベルで全サービスの取り込みを管理

サービスの取り込みサンプリングをグローバルに管理するには、**Remotely Configure Agent Ingestion** をクリックします。Agent のバージョン [7.42.0][13] 以降を使用している場合、Agent サンプリングのパラメーターをリモートで構成することができます。Agent でリモート構成を有効にする方法については、[リモート構成の仕組み][14]をお読みください。

{{< img src="tracing/trace_indexing_and_ingestion/agent_level_configurations_modal.png" style="width:70%;" alt="Agent レベル構成モーダル" >}}

Datadog Agent からは、3 つの取り込みサンプリングメカニズムを制御することができます。
- **[ヘッドベースサンプリング][4]**: サービスに対してサンプリングルールが設定されていない場合、Datadog Agent は自動的にサービスに適用されるサンプリングレートを計算し、**Agent あたり 10 トレース/秒**を目標とします。Datadog でこの目標トレース数を変更するか、Agent レベルでローカルに `DD_APM_MAX_TPS` を設定します。
-  **[エラースパンサンプリング][5]**: ヘッドベースサンプリングで捕捉されなかったトレースについて、Datadog Agent は、**Agent あたり最大 10 トレース/秒**でローカルエラートレースを捕捉します。Datadog でこの目標トレース数を変更するか、Agent レベルでローカルに `DD_APM_ERROR_TPS` を設定します。
-  **[レアスパンサンプリング][6]**: ヘッドベースサンプリングで捕捉されなかったトレースについて、Datadog Agent は、**Agent あたり最大 5 トレース/秒**でローカルレアトレースを捕捉します。この設定はデフォルトでは無効になっています。Datadog でレアトレースの収集を有効にするか、Agent レベルでローカルに `DD_APM_ENABLE_RARE_SAMPLER` を設定します。

リモート構成では、これらのパラメーターを更新するために Agent を再起動する必要はありません。`Apply` をクリックして構成の変更を保存すると、新しい構成はすぐに有効になります。

**注**: 円グラフの `Other Ingestion Reasons` (グレー) セクションは、Datadog Agent レベルで_構成不可能_なその他の取り込み理由を表します。

**注**: リモートで構成されたパラメーターは、環境変数や `datadog.yaml` の構成など、ローカルでの構成よりも優先されます。

## ライブラリレベルで個別サービスの取り込みを管理

サービステーブルには、取り込まれたボリュームと取り込みの構成に関する情報が、サービスごとに分類されて表示されます。

Type
: サービスの種類: Web サービス、データベース、キャッシュ、ブラウザなど...

Name
: Datadog にトレースを送信している各サービスの名前。このテーブルには、過去 1 時間にデータが取り込まれたルートサービスと非ルートサービスが含まれています。

Ingested Traces/s
: 過去 1 時間にサービスから取り込まれた 1 秒あたりの平均トレース数。

Ingested Bytes/s
: 過去 1 時間にサービスのために Datadog に取り込まれた 1 秒あたりの平均バイト数。

Downstream Bytes/s
: サービスが*サンプリング判定を行った*、取り込んだ 1 秒あたりの平均バイト数。これには、トレースの先頭で行われた判定に続く、下流のすべての子スパンのバイトと、[Error sampler][5]、[Rare sampler][6]、[App Analytics][7] のメカニズムで捕捉されたスパンが含まれます。

Traffic Breakdown
: サービスを起点としたトレースについて、サンプリングされたトラフィックとサンプリングされていないトラフィックの詳細な内訳。詳細は、[トラフィックの内訳](#traffic-breakdown)を参照してください。

Ingestion Configuration
: Agent からの[デフォルトのヘッドベースのサンプリングメカニズム][4]が適用される場合、`Automatic` と表示されます。トレーシングライブラリで[トレースサンプリングルール][8]を使って取り込みを構成した場合、そのサービスは `Configured` と表示されます。サービスの取り込み構成についての詳細は、[デフォルトの取り込み率を変更する](#configure-the-service-ingestion-rate)を参照してください。

Infrastructure
: サービスが実行しているホスト、コンテナ、および関数。

Service status
: Datadog Agent が [その構成で][9]設定された CPU や RAM の限界に達したために一部のスパンがドロップされた場合は `Limited Resource`、一部のスパンがレガシーの[App Analytics メカニズム][7]を通じて取り込まれた場合は `Legacy Setup`、それ以外は `OK` と表示されます。

環境、構成、ステータスでページを絞り込み、対策が必要なサービスを表示します。グローバルな取り込み量を減らすために、テーブルを`Downstream Bytes/s` 列でソートして、取り込み量の最も大きな割合を占めるサービスを表示します。

**注**: このテーブルは、[使用量メトリクス][10] `datadog.estimated_usage.apm.ingested_spans` と `datadog.estimated_usage.apm.ingested_bytes` によって提供されます。これらのメトリクスは `service`、`env`、`ingestion_reason` でタグ付けされています。

### トラフィックの内訳

Traffic Breakdown の列は、サービスを起点とするすべてのトレースの行き先を分解して表示します。これにより、トラフィックがどのような理由で取り込まれ、どのような理由でドロップされたかを推定することができます。

{{< img src="tracing/trace_indexing_and_ingestion/service_traffic_breakdown.png" style="width:100%;" alt="トレース取り込みのトラフィック内訳" >}}

詳細は、以下の部分に分かれています。

- **Complete traces ingested** (青色): Datadog により取り込まれたトレースの割合。
- **Complete traces not retained** (グレー): Agent またはトレーシングライブラリにより、意図的に Datadog へ転送されなかったトレースの割合。コンフィギュレーションによって、以下の 2 つの理由のいずれかにより発生します。

    1. デフォルトでは、Agent はサービスのトラフィックに応じて、サービスに[取り込み率を配分][4]しています。
    2. トレースライブラリレベルで一定の割合のトレースを取り込むよう、サービスを手動で[構成][8]した場合。

- **Complete traces dropped by the tracer rate limiter** (オレンジ色): トレースサンプリングルールでサービスの取り込み率を手動で設定することを選択した場合、デフォルトで 100 トレース/秒に設定されているレートリミッターが自動的に有効になっています。このレートを構成で設定するには、[レートリミッター][8]のドキュメントを参照してください。

- **Traces dropped due to the Agent CPU or RAM limit** (赤色): このメカニズムにより、スパンが削除され、不完全なトレースが作成される場合があります。この問題を解決するには、Agent が実行されるインフラストラクチャーの CPU とメモリの割り当てを増やします。

## サービス取り込みの概要

サービスの行をクリックすると、サービスの取り込み構成に関する実用的な洞察を提供する詳細なビューである、Service Ingestion Summary が表示されます。

{{< img src="tracing/trace_indexing_and_ingestion/service_ingestion_summary.png" style="width:100%;" alt="Service Ingestion Summary" >}}

**Ingestion reasons breakdown** で、どのメカニズムがサービスの取り込みを担っているかを確認します。各取り込みの理由は、1 つの特定の[取り込みメカニズム][11]に関連しています。サービス取り込み構成を変更した後、過去 1 時間の取り込みデータに基づき、この時系列グラフで取り込まれたバイトとスパンの増減を観察することができます。

サービス取り込み量のほとんどが上流サービスによる決定である場合、**Sampling decision makers** トップリストの詳細を調査してください。たとえば、サービスが非ルート (トレースのサンプリングを**決定しない**) の場合、非ルートサービスの取り込みに関与するすべての上流サービスを調査してください。上流のルートサービスを構成して、全体的な取り込み量を減らすことができます。

[APM Trace - Estimated Usage Dashboard][12] は、グローバルな取り込み情報と、`service`、`env`、`ingestion reason` 別の内訳グラフを提供し、さらなる調査を行うことができます。

### Agent とトレーシングライブラリのバージョン

サービスが使用している **Datadog Agent およびトレーシングライブラリのバージョン**を確認してください。使用中のバージョンを最新のリリースされたバージョンと比較し、最新かつ最新の Agent とライブラリを実行していることを確認してください。

{{< img src="tracing/trace_indexing_and_ingestion/agent_tracer_version.png" style="width:90%;" alt="Agent とトレーシングライブラリのバージョン" >}}

**注**: バージョン情報を報告するためには、Agent を v6.34 または v7.34 にアップグレードする必要があります。

### サービス取り込み率を構成する

<div class="alert alert-info"><strong>Remotely configured sampling rules are in Beta</strong>. Request access to the feature via this <a href="https://forms.gle/WCG57yTCG27BCBB67">link</a> to be able to dynamically set this configuration from the Datadog UI without having to redeploy your service. Follow the instructions in the <a href="/tracing/guide/resource_based_sampling">Resource-based sampling guide</a> to get started.</div>

**Manage Ingestion Rate** をクリックすると、サービスの取り込み率の構成についての説明が表示されます。

{{< img src="tracing/trace_indexing_and_ingestion/service_ingestion_rate_config.png" style="width:100%;" alt="サービス取り込み率の変更" >}}

サービスのトラフィックの特定の割合を送信するように指定するには、そのサービスのトレーシングライブラリ構成に環境変数または生成されたコードスニペットを追加します。

1. 取り込まれたスパンのパーセントを変更するサービスを選択します。
2. サービス言語を選択します。
3. 必要な取り込み率を選択します。
4. これらの選択肢から生成された適切な構成を、該当するサービスに適用し、サービスを再デプロイしてください。**注**: サービス名の値は、大文字と小文字が区別されます。サービス名の大文字と小文字を一致させる必要があります。
5. Ingestion Control ページで、新しい割合が適用されたことを、適用されたサンプリングレートを表示する Traffic Breakdown 列を見ることで確認します。サービスの取り込み理由は、`ingestion_reason:rule` として表示されます。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/metrics/metrics_namespace/
[2]: https://app.datadoghq.com/apm/traces/ingestion-control
[3]: https://www.datadoghq.com/pricing/?product=apm--continuous-profiler#apm--continuous-profiler
[4]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[5]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#error-traces
[6]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#rare-traces
[7]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#single-spans-app-analytics
[8]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[9]: /ja/tracing/troubleshooting/agent_rate_limits/#maximum-cpu-percentage
[10]: /ja/tracing/trace_pipeline/metrics
[11]: /ja/tracing/trace_pipeline/ingestion_mechanisms/
[12]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[13]: https://github.com/DataDog/datadog-agent/releases/tag/7.42.0
[14]: /ja/agent/remote_config/#enabling-remote-configuration