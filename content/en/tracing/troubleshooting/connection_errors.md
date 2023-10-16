---
title: APM Connection Errors
kind: Documentation
aliases:
  - /tracing/faq/why-am-i-getting-errno-111-connection-refused-errors-in-my-application-logs/
---

If the application with the tracing library cannot reach the Datadog Agent, look for connection errors in the [tracer startup logs][1] or [tracer debug logs][2], which can be found with your application logs.

## Errors that indicate an APM Connection problem

If you see these messages, it means your traces are not being submitted to the Datadog Agent.

### Tracing library errors

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}

{{< programming-lang lang="java" >}}
#### Java diagnostic CLI

Starting with 0.82.0+ of the Java tracer, you can use a diagnostic command where the Java tracer is installed to detect potential connection issues. From where `dd-java-agent.jar` is installed (inside the application container), run:

```bash
java -jar /path/to/dd-java-agent.jar sampleTrace -c 1
```

Example output:

```text
[dd.trace 2021-08-24 18:38:01:501 +0000] [dd-task-scheduler] INFO datadog.trace.agent.core.StatusLogger - DATADOG TRACER CONFIGURATION {"version":"0.83.2~6bb3e09b2a","os_name":"Linux","os_version":"5.10.25-linuxkit","architecture":"amd64","lang":"jvm","lang_version":"1.8.0_232","jvm_vendor":"Oracle Corporation","jvm_version":"25.232-b09","java_class_version":"52.0","http_nonProxyHosts":"null","http_proxyHost":"null","enabled":true,"service":"dd-java-agent","agent_url":"http://localhost:8126","agent_error":true,"debug":false,"analytics_enabled":false,"sampling_rules":[{},{}],"priority_sampling_enabled":true,"logs_correlation_enabled":true,"profiling_enabled":false,"dd_version":"0.83.2~6bb3e09b2a","health_checks_enabled":true,"configuration_file":"no config file present","runtime_id":"<ID>","logging_settings":{"levelInBrackets":false,"dateTimeFormat":"'[dd.trace 'yyyy-MM-dd HH:mm:ss:SSS Z']'","logFile":"System.err","configurationFile":"simplelogger.properties","showShortLogName":false,"showDateTime":true,"showLogName":true,"showThreadName":true,"defaultLogLevel":"INFO","warnLevelString":"WARN","embedException":false}}
[dd.trace 2021-08-24 18:38:02:164 +0000] [dd-trace-processor] WARN datadog.trace.agent.common.writer.ddagent.DDAgentApi - Error while sending 1 (size=316B) traces to the DD agent. Total: 1, Received: 1, Sent: 0, Failed: 1. java.net.ConnectException: Failed to connect to localhost/127.0.0.1:8126 (Will not log errors for 5 minutes)
```


#### Tracer startup logs

```text
[dd.trace 2021-08-17 17:59:29:234 +0000] [dd-trace-processor] WARN datadog.trace.agent.common.writer.ddagent.DDAgentApi - Error while sending 9 (size=5KB) traces to the DD agent. Total: 9, Received: 9, Sent: 0, Failed: 9. java.net.ConnectException: Failed to connect to localhost/127.0.0.1:8126 (Will not log errors for 5 minutes)
```

#### Tracer debug logs

```text
[dd.trace 2021-08-17 18:04:50:282 +0000] [dd-trace-processor] DEBUG datadog.communication.ddagent.DDAgentFeaturesDiscovery - Error querying info at http://localhost:8126/
java.net.ConnectException: Failed to connect to localhost/127.0.0.1:8126
	at okhttp3.internal.connection.RealConnection.connectSocket(RealConnection.java:249)
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

#### Tracer startup logs

```text
2021-08-17 19:10:06,169 WARNING [ddtrace.tracer] [tracer.py:655] [dd.service= dd.env= dd.version= dd.trace_id=0 dd.span_id=0] - - DATADOG TRACER DIAGNOSTIC - Agent not reachable at http://localhost:8126. Exception raised: [Errno 99] Cannot assign requested address
```

#### Tracer debug logs

```text
2021-08-17 14:04:12,982 ERROR [ddtrace.internal.writer] [writer.py:466] [dd.service= dd.env= dd.version= dd.trace_id=0 dd.span_id=0] - failed to send traces to Datadog Agent at http://localhost:8126
Traceback (most recent call last):

```


{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

#### Tracer startup logs

```text
W, [2021-08-17T18:37:51.542245 #24]  WARN -- ddtrace: [ddtrace] DATADOG TRACER DIAGNOSTIC - Agent Error: Datadog::Transport::InternalErrorResponse ok?: unsupported?:, not_found?:, client_error?:, server_error?:, internal_error?:true, payload:, error_type:Errno::ECONNREFUSED error:Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126)
```

#### Tracer debug logs

```text
D, [2021-08-17T18:51:28.962389 #24] DEBUG -- ddtrace: [ddtrace] (/usr/local/bundle/gems/ddtrace-0.48.0/lib/ddtrace/transport/http/client.rb:33:in `rescue in send_request') Internal error during HTTP transport request. Cause: Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126) Location: /usr/local/lib/ruby/2.5.0/net/http.rb:939:in `rescue in block in connect'
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

#### Tracer startup logs

```text
2021/08/17 17:46:22 Datadog Tracer v1.32.0 WARN: DIAGNOSTICS Unable to reach agent intake: Post http://localhost:8126/v0.4/traces: dial tcp 127.0.0.1:8126: connect: connection refused
```

#### Tracer debug logs

```text
2021/08/17 17:47:42 Datadog Tracer v1.32.0 ERROR: lost 1 traces: Post http://localhost:8126/v0.4/traces: dial tcp 127.0.0.1:8126: connect: connection refused (occurred: 17 Aug 21 17:46 UTC)
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

#### Tracer startup logs

```text
DATADOG TRACER DIAGNOSTIC - Agent Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
```

#### Tracer debug logs

```text
Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
    at ClientRequest.<anonymous> (/home/node-web-app/node_modules/dd-trace/packages/dd-trace/src/platform/node/request.js:51:33)
```

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

#### Managed logs

Even if debug mode isn't enabled, the managed logs contain errors from connection refused issues:

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

#### Tracer startup logs

```
Failed to connect to localhost port 8126: Connection refused
```

{{< /programming-lang >}}

{{< programming-lang lang="cpp" >}}

#### Application logs

When the application cannot reach the Datadog Agent, these log messages are emitted to where your application sends logs:

```
Error sending traces to agent: Couldn't connect to server
Failed to connect to localhost port 8126: Connection refused
```


{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Datadog Agent errors

If the [`agent status`][3] command (available in Agent 6.20.0/7.20.0) shows that APM is not running or is not reachable on `localhost:8126`, your Datadog Agent does not have APM configured and traces cannot be submitted to the Datadog backend.

```text
APM Agent
=========
  Status: Not running or unreachable on localhost:8126.
```

## Troubleshooting the connection problem
Whether it's the tracing library or the Datadog Agent displaying the error, there are a few ways to troubleshoot.

### Host-based setups

If your application and the Datadog Agent are not containerized, the application with the tracing library should be trying to send traces to `localhost:8126` or `127.0.0.1:8126`, because that is where the Datadog Agent is listening.

If the Datadog Agent shows that APM is not listening, check for port conflicts with port 8126, which is what the APM component of the Datadog Agent uses by default.

If you cannot isolate the root cause, [contact Datadog Support][4] with:
- Information about the environment in which you're deploying the application and Datadog Agent.
- If you are using proxies, information about how they've been configured.
- If you are trying to change the default port from 8126 to another port, information about that port.
- A [Datadog Agent flare][5].

### Containerized setups

#### Check network configuration

In containerized setups, submitting traces to `localhost` or `127.0.0.1` is often incorrect since the Datadog Agent is also containerized and located elsewhere. **Note**: Amazon ECS on Fargate and AWS EKS on Fargate are exceptions to this rule.

Determine if the networking between the application and the Datadog Agent matches what is needed for that configuration.

In particular, check to make sure that the Datadog Agent has access to port `8126` (or to the port you have defined) and that your application is able to direct traces to the Datadog Agent's location.
To do so, you can run the following command from the application container, replacing the `{agent_ip}` and `{agent_port}` variables:

```
curl -X GET http://{agent_ip}:{agent_port}/info
```

If this command fails, your container cannot access the Agent. Refer to the following sections to get hints on what could be causing this issue.

A great place to get started is the [APM in-app setup documentation][6].

#### Review where your tracing library is trying to send traces

Using the error logs listed above for each language, check to see where your traces are being directed.

See the table below for example setups. Some require setting up additional network configurations explained further in their docs.

| Setup   | `DD_AGENT_HOST`  |
|---------|------------------|
| [Amazon ECS on EC2][7] | Evaluate to Amazon's EC2 metadata endpoint |
| [Amazon ECS on Fargate][8] | Do not set `DD_AGENT_HOST` |
| [AWS EKS on Fargate][9] | Do not set `DD_AGENT_HOST` |
| [AWS Elastic Beanstalk - Single Container][10] | Gateway IP (usually `172.17.0.1`) |
| [AWS Elastic Beanstalk - Multiple Containers][11] | Link pointing to the Datadog Agent container name |
| [Kubernetes][12] | 1) [Unix Domain Socket][13], 2) [`status.hostIP`][14] added manually, or 3) through the [Admission Controller][15]. If using TCP, check the [network policies][21] applied on your container |
| [AWS EKS (non Fargate)][16] | 1) [Unix Domain Socket][13], 2) [`status.hostIP`][14] added manually, or 3) through the [Admission Controller][15] |
| [Datadog Agent and Application Docker Containers][17] | Datadog Agent container |


**Note about web servers**: If the `agent_url` section in the [tracer startup logs][1] has a mismatch against the `DD_AGENT_HOST` environment variable that was passed in, review how environment variables are cascaded for that specific server. For example, in PHP, there's an additional setting to ensure that [Apache][18] or [Nginx][19] pick up the `DD_AGENT_HOST` environment variable correctly.

If your tracing library is sending traces correctly based on your setup, then proceed to the next step.

#### Review your Datadog Agent status and configuration

If your setup is not on Fargate, you can `exec` into the Datadog Agent container and run the Agent status command: `agent status`

**Note**: If you use Kubernetes with dedicated containers, `exec` into the dedicated Trace Agent Container.

Look for the APM Agent section to confirm whether it is running:

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

If the configuration is correct, but you're still seeing connection errors, [contact Datadog Support][4] with:
- Information about the environment in which you're deploying the application and Datadog Agent.
- If you're using proxies, information about how they've been configured.
- Any configuration files used to set up the application and the Datadog Agent.
- Startup logs or tracer debug logs outlining the connection error.
- A Datadog [Agent flare][5]. For dedicated containers, send the flare from the [dedicated Trace Agent container][20].


[1]: /tracing/troubleshooting/tracer_startup_logs/
[2]: /tracing/troubleshooting/tracer_debug_logs/
[3]: /agent/configuration/agent-commands/#agent-information
[4]: /help/
[5]: /agent/troubleshooting/send_a_flare/
[6]: https://app.datadoghq.com/apm/service-setup
[7]: /agent/amazon_ecs/apm/?tab=ec2metadataendpoint
[8]: /integrations/ecs_fargate/#trace-collection
[9]: /integrations/eks_fargate/#traces-collection
[10]: /integrations/amazon_elasticbeanstalk/?tab=singlecontainer#trace-collection
[11]: /integrations/amazon_elasticbeanstalk/?tab=multiplecontainers#trace-collection
[12]: /agent/kubernetes/apm/
[13]: /containers/kubernetes/apm/?tabs=daemonsetuds#configure-the-datadog-agent-to-accept-traces
[14]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#capabilities-of-the-downward-api
[15]: /agent/cluster_agent/admission_controller/
[16]: /integrations/amazon_eks/#setup
[17]: /agent/docker/apm/#tracing-from-other-containers
[18]: /tracing/trace_collection/dd_libraries/php/?tab=containers#apache
[19]: /tracing/trace_collection/dd_libraries/php/?tab=containers#nginx
[20]: /agent/troubleshooting/send_a_flare/?tab=agentv6v7#trace-agent
[21]: https://kubernetes.io/docs/concepts/services-networking/network-policies/