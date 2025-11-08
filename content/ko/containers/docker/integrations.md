---
aliases:
- /ko/agent/docker/integrations
description: Autodiscovery를 사용하여 Docker 컨테이너에서 실행되는 애플리케이션에 모니터링 통합을 구성하세요
further_reading:
- link: /agent/docker/log/
  tag: 설명서
  text: Collect your logs
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

이 페이지에서는 Datadog의 _Autodiscovery_ 기능을 사용하여 Docker 인프라용 통합을 설치하고 구성하는 방법을 다룹니다. Autodiscovery를 사용하면 `%%host%%`와 같은 [변수][1]를 사용하여 구성 설정을 동적으로 채울 수 있습니다.

Autodiscovery 작동 방식에 관한 자세한 설명은 [컨테이너 시작하기: Autodiscovery][2]를 참고하세요. 특정 컨테이너를 Autodiscovery에서 제외하거나 준비되지 않은 포드를 허용하는 등 고급 Autodiscovery 옵션은 [컨테이너 검색 관리][3]를 참고하세요.

Kubernetes 사용자는 [Kubernetes 및 통합][4]을 참고하세요.

<div class="alert alert-info">
다음 Datadog 통합은 프로세스 트리 데이터 또는 파일 시스템 액세스가 필요하기 때문에 Autodiscovery와 호환되지 않습니다. <a href="/integrations/ceph">Ceph</a>, <a href="/integrations/varnish">Varnish</a>, <a href="/integrations/postfix">Postfix</a>, <a href="/integrations/cassandra/#agent-check-cassandra-nodetool">Cassandra Nodetool</a>, <a href="/integrations/gunicorn">Gunicorn</a>.<br/><br/>
Autodiscovery와 호환되지 않는 통합을 모니터링하려면 포드에서 Prometheus 내보내기 도구를 사용하여 HTTP 엔드포인트를 노출한 다음, <a href="/integrations/openmetrics/">OpenMetrics 통합</a>(Autodiscovery 지원)을 사용하여 포드를 찾고 엔드포인트를 쿼리할 수 있습니다.
</div>

## 통합 설정

일부 통합에는 액세스 토큰 생성이나 Datadog Agent에 대한 읽기 권한 부여와 같은 설정 단계가 필요합니다. 통합 문서에 있는 **Setup** 섹션을 참고하세요.

### 커뮤니티 통합
Datadog Agent와 함께 제공되지 않는 통합을 사용하려면 원하는 통합을 포함하는 사용자 지정 이미지를 빌드해야 합니다. 자세한 내용은 [커뮤니티 통합 사용][5]을 참고하세요.

## 설정

일반적으로 사용되는 일부 통합에는 Autodiscovery의 기본 구성이 포함되어 있습니다. 자동 구성된 통합 목록과 해당 기본 구성 파일에 관한 자세한 내용은 [Autodiscovery 자동 구성][6]을 참고하세요. 이 목록에 있는 통합을 사용하며 기본 설정으로 충분한 경우, 추가 설정은 필요하지 않습니다.

다른 구성이 필요할 경우:

1. 사용 사례에 맞는 구성 방법(Docker 레이블, 로컬 파일, 키-값 저장소)을 선택하세요.
2. 선택한 방법의 템플릿 형식을 참조하세요. 각 형식에는 `<CONTAINER_IMAGE>`와 같은 자리 표시자가 포함되어 있습니다.
3. 이러한 플레이스홀더에 대한 [값을 입력합니다](#placeholder-values).

{{< tabs >}}
{{% tab "Labels" %}}

#### Dockerfile

Datadog Agent v7.36 이상:

```yaml
LABEL "com.datadoghq.ad.checks"='{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'
```

이전 Agent 버전:

```yaml
LABEL "com.datadoghq.ad.check_names"='[<INTEGRATION_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

#### docker-compose.yaml

Datadog Agent v7.36 이상:

```yaml
labels:
  com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>], "logs": [<LOGS_CONFIG>]}}'
```

이전 Agent 버전:

```yaml
labels:
  com.datadoghq.ad.check_names: '[<INTEGRATION_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
  com.datadoghq.ad.logs: '[<LOGS_CONFIG>]'
```

#### docker run, nerdctl run, podman run 사용

Datadog Agent v7.36 이상:

```shell
docker run -l com.datadoghq.ad.checks="{\"<INTEGRATION_NAME>\": {\"instances\": [<INSTANCE_CONFIG>], \"logs\": [<LOGS_CONFIG>]}}"
```

이전 Agent 버전:

```shell
docker run -l com.datadoghq.ad.check_names='[<INTEGRATION_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]' -l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

**참고**: 이러한 라벨을 설정하는 동안 JSON에서 벗어날 수 있습니다. 예:
```shell
docker run -l "com.datadoghq.ad.checks="{\"apache\": {\"instances\": [{\"apache_status_url\":\"http://%%host%%/server-status?auto2\"}]}}"
```

#### Docker Swarm
Docker Cloud에서 Swarm 모드를 사용하는 경우 이미지에 레이블을 적용해야 합니다.

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

이전 Agent 버전:

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
{{% tab "Local file" %}}

Autodiscovery 템플릿을 마운트된 `/conf.d` 디렉터리 내에 로컬 파일로 저장할 수 있습니다. 템플릿을 변경, 추가 또는 제거할 때마다 Agent 컨테이너를 다시 시작해야 합니다.

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
{{% tab "Key-value store" %}}
[Consul][1], [etcd][2] 또는 [ZooKeeper][3]에서 Autodiscovery 템플릿을 가져올 수 있습니다. `datadog.yaml` 구성 파일에서 키-값 저장소를 구성한 후 이 파일을 Agent 컨테이너에 마운트하거나, Agent 컨테이너의 환경 변수로 사용할 수 있습니다.

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
{{< /tabs >}}

### 플레이스홀더 값

다음과 같이 플레이스홀더 값을 제공합니다.

`<INTEGRATION_NAME>`
: Datadog 통합 이름 (예: `etcd` 또는 `redisdb`)

`<CONTAINER_IMAGE>`
: 컨테이너 이미지와 일치시킬 식별자.<br/><br/>
예: 컨테이너 식별자로 `redis`를 제공하면 이름이 `redis`인 이미지를 사용하는 컨테이너에만 Autodiscovery 템플릿이 적용됩니다. `foo/redis:latest`와 `bar/redis:v2`를 실행하는 컨테이너 하나가 있는 경우, Autodiscovery 템플릿은 두 컨테이너 모두에 적용됩니다.<br/><br/>
`ad_identifiers` 파라미터는 목록을 사용하므로 여러 컨테이너 식별자를 제공할 수 있습니다. 또한, 사용자 지정 식별자를 사용할 수도 있습니다. [사용자 지정 Autodiscovery 식별자][7]를 참고하세요.

`<INIT_CONFIG>`
: 통합의 `<INTEGRATION_NAME>.d/conf.yaml.example` 파일에서 `init_config`에 나열된 구성 파라미터. `init_config` 섹션은 일반적으로 비어 있습니다.

`<INSTANCES_CONFIG>`
: 통합의 `<INTEGRATION_NAME>.d/conf.yaml.example` 파일에서 `instances`에 있는 구성 파라미터 목록

`<LOGS_CONFIG>`
: 통합의 `<INTEGRATION_NAME>.d/conf.yaml.example` 파일에서 `logs`에 있는 구성 파라미터 목록

## 예시

### Redis 통합

Redis는 [Autodiscovery 자동 구성][6]을 사용할 수 있는 기술입니다. 다음 예제는 `password` 파라미터를 제공하는 사용자 지정 구성으로 기본 구성을 재정의하는 방법을 보여줍니다.

비밀번호를 `REDIS_PASSWORD`라는 환경 변수로 저장한 후 다음을 따릅니다.

{{< tabs >}}
{{% tab "Docker" %}}

Datadog Agent v7.36 이상:

```yaml
labels:
  com.datadoghq.ad.checks: '{"redisdb": {"instances": [{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}], "logs": [{"type": "file", "path": "/var/log/redis_6379.log", "source": "redis", "service": "redis_service"}]}}'
```

이전 Agent 버전:

```yaml
labels:
  com.datadoghq.ad.check_names: '["redisdb"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
  com.datadoghq.ad.logs: '[{"type": "file", "path": "/var/log/redis_6379.log", "source": "redis", "service": "redis_service"}]'
```

{{% /tab %}}
{{% tab "File" %}}
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

2. 호스트 `conf.d/` 폴더를 컨테이너화된 에이전트 `conf.d` 폴더에 마운트합니다.

{{% /tab %}}
{{% tab "Key-value store" %}}

다음 etcd 명령은 사용자 지정 `password` 매개 변수를 사용하여 Redis 통합 템플릿을 생성합니다.

```conf
etcdctl mkdir /datadog/check_configs/redis
etcdctl set /datadog/check_configs/redis/check_names '["redisdb"]'
etcdctl set /datadog/check_configs/redis/init_configs '[{}]'
etcdctl set /datadog/check_configs/redis/instances '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

세 값 모두 목록입니다. Autodiscovery는 공유 목록 인덱스를 기반으로 목록 항목을 통합 구성으로 조합합니다. 이 경우, `check_names[0]`, `init_configs[0]`, `instances[0]`를 사용하여 첫 번째(그리고 유일한) 점검을 구성합니다.
{{% /tab %}}
{{< /tabs >}}

다음 예에서는 모두 [Autodiscovery 템플릿 변수][1]를 사용합니다.
- `%%host%%`는 컨테이너의 IP로 채워집니다.
- `%%env_REDIS_PASSWORD%%`는 Agent 프로세스가 인식하는 `REDIS_PASSWORD`라는 환경 변수로 채워집니다.

여러 컨테이너 세트에 여러 점검을 구성하는 방법과 예시를 더 보고 싶을 경우 [Autodiscovery: 시나리오 및 예][8]를 참고하세요.

[1]: /ko/containers/guide/template_variables/
[2]: /ko/getting_started/containers/autodiscovery
[3]: /ko/containers/guide/autodiscovery-management
[4]: /ko/containers/kubernetes/integrations/
[5]: /ko/agent/guide/use-community-integrations/
[6]: /ko/containers/guide/auto_conf
[7]: /ko/containers/guide/ad_identifiers
[8]: /ko/containers/guide/autodiscovery-examples