---
description: MongoDB Atlas용 Database Monitoring 설치 및 구성
further_reading:
- link: /integrations/mongo/
  tag: 설명서
  text: 기본 MongoDB 통합
title: MongoDB Atlas용 Database Monitoring 설정하기
---

Database Monitoring은 중요한 메트릭, 작업 지연, 작업 샘플, Explain 실행 계획 및 복제 상태 변경 정보에 액세스할 수 있도록 지원하며, 이를 통해 MongoDB 데이터베이스에 대한 포괄적인 인사이트를 제공합니다. MongoDB용 Database Monitoring을 활용하려면 Datadog Agent가 설치되어 있고 MongoDB Atlas 인스턴스에 연결되도록 구성되어 있는지 확인하세요. 이 가이드에서는 Database Monitoring을 설정하는 단계를 간략하게 설명합니다.

## 시작 전 참고 사항

지원되는 MongoDB 주요 버전
: 4.4, 5.0, 6.0, 7.0, 8.0

지원되는 MongoDB Atlas 클러스터 티어
: M10 이상<br/><br/>
**참고**: MongoDB Atlas Serverless 인스턴스 또는 공유 클러스터(M0 Sandbox, M2, M5)는 지원되지 않습니다.

{{% dbm-mongodb-before-you-begin %}}

## 설정

데이터베이스에서 Database Monitoring을 활성화하는 방법:

1. [Agent에 MongoDB Atlas Cluster 액세스 권한 부여](#grant-the-agent-access-to-mongodb-atlas-cluster)
2. [에이전트를 설치 및 설정합니다](#install-and-configure-the-agent).
3. [(선택 사항) MongoDB Atlas 통합 설치](#install-the-mongodb-atlas-integration)

### MongoDB Atlas Cluster에 대한 액세스 권한 부여

Datadog Agent는 통계 및 쿼리를 수집하기 위해 MongoDB Atlas Cluster에 대한 읽기 전용 액세스 권한이 필요합니다.

#### 커스텀 모니터링 역할 생성

1. MongoDB Atlas UI에서 **Database Access** 탭으로 이동합니다.
2. **Custom Roles** 탭에서 **Add New Custom Role**을 클릭합니다.
3. `datadog` 등 **Custom Role Name**을 입력합니다.
4. 커스텀 역할에 다음 권한을 추가합니다.
    - `admin` 데이터베이스에 `read`
    - `local` 데이터베이스에 `read`
    - `config` 데이터베이스에 `read`(공유 클러스터만) 
    - `admin` 데이터베이스에 `clusterMonitor`
    - 모니터링하려는 사용자 생성 데이터베이스에 `read` 또는 모든 데이터베이스를 모니터링할 수 있는 `readAnyDatabase`
5. **Add Custom Role**를 클릭합니다.

#### 모니터링 사용자와 커스텀 모니터링 역할 생성

1. MongoDB Atlas UI에서 **Database Access** 탭으로 이동합니다.
2. **Database Users** 탭에서 **Add New Database User**를 클릭합니다.
3. **Authentication Method**에서 **Password**를 선택합니다.
4. 사용자 이름과 비밀번호를 입력합니다.
5. **Database User Privileges**에서 **Custom Roles**를 확대한 다음 이전 단계에서 생성한 커스텀 모니터링 역할을 선택합니다.
6. **Add User**을 클릭합니다.
7. 모니터링 사용자의 사용자 이름 및 비밀번호를 참고하여 Agent를 구성할 수 있습니다.

### 비밀번호를 안전하게 저장하기

{{% dbm-secret %}}

### 에이전트 설치 및 구성

MongoDB Atlas Cluster를 모니터링하려면 호스트에 Datadog Agent를 설치하고 구성하여 MongoDB Atlas Cluster에 [원격으로 액세스][1]할 수 있도록 해야 합니다. 이 호스트는 Linux 호스트, Docker 컨테이너 또는 Kubernetes 포드일 수 있습니다.

#### SRV 연결 호스트에서 개별 MongoDB 인스턴스 호스트 이름과 포트를 가져옵니다.

애플리케이션은 보통 SRV 연결 문자열을 통해 MongoDB Atlas에 연결합니다. 하지만 Datadog Agent는 직접 모니터링 대상인 개별 MongoDB 인스턴스에 연결해야 합니다. Agent가 실행되는 도중에 (페일오버, 로드 밸런싱 등의 경우) 각기 다른 MongoDB 인스턴스에 연결되는 경우, Agent는 두 호스트 간 통계적 차이를 계산하여 부정확한 메트릭을 생산합니다.

개별 MongoDB 인스턴스 호스트 이름 및 포트를 가져오려면 Linux의 `dig` 또는 Windows의 `nslookup` 등 네트워크 유틸리티 명령줄 도구를 사용할 수 있습니다.

{{< tabs >}}
{{% tab "Replica Set" %}}

##### 복제 세트 구성원

SRV 문자열(`mongodb+srv://XXXXX.XXX.mongodb.net/`) 포함 비공유(복제 세트) 클러스터의 경우

Linux의 `dig`를 사용해 SRV 문자열을 확인합니다.

{{< code-block lang="shell" >}}
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

다음과 같이 출력이 표시됩니다.

{{< code-block lang="shell" >}}
0 0 27017 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Windows의 `nslookup`를 사용해 SRV 문자열을 확인합니다.

{{< code-block lang="shell" >}}
nslookup -type=SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

다음과 같이 출력이 표시됩니다.

{{< code-block lang="shell" >}}
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-00.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-01.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

이 예에서 복제 세트의 `<HOST>:<PORT>` 개별 MongoDB 인스턴스:

-   `XXXXX-00-00.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02.4zh9o.mongodb.net:27017`

SRV 연결 문자열에서 검색한 `<HOST>:<PORT>`를 사용하여 Agent를 구성할 수 있습니다.
{{% /tab %}}
{{% tab "Sharded Cluster" %}}

##### Mongos 라우터

SRV 문자열(`mongodb+srv://XXXXX.XXX.mongodb.net/`) 포함 공유 클러스터의 경우

Linux의 `dig`를 사용하여 SRV 문자열을 확인합니다.

{{< code-block lang="shell" >}}
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

다음과 같이 출력이 표시됩니다.

{{< code-block lang="shell" >}}
0 0 27016 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Windows의 `nslookup`를 사용해 SRV 문자열을 확인합니다.

{{< code-block lang="shell" >}}
nslookup -type=SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

다음과 같이 출력이 표시됩니다.

{{< code-block lang="shell" >}}
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-00.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-01.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

이 예에서 개별 `mongos` 라우터는 다음과 같습니다.

-   `XXXXX-00-00.4zh9o.mongodb.net:27016`
-   `XXXXX-00-01.4zh9o.mongodb.net:27016`
-   `XXXXX-00-02.4zh9o.mongodb.net:27016`.

SRV 문자열에서 검색한 `<HOST>:<PORT>`를 사용해 Agent를 구성합니다.

##### Shard 구성원

각 Shard의 개별 MongoDB 인스턴스를 가져오려면 `mongos` 라우터에 연결하여 다음 명령을 실행할 수 있습니다.

{{< code-block lang="shell" >}}
use admin
db.runCommand("getShardMap")
{{< /code-block >}}

다음과 같이 출력이 표시됩니다.

{{< code-block lang="shell" >}}
{
"map" : {
"shard-0": "shard-0/XXXXX-00-00.4zh9o.mongodb.net:27017,XXXXX-00-01.4zh9o.mongodb.net:27017,XXXXX-00-02.4zh9o.mongodb.net:27017",
"shard-1": "shard-1/XXXXX-01-00.4zh9o.mongodb.net:27017,XXXXX-01-01.4zh9o.mongodb.net:27017,XXXXX-01-02.4zh9o.mongodb.net:27017"
},
"hosts": {
"XXXXX-00-00.4zh9o.mongodb.net:27017": "shard-0",
"XXXXX-00-01.4zh9o.mongodb.net:27017": "shard-0",
"XXXXX-00-02.4zh9o.mongodb.net:27017": "shard-0",
"XXXXX-01-00.4zh9o.mongodb.net:27017": "shard-1",
"XXXXX-01-01.4zh9o.mongodb.net:27017": "shard-1",
"XXXXX-01-02.4zh9o.mongodb.net:27017": "shard-1",
"XXXXX-00-00-config.4zh9o.mongodb.net:27017": "config",
"XXXXX-00-01-config.4zh9o.mongodb.net:27017": "config",
"XXXXX-00-02-config.4zh9o.mongodb.net:27017": "config"
},
"ok" : 1
}
{{< /code-block >}}

이 예에서 shard-0의 개별 MongoDB 인스턴스는 다음과 같습니다.

-   `XXXXX-00-00.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02.4zh9o.mongodb.net:27017`

shard-1의 경우 다음과 같습니다.

-   `XXXXX-01-00.4zh9o.mongodb.net:27017`
-   `XXXXX-01-01.4zh9o.mongodb.net:27017`
-   `XXXXX-01-02.4zh9o.mongodb.net:27017`

구성 서버의 경우 다음과 같습니다.

-   `XXXXX-00-00-config.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01-config.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02-config.4zh9o.mongodb.net:27017`

이 호스트 이름 중 하나를 사용해 Agent를 구성할 수 있습니다.
{{% /tab %}}
{{< /tabs >}}

#### 구성 파일 생성

{{< tabs >}}
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

### MongoDB Atlas 통합 설치

MongoDB Atlas 보다 포괄적인 데이터베이스 메트릭을 수집하려면 [MongoDB Atlas 통합][3](선택 사항)을 설치합니다.

## 수집한 데이터

### 메트릭

MongoDB 통합으로 수집한 메트릭의 포괄적인 목록을 보려면 [MongoDB 통합 설명서][4]를 참조하세요.

{{% dbm-mongodb-agent-data-collected %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/database_monitoring/architecture/#cloud-managed-databases
[2]: /ko/account_management/api-app-keys/
[3]: /ko/integrations/mongodb_atlas/
[4]: /ko/integrations/mongodb_atlas/#metrics