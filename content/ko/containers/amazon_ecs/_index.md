---
algolia:
  tags:
  - ecs
aliases:
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
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: 블로그
  text: Datadog 클라우드 비용 관리를 통해 Kubernetes 및 ECS 지출 내역을 확인하세요.
kind: 설명서
title: Amazon ECS
---

## 개요

아마존 ECS는 도커(Docker) 컨테이너를 지원하며 확장성과 성능이 뛰어난 컨테이너 오케스트레이션 서비스입니다. Datadog Agent와 함께 사용하면 클러스터 내 모든 EC2 인스턴스의 ECS 컨테이너와 작업을 모니터링할 수 있습니다.

<div class="alert alert-info">
Fargate에서 <strong>ECS를 모니터링하려면</strong>, <a href="/integrations/ecs_fargate/">AWS Fargate 기반 Amazon ECS</a>를 참조하세요.
</div>

## 설정

ECS 컨테이너 및 작업을 모니터링하려면 Datadog 에이전트를 ECS 클러스터의 **각 EC2 인스턴스에 한 번** 컨테이너로 배포합니다. Datadog 에이전트 컨테이너에 대한 작업 정의를 생성하고 이를 데몬 서비스로 배포하면 됩니다. 그런 다음 각 Datadog 에이전트 컨테이너는 해당 EC2 인스턴스의 다른 컨테이너를 모니터링합니다.

다음 지침에서는 EC2 클러스터를 설정했다고 가정합니다. [클러스터 생성에 대한 Amazon ECS 설명서][4]를 참조하세요.

1. [ECS 작업 정의 생성 및 추가][27]
2. [Datadog 에이전트를 데몬 서비스로 예약][28]
3. [선택 사항][추가 Datadog 에이전트 기능 설정][29]

**참조:** ECS 및 도커(Docker)와 함께  Datadog의 [자동탐지][7]를 실행하면 환경에서 실행 중인 작업을 자동으로 탐지하고 모니터링할 수 있습니다.

### ECS 작업 정의 생성

이 [ECS 작업 정의][30]는 필요한 설정으로 Datadog 에이전트 컨테이너를 시작합니다. 에이전트 설정을 수정해야 하는 경우 이 작업 정의를 업데이트하고 데몬 서비스를 다시 배포합니다. AWS Management Console 또는 [AWS CLI][9]를 사용하여 이 작업 정의를 설정할 수 있습니다.

다음 샘플은 핵심 인프라스트럭처 모니터링을 위한 최소한의 설정입니다. 이외에도 여러 기능을 가진 작업 정의 샘플은 [추가적인 에이전트 기능 설정](#setup-additional-agent-features)에서 제공됩니다.

#### 작업 정의 파일 생성 및 관리

1. 리눅스(Linux) 컨테이너의 경우 [datadog-agent-ecs.json][20]을 다운로드하세요.
    - 아마존 리눅스 1(AL1, 이전 아마존 리눅스 AMI)을 사용하는 경우 [datadog-agent-ecs1.json][21]을 사용하세요.
    - Windows를 사용하는 경우 [datadog-agent-ecs-win.json][22]을 사용하세요.

   <div class="alert alert-info">
   These files provide minimal configuration for core infrastructure monitoring. For more sample task definition files with various features enabled, see the <a href="#set-up-additional-agent-features">Set up additional Agent features</a> section on this page.
   </div>
2. 기본 작업 정의 파일 편집
    - `<YOUR_DATADOG_API_KEY>`를 계정의 [Datadog API 키][14]로 대체하여 `DD_API_KEY` 환경 변수를 설정합니다. 또는 [AWS Secrets Manager][16]에 저장된 비밀의 ARN을 입력할 수도 있습니다.
    - `DD_SITE` 환경 변수를 [Datadog 사이트][13]로 설정합니다. 귀하의 사이트는 {{< region-param key="dd_site" code="true" >}}입니다.

      <div class="alert alert-info">
      If <code>DD_SITE</code> is not set, it defaults to the <code>US1</code> site, <code>datadoghq.com</code>.
      </div>
    - 선택적으로 `DD_TAGS` 환경 변수를 추가하여 태그 을 추가로 지정합니다.

3. (선택 사항) [ECS Anywhere 클러스터][15]에 배포하려면 ECS 작업 정의에 다음 줄을 추가합니다:
    ```json
    "requiresCompatibilities": ["EXTERNAL"]
    ```

4. (선택 사항) 에이전트 상태 점검 를 추가하려면 ECS 작업 정의에 다음 줄을 추가합니다:
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```


#### 작업 정의 등록

{{< tabs >}}
{{% tab "AWS CLI" %}}
작업 정의 파일을 생성한 후 다음 명령을 실행하여 AWS에 파일을 등록합니다.

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs.json>
```
{{% /tab %}}
{{% tab "Web UI" %}}
작업 정의 파일이 있으면 AWS 콘솔을 사용하여 파일을 등록하세요.
1. AWS 콘솔에 로그인한 후 Elastic 컨테이너 서비스 섹션으로 이동합니다.
2. 탐색 창에서 **작업 정의**를 선택합니다. 새 작업 정의 생성** 메뉴에서 **JSON으로 새 작업 정의 생성**을 선택합니다.
3. JSON 편집기 상자에 작업 정의 파일의 내용을 붙여넣습니다.
4. **생성**을 선택합니다.

{{% /tab %}}
{{< /tabs >}}


### Agent를 Daemon 서비스로 실행하기

각 EC2 인스턴스에서 하나의 Datadog 에이전트 컨테이너를 실행하려면 Datadog 에이전트 작업 정의를 [데몬 서비스][10]로 실행합니다.

#### Datadog의 ECS 작업을 사용하여 AWS에서 Daemon 서비스를 스케줄링하기

1. 로그를 남기다 AWS 콘솔에 접속하여 ECS 섹션으로 이동합니다. **클러스터** 페이지에서 에이전트를 실행하는 클러스터를 선택합니다.
2. 클러스터의 **서비스** 탭에서 **생성**을 선택합니다.
3. **배포 설정**에서 **서비스 유형**에 대해 **데몬**을 선택합니다.
3.  로드밸런싱 또는 자동 스케일링을 설정할 필요가 없습니다.
4. **다음 단계**를 클릭한 다음 **서비스 생성**을 클릭합니다.

### 에이전트 기능 추가 설정

이전 섹션에서 제공된 작업 정의 파일은 최소 수준입니다. 이 파일은 ECS 클러스터의 컨테이너에 대한 핵심 메트릭을 수집하기 위해 기본 설정을 사용해 에이전트 컨테이너를 배포합니다. 에이전트는 또한 컨테이너에서 발견된 도커(Docker) 레이블[12]을 기반으로 에이전트 통합을 실행할 수 있습니다.

추가 기능:

#### APM
[애플리케이션 성능 모니터링 설치 문서][6] 및 샘플 [datadog-agent-ecs-apm.json][23]을 참조하세요.

#### 로그 관리
[로그 수집 설명서][7]와 샘플 [datadog-agent-ecs-logs.json][24]를 참조하세요.

#### DogStatsD

[DogStatsD][8]을 사용하는 경우 Datadog 에이전트의 컨테이너 정의를 편집하여 호스트 포트 매핑을 8125/udp에 추가하고 환경 변수 `DD_DOGSTATSD_NON_LOCAL_TRAFFIC`를 `true`로 설정합니다.

{{< highlight json "hl_lines=6-12 23-24" >}}
{
 "containerDefinitions": [
  {
   "name": "datadog-agent",
   (...)
   "portMappings": [
     {
      "hostPort": 8125,
      "protocol": "udp",
      "containerPort": 8125
     }
   ],
   "environment" : [
     {
       "name": "DD_API_KEY",
       "value": "<YOUR_DATADOG_API_KEY>"
     },
     {
       "name": "DD_SITE",
       "value": "datadoghq.com"
     },
     {
       "name": "DD_DOGSTATSD_NON_LOCAL_TRAFFIC",
       "value": "true"
     }
   ]
  }
 ],
 (...)
}
{{< /highlight >}}

이 설정을 사용하면 DogStatsD 트래픽이 호스트 및 호스트 포트를 통해 애플리케이션 컨테이너에서 Datadog 에이전트 컨테이너로 라우팅될 수 있습니다. 그러나 컨테이너 애플리케이션은 이 트래픽에 호스트의 프라이빗 IP 주소를 사용해야 합니다. 환경 변수 `DD_AGENT_HOST`를 인스턴스 메타데이터 서비스(IMDS)에서 검색할 수 있는 EC2 인스턴스의 프라이빗 IP 주소로 설정하여 이를 활성화할 수 있습니다. 또는 초기화 중에 코드에서 설정할 수도 있습니다. DogStatsD 의 구현은 애플리케이션 성능 모니터링(APM)과 동일합니다. 에이전트 엔드포인트 설정 예제는 [트레이스 에이전트 엔드포인트 설정][17]을 참조하세요.

EC2 인스턴스의 보안 그룹 설정이 APM 및 DogStatsD의 포트를 공개적으로 노출하지 않도록 해야 합니다.

#### 프로세스 수집

모든 컨테이너에 대한 실시간 프로세스 정보를 수집하여 Datadog로 보내려면 `DD_PROCESS_AGENT_ENABLED` 환경 변수를 사용하여 작업 정의를 업데이트하세요.

{{< highlight json "hl_lines=16-17" >}}
{
 "containerDefinitions": [
  {
   "name": "datadog-agent",
   (...)
   "environment" : [
     {
       "name": "DD_API_KEY",
       "value": "<YOUR_DATADOG_API_KEY>"
     },
     {
       "name": "DD_SITE",
       "value": "datadoghq.com"
     },
     {
       "name": "DD_PROCESS_AGENT_ENABLED",
       "value": "true"
     }
   ]
  }
 ],
 (...)
}
{{< /highlight >}}

#### 네트워크 성능 모니터링

<div class="alert alert-warning">
이 기능은 리눅스에서만 사용할 수 있습니다.
</div>

샘플 [datadog-agent-sysprobe-ecs.json][25] 파일을 참조하세요.

아마존 리눅스 1(AL1, 이전 아마존 리눅스 AMI)을 사용하는 경우 [datadog-agent-sysprobe-ecs1.json][26]을 참조하세요.

이미 작업 정의가 있는 경우 다음 설정을 포함하도록 파일을 업데이트하세요.

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

`awsvpc` 모드에서 에이전트를 실행할 수 있지만 Datadog에서 DogStatsD 메트릭 및 애플리케이션 성능 모니터링(APM) 트레이스를 위해 에이전트에 도달하기 위해 ENI IP를 검색하기 어려울 수 있으므로 권장하지 않습니다. 대신 포트 매핑을 사용하여 브리지 모드에서 에이전트 를 실행하면 메타데이터 서버를 통해 [호스트 IP][6]를 쉽게 검색할 수 있습니다.

{{% site-region region="gov" %}}
#### 정부용 Datadog FIPS 프록시 환경

<div class="alert alert-warning">
이 기능은 리눅스에서만 사용할 수 있습니다.
</div>

정부용 Datadog 사이트로 데이터를 보내려면 `fips-proxy` 사이드카 컨테이너를 추가하고 컨테이너 포트를 열어 [지원되는 기능][1]에 대한 적절한 통신이 이루어지도록 하세요.

```json
 {
   "containerDefinitions": [
     (...)
          {
            "name": "fips-proxy",
            "image": "datadog/fips-proxy:1.1.3",
            "portMappings": [
                {
                    "containerPort": 9803,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9804,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9805,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9806,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9807,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9808,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9809,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9810,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9811,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9812,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9813,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9814,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9815,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9816,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9817,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9818,
                    "protocol": "tcp"
                }
            ],
            "essential": true,
            "environment": [
                {
                    "name": "DD_FIPS_PORT_RANGE_START",
                    "value": "9803"
                },
                {
                    "name": "DD_FIPS_LOCAL_ADDRESS",
                    "value": "127.0.0.1"
                }
            ]
        }
   ],
   "family": "datadog-agent-task"
}
```

또한 FIPS 프록시를 통해 트래픽을 전송하려면 Datadog Agent 컨테이너의 환경 변수를 업데이트해야 합니다.

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "image": "public.ecr.aws/datadog/agent:latest",
            (...)
            "environment": [
              (...)
                {
                    "name": "DD_FIPS_ENABLED",
                    "value": "true"
                },
                {
                    "name": "DD_FIPS_PORT_RANGE_START",
                    "value": "9803"
                },
                {
                    "name": "DD_FIPS_HTTPS",
                    "value": "false"
                },
             ],
        },
    ],
   "family": "datadog-agent-task"
}
```
[1]: https://docs.datadoghq.com/ko/agent/configuration/agent-fips-proxy/?tab=helmonamazoneks#supported-platforms-and-limitations
{{% /site-region %}}

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[4]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-ec2-cluster-console-v2.html
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
[20]: /resources/json/datadog-agent-ecs.json
[21]: /resources/json/datadog-agent-ecs1.json
[22]: /resources/json/datadog-agent-ecs-win.json
[23]: /resources/json/datadog-agent-ecs-apm.json
[24]: /resources/json/datadog-agent-ecs-logs.json
[25]: /resources/json/datadog-agent-sysprobe-ecs.json
[26]: /resources/json/datadog-agent-sysprobe-ecs1.json
[27]: #create-an-ecs-task-definition
[28]: #run-the-agent-as-a-daemon-service
[29]: #set-up-additional-agent-features
[30]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html
