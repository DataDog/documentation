---
aliases:
- /ko/agent/docker/integrations
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
kind: 설명서
title: 도커 통합 자동 탐지
---

<div class="alert alert-info">
이 기능에 대해 자세히 알아보려면 <a href="/getting_started/agent/autodiscovery">자동 탐지 시작 설명서</a>를 확인하세요.
</div>

이 페이지에서는 도커와의 통합을 위해 자동 탐지를 어떻게 설정해야 하는지를 다룹니다 . 쿠버네티스를 사용하는 경우 [쿠버네티스 통합 자동 탐지 설명서][1]을 참조하세요.

자동 탐지의 목표는 지정된 컨테이너에 대해 에이전트 검사를 실행할 때 Datadog 통합 설정을 적용하는 것입니다. 이에 대한 자세한 내용은 호스트에서 에이전트를 실행할 때의 [에이전트 통합 설정][2]을 참조하세요.

자동 탐지와의 통합을 설정하려면 다음 매개 변수를 사용합니다:

| 파라미터            | 필수 | 설명                                                                                       |
|----------------------|----------|---------------------------------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | 예      | Datadog 통합 이름                                                                   |
| `<INIT_CONFIG>`      | 예      | 지정된 Datadog-`<INTEGRATION_NAME>`에 대한 `init_config:` 섹션 설정           |
| `<INSTANCE_CONFIG>`  | 예      | 지정된 Datadog-`<INTEGRATION_NAME>`에 대한 `instances:` 섹션 설정             |

**참고**: `<INIT_CONFIG>`는 Datadog 에이전트 7.36에 도입된 자동 탐지 v2에 필요하지 않습니다.

아래 섹션의 각 탭은 지정된 컨테이너에 통합 템플릿을 적용하는 다른 방법을 보여줍니다. 사용 가능한 방법은 다음과 같습니다:

* [도커 라벨](?tab=docker#configuration)
* [에이전트 내에서 마운트 된 설정 파일](?tab=file#configuration)
* [키-값 저장소](?tab=keyvaluestore#configuration)

**참고**: 지원되는 일부 통합은 [Ceph][4], [Varnish][5], [Postfix][6], [Cassandra Nodetools][7] 및 [Gunicorn][8]과 같은 파일 시스템 액세스 또는 프로세스 트리 데이터가 필요하기 때문에 표준 자동 탐지와 함께 작동하지 않습니다. 이러한 통합에 대해 자동 탐지를 실행하려면 컨테이너에서 공식 Prometheus 익스포터를 사용한 다음 에이전트에서 자동 탐지를 사용하여 컨테이너를 찾고 엔드포인트를 쿼리하세요.

## 설정

{{< tabs >}}
{{% tab "Docker (AD v2)" %}}

**참고**: AD Annotations v2는 통합 설정을 단순화하기 위해 Datadog 에이전트 7.36에 도입되었습니다. 이전 버전의 Datadog 에이전트인 경우 AD Annotations v1을 사용합니다.

도커 컨테이너를 통해 자동 탐지를 자동으로 실행하려면 컨테이너화된 에이전트에 `/var/run/docker.sock` 를 마운트합니다. Windows에서는 `\\.\pipe\docker_engine` 을 마운트합니다.

통합 템플릿은 도커 라벨로 저장될 수 있습니다. 자동 탐지를 사용하면 에이전트가 도커에서 실행 중인지를 탐지하고 모든 라벨에서 통합 템플릿을 자동으로 검색합니다. 자동 탐지에서는 라벨이 다음과 같이 표시될 것으로 예상합니다:

**도커파일**:

```yaml
LABEL "com.datadoghq.ad.checks"='{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>]}}'
```

**docker-compose.yaml**:

```yaml
labels:
  com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>]}}'
```

**`docker run`, `nerdctl run`, 또는 `podman run` 명령 사용**:

```shell
-l com.datadoghq.ad.checks="{\"<INTEGRATION_NAME>\": {\"instances\": [<INSTANCE_CONFIG>]}}"
```

**참고**: 이러한 라벨을 설정하는 동안 JSON에서 벗어날 수 있습니다. 예:
```shell
docker run --label "com.datadoghq.ad.checks="{\"apache\": {\"instances\": [{\"apache_status_url\":\"http://%%host%%/server-status?auto2\"}]}}"
```

**도커 스웜**:

도커 클라우드(Docker Cloud)에서 스웜 모드를 사용한다면 라벨을 이미지에 적용해야 합니다.

```yaml
version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.checks: '{"<INTEGRATION_NAME>": {"instances": [<INSTANCE_CONFIG>]}}'

```

**참고**: 자동 탐지를 설정할 때 Datadog은 컨테이너화된 환경 전체에서 텔레메트리를 통합하기 위해 도커 라벨을 사용할 것을 권장합니다. 자세한 내용은 [통합 서비스 태깅][1] 설명서를 참조하세요.


[1]: /ko/getting_started/tagging/unified_service_tagging/?tab=docker
{{% /tab %}}
{{% tab "Docker (AD v1)" %}}

Docker 컨테이너에서 자동적으로 자동탐지를 활성화하려면 `/var/run/docker.sock`을 컨테이너화 Agent에 마운트하세요. Windows의 경우에는 `\\.\pipe\docker_engine`를 마운트하세요.

통합 템플릿은 도커 라벨로 저장될 수 있습니다. 자동 탐지를 사용하면 에이전트가 도커에서 실행 중인지를 탐지하고 모든 라벨에서 통합 템플릿을 자동으로 검색합니다. 자동 탐지에서는 라벨이 다음과 같이 표시될 것으로 예상합니다:

**도커파일**:

```yaml
LABEL "com.datadoghq.ad.check_names"='[<INTEGRATION_NAME>]'
LABEL "com.datadoghq.ad.init_configs"='[<INIT_CONFIG>]'
LABEL "com.datadoghq.ad.instances"='[<INSTANCE_CONFIG>]'
```

**docker-compose.yaml**:

```yaml
labels:
  com.datadoghq.ad.check_names: '[<INTEGRATION_NAME>]'
  com.datadoghq.ad.init_configs: '[<INIT_CONFIG>]'
  com.datadoghq.ad.instances: '[<INSTANCE_CONFIG>]'
```

**`docker run`, `nerdctl run`, 또는 `podman run` 명령 사용**:

```shell
-l com.datadoghq.ad.check_names='[<INTEGRATION_NAME>]' -l com.datadoghq.ad.init_configs='[<INIT_CONFIG>]' -l com.datadoghq.ad.instances='[<INSTANCE_CONFIG>]'
```

**참고**: 이러한 라벨을 설정하는 동안 JSON에서 벗어날 수 있습니다. 예:
```shell
docker run --label "com.datadoghq.ad.check_names=[\"redisdb\"]" --label "com.datadoghq.ad.init_configs=[{}]" --label "com.datadoghq.ad.instances=[{\"host\":\"%%host%%\",\"port\":6379}]" --label "com.datadoghq.ad.logs=[{\"source\":\"redis\"}]" --name redis redis
```

**도커 스웜**:

도커 클라우드(Docker Cloud)에서 스웜 모드를 사용한다면 라벨을 이미지에 적용해야 합니다.

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

```

**참고**: 자동 탐지를 설정할 때 Datadog은 컨테이너화된 환경 전체에서 텔레메트리를 통합하기 위해 도커 라벨을 사용할 것을 권장합니다. 자세한 내용은 [통합 서비스 태깅][1] 설명서를 참조하세요.


[1]: /ko/getting_started/tagging/unified_service_tagging/?tab=docker
{{% /tab %}}
{{% tab "File" %}}

템플릿을 로컬 파일로 저장하고 컨테이너화된 에이전트 내부에 마운트 할 경우 외부 서비스나 특정 오케스트레이션 플랫폼이 필요하지 않습니다. 단점은 템플릿을 변경, 추가 또는 제거할 때마다 에이전트 컨테이너를 재시작해야 한다는 것입니다. 에이전트는 마운트 된 `/conf.d` 디렉토리에서 자동 탐지 템플릿을 찾습니다.

에이전트 v6.2.0(및 v5.24.0) 이후 기본 템플릿은 모니터링되는 소프트웨어를 자동으로 감지하는 대신 해당 소프트웨어의 기본 포트를 사용합니다. 다른 포트를 사용해야 하는 경우, [도커 컨테이너 라벨](?tab=docker-labels)에서 사용자 지정 자동 탐지 템플릿을 사용하세요.

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
[2]: /ko/agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}

## 예시

### Datadog Redis 통합 

{{< tabs >}}
{{% tab "Docker" %}}

다음 `docker-compose.yml` 파일은 사용자 지정 `password` 매개 변수를 사용하여 올바른 Redis 통합 템플릿을 적용합니다:

```yaml
labels:
  com.datadoghq.ad.check_names: '["redisdb"]'
  com.datadoghq.ad.init_configs: '[{}]'
  com.datadoghq.ad.instances: '[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

{{% /tab %}}
{{% tab "File" %}}

Redis는 에이전트와 함께 패키징된 기본 자동 탐지 템플릿 중 하나이므로 이 파일을 마운트할 필요가 없습니다. 다음 Redis 템플릿은 에이전트와 함께 패키징됩니다:

```yaml
ad_identifiers:
  - redis

init_config:

instances:

  - host: "%%host%%"
    port: "6379"
```

이는 최소한의 [Redis 통합 설정][1]처럼 보이지만 `ad_identifiers` 옵션에 주목할 필요가 있습니다. 이 필수 옵션을 사용하여 컨테이너 식별자를 제공할 수 있습니다. 자동 탐지는 `redis` 이미지를 실행하는 동일한 호스트의 모든 컨테이너에 이 템플릿을 적용합니다. 자세한 내용은 [자동 탐지 식별자][2] 설명서를 참조하세요.

Redis에서 해당 통계 엔드포인트에 액세스할 때 추가 `password`가 필요한 경우:

1. 호스트에 `conf.d/`와 `conf.d/redisdb.d` 폴더를 생성합니다.
2. 호스트에서 아래 사용자 지정 자동 설정을 `conf.d/redisdb.d/conf.yaml`에 추가합니다.
3. 호스트 `conf.d/` 폴더를 컨테이너화된 에이전트 `conf.d/` 폴더에 마운트합니다.

```yaml
ad_identifiers:
  - redis

init_config:

instances:

  - host: "%%host%%"
    port: "6379"
    password: "%%env_REDIS_PASSWORD%%"
```

**참고**: `"%%env_<ENV_VAR>%%"` 템플릿 변수 로직은 암호를 일반 텍스트로 저장하지 않기 위해 사용되므로 `REDIS_PASSWORD` 환경 변수가 에이전트에게 전달되어야 합니다. [자동 탐지 템플릿 변수 설명서][3]를 참조하세요.

[1]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/auto_conf.yaml
[2]: /ko/agent/guide/ad_identifiers/
[3]: /ko/agent/faq/template_variables/
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

자동 설정 파일과 달리 **키-값 저장소는 컨테이너 식별자로 짧거나 긴 이미지 이름을 사용할 수 있습니다.** (예: `redis` 또는 `redis:latest`)

[1]: /ko/agent/faq/template_variables/
{{% /tab %}}
{{< /tabs >}}

### Datadog Apache 및 HTTP 검사 통합

아래 설정은 `<CONTAINER_IDENTIFIER>`:`httpd`를 사용하여  Apache 컨테이너 이미지에 적용됩니다. 자동 탐지 템플릿은 Apache 컨테이너에서 메트릭을 수집하고 두 개의 엔드포인트를 테스트하기 위해 인스턴스로 Datadog-HTTP 검사를 설정하도록 구성되어 있습니다.

검사 이름은 `apache`, `http_check`, `<INIT_CONFIG>` 및 `<INSTANCE_CONFIG>` 입니다. 전체 설정은 해당 설명서 페이지: [Datadog-Apache 통합][9], [Datadog-HTTP 검사 통합][10]에서 확인할 수 있습니다.

{{< tabs >}}
{{% tab "Docker" %}}

```yaml
labels:
  com.datadoghq.ad.check_names: '["apache", "http_check"]'
  com.datadoghq.ad.init_configs: '[{},{}]'
  com.datadoghq.ad.instances: '[[{"apache_status_url": "http://%%host%%/server-status?auto"}],[{"name":"<WEBSITE_1>","url":"http://%%host%%/website_1","timeout":1},{"name":"<WEBSITE_2>","url":"http://%%host%%/website_2","timeout":1}]]'
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

[1]: /ko/agent/kubernetes/integrations/
[2]: /ko/getting_started/integrations/#configuring-agent-integrations
[3]: /ko/integrations/#cat-autodiscovery
[4]: /ko/integrations/ceph/
[5]: /ko/integrations/varnish/#autodiscovery
[6]: /ko/integrations/postfix/
[7]: /ko/integrations/cassandra/#agent-check-cassandra-nodetool
[8]: /ko/integrations/gunicorn/
[9]: /ko/integrations/apache/#setup
[10]: /ko/integrations/http_check/#setup