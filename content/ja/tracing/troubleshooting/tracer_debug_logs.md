---
title: トレーサーデバッグログ
kind: Documentation
---
### トレーサーデバッグモードを有効にする

Datadog デバッグ設定を使用して、問題を診断したり、トレースデータを監査したりできます。ロガーに送信されるイベントの数が増えるため、実稼働システムでデバッグモードを有効にすることはお勧めできません。デバッグ目的でのみ慎重に使用してください。

<mrk mid="28" mtype="seg"/><mrk mid="29" mtype="seg"/>

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}

{{< programming-lang lang="java" >}}

Datadog Java トレーサーのデバッグモードを有効にするには、JVM の起動時にフラグ `-Ddd.trace.debug=true` を設定するか、環境変数として `DD_TRACE_DEBUG=true` を追加します。

**注**: Datadog Java トレーサーは SL4J SimpleLogger を実装するため、[そのすべての設定を適用できます][1]。例えば、専用のログファイルにロギングするには次のようにします。
```
-Ddatadog.slf4j.simpleLogger.logFile=<NEW_LOG_FILE_PATH>`
```

[1]: https://www.slf4j.org/api/org/slf4j/impl/SimpleLogger.html

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Datadog Python トレーサーのデバッグモードを有効にするには、`ddtrace-run` を使用するときに環境変数 `DATADOG_TRACE_DEBUG=true` を設定します。
<p></p>

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

Datadog Rubyトレーサーのデバッグモードを有効にするには、トレーサー初期化構成で `debug` オプションを `true` に設定します。

```ruby
Datadog.configure do |c|
  c.tracer debug: true
end
```

**アプリケーションログ**:

デフォルトでは、デフォルトの Ruby ロガーによってすべてのログが処理されます。Rails を使用している場合は、アプリケーションログファイルにメッセージが表示されます。

Datadog クライアントのログメッセージは、他のメッセージと区別できるように `[ddtrace]` とマークされます。

トレーサーの `log` 属性を使用し、デフォルトロガーを上書きしてカスタムロガーに置き換えることができます。

<mrk mid="45" mtype="seg">```ruby
f = File.new(&quot;&lt;FILENAME&gt;.log&quot;, &quot;w+&quot;)           # ログメッセージが書き込まれる場所
Datadog.configure do |c|
  c.tracer log:</mrk> <mrk mid="46" mtype="seg">Logger.new(f)                 # デフォルトのトレーサーの上書き
end

Datadog::Tracer.log.info { &quot;this is typically called by tracing code&quot; }
```</mrk>

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

Datadog Node.js トレーサーのデバッグモードを有効にするには、`init` 中にそれを有効にします。

```javascript
const tracer = require('dd-trace').init({
  debug: true
})
```

**アプリケーションログ**:

デフォルトでは、このライブラリからのログは無効です。ログに送信するデバッグ情報やエラーを取得するには、[init()][1] メソッドで `debug` オプションを `true` に設定します。

トレーサーは、デバッグ情報を `console.log()` と `console.error()` に記録します。この動作は、カスタムロガーをトレーサーに渡すことで変更できます。ロガーは、それぞれメッセージとエラーを処理するための `debug()` メソッドと `error()` メソッドを含む必要があります。

例:

<mrk mid="59" mtype="seg">```javascript
const bunyan = require('bunyan')
const logger = bunyan.createLogger({
  name:</mrk> <mrk mid="60" mtype="seg">'dd-trace',
  level:</mrk> <mrk mid="61" mtype="seg">'trace'
})

const tracer = require('dd-trace').init({
  logger:</mrk> <mrk mid="62" mtype="seg">{
    debug: message =&gt; logger.trace(message),
    error: err =&gt; logger.error(err)
  },
  debug: true
})
```</mrk>

次に、Agent ログをチェックして、問題に関する詳細情報があるか確認します。

* トレースが Agent に問題なく送信されると、ログエントリ、`Response from the Agent: OK` が表示されます。これにより、トレーサーが正常に機能していることと、問題が Agent 自体にあることが分かります。詳細は、[Agent トラブルシューティングガイド][2]を参照してください。

* Agent からエラーが報告された場合 (または、Agent に到達できなかった場合)、`Error from the Agent` ログエントリが表示されます。この場合、ネットワーク構成を検証して、Agent に確実に到達できるようにします。ネットワークが機能していて、エラーが Agent から送信されたと確信できる場合は、[Agent トラブルシューティングガイド][2]を参照してください。

<mrk mid="71" mtype="seg"/><mrk mid="72" mtype="seg"/>

トレーサー設定の詳細については、[API ドキュメント][5] を参照してください。

[1]: https://datadog.github.io/dd-trace-js/Tracer.html#init
[2]: /ja/agent/troubleshooting/
[3]: /ja/help/
[4]: /ja/agent/troubleshooting/#send-a-flare
[5]: https://datadog.github.io/dd-trace-js/#tracer-settings

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Datadog .NET トレーサーのデバッグモードを有効化するには、`DD_TRACE_DEBUG` コンフィギュレーションの設定を `true` に設定します。この設定は、`web.config` ファイル、`app.config` ファイル (.NET Framework のみ)、`datadog.json` ファイルで環境変数として設定できます。デバッグモードは、`GlobalSettings.SetDebugEnabled(true)` を呼び出すことで有効化することもできます。

```csharp
using Datadog.Trace;

// デバッグモードを有効化
GlobalSettings.SetDebugEnabled(true);

```

ログファイルは、デフォルトで以下のディレクトリに保存されます。`DD_TRACE_LOG_DIRECTORY` 設定を使用してこれらのパスを変更できます。

| プラットフォーム | パス                                      |
|----------|-------------------------------------------|
| Windows  | `%ProgramData%\Datadog .NET Tracer\logs\` |
| Linux    | `/var/log/datadog/dotnet/`                |

**注**: Linux では、デバッグモードを有効にする前にログディレクトリを作成する必要があります。

.NET Tracer の構成方法の詳細については、[構成][1]セクションを参照してください。

これらのパスで作成されるログには、次の 2 つのタイプがあります。
1. **ネイティブコードからのログ:** 1.21.0 以降では、これらのログは `dotnet-tracer-native.log` として保存されます。1.20.x 以前のバージョンでは、これは `dotnet-profiler.log` として保存されていました。
2. **マネージコードからのログ:** 1.21.0 以降では、これらのログは `dotnet-tracer-managed-<processname>-<date>.log` に保存されます。1.20.x 以前のバージョンでは、これは `dotnet-tracer-<processname>-<date>.log` として保存されていました。


[1]: /ja/tracing/setup/dotnet/#configuration

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

### トレーサーデバッグログのレビュー

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

さらに表示するには、`DD_LOGGING_RATE_LIMIT=0` を含めます。

**トレースが生成されました:**

```shell
<YYYY-MM-DD> 16:01:11,280 DEBUG [ddtrace.tracer] [tracer.py:470] - writing 8 spans (enabled:True)
```

**Python トレーサーによって生成されたスパン:**

```text
<YYYY-MM-DD> 16:01:11,280 DEBUG [ddtrace.tracer] [tracer.py:472] -
      name flask.request
        id <スパン id>
  trace_id <トレース id>
 parent_id <親 id>
   service flask
  resource GET /
      type http
     start <開始時間>
       end <終了時間>
  duration 0.004759s
     error 0
      tags
           flask.endpoint:index
           flask.url_rule:/
           flask.version:1.1.1
           http.method:GET
           http.status_code:200
           http.url:http://0.0.0.0:5050/
           system.pid:25985

```


**トレースが Datadog Agent に送信されました:**

```shell
<YYYY-MM-DD> 16:01:11,637 DEBUG [ddtrace.api] [api.py:236] - reported 1 traces in 0.00207s
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

**スパンが生成されます:**

```shell
D, [<YYYY-MM-DD>T16:42:51.147563 #476] DEBUG -- ddtrace: [ddtrace] (/usr/local/bundle/gems/ddtrace-<version>/lib/ddtrace/tracer.rb:371:in `write') Writing 4 spans (enabled: true)

 Name: rack.request
Span ID: <スパン id>
Parent ID: 0
Trace ID: <トレース id>
Type: web
Service: todo
Resource: NotesController#index
Error: 0
Start: <開始時間>
End: <終了時間>
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
   http.response.headers.x_request_id => <ヘッダー値>]
Metrics: [
   ..],

```


{{< /programming-lang >}}

{{< programming-lang lang="go" >}}


**Agent へのトレース送信試行:**

```shell
YYYY/MM/DD 16:06:35 Datadog Tracer <バージョン> DEBUG: Sending payload: size: <トレースのサイズ> traces: <トレースの数>.
```


**トレースを Agent に送信できませんでした:**

```shell
2019/08/07 16:12:27 Datadog Tracer <バージョン> ERROR: lost <トレースの数> traces: Post http://localhost:8126/v0.4/traces: dial tcp 127.0.0.1:8126: connect: connection refused, 4 additional messages skipped (first occurrence: DD MM YY 16:11 UTC)
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

```shell
[dotnet] 19861: [debug] JITCompilationStarted: function_id=<関数 id> token=<トークン id> name=System.Net.Http.Headers.HttpHeaders.RemoveParsedValue()
```


**スパンを示すマネージコードからのログが生成されました:**

```shell
{ MachineName: ".", ProcessName: "dotnet", PID: <プロセス id>, AppDomainName: "test-webapi" }
YYYY-MM-DD HH:MM:SS.<integer> +00:00 [DBG] Span started: [s_id: <スパン id>, p_id: <親スパン id>, t_id: <トレース id>]
{ MachineName: ".", ProcessName: "dotnet", PID: <プロセス id>, AppDomainName: "test-webapi" }
YYYY-MM-DD HH:MM:SS.<integer> +00:00 [DBG] Span closed: [s_id: <スパン id>, p_id: <親スパン id>, t_id: <トレース id>] for (Service: test-webapi, Resource: custom, Operation: custom.function, Tags: [<スパンタグ>])
```

**トレースを示すマネージコードからのログを Datadog Agent に送信できませんでした:**

```shell
YYYY-MM-DD HH:MM:SS.<整数> +00:00 [ERR] An error occurred while sending traces to the agent at System.Net.Http.HttpRequestException: Connection refused ---> System.Net.Sockets.SocketException: Connection refused
   at System.Net.Http.ConnectHelper.ConnectAsync(String host, Int32 port, CancellationToken cancellationToken)
   --- End of inner exception stack trace ---
```


{{< /programming-lang >}}

{{< programming-lang lang="php" >}}


**スパンの生成:**

```shell
[Mon MM  DD 19:41:13 YYYY] [YYYY-MM-DDT19:41:13+00:00] [ddtrace] [debug] - Encoding span <スパン id> op: 'laravel.request' serv: 'Sample_Laravel_App' res: 'Closure unnamed_route' type 'web'
```



**Agent へのトレース送信試行:**

```shell
[Mon MM  DD 19:56:23 YYYY] [YYYY-MM-DDT19:56:23+00:00] [ddtrace] [debug] - About to send trace(s) to the agent
```


**トレースが Agent に正常に送信されました:**

```shell
[Mon MM  DD 19:56:23 2019] [YYYY-MM-DDT19:56:23+00:00] [ddtrace] [debug] - Traces successfully sent to the agent
```


{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

[1]: /ja/help/
[2]: /ja/agent/troubleshooting/#send-a-flare