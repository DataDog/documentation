---
app_id: mongodb
app_uuid: 54cca53a-3c87-4b53-beb4-fce95d1fcfb5
assets:
  dashboards:
    mongodb: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: mongodb.connections.available
      metadata_path: metadata.csv
      prefix: mongodb.
    process_signatures:
    - mongod
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 19
    source_type_name: MongoDB
  monitors:
    Connection pool is reaching saturation: assets/monitors/high_connections.json
    High query targeting: assets/monitors/high_query_targeting.json
    High queued readers: assets/monitors/high_queued_readers.json
    High queued writers: assets/monitors/high_queued_writers.json
    High replication lag: assets/monitors/high_replication_lag.json
    Low oplog window: assets/monitors/low_oplog_window.json
    Unhealthy replica set member: assets/monitors/unhealthy_repliset_member.json
    Used file system storage is reaching capacity: assets/monitors/high_fsstorage_usage.json
  saved_views:
    mongodb_processes: assets/saved_views/mongodb_processes.json
    operations_by_type_overview: assets/saved_views/operations_by_type_overview.json
    queries: assets/saved_views/queries.json
    queries_by_type_overview: assets/saved_views/queries_by_type_overview.json
    slow_queries: assets/saved_views/slow_queries.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- log collection
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/mongo/README.md
display_on_public_website: true
draft: false
git_integration_title: mongo
integration_id: mongodb
integration_title: MongoDB
integration_version: 8.5.0
is_public: true
manifest_version: 2.0.0
name: mongo
public_title: MongoDB
short_description: 읽기/쓰기 성능, 가장 많이 사용되는 복제본, 수집 메트릭 등을 추적하세요.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS:Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: 읽기/쓰기 성능, 가장 많이 사용되는 복제본, 수집 메트릭 등을 추적하세요.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-wiredtiger
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-mmap
  support: README.md#Support
  title: MongoDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![MongoDB 대시보드[1]

## 개요

MongoDB를 Datadog에 연결하면 다음을 수행할 수 있습니다.

- 주요 MongoDB 메트릭을 시각화합니다.
- MongoDB 성능과 나머지 애플리케이션의 상관관계를 파악합니다.

커스텀 `find`, `count`, `aggregate` 쿼리를 사용하여 고유한 메트릭을 만들 수도 있습니다.

[데이터베이스 모니터링][2](DBM)을 통해 쿼리 성능 및 데이터베이스 상태에 대한 인사이트를 얻을 수 있습니다. 표준 통합 외에도 Datadog DBM은 실시간 및 이전 쿼리 스냅샷, 느린 쿼리 메트릭, 데이터베이스 로드, 작업 실행 계획 및 컬렉션 인사이트를 제공합니다.

**참고**: 이 통합에는 MongoDB v3.0 이상이 필요합니다. MongoDB Atlas와 Datadog의 통합은 M10 이상 클러스터에서만 사용할 수 있습니다. 이 통합은 Alibaba ApsaraDB 및 AWS DocumentDB 인스턴스 기반 클러스터도 지원합니다. DocumentDB Elastic 클러스터는 클러스터(mongos) 엔드포인트만 노출하므로 지원되지 않습니다.

## 설정

<div class="alert alert-info">이 페이지에서는 표준 MongoDB Agent 통합에 대해 설명합니다. MongoDB용 데이터베이스 모니터링 제품을 찾고 있다면 <a href="https://docs.datadoghq.com/database_monitoring" target="_blank">Datadog 데이터베이스 모니터링</a>을 확인하세요.</div>

### 설치

MongoDB 점검은 [Datadog Agent][3] 패키지에 포함되어 있어 추가 설치가 필요하지 않습니다.

### 아키텍처

**참고**: MongoDB용 데이터베이스 모니터링을 설치하려면 [데이터베이스 모니터링 문서][4]에서 해당 호스팅 솔루션을 선택한 후 지침을 확인하세요.

대부분의 하위 수준 메트릭(가동 시간, 스토리지 크기 등)은 모든 mongod 노드에서 수집되어야 합니다. 기타 상위 수준 메트릭(컬렉션/인덱스 통계 등)는 한 번만 수집해야 합니다. 이러한 이유로  Agent를 구성하는 방법은 mongo 클러스터 배포 방법에 따라 달라집니다.

{{< tabs >}}
{{% tab "독립형" %}}
#### 독립형

단일 노드 MongoDB 배포에 대해 이 통합을 구성하려면 다음 지침을 따르세요.

##### MongoDB 준비
Mongo 셸에서 `admin` 데이터베이스의 Datadog Agent에 대한 읽기 전용 사용자를 만듭니다.

```shell
# 어드민 사용자로 인증합니다.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Datadog Agent에 대한 사용자를 만듭니다.
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUEPASSWORD>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "clusterMonitor", db: "admin" },
    { role: "read", db: "local" },
    #컬렉션/인덱스 통계를 수집하려는 데이터베이스에 대한 추가 읽기 전용 액세스 권한을 부여합니다.
    { role: "read", db: "mydb" },
    { role: "read", db: "myanotherdb" },
    # 또는 모든 데이터베이스에 읽기 전용 액세스 권한을 부여합니다.
    { role: "readAnyDatabase", db: "admin" }
  ]
})
```

##### Agent 구성
사용 가능한 모든 mongo 메트릭을 수집하려면 단일 Agent(가급적이면 동일한 노드에서 실행)만 필요합니다. 구성 옵션은 아래를 참조하세요.
{{% /tab %}}
{{% tab "복제본 세트" %}}
#### 복제본 세트

MongoDB 복제본 세트에 대해 이 통합을 구성하려면 다음 지침을 따르세요.

##### MongoDB 준비
Mongo 셸에서 기본 인증 후 `admin` 데이터베이스의 Datadog Agent에 대한 읽기 전용 사용자를 만듭니다.

```shell
# 어드민 사용자로 인증합니다.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Datadog Agent에 대한 사용자를 만듭니다.
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUEPASSWORD>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "clusterMonitor", db: "admin" },
    { role: "read", db: "local" },
    # 컬렉션/인덱스 통계를 수집하려는 데이터베이스에 대한 추가 읽기 전용 액세스 권한을 부여합니다.
    { role: "read", db: "mydb" },
    { role: "read", db: "myanotherdb" },
    # 또는 모든 데이터베이스에 읽기 전용 액세스 권한을 부여합니다.
    { role: "readAnyDatabase", db: "admin" }
  ]
})
```

##### Agent 구성

MongoDB 복제본 세트의 각 호스트에 Datadog  Agent를 설치하고 해당 호스트(`localhost`)의 복제본에 연결하도록 Agent를 구성합니다. 각 호스트에서  Agent를 실행하면 대기 시간과 실행 시간이 줄어들고 호스트에 장애가 발생하더라도 데이터가 계속 연결되어 있습니다.

예를 들어 기본 노드에서 다음을 수행합니다.

```yaml
init_config:
instances:
  - hosts:
      - mongo-primary:27017
```

2차 노드에서 다음을 수행합니다.

```yaml
init_config:
instances:
  - hosts:
      - mongo-secondary:27017
```

3차 노드에서 다음을 수행합니다.

```yaml
init_config:
instances:
  - hosts:
      - mongo-tertiary:27017
```

{{% /tab %}}
{{% tab "샤딩" %}}
#### 샤딩

MongoDB 샤드 클러스터에 대해 이 통합을 구성하려면 다음 지침을 따르세요.

##### MongoDB 준비
클러스터의 각 샤드에 대해 복제본 세트의 기본 샤드에 연결하고 `admin` 데이터베이스의 Datadog Agent에 대한 로컬 읽기 전용 사용자를 생성합니다.

```shell
# 어드민 사용자로 인증합니다.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Datadog Agent에 대한 사용자를 만듭니다.
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUEPASSWORD>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "clusterMonitor", db: "admin" },
    { role: "read", db: "local" }
  ]
})
```

그런 다음 mongos 프록시에서 동일한 사용자를 만듭니다. 이 작업을 수행하면 구성 서버에 로컬 사용자가 생성되고 직접 연결이 허용됩니다.

##### Agent 구성
1. 각 샤드의 각 구성원에 대해 하나의 Agent를 구성합니다.
2. 구성 서버의 각 구성원에 대해 하나의 Agent를 구성합니다.
3. mongos 프록시를 통해 클러스터에 연결하도록 하나의 추가 Agent를 구성합니다. 이 mongos 프록시는 모니터링 전용의 새로운 프록시이거나 기존 mongos 프록시일 수 있습니다.

**참고**: 중재자 노드 모니터링은 지원되지 않습니다(자세한 내용은 [MongoDB Replica Set Arbiter][1] 참조). 그러나 기본 노드에 연결된 Agent가 중재자 노드의 상태 변경을 보고합니다.

[1]: https://docs.mongodb.com/manual/core/replica-set-arbiter/#authentication
{{% /tab %}}
{{< /tabs >}}


### 설정

호스트에서 실행되는 경우 아래 지침에 따라 이 점검을 설정하세요. 컨테이너화된 환경 경우 [도커(Docker)](?tab=docker#docker), [쿠버네티스(Kubernetes)](?tab=kubernetes#kubernetes) 또는 [ECS](?tab=ecs#ecs) 섹션을 참조하세요.

{{< tabs >}}
{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

1. [Agent 구성 디렉터리][1] 루트의 `conf.d/` 폴더에 있는 `mongo.d/conf.yaml` 파일을 편집합니다. 사용 가능한 모든 구성 옵션은 [sample mongo.d/conf.yaml][2]을 참조하세요.

   ```yaml
   init_config:

   instances:
       ## @param hosts - list of strings - required
       ## Hosts to collect metrics from, as is appropriate for your deployment topology.
       ## E.g. for a standalone deployment, specify the hostname and port of the mongod instance.
       ## For replica sets or sharded clusters, see instructions in the sample conf.yaml.
       ## Only specify multiple hosts when connecting through mongos
       #
     - hosts:
         - <HOST>:<PORT>

       ## @param username - string - optional
       ## The username to use for authentication.
       #
       username: datadog

       ## @param password - string - optional
       ## The password to use for authentication.
       #
       password: <UNIQUEPASSWORD>

       ## @param database - string - optional
       ## The database to collect metrics from.
       #
       database: <DATABASE>

       ## @param options - mapping - optional
       ## Connection options. For a complete list, see:
       ## https://docs.mongodb.com/manual/reference/connection-string/#connections-connection-options
       #
       options:
         authSource: admin
   ```

2. [에이전트를 다시 시작합니다][3].

##### 데이터베이스 자동탐지

Datadog Agent v7.56부터 데이터베이스 자동탐지를 활성화하여 MongoDB 인스턴스의 모든 데이터베이스에서 메트릭을 자동으로 수집할 수 있습니다.
데이터베이스 자동탐지는 기본적으로 비활성화되어 있습니다. 메트릭을 수집하려면 자동탐지된 데이터베이스에 대한 읽기 액세스 권한이 필요합니다.
`mongo.d/conf.yaml` 파일에 다음 구성을 추가하여 활성화하세요.

```yaml
   init_config:

   instances:
       ## @param hosts - 문자열 목록 - 필수
       ## 배포 토폴로지에 적합하게 메트릭을 수집할 호스트입니다.
       ## 예: 독립형 배포의 경우 mongod 인스턴스의 호스트 이름과 포트를 지정합니다.
       ## 복제본 세트 또는 샤딩된 클러스터의 경우 샘플 conf.yaml의 지침을 참조하세요.
       ## mongos를 통해 연결하는 경우에만 여러 호스트를 지정하세요.
       #
     - hosts:
         - <HOST>:<PORT>

       ## @param username - 문자열 - 선택사항
       ## 인증에 사용할 사용자 이름입니다.
       #
       username: datadog

       ## @param password - 문자열 - 선택사항
       ## 인증에 사용할 비밀번호입니다.
       #
       password: <UNIQUE_PASSWORD>

       ## @param options - 매핑 - 선택 사항
       ## 연결 옵션. 전체 목록을 보려면 다음을 참조하세요.
       ## https://docs.mongodb.com/manual/reference/connection-string/#connections-connection-options
       #
       options:
         authSource: admin

       ## @param database_autodiscovery - 매핑 - 선택 사항
       ## 모든 MongoDB 데이터베이스에서 메트릭을 자동으로 수집하려면 데이터베이스 자동탐지를 활성화하세요.
       #
       database_autodiscovery:
         ## @param enabled - 부울 - 필수
         ## 데이터베이스 자동탐지를 활성화합니다.
         #
         enabled: true

         ## @param include - 문자열 목록 - 선택 사항
         ## 자동탐지에 포함할 데이터베이스 목록입니다. 여러 데이터베이스를 일치시키려면 정규 표현식을 사용하세요.
         ## 예를 들어 "mydb"로 시작하는 모든 데이터베이스를 포함하려면 "^mydb.*"를 사용합니다.
         ## 기본적으로 포함은 ".*"로 설정되며 모든 데이터베이스가 포함됩니다.
         #
         include:
            - "^mydb.*"

         ## @param exclude - 문자열 목록 - 선택 사항
         ## 자동탐지에서 제외할 데이터베이스 목록입니다. 여러 데이터베이스를 일치시키려면 정규 표현식을 사용하세요.
         ## 예를 들어 "mydb"로 시작하는 모든 데이터베이스를 제외하려면 "^mydb.*"를 사용합니다.
         ## 제외 목록이 포함 목록과 충돌하는 경우 제외 목록이 우선 적용됩니다.
         #
         exclude:
            - "^mydb2.*"
            - "admin$"

         ## @param max_databases - 정수 - 선택 사항
         ## 메트릭을 수집할 최대 데이터베이스 수입니다. 기본값은 100입니다.
         #
         max_databases: 100

         ## @param refresh_interval - 정수 - 선택 사항
         ## 데이터베이스 목록을 새로 고치는 간격(초)입니다. 기본값은 600초입니다.
         #
         refresh_interval: 600
   ```

2. [에이전트를 다시 시작합니다][3].

##### 트레이스 수집

Datadog APM은 Mongo와 통합되어 분산 시스템 전체의 트레이스를 확인합니다. Datadog Agent v6+에서는 트레이스 수집이 기본적으로 활성화되어 있습니다. 트레이스 수집을 시작하려면 다음 지침을 따르세요.

1. [Datadog에서 트레이스 수집을 활성화합니다][4].
2. [Mongo에 요청하는 애플리케이션을 계측합니다][5].

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

2. MongoDB 로그 수집을 시작하려면 `mongo.d/conf.yaml` 파일에 다음 구성 블록을 추가하세요.

   ```yaml
   logs:
     - type: file
       path: /var/log/mongodb/mongodb.log
       service: mongo
       source: mongodb
   ```

   `service` 및 `path` 파라미터 값을 변경하고 환경에 맞게 구성합니다. 사용 가능한 모든 구성 옵션은 [샘플 mongo.yaml][2]을 참조하세요.

3. [에이전트를 다시 시작합니다][3].

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ko/tracing/send_traces/
[5]: https://docs.datadoghq.com/ko/tracing/setup/
{{% /tab %}}
{{% tab "Docker" %}}

#### 도커(Docker)

컨테이너에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에 [자동탐지 통합 템플릿][1]을 Docker 레이블로 설정하세요.

```yaml
LABEL "com.datadoghq.ad.check_names"='["mongo"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"hosts": ["%%host%%:%%port%%"], "username": "datadog", "password" : "<UNIQUEPASSWORD>", "database": "<DATABASE>"}]'
```

##### 로그 수집

기본적으로 로그 수집은 Datadog 에이전트에서 비활성화되어 있습니다. 활성화하려면 [Docker 로그 수집][2]을 참고하세요.

그런 다음 Docker 레이블로 [로그 통합][3]을 설정하세요.

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"mongodb","service":"<SERVICE_NAME>"}]'
```

##### 트레이스 수집

컨테이너화된 앱용 APM은 Agent v6+에서 지원되지만 트레이스 수집을 시작하려면 추가 구성이 필요합니다.

Agent 컨테이너의 필수 환경 변수:

| 파라미터            | 값                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

사용 가능한 환경 변수 및 구성의 전체 목록은 [Docker 애플리케이션 추적][4]을 참조하세요.

그런 다음 [애플리케이션 컨테이너를 계측][5]하고 `DD_AGENT_HOST`를 Agent 컨테이너의 이름으로 설정합니다.


[1]: https://docs.datadoghq.com/ko/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/ko/agent/docker/apm/?tab=linux
[5]: https://docs.datadoghq.com/ko/tracing/setup/
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

쿠버네티스에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

[자동탐지 통합 템플릿][1]을 애플리케이션 컨테이너의 파드 주석으로 설정합니다. 이 외에도 템플릿은 [파일, 구성 맵 또는 키-값 저장소][2]를 사용하여 구성할 수도 있습니다.

**주석 v1**(Datadog 에이전트 v7.36 이하용)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mongo
  annotations:
    ad.datadoghq.com/mongo.check_names: '["mongo"]'
    ad.datadoghq.com/mongo.init_configs: '[{}]'
    ad.datadoghq.com/mongo.instances: |
      [
        {
          "hosts": ["%%host%%:%%port%%"],
          "username": "datadog",
          "password": "<UNIQUEPASSWORD>",
          "database": "<DATABASE>"
        }
      ]
spec:
  containers:
    - name: mongo
```

**주석 v2**(Datadog 에이전트 v7.36 이상용)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mongo
  annotations:
    ad.datadoghq.com/mongo.checks: |
      {
        "mongo": {
          "init_config": {},
          "instances": [
            {
              "hosts": ["%%host%%:%%port%%"],
              "username": "datadog",
              "password": "<UNIQUEPASSWORD>",
              "database": "<DATABASE>"
            }
          ]
        }
      }
spec:
  containers:
    - name: mongo
```

##### 로그 수집

Datadog 에이전트에서 기본적으로 로그 수집이 비활성화되어 있습니다. 활성화하려면 [쿠버네티스 로그 수집]을 확인하세요.

그런 다음 [로그 통합][4]을 포드 주석으로 설정합니다. 또한 [파일, configmap, 또는 key-value store][5]로 설정할 수 있습니다.

**주석 v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mongo
  annotations:
    ad.datadoghq.com/mongo.logs: '[{"source":"mongodb","service":"<SERVICE_NAME>"}]'
spec:
  containers:
    - name: mongo
```

##### 트레이스 수집

컨테이너화된 앱용 APM은 Agent v6+를 실행하는 호스트에서 지원되지만 트레이스 수집을 시작하려면 추가 구성이 필요합니다.

Agent 컨테이너의 필수 환경 변수:

| 파라미터            | 값                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

사용 가능한 환경 변수 및 구성의 전체 목록은 [Kubernetes 애플리케이션 추적][6] 및 [Kubernetes DaemonSet 설정][7]을 참조하세요.

그런 다음 [애플리케이션 컨테이너를 계측][8]하고 `DD_AGENT_HOST`를 Agent 컨테이너의 이름으로 설정합니다.

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/ko/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
[5]: https://docs.datadoghq.com/ko/agent/kubernetes/log/?tab=daemonset#configuration
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
    "name": "mongo",
    "image": "mongo:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"mongo\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"hosts\": [\"%%host%%:%%port%%\"], \"username\": \"datadog\", \"password\": \"<UNIQUEPASSWORD>\", \"database\": \"<DATABASE>\"}]"
    }
  }]
}
```

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

기본적으로 로그 수집은 Datadog 에이전트에서 비활성화되어 있습니다. 활성화하려면 [ECS 로그 수집][2]을 참조하세요.

그런 다음 Docker 레이블로 [로그 통합][3]을 설정하세요.

```json
{
  "containerDefinitions": [{
    "name": "mongo",
    "image": "mongo:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"mongodb\",\"service\":\"<SERVICE_NAME>\"}]"
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

사용 가능한 환경 변수 및 구성의 전체 목록은 [Docker 애플리케이션 추적][4]을 참조하세요.

그런 다음 [애플리케이션 컨테이너를 계측][5]하고 `DD_AGENT_HOST`를 [EC2 프라이빗 IP 주소][6]로 설정합니다.


[1]: https://docs.datadoghq.com/ko/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ko/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/ko/agent/docker/log/?tab=containerinstallation#log-integrations
[4]: https://docs.datadoghq.com/ko/agent/docker/apm/?tab=linux
[5]: https://docs.datadoghq.com/ko/tracing/setup/
[6]: https://docs.datadoghq.com/ko/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup
{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 상태 하위 명령을 실행][5]하고 Checks 섹션에서 `mongo`을 찾습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "mongodb" >}}


메트릭 일부에 대한 자세한 설명은 [MongoDB 3.0 매뉴얼][6]을 참조하세요.

#### 추가 메트릭

다음 메트릭은 기본적으로 수집되지 **않습니다**. `mongo.d/conf.yaml` 파일에서 `additional_metrics` 파라미터를 사용하여 수집합니다.

| 메트릭 접두사                     | 수집을 위해 `additional_metrics`에 추가해야 할 항목 |
| --------------------------------- | ------------------------------------------------- |
| mongodb.collection                | collection                                        |
| mongodb.usage.commands            | top                                               |
| mongodb.usage.getmore             | top                                               |
| mongodb.usage.insert              | top                                               |
| mongodb.usage.queries             | top                                               |
| mongodb.usage.readLock            | top                                               |
| mongodb.usage.writeLock           | top                                               |
| mongodb.usage.remove              | top                                               |
| mongodb.usage.total               | top                                               |
| mongodb.usage.update              | top                                               |
| mongodb.usage.writeLock           | top                                               |
| mongodb.tcmalloc                  | tcmalloc                                          |
| mongodb.metrics.commands          | metrics.commands                                  |
| mongodb.chunks.jumbo              | jumbo_chunks                                      |
| mongodb.chunks.total              | jumbo_chunks                                      |
| mongodb.sharded_data_distribution | sharded_data_distribution                         |

### 이벤트

**복제 상태 변경**:<br>
이 점검은 Mongo 노드의 복제 상태가 변경될 때마다 이벤트를 생성합니다.

### 서비스 점검
{{< get-service-checks-from-git "mongodb" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [MongoDB 성능 메트릭 모니터링 (WiredTiger)][8]
- [MongoDB 성능 메트릭 모니터링 (MMAP)][9]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/mongo/images/mongo_dashboard.png
[2]: https://docs.datadoghq.com/ko/database_monitoring/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ko/database_monitoring/#mongodb
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.mongodb.org/manual/reference/command/dbStats
[7]: https://docs.datadoghq.com/ko/help/
[8]: https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-wiredtiger
[9]: https://www.datadoghq.com/blog/monitoring-mongodb-performance-metrics-mmap
