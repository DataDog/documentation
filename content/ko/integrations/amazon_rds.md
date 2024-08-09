---
aliases:
- /ko/integrations/awsrds/
- /ko/integrations/rds/
- /ko/integrations/faq/how-can-i-monitor-the-health-status-of-my-rds-instances/
categories:
- aws
- cloud
- data stores
- log collection
- network
dependencies: []
description: Amazon RDS와 관련된 다양한 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_rds/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-rds-mysql-performance-metrics/
  tag: 블로그
  text: RDS MySQL 성능 메트릭 모니터링
- link: https://www.datadoghq.com/blog/aws-rds-postgresql-monitoring/
  tag: 블로그
  text: AWS RDS PostgreSQL 모니터링을 위한 주요 메트릭
- link: https://www.datadoghq.com/blog/monitoring-amazon-aurora-performance-metrics/
  tag: 블로그
  text: Amazon Aurora 성능 메트릭 모니터링
git_integration_title: amazon_rds
has_logo: true
integration_id: amazon-rds
integration_title: Amazon RDS
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
monitors:
  rds_cpu_utilization: assets/monitors/rds_cpu_utilization.json
  rds_database_connections_anomaly: assets/monitors/rds_database_connections_anomaly.json
  rds_storage_utilization: assets/monitors/rds_storage_utilization.json
name: amazon_rds
public_title: Datadog-Amazon RDS 통합
short_description: Amazon RDS와 관련된 다양한 메트릭을 추적합니다.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/awsrds/rdsdashboard.png" alt="RDS 대시보드" popup="true">}}

## 개요

Amazon Relational Database Service(RDS)는 클라우드에서 관계형 데이터베이스를 설정, 운영 및 확장하는 데 사용되는 웹 서비스입니다. 이 통합을 활성화하면 Datadog에서 모든 RDS 메트릭을 볼 수 있습니다.

**참고**: 환경 변수 `DD_SITE`가 코드 외부의 리전 {{< region-param key="dd_site" code="true" >}}로 설정되었는지 확인하거나, 다음과 같이 코드에서 변수를 설정하세요:

`DD_SITE = os.getenv("DD_SITE", default="{{< region-param key="dd_site" code="true" >}}")`

RDS 인스턴스를 모니터링하는 옵션에는 Standard, Enhanced, Native 세 가지가 있습니다. 각 메트릭에는 해당 설정이 라벨로 표시되어 있으므로 **설정을 선택하기 전에 전체 [메트릭 목록](#data-collected)을 검토하세요**. 또한 아래 정보를 검토하여 각 설정의 요구 사항 및 프리셋 대시보드에 대해 자세히 알아보세요:

{{< tabs >}}
{{% tab "Standard" %}}

표준 통합을 위해서는 [AWS 통합 페이지][1]의 `Metric Collection` 탭에서 RDS를 활성화해야 합니다. 이를 통해 클라우드와치(CloudWatch) 통합이 허용하는 한 인스턴스에 대한 메트릭을 자주 수신할 수 있습니다. 모든 RDS 엔진 유형이 지원됩니다.

이 통합을 위한 프리셋 대시보드에는 다음 메트릭 정보가 포함됩니다: 연결, 복제 지연, 읽기 작업 및 대기 시간, 컴퓨터, RAM, 쓰기 작업 및 대기 시간, 디스크 메트릭.


[1]: https://app.datadoghq.com/integrations/amazon-web-services
{{% /tab %}}
{{% tab "Enhanced" %}}

향상된 통합에는 추가 설정이 필요하며 MySQL, Aurora, MariaDB, SQL Server, Oracle 및 PostgreSQL 엔진에서 사용할 수 있습니다. 추가 메트릭을 사용할 수 있지만 메트릭을 Datadog에 제출하려면 AWS Lambda가 필요합니다. 더 높은 세분성 및 추가 필수 서비스로 인해 추가적인 AWS 요금이 발생할 수 있습니다.

이 통합을 위한 프리셋 대시보드에는 다음 메트릭 정보가 포함됩니다: 로드, 가동 시간, CPU 사용률, 작업, 메모리, SWAP, 네트워크 수신, 네트워크 전송, 프로세스당 사용된 CPU, 프로세스당 사용된 메모리, 디스크 작업, 사용된 파일 시스템(pct), 실행 중인 작업 및 시스템 CPU 사용률.

{{% /tab %}}
{{% tab "Native" %}}

네이티브 데이터베이스 통합은 부수적이며 MySQL, Aurora, MariaDB, SQL Server 및 PostgreSQL 엔진 유형에 사용할 수 있습니다. RDS의 메트릭과 네이티브 통합의 메트릭을 일치시키려면, RDS 인스턴스에 할당한 식별자를 기반으로 네이티브 통합에서 `dbinstanceidentifier` 태그를 사용하세요. RDS 인스턴스에 자동으로 태그가 할당됩니다.

이 설정에 사용할 수 있는 3개의 프리셋 대시보드가 있습니다: MySQL, Aurora, PostgreSQL. 각 대시보드에는 다음 메트릭 정보가 포함됩니다: 쿼리 볼륨, 디스크 I/O, 연결, 복제 및 AWS 리소스 메트릭.

**참고**: 이 대시보드는 AWS 클라우드와치(CloudWatch)와 개별 데이터베이스 엔진 자체의 메트릭을 모두 표시합니다. 모든 통합 메트릭을 위해 [MySQL][1], [Aurora][2] 또는 [PostgreSQL][3] 통합 중 하나를 활성화합니다.


[1]: https://docs.datadoghq.com/ko/integrations/mysql/
[2]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_SettingUp_Aurora.html
[3]: https://docs.datadoghq.com/ko/integrations/postgres/
{{% /tab %}}
{{< /tabs >}}

## 설정

### 설치

{{< tabs >}}
{{% tab "Standard" %}}

표준 RDS 통합을 위해 먼저 [Amazon Web Services 통합][1]을 설정합니다.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services
{{% /tab %}}
{{% tab "Enhanced" %}}

**Instance Actions**에서 **Modify**를 선택하여 인스턴스 생성 중 또는 이후에 RDS 인스턴스에 대한 향상된 모니터링을 활성화합니다. Monitoring Granularity에 대해서는 `15`를 권장합니다. 

다음 지침에서는 KMS 및 Lambda 관리 콘솔을 사용하여 RDS Enhanced Monitoring Lambda 함수에만 사용할 수 있는 Datadog API 키의 암호화된 버전을 생성합니다. [Log Forwarder][1]와 같은 다른 Lambda의 암호화된 API 키가 이미 있는 경우 [Lambda 함수의 README][2]에서 다른 옵션을 참조하세요. 

#### KMS 키 생성

1. https://console.aws.amazon.com/kms/home에서 KMS 홈페이지를 엽니다.
2. **Customer managed keys**로 이동합니다.
3. **Create Key**를 선택합니다.
4. `lambda-datadog-key`와 같은 키의 별칭을 입력합니다. _참고: 별칭은 aws로 시작할 수 없습니다. aws로 시작하는 별칭은 사용자의 계정에서 AWS 관리형 CMKs를 나타내기 위해 Amazon Web Services에서 예약한 것입니다._
5. 이 키를 관리할 수 있는 사람을 정하기 위해 적절한 관리자를 추가하세요. 
6. 역할을 추가할 필요는 없습니다.
7. KMS 키를 저장합니다.

#### Lambda 함수 생성

1. Lambda 관리 콘솔에서 새 Lambda 함수를 생성합니다. **Lambda 함수는 생성된 KMS 키와 같은 리전에 있어야 합니다.**
2. `Serverless Application Repository`를 선택하고, `Datadog-RDS-Enhanced`를 검색 후 선택하세요. 
3. 애플리케이션에 고유한 이름을 지정합니다.
4. `KMSKeyId` 파라미터의 이전 섹션에서 생성한 키의 Id를 붙여넣고 배포합니다.
5. 애플리케이션이 배포되면, 새로 생성된 Lambda 함수를 엽니다("Resource" 아래의 함수 클릭).
6. `Configuration` 탭을 클릭하고 `Environment variables` 섹션으로 이동합니다. 환경 변수 `kmsEncryptedKeys`의 경우 다음과 같이 `value` 필드에 전체 JSON 형식의 [Datadog API 키][3]를 추가합니다. `{"api_key":"<YOUR_API_KEY>"}`.
7. `Encryption configuration` 섹션을 열고 `Enable helpers for encryption in transit`을 선택합니다.
8. `KMS key to encrypt at rest` 섹션에서 `Use a customer master key`를 선택하고 앞서 생성한 동일한 KMS 키를 입력합니다.
9. 방금 입력한 JSON 블롭 옆에 있는 암호화 버튼을 누르고 이전에 생성한 동일한 KMS 키도 팝업에서 선택합니다.
10. 저장을 누릅니다.
11. `RDSOSMetrics` 클라우드와치(CloudWatch) 로그 그룹을 소스로 사용하여 새 트리거를 생성합니다.
12. 필터에 이름과 부수적인 필터 패턴을 지정하고 저장을 누릅니다.

Lambda 함수에 대한 테스트 버튼을 클릭하면 다음 오류가 발생할 수 있습니다:

```json
{
    "stackTrace": [
        [
            "/var/task/lambda_function.py",
            109,
            "lambda_handler",
            "event = json.loads(gzip.GzipFile(fileobj=StringIO(event['awslogs']['data'].decode('base64'))).read())"
        ]
    ],
    "errorType": "KeyError",
    "errorMessage": "'awslogs'"
}
```

이것은 무시해도 됩니다. 이 설정에서는 테스트 버튼이 작동하지 않습니다.


[1]: https://docs.datadoghq.com/ko/serverless/forwarder/
[2]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/rds_enhanced_monitoring#setup
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Enhanced" %}}

1. AWS 콘솔로 이동하고 RDS 섹션을 열어 모니터링하려는 인스턴스를 찾습니다.
  {{< img src="integrations/awsrds/rds-console.png" alt="RDS console" >}}
2. 예를 들어 **mysqlrds.blah.us-east1.rds.amazonaws.com:3306**과 같은 Agent를 설정하는 데 사용되는 엔드포인트 URL을 기록해 두세요. **mysqlrds**와 같은 `DB Instance identifier`도 기록해 둡니다. 이는 그래프와 대시보드를 만드는 데 사용됩니다.

{{% /tab %}}
{{< /tabs >}}

### 설정

{{< tabs >}}
{{% tab "Standard" %}}

1. [AWS 통합 페이지][1]에서 `Metric Collection` 탭 아래에 `RDS`가 활성화되어 있는지 확인합니다.

2. Amazon RDS 메트릭을 수집하려면 [Datadog IAM 정책][2]에 다음 권한을 추가하세요. 자세한 내용은 AWS 웹사이트에서 [RDS 정책][3]을 참조하세요.

    | AWS 권한            | 설명                        |
    | ------------------------- | ------------------------------------ |
    | `rds:DescribeDBInstances` | 태그를 추가할 RDS 인스턴스를 설명합니다.  | 
    | `rds:ListTagsForResource` | RDS 인스턴스에 커스텀 태그를 추가합니다.    |
    | `rds:DescribeEvents`     | RDS 데이터베이스와 관련된 이벤트를 추가합니다. |

3. [Datadog - Amazon RDS 통합][4]을 설치합니다.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/security_iam_service-with-iam.html
[4]: https://app.datadoghq.com/integrations/amazon-rds
{{% /tab %}}
{{% tab "Enhanced" %}}

1. [AWS 통합 페이지][1]에서 `Metric Collection` 탭 아래에 `RDS`가 활성화되어 있는지 확인합니다.
2. Amazon RDS 메트릭을 수집하려면 [Datadog IAM 정책][2]에 다음 권한을 추가하세요. 자세한 내용은 AWS 웹 사이트의 [RDS 정책][3]을 참조하세요.

    | AWS 권한            | 설명                        |
    | ------------------------- | ------------------------------------ |
    | `rds:DescribeDBInstances` | 태그를 추가할 RDS 인스턴스를 설명합니다.  |
    | `rds:ListTagsForResource` | RDS 인스턴스에 커스텀 태그를 추가합니다.     |
    | `rds:DescribeEvents`     | RDS 데이터베이스와 관련된 이벤트를 추가합니다. |

3. [Datadog - Amazon RDS 통합][4]을 설치합니다.


[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/security_iam_service-with-iam.html
[4]: https://app.datadoghq.com/integrations/amazon-rds
{{% /tab %}}
{{% tab "Enhanced" %}}

conf.d 디렉토리에서 적절한 yaml 파일을 편집하여 Agent를 설정하고 RDS 인스턴스에 연결한 다음 Agent를 다시 시작하세요:

RDS Aurora의 경우, 사용 중인 데이터베이스 플레이버의 YAML 파일을 편집합니다.

MySQL 또는 MariaDB를 사용하는 경우 `mysql.yaml`을 편집합니다:

```yaml
init_config:

instances:
    # AWS 콘솔의 엔드포인트 URL
    - server: 'mysqlrds.blah.us-east-1.rds.amazonaws.com'
    user: '<USERNAME>'
    pass: '<PASSWORD>'
    port: 3306
    tags:
        - 'dbinstanceidentifier:<INSTANCE_NAME>'
```

PostgreSQL을 사용하는 경우 `postgres.yaml`을 편집합니다:

```yaml
init_config:

instances:
    - host: 'postgresqlrds.blah.us-east-1.rds.amazonaws.com'
      port: 5432
      username: '<USERNAME>'
      password: '<PASSWORD>'
      dbname: '<DB_NAME>'
      tags:
          - 'dbinstanceidentifier:<DB_INSTANCE_NAME>'
```

Microsoft SQL Server를 사용하는 경우 `sqlserver.yaml`를 편집합니다:

```yaml
init_config:

instances:
    - host: 'sqlserverrds.blah.us-east-1.rds.amazonaws.com,1433'
      username: '<USERNAME>'
      password: '<PASSWORD>'
      tags:
          - 'dbinstanceidentifier:<DB_INSTANCE_NAME>'
```

### 검증

[Agent의 status 하위 명령을 실행][1]하고 Checks 섹션에서 이와 같은 항목을 찾습니다:

```shell
Checks
======

[...]

  mysql
  -----
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
```

[1]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-information
{{% /tab %}}
{{< /tabs >}}

### 사용법

몇 분 후, RDS 메트릭 및 [MySQL, Aurora, MariaDB, SQL Server, Oracle 또는 PostgreSQL의 메트릭][1]은 Datadog의 메트릭 탐색기, [대시보드][2] 및 [알림][3]에서 액세스할 수 있습니다.
다음은 RDS와 MySQL 통합의 여러 메트릭을 표시하는 Aurora 대시보드의 예입니다. 인스턴스 `quicktestrds`에 대한 두 통합의 메트릭은 `dbinstanceidentifier` 태그를 사용하여 통합됩니다.
{{< img src="integrations/awsrds/aurora-rds-dash.png" alt="rds aurora dash" popup="true">}}

### 로그 수집

#### 로깅 활성화

MySQL, MariaDB 및 Postgres 로그를 Amazon 클라우드와치(CloudWatch)로 전달할 수 있습니다. [Amazon CloudWatch로 Amazon Aurora MySQL, MySQL용 Amazon RDS 및 MariaDB 로그 모니터링][4]에 있는지침에 따라 클라우드와치(CloudWatch)로 RDS 로그 전송을 시작하세요.

#### Datadog에 로그 보내기

1. 아직 설정하지 않았다면,  [Datadog 로그 수집 AWS Lambda 함수][5]를 설정합니다.
2. Lambda 함수가 설치되면 RDS 로그가 포함된 클라우드와치(CloudWatch) 로그 그룹에 트리거를 수동으로 추가합니다. 해당 클라우드와치(CloudWatch) 로그 그룹을 선택하고 필터 이름을 추가한 후(선택 사항) 트리거를 추가합니다.

완료되면, [Datadog Log 섹션][6]으로 이동하여 로그를 탐색합니다.

## 수집한 데이터

[데이터베이스 엔진에서 수집된 메트릭][1] 외에도 다음 RDS 메트릭을 수신합니다.

### 메트릭
{{< get-metrics-from-git "amazon_rds" >}}


AWS에서 검색된 각 메트릭에는 AWS 콘솔에 나타나는 것과 동일한 태그가 할당됩니다, 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않습니다.

### 이벤트 

Amazon RDS 통합에는 DB 인스턴스, 보안 그룹, 스냅샷 및 파라미터 그룹과 관련된 이벤트가 포함됩니다. 아래 이벤트 예시를 참조하세요.

{{< img src="integrations/amazon_rds/aws_rds_events.png" alt="Amazon RDS 이벤트" >}}

### 서비스 점검

**aws.rds.read_replica_status**
[read replication][8] 상태를 모니터링합니다. 이 검사는 다음 상태 중 하나를 반환합니다:

- OK - 복제 또는 연결
- CRITICAL - 오류 또는 종료
- WARNING - 중지
- UNKNOWN - 기타

## 즉시 사용 가능한 모니터링

Amazon RDS 통합은 즉시 사용 가능한 모니터링 기능을 제공하여 성능을 모니터링하고 최적화합니다.

- Amazon RDS 대시보드: 즉시 사용 가능한 [Amazon RDS 대시보드][9]를 사용하여 RDS 인스턴스에 대한 포괄적인 개요를 확인해 보세요.
- 권장 모니터링: [권장 Amazon RDS 모니터링][10]을 활성화하여 문제를 사전에 감지하고 적시에 알림을 받습니다.

## 문제 해결

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Aurora.Monitoring.html
[2]: https://docs.datadoghq.com/ko/dashboards/
[3]: https://docs.datadoghq.com/ko/monitors/
[4]: https://aws.amazon.com/blogs/database/monitor-amazon-rds-for-mysql-and-mariadb-logs-with-amazon-cloudwatch
[5]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[6]: https://app.datadoghq.com/logs
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_rds/amazon_rds_metadata.csv
[8]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl.Monitoring
[9]: https://app.datadoghq.com/dash/integration/62/aws-rds
[10]: https://app.datadoghq.com/monitors/recommended
[11]: https://docs.datadoghq.com/ko/help/