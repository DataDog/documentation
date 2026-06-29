---
aliases:
- /ko/agent/kubernetes/log
description: Datadog Agent를 사용하여 Kubernetes에서 실행되는 컨테이너화된 애플리케이션의 로그 수집 구성
further_reading:
- link: https://www.datadoghq.com/blog/eks-fargate-logs-datadog
  tag: 블로그
  text: Datadog을 사용하여 Fargate 기반 Amazon EKS의 로그 모니터링
- link: /agent/kubernetes/apm/
  tag: 설명서
  text: 애플리케이션 트레이스 수집
- link: /agent/kubernetes/prometheus/
  tag: 설명서
  text: Prometheus 메트릭 수집
- link: /agent/kubernetes/integrations/
  tag: 설명서
  text: 애플리케이션 메트릭 및 로그 자동 수집
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
- link: /agent/kubernetes/tag/
  tag: 설명서
  text: 컨테이너에서 내보내는 모든 데이터에 태그 할당
- link: /containers/troubleshooting/log-collection
  tag: 설명서
  text: 컨테이너 로그 수집 문제 해결
title: Kubernetes 로그 수집
---
이 페이지에서는 Kubernetes 로그 파일의 로그 수집에 대해 설명합니다.

컨테이너화된 애플리케이션이 로그를 표준 출력(`stdout`) 및 표준 오류(`stderr`)에 기록하는 경우 컨테이너 런타임과 Kubernetes가 로그를 자동으로 관리합니다. 기본적으로 [Kubernetes는 이러한 로그 스트림을 호스트의`/var/log/pods` 폴더와 각 포드 및 컨테이너의 하위 폴더에 파일 형태로 저장][13]합니다.

Datadog Agent는 아래 지침을 사용하여 이러한 컨테이너의 Kubernetes 로그 파일을 수집할 수 있습니다. 이 옵션은 Kubernetes가 생성하는 포드의 일시적 특성에 적합하게 확장되며 Docker 소켓을 사용한 로그 수집보다 리소스를 더 효율적으로 사용합니다. Datadog은 Kubernetes에서 이 로그 수집 방식을 권장합니다.

또한 Datadog Agent는 Docker 소켓을 통해 Docker API를 반복 호출하여 로그를 수집할 수도 있습니다. 그러나 이 방식은 Kubernetes 클러스터의 컨테이너 런타임으로 Docker를 사용해야 합니다. 또한 로그 파일을 사용하는 방식보다 더 많은 리소스를 소비합니다. Docker 소켓을 사용한 로그 수집 방법은 [Docker 소켓을 사용한 로그 수집][1]을 참조하세요. 컨테이너화된 애플리케이션이 컨테이너 내부의 로그 파일에 직접 기록하는 경우 로그 수집이 복잡해질 수 있습니다. 이 경우 [파일에서 로그 수집](#from-a-container-local-log-file)을 참조하세요.

## 설정 {#setup}

### 로그 수집 {#log-collection}

애플리케이션 로그 수집을 시작하기 전에 Kubernetes 클러스터에서 Datadog Agent가 실행 중인지 확인하세요.

DaemonSet에서 로그 수집을 수동으로 구성하려면 [DaemonSet 로그 수집][9]을 참조하세요. 그렇지 않으면 아래 지침을 따르세요.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` 매니페스트를 다음과 같이 업데이트합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

그런 다음 새로운 구성을 적용합니다.

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

추가 예제를 보려면 [로그, 메트릭 및 APM 수집이 활성화된 샘플 매니페스트][1]를 참조하세요. 기본적으로 검색된 모든 컨테이너의 로그를 수집하려면 `features.logCollection.containerCollectAll`을 `true`로 설정할 수 있습니다. `false`(기본값)로 설정된 경우 로그 수집을 활성화하려면 Autodiscovery 로그 구성을 지정해야 합니다. 자세한 내용은 [로그 검색 - 필터링](#filtering)을 참조하세요.

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-logs-apm.yaml
{{% /tab %}}
{{% tab "Helm" %}}

Helm을 사용하여 로그 수집을 활성화하려면 [datadog-values.yaml][1] 파일에 다음 로그 수집 구성을 추가합니다. 그런 다음 Datadog Helm 차트를 업그레이드합니다.

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```

기본적으로 검색된 모든 컨테이너의 로그를 수집하려면 `datadog.logs.containerCollectAll`을 `true`로 설정할 수 있습니다. `false`(기본값)로 설정된 경우 로그 수집을 활성화하려면 Autodiscovery 로그 구성을 지정해야 합니다. 자세한 내용은 [로그 검색 - 필터링](#filtering)을 참조하세요.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

### 권한 없는 설치 {#unprivileged}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
(선택 사항) 권한 없는 설치를 실행하려면 [DatadogAgent 사용자 지정 리소스][1]에 다음 구성을 추가합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    logCollection:
      enabled: true
      containerCollectAll: true

  override:
    nodeAgent:
      securityContext:
        runAsUser: <USER_ID>
        supplementalGroups:
          - <DOCKER_GROUP_ID>
```

- `<USER_ID>`를 Agent를 실행할 UID로 변경합니다.
- `<DOCKER_GROUP_ID>`를 Docker 또는 containerd 소켓을 소유한 그룹 ID로 변경합니다.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{% tab "Helm" %}}

(선택 사항) 권한 없는 설치를 실행하려면 `values.yaml` 파일에 다음 구성을 추가합니다.

```yaml
datadog:
  securityContext:
    runAsUser: <USER_ID>
    supplementalGroups:
      - <DOCKER_GROUP_ID>
```

- `<USER_ID>`를 Agent를 실행할 UID로 변경합니다.
- `<DOCKER_GROUP_ID>`를 Docker 또는 containerd 소켓을 소유한 그룹 ID로 변경합니다.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">
<strong>권한 없는 설치에 대한 경고</strong>
<br/><br/>
권한 없는 설치를 실행할 때 Agent는 다음 위치의 로그 파일을 읽을 수 있어야 합니다. <code>/var/log/pods</code>.
<br/><br/>
containerd 런타임을 사용하는 경우 <code>/var/log/pods</code> 의 로그 파일은 <code>root</code> 그룹 구성원이 읽을 수 있습니다. 위 지침을 사용하면 Agent가 <code>root</code> 그룹으로 실행됩니다. 추가 조치는 필요하지 않습니다.
<br/><br/>
Docker 런타임을 사용하는 경우 <code>/var/log/pods</code> 의 로그 파일은 <code>/var/lib/docker/containers</code>에 대한 심볼릭 링크입니다. 이 경로는 <code>root</code> 사용자만 접근할 수 있습니다. 따라서 Docker 런타임에서는<code>root</code> 가 아닌 Agent가 <code>/var/log/pods</code>의 로그를 읽을 수 없습니다. 이 경우 Agent 컨테이너에 Docker 소켓을 마운트해야 하며, Agent는 Docker 데몬을 통해 포드 로그를 가져와야 합니다.
<br/><br/>
Docker 소켓이 마운트된 상태에서 <code>/var/log/pods</code> 로부터 로그를 수집하려면 환경 변수 <code>DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE</code> (또는 <code>logs_config.k8s_container_use_file</code> - <code>datadog.yaml</code>에 있는 설정)을 <code>true</code>로 설정합니다. 이렇게 하면 Agent가 파일 수집 모드를 사용하도록 강제됩니다.
</div>

## 로그 검색 {#log-discovery}

Kubernetes의 Datadog Agent는 DaemonSet(Datadog Operator 또는 Helm에서 관리)에 의해 배포됩니다. 이 DaemonSet은 클러스터의 각 노드에 Agent 포드 복제본 하나를 배치합니다. 각 Agent 포드는 자신이 실행 중인 노드의 다른 포드 및 컨테이너 로그를 보고하는 역할을 담당합니다. "Container Collect All" 기능이 활성화되면 Agent는 검색된 모든 컨테이너의 로그를 기본 태그 집합과 함께 보고합니다.

### 필터링 {#filtering}

"Container Collect All"이 활성화되면 로그를 수집할 컨테이너를 선택적으로 지정할 수 있습니다. 예를 들어 Datadog Agent 자체의 로그 수집을 제외하려는 경우 유용합니다. 이를 위해 Datadog Agent에 수집 대상을 제어하는 구성을 전달하거나 Kubernetes 포드에 특정 로그를 명시적으로 제외하는 구성을 전달할 수 있습니다.

`DD_CONTAINER_EXCLUDE_LOGS` 또는 `ad.datadoghq.com/logs_exclude`과 같은 방법으로 로그를 제외하는 경우, Agent는 [Autodiscovery 주석][19] 또는 [Autodiscovery 구성 파일][20]에 명시적으로 정의된 로그 수집 구성이 있더라도 해당 로그를 수집하지 않습니다.

"Container Collect All"이 비활성화된 경우(기본값) 모든 항목이 기본적으로 제외되므로 별도의 필터링을 추가할 필요가 없습니다. 선택한 포드에 대해서만 로그 수집을 활성화하려면 해당 포드에 대해 [Autodiscovery 주석][19] 또는 [Autodiscovery 구성 파일][20]을 사용하여 로그 구성을 설정할 수 있습니다.

필터링에 대한 자세한 내용은 [Container Discovery Management][8]를 참조하세요.

### 태깅 {#tagging}

Datadog Agent는 Kubernetes 컨테이너의 로그에 [기본 Kubernetes 태그][14]와 사용자 지정으로 추출된 태그를 추가합니다. "Container Collect All"이 활성화된 경우 Agent는 컨테이너의 단축 이미지 이름을 기반으로 `source` 및 `service` 태그를 설정하여 로그를 보고합니다. 예를 들어 `gcr.io/owner/example-image:latest` 컨테이너 이미지를 사용하는 컨테이너의 로그에는 `example-image`가 `source`, `service`, `short_image` 태그 값으로 설정됩니다.

`service` 태그는 U [Unified Service Tagging][4] 포드 레이블인 `tags.datadoghq.com/service: "<SERVICE>"`을 통해서도 설정할 수 있습니다. `source` 및 `service` 속성에 대한 자세한 내용은 [Reserved Attributes][11]를 참조하세요.

`source` 태그는 [기본 제공 로그 파이프라인][15]이 이 태그를 기준으로 필터링되므로 로그에 중요할 수 있습니다. 다만 이러한 파이프라인은 필요에 따라 완전히 사용자 지정할 수 있습니다. 로그의 태그를 추가로 사용자 지정하는 방법은 아래의 [통합 로그](#integration-logs) 섹션을 참조하세요.

## 통합 로그 {#integration-logs}

[Autodiscovery][10]를 사용하면 템플릿을 이용해 컨테이너의 로그 수집(및 기타 기능)을 구성할 수 있습니다. 이를 통해 로그 수집을 활성화하고, 태깅을 사용자 지정하며, 고급 수집 규칙을 추가할 수 있습니다. Autodiscovery를 사용하여 통합의 로그 수집을 구성하려면 다음 방법 중 하나를 사용할 수 있습니다.

- 특정 포드에 Autodiscovery 주석으로 로그 구성을 지정하여 해당 컨테이너에 대한 규칙을 구성*(권장)*
- 구성 파일로 로그 구성을 지정하여 일치하는 이미지의 각 컨테이너에 대한 규칙을 구성

이러한 로그 구성에는 최소한 `source` 및 `service` 태그가 필요합니다. 로그를 자동으로 보강하는 데 도움이 되도록 `source` 태그를 Datadog의 [기본 제공 로그 파이프라인][15] 중 하나와 일치시키는 것이 좋습니다. [Datadog에서 제공하는 파이프라인 라이브러리][16]도 활용할 수 있습니다.

### Autodiscovery 주석 {#autodiscovery-annotations}

Autodiscovery를 사용하면 Agent가 모든 포드 주석에서 통합 템플릿을 자동으로 검색합니다.

특정 컨테이너에 특정 구성을 적용하려면 JSON 형식의 로그 구성을 포함하는 `ad.datadoghq.com/<CONTAINER_NAME>.logs` 주석을 포드에 추가합니다. 

**참고**: Autodiscovery 주석은 이미지가 **아니라** 이름을 기준으로 컨테이너를 식별합니다. 즉, `<CONTAINER_NAME>`을 `.spec.containers[i].image`가 아니라 `.spec.containers[i].name`과 맞추려고 합니다.

<div class="alert alert-info">
Kubernetes 포드를 <i>직접</i> 정의하는 경우( <code>kind:Pod</code>리소스 사용) 각 포드의 주석을 해당 <code>metadata</code> 섹션에 추가합니다. 다음 섹션을 참조하세요.
<br/><br/>
Kubernetes 포드를 <i>간접적</i>으로 정의하는 경우(Replication Controller, ReplicaSet 또는 Deployment 사용) 포드 주석을 <code>.spec.template.metadata</code>아래에 있는 포드 템플릿에 추가합니다.</div>

#### 단일 컨테이너 구성 {#configure-a-single-container}
포드 내 특정 컨테이너의 로그 수집을 구성하려면 다음 주석을 포드에 추가합니다.

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.logs: '[<LOG_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_NAME>'
# (...)
```

#### 로그 Autodiscovery 주석 예제 {#example-log-autodiscovery-annotations}

다음 포드 주석은 예제 컨테이너에 대한 통합 템플릿을 정의합니다. 이 주석은 Deployment 자체가 아니라 포드 템플릿의 annotations에 정의됩니다. 이 로그 구성은 `app` 컨테이너의 모든 로그에 대해 `source:java`, `service:example-app` 태그와 추가 태그 `foo:bar`를 설정합니다.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
  labels:
    app: example-app
spec:
  selector:
    matchLabels:
      app: example-app
  template:
    metadata:
      labels:
        app: example-app
      annotations:
        ad.datadoghq.com/app.logs: '[{"source":"java", "service":"example-app", "tags":["foo:bar"]}]'
    spec:
      containers:
        - name: app
          image: owner/example-image:latest
```

#### 서로 다른 두 컨테이너 구성 {#configure-two-different-containers}
포드 내 두 개의 서로 다른 컨테이너(`<CONTAINER_NAME_1>` 및 `<CONTAINER_NAME_2>`)에 각각 다른 통합 템플릿을 적용하려면 다음 주석을 포드에 추가합니다.

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME_1>.logs: '[<LOG_CONFIG_1>]'
    # (...)
    ad.datadoghq.com/<CONTAINER_NAME_2>.logs: '[<LOG_CONFIG_2>]'
spec:
  containers:
    - name: '<CONTAINER_NAME_1>'
    # (...)
    - name: '<CONTAINER_NAME_2>'
# (...)
```

### Autodiscovery 구성 파일 {#autodiscovery-configuration-files}
Datadog Agent에 구성 파일을 제공하면, Agent가 지정된 이미지 식별자와 일치하는 컨테이너를 발견했을 때 지정된 통합을 실행하도록 할 수 있습니다. 이를 통해 특정 컨테이너 이미지 집합에 공통으로 적용되는 일반적인 로그 구성을 생성할 수 있습니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
`override.nodeAgent.extraConfd.configDataMap` 설정을 사용하여 통합별 로그 수집 구성을 사용자 지정할 수 있습니다. 이 방법은 ConfigMap을 생성하고 원하는 구성 파일을 Agent 컨테이너에 마운트합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
            - <CONTAINER_IMAGE>
        
            logs:
            - source: example-source
              service: example-service
```

`<CONTAINER_IMAGE>`은 해당 구성을 적용할 대상 컨테이너의 단축 이미지 이름과 일치해야 합니다. 추가 예제는 [ConfigMap 매핑이 포함][1]된 샘플 매니페스트를 참조하세요.

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-with-extraconfd.yaml
{{% /tab %}}

{{% tab "Helm" %}}
`datadog.confd` 내에서 통합별 로그 수집을 사용자 지정할 수 있습니다. 이 방법은 ConfigMap을 생성하고 원하는 구성 파일을 Agent 컨테이너에 마운트합니다.

```yaml
datadog:
  #(...)
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
      - <CONTAINER_IMAGE>
      
      logs:
      - source: example-source
        service: example-service
```

`<CONTAINER_IMAGE>`은 해당 구성을 적용할 대상 컨테이너의 단축 이미지 이름과 일치해야 합니다.

{{% /tab %}}

{{% tab "키-값 저장소" %}}
다음 etcd 명령은 사용자 지정 `password` 파라미터를 포함하는 Redis 통합 템플릿을 생성하고, 로그에 올바른 `source` 및 `service` 속성을 태그로 지정합니다.

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis", "tags": ["env:prod"]}]'
```

세 값 모두 목록이라는 점에 유의하세요. Autodiscovery는 공유된 목록 인덱스를 기준으로 목록 항목을 조합하여 통합 구성을 생성합니다. 이 예에서는 `check_names[0]`, `init_configs[0]` 및 `instances[0]`를 기반으로 첫 번째(그리고 유일한) 점검 구성을 생성합니다.

auto-conf 파일과 달리, **키-값 저장소는 컨테이너 식별자로 단축 이미지 이름 또는 전체 이미지 이름을 모두 사용**할 수 있습니다(예: `redis` 또는 `redis:latest`).

Autodiscovery는 [Consul][1], Etcd 및 Zookeeper를 통합 템플릿 소스로 사용할 수 있습니다.

키-값 저장소를 사용하려면 Agent의 `datadog.yaml` 구성 파일에서 이를 설정한 후 해당 파일을 컨테이너화된 Agent 내부에 마운트합니다. 또는 컨테이너화된 Agent에 키-값 저장소 정보를 환경 변수로서 전달할 수도 있습니다.

#### `datadog.yaml`에서 {#in-datadogyaml}

`datadog.yaml` 파일에서 키-값 저장소의 주소(`<KEY_VALUE_STORE_IP>`)와 유형(`<KEY_VALUE_STORE_PORT>`)을 설정합니다.

  ```yaml
  config_providers:
    - name: etcd
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:

    - name: consul
      polling: true
      template_dir: datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      ca_file:
      ca_path:
      cert_file:
      key_file:
      username:
      password:
      token:

    - name: zookeeper
      polling: true
      template_dir: /datadog/check_configs
      template_url: '<KV_STORE_IP>:<KV_STORE_PORT>'
      username:
      password:
  ```

그런 다음 구성 변경 사항을 적용하기 위해 [Agent를 재시작][2]합니다.

#### 환경 변수 {#in-environment-variables}에서

키-값 저장소가 템플릿 소스로 활성화되면 Agent는 `/datadog/check_configs` 키 아래에서 템플릿을 검색합니다. Autodiscovery는 다음과 같은 키-값 계층 구조를 예상합니다.

```yaml
/datadog/
  check_configs/
    <CONTAINER_IMAGE>/
      - logs: ["<LOGS_CONFIG>"]
    ...
```

**참고**키-값 저장소를 사용할 때 특정 컨테이너에 특정 구성을 적용하기 위해 Autodiscovery는 컨테이너를 **이미지** 기준으로 식별합니다. 즉, `<CONTAINER_IMAGE>`를 `.spec.containers[0].image`과 일치시키는 방식으로 동작합니다.

[1]: /ko/integrations/consul/
[2]: /ko/agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}

컨테이너 단축 이미지 이름보다 더 세밀하게 컨테이너 집합에 로그 구성을 적용하려면 [Autodiscovery Container Identifiers][22]를 참조하세요.

## 고급 로그 수집 {#advanced-log-collection}

Autodiscovery 로그 레이블을 사용하여 다음과 같은 고급 로그 수집 처리 로직을 적용할 수 있습니다.

* [Datadog으로 전송하기 전에 로그 필터링][5]
* [로그의 민감한 데이터 스크러빙][6]
* [여러 줄 로그 집계 수행][7]

### 컨테이너 로컬 로그 파일에서 수집 {#from-a-container-local-log-file}

Datadog은 컨테이너화된 애플리케이션에서 `stdout` 및 `stderr` 출력 스트림을 사용하는 것을 권장합니다. 이 방식을 사용하면 로그 수집을 보다 자동으로 구성할 수 있습니다.

그러나 Agent는 주석을 기반으로 파일에서 직접 로그를 수집할 수도 있습니다. 이러한 로그를 수집하려면 `ad.datadoghq.com/<CONTAINER_NAME>.logs`을 `type: file` 및 `path` 구성과 함께 사용합니다. 이 주석을 통해 파일에서 수집된 로그는 해당 컨테이너 자체에서 수집된 로그와 동일한 태그 집합이 자동으로 적용됩니다. Datadog은 컨테이너화된 애플리케이션에서 `stdout` 및 `stderr` 출력 스트림 사용을 권장합니다. 이를 통해 로그 수집을 자동으로 구성할 수 있습니다. 자세한 내용은 [권장 구성](#recommended-configurations)을 참조하세요.

이러한 파일 경로는 Agent 컨테이너를 기준으로 한 **상대** 경로입니다. 따라서 Agent가 로그 파일을 볼 수 있도록 로그 파일이 저장된 디렉터리를 애플리케이션 컨테이너와 Agent 컨테이너 모두에 마운트해야 합니다.

예를 들어 공유 `hostPath` voume을 사용하여 이를 구성할 수 있습니다. 아래 포드 예제는 `/var/log/example/app.log` 파일에 로그를 기록합니다. 이는 `/var/log/example` 디렉터리에서 수행되며, volume과 volumeMount를 사용하여 해당 디렉터리를 공유 볼륨(`hostPath`)으로 구성합니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: logger
  annotations:
    ad.datadoghq.com/busybox.logs: |
      [{
          "type": "file",
          "path": "/var/log/example/app.log",
          "source": "example-source",
          "service": "example-service"
      }]
spec:
  containers:
   - name: busybox
     image: busybox
     command: [ "/bin/sh", "-c", "--" ]
     args: [ "while true; do sleep 1; echo `date` example file log >> /var/log/example/app.log; done;" ]
     volumeMounts:
     - name: applogs
       mountPath: /var/log/example
  volumes:
     - name: applogs
       hostPath:
         path: /var/log/example
```

동일한 로그 파일을 읽을 수 있도록 에이전트 컨테이너에 동일한 볼륨과 volumeMount 경로를 설정해야 합니다.

```yaml
  containers:
  - name: agent
    # (...)
    volumeMounts:
    - mountPath: /var/log/example
      name: applogs
    # (...)
  volumes:
  - name: applogs
    hostPath:
      path: /var/log/example
    # (...)
```
#### 권장 구성 {#recommended-configurations}
- 이 전략은 개별 포드에서는 사용할 수 있지만, 여러 애플리케이션이 동일한 방식을 사용하는 경우 관리가 복잡해질 수 있습니다. 또한 여러 복제본이 동일한 로그 경로를 사용하는 경우 문제가 발생할 수 있습니다. 가능하면 Datadog은 [Autodiscovery 템플릿 변수][17] `%%kube_pod_name%%`를 활용할 것을 권장합니다. 예를 들어 `path`를 다음 변수 참조 방식으로 설정할 수 있습니다. `"path": "/var/log/example/%%kube_pod_name%%/app.log"` 애플리케이션 포드 역시 이 새로운 경로를 기준으로 로그 파일을 기록하도록 구성해야 합니다. 애플리케이션이 자신의 포드 이름을 확인할 수 있도록 [Downward API][18]를 사용할 수 있습니다.

- 이와 같은 주석을 컨테이너에 사용하는 경우 `stdout` 및 `stderr` 로그는 자동으로 수집되지 않습니다. 컨테이너 출력 스트림과 파일 로그를 모두 수집해야 하는 경우 주석에서 이를 명시적으로 활성화해야 합니다. 예:
  ```yaml
  ad.datadoghq.com/<CONTAINER_IMAGE>.logs: |
    [
      {"type":"file","path":"/var/log/example/app.log","source":"file","service":"example-service"},
      {"source":"container","service":"example-service"}
    ]
  ```

- 이와 같은 조합을 사용하는 경우 파일에서 수집된 로그에는 `source` 및 `service`에 대한 기본값이 없으므로 주석에서 명시적으로 설정해야 합니다.

## 문제 해결 {#troubleshooting}

문제 해결 단계는 [컨테이너 로그 수집 문제 해결][21]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/faq/log-collection-with-docker-socket/
[2]: /ko/agent/kubernetes/
[3]: /ko/integrations/#cat-autodiscovery
[4]: /ko/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[5]: /ko/agent/logs/advanced_log_collection/?tab=kubernetes#filter-logs
[6]: /ko/agent/logs/advanced_log_collection/?tab=kubernetes#scrub-sensitive-data-from-your-logs
[7]: /ko/agent/logs/advanced_log_collection/?tab=kubernetes#multi-line-aggregation
[8]: /ko/agent/guide/autodiscovery-management/
[9]: /ko/containers/guide/kubernetes_daemonset/#log-collection
[10]: /ko/getting_started/containers/autodiscovery
[11]: /ko/logs/log_configuration/attributes_naming_convention/
[12]: /ko/getting_started/tagging/assigning_tags/#integration-inheritance
[13]: https://kubernetes.io/docs/concepts/cluster-administration/logging/#log-location-node
[14]: /ko/containers/kubernetes/tag
[15]: /ko/logs/log_configuration/pipelines/?tab=source#integration-pipelines
[16]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[17]: /ko/containers/guide/template_variables/
[18]: https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information/
[19]: /ko/containers/kubernetes/log/?tab=helm#autodiscovery-annotations
[20]: /ko/containers/kubernetes/log/?tab=helm#autodiscovery-configuration-files
[21]: /ko/containers/troubleshooting/log-collection/?tab=datadogoperator
[22]: /ko/containers/guide/ad_identifiers/