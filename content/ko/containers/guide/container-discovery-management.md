---
aliases:
- /ko/agent/autodiscovery/management
- /ko/agent/kubernetes/management
- /ko/agent/guide/autodiscovery-management
- /ko/containers/guide/autodiscovery-management
description: 검색 규칙 및 포함/제외 패턴을 구성하여 Datadog Agent가 모니터링하는 컨테이너를 제어합니다.
further_reading:
- link: /containers/kubernetes/integrations/
  tag: 설명서
  text: Kubernetes에서 Autodiscovery를 사용하여 통합 구성하기
- link: /containers/docker/integrations/
  tag: 설명서
  text: Docker에서 Autodiscovery를 사용하여 통합 구성하기
title: 컨테이너 탐지 관리
---
기본적으로 Datadog Agent는 사용 가능한 모든 컨테이너를 자동으로 탐지합니다. 이 문서에서는 Datadog Agent의 컨테이너 탐지 범위를 제한하고 데이터 수집을 특정 컨테이너 집합으로 한정하는 방법을 설명합니다.

## 컨테이너 탐지 패턴 {#container-discovery-patterns}

컨테이너 환경에서는 호스트당 Datadog Agent를 하나씩 배포해야 합니다. 배포된 각 Datadog Agent는 해당 호스트의 모든 컨테이너를 자동으로 탐지하고 모니터링합니다. 로그 [`containerCollectAll` 옵션][1]이 활성화된 경우 Agent는 탐지된 모든 컨테이너의 로그를 수집합니다.

Agent의 탐지 규칙을 조정하여 메트릭 및 로그 수집을 제한할 수 있습니다. 메트릭 수집에서 제외된 컨테이너는 [Autodiscovery][2] 기반 Agent 통합에서도 제외됩니다.

예외는 다음 두 가지 방법으로 설정할 수 있습니다.

- Datadog Agent 컨테이너에 환경 변수를 제공하여 컨테이너 허용 목록/차단 목록을 지정합니다. 클러스터 전체에서 제외할 컨테이너 이름, 이미지 또는 네임스페이스 목록이 있는 경우 권장됩니다.
- Kubernetes 포드에 주석을 추가하여 개별 포드 또는 컨테이너를 차단합니다. 세밀한 제외 설정이 필요한 경우 권장됩니다.

**참고**: `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total`, `.stopped.total` 메트릭은 이러한 설정의 영향을 받지 않으며 항상 모든 컨테이너를 계산합니다.

## 단순 패턴 매칭 {#simple-pattern-matching}

아래 표의 환경 변수를 사용하여 컨테이너 필터링을 구성할 수 있습니다. 각 포함 또는 제외 규칙은 공백으로 구분된 정규식 문자열 목록으로 정의됩니다. 다음 기준으로 컨테이너를 포함하거나 제외할 수 있습니다.

- 컨테이너 이름(`name`)
- 컨테이너 이미지 이름(`image`)
- Kubernetes 네임스페이스(`kube_namespace`)

<div class="alert alert-danger">

`name` 파라미터는 Kubernetes 포드에서 실행되는 경우에도 포드 이름이 아닌 컨테이너 이름에만 적용됩니다.

</div>

### 환경 변수 {#environment-variables}

**Agent v7.20 이상**에서는 다음 환경 변수를 사용하여 이미지 이름, 컨테이너 이름 또는 Kubernetes 네임스페이스를 기준으로 컨테이너를 제외할 수 있습니다. 제외된 컨테이너에서는 로그와 메트릭이 수집되지 않습니다.

| 환경 변수           | 설명                                         |
| ------------------------------ | --------------------------------------------------- |
| `DD_CONTAINER_EXCLUDE`         | 제외할 컨테이너 차단 목록.                 |
| `DD_CONTAINER_EXCLUDE_METRICS` | 메트릭 수집을 제외할 컨테이너의 차단 목록. |
| `DD_CONTAINER_EXCLUDE_LOGS`    | 로그 수집을 제외할 컨테이너의 차단 목록.    |
| `DD_CONTAINER_INCLUDE`         | 포함할 컨테이너의 허용 목록.                 |
| `DD_CONTAINER_INCLUDE_METRICS` | 메트릭 수집을 포함할 컨테이너의 허용 목록. |
| `DD_CONTAINER_INCLUDE_LOGS`    | 로그 수집을 포함할 컨테이너의 허용 목록.    |

{{% collapse-content title="환경 변수 설정" level="h4" expanded=false id="setting-environment-variables" %}}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator에서는 `spec.override.nodeAgent.env` 아래에 이러한 환경 변수를 설정합니다.

##### 예시 {#example}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
  override:
    nodeAgent:
      env:
      - name: DD_CONTAINER_EXCLUDE
        value: "image:<IMAGE_NAME>"
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm 차트에서는 다음 항목 중 하나 이상에 공백으로 구분된 문자열을 지정합니다.
- `datadog.containerExclude`
- `datadog.containerInclude`
- `datadog.containerExcludeLogs`
- `datadog.containerIncludeLogs`
- `datadog.containerExcludeMetrics`
- `datadog.containerIncludeMetrics`

##### 예시 {#example-1}

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
```

{{% /tab %}}
{{% tab "컨테이너화된 Agent" %}}

Datadog Operator 또는 Helm을 사용하지 않는 환경에서는 다음 환경 변수를 Agent 컨테이너 시작 시 전달할 수 있습니다.

##### Docker 예시 {#example-docker}

```shell
docker run -e DD_CONTAINER_EXCLUDE=image:<IMAGE_NAME> ...
```

##### ECS 예시 {#example-ecs}

```json
"environment": [
  {
    "name": "DD_CONTAINER_EXCLUDE",
    "value": "image:<IMAGE_NAME>"
  },
  ...
]
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

<div class="alert alert-info">

이미지 이름 필터(`image`)는 레지스트리와 이미지 태그 또는 다이제스트를 포함한 전체 이미지 이름에 대해 매칭됩니다(예: `dockerhub.io/nginx:1.13.1`).

</div>

#### 예시 {#examples}

컨테이너 이름이 `dd-agent`인 컨테이너를 제외하는 방법:

```
DD_CONTAINER_EXCLUDE = "name:^dd-agent$"
```

모든 태그 및 다이제스트를 포함하여 `dockercloud/network-daemon` 이미지를 사용하는 컨테이너를 제외하는 방법:

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon(@sha256)?:.*
```

이미지 `dockercloud/network-daemon:1.13.0`을 사용하는 컨테이너를 제외하는 방법:

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon:1.13.0$"
```

이미지 이름에 `agent`라는 단어가 포함된 모든 컨테이너를 제외하는 방법:

```
DD_CONTAINER_EXCLUDE = "image:agent"
```

레지스트리와 관계없이 `foo` 이미지를 사용하는 모든 컨테이너를 제외하는 방법:

```
DD_CONTAINER_EXCLUDE = "image:^.*/foo(@sha256)?:.*"
```

모든 컨테이너를 제외하는 방법:

```
DD_CONTAINER_EXCLUDE = "name:.*"
```

아니면 `image:.*` 또는 `kube_namespace:.*`를 사용할 수도 있습니다. `.*`를 `name:`, `image:`, 또는 `kube_namespace:` 접두사 없이 구성하면 동작하지 않습니다.

### 포함 및 제외 동작 {#inclusion-and-exclusion-behavior}

일반적으로 포함 규칙이 제외 규칙보다 우선합니다. 예를 들어 `ubuntu` 또는 `debian` 이미지만 모니터링하려면 먼저 다른 모든 이미지를 제외한 다음 포함할 이미지를 지정합니다.

```
DD_CONTAINER_EXCLUDE = "image:.*"
DD_CONTAINER_INCLUDE = "image:^docker.io/library/ubuntu(@sha256)?:.* image:^docker.io/library/debian(@sha256)?:.*"
```

이 규칙의 유일한 예외는 `ad.datadoghq.com/exclude`과 같은 포드 제외 주석 설정입니다. 애플리케이션에 `true` 값의 제외 주석이 설정되어 있으면 해당 설정이 우선 적용되며, 해당 컨테이너는 모니터링을 위한 Autodiscovery 대상에서 제외됩니다. 예를 들어 `DD_CONTAINER_INCLUDE = "image:.*"`처럼 모든 컨테이너를 포함하는 조건이 있더라도, 해당 컨테이너에 제외 주석이 설정되어 있다면 포함이 보장되지 않습니다. 자세한 내용은 [컨테이너 탐지 관리 - 포드 제외 구성](#pod-exclude-configuration)을 참조하세요.

카테고리를 넘나드는 포함/제외 규칙은 혼합할 수 없습니다. 예를 들어 이미지 이름이 `foo`인 컨테이너는 포함하고 이미지 이름이 `bar`인 컨테이너는 메트릭만 제외하려는 경우, 다음 구성만으로는 **충분하지 않습니다**.

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^docker.io/library/bar(@sha256)?:.*"
DD_CONTAINER_INCLUDE = "image:^docker.io/library/foo(@sha256)?:.*"
```

대신 다음과 같이 구성하세요.

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^docker.io/library/bar(@sha256)?:.*"
DD_CONTAINER_INCLUDE_METRICS = "image:^docker.io/library/foo(@sha256)?:.*"
DD_CONTAINER_INCLUDE_LOGS = "image:^docker.io/library/foo(@sha256)?:.*"
```

전역 목록과 선택적(로그/메트릭) 목록 사이에는 상호작용이 없습니다. 즉, 컨테이너를 전역적으로 제외(`DD_CONTAINER_EXCLUDE`)한 후 `DD_CONTAINER_INCLUDE_LOGS` 및 `DD_CONTAINER_INCLUDE_METRICS`을 사용하여 다시 포함할 수는 없습니다.

### Pause 컨테이너 {#pause-containers}

Datadog Agent는 기본적으로 Kubernetes 및 OpenShift의 Pause 컨테이너를 제외합니다. 이로 인해 해당 컨테이너의 메트릭 수집이 방지되며 과금 대상 컨테이너 수에도 포함되지 않습니다. 단, `kubernetes.containers.running` 및 `docker.containers.running`과 같은 컨테이너 수 메트릭에는 계속 집계됩니다.

이 동작을 비활성화하고 Pause 컨테이너도 모니터링하려면 다음과 같이 설정합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator에서는 `spec.override.nodeAgent.env` 아래에 해당 환경 변수를 설정합니다.

##### 예시 {#example-2}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
  override:
    nodeAgent:
      env:
      - name: DD_EXCLUDE_PAUSE_CONTAINER
        value: "false"
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm 차트에서는 `datadog.excludePauseContainer`를 `true` 또는 `false`로 설정합니다.

##### 예시 {#example-3}

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
  excludePauseContainer: false
```

{{% /tab %}}
{{% tab "컨테이너화된 Agent" %}}

Helm 또는 Operator를 사용하지 않는 환경에서는 Agent 컨테이너 시작 시 환경 변수를 전달할 수 있습니다.

`DD_EXCLUDE_PAUSE_CONTAINER`를 `false`로 설정합니다.
{{% /tab %}}
{{< /tabs >}}

## 고급 CEL 제외 {#advanced-cel-exclusion}

**Agent v7.73 이상**에서는 `cel_workload_exclude` 구성 옵션을 사용하여 Autodiscovery 대상 컨테이너를 필터링할 수 있습니다. 이 기능을 사용하면 [공통 표현 언어(CEL)][3] 규칙을 정의하여 텔레메트리 수집 대상에서 제외할 컨테이너를 지정할 수 있습니다.

필터링 규칙에서 컨테이너 객체를 나타내기 위해 다음 속성을 사용할 수 있습니다.

| 속성                   | 설명                                                             |
|-----------------------------|-------------------------------------------------------------------------|
| `container.name`            | 컨테이너 이름.                                              |
| `container.image.reference` | 컨테이너 이미지 전체 참조(레지스트리, 저장소, 태그/다이제스트 포함). |
| `container.pod.name`        | 컨테이너가 실행 중인 포드 이름.                              |
| `container.pod.namespace`   | 포드의 Kubernetes 네임스페이스.                                    |
| `container.pod.annotations` | 포드에 적용된 주석(키-값 맵).                     |

### 구성 구조 {#configuration-structure}

`cel_workload_exclude` 구성 옵션은 논리 OR 방식으로 평가되는 규칙 세트 목록 구조를 사용합니다. 컨테이너가 하나라도 규칙에 일치하면 제외됩니다. 각 규칙 세트는 제외할 `products`와 컨테이너와 일치할 CEL `rules`를 정의합니다.

`products` 필드는 `metrics`, `logs`, `global`(나열된 모든 제품에서 컨테이너 제외)을 허용합니다.

<div class="alert alert-danger">
구성에 구조적 오류나 CEL 구문 오류가 있는 경우 Agent는 오류와 함께 종료됩니다. 이는 의도하지 않은 텔레메트리 수집으로 인해 과금에 영향을 주는 상황을 방지하기 위함입니다.
</div>

예를 들어 아래 구성에서는 이름에 `nginx`가 포함되고 `staging` 네임스페이스에서 실행되는 모든 컨테이너에 대해 메트릭과 로그를 제외합니다. `redis` 이미지를 실행하는 컨테이너 또는 `low_priority: "true"` 주석이 설정된 포드 내부의 모든 컨테이너에 대해 로그를 제외합니다. 이 예시처럼 [Agent 구성 파일][4]을 직접 수정하여 설정할 수 있습니다.

```yaml
# datadog.yaml
cel_workload_exclude:
- products: [metrics, logs]
  rules:
    containers:
      - container.name.matches("nginx") && container.pod.namespace == "staging"
- products: [logs]
  rules:
    containers:
      - container.image.reference.matches("redis")
      - container.pod.annotations["low_priority"] == "true"
```

또한 다음 방법으로도 CEL 기반 워크로드 제외를 구성할 수 있습니다.
- 컨테이너화된 Agent 환경에서 `DD_CEL_WORKLOAD_EXCLUDE` 환경 변수에 규칙을 포함한 JSON 문자열을 설정합니다.
- Datadog Operator 또는 Helm Chart에서 적절한 구성 옵션에 CEL 규칙을 추가합니다(아래 예시 참조).

{{% collapse-content title="CEL 제외 규칙 구성" level="h4" expanded=false id="setting-environment-variables" %}}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator(v1.23.0 이상)에서는 `spec.override.nodeAgent.celWorkloadExclude` 및 `spec.override.clusterAgent.celWorkloadExclude` 옵션을 사용합니다.

##### 예시 {#example-4}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
  override:
    nodeAgent:
      celWorkloadExclude:
        - products: [ global ]
          rules:
            containers:
              - container.name == "redis"
    clusterAgent:
      celWorkloadExclude:
        - products: [ global ]
          rules:
            containers:
              - container.name == "redis"
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm 차트에서는 `datadog.celWorkloadExclude` 구성 옵션을 사용합니다.

##### 예시 {#example-5}

```yaml
datadog:
  celWorkloadExclude:
  - products: [global]
    rules:
      containers:
        - container.name == "redis"
```

{{% /tab %}}
{{% tab "컨테이너화된 Agent" %}}

Helm 또는 Operator를 사용하지 않는 환경에서는 Agent 컨테이너 시작 시 환경 변수를 전달할 수 있습니다.

##### Docker 예시 {#example-docker-1}

```shell
docker run -e DD_CEL_WORKLOAD_EXCLUDE=<JSON_CEL_RULES> ...
```

##### ECS 예시 {#example-ecs-1}

```json
"environment": [
  {
    "name": "DD_CEL_WORKLOAD_EXCLUDE",
    "value": "<JSON_CEL_RULES>"
  },
  ...
]
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="구성 옵션 검증" level="h4" expanded=false id="validating-configuration-option" %}}

배포 전에 `agent workloadfilter verify-cel` 명령을 사용하여 구성 구문을 검증할 수 있습니다. 이 명령은 표준 입력(stdin)을 통해 YAML 또는 JSON 형식의 입력을 받습니다. 다음 예시는 정의되지 않은 필드 오류를 검출하는 검증 과정을 보여줍니다.

```json
### cel-config.json
[
  {
    "products": ["metrics"],
    "rules":
      {
        "containers":
          [
            'container.undefined_field == "test"',
            'container.name.startsWith("-agent")',
          ],
      },
  },
]
```

```bash
agent workloadfilter verify-cel < cel-config.json

-> Validating CEL Configuration
    Loading YAML file...
✓ YAML loaded successfully (1 bundle(s))

-> Validating configuration structure...
✓ Configuration structure is valid

-> Compiling CEL rules...

  -> metrics
    Resource: container (2 rule(s))
      ✗ Compilation failed: ERROR: <input>:1:10: undefined field 'undefined_field'
 | container.undefined_field == "test" || container.name.startsWith("-agent")
 | .........^
        Rule 1: container.undefined_field == "test"
        Rule 2: container.name.startsWith("-agent")

✗ Validation failed - some rules have errors
Error: CEL compilation failed
```

{{% /collapse-content %}}

#### 예시 규칙 {#example-rules}

특정 포드 주석이 있는 컨테이너를 제외하는 방법:

```yaml
container.pod.annotations["monitoring"] == "false"
```

이름에 `-dev` 문자열이 포함되지 않은 네임스페이스의 컨테이너를 제외하려면:

```yaml
!container.pod.namespace.matches("-dev")
```

이름이 `nginx-server`인 컨테이너를 `prod` 네임스페이스에서만 제외하는 방법:

```yaml
container.name == "nginx-server" && container.pod.namespace == "prod"
```

이미지 이름에 `nginx` 문자열이 포함된 컨테이너를 제외하는 방법:

```yaml
container.image.reference.matches("nginx")
```

그룹화된 논리(예: 두 개의 네임스페이스 중 하나에서 특정 컨테이너 이름)를 사용하여 컨테이너를 제외하는 방법:

```yaml
container.name == "redis" && (container.pod.namespace == "production" || container.pod.namespace == "staging")
```

포드의 소유자 이름을 기준으로 컨테이너를 제외하려면(예: `my-app`이라는 이름의 Deployment 또는 CronJob이 생성한 모든 컨테이너):

```yaml
container.pod.name.startsWith("my-app")
```

특정 네임스페이스 집합의 컨테이너만 **포함**하는 방법:

```yaml
!(container.pod.namespace in ["foo", "bar", "baz"])
```

## 포드 제외 구성 {#pod-exclude-configuration}

**Agent v7.45 이상**에서는 Kubernetes 포드에 주석을 설정하여 Autodiscovery를 제어할 수 있습니다. 제외 규칙을 추가하려면 다음 주석의 값을 `"true"`로 설정합니다.

| 주석                                          | 설명                                                                      |
| --------------------------------------------------- | -------------------------------------------------------------------------------- |
| `ad.datadoghq.com/exclude`                          | 전체 포드 제외                                                          |
| `ad.datadoghq.com/logs_exclude`                     | 전체 포드에서 로그 수집 제외                                      |
| `ad.datadoghq.com/metrics_exclude`                  | 전체 포드에서 메트릭 수집 제외                                   |
| `ad.datadoghq.com/<CONTAINER_NAME>.exclude`         | 포드에 `<CONTAINER_NAME>`이 있는 컨테이너 제외|
| `ad.datadoghq.com/<CONTAINER_NAME>.logs_exclude`    | 포드에 `<CONTAINER_NAME>`이 있는 컨테이너에서 로그 수집 제외    |
| `ad.datadoghq.com/<CONTAINER_NAME>.metrics_exclude` | 포드에 `<CONTAINER_NAME>`이 있는 컨테이너에서 메트릭 수집 제외 |

애플리케이션 포드에 설정된 `ad.datadoghq.com/exclude` 주석이 가장 높은 우선순위를 가집니다. 즉, 컨테이너가 `DD_CONTAINER_INCLUDE`을 통해 포함 조건에 일치하더라도 제외 주석이 설정되어 있으면 Agent는 해당 컨테이너를 모니터링하지 않습니다. 동일한 규칙이 메트릭 및 로그 전용 필터링 구성에도 적용됩니다.

주석 기반 제외가 적용되면 Agent는 컨테이너에 대해 관련된 모든 제외 주석을 확인합니다. 예를 들어 NGINX 컨테이너에 대한 로그 수집을 구성할 때 Agent는 포드에 `ad.datadoghq.com/exclude`, `ad.datadoghq.com/logs_exclude`, `ad.datadoghq.com/nginx.exclude`, 또는 `ad.datadoghq.com/nginx.logs_exclude` 주석이 `true`로 설정되어 있는지 확인합니다. 메트릭 수집에도 동일하게 적용됩니다.

#### 전체 포드 제외 {#exclude-the-entire-pod}

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
spec:
  template:
    metadata:
      annotations:
        ad.datadoghq.com/exclude: "true"
    spec:
      containers:
        #(...)
```

#### 컨테이너에서 로그 수집 제외 {#exclude-log-collection-from-a-container}

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
spec:
  template:
    metadata:
      annotations:
        ad.datadoghq.com/helper.logs_exclude: "true"
    spec:
      containers:
        - name: app
          #(...)
        - name: helper
          #(...)
```

### 준비되지 않은 포드 허용 {#tolerate-unready-pods}

기본적으로 `unready` 상태의 포드는 Datadog Agent가 검사를 예약할 때 무시됩니다. 따라서 해당 포드에서는 메트릭, 서비스 검사 및 로그가 수집되지 않습니다. 이 동작을 재정의하려면 주석 `ad.datadoghq.com/tolerate-unready`를 `"true"`로 설정합니다. 예를 들면 다음과 같습니다.

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/tolerate-unready: "true"
  ...
```

## 보안 구성 {#security-configuration}

**Agent v7.70 이상**에서는 특정 컨테이너에 대한 보안 모니터링을 제한할 수 있으므로 실제로 모니터링하려는 컨테이너에 대해서만 과금됩니다. 이 기능은 Datadog Operator에서는 지원되지 않습니다.

{{< tabs >}}
{{% tab "Helm" %}}

| 기능                               | 컨테이너 포함                                   | 컨테이너 제외                                   |
|---------------------------------------|-----------------------------------------------------|-----------------------------------------------------|
| [Cloud Security Misconfigurations][1] | `datadog.securityAgent.compliance.containerInclude` | `datadog.securityAgent.compliance.containerExclude` |
| [Cloud Security Vulnerabilities][2]   | `datadog.sbom.containerImage.containerInclude`      | `datadog.sbom.containerImage.containerExclude`      |
| [Workload Protection][3]              | `datadog.securityAgent.runtime.containerInclude`    | `datadog.securityAgent.runtime.containerExclude`    |

[1]: /ko/security/cloud_security_management/misconfigurations/
[2]: /ko/security/cloud_security_management/vulnerabilities
[3]: /ko/security/workload_protection/
{{% /tab %}}
{{% tab "구성 파일" %}}
[Cloud Security Vulnerabilities][1]의 경우 구성 파일에서 다음 형식을 사용하여 컨테이너를 포함하거나 제외할 수 있습니다.

```
---
sbom:
  container_image:
    container_include: ...
    container_exclude: ...
```
[1]: /ko/security/cloud_security_management/vulnerabilities
{{% /tab %}}
{{% tab "컨테이너화된 Agent" %}}
Helm 또는 Operator를 사용하지 않는 환경에서는 Agent 컨테이너 시작 시 환경 변수를 전달할 수 있습니다.

| 기능                               | 컨테이너 포함                              | 컨테이너 제외                              |
|---------------------------------------|------------------------------------------------|------------------------------------------------|
| [Cloud Security Misconfigurations][1] | `DD_COMPLIANCE_CONFIG_CONTAINER_INCLUDE`       | `DD_COMPLIANCE_CONFIG_CONTAINER_EXCLUDE`       |
| [Cloud Security Vulnerabilities][2]   | `DD_SBOM_CONTAINER_IMAGE_CONTAINER_INCLUDE`    | `DD_SBOM_CONTAINER_IMAGE_CONTAINER_EXCLUDE`    |
| [Workload Protection][3]              | `DD_RUNTIME_SECURITY_CONFIG_CONTAINER_INCLUDE` | `DD_RUNTIME_SECURITY_CONFIG_CONTAINER_EXCLUDE` |

[1]: /ko/security/cloud_security_management/misconfigurations/
[2]: /ko/security/cloud_security_management/vulnerabilities
[3]: /ko/security/workload_protection/
{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/kubernetes/log/?tab=helm#log-collection
[2]: /ko/getting_started/containers/autodiscovery
[3]: https://github.com/google/cel-spec/blob/master/doc/langdef.md
[4]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file