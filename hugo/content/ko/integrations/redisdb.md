---
app_id: redis
app_uuid: 15f0ff37-2b36-4165-9606-758271d4a16d
assets:
  dashboards:
    redis: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: redis.net.clients
      metadata_path: metadata.csv
      prefix: redis.
    process_signatures:
    - redis-server
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21
    source_type_name: Redis
  monitors:
    Memory consumption is high: assets/monitors/high_mem.json
  saved_views:
    error_warning_status: assets/saved_views/error_warning_status.json
    pid_overview: assets/saved_views/pid_overview.json
    redis_pattern: assets/saved_views/redis_pattern.json
    redis_processes: assets/saved_views/redis_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- data stores
- log collection
- tracing
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/redisdb/README.md
display_on_public_website: true
draft: false
git_integration_title: redisdb
integration_id: redis
integration_title: Redis
integration_version: 7.2.0
is_public: true
manifest_version: 2.0.0
name: redisdb
public_title: Redis
short_description: Redis 성능, 메모리 사용, 차단된 클라이언트, 삭제된 키 등을 추적하세요.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Category::Log Collection
  - Category::Tracing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Redis 성능, 메모리 사용, 차단된 클라이언트, 삭제된 키 등을 추적하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: 블로그
    url: https://www.datadoghq.com/blog/how-to-monitor-redis-performance-metrics
  support: README.md#Support
  title: Redis
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 개요

Redis를 데이터베이스, 캐시 또는 메시지 큐로 사용하든 관계없이, 본 통합은 Redis 서버, 클라우드 서비스, 제공하는 인프라스트럭처 일부의 문제를 추적합니다. Datadog 에이전트의 Redis 점검을 사용하여 다음과 관련된 메트릭 정보를 수집합니다.

- 성능
- 메모리 사용량
- 차단된 클라이언트
- 보조 연결
- 디스크 영속성
- 만료 및 삭제된 키
- 그 외 기타

## 설정

### 설치

Redis 점검은 [Datadog 에이전트][1] 패키지에 포함되어 있으므로 Redis 서버에 추가 설치할 필요가 없습니다.

### 설정

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

##### 메트릭 수집

1. [에이전트 설정 디렉토리][1]의 루트에 있는 `conf.d/` 폴더에서 `redisdb.d/conf.yaml` 파일을 편집합니다. 다음 파라미터를 업데이트해야 할 수도 있습니다. 사용 가능한 모든 설정 옵션은 [redisdb.d/conf.yaml 샘플][2]을 참조하세요.

   ```yaml
   init_config:
   instances:
     ## @param host - string - required
     ## Enter the host to connect to.
     - host: localhost
       ## @param port - integer - required
       ## Enter the port of the host to connect to.
       port: 6379

       ## @param username - string - optional
       ## The username to use for the connection. Redis 6+ only.
       #
       # username: <USERNAME>

       ## @param password - string - optional
       ## The password to use for the connection.
       #
       # password: <PASSWORD>
   ```

2. Redis 6+ 및 ACL을 사용한다면 사용자에게 최소 데이터베이스 수준 `DB  Viewer` 권한, 클러스터 환경에서 작동하는 경우 `Cluster Viewer` 권한, `+config|get +info +slowlog|get` ACL 규칙이 있는지 확인하세요. 자세한 내용은 [데이터베이스 액세스 제어][3]를 참조하세요.

3. [에이전트를 재시작합니다][4].

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

1. Datadog 에이전트에서 로그 수집은 기본적으로 사용하지 않도록 설정되어 있습니다. `datadog.yaml`파일에서 로그 수집을 사용하도록 설정합니다.

   ```yaml
   logs_enabled: true
   ```

2. `redisdb.d/conf.yaml`의 하단에서 이 설정 블록의 주석 처리를 제거하고 편집합니다.

   ```yaml
   logs:
     - type: file
       path: /var/log/redis_6379.log
       source: redis
       service: myapplication
   ```

    `path`와 `service` 파라미터 값을 내 환경에 맞게 변경 및 설정하세요. 사용할 수 있는 설정 옵션 전체를 보려면 [redisdb.yaml 샘플][2]을 참고하세요.

3. [에이전트를 재시작합니다][4].

##### 트레이스 수집

Datadog APM은 Redis와 통합되어 분산 시스템 전체의 트레이스를 확인합니다. Datadog 에이전트 v6+에서는 트레이스 수집이 기본적으로 활성화되어 있습니다. 트레이스 수집을 시작하려면 다음 지침을 따르세요.

1. [Datadog에서 트레이스 수집을 활성화합니다][5].
2. [Redis에 요청하는 애플리케이션을 계측합니다][6].


[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[3]: https://docs.redis.com/latest/rs/security/passwords-users-roles/
[4]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ko/tracing/send_traces/
[6]: https://docs.datadoghq.com/ko/tracing/setup/
{{% /tab %}}
{{% tab "Docker" %}}

#### 도커(Docker)

컨테이너에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에 [자동탐지 통합 템플릿][1]을 Docker 레이블로 설정하세요.

```yaml
LABEL "com.datadoghq.ad.check_names"='["redisdb"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"host":"%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

**참고**: `"%%env_<ENV_VAR>%%"` 템플릿 변수 로직은 암호를 일반 텍스트로 저장하지 않기 위해 사용하므로, `REDIS_PASSWORD` 환경 변수가 에이전트 컨테이너에 설정되어야 합니다. 자세한 내용은 [자동 탐지 템플릿 변수][2] 설명서를 참조하세요. 또는 에이전트는 `secrets` 패키지를 활용하여 모든 [시크릿 관리][3] 백엔드(예: HashiCorp Vault 또는 AWS Secrets Manager)를 사용할 수 있습니다.

##### 로그 수집

_Agent 버전 6.0 이상에서 사용 가능_

기본적으로 로그 수집은 Datadog 에이전트에서 비활성화되어 있습니다. 활성화하려면 [도커(Docker) 로그 수집][4]을 참고하세요.

그런 다음 도커(Docker) 레이블로 [로그 통합][5]을 설정하세요.

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"redis","service":"<YOUR_APP_NAME>"}]'
```

##### 트레이스 수집

컨테이너화된 앱용 APM은 Agent v6+에서 지원되지만 트레이스 수집을 시작하려면 추가 구성이 필요합니다.

Agent 컨테이너의 필수 환경 변수:

| 파라미터            | 값                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

사용 가능한 환경 변수 및 설정의 전체 목록은 [도커(Docker) 애플리케이션 추적][6]을 참조하세요.

그런 다음 [Redis에 요청하는 애플리케이션 컨테이너를 계측][7]하고 `DD_AGENT_HOST`를 에이전트 컨테이너의 이름으로 설정합니다.


[1]: https://docs.datadoghq.com/ko/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ko/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/ko/agent/guide/secrets-management/?tab=linux
[4]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#installation
[5]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
[6]: https://docs.datadoghq.com/ko/agent/docker/apm/?tab=linux
[7]: https://docs.datadoghq.com/ko/tracing/setup/
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### 쿠버네티스(Kubernetes)

쿠버네티스에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

메트릭을 수집하려면 다음 파라미터와 값을 [자동탐지 템플릿][1]에 설정합니다. Redis 포드의 쿠버네티스 어노테이션(아래 표시) 또는 [로컬 파일, ConfigMap, 키-값 저장소, Datadog Operator 매니페스트 또는 헬름(Helm) 차트][2]를 통해 이를 수행할 수 있습니다.

| 파라미터            | 값                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `["redisdb"]`                                                              |
| `<INIT_CONFIG>`      | `[{}]`                                                                     |
| `<INSTANCE_CONFIG>`  | `[{"host": "%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]` |

**주석 v1**(Datadog 에이전트 v7.36 이하용)

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

**주석 v2**(Datadog 에이전트 v7.36 이상용)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.checks: |
      {
        "redisdb": {
          "init_config": {},
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

**참고**: `"%%env_<ENV_VAR>%%"` 템플릿 변수 로직은 암호를 일반 텍스트로 저장하지 않기 위해 사용하므로, `REDIS_PASSWORD` 환경 변수가 에이전트 컨테이너에 설정되어야 합니다. [자동 탐지 템플릿 변수][3] 설명서를 참조하세요. 또는 에이전트는 `secrets` 패키지를 활용하여 모든 [시크릿 관리][4] 백엔드(예: HashiCorp Vault 또는 AWS Secrets Manager)를 사용할 수 있습니다.

##### 로그 수집

_에이전트 버전 6.0 이상에서 사용 가능_

Datadog 에이전트에서 로그 수집은 기본값으로 비활성화되어 있습니다. 이를 활성화하려면 [쿠버네티스(Kubernetes) 로그 수집][5]을 참조하세요.

그런 다음 [자동탐지 템플릿][1]에서 다음을 파라미터를 설정합니다. Redis 포드에서 쿠버네티스(Kubernetes) 어노테이션(아래 표시)을 사용하거나 [로컬 파일, ConfigMap, 키-값 저장소, Datadog Operator 매니페스트 또는 헬름(Helm) 차트][2]를 사용하여 이 작업을 수행할 수 있습니다.

| 파라미터            | 값                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<LOG_CONFIG>`       | `[{"source":"redis","service":"<YOUR_APP_NAME>"}]`                         |

**주석 v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.logs: '[{"source":"redis","service":"<YOUR_APP_NAME>"}]'
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

##### 트레이스 수집

컨테이너화된 앱용 APM은 Agent v6+를 실행하는 호스트에서 지원되지만 트레이스 수집을 시작하려면 추가 구성이 필요합니다.

Agent 컨테이너의 필수 환경 변수:

| 파라미터            | 값                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

사용 가능한 환경 변수 및 구성의 전체 목록은 [Kubernetes 애플리케이션 추적][6] 및 [Kubernetes 데몬 설정][7]을 참조하세요.

그런 다음 [Redis에 요청하는 애플리케이션 컨테이너를 계측][8]합니다.

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/ko/agent/faq/template_variables/
[4]: https://docs.datadoghq.com/ko/agent/guide/secrets-management/?tab=linux
[5]: https://docs.datadoghq.com/ko/agent/kubernetes/log/?tab=containerinstallation#setup
[6]: https://docs.datadoghq.com/ko/agent/kubernetes/apm/?tab=java
[7]: https://docs.datadoghq.com/ko/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[8]: https://docs.datadoghq.com/ko/tracing/setup/
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

ECS에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에 [자동탐지 통합 템플릿][1]을 Docker 레이블로 설정하세요.

```json
{
  "containerDefinitions": [{
    "name": "redis",
    "image": "redis:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"redisdb\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"host\":\"%%host%%\",\"port\":\"6379\",\"password\":\"%%env_REDIS_PASSWORD%%\"}]"
    }
  }]
}
```

**참고**: `"%%env_<ENV_VAR>%%"` 템플릿 변수 로직은 암호를 일반 텍스트로 저장하지 않기 위해 사용하므로, `REDIS_PASSWORD` 환경 변수가 에이전트 컨테이너에 설정되어야 합니다. [자동 탐지 템플릿 변수][2] 설명서를 참조하세요. 또는 에이전트는 `secrets` 패키지를 활용하여 모든 [시크릿 관리][3] 백엔드(예: HashiCorp Vault 또는 AWS Secrets Manager)를 사용할 수 있습니다.

##### 로그 수집

_에이전트 버전 6.0 이상에서 사용 가능_

기본적으로 로그 수집은 Datadog 에이전트에서 비활성화되어 있습니다. 활성화하려면 [ECS 로그 수집][4]을 참조하세요.

그런 다음 도커(Docker) 레이블로 [로그 통합][5]을 설정하세요.

```yaml
{
  "containerDefinitions": [{
    "name": "redis",
    "image": "redis:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"redis\",\"service\":\"<YOUR_APP_NAME>\"}]"
    }
  }]
}
```

##### 트레이스 수집

컨테이너화된 앱용 APM은 Agent v6+에서 지원되지만 트레이스 수집을 시작하려면 추가 구성이 필요합니다.

Agent 컨테이너의 필수 환경 변수:

| 파라미터            | 값                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

사용 가능한 환경 변수 및 설정의 전체 목록은 [도커(Docker) 애플리케이션 추적][6]을 참조하세요.

그런 다음 [Redis에 요청하는 애플리케이션 컨테이너를 계측][7]하고 `DD_AGENT_HOST`를 [EC2 비공개 IP 주소][8]로 설정합니다.

[1]: https://docs.datadoghq.com/ko/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ko/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/ko/agent/guide/secrets-management/?tab=linux
[4]: https://docs.datadoghq.com/ko/agent/amazon_ecs/logs/?tab=linux
[5]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
[6]: https://docs.datadoghq.com/ko/agent/docker/apm/?tab=linux
[7]: https://docs.datadoghq.com/ko/tracing/setup/
[8]: https://docs.datadoghq.com/ko/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup
{{% /tab %}}
{{< /tabs >}}

### 검증

[에이전트 상태 하위 명령을 실행][2]하고 점검 섹션에서 `redisdb`를 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "redis" >}}


### 이벤트

Redis 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "redis" >}}


## 트러블슈팅

### 에이전트 연결 불가

```shell
    redisdb
    -------
      - instance #0 [ERROR]: 'Error 111 connecting to localhost:6379. Connection refused.'
      - Collected 0 metrics, 0 events & 1 service check
```

`redisdb.yaml`의 연결 정보가 올바른지 확인합니다.

### 에이전트를 인증할 수 없음

```shell
    redisdb
    -------
      - instance #0 [ERROR]: 'NOAUTH Authentication required.'
      - Collected 0 metrics, 0 events & 1 service check
```

`redisdb.yaml`에서 `password`를 설정합니다.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Redis 성능 메트릭을 모니터링하는 방법][3]


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.datadoghq.com/blog/how-to-monitor-redis-performance-metrics
