---
aliases:
- /ko/tracing/faq/why-am-i-getting-errno-111-connection-refused-errors-in-my-application-logs/
kind: 설명서
title: 애플리케이션 성능 모니터링(APM) 연결 오류
---

추적 라이브러리 기능이 있는 애플리케이션을 Datadog 에이전트에 연결할 수 없는 경우, [트레이서 시작 로그][1] 또는 [트레이서 디버그 로그][2]에서 연결 오류를 찾아보세요. 애플리케이션 로그에서 찾을 수 있습니다.

## 애플리케이션 성능 모니터링(APM) 연결 문제를 나타내는 오류

해당 메시지가 표시되면 트레이스가 Datadog 에이전트에 전송되고 있지 않은 것입니다.

### 라이브러리 오류 추적

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}

{{< programming-lang lang="java" >}}
#### 자바(Java) 진단 CLI

자바(Java) 트레이서 0.82.0+부터는 자바(Java) 트레이서가 설치된 위치에서 진단 명령을 사용하여 잠재적 연결 문제를 감지할 수 있습니다. `dd-java-agent.jar`이 설치된 위치(애플리케이션 컨테이너 내부)에서 다음을 실행합니다.

```bash
java -jar /path/to/dd-java-agent.jar sampleTrace -c 1
```

출력 예시:

```text
[dd.trace 2021-08-24 18:38:01:501 +0000] [dd-task-scheduler] INFO datadog.trace.agent.core.StatusLogger - DATADOG TRACER CONFIGURATION {"version":"0.83.2~6bb3e09b2a","os_name":"Linux","os_version":"5.10.25-linuxkit","architecture":"amd64","lang":"jvm","lang_version":"1.8.0_232","jvm_vendor":"Oracle Corporation","jvm_version":"25.232-b09","java_class_version":"52.0","http_nonProxyHosts":"null","http_proxyHost":"null","enabled":true,"service":"dd-java-agent","agent_url":"http://localhost:8126","agent_error":true,"debug":false,"analytics_enabled":false,"sampling_rules":[{},{}],"priority_sampling_enabled":true,"logs_correlation_enabled":true,"profiling_enabled":false,"dd_version":"0.83.2~6bb3e09b2a","health_checks_enabled":true,"configuration_file":"no config file present","runtime_id":"<ID>","logging_settings":{"levelInBrackets":false,"dateTimeFormat":"'[dd.trace 'yyyy-MM-dd HH:mm:ss:SSS Z']'","logFile":"System.err","configurationFile":"simplelogger.properties","showShortLogName":false,"showDateTime":true,"showLogName":true,"showThreadName":true,"defaultLogLevel":"INFO","warnLevelString":"WARN","embedException":false}}
[dd.trace 2021-08-24 18:38:02:164 +0000] [dd-trace-processor] WARN datadog.trace.agent.common.writer.ddagent.DDAgentApi - Error while sending 1 (size=316B) traces to the DD agent. Total: 1, Received: 1, Sent: 0, Failed: 1. java.net.ConnectException: Failed to connect to localhost/127.0.0.1:8126 (Will not log errors for 5 minutes)
```


#### 트레이서 시작 로그

```text
[dd.trace 2021-08-17 17:59:29:234 +0000] [dd-trace-processor] WARN datadog.trace.agent.common.writer.ddagent.DDAgentApi - Error while sending 9 (size=5KB) traces to the DD agent. Total: 9, Received: 9, Sent: 0, Failed: 9. java.net.ConnectException: Failed to connect to localhost/127.0.0.1:8126 (Will not log errors for 5 minutes)
```

#### 트레이서 디버그 로그

```text
[dd.trace 2021-08-17 18:04:50:282 +0000] [dd-trace-processor] DEBUG datadog.communication.ddagent.DDAgentFeaturesDiscovery - Error querying info at http://localhost:8126/
java.net.ConnectException: Failed to connect to localhost/127.0.0.1:8126
    at okhttp3.internal.connection.RealConnection.connectSocket(RealConnection.java:249)
```

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

#### 트레이서 시작 로그

```text
2021-08-17 19:10:06,169 WARNING [ddtrace.tracer] [tracer.py:655] [dd.service= dd.env= dd.version= dd.trace_id=0 dd.span_id=0] - - DATADOG TRACER DIAGNOSTIC - Agent not reachable at http://localhost:8126. Exception raised: [Errno 99] Cannot assign requested address
```

#### 트레이서 디버그 로그

```text
2021-08-17 14:04:12,982 ERROR [ddtrace.internal.writer] [writer.py:466] [dd.service= dd.env= dd.version= dd.trace_id=0 dd.span_id=0] - failed to send traces to Datadog Agent at http://localhost:8126
Traceback (most recent call last):

```


{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

#### 트레이서 시작 로그

```text
W, [2021-08-17T18:37:51.542245 #24]  WARN -- ddtrace: [ddtrace] DATADOG TRACER DIAGNOSTIC - Agent Error: Datadog::Transport::InternalErrorResponse ok?: unsupported?:, not_found?:, client_error?:, server_error?:, internal_error?:true, payload:, error_type:Errno::ECONNREFUSED error:Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126)
```

#### 트레이서 디버그 로그

```text
D, [2021-08-17T18:51:28.962389 #24] DEBUG -- ddtrace: [ddtrace] (/usr/local/bundle/gems/ddtrace-0.48.0/lib/ddtrace/transport/http/client.rb:33:in `rescue in send_request') Internal error during HTTP transport request. Cause: Failed to open TCP connection to 127.0.0.1:8126 (Connection refused - connect(2) for "127.0.0.1" port 8126) Location: /usr/local/lib/ruby/2.5.0/net/http.rb:939:in `rescue in block in connect'
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

#### 트레이서 시작 로그

```text
2021/08/17 17:46:22 Datadog Tracer v1.32.0 WARN: DIAGNOSTICS Unable to reach agent intake: Post http://localhost:8126/v0.4/traces: dial tcp 127.0.0.1:8126: connect: connection refused
```

#### 트레이서 디버그 로그

```text
2021/08/17 17:47:42 Datadog Tracer v1.32.0 ERROR: lost 1 traces: Post http://localhost:8126/v0.4/traces: dial tcp 127.0.0.1:8126: connect: connection refused (occurred: 17 Aug 21 17:46 UTC)
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

#### 트레이서 시작 로그

```text
DATADOG TRACER DIAGNOSTIC - Agent Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
```

#### 트레이서 디버그 로그

```text
Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
    at ClientRequest.<anonymous> (/home/node-web-app/node_modules/dd-trace/packages/dd-trace/src/platform/node/request.js:51:33)
```

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

#### 관리 로그

디버그 모드가 활성화되어 있지 않더라도 관리 로그에는 연결 거부 문제로 인한 오류가 포함됩니다.

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

#### 트레이서 시작 로그

```
Failed to connect to localhost port 8126: Connection refused
```

{{< /programming-lang >}}

{{< programming-lang lang="cpp" >}}

#### 애플리케이션 로그

애플리케이션이 Datadog 에이전트에 연결할 수 없는 경우, 다음 로그 메시지가 애플리케이션이 로그를 전송하는 위치로 전송됩니다.

```
Error sending traces to agent: Couldn't connect to server
Failed to connect to localhost port 8126: Connection refused
```


{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Datadog 에이전트 오류

[`agent status`][3] 명령(에이전트 6.20.0/7.20.0에서 사용 가능)에 애플리케이션 성능 모니터링(APM)이 실행 중이지 않거나 `localhost:8126`에 연결할 수 없다고 표시되는 경우, Datadog 에이전트에 애플리케이션 성능 모니터링(APM)이 설정되어 있지 않아 트레이스를 Datadog 백엔드로 전송할 수 없는 상태입니다.

```text
APM Agent
=========
  Status: Not running or unreachable on localhost:8126.
```

## 연결 문제 트러블슈팅
추적 라이브러리 또는 Datadog 에이전트 오류가 표시되는 경우 다음 몇 가지 방법으로 문제를 해결할 수 있습니다.

### 호스트 기반 설정

애플리케이션 및 Datadog 에이전트가 컨테이너화되지 않은 경우, 추적 라이브러리가 있는 애플리케이션은 트레이스를 `localhost:8126` 또는 `127.0.0.1:8126`으로 전송하려고 시도합니다. 이는 Datadog 에이전트가 해당 트레이스의 수신 대기하는 위치이기 때문입니다.

Datadog 에이전트에 애플리케이션 성능 모니터링(APM) 수신 대기중이 아니라고 표시되는 경우, 점검 포트가 Datadog 에이전트의 애플리케이션 성능 모니터링(APM) 구성 요소가 기본값으로 사용하는 포트 8126과 충돌하는 상태입니다.

근본 원인을 파악할 수 없다면 다음 정보와 함께 [Datadog 지원 팀에 문의][4]하세요.
- 애플리케이션 및 Datadog 에이전트를 배포하는 환경 정보.
- 프록시를 사용하는 경우 해당 프록시 설정에 대한 정보.
- 기본 포트를 8126에서 다른 포트로 변경하려는 경우 해당 포트에 대한 정보.
- [Datadog 에이전트 플레어(flare)][5].

### 컨테이너화된 설정

#### 네트워크 설정 점검

컨테이너화된 설정의 경우 Datadog 에이전트도 컨테이너화되어 다른 곳에 위치하므로 트레이스를 `localhost` 또는 `127.0.0.1`로 전송하는 것은 종종 올바르지 않을 수 있습니다. **참고**: Fargate의 Amazon ECS 및 Fargate의 AWS EKS는 해당 규칙에서 제외됩니다.

애플리케이션과 Datadog 에이전트 사이의 네트워킹이 해당 설정 요구사항과 일치하는지 확인하세요.

특히 Datadog 에이전트가 `8126` 포트(또는 정의한 포트)에 접근할 수 있는지, 애플리케이션이 Datadog 에이전트 위치로 트레이스를 직접 전송할 수 있는지 점검하세요.
이를 확인하려면 애플리케이션 컨테이너에서 다음 명령을 실행하여 `{agent_ip}` 및 `{agent_port}` 변수를 교체합니다.

```
curl -X GET http://{agent_ip}:{agent_port}/info
```

본 명령이 실패하면 컨테이너는 에이전트에 접근할 수 없습니다. 문제의 원인에 대한 힌트를 얻으려면 다음 섹션을 참조하세요.

[애플리케이션 성능 모니터링(APM) 인앱 설정 문서][6]에서부터 시작하시기를 권장합니다.

#### 추적 라이브러리가 트레이스를 전송하려는 위치를 검토합니다.

각 언어당 상기 명시한 오류 로그를 사용하여 트레이스가 어디로 보내지는지 확인하세요.

설정 예시를 확인하려면 하단의 표를 참조하세요. 일부는 해당 문서에 자세히 설명되어 있는 네트워크 구성을 추가로 설정해야 합니다.

| 설정   | `DD_AGENT_HOST`  |
|---------|------------------|
| [EC2 Amazon ECS][7] | Amazon의 EC2 메타데이터 엔드포인트 평가 |
| [Fargate Amazon ECS][8] | `DD_AGENT_HOST`을 설정하지 않음 |
| [Fargate AWS EKS][9] | `DD_AGENT_HOST`을 설정하지 않음 |
| [AWS Elastic Beanstalk - 싱글 컨테이너][10] | 게이트웨이 IP (일반적으로 `172.17.0.1`) |
| [AWS Elastic Beanstalk - 다중 컨테이너][11] | Datadog 에이전트 컨테이너 이름에 포인팅된 링크 |
| [쿠버네티스(Kubernetes)][12] | 1) [유닉스 도메인 소켓(Unix Domain Socket)][13], 2) 수동으로 추가된 [`status.hostIP`][14] 또는 3) [어드미션 컨트롤러][15]를 통해서. TCP를 사용하는 경우, 컨테이너에 적용된 [네트워크 정책][21]을 확인하세요. |
| [AWS EKS(Non-Fargate)][16] | 1) [유닉스 도메인 소켓(Unix Domain Socket)][13], 2) 수동으로 추가된 [`status.hostIP`][14] 또는 3) [어드미션 컨트롤러][15]를 통해서. |
| [Datadog 에이전트 및 애플리케이션 도커(Docker) 컨테이너][17] | Datadog 에이전트 컨테이너 |


**웹 서버 관련 참고 사항**: [트레이서 시작 로그][1]의 `agent_url` 섹션이 전달된 `DD_AGENT_HOST` 환경 변수와 일치하지 않는 경우, 특정 서버에 대해 해당 환경 변수가 캐스케이드되는 방식을 확인합니다. 예를 들어, PHP에는 [Apache][18] 또는 [Nginx][19]가 `DD_AGENT_HOST` 환경 변수를 올바르게 선택하도록 하는 추가 설정이 있습니다.

추적 라이브러리가 트레이스를 정확하게 전송하는 경우 다음 단계로 진행합니다.

#### Datadog 에이전트 상태 및 설정을 검토합니다.

Fargate에서 설정되어 있지 않은 경우, Datadog 에이전트 컨테이너에서 `exec` 수행 및 에이전트 상태 명령어 `agent status`를 실행할 수 있습니다. 

**참고**: 쿠버네티스(Kubernetes)를 전용 컨테이너와 함께 사용하는 경우 전용 트레이스 에이전트 컨테이너에서 `exec`를 수행합니다. 

애플리케이션 성능 모니터링(APM) 에이전트 섹션에서 다음의 실행 여부를 확인합니다.

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

설정이 올바른데도 연결 오류가 계속 표시되는 경우 다음 정보와 함께 [Datadog 지원 팀에 문의][4]하세요.
- 애플리케이션 및 Datadog 에이전트를 배포하는 환경 정보.
- 프록시를 사용하는 경우 해당 프록시 설정에 대한 정보.
- 애플리케이션 및 Datadog 에이전트 설정에 사용되는 모든 설정 파일.
- 연결 오류를 요약한 시작 로그 또는 트레이서 디버그 로그.
- Datadog [에이전트 플레어(flare)][5]. 전용 컨테이너의 경우 [전용 트레이스 에이전트 컨테이너][20]의 플레어를 전송합니다.


[1]: /ko/tracing/troubleshooting/tracer_startup_logs/
[2]: /ko/tracing/troubleshooting/tracer_debug_logs/
[3]: /ko/agent/configuration/agent-commands/#agent-information
[4]: /ko/help/
[5]: /ko/agent/troubleshooting/send_a_flare/
[6]: https://app.datadoghq.com/apm/service-setup
[7]: /ko/agent/amazon_ecs/apm/?tab=ec2metadataendpoint
[8]: /ko/integrations/ecs_fargate/#trace-collection
[9]: /ko/integrations/eks_fargate/#traces-collection
[10]: /ko/integrations/amazon_elasticbeanstalk/?tab=singlecontainer#trace-collection
[11]: /ko/integrations/amazon_elasticbeanstalk/?tab=multiplecontainers#trace-collection
[12]: /ko/agent/kubernetes/apm/
[13]: /ko/containers/kubernetes/apm/?tabs=daemonsetuds#configure-the-datadog-agent-to-accept-traces
[14]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#capabilities-of-the-downward-api
[15]: /ko/agent/cluster_agent/admission_controller/
[16]: /ko/integrations/amazon_eks/#setup
[17]: /ko/agent/docker/apm/#tracing-from-other-containers
[18]: /ko/tracing/trace_collection/dd_libraries/php/?tab=containers#apache
[19]: /ko/tracing/trace_collection/dd_libraries/php/?tab=containers#nginx
[20]: /ko/agent/troubleshooting/send_a_flare/?tab=agentv6v7#trace-agent
[21]: https://kubernetes.io/docs/concepts/services-networking/network-policies/