---
aliases:
- /kr/integrations/amazon_ecs/
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
- link: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
  tag: 블로그
  text: Amazon ECS Anywhere 지원 발표
kind: 설명서
title: Amazon ECS
---

## 개요

아마존 ECS는 도커(Docker) 컨테이너를 지원하며 확장성과 성능이 뛰어난 컨테이너 오케스트레이션 서비스입니다. Datadog Agent와 함께 사용하면 클러스터 내 모든 EC2 인스턴스의 ECS 컨테이너와 작업을 모니터링할 수 있습니다.

이번 페이지에서는 [Datadog 컨테이너 Agent v6][1]을 사용한 Amazon ECS의 설정법을 안내해드리겠습니다. 다른 구성 옵션이 필요하신 분은 다음을 참조해주세요.

- [Amazon ECS용 Datadog 컨테이너 Agent v5 구성][2]
- [Datadog 호스트 Agent와 자동탐지 구성][3]

**참조**: Fargate에서 ECS를 설정할 경우 [Amazon ECS on AWS Fargate][4] 가이드를 참조하시기 바랍니다.** AWS Batch는 지원되지 않습니다.

## 구성

구성을 시작하려면 ECS 클러스터 내의 모든 EC2 인스턴스에서 [Datadog Agent][5]를 실행하세요. 실행 중인 EC2 Container Service 클러스터가 구성되지 않은 경우 [ECS 문서 내의 시작하기 섹션][6]을 참조하여 클러스터를 설정하시기 바랍니다. 설정을 마친 후 아래의 구성 절차를 따라주세요.

1. [ECS 작업 만들기 및 추가하기](#create-an-ecs-task)
2. [IAM 정책 만들기 및 수정하기](#create-or-modify-your-iam-policy)
3. [Daemon 서비스로 Datadog Agent  스케줄링하기](#run-the-agent-as-a-daemon-service)
4. **선택 사항**: [프로세스 수집 설정하기](#process-collection)
5. **선택 사항**: [네트워크 성능 모니터링 수집 설정하기](#network-performance-monitoring-collection)

**참조:** ECS 및 도커(Docker)를 함께 사용하여 Datadog의 [자동탐지][7]를 실행하면 환경에서 실행 중인 작업을 자동으로 탐지하고 모니터링할 수 있습니다.

### ECS 작업 만들기

이 작업을 통해 Datadog 컨테이너가 부팅됩니다. 설정을 변경하려면 작업 정의를 업데이트하세요. [방법은 가이드 뒷부분에서 자세히 알려드리겠습니다](#create-or-modify-your-iam-policy).

[APM][8], [DogStatsD][9], 또는 [로그 관리][10]을 사용하는 경우는 작업 정의에서 적절한 플래그를 설정합니다.

  - APM을 사용하는 경우는 다운스트림 컨테이너가 트레이스를 Agent 서비스에 전달할 수 있도록 `portMappings`를 설정합니다. APM은 포트 `8126`의 `TCP`를 사용하여 트레이스를 받습니다. 따라서 이를 작업 정의에서 `hostPort`로 설정하세요.

**참조**: 다른 컨테이너에서 트레이스를 수집하려면 `DD_APM_NON_LOCAL_TRAFFIC` 환경 변수를 `true`로 설정해야 합니다. 더 자세히 알아보고 싶으신 분은 [APM과 컨테이너][11] 가이드를 확인해주세요.

  - DogStatsD를 사용한다면 작업 정의에서 `hostPort`를 포트 `8125`의 `UDP`로 설정하세요.

**참조**: 다른 컨테이너에서 DogStatsD 메트릭을 수집하려면 `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` 환경 변수를 `true`로 설정해야 합니다.

  - 로그 관리를 사용한다면 [로그 수집 설명서][10]를 참조하시기 바랍니다.

EC2 인스턴스에서 보안 그룹 설정을 다시 한번 확인합니다. 포트가 비공개인지 살펴보세요. Datadog에서는 개인 IP 주소를 사용하여 컨테이너에서 Agent로 트레이스를 전달합니다.

작업 구성은 [AWS CLI 도구][12]나 아마존 웹 콘솔에서도 설정할 수 있습니다.

{{< tabs >}}
{{< tab "AWS CLI" >}}

1. 오리지널 아마존 리눅스 1 AMI를 사용하는 경우 리눅스(Linux) 컨테이너에서 [datadog-agent-ecs.json][1] ([datadog-agent-ecs1.json][2]를 다운로드하세요. 윈도우즈(Windows)의 경우는 [datadog-agent-ecs-win.json][3]를 다운로드합니다.
2. `datadog-agent-ecs.json`을 수정하고 계정의 [Datadog API 키][4]로 `<YOUR_DATADOG_API_KEY>`를 설정하세요.
3. 선택 사항 - 다음을 ECS 작업 정의에 추가해 [ECS Anywhere 클러스터][5]에 배포할 수 있습니다.

    ```json
    "requiresCompatibilities": ["EXTERNAL"]
    ```

4. 선택 사항 - Agent 건전성 점검을 추가할 수 있습니다.

   ECS 작업 정의에 다음을 추가하여 Agent 건전성 점검을 생성하세요.

    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```

5. 선택 사항 - Datadog 유럽 사이트를 이용하는 경우 `datadog-agent-ecs.json`를 수정하고 `DD_SITE`를 `DD_SITE:datadoghq.eu`로 설정하세요.
6. 선택 사항 - [로그 수집][6]을 참조해 로그 수집을 활성화하세요.
7. 선택 사항 - [프로세스 수집](#process-collection)을 참조해 프로세스 수집을 활성화하세요.
8. 선택 사항 - [트레이스 수집(APM)][7]을 수집해 트레이스 수집을 활성화하세요.
9. 선택 사항 - [네트워크 성능 모니터링(NPM)](#network-performance-monitoring-collection)을 참조해 네트워크 수집을 활성화하세요.
10. 다음 명령어를 실행하세요.

```bash
aws ecs register-task-definition --cli-input-json <path to datadog-agent-ecs.json>
```

[1]: /resources/json/datadog-agent-ecs.json
[2]: /resources/json/datadog-agent-ecs1.json
[3]: /resources/json/datadog-agent-ecs-win.json
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
[6]: /kr/agent/amazon_ecs/logs/
[7]: /kr/agent/amazon_ecs/apm/
{{< /tab >}}
{{< tab "웹 UI" >}}

1. AWS 콘솔에 로그인하고 EC2 컨테이너 서비스 섹션으로 이동합니다.
2. Datadog를 추가할 클러스터를 클릭합니다.
3. 왼쪽의 **Task Definitions*를 클릭하고 **Create new Task Definition* 버튼을 클릭합니다.
   ECS Anywhere 클러스터에서 Agent 작업을 배포할 예정인 경우 부팅 유형 단계에서 "External"을 선택합니다.
4. **Task Definition Name**을 입력합니다(예: `datadog-agent-task`).
5. **Add volume** 링크를 클릭합니다.
6. **Name**에 `docker_sock`이라고 입력합니다. **SourcePath**에는 리눅스의 경우 `/var/run/docker.sock`를, 윈도우즈의 경우 `\\.\pipe\docker_engine`을 입력한 후 **Add*를 클릭합니다.
7. 리눅스에 한하여 볼륨을 하나 더 추가하고 이름을 `proc`, 소스 경로를 `/proc/`으로 설정합니다.
8. 리눅스에 한하여 볼륨을 하나 더 추가하고 이름을 `cgroup`, 소스 경로를 `/sys/fs/cgroup/`라고 설정합니다. 오리지널 아마존 리눅스 1 AMI 를 사용한다면 `/cgroup/`로 설정하세요.
9. 커다란 **Add container** 버튼을 클릭하세요.
10. **Container name**에 `datadog-agent`를 입력합니다.
11. **Image**에 `gcr.io/datadoghq/agent:latest`를 입력합니다.
12. **Maximum memory**에 `256`이라고 입력합니다. **참조**: 리소스를 많이 사용하실 경우에는 메모리 상한선을 올려야 합니다.
13. **Advanced container configuration** 섹션까지 스크롤을 내리고 **CPU units**에 `100`이라고 입력합니다.
**참조**: 윈도우즈의 경우 **CPU units**에 최소 `512` 이상을 입력해야 `Timeout while starting the service` 오류를 예방할 수 있습니다.
14. **Env Variables**에 **Key** `DD_API_KEY`를 추가하고 값에 Datadog API 키를 입력합니다. *이러한 시크릿을 S3에 편리하게 보관하고 싶다면 [ECS 설정 가이드][1] 를 참조하세요.*
15. `DD_TAGS` 키를 사용하여 추가할 태그에 다른 환경 변수를 추가합니다.
16. **Storage and Logging** 섹션까지 스크롤을 내립니다.
17. **Mount points**에서 **docker_sock** 소스 볼륨을 선택하고 컨테이너 경로에 리눅스의 경우 `/var/run/docker.sock`를, 윈도우즈의 경우 `\\.\pipe\docker_engine`을 입력합니다. **Read only** 체크박스를 선택합니다.
18. 리눅스에 한하여 **proc**에 별도의 마운트 포인트를 추가하고 컨테이너 경로에 `/host/proc/`이라고 입력합니다. **Read only** 체크박스를 선택합니다.
19. 리눅스에 한하여 세 번째 마운트 포인트를 추가한 다음 **cgroup**을 선택하고 컨테이너 경로에 `/host/sys/fs/cgroup`이라고 입력합니다. **Read only** 체크박스를 선택합니다.

**참조**: Datadog 작업 정의에서 CPU를 10개 사용하도록 설정하면 `service:datadog-agent`의 `aws.ecs.cpuutilization`이 1000%로 표시될 수 있습니다. 이는 AWS가 CPU 사용률을 표시할 때 발생하는 독특한 현상입니다. CPU 개수를 늘리면 그래프 왜곡을 방지할 수 있습니다.

[1]: http://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-agent-config.html#ecs-config-s3
{{< /tab >}}
{{< /tabs >}}

### IAM 정책 만들기 및 수정하기

아마존 ECS 메트릭을 수집하기 위해 다음 권한을 [Datadog IAM 정책] [13]에 허용합니다. ECS 정책의 상세한 정보는 [AWS 웹사이트][14] 가이드를 참조하시기 바랍니다.

| AWS 권한 허용                   | 설명                                                   |
| -------------------------------- | ------------------------------------------------------------- |
| `ecs:ListClusters`               | 기존 클러스터 목록을 반환합니다.                          |
| `ecs:ListContainerInstances`     | 특정 클러스터의 컨테이너 인스턴스 목록을 반환합니다. |
| `ecs:ListServices`               | 특정 클러스터에서 실행하는 서비스를 나열합니다.   |
| `ecs:DescribeContainerInstances` | Amazon ECS 컨테이너 인스턴스를 설명합니다.                     |

### Agent를 Daemon 서비스로 실행하기

Datadog Agent는 각 EC2 인스턴스 상의 한 컨테이너에서 실행하는 것이 이상적입니다. Datadog Agent를 [Daemon 서비스][15]로 실행하는 방법이 가장 간단합니다.

#### Datadog의 ECS 작업을 사용하여 AWS에서 Daemon 서비스를 스케줄링하기

1. AWS 콘솔에 로그인 후 ECS 클러스터 페이지로 이동합니다. Agent를 실행할 클러스터를 클릭합니다.
2. 서비스에서 **Create** 버튼을 클릭해 새 서비스를 생성합니다.
3. 부팅 유형으로 EC2를 선택하고, 이전에 생성한 작업 정의를 선택합니다.
4. 서비스 유형으로 `DAEMON`을 선택하고 서비스 이름을 입력합니다. **Next**를 클릭합니다.
5. 서비스는 각 인스턴스에서 한 번만 실행되므로 로드 밸런서(load balancer)가 필요하지 않습니다. 아무것도 선택하지 않고 **Next**를 클릭하세요.
6. Daemon 서비스에는 자동 확장(Auto Scaling)이 필요하지 않습니다. **Next Step**을 클릭하고 **Create Service**를 선택하세요.

### 프로세스 수집

컨테이너 프로세스 정보를 수집하여 Datadog에 전송하는 방법은 다음과 같습니다.

{{< tabs >}}
{{< tab "리눅스(Linux)" >}}

1. [앞서 설명한 절차](#setup)에 따라 Datadog Agent를 설치합니다.
2. 오리지널 아마존 리눅스 AMI를 사용하는 경우 [datadog-agent-ecs.json][1] 파일을([datadog-agent-ecs1.json][2] 다음 설정으로 업데이트합니다.

```json
{
  "containerDefinitions": [
   {
      (...)
      "mountPoints": [
        {
          (...)
        },
        {
          "containerPath": "/var/run/docker.sock",
          "sourceVolume": "docker_sock",
          "readOnly": true
        },
        {
        (...)
        }
      ],
      "environment": [
        (...)
        {
          "name": "DD_API_KEY",
          "value": "<YOUR_DATADOG_API_KEY>"
        },
        {
          "name": "DD_PROCESS_AGENT_ENABLED",
          "value": "true"
        }
      ]
    }
  ],
  "volumes": [
    {
      "host": {
        "sourcePath": "/var/run/docker.sock"
      },
      "name": "docker_sock"
    },
    (...)
  ],
  "family": "datadog-agent-task"
}
```

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[2]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
{{< /tab >}}
{{< tab "윈도우즈(Windows)" >}}

1. [앞서 설명한 절차](#setup)에 따라 Datadog Agent를 설치합니다.
2. [datadog-agent-ecs-win.json][1] 파일을 다음의 설정으로 업데이트합니다.

```json
{
  "containerDefinitions": [
    (...)
      "environment": [
        (...)
        {
          "name": "DD_PROCESS_AGENT_ENABLED",
          "value": "true"
        }
      ]
    }
  ],
  "family": "datadog-agent-task"
}
```

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-win.json
{{< /tab >}}
{{< /tabs >}}

### 네트워크 성능 모니터링(NPM) 수집

**이 기능은 리눅스에서만 지원됩니다**

 1. [앞서 설명한 절차](#setup)에 따라 Datadog Agent를 설치합니다.
  - 처음 설치한 경우에는 `datadog-agent-ecs.json` 파일이 있습니다. 오리지널 아마존 리눅스 AMI를 사용한다면  [datadog-agent-sysprobe-ecs.json][16] ([datadog-agent-sysprobe-ecs1.json][17]을 사용할 수 있습니다. 사용 절차는 [위에서 안내한 절차](#setup)를 따라주세요.**참조**: AWS UI에서는`linuxParameters`를 추가할 수 없으므로, 첫 NPM 설정 시 CLI가 필요합니다.
 2. 작업 정의가 이미 존재한다면 다음 설정으로 [datagent-ecs.json][18] 파일을 업데이트합니다. 오리지널 아마존 리눅스 AMI를 사용한다면 [datadog-agent-ecs1.json][19]을 업데이트하세요.

 ```json
 {
   "containerDefinitions": [
     (...)
       "mountPoints": [
         (...)
         {
           "containerPath": "/sys/kernel/debug",
           "sourceVolume": "debug"
         },
         (...)
       ],
       "environment": [
         (...)
         {
           "name": "DD_SYSTEM_PROBE_ENABLED",
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
   ],
   "requiresCompatibilities": [
    "EC2"
   ],
   "volumes": [
     (...)
     {
      "host": {
        "sourcePath": "/sys/kernel/debug"
      },
      "name": "debug"
     },
     (...)
   ],
   "family": "datadog-agent-task"
 }
 ```

## AWSVPC 모드

Agent 버전 6.10 이상인 경우, 적용 가능한 컨테이너에서 `awsvpc` 모드가 지원됩니다. 단, 호스트 인스턴스의 보안 그룹이 관련된 포트 상의 적용 가능한 컨테이너에 도달할 수 있도록 설정되었다고 전제합니다.

Agent를 `awsvpc` 모드로 실행할 수는 있습니다만, 권장하지는 않습니다. Agent가 DogStatsD 메트릭이나 APM 트레이스에 도달하기 위한 ENI IP를 가져오기가 어려울 수 있기 때문입니다.

대신에, 브리지 모드에서 Agent를 포트 매핑(port mapping)과 함께 실행하면 [메타데이터 서버를 통해 호스트 IP][8]를 간단하게 가져올 수 있습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][20]에 문의해주세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/agent
[2]: https://docs.datadoghq.com/kr/integrations/faq/agent-5-amazon-ecs/
[3]: https://docs.datadoghq.com/kr/agent/docker/integrations/?tab=docker
[4]: https://docs.datadoghq.com/kr/integrations/ecs_fargate/
[5]: https://gallery.ecr.aws/datadog/agent
[6]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted_EC2.html
[7]: https://docs.datadoghq.com/kr/agent/autodiscovery/
[8]: /kr/agent/amazon_ecs/apm/
[9]: /kr/developers/dogstatsd/
[10]: /kr/agent/amazon_ecs/logs/
[11]: https://docs.datadoghq.com/kr/tracing/setup/docker/
[12]: https://aws.amazon.com/cli
[13]: https://docs.datadoghq.com/kr/integrations/amazon_web_services/#datadog-aws-iam-policy
[14]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_amazonelasticcontainerservice.html
[15]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[16]: https://docs.datadoghq.com/resources/json/datadog-agent-sysprobe-ecs.json
[17]: https://docs.datadoghq.com/resources/json/datadog-agent-sysprobe-ecs1.json
[18]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[19]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json
[20]: https://docs.datadoghq.com/kr/help/