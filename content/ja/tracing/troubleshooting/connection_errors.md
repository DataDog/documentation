---
aliases:
- /ja/tracing/faq/why-am-i-getting-errno-111-connection-refused-errors-in-my-application-logs/
title: APM 接続エラー
---

トレーシングライブラリを使用しているアプリケーションが Datadog Agent に到達できない場合は、アプリケーションログと一緒に表示される[トレーサー起動ログ][1]や[トレーサーデバッグログ][2]で接続エラーがないかを確認してください。

## APM 接続の問題を示唆するエラー

これらのメッセージが表示された場合は、トレースが Datadog Agent に送信されていないことを意味します。

### トレーシングライブラリのエラー

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}

{{< programming-lang lang="java" >}}
#### Java 診断 CLI

Java トレーサーの 0.82.0+ から、Java トレーサーがインストールされている場所で診断コマンドを使用して、潜在的な接続の問題を検出することができるようになりました。`dd-java-agent.jar` がインストールされている場所 (アプリケーションコンテナ内) で実行してください。

```bash
java -jar /path/to/dd-java-agent.jar sampleTrace -c 1
```

結果出力例:

```text
[dd.trace 2021-08-24 18:38:01:501 +0000] [dd-task-scheduler] INFO datadog.trace.agent.core.StatusLogger - DATADOG TRACER CONFIGURATION {"version":"0.83.2~6bb3e09b2a","os_name":"Linux","os_version":"5.10.25-linuxkit","architecture":"amd64","lang":"jvm","lang_version":"1.8.0_232","jvm_vendor":"Oracle Corporation","jvm_version":"25.232-b09","java_class_version":"52.0","http_nonProxyHosts":"null","http_proxyHost":"null","enabled":true,"service":"dd-java-agent","agent_url":"http://localhost:8126","agent_error":true,"debug":false,"analytics_enabled":false,"sampling_rules":[{},{}],"priority_sampling_enabled":true,"logs_correlation_enabled":true,"profiling_enabled":false,"dd_version":"0.83.2~6bb3e09b2a","health_checks_enabled":true,"configuration_file":"no config file present","runtime_id":"<ID>","logging_settings":{"levelInBrackets":false,"dateTimeFormat":"'[dd.trace 'yyyy-MM-dd HH:mm:ss:SSS Z']'","logFile":"System.err","configurationFile":"simplelogger.properties","showShortLogName":false,"showDateTime":true,"showLogName":true,"showThreadName":true,"defaultLogLevel":"INFO","warnLevelString":"WARN","embedException":false}}
[dd.trace 2021-08-24 18:38:02:164 +0000] [dd-trace-processor] WARN datadog.trace.agent.common.writer.ddagent.DDAgentApi - Error while sending 1 (size=316B) traces to the DD agent. Total: 1, Received: 1, Sent: 0, Failed: 1. java.net.ConnectException: Failed to connect to localhost/127.0.0.1:8126 (Will not log errors for 5 minutes)
```


#### トレーサー起動ログ

```text
[dd.trace 2021-08-17 17:59:29:234 +0000] [dd-trace-processor] WARN datadog.trace.agent.common.writer.ddagent.DDAgentApi - Error while sending 9 (size=5KB) traces to the DD agent. Total: 9, Received: 9, Sent: 0, Failed: 9. java.net.ConnectException: Failed to connect to localhost/127.0.0.1:8126 (Will not log errors for 5 minutes)
```

#### トレーサーのデバッグログ

```text
[dd.trace 2021-08-17 18:04:50:282 +0000] [dd-trace-processor] DEBUG datadog.communication.ddagent.DDAgentFeaturesDiscovery - Error querying info at http://localhost:8126/
java.net.ConnectException: Failed to connect to localhost/127.0.0.1:8126
    at okhttp3.internal.connection.RealConnection.connectSocket(RealConnection.java:249)
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

#### トレーサー起動ログ

```text
2021-08-17 19:10:06,169 WARNING [ddtrace.tracer] [tracer.py:655] [dd.service= dd.env= dd.version= dd.trace_id=0 dd.span_id=0] - - DATADOG TRACER DIAGNOSTIC - Agent not reachable at http://localhost:8126. Exception raised: [Errno 99] Cannot assign requested address
```

#### トレーサーのデバッグログ

```text
2021-08-17 14:04:12,982 ERROR [ddtrace.internal.writer] [writer.py:466] [dd.service= dd.env= dd.version= dd.trace_id=0 dd.span_id=0] - failed to send traces to Datadog Agent at http://localhost:8126
Traceback (most recent call last):

```


{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

#### トレーサー起動ログ

```text
W, [2021-08-17T18:37:51.542245 #24]  WARN -- ddtrace: [ddtrace] DATADOG TRACER DIAGNOSTIC - Agent Error: Datadog::Transport::InternalErrorResponse ok?: unsupported?:, not_found?:, client_error?:, server_error?:, internal_error?:true, payload:, error_type:Errno::ECONNREFUSED error:Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126)
```

#### トレーサーのデバッグログ

```text
D, [2021-08-17T18:51:28.962389 #24] DEBUG -- ddtrace: [ddtrace] (/usr/local/bundle/gems/ddtrace-0.48.0/lib/ddtrace/transport/http/client.rb:33:in `rescue in send_request') Internal error during HTTP transport request. Cause: Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126) Location: /usr/local/lib/ruby/2.5.0/net/http.rb:939:in `rescue in block in connect'
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

#### トレーサー起動ログ

```text
2021/08/17 17:46:22 Datadog Tracer v1.32.0 WARN: DIAGNOSTICS Unable to reach agent intake: Post http://localhost:8126/v0.4/traces: dial tcp 127.0.0.1:8126: connect: connection refused
```

#### トレーサーのデバッグログ

```text
2021/08/17 17:47:42 Datadog Tracer v1.32.0 ERROR: lost 1 traces: Post http://localhost:8126/v0.4/traces: dial tcp 127.0.0.1:8126: connect: connection refused (occurred: 17 Aug 21 17:46 UTC)
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

#### トレーサー起動ログ

```text
DATADOG TRACER DIAGNOSTIC - Agent Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
```

#### トレーサーのデバッグログ

```text
Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
    at ClientRequest.<anonymous> (/home/node-web-app/node_modules/dd-trace/packages/dd-trace/src/platform/node/request.js:51:33)
```

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

#### マネージドログ

デバッグモードが有効になっていない場合も、マネージドログには接続拒否の問題に関するエラーが含まれます。

```
{ MachineName: ".", Process: "[114 sample-web-app]", AppDomain: "[1 sample-web-app]", TracerVersion: "1.28.2.0" }
2021-08-17 18:19:46.827 +00:00 [ERR] An error occurred while sending 1 traces to the agent at http://127.0.0.1:8126/v0.4/traces
System.Net.Http.HttpRequestException: Connection refused
 ---> System.Net.Sockets.SocketException (111): Connection refused
   at System.Net.Http.ConnectHelper.ConnectAsync(String host, Int32 port, CancellationToken cancellationToken)
   --- End of inner exception stack trace ---

```

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

#### トレーサー起動ログ

```
Failed to connect to localhost port 8126: Connection refused
```

{{< /programming-lang >}}

{{< programming-lang lang="cpp" >}}

#### アプリケーションログ

アプリケーションが Datadog Agent に到達できない場合、アプリケーションがログを送信する場所にこれらのログメッセージが出力されます。

```
Error sending traces to agent: Couldn't connect to server
Failed to connect to localhost port 8126: Connection refused
```


{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Datadog Agent エラー

[`agent status`][3] コマンド (Agent 6.20.0/7.20.0 で使用可能) で APM が実行されていない、または `localhost:8126` に到達できないと表示された場合は、Datadog Agent に APM が設定されておらず、トレースを Datadog のバックエンドに送信できません。

```text
APM Agent
=========
  Status: Not running or unreachable on localhost:8126.
```

## 接続に関する問題のトラブルシューティング
トレースライブラリや Datadog Agent でのエラーなど、問題の種類に関わらずいくつかのトラブルシューティングをお試しいただけます。

### ホストベースの設定

アプリケーションと Datadog Agent がコンテナ化されていない場合、トレーシングライブラリを使用しているアプリケーションはトレースを `localhost:8126` または `127.0.0.1:8126` に送信しようとしているはずです。これらは Datadog Agent がリッスンしている場所を示します。

Datadog Agent が APM をリッスンしていない旨が表示された場合は、Datadog Agent の APM コンポーネントがデフォルトで使用しているポート 8126 とポートが競合していないかを確認します。

根本的な原因を特定できない場合は、次の情報をご準備の上で [Datadog サポート][4]までご連絡ください。
- アプリケーションと Datadog Agent をデプロイする環境についての情報。
- プロキシを使用している場合は、その構成方法に関する情報。
- デフォルトのポートを 8126 から別のポートに変更しようとしている場合は、そのポートに関する情報。
- [Datadog Agent フレア][5]。

### コンテナ化された設定

#### ネットワークコンフィギュレーションを確認する

コンテナ化された設定では、トレースを `localhost` または `127.0.0.1` に送信しても、Datadog Agent もコンテナ化されていて別の場所にあるため正しく動作しない場合があります。**注意**: Amazon ECS on Fargate および AWS EKS on Fargate にはこのルールは適用されません。

アプリケーションと Datadog Agent 間のネットワークが、その構成に必要なものと一致しているかどうかを判断します。

特に、Datadog Agent がポート `8126` にアクセスできること、およびアプリケーションが Datadog Agent のある場所にトレースを誘導できることを確認してください。
確認を行うには、次のコマンドの変数 `{agent_ip}` と `{agent_port}` を置き換えて、アプリケーションコンテナから実行します。

```
curl -X GET http://{agent_ip}:{agent_port}/info
```

このコマンドが失敗した場合、コンテナは Agent にアクセスできません。この問題の原因を探るには、次のセクションを参照してください。

まずは、[APM アプリ内設定についてのドキュメント][6]を参照してください。

#### トレーシングライブラリがトレースを送信しようとしている場所を確認する

上記の各言語のエラーログを使用して、トレースがどこに向かっているのかを確認します。

以下の表で設定例をご確認ください。一部の製品では追加のネットワークコンフィギュレーションが必要なものもあります。

| セットアップ   | `DD_AGENT_HOST`  |
|---------|------------------|
| [Amazon ECS on EC2][7] | Amazon の EC2 メタデータエンドポイントを評価する  |
| [Amazon ECS on Fargate][8] | `DD_AGENT_HOST` は設定しないこと |
| [AWS EKS on Fargate][9] | `DD_AGENT_HOST` は設定しないこと |
| [AWS Elastic Beanstalk - 単一コンテナ][10] | ゲートウェイの IP (通常は `172.17.0.1`) |
| [AWS Elastic Beanstalk - 複数コンテナ][11] | Datadog Agent のコンテナ名を示すリンク |
| [Kubernetes][12] | 1) [Unix ドメインソケット][13]、2) [`status.hostIP`][14] を手動で追加、または 3) [Admission Controller][15] 経由。TCP を使用している場合は、コンテナに適用される[ネットワークポリシー][21]を確認します。 |
| [AWS EKS (Fargate 以外)][16] | 1) [Unix ドメインソケット][13]、2) [`status.hostIP`][14] を手動で追加、3) [Admission Controller][15] 経由 |
| [Datadog Agent およびアプリケーションの Docker コンテナ][17] | Datadog Agent コンテナ |


**Webサーバに関する注意点**: [トレーサー起動ログ][1]の `agent_url` セクションで、渡された環境変数 `DD_AGENT_HOST` との不一致がある場合、その特定のサーバーで環境変数がどのようにカスケードされているかを確認してください。例えば、PHP では、[Apache][18] や [Nginx][19] が環境変数 `DD_AGENT_HOST` を正しく取得するための追加設定があります。

トレースライブラリが設定に基づいて正しくトレースを送信していることを確認したら、次のステップに進みます。

#### Datadog Agent のステータスとコンフィギュレーションを確認する

Fargate 上で設定を行っていない場合は、Datadog Agent コンテナで `exec` を行って Agent status コマンド: `agent status` を実行することができます。

**注**: 専用コンテナで Kubernetes を使用している場合は、専用の Trace Agent コンテナへ `exec` を行ってください。

APM Agent セクションで、この操作が実行されているかどうかを確認します。

```text
=========
APM Agent
=========
  Status: Running
  Pid: <pid number>
  Uptime: <integer> seconds
  Mem alloc: <integer> bytes
  Hostname: <name of datadog agent container>
  Receiver: 0.0.0.0:8126
  Endpoints:
    https://trace.agent.datadoghq.com

  Receiver (previous minute)
  ==========================
    No traces received in the previous minute.
    Default priority sampling rate: 100.0%
```

コンフィギュレーションが正しくても接続エラーが発生する場合は、次の情報をご準備の上で [Datadog サポートまでご連絡][4]ください。
- アプリケーションと Datadog Agent をデプロイする環境についての情報。
- プロキシを使用している場合は、その構成方法に関する情報。
- アプリケーションと Datadog Agent の設定に使用されたすべてのコンフィギュレーションファイル。
- 接続エラーの概要が記載された起動ログまたはトレーサーデバッグログ。
- Datadog [Agent フレア][5]。専用コンテナの場合は、[Trace Agent 専用コンテナ][20]からフレアを送信します。


[1]: /ja/tracing/troubleshooting/tracer_startup_logs/
[2]: /ja/tracing/troubleshooting/tracer_debug_logs/
[3]: /ja/agent/configuration/agent-commands/#agent-information
[4]: /ja/help/
[5]: /ja/agent/troubleshooting/send_a_flare/
[6]: https://app.datadoghq.com/apm/service-setup
[7]: /ja/agent/amazon_ecs/apm/?tab=ec2metadataendpoint
[8]: /ja/integrations/ecs_fargate/#trace-collection
[9]: /ja/integrations/eks_fargate/#traces-collection
[10]: /ja/integrations/amazon_elasticbeanstalk/?tab=singlecontainer#trace-collection
[11]: /ja/integrations/amazon_elasticbeanstalk/?tab=multiplecontainers#trace-collection
[12]: /ja/agent/kubernetes/apm/
[13]: /ja/containers/kubernetes/apm/?tabs=daemonsetuds#configure-the-datadog-agent-to-accept-traces
[14]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#capabilities-of-the-downward-api
[15]: /ja/agent/cluster_agent/admission_controller/
[16]: /ja/integrations/amazon_eks/#setup
[17]: /ja/agent/docker/apm/#tracing-from-other-containers
[18]: /ja/tracing/trace_collection/dd_libraries/php/?tab=containers#apache
[19]: /ja/tracing/trace_collection/dd_libraries/php/?tab=containers#nginx
[20]: /ja/agent/troubleshooting/send_a_flare/?tab=agentv6v7#trace-agent
[21]: https://kubernetes.io/docs/concepts/services-networking/network-policies/