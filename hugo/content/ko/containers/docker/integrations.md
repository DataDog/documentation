---
aliases:
- /ko/agent/docker/integrations
description: Autodiscovery를 사용하여 Docker에서 실행되는 애플리케이션을 위한 모니터링 통합 구성
further_reading:
- link: /agent/docker/log/
  tag: 설명서
  text: 로그 수집
- link: /agent/docker/apm/
  tag: 설명서
  text: 애플리케이션 트레이스 수집
- link: /agent/docker/prometheus/
  tag: 설명서
  text: Prometheus 메트릭 수집
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
- link: /agent/docker/tag/
  tag: 설명서
  text: 컨테이너에서 내보내는 모든 데이터에 태그 할당
title: Docker 및 통합
---
이 페이지에서는 Datadog의 _Autodiscovery_ 기능을 사용하여 Docker 인프라에 대한 통합을 설치하고 구성하는 방법을 설명합니다. Autodiscovery를 사용하면 `%%host%%`과 같은 [변수][1]를 사용하여 구성 설정을 동적으로 채울 수 있습니다. 

Autodiscovery의 작동 방식에 대한 자세한 설명은 [컨테이너 시작하기: Autodiscovery][2]를 참조하세요. 특정 컨테이너를 Autodiscovery에서 제외하거나 준비되지 않은 포드를 허용하는 등의 고급 옵션은 [컨테이너 탐지 관리][3]를 참조하세요.

Kubernetes를 사용하는 경우 [Kubernetes와 통합][4]을 참조하세요.

<div class="alert alert-info">
다음 Datadog 통합은 프로세스 트리 데이터 또는 파일 시스템 접근이 필요하므로 Autodiscovery와 함께 사용할 수 없습니다. <a href="/integrations/ceph">Ceph</a>, <a href="/integrations/varnish">Varnish</a>, <a href="/integrations/postfix">Postfix</a>, <a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a>, <a href="/integrations/gunicorn">Gunicorn</a>.<br/><br/>
Autodiscovery와 호환되지 않는 통합을 모니터링하려면 포드에서 Prometheus Exporter를 사용하여 HTTP 엔드포인트를 노출한 후, Autodiscovery를 지원하는 <a href="/integrations/openmetrics/">OpenMetrics 통합</a>을 사용하여 포드를 찾고 해당 엔드포인트를 쿼리할 수 있습니다. 
</div>

## 통합 설정{#set-up-your-integration}

일부 통합은 액세스 토큰을 생성하거나 Datadog Agent에 대한 읽기 권한을 부여하는 등의 설정 단계를 요구합니다. 통합 문서의 **설정** 섹션에 있는 지침을 따르세요.

### 커뮤니티 통합 {#community-integrations}
Datadog Agent와 함께 제공되지 않는 통합을 사용하려면 원하는 통합을 포함하는 사용자 지정 이미지를 빌드해야 합니다. 방법은 [커뮤니티 통합 사용][5]을 참조하세요.

## 구성 {#configuration}

일부 자주 사용되는 통합은 Autodiscovery용 기본 구성이 제공됩니다. 자동 구성되는 통합 목록과 기본 구성 파일을 포함하여 자세한 내용은 [Autodiscovery 자동 구성][6]을 참조하세요. 통합이 해당 목록에 포함되어 있고 기본 구성이 요구 사항을 충족한다면 추가 작업은 필요하지 않습니다.

그렇지 않은 경우:

1. 사용 사례에 적합한 구성 방법(Docker 레이블, 로컬 파일 또는 키-값 저장소)을 선택합니다.
2. 선택한 방법의 템플릿 형식을 참조합니다. 각 형식에는 `<CONTAINER_IMAGE>`과 같은 자리표시자가 포함됩니다.
해당 자리표시자에 3. [값을 제공](#placeholder-values)합니다.

{{< tabs >}}
{{% tab "레이블" %}}

#### Dockerfile {#dockerfile}

Datadog Agent v7.36 이상:

```yaml
LABEL "com.datadoghq.ad.checks"='{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'
```

이전 Agent 버전:

```yaml
LABEL "com.datadoghq.ad.check_names"='[<INTEGRATION_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

#### docker-compose.yaml {#docker-composeyaml}

Datadog Agent v7.36 이상:

```yaml
labels:
  com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'
```

이전 Agent 버전:

```yaml
labels:
  com.datadoghq.ad.check_names: '[<INTEGRATION_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
  com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'
```

#### docker run, nerdctl run 또는 podman run 사용 {#using-docker-run-nerdctl-run-or-podman-run}

Datadog Agent v7.36 이상:

```shell
docker run -l com.datadoghq.ad.checks="{\"<INTEGRATION_NAME>\": {\"instances\": [<INSTANCE_CONFIG>], \"logs\": [<LOGS_CONFIG>]}}"
```

이전 Agent 버전:

```shell
docker run -l com.datadoghq.ad.check_names='[<INTEGRATION_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]' -l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

**참고**: 이러한 레이블을 구성할 때 JSON 이스케이프를 사용할 수 있습니다. 예를 들면 다음과 같습니다.

```shell
docker run -l "com.datadoghq.ad.checks="{\"apache\": {\"instances\": [{\"apache_status_url\":\"http://%%host%%/server-status?auto2\"}]}}"
```

#### Docker Swarm {#docker-swarm}
Docker Cloud에서 Swarm 모드를 사용하는 경우 레이블은 이미지에 적용해야 합니다.

Datadog Agent v7.36 이상:

```yaml
version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'

```

이전 Agent 버전:

```yaml
version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.check_names: '[<INTEGRATION_NAME>]'
      com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
      com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
      com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'

```

{{% /tab %}}
{{% tab "로컬 파일" %}}

Autodiscovery 템플릿은 마운트된 `/conf.d` 디렉터리 내부의 로컬 파일로 저장할 수 있습니다. 템플릿을 변경, 추가 또는 제거할 때마다 Datadog Agent 컨테이너를 다시 시작해야 합니다.

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

   **docker-compose.yaml**
   ```yaml
   volumes:
     [...]
     - <PATH_TO_LOCAL_FOLDER>/conf.d:/conf.d
   ```

   **docker run**
   ```shell
   docker run -d --name datadog-agent \
     [...]
     -v <PATH_TO_LOCAL_FOLDER>/conf.d:/conf.d \
   ```

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
{{< /tabs >}}

### 자리표시자 값 {#placeholder-values}

다음과 같이 자리표시자 값을 제공합니다.

`<INTEGRATION_NAME>`
: Datadog 통합 이름입니다(예: `etcd` 또는 `redisdb`).

`<CONTAINER_IMAGE>`
: 컨테이너 이미지와 매칭할 식별자입니다. <br/><br/>
예를 들어:  컨테이너 식별자로 `redis`을 제공하면, 이미지 이름이 `redis`와 일치하는 모든 컨테이너에 Autodiscovery 템플릿이 적용됩니다. 하나의 컨테이너가 `foo/redis:latest`와 `bar/redis:v2`를 실행하는 경우, Autodiscovery 템플릿은 두 컨테이너 모두에 적용됩니다.<br/><br/>
`ad_identifiers` 파라미터는 목록을 사용하므로 여러 컨테이너 식별자를 지정할 수 있습니다. 사용자 지정 식별자도 사용할 수 있습니다. 자세한 내용은 [사용자 지정 Autodiscovery 식별자][7]를 참조하세요.

`<INIT_CONFIG>`
: 통합의 `<INTEGRATION_NAME>.d/conf.yaml.example` 파일에 있는 `init_config` 아래에 나열된 구성 파라미터입니다. `init_config` 섹션은 일반적으로 비어 있습니다.

`<INSTANCES_CONFIG>`
: 통합의 `<INTEGRATION_NAME>.d/conf.yaml.example` 파일에 있는 `instances` 아래에 나열된 구성 파라미터입니다.

`<LOGS_CONFIG>`
: 통합의 `logs` 파일에서 `<INTEGRATION_NAME>.d/conf.yaml.example` 아래에 나열된 구성 파라미터입니다.

## 예시 {#examples}

### Redis 통합 {#redis-integration}

Redis는 [Autodiscovery 자동 구성][6]이 제공되는 기술 중 하나입니다. 다음 예시는 `password` 파라미터를 제공하는 사용자 지정 구성으로 기본 구성을 재정의하는 방법을 보여줍니다.

비밀번호를 `REDIS_PASSWORD`라는 이름의 환경 변수에 저장한 다음 다음을 수행하세요.

{{< tabs >}}
{{% tab "Docker" %}}

Datadog Agent v7.36 이상:

```yaml
labels:
  com.datadoghq.ad.checks: '{"redisdb": {"instances": [{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}], "logs": [{"type": "file", "path": "/var/log/redis_6379.log", "source": "redis", "service": "redis_service"}]}}'
```

이전 Agent 버전:

```yaml
labels:
  com.datadoghq.ad.check_names: '["redisdb"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
  com.datadoghq.ad.logs: '[{"type": "file", "path": "/var/log/redis_6379.log", "source": "redis", "service": "redis_service"}]'
```

{{% /tab %}}
{{% tab "파일" %}}
1. 호스트에 `conf.d/redisdb.d/conf.yaml` 파일을 생성합니다.

   ```yaml
   ad_identifiers:
     - redis
   init config:
   instances:
     - host: "%%host%%"
       port: "6379"
       username: "datadog"
       password: "%%env_REDIS_PASSWORD%%"
   logs:
     - type: "file"
       path: "/var/log/redis.log"
       source: "redis"
       service: "redis_service"
   ```

2. 호스트 `conf.d/` 폴더를 컨테이너화된 Datadog Agent의 `conf.d` 폴더에 마운트합니다.

{{% /tab %}}
{{% tab "키-값 저장소" %}}

다음 etcd 명령은 사용자 지정 `password` 파라미터를 사용하는 Redis 통합 템플릿을 생성합니다.

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

세 개의 값 각각이 목록임에 유의합니다. Autodiscovery는 공유 목록 인덱스를 기반으로 통합 구성에 목록 항목을 조합합니다. 이 경우, `check_names[0]`, `init_configs[0]` 및 `instances[0]`에서 첫 번째(및 유일한) 검사 구성을 설정합니다.
{{% /tab %}}
{{< /tabs >}}

이 모든 예시는 [Autodiscovery 템플릿 변수][1]를 사용합니다.
- `%%host%%`는 컨테이너의 IP로 동적으로 채워집니다.
- `%%env_REDIS_PASSWORD%%` 는 Agent 프로세스에서 인식되는 `REDIS_PASSWORD` 환경 변수를 참조합니다.

여러 컨테이너 집합에 대해 여러 검사를 구성하는 방법을 포함한 추가 예시는 [Autodiscovery: 시나리오 및 예시][8]를 참조하세요.

[1]: /ko/containers/guide/template_variables/
[2]: /ko/getting_started/containers/autodiscovery
[3]: /ko/containers/guide/autodiscovery-management
[4]: /ko/containers/kubernetes/integrations/
[5]: /ko/agent/guide/use-community-integrations/
[6]: /ko/containers/guide/auto_conf
[7]: /ko/containers/guide/ad_identifiers
[8]: /ko/containers/guide/autodiscovery-examples