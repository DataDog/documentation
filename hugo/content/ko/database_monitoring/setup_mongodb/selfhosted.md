---
further_reading:
- link: /integrations/mongo/
  tag: 문서
  text: 기본 MongoDB 통합
title: 자체 호스팅 MongoDB에 대한 Database Monitoring 설정
---
Database Monitoring은 중요한 메트릭, 느린 작업, 작업 샘플, 실행 계획 및 복제 상태 변경에 대한 액세스를 제공하여 MongoDB 데이터베이스에 대한 포괄적인 인사이트를 제공합니다. MongoDB용 Database Monitoring을 활용하려면 Datadog Agent가 설치되어 있고 MongoDB 인스턴스에 연결하도록 구성되어 있는지 확인하세요. 이 가이드는 자체 호스팅 MongoDB에 대한 Database Monitoring을 설정하는 단계를 설명합니다.

## 시작 전 참고 사항 {#before-you-begin}

지원되는 MongoDB 주요 버전
: 4.4, 5.0, 6.0, 7.0, 8.0

지원되는 MongoDB 에디션
: Community, Enterprise

{{% dbm-mongodb-before-you-begin %}}

## 설정 {#setup}

데이터베이스에서 Database Monitoring을 활성화하려면 다음 단계를 따르세요.

1. [Agent에 MongoDB 인스턴스에 대한 액세스 권한을 부여](#grant-the-agent-access-to-your-mongodb-instances)
2. [Agent 설치 및 구성](#install-and-configure-the-agent)

### Agent에 MongoDB 인스턴스에 대한 액세스 권한을 부여 {#grant-the-agent-access-to-your-mongodb-instances}

Datadog Agent가 통계와 쿼리를 수집하려면 MongoDB 인스턴스에 대한 읽기 전용 액세스 권한이 필요합니다.

{{< tabs >}}
{{% tab "독립형" %}}

Mongo 셸에서 MongoDB 인스턴스를 인증하고, `admin` 데이터베이스에서 Datadog Agent용 읽기 전용 사용자를 생성한 다음, 필요한 권한을 부여합니다.

{{< code-block lang="shell" >}}
# Authenticate as the admin user.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Create the user for the Datadog Agent.
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUE_PASSWORD>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "read", db: "local" },
    { role: "clusterMonitor", db: "admin" }
  ]
})
{{< /code-block >}}

모니터링하려는 데이터베이스의 `datadog` 사용자에게 추가 권한을 부여합니다.

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "read", db: "mydatabase" },
  { role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

또는 모든 데이터베이스를 모니터링하기 위해 `admin` 데이터베이스의 `datadog` 사용자에게 `readAnyDatabase` 역할을 부여할 수 있습니다.

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

{{% /tab %}}
{{% tab "복제본 세트" %}}

Mongo 셸에서 복제본 세트의 기본 노드를 인증하고, `admin` 데이터베이스에서 Datadog Agent용 읽기 전용 사용자를 생성한 다음, 필요한 권한을 부여합니다.

{{< code-block lang="shell" >}}
# Authenticate as the admin user.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Create the user for the Datadog Agent.
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUE_PASSWORD>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "read", db: "local" },
    { role: "clusterMonitor", db: "admin" }
  ]
})
{{< /code-block >}}

모니터링하려는 데이터베이스의 `datadog` 사용자에게 추가 권한을 부여합니다.

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "read", db: "mydatabase" },
  { role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

또는 모든 데이터베이스를 모니터링하기 위해 `admin` 데이터베이스의 `datadog` 사용자에게 `readAnyDatabase` 역할을 부여할 수 있습니다.

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

{{% /tab %}}
{{% tab "샤드 클러스터" %}}

1. 클러스터의 각 샤드에 대해 샤드의 기본 노드에 연결하고, `admin` 데이터베이스에서 Datadog Agent용 읽기 전용 사용자를 생성한 다음, 필요한 권한을 부여합니다.

{{< code-block lang="shell" >}}
# Authenticate as the admin user.
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Create the user for the Datadog Agent.
db.createUser({
  "user": "datadog",
  "pwd": "<UNIQUE_PASSWORD>",
  "roles": [
    { role: "read", db: "admin" },
    { role: "read", db: "local" },
    { role: "clusterMonitor", db: "admin" }
  ]
})
{{< /code-block >}}

모니터링하려는 데이터베이스의 `datadog` 사용자에게 추가 권한을 부여합니다.

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "read", db: "mydatabase" },
  { role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

또는 모든 데이터베이스를 모니터링하기 위해 `admin` 데이터베이스의 `datadog` 사용자에게 `readAnyDatabase` 역할을 부여할 수 있습니다.

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

2. 동일한 단계를 수행하고 `mongos` 프록시에서 동일한 사용자를 만듭니다. 이 작업은 구성 서버에 로컬 사용자를 생성하고 직접 연결을 허용합니다.

{{% /tab %}}
{{< /tabs >}}

### 비밀번호 안전하게 저장 {#securely-store-your-password}
{{% dbm-secret %}}

### Agent 설치 및 구성 {#install-and-configure-the-agent}

Datadog은 Agent를 MongoDB 호스트에 직접 설치하는 것을 권장합니다. 그렇게 해야 Agent가 MongoDB에 국한된 텔레메트리 외에도 다양한 시스템 텔레메트리(CPU, 메모리, 디스크, 네트워크)를 수집할 수 있습니다.

#### 구성 파일 생성 {#create-the-configuration-file}

{{< tabs >}}
{{% tab "독립형" %}}
{{% dbm-mongodb-agent-config-standalone %}}
{{% /tab %}}
{{% tab "복제본 세트" %}}
{{% dbm-mongodb-agent-config-replica-set %}}
{{% /tab %}}
{{% tab "샤드 클러스터" %}}
{{% dbm-mongodb-agent-config-sharded-cluster %}}
{{% /tab %}}
{{< /tabs >}}

#### Agent 설정 {#set-up-the-agent}

{{< tabs >}}
{{% tab "Linux 호스트" %}}
{{% dbm-mongodb-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-mongodb-agent-setup-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-mongodb-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}

## 쿼리 메트릭 {#query-metrics}

자체 호스팅 MongoDB에 대한 쿼리 메트릭은 MongoDB 8.0 이상을 요구하며 `$queryStats` 집계 파이프라인을 사용합니다. 쿼리 통계 수집은 기본적으로 MongoDB 서버에서 비활성화되어 있습니다. 각 `mongod` 또는 `mongos` 프로세스에서 활성화하세요. 필요한 서버 파라미터는 MongoDB 버전에 따라 다릅니다.

### MongoDB 8.0.20 이상 {#mongodb-8020-or-later}

`internalQueryStatsSampleRate`를 `1.0`으로 설정합니다(100% 샘플링).

MongoDB 구성 파일에 파라미터를 추가하세요.

{{< code-block lang="yaml" >}}
setParameter:
  internalQueryStatsSampleRate: 1.0
{{< /code-block >}}

또는 명령줄을 통해 전달하세요.

{{< code-block lang="shell" >}}
mongod --setParameter internalQueryStatsSampleRate=1.0
{{< /code-block >}}

다음 재시작 전까지 런타임에 활성화하려면 다음을 실행하세요.

{{< code-block lang="javascript" >}}
db.adminCommand({setParameter: 1, internalQueryStatsSampleRate: 1.0})
{{< /code-block >}}

### MongoDB 8.0.0~8.0.19 {#mongodb-800-through-8019}

`internalQueryStatsRateLimit`을 `-1`로 설정합니다(속도 제한 없음).

MongoDB 구성 파일에 파라미터를 추가하세요.

{{< code-block lang="yaml" >}}
setParameter:
  internalQueryStatsRateLimit: -1
{{< /code-block >}}

또는 명령줄을 통해 전달하세요.

{{< code-block lang="shell" >}}
mongod --setParameter internalQueryStatsRateLimit=-1
{{< /code-block >}}

다음 재시작 전까지 런타임에 활성화하려면 다음을 실행하세요.

{{< code-block lang="javascript" >}}
db.adminCommand({setParameter: 1, internalQueryStatsRateLimit: -1})
{{< /code-block >}}

쿼리 통계 수집을 제어하는 서버 파라미터에 대한 자세한 내용은 [MongoDB 쿼리 통계 문서][4]를 참조하세요.

## 수집되는 데이터 {#data-collected}

### 표준 메트릭 {#standard-metrics}

MongoDB 통합에서 수집하는 메트릭의 전체 목록은 [MongoDB 통합 문서][2]를 참조하세요.

### 쿼리 메트릭 {#query-metrics-1}

<div class="alert alert-info">
  이를 위해서는 Datadog Agent v7.78 이상이 필요하며 자체 호스팅의 경우 MongoDB 8.0 이상이 필요합니다.
</div>

쿼리 메트릭은 MongoDB 작업 성능에 대한 인사이트를 제공합니다. 자세한 내용은 [쿼리 메트릭][3]을 참조하세요.

쿼리 메트릭을 수집하려면 [Grant the Agent access](#grant-the-agent-access-to-your-mongodb-instances) 섹션에 설명된 대로 필요한 권한을 부여했는지 확인하세요.

`conf.d/mongo.d/conf.yaml` 구성 파일에서 쿼리 메트릭을 활성화하세요. 예시는 다음과 같습니다.

{{< highlight yaml "hl_lines=11-12" >}}
init_config:
instances:
  - hosts:
      - <HOST>:<PORT>
    username: datadog
    password: "ENC[datadog_user_database_password]"
    options:
      authSource: admin
    tls: true
    dbm: true
    query_metrics:
      enabled: true
    cluster_name: <MONGO_CLUSTER_NAME>
    reported_database_hostname: <DATABASE_HOSTNAME_OVERRIDE>
    additional_metrics: ["metrics.commands", "tcmalloc", "top", "collection"]
    collections_indexes_stats: true
    database_autodiscovery:
      enabled: true
{{< /highlight >}}

{{% dbm-mongodb-agent-data-collected %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/api-app-keys/
[2]: /ko/integrations/mongo/?tab=standalone#metrics
[3]: /ko/database_monitoring/query_metrics/
[4]: https://github.com/mongodb/mongo/blob/master/src/mongo/db/query/query_stats/README.md#server-parameters