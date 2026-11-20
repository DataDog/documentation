---
description: APM トレーシングメカニズムを使用してスパンの取り込み量を制御し、監視可能性を維持しながらコストを管理する方法を学びます。
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: ドキュメント
  text: Ingestion Control ページ
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Architecture Center
  text: '分散型トレーシングの習得: データ量の課題と、Datadog の効率的なサンプリングのアプローチ'
title: APM 分散型トレーシングによる取り込み量制御
---
## 概要 {#overview}

[取り込み制御ページ][1]では、Agent および SDK 内のすべてのサービスの取り込み構成を詳細に可視化できます。すべての[取り込みメカニズム][2]は公開されており、構成可能です。

[取り込み制御ページ] では、スパンボリュームを完全に可視化し、完全に制御することができます。その結果、以下のことが可能になります。
- ビジネスと監視可能性の目標に最も関連性の高いデータを取り込みます。
- 未使用のトレースデータを Datadog プラットフォームに送信しないようにすることで、ネットワークコストを削減します。
- 全体のコストをコントロールし、管理します。

## トレース取り込み量低減の効果 {#effects-of-reducing-trace-ingestion-volume}

{{< img src="/tracing/guide/trace_ingestion_volume_control/sampling_25_percent.png" alt="25% の完全なトレースが取り込まれたことを表示する APM 取り込みサンプリング" style="width:70%;" >}}

特定のサービスの取り込み量を減らすことにしても、**リクエスト、エラー、およびレイテンシーの[メトリクス][3]** (Requests、Errors、Duration の頭文字をとって RED メトリクスと呼ばれる) は、サンプリング構成に関係なく、アプリケーションの 100% のトラフィックに基づいて計算されるため、100% の精度を維持します。これらのメトリクスは、Datadog APM の購入時に含まれています。アプリケーションのトラフィックを完全に可視化するため、これらのメトリクスを使用して、ダッシュボード、モニター、SLO を作成することで、サービスやリソースの潜在的なエラーを特定できます。

**注**: アプリケーションやサービスが OpenTelemetry ライブラリでインスツルメントされ、SDK レベルやコレクターレベルでサンプリングを設定した場合、APM メトリクスはデフォルトで**サンプリングされた**データセットに基づきます。詳しくは [OpenTelemetry による取り込みサンプリング][4]をご覧ください。

<div class="alert alert-info">サンプリングされていない OpenTelemetry データから APM メトリクスを計算するには、サンプリングプロセッサーの前に<a href="/opentelemetry/setup/collector_exporter/#span-metrics-connector"><code>span_metrics</code> コネクタ</a>を配置します。Datadog Connector は、既存の構成でも同じ結果を実現します。詳細については、<a href="/opentelemetry/ingestion_sampling/">OpenTelemetry による取り込みサンプリング</a>をご覧ください。</div>

トレースデータは非常に反復性が高いため、取り込みサンプリングでも問題を調査するためのトレースサンプルは利用可能です。高スループットのサービスでは通常、すべてのリクエストを収集する必要はありません。十分重要な問題は、常に複数のトレースで症状を示すはずです。取り込み制御は、予算の範囲内で問題のトラブルシューティングに必要な可視性を確保する上で役立ちます。

#### スパンからのメトリクス {#metrics-from-spans}

[スパンからのメトリクス][5]は、取り込まれたスパンに基づいています。

取り込みサンプリングレートを下げると、**count** タイプのメトリクスすべてに影響します。**Distribution** タイプのメトリクス (例: `duration` メジャー) は、サンプリングがほぼ均一で、レイテンシーの分布がトラフィックを代表するままであるため、影響を受けません。

#### モニター {#monitors}

[スパンからのメトリクス](#metrics-from-spans)を使用するすべての **metric** モニターは、取り込み量の減少の影響を受けます。**trace.__** メトリクスに基づくメトリクスモニターは、100% のトラフィックに基づいて計算されるため、正確さを維持します。

カウントベースの [{{< ui >}}Trace analytics{{< /ui >}}][6] モニターにも影響があります。モニター管理ページで `type:trace-analytics` モニターを探して、トレース分析モニターが作成されているかどうかをチェックしてください。

## サービスの取り込み構成を評価する {#assess-your-services-ingestion-configuration}

アプリケーションのインスツルメンテーションの現状を評価するために、Agent および SDK の構成に関する詳細な情報を提供する[トレース取り込み制御ページ][1]を活用してください。

### 月間の取り込み割り当ての範囲内かどうかの把握 {#understanding-if-you-are-within-your-monthly-ingestion-allocation}

取り込み月間使用量 KPI を使用して、APM ホストごとに取り込まれるスパンの月間割り当て 150 GB (すべての APM ホストで合計) と比較して、使用量を推定します。

{{< img src="/tracing/guide/trace_ingestion_volume_control/ingestion_overage.png" alt="全インフラストラクチャーで月間 23.3 TB の推定使用量の 170% が表示されている取り込みオーバー KPI" style="width:40%;" >}}

### APM の高度な使用量調査 {#advanced-apm-usage-investigation}

各サービスごとに取り込み構成を調べることができます。サービス行をクリックすると、Service Ingestion Summary が表示され、以下が示されます。
- {{< ui >}}Ingestion reason breakdown{{< /ui >}}: どの[取り込みメカニズム][2]が取り込み量を担っているか
- {{< ui >}}Top sampling decision makers{{< /ui >}}: [デフォルトの取り込みメカニズム][7]に関して、取り込まれたスパンに対してどの上流サービスがサンプリング決定をしているか

また、取り込みの使用や量に関する過去の傾向をより深く理解するための[すぐに使えるダッシュボード][8]も利用可能です。このダッシュボードを複製すると、ウィジェットの編集やさらなる分析が可能になります。

## 取り込み量を減らす {#reduce-your-ingestion-volume}

### 取り込み量の大部分を占めるサービスを特定する {#identify-services-responsible-for-most-of-the-ingestion-volume}

どのサービスが取り込み量の大部分を占めているかを確認するには、テーブルを {{< ui >}}Downstream Bytes/s{{< /ui >}} でソートします。この列では、どのサービスがサンプリング決定の大部分を行い、それが下流のサービスにも影響を及ぼしているかを見分けることができます。

サービスがトレースを開始している場合、**Downstream Bytes/s** には、サービスがサンプリング決定を行った下流サービスからのスパン量も含まれます。

{{< ui >}}Traffic Breakdown{{< /ui >}} 列を見ると、サービスのサンプリング構成がよくわかります。

Downstream Bytes/s レートが高く、サンプリングレートも高いサービス (トラフィック内訳列の青く塗りつぶされた部分として表示) の場合、このサービスのサンプリングレートを下げると、取り込み量に高い影響を与えることが予想されます。

{{< img src="/tracing/guide/trace_ingestion_volume_control/sampling_99_percent.png" alt="99% のトレースが取り込まれたことが表示されている APM 取り込みサンプリング、つまりサンプリングがない" style="width:70%;" >}}

### Agent レベルで取り込みサンプリングレートをグローバルに構成する {#globally-configure-the-ingestion-sampling-rate-at-the-agent-level}

{{< ui >}}Configuration{{< /ui >}} 列は、サービスにサンプリングルールが構成されているかどうかを示します。上位のサービスが `AUTOMATIC` 構成でラベル付けされている場合、**Agent 構成** を変更すると、サービス全体でボリュームが減少します。

Agent レベルで取り込み量を減らすには、`DD_APM_TARGET_TPS` (デフォルトでは `10` に設定) を構成して、ヘッドベースのサンプリング量のシェアを減らしてください。[デフォルトのサンプリングメカニズム][7]についての詳細を参照してください。

**注**: この構成オプションは、**Datadog SDK** を使用している場合にのみ有効になります。Agent の OTLP Ingest が OpenTelemetry でインスツルメントされたアプリケーションからデータを収集する場合、`DD_APM_TARGET_TPS` を変更しても SDK に適用されるサンプリングレートは変更されません。

さらに、[エラー][9]や[レア][10]トレースの量を減らすには以下を行います。
- エラーサンプリングのシェアを減らすために、`DD_APM_ERROR_TPS` を構成します。
- `DD_APM_DISABLE_RARE_SAMPLER` を true に設定すると、レアトレースのサンプリングが停止します。

### ライブラリレベルでサービスの取り込みサンプリングレートを独立して構成する {#independently-configure-the-ingestion-sampling-rate-for-services-at-the-library-level}

一部の高スループットサービスのサンプリングレートを構成することで、「超過」取り込み量の大部分を低減することができます。

サービスをクリックして {{< ui >}}Service Ingestion Summary{{< /ui >}} を表示します。サイドパネルの {{< ui >}}Ingestion reasons breakdown{{< /ui >}} を確認すると、各メカニズムに起因する取り込み量のシェアの概要を確認することができます。

取り込み量のほとんどの主な理由がヘッドベースサンプリング (`auto` または `rule`) である場合、SDK レベルでサンプリングルールを設定することで、取り込み量を構成することができます。

サービスのサンプリングレートを構成するには、{{< ui >}}Manage Ingestion Rate{{< /ui >}} ボタンをクリックします。サービス言語と、適用する取り込みサンプリングレートを選択します。

**注:** 構成の変更を適用するには、アプリケーションを再デプロイする必要があります。Datadog では、[環境変数][11]を設定して変更を適用することを推奨しています。

### OpenTelemetry によるトレースサンプリング {#trace-sampling-with-opentelemetry}

アプリケーションやサービスが OpenTelemetry ライブラリでインスツルメントされ、OpenTelemetry コレクターを使用している場合、以下の OpenTelemetry サンプリング機能を使用することができます。

- [TraceIdRatioBased][12] と [ParentBased][13] は、**SDK** レベルで trace_id に基づく決定論的なヘッドベースサンプリングを実装することができる 2 つの組み込みサンプラーです。
- [Tail Sampling Processor][14] と [Probabilistic Sampling Processor][15] は、**コレクター**レベルで一連のルールに基づいてトレースをサンプリングすることが可能です。

2 つのオプションのいずれかを使用すると、[APM メトリクス](#effects-of-reducing-trace-ingestion-volume) のサンプリングが行われます。

## 取り込み理由の用語集 {#ingestion-reasons-glossary}

_どの取り込みメカニズムが取り込み量の大部分を担っているのかを把握する_

トレースをサンプリングするデフォルトのメカニズムは、ヘッドベースサンプリングです。トレースをサンプリングするかどうかの判断はライフサイクルの最初に行われ、常に完全なトレースを表示して分析できるようにするために、リクエストのコンテキストで下流に伝搬されます。

ヘッドベースサンプリングは、SDK または Datadog Agent から構成可能です。

| 取り込み理由   | 場所             | 取り込みメカニズムの説明 | デフォルト |
|--------------------|-------------------|-----------------------|---------|
| `auto`             | [Agent](#globally-configure-the-ingestion-sampling-rate-at-the-agent-level)             | Datadog Agent は、サンプリングレートを SDK に配布します。   | 10 トレース/秒/Agent |
| `rule`             | [トレーシングライブラリ](#independently-configure-the-ingestion-sampling-rate-for-services-at-the-library-level) | 特定のサービスに対してライブラリが定めたサンプリング率。  | null                 |


その他のいくつかの取り込み理由は、Ingestion Control ページと `datadog.estimated_usage.apm.ingested_bytes` メトリクスのタグとして表示されます。これらの取り込み理由は、取り込み量の原因になっている可能性があります。

| 取り込み理由   | 場所             | 取り込みメカニズムの説明 | デフォルト |
|--------------------|-------------------|-----------------------|---------|
| `error`            | [Agent](#globally-configure-the-ingestion-sampling-rate-at-the-agent-level)             | ヘッドベースサンプリングで捕捉できないエラーのサンプリング。            | 10 トレース/秒/Agent (ルールが定義されている場合は null) |
| `rare`            | [Agent](#globally-configure-the-ingestion-sampling-rate-at-the-agent-level)             |  レアトレースのサンプリング (一連のスパンタグのすべての組み合わせを捕捉)。       | 5 トレース/秒/Agent (ルールが定義されている場合は null) |
| `manual`             | In-code         | スパンとその子を保持/削除するための、コード内決定のオーバーライド。   | null |
| `analytics`          | Agent とトレーシングライブラリ | フルトレースなしで単一スパンをサンプリングする[非推奨の取り込みメカニズム][16]。  | null                 |

さらに、サンプリングされたスパン量には、他の製品が関与している可能性があります。

- `synthetics` および `synthetics-browser`: API およびブラウザテストは、テストによって生成されたトレースに接続されています。
- `rum`: Web アプリケーションやモバイルアプリケーションからのリクエストは、対応するバックエンドのトレースとリンクしています。
- `lambda`および `xray`: X-Ray または Datadog ライブラリでインスツルメントされた AWS Lambda 関数から生成されたトレース。

取り込みの理由については、[取り込みメカニズムに関するドキュメント][2]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_pipeline/ingestion_controls
[2]: /ja/tracing/trace_pipeline/ingestion_mechanisms/
[3]: /ja/tracing/metrics/metrics_namespace/
[4]: /ja/opentelemetry/guide/ingestion_sampling_with_opentelemetry/
[5]: /ja/tracing/trace_pipeline/generate_metrics/
[6]: /ja/monitors/types/apm/?tab=analytics
[7]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[8]: /ja/tracing/trace_pipeline/metrics/
[9]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#error-traces
[10]: /ja/tracing/trace_pipeline/ingestion_mechanisms/#rare-traces
[11]: /ja/tracing/trace_pipeline/ingestion_mechanisms/?tab=environmentvariables#in-tracing-libraries-user-defined-rules
[12]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#traceidratiobased
[13]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#parentbased
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[15]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[16]: /ja/tracing/legacy_app_analytics