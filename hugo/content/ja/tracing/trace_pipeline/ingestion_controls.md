---
aliases:
- /ja/tracing/trace_ingestion/control_page
- /ja/tracing/trace_ingestion/ingestion_control_page
- /ja/account_management/billing/usage_control_apm/
- /ja/tracing/app_analytics/
- /ja/tracing/guide/ingestion_control_page/
- /ja/tracing/trace_ingestion/ingestion_controls
description: APM で取り込み率を制御する方法。
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tag: ドキュメント
  text: 取り込みのメカニズム
- link: /tracing/trace_pipeline/metrics/
  tag: ドキュメント
  text: 使用量メトリクス
title: 取り込みのコントロール
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="取り込みサンプリングルール" >}}

Ingestion Controls は、アプリケーションから Datadog に送信されるトレースに影響します。[APM メトリクス][1]は常にすべてのトレースに基づいて計算され、Ingestion Controls の影響を受けません。

Ingestion Control ページは、アプリケーションおよびサービスの取り込み構成を可視化します。[取り込みのコントロールページ][2]から:

- サービスレベルの取り込み構成を可視化します。
- 高スループットのサービスやエンドポイントのトレースサンプリングレートを調整し、取り込み予算をより適切に管理します。
- 低スループットでトラフィックがまれなサービスやエンドポイントのトレースサンプリングレートを調整して、可視性を高めます。
- どの[取り込みメカニズム][11]がトレースの大部分をサンプリングしているかを理解します。
- 取り込み構成の潜在的な問題 (Agent の CPU または RAM リソースの制限など) を調査し、対処します。

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_control_page.png" style="width:100%;" alt="Ingestion Control ページの概要" >}}

## 取り込み構成を理解する {#understanding-your-ingestion-configuration}

Ingestion Control ヘッダーのデータを使用して、トレースの取り込みを監視します。ヘッダーには、過去 1 時間に取り込まれたデータの総量、推定月間使用量、およびアクティブな APM インフラストラクチャー (ホスト、Fargate タスク、サーバーレス関数など) に基づいて計算された割り当て済みの月間取り込み制限の割合が表示されます。

月間使用量が `100%` 未満の場合、予測される取り込みデータは月間割り当て内に収まります。月間使用量が `100%` を超える場合、月間取り込みデータは月間割り当てを超えると予測されます。

### サービス別の取り込みレベル {#ingestion-levels-by-service}

サービステーブルには、取り込まれたボリュームと取り込みの構成に関する情報が、サービスごとに分類されて表示されます。

Type
: サービスの種類: ウェブサービス、データベース、キャッシュ、ブラウザなど...

Name
: トレースを Datadog に送信する各サービスの名前。このテーブルには、過去 1 時間にデータが取り込まれたルートサービスと非ルートサービスが含まれています。

Ingested Traces/s
: 過去 1 時間にサービスから取り込まれた 1 秒あたりの平均トレース数。

Ingested Bytes/s
: 過去 1 時間にサービスのために取り込まれた 1 秒あたりの平均バイト数。

Downstream Bytes/s
: サービスが_サンプリングの決定を行った_結果として取り込まれた 1 秒あたりの平均バイト数。これは、トレースの先頭で行われた決定に続くコールスタック内のすべての下流サービスのスパンのバイト数を含みます。この列のデータは、`sampling_service` 次元に基づいており、`datadog.estimated_usage.apm.ingested_bytes` メトリクスに設定されています。詳しくは、[APM 使用状況メトリクス][15]をご覧ください。

Traffic Breakdown
: サービスから開始されたトレースにおける、サンプリングされたトラフィックとサンプリングされていないトラフィックの詳細な内訳。詳細については、[Traffic breakdown](#traffic-breakdown) を参照してください。

Ingestion Configuration
: [デフォルトのヘッドベースサンプリングメカニズム][4]が Agent から適用される場合は `Automatic` を表示します。取り込みが[トレースサンプリングルール][8]で構成されている場合、サービスは `Configured` としてマークされ、SDK の設定からサンプリングルールが適用されると `Local` ラベルが設定され、UI からリモートでサンプリングルールが適用されると `Remote` ラベルが設定されます。サービスの取り込み設定についての詳細は、[デフォルトの取り込みレートの変更](#configure-the-service-ingestion-rate)を参照してください。

Infrastructure
: サービスが実行しているホスト、コンテナ、および関数。

Service status
: Datadog Agent が[その構成で][9]設定された CPU や RAM の限界に達したために一部のスパンがドロップされた場合は `Limited Resource`、一部のスパンがレガシーの [App Analytics メカニズム][7]を通じて取り込まれた場合は `Legacy Setup`、それ以外は `OK` と表示されます。

環境、設定、およびステータスでページをフィルタリングして、対応が必要なサービスを表示します。グローバルな取り込み量を減らすには、`Downstream Bytes/s` 列でテーブルをソートし、取り込みの最大シェアを占めるサービスを表示します。

**注**: テーブルは[使用状況メトリクス][10]の `datadog.estimated_usage.apm.ingested_spans`と`datadog.estimated_usage.apm.ingested_bytes` によって提供されています。これらのメトリクスは `service`、`env` および `ingestion_reason` にタグ付けされています。

#### Traffic breakdown {#traffic-breakdown}

Traffic Breakdown 列は、サービスから開始されるすべてのトレースの宛先を内訳表示します。取り込まれたトラフィックおよびドロップされたトラフィックの割合と、その理由の推定値を提供します。

{{< img src="tracing/trace_indexing_and_ingestion/service_traffic_breakdown.png" style="width:100%;" alt="トレース取り込みの Traffic breakdown" >}}

詳細は、以下の部分に分かれています。

- **Complete traces ingested** (青色): Datadog により取り込まれたトレースの割合。
- **Complete traces not retained** (灰色): Datadog により取り込まれていないトレースの割合。いくつかのトレースは以下の理由でドロップされる可能性があります。

    1. デフォルトでは、[Agent が自動的にサンプリングレートを設定][4]がサービスのトラフィックに応じて設定されます。
    2. サービスは、[サンプリングルール][8]を使用して特定の割合のトレースを取り込むように構成されています。

- **Complete traces dropped by the SDK rate limiter** (オレンジ色): トレースサンプリングルールでサービスの取り込み率を手動で設定することを選択した場合、デフォルトで 100 トレース/秒に設定されているレートリミッターが自動的に有効になっています。このレートを変更するには、[レートリミッター][8]のドキュメントを参照してください。

- **Traces dropped due to the Agent CPU or RAM limit** (赤色): このメカニズムはスパンをドロップし、不完全なトレースを生成する可能性があります。これを修正するには、Agent が実行されるインフラストラクチャーの CPU およびメモリの割り当てを増やしてください。

## サービスの取り込みを構成する {#configuring-ingestion-for-a-service}

任意のサービスをクリックすると、サービス取り込みの概要が表示され、そのサービスのトレース取り込みを管理するための実用的なインサイトと構成オプションを確認できます。

### サービスの取り込み構成 {#ingestion-configuration-for-a-service}

#### リソース別のサンプリングレート {#sampling-rates-by-resource}

この表は、サービスのリソースごとに適用されたサンプリングレートを一覧表示します。

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="リソース別のサンプリングレートテーブル" style="width:100%;">}}

- `Ingested bytes` 列は、サービスとリソースのスパンから取り込まれたバイト数を示し、`Downstream bytes` 列は、そのサービスとリソースから開始されるサンプリングの決定が行われたスパンから取り込まれたバイト数を示し、コールチェーン内の下流サービスからのバイトも含まれます。
- `Configuration` 列は、リソースのサンプリングレートがどこから適用されているかを示します。
  - `Automatic` [デフォルトのヘッドベースサンプリングメカニズム][4]が Agent から適用される場合。
  - `Local Configured` SDK 内で[サンプリングルール][8]がローカルに設定されている場合。
  - `Remote Configured` Datadog UI からリモートの sampling rule が設定されている場合。取り込みのコントロールページからサンプリングルールを構成する方法については、[リモートでのサンプリングルールの構成](#configure-the-service-ingestion-rates-by-resource)のセクションを参照してください。

**注**: サービスがサンプリングの決定を行っていない場合、そのサービスのリソースは `Resources not making sampling decisions` 行の下にまとめられます。

**注**: 短い時間枠 (1〜4 時間) では、Effective Sampling Rate が100%に設定されていても100%未満で表示されることがあります。これは、統計計算の収束により多くのデータポイントが必要となるために発生する想定された動作です。すべてのトレースは引き続き正しくキャプチャされています。より正確に表示するには、より長い期間でのサンプリングレートを確認してください。

#### 取り込み理由とサンプリングの決定要因 {#ingestion-reasons-and-sampling-decision-makers}

**取り込み理由の内訳**を確認して、サービスの取り込みに影響しているメカニズムを把握してください。各取り込み理由は、特定の[取り込みメカニズム][11]に関連しています。サービスの取り込み設定を変更した後、過去 1 時間の取り込みデータに基づく取り込みバイト数およびスパン数の増減を、この時系列グラフで確認できます。

サービスの取り込み量の大部分が上流サービスによる判断に起因している場合は、**サンプリングの決定要因**のトップリストの詳細を確認してください。例えば、サービスが非ルートである場合 (つまり、トレースをサンプリングすることを**決して判断しない**場合)、非ルートサービスの取り込みに影響しているすべての上流サービスを確認してください。上流のルートサービスを構成して、全体の取り込み量を削減してください。

[APM Trace - 推定使用量ダッシュボード][12]は、グローバルな取り込み情報と、`service`、`env`、`ingestion reason` 別の内訳グラフを提供し、さらなる調査を行うことができます。

#### Agent と SDK のバージョン {#agent-and-sdk-versions}

サービスが使用している **Datadog Agent と SDK のバージョン**を確認してください。使用中のバージョンを最新のリリースされたバージョンと比較し、最新かつ最新の Agent とライブラリを実行していることを確認してください。

{{< img src="tracing/trace_indexing_and_ingestion/agent_tracer_version.png" style="width:90%;" alt="Agent と SDK のバージョン" >}}

### サービスのサンプリングレートの管理 {#managing-services-sampling-rates}

サービスのサンプリングレートを制御するには、次の方法を使用してください。
- **Adaptive sampling**: 設定された月間取り込みボリューム予算に合わせて、サンプリングレートを自動的に調整します。
- **Resource-based sampling**: リソースごとに明示的なサンプリングレートを手動で設定します。

これらの戦略の設定は、Datadog UI を通じて**リモートで**適用できます。この方法では、サービスを再デプロイすることなく、変更を即座に有効化できます。**Resource-based Sampling** では、サービスの設定ファイルを更新して再デプロイすることにより、設定を**ローカルに**適用するオプションもあります。

サービスの取り込みレートに **Remote Configuration** を使用するには、特定の要件があります。

{{% collapse-content title="Remote Configuration の要件" level="h4" expanded="false" id="remote-configuration-requirements" %}}

- Datadog Agent [7.41.1][19] 以上。
- [リモート構成][3]が Agent で有効になっていること
- `APM Remote Configuration Write`[権限][20]。これらの権限がない場合は、Datadog の管理者に組織の設定から権限を更新してもらうよう依頼してください。

機能に必要な最小 SDK バージョンは以下のとおりです。

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

#### Adaptive sampling {#adaptive-sampling}

Adaptive sampling を使用して、Datadog がサービスのサンプリングレートを代わりに管理できるようにします。1 つまたは複数のサービスに対してターゲット月間取り込み量を指定し、すべてのサービスとエンドポイントの可視性を維持します。

Adaptive sampling を構成するには:

1. [取り込みのコントロール][2]ページに移動します。
2. サービスをクリックして、**Service Ingestion Summary** を確認します。
3. **Manage Ingestion Rate** をクリックします。
4. **Datadog adaptive sampling rates** をサービスのサンプリング戦略として選択します。
5. **Apply** をクリックします。

<div class="alert alert-info">この構成を<strong>リモート</strong>で適用することが無効になっている場合は、<a href="#remote-configuration-requirements">Remote Configuration の要件</a> が満たされていることを確認してください。</div>

詳細については、[アダプティブサンプリング][17]を参照してください。


#### Resource-based sampling {#resource-based-sampling}

リソース名によってサービスのカスタムサンプリングレートを構成するには:
1. [取り込みのコントロール][2]ページに移動します。
2. サービスをクリックして、**Service Ingestion Summary** を確認します。
3. **Manage Ingestion Rate** をクリックします。
4. **Custom sampling rates only** をクリックします。
5. **Add new rule** をクリックして、一部のリソースのサンプリングレートを設定します。 
   **注**: サンプリングルールはグロブパターンマッチングを使用するため、ワイルドカード (`*`) を使用して複数のリソースに同時に一致させることができます。
   {{< img src="/tracing/trace_indexing_and_ingestion/sampling_configuration_custom.png" alt="構成モーダル" style="width:100%;">}}
6. 構成を**リモートで**または**ローカルで**適用します。
{{< tabs >}}
{{% tab "リモートで" %}}

このオプションは Remote Configuration を使用して構成を適用するため、変更を有効にするためにサービスを再デプロイする**必要はありません**。構成の変更は [Live Search Explorer][100] で確認できます。

**Apply** をクリックして構成を保存します。

リモートで構成されたリソースは、**Configuration** 列に `Configured Remote` として表示されます。 

<br><div class="alert alert-info">この構成を<strong>リモート</strong>で適用することが無効になっている場合は、<a href="#remote-configuration-requirements">Remote Configuration の要件</a> が満たされていることを確認してください。</div>

[100]: /ja/tracing/trace_explorer/?tab=listview#live-search-for-15-minutes

{{% /tab %}}

{{% tab "ローカルで" %}}

このオプションは、手動で適用するための構成を生成します。
1. 生成された構成をサービスに適用します。 
   **注**: サービス名の値は大文字と小文字を区別します。サービス名の大文字・小文字を一致させる必要があります。
1. サービスを再デプロイします。
1. 新しい割合が **Traffic Breakdown** 列に適用されたことを確認します。ローカルで構成されたリソースは、**Configuration** 列に `Configured Local` として表示されます。

{{% /tab %}}
{{< /tabs >}}

## Datadog Agent の取り込み構成を管理する {#managing-datadog-agent-ingestion-configuration}

**Configure Datadog Agent Ingestion** をクリックして、デフォルトのヘッドベースのサンプリングレート、エラーサンプリング、およびレアサンプリングを管理します。

{{< img src="tracing/trace_indexing_and_ingestion/agent_level_configurations_modal.png" style="width:70%;" alt="エージェントレベル構成モーダル" >}}

- **[ヘッドベースサンプリング][4]**: サービスに対してサンプリングルールが設定されていない場合、Datadog Agent は自動的にサービスに適用されるサンプリングレートを計算し、**Agent あたり 10 トレース/秒**を目標とします。Datadog でこの目標トレース数を変更するか、Agent レベルでローカルに `DD_APM_TARGET_TPS` を設定します。
- **[エラースパンサンプリング][5]**: ヘッドベースサンプリングで捕捉されなかったトレースについて、Datadog Agent は、**Agent あたり最大 10 トレース/秒**でローカルエラートレースを捕捉します。Datadog でこの目標トレース数を変更するか、Agent レベルでローカルに `DD_APM_ERROR_TPS` を設定します。
- **[レアスパンサンプリング][6]**: ヘッドベースのサンプリングで捕捉されないトレースについて、Datadog Agent は、**Agent ごとに最大で毎秒 5 トレースの**ローカルレアレースを捕捉します。この設定はデフォルトで無効になっています。Datadog でレアトレースの収集を有効にするか、`DD_APM_ENABLE_RARE_SAMPLER` を Agent レベルでローカルに設定します。

Remote Configuration を使用すると、これらのパラメーターを更新するために Agent を再起動する必要はありません。`Apply` をクリックして構成の変更を保存すると、新しい構成が即座に有効になります。Agent のサンプリングパラメーターの Remote Configuration は、Agent バージョン [7.42.0][13] 以上を使用している場合に利用可能です。

**注**: 円グラフの `Other Ingestion Reasons` (グレー) セクションは、Datadog Agent レベルで_構成不可能_なその他の取り込み理由を表します。

**注**: リモートで構成されたパラメーターは、環境変数や `datadog.yaml` の構成など、ローカルでの構成よりも優先されます。

## サンプリングルールの優先順位 {#sampling-rules-precedence}

複数の場所にサンプリングルールが設定されている場合、次の優先順位ルールが順に適用されます。リストの上位にあるルールは、下位の優先順位のルールを上書きできます。

1. リモートで構成されたサンプリングルールは、[resource-based sampling](#configure-the-service-ingestion-rates-by-resource) を通じて設定されます。
1. [アダプティブサンプリングルール][17]
1. [ローカルで構成されたサンプリングルール][8] (`DD_TRACE_SAMPLING_RULES`)
1. [リモートで構成されたグローバルサンプリングレート][8]
1. [ローカルで構成されたグローバルサンプリングレート][8] (`DD_TRACE_SAMPLE_RATE`)
1. [トレース Agent のレート (Agent 設定によって間接的に制御)](#managing-datadog-agent-ingestion-configuration) をリモートまたはローカルで (`DD_APM_TARGET_TPS`)

別の言い方をすれば、Datadog は以下の優先順位ルールを使用します。
- Tracer settings > Agent settings
- Sampling rules > Global sampling rate
- Remote > Local

## 参考資料 {#further-reading}

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