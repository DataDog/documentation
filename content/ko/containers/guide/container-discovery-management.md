---
aliases:
- /ko/agent/autodiscovery/management
- /ko/agent/kubernetes/management
- /ko/agent/guide/autodiscovery-management
- /ko/containers/guide/autodiscovery-management
further_reading:
- link: /containers/kubernetes/integrations/
  tag: 설명서
  text: 쿠버네티스에서 자동 탐지 통합 구성
- link: /containers/docker/integrations/
  tag: 설명서
  text: Docker에서 자동 탐지 통합 구성
title: 컨테이너 탐지 관리
---

기본적으로 Datadog 에이전트는 사용 가능한 컨테이너를 모두 검색합니다. 이 설명서에서는 Datadog 에이전트의 검색 범위를 제한하고 컨테이너의 서브셋으로 데이터 수집을 제한하는 방법을 설명합니다.

## 컨테이너 검색 패턴

컨테이너화된 환경에서는 Datadog 에이전트를 호스트별로 배포해야 합니다. 배포된 각 Datadog 에이전트는 자동으로 해당 호스트의 모든 컨테이너를 검색하고 모니터링합니다.

에이전트의 검색 규칙을 조정해 메트릭과 로그 수집을 제한할 수 있습니다. 메트릭 수집이 제한된 컨테이너는 [자동 탐지][2] 기반 에이전트 통합에도 제한됩니다.

로그 [`containerCollectAll` 옵션][1]이 활성화되어 있으면 에이전트는 검색된 컨테이너에서 로그를 수집합니다.

예외를 설정하는 방법은 두 가지가 있습니다.

- Datadog 에이전트 컨테이너에 컨테이너 허용/차단 목록으로 환경 변수를 제공합니다. 전체 클러스터에 제외할 컨테이너 이름, 이미지, 또는 네임스페이스 목록이 있는 경우에 추천하는 방법입니다.
- 쿠버네티스 포드에 주석을 추가해 개별 포드 또는 컨테이너를 차단합니다. 예외 세부 사항을 적용해야 할 필요가 있을 때 추천하는 방법입니다.

**참조**: `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total`, `.stopped.total` 메트릭은 설정의 영향을 받지 않으며, 항상 모든 컨테이너를 탐지합니다.

## 에이전트 구성

### 환경 변수
**에이전트 v7.20+**에서 다음 환경 변수를 사용해 이미지 이름, 컨테이너 이름, 또는 쿠버네티스 네임스페이스별로 컨테이너를 제외합니다. 제외된 컨테이너에서는 로그와 메트릭을 수집하지 않습니다.

| 환경 변수 | 설명 |
| ------------ | ----------- |
| `DD_CONTAINER_EXCLUDE` | 제외할 컨테이너 차단 목록 |
| `DD_CONTAINER_EXCLUDE_METRICS` | 메트릭을 제외할 컨테이너 차단 목록 |
| `DD_CONTAINER_EXCLUDE_LOGS` | 로그를 제외할 컨테이너 차단 목록 |
| `DD_CONTAINER_INCLUDE` | 포함할 컨테이너 허용 목록 |
| `DD_CONTAINER_INCLUDE_METRICS` | 메트릭을 포함할 컨테이너 허용 목록 |
| `DD_CONTAINER_INCLUDE_LOGS` | 로그를 포함할 컨테이너 허용 목록 |

**에이전트 <=v7.19**에서 `DD_AC_INCLUDE`와 `DD_AC_EXCLUDE` 환경 변수를 사용해 이미지나 이름으로 컨테이너를 포함하거나 제외합니다. 이 환경 변수는 이후 에이전트 버전에서 사용되지 않습니다.

각 포함 항목과 예외 항목이 띄어쓰기로 구분된 regex 문자열로 정의되어 있습니다. 이름(`name`), 이미지 이름(`image`), 또는 쿠버네티스 이름(`kube_namespace`)을 기반으로 컨테이너를 포함하거나 제외할 수 있습니다.

#### 예시
이름이 `dd-agent`인 컨테이너를 제외하는 방법:

```
DD_CONTAINER_EXCLUDE = "name:^dd-agent$"
```

이미지 이름이 `dockercloud/network-daemon`와 `dockercloud/logrotate`인 컨테이너를 제외하는 방법:

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon$ image:^dockercloud/logrotate$"
```

모든 컨테이너를 제외하는 방법:

```
DD_CONTAINER_EXCLUDE = "name:.*"
```

또는 `image:.*`나 `kube_namespace:.*`를 사용할 수 있습니다. `name:`, `image:`, `kube_namespace:` 접두어를 붙이고 `.*`를 구성해야 잘 작동합니다.

### 포함 및 제외 작업

제외 항목보다 포함 항목이 우선 순위를 차지합니다. 예를 들어, `ubuntu` 또는 `debian` 이미지만 모니터하려면, 먼저 다른 이미지를 모두 제외한 후 포함할 이미지를 지정합니다.

```
DD_CONTAINER_EXCLUDE = "image:.*"
DD_CONTAINER_INCLUDE = "image:ubuntu image:debian"
```

여러 카테고리에 걸쳐 포함/제외 규칙을 병용할 수는 없습니다. 예를 들면, 이미지 이름이 `foo`인 컨테이너를 포함하되 이미지 이름이 `bar`인 컨테이너 메트릭을 제외하고자 하면, 다음과 같이 하는 것만으로는 **충분하지 않습니다.**

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^bar$"
DD_CONTAINER_INCLUDE = "image:^foo$"
```

대신, 다음을 사용하세요.

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^bar$"
DD_CONTAINER_INCLUDE_METRICS = "image:^foo$"
DD_CONTAINER_INCLUDE_LOGS = "image:^foo$"
```

전역 목록과 선택(로그 및 메트릭) 목록 간에는 상호 작용이 없습니다. 다시 말해, 컨테이너를 전역으로 제외한 후(`DD_CONTAINER_EXCLUDE`)에 `DD_CONTAINER_INCLUDE_LOGS`와 `DD_CONTAINER_INCLUDE_METRICS`로 다시 포함할 수 없습니다.

### 환경 변수 설정
{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator에서 `spec.override.nodeAgent.env` 아래 다음 환경 변수를 설정합니다.

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

Helm 차트에서 띄어쓰기로 구분된 문자열을 `datadog.containerExclude`, `datadog.containerInclude`, `datadog.containerExcludeLogs`, `datadog.containerIncludeLogs`, `datadog.containerExcludeMetrics`, `datadog.containerIncludeMetrics`에 제공합니다.

##### 예시

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
```

{{% /tab %}}
{{% tab "컨테이너화된 에이전트" %}}

Helm 또는 Operator를 사용하지 않는 환경에서는 에이전트를 시작할 때 다음 환경 변수를 에이전트 컨테이너에 전송할 수 있습니다.

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

#### 컨테이너 중단

Datadog 에이전트는 쿠버네티스와 OpenShift 중단 컨테이너를 기본적으로 제외합니다. 이렇게 하면 이 컨테이너에서 메트릭 수집하는 것을 예방하고 해당 컨테이너와 관련한 청구 금액이 발생하는 것을 피할 수 있습니다. 그러나 `kubernetes.containers.running` 및 `docker.containers.running`와 같은 컨테이너 메트릭 개수에는 포함됩니다.

이와 같은 동작을 비활성화하고 중단 컨테이너 모니터링을 포함하는 방법:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator에서 `spec.override.nodeAgent.env` 아래 다음 환경 변수를 설정합니다.

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
{{% tab "컨테이너화된 에이전트" %}}

Helm 또는 Operator를 사용하지 않는 환경에서는 에이전트를 시작할 때 다음 환경 변수를 에이전트 컨테이너에 전송할 수 있습ㄴ디ㅏ.

`DD_EXCLUDE_PAUSE_CONTAINER`를 `false`로 설정합니다.
{{% /tab %}}
{{< /tabs >}}

## 포드 제외 설정

**에이전트 v7.45+**에서는 쿠버네티스 포드에 주석을 설정해 자동 탐지를 제어할 수 있습니다. 제외 규칙을 추가하려면 다음 주석을 `"true"` 값으로 설정하세요.

| 주석 | 설명 |
| ------------ | ----------- |
| `ad.datadoghq.com/exclude` | 전체 포드 제외 |
| `ad.datadoghq.com/logs_exclude` | 전체 포드에서 로그 수집 제외 |
| `ad.datadoghq.com/metrics_exclude` | 전체 포드에서 메트릭 수집 제외 |
| `ad.datadoghq.com/<CONTAINER_NAME>.exclude` | 포드에 `<CONTAINER_NAME>`이 있는 컨테이너 제외 |
| `ad.datadoghq.com/<CONTAINER_NAME>.logs_exclude` | 포드에 `<CONTAINER_NAME>`이 있는 컨테이너에서 로그 수집 제외 |
| `ad.datadoghq.com/<CONTAINER_NAME>.metrics_exclude` | 포드에 `<CONTAINER_NAME>`이 있는 컨테이너에서 메트릭 수집 제외 |

#### 전체 포드 제외:
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

#### 컨테이너에서 로그 수집 제외:
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

### 준비되지 않은 포드 허용

기본적으로, Datadog 에이전트가 검사를 예약할 때 `unready` 포드는 무시됩니다. 따라서 이러한 포드에서는 메트릭, 서비스 검사 및 로그가 수집되지 않습니다. 이 동작을 재정의하려면 어노테이션 `ad.datadoghq.com/tolerate-unready`를 `"true"`로 설정하세요. 예를 들어:

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

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/kubernetes/log/?tab=helm#log-collection
[2]: /ko/getting_started/containers/autodiscovery