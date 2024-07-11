---
code_lang: dotnet
code_lang_weight: 80
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: ブログ
  text: W3C Trace Context に対応した OpenTelemetry インスツルメンテーションされたアプリのモニタリング
title: .NET トレースコンテキストの伝搬
type: multi-code-lang
---


Datadog APM トレーサーは、分散型トレーシングのための [B3][5] と [W3C (TraceParent)][6] のヘッダー抽出と挿入をサポートしています。

分散ヘッダーの挿入と抽出のスタイルを構成することができます。

.NET トレーサーは、以下のスタイルをサポートしています。

- W3C: `tracecontext` (`W3C` は非推奨)
- Datadog: `Datadog`
- B3 マルチヘッダー: `b3multi` (`B3` は非推奨)
- B3 シングルヘッダー: `B3 single header` (`B3SingleHeader` は非推奨)

以下の環境変数を使用して、挿入および抽出のスタイルを構成することができます。

- `DD_TRACE_PROPAGATION_STYLE_INJECT=tracecontext, Datadog, b3multi`
- `DD_TRACE_PROPAGATION_STYLE_EXTRACT=tracecontext, Datadog, b3multi`

環境変数の値は、挿入または抽出に有効なヘッダースタイルのカンマ区切りリストです。複数の抽出スタイルが有効な場合、抽出は構成されたスタイルの順に行われ、最初に抽出に成功した値を使用します。

バージョン 2.22.0 から、デフォルトの挿入スタイルは `tracecontext, Datadog` で、W3C コンテキストが使用され、その後に Datadog ヘッダーが続きます。バージョン 2.22.0 以前は、`Datadog` の挿入スタイルのみが有効です。

ほとんどの場合、ヘッダーの抽出と注入は透過的に行われます。分散トレースが切断される可能性があるケースも知られています。例えば、分散キューからメッセージを読み込むとき、ライブラリによってはスパンコンテキストを失うことがあります。また、Kafka メッセージを消費する際に `DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` を `false` に設定した場合にも発生することがあります。そのような場合、以下のコードを使ってカスタムトレースを追加することができます。

```csharp
var spanContextExtractor = new SpanContextExtractor();
var parentContext = spanContextExtractor.Extract(headers, (headers, key) => GetHeaderValues(headers, key));
var spanCreationSettings = new SpanCreationSettings() { Parent = parentContext };
using var scope = Tracer.Instance.StartActive("operation", spanCreationSettings);
```

`GetHeaderValues` メソッドを提供します。このメソッドの実装方法は、`SpanContext` を保持する構造に依存します。

以下はその例です。

```csharp
// Confluent.Kafka
IEnumerable<string> GetHeaderValues(Headers headers, string name)
{
    if (headers.TryGetLastBytes(name, out var bytes))
    {
        try
        {
            return new[] { Encoding.UTF8.GetString(bytes) };
        }
        catch (Exception)
        {
            // 無視
        }
    }

    return Enumerable.Empty<string>();
}

// RabbitMQ
IEnumerable<string> GetHeaderValues(IDictionary<string, object> headers, string name)
{
    if (headers.TryGetValue(name, out object value) && value is byte[] bytes)
    {
        return new[] { Encoding.UTF8.GetString(bytes) };
    }

    return Enumerable.Empty<string>();
}

// SQS
public static IEnumerable<string> GetHeaderValues(IDictionary<string, MessageAttributeValue> headers, string name)
{
    // SQS の場合、メッセージ属性ヘッダーは最大 10 個なので、
    // Datadog のヘッダーは以下のプロパティを持つ 1 つのヘッダーに統合されます。
    // - Key: "_datadog"
    // - Value: MessageAttributeValue object
    //   - DataType: "String"
    //   - StringValue: <JSON map with key-value headers>
    if (headers.TryGetValue("_datadog", out var messageAttributeValue)
        && messageAttributeValue.StringValue is string jsonString)
    {
        var datadogDictionary = JsonConvert.DeserializeObject<Dictionary<string, string>>(jsonString);
        if (datadogDictionary.TryGetValue(name, out string value))
        {
            return new[] { value };
        }
    }
    return Enumerable.Empty<string>();
}
```

Kafka コンシューマースパンをトレースするために `SpanContextExtractor` API を使用する場合、`DD_TRACE_KAFKA_CREATE_CONSUMER_SCOPE_ENABLED` を `false` に設定します。これにより、メッセージがトピックから消費された直後にコンシューマースパンが正しく閉じられ、メタデータ (`partition` や `offset` など) が正しく記録されることが保証されます。`SpanContextExtractor` API を使用して Kafka メッセージから作成されたスパンは、プロデューサーのスパンの子であり、コンシューマーのスパンの兄弟になります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[5]: https://github.com/openzipkin/b3-propagation
[6]: https://github.com/w3c/trace-context