---
aliases:
- /kr/agent/autodiscovery/management
- /kr/agent/kubernetes/management
further_reading:
- link: /agent/kubernetes/integrations/
  tag: 설명서
  text: 자동탐지 통합 템플릿 만들기 & 불러오기
kind: 가이드
title: 컨테이너 탐지 관리
---

Datadog Agent는 이용 가능한 모든 컨테이너를 자동탐지하도록 설정되어 있습니다. 탐지 파라미터를 제한하거나 데이터 수집 범위를 컨테이너의 서브셋만으로 제한하려면 전용 설정을 이용해 해당 요소를 포함하거나 제외해야 합니다.

**참조**: `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total`, `.stopped.total` 메트릭은 설정의 영향을 받지 않으며, 항상 모든 컨테이너를 탐지합니다.

Agent를 호스트 상의 바이너리로 실행할 때는 [Agent](?tab=agent) 탭의 설명에 따라 자동탐지 한계를 설정하세요. Agent를 컨테이너로 실행할 때는 [컨테이너화 Agent](?tab=containerizedagent) 탭의 설명에 따라 자동탐지 한계를 설정하세요.

## 컨테이너 제외하기

`name`, `image` 또는 `kube_namespace`에 근거한 제외 규칙을 사용해 Agent의 자동탐지 범위에서 컨테이너를 제외하세요. 이렇게 하면 제외된 컨테이너에서 **NO DATA**를 수집합니다. 컨테이너와 제외 규칙이 일치하면 처음에 포함 규칙과 일치하지 않는 한 탐지 범위에 포함되지 않습니다.

**참조**: 제외 조건은 정규식 표현을 지원하며, 공백(스페이스)를 구분자로 사용하는 스트링의 목록으로 정의됩니다.

**참조**: 모든 컨테이너를 제외하려면 `name:.*`, `image:.*` 또는 `kube_namespace:.*`를 사용할 수 있습니다. `name:`, `image:` 또는`kube_namespace:`의 프리픽스(접두어) 없이 `.*`를 구성하면 제대로 작동하지 않습니다.

{{< tabs >}}
{{% tab "컨테이너화 Agent" %}}

**Agent v7.20 이상**의 자동탐지에서 **이미지** `<IMAGE_NAME>`를 가진 임의의 도커(Docker) 컨테이너를 삭제하고 **로그와 메트릭**를 제외하려면 Datadog Agent에 아래의 환경 변수를 추가하세요.

```shell
DD_CONTAINER_EXCLUDE = "image:<IMAGE_NAME>"
```

예를 들어 아래의 설정은 Agent에서 Docker Cloud에 있는 해당 컨테이너를 제외하도록 지시합니다.

```shell
DD_CONTAINER_EXCLUDE = "image:dockercloud/network-daemon image:dockercloud/cleanup image:dockercloud/logrotate image:dockercloud/events image:dockercloud/ntpd"
```

전부를 무시하도록 지시하는 정규식 표현은 `DD_CONTAINER_EXCLUDE = "image:dockercloud/.*"`입니다.

**Agent v7.19 이하**의 자동탐지에서 **이미지** `<IMAGE_NAME>`를 가진 특정 도커 컨테이너를 삭제하려면 다음 환경 변수를 Datadog Agent에 추가하세요.

```shell
DD_AC_EXCLUDE = "image:<IMAGE_NAME>"
```

전과 같이, 아래의 설정은 Agent에서 Docker Cloud에 있는 해당 컨테이너를 제외하도록 지시합니다.

```shell
DD_AC_EXCLUDE = "image:dockercloud/network-daemon image:dockercloud/cleanup image:dockercloud/logrotate image:dockercloud/events image:dockercloud/ntpd"
```

**참조**: `DD_AC_EXCLUDE`는 **Agent v7.20 이상의 버전에서 지원이 중단됩니다**. 

**Agent v7.20 이상**의 자동탐지에서 **이름** `<NAME>`을 가진 임의의 도커(Docker) 컨테이너를 삭제하고 **로그와 메트릭**를 제외하려면 Datadog Agent에 아래의 환경 변수를 추가하세요.

```shell
DD_CONTAINER_EXCLUDE = "name:<NAME>"
```

예를 들어 아래의 제외 규칙은 Agent 컨테이너 자체를 제외하도록 지시합니다.

```shell
DD_CONTAINER_EXCLUDE = "name:dd-agent"
```

**Agent v7.19 이하**의 자동탐지에서 **이름** `<IMAGE_NAME>`을 가진 특정 도커 컨테이너를 삭제하려면 다음 환경 변수를 Datadog Agent에 추가하세요.

```shell
DD_AC_EXCLUDE = "name:<NAME>"
```

예를 들어 아래의 제외 규칙은 Agent 컨테이너 자체를 제외하도록 지시합니다.

```shell
DD_AC_EXCLUDE = "name:dd-agent"
```

**Agent v7.20 이상**에서는 제외 조건을 사용하여 **로그만 또는 메트릭만**을 제외할 수도 있습니다. 예를 들어 이미지 `<IMAGE_NAME>`를 가진 컨테이너에서 로그를 제외하려면 다음 환경 변수를 Datadog Agent 에 추가하세요.

```shell
DD_CONTAINER_EXCLUDE_LOGS = "image:<IMAGE_NAME>"
```

유사하게, 메트릭을 제외하려면 다음을 사용하세요.

```shell
DD_CONTAINER_EXCLUDE_METRICS = "image:<IMAGE_NAME>"
```

쿠버네티스(Kubernetes)에서 네임스페이스 내의 모든 팟 컨테이너를 `<NAMESPACE>`에서 제외하려면 Datadog Agent에 아래의 환경 변수를 추가하세요.

```shell
DD_CONTAINER_EXCLUDE = "kube_namespace:<NAMESPACE>"
```

{{% /tab %}}
{{% tab "Agent" %}}

자동탐지에서 이미지 `<IMAGE_NAME>`를 가지는 특정 도커 컨테이너를 제외하려면, [Agent `datadog.yaml` 설정 파일][1]에 다음의 설정 블록을 추가하세요.

```yaml
container_exclude: [image:<IMAGE_NAME>]
```

자동탐지에서 이름 `<NAME>`을 가지는 특정 도커 컨테이너를 제외하려면, [Agent `datadog.yaml` 설정 파일][1]에 다음의 설정 블록을 추가하세요.

```yaml
container_exclude: [name:<NAME>]
```

**Agent v7.20 이상**에서는 제외 조건을 사용하여 로그만 또는 메트릭만을 제외할 수도 있습니다. 예를 들어 이미지 `<IMAGE_NAME>`를 가진 컨테이너에서 로그를 제외하려면 다음 환경 변수를 Datadog Agent 에 추가하세요.

```shell
container_exclude_logs: [image:<IMAGE_NAME>]
```

유사하게, **Agent v7.20** 이상에서 메트릭을 제외하려면 다음을 사용하세요.

```shell
container_exclude_metrics: [image:<IMAGE_NAME>]
```

쿠버네티스에서 네임스페이스 `<NAMESPACE>` 내의 모든 Pod 컨테이너를 자동탐지에서 제외하려면 [Agent `datadog.yaml` 설정 파일][1]에 다음의 설정 블록을 추가하세요.

```yaml
container_exclude: [kube_namespace:<NAMESPACE>]
```

[1]: /kr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

**참조**: 쿠버네티스를 사용 중이라면 컨테이너 `<NAME>`은 매니페스트 `.spec.containers[0].name`에서 찾을 수 있습니다.

## 컨테이너 포함

`name` 또는 `image`에 근거한 포함 규칙으로 Agent의 자동탐지 한계를 설정하세요. 이렇게 하면 포함된 컨테이너**에서만** 데이터를 수집합니다. 컨테이너와 포함 규칙이 일치하면 항상 자동탐지 범위에 포함됩니다.

**참조**: 포함 조건은 정규식 표현을 지원하며, 공백(스페이스)를 구분자로 사용하는 스트링의 목록으로 정의됩니다.

{{< tabs >}}
{{% tab "컨테이너화 Agent" %}}

**Agent v7.20 이상**의 자동탐지에서 **이미지** `<IMAGE_NAME>`를 가진 특정 도커 컨테이너를 포함하려면 다음 환경 변수를 Datadog Agent에 추가하세요.

```shell
DD_CONTAINER_INCLUDE = "image:<IMAGE_NAME>"
```

**Agent v7.19 이하**의 자동탐지에서 **이미지** `<IMAGE_NAME>`를 가진 특정 도커 컨테이너를 포함하려면 다음 환경 변수를 Datadog Agent에 추가하세요.

```shell
DD_AC_INCLUDE = "image:<IMAGE_NAME>"
```

**참조**: `DD_AC_INCLUDE`는 **Agent v7.20 이상의 버전에서 지원이 중단됩니다**. 

**Agent v7.20 이상**의 자동탐지에서 **이름** `<NAME>`을 가진 특정 도커 컨테이너를 포함하려면 다음 환경 변수를 Datadog Agent에 추가하세요.

```shell
DD_CONTAINER_INCLUDE = "name:<NAME>"
```

예를 들어 `ubuntu` 또는 `debian` 이미지만을 모니터링하며 나머지는 제외하고 싶다면, 다음과 같이 설정하세요.

```shell
DD_CONTAINER_EXCLUDE = "image:.*"
DD_CONTAINER_INCLUDE = "image:ubuntu image:debian"
```

**Agent v7.19 이하**의 자동탐지에서 **이름** `<IMAGE_NAME>`을 가진 특정 도커 컨테이너를 포함하려면 다음 환경 변수를 Datadog Agent에 추가하세요.

```shell
DD_AC_INCLUDE = "name:<NAME>"
```

이전과 같이 `ubuntu` 또는 `debian` 이미지만을 모니터링하며 나머지는 제외하고 싶다면, 다음과 같이 설정하세요.

```shell
DD_AC_EXCLUDE = "image:.*"
DD_AC_INCLUDE = "image:ubuntu image:debian"
```

**Agent v7.20 이상**에서는 포함 조건을 사용하여 로그만 또는 메트릭만을 포함할 수도 있습니다. 예를 들어 이미지 `<IMAGE_NAME>`를 가진 컨테이너에서 로그를 포함하려면 다음 환경 변수를 Datadog Agent 에 추가하세요.

```shell
DD_CONTAINER_INCLUDE_LOGS = "image:<IMAGE_NAME>"
```

유사하게, 메트릭을 포함하려면 다음을 사용하세요.

```shell
DD_CONTAINER_INCLUDE_METRICS = "image:<IMAGE_NAME>"
```

쿠버네티스(Kubernetes)에서 네임스페이스 내의 모든 팟 컨테이너를 <NAMESPACE>에서 포함하려면 Datadog Agent에 아래의 환경 변수를 추가하세요.

```shell
DD_CONTAINER_INCLUDE = "kube_namespace:<NAMESPACE>"
```

{{% /tab %}}
{{% tab "Agent" %}}

자동탐지에서 이미지 `<IMAGE_NAME>`를 가지는 특정 도커 컨테이너를 포함하려면, [Agent `datadog.yaml` 설정 파일][1]에 다음의 설정 블록을 추가하세요.

```yaml
container_include: [image:<IMAGE_NAME>]
```

자동탐지에서 이름 `<NAME>`을 가지는 특정 도커 컨테이너를 포함하려면, [Agent `datadog.yaml` 설정 파일][1]에 다음의 설정 블록을 추가하세요.

```yaml
container_include: [name:<NAME>]
```

**Agent v7.20 이상**에서는 포함 조건을 사용하여 로그만 또는 메트릭만을 포함할 수도 있습니다. 예를 들어 이미지 `<IMAGE_NAME>`를 가진 컨테이너에서 로그를 포함하려면 다음 환경 변수를 Datadog Agent 에 추가하세요.

```shell
container_include_logs: [image:<IMAGE_NAME>]
```

유사하게, 메트릭을 포함하려면 다음을 사용하세요.

```shell
container_include_metrics: [image:<IMAGE_NAME>]
```

쿠버네티스에서 네임스페이스 <NAMESPACE> 내의 모든 Pod 컨테이너를 자동탐지에서 포함하려면 [Agent `datadog.yaml` 설정 파일][1]에 다음의 설정 블록을 추가하세요.

```yaml
container_include: [kube_namespace:<NAMESPACE>]
```

[1]: /kr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

**참조**: 쿠버네티스를 사용 중이라면 컨테이너 `<NAME>`은 매니페스트 `.spec.containers[0].name`에서 찾을 수 있습니다.

## 포함 및 제외 작업

규칙이 글로벌한지, 메트릭이나 로그에만 적용되는지와 관계없이 항상 포함 작업이 우선적으로 작동합니다.

여러 카테고리에 걸쳐 포함/제외 규칙을 병용할 수는 없습니다. 예를 들면, 이미지 이름 `<IMAGE_NAME_1>`의 컨테이너를 포함하되 이미지 이름 `<IMAGE_NAME_2>`의 컨테이너 메트릭은 제외하고자 할 때 다음과 같이 설정해야 합니다.

{{< tabs >}}
{{% tab "컨테이너화 Agent" %}}
```shell
DD_CONTAINER_INCLUDE_METRICS = "image:<IMAGE_NAME_1>"
DD_CONTAINER_INCLUDE_LOGS = "image:<IMAGE_NAME_1>"
DD_CONTAINER_EXCLUDE_METRICS = "image:<IMAGE_NAME_2>"
```

즉, `DD_CONTAINER_INCLUDE = "image:<IMAGE_NAME_1>"` 설정이 충분하지 않다는 뜻입니다.

{{% /tab %}}
{{% tab "Agent" %}}
```yaml
container_include_metrics: [image:<IMAGE_NAME_1>]
container_include_logs: [image:<IMAGE_NAME_1>]
container_exclude_metrics: [image:<IMAGE_NAME_2>]
```

즉, `container_include: [image:<IMAGE_NAME_1>]` 설정이 충분하지 않다는 뜻입니다.
{{% /tab %}}
{{< /tabs >}}

글로벌 리스트와 선택 사항(로그와 메트릭) 목록 사이에는 상호 관계가 없습니다. 따라서 컨테이너를 글로벌 범위에서 제외한 후, `container_include_logs`와 `container_include_metrics`로 포함할 수는 없습니다.

## Pause 컨테이너

Datadog Agent는 기본적으로 쿠버네티스나 OpenShift의 Pause 컨테이너를 제외합니다. 단, 제외 컨테이너와 마찬가지로 컨테이너 개수로는 계산합니다.

이 동작을 비활성화하고 자동탐지 범위에 Pause 컨테이너에 포함시키려면 [Agent `datadog.yaml` 설정 파일] [1]에서 `exclude_pause_container` 파라미터를 `false`로 설정하거나 Agent 환경 변수 `DD_EXCLUDE_PAUSE_CONTAINER="false"`를 사용하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/agent/guide/agent-configuration-files/#agent-main-configuration-file