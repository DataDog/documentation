---
aliases:
- /ko/agent/autodiscovery/integrations
- /ko/guides/servicediscovery/
- /ko/guides/autodiscovery/
- /ko/agent/kubernetes/integrations
further_reading:
- link: /agent/kubernetes/log/
  tag: 설명서
  text: 애플리케이션 로그 수집
- link: /agent/kubernetes/apm/
  tag: 설명서
  text: 애플리케이션 트레이스 수집
- link: /agent/kubernetes/prometheus/
  tag: 설명서
  text: Prometheus 메트릭 수집
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
- link: /agent/kubernetes/tag/
  tag: 설명서
  text: 컨테이너에서 내보내는 모든 데이터에 태그 할당
title: 쿠버네티스 통합 자동 탐지
---

<div class="alert alert-info">
<a href="/getting_started/agent/autodiscovery">이 기능에 대해 자세히 알아보려면 자동 탐지 시작하기 설명서를 참조하세요.</a>.
</div>

이 페이지는 쿠버네티스로 통합 자동 탐지를 설정하는 방법을 다룹니다. 도커 또는 Amazon ECS를 사용하는 경우, [Docker 통합 자동 탐지 설명서][1]를 참조하세요. 자동 탐지의 목표는 지정된 컨테이너에 대해 에이전트 검사를 실행할 때 Datadog 통합 설정을 적용하는 것입니다. 로직에 대해 더 자세히 알아보려면 호스트에서 에이전트를 실행할 때 사용 되는 [에이전트 통합 설정][2] 방법을 참조하세요.

비밀번호처럼 일반 텍스트로 저장되지 않아야 하는 설정값이 있는 경우 [비밀 정보 관리][3]를 참조하세요.

자동 탐지와의 통합을 설정하려면 다음 매개 변수를 사용합니다:

| 매개 변수            | 필수 | 설명                                                                                       |
|----------------------|----------|---------------------------------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | 예      | Datadog 통합 이름                                                                   |
| `<INIT_CONFIG>`      | 예      | `conf.yaml`의 `init_config:` 아래에 나열된 설정 매개 변수는 사용되는 모든 통합에 필요합니다.         |
| `<INSTANCE_CONFIG>`  | 예      | `<INIT_CONFIG>`의 일부이자 `conf.yaml`의 `instances:` 아래에 나열된 설정 매개 변수는 사용되는 모든 통합에 필요합니다.         |
| `<LOG_CONFIG>`  | 예      | `<INIT_CONFIG>`의 일부이자 `conf.yaml`의 `logs:` 아래에 나열된 설정 매개 변수는 Datadog으로 전송할 로그를 정의합니다.        |

아래 섹션의 각 탭은 지정된 컨테이너에 통합 템플릿을 적용하는 다른 방법을 보여줍니다. 사용 가능한 방법은 다음과 같습니다:

* [쿠버네티스 포드 어노테이션](?tab=kubernetes#configuration)
* [ConfigMap](?tab=configmap#configuration)
* [키-값 저장소](?tab=keyvaluestore#configuration)
* [Helm 차트](?tab=helm#configuration)

**참고**: 지원되는 통합 일부는 프로세스 트리 데이터 또는 파일 시스템 액세스: [Ceph][5], [Varnish][6], [Postfix][7], [Cassandra Nodetools][8], [Gunicorn][9]가 필요하기 때문에 표준 자동 탐지에서 작동하지 않습니다.
표준 자동 탐지와 호환되지 않는 통합을 설정하려면, 포드에서 공식 Prometheus 내보내기 도구를 사용한 다음 에이전트에서 자동 탐지와 OpenMetrics 검사로 포드를 찾고 엔드포인트를 쿼리할 수 있습니다. 예를 들어, 쿠버네티스의 표준 패턴은 노드 레벨 또는 클러스터 레벨 컬렉터가 있는 사이드카 어댑터입니다. 이 설정을 사용하면 내보내기 도구가  HTTP 엔드포인트를 사용해 데이터에 접근 및 노출할 수 있으며, Datadog 자동 탐지 OpenMetrics 검사가 데이터에 액세스할 수 있습니다.

## 설정

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**참고: 통합 설정 간소화를 위해 Datadog 에이전트 7.36에 AD Annotations v2가 도입되었습니다. 이전 버전의 Datadog 에이전트에 대해서는 AD Annotations v1을 사용하세요.

통합 템플릿은 쿠버네티스 포드 어노테이션에 저장할 수 있습니다. 자동 탐지를 통해 에이전트가 쿠버네티스에서 실행 중인지 감지하고 모든 포드 어노테이션에서 통합 템플릿을 자동으로 검색합니다.

자동 탐지는 지정된 컨테이너에 특정한 설정을 적용하기 위해 이미지가 아닌 **이름**으로 컨테이너를 식별합니다.  `<CONTAINER_IDENTIFIER>`를 `.spec.containers[0].image`가 아닌 `.spec.containers[0].name`과 연결시키려고 시도합니다. 포드 내에서 `<CONTAINER_IDENTIFIER>`에 대한 Datadog 통합 자동 탐지를 설정하려면, 포드에 다음 어노테이션을 추가하세요:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.checks: |
      {
        "<INTEGRATION_NAME>": {
          "init_config": <INIT_CONFIG>,
          "instances": [<INSTANCE_CONFIG>]
        }
      }
    # (...)
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
# (...)
```

일반적으로 `init_config`는 비어 있는 `{}`입니다. AD Annotations v2에서는 선택 사항입니다.

포드 내에서 두 개의 다른 통합 템플릿을 두 개의 다른 컨테이너 `<CONTAINER_IDENTIFIER_1>`, `<CONTAINER_IDENTIFIER_2>`에 적용하려면, 다음 어노테이션을 포드에 추가하세요:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.checks: |
      {
        "<INTEGRATION_NAME_1>": {
          "init_config": <INIT_CONFIG_1>,
          "instances": [<INSTANCE_CONFIG_1>]
        }
      }
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_2>.checks: |
      {
        "<INTEGRATION_NAME_2>": {
          "init_config": <INIT_CONFIG_2>,
          "instances": [<INSTANCE_CONFIG_2>]
        }
      }
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER_1>'
    # (...)
    - name: '<CONTAINER_IDENTIFIER_2>'
# (...)
```

`kind: Pod`로 쿠버네티스 포드를 직접 정의하는 경우, 각 포드의 어노테이션을 해당 `metadata` 섹션 바로 아래에 추가합니다. 레플리케이션 컨트롤러, 레플리카셋 또는 디플로이먼트를 사용하여 간접적으로 포드를 정의하는 경우, `.spec.template.metadata` 아래에 포드 어노테이션을 추가합니다.

**참고:** 컨테이너화된 환경의 모범 사례로서, Datadog은 태그를 할당할 때 통합 서비스 태깅을 사용할 것을 권장합니다. 통합 서비스 태깅은 세 가지 표준 태그: `env`, `service`, `version`을 사용하여 Datadog 텔레메트리를 하나로 묶습니다. 통합 태깅으로 환경 설정하는 방법을 알아보려면 전용 [통합 서비스 태깅][1] 설명서를 참조하세요.



[1]: /ko/getting_started/tagging/unified_service_tagging
{{< /tabs >}}

{{% tab "Kubernetes (AD v1)" %}}

통합 템플릿은 쿠버네티스 포드 어노테이션에 저장할 수 있습니다. 자동 탐지를 통해 에이전트가 쿠버네티스에서 실행 중인지 감지하고 모든 포드 어노테이션에서 통합 템플릿을 자동으로 검색합니다.

자동 탐지는 지정된 컨테이너에 특정한 설정을 적용하기 위해 이미지가 아닌 **이름**으로 컨테이너를 식별합니다.  `<CONTAINER_IDENTIFIER>`를 `.spec.containers[0].image`가 아닌 `.spec.containers[0].name`과 연결시키려고 시도합니다. 포드 내에서 `<CONTAINER_IDENTIFIER>`에 대한 Datadog 통합 자동 탐지를 설정하려면, 포드에 다음 어노테이션을 추가하세요:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: '[<INTEGRATION_NAME>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: '[<INIT_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: '[<INSTANCE_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
# (...)
```

포드 내에서 두 개의 다른 통합 템플릿을 두 개의 다른 컨테이너 `<CONTAINER_IDENTIFIER_1>`, `<CONTAINER_IDENTIFIER_2>`에 적용하려면, 다음 어노테이션을 포드에 추가하세요:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.check_names: '[<INTEGRATION_NAME_1>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.init_configs: '[<INIT_CONFIG_1>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_1>.instances: '[<INSTANCE_CONFIG_1>]'
    # (...)
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_2>.check_names: '[<INTEGRATION_NAME_2>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_2>.init_configs: '[<INIT_CONFIG_2>]'
    ad.datadoghq.com/<CONTAINER_IDENTIFIER_2>.instances: '[<INSTANCE_CONFIG_2>]'
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER_1>'
    # (...)
    - name: '<CONTAINER_IDENTIFIER_2>'
# (...)
```

`kind: Pod`로 쿠버네티스 포드를 직접 정의하는 경우, 각 포드의 어노테이션을 해당 `metadata` 섹션 바로 아래에 추가합니다. 레플리케이션 컨트롤러, 레플리카셋 또는 디플로이먼트를 사용하여 간접적으로 포드를 정의하는 경우, `.spec.template.metadata` 아래에 포드 어노테이션을 추가합니다.

**참고:** 컨테이너화된 환경의 모범 사례로서, Datadog은 태그를 할당할 때 통합 서비스 태깅을 사용할 것을 권장합니다. 통합 서비스 태깅은 세 가지 표준 태그: `env`, `service`, `version`을 사용하여 Datadog 텔레메트리를 하나로 묶습니다. 통합 태깅으로 환경 설정하는 방법을 알아보려면 전용 [통합 서비스 태깅][1] 설명서를 참조하세요.


[1]: /ko/getting_started/tagging/unified_service_tagging
{{% /tab %}}
{{% tab "File" %}}

템플릿을 로컬 파일로 저장하고 컨테이너화된 에이전트 내부에 마운트 할 경우 외부 서비스나 특정 오케스트레이션 플랫폼이 필요하지 않습니다. 단점은 템플릿을 변경, 추가 또는 제거할 때마다 에이전트 컨테이너를 재시작해야 한다는 것입니다. 에이전트는 마운트 된 `/conf.d` 디렉토리에서 자동 탐지 템플릿을 찾습니다.

에이전트 v6.2.0(및 v5.24.0) 이후, 기본 템플릿은 포트를 자동 감지하는 대신 모니터링되는 소프트웨어의 기본 포트를 사용합니다. 다른 포트를 사용해야 하는 경우, [쿠버네티스 포드 어노테이션](?tab=kubernetes-annotations)에서 커스텀 자동 탐지 템플릿을 제공하세요.

이러한 통합 템플릿은 기본적인 경우를 위한 것입니다. 추가 옵션 활성화를 위해 사용자 지정 Datadog 통합 설정이 필요하다면 다른 컨테이너 식별자 또는 템플릿 변수 인덱싱을 사용하거나 자체 자동 설정 파일을 작성하세요:

1. 호스트에 `conf.d/<INTEGRATION_NAME>.d/conf.yaml` 파일을 생성하고 사용자 지정 자동 설정을 추가합니다.
2. 호스트 `conf.d/` 폴더를 컨테이너화된 에이전트 `conf.d` 폴더에 마운트합니다.

**자동 설정 파일 예시**:

```text
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

`<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`에 대한 자세한 내용은 [자동 탐지 컨테이너 식별자][1] 설명서를 참조하세요.

**참고**: 에이전트가 파일 이름에서 직접 유추하므로 `<INTEGRATIONS_NAME>`을 설정할 필요가 없습니다.

[1]: /ko/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "ConfigMap" %}}

쿠버네티스에서는 [ConfigMaps][1]을 사용하여 외부에서 설정을 정의한 후 매니페스트를 사용하여 마운트할 수 있습니다. 아래 템플릿과 [쿠버네티스 커스텀 통합][2] 설명서를 참조하세요.

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
    init_config:
      <INIT_CONFIG>
    instances:
      <INSTANCES_CONFIG>
```

`<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`에 대한 자세한 내용은 [자동 탐지 컨테이너 식별자][3] 설명서를 참조하세요.

[1]: /ko/agent/kubernetes/integrations/#configmap
[2]: /ko/agent/kubernetes/integrations/
[3]: /ko/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "Key-value store" %}}

자동 탐지는  [Consul][1], Etcd 및 Zookeeper를 통합 템플릿 소스로 사용할 수 있습니다. 키-값 저장소를 사용하려면 에이전트 `datadog.yaml` 설정 파일에서 키-값 저장소를 설정하고, 이 파일을 컨테이너화된 에이전트 내부에 마운트합니다. 또는 컨테이너화된 에이전트에 키-값 저장소를 환경 변수로 전달합니다. 

** datadog.yaml에서 설정하기**

`datadog.yaml` 파일에서 `<KEY_VALUE_STORE_IP>` 주소와 키-값 저장소의 `<KEY_VALUE_STORE_PORT>`를 설정합니다.

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

그런 다음 [에이전트를 재시작][2]하여 설정 변경사항을 적용합니다.

**환경 변수 설정**:

**참고: 컨테이너화된 환경의 모범 사례로서, Datadog은 태그 및 환경 변수를 설정할 때 통합 서비스 태깅을 사용할 것을 권장합니다. 통합 서비스 태깅은 세 가지 표준 태그: `env`, `service`, `version`을 사용하여 Datadog 텔레메트리를 하나로 묶습니다. 통합 태깅으로 환경 설정하는 방법을 알아보려면 전용 [통합 서비스 태깅][9] 설명서를 참조하세요.

키-값 저장소가 템플릿 소스로 활성화되어 있는 경우 에이전트는 키`/datadog/check_configs`에서 템플릿을 찾습니다. 자동 탐지에서는 다음과 같은 키-값 위계가 필요합니다:

```yaml
/datadog/
  check_configs/
    <CONTAINER_IDENTIFIER>/
      - check_names: ["<INTEGRATION_NAME>"]
      - init_configs: ["<INIT_CONFIG>"]
      - instances: ["<INSTANCE_CONFIG>"]
    ...
```

**참고**: 자동 탐지는 지정된 컨테이너에 특정 설정을 적용하기 위해 키-값 저장소 사용 시 `<CONTAINER_IDENTIFIER>`와 `.spec.containers[0].image`를 조합하여 **image**로 컨테이너를 식별합니다.

[1]: /ko/integrations/consul/
[2]: /ko/agent/guide/agent-commands/
{{% /tab %}}
{{% tab "Helm" %}}

`values.yaml` 파일에는 정적 및 자동 탐지 통합 검사를 모두 정의하는 `confd` 섹션이 포함되어 있습니다. 샘플 [values.yaml][1]에서 인라인 예제를 찾을 수 있습니다. 각 키는 에이전트의 `conf.d`디렉토리에서 파일이 됩니다.

```yaml
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
      init_config:
        - <INIT_CONFIG>
      instances:
        - <INSTANCES_CONFIG>
```
`<INTEGRATION_AUTODISCOVERY_IDENTIFIER>`에 대한 자세한 정보는 [자동 탐지 컨테이너 식별자][2]를 참조하세요

**참고**: Helm 차트에는 에이전트 검사와 클러스터 검사를 위한 두 개의 `confd` 섹션이 있습니다. 클러스터 에이전트를 사용하고 클러스터 검사를 위해 자동 탐지를 설정하려는 경우 [클러스터 검사 설정 예제][3]를 따르고, 반드시 `cluster_check: true`를 포함해야 합니다. 자세한 내용은 [클러스터 검사][4]를 참조하세요.

[1]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L315-L330
[2]: /ko/agent/guide/ad_identifiers/
[3]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L680-L689
[4]: /ko/agent/cluster_agent/clusterchecks
{{% /tab %}}
{{< /tabs >}}

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

## 예시

### Datadog Redis 통합 

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**참고: 통합 설정 간소화를 위해 Datadog 에이전트 7.36에 AD Annotations v2가 도입되었습니다. 이전 버전의 Datadog 에이전트에 대해서는 AD Annotations v1을 사용하세요.

다음 포드 어노테이션은 커스텀 `password` 매개 변수로 `redis` 컨테이너에 대한 통합 템플릿을 정의합니다:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.checks: |
      {
        "redisdb": {
          "instances": [
            {
              "host": "%%host%%",
              "port":"6379",
              "password":"%%env_REDIS_PASSWORD%%"
            }
          ]
        }
      }
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

**참고**: `"%%env_<ENV_VAR>%%"` 템플릿 변수 로직은 암호를 일반 텍스트로 저장하지 않기 위해 사용되므로 `REDIS_PASSWORD`환경 변수가 에이전트에게 전달되어야 합니다. [자동 탐지 템플릿 변수 설명서][1]를 참조하세요.

[1]: /ko/agent/faq/template_variables/
{{< /tabs >}}

{{% tab "Kubernetes (AD v1)" %}}

다음 포드 어노테이션은 커스텀 `password` 매개 변수로 `redis` 컨테이너에 대한 통합 템플릿을 정의합니다:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.check_names: '["redisdb"]'
    ad.datadoghq.com/redis.init_configs: '[{}]'
    ad.datadoghq.com/redis.instances: |
      [
        {
          "host": "%%host%%",
          "port":"6379",
          "password":"%%env_REDIS_PASSWORD%%"
        }
      ]
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

**참고**: `"%%env_<ENV_VAR>%%"` 템플릿 변수 로직은 암호를 일반 텍스트로 저장하지 않기 위해 사용되므로 `REDIS_PASSWORD`환경 변수가 에이전트에게 전달되어야 합니다. [자동 탐지 템플릿 변수 설명서][1]를 참조하세요.

[1]: /ko/agent/faq/template_variables/
{{% /tab %}}
{{% tab "ConfigMap" %}}

다음 ConfigMap은 `redis` 컨테이너에 대한 통합 템플릿을 정의합니다:

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: redis-config-map
  namespace: default
data:
  redisdb-config: |-
    ad_identifiers:
      - redis
      - redis-test
    init_config:
    instances:
      - host: "%%host%%"
        port: "6379"
```

매니페스트에서 `volumeMounts`와 `volumes`를 정의합니다:

```yaml
# [...]
        volumeMounts:
        # [...]
          - name: redisdb-config-map
            mountPath: /conf.d/redisdb.d
        # [...]
      volumes:
      # [...]
        - name: redisdb-config-map
          configMap:
            name: redisdb-config-map
            items:
              - key: redisdb-config
                path: conf.yaml
# [...]
```

{{% /tab %}}
{{% tab "Key-value store" %}}

다음 etcd 명령은 사용자 지정 `password` 매개 변수를 사용하여 Redis 통합 템플릿을 생성합니다.

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

세 값은 각각의 목록입니다. 자동 탐지는 공유 목록 인덱스를 기반으로 목록의 항목들을 통합 설정에 맞춥니다. 이 경우 `check_names[0]`, `init_configs[0]` 및 `instances[0]`에서 첫 번째(그리고 유일한) 검사 설정을 구성합니다.

**참고**: `"%%env_<ENV_VAR>%%"` 템플릿 변수 로직은 암호를 일반 텍스트로 저장하지 않기 위해 사용되므로 `REDIS_PASSWORD`환경 변수가 에이전트에게 전달되어야 합니다. [자동 탐지 템플릿 변수 설명서][1]를 참조하세요.

auto-conf 파일과 달리 **키-값 저장소는 컨테이너 식별자로 짧거나 긴 이미지 이름을 사용할 수 있습니다.** (예: `redis` 또는 `redis:latest`)

[1]: /ko/agent/faq/template_variables/
{{% /tab %}}
{{% tab "Helm" %}}

다음 설정은 커스텀 암호 매개 변수로 Redis 컨테이너에 대한 통합 템플릿을 정의합니다:
```yaml
  confd:
    redisdb.yaml: |-
      ad_identifiers:
        - redis
      init_config:
      instances:
        - host: %%host%%
          port: 6379
          password: %%env_REDIS_PASSWORD%%
```
결과적으로 에이전트는 위와 같은 설정의 `redis.yaml` 파일을 `/confd` 디렉토리에 포함합니다.
**참고**: `"%%env_<ENV_VAR>%%"` 템플릿 변수 로직은 비밀번호를 일반 텍스트로 저장하지 않기 위해 사용됩니다. 따라서 에이전트에 `REDIS_PASSWORD` 환경 변수를 전달해야 합니다. [자동 탐지 템플릿 변수 설명서][1]를 참조하세요.

[1]: /ko/agent/faq/template_variables/
{{% /tab %}}
{{< /tabs >}}

### Datadog Apache 및 HTTP 검사 통합

아래 설정은 `<CONTAINER_IDENTIFIER>`: `apache`를 사용해 Apache 컨테이너 이미지에 적용됩니다. 자동 탐지 템플릿은 Apache 컨테이너에서 메트릭을 수집하고 두 개의 엔드포인트 테스트용 인스턴스로 Datadog-HTTP 검사를 설정하도록 구성됩니다.

검사 이름은`apache`, `http_check`, `<INIT_CONFIG>`, `<INSTANCE_CONFIG>`입니다. 전체 설정은 해당 설명서 페이지에서 확인할 수 있습니다: [Datadog-Apache 통합][10], [Datadog-HTTP 검사 통합][11].

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**참고: 통합 설정 간소화를 위해 Datadog 에이전트 7.36에 AD Annotations v2가 도입되었습니다. 이전 버전의 Datadog 에이전트에 대해서는 AD Annotations v1을 사용하세요.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.checks: |
      {
        "apache": {
          "instances": [
            {
              "apache_status_url": "http://%%host%%/server-status?auto"
            }
          ]
        },
        "http_check": {
          "instances": [
            {
              "name": "<WEBSITE_1>",
              "url": "http://%%host%%/website_1",
              "timeout": 1
            },
            {
              "name": "<WEBSITE_2>",
              "url": "http://%%host%%/website_2",
              "timeout": 1
            }
          ]
        }
      }
  labels:
    name: apache
spec:
  containers:
    - name: apache
      image: httpd
      ports:
        - containerPort: 80
```

{{< /tabs >}}

{{% tab "Kubernetes (AD v1)" %}}

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache
  annotations:
    ad.datadoghq.com/apache.check_names: '["apache","http_check"]'
    ad.datadoghq.com/apache.init_configs: '[{},{}]'
    ad.datadoghq.com/apache.instances: |
      [
        [
          {
            "apache_status_url": "http://%%host%%/server-status?auto"
          }
        ],
        [
          {
            "name": "<WEBSITE_1>",
            "url": "http://%%host%%/website_1",
            "timeout": 1
          },
          {
            "name": "<WEBSITE_2>",
            "url": "http://%%host%%/website_2",
            "timeout": 1
          }
        ]
      ]
  labels:
    name: apache
spec:
  containers:
    - name: apache
      image: httpd
      ports:
        - containerPort: 80
```

{{% /tab %}}
{{% tab "File" %}}

* 호스트에서 `conf.d/`와 `conf.d/apache.d` 폴더를 생성하세요.
* 호스트에서 아래의 사용자 지정 자동 설정을 `conf.d/apache.d/conf.yaml`에 추가합니다.

```yaml
ad_identifiers:
  - httpd

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
```

**참고**: 이는 최소한의 [Apache 검사 설정][1]처럼 보이지만 `ad_identifiers` 옵션에 주목할 필요가 있습니다. 이 필수 옵션을 사용하여 컨테이너 식별자를 제공할 수 있습니다. 자동 탐지는 `httpd` 이미지를 실행하는 동일한 호스트의 모든 컨테이너에 이 템플릿을 적용합니다. 자세한 내용은 [자동 탐지 식별자][2] 설명서를 참조하세요.

* 다음으로 호스트에서 `conf.d/http_check.d` 폴더를 생성하세요.
* 호스트에서 아래의 사용자 지정 자동 설정을 `conf.d/http_check.d/conf.yaml`에 추가합니다.

```yaml
ad_identifiers:
  - httpd

init_config:

instances:
  - name: "<WEBSITE_1>"
    url: "http://%%host%%/website_1"
    timeout: 1

  - name: "<WEBSITE_2>"
    url: "http://%%host%%/website_2"
    timeout: 1
```

* 마지막으로 호스트 `conf.d/` 폴더를 컨테이너화된 에이전트 `conf.d/` 폴더에 마운트합니다.

[1]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[2]: /ko/agent/guide/ad_identifiers/
{{% /tab %}}
{{% tab "ConfigMap" %}}

다음 ConfigMap은 `apache` 및 `http_check` 컨테이너에 대한 통합 템플릿을 정의합니다:

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: httpd-config-map
  namespace: default
data:
  apache-config: |-
    ad_identifiers:
      - httpd
    init_config:
    instances:
      - apache_status_url: http://%%host%%/server-status?auto
  http-check-config: |-
    ad_identifiers:
      - httpd
    init_config:
    instances:
      - name: "<WEBSITE_1>"
        url: "http://%%host%%/website_1"
        timeout: 1
      - name: "<WEBSITE_2>"
        url: "http://%%host%%/website_2"
        timeout: 1
```

매니페스트에서 `volumeMounts`와 `volumes`를 정의합니다:

```yaml
# [...]
        volumeMounts:
        # [...]
          - name: apache-auto-config
            mountPath: /conf.d/apache.d/
          - name: http-auto-config
            mountPath: /conf.d/http_check.d/
        # [...]
      volumes:
      # [...]
        - name: apache-auto-config
          configMap:
            name: httpd-config-map
            items:
              - key: apache-config
                path: auto_conf.yaml
        - name: http-auto-config
          configMap:
            name: httpd-config-map
            items:
              - key: http-check-config
                path: auto_conf.yaml
# [...]
```

{{% /tab %}}
{{% tab "Key-value store" %}}

```conf
etcdctl set /datadog/check_configs/httpd/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/httpd/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/httpd/instances '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name": "<WEBSITE_1>", "url": "http://%%host%%/website_1", timeout: 1},{"name": "<WEBSITE_2>", "url": "http://%%host%%/website_2", timeout: 1}]]'
```

**참고**: 각 목록의 순서가 중요합니다. 에이전트는 설정의 모든 부분이 세 목록에 걸쳐 동일한 인덱스를 갖는 경우에만 HTTP 검사 설정을 올바르게 생성할 수 있습니다.

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/docker/integrations/
[2]: /ko/getting_started/integrations/#configuring-agent-integrations
[3]: /ko/agent/guide/secrets-management/
[5]: /ko/integrations/ceph/
[6]: /ko/integrations/varnish/#autodiscovery
[7]: /ko/integrations/postfix/
[8]: /ko/integrations/cassandra/#agent-check-cassandra-nodetool
[9]: /ko/integrations/gunicorn/
[10]: /ko/integrations/apache/#setup
[11]: /ko/integrations/http_check/#setup