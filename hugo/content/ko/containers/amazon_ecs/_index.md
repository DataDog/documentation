---
algolia:
  tags:
  - ecs
aliases:
- /ko/agent/amazon_ecs/
description: Amazon Elastic Container Service에서 Datadog Agent 설치 및 구성
further_reading:
- link: https://www.datadoghq.com/blog/ecs-managed-instances
  tag: 블로그
  text: Datadog으로 ECS 관리형 인스턴스 모니터링하기
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
  text: Datadog Cloud Cost Management로 Kubernetes 및 ECS 비용 이해하기
- link: https://www.datadoghq.com/blog/ecs-default-monitors/
  tag: 블로그
  text: 기본 모니터링과 ECS Explorer를 사용하여 ECS 문제를 더 빠르게 탐지하고 해결
- link: https://www.datadoghq.com/architecture/using-datadog-with-ecs-fargate/
  tag: 아키텍처 센터
  text: ECS Fargate와 함께 Datadog 사용
title: Amazon ECS
---
## 개요 {#overview}

Amazon ECS는 Docker 컨테이너를 지원하는 확장 가능한 고성능 컨테이너 오케스트레이션 서비스입니다. Datadog Agent를 사용하면 클러스터의 모든 EC2 인스턴스에서 ECS 컨테이너와 작업을 모니터링할 수 있습니다.

Datadog에서 Amazon ECS를 구성하려면 **Fleet Automation**을 사용하거나 **수동으로 설치**할 수 있습니다. 수동으로 설치하려면 Datadog Agent 작업 정의를 생성하고 이를 데몬 서비스로 배포하여 Amazon EC2 호스트마다 Agent 컨테이너 하나를 실행합니다. 그러면 각 Agent가 호스트의 다른 컨테이너를 모니터링합니다. 자세한 내용은 [수동 설치](#install-manually) 섹션을 참조하세요.


## Fleet Automation 설정 {#fleet-automation-setup}
[Fleet Automation의 앱 내 설치 가이드][32]에 따라 ECS 설정을 완료합니다. 앱 내 가이드에 설명된 단계를 완료하면 [Fleet Automation][33]이 API 키가 미리 주입되어 즉시 사용 가능한 작업 정의 또는 CloudFormation 템플릿을 생성합니다.

{{< img src="agent/basic_agent_usage/ecs_install_page.png" alt="ECS에 Datadog Agent를 설치하는 앱 내 단계" style="width:90%;">}}

<div class="alert alert-info">
<strong>ECS on Fargate</strong>를 모니터링하려면 <a href="/integrations/ecs_fargate/">Amazon ECS on AWS Fargate</a>를 참조하세요.
</div>

<br>

## 수동 설정 {#manual-setup}

ECS 컨테이너와 작업을 모니터링하려면 ECS 클러스터의 **각 EC2 인스턴스에** Datadog Agent 컨테이너를 하나씩 배포합니다. Datadog Agent 컨테이너에 대한 작업 정의를 생성하고 이를 데몬 서비스로 배포하면 됩니다. 그러면 각 Datadog Agent 컨테이너가 해당 EC2 인스턴스의 다른 컨테이너를 모니터링합니다.

다음 안내에서는 EC2 클러스터가 이미 구성되어 있다고 가정합니다. [클러스터 생성에 관한 Amazon ECS 설명서][4]를 참조하세요.

1. [ECS 작업 정의 생성 및 추가][27]
2. [Datadog Agent를 데몬 서비스로 예약][28]
3. (필요시)[추가 Datadog Agent 기능 설정][29]

**참고:** Datadog의 [Autodiscovery][5]를 ECS 및 Docker와 함께 사용하면 환경에서 실행 중인 작업을 자동으로 검색하고 모니터링할 수 있습니다.

{{% site-region region="gov,gov2" %}}
## FIPS 규정 준수 {#fips-compliance}

FIPS 규정 준수를 위한 일부 설정 단계는 다릅니다. [FIPS 규정 준수][32] 설명서의 구체적인 설정 지침을 참고하세요.

[32]: /ko/agent/configuration/fips-compliance/
{{% /site-region %}}

### ECS 작업 정의 생성 {#create-an-ecs-task-definition}

이 [ECS 작업 정의][30]는 필요한 구성을 적용하여 Datadog Agent 컨테이너를 실행합니다. Agent 구성을 수정해야 하는 경우 이 작업 정의를 업데이트하고 데몬 서비스를 다시 배포합니다. AWS Management Console 또는 [AWS CLI][9]를 사용하여 이 작업 정의를 구성할 수 있습니다.

다음 샘플은 핵심 인프라 모니터링을 위한 최소 구성입니다. 다양한 기능이 활성화된 추가 작업 정의 샘플도 [추가 Agent 기능 설정](#setup-additional-agent-features) 섹션에서 제공되므로 필요에 따라 대신 사용할 수 있습니다.

#### 작업 정의 파일 생성 및 관리 {#create-and-manage-the-task-definition-file}

1. Linux 컨테이너의 경우 [datadog-agent-ecs.json][20]을 다운로드합니다.
    - Amazon Linux 1(AL1, 이전 명칭: Amazon Linux AMI)을 사용하는 경우 [datadog-agent-ecs1.json][21]을 사용합니다.
    - Windows를 사용하는 경우 [datadog-agent-ecs-win.json][22]을 사용합니다.

   <div class="alert alert-info">
   이 파일들은 핵심 인프라 모니터링을 위한 최소 구성을 제공합니다. 다양한 기능이 활성화된 추가 작업 정의 파일 예시는 이 페이지의 <a href="#set-up-additional-agent-features">추가 Agent 기능 설정</a> 섹션을 참조하세요.
   </div>
2. 기본 작업 정의 파일 편집
    - `<YOUR_DATADOG_API_KEY>`를 계정의 [Datadog API 키][14]로 바꿔 `DD_API_KEY` 환경 변수를 설정합니다. 또는 [AWS Secrets Manager에 저장된 시크릿의 ARN을 제공][16]할 수도 있습니다.
    - `DD_SITE` 환경 변수를 [Datadog 사이트][13]로 설정합니다. 현재 사이트는 다음과 같습니다. {{< region-param key="dd_site" code="true" >}}

      <div class="alert alert-info">
      If <code>DD_SITE</code> is not set, it defaults to the <code>US1</code> site, <code>datadoghq.com</code>.
      </div>
    - Optionally, add a `DD_TAGS` environment variable to specify any additional tags.

3. (필요시) [ECS Anywhere 클러스터][15]에 배포하려면 ECS 작업 정의에 다음 줄을 추가합니다.
    ```json
    "requiresCompatibilities": ["EXTERNAL"]
    ```

4. (필요시) Agent 상태 검사를 추가하려면 ECS 작업 정의에 다음 줄을 추가합니다.
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```


#### 작업 정의 등록 {#register-the-task-definition}

{{< tabs >}}
{{% tab "AWS CLI" %}}
작업 정의 파일을 생성한 후 다음 명령을 실행하여 AWS에 파일을 등록합니다.

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs.json>
```
{{% /tab %}}
{{% tab "웹 UI" %}}
작업 정의 파일을 준비한 후 AWS 콘솔에서 파일을 등록합니다.
1. AWS 콘솔에 로그인한 후 Elastic Container Service 섹션으로 이동합니다.
2. 탐색 창에서 {{< ui >}}Task Definitions{{< /ui >}}를 선택합니다. {{< ui >}}Create new task definition{{< /ui >}} 메뉴에서 {{< ui >}}Create new task definition with JSON{{< /ui >}}을 선택합니다.
3. JSON 편집기 상자에 작업 정의 파일의 내용을 붙여넣습니다.
4. {{< ui >}}Create{{< /ui >}}를 선택합니다.

{{% /tab %}}
{{< /tabs >}}


### Agent를 데몬 서비스로 실행 {#run-the-agent-as-a-daemon-service}

각 EC2 인스턴스에서 하나의 Datadog Agent 컨테이너를 실행하려면 Datadog Agent 작업 정의를 [데몬 서비스][10]로 실행합니다.

#### Datadog의 ECS 작업을 사용하여 AWS에서 데몬 서비스 예약 {#schedule-a-daemon-service-in-aws-using-datadogs-ecs-task}

{{< tabs >}}
{{% tab "AWS CLI" %}}
AWS CLI를 사용하여 이전 단계에서 등록한 작업 정의로 데몬 서비스를 생성합니다.

```bash
aws ecs create-service \
    --cluster <CLUSTER_NAME> \
    --service-name datadog-agent \
    --task-definition <TASK_FAMILY> \
    --scheduling-strategy DAEMON \
    --launch-type EC2 \
    --region <AWS_REGION>
```
{{% /tab %}}
{{% tab "웹 UI" %}}
1. AWS 콘솔에 로그인한 후 ECS 섹션으로 이동합니다. {{< ui >}}Clusters{{< /ui >}} 페이지에서 Agent를 실행할 클러스터를 선택합니다.
2. 클러스터의 {{< ui >}}Services{{< /ui >}} 탭에서 {{< ui >}}Create{{< /ui >}}를 선택합니다.
3. {{< ui >}}Service name{{< /ui >}}에 `datadog-agent`를 입력합니다.
4. {{< ui >}}Deployment configuration{{< /ui >}} 아래에서 {{< ui >}}Service type{{< /ui >}}에 대해 {{< ui >}}Daemon{{< /ui >}}을 선택합니다.
5. 로드 밸런싱이나 오토스케일링을 구성할 필요는 없습니다.
6. {{< ui >}}Next Step{{< /ui >}}을 클릭한 다음 {{< ui >}}Create Service{{< /ui >}}를 클릭합니다.
{{% /tab %}}
{{< /tabs >}}

### 추가 Agent 기능 설정 {#set-up-additional-agent-features}

이전 섹션에서 제공한 작업 정의 파일에는 최소한의 설정만 포함되어 있습니다. 이러한 파일은 ECS 클러스터의 컨테이너에 대한 핵심 메트릭을 수집하기 위해 기본 구성이 적용된 Agent 컨테이너를 배포합니다. Agent는 컨테이너에서 검색된 [Docker 레이블을 기반으로][12] Agent 통합을 실행할 수도 있습니다.

추가 기능:

#### APM {#apm}
[APM 설정 설명서][6] 및 샘플 [datadog-agent-ecs-apm-uds.json][23]을 참조하세요.

#### 로그 관리 {#log-management}
[로그 수집 설명서][7] 및 샘플 [datadog-agent-ecs-logs.json][24]을 참조하세요.

#### DogStatsD {#dogstatsd}

[DogStatsD][8]를 사용하는 경우 Datadog Agent의 컨테이너 정의를 편집하여 8125/udp에 대한 호스트 포트 매핑을 추가하고 환경 변수 `DD_DOGSTATSD_NON_LOCAL_TRAFFIC`을 `true`로 설정합니다.

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

이 설정을 통해 DogStatsD 트래픽을 애플리케이션 컨테이너에서 호스트와 호스트 포트를 거쳐 Datadog Agent 컨테이너로 라우팅할 수 있습니다. 단, 이 트래픽에는 애플리케이션 컨테이너가 호스트의 프라이빗 IP 주소를 사용해야 합니다. 인스턴스 메타데이터 서비스(IMDS)에서 검색할 수 있는 EC2 인스턴스의 프라이빗 IP 주소로 환경 변수 `DD_AGENT_HOST`를 설정하면 이를 활성화할 수 있습니다. 또는 초기화 중에 코드에서 이를 설정할 수도 있습니다. DogStatsD 구현은 APM과 동일합니다. Agent 엔드포인트 설정 예시는 [Trace Agent 엔드포인트 구성][17]을 참조하세요.

EC2 인스턴스의 보안 그룹 설정이 APM 및 DogStatsD의 포트를 공개적으로 노출하지 않도록 해야 합니다.

#### 프로세스 수집 {#process-collection}

모든 컨테이너에 대한 Live Process 정보를 수집하여 Datadog에 전송하려면 `DD_PROCESS_AGENT_ENABLED` 환경 변수를 사용하여 작업 정의를 업데이트합니다.

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

#### Cloud Network Monitoring {#cloud-network-monitoring}

<div class="alert alert-danger">
이 기능은 리눅스에서만 지원됩니다.
</div>

샘플 [datadog-agent-sysprobe-ecs.json][25] 파일을 참조하세요.

Amazon Linux 1(AL1, 이전 명칭: Amazon Linux AMI)을 사용하는 경우 [datadog-agent-sysprobe-ecs1.json][26]을 참조하세요.

이미 작업 정의가 있는 경우 다음 구성을 포함하도록 파일을 업데이트하세요.

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
#### Network Path {#network-path}

1. ECS 클러스터에서 [Network Path][31]를 활성화하려면 `datadog-agent-sysprobe-ecs.json` 파일에 다음 환경 변수를 추가하여 `system-probe` traceroute 모듈을 활성화합니다.

   ```json
      "environment": [
        (...)
        {
          "name": "DD_TRACEROUTE_ENABLED",
          "value": "true"
        }
      ],
   ```

2. 개별 경로를 모니터링하려면 다음 안내에 따라 [추가 Agent 기능을 설정](#set-up-additional-agent-features)합니다.

   이러한 파일은 ECS 클러스터의 컨테이너에 대한 핵심 메트릭을 수집하기 위해 기본 구성이 적용된 Agent 컨테이너를 배포합니다. Agent는 컨테이너에서 검색된 Docker 레이블을 기반으로 Agent 통합을 실행할 수도 있습니다.

3. 네트워크 트래픽 경로를 모니터링하고 엔드포인트를 수동으로 지정하지 않아도 Agent가 실제 네트워크 트래픽을 기반으로 네트워크 경로를 자동으로 검색하고 모니터링하도록 하려면 `datadog-agent-sysprobe-ecs.json`에 다음 환경 변수를 추가합니다.

   ```json
      "environment": [
        (...)
        {
          "name": "DD_NETWORK_PATH_CONNECTIONS_MONITORING_ENABLED",
          "value": "true"
        }
      ],
   ```

4. 필요시 Worker 수(기본값: 4)를 구성하려면 `datadog-agent-sysprobe-ecs.json` 파일에서 다음 환경 변수를 조정합니다.

   ```json
      "environment": [
        (...)
        {
          "name": "DD_NETWORK_PATH_COLLECTOR_WORKERS",
          "value": "10"
        }
      ],
   ```
## AWSVPC 모드 {#awsvpc-mode}

Agent v6.10 이상에서는 호스트 인스턴스의 보안 그룹이 관련 포트를 통해 애플리케이션 컨테이너에 액세스할 수 있도록 보안 그룹을 구성한 경우 해당 컨테이너에서 `awsvpc` 모드를 사용할 수 있습니다.

`awsvpc` 모드에서 Agent를 실행할 수 있지만, DogStatsD 메트릭 및 APM 트레이스를 전송하기 위해 Agent에 연결하는 데 필요한 ENI IP를 검색하기 어려울 수 있으므로 Datadog에서는 권장하지 않습니다. 대신 브리지 모드에서 Agent를 포트 매핑과 함께 실행하면 [메타데이터 서버를 통해 호스트 IP][6]를 더욱 쉽게 검색할 수 있습니다.

## 문제 해결 {#troubleshooting}

도움이 필요하신가요? [Datadog 지원팀][11]에 문의하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[4]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-ec2-cluster-console-v2.html
[5]: https://docs.datadoghq.com/ko/agent/autodiscovery/
[6]: /ko/containers/amazon_ecs/apm/
[7]: /ko/containers/amazon_ecs/logs/
[8]: /ko/extend/dogstatsd/?tab=containeragent
[9]: https://aws.amazon.com/cli
[10]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[11]: https://docs.datadoghq.com/ko/help/
[12]: https://docs.datadoghq.com/ko/containers/docker/integrations/?tab=docker
[13]: /ko/getting_started/site/
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
[16]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[17]: /ko/containers/amazon_ecs/apm/?tab=ec2metadataendpoint#configure-the-trace-agent-endpoint
[20]: /ko/resources/json/datadog-agent-ecs.json
[21]: /ko/resources/json/datadog-agent-ecs1.json
[22]: /ko/resources/json/datadog-agent-ecs-win.json
[23]: /ko/resources/json/datadog-agent-ecs-apm.json
[24]: /ko/resources/json/datadog-agent-ecs-logs.json
[25]: /ko/resources/json/datadog-agent-sysprobe-ecs.json
[26]: /ko/resources/json/datadog-agent-sysprobe-ecs1.json
[27]: #create-an-ecs-task-definition
[28]: #run-the-agent-as-a-daemon-service
[29]: #set-up-additional-agent-features
[30]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html
[31]: /ko/network_monitoring/network_path
[32]: https://app.datadoghq.com/fleet/install-agent/latest?platform=ecs
[33]: https://app.datadoghq.com/fleet/install-agent/latest?platform=ecs