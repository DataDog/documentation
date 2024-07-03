---
aliases:
- /ja/tracing/faq/span_and_trace_id_format/
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/
  tag: documentation
  text: Correlating logs and traces
title: Trace and Span ID Formats
---
{{< jqmath-vanilla >}}

このページでは、Datadog トレーシングライブラリによるトレース ID とスパン ID のサポートについて詳しく説明します。

- **生成される ID**: デフォルトでは、すべてのトレーシングライブラリが 128 ビットのトレース ID と 64 ビットのスパン ID を生成します。
- **許容される ID**: Datadog は 128 ビットまたは 64 ビットのトレース ID と、64 ビットのスパン ID が受け入れられます。

## 128 ビットのトレース ID

Datadog トレーシングライブラリの最新バージョンでは、128 ビットのトレース ID がデフォルトで生成され、受け入れられます。

- [Node.js][1]
- [Java][2]   
- [Go][3]     
- [Python][4] 
- [Ruby][5]   
- [.NET][6]   
- [PHP][7]    
- [C++][8]   

## 64 ビットのトレース ID とスパン ID

### トレース ID

トレース ID はデフォルトで 128 ビットで生成され、128 ビット整数または 64 ビット整数のいずれかが受け入れられます。64 ビットのトレース ID を生成するには、環境変数 `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED` を `false` に設定します。

### スパン ID

Datadog ではスパン ID は 64 ビットに制限されています。

| 言語   | 生成された ID            | 有効かつ受け入れられる 64 ビット整数の ID |
| ---------- | ------------------------ | ----------------------------- |
| Node.js    | 符号なし [0, $2^63$]     | 符号付きまたは符号なし            |
| Java       | 符号なし [1, $2^63-1$]   | 符号なし                      |
| Go         | 符号なし [0, $2^63-1$]   | 符号付きまたは符号なし            |
| Python     | 符号なし [0, $2^64-1$]   | 符号なし                      |
| Ruby       | 符号なし [1, $2^62-1$]   | 符号なし                      |
| .NET       | 符号なし [0, $2^63-1$]   | 符号なし                      |
| PHP        | 符号なし [1, $2^64-1$]   | 符号なし                      |
| C++        | 符号なし [0, $2^63-1$]   | 符号なし                      |

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js/releases
[2]: https://github.com/DataDog/dd-trace-java/releases
[3]: https://github.com/DataDog/dd-trace-go/releases
[4]: https://github.com/DataDog/dd-trace-py/releases
[5]: https://github.com/DataDog/dd-trace-rb/releases
[6]: https://github.com/DataDog/dd-trace-dotnet/releases
[7]: https://github.com/DataDog/dd-trace-php/releases
[8]: https://github.com/DataDog/dd-trace-cpp/releases