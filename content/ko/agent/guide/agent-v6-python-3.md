---
further_reading:
- link: /agent/versions/upgrade_to_agent_v7/
  tag: 설명서
  text: 에이전트 v7로 업그레이드
title: 파이썬(Python) 버전 관리
---

에이전트 버전 6을 사용하는 경우, Datadog에서는 [에이전트 버전 7로 업그레이드할 것][1]을 권장합니다. 에이전트 버전 7은 파이썬 3에 대한 지원만 포함합니다.

하지만 파이썬 3으로 업데이트하고 에이전트 버전 6을 계속 사용하길 원할 수 있습니다. Datadog 에이전트 버전 6.14.0으로 시작하면 에이전트 버전 6이 파이썬 2와 파이썬 3 런타임 모두를 통합합니다. 즉, 에이전트 설정에 따라 에이전트 점검이 파이썬 2 또는 파이썬 3으로 실행됩니다. 

## 파이썬 3과 Datadog 에이전트 버전 6 사용하기

기본적으로 에이전트 버전 6은 파이썬 2 런타임을 사용합니다. 아래에서 에이전트 버전 6을 통해 파이썬 3 런타임을 사용하는 방법에 대한 지침을 설명하겠습니다.

- [호스트 에이전트](#host-agent)
- [컨테이너 에이전트](#container-agent)
  - [헬름(Helm)](?tab=helm#container-agent)
  - [Datadog 오퍼레이터](?tab=datadogoperator#container-agent)
  - [데몬셋(DaemonSet)](?tab=daemonset#container-agent)
- [배포 툴](#deployment-tools)
  - [쉐프(Chef)](?tab=chef#deployment-tools)
  - [퍼핏(Puppet)](?tab=puppet#deployment-tools)
  - [앤시블(Ansible)](?tab=ansible#deployment-tools)

이 설정은 Azure VM 확장에서 지원되지 않습니다.

### 호스트 에이전트

1. [`datadog.yaml`][2] 설정 파일에서 `python_version` 설정 옵션을 설정합니다.

    ```yaml
    python_version: 3
    ```

2. [Restart the Agent][3].

대신 `DD_PYTHON_VERSION` 환경 변수를 `2` 또는 `3`으로 설정하여 사용하려는 파이썬 런타임을 지정합니다. 환경 변수가 `datadog.yaml`의 설정 옵션보다 우선 적용됩니다. 예를 들어 `DD_PYTHON_VERSION` 환경 변수를 설정하면 `datadog.yaml`의 `python_version` 옵션은 무시됩니다.

에이전트 전체에 적용되는 설정 옵션입니다. **에이전트에서 시작한 모든 파이썬 점검은 동일한 파이썬 런타임을 사용합니다.**


### 컨테이너 에이전트

Datadog에서는 파이썬 2 및 파이썬 3에 대한 에이전트 컨테이너 이미지를 제공합니다 .

* `6.34.0` 또는 `6.34.0-jmx`처럼 `6.`으로 시작하는 이미지 태그는 파이썬 2 런타임을 포함하는 이미지입니다.
* `7.34.0` 또는 `7.34.0-jmx`처럼 `7.`로 시작하는 이미지 태그는 파이썬 3 런타임을 포함하는 이미지입니다.

파이썬 2에서 파이썬 3으로 전환하려면 에이전트 배포에 사용된 이미지 태그를 업데이트하세요.

{{< tabs >}}
{{% tab "Helm" %}}
기본적으로, [Datadog 헬름(Helm) 차트][1]는 파이썬 3 런타임을 포함하는 에이전트 7 이미지를 사용합니다.

Datadog 에이전트를 업데이트된 상태로 유지하려면 `values.yaml`을 편집해 `agent.image` 및 `clusterChecksRunner.image` 섹션에 있는 모든 정보를 제거합니다.

특정 컨테이너 레지스트리를 사용하려면 `agent.image.repository` 및 `clusterChecksRunner.image.repository`을 사용해 설정합니다. `agents.image.tag` 및 `clusterChecksRunner.image.tag`가 정의 안 됨 상태인지 확인하세요.

기본 레지스트리는 `gcr.io/datadoghq/agent`입니다.

```yaml
agent:
  image:
    repository: public.ecr.aws/datadog/agent

clusterChecksRunner:
  image:
    repository: public.ecr.aws/datadog/agent
```

에이전트를 특정 버전으로 설정하려면 `agents.image.tag` 및 `clusterChecksRunner.image.tag`을 설정합니다. `7.*`로 시작하는 모든 이미지 태그는 파이썬 3 런타임을 포함합니다.

```yaml
agent:
  image:
    tag: 7.34.0

clusterChecksRunner:
  image:
    tag: 7.34.0
````

동시에 두 옵션을 사용할 수 있습니다.

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
기본적으로 [Datadog 오퍼레이터는][1] 파이썬 3 런타임을 포함하는 `agent:7.*.*` 이미지를 사용합니다.

`DatadogAgent` 리소스에 이미지 정보가 지정되지 않은 경우 오퍼레이터는 파이썬 3 Datadog 에이전트 이미지를 배포합니다.

이전에 고정한 이미지 버전이 있는 경우:

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

`image.name`을 사용하는 경우:

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

기본 레지스트리를 변경하려면 `spec.global.registry`을 사용합니다. 기본값은 `gcr.io/datadoghq/agent`입니다.

그런 다음 `spec.override.nodeAgent.image.tag`에서 에이전트 7 이미지 태그를 고정합니다.

클러스터 점검 러너 배포를 활성화한 경우 `spec.override.clusterChecksRunner.image.tag`에서도 에이전트 7 이미지 태그를 고정합니다.

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

**참고**: Datadog는 `*.image.tag`를 설정하지 않을 것을 권장합니다. 대신, Datadog 오퍼레이터는 에이전트 7 이미지를 사용해 에이전트 이미지 태그를 최신 상태로 유지합니다.

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
{{% tab "DaemonSet" %}}

데몬셋 매니페스트에서 각 컨테이너 정의의 이미지 태그를 업데이트합니다. 

* 각 `spec.template.spec.containers[*].image` 값
* 각 `spec.template.spec.initContainers[*].image` 값

예를 들어, 이전 이미지 값이 `gcr.io/datadoghq/agent:6.33.0`인 경우 `gcr.io/datadoghq/agent:7.33.0`로 업데이트합니다.

**이전**:

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

**이후**:

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

### 배포 툴

{{< tabs >}}
{{% tab "Chef" %}}

`extra_config` 필드를 사용해 ` python_version` 필드를 `3`으로 설정합니다.

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

`agent_extra_config` 필드를 사용해 `python_version` 필드를 `3`으로 설정합니다.

```
class { "datadog_agent":
    agent_extra_options => {
        python_version => 3,
    },
}
```

{{% /tab %}}
{{% tab "Ansible" %}}

`datadog_config` 대신 `python_version`을 `3`으로 설정합니다.
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