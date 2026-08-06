---
description: Agent 검사 및 통합에 기본 Python 2 대신 Python 3 런타임을 사용하도록 Datadog Agent v6을 구성합니다.
further_reading:
- link: /agent/versions/upgrade_to_agent_v7/
  tag: 설명서
  text: Agent v7로 업그레이드
title: Python 버전 관리
---

Datadog에서는 에이전트 v6을 사용 중인 경우 [에이전트 v7으로 업데이트][1]할 것을 권장합니다. 에이전트 v7에서만 Python 3이 지원됩니다.

그러나 에이전트 v6을 사용하면서 Python 3로 업데이트하고 싶은 경우가 있습니다. Datadog 에이전트 v6.14.0부터 에이전트 v6와 Python 2 및 Python 3 런타임이 통합되었습니다. 따라서 에이전트 구성에 따라 Python 2나 Python 3에서 에이전트 점검을 실행할 수 있습니다.

## Python 3과 Datadog 에이전트 v6 사용하기

기본적으로 에이전트 v6에서는 Python 2 런타임을 사용합니다. 에이전트 v6에서 Python 3 런타임을 사용하려면 아래 구성 지침을 참고하세요.

- [호스트 에이전트](#host-agent)
- [컨테이너 에이전트](#container-agent)
  - [Helm](?tab=helm#container-agent)
  - [Datadog Operator](?tab=datadogoperator#container-agent)
  - [DaemonSet](?tab=daemonset#container-agent)
- [배포 도구](#deployment-tools)
  - [Chef](?tab=chef#deployment-tools)
  - [Puppet](?tab=puppet#deployment-tools)
  - [Ansible](?tab=ansible#deployment-tools)

Azure VM Extension에서는 이 구성이 지원되지 않습니다.

### 호스트 에이전트

1. [`datadog.yaml`][2] 구성 파일에서 `python_version` 구성 옵션을 설정하세요.

    ```yaml
    python_version: 3
    ```

2. [에이전트를 다시 시작합니다][3].

또는 환경 변수 `DD_PYTHON_VERSION`를 `2` 또는 `3`으로 설정해 사용하고 싶은 Python 런타임을 지정하세요. `datadog.yaml`의 구성 옵션보다 환경 변수가 우선 순위가 높습니다. 예를 들어 환경 변수 `DD_PYTHON_VERSION`를 설정하면 `datadog.yaml`의 `python_version` 옵션은 무시됩니다.

이는 에이전트 전체 구성 옵션입니다. **에이전트에서 실행하는 Python 점검 모두에서 동일한 Python 런타임을 사용합니다**.


### 컨테이너 에이전트

Datadog에서 Python 2와 Python 3용 에이전트 컨테이너 이미지를 제공합니다.

* `6.34.0`이나 `6.34.0-jmx`와 같이 `6.`로 시작하는 이미지 태그는 Python 2 런타임을 포함하는 이미지입니다.
* `7.34.0`이나 `7.34.0-jmx`와 같이 `7.`로 시작하는 이미지 태그는 Python 3 런타임을 포함하는 이미지입니다.

Python 2에서 Python 3로 변경하려면 에이전트를 배포할 때 사용하는 이미지 태그를 업데이트하세요.

{{< tabs >}}
{{% tab "Helm" %}}
기본적으로 [Datadog Helm 차트][1]에서는 Python 3 런타임이 포함되어 있는 에이전트 7 이미지를 사용합니다.

Datadog 에이전트를 최신 업데이트 버전으로 유지하려면 `datadog-values.yaml`를 편집해 `agent.image`와 `clusterChecksRunner.image` 섹션 아래 정보를 모두 삭제하세요.

특정 컨테이너 레지스트리를 사용하려면 `agent.image.repository`와 `clusterChecksRunner.image.repository`로 설정하세요. `agents.image.tag`와 `clusterChecksRunner.image.tag`를 정의하지 않아야 합니다.

기본 레지스트리는 `gcr.io/datadoghq/agent`입니다.

```yaml
agent:
  image:
    repository: public.ecr.aws/datadog/agent

clusterChecksRunner:
  image:
    repository: public.ecr.aws/datadog/agent
```

에이전트를 특정 버전으로 설정하려면 `agents.image.tag`와 `clusterChecksRunner.image.tag`를 설정하세요. `7.*`로 시작하는 이미지 태그에는 모두 Python 3 런타임을 포함하고 있습니다.

```yaml
agent:
  image:
    tag: 7.34.0

clusterChecksRunner:
  image:
    tag: 7.34.0
````

두 옵션을 동시에 사용할 수 있습니다.

```yaml
agent:
  image:
    repository: public.ecr.aws/datadog/agent
    tag: 7.34.0

clusterChecksRunner:
  image:
    repository: public.ecr.aws/datadog/agent
    tag: 7.34.0
```

[1]:https://artifacthub.io/packages/helm/datadog/datadog/

{{% /tab %}}
{{% tab "Datadog Operator" %}}
기본적으로 [Datadog Operator][1]에서는 Python 3 런타임이 포함되어 있는 `agent:7.*.*` 이미지를 사용합니다.

`DatadogAgent` 리소스에 이미지 정보를 지정하지 않으면 Operator에서 Python 3 에이전트 이미지를 배포합니다.

이전에 이미지 버전을 고정한 적이 있는 경우에는 다음을 실행하세요.

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  override:
    clusterChecksRunner:
      image:
        tag: 6.33.0
    nodeAgent:
      image:
        tag: 6.33.0
```

또는 `image.name`을 사용할 경우 다음을 실행하세요.

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  override:
    # ...
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:6.33.0
    # ...
    clusterChecksRunner:
      image:
        name: gcr.io/datadoghq/agent:6.33.0
```

기본 레지스트리를 변경해야 할 경우 `spec.global.registry`를 사용하세요. 기본값은 `gcr.io/datadoghq/agent`입니다.

그리고 `spec.override.nodeAgent.image.tag`에 에이전트 7 이미지 태그를 고정하세요.

클러스터 점검 실행기 배포를 활성화한 경우 `spec.override.clusterChecksRunner.image.tag`에도 에이전트 7 이미지 태그를 고정하세요.

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  # ...
  global:
    registry: public.ecr.aws/datadog
  override:
    # ...
    nodeAgent:
      image:
        tag: 7.33.0
    # ...
    clusterChecksRunner:
      image:
        tag: 7.33.0
```

**참고**: Datadog에서는 `*.image.tag`를 설정하지 않기를 권장합니다. 대신 Datadog Operator에서 에이전트 7 이미지를 사용해 에이전트 태그를 최신 상태로 유지합니다.

에이전트 JMX 이미지를 사용해야 하는 경우 에이전트 `*.image.tag`를 지정하지 않고 설정할 수 있습니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  # ...
  global:
    registry: public.ecr.aws/datadog
  override:
    # ...
    nodeAgent:
      image:
        jmxEnabled: true
    clusterChecksRunner:
      image:
        jmxEnabled: true
```

[1]: https://github.com/DataDog/datadog-operator
{{% /tab %}}
{{% tab "수동(DaemonSet)" %}}

DaemonSet 매니페스트에서 각 컨테이너 정의의 이미지 태그를 업데이트하세요.

* 각 `spec.template.spec.containers[*].image` 값
* 각 `spec.template.spec.initContainers[*].image` 값

예를 들어 이전 이미지 값이 `gcr.io/datadoghq/agent:6.33.0`이었을 경우, `gcr.io/datadoghq/agent:7.33.0`으로 업데이트하세요.

**전**:

```yaml
apiVersion: apps/v1
spec:
  template:
    spec:
      containers:
      - name: agent
        image: gcr.io/datadoghq/agent:6.33.0
        # ...

```

**후**:

```yaml
apiVersion: apps/v1
spec:
  template:
    spec:
      containers:
      - name: agent
        image: gcr.io/datadoghq/agent:7.33.0
        # ...
```

{{% /tab %}}
{{< /tabs >}}

### 배포 도구

{{< tabs >}}
{{% tab "Chef" %}}

`extra_config` 필드에서 ` python_version`을 `3`으로 설정하세요.

```
default_attributes(
   'datadog' => {
     'extra_config' => {
       'python_version' => '3'
     }
   }
 )
```

{{% /tab %}}
{{% tab "Puppet" %}}

`agent_extra_config` 필드에서 `python_version` 필드를 `3`으로 설정하세요.

```
class { "datadog_agent":
    agent_extra_options => {
        python_version => 3,
    },
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

`datadog_config`에 있는 `python_version`을 `3`으로 설정하세요. 
```
datadog_config:
  python_version: 3
```

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/versions/upgrade_to_agent_v7/?tab=linux
[2]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[3]: /ko/agent/configuration/agent-commands/#restart-the-agent