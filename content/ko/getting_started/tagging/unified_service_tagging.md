---
algolia:
  tags:
  - 통합 서비스 태그
  - 통합
  - 통합 서비스
  - 서비스 태그
further_reading:
- link: /getting_started/tagging/using_tags
  tag: 설명서
  text: Datadog 앱에서 태그 사용하는 방법 알아보기
- link: /tracing/version_tracking
  tag: 설명서
  text: Datadog APM에서 버전 태그로 배포 모니터링하기
- link: https://www.datadoghq.com/blog/autodiscovery-docker-monitoring/
  tag: 블로그
  text: 자동탐지에 대해 자세히 알아보기
kind: 설명서
title: 통합 서비스 태깅
---

## 개요

통합 서비스 태깅은 세 가지 [예약된 태그][1](`env`,`service`, `version`)를 사용해 Datadog 텔레메트리를 하나로 묶습니다.

세 가지 태그를 사용해 다음을 할 수 있습니다.

- 버전별로 필터링된 트레이스 및 컨테이너 메트릭으로 배포가 미치는 영향을 알아봅니다.
- 일관성 있는 태그를 사용하여 트레이스, 메트릭, 로그 사이에서 원활하게 이동합니다.
- 통일된 방식으로 환경 또는 버전에 따라 서비스 데이터를 표시합니다.

{{< img src="tagging/unified_service_tagging/overview.mp4" alt="통합 서비스 태깅" video=true >}}

**참조**: 자동탐지 로그 설정이 존재하지 않는 경우, 로그의 공식 서비스 기본값이 컨테이너의 짧은 이미지가 됩니다. 로그 공식 서비스를 재정의하려면 자동탐지 [Docker 레이블/Pod 주석][2]을 추가하세요(예: `"com.datadoghq.ad.logs"='[{"service": "service-name"}]'`).

### 필수 조건

- 통합 서비스 태깅을 사용하려면 [Datadog 에이전트][3] 6.19.x/7.19.x 이상을 설치해야 합니다.

- 통합 서비스 태깅을 사용하려면 [전용 태그][1]의 새 설정을 지원하는 트레이서 버전이 필요합니다. 언어별로 자세한 정보는 [설정 안내][4] 가이드에서 찾아볼 수 있습니다.


| 언어         | 최소 트레이서 버전 |
|--------------|------------|
| .NET    |  1.17.0+       |
| C++    |  1.1.4+       |
| Go         |  1.24.0+       |
| Java   |  0.50.0+      |
| Node    |  0.20.3+       |
| PHP  |  0.47.0+      |
| Python  |  0.38.0+      |
| Ruby  |  0.34.0+      |

- 통합 서비스 태깅을 사용하려면 태그 설정과 관련된 지식이 있어야 합니다. 태그 설정법을 잘 모르겠다면 [태그 시작하기][1] 가이드와 [태그 할당][5] 설명서를 읽은 후 다음 설정을 진행하세요.

## 설정

통합 서비스 태깅 설정을 시작하려면 환경을 선택하세요.

- [컨테이너화 됨](#containerized-environment)
- [컨테이너화되지 않음](#non-containerized-environment)

### 컨테이너화된 환경

컨테이너화된 환경에서 `env`, `service`, `version`은 서비스 환경 변수나 레이블을 통해(예: Kubernetes 배포, Pod 레이블, Docker 컨테이 레이블) 설정됩니다. Datadog 에이전트에서는 태그 설정을 감지하여 컨테이너에서 수집한 데이터에 적용합니다.

통합 서비스 태깅을 컨테이너화 환경에서 설정하는 방법:

1. [자동탐지][6]를 활성화합니다. 자동탐지를 사용하면 Datadog 에이전트가 자동으로 특정 컨테이너에서 실행 중인 서비스를 식별하고, 해당 서비스에서 데이터를 수집하여 환경 변수를 `env`, `service,`, `version` 태그에 매핑할 수 있습니다.

2. [Docker][2]를 사용한다면 에이전트가 컨테이너 [Docker 소켓][7]에 액세스할 수 있는지 확인하세요. 이렇게 하면 에이전트가 환경 변수를 탐지하고 표준 태그에 매핑합니다.

3. 아래와 같이 전체 설정이나 부분 설정을 기준으로 컨테이너 오케스트레이션 서비스에 해당하는 환경을 설정하세요.

#### 설정

{{< tabs >}}
{{% tab "Kubernetes" %}}

[Admission Controller][1]를 활성화하여 Datadog 클러스터 에이전트를 배포한 경우, Admission Controller에서 Pod 매니페스트를 변이시키고(설정된 변이 조건에 따라) 필요한 모든 환경 변수를 삽입합니다. 이 경우, Pod 매니페스트 내 환경 변수 `DD_`를 직접 설정할 필요가 없습니다. 자세한 내용은 [Admission Controller 설명서][1]를 참고하세요.

##### 전체 설정

Kubernetes 사용 시 통합 서비스 태그를 전부 활용하려면 배포 개체 수준과 Pod 템플릿 스펙 수준 모두에 환경 변수를 추가하세요.

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

##### 부분 설정

###### Pod 수준 메트릭

Pod 수준 메트릭을 설정하려면 다음의 표준 레이블(`tags.datadoghq.com`)을 Deployment, StatefulSet, 또는 Job의 Pod 스펙에 추가하세요.

```yaml
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
```
이 레이블은 Pod 수준 Kubernetes CPU, 메모리, 네트워크, 디스크 메트릭을 포괄하며, [Kubernetes의 하향 API][2]를 통해 `DD_ENV`, `DD_SERVICE`, `DD_VERSION`을 서비스 컨테이너에 삽입할 때 사용됩니다.

Pod마다 여러 컨테이너를 사용한다면 컨테이너별로 표준 레이블을 지정할 수 있습니다.

```yaml
tags.datadoghq.com/<container-name>.env
tags.datadoghq.com/<container-name>.service
tags.datadoghq.com/<container-name>.version
```

###### 상태 메트릭

[Kubernetes 상태 메트릭][3]을 설정하는 방법은 다음과 같습니다.

1. 설정 파일에 `join_standard_tags`를 `true`로 설정합니다. 설정 위치에 대해서는 [설정 파일 예시][4]를 참고하세요.

2. 동일한 표준 레이블을 상위 리소스용 레이블 컬렉션에 추가합니다(예: `Deployment`).

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

###### APM 트레이서와 StatsD 클라이언트

[APM 트레이서][5]와 [StatsD 클라이언트][6] 환경 변수를 설정하려면 다음 형식에서 [쿠버네티스 Downward API][2]를 사용하세요.

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


[1]: /ko/agent/cluster_agent/admission_controller/
[2]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#capabilities-of-the-downward-api
[3]: /ko/agent/kubernetes/data_collected/#kube-state-metrics
[4]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/conf.yaml.example
[5]: /ko/tracing/send_traces/
[6]: /ko/integrations/statsd/
{{< /tabs >}}

{{% tab "도커" %}}
##### 전체 설정

`DD_ENV`, `DD_SERVICE`, `DD_VERSION` 환경 변수를 설정하고, 컨테이너에 해당하는 Docker 레이블을 구성해 통합 서비스 태깅의 모든 기능을 이용할 수 있습니다.

`service` 및 `version`의 값은 Dockerfile에서 알 수 있습니다.

```yaml
ENV DD_SERVICE <SERVICE>
ENV DD_VERSION <VERSION>

LABEL com.datadoghq.tags.service="<SERVICE>"
LABEL com.datadoghq.tags.version="<VERSION>"
```

`env`는 배포 시점에 결정되므로, 환경 변수와 레이블을 나중에 삽입할 수 있습니다.

```shell
docker run -e DD_ENV=<ENV> -l com.datadoghq.tags.env=<ENV> ...
```

배포 시점에 모든 것을 설정하시길 선호할 수도 있습니다.

```shell
docker run -e DD_ENV="<ENV>" \
           -e DD_SERVICE="<SERVICE>" \
           -e DD_VERSION="<VERSION>" \
           -l com.datadoghq.tags.env="<ENV>" \
           -l com.datadoghq.tags.service="<SERVICE>" \
           -l com.datadoghq.tags.version="<VERSION>" \
           ...
```

##### 부분 설정

서비스에서 Datadog 환경 변수가 필요하지 않은 경우(예를 들어 Redis, PostgreSQL, NGINX 같은 서드파티 소프트웨어와 APM에서 추적하지 않는 애플리케이션의 경우) Docker 레이블을 사용하면 됩니다.

```yaml
com.datadoghq.tags.env
com.datadoghq.tags.service
com.datadoghq.tags.version
```

전체 설정에서 설명했듯, 이러한 라벨은 Dockerfile에서 설정하거나 컨테이너 시작 시 인수로 설정할 수 있습니다.

{{< /tabs >}}

{{% tab "ECS" %}}
##### 전체 설정

`DD_ENV`, `DD_SERVICE`, `DD_VERSION` 환경 변수와 해당하는 Docker 레이블을 각 서비스 컨테이너의 런타임 환경에서 설정하여 통합 서비스 태깅의 모든 기능을 이용할 수 있습니다. 예를 들어, ECS 작업 정의를 통해 이 설정의 모든 요소를 한 곳에서 설정할 수 있습니다.

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

##### 부분 설정

서비스에서 Datadog 환경 변수가 필요하지 않은 경우(예를 들어 Redis, PostgreSQL, NGINX 같은 서드파티 소프트웨어와 APM에서 트레이싱하지 않는 애플리케이션의 경우) ECS 작업 정의의 Docker 레이블을 사용하세요.

```
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

{{% /tab %}}
{{< /tabs >}}

### 컨테이너화 되지 않은 환경

서비스 바이너리나 실행 파일을 빌드하고 배포한 방법에 따라, 사용할 수 있는 설정 환경 변수의 옵션도 여러 가지가 존재합니다. 사용자가 호스트별로 하나 이상의 서비스를 실행할 수 있으므로, Datadog는 이러한 환경 변수를 하나의 프로세스로 관리하시길 권장합니다.

[트레이스][8], [로그][9], [RUM 리소스][10], [신서틱 테스트][11], [StatsD 메트릭][12] 또는 시스템 메트릭의 서비스 런타임에서 수집한 모든 텔레메트리를 대상으로 하나의 설정 포인트를 구성하려면 다음 단계를 따르세요.

1. 실행 가능 파일 명령어로 환경 변수를 내보냅니다.

   ```
   DD_ENV=<env> DD_SERVICE=<service> DD_VERSION=<version> /bin/my-service
   ```

2. 또는 [Chef][13], [Ansible][14]이나 다른 오케스트레이션 도구를 사용하여 서비스의 systemd 또는 initd 설정 파일에 DD 환경 변수를 설정합니다. 서비스 프로세스가 시작되면 해당 변수에 액세스할 수 있습니다.

   {{< tabs >}}
   {{% tab "트레이스" %}}

   통합 서비스 태깅을 위해 트레이스를 설정할 때:

   1. `DD_ENV`에서 [APM 트레이서][1]를 설정하고, 트레이스를 생성하는 애플리케이션에 `env` 정의를 근접하게 둡니다. 이 방법을 사용하면 스팬(span) 메타데이터 태그에서 `env` 태그를 자동으로 얻을 수 있습니다.

   2. `DD_VERSION`에서 스팬을 설정하여, 트레이서에 속하는 서비스(보통 `DD_SERVICE`)의 모든 스팬에 버전을 추가합니다. 이는 서비스가 외부 서비스 이름으로 스팬을 생성할 경우 해당 스팬은 `version`을 태그로 수신하지 않는다는 의미입니다.

      스팬에 버전이 존재하는 한, 해당 스팬에서 생성된 메트릭을 트레이스하기 위해 버전 정보가 추가됩니다. 버전은 수동으로 코드 내에 추가하거나 APM 트레이서를 통해 자동 추가할 수 있습니다. 설정을 완료하면 APM 및 [DogStatsD 클라이언트][2]에서 이를 사용하며, 트레이스 데이터와 StatsD 메트릭에 `env`, `service`, `version` 태그를 붙입니다. APM 트레이서를 활성화한 경우에는 이 변수의 값도 로그에 삽입됩니다.

      **참조**: **스팬당 서비스는 1개**밖에 존재할 수 없습니다. 트레이스 메트릭에는 보통 싱글 서비스도 있습니다. 그러나 호스트의 태그에서 서로 다른 서비스를 정의한 경우, 설정된 서비스 태그가 해당 호스트에서 발생한 모든 트레이스 메트릭에 표시됩니다.

[1]: /ko/tracing/setup/
[2]: /ko/developers/dogstatsd/
   {{% /tab %}}

   {{% tab "로그" %}}

   [연결된 로그와 트레이스][1]를 사용 중이라면, APM 트레이서에서 지원되는 경우 자동 로그 삽입을 활성화합니다. APM 트레이서는 자동으로 `env`, `service`, `version`을 로그에 삽입하므로 다른 곳에서 필드를 수동으로 설정할 필요가 없습니다.

   **참조**: PHP 트레이서는 로그용 통합 서비스 태깅 설정을 지원하지 않습니다.

[1]: /ko/tracing/other_telemetry/connect_logs_and_traces/
   {{% /tab %}}

   {{% tab "RUM & 세션 리플레이" %}}

   [연결된 RUM 및 트레이스][1]를 사용하는 경우, `service` 필드에서 브라우저 애플리케이션을 지정하고 `env` 필드에서 환경을 정의하세요. 그리고 초기화 파일의 `version` 필드에서 버전 목록을 작성하면 됩니다.

   [RUM 애플리케이션을 생성][2]할 때는 `env` 및 `service` 이름을 확정하세요.


[1]: /ko/real_user_monitoring/connect_rum_and_traces/
[2]: /ko/real_user_monitoring/browser/#setup
   {{% /tab %}}

   {{% tab "신서틱" %}}

   [연결된 신서틱 브라우저 테스트와 트레이스][1]를 사용 중이라면 [통합 설정 페이지][2]의 **APM Integration for Browser Tests** 섹션에서 헤더 발송 URL을 지정하세요.

와일드카드로 `*`를 사용하실 수 있습니다(예: `https://*.datadoghq.com`).

[1]: /ko/synthetics/apm/
[2]: https://app.datadoghq.com/synthetics/settings/integrations
   {{% /tab %}}

   {{% tab "커스텀 메트릭" %}}

 태그는 [커스텀 StatsD 메트릭][1]에 변경이 불가능하고 덧붙이기만 가능한(Append-only) 방식으로 추가됩니다. 예를 들어, `env`에 서로 다른 값 두 개가 있는 경우 메트릭은 두 환경 모두에서 태깅됩니다. 한 태그가 같은 이름의 다른 태그를 덮어쓸 수는 없습니다.

서비스가 `DD_ENV`, `DD_SERVICE`, `DD_VERSION`에 액세스할 수 있는 경우 DogStatsD 클라이언트는 지원 태그를 커스텀 메트릭에 자동으로 추가합니다.

 **참조**: .NET 및 PHP용 DatadogDogStatsD 클라이언트는 이 기능을 지원하지 않습니다.

[1]: /ko/metrics/
   {{% /tab %}}

   {{% tab "시스템 메트릭" %}}

인프라스트럭처 메트릭에는 `env` 태그와 `service` 태그를 추가할 수 있습니다. 컨테이너화되지 않은 컨텍스트에서 서비스 메트릭의 태깅은 에이전트 수준에서 설정됩니다.

이 설정은 서비스 프로세스를 시작할 때마다 변경되지 않습니다. 따라서 `version` 추가를 권장하지 않습니다.

#### 호스트별 싱글 서비스

에이전트 [주요 설정 파일][1]에 다음과 같은 설정을 적용합니다.

```yaml
env: <ENV>
tags:
  - service:<SERVICE>
```

이렇게 설정하면 에이전트에서 전송하는 모든 데이터에 `env` 및 `service` 태깅의 일관성이 보장됩니다.

#### 호스트별 멀티 서비스

에이전트 [주요 설정 파일][1]에 다음과 같은 설정을 적용합니다.

```yaml
env: <ENV>
```

CPU, 메모리, 디스크 I/O 메트릭의 고유 `service` 태그를 프로세스 수준으로 가져오려면 에이전트 설정 폴더에서(예: `process.d/conf.yaml` 아래의 `conf.d` 폴더) [프로세스 점검][2]을 구성합니다.

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

**참조**: 에이전트 주요 설정 파일에서 이미 `service` 태그를 글로벌한 범위로 설정한 경우, 프로세스 메트릭이 두 가지 서비스에 태깅됩니다. 이로 인해 메트릭의 해석에 차이가 발생할 수 있으므로 `service` 태그는 프로세스 점검 설정만으로 구성하는 것이 좋습니다.

[1]: /ko/agent/configuration/agent-configuration-files
[2]: /ko/integrations/process
    {{% /tab %}}
    {{< /tabs >}}

### 서버리스 환경

AWS Lambda 기능을 더 자세히 알아보고 싶으신 분은 [태그를 사용해 Lambda 텔레메트리를 연결하는 법]]15]을 참고하세요.
## 참고 자료

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
[10]: /ko/real_user_monitoring/connect_rum_and_traces/
[11]: /ko/getting_started/synthetics/
[12]: /ko/integrations/statsd/
[13]: https://www.chef.io/
[14]: https://www.ansible.com/
[15]: /ko/serverless/configuration/#connect-telemetry-using-tags