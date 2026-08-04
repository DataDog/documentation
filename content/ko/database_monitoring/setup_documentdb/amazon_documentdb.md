---
title: Amazon DocumentDB의 Database Monitoring 설정
---

Database Monitoring은 주요 메트릭, 운영 샘플, Explain 실행 계획 및 복제 상태 변경에 액세스를 제공하여 MongoDB 호환성을 포함한 Amazon DocumentDB과 관련한 포괄적 인사이트를 제공합니다. Amazon DocumentDB용 Database Monitoring의 혜택을 누리려면 Datadog Agent가 Amazon DocumentDB 인스턴스에 설치 및 구성되었는지 확인합니다. 이 가이드는 Amazon DocumentDB용 Database Monitoring를 설정 단계를 설명합니다.

## 시작 전 참고 사항

지원되는 Amazon DocumentDB 주요 버전
: 4.0.0, 5.0.0

지원되는 Amazon DocumentDB 클러스터 유형
: 인스턴스 기반 클러스터<br /><br />
**참고**: Amazon DocumentDB Elastic 클러스터는 지원되지 않습니다.

{{% dbm-documentdb-before-you-begin %}}

## 설정

데이터베이스에서 Database Monitoring을 활성화하려면,

1. [Amazon DocumentDB 인스턴스에 대한 Agent 액세스 권한 부여](#grant-the-agent-access-to-your-amazon-documentdb-instances)
2. [에이전트를 설치 및 설정합니다](#install-and-configure-the-agent).
3. [(선택 사항) Amazon DocumentDB 통합 설치](#install-the-amazon-documentdb-integration)

### Amazon DocumentDB 인스턴스에 대한 Agent 액세스 권한 부여

Datadog Agent는 통계 및 쿼리 수집을 위해 Amazon DocumentDB 인스턴스에 대한 읽기 전용 액세스가 필요합니다.

Mongo shell에서 복제 세트에 일차 노드를 인증하고, `admin` 데이터베이스에서 Datadog Agent에 대한 읽기 전용 사용자를 생성하여 필수 권한을 부여합니다.

{{< code-block lang="shell" >}}

# 관리자 사용자로서 인증합니다.

use admin
db.auth("admin", "<YOUR_AMAZON_DOCUMENTDB_ADMIN_PASSWORD>")

# Datadog Agent의 사용자를 생성합니다.

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

모니터링하려는 데이터베이스에서 `datadog` 사용자에 추가 권한을 부여합니다.

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

### 비밀번호를 안전하게 저장하기

{{% dbm-secret %}}

### 에이전트 설치 및 구성

Amazon DocumentDB Cluster를 모니터링하려면  Amazon DocumentDB Cluster에  [원격으로 액세스][1]할 수 있는 호스트에서 Datadog Agent를 설치하고 구성해야 합니다. 이 호스트는 Linux 호스트, Docker 컨테이너 또는 Kubernetes 포드일 수 있습니다.

#### 구성 파일 생성

{{% dbm-amazon-documentdb-agent-config-replica-set %}}

Amazon DocumentDB 통합 텔레메트리를 사용해 
[Amazon DocumentDB 통합][3]을 설치하여 인스턴스를 강화하려면, 구성에 이 섹션을 추가합니다.

```yaml
## @param aws - 매핑 - 선택 사항
## 이 블록은 Amazon DocumentDB 인스턴스의 구성을 정의합니다.
## 이 값은 `dbm: true` 옵션이 설정될 때만 적용됩니다.
#
aws:
    ## @param instance_endpoint - 문자열 - 선택 사항
    ## Agent 연결 대상 인스턴스의 Endpoint.Address와 동일합니다.
    ## `host`의 값이 이미 인스턴스 엔드포인트로 구성되어 있을 경우 이 값은 선택 사항입니다.
    ##
    ## 인스턴스 엔드포인트에 관한 자세한 정보를 보려면
    ## AWS 설명서를 확인하세요. https://docs.aws.amazon.com/documentdb/latest/developerguide/API_Endpoint.html
    #
    instance_endpoint: <AMAZON_DOCUMENTDB_ENDPOINT>
    ## @param cluster_identifier - 문자열 - 선택 사항
    ## Agent 연결 대상 인스턴스의 클러스터 식별자와 동일합니다.
    ## `cluster_name`의 값이 이미 클러스터 식별자로 구성되어 있을 경우 이 값은 선택 사항입니다.
    ##
    ## 클러스터 식별자에 관한 상세한 정보를 보려면
    ## AWS 설명서를 확인하세요. https://docs.aws.amazon.com/documentdb/latest/developerguide/API_DBCluster.html
    #
    cluster_identifier: <AMAZON_DOCUMENTDB_CLUSTER_IDENTIFIER>
```

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

### Amazon DocumentDB 통합 설치

Amazon DocumentDB에서 보다 포괄적인 데이터베이스 메트릭을 수집하려면 [Amazon DocumentDB 통합][3](선택 사항)을 설치합니다.

## 수집한 데이터

### 메트릭

통합에서 수집한 포괄적인 메트릭 목록을 보려면 [통합 설명서][2]를 참조하세요.

{{% dbm-amazon-documentdb-agent-data-collected %}}

[1]: /ko/account_management/api-app-keys/
[2]: /ko/integrations/mongo/?tab=replicaset#metrics
[3]: /ko/integrations/amazon_documentdb/
[4]: /ko/integrations/amazon_documentdb/#metrics