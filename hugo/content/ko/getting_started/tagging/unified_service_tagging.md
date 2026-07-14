---
algolia:
  tags:
  - unified service tags
  - unified
  - unified service
  - service tags
description: 표준화된 환경, 서비스 및 버전 태그를 사용하여 트레이스, 메트릭 및 로그 전체에 텔레메트리를 연결해 일관된 모니터링을 수행하세요.
further_reading:
- link: /getting_started/tagging/using_tags
  tag: 설명서
  text: Datadog 앱에서 태그 사용하는 방법 알아보기
- link: /tracing/version_tracking
  tag: 설명서
  text: Datadog APM에서 버전 태그로 배포 모니터링하기
- link: https://www.datadoghq.com/blog/autodiscovery-docker-monitoring/
  tag: 블로그
  text: Autodiscovery에 대해 자세히 알아보기
title: Unified Service Tagging
---
## 개요 {#overview}

Unified service tagging은 `env`, `service`, `version`의 세 가지 [예약된 태그][1]를 사용해 Datadog 텔레메트리를 묶어 줍니다.

이 세 가지 태그를 사용해 할 수 있는 일은 다음과 같습니다.

- 버전별로 필터링된 트레이스 및 컨테이너 메트릭으로 배포 영향 파악
- 일관된 태그로 트레이스, 메트릭, 로그를 원활하게 탐색
- 통일된 방식으로 환경 또는 버전에 따라 서비스 데이터 조회

{{< img src="tagging/unified_service_tagging/overview.mp4" alt="Unified Service Tagging" video=true >}}

**참고**:

-  `version` 태그는 새 애플리케이션 배포마다 변경될 것으로 예상됩니다. 애플리케이션 코드의 두 가지 버전에는 서로 다른 `version` 태그가 있어야 합니다.
- Autodiscovery 로그 구성이 없는 경우, 로그의 공식 서비스는 컨테이너 단축 이미지로 기본 설정됩니다. 로그의 공식 서비스를 재정의하려면 Autodiscovery [Docker 레이블/포드 어노테이션][2]을 추가하세요. 예: `"com.datadoghq.ad.logs"='[{"service": "service-name"}]'`
- 호스트 정보가 데이터베이스 및 캐시 스팬에서 제외되는 이유는 스팬과 연결된 호스트가 데이터베이스/캐시 호스트가 아니기 때문입니다.

### 요구 사항 {#requirements}

- Unified service tagging을 사용하려면 [Datadog Agent][3] 6.19.x/7.19.x 이상 설정이 필요합니다.

- Unified service tagging에는 [예약된 태그][1]의 새 구성을 지원하는 SDK 버전이 필요합니다. 언어별 자세한 정보는 [설정 지침][4]을 참조하세요.


| 언어         | 최소 SDK 버전 |
|--------------|------------|
| .NET    |  1.17.0+       |
| C++    |  0.1.0+       |
| Go         |  1.24.0+       |
| Java   |  0.50.0+      |
| Node    |  0.20.3+       |
| PHP  |  0.47.0+      |
| Python  |  0.38.0+      |
| Ruby  |  0.34.0+      |

- Unified service tagging을 사용하려면 태그 구성에 관한 지식이 있어야 합니다. 태그를 구성하는 방법을 잘 모르는 경우, [태깅 시작하기][1] 및 [태그 할당][5] 설명서를 읽어본 다음에 구성으로 계속 진행하세요.

## 구성 {#configuration}

unified service tagging 구성을 시작하려면 환경을 선택하세요.

- [컨테이너화됨](#containerized-environment)
- [컨테이너화되지 않음](#non-containerized-environment)
- [Serverless](#serverless-environment)
- [OpenTelemetry](#opentelemetry)

### 컨테이너화된 환경 {#containerized-environment}

컨테이너화된 환경에서는 `env`, `service`, `version`이 서비스의 환경 변수 또는 레이블을 통해 설정됩니다(예를 들어 Kubernetes 배포 및 포드 레이블, Docker 컨테이너 레이블). Datadog Agent가 이 태깅 구성을 감지하고 컨테이너에서 수집하는 데이터에 이 구성을 적용합니다.

컨테이너화된 환경에서 unified service tagging을 설정하는 방법:

1. [Autodiscovery][6]를 활성화합니다. 이렇게 하면 Datadog Agent가 특정 컨테이너에서 실행되는 서비스를 자동으로 식별하고 그러한 서비스의 데이터를 수집해 환경 변수를 `env`, `service,` `version` 태그에 매핑할 수 있습니다.

2. [Docker][2]를 사용하는 경우, Agent가 컨테이너의 [Docker 소켓][7]에 액세스할 수 있어야 합니다. 그래야 Agent가 환경 변수를 감지하여 표준 태그에 매핑할 수 있습니다.

3. 전체 구성 또는 부분 구성에 따라 컨테이너 오케스트레이션 서비스에 해당하는 환경을 구성합니다(자세한 내용은 아래 참조).

#### 구성 {#configuration-1}

{{< tabs >}}
{{% tab "Kubernetes" %}}

[Admission Controller][1]를 활성화한 상태로 Datadog Cluster Agent를 배포한 경우, Admission Controller가 포드 매니페스트를 변형하고 필수 환경 변수를 모두 주입합니다(구성된 변형 조건을 따름). 이 경우, 포드 매니페스트의 `DD_` 환경 변수를 수동으로 구성할 필요가 없습니다. 자세한 내용은 [Admission Controller 설명서][1]를 참조하세요.

##### 전체 구성 {#full-configuration}

Kubernetes를 사용할 때 unified service tagging 전체 범위를 이용하려면 배포 개체 수준 및 포드 템플릿 사양 수준 둘 모두에 환경 변수를 추가하세요.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    tags.datadoghq.com/env: "<ENV>"
    tags.datadoghq.com/service: "<SERVICE>"
    tags.datadoghq.com/version: "<VERSION>" 
...
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>" 
  containers:
  -  ...
     env:
          - name: DD_ENV
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/env']
          - name: DD_SERVICE
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/service']
          - name: DD_VERSION 
            valueFrom: 
              fieldRef: 
                fieldPath: metadata.labels['tags.datadoghq.com/version']
```

OpenTelemetry Resource Attributes 환경 변수를 사용하여 `env`, `service`, `version` 태그를 설정할 수도 있습니다.

```yaml
  containers:
  -  ...
     env:
         - name: OTEL_RESOURCE_ATTRIBUTES
           value: "service.name=<SERVICE>,service.version=<VERSION>,deployment.environment=<ENV>"
         - name: OTEL_SERVICE_NAME
           value: "<SERVICE>"
```
<div class="alert alert-danger"> <code>OTEL_SERVICE_NAME</code> 환경 변수는 <code>service.name</code> 환경 변수의 <code>OTEL_RESOURCE_ATTRIBUTES</code> 속성보다 우선합니다.</div>

##### 부분 구성 {#partial-configuration}

###### 포드 수준 메트릭 {#pod-level-metrics}

포드 수준 메트릭을 구성하려면 다음 표준 레이블(`tags.datadoghq.com`)을 Deployment, StatefulSet 또는 Job의 포드 사양에 추가합니다.

```yaml
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>" 
```
이러한 레이블은 포드 수준 Kubernetes CPU, 메모리, 네트워크 및 디스크 메트릭에 적용되며 [Kubernete의 downward API][2]를 통해 `DD_ENV`, `DD_SERVICE`, `DD_VERSION`을 서비스의 컨테이너에 주입하는 데 사용할 수 있습니다.

포드당 컨테이너가 여러 개인 경우, 컨테이너별로 표준 레이블을 지정할 수 있습니다.

```yaml
tags.datadoghq.com/<container-name>.env
tags.datadoghq.com/<container-name>.service
tags.datadoghq.com/<container-name>.version 
```

###### 상태 메트릭 {#state-metrics}

[Kubernetes 상태 메트릭][3]을 구성하는 방법:

1. 구성 파일에서 `join_standard_tags`를 `true`로 설정합니다. 설정 위치는 이 [구성 파일 예시][4]를 참조하세요.

2. 동일한 표준 레이블을 상위 리소스의 레이블 컬렉션에 추가합니다(예: `Deployment`).

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>" 
  spec:
    template:
      metadata:
        labels:
          tags.datadoghq.com/env: "<ENV>"
          tags.datadoghq.com/service: "<SERVICE>"
          tags.datadoghq.com/version: "<VERSION>" 
  ```

###### Datadog SDK 및 StatsD 클라이언트 {#datadog-sdk-and-statsd-client}

[Datadog SDK][5] 및 [StatsD client][6] 환경 변수를 구성하려면 [Kubernetes의 downward API][2]를 아래의 형식으로 사용하세요.

```yaml
containers:
-  ...
    env:
        - name: DD_ENV
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/env']
        - name: DD_SERVICE
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/service']
        - name: DD_VERSION 
          valueFrom: 
            fieldRef: 
              fieldPath: metadata.labels['tags.datadoghq.com/version'] 
```

##### 컨테이너화된 환경에서 APM 데이터 자동 버전 태깅 {#automatic-version-tagging-for-apm-data-in-containerized-environments}

<div class="alert alert-info">이 기능은 <a href="https://docs.datadoghq.com/tracing/">Application Performance Monitoring(APM)</a> 데이터에만 활성화됩니다.</div>

APM에서 `version` 태그를 사용하여 [배포를 모니터링][7]하고 [잘못된 배포 자동 탐지][8]를 사용해 오류 코드 배포를 식별할 수 있습니다.

APM 데이터의 경우, Datadog은 `version` 태그를 다음과 같은 우선순위 순서로 설정합니다. `version`을 수동으로 설정하면 Datadog이 사용자의 `version` 값을 재정의하지 않습니다.

| 우선순위         | 버전 값 |
|--------------|------------|
| 1    |  {your version value}       |
| 2   | {image_tag}_{first_7_digits_of_git_commit_sha}       |
| 3         |  {image_tag} 또는 {first_7_digits_of_git_commit_sha}(하나만 사용 가능한 경우)       |

요구 사항: 
- Datadog Agent 버전 7.52.0 이상
- 서비스가 컨테이너화된 환경에서 실행되고 `image_tag`만으로 새 버전 배포를 추적하는 데 충분하면 추가적인 구성이 필요하지 않습니다.
- 서비스가 컨테이너화된 환경에서 실행되지 않거나, Git SHA도 포함하고자 하는 경우 [빌드 아티팩트에 Git 정보를 임베드][9]하세요.


[1]: /ko/agent/cluster_agent/admission_controller/
[2]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#capabilities-of-the-downward-api
[3]: /ko/agent/kubernetes/data_collected/#kube-state-metrics
[4]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/conf.yaml.example
[5]: /ko/tracing/send_traces/
[6]: /ko/integrations/statsd/
[7]: /ko/tracing/services/deployment_tracking/
[8]: /ko/watchdog/faulty_deployment_detection/
[9]: /ko/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts

{{% /tab %}}

{{% tab "Docker" %}}
##### 전체 구성 {#full-configuration-1}

unified service tagging 전체 범위를 이용하려면 `DD_ENV`, `DD_SERVICE`, `DD_VERSION` 환경 변수 및 해당하는 Docker 레이블을 컨테이너에 맞게 설정하세요.

`service` 및 `version`의 값을 Dockerfile에 제공할 수 있습니다.

```yaml
ENV DD_SERVICE <SERVICE>
ENV DD_VERSION <VERSION> 

LABEL com.datadoghq.tags.service="<SERVICE>"
LABEL com.datadoghq.tags.version="<VERSION>" 
```

`env`는 배포 시점에 결정될 가능성이 크기 때문에, 환경 변수와 레이블은 나중에 주입할 수 있습니다.

```shell
docker run -e DD_ENV=<ENV> -l com.datadoghq.tags.env=<ENV> ...
```

배포 시 모든 설정을 완료하는 편을 선호할 수도 있습니다.

```shell
docker run -e DD_ENV="<ENV>" \
           -e DD_SERVICE="<SERVICE>" \
           -e DD_VERSION="<VERSION>" \ 
           -l com.datadoghq.tags.env="<ENV>" \
           -l com.datadoghq.tags.service="<SERVICE>" \
           -l com.datadoghq.tags.version="<VERSION>" \ 
           ...
```

##### 부분 구성 {#partial-configuration-1}

서비스에 Datadog 환경 변수가 필요하지 않은 경우(예를 들어 Redis, PostgreSQL, NGINX와 같은 타사 소프트웨어 및 APM이 추적하지 않는 애플리케이션) Docker 레이블을 사용하면 됩니다.

```yaml
com.datadoghq.tags.env
com.datadoghq.tags.service
com.datadoghq.tags.version 
```

전체 구성에서 설명한 것과 같이, 이러한 레이블은 Dockerfile에 설정할 수도 있고 컨테이너 실행을 위해 인수로 설정할 수도 있습니다.

##### 컨테이너화된 환경에서 APM 데이터 자동 버전 태깅 {#automatic-version-tagging-for-apm-data-in-containerized-environments-1}

<div class="alert alert-info">이 기능은 <a href="/tracing/">Application Performance Monitoring(APM)</a> 데이터에만 활성화됩니다.</div>

APM에서 `version` 태그를 사용하여 [배포를 모니터링][1]하고 [잘못된 배포 자동 탐지][2]를 사용해 오류 코드 배포를 식별할 수 있습니다.

APM 데이터의 경우, Datadog은 `version` 태그를 다음과 같은 우선순위 순서로 설정합니다. `version`을 수동으로 설정하면 Datadog이 사용자의 `version` 값을 재정의하지 않습니다.

| 우선순위         | 버전 값 |
|--------------|------------|
| 1    |  {your version value}       |
| 2   | {image_tag}_{first_7_digits_of_git_commit_sha}       |
| 3         |  {image_tag} 또는 {first_7_digits_of_git_commit_sha}(하나만 사용 가능한 경우)       |

요구 사항: 
- Datadog Agent 버전 7.52.0 이상
- 서비스가 컨테이너화된 환경에서 실행되고 `image_tag`만으로 새 버전 배포를 추적하는 데 충분하면 추가적인 구성이 필요하지 않습니다.
- 서비스가 컨테이너화된 환경에서 실행되지 않거나, Git SHA도 포함하고자 하는 경우 [빌드 아티팩트에 Git 정보를 임베드][3]하세요.
 

[1]: /ko/tracing/services/deployment_tracking/
[2]: /ko/watchdog/faulty_deployment_detection/
[3]: /ko/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts

{{% /tab %}}

{{% tab "ECS" %}}

<div class="alert alert-danger">
Fluent Bit 또는 FireLens를 사용하는 ECS Fargate에서는, unified service tagging을 로그 수집이 아닌 메트릭과 트레이스에만 사용할 수 있습니다.
</div>

##### 전체 구성 {#full-configuration-2}

unified service tagging 전체 범위를 이용하려면 `DD_ENV`, `DD_SERVICE`, `DD_VERSION`(자동 버전 태깅 포함, 선택 사항) 환경 변수 및 해당하는 Docker 레이블을 각 서비스의 컨테이너 런타임 환경에서 설정하세요. 예를 들어 ECS 작업 정의를 통해 이 모든 구성을 한곳에서 설정할 수 있습니다.

```
"environment": [
  {
    "name": "DD_ENV",
    "value": "<ENV>"
  },
  {
    "name": "DD_SERVICE",
    "value": "<SERVICE>"
  },
  {
    "name": "DD_VERSION",
    "value": "<VERSION>"
  }
   
],
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```
<div class="alert alert-danger">
ECS Fargate에서는 이러한 태그를 Datadog Agent 컨테이너가 <strong>아니라</strong> 애플리케이션 컨테이너에 추가해야 합니다.
</div>

##### 부분 구성 {#partial-configuration-2}

서비스에 Datadog 환경 변수가 필요하지 않은 경우(예를 들어 Redis, PostgreSQL, NGINX와 같은 타사 소프트웨어 및 APM이 추적하지 않는 애플리케이션) ECS 작업 정의에서 Docker 레이블을 사용하면 됩니다.

```
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

##### 컨테이너화된 환경에서 APM 데이터 자동 버전 태깅 {#automatic-version-tagging-for-apm-data-in-containerized-environments-2}

<div class="alert alert-info">이 기능은 <a href="/tracing/">Application Performance Monitoring(APM)</a> 데이터에만 활성화됩니다.</div>

APM에서 `version` 태그를 사용하여 [배포를 모니터링][1]하고 [잘못된 배포 자동 탐지][2]를 사용해 오류 코드 배포를 식별할 수 있습니다.

APM 데이터의 경우, Datadog은 `version` 태그를 다음과 같은 우선순위 순서로 설정합니다. `version`을 수동으로 설정하면 Datadog이 사용자의 `version` 값을 재정의하지 않습니다.

| 우선순위         | 버전 값 |
|--------------|------------|
| 1    |  {your version value}       |
| 2   | {image_tag}_{first_7_digits_of_git_commit_sha}       |
| 3         |  {image_tag} 또는 {first_7_digits_of_git_commit_sha}(하나만 사용 가능한 경우)       |

요구 사항: 
- Datadog Agent 버전 7.52.0 이상
- 서비스가 컨테이너화된 환경에서 실행되고 `image_tag`만으로 새 버전 배포를 추적하는 데 충분하면 추가적인 구성이 필요하지 않습니다.
- 서비스가 컨테이너화된 환경에서 실행되지 않거나, Git SHA도 포함하고자 하는 경우 [빌드 아티팩트에 Git 정보를 임베드][3]하세요.

[1]: /ko/tracing/services/deployment_tracking/
[2]: /ko/watchdog/faulty_deployment_detection/
[3]: /ko/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts

{{% /tab %}}
{{% /tabs %}}

### 컨테이너화되지 않은 환경 {#non-containerized-environment}

서비스의 바이너리 또는 실행 파일을 어떻게 구축하고 배포하는지에 따라, 설정 환경 변수에 몇 가지 옵션을 사용할 수 있습니다. 호스트당 서비스를 하나 이상 실행할 가능성이 있으므로, Datadog에서는 이러한 환경 변수의 범위를 단일 프로세스로 지정하는 편을 권장합니다.

서비스의 런타임에서 [트레이스][8], [로그][9], [RUM 리소스][10], [Synthetic 테스트][11], [StatsD metrics][12]에 대하여 직접 발생하는 모든 텔레메트리의 구성 지점을 하나만 형성하려면 다음 중 한 가지를 선택합니다.

1. 실행 파일의 명령에 있는 환경 변수 내보내기:

   ```
   DD_ENV=<env> DD_SERVICE=<service> DD_VERSION=<version> /bin/my-service
   ```

2. 또는 [Chef][13], [Ansible][14]이나 다른 오케스트레이션 도구를 사용하여 시스템의 systmd 또는 initd 구성 파일을 `DD` 환경 변수로 채웁니다. 서비스 프로세스가 시작되면 그러한 변수에 액세스할 수 있습니다.

   {{< tabs >}}
   {{% tab "트레이스" %}}

   unified service tagging에 대하여 트레이스를 구성하는 경우:

   1. [Datadog SDK][1]를 `DD_ENV`로 구성해야 `env`의 정의를 트레이스를 생성 중인 애플리케이션에 더 가깝게 유지할 수 있습니다. 이 방식을 이용하면 `env` 태그를 스팬 메타데이터의 태그에서 자동으로 소싱할 수 있습니다.

   2. 스팬을 `DD_VERSION`으로 구성하여 SDK에 속하는 서비스에 해당하는 모든 스팬에 버전을 추가합니다(일반적으로 `DD_SERVICE`). 이렇게 하면 서비스가 외부 서비스와 이름이 같은 스팬을 생성하는 경우, 그러한 스팬이 `version`을 태그로 수신하지 않게 됩니다.

      스팬에 버전이 있는 한, 해당 버전이 그러한 스팬에서 생성된 트레이스 메트릭에 추가됩니다. 버전은 코드에 수동으로 추가할 수도 있고, Datadog SDK가 자동으로 추가할 수도 있습니다. 구성된 경우, APM 및 [DogStatsD 클라이언트][2]가 이것을 사용하여 트레이스 데이터 및 StatsD 메트릭을 `env`, `service`, `version`으로 태그합니다. 활성화된 경우, Datadog SDK는 이러한 변수의 값도 로그에 주입합니다.

      **참고**: **스팬당 서비스 하나**만 있을 수 있습니다. 일반적으로 트레이스 메트릭에도 서비스가 한 개 있습니다. 하지만 호스트의 태그에 다른 서비스가 정의되어 있는 경우, 그러한 구성된 서비스 태그가 해당 호스트에서 발생한 모든 트레이스 메트릭에 표시됩니다.

[1]: /ko/tracing/setup/
[2]: /ko/extend/dogstatsd/
   {{% /tab %}}

   {{% tab "로그" %}}

   [연결된 로그 및 트레이스][1]를 사용하는 경우, Datadog SDK에 자동 로그 주입이 지원되면 자동 로그 주입을 활성화하세요. 그러면 Datadog SDK가 `env`, `service`, `version`를 로그에 자동으로 주입하기 때문에 그러한 필드에 대한 다른 곳의 수동 구성이 제거됩니다.

[1]: /ko/tracing/other_telemetry/connect_logs_and_traces/
   {{% /tab %}}

   {{% tab "RUM 및 세션 리플레이" %}}

   [연결된 RUM 및 트레이스][1]를 사용하는 경우, `service` 필드에서 브라우저 애플리케이션을 지정하고 `env` 필드에서 환경을 정의하고 초기화 파일의 `version` 필드에 버전을 나열하세요.

   [RUM 애플리케이션을 생성][2]할 때 `env` 및 `service` 이름을 확인하세요.


[1]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm/
[2]: /ko/real_user_monitoring/application_monitoring/browser/setup/
   {{% /tab %}}

   {{% tab "Synthetics" %}}

   [연결된 Synthetic 브라우저 테스트 및 트레이스][1]를 사용하는 경우, 헤더를 보낼 대상 URL을 [통합 설정 페이지][2]의 **브라우저 테스트용 APM 통합** 섹션 아래로 지정하세요.

   와일드카드로 `*`을 사용할 수 있습니다(예: `https://*.datadoghq.com`).

[1]: /ko/synthetics/apm/
[2]: https://app.datadoghq.com/synthetics/settings/integrations
   {{% /tab %}}

   {{% tab "Custom Metrics" %}}

   [사용자 지정 StatsD 메트릭][1]에는 태그가 추가 전용 방식으로 추가됩니다. 예를 들어 `env`에 서로 다른 값이 두 개 있는 경우, 해당 메트릭은 두 환경 모두로 태그됩니다. 한 태그가 이름이 같은 다른 태그를 재정의하는 순서는 없습니다.

   서비스에 `DD_ENV`, `DD_SERVICE`, `DD_VERSION`에 대한 액세스 권한이 있으면 DogStatsD 클라이언트가 해당하는 태그를 자동으로 사용자 지정 메트릭에 추가합니다.

   **참고**: .NET 및 PHP용 Datadog DogStatsD 클라이언트는 이 기능을 지원하지 않습니다.

[1]: /ko/metrics/
   {{% /tab %}}

   {{% tab "시스템 메트릭" %}}

   인프라 메트릭에 `env` 및 `service` 태그를 추가할 수 있습니다. 컨테이너화되지 않은 상황에서는 서비스 메트릭 태깅이 Agent 수준에서 구성됩니다.

   이 구성은 서비스의 프로세스를 호출할 때마다 변경되지 않으므로, `version`을 추가하지 않는 것이 좋습니다.

#### 호스트당 단일 서비스 {#single-service-per-host}

Agent의 [메인 구성 파일][1]에서 다음 구성 설정:

```yaml
env: <ENV>
tags:
  - service:<SERVICE>
```

이렇게 설정하면 Agent에서 발생한 모든 데이터에 `env` 및 `service`의 일관된 태깅을 보장합니다.

#### 호스트당 복수 서비스 {#multiple-services-per-host}

Agent의 [메인 구성 파일][1]에서 다음 구성 설정:

```yaml
env: <ENV>
```

프로세스 수준에서 CPU, 메모리 및 디스크 I/O 메트릭에 고유한 `service` 태그를 얻으려면 Agent의 구성 폴더에 [프로세스 검사][2]를 구성하세요(예를 들어 `process.d/conf.yaml` 아래 `conf.d` 폴더에).

```yaml
init_config:
instances:
    - name: web-app
      search_string: ["/bin/web-app"]
      exact_match: false
      service: web-app
    - name: nginx
      search_string: ["nginx"]
      exact_match: false
      service: nginx-web-app
```

**참고**: Agent의 메인 구성 파일에 이미 `service` 태그 세트가 전역으로 설정된 경우, 프로세스 메트릭이 두 개의 서비스로 태그됩니다. 이렇게 하면 메트릭을 해석할 때 혼동될 수 있기 때문에, `service` 태그는 프로세스 검사의 구성에서만 구성하는 것이 좋습니다.

[1]: /ko/agent/configuration/agent-configuration-files
[2]: /ko/integrations/process
    {{% /tab %}}
    {{< /tabs >}}

### Serverless 환경 {#serverless-environment}

AWS Lambda 함수에 대한 자세한 정보는 [태그를 사용하여 Lambda 텔레메트리를 연결하는 방법][15]을 참조하세요.

### OpenTelemetry {#opentelemetry}

OpenTelemetry를 사용할 때는 다음 [리소스 속성][16]을 해당하는 Datadog 규약에 매핑합니다.

| OpenTelemetry 규약 | Datadog 규약 |
| --- | --- |
| `deployment.environment` <sup>1</sup>  | `env` |
| `deployment.environment.name` <sup>2</sup> | `env` |
| `service.name` | `service` |
| `service.version` | `version` |

1: `deployment.environment`는 [OpenTelemetry 시맨틱 규약 v1.27.0][17]에서 사용이 중단되었고 대신 `deployment.environment.name`이 사용됩니다.  
2: `deployment.environment.name`은 Datadog Agent 7.58.0+ 및 Datadog Exporter v0.110.0+에서 지원됩니다.

<div class="alert alert-danger">다음과 같은 Datadog 전용 환경 변수 <code>DD_SERVICE</code>, <code>DD_ENV</code> 또는 <code>DD_VERSION</code> 은 OpenTelemetry 구성에서 바로 지원되지 않습니다.</div>

{{< tabs >}}
{{% tab "환경 변수" %}}

환경 변수를 사용하여 리소스 속성을 설정하려면 `OTEL_RESOURCE_ATTRIBUTES`를 적절한 값으로 설정하세요.

```shell
export OTEL_RESOURCE_ATTRIBUTES="service.name=my-service,deployment.environment=production,service.version=1.2.3"
```

{{% /tab %}}

{{% tab "SDK" %}}

애플리케이션의 리소스 속성을 설정하려면 원하는 속성을 포함한 `Resource`를 생성한 다음 이를 `TracerProvider`에 연결합니다.

Python을 사용하는 경우의 예시:

```python
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider

resource = Resource(attributes={
   "service.name": "<SERVICE>",
   "deployment.environment": "<ENV>",
   "service.version": "<VERSION>"
})
tracer_provider = TracerProvider(resource=resource)
```

{{% /tab %}}

{{% tab "Collector" %}}

OpenTelemetry Collector에서 리소스 속성을 설정하려면 Collector 구성 파일의 [변환 프로세서][100]를 사용하세요. 변환 프로세서를 사용하면 수집한 텔레메트리 데이터를 Datadog 익스포터로 보내기 전에 데이터의 속성을 수정할 수 있습니다.

```yaml
processors:
  transform:
    trace_statements:
      - context: resource
        statements:
          - set(attributes["service.name"], "my-service")
          - set(attributes["deployment.environment"], "production")
          - set(attributes["service.version"], "1.2.3")
...
```

[100]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/tagging/
[2]: /ko/agent/docker/integrations/?tab=docker
[3]: /ko/getting_started/agent
[4]: /ko/tracing/setup
[5]: /ko/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments
[6]: /ko/getting_started/agent/autodiscovery
[7]: /ko/agent/docker/?tab=standard#optional-collection-agents
[8]: /ko/getting_started/tracing/
[9]: /ko/getting_started/logs/
[10]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm/
[11]: /ko/getting_started/synthetics/
[12]: /ko/integrations/statsd/
[13]: https://www.chef.io/
[14]: https://www.ansible.com/
[15]: /ko/serverless/configuration/#connect-telemetry-using-tags
[16]: https://opentelemetry.io/docs/languages/js/resources/
[17]: https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.27.0