---
code_lang: nodejs
code_lang_weight: 30
further_reading:
- link: https://github.com/DataDog/dd-trace-js
  tag: ソースコード
  text: ソースコード
- link: https://datadog.github.io/dd-trace-js
  tag: ドキュメント
  text: API ドキュメント
- link: /tracing/trace_collection/trace_context_propagation/
  tag: ドキュメント
  text: トレースコンテキストの伝搬
- link: tracing/glossary/
  tag: ドキュメント
  text: サービス、リソース、トレースを調査する
- link: tracing/
  tag: ドキュメント
  text: 高度な使用方法
- link: /opentelemetry/interoperability/environment_variable_support
  tag: ドキュメント
  text: OpenTelemetry の環境変数の構成
title: Node.js SDK の構成
type: multi-code-lang
---
コードを使用して SDK をセットアップし、APM データを収集するように Agent を構成した後、オプションで、[Unified Service Tagging][1] のセットアップなど、必要に応じて SDK を構成してください。

{{% apm-config-visibility %}}

サービスに対して `env`、`service`、および `version` を設定するには、`DD_ENV`、`DD_SERVICE`、および `DD_VERSION` を使用することをお勧めします。これらの環境変数の構成に関する推奨事項については、[Unified Service Tagging][1] のドキュメントを参照してください。

ライブラリの操作例については、[API ドキュメント][2]を参照してください。

## Agentless モード {#agentless-mode}

`dd-trace` v5.125.0 および v6.14.0 以降、Datadog Agent を使用せずにデータを Datadog に直接送信できます。Agentless モードを有効にするには、以下の環境変数を設定します。

- `DD_AGENTLESS_ENABLED`: `true`
- `DD_API_KEY`: Datadog [API キー][7]
- `DD_SITE`: [Datadog サイト][8]

```shell
export DD_AGENTLESS_ENABLED=true
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE={{< region-param key="dd_site" >}}
```

`DD_AGENTLESS_ENABLED` が `true` であり、`DD_API_KEY` が設定されていない場合、SDK はエラーをログに記録し、トレース、Remote Configuration リクエスト、または Dynamic Instrumentation データを送信しません。

Agentless モードでは、SDK は以下のデータを Datadog に直接送信します。

- トレース
- [Remote Configuration][9]
- [Dynamic Instrumentation][10]
- Bunyan、Pino、および Winston からのログ
- [Test Optimization][11]
- [LLM Observability][12]
- [Feature Flags][16] 構成

以下の機能には Agent が必要であり、Agentless モードでは無効になります。

- [Runtime metrics][17]
- [Data Streams Monitoring][18]
- DogStatsD カスタムメトリクス
- [Profiling][19] (`DD_PROFILING_EXPORTERS` に `agent` 以外の exporter が含まれている場合を除く)

Agentless モードでは、以下の動作も変更されます。

- `DD_TRACE_SAMPLING_RULES` および `DD_TRACE_RATE_LIMIT` は無視されます。`DD_TRACE_SAMPLE_RATE` は引き続き適用されます。
- ログの直接送信を停止するには、`DD_AGENTLESS_LOG_SUBMISSION_ENABLED` を `false` に設定します。

## 構成キー {#configuration-keys}

{{< partial name="apm/registry-config-list.html" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging/
[2]: https://datadog.github.io/dd-trace-js/
[3]: /ja/tracing/trace_pipeline/ingestion_mechanisms/
[4]: /ja/help/
[5]: /ja/tracing/trace_collection/trace_context_propagation/
[6]: /ja/tracing/guide/aws_payload_tagging/?code-lang=nodejs
[7]: /ja/account_management/api-app-keys/#api-keys
[8]: /ja/getting_started/site/
[9]: /ja/remote_configuration/
[10]: /ja/tracing/trace_collection/dynamic_instrumentation/
[11]: /ja/tests/
[12]: /ja/llm_observability/
[13]: /ja/agent/configuration/network/#configure-ports
[14]: /ja/opentelemetry/interoperability/environment_variable_support
[15]: /ja/tracing/trace_collection/custom_instrumentation/nodejs/otel/
[16]: /ja/feature_flags/
[17]: /ja/tracing/metrics/runtime_metrics/
[18]: /ja/data_streams/
[19]: /ja/profiler/