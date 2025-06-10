---
further_reading:
- link: /agent/kubernetes/log/
  tag: 설명서
  text: 애플리케이션 로그 수집
- link: /agent/kubernetes/apm/
  tag: 설명서
  text: 애플리케이션 트레이스 수집
- link: /agent/kubernetes/prometheus/
  tag: 설명서
  text: 프로메테우스 메트릭 수집
- link: /agent/guide/autodiscovery-management/
  tag: 설명서
  text: 데이터 수집을 컨테이너의 하위 집합으로만 제한
- link: /agent/kubernetes/tag/
  tag: 설명서
  text: 컨테이너에서 내보내는 모든 데이터에 태그 할당
title: 'Autodiscovery: 시나리오 및 예시'
---

각 시나리오별 예시 템플릿을 통해 컨테이너화된 환경에서 통합이 어떻게 구성되는지 확인하세요.

- [모든 Redis 컨테이너에 Redis 통합](#redis-integration-for-all-redis-containers)
- [모든 Apache 컨테이너에 대한 HTTP Check와 Apache 통합](#apache-integration-and-http-check-on-apache-containers)

컨테이너 및 통합에 대한 자세한 내용은 [Docker 및 통합][2] 및 [Kubernetes 및 통합][3]을 참고하세요.

모든 예제는 Datadog의 Autodiscovery 기능을 활용합니다. 이 기능을 사용하면 지정된 컨테이너 세트에서 Agent 점검의 구성 템플릿을 정의할 수 있습니다. Autodiscovery에 관한 자세한 내용은 [컨테이너 시작하기: Autodiscovery][1]에서 확인하세요.

## 모든 Redis 컨테이너의 Redis 통합

이 시나리오에서는 컨테이너화된 환경에서 이름 `redis`와 일치하는 모든 컨테이너에 [Datadog-Redis 통합][5]을 설정하고 구성합니다. `redis`라는 컨테이너와 `my-custom-redis`라는 컨테이너가 있으며, **두** 컨테이너 모두에 Redis 통합을 구성하고자 합니다.

Redis 통합에 [기본 자동 설정][4]이 있지만 추가로 `password` 파라미터를 지정하고 로그 수집을 구성하려고 합니다.

**호스트**에서 이 통합을 설정한다고 가정할 때, 파라미터는 [`redisdb.d/conf.yaml.example`][6]을 참조하여 다음을 포함하는 `conf.yaml` 파일을 생성할 수 있습니다.

```yaml
init_config:
instances:
  - host: localhost
    port: 6379
    password: <PASSWORD>
logs:
  - type: file
    path: /var/log/redis_6379.log
    source: redis
    service: redis_service
```

`<PASSWORD>`는 연결에 사용할 비밀번호입니다.

이 구성을 Redis 컨테이너에 적용하려면 먼저 비밀번호를 `REDIS_PASSWORD`라는 환경 변수로 저장하고 다음을 실행합니다.

{{< tabs >}}
{{% tab "Kubernetes annotations" %}}

포드 매니페스트:

**Autodiscovery Annotations v2**(Datadog Agent v7.36 이상)

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
    ad.datadoghq.com/redis.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/redis_6379.log",
          "source": "redis",
          "service": "redis_service"
        }
      ]
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

**Autodiscovery Annotations v1** 

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
    ad.datadoghq.com/redis.logs: |
      [
        {
          "type": "file",
          "path": "/var/log/redis_6379.log",
          "source": "redis",
          "service": "redis_service"
        }
      ]
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

{{% /tab %}}
{{% tab "Docker labels" %}}

**docker-compose.yaml**

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
{{% tab "Local file" %}}
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
{{% tab "ConfigMap" %}}

ConfigMap:

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
    init_config:
    instances:
      - host: "%%host%%"
        port: "6379"
        password: "%%env_REDIS_PASSWORD%%"
    logs:
      - type: "file"
        path: "/var/log/redis_6379.log"
        source: "redis"
        service: "redis_service"
```

그런 다음 매니페스트에서 `volumeMounts`와 `volumes`를 정의합니다.

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

{{% /tab %}}
{{% tab "Datadog 연산자" %}}

`datadog-agent.yaml`:

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
      env: 
        - name: DD_IGNORE_AUTOCONF
          value: redisdb
      extraConfd:
        configDataMap:
          redisdb.yaml: |-
            ad_identifiers:
              - redis
            init_config:
            instances:
              - host: "%%host%%"
                port: 6379
                password: "%%env_REDIS_PASSWORD%%"
```
결과적으로 Agent의 `conf.d` 디렉터리에 위 구성을 가진 `redisdb.yaml` 파일이 포함됩니다.

**참고**: Redis 통합에는 [기본 자동 구성][1]이 포함되어 있으며, 이는 Datadog Operator 매니페스트에 설정된 구성보다 우선순위가 높습니다. 따라서 제공된 매니페스트 예시에서는 `DD_IGNORE_AUTOCONF` 변수를 사용하여 자동 구성을 비활성화합니다.

[1]: /ko/containers/guide/auto_conf
{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml`:

```yaml
datadog:
  ignoreAutoConfig:
    - redisdb
  confd:
    redisdb.yaml: |-
      ad_identifiers:
        - redis
      init_config:
      instances:
        - host: "%%host%%"
          port: 6379
          password: "%%env_REDIS_PASSWORD%%"
```
결과적으로 Agent는 `conf.d` 디렉토리에 위 구성을 가진 `redisdb.yaml` 파일을 포함합니다.

**참고**: Redis 통합은 [기본 자동 구성][1]을 포함하며, 이는 Helm 값에 설정된 구성보다 우선합니다. 이 때문에 예시에서는 `datadog.ignoreAutoConfig`를 사용하여 자동 구성을 비활성화합니다.

[1]: /ko/containers/guide/auto_conf
{{% /tab %}}
{{< /tabs >}}

다음 모든 예시에서는 [Autodiscovery 템플릿 변수][7]를 사용합니다:
- `%%host%%`는 컨테이너의 IP로 채워집니다.
- `%%env_REDIS_PASSWORD%%`는 Agent 프로세스가 인식하는 `REDIS_PASSWORD`라는 환경 변수로 채워집니다.

## Apache 통합 및 Apache 컨테이너의 HTTP Check

이 시나리오에서는 컨테이너화된 환경에서 이름 `apache`와 일치하는 모든 컨테이너에 [Datadog-Apache 통합][8]을 설정하고 구성합니다. 또한 `/website_1`과 `/website_2` 엔드포인트를 테스트하기 위한 [HTTP Check][9]도 설정합니다.

Apache 통합이 제공하는 [기본 자동 구성][4] 외에 [수집 간격][11]을 30초로 설정하려고 합니다.

**호스트에서** 이 통합을 구성한다고 가정하면 [`apache.d/conf.yaml.example`][10]과 [`http_check.d/conf.yaml.example`][12]의 구성 옵션을 참조할 수 있습니다. 두 `conf.yaml` 파일을 생성해야 합니다.

{{< code-block lang="yaml" filename="apache.d/conf.yaml" >}}
init_config:
instances:
  - apache_status_url: http://%%host%%/server-status?auto
    min_collection_interval: 30
{{< /code-block >}}

{{< code-block lang="yaml" filename="http_check.d/conf.yaml" >}}
init_config:
instances:
  - name: my_website_1
    url: http://%%host%%/website_1
    timeout: 1
  - name: my_website_2
    url: http://%%host%%/website_2
    timeout: 1
{{< /code-block >}}

{{< tabs >}}
{{% tab "Kubernetes annotations" %}}

**Autodiscovery Annotations v2** (Datadog Agent v7.36 이상)

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
              "apache_status_url": "http://%%host%%/server-status?auto",
              "min_collection_interval": 30
            }
          ]
        },
        "http_check": {
          "instances": [
            {
              "name": "my_website_1",
              "url": "http://%%host%%/website_1",
              "timeout": 1
            },
            {
              "name": "my_website_2",
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
  # (...)
```

**Autodiscovery Annotations v1** 

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
            "apache_status_url": "http://%%host%%/server-status?auto",
            "min_collection_interval": 30
          }
        ],
        [
          {
            "name": "my_website_1",
            "url": "http://%%host%%/website_1",
            "timeout": 1
          },
          {
            "name": "my_website_2",
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
  # (...)
```

{{% /tab %}}
{{% tab "Docker labels" %}}

**Dockerfile** 

Datadog Agent v7.36 이상:

```yaml
LABEL "com.datadoghq.ad.checks"='{"apache": {"instances": [{"apache_status_url": "http://%%host%%/server-status?auto", "min_collection_interval": 30}]}, "http_check":{"instances": [{"name":"my_website_1","url":"http://%%host%%/website_1","timeout":1},{"name":"my_website_2","url":"http://%%host%%/website_2","timeout":1}]}}'
```

이전 Agent 버전:
```dockerfile
LABEL "com.datadoghq.ad.check_names"='["apache", "http_check"]'
LABEL "com.datadoghq.ad.init_configs"='[{},{}]'
LABEL "com.datadoghq.ad.instances"='[[{"apache_status_url": "http://%%host%%/server-status?auto", "min_collection_interval": 30}],[{"name":"my_website_1","url":"http://%%host%%/website_1","timeout":1},{"name":"my_website_2","url":"http://%%host%%/website_2","timeout":1}]]'
```

{{% /tab %}}
{{% tab "Local file" %}}

* 호스트에서 `conf.d/`와 `conf.d/apache.d` 폴더를 생성하세요.
* 호스트에서 아래의 사용자 지정 자동 설정을 `conf.d/apache.d/conf.yaml`에 추가합니다.

```yaml
ad_identifiers:
  - apache

init_config:

instances:
  - apache_status_url: http://%%host%%/server-status?auto
    min_collection_interval: 30
```

* 다음으로 호스트에서 `conf.d/http_check.d` 폴더를 생성하세요.
* 호스트에서 아래의 사용자 지정 자동 설정을 `conf.d/http_check.d/conf.yaml`에 추가합니다.

```yaml
ad_identifiers:
  - apache

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

{{% /tab %}}
{{% tab "ConfigMap" %}}

다음 ConfigMap은 `apache` 및 `http_check` 컨테이너에 대한 통합 템플릿을 정의합니다:

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: apache-config-map
  namespace: default
data:
  apache-config: |-
    ad_identifiers:
      - apache
    init_config:
    instances:
      - apache_status_url: http://%%host%%/server-status?auto
        min_collection_interval: 30
  http-check-config: |-
    ad_identifiers:
      - apache
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
            name: apache-config-map
            items:
              - key: apache-config
                path: auto_conf.yaml
        - name: http-auto-config
          configMap:
            name: apache-config-map
            items:
              - key: http-check-config
                path: auto_conf.yaml
# [...]
```

{{% /tab %}}
{{% tab "Key-value store" %}}

```conf
etcdctl set /datadog/check_configs/apache/check_names '["apache", "http_check"]'
etcdctl set /datadog/check_configs/apache/init_configs '[{}, {}]'
etcdctl set /datadog/check_configs/apache/instances '[[{"apache_status_url": "http://%%host%%/server-status?auto", "min_collection_interval": 30}],[{"name": "<WEBSITE_1>", "url": "http://%%host%%/website_1", timeout: 1},{"name": "<WEBSITE_2>", "url": "http://%%host%%/website_2", timeout: 1}]]'
```

**참고**: 각 목록의 순서가 중요합니다. 에이전트는 설정의 모든 부분이 세 목록에 걸쳐 동일한 인덱스를 갖는 경우에만 HTTP 검사 설정을 올바르게 생성할 수 있습니다.

{{% /tab %}}
{{% tab "Datadog 연산자" %}}

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
      env:
        - name: DD_IGNORE_AUTOCONF
          value: apache
      extraConfd:
        configDataMap:
          apache.yaml: |-
            ad_identifiers:
              - apache
            init_config:
            instances:
              - apache_status_url: "http://%%host%%/server-status?auto"
                min_collection_interval: 30
          http_check.yaml: |-
            ad_identifiers:
              - apache
            init_config:
            instances:
              - name: "my_website_1"
                url: "http://%%host%%/website_1"
                timeout: 1
              - name: "my_website_2"
                url: "http://%%host%%/website_2"
                timeout: 1
```

**참고**: Apache 통합에는 [기본 자동 구성][1]이 포함되어 있으며, 이는 Datadog Operator 매니페스트에 설정된 구성보다 우선 순위가 높습니다. 따라서 제공된 매니페스트 예시에서는 `DD_IGNORE_AUTOCONF` 변수를 사용하여 자동 구성을 비활성화합니다.

[1]: /ko/containers/guide/auto_conf

{{% /tab %}}
{{% tab "Helm" %}}
`datadog-values.yaml`:

```yaml
datadog:
  ignoreAutoConfig:
    - apache
  confd:
    apache.yaml: |-
      ad_identifiers:
        - apache
      init_config:
      instances:
        - apache_status_url: "http://%%host%%/server-status?auto"
          min_collection_interval: 30
    http_check.yaml: |-
      ad_identifiers:
        - apache
      init_config:
      instances:
        - name: "my_website_1"
          url: "http://%%host%%/website_1"
          timeout: 1
        - name: "my_website_2"
          url: "http://%%host%%/website_2"
          timeout: 1
```

**참고**: Apache 통합에는 [기본 자동 구성][1]이 포함되어 있으며, 이는 Helm 값에 설정된 구성에 우선합니다. 따라서 제공된 예시에서는 `datadog.ignoreAutoConfig`을 사용하여 자동 구성을 비활성화합니다.

[1]: /ko/containers/guide/auto_conf

{{% /tab %}}
{{< /tabs >}}

다음 모든 예에서는 [Autodiscovery 템플릿 변수][7]를 사용합니다:
- `%%host%%`는 컨테이너의 IP로 채워집니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/getting_started/containers/autodiscovery
[2]: /ko/containers/docker/integrations
[3]: /ko/containers/kubernetes/integrations
[4]: /ko/containers/guide/auto_conf
[5]: /ko/integrations/redisdb
[6]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[7]: /ko/containers/guide/template_variables/
[8]: /ko/integrations/apache
[9]: /ko/integrations/http_check/
[10]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[11]: /ko/developers/write_agent_check/#updating-the-collection-interval
[12]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example