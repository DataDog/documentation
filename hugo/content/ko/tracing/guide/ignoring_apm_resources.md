---
description: '샘플링 규칙과 필터링을 사용하여 원치 않는 리소스(예: 상태 검사)를 트레이스에서 제외하는 방법을 배우고, 노이즈를 줄이고
  비용을 관리하세요.'
title: APM에서 원치 않는 리소스 무시
---
서비스는 종종 추적하고 싶지 않은 엔드포인트(예: 상태 검사)를 처리합니다. 이 가이드에서는 해당 트래픽을 제외하는 다음 방식을 설명합니다.

- **샘플링**: 요청을 트레이스 메트릭에는 계속 표시하되, 트레이스 수집량을 줄이고 싶을 때 사용합니다.
- **Datadog Agent에서 필터링**: Agent에 보고하는 모든 서비스에서 요청(트레이스 메트릭 포함)을 완전히 제외하는 데 사용합니다.
- **트레이서 구성**: 서비스별로 필터링 로직을 적용해야 하거나 애플리케이션별 컨텍스트(예: 요청 속성, 런타임 상태)에 따라 필터링해야 할 때 사용합니다.

어떤 방법이 해당 사용 사례에 가장 적합한지 판단하는 데 도움이 필요하면 [Datadog 지원][1]에 문의하세요. 

## 샘플링 {#sampling}

스팬을 트레이스 메트릭에 포함시키되 Datadog에 수집하지 않으려면 샘플링 규칙을 사용하세요. 샘플링에 대한 자세한 내용은 [Ingestion Control][4]을 참조하세요.

### 샘플링 규칙 사용 {#using-sampling-rules}

권장되는 접근 방식은 리소스 이름, 서비스 이름, 태그 및 작업 이름을 기준으로 트레이스를 샘플링할 수 있는 샘플링 규칙을 사용하는 것입니다.

```shell
DD_TRACE_SAMPLING_RULES='[{"resource": "GET healthcheck", "sample_rate": 0.0}]'
```

또는 HTTP URL 태그를 기준으로 샘플링할 수도 있습니다.

```shell
DD_TRACE_SAMPLING_RULES='[{"tags": {"http.url": "http://.*/healthcheck$"}, "sample_rate": 0.0}]'
```

<div class="alert alert-info">샘플링은 트레이스의 첫 번째 스팬을 사용하여 결정합니다. 필터링하려는 태그가 포함된 스팬이 {{< tooltip glossary="trace_root_span" case="sentence" >}}이 아닌 경우, 이 규칙은 적용되지 않습니다.</div>

## Datadog Agent에서 필터링 {#filtering-in-the-datadog-agent}

스팬을 Datadog에 수집하지도 않고 트레이스 메트릭에도 반영하지 않으려면 Datadog Agent 필터링을 사용하세요.

Datadog Agent의 Trace Agent 구성 요소는 특정 트레이스 전송을 차단하는 두 가지 방법을 제공합니다. 스팬 태그 기준 필터링과 리소스 기준 필터링입니다. 이 설정으로 인해 트레이스가 삭제되면, 해당 요청은 트레이스 메트릭에서도 제외됩니다.

특정 트레이스나 리소스를 무시하도록 Trace Agent를 구성하면 해당 Datadog Agent에 트레이스를 전송하는 모든 서비스에 적용됩니다. 애플리케이션별 요구 사항이 있는 경우 [Tracer 구성](#tracer-configuration)을 대신 사용하세요.

<div class="alert alert-info">
이 가이드의 옵션 중 어느 것도 요구 사항을 충족하지 못하는 경우, 애플리케이션에 <a href="/tracing/trace_collection/custom_instrumentation/otel_instrumentation/">사용자 지정 스팬 태그</a>를 추가한 후 Agent에서 해당 태그를 사용하여 트레이스를 삭제하는 방법을 고려할 수 있습니다.
</div>

### 스팬 태그를 기반으로 트레이스 무시하기 {#ignoring-traces-based-on-span-tags}

Datadog Agent 6.27.0/7.27.0부터 **filter tags** 옵션을 사용하여 지정된 스팬 태그와 일치하는 루트 스팬을 가진 트레이스를 삭제합니다. 이 옵션은 해당 Datadog Agent로 트레이스를 전송하는 모든 서비스에 적용됩니다. 필터 태그로 인해 삭제된 트레이스는 트레이스 메트릭에 포함되지 않습니다.

<div class="alert alert-info">
트레이스 내의 개별 스팬을 선택적으로 삭제할 수 없습니다. 루트 스팬이 필터 기준과 일치하면 전체 트레이스가 삭제됩니다.
</div>

**일치 동작:**

필터 태그 옵션은 정확한 문자열 일치를 요구합니다. 정규식 기반 필터링이 필요한 경우 [리소스 기반 무시](#ignoring-traces-based-on-resources)를 참조하세요..

여러 태그를 지정하면 필터는 **OR 로직**으로 동작합니다. : 즉, 루트 스팬이 지정된 태그 중 **하나라도** 일치하면 트레이스가 삭제됩니다. 여러 조건을 동시에 일치시키려면, 해당 조건을 조합한 사용자 지정 태그를 추가하세요.

**구성:**

환경 변수에서 공백으로 구분된 키와 값의 목록을 사용하여 포함하거나 거부할 스팬 태그를 지정할 수 있습니다.

`DD_APM_FILTER_TAGS_REQUIRE`
: 지정된 스팬 태그 및 값과 정확히 일치하는 루트 스팬이 있는 트레이스만 수집합니다. 이 규칙과 일치하지 않으면 트레이스가 삭제됩니다. 예를 들어, `DD_APM_FILTER_TAGS_REQUIRE="key1:value1 key2:value2"`입니다. Datadog Agent 7.49 이상에서는 `DD_APM_FILTER_TAGS_REGEX_REQUIRE`를 사용하여 정규식을 지정할 수 있습니다.

`DD_APM_FILTER_TAGS_REJECT`
: 지정된 스팬 태그 및 값과 정확히 일치하는 루트 스팬이 있는 트레이스만 거부합니다. 이 규칙과 일치하면 트레이스가 삭제됩니다. 예를 들어, `DD_APM_FILTER_TAGS_REJECT="key1:value1 key2:value2"`입니다. Datadog Agent 7.49 이상에서는 `DD_APM_FILTER_TAGS_REGEX_REJECT`를 사용하여 정규식을 지정할 수 있습니다.

{{< tabs >}}

{{% tab "Kubernetes" %}}

#### Datadog Operator {#datadog-operator}

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

#### Helm {#helm}

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

{{% tab "datadog.yaml" %}}

Agent 구성 파일에서도 쉼표로 구분된 목록을 사용하여 이러한 값을 설정할 수 있습니다.

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    require: ["db:sql", "db.instance:mysql"]
    reject: ["outcome:success", "key2:value2"]
{{< /code-block >}}

예를 들어, `http.url`이 특정 엔드포인트와 일치하는 상태 검사를 무시하려면 다음과 같이 설정합니다.

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  filter_tags:
    reject: ["http.url:http://localhost:5050/healthcheck"]
{{< /code-block >}}

{{% /tab %}}

{{< /tabs >}}


#### 사용 가능한 스팬 태그 {#available-span-tags}

Datadog은 수집 후 백엔드에서 다음과 같은 스팬 태그를 생성합니다. 

**참고**: 이 태그는 Datadog Agent 수준에서 트레이스를 삭제하는 데 사용할 수 없습니다. Datadog Agent는 수집 전에 사용할 수 있는 태그만을 기준으로 필터링합니다.

| 이름                                    | 설명                                      |
|-----------------------------------------|--------------------------------------------------|
| `http.path_group`                       | `http.url` 태그의 전체 URL 경로입니다.        |
| `http.url_details.host`                 | `http.url` 태그의 호스트 이름 부분입니다.      |
| `http.url_details.path`                 | HTTP 요청 라인(또는 이에 상응하는 형식)에 전달된 전체 요청 대상입니다. |
| `http.url_details.scheme`               | `http.url` 태그의 요청 스킴입니다.       |
| `http.url_details.queryString`          | `http.url` 태그의 쿼리 문자열 부분입니다. |
| `http.url_details.port`                 | `http.url` 태그의 HTTP 포트입니다.            |
| `http.useragent_details.os.family`      | User-Agent에서 보고한 OS 제품군입니다.         |
| `http.useragent_details.browser.family` | User-Agent에서 보고한 브라우저 제품군입니다.    |
| `http.useragent_details.device.family`  | User-Agent에서 보고한 디바이스 제품군입니다.     |

<div class="alert alert-danger">2022년 10월 1일부터 Datadog 백엔드는 모든 수집된 스팬의 트레이서에서 <a href="/tracing/trace_collection/tracing_naming_convention">Span Tags Semantics
</a>를 적용하기 위해 재매핑을 적용합니다. Datadog Agent 수준에서 루트 스팬 태그를 기준으로 트레이스를 삭제하려면 <strong>리매핑 소스</strong> 열에 있는 태그를 사용하세요.</div>

##### 네트워크 통신 {#network-communications}

| **이름**                   | **리매핑 소스**                                      |
|----------------------------|-----------------------------------------------------|
| `network.host.ip`          | `tcp.local.address` - Node.js                       |
| `network.destination.ip`   | `out.host` - 모든 언어  |
| `network.destination.port` | `grpc.port` - Python<br>`tcp.remote.port` - Node.js<br>`out.port` - 모든 언어  |

##### HTTP 요청 {#http-requests}

| **이름**                       | **리매핑 소스**                                                                                        |
|--------------------------------|-------------------------------------------------------------------------------------------------------|
| `http.route`                   | `aspnet_core.route` - .NET<br>`aspnet.route` - .NET<br>`laravel.route` - PHP<br>`symfony.route` - PHP |
| `http.useragent`               | `user_agent` - Java, C++                                                                                   |
| `http.url_details.queryString` | `http.query.string` - Python                                                                          |

##### 데이터베이스 {#database}

| **이름**                         | **리매핑 소스**                                                                                                                                                                                                                  |
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

##### 메시지 대기열 {#message-queue}

| **이름**                               | **리매핑 소스**                                                                                             |
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


##### 원격 프로시저 호출 {#remote-procedure-calls}

| **이름**                       | **리매핑 소스**                                                                                          |
|--------------------------------|---------------------------------------------------------------------------------------------------------|
| `rpc.service`                  | `grpc.method.service` - Python, .NET                                                                    |
| `rpc.method`                   | `grpc.method.name` - Python, .NET, Go                                                                   |
| `rpc.grpc.package`             | `grpc.method.package` - Python, .NET, Go                                                                |
| `rpc.grpc.status_code`         | `grpc.code` - Go<br>`status.code` - Python, .NET, Node.js<br>`grpc.status.code` - Python, .NET, Node.js |
| `rpc.grpc.kind`                | `grpc.method.kind` - Python, Node.js, Go, .NET                                                          |
| `rpc.grpc.path`                | `rpc.grpc.path` - Python, Node.js, Go, .NET                                                             |
| `rpc.grpc.request.metadata.*`  | `grpc.request.metadata.*` - Python, Node.js<br>`rpc.grpc.request.metadata` - Go                         |
| `rpc.grpc.response.metadata.*` | `grpc.response.metadata.*` - Python, Node.js

##### 오류 {#errors}

| **이름**                       | **리매핑 소스**                                                                                          |
|--------------------------------|---------------------------------------------------------------------------------------------------------|
| `error.message`                  | `error.msg` - 모든 언어                      |

### 리소스를 기반으로 트레이스 무시하기 {#ignoring-traces-based-on-resources}

**ignore resources** 옵션을 사용하면 트레이스의 전역 루트 스팬이 특정 기준과 일치할 경우 해당 리소스를 제외할 수 있습니다. [수집 대상에서 리소스 제외][5]를 참조하세요. 이 옵션은 이 특정 Datadog Agent에 트레이스를 전송하는 모든 서비스에 적용됩니다. ignore resources로 인해 삭제된 트레이스는 트레이스 메트릭에 포함되지 않습니다.

무시할 리소스는 Agent 구성 파일 `datadog.yaml` 또는 `DD_APM_IGNORE_RESOURCES` 환경 변수를 사용하여 지정할 수 있습니다. 아래 예제를 참조하세요.

`datadog.yaml` 사용:

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
## @param ignore_resources - list of strings - optional
## A list of regular expressions can be provided to exclude certain traces based on their resource name.
## All entries must be surrounded by double quotes and separated by commas.

  ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]
{{< /code-block >}}

`DD_APM_IGNORE_RESOURCES` 사용:

```shell
DD_APM_IGNORE_RESOURCES="(GET|POST) /healthcheck,API::NotesController#index"
```

**참고**:
- 환경 변수 형식(`DD_APM_IGNORE_RESOURCES`)을 사용할 경우 값은 쉼표로 구분된 문자열 목록으로 제공해야 합니다.
- Trace Agent가 수용하는 정규식 구문은 Go의 [regexp][6]로 평가됩니다.
- 배포 전략에 따라 특수문자를 이스케이프하여 정규식을 조정해야 할 수 있습니다.
- Kubernetes로 전용 컨테이너를 사용하는 경우 ignore resources 옵션으로 사용하는 환경 변수가 **trace-agent** 컨테이너에 적용되는지 다시 확인하세요.

#### 예시{#example}

트레이스에 포함하고 싶지 않은 `/api/healthcheck` 호출이 있는 트레이스 예시를 보겠습니다.

{{< img src="tracing/guide/ignoring_apm_resources/ignoreresources.png" alt="SDK에서 무시하도록 설정하려는 리소스의 플레임 그래프" style="width:90%;">}}

전역 루트 스팬의 리소스 이름을 확인하세요.

- 작업 이름: `rack.request`
- 리소스 이름: `Api::HealthchecksController#index`
- Http.url: `/api/healthcheck`

ignore resources 옵션을 올바르게 사용하려면 작성한 정규식이 전역 루트 스팬의 리소스 이름(`Api::HealthchecksController#index`)과 일치해야 합니다. 몇 가지 정규식 옵션을 사용할 수 있지만, 이 리소스의 트레이스를 정확히 제외하려면 사용할 수 있는 정규식의 한 예는 `Api::HealthchecksController#index$`입니다.

배포 방법에 따라 구문은 조금 다를 수 있습니다.

{{< tabs >}}
{{% tab "datadog.yaml" %}}

{{< code-block lang="yaml" filename="datadog.yaml" >}}
apm_config:
  ignore_resources: Api::HealthchecksController#index$
{{< /code-block >}}

여러 값을 지정하는 경우:

{{< code-block lang="yaml" >}}
apm_config:
  ignore_resources: ["value1","Api::HealthchecksController#index$"]
{{< /code-block >}}

{{% /tab %}}
{{% tab "Docker compose" %}}

Datadog Agent 컨테이너의 환경 변수 목록에 아래 예시와 같은 패턴으로 `DD_APM_IGNORE_RESOURCES`를 추가하세요. `$`와 같은 특수 문자를 사용할 때 Docker Compose에는 자체적인 [변수 치환][1] 기능이 있으므로 이를 고려해야 합니다.

{{< code-block lang="yaml" >}}
    environment:
      // other Datadog Agent environment variables
      - DD_APM_IGNORE_RESOURCES=Api::HealthchecksController#index$$
{{< /code-block >}}

여러 값을 지정하는 경우:

{{< code-block lang="yaml" >}}
    environment:
      // other Datadog Agent environment variables
      - DD_APM_IGNORE_RESOURCES="value1","Api::HealthchecksController#index$$"
{{< /code-block >}}

[1]: https://docs.docker.com/compose/compose-file/compose-file-v3/#variable-substitution
{{% /tab %}}
{{% tab "Docker run" %}}

Datadog Agent를 실행하는 docker run 명령에 `DD_APM_IGNORE_RESOURCES`를 추가하세요.

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
              registry.datadoghq.com/agent:latest
{{< /code-block >}}

여러 값을 지정하는 경우:

{{< code-block lang="yaml" >}}
              -e DD_APM_IGNORE_RESOURCES=["value1","Api::HealthchecksController#index$"] \
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes daemonset" %}}

전용 trace-agent 컨테이너에 환경 변수 `DD_APM_IGNORE_RESOURCES`을 추가하세요.

{{< code-block lang="yaml" >}}
    - name: trace-agent
        image: "registry.datadoghq.com/agent:latest"
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

여러 값을 지정하는 경우:

{{< code-block lang="yaml" >}}
        - name: DD_APM_IGNORE_RESOURCES
          value: '"value1","Api::HealthchecksController#index$"'
{{< /code-block >}}

{{% /tab %}}
{{% tab "Kubernetes Helm" %}}

`values.yaml` 파일의 `traceAgent` 섹션에서 `DD_APM_IGNORE_RESOURCES`를 `env` 섹션에 추가한 후, [Helm을 평소처럼 실행][1]하세요.

{{< code-block lang="yaml" filename="values.yaml" >}}
    traceAgent:
      # agents.containers.traceAgent.env -- Additional environment variables for the trace-agent container
      env:
        - name: DD_APM_IGNORE_RESOURCES
          value: Api::HealthchecksController#index$

{{< /code-block >}}

여러 값을 지정하는 경우:

{{< code-block lang="yaml" >}}
        - name: DD_APM_IGNORE_RESOURCES
          value: value1, Api::HealthchecksController#index$
{{< /code-block >}}

또는 `helm install` 명령에서 `agents.containers.traceAgent.env`를 설정할 수 있습니다.

{{< code-block lang="shell" >}}
helm install dd-agent -f values.yaml \
  --set datadog.apiKeyExistingSecret="datadog-secret" \
  --set agents.containers.traceAgent.env[0].name=DD_APM_IGNORE_RESOURCES, \
    agents.containers.traceAgent.env[0].value="Api::HealthchecksController#index$" \
  datadog/datadog
{{< /code-block >}}

[1]: /ko/agent/kubernetes/?tab=helm#installation
{{% /tab %}}
{{% tab "Amazon ECS 작업 정의" %}}

Amazon ECS(예: EC2)를 사용하는 경우, Datadog Agent 컨테이너 정의에서 환경 변수 `DD_APM_IGNORE_RESOURCES`와 값을 추가하여 JSON에서 다음과 같은 결과가 나오도록 하세요.

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

<div class="alert alert-danger">이렇게 트레이스를 필터링하면 해당 요청이 <a href="/tracing/guide/metrics_namespace/">트레이스 메트릭</a>에서도 제거됩니다. 트레이스 메트릭에 영향을 주지 않고 수집량을 줄이는 방법에 대한 정보는 <a href="/tracing/trace_ingestion/ingestion_controls">수집 제어</a>.</div>를 참조하세요.

## 트레이서 구성 {#tracer-configuration}

일부 언어 트레이서는 Datadog Agent로 전송되기 전에 트레이스를 제거할 수 있습니다. 애플리케이션별 요구 사항이 있는 경우 이 옵션을 사용하세요.

<div class="alert alert-warning">
1. 요청이 분산된 트레이스와 연결되어 있을 경우, 이 필터링 규칙으로 트레이스 일부가 제외될 경우 결과 트레이스에 샘플링 부정확성이 있을 수 있으니 유의하세요.<br> 
2. 이렇게 트레이스를 필터링하면 해당 요청이 <a href="/tracing/guide/metrics_namespace/">트레이스 메트릭</a>에서도 제거됩니다. 트레이스 메트릭에 영향을 주지 않고 수집량을 줄이는 방법에 대한 정보는 <a href="/tracing/trace_ingestion/ingestion_controls">수집 제어</a>.</div>를 참조하세요.


{{< programming-lang-wrapper langs="ruby,python,nodeJS,java" >}}

{{< programming-lang lang="ruby" >}}

Ruby 트레이서는 특정 기준을 충족하는 트레이스를 제거하는 후처리 파이프라인을 가지고 있습니다. 자세한 정보와 예시는 [트레이스 후처리][1]에서 확인할 수 있습니다.

예를 들어, 리소스 이름이 `Api::HealthchecksController#index`인 경우, 리소스 이름이 포함된 트레이스를 제거하기 위해 `Datadog::Tracing::Pipeline::SpanFilter` 클래스를 사용하세요. 이 필터는 [스팬 객체][2]에 대해 사용 가능한 다른 메타데이터를 기준으로 매칭하는 데에도 사용할 수 있습니다.

```
Datadog::Tracing.before_flush(
   Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.resource =~ /Api::HealthchecksController#index/ }
)
```

[1]: /ko/tracing/trace_collection/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[2]: /ko/tracing/trace_collection/dd_libraries/ruby/#manual-instrumentation
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Python 트레이서는 원치 않는 트레이스를 필터링하는 옵션을 제공합니다.

### 사용자 지정 필터 사용 {#using-custom-filters}

고급 사용 사례의 경우, 사용자 지정 필터를 생성할 수 있습니다.

```py
from ddtrace.trace import tracer
from ddtrace.trace import TraceFilter
import re

class CustomFilter(TraceFilter):
    def __init__(self, pattern):
        self.pattern = re.compile(pattern)

    def process_trace(self, trace):
        for span in trace:
            if span.get_tag('http.url') and self.pattern.match(span.get_tag('http.url')):
                return None  # Drop the trace
        return trace  # Keep the trace

# Configure the SDK with your custom filter
tracer.configure(trace_processors=[CustomFilter(r'http://.*/healthcheck$')])
```

{{< /programming-lang >}}

{{< programming-lang lang="nodeJS" >}}

[Http][1] 플러그인에 차단 목록을 구성합니다. 차단 목록이 무엇을 기준으로 매칭하는지 API 문서에서 확인하세요. 예를 들어, 들어오는 HTTP 요청은 URL 경로를 기준으로 매칭합니다. 따라서 트레이스의 `http.url` 스팬 태그가 `http://<domain>/healthcheck`인 경우, `healthcheck` URL과 매칭되는 규칙을 작성합니다.


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
<div class="alert alert-info">통합을 위한 SDK 구성은 해당 계측 모듈을 가져오기 <em>전에</em> 이루어져야 합니다.</div>

[1]: https://datadoghq.dev/dd-trace-js/interfaces/export_.plugins.connect.html#blocklist
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

Java 트레이서는 특정 스팬을 필터링하기 위한 사용자 지정 `TraceInterceptor` 옵션을 제공합니다. [트레이서 확장하기][1]를 참조하세요.

예를 들어, 리소스 이름이 `GET /healthcheck`인 경우, 해당 리소스 이름을 포함하는 트레이스를 삭제하는 트레이스 인터셉터를 작성합니다. 사용 사례에 맞게 로직을 조정하세요.

```
public class GreetingController {
   static {
       // In a class static block to avoid initializing multiple times.
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


[1]: /ko/help/
[2]: /ko/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[3]: /ko/tracing/guide/metrics_namespace/
[4]: /ko/tracing/trace_ingestion/ingestion_controls
[5]: /ko/tracing/configure_data_security/?tab=mongodb#exclude-resources-from-being-collected
[6]: https://golang.org/pkg/regexp/