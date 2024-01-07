---
aliases:
- /ko/integrations/amazon_ecs/
- /ko/agent/amazon_ecs/
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

이 페이지에서는 Datadog 컨테이너 에이전트를 사용한 Amazon ECS의 설정법에 대해 다룹니다. 다른 설정이 필요하시면 다음 내용을 참조해 주세요.

- [Amazon ECS용 Datadog 컨테이너 에이전트 v5 설정][1]
- [자동탐지를 이용한 Datadog 호스트 에이전트 설정][2]

**참조**: **Fargate에서 ECS**설정을 원하시면 [AWS Fargate에서의 Amazon ECS][3] 가이드를 참조하시기 바랍니다. EC2 인스턴스에 배포된 Datadog 에이전트 컨테이너는 Fargate 작업을 모니터링할 수 없습니다. 또한, AWS Batch는 지원되지 않습니다.

## 설정

ECS의 Datadog 에이전트는 ECS 클러스터 내의 모든 EC2 인스턴스에 한 번씩 컨테이너로 배포되어야 합니다. 이를 위해 Datadog 에이전트 컨테이너에 대한 작업 정의를 생성하고 Daemon 서비스로 배포합니다. 그런 다음 각 Datadog 에이전트 컨테이너는 각각의 EC2 인스턴스에서 다른 컨테이너를 모니터링합니다.

EC2 컨테이너 서비스 클러스터가 설정되어 있지 않은 경우 [ECS 설명서의 '시작하기'][4]를 참조하셔서 클러스터를 설정하세요. 설정이 끝난 후에는 다음의 지침대로 실행하세요.

1. [ECS 작업 정의 생성 및 추가하기](#create-an-ecs-task)
2. [Daemon 서비스로 Datadog Agent  스케줄링하기](#run-the-agent-as-a-daemon-service)
3. **선택 사항**[추가적인 Datadog 에이전트 기능 설정하기](#setup-additional-agent-features)

**참조:** ECS 및 도커(Docker)와 함께  Datadog의 [자동탐지][7]를 실행하면 환경에서 실행 중인 작업을 자동으로 탐지하고 모니터링할 수 있습니다.

### ECS 작업 만들기

작업 정의는 필수적인 설정과 함께 Datadog 에이전트 컨테이너를 시작합니다. 에이전트 설정을 수정해야 하는 경우 작업 정의를 업데이트하고 필요에 따라 Daemon 서비스를 재배치하시면 됩니다.  [AWS CLI 도구][9] 또는 Amazon Web Console을 사용하여 작업 정의를 설정할 수 있습니다.

다음 샘플은 핵심 인프라스트럭처 모니터링을 위한 최소한의 설정입니다. 이외에도 여러 기능을 가진 작업 정의 샘플은 [추가적인 에이전트 기능 설정](#setup-additional-agent-features)에서 제공됩니다.

#### 작업 정의 파일 관리하기

1. Linux 컨테이너인 경우  [datadog-agent-ecs.json][20]을 다운로드하세요.
    1. Amazon Linux 1 AMI 원본인 경우 [datadog-agent-ecs1.json][21]을 사용하세요.
    2. 윈도우즈(Windows)인 경우 [datadog-agent-ecs-win.json][22] 을 사용하세요.

2. 기본 작업 정의 파일 편집하기
    1. 계정의 [Datadog API 키][4]로 `<YOUR_DATADOG_API_KEY>`를 설정하세요.
    2. `DD_SITE`환경 변수를 {{< region-param key="dd_site" code="true" >}}로 설정하세요.

       **참고**: `DD_SITE` 환경 변수가 명확하게 설정되어 있지 않으면 `US``datadoghq.com` 사이트로 디폴트 됩니다. 다른 사이트(`EU`,`US3`,`US1-FED`)를 사용하고 있다면 유효하지 않은 API 키 메시지가 발생할 수 있으므로 설정하지 마시기 바랍니다. 사용하고 있는 사이트에 대한 설명서는 [사이트 선택기 설명서][13]에서 확인하실 수 있습니다.

3. 선택 사항 - 다음을 ECS 작업 정의에 추가하여 [ECS Anywhere 클러스터][5]에 배포할 수 있습니다.
    ```json
    "requiresCompatibilities": ["EXTERNAL"]
    ```

4. 선택 사항 - ECS 작업 정의에 에이전트 헬스 체크를 추가하세요.
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```

이러한 모든 예에 대해 [AWS 시크릿 매니저에 저장된 "일반 텍스트" 암호의 ARN]을 참조하여 `DD_API_KEY`환경 변수를 덧붙일 수 있습니다[16]. 또한, 환경 변수`DD_TAGS`에 따라 태그를 추가할 수도 있습니다.

#### 작업 정의 등록하기

{{< tabs >}}
{{% tab "AWS CLI" %}}
작업 정의 파일이 생성되면 다음 명령을 실행하여 AWS에 등록할 수 있습니다.

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs.json>
```
{{% /tab %}}
{{% tab "Web UI" %}}
작업 정의 파일이 생성되면 AWS 콘솔에 로그인한 후 등록할 수 있습니다.
1. AWS 콘솔에 로그인한 후 Elastic 컨테이너 서비스 섹션으로 이동합니다.
2. 왼쪽의 **Task Definitions*를 클릭하고 **Create new Task Definition* 버튼을 클릭합니다.
3. 시작 유형으로 "EC2"를 선택하거나 ECS Anywhere 클러스터에 에이전트 작업을 배포하려는 경우 "External"을 선택하세요.
4. "작업 및 컨테이너 정의 설정"페이지가 나타나면 아래로 스크롤 하여 **JSON을 통해 설정**을 선택합니다. 파일에 있는 설정을 복사 및 붙여넣기 할 수 있습니다.
5. JSON 탭에서 **저장**을 클릭하세요.
6. 여기에서 페이지에 대한 추가적인 변경을 하거나 **JSON을 통해 설정** 프로세스를 반복하여 변경할 수 있습니다.
7. 이 작업 정의를 등록하려면 아래의 **생성**을 클릭하세요.

{{% /tab %}}
{{< /tabs >}}


### Agent를 Daemon 서비스로 실행하기

이상적으로는 각 EC2 인스턴스에 하나의 실행 중인 Datadog 에이전트 컨테이너가 필요합니다. 가장 쉬운 방법은 Datadog 에이전트 작업 정의를  [Daemon 서비스][10]로 실행하는 것입니다.

#### Datadog의 ECS 작업을 사용하여 AWS에서 Daemon 서비스를 스케줄링하기

1. AWS 콘솔에 로그인 후 ECS 클러스터 페이지로 이동합니다. Agent를 실행할 클러스터를 클릭합니다.
2. 서비스에서 **Create** 버튼을 클릭해 새 서비스를 생성합니다.
3. 부팅 유형으로 EC2를 선택하고, 이전에 생성한 작업 정의를 선택합니다.
4. 서비스 유형으로 `DAEMON`을 선택하고 서비스 이름을 입력합니다. **Next**를 클릭합니다.
5. 서비스는 각 인스턴스에서 한 번만 실행되므로 로드 밸런서(load balancer)가 필요하지 않습니다. 아무것도 선택하지 않고 **Next**를 클릭하세요.
6. Daemon 서비스에는 자동 확장(Auto Scaling)이 필요하지 않습니다. **Next Step**을 클릭하고 **Create Service**를 선택하세요.

### 추가적인 에이전트 기능 설정하기

위에 제공된 초기 작업 정의는 상당히 최소화된 것입니다. 이 작업 정의는 기본 설정이 되어 있는 에이전트 컨테이너를 배포하여 ECS 클러스터의 컨테이너에 대한 핵심 메트릭을 수집합니다. 또한 이 에이전트는 해당 컨테이너에서 검색된 [도커(Docker) 자동탐지 라벨][12]를 기반으로 에이전트 통합을 실행할 수 있습니다.

사용한다면
- 애플리케이션 성능 모니터링(APM): [애플리케이션 성능 모니터링 설치 설명서][18]와 샘플 [datadog-agent-ecs-apm.json][23]을 찾아보세요.
- 로그 관리: [로그 수집 설명서][7] 및 샘플 [datadog-agent-ecs-logs.json][24]을 참조하세요.

#### DogStatsD

[DogStatsD][8]를 사용하는 경우 DataDog 에이전트의 컨테이너 정의에 8125/udp에 대한 호스트 포트 매핑을 추가합니다:
```json
"portMappings": [
{
"hostPort": 8125,
"protocol": "udp",
"containerPort": 8125
}
]
```

포트 매핑과 더불어 환경 변수 `DD_DOGSTATSD_NON_LOCAL_TRAFFIC`를 `true`로 설정하세요.

이 설정은 DogStatsD 트래픽을 애플리케이션 컨테이너에서 호스트 및 호스트 포트를 통해 DataDog 에이전트 컨테이너로 라우팅할 수 있도록 합니다. 그러나 애플리케이션 컨테이너는 이 트래픽에 대해 호스트의 개인 IP 주소를 사용해야 합니다. 이는 인스턴스 메타데이터 서비스(IMDS)에서 검색 가능한 EC2 인스턴스의 사설 IP 주소로 환경 변수`DD_AGENT_HOST`를 설정하여 활성화할 수 있습니다. 또는 초기화 중에 코드에서 설정할 수 있습니다. DogStatsD 실행은 애플리케이션 성능 모니터링(APM)과 동일합니다. [추적 에이전트 종점 설정][17]에서 예시를 참고하시기 바랍니다.

EC2 인스턴스의 보안 그룹 설정이 APM 및 DogStatsD의 포트를 공개적으로 노출하지 않도록 해야 합니다.

#### 프로세스 수집

실시간 컨테이너 데이터는 Datadog 에이전트 컨테이너에 의해 자동으로 수집됩니다. 모든 컨테이너에 대한 실시간 프로세스 정보를 수집하여 Datadog로 보내려면 작업 정의를 환경 변수로 업데이트합니다:

```json
{
"name": "DD_PROCESS_AGENT_ENABLED",
"value": "true"
}
```

#### 네트워크 성능 모니터링(NPM) 수집

**이 기능은 리눅스에서만 지원됩니다**

1. Datadog 에이전트를 설치하기 위해 [위의 지침](#create-an-ecs-task) 대로 실행해 주세요.
   - 처음 설치하는 경우 [datadog-agent-sysprobe-ecs.json][25] 파일을, Amazon Linux AMI 원본을 사용하는 경우 [datadog-agent-sysprobe-ecs1.json][26])를 [위의 지침](#managing-the-task-definition-file)과 함께 사용합니다. **참조**: AWS UI에 `linuxParameters`를 추가할 수 없으므로 초기 NPM 설정에는 CLI가 필요합니다.
2. 기존 작업 정의가 있다면 [datadog-agent-ecs.json][20]와  ([datadog-agent-ecs1.json][21] 파일을 업데이트해 주세요. Amazone Linux AMI 원본을 사용하는 경우에는 다음대로 설정해 주세요.

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

Agent v6.10+인 경우 호스트 인스턴스의 보안 그룹이 관련 포트에 있는 응용 컨테이너에 도달할 수 있도록 설정되어 있다면 응용 컨테이너에 대해 `awsvpc`모드가 지원됩니다.

Agent를 `awsvpc` 모드로 실행할 수는 있습니다만, 권장하지는 않습니다. Agent가 DogStatsD 메트릭이나 APM 트레이스에 도달하기 위한 ENI IP를 가져오기가 어려울 수 있기 때문입니다.

대신 브리지 모드에서 에이전트를 포트 매핑과 함께 실행하면 [메타데이터 서버를 통해 호스트 IP][8]를 더욱 쉽게 가져올 수 있습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의해 주세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/faq/agent-5-amazon-ecs/
[2]: https://docs.datadoghq.com/ko/agent/docker/integrations/?tab=docker
[3]: https://docs.datadoghq.com/ko/integrations/ecs_fargate/
[4]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_GetStarted_EC2.html
[5]: https://docs.datadoghq.com/ko/agent/autodiscovery/
[6]: /ko/containers/amazon_ecs/apm/
[7]: /ko/containers/amazon_ecs/logs/
[8]: /ko/developers/dogstatsd/?tab=containeragent
[9]: https://aws.amazon.com/cli
[10]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[11]: https://docs.datadoghq.com/ko/help/
[12]: https://docs.datadoghq.com/ko/containers/docker/integrations/?tab=docker
[13]: /ko/getting_started/site/
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
[16]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[17]: /ko/containers/amazon_ecs/apm/?tab=ec2metadataendpoint#configure-the-trace-agent-endpoint
[18]: https://docs.datadoghq.com/ko/containers/amazon_ecs/apm
[20]: /resources/json/datadog-agent-ecs.json
[21]: /resources/json/datadog-agent-ecs1.json
[22]: /resources/json/datadog-agent-ecs-win.json
[23]: /resources/json/datadog-agent-ecs-apm.json
[24]: /resources/json/datadog-agent-ecs-logs.json
[25]: /resources/json/datadog-agent-sysprobe-ecs.json
[26]: /resources/json/datadog-agent-sysprobe-ecs1.json
