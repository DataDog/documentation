---
description: MongoDB Atlas용 Database Monitoring 설치 및 구성하기
further_reading:
- link: /integrations/mongo/
  tag: 문서
  text: 기본 MongoDB 통합하기
title: MongoDB Atlas용 Database Monitoring 설정하기
---
Database Monitoring은 중요한 메트릭, 느린 작업, 작업 샘플, 실행 계획 및 복제 상태 변경에 대한 액세스를 제공하여 MongoDB 데이터베이스에 대한 포괄적인 인사이트를 제공합니다. MongoDB용 Database Monitoring을 활용하려면 Datadog Agent가 설치되어 있고 MongoDB Atlas 인스턴스에 연결하도록 구성되어 있는지 확인하세요. 이 가이드는 MongoDB Atlas에 대한 Database Monitoring을 설정하는 단계를 설명합니다.

## 시작하기 전에 {#before-you-begin}

지원되는 MongoDB 주요 버전
: 4.4, 5.0, 6.0, 7.0, 8.0, 9.0

지원되는 MongoDB Atlas 클러스터 티어
: M10 이상<br/><br/>
**참고**: MongoDB Atlas Serverless 인스턴스 또는 공유 클러스터(M0 Sandbox, M2, M5)는 지원되지 않습니다.

{{% dbm-mongodb-before-you-begin %}}

## 설정 {#setup}

데이터베이스에서 Database Monitoring을 활성화하려면 다음 단계를 따르세요.

1. [Agent에 MongoDB Atlas 클러스터에 대한 액세스 권한을 부여합니다.](#grant-the-agent-access-to-your-mongodb-atlas-cluster)
2. [Agent를 설치 및 구성합니다.](#install-and-configure-the-agent)
3. [(필요시) MongoDB Atlas 통합을 설치합니다.](#install-the-mongodb-atlas-integration)

### Agent에 MongoDB Atlas 클러스터에 대한 액세스 권한 부여 {#grant-the-agent-access-to-your-mongodb-atlas-cluster}

Datadog Agent가 통계와 쿼리를 수집하려면 MongoDB Atlas 클러스터에 대한 읽기 전용 액세스 권한이 필요합니다.

#### 사용자 지정 모니터링 역할 생성 {#create-a-custom-monitoring-role}

1. MongoDB Atlas UI에서 **Database Access** 탭으로 이동합니다.
2. **Custom Roles** 탭에서 **Add New Custom Role**을 클릭합니다.
3. **Custom Role Name**을 입력합니다(예: `datadog`).
4. 사용자 지정 역할에 다음 권한을 추가합니다.
    `admin` 데이터베이스에 대한 - `read` 권한
    `local` 데이터베이스에 대한 - `read` 권한
    `config` 데이터베이스에 대한 - `read` 권한(샤딩된 클러스터만 해당)
    `admin` 데이터베이스에 대한 - `clusterMonitor` 권한
    모니터링하려는 사용자 생성 데이터베이스에 대한 - `read` 권한 또는 모든 데이터베이스를 모니터링하기 위한 `readAnyDatabase` 권한
5. **Add Custom Role**을 클릭합니다.

#### 사용자 지정 모니터링 역할을 가진 모니터링 사용자 생성{#create-a-monitoring-user-with-the-custom-monitoring-role}

1. MongoDB Atlas UI에서 **Database Access** 탭으로 이동합니다.
2. **Database Users** 탭에서 **Add New Database User**를 클릭합니다.
3. **Authentication Method**에서 **Password**를 선택합니다.
4. 사용자 이름과 비밀번호를 입력합니다.
5. **Database User Privileges**에서 **Custom Roles**를 펼치고 이전 단계에서 생성한 사용자 지정 모니터링 역할을 선택합니다.
6. **Add User**를 클릭합니다.
7. Agent를 구성할 수 있도록 모니터링 사용자의 사용자 이름과 비밀번호를 기록합니다.

### 비밀번호 안전하게 저장 {#securely-store-your-password}

{{% dbm-secret %}}

### Agent 설치 및 구성 {#install-and-configure-the-agent}

MongoDB Atlas 클러스터를 모니터링하려면 MongoDB Atlas 클러스터에 [원격으로 액세스][1]할 수 있는 호스트에 Datadog Agent를 설치하고 구성해야 합니다. 이 호스트는 Linux 호스트, Docker 컨테이너 또는 Kubernetes 포드일 수 있습니다.

#### SRV 연결 문자열에서 개별 MongoDB 인스턴스의 호스트 이름과 포트 확인{#get-the-individual-mongodb-instance-hostname-and-port-from-the-srv-connection-string}

애플리케이션은 일반적으로 SRV 연결 문자열을 사용하여 MongoDB Atlas에 연결하지만, Datadog Agent는 모니터링 대상인 개별 MongoDB 인스턴스에 직접 연결해야 합니다. Agent가 실행 중에 다른 MongoDB 인스턴스로 연결을 전환하는 경우(예: 장애 조치, 로드 밸런싱 등), Agent는 서로 다른 두 호스트의 통계 차이를 계산하게 되어 부정확한 메트릭이 생성됩니다.

개별 MongoDB 인스턴스의 호스트 이름과 포트를 가져오려면 Linux의 `dig` 또는 Windows의 `nslookup`과 같은 네트워크 유틸리티 명령줄 도구를 사용하여 SRV 연결 문자열을 확인할 수 있습니다.

{{< tabs >}}
{{% tab "복제본 세트" %}}

##### 복제본 세트 멤버{#replica-set-members}

SRV 연결 문자열이 `mongodb+srv://XXXXX.XXX.mongodb.net/`인 샤딩되지 않은 클러스터(복제본 세트)의 경우 다음 단계를 따르세요.

Linux에서 `dig`를 사용하여 SRV 연결 문자열을 확인하세요.

{{< code-block lang="shell" >}}
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

출력은 다음과 유사합니다.

{{< code-block lang="shell" >}}
0 0 27017 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27017 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Windows에서 `nslookup`을 사용하여 SRV 연결 문자열을 조회하세요.

{{< code-block lang="shell" >}}
nslookup -type=SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

출력은 다음과 유사합니다.

{{< code-block lang="shell" >}}
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-00.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-01.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27017 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

이 예시에서 복제본 세트의 개별 MongoDB 인스턴스 `<HOST>:<PORT>`는 다음과 같습니다.

-   `XXXXX-00-00.4zh9o.mongodb.net:27017`
-   `XXXXX-00-01.4zh9o.mongodb.net:27017`
-   `XXXXX-00-02.4zh9o.mongodb.net:27017`

SRV 연결 문자열에서 검색된 `<HOST>:<PORT>`를 사용하여 Agent를 구성할 수 있습니다.
{{% /tab %}}
{{% tab "샤드 클러스터" %}}

##### mongos 라우터{#mongos-routers}

SRV 연결 문자열이 `mongodb+srv://XXXXX.XXX.mongodb.net/`인 샤딩된 클러스터의 경우 다음 단계를 따르세요.

Linux에서 `dig`를 사용하여 SRV 연결 문자열을 확인하세요.

{{< code-block lang="shell" >}}
dig +short SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

출력은 다음과 유사합니다.

{{< code-block lang="shell" >}}
0 0 27016 XXXXX-00-00.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-01.4zh9o.mongodb.net.
0 0 27016 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

Windows에서 `nslookup`을 사용하여 SRV 연결 문자열을 조회하세요.

{{< code-block lang="shell" >}}
nslookup -type=SRV _mongodb._tcp.XXXXX.XXX.mongodb.net
{{< /code-block >}}

출력은 다음과 유사합니다.

{{< code-block lang="shell" >}}
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-00.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-01.4zh9o.mongodb.net.
_mongodb._tcp.XXXXX.XXX.mongodb.net service = 0 0 27016 XXXXX-00-02.4zh9o.mongodb.net.
{{< /code-block >}}

이 예시에서 개별 `mongos` 라우터는 다음과 같습니다.

-   `XXXXX-00-00.4zh9o.mongodb.net:27016`
-   `XXXXX-00-01.4zh9o.mongodb.net:27016`
-   `XXXXX-00-02.4zh9o.mongodb.net:27016`.

SRV 연결 문자열에서 검색된 `<HOST>:<PORT>`를 사용하여 Agent를 구성할 수 있습니다.

##### 샤드 구성원 {#shard-members}

각 샤드의 개별 MongoDB 인스턴스를 확인하려면 `mongos` 라우터에 연결하고 다음 명령을 실행하세요.

{{< code-block lang="shell" >}}
use admin
db.runCommand("getShardMap")
{{< /code-block >}}

출력은 다음과 유사합니다.

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

이 예시에서 shard-0의 개별 MongoDB 인스턴스는 다음과 같습니다.

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

이 호스트 이름 중 하나를 사용하여 Agent를 구성할 수 있습니다.
{{% /tab %}}
{{< /tabs >}}

#### 구성 파일 생성 {#create-the-configuration-file}

{{< tabs >}}
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

### MongoDB Atlas 통합 설치 {#install-the-mongodb-atlas-integration}

MongoDB Atlas에서 더 포괄적인 데이터베이스 메트릭을 수집하려면 [MongoDB Atlas 통합][3]을 설치하세요(필요시).

## 수집되는 데이터 {#data-collected}

### 표준 메트릭 {#standard-metrics}

MongoDB 통합에서 수집하는 메트릭의 전체 목록은 [MongoDB 통합 문서][4]를 참조하세요.

### 쿼리 메트릭 {#query-metrics}

<div class="alert alert-info">
  쿼리 메트릭을 사용하려면 Datadog Agent 7.78 이상 및 MongoDB 7.0 이상이 필요합니다. MongoDB 9.0에는 Agent 7.85.0 이상이 필요합니다.
</div>

쿼리 메트릭은 MongoDB 작업의 성능을 파악하는 데 도움이 됩니다. 자세한 내용은 [쿼리 메트릭][5]을 참조하세요.

쿼리 메트릭을 수집하려면 [Agent에 액세스 권한 부여](#grant-the-agent-access-to-your-mongodb-atlas-cluster) 섹션에 설명된 필수 권한을 부여했는지 확인하세요.

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

[1]: /ko/database_monitoring/architecture/#cloud-managed-databases
[2]: /ko/account_management/api-app-keys/
[3]: /ko/integrations/mongodb_atlas/
[4]: /ko/integrations/mongodb_atlas/#metrics
[5]: /ko/database_monitoring/query_metrics/