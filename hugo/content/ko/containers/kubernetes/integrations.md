---
aliases:
- /ko/agent/autodiscovery/integrations
- /ko/guides/servicediscovery/
- /ko/guides/autodiscovery/
- /ko/agent/kubernetes/integrations
description: Kubernetes에서 실행 중인 애플리케이션에 대한 모니터링 통합을 Autodiscovery 템플릿을 사용하여 구성
further_reading:
- link: https://www.datadoghq.com/blog/monitor-karpenter-datadog
  tag: 블로그
  text: Datadog로 Karpenter 모니터링
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
- link: https://www.youtube.com/watch?v=nuxmVf9ByE0
  tag: 비디오
  text: 'Datadog 팁 및 요령: Datadog Autodiscovery를 위한 JSON으로 Kubernetes에서 주석을 작성하는 방법'
title: Kubernetes와 통합
---
이 페이지에서는 _Autodiscovery_라는 Datadog 기능을 사용하여 Kubernetes 인프라에 대한 통합을 설치하고 구성하는 방법을 다룹니다. 이를 통해 `%%host%%`와 같은 [변수][16]를 사용하여 구성 설정을 동적으로 채울 수 있습니다. Autodiscovery 작동 방식에 대한 자세한 설명은 [컨테이너 시작하기: Autodiscovery][12]를 참조하세요. 특정 컨테이너를 Autodiscovery에서 제외하거나 준비되지 않은 포드를 허용하는 등의 고급 Autodiscovery 옵션에 대해서는 [컨테이너 검색 관리][23]를 참조하세요.

Docker나 Amazon ECS를 사용 중이라면 [Docker와 통합][1]을 참고하세요.

<div class="alert alert-info">
일부 Datadog 통합은 다음의 프로세스 트리 데이터나 파일 시스템 접근이 필요하기 때문에 Autodiscovery를 지원하지 않습니다. <a href="/integrations/ceph">Ceph</a>, <a href="/integrations/varnish">Varnish</a>, <a href="/integrations/postfix">Postfix</a>, <a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a> 및 <a href="/integrations/gunicorn">Gunicorn</a>.<br/><br/>
Autodiscovery와 호환되지 않는 통합을 모니터링하려면 포드 내에 Prometheus Exporter를 사용하여 HTTP 엔드포인트를 노출한 후, Autodiscovery를 지원하는 <a href="/integrations/openmetrics/">OpenMetrics 통합</a>을 사용하여 포드를 찾고 해당 엔드포인트를 쿼리할 수 있습니다.
</div>

## 통합 설정 {#set-up-your-integration}

일부 통합은 액세스 토큰을 생성하거나 Datadog Agent에 대한 읽기 권한을 부여하는 등의 설정 단계를 요구합니다. 통합 문서의 **설정** 섹션의에 있는 지침을 따르세요.

### 커뮤니티 통합 {#community-integrations}
Datadog Agent와 함께 제공되지 않는 통합을 사용하려면 원하는 통합이 포함된 사용자 지정 이미지를 빌드해야 합니다. 자세한 내용은 [커뮤니티 통합 사용][13]을 참조하세요.

## 구성 {#configuration}

일부 일반적으로 사용되는 통합은 Autodiscovery용 기본 구성을 제공합니다. 자세한 내용은 [Autodiscovery 자동 구성][20]을 참조하세요. 여기에는 자동 구성된 통합 목록과 해당 기본 구성 파일이 포함됩니다. 해당 통합이 이 목록에 포함되어 있고 기본 구성만으로 사용 사례에 충분하다면 추가 작업은 필요하지 않습니다.

그렇지 않은 경우:

1. 자신의 사용 사례에 맞는 구성 방법(Kubernetes 포드 주석, 로컬 파일, ConfigMap, 키-값 저장소, Datadog Operator 매니페스트 또는 Helm 차트)을 선택합니다.
2. 선택한 방법의 템플릿 형식을 참조합니다. 각 형식에는 `<CONTAINER_NAME>`과 같은 자리 표시자가 포함됩니다.
해당 자리표시자에 3. [값을 제공](#placeholder-values)합니다.

{{< tabs >}}
{{% tab "주석" %}}

Kubernetes 포드를 `kind: Pod`를 사용해 직접 정의하려면 다음과 같이 각 포드의 주석을 `metadata` 섹션 아래에 추가합니다.

**Autodiscovery annotations v2**(Datadog Agent v7.36 이상인 경우)

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
{{% tab "로컬 파일" %}}

Autodiscovery 템플릿을 마운트된 `conf.d` 디렉터리(`/etc/datadog-agent/conf.d`) 내의 로컬 파일로 저장할 수 있습니다. 템플릿을 변경, 추가 또는 제거할 때마다 Datadog Agent 컨테이너를 다시 시작해야 합니다.

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

2. 호스트 `conf.d/` 폴더를 컨테이너화된 Datadog Agent의 `conf.d` 폴더에 마운트합니다.

   Datadog Operator의 경우:
   ```yaml
   spec:
     override:
       nodeAgent:
         volumes:
           - hostPath:
               path: <PATH_TO_LOCAL_FOLDER>/conf.d
             name: confd
   ```

   Helm의 경우:
   ```yaml
   agents:
     volumes:
     - hostPath:
         path: <PATH_TO_LOCAL_FOLDER>/conf.d
       name: confd
     volumeMounts:
     - name: confd
       mountPath: /conf.d
   ```

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
{{% tab "키-값 저장소" %}}

Autodiscovery 템플릿은 [Consul][1], [etcd][2] 또는 [ZooKeeper][3]에서 가져올 수 있습니다. 키-값 저장소를 `datadog.yaml` 구성 파일에서 구성하거나(이 파일을 Datadog Agent 컨테이너 내에 마운트함) 또는 Datadog Agent 컨테이너의 환경 변수로 구성할 수 있습니다.

**datadog.yaml에서 구성하기**:

`datadog.yaml`에서 키-값 저장소의 `<KEY_VALUE_STORE_IP>` 주소와 `<KEY_VALUE_STORE_PORT>`를 설정합니다.

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

**환경 변수에서 구성하기**:

키-값 저장소를 템플릿 소스로 활성화하면 Datadog Agent는 `/datadog/check_configs` 키 아래에서 템플릿을 찾습니다. Autodiscovery는 다음과 같은 키-값 계층 구조를 기대합니다.

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
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml`에서 통합을 구성하려면 `DatadogAgent` 구성의 `nodeAgent` 구성 요소에 재정의 `extraConfd.configDataMap`를 추가하세요. 각 키는 Datadog Agent의 `conf.d` 디렉터리에 파일로 생성됩니다.

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
<div class="alert alert-info">여러 개의 배포된 <code>DatadogAgent</code> CRD가 <code>configDataMap</code>를 사용하면 모든 CRD가 공유 ConfigMap인 <code>nodeagent-extra-confd</code>에 기록하므로 구성이 서로를 재정의할 수 있습니다. </div>

[Cluster Chec][1]를 모니터링하려면 `clusterAgent` 구성 요소에 `extraConfd.configDataMap`을 추가합니다. 또한 `features.clusterChecks.enabled: true`을 설정하여 클러스터 검사를 활성화해야 합니다.

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

`datadog-values.yaml` 파일에는 Autodiscovery 템플릿을 정의할 수 있는 `datadog.confd` 섹션이 있습니다. 샘플 [values.yaml][1]에서 인라인 예제를 찾을 수 있습니다. 각 키는 Datadog Agent의 `conf.d` 디렉터리에 파일로 생성됩니다.

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

[Cluster Check][3]를 모니터링하려면 `clusterAgent.confd` 아래에 템플릿을 정의하세요. 샘플 [values.yaml][2]에서 인라인 예제를 찾을 수 있습니다. 또한 클러스터 Agent를 활성화하려면 `clusterAgent.enabled: true`를 설정하고, 클러스터 검사를 활성화하려면 `datadog.clusterChecks.enabled: true`를 설정해야 합니다.

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

### 자리표시자 값 {#placeholder-values}

다음과 같이 자리표시자 값을 제공합니다.

`<INTEGRATION_NAME>`
: Data 통합의 이름(예: `etcd` 또는 `redisdb`)

`<CONTAINER_NAME>`
: 통합에 해당하는 컨테이너의 이름(`spec.containers[i].name`이며, **아님** `spec.containers[i].image`)과 일치시키기 위한 식별자.

`<CONTAINER_IMAGE>`
: 컨테이너 이미지(`.spec.containers[i].image`)와 일치시기키 위한 식별자. <br/><br/>
예를 들어: 컨테이너 식별자로 `redis`를 지정하면, Autodiscovery 템플릿은 `redis`와 일치하는 이미지 이름을 가진 모든 컨테이너에 적용됩니다. 하나의 컨테이너가 `foo/redis:latest`과 `bar/redis:v2`를 실행하는 경우, Autodiscovery 템플릿은 두 컨테이너 모두에 적용됩니다.<br/><br/>
`ad_identifiers` 파라미터는 목록을 사용하므로 여러 컨테이너 식별자를 지정할 수 있습니다. 사용자 지정 식별자도 사용할 수 있습니다. [사용자 지정 Autodiscovery 식별자][21]를 참조하세요.

`<INIT_CONFIG>`
: 통합의 `init_config` 파일에서 `<INTEGRATION_NAME>.d/conf.yaml.example` 아래에 나열된 구성 파라미터입니다. `init_config` 섹션은 일반적으로 비어 있습니다.

`<INSTANCES_CONFIG>`
: 통합의 `instances` 파일에서 `<INTEGRATION_NAME>.d/conf.yaml.example` 아래에 나열된 구성 파라미터입니다.

`<LOGS_CONFIG>`
: 통합의 `logs` 파일에서 `<INTEGRATION_NAME>.d/conf.yaml.example` 아래에 나열된 구성 파라미터입니다.

### 고급 주석 파라미터 {#advanced-annotation-parameters}

검사, 로그 및 인스턴스에 대한 핵심 Autodiscovery 주석 외에도 검사 동작을 사용자 지정하기 위해 추가 주석을 사용할 수 있습니다.

#### 태그 카디널리티 {#tag-cardinality}

`check_tag_cardinality` 주석을 사용하여 특정 검사에 대한 태그 카디널리티 수준을 설정합니다. 이는 해당 검사에 의해 수집된 메트릭에 대한 전역 Datadog Agent 태그 카디널리티 설정을 재정의합니다.

```yaml
apiVersion: v1
kind: Pod
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
    ad.datadoghq.com/<CONTAINER_NAME>.check_tag_cardinality: "<low|orchestrator|high>"
spec:
  containers:
    - name: '<CONTAINER_NAME>'
```

<div class="alert alert-info"> <code>check_tag_cardinality</code> 주석은 통합 검사로 수집하는 메트릭에만 영향을 미칩니다. DogStatsD를 통해 전송된 메트릭에는 영향을 미치지 않습니다. DogStatsD 태그 카디널리티를 구성하려면 전역 <code>dogstatsd_tag_cardinality</code> 구성 파라미터 또는 <code>DD_DOGSTATSD_TAG_CARDINALITY</code> 환경 변수를 사용하세요.</div>

태그 카디널리티에 대한 자세한 내용은 [검사별 태그 구성][27]을 참조하세요.

### 자동 구성 {#auto-configuration}

Datadog Agent는 일부 일반 기술에 대한 기본 구성을 자동으로 인식하고 제공합니다. 전체 목록은 [Autodiscovery 자동 구성][20]을 참조하세요.

Kubernetes 주석으로 설정된 구성은 자동 구성보다 우선하지만, 자동 구성은 Datadog Operator 또는 Helm으로 설정된 구성보다 우선합니다. [Autodiscovery 자동 구성][20] 목록에서 통합을 구성하기 위해 Datadog Operator 또는 Helm을 사용하려면 [자동 구성을 비활성화][22]해야 합니다.

## 통합 보안 {#integrations-security}

통합은 종종 파일 시스템에서 구성 파일, 인증서 또는 기타 리소스를 읽어야 합니다. 파일 경로가 신뢰할 수 없는 구성 제공자(예: 포드 주석 또는 외부 서비스 Autodiscovery)에서 오는 경우, 경로 탐색 또는 무단 파일 접근의 위험이 있습니다.

Datadog Agent 버전 7.78.0부터, 구성 제공자의 신뢰 수준에 따라 파일 시스템 접근을 제어하기 위해 Agent의 `datadog.yaml`에서 다음 파라미터를 설정할 수 있습니다.

| 파라미터 | 유형 | 기본값 | 설명 |
|-----------|------|---------|-------------|
| `integration_ignore_untrusted_file_params` | bool | `false` | 활성화되면, 구성 제공자를 신뢰할 수 없는 경우 통합은 파일 경로를 참조하는 구성 파라미터를 무시합니다. |
| `integration_file_paths_allowlist` | list | `[]` | 신뢰할 수 없는 구성 제공자가 제공하더라도 통합이 접근할 수 있는 파일 경로 목록입니다. 빈 목록은 모든 파일 경로가 허용됨을 의미합니다. |
| `integration_trusted_providers` | list | `["file", "remote-config"]` | 신뢰할 수 있는 것으로 간주되는 구성 제공자 목록입니다. 이 목록에 없는 제공자는 신뢰할 수 없는 것으로 간주됩니다. 기본적으로, 로컬 구성 파일(`file`)과 Datadog Remote Configuration(`remote-config`)은 신뢰할 수 있습니다. 지원되는 제공자의 전체 목록은 [Datadog Agent 제공자 이름][28]을 참조하세요. |
| `integration_security_excluded_checks` | list | `[]` | 위의 보안 제한에서 제외된 통합 이름 목록입니다. |

이 옵션들은 이전 버전과 호환되며 기본값은 기존 동작을 유지합니다. 이 기능을 사용하려면 `integration_ignore_untrusted_file_params`를 활성화한 후 나머지 파라미터를 환경에 맞게 조정하세요.

예시 `datadog.yaml`:

```yaml
integration_ignore_untrusted_file_params: true
integration_file_paths_allowlist:
  - /etc/datadog-agent/certs
  - /var/run/secrets
integration_trusted_providers:
  - file
  - remote-config
integration_security_excluded_checks:
  - <INTEGRATION_NAME>
```

이 구성을 사용하는 경우, 포드 주석을 통해 구성된 통합(신뢰할 수 없는 제공자)은 `/etc/datadog-agent/certs` 또는 `/var/run/secrets` 외부의 파일 경로를 참조할 수 없습니다. 단, 통합 이름이 `integration_security_excluded_checks`에 나열된 경우는 예외입니다.

## 예시: Postgres 통합 {#example-postgres-integration}

이 예에서는 Kubernetes에 Postgres를 배포했다고 가정합니다. [Datadog-Postgres 통합][26]을 설정 및 구성하려고 하며, 모든 Postgres 컨테이너의 컨테이너 이름에는 문자열 `postgres`이 포함되어 있습니다.

먼저, 추가 설정 단계에 대한 [Postgres 통합 설명서][26]를 참조하세요. Postgres 통합을 위해 `datadog`라는 이름의 읽기 전용 사용자를 생성하고 해당 비밀번호를 `PG_PASSWORD`라는 환경 변수로 저장해야 합니다.

이 통합을 **호스트**에서 구성하려면, 파라미터에 대한 [`postgresql.d/conf.yaml.example`][15]를 참조하고 다음을 포함하는 `postgresql.d/conf.yaml` 파일을 생성할 수 있습니다.

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
{{% tab "주석" %}}

포드 매니페스트에서:

**Autodiscovery annotations v2**(Datadog Agent v7.36 이상인 경우)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: postgres
  annotations:
    ad.datadoghq.com/postgres.checks: |
      {
        "postgres": {
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
    ad.datadoghq.com/postgres.check_names: '["postgres"]'
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
{{% tab "로컬 파일" %}}
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

2. 호스트 `conf.d/` 폴더를 컨테이너화된 Datadog Agent의 `conf.d` 폴더에 마운트합니다.

   Datadog Operator의 경우:
   ```yaml
   spec:
     override:
       nodeAgent:
         volumes:
           - hostPath:
               path: <PATH_TO_LOCAL_FOLDER>/conf.d
             name: confd
   ```

   Helm의 경우:
   ```yaml
   agents:
     volumes:
     - hostPath:
         path: <PATH_TO_LOCAL_FOLDER>/conf.d
       name: confd
     volumeMounts:
     - name: confd
       mountPath: /conf.d
   ```

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

그런 다음, 매니페스트에서 `volumeMounts`과 `volumes`를 정의합니다.

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
{{% tab "키-값 저장소" %}}

다음 etcd 명령은 사용자 지정 `password` 파라미터를 사용하여 Postgres 통합 템플릿을 생성합니다.

```conf
etcdctl mkdir /datadog/check_configs/postgres
etcdctl set /datadog/check_configs/postgres/check_names '["postgres"]'
etcdctl set /datadog/check_configs/postgres/init_configs '[{}]'
etcdctl set /datadog/check_configs/postgres/instances '[{"host": "%%host%%","port":"5432","username":"datadog","password":"%%env_PG_PASSWORD%%"}]'
```

세 개의 값 각각이 목록임에 유의합니다. Autodiscovery는 공유 목록 인덱스를 기반으로 통합 구성에 목록 항목을 조합합니다. 이 경우, `check_names[0]`, `init_configs[0]` 및 `instances[0]`에서 첫 번째(및 유일한) 검사 구성을 설정합니다.

{{% /tab %}}
{{% tab "Datadog Operator" %}}

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
결과적으로 Agent는 `postgres.yaml` 디렉터리에 위 구성이 담긴 `conf.d` 파일을 포함합니다.

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
결과적으로 Agent는 `postgres.yaml` 디렉터리에 위 구성이 담긴 `conf.d` 파일을 포함합니다.

{{% /tab %}}
{{< /tabs >}}

이러한 템플릿은 [Autodiscovery 템플릿 변수][16]를 활용합니다.
- `%%host%%`는 컨테이너의 IP로 동적으로 채워집니다.
- `%%env_PG_PASSWORD%%` 는 Agent 프로세스에서 볼 수 있는 `PG_PASSWORD`라는 환경 변수를 참조합니다.

여러 컨테이너 세트에 대해 여러 검사를 구성하는 방법은 [Autodiscovery: 시나리오 및 예시][24]를 참고하세요.

## 추가 자료 {#further-reading}

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
[27]: /ko/getting_started/integrations/#per-check-tag-configuration
[28]: https://github.com/DataDog/datadog-agent/blob/main/comp/core/autodiscovery/providers/names/provider_names.go#L10-L38