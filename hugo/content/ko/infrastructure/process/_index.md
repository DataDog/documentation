---
aliases:
- /ko/guides/process
- /ko/graphing/infrastructure/process/
further_reading:
- link: https://www.datadoghq.com/blog/live-process-monitoring/
  tag: 블로그
  text: Datadog으로 프로세스 모니터링하기
- link: /infrastructure/process/generate_process_metrics/
  tag: 설명서
  text: 메트릭으로 프로세스 데이터 보존 기간 늘리기
- link: /infrastructure/livecontainers
  tag: 설명서
  text: 환경 전반의 모든 컨테이너에 대한 실시간 가시성 확보
- link: https://www.datadoghq.com/blog/monitor-third-party-software-with-live-processes/
  tag: 블로그
  text: 소프트웨어 성능 및 리소스 소비와 저장한 보기의 상관 관계
- link: https://www.datadoghq.com/blog/process-level-data/
  tag: 블로그
  text: 프로세스 수준 앱과 네트워크 데이터로 빠른 문제 해결
- link: https://www.datadoghq.com/blog/watchdog-live-processes/
  tag: 블로그
  text: Watchdog Insights for Live Processes를 사용하여 워크로드 성능 이상 문제 해결
title: Live Processes
---
<div class="alert alert-info">
Live Processes 및 Live Process Monitoring은 엔터프라이즈 플랜에 포함되어 있습니다. 다른 모든 플랜에 대해서는 계정 담당자에게 문의하거나 <a href="mailto:success@datadoghq.com">success@datadoghq.com</a>에 기능 사용을 요청해야 합니다.
</div>

## 소개 {#introduction}

Datadog의 Live Processes를 이용하면 인프라에서 실행되는 프로세스를 실시간으로 볼 수 있습니다. Live Processes를 사용하면 다음 작업을 수행할 수 있습니다.

* 실행 중인 모든 프로세스를 한 곳에서 확인
* 호스트 및 컨테이너의 리소스 사용량을 프로세스 수준으로 분석
* 특정 호스트, 특정 영역 또는 특정 워크로드에서 실행 중인 프로세스 검색
* 2초 단위 시스템 메트릭을 사용하여 실행 중인 내부 및 타사 소프트웨어 성능 모니터링
* 대시보드 및 노트북에 컨텍스트 추가

{{< img src="infrastructure/process/live_processes_main.png" alt="Live Processes 개요" >}}

## 설치 {#installation}

Agent 5를 사용 중인 경우, 이 [특정 설치 프로세스][1]를 따르세요. Agent 6 또는 7을 사용 중인 경우, [아래 지침을 참조][2]하세요.

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Datadog Agent 설치 후, [Agent 기본 구성 파일][1]을 편집하여 다음 파라미터를 `true`로 설정해 Live Processes 수집을 활성화합니다.

```yaml
process_config:
  process_collection:
    enabled: true
```

추가로 일부 구성 옵션을 환경 변수로 설정할 수 있습니다.

**참고**: 환경 변수로 설정한 옵션은 구성 파일에 정의된 설정을 재정의합니다.

구성을 완료한 후 [Agent를 재시작][2]하세요.


[1]: /ko/agent/configuration/agent-configuration-files/
[2]: /ko/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

[Docker Agent][1]의 지침에 따라, 필요에 따른 다른 사용자 지정 설정에 더해 다음 속성을 전달합니다.

```text
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED=true
```

**참고**:

- 표준 설치에서 컨테이너 정보를 수집하려면 `dd-agent` 사용자가 `docker.sock`에 액세스할 수 있는 권한이 있어야 합니다.
- 컨테이너로 Agent를 실행해도 호스트 프로세스를 수집할 수 있습니다.


[1]: /ko/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "Helm" %}}

[datadog-values.yaml][1] 파일을 다음 프로세스 수집 구성으로 업데이트합니다.

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
```

그런 다음 Helm 차트를 업그레이드합니다.

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

**참고**: 컨테이너로 Agent를 실행해도 호스트 프로세스를 수집할 수 있습니다.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml`에서 `features.liveProcessCollection.enabled`를 `true`으로 설정합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    liveProcessCollection:
      enabled: true
```

{{% k8s-operator-redeploy %}}

**참고**: 컨테이너로 Agent를 실행해도 호스트 프로세스를 수집할 수 있습니다.

{{% /tab %}}
{{% tab "Kubernetes(수동 설치)" %}}

DaemonSet을 생성하는 데 사용하는 `datadog-agent.yaml` 매니페스트에 다음 환경 변수, 볼륨 마운트, 볼륨을 추가하세요.

```yaml
 env:
    - name: DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED
      value: "true"
  volumeMounts:
    - name: passwd
      mountPath: /etc/passwd
      readOnly: true
  volumes:
    - hostPath:
        path: /etc/passwd
      name: passwd
```

더 자세한 내용은 표준 [DaemonSet 설치][1]와 [Docker Agent][2] 정보 페이지를 참조하세요.

**참고**: 컨테이너로 Agent를 실행해도 호스트 프로세스를 수집할 수 있습니다.

[1]: /ko/containers/guide/kubernetes_daemonset
[2]: /ko/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "AWS ECS Fargate" %}}

<div class="alert alert-info">Datadog에서 ECS Fargate 프로세스를 볼 수 있습니다. ECS Fargate 컨테이너와의 관계를 보려면 Datadog Agent v7.50.0 이상을 사용하세요.</div>

프로세스를 수집하려면 Datadog Agent가 작업 내에서 컨테이너로 실행되고 있어야 합니다.

ECS Fargate에서 프로세스 모니터링을 활성화하려면 작업 정의 내의 Datadog Agent 컨테이너 정의에서 `DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED` 환경 변수를 `true`로 설정하세요.

예를 들면 다음과 같습니다.

```json
{
    "taskDefinitionArn": "...",
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "image": "public.ecr.aws/datadog/agent:latest",
            ...
            "environment": [
                {
                    "name": "DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED",
                    "value": "true"
                }
                ...
             ]
         ...
         }
    ]
  ...
}
```

ECS Fargate에서 프로세스 정보 수집을 시작하려면 [`pidMode` 파라미터][3]를 작업 정의에 추가하고 다음과 같이 `task`로 설정하세요.

```text
"pidMode": "task"
```

활성화되면 [Live Processes 페이지][1]에서 `AWS Fargate` Containers 패싯을 사용하여 ECS에서 실행 중인 프로세스를 필터링하거나 검색 쿼리에 `fargate:ecs`를 입력하세요.

{{< img src="infrastructure/process/fargate_ecs.png" alt="AWS Fargate의 프로세스" >}}

AWS ECS Fargate에서 Datadog Agent를 설치하는 방법에 대한 자세한 내용은 [ECS Fargate 통합 설명서][2]를 참조하세요.

[1]: https://app.datadoghq.com/process
[2]: /ko/integrations/ecs_fargate/#installation
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#other_task_definition_params

{{% /tab %}}
{{< /tabs >}}

### I/O 통계 {#io-stats}

I/O 및 열린 파일 통계는 권한이 상승된 상태로 실행되는 Datadog system-probe를 통해 수집할 수 있습니다. 이 통계를 수집하려면 system-probe의 프로세스 모듈을 활성화하세요.

1. system-probe 예제 구성 파일을 복사합니다.

   ```shell
   sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
   ```

2. `/etc/datadog-agent/system-probe.yaml`을 편집하여 프로세스 모듈을 활성화합니다.

   ```yaml
   system_probe_config:
     process_config:
       enabled: true
   ```

5. [Agent를 재시작][12]합니다.

   ```shell
   sudo systemctl restart datadog-agent
   ```

   **참고**: 시스템에서 `systemctl` 명령을 사용할 수 없는 경우, 대신 다음 명령을 실행하세요. `sudo service datadog-agent restart`


### 최적화된 프로세스 수집 풋프린트 {#optimized-process-collection-footprint}

Linux에서 Datadog Agent의 전체 풋프린트는 별도의 Process Agent 대신 핵심 Datadog Agent에서 컨테이너 및 프로세스 수집을 실행함으로써 감소됩니다. Datadog Agent v7.65.0 이상에서는 기본적으로 활성화되어 있습니다.  **참고**: [Cloud Network Monitoring][14]에는 여전히 Process Agent가 필요합니다.

이 기능에 대한 Agent 상태는 `Process Component` 섹션 아래에 나열되어 있습니다. 예를 들면 다음과 같습니다.

```text
=================
Process Component
=================


  Enabled Checks: [process rtprocess]
  System Probe Process Module Status: Not running
  Process Language Detection Enabled: False

  =================
  Process Endpoints
  =================
    https://process.datadoghq.com. - API Key ending with:
        - *****

  =========
  Collector
  =========
    Last collection time: 2026-01-14 10:04:49
    Docker socket: /var/run/docker.sock
    Number of processes: 48
    Number of containers: 0
    Process Queue length: 0
    RTProcess Queue length: 0
    Connections Queue length: 0
    Event Queue length: 0
    Pod Queue length: 0
    Process Bytes enqueued: 0
    RTProcess Bytes enqueued: 0
    Connections Bytes enqueued: 0
    Event Bytes enqueued: 0
    Pod Bytes enqueued: 0
    Drop Check Payloads: []
    Number of submission errors: 0
```

### 프로세스 인수 스크러빙 {#process-arguments-scrubbing}

Live Processes 페이지에서 민감한 데이터를 숨기기 위해, Agent는 프로세스 명령줄에서 민감한 인수를 스크러빙합니다. 이 기능은 기본적으로 활성화되어 있으며, 다음 단어 중 하나와 일치하는 모든 프로세스 인수의 값은 숨겨집니다.

```text
"password", "passwd", "mysql_pwd", "access_token", "auth_token", "api_key", "apikey", "secret", "credentials", "stripetoken"
```

**참고**: 일치는 **대소문자 구분을 하지 않습니다**.

{{< tabs >}}
{{% tab "Linux/Windows" %}}

기본 목록과 병합할 자체 목록을 정의하려면 `process_config` 섹션 아래의 `datadog.yaml` 파일에서 `custom_sensitive_words` 필드를 사용하세요. 와일드카드(`*`)를 사용하여 자체 일치 범위를 정의할 수 있습니다. 단, 와일드카드(`'*'`) 하나만으로 구성된 민감 단어는 지원되지 않습니다.

```yaml
process_config:
    scrub_args: true
    custom_sensitive_words: ['personal_key', '*token', 'sql*', '*pass*d*']
```

**참고**: `custom_sensitive_words`의 단어는 알파벳, 숫자, 밑줄 또는 와일드카드 (`'*'`)만 포함해야 합니다. 와일드카드만 있는 민감한 단어는 지원되지 않습니다.

다음 이미지는 위의 구성을 사용해 인수가 숨겨진 Live Processes 페이지의 한 프로세스를 보여줍니다.

{{< img src="infrastructure/process/process_arg_scrubbing.png" alt="프로세스 인수 스크러빙" style="width:100%;">}}

프로세스 인수 스크러빙을 완전히 비활성화하려면 `scrub_args`를 `false`로 설정하세요.

`datadog.yaml` 구성 파일에서 `strip_proc_arguments` 플래그를 활성화하여 프로세스의 **모든** 인수를 스크러빙할 수도 있습니다.

```yaml
process_config:
    strip_proc_arguments: true
```

{{% /tab %}}

{{% tab "Helm" %}}

Helm 차트를 사용하여 기본 목록과 병합되는 자체 목록을 정의할 수 있습니다. `DD_SCRUB_ARGS` 및 `DD_CUSTOM_SENSITIVE_WORDS` 환경 변수를 `datadog-values.yaml` 파일에 추가하고 Datadog Helm 차트를 업그레이드하세요.

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
    agents:
        containers:
            processAgent:
                env:
                - name: DD_SCRUB_ARGS
                  value: "true"
                - name: DD_CUSTOM_SENSITIVE_WORDS
                  value: "personal_key,*token,*token,sql*,*pass*d*"
```


와일드카드(`*`)를 사용하여 자체 일치 범위를 정의할 수 있습니다. 단, 와일드카드(`'*'`) 하나만으로 구성된 민감 단어는 지원되지 않습니다.

프로세스 인수 스크러빙을 완전히 비활성화하려면 `DD_SCRUB_ARGS`를 `false`로 설정하세요.

또는 `datadog-values.yaml` 파일에서 `DD_STRIP_PROCESS_ARGS` 변수를 활성화하여 프로세스에서 **모든** 인수를 스크러빙할 수 있습니다.

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
agents:
    containers:
        processAgent:
            env:
            - name: DD_STRIP_PROCESS_ARGS
              value: "true"
```

{{% /tab %}}
{{< /tabs >}}


## 쿼리 {#queries}

### 프로세스 범위 지정 {#scoping-processes}

프로세스는 본질적으로 매우 높은 카디널리티 객체입니다. 관련 프로세스를 보기 위해 범위를 세분화하려면 텍스트 및 태그 필터를 사용하면 됩니다.

#### 텍스트 필터 {#text-filters}

검색창에 텍스트 문자열을 입력하면 해당 텍스트 문자열이 명령줄이나 경로에 포함된 프로세스를 퍼지 문자열 검색으로 쿼리합니다. 결과를 보려면 두 글자 이상의 문자열을 입력해야 합니다. 아래는 Datadog 데모 환경에서 `postgres /9.` 문자열로 필터링한 결과입니다.

**참고**: `/9.`는 명령 경로에서 일치한 경우이며, `postgres`는 명령 자체와 일치한 경우입니다.

{{< img src="infrastructure/process/postgres.png" alt="Postgres" style="width:80%;">}}

여러 개의 스트링 검색을 하나의 복잡한 쿼리로 결합하려면 다음 부울 연산자 중 하나를 사용하세요.

`AND`
: **교집합**: 두 조건이 모두 포함된 이벤트를 검색합니다(아무 연산자를 입력하지 않으면 AND가 기본적으로 적용됨).<br> **예**: `java AND elasticsearch`

`OR`
: **합집합**: 두 조건 중 하나라도 포함된 이벤트를 검색합니다. <br> **예**: `java OR python`

`NOT` / `!`
: **제외**: 뒤에 오는 조건이 포함되지 않은 이벤트를 검색합니다. 동일한 연산을 수행하려면 `NOT` 단어 또는 `!` 문자를 사용할 수 있습니다.<br> **예**: `java NOT elasticsearch` 또는 `java !elasticsearch`

연산자를 함께 그룹화하려면 괄호를 사용하세요. 예: `(NOT (elasticsearch OR kafka) java) OR python`.

#### 태그 필터 {#tag-filters}

`host`, `pod`, `user`, `service`와 같은 Datadog [태그][3]를 사용하여 프로세스를 필터링할 수도 있습니다. 검색창에 태그 필터를 직접 입력하거나 페이지 왼쪽의 패싯 패널에서 선택하세요.

Datadog은 `command` 태그를 자동으로 생성하기 때문에 다음 항목을 필터링할 수 있습니다.

- 타사 소프트웨어, 예: `command:mongod`, `command:nginx`
- 컨테이너 관리 소프트웨어, 예: `command:docker`, `command:kubelet`
- 일반적인 워크로드, 예: `command:ssh`, `command:CRON`

#### 컨테이너화된 환경 태그 {#containerized-environment-tags}

또한, ECS 컨테이너의 프로세스에는 다음 태그가 사용됩니다.

- `task_name`
- `task_version`
- `ecs_cluster`

Kubernetes 컨테이너의 프로세스에는 다음 태그가 사용됩니다.

- `pod_name`
- `kube_service`
- `kube_namespace`
- `kube_replica_set`
- `kube_daemon_set`
- `kube_job`
- `kube_deployment`
- `kube_cluster_name`

[Unified Service Tagging][4]을 구성한 경우, `env`, `service`, `version` 태그가 자동으로 수집됩니다.
이 태그를 사용하면 APM, 로그, 메트릭 및 프로세스 데이터를 서로 연계할 수 있습니다.
**참고**: 이 설정은 컨테이너화된 환경에만 적용됩니다.

#### 사용자 지정 태그를 생성하는 규칙 {#rules-to-create-custom-tags}
<div class="alert alert-info">
다음 작업을 수행하려면 Datadog의 <code>Process Tags Read</code> 및 <code>Process Tag Write</code>  역할 권한이 필요합니다.<br/>
</div>

명령줄을 기반으로 프로세스에 수동 태그를 추가하기 위한 규칙 정의를 생성할 수 있습니다.

1. **Manage Process Tags** 탭에서 _New Process Tag Rule_ 버튼을 선택합니다.
2. 참조로 사용할 프로세스를 선택합니다.
3. 태그의 구문 분석 및 일치 기준을 정의합니다.
4. 유효성 검사가 통과하면 새 규칙을 생성합니다.

규칙이 생성된 후, 규칙 기준과 일치하는 모든 프로세스 명령줄 값에 대해 태그를 사용할 수 있습니다. 이 태그는 검색에서 사용할 수 있으며 [Live Process Monitor][6] 및 [Custom Metrics][13]의 정의에 사용할 수 있습니다.

## 산점도 {#scatter-plot}

산점도 분석을 이용하면 메트릭 두 개를 비교하여 컨테이너 성능을 더 깊이 이해할 수 있습니다.

[Processes 페이지][5]에서 산점도 분석으로 이동하려면 _Show Summary graph_ 버튼을 클릭한 후 "Scatter Plot" 탭을 선택하세요.

{{< img src="infrastructure/process/scatterplot_selection.png" alt="산점도 선택" style="width:60%;">}}

기본적으로 그래프는 `command` 태그 키로 그룹화됩니다. 각 점의 크기는 해당 그룹의 프로세스 수를 나타내며, 점을 클릭하면 해당 그룹에 기여하는 개별 프로세스와 컨테이너를 볼 수 있습니다.

그래프 상단의 옵션을 사용하면 산점도 분석을 제어할 수 있습니다.

- 표시할 메트릭 선택.
- 두 메트릭에 대한 집계 방식 선택.
- X축과 Y축의 배율 선택(_선형_/_로그_).

{{< img src="infrastructure/process/scatterplot.png" alt="컨테이너 검사" style="width:80%;">}}

## 프로세스 모니터 {#process-monitors}

[Live Process Monitor][6]를 사용하여 호스트 또는 태그에 걸쳐 프로세스 그룹의 수를 기반으로 경보를 생성합니다. [Monitors 페이지][7]에서 프로세스 경보를 구성할 수 있습니다. 자세한 내용은 [Live Process Monitor 설명서][6]를 참조하세요.

{{< img src="infrastructure/process/process_monitor.png" alt="프로세스 모니터" style="width:80%;">}}

## 대시보드 및 노트북의 프로세스 {#processes-in-dashboards-and-notebooks}

[Timeseries 위젯][8]을 사용해 대시보드와 노트북에서 프로세스 메트릭을 그래프화할 수 있습니다. 구성 방법:
1. 데이터 소스로 Processes를 선택합니다.
2. 검색창에서 텍스트 문자열을 사용해 필터링합니다.
3. 그래프로 표시할 프로세스 메트릭을 선택합니다.
4. `From` 필드에서 태그를 활용해 필터링합니다.

{{< img src="infrastructure/process/process_widget.png" alt="Processes 위젯" style="width:80%;">}}

## 타사 소프트웨어 모니터링 {#monitoring-third-party-software}

### 자동 탐지된 통합 {#autodetected-integrations}

Datadog은 프로세스 수집을 사용하여 호스트에서 실행 중인 기술을 자동으로 감지합니다. 이를 통해 해당 기술을 모니터링하는 데 도움이 되는 Datadog 통합을 식별할 수 있습니다. 이 자동 탐지된 통합은 [Integrations 검색][1]에 표시됩니다.

{{< img src="getting_started/integrations/ad_integrations.png" alt="자동 탐지된 통합" >}}

각 통합은 두 가지 상태 유형 중 하나에 해당합니다.

- **+ Detected**: 이 통합이 실행 중인 호스트에서 활성화되지 않았습니다.
- **✓ Partial Visibility**: 이 통합이 일부 호스트에서 활성화되었지만, 실행 중인 모든 관련 호스트에서 활성화되지는 않았습니다.

통합을 실행하고 있지만 통합을 활성화하지 않은 호스트는 통합 타일의 **Hosts** 탭에 표시됩니다.

### 통합 보기 {#integration-views}

{{< img src="infrastructure/process/integration_views.png" alt="통합 보기" >}}

실시간 프로세스는 타사 소프트웨어 검색 후 해당 소프트웨어의 성능을 분석하는 데 도움이 됩니다.
1. 시작하려면 페이지 우측 상단에 있는 *보기*를 클릭하여 Nginx, Redis, Kafka와 같은 사전 설정 옵션 목록을 엽니다.
2. 보기를 선택하여 해당 소프트웨어를 실행하는 프로세스로만 페이지의 범위를 지정합니다.
3. 크기가 큰 프로세스를 검사할 때는 *Integration Metrics* 탭으로 이동해 기본 호스트에서 실행 중인 소프트웨어의 상태를 분석합니다. 관련 Datadog 통합을 이미 활성화한 상태라면 통합에서 수집한 성능 메트릭 모두를 확인하여 호스트 수준과 소프트웨어 수준 문제를 구분할 수 있습니다. 예를 들어, 프로세스 CPU와 MySQL 쿼리 지연 시간이 서로 연관되어 급증하는 것을 보면 전체 테이블 스캔과 같은 집중적인 작업으로 인해 동일한 기본 리소스에 의존하는 다른 MySQL 쿼리의 실행이 지연되고 있음을 나타낼 수 있습니다.

Nginx 프로세스를 호스트별로 집계하는 경우와 같은 통합 보기 또는 기타 사용자 지정 쿼리는 페이지 상단의 *+Save* 버튼을 클릭하여 저장할 수 있습니다. 이렇게 하면 쿼리, 테이블 열 선택 및 시각화 설정이 저장됩니다. 이를 통해 자주 조회하는 프로세스에 추가 구성 없이 빠르게 접근할 수 있으며, 팀원들과 프로세스 데이터를 공유할 수도 있습니다.

## 플랫폼 전반의 프로세스 {#processes-across-the-platform}

### Live Containers {#live-containers}

Live Processes는 각 컨테이너에서 실행 중인 프로세스를 모니터링하여 컨테이너 배포에 대한 추가 가시성을 제공합니다. [Live Processes][9] 페이지에서 컨테이너를 클릭하면 실행 중인 명령어와 각 프로세스의 리소스 사용량을 포함한 프로세스 트리를 볼 수 있습니다. 이 데이터를 다른 컨테이너 메트릭과 함께 사용하면 실패한 컨테이너나 배포의 근본 원인을 파악할 수 있습니다.

### APM {#apm}

[APM Traces][10]에서 서비스의 스팬을 클릭하면 해당 서비스의 기본 인프라에서 실행 중인 프로세스를 볼 수 있습니다. 서비스의 스팬 프로세스는 요청 시점에 서비스가 실행되는 호스트 또는 포드와 연관되어 있습니다. CPU 및 RSS 메모리와 같은 프로세스 메트릭을 코드 수준의 오류와 함께 분석하면 문제가 애플리케이션 자체에 있는지, 아니면 더 광범위한 인프라 문제인지 구분할 수 있습니다. 프로세스를 클릭하면 Live Processes 페이지로 이동합니다. 관련 프로세스는 서버리스 및 브라우저 트레이스에서는 지원되지 않습니다.

### Cloud Network Monitoring {#cloud-network-monitoring}

[Network Analytics][11] 페이지에서 종속성을 검사하면 서비스 간 통신과 같은 엔드포인트의 기반 인프라에서 실행 중인 프로세스를 확인할 수 있습니다. 프로세스 메타데이터를 이용해 네트워크 연결 불량(TCP 재전송 수가 높은 경우)이나 긴 네트워크 호출 대기 시간(TCP 왕복 시간이 높은 경우)이 엔드포인트의 리소스를 과도하게 사용하는 워크로드 때문인지, 이로 인해 통신 상태와 효율성에 영향을 미치는지 확인할 수 있습니다.

## 실시간 모니터링 {#real-time-monitoring}

프로세스는 일반적으로 10초 해상도로 수집됩니다. 그러나 Live Processes 페이지를 적극적으로 사용하는 동안에는 메트릭이 2초 해상도로 수집되어 실시간으로 표시됩니다. 이는 CPU와 같이 변동성이 큰 메트릭을 분석할 때 특히 중요합니다. 반면 과거 데이터는 기본 10초 해상도로 수집됩니다.

## 추가 정보 {#additional-information}

- 실시간(2초) 데이터 수집은 30분 후에 꺼집니다. 실시간 수집을 재개하려면 페이지를 새로 고침하세요.
- 컨테이너 배포에서는 `/etc/passwd` 파일을 `docker-dd-agent`에 마운트해야 각 프로세스의 사용자 이름을 수집할 수 있습니다. 이 파일은 공개 파일이며 Process Agent는 사용자 이름을 제외한 다른 필드를 사용하지 않습니다. Agent가 권한 없음 모드로 실행되는 경우 마운트가 발생하지 않습니다. `/etc/passwd` 파일에 접근할 수 없더라도 `user` 메타데이터 필드를 제외한 모든 기능은 정상적으로 동작합니다. **참고**: Live Processes는 호스트의 `passwd` 파일만 사용하며 컨테이너 내에서 생성된 사용자에 대해서는 사용자 이름 확인을 수행하지 않습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/faq/agent-5-process-collection/
[2]: /ko/agent/
[3]: /ko/getting_started/tagging/
[4]: /ko/getting_started/tagging/unified_service_tagging
[5]: https://app.datadoghq.com/process
[6]: /ko/monitors/types/process/
[7]: https://app.datadoghq.com/monitors/create/live_process
[8]: /ko/dashboards/widgets/timeseries/#pagetitle
[9]: /ko/infrastructure/livecontainers/
[10]: /ko/tracing/
[11]: /ko/network_monitoring/cloud_network_monitoring/network_analytics
[12]: /ko/agent/configuration/agent-commands/#restart-the-agent
[13]: /ko/metrics/custom_metrics/
[14]: /ko/network_monitoring/cloud_network_monitoring/