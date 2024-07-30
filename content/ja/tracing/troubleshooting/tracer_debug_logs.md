---
further_reading:
- link: /tracing/troubleshooting/connection_errors/
  tag: ドキュメント
  text: APM 接続エラーのトラブルシューティング
title: トレーサーデバッグログ
---

## デバッグモードを有効にする

Datadog デバッグ設定を使用して、問題を診断したり、トレースデータを監査したりできます。ロガーに送信されるイベントの数が増えるため、実稼働システムでデバッグモードを有効にすることはお勧めできません。デバッグモードはデバッグ目的でのみ使用してください。

<mrk mid="28" mtype="seg"/><mrk mid="29" mtype="seg"/>

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}

{{< programming-lang lang="java" >}}

Datadog Java トレーサーのデバッグモードを有効にするには、JVM の起動時にフラグ `-Ddd.trace.debug=true` を設定するか、環境変数として `DD_TRACE_DEBUG=true` を追加します。

**注**: Datadog Java トレーサーは SL4J SimpleLogger を実装するため、[そのすべての設定を適用できます][1]。例えば、専用のログファイルにロギングするには次のようにします。
```
-Ddatadog.slf4j.simpleLogger.logFile=<NEW_LOG_FILE_PATH>
```


[1]: https://www.slf4j.org/api/org/slf4j/simple/SimpleLogger.html
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Datadog Python Tracer のデバッグモードを有効にする手順は、アプリケーションが使用しているトレーサーのバージョンに依存します。該当するシナリオを選択してください。

### シナリオ 1: ddtrace バージョン 1.3.2 以上

1. デバッグモードを有効にするには: `DD_TRACE_DEBUG=true`

2. デバッグログをログファイルにルーティングするには、 `DD_TRACE_LOG_FILE` にトレーサーのログを書き込むファイル名を、現在の作業ディレクトリからの相対パスで設定します。例えば、`DD_TRACE_LOG_FILE=ddtrace_logs.log` とします。
   デフォルトでは、ファイルサイズは 15728640 バイト (約 15MB) で、1 つのバックアップログファイルが作成されます。デフォルトのログファイルのサイズを大きくするには、`DD_TRACE_LOG_FILE_SIZE_BYTES` の設定でサイズをバイト単位で指定します。

3. ログをコンソールにルーティングするには、**Python 2** アプリケーションでは、 `logging.basicConfig()` 等を構成してください。**Python 3** のアプリケーションでは、ログは自動的にコンソールに送られます。


### シナリオ 2: ddtrace バージョン 1.0.x〜1.2.x

1. デバッグモードを有効にするには: `DD_TRACE_DEBUG=true`

2. **Python 2 または Python 3** アプリケーションでログをコンソールにルーティングするには、`logging.basicConfig()` を構成するか、`DD_CALL_BASIC_CONFIG=true` を使用します。

### シナリオ 3: ddtrace バージョン 0.x

1. デバッグモードを有効にするには: `DD_TRACE_DEBUG=true`

2. **Python 2 または Python 3** アプリケーションでログをコンソールにルーティングするには、`logging.basicConfig()` を構成するか、`DD_CALL_BASIC_CONFIG=true` を使用します。

### シナリオ 4: 標準のロギングライブラリを使用した、アプリケーションコードでのデバッグログの構成

どのバージョンの ddtrace でも、トレーサー環境変数 `DD_TRACE_DEBUG` を設定する代わりに、標準ライブラリ `logging` を直接使用して、アプリケーションコード内でデバッグログを有効にすることができます。

```
log = logging.getLogger("ddtrace.tracer")
log.setLevel(logging.DEBUG)
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

Datadog Ruby トレーサーのデバッグモードを有効にするには、環境変数 `DD_TRACE_DEBUG=true` を設定します。

**アプリケーションログ**

デフォルトでは、デフォルトの Ruby ロガーによってすべてのログが処理されます。Rails を使用している場合は、アプリケーションログファイルにメッセージが表示されます。

Datadog クライアントのログメッセージは、他のメッセージと区別できるように `[ddtrace]` とマークされます。

トレーサーの `log` 属性を使用し、デフォルトロガーを上書きしてカスタムロガーに置き換えることができます。

```ruby
f = File.new("<FILENAME>.log", "w+")           # ログメッセージが書き込まれる場所
Datadog.configure do |c|
  c.logger.instance = Logger.new(f)                 # デフォルトのトレーサーのオーバーライド
end

Datadog::Tracing.logger.info { "this is typically called by tracing code" }
```

詳細については、[API に関するドキュメント][1]を参照してください。


[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#custom-logging
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

Datadog Goトレーサのデバッグモードを有効にするには、`Start` 構成中にデバッグモードを有効にします。

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(tracer.WithDebugMode(true))
    defer tracer.Stop()
}
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

Datadog Node.js トレーサーのデバッグモードを有効にするには、環境変数 `DD_TRACE_DEBUG=true` を使用します。

**注:** 2.X 以下のバージョンでは、トレーサーの初期化時にデバッグモードをプログラム的に有効にすることができましたが、これはもうサポートされていません。

**アプリケーションログ**

デバッグモード中、トレーサーは、デバッグ情報を `console.log()` と `console.error()` に記録します。この動作は、カスタムロガーをトレーサーに渡すことで変更できます。ロガーは、それぞれメッセージとエラーを処理するための `debug()` メソッドと `error()` メソッドを含む必要があります。

例:

```javascript
const bunyan = require('bunyan')
const logger = bunyan.createLogger({
  name: 'dd-trace',
  level: 'trace'
})

const tracer = require('dd-trace').init({
  logger: {
    debug: message => logger.trace(message),
    error: err => logger.error(err)
  }
})
```

次に、Agent ログをチェックして、問題に関する詳細情報があるか確認します。

* トレースが Agent に問題なく送信されると、ログエントリ、`Response from the Agent: OK` が表示されます。これにより、トレーサーが正常に機能していることと、問題が Agent 自体にあることが分かります。詳細は、[Agent トラブルシューティングガイド][1]を参照してください。

* Agent からエラーが報告された場合 (または、Agent に到達できなかった場合)、`Error from the Agent` ログエントリが表示されます。この場合、ネットワーク構成を検証して、Agent に確実に到達できるようにします。ネットワークが機能していて、エラーが Agent から送信されたと確信できる場合は、[Agent トラブルシューティングガイド][1]を参照してください。

これらのログエントリのいずれも存在しない場合、Agent にリクエストが送信されていないことになり、トレーサーがアプリケーションをインスツルメントしていないことを意味します。この場合、[Datadog サポートに連絡][2]して、関連するログエントリを[フレア][3]で提供してください。

トレーサー設定の詳細については、[API ドキュメント][4]を参照してください。


[1]: /ja/agent/troubleshooting/
[2]: /ja/help/
[3]: /ja/agent/troubleshooting/#send-a-flare
[4]: https://datadog.github.io/dd-trace-js/#tracer-settings
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Datadog .NET トレーサーのデバッグモードを有効化するには、`DD_TRACE_DEBUG` コンフィギュレーションの設定を `true` に設定します。この設定は、`web.config` ファイル、`app.config` ファイル (.NET Framework のみ)、`datadog.json` ファイルで環境変数として設定できます。デバッグモードは、`GlobalSettings.SetDebugEnabled(true)` を呼び出すことで有効化することもできます。

```csharp
using Datadog.Trace;

// デバッグモードを有効化
GlobalSettings.SetDebugEnabled(true);

```

ログファイルは、デフォルトで以下のディレクトリに保存されます。`DD_TRACE_LOG_DIRECTORY` 設定を使用してこれらのパスを変更できます。

| プラットフォーム                                             | パス                                             |
|------------------------------------------------------|--------------------------------------------------|
| Windows                                              | `%ProgramData%\Datadog .NET Tracer\logs\`        |
| Linux                                                | `/var/log/datadog/dotnet/`                       |
| Linux ([Kubernetes ライブラリの挿入][1]を使用する場合) | `/datadog-lib/logs`                              |
| Azure App Service                                    | `%AzureAppServiceHomeDirectory%\LogFiles\datadog`|

**注**: Linux では、デバッグモードを有効にする前にログディレクトリを作成する必要があります。

.NET Tracer の構成方法の詳細については、[構成][2]セクションを参照してください。

これらのパスで作成されるログには、次の 2 つのタイプがあります。
1. **ネイティブコードからのログ:** 1.26.0 以降では、これらのログは `dotnet-tracer-native-<processname>-<processid>.log` として保存されます。バージョン 1.21.0〜1.25.x では、これらのログは `dotnet-tracer-native.log` として保存されていました。1.20.x 以前のバージョンでは、これは `dotnet-profiler.log` として保存されていました。
2. **マネージコードからのログ:** 1.21.0 以降では、これらのログは `dotnet-tracer-managed-<processname>-<date>.log` に保存されます。1.20.x 以前のバージョンでは、これは `dotnet-tracer-<processname>-<date>.log` として保存されていました。


[1]: /ja/tracing/trace_collection/library_injection/?tab=kubernetes
[2]: /ja/tracing/setup/dotnet/#configuration
{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

<mrk mid="78" mtype="seg"/><mrk mid="79" mtype="seg">この環境変数値をトレーサーが適切に処理できるように設定する方法とタイミングについては、[PHP 構成に関するドキュメント][1]を参照してください。</mrk>

`error_log` メッセージを置く場所を PHP に指示するには、それをサーバーレベルで設定するか、PHP `ini` パラメーターで設定します。後者が PHP の動作を構成する標準的な方法です。

<mrk mid="81" mtype="seg">Apache サーバーを使用している場合は、`ErrorLog` ディレクティブを使用します。</mrk>
<mrk mid="82" mtype="seg">NGINX サーバーを使用している場合は、`error_log` ディレクティブを使用します。</mrk>
<mrk mid="83" mtype="seg">PHP レベルで構成する場合は、PHP の `error_log` 初期化パラメーターを使用します。</mrk>


[1]: https://www.php-fig.org/psr/psr-3
{{< /programming-lang >}}

{{< programming-lang lang="cpp" >}}

すべてのリリースバイナリライブラリは、最適化されたリリースにデバッグシンボルが追加されコンパイルされています。GDB または LLDB を使用してライブラリをデバッグしたり、コアダンプを読み取ることができます。ソースからライブラリを構築する場合は、引数 `-DCMAKE_BUILD_TYPE=RelWithDebInfo` を cmake に渡して、最適化されたビルドをデバッグシンボル付きでコンパイルします。

```bash
cd .build
cmake -DCMAKE_BUILD_TYPE=RelWithDebInfo ..
make
make install
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## デバッグログを確認する

トレーサーのデバッグモードが有効になっている場合、トレーサー固有のログメッセージはトレーサーの初期化方法およびトレーサーが Agent に送信されたかを報告します。**このログは、フレアでは Datadog Agent に送信できません。また、ロギングコンフィギュレーションによっては別のパスに保存されます**。以下は、ご使用のログファイルに表示されるログの例になります。

理解できないエラーがある場合、またはトレースが Datadog にフラッシュされたと報告されたものの　Datadog UI に表示されない場合は、[Datadog サポートに連絡][1]し、[フレア][2] で関連するログエントリを入力します。

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}

**トレーサーの初期化ログ:**

```java
[main] DEBUG datadog.trace.agent.ot.DDTracer - Using config: Config(runtimeId=<ランタイム ID>, serviceName=<サービス名>, traceEnabled=true, writerType=DDAgentWriter, agentHost=<ここに IP>, agentPort=8126, agentUnixDomainSocket=null, prioritySamplingEnabled=true, traceResolverEnabled=true, serviceMapping={}, globalTags={env=none}, spanTags={}, jmxTags={}, excludedClasses=[], headerTags={}, httpServerErrorStatuses=[512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511], httpClientErrorStatuses=[400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499], httpClientSplitByDomain=false, partialFlushMinSpans=1000, runtimeContextFieldInjection=true, propagationStylesToExtract=[DATADOG], propagationStylesToInject=[DATADOG], jmxFetchEnabled=true, jmxFetchMetricsConfigs=[], jmxFetchCheckPeriod=null, jmxFetchRefreshBeansPeriod=null, jmxFetchStatsdHost=null, jmxFetchStatsdPort=8125, logsInjectionEnabled=false, reportHostName=false)
```

**生成されるトレースの例:**

```java
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.DDSpan - Finished: DDSpan [ t_id=<トレース id>, s_id=<スパン id>, p_id=<親 id>] trace=SpringBoot_Service/OperationHandler.handle/OperationHandler.handle metrics={} tags={component=spring-web-controller, env=none, span.kind=server, thread.id=33, thread.name=http-nio-8080-exec-1}, duration_ns=92808848
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - traceId: <トレース id> -- Expired reference. count = 1
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.DDSpan - Finished: DDSpan [ t_id=<トレース id>, s_id=<スパン id>, p_id=0] trace=SpringBoot_Service/servlet.request/GET /actuator/prometheus metrics={_sampling_priority_v1=1} tags={component=java-web-servlet, env=none, http.method=GET, http.status_code=200, http.url=http://<IP>:8080/actuator/prometheus, language=jvm, peer.hostname=<IP>, peer.ipv4=<IP>, peer.port=50778, runtime-id=<ランタイム id>, span.kind=server, span.origin.type=org.apache.catalina.core.ApplicationFilterChain, thread.id=33, thread.name=http-nio-8080-exec-1}, duration_ns=157972901
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - Writing 2 spans to DDAgentWriter { api=DDApi { tracesUrl=http://<IP アドレス>/v0.4/traces } }.
```

**トレースが Datadog Agent に送信されました:**

```java
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - traceId: <トレース id> -- Expired reference. count = 0
[dd-trace-writer] DEBUG datadog.trace.agent.common.writer.DDApi - Successfully sent 1 of 2 traces to the DD agent.
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Python トレーサーが生成するログは、ロギングハンドラ名 `ddtrace` を持ちます。

**トレースが生成されました:**

```text
<YYYY-MM-DD> 19:51:22,262 DEBUG [ddtrace.internal.processor.trace] [trace.py:211] - trace <TRACE ID> has 8 spans, 7 finished
```

**Python トレーサーによって生成されたスパン:**

```text
<YYYY-MM-DD> 19:51:22,251 DEBUG [ddtrace.tracer] [tracer.py:715] - finishing span name='flask.process_response' id=<SPAN ID> trace_id=<TRACE ID>  parent_id=<PARENT ID> service='flask' resource='flask.process_response' type=None start=1655495482.2478693 end=1655495482.2479873 duration=0.000118125 error=0 tags={} metrics={} (enabled:True)
0.0:5050/
```


**トレースが Datadog Agent に送信されました:**

```text
<YYYY-MM-DD> 19:59:19,657 DEBUG [ddtrace.internal.writer] [writer.py:405] - sent 1.57KB in 0.02605s to http://localhost:8126/v0.4/traces
```

**Datadog Agent へのトレース送信に失敗した:**

```text
<YYYY-MM-DD> 19:51:23,249 ERROR [ddtrace.internal.writer] [writer.py:567] - failed to send traces to Datadog Agent at http://localhost:8126/v0.4/traces
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

**スパンが生成されます:**

```text
D, [<YYYY-MM-DD>T16:42:51.147563 #476] DEBUG -- ddtrace: [ddtrace] (/usr/local/bundle/gems/ddtrace-<version>/lib/ddtrace/tracer.rb:371:in `write') Writing 4 spans (enabled: true)

 Name: rack.request
Span ID: <span id>
Parent ID: 0
Trace ID: <trace id>
Type: web
Service: todo
Resource: NotesController#index
Error: 0
Start: <start time>
End: <end time>
Duration: 11985000
Allocations: 1202
Tags: [
   system.pid => 476,
   env => dev,
   language => ruby,
   http.method => GET,
   http.url => /notes,
   http.base_url => http://0.0.0.0:3000,
   http.status_code => 304,
   http.response.headers.x_request_id => <header value>]
Metrics: [
   ..],

```


{{< /programming-lang >}}

{{< programming-lang lang="go" >}}


**Agent へのトレース送信試行:**

```text
YYYY/MM/DD 16:06:35 Datadog Tracer <version> DEBUG: Sending payload: size: <size of traces> traces: <number of traces>.
```


**トレースを Agent に送信できませんでした:**

```text
2019/08/07 16:12:27 Datadog Tracer <version> ERROR: lost <number of traces> traces: Post http://localhost:8126/v0.4/traces: dial tcp 127.0.0.1:8126: connect: connection refused, 4 additional messages skipped (first occurrence: DD MM YY 16:11 UTC)
```


{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

**Agent へのトレース送信の問題:**

```json
{
    "name": "dd-trace",
    "hostname": "<ホスト名>",
    "pid": 28817,
    "level": 50,
    "err": {
        "message": "Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126",
        "name": "Error",
        "stack": "Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126\n    at ClientRequest.req.on.e (/path/to/dd-trace/src/platform/node/request.js:44:33)\n    at scope.activate (/path/to/dd-trace/packages/dd-trace/src/scope/base.js:68:19)\n    at Scope._activate (/path/to/dd-trace/packages/dd-trace/src/scope/base.js:44:14)\n    at Scope.activate (/path/to/dd-trace/packages/dd-trace/src/scope/base.js:13:17)\n    at ClientRequest.<anonymous> (/path/to/dd-trace/packages/dd-trace/src/scope/base.js:67:20)\n    at ClientRequest.emit (events.js:193:13)\n    at ClientRequest.req.emit (/path/to/dd-trace/packages/datadog-plugin-http/src/client.js:93:21)\n    at Socket.socketErrorListener (_http_client.js:397:9)\n    at Socket.emit (events.js:198:15)\n    at emitErrorNT (internal/streams/destroy.js:91:8)"
    },
    "msg": "Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126",
    "time": "2019-08-06T20:48:27.769Z",
    "v": 0
}
```


{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

**ネイティブコードからのログ:**

```text
[dotnet] 19861: [debug] JITCompilationStarted: function_id=<function id> token=<token id> name=System.Net.Http.Headers.HttpHeaders.RemoveParsedValue()
```


**スパンを示すマネージコードからのログが生成されました:**

```text
{ MachineName: ".", ProcessName: "dotnet", PID: <process id>, AppDomainName: "test-webapi" }
YYYY-MM-DD HH:MM:SS.<integer> +00:00 [DBG] Span started: [s_id: <span id>, p_id: <parent span id>, t_id: <trace id>]
{ MachineName: ".", ProcessName: "dotnet", PID: <process id>, AppDomainName: "test-webapi" }
YYYY-MM-DD HH:MM:SS.<integer> +00:00 [DBG] Span closed: [s_id: <span id>, p_id: <parent span id>, t_id: <trace id>] for (Service: test-webapi, Resource: custom, Operation: custom.function, Tags: [<span tags>])
```

**トレースを示すマネージコードからのログを Datadog Agent に送信できませんでした:**

```text
YYYY-MM-DD HH:MM:SS.<integer> +00:00 [ERR] An error occurred while sending traces to the agent at System.Net.Http.HttpRequestException: Connection refused ---> System.Net.Sockets.SocketException: Connection refused
   at System.Net.Http.ConnectHelper.ConnectAsync(String host, Int32 port, CancellationToken cancellationToken)
   --- End of inner exception stack trace ---
```


{{< /programming-lang >}}

{{< programming-lang lang="php" >}}


**スパンの生成:**

```text
[Mon MM  DD 19:41:13 YYYY] [YYYY-MM-DDT19:41:13+00:00] [ddtrace] [debug] - Encoding span <span id> op: 'laravel.request' serv: 'Sample_Laravel_App' res: 'Closure unnamed_route' type 'web'
```



**Agent へのトレース送信試行:**

```text
[Mon MM  DD 19:56:23 YYYY] [YYYY-MM-DDT19:56:23+00:00] [ddtrace] [debug] - About to send trace(s) to the agent
```


**トレースが Agent に正常に送信されました:**

```text
[Mon MM  DD 19:56:23 2019] [YYYY-MM-DDT19:56:23+00:00] [ddtrace] [debug] - Traces successfully sent to the agent
```


{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/agent/troubleshooting/#send-a-flare