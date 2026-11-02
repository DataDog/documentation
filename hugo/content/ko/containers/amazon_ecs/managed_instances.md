---
description: Amazon Elastic Container Service 관리형 인스턴스에 Datadog Agent 설치 및 구성
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: 설명서
  text: 애플리케이션 로그 수집
- link: /agent/amazon_ecs/apm/
  tag: 설명서
  text: 애플리케이션 트레이스 수집
- link: /agent/amazon_ecs/data_collected/#metrics
  tag: 설명서
  text: ECS 메트릭 수집
- link: /agent/amazon_ecs/tags/
  tag: 설명서
  text: 컨테이너에서 내보내는 모든 데이터에 태그 할당
- link: https://www.datadoghq.com/blog/ecs-default-monitors/
  tag: 블로그
  text: 기본 모니터와 ECS Explorer를 사용하여 ECS 문제를 더 빠르게 탐지하고 해결
title: Amazon ECS 관리형 인스턴스
---
Datadog Container Monitoring을 사용하면 [Amazon ECS 관리형 인스턴스][29]에서 실행 중인 애플리케이션에 대해 파악할 수 있습니다.

### 작동 방식 {#how-it-works}
Datadog을 사용하여 ECS 관리형 인스턴스를 모니터링하려면 Datadog Agent를 **데몬 작업**으로 실행합니다. 데몬 작업을 사용하면 관리형 인스턴스가 클러스터에 조인될 때 ECS가 각 호스트에 자동으로 배포될 수 있습니다. 따라서 애플리케이션 작업 정의를 변경하지 않아도 인스턴스의 모든 컨테이너에 대해 전체적으로 파악할 수 있습니다.

## 설정 {#setup}

<div class="alert alert-info">이 설정에는 Datadog Agent 7.77.0 이상이 필요합니다.</div>

다음 지침에서는 ECS 관리형 인스턴스 클러스터를 구성했다고 가정합니다. [클러스터 생성에 관한 Amazon ECS 관리형 인스턴스 설명서][1]를 참조하세요.

1. [데몬 작업 정의 파일 생성](#create-a-daemon-task-definition-file)
2. [데몬 작업 정의 등록](#register-the-daemon-task-definition)
3. [데몬 생성](#create-the-daemon)

### 데몬 작업 정의 파일 생성 {#create-a-daemon-task-definition-file}

이 ECS 데몬 작업 정의는 필요한 구성을 사용하여 Datadog Agent 컨테이너를 시작합니다.

1. [datadog-agent-ecs-managed-instances-daemon.json][7]을 다운로드합니다. 이 파일은 핵심 인프라 모니터링을 위한 최소한의 구성을 제공합니다. 다양한 기능이 활성화된 추가 데몬 작업 정의 파일 샘플은 이 페이지의 [추가 Agent 기능 설정][27] 섹션을 참조하세요.
2. 다음과 같이 데몬 작업 정의 파일을 수정합니다.
    - `<YOUR_DATADOG_API_KEY>`를 계정의 [Datadog API 키][5]로 대체하여 `DD_API_KEY` 환경 변수를 설정합니다. 또는 [AWS Secrets Manager에 저장된 시크릿의 ARN을 제공][9]할 수도 있습니다.
    - `DD_SITE` 환경 변수를 [Datadog 사이트][10]로 설정합니다. 현재 사이트는 다음과 같습니다. {{< region-param key="dd_site" code="true" >}}
3. (선택 사항) Agent 상태 점검을 추가하려면 ECS 데몬 작업 정의에 다음을 추가합니다.
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```

### 데몬 작업 정의 등록 {#register-the-daemon-task-definition}

{{< tabs >}}
{{% tab "AWS 콘솔" %}}

1. [AWS 콘솔][1]에 로그인한 후 Elastic Container Service 섹션으로 이동합니다.
2. 탐색 창에서 {{< ui >}}Daemon Task Definitions{{< /ui >}}를 선택합니다. {{< ui >}}Create new daemon task definition{{< /ui >}} 메뉴에서 {{< ui >}}Create new daemon task definition with JSON{{< /ui >}}을 선택합니다.
3. JSON 편집기 상자에 데몬 작업 정의 파일의 내용을 붙여넣습니다.
4. {{< ui >}}Create{{< /ui >}}를 선택합니다.

[1]: https://aws.amazon.com/console
{{% /tab %}}

{{% tab "AWS CLI" %}}
[AWS CLI][1]를 사용하여 다음 명령을 실행하세요.

```bash
aws ecs register-daemon-task-definition --cli-input-json file://<path to datadog-agent-ecs-managed-instances-daemon.json>
```
[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}


### 데몬 생성{#create-the-daemon}

데몬은 용량 공급자에 연결되어 해당 용량 공급자의 각 관리형 인스턴스에 자동으로 배포됩니다.

{{< tabs >}}
{{% tab "AWS 콘솔" %}}
1. [AWS 웹 콘솔][1]에 로그인한 후 Elastic Container Service 섹션으로 이동합니다.
2. Datadog Agent를 실행할 클러스터를 선택합니다.
3. {{< ui >}}Daemons{{< /ui >}} 탭에서 {{< ui >}}Create{{< /ui >}}를 클릭합니다.
4. {{< ui >}}Daemon Task Definition{{< /ui >}}에서 이전 단계에서 만든 데몬 작업 정의를 선택합니다.
5. {{< ui >}}Daemon name{{< /ui >}}을 입력합니다.
6. {{< ui >}}Capacity Provider{{< /ui >}}로 클러스터에 연결된 용량 공급자를 선택합니다.
7. 기본 설정에 따라 나머지 선택적 필드를 채웁니다.
8. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

[1]: https://aws.amazon.com/console
{{% /tab %}}
{{% tab "AWS CLI" %}}
[AWS CLI][1]를 사용하여 다음 명령을 실행하세요.

```bash
aws ecs create-daemon \
--daemon-name <DAEMON_NAME> \
--daemon-task-definition-arn <DAEMON_TASK_DEFINITION_ARN> \
--cluster-arn <CLUSTER_ARN> \
--capacity-provider-arns <CAPACITY_PROVIDER_ARN>
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

## 추가 Datadog Agent 기능 설정 {#set-up-additional-datadog-agent-features}

### 메트릭 수집 {#metrics-collection}

통합을 활성화하려면 ECS 작업 정의의 애플리케이션 컨테이너에 Docker 레이블 주석을 추가하세요.

#### 통합 추가 {#add-an-integration}

##### 작업 정의 업데이트 {#update-the-task-definition}

{{< tabs >}}
{{% tab "AWS 콘솔" %}}

1. [AWS 웹 콘솔][1]에 로그인하고 ECS 섹션으로 이동합니다.
2. 애플리케이션이 실행 중인 클러스터를 선택합니다.
3. {{< ui >}}Tasks{{< /ui >}} 탭에서 애플리케이션에 대한 {{< ui >}}Task definition{{< /ui >}}을 클릭합니다.
4. {{< ui >}}Create new revision{{< /ui >}} 버튼을 클릭합니다.
5. 애플리케이션 컨테이너 아래에 다음 {{< ui >}}Docker labels{{< /ui >}}를 추가합니다.

| 키                           | 값                                           |
|-------------------------------|-------------------------------------------------|
| com.datadoghq.ad.instances    | `[{"host": "%%host%%", "port": <PORT_NUMBER>}]` |
| com.datadoghq.ad.check_names  | `["<CHECK_NAME>"]`                              |
| com.datadoghq.ad.init_configs | `[{}]`                                          |

6. {{< ui >}}Update{{< /ui >}} 버튼을 클릭한 다음 {{< ui >}}Create{{< /ui >}} 버튼을 클릭합니다.

[1]: https://aws.amazon.com/console
{{% /tab %}}
{{% tab "AWS CLI" %}}

작업 정의 JSON의 애플리케이션 컨테이너에 `dockerLabels`를 추가한 다음 [AWS CLI][1]를 사용하여 새 리비전을 등록합니다.

```json
{
  "containerDefinitions": [
    {
      "name": "<APP_CONTAINER_NAME>",
      "dockerLabels": {
        "com.datadoghq.ad.instances": "[{\"host\": \"%%host%%\", \"port\": <PORT_NUMBER>}]",
        "com.datadoghq.ad.check_names": "[\"<CHECK_NAME>\"]",
        "com.datadoghq.ad.init_configs": "[{}]"
      }
    }
  ]
}
```

```bash
aws ecs register-task-definition --cli-input-json file://<path-to-task-definition.json>
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

##### 서비스 업데이트 {#update-the-service}

{{< tabs >}}
{{% tab "AWS 콘솔" %}}

1. 클러스터 내에서 {{< ui >}}Services{{< /ui >}} 탭을 클릭한 다음 {{< ui >}}Service Name{{< /ui >}}을 클릭합니다.
2. {{< ui >}}Update{{< /ui >}} 버튼을 클릭합니다.
3. {{< ui >}}Task Definition{{< /ui >}}의 경우 드롭다운 메뉴에서 최신 {{< ui >}}Revision{{< /ui >}}을 선택합니다.
4. {{< ui >}}Update Service{{< /ui >}} 버튼을 클릭합니다.

{{% /tab %}}
{{% tab "AWS CLI" %}}

[AWS CLI][1]를 사용하여 새 작업 정의 리비전으로 서비스를 업데이트하세요.

```bash
aws ecs update-service --cluster <CLUSTER_NAME> \
--service <SERVICE_NAME> \
--task-definition <TASK_DEFINITION_ARN>
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

#### 예시 {#examples}

{{< tabs >}}
{{% tab "AWS 콘솔" %}}
[AWS 웹 콘솔][1]을 통해 Redis 컨테이너에 대한 Docker 레이블을 입력하려면 다음 표를 사용하세요.

| 키                           | 값                                  |
|-------------------------------|----------------------------------------|
| com.datadoghq.ad.instances    | `[{"host": "%%host%%", "port": 6379}]` |
| com.datadoghq.ad.check_names  | `["redisdb"]`                          |
| com.datadoghq.ad.init_configs | `[{}]`                                 |

[1]: https://aws.amazon.com/console
{{% /tab %}}
{{% tab "AWS CLI" %}}
[AWS CLI][1]를 통해 Docker 레이블이 있는 Redis 컨테이너를 구성하려면 `containerDefinitions` 아래에서 다음 JSON을 사용하세요.

```json
{
  "name": "redis",
  "image": "redis:latest",
  "essential": true,
  "dockerLabels": {
    "com.datadoghq.ad.instances": "[{\"host\": \"%%host%%\", \"port\": 6379}]",
    "com.datadoghq.ad.check_names": "[\"redisdb\"]",
    "com.datadoghq.ad.init_configs": "[{}]"
  }
}
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

#### 대안: 구성 파일 마운트 {#alternative-mount-a-configuration-file}

사용자 지정 통합 구성을 제공하기 위해 구성 파일을 Datadog Agent 컨테이너에 직접 마운트할 수도 있습니다.

다음과 같은 파일 구조를 생성합니다.

```
|- datadog
  |- Dockerfile
  |- conf.d
    |-redis.yaml
```

`redis.yaml` 파일에는 [Redis][28] 통합을 위한 구성이 포함되어 있습니다.

{{< code-block lang="yaml" filename="redis.yaml" disable_copy="false" collapsible="true" >}}
ad_identifiers:
  - redis

init_config:

instances:
    - host: %%host%%
      port: 6379
{{< /code-block >}}

`Dockerfile`은 Datadog Agent 이미지를 빌드하고 올바른 위치에 `redis.yaml` 파일을 포함하는 데 사용됩니다.

{{< code-block lang="Dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
FROM public.ecr.aws/datadog/agent:latest

COPY conf.d/ /etc/datadog-agent/conf.d/
{{< /code-block >}}

이미지가 빌드되어 이미지 레지스트리로 푸시되면 ECS 데몬 작업 정의에서 해당 사용자 지정 이미지를 참조할 수 있습니다.

```
{
    "containerDefinitions": [
        {
            "image": "<registry-domain>/<namespace-or-account>/<repository>:<tag>",
            "name": "datadog-agent",
            ...
        }
    ],
    ...
}
```

### 트레이스 수집(APM) {#trace-collection-apm}

설정을 기반으로 애플리케이션 계측:

| 언어                           |
|------------------------------------|
| [Java][17] |
| [Python][18] |
| [Ruby][19] |
| [Go][20] |
| [Node.js][21] |
| [PHP][22] |
| [C++][23] |
| [.NET Core][24] |
| [.NET Framework][25] |

#### UDS {#uds}

권장되는 방법은 UDS(Unix Domain Socket)입니다. 데몬 Agent는 호스트 파일 시스템에서 자신의 소켓을 노출하므로 애플리케이션 작업이 동일한 호스트 경로를 마운트하여 소켓에 액세스합니다.

전체 데몬 작업 정의는 샘플 [datadog-agent-ecs-managed-instances-daemon-apm.json][37] 파일을 참조하세요.

**데몬 작업 정의를 업데이트**하여 `dd-sockets` 호스트 볼륨 및 마운트를 추가합니다.

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            ...
            "mountPoints": [
                ...
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": false,
                    "sourceVolume": "dd-sockets"
                }
            ]
        }
    ],
    "volumes": [
        ...
        {
            "host": {
                "sourcePath": "/var/run/datadog"
            },
            "name": "dd-sockets"
        }
    ]
}
```

Agent는 `/var/run/datadog/apm.socket` 및 `/var/run/datadog/dsd.socket`에서 소켓 파일을 유지 관리합니다.

**각 애플리케이션 작업 정의를 업데이트**하여 동일한 호스트 경로를 마운트하고 트레이서를 구성합니다.

```json
{
    "containerDefinitions": [
        {
            "name": "<APP_CONTAINER_NAME>",
            ...
            "environment": [
                {
                    "name": "DD_TRACE_AGENT_URL",
                    "value": "unix:///var/run/datadog/apm.socket"
                }
            ],
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": true,
                    "sourceVolume": "dd-sockets"
                }
            ]
        }
    ],
    "volumes": [
        {
            "host": {
                "sourcePath": "/var/run/datadog"
            },
            "name": "dd-sockets"
        }
    ]
}
```

### 로그 수집 {#log-collection}

ECS 관리형 인스턴스의 데몬 모드에서는 에이전트를 통한 컨테이너 로그 수집이 지원되지 않습니다.

컨테이너 로그를 수집하려면 다음 대안 중 하나를 사용하세요.

- **AWS FireLens**: 애플리케이션 작업 정의에서 Fluent Bit 사이드카를 구성합니다. 설정 지침은 [ECS Fargate 로그 수집 설명서][14]를 참조하세요.
- **`awslogs` 로그 드라이버**: 로그를 Amazon CloudWatch Logs로 라우팅하고 [CloudWatch Logs Lambda Forwarder][30] 또는 구독 필터를 사용하여 Datadog으로 전달하세요.

### 프로세스 수집{#process-collection}

모든 컨테이너에 대한 Live Process 정보를 수집하여 Datadog에 전송하려면 `DD_PROCESS_AGENT_ENABLED` 환경 변수를 사용하여 데몬 작업 정의를 업데이트합니다.

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            ...
            "environment": [
                ...
                {
                    "name": "DD_PROCESS_AGENT_ENABLED",
                    "value": "true"
                }
            ]
        }
    ]
}
```

### Cloud Network Monitoring {#cloud-network-monitoring}

<div class="alert alert-danger">
이 기능은 Linux에서만 지원됩니다.
</div>

전체 데몬 작업 정의는 샘플 [datadog-agent-ecs-managed-instances-daemon-sysprobe.json][35] 파일을 참조하세요.

기존 데몬 작업 정의를 업데이트하여 다음 구성을 포함하세요.

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            ...
            "environment": [
                ...
                {
                    "name": "DD_SYSTEM_PROBE_NETWORK_ENABLED",
                    "value": "true"
                }
            ],
            "linuxParameters": {
                "capabilities": {
                    "add": [
                        "SYS_ADMIN",
                        "SYS_RESOURCE",
                        "SYS_PTRACE",
                        "NET_ADMIN",
                        "NET_BROADCAST",
                        "NET_RAW",
                        "IPC_LOCK",
                        "CHOWN"
                    ]
                }
            },
            "mountPoints": [
                ...
                {
                    "containerPath": "/sys/kernel/debug",
                    "sourceVolume": "debug",
                    "readOnly": false
                }
            ]
        }
    ],
    "volumes": [
        ...
        {
            "name": "debug",
            "host": {
                "sourcePath": "/sys/kernel/debug"
            }
        }
    ]
}
```

자세한 내용은 [Cloud Network Monitoring][36] 설명서를 참조하세요.

## 사이드카에서 데몬 설정으로 마이그레이션 {#migrate-from-sidecar-to-daemon-setup}

다음 단계에 따라 기존 사이드카 배포에서 데몬 배포로 마이그레이션하세요.

### 1. 데몬 설정{#1-set-up-the-daemon}

이 페이지의 [설정](#setup) 지침에 따라 데몬 작업 정의를 생성 후 등록한 다음 클러스터에 해당 데몬을 생성합니다.

### 2. 애플리케이션 작업 정의에서 Datadog Agent 사이드카 제거 {#2-remove-the-datadog-agent-sidecar-from-application-task-definitions}

`datadog-agent` 사이드카 컨테이너를 포함하는 각 애플리케이션 작업 정의에 대해 `containerDefinitions`에서 `datadog-agent` 항목을 제거합니다.

### 3. APM 구성 업데이트{#3-update-apm-configuration}

데몬 Agent는 작업 내 공유 볼륨이 아닌 호스트 파일 시스템에서 트레이스 소켓을 노출합니다. 이 호스트 경로를 사용하도록 각 애플리케이션 작업 정의를 업데이트합니다.

사이드카 설정에서 사용했던 공유 빈 볼륨(`"host": {}`)을 **제거**하고 호스트 경로 볼륨으로 **교체**합니다.

```json
{
    "containerDefinitions": [
        {
            "name": "<APP_CONTAINER_NAME>",
            "environment": [
                {
                    "name": "DD_TRACE_AGENT_URL",
                    "value": "unix:///var/run/datadog/apm.socket"
                }
            ],
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": true,
                    "sourceVolume": "dd-sockets"
                }
            ]
        }
    ],
    "volumes": [
        {
            "host": {
                "sourcePath": "/var/run/datadog"
            },
            "name": "dd-sockets"
        }
    ]
}
```

이전에 사이드카의 `localhost` 주소를 사용하여 UDP를 통해 트레이스를 수집했다면 위의 구성을 사용하여 UDS로 전환하세요.

### 4. 프로세스 수집 업데이트 {#4-update-process-collection}

사이드카 설정은 `pidMode: task`를 사용하여 프로세스 수집을 활성화하였습니다. 데몬 설정은 대신 `DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED` 환경 변수를 사용합니다.

애플리케이션 작업 정의에서 `pidMode` 파라미터를 제거합니다. 그런 다음 데몬 작업 정의에 다음이 포함되어 있는지 확인하세요.

```json
{
    "name": "DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED",
    "value": "true"
}
```

### 5. 업데이트된 작업 정의 등록 및 배포 {#5-register-and-deploy-the-updated-task-definitions}

위의 변경 사항을 완료한 후, 업데이트된 각 애플리케이션 작업 정의를 등록하고 연관 서비스를 재배포합니다.

{{< tabs >}}
{{% tab "AWS 콘솔" %}}

1. AWS 콘솔에서 {{< ui >}}Elastic Container Service{{< /ui >}} > {{< ui >}}Task Definitions{{< /ui >}}로 이동합니다.
2. 애플리케이션 작업 정의를 선택하고 {{< ui >}}Create new revision with JSON{{< /ui >}}을 클릭합니다.
3. 변경 사항을 적용하고 {{< ui >}}Create{{< /ui >}}를 클릭합니다.
4. 이 작업 정의를 사용하는 서비스로 이동하여 {{< ui >}}Update{{< /ui >}}를 클릭하고, 새 리비전을 선택한 다음 {{< ui >}}Update Service{{< /ui >}}를 클릭합니다.

{{% /tab %}}
{{% tab "AWS CLI" %}}

```bash
aws ecs register-task-definition --cli-input-json file://<path-to-updated-task-definition.json>
aws ecs update-service --cluster <CLUSTER_NAME> --service <SERVICE_NAME> --task-definition <NEW_TASK_DEFINITION_ARN>
```

{{% /tab %}}
{{< /tabs >}}

## 사이드카 설정(레거시) {#sidecar-setup-legacy}

<div class="alert alert-warning">

데몬 스케줄링은 ECS 관리형 인스턴스에 권장되는 배포 방법입니다. 새 배포에서는 대신 [데몬 설정][34]을 사용해야 합니다.

</div>

사이드카 배포 모델에서는 Datadog Agent가 각 애플리케이션 작업 정의 내에서 추가 컨테이너로 실행됩니다.

### 작업 정의 파일 생성 {#create-the-task-definition-file}

1. [datadog-agent-ecs-managed-instances-sidecar.json][31]을 다운로드합니다. 이 파일은 핵심 인프라 모니터링을 위한 최소한의 구성을 제공합니다.
2. 작업 정의 파일 수정:
    -  `<YOUR_API_KEY>`를 계정의 [Datadog API 키][5]로 대체하여 `DD_API_KEY` 환경 변수를 설정합니다. 또는 [AWS Secrets Manager에 저장된 시크릿의 ARN을 제공][9]할 수도 있습니다.
    - `DD_SITE` 환경 변수를 [Datadog 사이트][10]로 설정합니다. 현재 사이트는 다음과 같습니다. {{< region-param key="dd_site" code="true" >}}

### 작업 정의 등록 {#register-the-task-definition}

{{< tabs >}}
{{% tab "AWS 콘솔" %}}

1. [AWS 콘솔][1]에 로그인한 후 Elastic Container Service 섹션으로 이동합니다.
2. 탐색 창에서 {{< ui >}}Task Definitions{{< /ui >}}를 선택합니다. {{< ui >}}Create new task definition{{< /ui >}} 메뉴에서 {{< ui >}}Create new task definition with JSON{{< /ui >}}을 선택합니다.
3. JSON 편집기 상자에 작업 정의 파일의 내용을 붙여넣습니다.
4. {{< ui >}}Create{{< /ui >}}를 선택합니다.

[1]: https://aws.amazon.com/console
{{% /tab %}}

{{% tab "AWS CLI" %}}
[AWS CLI][1]를 사용하여 다음 명령을 실행하세요.

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs-managed-instances-sidecar.json>
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

### 복제본 서비스로 작업 실행 {#run-the-task-as-a-replica-service}

{{< tabs >}}
{{% tab "AWS 콘솔" %}}

1. [AWS 웹 콘솔][1]에 로그인한 후 Elastic Container Service 섹션으로 이동합니다.
2. Datadog Agent를 실행할 클러스터를 선택합니다.
3.  {{< ui >}}Services{{< /ui >}} 탭에서 {{< ui >}}Create{{< /ui >}}를 클릭합니다.
4.  {{< ui >}}Task Definition{{< /ui >}}에 대해 이전 단계에서 생성한 작업을 선택합니다.
5.  {{< ui >}}Service name{{< /ui >}}을 입력합니다.
6.  {{< ui >}}Launch type{{< /ui >}}의 경우 {{< ui >}}Capacity Provider{{< /ui >}}를 선택하고 클러스터에 연결된 관리형 인스턴스 용량 공급자를 선택합니다.
7.  {{< ui >}}Number of tasks{{< /ui >}}에 `1`을 입력합니다. {{< ui >}}Next step{{< /ui >}}을 클릭합니다.
8. 기본 설정에 따라 나머지 선택적 필드를 채웁니다.
9. {{< ui >}}Create service{{< /ui >}}를 클릭합니다.

[1]: https://aws.amazon.com/console
{{% /tab %}}

{{% tab "AWS CLI" %}}
[AWS CLI][1]를 사용하여 다음 명령을 실행하세요.

```bash
aws ecs create-service --cluster <CLUSTER_NAME> \
--service-name <SERVICE_NAME> \
--task-definition <TASK_DEFINITION_ARN> \
--desired-count 1
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

### 트레이스 수집(APM) {#trace-collection-apm-1}

#### UDP {#udp}

UDP를 통해 트레이스를 수집하려면 `DD_AGENT_HOST`를 설정하지 마세요. 기본값 `localhost`를 유지하세요.

#### UDS {#uds-1}

UDS를 통해 트레이스를 수집하려면 다음 단계를 수행하세요.
1. `volumes` 파라미터를 사용하여 작업 정의에 빈 볼륨을 추가합니다.
2. `mountPoints` 파라미터를 사용하여 에이전트 및 애플리케이션 컨테이너에 볼륨을 마운트합니다.
3. 애플리케이션 컨테이너에서 `DD_DOGSTATSD_SOCKET` 환경 변수를 구성하고 `/var/run/datadog/dsd.socket`으로 설정합니다.

**예시**: UDS를 통한 트레이스 수집을 구성하는 컨테이너 정의

```json
{
    "containerDefinitions": [
        {
            "image": "public.ecr.aws/datadog/agent:latest",
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": false,
                    "sourceVolume": "dd-sockets"
                }
            ],
            "name": "datadog-agent",
            ...
        },
        {
            "environment": [
                {
                    "name": "DD_DOGSTATSD_SOCKET",
                    "value": "/var/run/datadog/dsd.socket"
                }
            ],
            "mountPoints": [
                {
                    "containerPath": "/var/run/datadog",
                    "readOnly": false,
                    "sourceVolume": "dd-sockets"
                }
            ],
            "name": "app",
            ...
        }
    ],
    "volumes": [
        {
            "host": {},
            "name": "dd-sockets"
        }
    ]
}
```

### 프로세스 수집 {#process-collection-1}

[Live Processes 페이지][32]를 사용하여 Datadog에서 ECS 관리형 인스턴스의 프로세스를 모니터링할 수 있습니다. 프로세스 수집을 활성화하려면 작업 정의에 [`PidMode` 파라미터][33]를 추가하고 다음과 같이 `task`로 설정하세요.

```json
"pidMode": "task"
```

## 문제 해결 {#troubleshooting}

도움이 필요하신가요? [Datadog 지원팀][26]에 문의하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/getting-started-managed-instances.html
[5]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /ko/resources/json/datadog-agent-ecs-managed-instances-daemon.json
[9]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[10]: /ko/getting_started/site/
[14]: https://docs.datadoghq.com/ko/integrations/ecs_fargate/?tab=awscli#log-collection
[17]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/java?tab=containers#automatic-instrumentation
[18]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/python?tab=containers#instrument-your-application
[19]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#instrument-your-application
[20]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/go/?tab=containers#activate-go-integrations-to-create-spans
[21]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/nodejs?tab=containers#instrument-your-application
[22]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/php?tab=containers#automatic-instrumentation
[23]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/cpp?tab=containers#instrument-your-application
[24]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/dotnet-core?tab=containers#custom-instrumentation
[25]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/dotnet-framework?tab=containers#custom-instrumentation
[26]: https://docs.datadoghq.com/ko/help/
[27]: #set-up-additional-datadog-agent-features
[28]: https://docs.datadoghq.com/ko/integrations/redis/?tab=ecs
[29]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ManagedInstances.html
[30]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[31]: /ko/resources/json/datadog-agent-ecs-managed-instances-sidecar.json
[32]: /ko/process
[33]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_pidmode
[34]: #setup
[35]: /ko/resources/json/datadog-agent-ecs-managed-instances-daemon-sysprobe.json
[36]: /ko/network_monitoring/cloud_network_monitoring/
[37]: /ko/resources/json/datadog-agent-ecs-managed-instances-daemon-apm.json