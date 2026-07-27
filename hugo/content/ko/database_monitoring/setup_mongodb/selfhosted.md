---
further_reading:
- link: /integrations/mongo/
  tag: 설명서
  text: 기본 MongoDB 통합
title: 자체 호스팅 MongoDB에 Database Monitoring 설정
---

Database Monitoring은 중요한 메트릭, 작업 지연, 작업 샘플, 실행 계획 및 복제 상태 변경 정보에 액세스할 수 있도록 지원하며, 이를 통해 MongoDB 데이터베이스에 관한 포괄적인 인사이트를 제공합니다. MongoDB용 Database Monitoring을 활용하려면 Datadog Agent가 설치되어 있고 MongoDB 인스턴스에 연결되도록 구성되어 있는지 확인하세요. 이 가이드에서는 자체 호스팅 MongoDB에 Database Monitoring을 설정하는 단계를 간략하게 설명합니다.

## 시작 전 참고 사항

지원되는 MongoDB 주요 버전
: 4.4, 5.0, 6.0, 7.0, 8.0

지원되는 MongoDB 에디션
: Community, Enterprise

{{% dbm-mongodb-before-you-begin %}}

## 설정

데이터베이스에서 Database Monitoring을 활성화하려면,

1. [MongoDB 인스턴트에 Agent 액세스 권한 부여](#grant-the-agent-access-to-your-mongodb-instances)
2. [에이전트를 설치 및 설정합니다](#install-and-configure-the-agent).

### MongoDB 인스턴스에 Agent 액세스 권한 부여

Datadog Agent는 통계 및 쿼리 수집을 위해 MongoDB 인스턴스용 읽기 전용 액세스가 필요합니다.

{{< tabs >}}
{{% tab "독립형" %}}

Mongo shell에서 MongoDB 인스턴스를 인증하고, `admin` 데이터베이스에서 Datadog Agent용 읽기 전용 사용자를 생성하여 필수 권한을 부여합니다.

{{< code-block lang="shell" >}}
# 관리자 사용자로서 인증
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Datadog Agent에 대한 사용자를 생성합니다.
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

모니터링하려는 데이터베이스에서 `datadog` 사용자에 대한 추가 권한을 부여합니다.

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "read", db: "mydatabase" },
  { role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

대신, `admin` 데이터베이스에서 `datadog` 사용자에 `readAnyDatabase` 역할을 부여하여 모든 데이터베이스를 모니터링해야 합니다.

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Replica Set" %}}

Mongo shell에서 복제 세트에 대한 일차 노드를 인증하고, `admin` 데이터베이스에서 Datadog Agent에 대한 읽기 전용 사용자를 생성하여 필수 권한을 부여합니다.

{{< code-block lang="shell" >}}
# 관리자 사용자로서 인증
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Datadog Agent에 대한 사용자를 생성합니다.
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

모니터링하려는 데이터베이스에서 `datadog` 사용자에 대한 추가 권한을 부여합니다.

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "read", db: "mydatabase" },
  { role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

대신, `admin` 데이터베이스에서 `datadog` 사용자에 `readAnyDatabase` 역할을 부여하여 모든 데이터베이스를 모니터링해야 합니다.

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

{{% /tab %}}
{{% tab "Sharded Cluster" %}}

1. 클러스터의 각 샤드당 샤드의 일차 노드를 연결하고, `admin` 데이터베이스에서 Datadog Agent용 읽기 전용 사용자를 생성하여 필수 권한을 부여합니다.

{{< code-block lang="shell" >}}
# 관리자 사용자로서 인증
use admin
db.auth("admin", "<YOUR_MONGODB_ADMIN_PASSWORD>")

# Datadog Agent에 대한 사용자를 생성합니다.
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

모니터링하려는 데이터베이스에서 `datadog` 사용자에 대한 추가 권한을 부여합니다.

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "read", db: "mydatabase" },
  { role: "read", db: "myotherdatabase" }
])
{{< /code-block >}}

대신, `admin` 데이터베이스에서 `datadog` 사용자에 `readAnyDatabase` 역할을 부여하여 모든 데이터베이스를 모니터링해야 합니다.

{{< code-block lang="shell" >}}
db.grantRolesToUser("datadog", [
  { role: "readAnyDatabase", db: "admin" }
])
{{< /code-block >}}

2. 그런 다음 동일한 단계에 따라 `mongos` 프록시에서 동일한 사용자를 만듭니다. 이 작업을 수행하면 구성 서버에 로컬 사용자가 생성되고 직접 연결이 허용됩니다.

{{% /tab %}}
{{< /tabs >}}

### 비밀번호를 안전하게 저장하기
{{% dbm-secret %}}

### 에이전트 설치 및 구성

Datadog은 MongoDB 호스트에 직접 Agent를 설치할 것을 권장합니다. 이렇게 하면 Agent가 MongoDB 전용 텔레메트리 외에도 다양한 시스템 텔레메트리(CPU, 메모리, 디스크, 네트워크)을 수집할 수 있게 됩니다.

#### 구성 파일 생성

{{< tabs >}}
{{% tab "Standalone" %}}
{{% dbm-mongodb-agent-config-standalone %}}
{{% /tab %}}
{{% tab "Replica Set" %}}
{{% dbm-mongodb-agent-config-replica-set %}}
{{% /tab %}}
{{% tab "Sharded Cluster" %}}
{{% dbm-mongodb-agent-config-sharded-cluster %}}
{{% /tab %}}
{{< /tabs >}}

#### Agent 설정

{{< tabs >}}
{{% tab "Linux Host" %}}
{{% dbm-mongodb-agent-setup-linux %}}
{{% /tab %}}
{{% tab "Docker" %}}
{{% dbm-mongodb-agent-setup-docker %}}
{{% /tab %}}
{{% tab "Kubernetes" %}}
{{% dbm-mongodb-agent-setup-kubernetes %}}
{{% /tab %}}
{{< /tabs >}}


## 수집한 데이터

### 메트릭

MongoDB 통합으로 수집한 메트릭의 포괄적인 목록을 보려면 [MongoDB 통합 설명서][2]를 참조하세요.

{{% dbm-mongodb-agent-data-collected %}}

[1]: /ko/account_management/api-app-keys/
[2]: /ko/integrations/mongo/?tab=standalone#metrics