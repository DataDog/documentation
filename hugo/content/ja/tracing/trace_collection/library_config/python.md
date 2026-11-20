---
code_lang: python
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-py
  tag: ソースコード
  text: ソースコード
- link: https://ddtrace.readthedocs.io/en/stable/
  tag: 外部サイト
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
title: Python SDK の構成
type: multi-code-lang
---
コードを使用して SDK をセットアップし、APM データを収集するように Agent を構成した後、オプションで、[Unified Service Tagging][1] のセットアップなど、必要に応じて SDK を構成してください。

{{% apm-config-visibility %}}

## Agentless モード {#agentless-mode}

`ddtrace` v4.15.0 以降、Datadog Agent を使用せずにデータを Datadog に直接送信できます。Agentless モードを有効にするには、以下の環境変数を設定します。

- `DD_AGENTLESS_ENABLED`: `true`
- `DD_API_KEY`: Datadog [API キー][3]
- `DD_SITE`: [Datadog サイト][4]

```shell
export DD_AGENTLESS_ENABLED=true
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE={{< region-param key="dd_site" >}}
```

`DD_AGENTLESS_ENABLED` が `true` であり、`DD_API_KEY` が設定されていない場合、SDK は起動時にエラーを発生させます。

Agentless モードでは、SDK は以下のデータを Datadog に直接送信します。

- トレース
- [Remote Configuration][5]
- [Dynamic Instrumentation][6]
- [Test Optimization][7]
- [LLM Observability][8]

以下の機能には Agent が必要であり、Agentless モードでは効果がありません。

- [Runtime metrics][9]
- [Profiling][10]
- Tracer flares

`DD_CIVISIBILITY_AGENTLESS_ENABLED` および `DD_LLMOBS_AGENTLESS_ENABLED` は、デフォルトで `DD_AGENTLESS_ENABLED` の値に設定されます。該当製品の Agentless モードを上書きするには、いずれかの環境変数を明示的に設定します。

**ddtrace-run** を使用する場合、次の[環境変数 (オプション)][2] を利用できます。

## 構成キー {#configuration-keys}

{{< partial name="apm/registry-config-list.html" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[3]: /ja/account_management/api-app-keys/#api-keys
[4]: /ja/getting_started/site/
[5]: /ja/remote_configuration/
[6]: /ja/tracing/trace_collection/dynamic_instrumentation/
[7]: /ja/tests/
[8]: /ja/llm_observability/
[9]: /ja/tracing/metrics/runtime_metrics/
[10]: /ja/profiler/