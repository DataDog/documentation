---
algolia:
  tags:
  - apm issues
  - apm faq
  - tracing troubleshooting
  - apm common issues
aliases:
- /ja/tracing/faq/my-trace-agent-log-renders-empty-service-error/
- /ja/tracing/troubleshooting/faq_apm/
further_reading:
- link: /tracing/troubleshooting/connection_errors
  tag: Documentation
  text: 接続エラー
- link: /tracing/troubleshooting/tracer_startup_logs/
  tag: Documentation
  text: Datadog トレーサー起動ログ
- link: /tracing/troubleshooting/tracer_debug_logs/
  tag: Documentation
  text: Datadog トレーサーデバッグログ
- link: /tracing/troubleshooting/agent_apm_metrics/
  tag: ドキュメント
  text: Datadog Agent によって送信された APM メトリクス
- link: /tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
  tag: ドキュメント
  text: Custom retention filter
- link: /tracing/trace_pipeline/ingestion_mechanisms/?tab=java
  tag: ドキュメント
  text: Trace Ingestion Sampling
- link: /tracing/troubleshooting/#data-volume-guidelines
  tag: ドキュメント
  text: データボリュームガイドライン
- link: /integrations/
  tag: ドキュメント
  text: Datadog の全インテグレーション一覧
- link: /tracing/guide/inferred-service-opt-in/
  tag: ドキュメント
  text: Inferred Service dependencies (beta)
title: APM トラブルシューティング
---

If you experience unexpected behavior while using Datadog APM, read the information on this page to help resolve the issue. Datadog recommends regularly updating to the latest version of the Datadog tracing libraries you use, as each release contains improvements and fixes. If you continue to experience issues, reach out to [Datadog support][1].

APM データを Datadog に送信する際には、以下のコンポーネントが関与します。

{{< img src="tracing/troubleshooting/troubleshooting_pipeline_info_1.png" alt="APM Troubleshooting Pipeline">}}

For more information, see [Additional support](#additional-support).

## トレースの保持

This section addresses issues related to trace data retention and filtering across Datadog.

{{% collapse-content title="There are more spans in the Trace Explorer than on the Monitors page" level="h4" %}}

If you haven't set up [custom retention filters][19], this is expected behavior. Here's why:

The [Trace Explorer][20] page allows you to search all ingested or indexed spans using any tag. Here, you can query any of your traces.

By default, after spans have been ingested, they are retained by the [Datadog intelligent filter][21]. Datadog also has other [retention filters][22] that are enabled by default to give you visibility over your services, endpoints, errors, and high-latency traces.

However, to use these traces in your monitors, you must set [custom retention filters][19].

Custom retention filters allow you to decide which spans are indexed and [retained][23] by creating, modifying, and disabling additional filters based on tags. You can also set a percentage of spans matching each filter to be retained. These indexed traces can then be used in your monitors.

| PRODUCT                                                | SPAN SOURCE                                                      |
|--------------------------------------------------------|------------------------------------------------------------------|
| モニター                                               | Spans from custom retention filters                              |
| Other products <br> <i> (Dashboard, Notebook etc.)</i> | Spans from custom retention filters + Datadog intelligent filter |

{{% /collapse-content %}}

## トレースメトリクス

This section covers troubleshooting discrepancies and inconsistencies with trace metrics.

{{% collapse-content title="Trace metrics and custom span-based metrics have different values" level="h4" %}}

Trace metrics and custom span-based metrics can have different values because they are calculated based on different datasets:

- [Trace metrics][24] are calculated based on 100% of the application's traffic, regardless of your [trace ingestion sampling][25] configuration. The trace metrics namespace follows this format: `trace.<SPAN_NAME>.<METRIC_SUFFIX>`.
- [Custom span-based metrics][26] are generated based on your ingested spans, which depend on your [trace ingestion sampling][25]. For example, if you are ingesting 50% of your traces, your custom span-based metrics are based on the 50% ingested spans.

To ensure that your trace metrics and custom span-based metrics have the same value, configure a 100% ingestion rate for your application or service.

<div class="alert alert-info">Metric names must follow the <a href="/metrics/custom_metrics/#naming-custom-metrics">metric naming convention</a>. Metric names that start with <code>trace.*</code> are not permitted and are not saved.</div>

{{% /collapse-content %}}

## サービス

This section covers strategies to troubleshoot service-related issues.

{{% collapse-content title="One service is showing up as multiple services in Datadog" level="h4" %}}

This can happen when the service name is not consistent across all spans.

For example, you might have a single service such as `service:test` showing multiple services in the Datadog:
- `service:test`
- `service:test-mongodb`
- `service:test-postgresdb`

You can use [Inferred Service dependencies (beta)][30]. Inferred external APIs use the default naming scheme `net.peer.name`. For example: `api.stripe.com`, `api.twilio.com`, and `us6.api.mailchimp.com`. Inferred databases use the default naming `scheme db.instance`.

Or, you can merge the service names using an environment variable such as `DD_SERVICE_MAPPING` or `DD_TRACE_SERVICE_MAPPING`, depending on the language. 

For more information, see [Configure the Datadog Tracing Library][27] or choose your language here:

{{< tabs >}}
{{% tab "Java" %}}

`dd.service.mapping`
: **Environment Variable**: `DD_SERVICE_MAPPING`<br>
**Default**: `null`<br>
**Example**: `mysql:my-mysql-service-name-db, postgresql:my-postgres-service-name-db`<br>
Dynamically rename services with configuration. Useful for making databases have distinct names across different services.

{{% /tab %}}

{{% tab "Python" %}}

`DD_SERVICE_MAPPING`
: サービス名のマッピングを定義し、トレース内におけるサービスの名前変更を許可します (例: `postgres:postgresql,defaultdb:postgresql`)。バージョン 0.47 以降で利用可能。

{{% /tab %}}
{{% tab "Go" %}}

`DD_SERVICE_MAPPING`
: **デフォルト**: `null` <br>
構成により、サービス名を動的に変更することができます。サービス名はカンマやスペースで区切ることができ、例えば `mysql:mysql-service-name,postgres:postgres-service-name`、`mysql:mysql-service-name postgres:postgres-service-name` のようにすることができます。

{{% /tab %}}
{{% tab "Node.js" %}}

`DD_SERVICE_MAPPING`
: **構成**: `serviceMapping`<br>
**デフォルト**: N/A<br>
**例**: `mysql:my-mysql-service-name-db,pg:my-pg-service-name-db`<br>
各プラグインのサービス名を提供します。カンマ区切りの `plugin:service-name` ペア (スペースありまたはなし) を許容します。

{{% /tab %}}
{{% tab ".NET" %}}

`DD_TRACE_SERVICE_MAPPING`
: コンフィギュレーションを使用してサービスの名前を変更します。名前を変更するサービス名（キー）と、代わりに使う名前（値）のペアを `[from-key]:[to-name]` の形式で指定したカンマ区切りのリストを受け入れます。<br>
**例**: `mysql:main-mysql-db, mongodb:offsite-mongodb-service`<br>
`from-key` はインテグレーションタイプに固有で、アプリケーション名のプレフィックスは取り除く必要があります。たとえば、`my-application-sql-server` の名前を `main-db` に変更するには、`sql-server:main-db` を使用します。バージョン 1.23.0 で追加されました。

{{% /tab %}}
{{% tab "PHP" %}}

`DD_SERVICE_MAPPING`
: **INI**: `datadog.service_mapping`<br>
**Default**: `null`<br>
Change the default name of an APM integration. Rename one or more integrations at a time, for example: `DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db` (see [Integration names][1000]).

[1000]: https://docs.datadoghq.com/ja/tracing/trace_collection/library_config/php#integration-names

{{% /tab %}}
{{% tab "Ruby" %}}

Ruby does not support `DD_SERVICE_MAPPING` or `DD_TRACE_SERVICE_MAPPING`. See [Additional Ruby configuration][2000] for code options to change the service name.

[2000]: https://docs.datadoghq.com/ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#advanced-configuration

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="There is an unexpected increase in ingested/indexed spans on the Plan and Usage page" level="h4" %}}

Spikes in data ingestion and indexing can be caused by various factors. To investigate the cause of an increase, use the [APM Traces Estimated Usage metrics][31]:

| USAGE TYPE | METRIC | 説明 |
| ------- | ------------ |------------ |
| APM インデックス化スパン     | `datadog.estimated_usage.apm.indexed_spans` | タグ付ベースの保持フィルターによってインデックス化されたスパンの総数。|
| APM 取り込みスパン     | `datadog.estimated_usage.apm.ingested_spans`| 取り込みスパンの総数。 |

The [APM Traces Usage dashboard][28] contains several widget groups displaying high-level KPIs and additional usage information.

{{% /collapse-content %}}

{{% collapse-content title="Missing error message and stack trace" level="h4" %}}

In some traces with an error status, the **Errors** tab shows `Missing error message and stack trace` rather than exception details. 

A span can show this message for two possible reasons:
- The span contains an unhandled exception.
- An HTTP response within the span returned an HTTP status code between 400 and 599.

When an exception is handled in a try/catch block, `error.msg`, `error.type`, and `error.stack` span tags are not populated. To populate the detailed error span tags, use [Custom Instrumentation][18] code.

{{% /collapse-content %}}

## データボリュームガイドライン

If you encounter any of the following issues, you may be exceeding [Datadog's volume guidelines][29]:

- Your trace metrics are not reporting as you would expect in the Datadog platform.
- You are missing some of your resources that you expected to see in the Datadog platform.
- You are seeing traces from your service but are not able to find this service on the [Service Catalog page][32].

{{% collapse-content title="Data volume guidelines" level="h4" %}}

インスツルメント済みのアプリケーションは、現時点から最大過去18時間および未来2時間までのタイムスタンプのスパンを送信できます。

Datadog accepts the following combinations for a given 40-minute interval:

- 1000 unique `environments` and `service` combinations
- 30 unique `second primary tag values` per environment
- 100 unique `operation names` per environment and service
- 1000 unique `resources` per environment, service, and operation name
- 30 unique `versions` per environment and service

If you need to accommodate larger volumes, contact [Datadog support][1] with your use case.

Datadog では、以下の文字列が指定された文字数を超えた場合、切り捨てられます。

| 名前            | 文字 |
|-----------------|------------|
| [サービス][6]    |  100       |
| オペレーション       |  100       |
| type            |  100       |
| [リソース][7]   |  5000      |
| [タグキー][8]    |  200       |
| [タグの値][8]  |  25000     |

また、スパンに存在する[スパンタグ][8]の数が、1024 以上にならないようにしてください。

{{% /collapse-content %}}

{{% collapse-content title="The number of services exceeds what is specified in the data volume guidelines" level="h4" %}}

サービス数が[データ量ガイドライン](#data-volume-guidelines)で指定されている数を超える場合は、サービスの命名規則について以下のベストプラクティスを試してみてください。

### サービス名から環境タグの値を除外する

デフォルトでは、環境 (`env`) は [Datadog APM][17] のプライマリタグになります。

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-3.png" alt="Environment はデフォルトのプライマリタグです" style="width:100%;" >}}

サービスは通常、`prod`、`staging`、`dev` などの複数の環境にデプロイされます。リクエスト数、レイテンシー、エラー率などのパフォーマンスメトリクスは、さまざまな環境間で異なっています。サービスカタログの環境ドロップダウンを使用すると、**Performance** タブのデータを特定の環境にスコープすることができます。

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-2.png" alt="サービスカタログの `env` ドロップダウンを使って、特定の環境を選択します" style="width:100%;" >}}

サービスの数が増えすぎて問題になりがちなのが、サービス名に環境値を含めるパターンです。例えば、`prod-web-store` と `dev-web-store` のように 2 つの環境で動作しているため、1 つではなく 2 つのユニークなサービスがある場合です。

Datadog では、サービス名を変更することでインスツルメンテーションを調整することを推奨しています。

トレースメトリクスはアンサンプリングされるため、インスツルメンテーションされたアプリケーションでは、部分的なデータではなく、すべてのデータが表示されます。また、[ボリュームガイドライン](#data-volume-guidelines)も適用されます。

### メトリクスパーティションを置いたり、変数をサービス名にグループ化する代わりに、第 2 プライマリタグを使用する

第 2 のプライマリタグは、トレースメトリクスのグループ化および集計に使用できる追加タグです。ドロップダウンを使用して、指定されたクラスター名またはデータセンターの値にパフォーマンスデータをスコープすることができます。

{{< img src="/tracing/troubleshooting/troubleshooting-service-naming-convention-issues-1.png" alt="ドロップダウンメニューを使用して、特定のクラスターまたはデータセンターの値を選択します" style="width:100%;" >}}

第 2 のプライマリタグを適用せず、サービス名にメトリクスパーティションやグループ化変数を含めると、アカウント内のユニークなサービス数が不必要に増加し、遅延やデータ損失の可能性があります。

For example, instead of the service `web-store`, you might decide to name different instances of a service `web-store-us-1`, `web-store-eu-1`, and `web-store-eu-2` to see performance metrics for these partitions side-by-side. Datadog recommends implementing the **region value** (`us-1`, `eu-1`, `eu-2`) as a second primary tag.

{{% /collapse-content %}}

## 接続エラー

This section provides guidance on diagnosing and resolving connection and communication issues between your applications and the Datadog Agent

{{% collapse-content title="Your instrumented application isn't communicating with the Datadog Agent" level="h4" %}}

Read about how to find and fix these problems in [Connection Errors][4].

{{% /collapse-content %}}

## Resource usage

This section contains information on troubleshooting performance issues related to resource utilization.

{{% collapse-content title="Out of memory errors" level="h4" %}}

トレースコレクションの CPU 使用率の検出と Agent の適切なリソース制限の計算については、[Agent のリソース使用量][10]を参照してください。

{{% /collapse-content %}}

{{% collapse-content title="Rate limit or max event error messages" level="h4" %}}

Datadog Agent ログで、レート制限や 1 秒あたりの最大イベント数に関するエラーメッセージが表示される場合、[以下の手順][9]に従い制限を変更します。ご不明な点は、Datadog [サポートチーム][1]までお問い合わせください。

{{% /collapse-content %}}

## セキュリティ

This section covers approaches for addressing security concerns in APM, including protecting sensitive data and managing traffic.

{{% collapse-content title="Modifying, discarding, or obfuscating spans" level="h4" %}}

There are several configuration options available to scrub sensitive data or discard traces corresponding to health checks or other unwanted traffic that can be configured within the Datadog Agent, or in some languages the tracing client. For details on the options available, see [Security and Agent Customization][11]. While this offers representative examples, if you require assistance applying these options to your environment, reach out to [Datadog Support][1].

{{% /collapse-content %}}

## Debugging and logging

This section explains how to use debug and startup logs to identify and resolve issues with your Datadog tracer.

{{% collapse-content title="Debug logs" level="h4" %}}

To capture full details on the Datadog tracer, enable debug mode on your tracer by using the `DD_TRACE_DEBUG` environment variable. You might enable it for your own investigation or if Datadog support has recommended it for triage purposes. However, be sure to disable debug logging when you are finished testing to avoid the logging overhead it introduces.

これらのログは、インスツルメンテーションエラーやインテグレーション固有のエラーを明らかにすることができます。デバッグログの有効化と取得に関する詳細は、[デバッグモードのトラブルシューティングページ][5]を参照してください。

{{% /collapse-content %}}

{{% collapse-content title="Startup logs" level="h4" %}}

During startup, Datadog tracing libraries emit logs that reflect the configurations applied in a JSON object, as well as any errors encountered, including if the Agent can be reached in languages where this is possible. Some languages require these startup logs to be enabled with the environment variable `DD_TRACE_STARTUP_LOGS=true`. For more information, see the [Startup logs][3].

{{% /collapse-content %}}

## Additional support

If you still need additional support, open a ticket with Datadog Support.

{{% collapse-content title="Open a Datadog Support ticket" level="h4" %}}

When you open a [support ticket][1], the Datadog support team may ask for the following types of information:

1. **Links to a trace or screenshots of the issue**: This helps reproduce your issues for troubleshooting purposes.

2. **Tracer startup logs**: Startup logs help identify tracer misconfiguration or communication issues between the tracer and the Datadog Agent. By comparing the tracer's configuration with the application or container settings, support teams can pinpoint improperly applied settings.

3. **Tracer debug logs**: Tracer debug logs provide deeper insights than startup logs, revealing:
   - Proper integration instrumentation during application traffic flow
   - Contents of spans created by the tracer
   - Connection errors when sending spans to the Agent

4. **Datadog Agent flare**: [Datadog Agent flares][12] enable you to see what is happening within the Datadog Agent, for example, if traces are being rejected or malformed. This does not help if traces are not reaching the Datadog Agent, but does help identify the source of an issue, or any metric discrepancies.

5. **A description of your environment**: Understanding your application's deployment configuration helps the Support team identify potential tracer-Agent communication issues and identify misconfigurations. For complex problems, support may request Kubernetes manifests, ECS task definitions, or similar deployment configuration files.

6. **Custom tracing code**: Custom instrumentation, configuration, and adding span tags can significantly impact trace visualizations in Datadog.

7. **Version information**: Knowing what language, framework, Datadog Agent, and Datadog tracer versions you are using allows Support to verify [Compatiblity Requirements][15], check for known issues, or recommend a version upgrades. For example:

{{% /collapse-content %}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/tracing/metrics/metrics_namespace/
[3]: /ja/tracing/troubleshooting/tracer_startup_logs/
[4]: /ja/tracing/troubleshooting/connection_errors/
[5]: /ja/tracing/troubleshooting/tracer_debug_logs/
[6]: /ja/tracing/glossary/#services
[7]: /ja/tracing/glossary/#resources
[8]: /ja/glossary/#span-tag
[9]: /ja/tracing/troubleshooting/agent_rate_limits
[10]: /ja/tracing/troubleshooting/agent_apm_resource_usage/
[11]: /ja/tracing/custom_instrumentation/agent_customization
[12]: /ja/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[13]: /ja/agent/troubleshooting/debug_mode/?tab=agentv6v7
[14]: /ja/tracing/custom_instrumentation/
[15]: /ja/tracing/compatibility_requirements/
[16]: /ja/tracing/guide/setting_primary_tags_to_scope/?tab=helm#add-a-second-primary-tag-in-datadog
[17]: /ja/tracing/guide/setting_primary_tags_to_scope/
[18]: /ja/tracing/trace_collection/custom_instrumentation/?tab=datadogapi
[19]: /ja/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[20]: https://app.datadoghq.com/apm/traces
[21]: /ja/tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter
[22]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters
[23]: /ja/developers/guide/data-collection-resolution-retention/
[24]: /ja/tracing/metrics/metrics_namespace/
[25]: /ja/tracing/trace_pipeline/ingestion_mechanisms/?tab=java
[26]: /ja/tracing/trace_pipeline/generate_metrics/
[27]: /ja/tracing/trace_collection/library_config/
[28]: https://app.datadoghq.com/dash/integration/apm_estimated_usage
[29]: /ja/tracing/troubleshooting/#data-volume-guidelines
[30]: /ja/tracing/guide/inferred-service-opt-in/?tab=java
[31]: /ja/tracing/trace_pipeline/metrics/#apm-traces-estimated-usage-dashboard
[32]: https://app.datadoghq.com/services