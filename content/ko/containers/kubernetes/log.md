---
aliases:
- /ko/agent/kubernetes/log
further_reading:
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
title: 쿠버네티스 로그 수집
---

에이전트는 [도커 소켓][1]과 [쿠버네티스 로그 파일](#log-collection)(쿠버네티스에서 자동 처리됨)에서 로그를 수집합니다. 쿠버네티스 로그 파일 로직을 권장하는 경우는:

* 도커가 런타임이 아닌 경우, **또는**
* 각 노드에서 10개 이상의 컨테이너가 사용되는 경우

도커 API는 한 번에 하나의 컨테이너에서 로그를 가져오도록 최적화되어 있습니다. 동일한 노드에 많은 컨테이너가 있는 경우, 쿠버네티스 로그 파일 로직 보다 도커 소켓을 통한 로그 수집이 훨씬 더 많은 리소스를 소비합니다.

## 로그 수집

애플리케이션 로그 수집을 시작하려면 [쿠버네티스 클러스터에서 Datadog 에이전트를 실행해야 합니다][2]. 에이전트로 로그 수집을 활성화하려면 아래 지침을 따르세요:

{{< tabs >}}
{{% tab "DaemonSet" %}}

**참고**: 이 옵션은 Windows에서는 지원되지 않습니다. 대신 Helm 옵션을 사용하세요.

데몬셋으로 로그 수집을 활성화하려면:

1. `datadog.yaml` 에이전트 매니페스트의 *env* 섹션에서 `DD_LOGS_ENABLED` 및 `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL` 변수를 true로 설정합니다:

    ```yaml
     # (...)
      env:
        # (...)
        - name: DD_LOGS_ENABLED
          value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
          value: "true"
        - name: DD_CONTAINER_EXCLUDE_LOGS
          value: "name:datadog-agent"
     # (...)
    ```

   **참고**:  `DD_CONTAINER_EXCLUDE_LOGS` 설정은 Datadog 에이전트가 자체 로그를 수집하고 전송하지 못하도록 합니다. Datadog 에이전트 로그를 수집하려면 이 매개 변수를 제거해야 합니다. 자세한 내용은 [컨테이너를 무시하기 위한 환경 변수][1]를 참조하세요. OpenShift 환경 내에서 ImageStream을 사용하는 경우, 로그 수집을 위해 `DD_CONTAINER_INCLUDE_LOGS`를 `name` 컨테이너와 함께 설정하세요. Exclude/Include 매개 변수 값은 모두 정규식을 지원합니다.

2. 재시작 또는 네트워크 문제 발생 시 컨테이너 로그의 손실을 방지하기 위해 `pointerdir` 볼륨을 마운트합니다. 또한, `/var/log/pods`는 이 디렉토리에 대한 심볼릭 링크이므로 `/var/lib/docker/containers`를 마운트하여 쿠버네티스 로그 파일을 통해 로그를 수집합니다:

    ```yaml
      # (...)
        volumeMounts:
          # (...)
          - name: pointerdir
            mountPath: /opt/datadog-agent/run
          - name: logpodpath
           mountPath: /var/log/pods
          # Docker runtime directory, replace this path
          # with your container runtime logs directory,
          # or remove this configuration if `/var/log/pods`
          # is not a symlink to any other directory.
          - name: logcontainerpath
           mountPath: /var/lib/docker/containers
      # (...)
      volumes:
        # (...)
        - hostPath:
            path: /opt/datadog-agent/run
          name: pointerdir
        - hostPath:
            path: /var/log/pods
          name: logpodpath
        # Docker runtime directory, replace this path
        # with your container runtime logs directory,
        # or remove this configuration if `/var/log/pods`
        # is not a symlink to any other directory.
        - hostPath:
            path: /var/lib/docker/containers
          name: logcontainerpath
        # (...)
    ```

   `pointerdir`는 에이전트가 로그를 수집하는 모든 컨테이너의 포인터가 있는 파일 저장에 사용됩니다. 이는 에이전트가 재시작되거나 네트워크 문제 발생 시 로그 손실을 방지합니다.

### 권한 없음

(선택 사항) 권한 없는 설치를 실행하려면 [포드 템플릿][2]에 다음을 추가합니다:

```yaml
  spec:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

`<USER_ID>`는 에이전트를 실행할 UID이며, `<DOCKER_GROUP_ID>`는 도커 또는 컨테이너화된 소켓을 소유한 그룹 ID입니다.

에이전트가 루트 사용자가 아닌 사용자로 실행되는 경우 `/var/lib/docker/containers` 에 포함된 로그 파일을 직접 읽을 수 없습니다. 이 경우 에이전트 컨테이너에 도커 소켓을 마운트하여 도커 데몬에서 컨테이너 로그를 가져와야 합니다.

[1]: /ko/agent/docker/?tab=standard#ignore-containers
{{% /tab %}}
{{% tab "Helm" %}}

Helm으로 로그 수집을 활성화하려면, 다음 로그 수집 설정으로 [datadog-values.yaml][1] 파일을 업데이트한 후Datadog Helm 차트를 업그레이드합니다:

```yaml
datadog:
  ## @param logs - object - required
  ## Enable logs agent and provide custom configs
  #
  logs:
    ## @param enabled - boolean - optional - default: false
    ## Enables this to activate Datadog Agent log collection.
    #
    enabled: true

    ## @param containerCollectAll - boolean - optional - default: false
    ## Enable this to allow log collection for all containers.
    #
    containerCollectAll: true
```

`datadog.logs.containerCollectAll`을 `true`로 설정하면 기본적으로 검색된 모든 컨테이너에서 로그를 수집할 수 있습니다. `false` (기본값)로 설정한 경우, 로그를 수집하려면 자동 탐지 로그 설정을 지정해야 합니다.

### 권한 없음

(선택 사항) 권한 없는 설치를 실행하려면 `values.yaml` 파일에 다음을 추가합니다:

```yaml
datadog:
  securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <DOCKER_GROUP_ID>
```

`<USER_ID>`는 에이전트를 실행할 UID이며, `<DOCKER_GROUP_ID>`는 도커 또는 컨테이너화된 소켓을 소유한 그룹 ID입니다.

[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Operator" %}}

`datadog-agent.yaml` 매니페스트를 다음과 같이 업데이트합니다:

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

[로그 및 메트릭 수집이 활성화된 매니페스트][1] 샘플에서 전체 예제를 확인하세요. `features.logCollection.containerCollectAll`를 `true`로 설정해 기본적으로 검색된 모든 컨테이너에서 로그를 수집할 수 있습니다. `false` (기본값)로 설정한 경우, 로그를 수집하려면 자동 탐지 로그 설정을 지정해야 합니다.

그런 다음 새로운 설정을 적용합니다:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

## 권한 없음

(선택 사항) 권한 없는 설치를 실행하려면 [DatadogAgent 커스텀 리소스][2]에 다음을 추가합니다:

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

`<USER_ID>`는 에이전트를 실행할 UID이며, `<DOCKER_GROUP_ID>`는 도커 또는 컨테이너화된 소켓을 소유한 그룹 ID입니다.

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/v2alpha1/datadog-agent-logs.yaml
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md#override
{{% /tab %}}
{{< /tabs >}}

**경고**: 권한 없는 설치를 실행할 때 에이전트가 `/var/log/pods`에 있는 로그 파일을 읽을 수 있어야 합니다.
`containerd`를 사용하면 `root` 그룹 구성원이 `/var/log/pods`에 있는 로그 파일을 읽을 수 있습니다. 위의 지침에 따라 `agent`가 여전히 `root` 그룹과 함께 실행 중이므로 작동합니다.
`docker`와 함께 `/var/log/pods`에 있는 로그 파일은 `/var/lib/docker/containers`에 대한 심볼릭 링크가 되며  `root` 사용자만 통과할 수 있습니다. 따라서, `docker` 사용 시 `root` 에이전트가 아니면 `/var/log/pods`에 있는 포드 로그를 읽을 수 없습니다. 에이전트가 도커 데몬을 통해 포드 로그를 가져올 수 있도록 도커 소켓을 에이전트 컨테이너에 마운트해야 합니다.

**참고**: 도커 소켓이 마운트되어 있더라도 `/var/log/pods`에서 로그를 수집하려면 `DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE` 환경 변수(또는 `datadog.yaml`에 있는 `logs_config.k8s_container_use_file`)를 `true`로 설정하여 에이전트가 파일 수집 모드를 사용하도록 합니다.

## 자동탐지

자동 탐지의 목표는 지정된 컨테이너에 대해 에이전트 검사를 실행할 때 Datadog 통합 로그 설정을 적용하는 것입니다. 이 로직에 대한 자세한 내용은 호스트에서 에이전트를 실행할 때의 [에이전트 통합 설정][1] 방법을 참조하세요.

자동 탐지와의 통합을 설정하려면 다음 매개 변수를 사용합니다:

| 파라미터            | 필수 | 설명                                                                                       |
|----------------------|----------|---------------------------------------------------------------------------------------------------|
| `<LOG_CONFIG>`       | 아니요       | Agent v6.5+인 경우, 지정된 Datadog-`<INTEGRATION_NAME>`에 대한 `logs:` 섹션 설정 |

[**자동 탐지가 가능한 에이전트 통합의 전체 목록을 해당 매개 변수의 예제와 함께 확인하세요**][3]

아래 섹션의 각 탭은 지정된 컨테이너에 통합 템플릿을 적용하는 다른 방법을 보여줍니다. 사용 가능한 방법은 다음과 같습니다:

* [쿠버네티스 포드 어노테이션](?tab=kubernetes#configuration)
* [ConfigMap](?tab=configmap#configuration)
* [키-값 저장소](?tab=keyvaluestore#configuration)
* [Helm](?tab=helm#configuration)

### 설정

**참고**: 포드 어노테이션을 통해 `service` 값 설정 시 Datadog은 통합 서비스 태깅을 모범 사례로 사용할 것을 권장합니다. 통합 서비스 태깅은 세 가지 표준 태그: `env`, `service`, `version`을 사용하여 로그를 포함한 모든 Datadog 텔레메트리를 하나로 묶습니다. 통합 태깅으로 환경을 설정하려면 전용 [통합 서비스 태깅][4] 설명서를 참조하세요.

{{< tabs >}}
{{% tab "쿠버네티스" %}}

통합 템플릿은 쿠버네티스 포드 어노테이션에 저장할 수 있습니다. 자동 탐지를 통해 에이전트가 쿠버네티스에서 실행 중인지 감지하고 모든 포드 어노테이션에서 통합 템플릿을 자동으로 검색합니다.

자동 탐지는 지정된 컨테이너에 특정한 설정을 적용하기 위해 이미지가 아닌 **이름**으로 컨테이너를 식별합니다.  `<CONTAINER_IDENTIFIER>`를 `.spec.containers[0].image`가 아닌 `.spec.containers[0].name`과 연결시키려고 시도합니다. 포드 내에서 `<CONTAINER_IDENTIFIER>`에 대한 Datadog 통합 자동 탐지를 설정하려면, 포드에 다음 어노테이션을 추가하세요:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: '[<LOG_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
# (...)
```

포드 내에서 두 개의 통합 템플릿을 두 개의 다른 컨테이너 `<CONTAINER_IDENTIFIER_1>`, `<CONTAINER_IDENTIFIER_2>`에 적용하려면, 다음 어노테이션을 포드에 추가하세요:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.logs: '[<LOG_CONFIG_1>]'
    # (...)
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_2>.logs: '[<LOG_CONFIG_2>]'
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER_1>'
    # (...)
    - name: '<CONTAINER_IDENTIFIER_2>'
# (...)
```

**참고**: `kind: Pod`로 쿠버네티스 포드를 직접 정의하는 경우, 각 포드의 어노테이션을 `metadata` 섹션 아래에 추가합니다. 레플리케이션 컨트롤러, 레플리카셋 또는 디플로이먼트를 사용하여 간접적으로 포드를 정의하는 경우, `.spec.template.metadata`아래에 포드 어노테이션을 추가합니다.

{{% /tab %}}
{{% tab "File" %}}

템플릿을 로컬 파일로 저장하고 컨테이너화된 에이전트 내부에 마운트할 경우 외부 서비스나 특정 오케스트레이션 플랫폼이 필요하지 않습니다. 단점은 템플릿을 변경, 추가 또는 제거할 때마다 에이전트 컨테이너를 재시작해야 한다는 것입니다. 에이전트는 마운트된 `/conf.d` 디렉토리에서 자동 탐지 템플릿을 찾습니다.

에이전트 v6.2.0(및 v5.24.0)부터 기본 템플릿은 자동 감지를 하는 대신 모니터링되는 소프트웨어의 기본 포트를 사용합니다. 다른 포트를 사용해야 하는 경우, 커스텀 자동 탐지 템플릿을 [Docker 컨테이너 라벨](?tab=docker-labels) 또는 [쿠버네티스 포드 어노테이션](?tab=kubernetes-annotations)에서 사용하세요.

이러한 통합 템플릿은 기본적인 경우를 위한 것입니다. 추가 옵션 활성화를 위해 사용자 지정 Datadog 통합 설정이 필요한 경우 다른 컨테이너 식별자 또는 템플릿 변수 인덱싱을 사용하거나 자체 자동 설정 파일을 작성하세요:

1. 호스트에 `conf.d/<INTEGRATION_NAME>.d/conf.yaml` 파일을 생성하고 사용자 지정 자동 설정을 추가합니다.
2. 호스트 `conf.d/` 폴더를 컨테이너화된 에이전트 `conf.d` 폴더에 마운트합니다.

**참고**: 이 기능은 도커 소켓을 통해 로그를 수집할 때만 지원되며, 쿠버네티스 로그 파일을 사용할 때는 지원되지 않습니다. 쿠버네티스 환경에서 도커 소켓을 로그 수집에 사용하려면 도커가 런타임이고 `DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE`이 `false`로 설정되어 있는지 확인하세요.

**자동 설정 파일 예시**:

```text
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

logs:
  <LOGS_CONFIG>
```

`<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`에 대한 자세한 내용은 [자동 탐지 컨테이너 식별자][1] 설명서를 참조하세요.

**참고**: 에이전트가 파일 이름에서 직접 유추하므로 `<INTEGRATIONS_NAME>`을 설정할 필요가 없습니다.

[1]: /ko/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "ConfigMap" %}}

쿠버네티스에서는 [ConfigMaps][1]을 사용할 수 있습니다. 아래 템플릿과 [쿠버네티스 커스텀 통합][2] 설명서를 참조하세요.

**참고**: 이 기능은 도커 소켓을 통해 로그를 수집할 때만 지원되며, 쿠버네티스 로그 파일을 사용할 때는 지원되지 않습니다. 쿠버네티스 환경에서 도커 소켓을 로그 수집에 사용하려면 도커가 런타임이고, `DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE`이 `false`로 설정되어 있는지 확인하세요.

```text
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<NAME>-config-map"
  namespace: default
data:
  <INTEGRATION_NAME>-config: |-
    ad_identifiers:
      <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
    logs:
      <LOGS_CONFIG>
```

`<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`에 대한 자세한 내용은 [자동 탐지 컨테이너 식별자][3] 설명서를 참조하세요.

[1]: /ko/agent/kubernetes/integrations/#configmap
[2]: /ko/agent/kubernetes/integrations/
[3]: /ko/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "Key-value store" %}}

자동 탐지는  [Consul][1], Etsd 및 Zookeper를 통합 템플릿 원본으로 사용할 수 있습니다. 키 값 저장소를 사용하려면 에이전트 설정 파일에서 키 값 저장소를 설정하고 이 파일을 컨테이너화된 에이전트 내부에 마운트합니다. 또는 키 값 저장소를 환경 변수로 컨테이너화된 에이전트에 전달합니다.

** datadog.yaml에서 설정하기**

`datadog.yaml` 파일에서 키-값 저장소의  `<KEY_VALUE_STORE_PORT>`와 `<KEY_VALUE_STORE_IP>` 주소를 설정합니다.

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

그런 다음 [에이전트 재시작][2]를 클릭해 설정 변경사항을 적용합니다.

**환경 변수 설정**:

키값 스토어가 템플릿 소스로 활성화되어 있는 경우 Agent는 키`/datadog/check_configs`에서 템플릿을 찾습니다. 자동탐지는 아래와 같은 키값 위계를 전제로 합니다.

```yaml
/datadog/
  check_configs/
    <CONTAINER_IDENTIFIER>/
      - logs: ["<LOGS_CONFIG>"]
    ...
```

**참고**: 지정된 컨테이너에 특정 설정을 적용하기 위해 자동 탐지는 키-값 저장소를 사용할 때 `<CONTAINER_IDENTIFIER>`와 `.spec.containers[0].image`를 맞춰봄으로써 **image**로 컨테이너를 식별합니다.

[1]: /ko/integrations/consul/
[2]: /ko/agent/guide/agent-commands/
{{% /tab %}}
{{% tab "Helm" %}}

`confd`내에서 사용자가 원하는 대로 통합 별 로그 수집을 설정할 수 있습니다. 원하는 설정을 에이전트 컨테이너에 마운트합니다.

**참고**: 이 기능은 도커 소켓을 통해 로그를 수집할 때만 지원되며, 쿠버네티스 로그 파일을 사용할 때는 지원되지 않습니다. 쿠버네티스 환경에서 도커 소켓을 로그 수집에 사용하려면 도커가 런타임이고 `DD_LOGS_CONFIG_K8S_CONTAINER_USE_FILE`이 `false`로 설정되어 있는지 확인하세요.

  ```yaml
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
      init_config:
      instances:
        (...)
      logs:
        <LOGS_CONFIG>
  ```

{{% /tab %}}
{{< /tabs >}}

### 예시 - Datadog Redis 통합 

{{< tabs >}}
{{% tab "쿠버네티스" %}}

다음 포드 어노테이션은 커스텀 `password` 매개 변수를 사용해 `redis` 컨테이너에 대한 통합 템플릿을 정의합니다. 또한, 올바른 `source` 및 `service` 속성으로 모든 로그에 커스텀 태그를 포함한 태그를 지정합니다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.logs: '[{"source": "redis","service": "redis","tags": ["env:prod"]}]'
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

{{% /tab %}}
{{% tab "ConfigMap" %}}

다음 ConfigMap은 로그 수집을 위해 `source` 및 `service` 속성으로 `redis` 컨테이너에 대한 통합 텝플릿을 정의합니다. 또한, 올바른 `source` 및 `service` 속성으로 모든 로그에 커스텀 태그를 포함한 태그를 지정합니다.

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: redisdb-config-map
  namespace: default
data:
  redisdb-config: |-
    ad_identifiers:
      - redis
      - redis-test
    logs:
      - source: redis
        service: redis
        tags:
          - env:prod
```

매니페스트에서 `volumeMounts`와 `volumes`를 정의합니다:

```yaml
# (...)
        volumeMounts:
        # (...)
          - name: redisdb-config-map
            mountPath: /conf.d/redisdb.d
        # (...)
      volumes:
      # (...)
        - name: redisdb-config-map
          configMap:
            name: redisdb-config-map
            items:
              - key: redisdb-config
                path: conf.yaml
# (...)
```

{{% /tab %}}
{{% tab "Key-value store" %}}

다음 etcd 명령은 커스텀 `password` 매개 변수로 Redis 통합 템플릿을 생성하고, 모든 로그에 올바른 `source` 및 `service` 속성을 가지고 태그를 지정합니다:

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/logs '[{"source": "redis", "service": "redis", "tags": 
["env:prod"]}]'
```

세 값은 각각 리스트입니다. 자동 탐지는 공유 목록 인덱스를 기반으로 목록에 있는 항목을 통합 설정으로 맞춥니다. 이 경우 `check_names[0]`, `init_configs[0]` 및 `instances[0]`에서 첫 번째(그리고 유일한) 검사 설정을 구성합니다.

auto-conf 파일과 달리 **키-값 저장소는 컨테이너 식별자로 짧거나 긴 이미지 이름을 사용할 수 있습니다.** (예: `redis` 또는 `redis:latest`)

{{% /tab %}}
{{% tab "Helm" %}}

다음 설정은 로그 수집을 위해 `source` 및 `service` 속성으로 Redis 컨테이너에 대한 통합 템플릿을 정의합니다:
  ```yaml
  confd:
    redis.yaml: |-
      ad_identifiers:
        - redis
      logs:
        - source: redis
          service: redis
          tags: env:prod
  ```

**참고**: 위의 설정은 이 통합에서 로그만 수집합니다. 이미 Redis 통합에서 다른 데이터를 수집하고 있는 경우, 기존 설정에 `logs` 섹션을 추가할 수 있습니다.

{{% /tab %}}
{{< /tabs >}}

### 예시 - 어노테이션에 설정된 파일에서 로그 수집

Datadog은 로그 수집을 자동 설정할 수 있도록 컨테이너화된 애플리케이션에 대해 `stdout` 및 `stderr` 출력 스트림을 사용할 것을 권장합니다. 그러나 에이전트는 어노테이션을 기반으로 파일에서 로그를 직접 수집할 수도 있습니다. 로그를 수집하려면 `type: file` 및 `path` 설정과 함께 `ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs`를 사용하세요. 이러한 어노테이션을 가진 파일에서 수집된 로그에는 컨테이너에서 온 로그와 동일한 태그 세트로 태그가 지정됩니다.

이러한 파일 경로는 에이전트와 **관련**이 있습니다. 따라서 로그 파일을 포함하는 디렉토리가 애플리케이션과 에이전트 컨테이너 모두에 마운트되어야 에이전트가 적절한 가시성을 확보할 수 있습니다.

예를 들어, 공유된 `hostPath` 볼륨으로 이 작업을 수행할 수 있습니다. 아래 포드는 로그를 `/var/log/example/app.log` 파일로 내보냅니다. 이는 볼륨과 volumeMount가`hostPath`로 설정한`/var/log/example` 디렉토리에서 진행됩니다.

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

**참고: 컨테이너에 이러한 종류의 어노테이션을 사용하는 경우 컨테이너에서 `stdout` 및 `stderr` 로그가 자동으로 수집되지 않습니다. 컨테이너와 파일 모두에서 수집해야 하는 경우 어노테이션에서 활성화해야 합니다. 예를 들면 다음과 같습니다:

```yaml
ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: |
  [
    {"type":"file","path":"/var/log/example/app.log","source":"file","service":"example-service"},
    {"source":"container","service":"example-service"}
  ]
```

이러한 종류의 조합을 사용하는 경우 `source` 및 `service`는 파일에서 수집된 로그에 대한 기본값이 없으며, 이는 어노테이션에서 설정되어야 합니다.

## 고급 로그 수집

자동 탐지 로그 라벨을 사용하여 다음과 같은 고급 로그 수집 처리 로직를 적용합니다:

* [로그를 Datadog으로 보내기 전에 필터링합니다][5].
* [로그에서 민감한 데이터 삭제합니다][6].
* [복수행 집계를 진행합니다][7].

## 컨테이너 필터링

어떤 컨테이너에서 로그를 수집할지 설정할 수 있으며, 이는 Datadog 에이전트 로그 수집을 방지하는 데 유용합니다. 자세한 내용은 [컨테이너 검색 관리][8]를 참조하세요.

## 수명이 짧은 컨테이너

기본적으로 에이전트는 5초마다 새 컨테이너를 찾습니다.

에이전트 v6.12+의 경우, `/var/log/pods`를 통해 K8s 파일 로그 수집을 사용할 때 수명이 짧은 컨테이너 로그(중지 됨 또는 충돌함)가 자동으로 수집됩니다. 여기에는 초기화 컨테이너 로그 수집도 포함됩니다.

## 문제 해결

쿠버네티스 로그에 태그가 누락된다면 로그가 전송될 때 에이전트 내부 태거에 관련 컨테이너 또는 포드 태그가 없기 때문일 수 있습니다. 태거가 준비될 때까지 로그 에이전트가 몇 초 동안 기다리도록 하려면 `DD_LOGS_CONFIG_TAGGER_WARMUP_DURATION` 환경 변수를 사용하여 대기 시간을 설정할 수 있습니다. 기본값은 0입니다.

```yaml
# The number of seconds the Log Agent waits for the internal tagger to add the related container or pod tags to the logs before the logs are sent.
# For example, in order to set the Log Agent to wait five seconds, use an integer in the value:
tagger_warmup_duration: 5
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/faq/log-collection-with-docker-socket/
[2]: /ko/agent/kubernetes/
[3]: /ko/integrations/#cat-autodiscovery
[4]: /ko/getting_started/tagging/unified_service_tagging
[5]: /ko/agent/logs/advanced_log_collection/?tab=kubernetes#filter-logs
[6]: /ko/agent/logs/advanced_log_collection/?tab=kubernetes#scrub-sensitive-data-from-your-logs
[7]: /ko/agent/logs/advanced_log_collection/?tab=kubernetes#multi-line-aggregation
[8]: /ko/agent/guide/autodiscovery-management/