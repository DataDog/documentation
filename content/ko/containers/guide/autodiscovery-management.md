---
aliases:
- /ko/agent/autodiscovery/management
- /ko/agent/kubernetes/management
- /ko/agent/guide/autodiscovery-management
further_reading:
- link: /agent/kubernetes/integrations/
  tag: 설명서
  text: 자동탐지 통합 템플릿 만들기 & 불러오기
title: 컨테이너 탐지 관리
---

기본적으로 Datadog Agent는 사용 가능한 모든 컨테이너를 자동으로 검색합니다. 검색 경계를 제한하고 데이터 수집을 컨테이너의 하위 집합으로만 제한하려면, 전용 설정을 통해 해당 요소를 포함하거나 제외하세요.

## 자동탐지 패턴

Datadog Agent는 컨테이너화된 환경 내에서 호스트당 한 번씩 배포되어야 합니다. 이는 일반적으로 Kubernetes(Helm 또는 Operator에서 관리)의 DaemonSet 또는 ECS Daemon 서비스를 통해 수행됩니다. 배포된 각 Datadog Agent는 해당 호스트의 모든 컨테이너를 자동으로 검색하고 모니터링합니다.

Agent의 검색 규칙을 조정하여 메트릭 및 로그 수집을 제한할 수 있습니다. 메트릭 수집이 제한된 모든 컨테이너는 자동탐지 기반 Agent 통합에 대해서도 제한됩니다. [로그 "Container Collect All" 기능][1]이 활성화되면, 아래 설명된 규칙에 의해 차단되지 않는 한 검색된 모든 컨테이너에 로그가 수집됩니다.

이러한 제한 사항은 다음 중 하나로 설정할 수 있습니다:
- Datadog Agent 컨테이너에 환경 변수를 컨테이너의 허용 목록/차단 목록으로 제공합니다.
- 개별 컨테이너를 허용/차단하기 위해 Kubernetes 파드에 어노테이션을 추가합니다.

첫 번째 옵션은 전체 클러스터에 대해 제외할 컨테이너 이름, 이미지 또는 Kubernetes 네임스페이스 목록으로 잘 작동합니다. 두 번째 옵션은 Kubernetes에서 더 세밀하게 조정된 제외사항에서 잘 작동합니다.

**참조**: `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total`, `.stopped.total` 메트릭은 설정의 영향을 받지 않으며, 항상 모든 컨테이너를 탐지합니다.

## Agent 설정

### 환경 변수
**Agent v7.20+**에서는 다음 환경 변수를 사용하여 이미지 이름, 컨테이너 이름 또는 Kubernetes 네임스페이스별로 컨테이너를 제외합니다. 제외된 컨테이너에서는 로그 및 메트릭이 수집되지 않습니다.

| 환경 변수 | 설명 |
| ------------ | ----------- |
| `DD_CONTAINER_EXCLUDE` | 제외할 컨테이너의 차단 목록입니다. |
| `DD_CONTAINER_EXCLUDE_METRICS` | 메트릭이 제외된 컨테이너의 차단 목록입니다. |
| `DD_CONTAINER_EXCLUDE_LOGS` | 로그가 제외된 컨테이너의 차단 목록입니다. |
| `DD_CONTAINER_INCLUDE` | 포함할 컨테이너의 허용 목록입니다. |
| `DD_CONTAINER_INCLUDE_METRICS` | 메트릭이 포함된 컨테이너의 허용 목록입니다. |
| `DD_CONTAINER_INCLUDE_LOGS` | 로그가 포함된 컨테이너의 허용 목록입니다.  |

**Agent <=v7.19**에서는 환경 변수 `DD_AC_INCLUDE`와 `DD_AC_EXCLUDE`를 사용하여 이미지 또는 이름별로 컨테이너를 포함하거나 제외합니다. 이러한 환경 변수는 이후 Agent 버전에서 더 이상 사용되지 않습니다.

각 포함사항 또는 제외사항은 공백으로 구분된 정규식 문자열 목록으로 정의됩니다. 이름(`name`), 이미지 이름(`image`) 또는 Kubernetes 네임스페이스(`kube_namespace`)를 기준으로 컨테이너를 포함하거나 제외할 수 있습니다.

#### 예시
`dd-agent` 이름이 있는 컨테이너를 제외하려면: 

```
DD_CONTAINER_EXCLUDE = "name:^dd-agent$"
```

이미지 이름이 `dockercloud/network-daemon`와 `dockercloud/logrotate`인 두 컨테이너를 제외하려면:

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon$ image:^dockercloud/logrotate$"
```

모든 컨테이너를 제외하려면:

```
DD_CONTAINER_EXCLUDE = "name:.*"
```

또한 `image:.*` 또는 `kube_namespace:.*`를 사용할 수도 있습니다. `name:`, `image:`, 또는 `kube_namespace:` 접두사 없이 `.*`을 설정하면 작동하지 않습니다.

### 포함 및 제외 작업

포함사항이 제외사항보다 우선입니다. 예를 들어 `ubuntu` 또는 `debian` 이미지만 모니터링하려면, 먼저 다른 모든 이미지를 제외하고 포함할 이미지를 지정합니다.

```
DD_CONTAINER_EXCLUDE = "image:.*"
DD_CONTAINER_INCLUDE = "image:ubuntu image:debian"
```

교차 카테고리 포함/제외사항 규칙을 혼합할 수 없습니다. 예를 들어, 이미지 이름 `foo`가 있는 컨테이너를 포함하고 이미지 이름 `bar`가 있는 컨테이너에서 메트릭만 제외하려는 경우, 다음은 **충분하지 않습니다**:

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^bar$"
DD_CONTAINER_INCLUDE = "image:^foo$"
```

대신 다음을 사용하세요:

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^bar$"
DD_CONTAINER_INCLUDE_METRICS = "image:^foo$"
DD_CONTAINER_INCLUDE_LOGS = "image:^foo$"
```

전역 목록과 선택(로그 및 메트릭) 목록 사이에는 상호 작용이 없습니다. 즉, 컨테이너를 전체적으로 제외(`DD_CONTAINER_EXCLUDE`)한 다음 이를 `DD_CONTAINER_INCLUDE_LOGS` 및`DD_CONTAINER_INCLUDE_METRICS`에 포함할 수 없습니다.

### 환경 변수 설정
{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator는 `spec.override.nodeAgent.env`에서 이러한 환경변수를 설정합니다.

##### 예시

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

Helm 차트에서 `datadog.containerExclude`, `datadog.containerInclude`, `datadog.containerExcludeLogs`, `datadog.containerIncludeLogs`, `datadog.containerExcludeMetrics` 또는 `datadog.containerIncludeMetrics`에 공백으로 구분된 문자열을 제공합니다.

##### 예시

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
```

{{% /tab %}}
{{% tab "컨테이너화된 Agent" %}}

Helm 또는 Operator를 사용하지 않는 환경에서는 시작 시 다음과 같은 환경 변수를 Agent 컨테이너에 전달할 수 있습니다.

##### Docker 예시
```shell
docker run -e DD_CONTAINER_EXCLUDE=image:<IMAGE_NAME> ...
```

##### ECS 예시
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

#### 일시 중지 컨테이너

Datadog Agent는 기본적으로 Kubernetes 및 OpenShift 일시 중지 컨테이너를 제외합니다. 이렇게 하면 메트릭이 수집되지 않고 청구 가능한 컨테이너로 계산되지 않습니다. 컨테이너 카운트 메트릭에서는 여전히 `kubernetes.containers.running` 및 `docker.containers.running`와 같이 간주됩니다.

이 동작을 비활성화하고 일시 중지 컨테이너 모니터링을 포함하려면: 

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator에서는 `spec.override.nodeAgent.env`에서 이러한 환경변수를 설정합니다.

##### 예시

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

Helm 차트에서 `datadog.excludePauseContainer`를 `true` 또는 `false`로 설정합니다.

##### 예시

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
  excludePauseContainer: false
```

{{% /tab %}}
{{% tab "컨테이너화된 Agent" %}}

Helm 또는 Operator를 사용하지 않는 환경에서는 시작 시 다음과 같은 환경 변수를 Agent 컨테이너에 전달할 수 있습니다.

`DD_EXCLUDE_PAUSE_CONTAINER`를 `false`로 설정하세요.
{{% /tab %}}
{{< /tabs >}}

## 파드 제외 설정

**Agent v7.45+**에서는 Kubernetes 파드에 어노테이션을 설정하여 자동탐지를 제어할 수 있습니다. 제외 규칙을 추가하려면 다음 어노테이션의 값을 `"true"`로 설정하세요.

| 어노테이션 | 설명 |
| ------------ | ----------- |
| `ad.datadoghq.com/exclude` | 전체 파드를 제외 |
| `ad.datadoghq.com/logs_exclude` | 전체 파드에서 로그 수집을 제외 |
| `ad.datadoghq.com/metrics_exclude` | 전체 파드에서 메트릭 수집을 제외 |
| `ad.datadoghq.com/<CONTAINER_NAME>.exclude` | 파드에서 `<CONTAINER_NAME>`이 포함된 컨테이너 제외 |
| `ad.datadoghq.com/<CONTAINER_NAME>.logs_exclude` | 파드에서 `<CONTAINER_NAME>`이 포함된 컨테이너의 로그 수집을 제외 |
| `ad.datadoghq.com/<CONTAINER_NAME>.metrics_exclude` | 파드에서 `<CONTAINER_NAME>`이 포함된 컨테이너의 메트릭 수집을 제외 |

#### 전체 파드를 제외:
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

#### 컨테이너에서 로그 수집을 제외:
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


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/kubernetes/log/?tab=helm#log-collection