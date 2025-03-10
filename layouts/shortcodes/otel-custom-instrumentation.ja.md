## 概要

Datadog トレーシングライブラリは、コードのインスツルメンテーション用に [OpenTelemetry API][101] の実装を提供します。これは、Datadog のネイティブな実装、機能、製品を利用しながら、すべてのサービスのインスツルメンテーションをベンダーニュートラルに維持できることを意味します。Datadog スタイルのスパンやトレースを生成して、お使いの言語の Datadog のトレーシングライブラリで処理し、Datadog に送信するように構成することができます。

OpenTelemetry API でコードをインスツルメントすることによって

- コードは、ベンダー固有の API 呼び出しから自由になります。
- コードはコンパイル時には Datadog トレーシングライブラリに依存せず、ランタイム時のみになります。
- コードは、非推奨の OpenTracing API を使用しません。

インスツルメントされたアプリケーションで OpenTelemetry SDK を Datadog トレーシングライブラリに置き換えた場合、実行中のコードによって生成されるトレースを Datadog のトレースや Datadog 独自の製品で処理、分析、監視することが可能です。

詳細は、[OpenTelemetry API と Datadog でインスツルメントされたトレースの相互運用性][103]を参照してください。

Datadog トレーシングライブラリは、ここで説明するように構成すると、 OpenTelemetry でインスツルメントされたコードによって生成されたスパンとトレースを受け入れ、 テレメトリーを処理して Datadog に送信します。例えば、コードがすでに OpenTelemetry API でインスツルメントされている場合や、OpenTelemetry API を使ってインスツルメントしたいが、コードを変更することなく Datadog トレーシングライブラリを使用するメリットを得たい場合に、このアプローチを使用することができます。

OpenTelemetry を使ってコードをインスツルメントし、 _Datadog トレーシングライブラリを介さずに_ Datadog にスパンデータを送信する方法を探している場合は、[Datadog の OpenTelemetry][102] をご覧ください。


[101]: https://opentelemetry.io/docs/reference/specification/trace/api
[102]: /opentelemetry/
[103]: /opentelemetry/guide/otel_api_tracing_interoperability/