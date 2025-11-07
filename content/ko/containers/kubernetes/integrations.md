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
title: Kubernetes와 통합
---

이 페이지에서는 Datadog의 _Autodiscovery_ 기능으로 Kubernetes 인프라에 통합을 설치하고 구성하는 방법을 다룹니다. 이 기능으로 `%%host%%`와 같은 [변수][16]를 사용해 구성 설정을 동적으로 채울 수 있습니다. 자세한 Autodiscovery 사용 방법은 [컨테이너 시작하기: Autodiscovery][12]를 참고하세요. Autodiscovery에서 특정 컨테이너 제외, 준비되지 않은 포드 허용 등 Autodiscovery의 고급 옵션은 [Container Discovery Management][23]를 참고하세요.

Docker나 Amazon ECS를 사용 중이라면 [Docker와 통합][1]을 참고하세요.

<div class="alert alert-info">
일부 Datadog 통합은 프로세스 트리 데이터 또는 파일 시스템 액세스가 필요하기 때문에 Autodiscovery과 호환되지 않습니다: <a href="/integrations/ceph">Ceph</a>, <a href="/integrations/varnish">Varnish</a>, <a href="/integrations/postfix">Postfix</a>, <a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a>, <a href="/integrations/gunicorn">Gunicorn</a>.<br/><br/>
Autodiscovery와 호환되지 않는 통합을 모니터링하려면 포드에서 Prometheus 내보내기를 사용하여 HTTP 엔드포인트를 노출할 수 있습니다. 그런 다음 Autodiscovery가 지원하는 <a href="/integrations/openmetrics/">OpenMetrics 통합</a>을 사용해 포드를 찾고 엔드포인트를 쿼리합니다. 
</div>

## 통합 설정

일부 통합에는 액세스 토큰 생성이나 Datadog Agent에 대한 읽기 권한 부여와 같은 설정 단계가 필요합니다. 통합 문서에 있는 **Setup** 섹션을 참고하세요.

### 커뮤니티 통합
Datadog Agent와 함께 제공되지 않는 통합을 사용하려면 원하는 통합을 포함하는 커스텀 이미지를 빌드해야 합니다. 자세한 내용은 [커뮤니티 통합 사용][13]을 참고하세요.

## 구성

일반적으로 사용되는 일부 통합에는 Autodiscovery에 대한 기본 구성이 포함되어 있습니다. 자동 구성된 통합 및 해당 기본 구성 파일 목록을 포함한 자세한 내용은 [Autodiscovery 자동 구성][20]을 참고하세요. 통합이 목록에 있고 기본 구성으로 충분하다면 별다른 작업은 필요 없습니다.

다른 구성이 필요할 경우:

1. 원하는 구성 방법(Kubernetes 포드 주석, 로컬 파일, ConfigMap, 키-값 저장소, Datadog Operator 매니페스트, Helm 차트)을 선택하세요.
2. 선택한 방법의 템플릿 형식을 확인하세요. 각 형식에는 `<CONTAINER_NAME>`과 같은 플레이스홀더가 포함되어 있습니다.
3. 이러한 플레이스홀더에 대한 [값을 입력합니다](#placeholder-values).

{{< tabs >}}
{{% tab "Annotations" %}}

Kubernetes 포드를 `kind: Pod`를 사용해 직접 정의하려면 다음과 같이 각 포드의 주석을 `metadata` 섹션 아래에 추가합니다.

**Autodiscovery annotations v2** (Datadog Agent v7.36 이상인 경우)

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "<INTEGRATION_NAME>": {
          "init_config": <INIT_CONFIG>,
          "instances": [<INSTANCES_CONFIG>]
        }
      }
    ad.datadoghq.com/<CONTAINER_NAME>.logs: '[<LOGS_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_NAME>'
# (...)
```

**Autodiscovery annotations v1** 

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.check_names: '[<INTEGRATION_NAME>]'
    ad.datadoghq.com/<CONTAINER_NAME>.init_configs: '[<INIT_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_NAME>.instances: '[<INSTANCES_CONFIG>]'
    ad.datadoghq.com/<CONTAINER_NAME>.logs: '[<LOGS_CONFIG>]'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_NAME>'
# (...)
```

배포, ReplicaSets, ReplicationControllers를 사용하여 간접적으로 포드를 정의하는 경우 `spec.template.metadata` 아래에 포드 주석을 추가합니다.

{{% /tab %}}
{{% tab "Local file" %}}

Autodiscovery 템플릿을 마운트된 `conf.d` 디렉터리(`/etc/datadog-agent/conf.d`)에 로컬 파일로 저장할 수 있습니다. 템플릿을 변경, 추가 또는 제거할 때마다 Agent 컨테이너를 다시 시작해야 합니다.

1. 호스트에 `conf.d/<INTEGRATION_NAME>.d/conf.yaml` 파일을 생성합니다.
   ```yaml
   ad_identifiers:
     - <CONTAINER_IMAGE>

   init_config:
     <INIT_CONFIG>

   instances:
     <INSTANCES_CONFIG>

   logs:
     <LOGS_CONFIG>
   ```

2. 호스트 `conf.d/` 폴더를 컨테이너화된 에이전트 `conf.d` 폴더에 마운트합니다.

{{% /tab %}}
{{% tab "ConfigMap" %}}

[ConfigMaps][1]를 사용하여 외부에서 구성을 정의한 후 마운트할 수 있습니다.

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: "<NAME>-config-map"
  namespace: default
data:
  <INTEGRATION_NAME>-config: |-
    ad_identifiers:
      <CONTAINER_IMAGE>
    init_config:
      <INIT_CONFIG>
    instances:
      <INSTANCES_CONFIG>
    logs:
      <LOGS_CONFIG>
```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap

{{% /tab %}}
{{% tab "Key-value store" %}}

[Consul][1], [etcd][2], [ZooKeeper][3]에서 Autodiscovery 템플릿을 가져올 수 있습니다. `datadog.yaml` 구성 파일에서 키-값 저장소를 구성한 후 이 파일을 Agent 컨테이너에 마운트하거나, Agent 컨테이너의 환경 변수로 사용할 수 있습니다.

** datadog.yaml에서 설정하기**

`datadog.yaml`에서 `<KEY_VALUE_STORE_IP>` 주소와 키-값 저장소의 `<KEY_VALUE_STORE_PORT>`를 설정합니다.

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

[Datadog Agent를 다시 시작][4]하여 변경 사항을 적용합니다.

**환경 변수 설정**:

키-값 저장소가 템플릿 소스로 활성화되어 있는 경우 에이전트는 키`/datadog/check_configs`에서 템플릿을 찾습니다. 자동 탐지에서는 다음과 같은 키-값 위계가 필요합니다:

```yaml
/datadog/
  check_configs/
    <CONTAINER_IMAGE>/
      - check_names: ["<INTEGRATION_NAME>"]
      - init_configs: ["<INIT_CONFIG>"]
      - instances: ["<INSTANCES_CONFIG>"]
      - logs: ["<LOGS_CONFIG>"]
    ...
```

[1]: /ko/integrations/consul/
[2]: /ko/integrations/etcd/
[3]: /ko/integrations/zk/
[4]: /ko/agent/configuration/agent-commands/

{{% /tab %}}
{{% tab "Datadog 연산자" %}}

`datadog-agent.yaml`에서 통합을 구성하려면 `extraConfd.configDataMap` 재정의를 `DatadogAgent`의 `nodeAgent` 구성 요소에 추가합니다. 각 키는 Agent `conf.d` 디렉터리의 파일이 됩니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    [...]
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <CONTAINER_IMAGE>
            init_config:
              <INIT_CONFIG>
            instances:
              <INSTANCES_CONFIG>
            logs:
              <LOGS_CONFIG>
```

[Cluster Check][1]를 모니터링하려면 `extraConfd.configDataMap` 재정의를 `clusterAgent`구성 요소에 추가합니다. 또한 `features.clusterChecks.enabled: true`를 설정하여 클러스터 점검을 활성화해야 합니다.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    clusterChecks:
      enabled: true
    [...]
  override:
    nodeAgent:
      [...]
    clusterAgent:
      extraConfd:
        configDataMap:
          <INTEGRATION_NAME>.yaml: |-
            ad_identifiers:
              - <CONTAINER_IMAGE>
            cluster_check: true
            init_config:
              <INIT_CONFIG>
            instances:
              <INSTANCES_CONFIG>
            logs:
              <LOGS_CONFIG>
```

[Cluster Checks][1]에서 자세한 내용을 확인하세요.

[1]: /ko/agent/cluster_agent/clusterchecks

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml` 파일에는 Autodiscovery 템플릿을 정의할 수 있는 `datadog.confd` 섹션이 있습니다. 샘플 [values.yaml][1]에서 인라인 예시를 확인하세요. 각 키는 Agent `conf.d` 디렉터리의 파일이 됩니다.

```yaml
datadog:
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <CONTAINER_IMAGE>
      init_config:
        <INIT_CONFIG>
      instances:
        <INSTANCES_CONFIG>
      logs:
        <LOGS_CONFIG>
```

[Cluster Check][3]를 모니터링하려면 `clusterAgent.confd`에서 템플릿을 정의합니다. 샘플 [values.yaml][2]에서 인라인 예시를 확인할 수 있습니다. 또한 `clusterAgent.enabled: true`를 설정하여 Cluster Agent를 활성화하고, `datadog.clusterChecks.enabled: true`를 설정하여 클러스터 점검을 활성화합니다.

```yaml
datadog:
  clusterChecks:
    enabled: true
clusterAgent:
  enabled: true
  confd:
    <INTEGRATION_NAME>.yaml: |-
      ad_identifiers:
        - <CONTAINER_IMAGE>
      cluster_check: true
      init_config:
        <INIT_CONFIG>
      instances:
        <INSTANCES_CONFIG>
      logs:
        <LOGS_CONFIG>
```

[Cluster Checks][3]에서 자세한 내용을 확인하세요.

[1]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L315-L330
[2]: https://github.com/DataDog/helm-charts/blob/92fd908e3dd7b7149ce02de1fe859ae5ac717d03/charts/datadog/values.yaml#L680-L689
[3]: /ko/agent/cluster_agent/clusterchecks
{{% /tab %}}

{{< /tabs >}}

### 플레이스홀더 값

다음과 같이 플레이스홀더 값을 제공합니다.

`<INTEGRATION_NAME>`
: Datadog 통합 이름 (예: `etcd` 또는 `redisdb`)

`<CONTAINER_NAME>`
: 통합에 해당하는 컨테이너의 이름(``spec.containers[i].image`가 **아닌** `spec.containers[i].name`)과 일치하는 식별자

`<CONTAINER_IMAGE>`
: 컨테이너 이미지와 일치하는 식별자 (`.spec.containers[i].image`). <br/><br/>
예: 컨테이너 식별자로 `redis`를 제공하면 Autodiscovery 템플릿이 `redis`와 일치하는 이미지 이름을 가진 모든 컨테이너에 적용됩니다.`foo/redis:latest`와 `bar/redis:v2`를 실행하는 컨테이너가 하나인 경우, Autodiscovery 템플릿은 두 컨테이너 모두에 적용됩니다.<br/><br/>
`ad_identifiers` 파라미터는 목록을 사용하므로 여러 컨테이너 식별자를 제공할 수 있으며, 커스텀 식별자를 사용할 수도 있습니다. 자세한 내용은 [Custom Autodiscovery Identifiers][21]를 참고하세요.

`<INIT_CONFIG>`
: 통합의 `<INTEGRATION_NAME>.d/conf.yaml.example` 파일에서 `init_config`에 나열된 구성 파라미터. `init_config` 섹션은 일반적으로 비어 있습니다.

`<INSTANCES_CONFIG>`
: 통합의 `<INTEGRATION_NAME>.d/conf.yaml.example` 파일에서 `instances`에 있는 구성 파라미터 목록

`<LOGS_CONFIG>`
: 통합의 `<INTEGRATION_NAME>.d/conf.yaml.example` 파일에서 `logs`에 있는 구성 파라미터 목록

### 자동 구성

Datadog Datadog Agent는 일부 일반 기술에 대한 기본 구성을 자동으로 인식하고 제공합니다. 전체 목록은 [Autodiscovery 자동 구성][20]을 참고하세요.

Kubernetes 주석으로 설정된 구성은 자동 구성보다 우선하지만, 자동 구성은 Datadog Operator 또는 Helm으로 설정된 구성보다 우선합니다. Datadog Operator 또는 Helm을 사용하여 [Autodiscovery 자동 구성][20] 목록에서 통합을 구성하려면 [자동 구성을 비활성화해야 합니다][22].

## 예시: Postgres 통합

다음 예시에서는 Kubernetes에 Postgres를 배포했으며, [Datadog-Postgres 통합][26]을 설정하고 구성하려고 합니다. 모든 Postgres 컨테이너의 컨테이너 이름에는 `postgres` 문자열이 포함되어 있습니다.

먼저, 추가 설정 단계는 [Postgres 통합 문서][26]를 참조하세요. Postgres 통합을 사용하려면 `datadog`이라는 읽기 전용 사용자를 생성하고, 해당 비밀번호를 `PG_PASSWORD`라는 환경 변수로 저장해야 합니다.

**호스트에서** 이 통합을 구성하려면 파라미터로 [`postgresql.d/conf.yaml.example`][15]을 사용하고, 다음을 포함하는 `postgresql.d/conf.yaml` 파일을 만들 수 있습니다.

```yaml
init_config:
instances:
  - host: localhost
    port: 5432
    username: datadog
    password: <PASSWORD>
logs:
  - type: file
    path: /var/log/postgres.log
    source: postgresql
    service: pg_service
```

여기서 `<PASSWORD>`는 생성한 `datadog` 사용자의 비밀번호에 해당합니다.

이 구성을 Postgres 컨테이너에 적용하는 방법:

{{< tabs >}}
{{% tab "Annotations" %}}

Pod 매니페스트에서:

**Autodiscovery annotations v2** (Datadog Agent v7.36 이상인 경우)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgres.checks: |
      {
        "postgresql": {
          "instances": [
            {
              "host": "%%host%%",
              "port": "5432",
              "username": "datadog",
              "password":"%%env_PG_PASSWORD%%"
            }
          ]
        }
      }
    ad.datadoghq.com/postgres.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/postgres.log",
          "source": "postgresql",
          "service": "pg_service"
        }
      ]
spec:
  containers:
    - name: postgres
```

**Autodiscovery annotations v1** 

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgres.check_names: '["postgresql"]'
    ad.datadoghq.com/postgres.init_configs: '[{}]'
    ad.datadoghq.com/postgres.instances: |
      [
        {
          "host": "%%host%%",
          "port": "5432",
          "username": "datadog",
          "password":"%%env_PG_PASSWORD%%"
        }
      ]
    ad.datadoghq.com/postgres.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/postgres.log",
          "source": "postgresql",
          "service": "pg_service"
        }
      ]
spec:
  containers:
    - name: postgres
```

{{% /tab %}}
{{% tab "Local file" %}}
1. 호스트에 `conf.d/postgresql.d/conf.yaml` 파일을 생성합니다.

   ```yaml
   ad_identifiers:
     - postgres
   init config:
   instances:
     - host: "%%host%%"
       port: "5432"
       username: "datadog"
       password: "%%env_PG_PASSWORD%%"
   logs:
     - type: "file"
       path: "/var/log/postgres.log"
       source: "postgresql"
       service: "pg_service"
   ```

2. 호스트 `conf.d/` 폴더를 컨테이너화된 에이전트 `conf.d` 폴더에 마운트합니다.
{{% /tab %}}
{{% tab "ConfigMap" %}}

ConfigMap에서:

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: postgresql-config-map
  namespace: default
data:
  postgresql-config: |-
    ad_identifiers:
      - postgres
    init_config:
    instances:
      - host: "%%host%%"
        port: "5432"
        username: "datadog"
        password: "%%env_PG_PASSWORD%%"
    logs:
      - type: "file"
        path: "/var/log/postgres.log"
        source: "postgresql"
        service: "pg_service"
```

그런 다음 매니페스트에서 `volumeMounts`와 `volumes`를 정의합니다:

```yaml
# [...]
        volumeMounts:
        # [...]
          - name: postgresql-config-map
            mountPath: /etc/datadog-agent/conf.d/postgresql.d
        # [...]
      volumes:
      # [...]
        - name: postgresql-config-map
          configMap:
            name: postgresql-config-map
            items:
              - key: postgresql-config
                path: conf.yaml
# [...]
```

{{% /tab %}}
{{% tab "Key-value store" %}}

다음 etcd 명령은 커스텀 `password` 파라미터를 사용하여 Postgres 통합 템플릿을 생성합니다.

```conf
etcdctl mkdir /datadog/check_configs/postgres
etcdctl set /datadog/check_configs/postgres/check_names '["postgresql"]'
etcdctl set /datadog/check_configs/postgres/init_configs '[{}]'
etcdctl set /datadog/check_configs/postgres/instances '[{"host": "%%host%%","port":"5432","username":"datadog","password":"%%env_PG_PASSWORD%%"}]'
```

세 값은 각각의 목록입니다. 자동 탐지는 공유 목록 인덱스를 기반으로 목록의 항목들을 통합 설정에 맞춥니다. 이 경우 `check_names[0]`, `init_configs[0]` 및 `instances[0]`에서 첫 번째(그리고 유일한) 검사 설정을 구성합니다.

{{% /tab %}}
{{% tab "Datadog 연산자" %}}

`datadog-agent.yaml`에서:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    [...]
  features:
    [...]
  override:
    nodeAgent:
      extraConfd:
        configDataMap:
          postgres.yaml: |-
            ad_identifiers:
              - postgres
            init_config:
            instances:
              - host: "%%host%%"
                port: 5432
                username: "datadog"
                password: "%%env_PG_PASSWORD%%"
```
결과적으로 Agent는 `conf.d` 디렉터리에 위 구성이 담긴 `postgres.yaml` 파일을 포함합니다.

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml`에서:

```yaml
datadog:
  confd:
    postgres.yaml: |-
      ad_identifiers:
        - postgres
      init_config:
      instances:
        - host: "%%host%%"
          port: 5432
          username: "datadog"
          password: "%%env_PG_PASSWORD%%"
```
결과적으로 Agent는 `conf.d` 디렉터리에 위 구성이 담긴 `postgres.yaml` 파일을 포함합니다.

{{% /tab %}}
{{< /tabs >}}

이러한 템플릿은 [Autodiscovery 템플릿 변수][16]를 활용합니다.
- `%%host%%`는 컨테이너의 IP로 채워집니다.
- `%%env_PG_PASSWORD%%`는 Agent 프로세스에서 보이는 대로 `PG_PASSWORD`라는 환경 변수를 참조합니다.

여러 컨테이너 세트에 대해 여러 점검을 구성하는 방법은 [Autodiscovery: 시나리오 & 예시][24]를 참고하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/docker/integrations/
[2]: /ko/getting_started/integrations/#configuring-agent-integrations
[3]: /ko/agent/configuration/secrets-management/
[4]: /ko/integrations/ceph/
[5]: /ko/integrations/varnish/#autodiscovery
[6]: /ko/integrations/postfix/
[7]: /ko/integrations/cassandra/#agent-check-cassandra-nodetool
[8]: /ko/integrations/gunicorn/
[9]: /ko/integrations/apache/#setup
[10]: /ko/integrations/http_check/#setup
[11]: /ko/getting_started/integrations/
[12]: /ko/getting_started/containers/autodiscovery
[13]: /ko/agent/guide/use-community-integrations/
[14]: /ko/integrations/redis
[15]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[16]: /ko/containers/guide/template_variables/
[17]: /ko/integrations/coredns
[18]: /ko/integrations/etcd/
[19]: /ko/integrations/kube_apiserver_metrics
[20]: /ko/containers/guide/auto_conf
[21]: /ko/containers/guide/ad_identifiers
[22]: /ko/containers/guide/auto_conf/#disable-auto-configuration
[23]: /ko/containers/guide/autodiscovery-management
[24]: /ko/containers/guide/autodiscovery-examples
[25]: /ko/integrations/istio/
[26]: /ko/integrations/postgres