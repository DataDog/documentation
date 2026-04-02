---
app_id: AWS-fargate
app_uuid: 4c298061-c7d2-4ce6-ab3e-5378039de65a
assets:
  dashboards:
    Amazon Fargate: assets/dashboards/amazon_fargate_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ecs.fargate.cpu.user
      metadata_path: metadata.csv
      prefix: ecs.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10033
    source_type_name: Amazon Fargate
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- cloud
- containers
- network
- orchestration
- provisioning
- tracing
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ecs_fargate/README.md
display_on_public_website: true
draft: false
git_integration_title: ecs_fargate
integration_id: AWS-fargate
integration_title: AWS Fargate 기반 Amazon ECS
integration_version: 4.3.1
is_public: true
manifest_version: 2.0.0
name: ecs_fargate
public_title: ' AWS Fargate 기반 Amazon ECS'
short_description: ECS Fargate로 실행되는 컨테이너에 대한 메트릭 추적
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Cloud
  - Category::Containers
  - Category::Network
  - Category::Orchestration
  - Category::Provisioning
  - Category::Tracing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: ECS Fargate로 실행되는 컨테이너에 대한 메트릭 추적
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-aws-fargate
  - resource_type: 문서
    url: http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/collect-fargate-logs-with-firelens/
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/aws-fargate-metrics/
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/
  support: README.md#Support
  title: AWS Fargate 기반 Amazon ECS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

<div class="alert alert-danger"> 이 페이지는 ECS Fargate 통합에 대해 설명합니다. EKS Fargate의 경우 Datadog의 <a href="http://docs.datadoghq.com/통합/eks_fargate">EKS Fargate 통합</a> 설명서를 참조하십시오.
</div>

ECS Fargate에서 실행 중인 모든 컨테이너에서 메트릭를 받으세요:

- CPU/메모리 사용량 및 제한 메트릭
- Datadog 통합 또는 커스텀 메트릭를 실행하여 Fargate에서 실행 중인 애플리케이션을 모니터링하세요.

Datadog 에이전트는 ECS 작업 메타데이터 엔드포인트를 사용하여 작업 정의의 컨테이너에 대해 메트릭을 검색합니다. 해당 엔드포인트에 대한 [ECS 설명서][1]에 따르면 다음과 같습니다:

- 이 엔드포인트는 작업과 관련된 모든 컨테이너에 대한 도커(Docker) 통계 JSON을 반환합니다. 반환되는 각 통계에 대한 자세한 내용은 도커(Docker) API 문서에서 [ContainerStats][2]를 참조하세요.

작업 메타데이터 엔드포인트는 작업 정의 자체 내에서만 사용할 수 있으므로 모니터링할 각 작업 정의 내에서 Datadog 에이전트 을 추가로 컨테이너 실행해야 합니다.

이 메트릭 컬렉션을 사용하려면 작업 정의에서 환경 변수 `ECS_FARGATE` 를 `"true"`로 설정하기만 하면 됩니다.

**참고**: 네트워크 성능 모니터링(NPM)은 ECS Fargate에서 지원되지 않습니다.

## 설정

다음 단계에서는 AWS ECS Fargate 내에서 Datadog 컨테이너 에이전트 설정에 대해 설명합니다. **참고**: Fargate 통합을 최대한 활용하려면 Datadog 에이전트 버전 6.1.1 이상이 필요합니다.

Datadog 에이전트가 없는 작업은 여전히 CloudWatch로 메트릭을 보고하지만, 자동탐지, 상세 컨테이너 메트릭 , 추적 등을 위해서는 에이전트를 필요로 합니다. 또한 CloudWatch 메트릭 은 Datadog 에이전트를 통해 직접 전송되는 메트릭보다 덜 세분화되어 있으며 보고 지연 시간이 더 길어집니다.

### 설치

<div class="alert alert-info">또한 AWS ECS Fargate에서 배치 작업을 모니터링할 수 있습니다. <a href="#installation-for-AWS-batch"> AWS 배치의 경우 설치를</a> 참조하세요.
</div>

Datadog로 ECS Fargate 작업을 모니터링하려면 애플리케이션과 **동일한 작업 정의**에서 에이전트를 컨테이너로 실행합니다. Datadog로 메트릭을 수집하려면 각 작업 정의에 애플리케이션 컨테이너 외에 Datadog 에이전트 컨테이너가 포함되어야 합니다. 다음 설정 단계를 따르세요.

1. **ECS Fargate 작업 생성**
2. **IAM 생성 또는 정책 수정**
3. **복제본으로 작업 실행**

#### ECS Fargate 작업 만들기

Fargate의 기본 작업 단위는 작업 정의에서 설정되는 작업입니다. 작업 정의는 쿠버네티스(Kubernetes)의 파드에 비유할 수 있습니다. 작업 정의에는 하나 이상의 컨테이너가 포함되어야 합니다. Datadog 에이전트를 실행하려면, 애플리케이션 컨테이너와 Datadog 에이전트 컨테이너를 실행하기 위한 작업 정의를 생성해야 합니다.

아래 지침은 [Amazon Web Console][3], [AWS CLI 도구][4] 또는 [AWS CloudFormation][5]을 사용하여 작업을 설정하는 방법을 보여줍니다.

{{< tabs >}}
{{% tab "Web UI" %}}
##### 웹 UI 작업 정의


{{< site-region region="us,us3,us5,eu,ap1,gov" >}}

1. [AWS 웹 콘솔][4]에 로그인하고 ECS 섹션으로 이동합니다.
2. 왼쪽 메뉴에서 **작업 정의**를 클릭한 다음 **새 작업 정의 생성** 버튼을 클릭하거나 기존 Fargate 작업 정의를 선택합니다.
3. 새 작업 정의의 경우 다음을 수행합니다.
    1. 시작 유형으로 **Fargate**를 선택한 후 **다음 단계** 버튼을 클릭합니다.
    2. `my-app-and-datadog`와 같은 **작업 정의 이름**을 입력합니다.
    3. 작업 실행 IAM 역할을 선택합니다. 아래의 [IAM 생성 또는 수정 정책](#create-or-modify-your-iam-policy) 섹션에서 권한 요구 사항을 참조하세요.
    4. 필요에 따라 **작업 메모리** 및 **작업 CPU**를 선택하세요.
4. 추가 **컨테이너** 버튼을 클릭하여 Datadog 에이전트 컨테이너를 추가하기 시작합니다.
    1. **컨테이너 이름**에 대해 `datadog-agent`를 입력합니다.
    2. **이미지**의 경우 `public.ecr.aws/datadog/agent:latest`를 입력합니다.
    3. **환경 변수**에 **키** `DD_API_KEY`를 추가하고 [Datadog API 키][41]를 값으로 입력합니다.
    4. **키** `ECS_FARGATE` 및 `true` 값을 사용하여 환경 변수를 추가합니다. **추가**를 클릭하여 컨테이너를 추가합니다.
    5. **키** `DD_SITE` 및 {{< region-param key="dd_site" code="true" >}} 값을 사용하여 환경 변수를 추가합니다. 설정하지 않으면 기본값은 `datadoghq.com`입니다.
    6. (윈도우즈(Windows) 전용) `C:\`를 작업 디렉터리로 선택합니다.
5. 다른 애플리케이션 컨테이너를 작업 정의에 추가합니다. 통합 메트릭 수집에 대한 자세한 정보는 [통합 ECS Fargate 설정][12]을 참조하세요.
6. **생성**을 클릭하여 작업 정의를 생성합니다.

[4]: https://aws.amazon.com/console
[12]: http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
[41]: https://app.datadoghq.com/organization-settings/api-keys

{{< /site-region >}}


{{% /tab %}}

{{% tab "AWS CLI" %}}
##### AWS CLI 작업 정의

1. [datadog-agent-ecs-fargate.json][1]을 다운로드합니다. **참고**:인터넷 탐색기를 사용하는 경우 아래에 언급된 JSON 파일이 포함된 gzip 파일로 다운로드될 수 있습니다.

{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
2. `TASK_NAME`, [Datadog API 키][41] 및 적절한 `DD_SITE`({{< region-param key="dd_site" code="true" >}})를 사용하여 JSON을 업데이트합니다. **참고**: 환경 변수 `ECS_FARGATE`는 이미 `"true"`로 설정되어 있습니다.

[41]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

3. 다른 애플리케이션 컨테이너를 작업 정의에 추가합니다. 통합 메트릭 수집에 대한 자세한 내용은 [통합 ECS Fargate 설정][2]을 참조하세요.
4. 선택 사항 - 에이전트 상태 점검을 추가합니다.

   ECS 작업 정의에 다음을 추가하여 에이전트 상태 점검을 생성하세요.

    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```
5. 다음 명령을 실행하여 ECS 작업 정의를 등록합니다:

```bash
aws ecs register-task-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-ecs-fargate.json
```

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-fargate.json
[2]: http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
{{% /tab %}}

{{% tab "CloudFormation" %}}
##### AWS CloudFormation 작업 정의

[AWS CloudFormation][1] 템플릿을 사용하여 Fargate 컨테이너를 설정할 수 있습니다. CloudFormation 템플릿 내의 `AWS::ECS::TaskDefinition` 리소스를 사용하여 Amazon ECS 작업을 설정하고 해당 작업에 필요한 실행 유형으로 `FARGATE`를 지정하세요.


{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
Datadog API 키][41]를 사용하여 아래의 CloudFormation 템플릿을 업데이트합니다. 설정하지 않으면 기본값은 `datadoghq.com`이므로 필요한 경우 적절한 `DD_SITE` ({{< region-param key="dd_site" code="true" >}}) 환경 변수를 포함하세요.

[41]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}


```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
        - FARGATE
      Cpu: 256
      Memory: 512
      ContainerDefinitions:
        - Name: datadog-agent
          Image: 'public.ecr.aws/datadog/agent:latest'
          Environment:
            - Name: DD_API_KEY
              Value: <DATADOG_API_KEY>
            - Name: ECS_FARGATE
              Value: true
```

마지막으로, `ContainerDefinitions` 내에 다른 애플리케이션 컨테이너를 포함하고 CloudFormation을 통해 배포합니다.

CloudFormation 템플릿 및 구문에 대한 자세한 내용은 [AWS CloudFormation 작업 정의 설명서][2]를 참조하세요.


[1]: https://aws.amazon.com/cloudformation/
[2]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html
{{% /tab %}}

{{< /tabs >}}


#### 복제본으로 작업 실행 서비스

ECS Fargate의 유일한 옵션은 [복제본 서비스][6]으로 작업을 실행하는 것입니다. Datadog 에이전트는 애플리케이션 및 통합 컨테이너와 동일한 작업 정의에서 실행됩니다.

{{< tabs >}}
{{% tab "Web UI" %}}

##### 웹 UI 복제본 서비스

1. [AWS 웹 콘솔][1]에 로그인하여 ECS 섹션으로 이동합니다. 필요한 경우 **네트워킹 전용** 클러스터 템플릿을 사용하여 클러스터를 생성합니다.
2. Datadog 에이전트를 실행하려면 클러스터를 선택합니다.
3. **서비스** 탭 에서 **생성** 버튼을 클릭합니다.
4. 시작 유형**의 경우 **FARGATE**를 선택합니다.
5. 작업 정의**에서 이전 단계에서 만든 작업을 선택합니다.
6. 서비스 이름**을 입력합니다.
7. 작업 수**에 `1` 을 입력한 후 **다음 단계** 버튼을 클릭합니다.
8. 클러스터 VPC**, **서브넷**, **보안 그룹**을 선택합니다.
9. **로드밸런싱** 및 **서비스 발견**은 부수적인 으로 설정할 수 있습니다.
10. 다음 단계** 버튼을 클릭합니다.
11. **자동 스케일링**은 선호도에 따라 부수적인 입니다.
12. 다음 단계** 버튼을 클릭한 다음 **만들기 서비스** 버튼을 클릭합니다.

[1]: https://aws.amazon.com/console
{{% /tab %}}

{{% tab "AWS cli" %}}
##### AWS CLI 복제본 서비스

AWS CLI 도구][1]를 사용하여 다음 명령을 실행합니다.

**참고**: Fargate 버전 1.1.0 이상이 필요하므로 아래 명령은 플랫폼 버전을 지정합니다.

필요한 경우 클러스터 을 생성합니다:

```bash
aws ecs create-cluster --cluster-name "<CLUSTER_NAME>"
```

클러스터 에 대해 서비스 로 작업을 실행합니다:

```bash
aws ecs run-task --cluster <CLUSTER_NAME> \
--network-configuration "awsvpcConfiguration={subnets=["<PRIVATE_SUBNET>"],securityGroups=["<SECURITY_GROUP>"]}" \
--task-definition arn:aws:ecs:us-east-1:<AWS_ACCOUNT_NUMBER>:task-definition/<TASK_NAME>:1 \
--region <AWS_REGION> --launch-type FARGATE --platform-version 1.4.0
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}

{{% tab "CloudFormation" %}}
##### AWS CloudFormation 복제본 서비스

CloudFormation 템플릿에서 이전 예제에서 생성한 `ECSTaskDefinition` 리소스를 생성 중인 `AWS::ECS::Service` 리소스로 참조할 수 있습니다. 그런 다음 `Cluster`, `DesiredCount`, 그리고 애플리케이션에 필요한 기타 파라미터를 복제본 서비스에 지정합니다.

```yaml
Resources:
  ECSTaskDefinition:
    #(...)
  ECSService:
    Type: 'AWS::ECS::Service'
    Properties:
      Cluster: <CLUSTER_NAME>
      TaskDefinition:
        Ref: "ECSTaskDefinition"
      DesiredCount: 1
      #(...)
```

CloudFormation 템플릿 및 구문에 대한 자세한 내용은 [AWS CloudFormation ECS 서비스 설명서][1]를 참조하세요.

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-service.html
{{% /tab %}}

{{< /tabs >}}

Datadog API 키를 비밀로 제공하려면 [비밀 사용](#using-secrets)을 참조하세요.

#### AWS 배치용 설치

Datadog를 사용해 AWS 배치 작업을 모니터링하려면 [ECS Fargate 포함 AWS 배치 및 Datadog 에이전트][7]를 참조하세요.

#### IAM 정책 생성 또는 수정

[Datadog IAM 정책][8]에 다음 권한을 추가하여 ECS Fargate 메트릭을 수집합니다. 자세한 내용은 AWS 웹사이트의 [ECS 정책][9]을 참조하세요.

| AWS 권한                    | 설명                                                       |
| -------------------------------- | ----------------------------------------------------------------- |
| `ecs:ListClusters`               | 사용 가능한 클러스터를 목록화합니다.                                          |
| `ecs:ListContainerInstances`     | 클러스터 인스턴스 목록                                      |
| `ecs:DescribeContainerInstances` | 리소스 및 실행 중인 작업에 메트릭 추가할 인스턴스를 설명합니다. |

#### 비밀 사용
`DD_API_KEY` 환경 변수를 일반 텍스트로 API 키로 채우는 대신 [ AWS 비밀 관리자][10]에 저장된 일반 텍스트 비밀의 ARN을 참조할 수 있습니다. 작업 또는 작업 정의 파일의 `containerDefinitions.secrets` 섹션 아래에 `DD_API_KEY` 환경 변수를 배치합니다. 작업/작업 실행 역할에 AWS 비밀번호 관리자에서 비밀번호를 가져오는 데 필요한 권한이 있는지 확인하세요.

### 메트릭 수집

위에서 설명한 대로 Datadog 에이전트를 설정한 후, [ecs_fargate 점검][11]은 자동탐지를 활성화하여 메트릭을 수집합니다. 동일한 작업에서 다른 컨테이너에 도커(Docker) 레이블을 추가하여 메트릭을 추가로 수집합니다.

통합은 리눅스(Linux) 및 윈도우즈(Windows) 에서 작동하지만 일부 메트릭은 OS에 따라 다릅니다. 윈도우즈(Windows) 에서 실행될 때 노출되는 모든 메트릭은 리눅스에서도 노출되지만 일부 메트릭은 리눅스에서만 사용할 수 있습니다. 이 통합에서 제공하는 메트릭의 목록에 대해서는 [수집된 데이터](#data-collected)를 참조하세요. 목록에는 어떤 메트릭이 리눅스 전용인지도 명시되어 있습니다.

통합 메트릭 수집에 대한 자세한 내용은 [통합 ECS Fargate 설정][12]을 참조하세요.

#### DogStatsD

메트릭은 UDP 포트 8125를 통해 [DogStatsD][13]로 수집됩니다.

#### 기타 환경 변수

도커(Docker) 에이전트 컨테이너에서 사용할 수 있는 환경 변수는 [도커(Docker) 에이전트 ][14] 페이지를 참조하세요. **참고**: 일부 변수는 Fargate에서 사용할 수 없습니다.


| 환경 변수               | 설명                                    |
|------------------------------------|------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`         | 도커(Docker) 컨테이너 레이블 추출                |
| `DD_CHECKS_TAG_CARDINALITY`        | 메트릭 확인을 위한 태그 추가                      |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | 커스텀 메트릭에 태그 추가                     |

글로벌 태깅의 경우 `DD_DOCKER_LABELS_AS_TAGS`을 사용하는 것은 권장 사항입니다. 이 방법을 사용하면 에이전트는 컨테이너 레이블에서 태그를 가져옵니다. 이를 위해서는 다른 컨테이너에 적절한 레이블을 추가해야 합니다. 레이블은 [작업 정의][15]에서 직접 추가할 수 있습니다.

에이전트 컨테이너 형식:

```json
{
  "name": "DD_DOCKER_LABELS_AS_TAGS",
  "value": "{\"<LABEL_NAME_TO_COLLECT>\":\"<TAG_KEY_FOR_DATADOG>\"}"
}
```

에이전트 컨테이너 예시:

```json
{
  "name": "DD_DOCKER_LABELS_AS_TAGS",
  "value": "{\"com.docker.compose.service\":\"service_name\"}"
}
```

CloudFormation 예제(YAML):

```yaml
      ContainerDefinitions:
        - #(...)
          Environment:
            - Name: DD_DOCKER_LABELS_AS_TAGS
              Value: "{\"com.docker.compose.service\":\"service_name\"}"
```

**참고**: Fargate에서는 사용자에게 대한 호스트라는 개념이 없으므로 `DD_HOSTNAME`을 사용해서는 안 됩니다. 태그를 사용하면 인프라스트럭처 목록에서 작업이 애플리케이션 성능 모니터링(APM) 호스트로 표시되어 빌링에 영향을 줄 수 있습니다. 대신 `DD_TAGS`를 사용하여 호스트 태그를 할당합니다. Datadog 에이전트 버전 6.13.0부터 `DD_TAGS` 환경 변수를 사용하여 통합 메트릭에서 글로벌 태그를 설정할 수도 있습니다.

### 크롤러-기반 메트릭

Datadog 에이전트에서 수집하는 메트릭 외에도 Datadog에는 CloudWatch 기반 ECS 통합이 있습니다. 이 통합은 [Amazon ECS CloudWatch 메트릭][16]을 수집합니다.

앞서 언급했듯이 Fargate 작업도 이러한 방식으로 메트릭을 보고합니다.

> 사용 가능한 메트릭 은 작업의 시작 유형과 클러스터 또는 배치 작업의 서비스에 따라 달라집니다. 서비스에 Fargate 시작 유형을 사용하는 경우 모니터링 CPU 및 메모리 사용량 메트릭이 제공되어 서비스를 지원합니다.

이 방법은 Datadog 에이전트를 사용하지 않으므로 통합 타일에서 **ECS**를 확인하여 AWS 통합을 설정해야 합니다. 그런 다음 Datadog가 CloudWatch 메트릭(Datadog의 네임스페이스 `aws.ecs.*`)를 대신 가져옵니다. 이 문서의 [수집된 데이터][17] 섹션을 참조하세요.

메트릭만 필요한 경우 CloudWatch 메트릭을 사용하여 통합을 수집할 수 있습니다. **참고**: CloudWatch 데이터는 활성화한 모니터링의 유형에 따라 세분성이 떨어지고(1~5분) Datadog로의 보고가 지연됩니다. 이는 CloudWatch의 데이터 수집이 에이전트를 통해 Datadog로 푸시하는 대신 AWS API 한도를 준수해야 하기 때문입니다.

Datadog의 기본 CloudWatch 크롤러가 메트릭을 10분에 한 번씩 폴링합니다. 더 빠른 크롤링 일정이 필요한 경우 [Datadog 지원팀][18]에 문의하여 이용 가능 여부를 확인하세요. **참고**: AWS 측의 경우 API 통화에 대한 CloudWatch 요금이 청구되므로 비용이 증가합니다.

### 로그 수집

다음 중 하나를 사용하여 Fargate 로그를 모니터링할 수 있습니다.
- Datadog의 Fluent Bit 출력 플러그인 기반 AWS FireLens 통합을 사용해 로그를 직접 Datadog에 전송합니다.
- `awslogs` 로그 드라이버를 사용하여 로그를 CloudWatch 로그 그룹에 저장한 다음, 람다 함수를 사용하여 로그를  Datadog에 라우팅합니다.

Datadog는 Fargate 작업에서 Fluent Bit를 직접 설정할 수 있으므로 AWS FireLens를 사용할 것을 권장합니다.

**참고**: Fluent Bit 및 FireLens를 사용한 로그 수집은 ECS Fargate 기반 AWS 배치에서 지원되지 않습니다.

#### Fluent Bit 및 FireLens

Datadog의 Fluent Bit 출력 플러그인에 빌드된 AWS FireLens 통합을 설정하여 FireLens 모니터링 로그 데이터를 Datadog 로그와 연결하세요. [여기서 이 설정에 대한 샘플 작업 정의]를 찾아볼 수 있습니다.

1. Fluent Bit FireLens 로그 라우터 컨테이너를 기존 Fargate 작업에 추가합니다. Fargate 활성화에 대한 자세한 내용은 전용 [AWS Fargate 설명서][20]를 참조하세요. Fargate 컨테이너 정의에 대한 자세한 내용은 [AWS 설명서 컨테이너 정의][21]를 참조하세요. AWS에서는 [지역별 도커(Docker) 이미지][22]를 사용할 것을 권장합니다. 다음은 Fluent Bit 이미지가 구성된 작업 정의의 예시입니다:

   ```json
   {
     "essential": true,
     "image": "amazon/aws-for-fluent-bit:stable",
     "name": "log_router",
     "firelensConfiguration": {
       "type": "fluentbit",
       "options": { "enable-ecs-log-metadata": "true" }
     }
   }
   ```

   컨테이너에서 stdout를 통한 직렬화된 JSON 로그를 게시하는 경우, 이 [추가 FireLens 설정][23]를 사용하여 Datadog 내에서 올바르게 파싱해야 합니다:

   ```json
   {
     "essential": true,
     "image": "amazon/aws-for-fluent-bit:stable",
     "name": "log_router",
     "firelensConfiguration": {
       "type": "fluentbit",
       "options": {
         "enable-ecs-log-metadata": "true",
         "config-file-type": "file",
         "config-file-value": "/fluent-bit/configs/parse-json.conf"
       }
     }
   }
   ```

   `log:` 필드의 직렬화된 JSON을 최상위 필드로 변환합니다. 자세한 내용은 AWS 샘플 [JSON으로 직렬화된 파싱 컨테이너 stdout 로그][23]를 참조하세요.

2. 다음으로, 동일한 Fargate 작업에서 원하는 컨테이너에 대한 로그 설정을 정의해 로그로 전송합니다. 이 로그 설정에는 AWS FireLens가 로그로 지정되어 데이터를 Fluent Bit로 출력해야 합니다. 다음은 FireLens가 로그 드라이버로 데이터를 Fluent Bit에 출력하는 작업 정의의 예시 스니펫입니다.


{{< site-region region="us" >}}
  ```json
  {
    "logConfiguration": {
      "logDriver": "awsfirelens",
      "options": {
        "Name": "datadog",
        "apikey": "<DATADOG_API_KEY>",
        "Host": "http-intake.logs.datadoghq.com",
        "dd_service": "firelens-test",
        "dd_source": "redis",
        "dd_message_key": "log",
        "dd_tags": "project:fluentbit",
        "TLS": "on",
        "provider": "ecs"
      }
    }
  }
  ```
{{< /site-region >}}


{{< site-region region="us3" >}}
  ```json
  {
    "logConfiguration": {
      "logDriver": "awsfirelens",
      "options": {
        "Name": "datadog",
        "apikey": "<DATADOG_API_KEY>",
        "Host": "http-intake.logs.us3.datadoghq.com",
        "dd_service": "firelens-test",
        "dd_source": "redis",
        "dd_message_key": "log",
        "dd_tags": "project:fluentbit",
        "TLS": "on",
        "provider": "ecs"
      }
    }
  }
  ```
{{< /site-region >}}


{{< site-region region="us5" >}}
  ```json
  {
    "logConfiguration": {
      "logDriver": "awsfirelens",
      "options": {
        "Name": "datadog",
        "apikey": "<DATADOG_API_KEY>",
        "Host": "http-intake.logs.us5.datadoghq.com",
        "dd_service": "firelens-test",
        "dd_source": "redis",
        "dd_message_key": "log",
        "dd_tags": "project:fluentbit",
        "TLS": "on",
        "provider": "ecs"
      }
    }
  }
  ```
{{< /site-region >}}


{{< site-region region="eu" >}}
  ```json
  {
    "logConfiguration": {
      "logDriver": "awsfirelens",
      "options": {
        "Name": "datadog",
        "apikey": "<DATADOG_API_KEY>",
        "Host": "http-intake.logs.datadoghq.eu",
        "dd_service": "firelens-test",
        "dd_source": "redis",
        "dd_message_key": "log",
        "dd_tags": "project:fluentbit",
        "TLS": "on",
        "provider": "ecs"
      }
    }
  }
  ```
{{< /site-region >}}


{{< site-region region="gov" >}}
  ```json
  {
    "logConfiguration": {
      "logDriver": "awsfirelens",
      "options": {
        "Name": "datadog",
        "apikey": "<DATADOG_API_KEY>",
        "Host": "http-intake.logs.ddog-gov.datadoghq.com",
        "dd_service": "firelens-test",
        "dd_source": "redis",
        "dd_message_key": "log",
        "dd_tags": "project:fluentbit",
        "TLS": "on",
        "provider": "ecs"
      }
    }
  }
  ```
{{< /site-region >}}



{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
**참고**: `apikey` 및 `Host`을 해당 사이트 `http-intake.logs.`{{< region-param key="dd_site" code="true" >}}와 비교하여 설정하세요. 사용 가능한 파라미터의 전체 목록은 [Datadog Fluent Bit 설명서][24]에 설명되어 있습니다.

[24]: https://docs.datadoghq.com/ko/integrations/fluentbit/#configuration-parameters
{{< /site-region >}}


  `dd_service` , `dd_source`, `dd_tags`는 원하는 태그에 맞게 조정할 수 있습니다.

3.  Fargate 작업이 실행될 때마다 Fluent Bit는 Fargate 작업에서 관리하는 모든 컨테이너에 대한 정보가 포함된 컨테이너 로그를 Datadog로 전송합니다. 해당 로그에 대한 [로그 탐색 페이지][24], [빌드 모니터][25]에서 원시 로그를 볼 수 있으며 [라이브 컨테이너 보기][26]를 사용할 수 있습니다.

{{< tabs >}}
{{% tab "Web UI" %}}
##### 웹 UI

기존 작업 정의 점검에 Fluent Bit 컨테이너를 추가하려면 **로그 라우터 통합** 아래의 ** FireLens 활성화 통합** 체크박스를 선택하면 `log_router` 컨테이너가 자동으로 생성됩니다. 이렇게 하면 지역 이미지를 가져오지만, `latest` 태그 대신 `stable` 이미지를 사용하는 것이 좋습니다. **적용**을 클릭하면 기본 컨테이너가 생성됩니다. `firelensConfiguration`을 추가로 커스터마이즈 하단의 **JSON을 통한 설정** 버튼을 클릭하여 수동으로 편집하세요.

이를 추가한 후 로그에서 제출하려는 작업 정의의 컨테이너 애플리케이션을 수정하고 **로그 드라이버를** `awsfirelens`로 변경하여 **로그 옵션**을 위 예시에 표시된 키로 채웁니다.

{{% /tab %}}

{{% tab "AWS CLI" %}}
##### AWS CLI

이전 섹션에서 설명한 대로 애플리케이션에 대한 `log_router` 컨테이너 및 업데이트된 `logConfiguration` 컨테이너 을 포함하도록 기존 JSON 작업 정의 파일을 편집합니다. 이 작업이 완료되면 다음 명령을 사용하여 작업 정의의 새 수정본을 만듭니다:

```bash
AWS ecs register-task-definition --cli-input-json file://<PATH_TO_FILE>/Datadog-에이전트-ecs-fargate.json
```

{{% /tab %}}

{{% tab "CloudFormation" %}}
##### AWS CloudFormation

AWS CloudFormation][1] 템플릿을 사용하려면 `AWS::ECS::TaskDefinition` 리소스를 사용하고 `Datadog` 옵션을 설정하여 로그 관리를 설정하세요.

예를 들어 Fluent Bit를 설정하여 Datadog에 로그를 전송하려면,


{{< site-region region="us" >}}
```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
          - FARGATE
      Cpu: 256
      Memory: 1GB
      ContainerDefinitions:
        - Name: tomcat-test
          Image: 'tomcat:jdk8-adoptopenjdk-openj9'
          LogConfiguration:
            LogDriver: awsfirelens
            Options:
              Name: datadog
              apikey: <DATADOG_API_KEY>
              Host: http-intake.logs.datadoghq.com
              dd_service: test-service
              dd_source: test-source
              TLS: 'on'
              provider: ecs
          MemoryReservation: 500
        - Name: log_router
          Image: 'amazon/aws-for-fluent-bit:stable'
          Essential: true
          FirelensConfiguration:
            Type: fluentbit
            Options:
              enable-ecs-log-metadata: true
          MemoryReservation: 50
```
{{< /site-region >}}


{{< site-region region="us3" >}}
```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
          - FARGATE
      Cpu: 256
      Memory: 1GB
      ContainerDefinitions:
        - Name: tomcat-test
          Image: 'tomcat:jdk8-adoptopenjdk-openj9'
          LogConfiguration:
            LogDriver: awsfirelens
            Options:
              Name: datadog
              apikey: <DATADOG_API_KEY>
              Host: http-intake.logs.us3.datadoghq.com
              dd_service: test-service
              dd_source: test-source
              TLS: 'on'
              provider: ecs
          MemoryReservation: 500
        - Name: log_router
          Image: 'amazon/aws-for-fluent-bit:stable'
          Essential: true
          FirelensConfiguration:
            Type: fluentbit
            Options:
              enable-ecs-log-metadata: true
          MemoryReservation: 50
```
{{< /site-region >}}


{{< site-region region="us5" >}}
```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
          - FARGATE
      Cpu: 256
      Memory: 1GB
      ContainerDefinitions:
        - Name: tomcat-test
          Image: 'tomcat:jdk8-adoptopenjdk-openj9'
          LogConfiguration:
            LogDriver: awsfirelens
            Options:
              Name: datadog
              apikey: <DATADOG_API_KEY>
              Host: http-intake.logs.us5.datadoghq.com
              dd_service: test-service
              dd_source: test-source
              TLS: 'on'
              provider: ecs
          MemoryReservation: 500
        - Name: log_router
          Image: 'amazon/aws-for-fluent-bit:stable'
          Essential: true
          FirelensConfiguration:
            Type: fluentbit
            Options:
              enable-ecs-log-metadata: true
          MemoryReservation: 50
```
{{< /site-region >}}


{{< site-region region="eu" >}}
```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
          - FARGATE
      Cpu: 256
      Memory: 1GB
      ContainerDefinitions:
        - Name: tomcat-test
          Image: 'tomcat:jdk8-adoptopenjdk-openj9'
          LogConfiguration:
            LogDriver: awsfirelens
            Options:
              Name: datadog
              apikey: <DATADOG_API_KEY>
              Host: http-intake.logs.datadoghq.eu
              dd_service: test-service
              dd_source: test-source
              TLS: 'on'
              provider: ecs
          MemoryReservation: 500
        - Name: log_router
          Image: 'amazon/aws-for-fluent-bit:stable'
          Essential: true
          FirelensConfiguration:
            Type: fluentbit
            Options:
              enable-ecs-log-metadata: true
          MemoryReservation: 50
```
{{< /site-region >}}


{{< site-region region="gov" >}}
```yaml
Resources:
  ECSTaskDefinition:
    Type: 'AWS::ECS::TaskDefinition'
    Properties:
      NetworkMode: awsvpc
      RequiresCompatibilities:
          - FARGATE
      Cpu: 256
      Memory: 1GB
      ContainerDefinitions:
        - Name: tomcat-test
          Image: 'tomcat:jdk8-adoptopenjdk-openj9'
          LogConfiguration:
            LogDriver: awsfirelens
            Options:
              Name: datadog
              apikey: <DATADOG_API_KEY>
              Host: http-intake.logs.ddog-gov.datadoghq.com
              dd_service: test-service
              dd_source: test-source
              TLS: 'on'
              provider: ecs
          MemoryReservation: 500
        - Name: log_router
          Image: 'amazon/aws-for-fluent-bit:stable'
          Essential: true
          FirelensConfiguration:
            Type: fluentbit
            Options:
              enable-ecs-log-metadata: true
          MemoryReservation: 50
```
{{< /site-region >}}


CloudFormation 서식 지정 및 구문에 대한 자세한 내용은 [AWS CloudFormation 설명서][2]를 참조하세요.


[1]: https://aws.amazon.com/cloudformation/
[2]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ecs-taskdefinition.html
{{% /tab %}}

{{< /tabs >}}

**참고**: [작업 정의 비밀][27]을 사용하여 `apikey`가 일반 텍스트로 노출되지 않도록 하세요.

#### AWS 로그 드라이버

`awslogs` 로그 드라이버 및 람다 함수를 사용하여  Fargate 로그를 모니터링하고 로그를 Datadog에 라우팅하세요.

1. 로그를 수집하려는 작업 또는 작업의 애플리케이션 컨테이너에서 로그 드라이버를 `awslogs`로 정의합니다. [AWS Fargat 개발자 가이드][28]를 참조하세요.

2. 이렇게 하면 Fargate 작업을 구성하여 로그 정보를 Amazon CloudWatch 로그로 보내도록 설정합니다. 다음은 작업 정의의 스니펫에서 awslogs 로그 드라이버가 설정된 작업/작업 정의의 스니펫을 표시합니다.

   ```json
   {
     "logConfiguration": {
       "logDriver": "awslogs",
       "options": {
         "awslogs-group": "/ecs/fargate-task|job-definition",
         "awslogs-region": "us-east-1",
         "awslogs-stream-prefix": "ecs"
       }
     }
   }
   ```

    `awslogs` 로그 드라이버를 작업 또는 작업 정의에 추가하여 컨테이너 로그를 CloudWatch 로그로 보내는 자세한 방법은 [awslogs 로그 드라이버 사용][29]을 참조합니다. 이 드라이버는 컨테이너에서 생성된 로그를 수집하여 CloudWatch로 직접 전송합니다.

3. 마지막으로 [Datadog 람다 로그 포워더(Forwarder) 함수][30]를 사용하여 CloudWatch에서 로그를 수집하여 Datadog로 전송합니다.

### 트레이스 수집


{{< site-region region="us,us3,us5,eu,ap1,gov" >}}
1. [위의 지침](#installation)에 따라 작업 또는 작업 정의에 Datadog 에이전트 컨테이너를 추가하고 환경 변수 `DD_APM_ENABLED`를 `true`로 설정합니다. `DD_SITE` 변수를 {{< region-param key="dd_site" code="true" >}}로 설정합니다. 설정하지 않으면 기본값은 `datadoghq.com`입니다.
{{< /site-region >}}


2. 설정을 기반으로 애플리케이션 계측:

   **참고**: Fargate 애플리케이션 성능 모니터링(APM) 애플리케이션의 경우, `DD_AGENT_HOST`를 설정하지 **마세요.** 기본값인 `localhost`이 작동합니다.

   | 언어                         |
   |------------------------------------|
   |자바(Java)][31] |
   | [파이썬(Python)][32] |
   | [루비(Ruby)][33] |
   | [고(Go)][34] |
   | [Node.js][35] |
   | [PHP][36] |
   | [C++][37] |
   | [.NET Core][38] |
   | [.NET Framework][39] |

   [Datadog에 트레이스 전송][40]에 대한 자세한 일반 정보를 참조하세요.

3. 애플리케이션이 Datadog 에이전트 컨테이너와 동일한 작업 또는 작업 정의에서 실행되고 있는지 확인합니다.

### 프로세스 수집

<div class="alert alert-danger">Datadog에서 ECS Fargate 프로세스를 확인할 수 있습니다. ECS Fargate 컨테이너와의 관계를 확인하려면 Datadog 에이전트 v7.50.0 이상 버전을 사용하세요.</div>

Datadog 에서 ECS Fargate 프로세스를 모니터링할 수 있습니다. [실시간 페이지 처리[41]를 사용하세요. 프로세스 수집을 활성화하려면 작업 정의에 [`PidMode` 파라미터 ][42]를 추가하고 다음과 같이 `task`로 설정합니다:

```text
"pidMode": "task"
```
ECS를 기준으로 프로세스 필터링하려면 `AWS Fargate` 컨테이너 패싯을 사용하거나 검색 쿼리 페이지에 `fargate:ecs` 을 입력하세요. 실시간 프로세스 페이지에 입력합니다.

## 즉시 사용 가능한 태그

에이전트는 전체 작업 또는 이 작업 내의 컨테이너에서 전송되는 모든 데이터를 자동 검색하여 태그를 첨부할 수 있습니다. 태그 목록이 자동으로 첨부되는 것은 에이전트의 [카디널리티 설정][43]에 따라 달라집니다.

  | 태그                           | 카디널리티  | 소스               |
  |-------------------------------|--------------|----------------------|
  | `container_name`              | 높음         | ECS API              |
  | `container_id`                | 높음         | ECS API              |
  | `docker_image`                | 낮음          | ECS API              |
  | `image_name`                  | 낮음          | ECS API              |
  | `short_image`                 | 낮음          | ECS API              |
  | `image_tag`                   | 낮음          | ECS API              |
  | `ecs_cluster_name`            | 낮음          | ECS API              |
  | `ecs_container_name`          | 낮음          | ECS API              |
  | `task_arn`                    | 오케스트레이터 | ECS API              |
  | `task_family`                 | 낮음          | ECS API              |
  | `task_name`                   | 낮음          | ECS API              |
  | `task_version`                | 낮음          | ECS API              |
  | `availability-zone`           | 낮음          | ECS API              |
  | `region`                      | 낮음          | ECS API              |

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "aws-fargate" >}}


### 이벤트

ECS Fargate 점검에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "aws-fargate" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][18]에 문의해 주세요.

## 참고 자료

- 블로그 게시물: [Datadog를 사용한  AWS Fargate 애플리케이션 모니터링][44]
- FAQ: [통합 ECS Fargate용 설정][12]
- 블로그 게시물: [FireLens 및 Datadog를 사용한 Fargate 컨테이너 모니터링][45]
- AWS블로그 게시물: [AWS Fargate 모니터링을 위한 핵심 메트릭][46]
- 블로그 게시물: [AWS Fargate 워크로드에서 메트릭 및 로그를 수집하는 방법][47]
- 블로그 게시물: [Datadog를 사용한 AWS Fargate 모니터링][48]
- 블로그 게시물: [Graviton2 기반 AWS Fargate 배포][49]
- 블로그 게시물: [AWS 윈도우즈(Windows) 컨테이너화된 앱용 AWS Fargate 모니터링][50]
- 블로그 게시물: [Datadog를 사용한 AWS Fargate에서 실행되는 프로세스 모니터링][51]
- 블로그 게시물: [Datadog를 사용한 Fargate 기반 AWS 배치 모니터링][52]


[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-metadata-endpoint.html
[2]: https://docs.docker.com/engine/api/v1.30/#operation/ContainerStats
[3]: https://aws.amazon.com/console
[4]: https://aws.amazon.com/cli
[5]: https://aws.amazon.com/cloudformation/
[6]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_replica
[7]: https://docs.datadoghq.com/ko/containers/guide/aws-batch-ecs-fargate
[8]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[9]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ecs.html
[10]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[11]: https://github.com/DataDog/integrations-core/blob/master/ecs_fargate/datadog_checks/ecs_fargate/data/conf.yaml.example
[12]: http://docs.datadoghq.com/integrations/faq/integration-setup-ecs-fargate
[13]: https://docs.datadoghq.com/ko/developers/dogstatsd/
[14]: https://docs.datadoghq.com/ko/agent/docker/#environment-variables
[15]: https://docs.aws.amazon.com/AmazonECS/latest/userguide/task_definition_parameters.html#container_definition_labels
[16]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/cloudwatch-metrics.html
[17]: https://docs.datadoghq.com/ko/integrations/amazon_ecs/#data-collected
[18]: https://docs.datadoghq.com/ko/help/
[19]: https://github.com/aws-samples/amazon-ecs-firelens-examples/tree/mainline/examples/fluent-bit/datadog
[20]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html
[21]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#container_definitions
[22]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_firelens.html#firelens-using-fluentbit
[23]: https://github.com/aws-samples/amazon-ecs-firelens-examples/tree/master/examples/fluent-bit/parse-json
[24]: https://app.datadoghq.com/logs
[25]: https://docs.datadoghq.com/ko/monitors/monitor_types/
[26]: https://docs.datadoghq.com/ko/infrastructure/livecontainers/?tab=linuxwindows
[27]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecs-taskdefinition-secret.html
[28]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html
[29]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using_awslogs.html
[30]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[31]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/java?tab=containers#automatic-instrumentation
[32]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/python?tab=containers#instrument-your-application
[33]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/ruby#instrument-your-application
[34]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/go/?tab=containers#activate-go-integrations-to-create-spans
[35]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/nodejs?tab=containers#instrument-your-application
[36]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/php?tab=containers#automatic-instrumentation
[37]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/cpp?tab=containers#instrument-your-application
[38]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/dotnet-core?tab=containers#custom-instrumentation
[39]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/dotnet-framework?tab=containers#custom-instrumentation
[40]: https://docs.datadoghq.com/ko/tracing/setup/
[41]: https://app.datadoghq.com/process
[42]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#other_task_definition_params
[43]: https://docs.datadoghq.com/ko/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[44]: https://www.datadoghq.com/blog/monitor-aws-fargate
[45]: https://www.datadoghq.com/blog/collect-fargate-logs-with-firelens/
[46]: https://www.datadoghq.com/blog/aws-fargate-metrics/
[47]: https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/
[48]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/
[49]: https://www.datadoghq.com/blog/aws-fargate-on-graviton2-monitoring/
[50]: https://www.datadoghq.com/blog/aws-fargate-windows-containers-support/
[51]: https://www.datadoghq.com/blog/monitor-fargate-processes/
[52]: https://www.datadoghq.com/blog/monitor-aws-batch-on-fargate/
