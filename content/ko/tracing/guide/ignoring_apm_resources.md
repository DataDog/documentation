---
title: APM에서 원하지 않는 리소스 무시하기
---

서비스에서는 다양한 요청을 처리합니다. 이 중에는 추적하거나 트레이스 메트릭에 포함될 필요가 없는 것도 있습니다. 예를 들어 웹 애플리케이션 상태 점검은 포함될 필요가 없습니다.

이와 같은 엔드포인트를 추적하지 않고 트레이스 메트릭에서 제외하는 방법에는 두 가지가 있습니다.

- [트레이스 에이전트를 구성](#trace-agent-configuration-options)(Datadog 에이전트)하거나 또는
- [트레이서를 구성](#tracer-configuration-options)하는 것입니다.

<div class="alert alert-danger"><strong>참고</strong>: 다음 옵션으로 트레이스를 필터링하면 <a href="/tracing/guide/metrics_namespace/">트레이스 메트릭</a>에서 이 해당 요청을 삭제합니다. 트레이스 메트릭에 영향을 주지 않고 수집 데이터를 줄이는 방법을 알아보려면 <a href="/tracing/trace_ingestion/ingestion_controls">수집 통제</a>를 참고하세요.</div>

도움이 필요하면 [Datadog 지원팀][1]에 문의하세요.


## 트레이스 에이전트 구성 옵션

트레이스 에이전트는 Datadog 에이전트의 구성 요소이며, 두 가지 방법으로 특정 트레이스가 수집되는 것을 방지할 수 있습니다. 스팬 태그를 무시하거나 리소스를 무시하는 방법입니다. 이와 같은 설정으로 트레이스가 수집되지 않으면 트레이스 메트릭에서 이 요청을 제외합니다.

트레이스 에이전트에서 특정 스팬이나 리소스를 무시하도록 구성하면 이 특정 Datadog 에이전트로 트레이스를 전송하는 서비스 전체에 적용됩니다. 애플리케이션 지정 필수 조건이 있을 경우에는 대신 [트레이서 구성](#tracer-configuration) 방법을 사용하세요.

### 스팬 태그 기반 무시

Datadog 에이전트 6.27.0/7.27.0부터 **태그 필터** 옵션을 사용해 특정 스팬 태그와 일치하는 루트 스팬의 트레이스를 제외할 수 있습니다. 이 옵션은 특정 Datadog 에이전트에 트레이스를 보내는 모든 서비스에 적용됩니다. 필터 태그 때문에 제외된 트레이스는 트레이스 메트릭에 포함되지 않습니다.

Datadog에 보내고 싶지 않은 트레이스 세트를 프로그램적인 방법으로 파악할 수 있고, 이 가이드에 안내된 내용으로 필요한 조건을 충족할 수 없을 경우, [커스텀 스팬 태그][2]를 추가해 트레이스를 제외하는 것을 권고합니다. 사례에 맞는 방법이 무엇인지 논의하고 Datadog에서 이 기능을 계속해서 확장할 수 있도록 [지원팀에 문의][1]해 주시면 감사하겠습니다.

필터 태그 옵션을 사용하려면 문자열이 정확하게 일치해야 합니다. regex 무시 방법이 필요한 사용 사례일 경우에는 [리소스 기반 무시](#ignoring-based-on-resources) 방법을 사용하세요

환경 변수에서 띄어쓰기로 구분된 키와 값의 목록을 사용하여 포함하거나 거부할 스팬 태그를 지정할 수 있습니다.

`DD_APM_FILTER_TAGS_REQUIRE`
: 특정 스팬 태그와 값에 완전히 일치하는 루트 스팬 트레이스만 수집합니다. 이 규칙과 일치하지 않으면 트레이스가 제외됩니다(예: `DD_APM_FILTER_TAGS_REQUIRE="key1:value1 key2:value2"`). Datadog 에이전트 7.49+의 경우 정규식을 `DD_APM_FILTER_TAGS_REGEX_REQUIRE`로 제공할 수 있습니다.

`DD_APM_FILTER_TAGS_REJECT`
: 특정 스팬 태그 및 값과 완전히 일치하는 루트 스팬 트레이스를 거부합니다. 이 규칙과 일치하면 트레이스가 제외됩니다(예: `DD_APM_FILTER_TAGS_REJECT="key1:value1 key2:value2"`). Datadog 에이전트 7.49+의 경우 정규식을 `DD_APM_FILTER_TAGS_REGEX_REJECT`로 제공할 수 있습니다.


{{< tabs >}}
{{% tab "datadog.yaml" %}}

또는 에이전트 구성에서 쉼표로 구분된 목록으로 설정할 수 있습니다.

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    require: ["db:sql", "db.instance:mysql"]
    reject: ["outcome:success", "key2:value2"]
{{< /code-block >}}

예를 들어 `http.url`과 이 엔드포인트가 일치하는 상태 점검을 무시하려면 다음을 참고하세요.

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    reject: ["http.url:http://localhost:5050/healthcheck"]
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes" %}}
#### Datadog 연산자

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      containers:
        trace-agent:
          env:
            - name: DD_APM_FILTER_TAGS_REJECT
              value: tag_key1:tag_val2 tag_key2:tag_val2
{{< /code-block >}}

{{% k8s-operator-redeploy %}}

#### Helm

{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
agents:
  containers:
    traceAgent:
      env:
        - name: DD_APM_FILTER_TAGS_REJECT
          value: tag_key1:tag_val2 tag_key2:tag_val2

{{< /code-block >}}

{{% k8s-helm-redeploy %}}

[1]: /ko/agent/kubernetes/?tab=helm#installation
{{% /tab %}}
{{< /tabs >}}

이 방법으로 트레이스를 필터링하면 [트레이스 메트릭][3]에서 요청을 제거합니다. 트레이스 메트릭에 영향을 주지 않으면서 데이터 수집을 줄이는 방법을 알아보려면 [수집 통제][4]를 참고하세요.

Datadog는 데이터 수집 후 백엔드에서 다음 스팬 태그를 생성합니다. 이 태그를 사용해 Datadog 에이전트 수준에서 트레이스를 제외할 수 없습니다.


| 이름                                    | 설명                                      |
|-----------------------------------------|--------------------------------------------------|
| `http.path_group`                       | `http.url` 태그의 전체 URL 경로        |
| `http.url_details.host`                 | `http.url` 태그의 호스트 이름 부분      |
| `http.url_details.path`                 | HTTP 요청 줄으로 전달된 전체 요청이나 이와 동등한 것 |
| `http.url_details.scheme`               | `http.url` 태그의 요청 스키마       |
| `http.url_details.queryString`          | `http.url` 태그의 쿼리 문자열 부분 |
| `http.url_details.port`                 | `http.url` 태그의 HTTP 포트            |
| `http.useragent_details.os.family`      | User-Agent에서 보고한 OS 제품군         |
| `http.useragent_details.browser.family` | User-Agent에서 보고한 브라우저 제품군    |
| `http.useragent_details.device.family`  | User-Agent에서 보고한 디바이스 제품군     |

<div class="alert alert-danger"><strong>참고</strong>: 2022년 10월 1일부터 Datadog 백엔드에서는 수집한 스팬의 트레이스 전체에 <a href="/tracing/trace_collection/tracing_naming_convention">스팬 태그 시맨틱</a>을 적용하기 위해 리매핑을 적용합니다. Datadog 에이전트 수준에서 태그 기반 스팬을 모두 제외하고 싶으면 <strong>리맵</strong> 열에 있는 태그를 사용하세요.</div>

#### 네트워크 통신

| **이름**                   | **리맵**                                      |
|----------------------------|-----------------------------------------------------|
| `network.host.ip`          | `tcp.local.address` - Node.js                       |
| `network.destination.ip`   | `out.host` - 모든 언어  |
| `network.destination.port` | `grpc.port` - Python<br>`tcp.remote.port` - Node.js<br>`out.port` - 모든 언어  |

#### HTTP 요청

| **이름**                       | **리맵**                                                                                        |
|--------------------------------|-------------------------------------------------------------------------------------------------------|
| `http.route`                   | `aspnet_core.route` - .NET<br>`aspnet.route` - .NET<br>`laravel.route` - PHP<br>`symfony.route` - PHP |
| `http.useragent`               | `user_agent` - Java, C++                                                                                   |
| `http.url_details.queryString` | `http.query.string` - Python                                                                          |

#### 데이터베이스

| **이름**                         | **리맵**                                                                                                                                                                                                                  |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `db.system`                      | `db.type` - Java, Python, Node.js, Go<br>`active_record.db.vendor` - Ruby<br>`sequel.db.vendor` - Ruby                                                                                                                          |
| `db.instance`                    | `mongodb.db` - Python<br> `sql.db` - Python<br> `db.name` - 모든 언어                                           |
| `db.statement`                   | `cassandra.query` - Go<br>`consul.command` - Python<br>`memcached.query` - Python<br>`mongodb.query` - Python, .NET, Go<br>`redis.command` - Python<br>`redis.raw_command` - Python<br>`sql.query` - Python, PHP, Node.js, Java |
| `db.row_count`                   | `cassandra.row_count` - Python<br>`db.rowcount` - Python, PHP<br>`mongodb.rows` - Python<br>`sql.rows` - Python                                                                                                                 |
| `db.cassandra.cluster`           | `cassandra.cluster` - Python, Go                                                                                                                                                                                                |
| `db.cassandra.consistency_level` | `cassandra.consistency_level` - Python, Go                                                                                                                                                                                      |
| `db.cassandra.table`             | `cassandra.keyspace` - Python, Go                                                                                                                                                                                               |
| `db.redis.database_index`        | `db.redis.dbIndex` - Java<br>`out.redis_db` - Python, Ruby                                                                                                                                                                      |
| `db.mongodb.collection`          | `mongodb.collection` - Python, .NET, Ruby, PHP                                                                                                                                                                                  |
| `db.cosmosdb.container`          | `cosmosdb.container` - .NET                                                                                                                                                                                                     |

#### 메시지 대기열

| **이름**                               | **리맵**                                                                                             |
|----------------------------------------|------------------------------------------------------------------------------------------------------------|
| `messaging.destination`                | `amqp.destination` - Node.js<br>`amqp.queue` - .NET<br>`msmq.queue.path` - .NET<br>`aws.queue.name` - .NET |
| `messaging.url`                        | `aws.queue.url` - .NET, Java                                                                               |
| `messaging.message_id`                 | `server_id` - Go                                                                                           |
| `messaging.message_payload_size`       | `message.size` - .NET, Java                                                                                |
| `messaging.operation`                  | `amqp.command` - .NET<br>`msmq.command` - .NET                                                             |
| `messaging.rabbitmq.routing_key`       | `amqp.routing_key` - Java<br>`amqp.routingKey` - Nodes.js                                                  |
| `messaging.rabbitmq.delivery_mode`     | `messaging.rabbitmq.exchange` - .NET                                                                       |
| `messaging.msmq.message.transactional` | `msmq.message.transactional` - .NET                                                                        |
| `messaging.msmq.queue.transactional`   | `msmq.queue.transactional` - .NET                                                                          |
| `messaging.kafka.consumer_group`       | `kafka.group` - Java                                                                                       |
| `messaging.kafka.tombstone`            | `kafka.tombstone` - .NET<br>`tombstone` - Java                                                             |
| `messaging.kafka.partition`            | `kafka.partition` - .NET<br>`partition` - Node.js, Go, Java                                                |
| `messaging.kafka.offset`               | `kafka.offset` - .NET                                                                                      |
| `messaging.msmq.message.transactional` | `msmq.message.transactional` - .NET                                                                        |


#### 원격 프로시저 호출

| **이름**                       | **리맵**                                                                                          |
|--------------------------------|---------------------------------------------------------------------------------------------------------|
| `rpc.service`                  | `grpc.method.service` - Python, .NET                                                                    |
| `rpc.method`                   | `grpc.method.name` - Python, .NET, Go                                                                   |
| `rpc.grpc.package`             | `grpc.method.package` - Python, .NET, Go                                                                |
| `rpc.grpc.status_code`         | `grpc.code` - Go<br>`status.code` - Python, .NET, Node.js<br>`grpc.status.code` - Python, .NET, Node.js |
| `rpc.grpc.kind`                | `grpc.method.kind` - Python, Node.js, Go, .NET                                                          |
| `rpc.grpc.path`                | `rpc.grpc.path` - Python, Node.js, Go, .NET                                                             |
| `rpc.grpc.request.metadata.*`  | `grpc.request.metadata.*` - Python, Node.js<br>`rpc.grpc.request.metadata` - Go                         |
| `rpc.grpc.response.metadata.*` | `grpc.response.metadata.*` - Python, Node.js

#### 오류

| **이름**                       | **리맵**                                                                                          |
|--------------------------------|---------------------------------------------------------------------------------------------------------|
| `error.message`                  | `error.msg` - 모든 언어                      |

### 리소스 기반 무시

**리소스 무시** 옵션의 경우 트레이스의 전역 루트 스팬이 특정 조건을 충족할 경우 무시합니다. [수집에서 특정 리소스 제외[5]를 참고하세요. 이 옵션은 특정 Datadog 에이전트에 트레이스를 보내는 모든 서비스에 적용됩니다. 리소스 무시 때문에 제외된 트레이스는 트레이스 메트릭에 포함되지 않습니다.

에이전트 구성 파일 `datadog.yaml`에서 무시할 리소스를 지정하거나 `DD_APM_IGNORE_RESOURCES` 환경 변수를 사용할 수 있습니다. 다음 예시를 참고하세요.

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
## @param ignore_resources - 문자열 목록 - 선택 사항
## 리소스 이름을 기반으로 특정 트레이스를 제외할 정규식을 제공할 수 있습니다.
## 모든 항목에 큰 따옴표를 사용해야 하며 쉼표로 구분해야 합니다.

  ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]
{{< /code-block >}}

**참고**:
- 트레이스 에이전트가 수용하는 regex 구문은 Go [regexp][6]로 평가됩니다.
- 배포 전략에 따라 특수문자를 이스케이프하여 regex를 조정해야 할 수 있습니다.
- Kubernetes로 전용 컨테이너를 사용하는 경우 리소스 무시 옵션으로 사용하는 환경 변수가 **trace-agent** 컨테이너에 적용되는지 다시 확인하세요.

#### 예시

트레이스에 포함하고 싶지 않은 `/api/healthcheck` 호출이 있는 트레이스 예시를 보겠습니다. 

{{< img src="tracing/guide/ignoring_apm_resources/ignoreresources.png" alt="트레이서가 무시하도록 하고자 하는 리소스의 플레임 그래프" style="width:90%;">}}

전역 루트 스팬의 리로스 이름을 기입해 두세요

- 작업 이름: `rack.request`
- 리소스 이름: `Api::HealthchecksController#index`
- Http.url: `/api/healthcheck`

리소스 무시 옵션을 바르게 사용하려면 regex 규칙을 쓸 때 리소스 이름 `Api::HealthchecksController#index`와 일치하도록 써야 합니다. 사용할 수 있는 regex 옵션이 여럿 있으나 이 리소스를 정확하게 필터링하여 제외하려면 `Api::HealthchecksController#index$`와 같은 regex를 사용하는 것이 좋습니다.

배포 방법에 따라 구문은 조금 다를 수 있습니다.

{{< tabs >}}
{{% tab "datadog.yaml" %}}

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  ignore_resources: Api::HealthchecksController#index$
{{< /code-block >}}

값이 여럿일 경우:

{{< code-block lang="yaml" >}}
apm_config:
  ignore_resources: ["value1","Api::HealthchecksController#index$"]
{{< /code-block >}}

{{% /tab %}}
{{% tab "Docker Compose" %}}

Datadog 에이전트 컨테이너의 환경 변수 목록에 아래 패턴으로 `DD_APM_IGNORE_RESOURCES`를 추가하세요. Docker Compose에는 특수문자 `$` 등을 사용할 경우에 사용할 자체 [변수 대체][1]가 있습니다.

{{< code-block lang="yaml" >}}
    environment:
      // 기타 Datadog 에이전트 환경 변수
      - DD_APM_IGNORE_RESOURCES=Api::HealthchecksController#index$$
{{< /code-block >}}

값이 여럿일 경우:

{{< code-block lang="yaml" >}}
    environment:
      // 기타 Datadog 에이전트 환경 변수
      - DD_APM_IGNORE_RESOURCES="value1","Api::HealthchecksController#index$$"
{{< /code-block >}}

[1]: https://docs.docker.com/compose/compose-file/compose-file-v3/#variable-substitution
{{% /tab %}}
{{% tab "Docker 실행" %}}

Datadog 에이전트를 실행하는 docker 실행 명령에 `DD_APM_IGNORE_RESOURCES`를 추가하세요.

{{< code-block lang="shell" >}}
docker run -d --name datadog-agent \
              --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<> \
              -e DD_APM_IGNORE_RESOURCES="Api::HealthchecksController#index$" \
              -e DD_APM_ENABLED=true \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              gcr.io/datadoghq/agent:latest
{{< /code-block >}}

값이 여럿일 경우:

{{< code-block lang="yaml" >}}
              -e DD_APM_IGNORE_RESOURCES=["value1","Api::HealthchecksController#index$"] \
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes daemonset" %}}

전용 trace-agent 컨테이너에 환경 변수 `DD_APM_IGNORE_RESOURCES`를 추가하세요.

{{< code-block lang="yaml" >}}
    - name: trace-agent
        image: "gcr.io/datadoghq/agent:latest"
        imagePullPolicy: IfNotPresent
        command: ["trace-agent", "-config=/etc/datadog-agent/datadog.yaml"]
        resources: {}
        ports:
        - containerPort: 8126
          hostPort: 8126
          name: traceport
          protocol: TCP
        env:
        - name: DD_API_KEY
          valueFrom:
            secretKeyRef:
              name: "datadog-secret"
              key: api-key
        - name: DD_KUBERNETES_KUBELET_HOST
          valueFrom:
            fieldRef:
              fieldPath: status.hostIP
        - name: KUBERNETES
          value: "yes"
        - name: DOCKER_HOST
          value: unix:///host/var/run/docker.sock
        - name: DD_LOG_LEVEL
          value: "INFO"
        - name: DD_APM_ENABLED
          value: "true"
        - name: DD_APM_NON_LOCAL_TRAFFIC
          value: "true"
        - name: DD_APM_RECEIVER_PORT
          value: "8126"
        - name: DD_KUBELET_TLS_VERIFY
          value: "false"
        - name: DD_APM_IGNORE_RESOURCES
          value: "Api::HealthchecksController#index$"
{{< /code-block >}}

값이 여럿일 경우:

{{< code-block lang="yaml" >}}
        - name: DD_APM_IGNORE_RESOURCES
          value: '"value1","Api::HealthchecksController#index$"'
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes Helm" %}}

`values.yaml` 파일의 `traceAgent` 섹션에서 `env` 섹션에 `DD_APM_IGNORE_RESOURCES`를 추가하고 [일반적인 방법으로 helm을 시작][1]하세요.

{{< code-block lang="yaml" filename="values.yaml" >}}
    traceAgent:
      # agents.containers.traceAgent.env -- Additional environment variables for the trace-agent container
      env:
        - name: DD_APM_IGNORE_RESOURCES
          value: Api::HealthchecksController#index$

{{< /code-block >}}

값이 여럿일 경우:

{{< code-block lang="yaml" >}}
        - name: DD_APM_IGNORE_RESOURCES
          value: value1, Api::HealthchecksController#index$
{{< /code-block >}}

또는 `helm install` 명령에서 `agents.containers.traceAgent.env`를 설정할 수도 있습니다.

{{< code-block lang="shell" >}}
helm install dd-agent -f values.yaml \
  --set datadog.apiKeyExistingSecret="datadog-secret" \
  --set agents.containers.traceAgent.env[0].name=DD_APM_IGNORE_RESOURCES, \
    agents.containers.traceAgent.env[0].value="Api::HealthchecksController#index$" \
  datadog/datadog
{{< /code-block >}}

[1]: /ko/agent/kubernetes/?tab=helm#installation
{{% /tab %}}
{{% tab "Amazon ECS 태스크 정의" %}}

Amazon ECS(예: EC2)를 사용하는 경우, Datadog 에이전트 컨테이너 정의에서 환경 변수 `DD_APM_IGNORE_RESOURCES`와 값을 추가하여 JSON에서 다음과 같은 결과가 나오도록 하세요.

{{< code-block lang="json" >}}
    "environment": [
    // other environment variables for the Datadog Agent
        {
          "name": "DD_APM_IGNORE_RESOURCES",
          "value": "Api::HealthchecksController#index$"
        }
     ]
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger"><strong>참고</strong>: 이 방법으로 트레이스를 필터링하면 <a href="/tracing/guide/metrics_namespace/">트레이스 메트릭</a>에서 이 해당 요청을 삭제합니다. 트레이스 메트릭에 영향을 주지 않고 수집 데이터를 줄이는 방법을 알아보려면 <a href="/tracing/trace_ingestion/ingestion_controls">수집 통제</a>를 참고하세요.</div>

## 트레이서 구성 옵션

일부 언어 특정 트레이서에서는 Datadog 에이전트로 전송하기 전에 스팬을 수정할 수 있습니다. 애플리케이션에서 필요한 특정 요구 사항 있고 아래 언어를 사용하는 경우 이 방법을 사용할 수 있습니다.

<div class="alert alert-warning"><strong>중요</strong>: 요청이 분산된 트레이스와 연결되어 있을 경우, 이 필터링 규칙으로 트레이스 일부가 제외될 경우 결과 트레이스에 샘플링 부정확성이 있을 수 있으니 유의하세요.</div>


{{< programming-lang-wrapper langs="ruby,python,nodeJS,java" >}}

{{< programming-lang lang="ruby" >}}

Ruby 트레이서에는 특정 조건을 충족하는 트레이스를 제거하는 후처리 파이프라인이 있습니다. 자세한 정보는 [후처리 트레이스][1]를 참고하세요.

예를 들어 리소스 이름이 `Api::HealthchecksController#index`이면 `Datadog::Tracing::Pipeline::SpanFilter` 클래스를 사용해 리소스 이름이 포함된 트레이스를 제거하세요. 이 필터를 [스팬 개체][2]의 다른 사용 가능한 메타데이터와 일치하는데 사용할 수도 있습니다.

```
Datadog::Tracing.before_flush(
   Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.resource =~ /Api::HealthchecksController#index/ }
)
```

[1]: /ko/tracing/trace_collection/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[2]: /ko/tracing/trace_collection/dd_libraries/ruby/#manual-instrumentation
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Python 트레이서에는 특정 엔드포인트에서 트레이스를 제거할 수 있는 `FilterRequestsOnUrl` 필터가 있습니다. 또는 커스텀 필터를 쓸 수 있습니다. 자세한 정보는 [트레이서 필터링][1]을 참고하세요.

루트 스팬의 `http.url` 스팬 태그에 `http://<domain>/healthcheck`이 있다고 가정해 봅시다. 다음 regex를 사용해 `healthcheck`로 끝나는 엔드포인트와 일치할 수 있습니다.

```
from ddtrace import tracer
from ddtrace.filters import FilterRequestsOnUrl
tracer.configure(settings={
    'FILTERS': [
        FilterRequestsOnUrl(r'http://.*/healthcheck$'),
    ],
})
```

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtrace.filters.FilterRequestsOnUrl
{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

[Http][1] 플러그인에 차단 목록을 구성하세요. API 문서에서 차단 목록과 일치하는 것이 있는지 유의해서 보세요. 예를 들어 수신 HTTP 요청이 URL 경로와 일치하는 경우 트레이스의 `http.url` 스팬 태그가 `http://<domain>/healthcheck`이면 `healthcheck` URL과 일치하는 규칙을 쓰세요.


```
const tracer = require('dd-trace').init();
tracer.use('http', {
  // incoming http requests match on the path
  server: {
    blocklist: ['/healthcheck']
  },
  // outgoing http requests match on a full URL
  client: {
    blocklist: ['https://telemetry.example.org/api/v1/record']
  }
})

//import http

```
<div class="alert alert-info"><strong>참고</strong>: 계측된 모듈을 가져오기 <em>전에</em> 통합 트레이서 구성을 해야 합니다.</div>

[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.plugins.connect.html#blocklist
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

Java 트레이서에는 커스텀 `TraceInterceptor` 옵션이 있어 스팬을 필터링할 수 있습니다. [트레이서 확장][1]을 참고하세요.

예를 들어 리소스 이름이 `GET /healthcheck`이면 이 리소스 이름을 제외하는 트레이스 인터셉터를 쓰세요. 내 사용 사례에 맞게 로직을 바꾸세요.

```
public class GreetingController {
   static {
       // 초기화를 여러 번 하는 것을 피하기 위해 클래스 정적 블록에 쓰세요.
       GlobalTracer.get().addTraceInterceptor(new TraceInterceptor() {
           @Override
           public Collection<? extends MutableSpan> onTraceComplete(Collection<? extends MutableSpan> trace) {
               for (MutableSpan span : trace) {
                   if ("GET /healthcheck".contentEquals(span.getResourceName())) {
                       return Collections.emptyList();
                   }
               }
               return trace;
           }
           @Override
           public int priority() {
               return 200;  // Some unique number
           }
       });
   }
}
```

[1]: /ko/tracing/trace_collection/custom_instrumentation/java/#extending-tracers
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

<div class="alert alert-danger"><strong>참고</strong>: 이 방법으로 트레이스를 필터링하면 <a href="/tracing/guide/metrics_namespace/">트레이스 메트릭</a>에서 이 해당 요청을 삭제합니다. 트레이스 메트릭에 영향을 주지 않고 수집 데이터를 줄이는 방법을 알아보려면 <a href="/tracing/trace_ingestion/ingestion_controls">수집 통제</a>를 참고하세요.</div>

[1]: /ko/help/
[2]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[3]: /ko/tracing/guide/metrics_namespace/
[4]: /ko/tracing/trace_ingestion/ingestion_controls
[5]: /ko/tracing/configure_data_security/?tab=mongodb#exclude-resources-from-being-collected
[6]: https://golang.org/pkg/regexp/