---
aliases:
- /ja/opentelemetry/interoperability/environment_variable_support
further_reading:
- link: /tracing/trace_collection/library_config/dotnet-core
  tag: ドキュメント
  text: .NET Core SDK 設定
- link: /tracing/trace_collection/library_config/dotnet-framework
  tag: ドキュメント
  text: .NET Framework SDK 設定
- link: /tracing/trace_collection/library_config/go
  tag: ドキュメント
  text: Go SDK 設定
- link: /tracing/trace_collection/library_config/java
  tag: ドキュメント
  text: Java SDK 設定
- link: /tracing/trace_collection/library_config/nodejs
  tag: ドキュメント
  text: Node.js SDK 設定
- link: /tracing/trace_collection/library_config/php
  tag: ドキュメント
  text: PHP SDK 設定
- link: /tracing/trace_collection/library_config/python
  tag: ドキュメント
  text: Python SDK 設定
- link: /tracing/trace_collection/library_config/ruby
  tag: ドキュメント
  text: Ruby SDK 設定
title: Datadog SDK で OpenTelemetry の環境変数を使用する
---

"Datadog SDK は OpenTelemetry Tracing API を実装しており、OpenTelemetry の環境変数を使用してアプリケーションの Datadog トレーシングを設定できます。 既存の設定をほとんど変更せずにアプリケーションの OpenTelemetry SDK を Datadog SDK に置き換えることで、トレースと追加の Datadog テレメトリを受信できます。
このページでは、Datadog がサポートしている OpenTelemetry SDK のオプションについて説明します。"

<div class="alert alert-info">Datadog と OpenTelemetry の環境変数が両方設定されている場合、Datadog が優先されます。Datadog のデフォルト値も OpenTelemetry のデフォルト値より優先されます。デフォルト値や詳細については、該当する<a href="/tracing/trace_collection/library_config/">SDK 設定ページ</a>をご覧ください。</div>

## 一般的な SDK 設定
Datadog SDK は、以下の一般的な OpenTelemetry SDK オプションをサポートしています。詳細については、関連する [OpenTelemetry ドキュメント][9]を参照してください。

`OTEL_SERVICE_NAME`
: ****Datadog の規則****: `DD_SERVICE`<br>
サービス名を設定します<br>
**注**: `OTEL_RESOURCE_ATTRIBUTES` で `service.name` が指定されている場合でも、`OTEL_SERVICE_NAME` が優先されます<br>

`OTEL_LOG_LEVEL`
: ****Datadog の規則****: `DD_LOG_LEVEL`<br>
SDK ロガーが使用するログレベルを設定します<br>
**注**: ログレベルを debug にすると、`DD_TRACE_DEBUG=true` と同じ扱いになります<br>
Node.js および PHP SDK では、`DD_TRACE_LOG_LEVEL` にマッピングされます<br>
Go SDK では、`OTEL_LOG_LEVEL` と `DD_TRACE_DEBUG` のマッピングに対応する値のみサポートされます:<br>
  - `info`|`false`
  - `debug`|`true`<br>
**未サポート**: Python、.NET、Ruby、Go SDK<br>

`OTEL_PROPAGATORS`
: ****Datadog の規則****: `DD_TRACE_PROPAGATION_STYLE`<br>
コンマ区切りのリストとして使用する伝搬方式 (Propagators) を指定します<br>
**注**: 多くの Datadog SDK でサポートされる値は `tracecontext`、`b3`、`b3multi`、`none`、`datadog` のみです。Java SDK では `xray` もサポートされます<br>
同じ `Propagator` を重複登録しないよう、値は重複を取り除く必要があります<br>

`OTEL_TRACES_SAMPLER & OTEL_TRACES_SAMPLER_ARG`
: ****Datadog の規則****: `DD_TRACE_SAMPLE_RATE`<br>
`OTEL_TRACES_SAMPLER`: トレースで使用するサンプラー
`OTEL_TRACES_SAMPLER_ARG`: サンプラーの引数として使用される文字列<br>
**注**: `OTEL_TRACES_SAMPLER` が設定されている場合にのみ、その指定値が使用されます。各サンプラータイプは、それぞれ期待する入力 (あれば) を定義しています。無効または未知の入力があった場合はログに出力され、無視されます。その場合、実装は `OTEL_TRACES_SAMPLER_ARG` が設定されていない場合と同様に動作しなければなりません<br>
`OTEL_TRACES_SAMPLER` と `DD_TRACE_SAMPLE_RATE` のマッピング:<br>
  - `parentbased_always_on`|`1.0`
  - `parentbased_always_off`|`0.0`
  - `parentbased_traceidratio`|`${OTEL_TRACES_SAMPLER_ARG}`
  - `always_on`|`1.0`
  - `always_off`|`0.0`
  - `traceidratio`|`${OTEL_TRACES_SAMPLER_ARG}`

`OTEL_TRACES_EXPORTER`
: ****Datadog の規則****: `DD_TRACE_ENABLED=false`<br>
使用するトレースエクスポーターを指定します<br>
**注**: `none` のみが受け付けられます<br>

`OTEL_METRICS_EXPORTER`
: ****Datadog の規則****: `DD_RUNTIME_METRICS_ENABLED=false`<br>
使用するメトリクスエクスポーターを指定します<br>
**注**: `none` のみが受け付けられます<br>

`OTEL_RESOURCE_ATTRIBUTES`
: ****Datadog の規則****: `DD_TAGS`<br>
リソース属性として使用されるキーと値のペアです。詳細は[リソースのセマンティック規約][11]を参照してください<br>
**注**: 最初の 10 個のキー・バリューのペアのみが使用され、以降は破棄されます<br>
`deployment.environment` および `deployment.environment.name`は `DD_ENV` にマッピングされます<br>
`service.name` は `DD_SERVICE` 環境変数にマッピングされます<br>
`service.version` は `DD_VERSION` 環境変数にマッピングされます<br>


`OTEL_SDK_DISABLED`
: ****Datadog の規則****: `!DD_TRACE_OTEL_ENABLED`<br>
すべてのシグナルに対して SDK を無効化します<br>
**注**: `OTEL_SDK_DISABLED` と `DD_TRACE_OTEL_ENABLED` のマッピング:<br>
  - `true`|`false`
  - `false`|`true`<br>
**Ruby & Go SDK**: OpenTelemetry SDK はインポートおよび設定時に自動的に有効化されるため、この設定は該当しません。

## Java 固有の設定
Datadog SDK は、以下の Java 固有の OpenTelemetry 設定オプションをサポートしています。詳細については [OpenTelemetry の Java エージェント設定][10]を参照してください。


`OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED`
: ****Datadog の規則****: `!DD_INTEGRATIONS_ENABLED`<br>
エージェントのすべてのインスツルメンテーションを無効化するには `false` に設定します<br>
**注**: `OTEL_INSTRUMENTATION_COMMON_DEFAULT_ENABLED` と `DD_INTEGRATIONS_ENABLED` のマッピング:<br>
  - `true`|`false`
  - `false`|`true`

`OTEL_INSTRUMENTATION_[NAME]_ENABLED`
: **説明**: 指定した名前の OTel ドロップインインスツルメンテーションを有効/無効化します<br>

`OTEL_JAVAAGENT_CONFIGURATION_FILE`
: ****Datadog の規則****: `DD_TRACE_CONFIG`<br>
エージェントの設定を含む有効な Java プロパティファイルへのパス<br>
**注**: OTEL_JAVAAGENT_CONFIGURATION_FILE と DD_TRACE_CONFIG の両方が設定されている場合、通常の「Datadog 設定が OTel 設定を上書きする」というルールの例外として、両方のファイルから構成を適用します<br>

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_REQUEST_HEADERS`
: ****Datadog の規則****: `DD_TRACE_REQUEST_HEADER_TAGS`<br>
HTTP ヘッダー名のカンマ区切りリスト。HTTP クライアントのインスツルメンテーションは、設定されたすべてのヘッダー名に対して HTTP リクエストヘッダーの値をキャプチャします<br>
**注**: OTel の環境変数で設定されたヘッダーのタグ付けは、Datadog の命名規則である `http.request.headers.<header-name>` ではなく、`http.request.header.<header-name>` の OTel 規則に従います<br>

`OTEL_INSTRUMENTATION_HTTP_CLIENT_CAPTURE_RESPONSE_HEADERS`
: ****Datadog の規則****: `DD_TRACE_RESPONSE_HEADER_TAGS`<br>
HTTP ヘッダー名のカンマ区切りリスト。HTTP クライアントのインスツルメンテーションは、設定されたすべてのヘッダー名に対して HTTP レスポンスヘッダーの値をキャプチャします<br>
**注**: OTel の環境変数で設定されたヘッダーのタグ付けは、Datadog の命名規則である `http.response.headers.<header-name>` ではなく、`http.response.header.<header-name>` の OTel 規則に従います<br>

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_REQUEST_HEADERS`
: ****Datadog の規則****: `DD_TRACE_REQUEST_HEADER_TAGS`<br>
HTTP ヘッダー名のカンマ区切りリスト。HTTP サーバーのインスツルメンテーションは、設定されたすべてのヘッダー名に対して HTTP リクエストヘッダーの値をキャプチャします<br>
**注**: OTel の環境変数で設定されたヘッダーのタグ付けは、Datadog の命名規則である `http.request.headers.<header-name>` ではなく、`http.request.header.<header-name>` の OTel 規則に従います<br>

`OTEL_INSTRUMENTATION_HTTP_SERVER_CAPTURE_RESPONSE_HEADERS`
: ****Datadog の規則****: `DD_TRACE_RESPONSE_HEADER_TAGS`<br>
HTTP ヘッダー名のカンマ区切りリスト。HTTP サーバーのインスツルメンテーションは、設定されたすべてのヘッダー名に対して HTTP レスポンスヘッダーの値をキャプチャします<br>
**注**: OTel の環境変数で設定されたヘッダーのタグ付けは、Datadog の命名規則である `http.response.headers.<header-name>` ではなく、`http.response.header.<header-name>` の OTel 規則に従います<br>

`OTEL_JAVAAGENT_EXTENSIONS`
: ****Datadog の規則****: `DD_TRACE_EXTENSIONS_PATH`<br>
拡張用の jar ファイルのパス、または jar ファイルを含むフォルダのパスをカンマ区切りで指定します。フォルダを指定した場合、そのフォルダにあるすべての jar ファイルが独立した拡張として扱われます<br>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/library_config/dotnet-core
[2]: /ja/tracing/trace_collection/library_config/dotnet-framework
[3]: /ja/tracing/trace_collection/library_config/go
[4]: /ja/tracing/trace_collection/library_config/java
[5]: /ja/tracing/trace_collection/library_config/nodejs
[6]: /ja/tracing/trace_collection/library_config/php
[7]: /ja/tracing/trace_collection/library_config/python
[8]: /ja/tracing/trace_collection/library_config/ruby
[9]: https://opentelemetry.io/docs/specs/otel/configuration/SDK-environment-variables/#general-SDK-configuration
[10]: https://opentelemetry.io/docs/zero-code/java/agent/configuration/#configuring-the-agent
[11]: https://opentelemetry.io/docs/specs/semconv/resource/#semantic-attributes-with-dedicated-environment-variable
[12]: /ja/tracing/trace_collection/library_config/_index