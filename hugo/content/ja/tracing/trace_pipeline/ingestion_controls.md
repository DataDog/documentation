---
aliases:
- /ja/tracing/trace_ingestion/control_page
- /ja/tracing/trace_ingestion/ingestion_control_page
- /ja/account_management/billing/usage_control_apm/
- /ja/tracing/app_analytics/
- /ja/tracing/guide/ingestion_control_page/
- /ja/tracing/trace_ingestion/ingestion_controls
description: APM を使用して取り込みレートを制御する方法をご確認ください。
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tag: ドキュメント
  text: 取り込みメカニズム
- link: /tracing/trace_pipeline/metrics/
  tag: ドキュメント
  text: 使用状況に関するメトリクス
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: アーキテクチャセンター
  text: '分散トレーシングの習得: データ量の課題と、効率的なサンプリングに向けた Datadog のアプローチ'
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: アーキテクチャセンター
  text: '分散トレーシングの最適化: 予算内で重要なトレースをキャプチャするためのベストプラクティス'
title: Ingestion Control
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="取り込みサンプリングルール" >}}

Ingestion Control は、アプリケーションから Datadog にどのトレースが送信されるかに影響を与えます。[APM メトリクス][1] は常にすべてのトレースに基づいて計算され、Ingestion Control には影響されません。

Ingestion Control ページには、アプリケーションとサービスでの取り込み構成が可視化されます。[Ingestion Control ページ][2] は、次の目的で使用できます。

- サービスレベルの取り込み構成を把握する。
- 取り込みの予算を適切に管理するために、高スループットのサービスやエンドポイントのトレースサンプリングレートを調整する。
- 可視性を高めるために、低スループットでトラフィックの少ないサービスやエンドポイントのトレースサンプリングレートを調整する。
- どの [取り込みメカニズム][11] がトレースサンプリングの大部分を担っているかを把握する。
- Agent で使用できる CPU リソースや RAM リソースの制限など、取り込み構成に関する潜在的な問題を調査し、対処する。

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_control_page.png" style="width:100%;" alt="Ingestion Control ページの概要" >}}

## 取り込み構成について {#understanding-your-ingestion-configuration}

トレース取り込みを監視するには、Ingestion Control ヘッダーのデータを使用します。ヘッダーには、過去 1 時間に取り込まれたデータの合計量、推定月間使用量、およびアクティブな APM インフラストラクチャー (ホスト、Fargate タスク、サーバーレス関数など) に基づいて計算された、割り当てられた月間の取り込み制限の割合が表示されます。

月間使用量が `100%` 未満であれば、取り込まれると予測されるデータ量は月間割り当て量に収まります。月間使用量の値が `100%` を超える場合、これは、1 か月あたりに取り込まれるデータ量が月間割り当て量を超える見込みであることを意味します。

### サービス別の取り込みレベル {#ingestion-levels-by-service}

サービステーブルには、取り込み量と取り込み構成に関する情報がサービスごとに分類されて記載されます。

タイプ
: サービスタイプ: Web サービス、データベース、キャッシュ、ブラウザなど。

名前
: Datadog にトレースを送信している各サービスの名前。このテーブルには、過去 1 時間にデータ取り込みの対象となったルートサービスと非ルートサービスが記載されます。

取り込まれたトレース数/秒
: 過去 1 時間に取り込まれた、当該サービスを起点とするトレースの 1 秒あたりの平均数。

取り込まれたバイト数/秒
: 過去 1 時間に当該サービスを対象に 1 秒あたりに取り込まれた平均バイト数。

ダウンストリームバイト数/秒
: 当該サービスが_サンプリングの決定_を行えるように 1 秒あたりに取り込まれた平均バイト数。これには、トレースの先頭で行われた決定に従った、コールスタック内のすべてのダウンストリームサービスのスパンのバイト数が含まれます。この列のデータは、`datadog.estimated_usage.apm.ingested_bytes` メトリクスで設定された `sampling_service` ディメンションに基づきます。詳細については、[APM 使用状況に関するメトリクス][15] をお読みください。

トラフィックの内訳
: サービスを起点とするトレースを目的にサンプリングされたトラフィックとサンプリングされなかったトラフィックの詳細な内訳。詳細については、[トラフィックの内訳](#traffic-breakdown)を参照してください。

取り込み構成
: Agent の [デフォルトのヘッドベースサンプリングメカニズム][4] が適用されている場合は、`Automatic` と示されます。取り込み構成に [トレースサンプリングルール][8] が設定されている場合、そのサービスは `Configured` としてマークされます。SDK の構成に含まれるサンプリングルールが適用されている場合は `Local` ラベルが、UI からリモートでサンプリングルールが適用されている場合は `Remote` ラベルが設定されます。サービスでの取り込みを構成する方法の詳細については、[デフォルトの取り込みレートの変更](#configure-the-service-ingestion-rate)に関するドキュメントをお読みください。

インフラストラクチャー
: サービスが実行されているホスト、コンテナ、および関数。

サービスステータス
: Datadog Agent が [その構成][9] で設定されている CPU または RAM の制限に達したために一部のスパンがドロップされた場合は `Limited Resource`と示されます。レガシーの [App Analytics メカニズム][7] によって一部のスパンが取り込まれた場合は `Legacy Setup` と示されます。それ以外の場合は `OK` と示されます。

環境、構成、ステータスでページをフィルタリングして、アクションが必要なサービスを表示します。全体的な取り込み量を削減するには、`Downstream Bytes/s` 列でテーブルを並べ替えて、取り込みの大部分を占めているサービスを確認します。

**注**: このテーブルには、[使用状況メトリクス][10]`datadog.estimated_usage.apm.ingested_spans`および `datadog.estimated_usage.apm.ingested_bytes` が活用されています。これらのメトリクスには、`service`、`env` および `ingestion_reason` でタグが付けられています。

#### トラフィックの内訳 {#traffic-breakdown}

トラフィックの内訳列には、当該サービスを起点とするすべてのトレースの宛先の内訳が表示されます。取り込まれたトラフィックとドロップされたトラフィックの割合の推定値、およびドロップされた理由を確認できます。

{{< img src="tracing/trace_indexing_and_ingestion/service_traffic_breakdown.png" style="width:100%;" alt="トレース取り込みのトラフィック内訳" >}}

この内訳は、次の要素で構成されています。

- {{< ui >}}Complete traces ingested{{< /ui >}} (青): Datadog に取り込まれたトレースの割合。
- {{< ui >}}Complete traces not retained{{< /ui >}}(グレー): Datadog に取り込まれなかったトレースの割合。一部のトレースは、次の理由でドロップされる可能性があります。

    1. デフォルトでは、サービスのトラフィックに応じて、[Agent が自動的にサンプリングレートを設定][4] します。
    2. 当該サービスが、[サンプリングルール][8] に従って特定の割合のトレースを取り込むように構成されています。

- {{< ui >}}Complete traces dropped by the SDK rate limiter{{< /ui >}}(オレンジ): トレースサンプリングルールでサービスの取り込みレートをパーセンテージとして手動で設定した場合、レートリミッターが自動的に有効になります。この場合、デフォルトではレート制限が 1 秒あたり 100 トレースに設定されます。このレートを変更するには、[レートリミッター][8] のドキュメントを参照してください。

- {{< ui >}}Traces dropped due to the Agent CPU or RAM limit{{< /ui >}}(赤): このメカニズムでは、スパンがドロップされて不完全なトレースが作成される可能性があります。これを修正するには、Agent が実行されているインフラストラクチャーの CPU およびメモリ割り当てを増やしてください。

## サービスでの取り込みを構成する {#configuring-ingestion-for-a-service}

任意のサービスをクリックすると、そのサービスでお取り込みの概要が表示され、そのサービスでのトレース取り込みを管理するための実用的なインサイトと構成オプションが提示されます。

### サービスの取り込み構成 {#ingestion-configuration-for-a-service}

#### リソース別のサンプリングレート {#sampling-rates-by-resource}

このテーブルには、サービスで適用されるサンプリングレートがリソース別に一覧表示されます。

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="リソース別のサンプリングレートテーブル" style="width:100%;">}}

- `Ingested bytes` 列には、サービスとリソースのスパンから取り込まれたバイト数が示されます。一方、`Downstream bytes` 列には、そのサービスとリソースからサンプリングの決定が開始されたスパンから取り込まれたバイト数が示されます (これには、呼び出しチェーン内のダウンストリームサービスから取り込まれたバイト数も含まれます)。
- `Configuration` 列には、リソースのサンプリングレートがどこから適用されているかが示されます。
  - `Automatic`: Agent の [デフォルトのヘッドベースサンプリングメカニズム][4] が適用されている場合。
  - `Local Configured`: [サンプリングルール][8] が SDK でローカルに設定されている場合。
  - `Remote Configured`: Datadog UI からリモートでサンプリングルールが設定される場合。Ingestion Control ページでサンプリングルールを構成する方法については、[リモートでのサンプリングルールの構成](#configure-the-service-ingestion-rates-by-resource)に関するセクションをお読みください。

**注**: サービスがサンプリングの決定を行わない場合は、そのサービスのリソースは `Resources not making sampling decisions` 行の下に折りたたまれます。

**注**: 短い時間枠 (1 〜 4 時間) では、有効サンプリングレートが 100% に設定されている場合でも、100% 未満として表示されることがあります。これは、収束するためにより多くのデータポイントを必要とする統計計算による想定内の動作です。すべてのトレースは引き続き正しくキャプチャされます。最も正確な表示にするには、サンプリングレートを表示する対象の期間を長くしてください。

#### 取り込みの理由とサンプリングの決定を下す要素 {#ingestion-reasons-and-sampling-decision-makers}

{{< ui >}}Ingestion reasons breakdown{{< /ui >}} を調べて、どのメカニズムがサービスでの取り込みに関与しているかを確認します。各インジェクションの理由は、特定の [インジェクトメカニズム][11] に関連しています。サービスでの取り込み構成を変更した後、過去 1 時間に取り込まれたデータに基づくこの時系列グラフで、取り込まれたバイト数およびスパン数の増減を確認できます。

サービスのデータ取り込み量の大部分がアップストリームサービスによる決定に起因する場合は、{{< ui >}}Sampling decision makers{{< /ui >}} トップリストの詳細を調査します。たとえば、サービスが非ルートである場合 (つまり、トレースをサンプリングするかどうかを**決定しない**場合)、非ルートサービスの取り込みを担当するすべてのアップストリームサービスを観察してください。全体的な取り込み量を削減するには、アップストリームのルートサービスを構成します。

詳細な調査を行うには、[APM Trace - Estimated Usage Dashboard][12] を使用します。このダッシュボードには、グローバルな取り込み情報に加え、`service`、`env`、`ingestion reason` 別の内訳グラフが表示されます。

#### Agent と SDK のバージョン {#agent-and-sdk-versions}

サービスで使用している {{< ui >}}Datadog Agent and SDK versions{{< /ui >}} を確認します。使用中のバージョンを最新のリリースバージョンと比較して、最新の Agent とライブラリを実行するようにしてください。

{{< img src="tracing/trace_indexing_and_ingestion/agent_tracer_version.png" style="width:90%;" alt="Agent と SDK のバージョン" >}}

### サービスのサンプリングレートの管理 {#managing-services-sampling-rates}

サービスのサンプリングレートを制御するには、次の方法を使用できます。
- {{< ui >}}Adaptive sampling{{< /ui >}}: 構成済みの月間取り込み量予算に合わせて、サンプリングレートを自動的に調整します。
- {{< ui >}}Resource-based sampling{{< /ui >}}: リソースごとに明示的なサンプリングレートを手動で設定します。

これらの戦略の構成は、Datadog UI を使用して{{< ui >}}Remotely{{< /ui >}}適用できます。この方法では、サービスを再デプロイすることなく、変更を即座に反映させることができます。{{< ui >}}Resource-based Sampling{{< /ui >}} については、サービスの構成ファイルを更新して再デプロイすることで、**ローカル**に構成を適用するオプションもあります。

サービスのインジェクションレートに **Remote Configuration** を使用するには、特定の要件が適用されます。

{{% collapse-content title="Remote Configuration の要件" level="h4" expanded="false" id="remote-configuration-requirements" %}}

- Datadog Agent [7.41.1][19] 以降。
- Agent で [Remote Configuration][3] が有効になっていること。
- `APM Remote Configuration Write`[権限][20]。これらの権限がない場合は、Datadog 管理者に依頼して、組織設定で権限を更新してもらってください。

この機能に必要な最小 SDK バージョンは次のとおりです。

| 言語 | 必要な最小バージョン |
|----------|--------------------------|
| Java     | v1.34.0                  |
| Go       | v1.64.0                  |
| Python   | v.2.9.0                  |
| Ruby     | v2.0.0                   |
| Node.js  | v5.16.0                  |
| PHP      | v1.4.0                   |
| .NET     | v2.53.2                  |
| C++      | v0.2.2                   |

{{% /collapse-content %}}

#### 適応型サンプリング {#adaptive-sampling}

Datadog がお客様に代わってサービスのサンプリングレートを管理できるようにするには、適応型サンプリングを使用します。すべてのサービスとエンドポイントの可視性を維持しながら、1 つまたは複数のサービスの目標月間取り込み量を指定できます。

適応型サンプリングを構成するには:

1. [Ingestion Control][2] ページに移動します。
2. サービスをクリックして、{{< ui >}}Service Ingestion Summary{{< /ui >}} を表示します。
3. {{< ui >}}Manage Ingestion Rate{{< /ui >}} をクリックします。
4. サービスのサンプリング戦略として {{< ui >}}Datadog adaptive sampling rates{{< /ui >}} を選択します。
5. {{< ui >}}Apply{{< /ui >}} をクリックします。

<div class="alert alert-info">この構成を <strong>Remotely</strong> で適用できない場合は、<a href="#remote-configuration-requirements">Remote Configuration の要件</a>が満たされていることを確認してください。</div>

詳細については、[適応型サンプリング][17] を参照してください。


#### リソースベースのサンプリング {#resource-based-sampling}

リソース名ごとにサービスのカスタムサンプリングレートを構成するには:
1. [Ingestion Control][2] ページに移動します。
2. サービスをクリックして、{{< ui >}}Service Ingestion Summary{{< /ui >}} を表示します。
3. {{< ui >}}Manage Ingestion rate{{< /ui >}} をクリックします。
4. {{< ui >}}Custom sampling rates only{{< /ui >}} をクリックします。
5. {{< ui >}}Add new rule{{< /ui >}} をクリックし、一部のリソースのサンプリングレートを設定します。 
   **注**: サンプリングルールはグロブパターンマッチングを使用するため、ワイルドカード (`*`) を使用して複数のリソースを同時に照合できます。
   {{< img src="/tracing/trace_indexing_and_ingestion/sampling_configuration_custom.png" alt="構成モーダル" style="width:100%;">}}
6. 構成を{{< ui >}}Remotely{{< /ui >}}または{{< ui >}}Locally{{< /ui >}}で適用します。
{{< tabs >}}
{{% tab "Remotely" %}}

このオプションは Remote Configuration を使用して構成を適用するため、変更を有効にするためにサービスを再デプロイする必要は**ありません**。構成の変更は、[Live Search Explorer][100] から確認できます。

{{< ui >}}Apply{{< /ui >}} をクリックして構成を保存します。

Remotely で構成されたリソースは、`Configured Remote` 列に {{< ui >}}Configuration{{< /ui >}} として表示されます。 

<br><div class="alert alert-info">この構成を <strong>Remotely</strong> で適用できない場合は、<a href="#remote-configuration-requirements">Remote Configuration の要件</a>が満たされていることを確認してください。</div>

[100]: /ja/tracing/trace_explorer/?tab=listview#live-search-for-15-minutes

{{% /tab %}}

{{% tab "Locally" %}}

このオプションにより、手動で適用するための構成が生成されます。
1. 生成された構成をサービスに適用します。 
   **注**: サービス名の値では、大文字と小文字が区別されます。サービス名の大文字と小文字は一致していなければなりません。
1. サービスを再デプロイします。
1. {{< ui >}}Traffic Breakdown{{< /ui >}} 列を調べて、新しいパーセンテージが適用されていることを確認します。ローカルで構成されたリソースは、`Configured Local` 列に {{< ui >}}Configuration{{< /ui >}} として表示されます。

{{% /tab %}}
{{< /tabs >}}

## Datadog Agent 取り込み構成の管理 {#managing-datadog-agent-ingestion-configuration}

{{< ui >}}Configure Datadog Agent Ingestion{{< /ui >}} をクリックして、デフォルトのヘッドベースサンプリングレート、エラーサンプリング、レアサンプリングを管理します。

{{< img src="tracing/trace_indexing_and_ingestion/agent_level_configurations_modal.png" style="width:70%;" alt="Agent レベルの構成モーダル" >}}

- [{{< ui >}}Head-based Sampling{{< /ui >}}][4]: サービスにサンプリングルールが設定されていない場合、Datadog Agent は **Agent あたり毎秒 10 トレース**をターゲットに自動的にサンプリングレートを計算してサービスに適用します。このターゲットトレース数を Datadog で変更するか、Agent レベルでローカルに `DD_APM_TARGET_TPS` を設定します。
- [{{< ui >}}Error Spans Sampling{{< /ui >}}][5]: ヘッドベースサンプリングでキャプチャされなかったトレースについて、Datadog Agent は **Agent あたり毎秒最大 10 トレース**としてローカルのエラートレースをキャプチャします。このターゲットトレース数を Datadog で変更するか、Agent レベルでローカルに `DD_APM_ERROR_TPS` を設定します。
- [{{< ui >}}Rare Spans Sampling{{< /ui >}}][6]: ヘッドベースサンプリングでキャプチャされなかったトレースについて、Datadog Agent は **Agent あたり毎秒最大 5 トレース**としてローカルのエラートレースをキャプチャします。この設定はデフォルトで無効になっています。Datadog でレアトレースの収集を有効にするか、Agent レベルでローカルに `DD_APM_ENABLE_RARE_SAMPLER` を設定します。

リモート構成を使用すると、Agent を再起動しなくても、これらのパラメーターを更新できます。`Apply` をクリックして構成の変更を保存すると、新しい構成がすぐに有効になります。Agent サンプリングパラメーターのリモート構成は、Agent バージョン [7.42.0][13] 以降を使用している場合にご利用いただけます。

**注**: 円グラフの `Other Ingestion Reasons` (グレー) セクションは、Datadog Agent レベルでは_構成できない_その他の取り込み理由を表しています。

**注**: リモートで構成されたパラメーターは、環境変数や `datadog.yaml` 構成などのローカル構成よりも優先されます。

## サンプリングルールの優先順位 {#sampling-rules-precedence}

サンプリングルールが複数の場所に設定されている場合、次の優先順位ルールが順に適用されます。この場合、リストの最初に表示されているルールで低い優先順位のルールを上書きできます。

1. リモートで構成されたサンプリングルール ([リソースベースのサンプリング](#configure-the-service-ingestion-rates-by-resource) によって設定)
1. [適応型サンプリングルール][17]
1. [ローカルで構成されたサンプリングルール][8] (`DD_TRACE_SAMPLING_RULES`)
1. [リモートで構成されたグローバルサンプリングレート][8]
1. [ローカルで構成されたグローバルサンプリングレート][8] (`DD_TRACE_SAMPLE_RATE`)
1. [リモートまたはローカルの Agent 設定で間接的に制御される Trace Agent によるレート](#managing-datadog-agent-ingestion-configuration) (`DD_APM_TARGET_TPS`)

言い換えると、Datadog は次の優先順位ルールに従います。
- トレース設定 > Agent 設定
- サンプリングルール > グローバルサンプリングレート
- リモート > ローカル

## 参考文献 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/metrics/metrics_namespace/
[2]: https://app.datadoghq.com/apm/traces/ingestion-control
[3]: /ja/tracing/guide/remote_config
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
[14]: /ja/remote_configuration#enabling-remote-configuration
[15]: /ja/tracing/trace_pipeline/metrics#what-is-the-sampling-service
[17]: /ja/tracing/trace_pipeline/adaptive_sampling/
[18]: /ja/tracing/guide/trace_ingestion_volume_control/#globally-configure-the-ingestion-sampling-rate-at-the-agent-level
[19]: https://github.com/DataDog/datadog-agent/releases/tag/7.41.1
[20]: /ja/account_management/rbac/permissions/