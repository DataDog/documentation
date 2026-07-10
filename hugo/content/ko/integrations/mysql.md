---
app_id: mysql
categories:
- data stores
- log collection
custom_kind: 통합
description: 성능 스키마 메트릭, 쿼리 처리량, 커스텀 메트릭을 수집하세요. and more.
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-mysql-performance-metrics
  tag: 블로그
  text: MySQL 성능 메트릭 모니터링
integration_version: 15.7.1
media: []
supported_os:
- linux
- macos
- windows
title: MySQL
---
![MySQL Dashboard](https://raw.githubusercontent.com/DataDog/integrations-core/master/mysql/images/mysql-dash-dd-2.png)

## 개요

MySQL 통합은 MySQL 인스턴스의 성능을 추적합니다. 처리량, 연결, 오류 및 InnoDB 메트릭과 관련된 메트릭을 수집합니다.

쿼리 성능 및 데이터베이스 상태에 관해 더욱 심층적인 인사이트를 얻으려면 [Database Monitoring](https://docs.datadoghq.com/database_monitoring/)(DBM)을 활성화하세요. Datadog DBM은 표준 통합 외에도 쿼리 수준 메트릭, 실시간 및 과거 쿼리 스냅샷, 대기 이벤트 분석, 데이터베이스 부하, 쿼리 실행 계획을 제공합니다.

MySQL 버전 5.6, 5.7, 8.0 및 MariaDB 버전 10.5, 10.6, 10.11 및 11.1이 지원됩니다.

## 설정

<div class="alert alert-info">이 페이지는 MySQL 에이전트 표준 통합에 대해 설명합니다. MySQL용 데이터베이스 모니터링 제품을 찾고 계신다면 <a href="https://docs.datadoghq.com/database_monitoring" target="_blank">Datadog 데이터베이스 모니터링</a>을 참조하세요.</div>

### 설치

MySQL 점검은 [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) 패키지에 포함되어 있어 MySQL 서버에 추가로 설치할 필요가 없습니다.

#### MySQL 준비

**참고**: MySQL용 Database Monitoring을 설치하려면 [Database Monitoring 문서](https://docs.datadoghq.com/database_monitoring/#mysql)에서 호스팅 솔루션을 선택하여 가이드를 확인하세요.

표준 통합을 단독으로 설치하는 경우에만 이 가이드의 다음 단계를 진행하세요.

각 MySQL 서버에서 Datadog 에이전트에 대한 데이터베이스 사용자를 생성합니다.

다음 지침을 따라 `datadog@'%'`를 사용하여 Agent가 모든 호스트에서 로그인할 수 있는 권한을 부여합니다. `datadog@'localhost'`를 사용하면 `datadog` 사용자가 로컬호스트에서만 로그인하도록 제한할 수 있습니다. 자세한 내용은 [MySQL 계정 추가, 권한 할당 및 계정 삭제](https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html)를 참고하세요.

다음 명령을 사용하여 `datadog` 사용자를 생성합니다.

```shell
mysql> CREATE USER 'datadog'@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
Query OK, 0 rows affected (0.00 sec)
```

다음 명령을 사용하여 사용자가 성공적으로 생성되었는지 확인합니다. `<UNIQUEPASSWORD>`를 위에서 생성한 비밀번호로 바꿉니다.

```shell
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show status" | \
grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
echo -e "\033[0;31mCannot connect to MySQL\033[0m"
```

메트릭을 수집하려면 에이전트 에 몇 가지 권한이 필요합니다. `datadog` 사용자에게 다음과 같은 제한된 권한만 부여하세요.

MySQL 버전 5.6 및 5.7의 경우 `replication client` 권한을 부여하고 다음 명령으로 `max_user_connections`를 설정합니다.

```shell
mysql> GRANT REPLICATION CLIENT ON *.* TO 'datadog'@'%' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected, 1 warning (0.00 sec)
```

MySQL 8.0 이상의 경우 `replication client` 권한을 부여하고 다음 명령으로 `max_user_connections`을 설정합니다.

```shell
mysql> GRANT REPLICATION CLIENT ON *.* TO 'datadog'@'%';
Query OK, 0 rows affected (0.00 sec)
mysql> ALTER USER 'datadog'@'%' WITH MAX_USER_CONNECTIONS 5;
Query OK, 0 rows affected (0.00 sec)
```

`datadog` 사용자에게 프로세스 권한을 부여합니다.

```shell
mysql> GRANT PROCESS ON *.* TO 'datadog'@'%';
Query OK, 0 rows affected (0.00 sec)
```

복제 클라이언트를 확인합니다. `<UNIQUEPASSWORD>`를 위에서 생성한 비밀번호로 바꿉니다.

```shell
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show slave status" && \
echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
echo -e "\033[0;31mMissing REPLICATION CLIENT grant\033[0m"
```

활성화하면 추가 권한을 부여하여 `performance_schema` 데이터베이스에서 메트릭 을 수집할 수 있습니다:

```shell
mysql> show databases like 'performance_schema';
+-------------------------------+
| Database (performance_schema) |
+-------------------------------+
| performance_schema            |
+-------------------------------+
1 row in set (0.00 sec)

mysql> GRANT SELECT ON performance_schema.* TO 'datadog'@'%';
Query OK, 0 rows affected (0.00 sec)
```

인덱스 메트릭을 수집하려면, `datadog` 사용자에게 추가 권한을 부여합니다.

```shell

mysql> GRANT SELECT ON mysql.innodb_index_stats TO 'datadog'@'%';
Query OK, 0 rows affected (0.00 sec)
```

### 설정

호스트에서 실행되는 에이전트 점검을 설정하려면 아래 지침을 따르세요. 컨테이너화된 환경의 경우 [도커(Docker)](?tab=docker#docker), [쿠버네티스(Kubernetes)](?tab=kubernetes#kubernetes) 또는 [ECS](?tab=ecs#ecs) 섹션을 참조하세요.

**참고**: 사용 가능한 구성 옵션의 전체 목록은 [샘플 mysql.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example)을 참고하세요.

{{< tabs >}}

{{% tab "Host" %}}

#### 호스트

호스트에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

[Agent 구성 디렉터리](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) 루트에서 `conf.d/` 폴더의 `mysql.d/conf.yaml` 파일을 편집하여 MySQL [메트릭](#metric-collection) 및 [로그](#log-collection) 수집을 시작하세요.

사용 가능한 구성 옵션의 전체 목록은 [샘플 `mysql.d/conf.yaml`](https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example)을 참고하세요.

##### 메트릭 수집

- `mysql.d/conf.yaml`에 이 설정 블록을 추가하여 [MySQL 메트릭](#metrics)을 수집합니다.

  ```yaml
  init_config:

  instances:
    - host: 127.0.0.1
      username: datadog
      password: "<YOUR_CHOSEN_PASSWORD>" # from the CREATE USER step earlier
      port: "<YOUR_MYSQL_PORT>" # e.g. 3306
      options:
        replication: false
        galera_cluster: true
        extra_status_metrics: true
        extra_innodb_metrics: true
        schema_size_metrics: false
        disable_innodb_metrics: false
  ```

**참고**: 특수 문자가 있는 경우 비밀번호를 작은따옴표로 묶어 입력하세요.


`extra_performance_metrics`를 수집하려면 MySQL 서버에 `performance_schema`가 활성화되어 있어야 합니다. 그렇지 않은 경우 `extra_performance_metrics`를 `false`로 설정해야 합니다. `performance_schema`에 대한 자세한 내용은 [MySQL 성능 스키마 빠른 시작](https://dev.mysql.com/doc/refman/5.7/en/performance-schema-quick-start.html)을 참고하세요.

**참고**: `datadog` 사용자는 MySQL 통합 설정 을 `localhost` 대신 `host: 127.0.0.1`로 설정해야 합니다. 또는 `sock`를 사용할 수도 있습니다.

[Agent를 다시 시작](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)하여 MySQL 메트릭을 Datadog으로 전송합니다.

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

1. 기본적으로 MySQL은 읽기 위해 루트 액세스 권한이 필요한 모든 항목을 `/var/log/syslog`에서 기록합니다. 로그에 더 쉽게 액세스할 수 있도록 하려면 다음 단계를 따르세요:

   - `/etc/mysql/conf.d/mysqld_safe_syslog.cnf`를 수정하고 해당 줄을 삭제하거나 댓글을 달 수 있습니다.

   - `/etc/mysql/my.cnf`를 편집하고 다음 줄을 추가하여 일반, 오류 및 느린 쿼리 로그를 활성화합니다.

     ```conf
       [mysqld_safe]
       log_error = /var/log/mysql/mysql_error.log

       [mysqld]
       general_log = on
       general_log_file = /var/log/mysql/mysql.log
       log_error = /var/log/mysql/mysql_error.log
       slow_query_log = on
       slow_query_log_file = /var/log/mysql/mysql_slow.log
       long_query_time = 2
     ```

   - 파일을 저장하고 다음 명령을 사용하여 MySQL을 다시 시작합니다.
     `service mysql restart`

   - 에이전트 디렉터리와 그 안의 모든 파일에 대한 읽기 권한이 `/var/log/mysql` 디렉터리에 있는지 확인합니다. 설정 로그 로테이션을 두 번 점검하여 해당 파일이 고려되고 권한도 올바르게 설정되었는지 확인합니다.

   - `/etc/logrotate.d/mysql-server`에는 다음과 유사한 내용이 있습니다:

     ```text
       /var/log/mysql.log /var/log/mysql/mysql.log /var/log/mysql/mysql_slow.log {
               daily
               rotate 7
               missingok
               create 644 mysql adm
               Compress
       }
     ```

1. 로그 수집은 Datadog 에이전트에서 기본적으로 비활성화되어 있습니다. `datadog.yaml` 파일에서 활성화합니다.

   ```yaml
   logs_enabled: true
   ```

1. MySQL 로그 수집을 시작하려면 이 설정 블록을 `mysql.d/conf.yaml` 파일에 추가합니다:

   ```yaml
   logs:
     - type: file
       path: "<ERROR_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"

     - type: file
       path: "<SLOW_QUERY_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"
       log_processing_rules:
         - type: multi_line
           name: new_slow_query_log_entry
           pattern: "# Time:"
           # If mysqld was started with `--log-short-format`, use:
           # pattern: "# Query_time:"
           # If using mysql version <5.7, use the following rules instead:
           # - type: multi_line
           #   name: new_slow_query_log_entry
           #   pattern: "# Time|# User@Host"
           # - type: exclude_at_match
           #   name: exclude_timestamp_only_line
           #   pattern: "# Time:"

     - type: file
       path: "<GENERAL_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"
       # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
       # log_processing_rules:
       #   - type: multi_line
       #     name: new_log_start_with_date
       #     pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       # If the logs start with a date with the format yymmdd but include a timestamp with each new second, rather than with each log, uncomment the following processing rule
       # log_processing_rules:
       #   - type: multi_line
       #     name: new_logs_do_not_always_start_with_timestamp
       #     pattern: \t\t\s*\d+\s+|\d{6}\s+\d{,2}:\d{2}:\d{2}\t\s*\d+\s+
   ```

   사용자 정의 메트릭을 포함한 사용 가능한 모든 구성 옵션은 [샘플 mysql.yaml](https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example)에서 확인할 수 있습니다.

1. [Agent를 다시 시작합니다](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Docker" %}}

#### 도커(Docker)

컨테이너에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에서 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker)을 Docker 레이블로 설정합니다.

```yaml
LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"server": "%%host%%", "username": "datadog","password": "<UNIQUEPASSWORD>"}]'
```

레이블 대신 환경 변수로 `<UNIQUEPASSWORD>`를 사용하는 방법은 [Autodiscovery 템플릿 변수](https://docs.datadoghq.com/agent/faq/template_variables/)를 참고하세요.

#### 로그 수집

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Docker 로그 수집](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation)을 참고하세요.

그런 다음 [로그 통합](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations)을 Docker 레이블로 설정합니다.

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"mysql","service":"mysql"}]'
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

#### Kubernetes

쿠버네티스에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에서 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes)을 포드 주석으로 설정합니다. 또는 [파일, 구성 맵, 키-값 저장소](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration)를 사용하여 템플릿을 구성할 수 있습니다.

**Annotations v1**(Datadog Agent v7.36 미만)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mysql
  annotations:
    ad.datadoghq.com/mysql.check_names: '["mysql"]'
    ad.datadoghq.com/mysql.init_configs: '[{}]'
    ad.datadoghq.com/mysql.instances: |
      [
        {
          "server": "%%host%%", 
          "username": "datadog",
          "password": "<UNIQUEPASSWORD>"
        }
      ]
  labels:
    name: mysql
spec:
  containers:
    - name: mysql
```

**주석 v2**(Datadog 에이전트 v7.36 이상용)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mysql
  annotations:
    ad.datadoghq.com/mysql.checks: |
      {
        "mysql": {
          "instances": [
            {
              "server": "%%host%%", 
              "username": "datadog",
              "password": "<UNIQUEPASSWORD>"
            }
          ]
        }
      }
  labels:
    name: mysql
spec:
  containers:
    - name: mysql
```

레이블 대신 환경 변수로 `<UNIQUEPASSWORD>`를 사용하는 방법은 [Autodiscovery 템플릿 변수](https://docs.datadoghq.com/agent/faq/template_variables/)를 참고하세요.

#### 로그 수집

Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [Kubernetes 로그 수집](https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup)을 참고하세요.

그런 다음 [로그 통합](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations)을 파드 어노테이션으로 설정합니다. 또는 [파일, 구성 맵, 키-값 저장소](https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset#configuration)를 사용하여 구성할 수 있습니다.

**Annotations v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mysql
  annotations:
    ad.datadoghq.com/mysql.logs: '[{"source": "mysql", "service": "mysql"}]'
  labels:
    name: mysql
```

{{% /tab %}}

{{% tab "ECS" %}}

#### ECS

ECS에서 실행 중인 에이전트에 이 점검을 구성하는 방법:

##### 메트릭 수집

애플리케이션 컨테이너에서 [Autodiscovery 통합 템플릿](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker)을 Docker 레이블로 설정합니다.

```json
{
  "containerDefinitions": [{
    "name": "mysql",
    "image": "mysql:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"mysql\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"server\": \"%%host%%\", \"username\": \"datadog\",\"password\": \"<UNIQUEPASSWORD>\"}]"
    }
  }]
}
```

레이블 대신 환경 변수로 `<UNIQUEPASSWORD>`를 사용하는 방법은 [Autodiscovery 템플릿 변수](https://docs.datadoghq.com/agent/faq/template_variables/)를 참고하세요.

##### 로그 수집

_에이전트 버전 > 6.0에서 사용 가능_

Datadog Datadog Agent에서는 로그 수집 기능이 기본적으로 비활성화되어 있습니다. 활성화하려면 [ECS 로그 수집](https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux)을 참고하세요.

그런 다음 [로그 통합](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations)을 Docker 레이블로 설정합니다.

```yaml
{
  "containerDefinitions": [{
    "name": "mysql",
    "image": "mysql:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"mysql\",\"service\":\"mysql\"}]"
    }
  }]
}
```

{{% /tab %}}

{{< /tabs >}}

### 검증

[Agent 상태 하위 명령](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information)을 실행하고 Checks 섹션에서 `mysql`을 찾습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **mysql.binlog.cache_disk_use** <br>(게이지) | 임시 바이너리 로그 캐시를 사용했지만 `binlog_cache_size` 값을 초과하고, 트랜잭션의 명령문을 저장하기 위해 임시 파일을 사용한 트랜잭션 수.<br>_ transaction으로 표시됨_ |
| **mysql.binlog.cache_use** <br>(게이지) | 바이너리 로그 캐시를 사용한 트랜잭션 수.<br>_ transaction으로 표시됨_ |
| **mysql.binlog.disk_use** <br>(게이지) | 전체 바이너리 로그 파일 크기.<br>_byte로 표시됨_ |
| **mysql.galera.wsrep_cert_deps_distance** <br>(게이지) | 노드가 병렬로 적용할 수 있는 최소 및 최대 시퀀스 번호(seqno) 값 사이의 평균 간격 표시.|
| **mysql.galera.wsrep_cluster_size** <br>(게이지) | Galera 클러스터의 현재 노드 수.<br>_node로 표시됨_ |
| **mysql.galera.wsrep_flow_control_paused** <br>(게이지) | FLUSH STATUS가 마지막으로 호출된 이후 노드가 Flow Control로 인해 일시 중지된 시간의 비율 표시.<br>_fraction으로 표시됨_ |
| **mysql.galera.wsrep_flow_control_paused_ns** <br>(개수) | Flow Control로 인한 일시 정지 시간을 나노초 단위로 표시.<br>_nanosecond로 표시됨_ |
| **mysql.galera.wsrep_flow_control_recv** <br>(개수) | Galera 노드가 다른 노드로부터 Flow Control 일시중지 메시지를 수신한 횟수 표시.|
| **mysql.galera.wsrep_flow_control_sent** <br>(개수) | Galera 노드가 다른 노드에 Flow Control 일시 중지 메시지를 전송한 횟수 표시.|
| **mysql.galera.wsrep_local_cert_failures** <br>(개수) | 인증 테스트에 실패한 로컬 트랜잭션의 총 수.|
| **mysql.galera.wsrep_local_recv_queue** <br>(게이지) | 로컬 수신 대기열의 현재(순간) 크기 표시.|
| **mysql.galera.wsrep_local_recv_queue_avg** <br>(게이지) | 마지막 FLUSH STATUS 쿼리 이후 로컬 수신 대기열의 평균 크기 표시.|
| **mysql.galera.wsrep_local_send_queue** <br>(게이지) | 마지막 FLUSH STATUS 쿼리 이후 전송 대기열 길이의 현재(순간) 크기 표시.|
| **mysql.galera.wsrep_local_send_queue_avg** <br>(게이지) | 마지막 FLUSH STATUS 쿼리 이후 전송 대기열 길이의 평균 표시.|
| **mysql.galera.wsrep_local_state** <br>(게이지) | 내부 Galera 클러스터 상태 번호|
| **mysql.galera.wsrep_received** <br>(게이지) | 다른 노드로부터 받은 writeset의 총 수.|
| **mysql.galera.wsrep_received_bytes** <br>(게이지) | 다른 노드로부터 받은 writeset의 총 크기(바이트).|
| **mysql.galera.wsrep_replicated_bytes** <br>(게이지) | 다른 노드로 전송된 writeset의 총 크기(바이트).|
| **mysql.index.deletes** <br>(게이지) | 인덱스를 사용한 삭제 작업 횟수. 데이터베이스 재시작 시 0으로 재설정됨.<br>_operation으로 표시됨_ |
| **mysql.index.reads** <br>(게이지) | 인덱스를 사용한 읽기 작업 수. 데이터베이스 재시작 시 0으로 재설정됨.<br>_operation으로 표시됨_ |
| **mysql.index.size** <br>(게이지) | 인덱스 크기(바이트)<br>_byte로 표시됨_ |
| **mysql.index.updates** <br>(게이지) | 인덱스를 사용한 업데이트 작업 수. 데이터베이스 재시작 시 0으로 재설정됨.<br>_operation으로 표시됨_ |
| **mysql.info.schema.size** <br>(게이지) | 스키마 크기(MiB)<br>_mebibyte로 표시됨_ |
| **mysql.info.table.data_size** <br>(게이지) | 테이블 데이터 크기(MiB)<br>_mebibyte로 표시됨_ |
| **mysql.info.table.index_size** <br>(게이지) | 테이블 인덱스 크기(MiB)<br>_mebibyte로 표시됨_ |
| **mysql.info.table.rows.changed** <br>(개수) | 테이블당 변경된 총 행 수(Percona userstat 전용)<br>_row로 표시됨_ |
| **mysql.info.table.rows.read** <br>(개수) | 테이블당 읽은 총 행 수(Percona userstat 전용)<br>_row로 표시됨_ |
| **mysql.innodb.active_transactions** <br>(게이지) | InnoDB 테이블의 활성 트랜잭션 수.<br>_operation으로 표시됨_ |
| **mysql.innodb.buffer_pool_data** <br>(게이지) | 데이터를 포함하는 InnoDB 버퍼 풀의 총 바이트 수. 이 숫자에는 더티 페이지와 클린 페이지가 모두 포함됩니다.<br>_byte로 표시됨_ |
| **mysql.innodb.buffer_pool_dirty** <br>(게이지) | InnoDB 버퍼 풀의 더티 페이지에 보관된 총 현재 바이트 수.<br>_byte로 표시됨_ |
| **mysql.innodb.buffer_pool_free** <br>(게이지) | InnoDB 버퍼 풀의 여유 바이트 수.<br>_byte로 표시됨_ |
| **mysql.innodb.buffer_pool_pages_data** <br>(게이지) | 데이터가 포함된 InnoDB 버퍼 풀의  페이지 수. 이 수에는 더티 페이지와 클린 페이지가 모두 포함됩니다.<br>_page로 표시됨_ |
| **mysql.innodb.buffer_pool_pages_dirty** <br>(게이지) | InnoDB 버퍼 풀에 있는 더티 페이지의 현재 수.<br>_page로 표시됨_ |
| **mysql.innodb.buffer_pool_pages_flushed** <br>(게이지) | InnoDB 버퍼 풀에서 페이지를 플러시하기 위한 요청 수.<br>_page로 표시됨_ |
| **mysql.innodb.buffer_pool_pages_free** <br>(게이지) | InnoDB 버퍼 풀의 사용 가능한 페이지 수.<br>_page로 표시됨_ |
| **mysql.innodb.buffer_pool_pages_total** <br>(게이지) | InnoDB 버퍼 풀의 총 크기(페이지 단위).<br>_page로 표시됨_ |
| **mysql.innodb.buffer_pool_read_ahead** <br>(게이지) | 읽기 선행 백그라운드 스레드가 InnoDB 버퍼 풀로 읽어 들인 페이지 수.<br>_page로 표시됨_ |
| **mysql.innodb.buffer_pool_read_ahead_evicted** <br>(게이지) | 읽기 선행 백그라운드 스레드에 의해 InnoDB 버퍼 풀로 읽혀진 페이지 수로, 쿼리에 의해 액세스되지 않고 나중에 제거된 페이지 수.<br>_page로 표시됨_ |
| **mysql.innodb.buffer_pool_read_ahead_rnd** <br>(게이지) | InnoDB에서 시작된 무작위 읽기 선행 횟수. 쿼리가 테이블의 많은 부분을 무작위 순서로 스캔할 때 발생합니다.<br>_ operation으로 표시됨_ |
| **mysql.innodb.buffer_pool_read_requests** <br>(게이지) | 논리적 읽기 요청 수.<br>_read로 표시됨_ |
| **mysql.innodb.buffer_pool_reads** <br>(게이지) | InnoDB가 버퍼 풀에서 충족시킬 수 없어 디스크에서 직접 읽어야 했던 논리적 읽기 수.<br>_read로 표시됨_ |
| **mysql.innodb.buffer_pool_total** <br>(게이지) | InnoDB Buffer Pool의 총 바이트 수.<br>_byte로 표시됨_ |
| **mysql.innodb.buffer_pool_used** <br>(게이지) | InnoDB Buffer Pool에서 사용된 바이트 수.<br>_byte로 표시됨_ |
| **mysql.innodb.buffer_pool_utilization** <br>(게이지) | InnoDB Buffer Pool의 사용률.<br>_fraction으로 표시됨_ |
| **mysql.innodb.buffer_pool_wait_free** <br>(개수) | InnoDB가 페이지를 읽거나 생성해야 하는데 클린 페이지가 없는 경우, InnoDB는 먼저 일부 더티 페이지를 플러시하고 해당 작업이 완료될 때까지 기다립니다. 이 카운터는 이러한 대기 발생 횟수를 셉니다.<br>_ wait로 표시됨_ |
| **mysql.innodb.buffer_pool_write_requests** <br>(게이지) | InnoDB Buffer Pool에서 발생한 쓰기 횟수.<br>_write로 표시됨_ |
| **mysql.innodb.checkpoint_age** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 LOG 섹션에 표시된 체크포인트 경과량.|
| **mysql.innodb.current_row_locks** <br>(게이지) | 현재 행 잠금의 수.<br>_ lock으로 표시됨_ |
| **mysql.innodb.current_transactions** <br>(게이지) | 현재 InnoDB 트랜잭션<br>_transaction으로 표시됨_ |
| **mysql.innodb.data_fsyncs** <br>(게이지) | 초당 fsync() 작업 수.<br>_operation으로 표시됨_ |
| **mysql.innodb.data_pending_fsyncs** <br>(게이지) | 보류 중인 fsync() 작업의 현재 수.<br>_operation으로 표시됨_ |
| **mysql.innodb.data_pending_reads** <br>(게이지) | 현재 보류 중인 읽기 수.<br>_read로 표시됨_ |
| **mysql.innodb.data_pending_writes** <br>(게이지) | 현재 보류 중인 쓰기 수.<br>_write로 표시됨_ |
| **mysql.innodb.data_read** <br>(게이지) | 초당 읽은 데이터 양.<br>_byte로 표시됨_ |
| **mysql.innodb.data_reads** <br>(게이지) | 데이터 읽기 속도.<br>_read로 표시됨_ |
| **mysql.innodb.data_writes** <br>(게이지) | 데이터 쓰기 속도.<br>_write로 표시됨_ |
| **mysql.innodb.data_written** <br>(게이지) | 초당 기록되는 데이터 양.<br>_byte로 표시됨_ |
| **mysql.innodb.dblwr_pages_written** <br>(게이지) | 초당 doublewrite 버퍼에 기록되는 페이지 수.<br>_page로 표시됨_ |
| **mysql.innodb.dblwr_writes** <br>(게이지) | 초당 진행되는 doublewrite 작업 수.<br>_byte로 표시됨_ |
| **mysql.innodb.deadlocks** <br>(개수) | 데드락 수.<br>_lock으로 표시됨 |
| **mysql.innodb.hash_index_cells_total** <br>(게이지) | 적응형 해시 인덱스의 총 셀 수|
| **mysql.innodb.hash_index_cells_used** <br>(게이지) | 적응형 해시 인덱스의 사용된 셀 수|
| **mysql.innodb.history_list_length** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 TRANSACTIONS 섹션에 표시된 기록 목록 길이.|
| **mysql.innodb.ibuf_free_list** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 INSERT BUFFER AND ADAPTIVE HASH INDEX 섹션에 표시된 인덱스 버퍼 사용 가능 목록.|
| **mysql.innodb.ibuf_merged** <br>(게이지) | 인서트 버퍼와 적응형 해시 인덱스가 병합됨<br>_operation으로 표시_ |
| **mysql.innodb.ibuf_merged_delete_marks** <br>(게이지) | 인서트 버퍼 및 적응형 해시 인덱스 병합 삭제 표시<br>_operation으로 표시_ |
| **mysql.innodb.ibuf_merged_deletes** <br>(게이지) | 인서트 버퍼 및 적응형 해시 인덱스 병합 삭제<br>_operation으로 표시_ |
| **mysql.innodb.ibuf_merged_inserts** <br>(게이지) | 인서트 버퍼와 적응형 해시 인덱스 병합 삽입<br>_operation으로 표시_ |
| **mysql.innodb.ibuf_merges** <br>(게이지) | 인서트 버퍼 및 적응형 해시 인덱스 병합<br>_operation으로 표시_ |
| **mysql.innodb.ibuf_segment_size** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 INSERT BUFFER AND ADAPTIVE HASH INDEX 섹션에 표시된 인서트 버퍼 세그먼트 크기|
| **mysql.innodb.ibuf_size** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 INSERT BUFFER AND ADAPTIVE HASH INDEX 섹션에 표시된 인서트 버퍼 크기|
| **mysql.innodb.lock_structs** <br>(게이지) | 락 구조체<br>_operation으로 표시됨_ |
| **mysql.innodb.locked_tables** <br>(게이지) | 잠긴 테이블<br>_operation으로 표시됨_ |
| **mysql.innodb.log_waits** <br>(게이지) | 로그 버퍼가 너무 작아서 계속 진행하기 전에 플러시될 때까지 대기해야 했던 횟수.<br>_wait로 표시됨_ |
| **mysql.innodb.log_write_requests** <br>(게이지) | InnoDB redo 로그에 대한 쓰기 요청 수.<br>_write로 표시됨_ |
| **mysql.innodb.log_writes** <br>(게이지) | InnoDB redo 로그 파일에 대한 물리적 쓰기 횟수.<br>_write로 표시됨_ |
| **mysql.innodb.lsn_current** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 LOG 섹션에 표시된 로그 시퀀스 번호.|
| **mysql.innodb.lsn_flushed** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 LOG 섹션에 표시된 로그 시퀀스 번호까지 플러시됨.|
| **mysql.innodb.lsn_last_checkpoint** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 LOG 섹션에 표시된 마지막 체크포인트의 로그 시퀀스 번호.|
| **mysql.innodb.mem_adaptive_hash** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 BUFFER POOL AND MEMORY 섹션에 표시된 것과 같음.<br>_byte로 표시됨_ |
| **mysql.innodb.mem_additional_pool** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 BUFFER POOL AND MEMORY 섹션에 표시된 것과 같음. MySQL 5.6에서만 사용 가능.<br>_byte로 표시됨_ |
| **mysql.innodb.mem_dictionary** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 BUFFER POOL AND MEMORY 섹션에 표시된 것과 같음.<br>_byte로 표시됨_ |
| **mysql.innodb.mem_file_system** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 BUFFER POOL AND MEMORY 섹션에 표시된 것과 같음.|
| **mysql.innodb.mem_lock_system** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 BUFFER POOL AND MEMORY 섹션에 표시된 것과 같음.|
| **mysql.innodb.mem_page_hash** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 BUFFER POOL AND MEMORY 섹션에 표시된 것과 같음.|
| **mysql.innodb.mem_recovery_system** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 BUFFER POOL AND MEMORY 섹션에 표시된 것과 같음.|
| **mysql.innodb.mem_total** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 BUFFER POOL AND MEMORY 섹션에 표시된 것과 같음.<br>_byte로 표시됨_ |
| **mysql.innodb.mutex_os_waits** <br>(게이지) | 뮤텍스 OS 대기 시간. MySQL 5.6 및 5.7에서만 사용 가능.<br>_event로 표시됨_ |
| **mysql.innodb.mutex_spin_rounds** <br>(게이지) | 뮤텍스 스핀 반복 비율. MySQL 5.6 및 5.7에서만 사용 가능.<br> _ event로 표시됨_ |
| **mysql.innodb.mutex_spin_waits** <br>(게이지) | 뮤텍스 스핀 대기 시간. MySQL 5.6 및 5.7에서만 사용 가능.<br>_ event로 표시됨_ |
| **mysql.innodb.os_file_fsyncs** <br>(게이지) | (델타) InnoDB에서 수행한 fsync() 작업의 총 수.<br>_operation으로 표시됨_ |
| **mysql.innodb.os_file_reads** <br>(게이지) | (델타) InnoDB 내에서 읽기 스레드가 수행한 총 파일 읽기 수.<br>_operation으로 표시됨_ |
| **mysql.innodb.os_file_writes** <br>(게이지) | (델타) InnoDB 내에서 쓰기 스레드가 수행한 총 파일 쓰기 수.<br>_operation으로 표시됨_ |
| **mysql.innodb.os_log_fsyncs** <br>(게이지) | 로그 파일에 대한 fsync 쓰기 속도.<br>_write로 표시됨_ |
| **mysql.innodb.os_log_pending_fsyncs** <br>(게이지) | 보류 중인 InnoDB 로그 fsync(디스크 동기화) 요청 수.<br>_operation으로 표시됨_ |
| **mysql.innodb.os_log_pending_writes** <br>(게이지) | 보류 중인 InnoDB 로그 쓰기 수.<br>_write로 표시됨_ |
| **mysql.innodb.os_log_written** <br>(게이지) | InnoDB 로그에 기록된 바이트 수.<br>_byte로 표시됨_ |
| **mysql.innodb.pages_created** <br>(게이지) | 생성된 InnoDB 페이지 수.<br>_page로 표시됨_ |
| **mysql.innodb.pages_read** <br>(게이지) | 읽은 InnoDB 페이지 수.<br>_page로 표시됨_ |
| **mysql.innodb.pages_written** <br>(게이지) | 작성된 InnoDB 페이지 수.<br>_page로 표시됨_ |
| **mysql.innodb.pending_aio_log_ios** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 FILE I/O 섹션에 표시된 것과 같음.|
| **mysql.innodb.pending_aio_sync_ios** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 FILE I/O 섹션에 표시된 것과 같음.|
| **mysql.innodb.pending_buffer_pool_flushes** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 FILE I/O 섹션에 표시된 것과 같음.<br>_flush로 표시됨_ |
| **mysql.innodb.pending_checkpoint_writes** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 FILE I/O 섹션에 표시된 것과 같음.|
| **mysql.innodb.pending_ibuf_aio_reads** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 FILE I/O 섹션에 표시된 것과 같음.|
| **mysql.innodb.pending_log_flushes** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 FILE I/O 섹션에 표시된 것과 같음. MySQL 5.6 및 5.7에서만 사용 가능.<br>_flush로 표시됨_ |
| **mysql.innodb.pending_log_writes** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 FILE I/O 섹션에 표시된 것과 같음. MySQL 5.6 및 5.7에서만 사용 가능.<br>_write로 표시됨_ |
| **mysql.innodb.pending_normal_aio_reads** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 FILE I/O 섹션에 표시된 것과 같음.<br>_read로 표시됨_ |
| **mysql.innodb.pending_normal_aio_writes** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 FILE I/O 섹션에 표시된 것과 같음.<br>_write로 표시됨_ |
| **mysql.innodb.queries_inside** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 FILE I/O 섹션에 표시된 것과 같음.<br>_query로 표시됨_ |
| **mysql.innodb.queries_queued** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 FILE I/O 섹션에 표시된 것과 같음.<br>_query로 표시됨_ |
| **mysql.innodb.read_views** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 FILE I/O 섹션에 표시된 것과 같음.|
| **mysql.innodb.row_lock_current_waits** <br>(게이지) | InnoDB 테이블에서 현재 작업이 대기하고 있는 행 잠금 수.|
| **mysql.innodb.row_lock_time** <br>(게이지) | 행 잠금 획득에 소요된 시간.<br>_ millisecond로 표시됨_ |
| **mysql.innodb.row_lock_waits** <br>(게이지) | 초당 행 잠금 대기 발생 횟수.<br>_event로 표시됨_ |
| **mysql.innodb.rows_deleted** <br>(게이지) | InnoDB 테이블에서 삭제된 행 수.<br>_row로 표시됨_ |
| **mysql.innodb.rows_inserted** <br>(게이지) | InnoDB 테이블에 삽입된 행 수.<br>_row로 표시됨_ |
| **mysql.innodb.rows_read** <br>(게이지) | InnoDB 테이블에서 읽은 행 수.<br>_row로 표시됨_ |
| **mysql.innodb.rows_updated** <br>(게이지) | InnoDB 테이블에서 업데이트된 행 수.<br>_row로 표시됨_ |
| **mysql.innodb.s_lock_os_waits** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 SEMAPHORES 섹션에 표시된 것과 같음.|
| **mysql.innodb.s_lock_spin_rounds** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 SEMAPHORES 섹션에 표시된 것과 같음.|
| **mysql.innodb.s_lock_spin_waits** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 SEMAPHORES 섹션에 표시된 것과 같음.<br>_wait로 표시됨_ |
| **mysql.innodb.semaphore_wait_time** <br>(게이지) | 세마포어 대기 시간|
| **mysql.innodb.semaphore_waits** <br>(게이지) | InnoDB 테이블에서 현재 작업이 기다리고 있는 세마포어 번호.|
| **mysql.innodb.tables_in_use** <br>(게이지) | 사용 중인 테이블<br>_operation으로 표시됨_ |
| **mysql.innodb.x_lock_os_waits** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 SEMAPHORES 섹션에 표시된 것과 같음.<br>_wait로 표시됨_ |
| **mysql.innodb.x_lock_spin_rounds** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 SEMAPHORES 섹션에 표시된 것과 같음.|
| **mysql.innodb.x_lock_spin_waits** <br>(게이지) | SHOW ENGINE INNODB STATUS 출력의 SEMAPHORES 섹션에 표시된 것과 같음.<br>_wait로 표시됨_ |
| **mysql.myisam.key_buffer_bytes_unflushed** <br>(게이지) | MyISAM 키 버퍼 중 플러시되지 않은 바이트 수.<br>_byte로 표시됨_ |
| **mysql.myisam.key_buffer_bytes_used** <br>(게이지) | MyISAM 키 버퍼에서 사용된 바이트 수.<br>_byte로 표시됨_ |
| **mysql.myisam.key_buffer_size** <br>(게이지) | 인덱스 블록에 사용되는 버퍼의 크기.<br>_byte로 표시됨_ |
| **mysql.myisam.key_read_requests** <br>(게이지) | MyISAM 키 캐시에서 키 블록을 읽기 위한 요청 수.<br>_read로 표시됨_ |
| **mysql.myisam.key_reads** <br>(게이지) | 디스크에서 MyISAM 키 캐시로 키 블록을 물리적으로 읽는 횟수. `key_reads`가 큰 경우, key_buffer_size 값이 너무 작을 가능성이 높습니다. 캐시 미스율은 `key_reads`/`key_read_requests`로 계산할 수 있습니다.<br>_read로 표시됨 |
| **mysql.myisam.key_write_requests** <br>(게이지) | MyISAM 키 캐시에 키 블록을 쓰기 위한 요청 수.<br>_write로 표시됨_ |
| **mysql.myisam.key_writes** <br>(게이지) | MyISAM 키 캐시에서 디스크로 키 블록을 물리적으로 쓰는 횟수.<br>_write로 표시됨_ |
| **mysql.net.aborted_clients** <br>(게이지) | 클라이언트가 정상적으로 연결을 종료하지 않아 중단된 연결 수.<br>_connection으로 표시됨_ |
| **mysql.net.aborted_connects** <br>(게이지) | MySQL 서버에 연결하려는 시도가 실패한 횟수.<br>_connection으로 표시됨_ |
| **mysql.net.connections** <br>(게이지) | 서버에 대한 연결 속도.<br>_connection으로 표시됨_ |
| **mysql.net.max_connections** <br>(게이지) | 서버가 시작된 이후 동시에 사용된 최대 연결 수.<br>_connection으로 표시됨_ |
| **mysql.net.max_connections_available** <br>(게이지) | 동시에 허용되는 최대 클라이언트 연결 수.<br>_connection으로 표시됨_ |
| **mysql.performance.bytes_received** <br>(게이지) | 모든 클라이언트로부터 수신된 바이트 수.<br>_byte로 표시됨_ |
| **mysql.performance.bytes_sent** <br>(게이지) | 모든 클라이언트에 전송된 바이트 수.<br>_byte로 표시됨_ |
| **mysql.performance.com_delete** <br>(게이지) | delete 명령문 비율.<br>_query로 표시됨_ |
| **mysql.performance.com_delete_multi** <br>(게이지) | delete-multi 명령문 비율.<br>_query로 표시됨_ |
| **mysql.performance.com_insert** <br>(게이지) | insert 명령문 비율.<br>_query로 표시됨_ |
| **mysql.performance.com_insert_select** <br>(게이지) | insert-select 명령문 비율.<br>_query로 표시됨_ |
| **mysql.performance.com_load** <br>(게이지) | load 명령문 비율.<br>_query로 표시됨_ |
| **mysql.performance.com_replace** <br>(게이지) | replace 명령문 비율.<br>_query로 표시됨_ |
| **mysql.performance.com_replace_select** <br>(게이지) | replace-select 명령문 비율.<br>_query로 표시됨_ |
| **mysql.performance.com_select** <br>(게이지) | select 명령문 비율.<br>_query로 표시됨_ |
| **mysql.performance.com_update** <br>(게이지) | update 명령문 비율.<br>_query로 표시됨_ |
| **mysql.performance.com_update_multi** <br>(게이지) | pdate-multi 비율.<br>_query로 표시됨_ |
| **mysql.performance.cpu_time** <br>(게이지) | MySQL에서 사용된 CPU 시간의 백분율.<br>_percent로 표시됨_ |
| **mysql.performance.created_tmp_disk_tables** <br>(게이지) | 서버가 명령문을 실행하는 동안 초당 생성되는 내부 디스크 임시 테이블의 비율.<br>_table로 표시됨_ |
| **mysql.performance.created_tmp_files** <br>(게이지) | 초당 생성되는 임시 파일 비율.<br>_file로 표시됨_ |
| **mysql.performance.created_tmp_tables** <br>(게이지) | 서버가 명령문을 실행하는 동안 초당 생성되는 내부 임시 테이블의 비율.<br>_table로 표시됨_ |
| **mysql.performance.digest_95th_percentile.avg_us** <br>(게이지) | 스키마당 95번째 백분위수의 쿼리 응답 시간.<br>_microsecond로 표시됨_ |
| **mysql.performance.handler_commit** <br>(게이지) | 내부 COMMIT 명령문 수.<br>_operation으로 표시됨_ |
| **mysql.performance.handler_delete** <br>(게이지) | 내부 DELETE 명령문 수.<br>_operation으로 표시됨_ |
| **mysql.performance.handler_prepare** <br>(게이지) | 내부 PREPARE 명령문 수.<br>_operation으로 표시됨_ |
| **mysql.performance.handler_read_first** <br>(게이지) | 내부 READ_FIRST 명령문 수.<br>_operation으로 표시됨_ |
| **mysql.performance.handler_read_key** <br>(게이지) | 내부 READ_KEY  명령문 수.<br>_operation으로 표시됨_ |
| **mysql.performance.handler_read_next** <br>(게이지) | 내부 READ_NEXT 명령문 수.<br>_operation으로 표시됨_ |
| **mysql.performance.handler_read_prev** <br>(게이지) | 내부 READ_PREV 명령문 수.<br>_operation으로 표시됨_ |
| **mysql.performance.handler_read_rnd** <br>(게이지) | 내부 READ_RND 명령문 수.<br>_operation으로 표시됨_ |
| **mysql.performance.handler_read_rnd_next** <br>(게이지) | 내부 READ_RND_NEXT 명령문 수.<br>_operation으로 표시됨_ |
| **mysql.performance.handler_rollback** <br>(게이지) | 내부 ROLLBACK 명령문 수.<br>_operation으로 표시됨_ |
| **mysql.performance.handler_update** <br>(게이지) | 내부 UPDATE 명령문 수.<br>_operation으로 표시됨_ |
| **mysql.performance.handler_write** <br>(게이지) | 내부 WRITE 명령문 수.<br>_operation으로 표시됨_ |
| **mysql.performance.kernel_time** <br>(게이지) | MySQL이 커널 공간에서 소비한 CPU 시간의 백분율.<br>_percent로 표시됨_ |
| **mysql.performance.key_cache_utilization** <br>(게이지) | 키 캐시 활용률.<br>_fraction으로 표시됨_ |
| **mysql.performance.max_prepared_stmt_count** <br>(게이지) | 서버에서 허용되는 준비된 명령문의 최대 개수|
| **mysql.performance.open_files** <br>(게이지) | 열려 있는 파일의 수.<br>_file로 표시됨_ |
| **mysql.performance.open_tables** <br>(게이지) | 열려 있는 테이블의 수.<br>_table로 표시됨_ |
| **mysql.performance.opened_tables** <br>(게이지) | 열린 테이블의 개수입니다. `opened_tables` 값이 크면 `table_open_cache` 값이 너무 작을 가능성이 높습니다. <br>_table로 표시됨_ |
| **mysql.performance.performance_schema_digest_lost** <br>(게이지) | events_statements_summary_by_digest 테이블에 계측할 수 없는 다이제스트 인스턴스 수입니다. performance_schema_digests_size 값이 너무 작으면 0이 아닐 수 있습니다.|
| **mysql.performance.prepared_stmt_count** <br>(게이지) | 준비된 명령문의 현재 개수.<br>_query로 표시됨_ |
| **mysql.performance.qcache.utilization** <br>(게이지) | 현재 사용 중인 쿼리 캐시 메모리의 일부.<br>_fraction으로 표시됨_ |
| **mysql.performance.qcache_free_blocks** <br>(게이지) | 쿼리 캐시에 있는 사용 가능한 메모리 블록의 수.<br>_block으로 표시됨_ |
| **mysql.performance.qcache_free_memory** <br>(게이지) | 쿼리 캐시에 사용할 수 있는 여유 메모리 양.<br> _byte로 표시됨_ |
| **mysql.performance.qcache_hits** <br>(게이지) | 쿼리 캐시 적중률.<br>_hit로 표시됨_ |
| **mysql.performance.qcache_inserts** <br>(게이지) | 쿼리 캐시에 추가된 쿼리 수.<br>_query로 표시됨_ |
| **mysql.performance.qcache_lowmem_prunes** <br>(게이지) | 메모리 부족으로 쿼리 캐시에서 삭제된 쿼리 수.<br>_query로 표시됨_ |
| **mysql.performance.qcache_not_cached** <br>(게이지) | 캐시되지 않은 쿼리 수(캐시할 수 없거나 `query_cache_type` 설정으로 인해 캐시되지 않음).<br>_query로 표시됨_ |
| **mysql.performance.qcache_queries_in_cache** <br>(게이지) | 쿼리 캐시에 등록된 쿼리의 개수.<br>_query로 표시됨_ |
| **mysql.performance.qcache_size** <br>(게이지) | 쿼리 결과 캐싱에 할당된 메모리 양.<br>_byte로 표시됨_ |
| **mysql.performance.qcache_total_blocks** <br>(게이지) | 쿼리 캐시에 있는 총 블록 수.<br>_block으로 표시됨_ |
| **mysql.performance.queries** <br>(게이지) | 쿼리 비율.<br>_query로 표시됨_ |
| **mysql.performance.query_run_time.avg** <br>(게이지) | 스키마당 평균 쿼리 응답 시간.<br>_microsecond로 표시_ |
| **mysql.performance.questions** <br>(게이지) | 서버에서 실행된 명령문 비율.<br>_query_로 표시됨_ |
| **mysql.performance.select_full_join** <br>(게이지) | 인덱스를 사용하지 않아 테이블 스캔을 수행하는 조인 수. 값이 0이 아니면 테이블의 인덱스를 주의 깊게 확인해야 합니다.<br>_operation으로 표시됨_ |
| **mysql.performance.select_full_range_join** <br>(게이지) | 참조 테이블에서 범위 검색을 사용한 조인 수.<br>_operation으로 표시됨_ |
| **mysql.performance.select_range** <br>(게이지) | 첫 번째 테이블에서 범위를 사용한 조인 수. 값이 상당히 크더라도 심각한 문제는 아닙니다.<br>_operation으로 표시됨_ |
| **mysql.performance.select_range_check** <br>(게이지) | 각 행 후에 키 사용을 확인하는 키 없는 조인 수. 이 값이 0이 아니면 테이블의 인덱스를 주의 깊게 확인해야 합니다. _<br>_operation으로 표시됨_ |
| **mysql.performance.select_scan** <br>(게이지) | 첫 번째 테이블의 전체 스캔을 수행한 조인 수.<br>_operation으로 표시됨_ |
| **mysql.performance.slow_queries** <br>(게이지) | 느린 쿼리(특정 실행 시간을 초과하는 로그 쿼리)의 비율.<br>_query로 표시됨_ |
| **mysql.performance.sort_merge_passes** <br>(게이지) | 정렬 알고리즘이 수행한 병합 패스 수. 이 값이 크면 `sort_buffer_size` 시스템 변수 값을 늘리는 것이 좋습니다.<br>_operation으로 표시됨_ |
| **mysql.performance.sort_range** <br>(게이지) | 범위를 사용해 실행한 정렬 횟수.<br>_operation으로 표시됨_ |
| **mysql.performance.sort_rows** <br>(게이지) | 정렬된 행의 수.<br>_operation으로 표시됨_ |
| **mysql.performance.sort_scan** <br>(게이지) | 테이블을 스캔하여 실행한 정렬 횟수.<br>_operation으로 표시됨_ |
| **mysql.performance.table_cache_hits** <br>(게이지) | 오픈 테이블 캐시 조회에서 발생한 적중 횟수.<br>_hit로 표시됨_ |
| **mysql.performance.table_cache_misses** <br>(게이지) | 오픈 테이블 캐시 조회에서 놓친 횟수.<br>_miss로 표시됨_ |
| **mysql.performance.table_locks_immediate** <br>(게이지) | 테이블 잠금 요청이 즉시 승인될 수 있는 횟수.|
| **mysql.performance.table_locks_immediate.rate** <br>(게이지) | 테이블 잠금 요청이 즉시 승인된 횟수의 비율.|
| **mysql.performance.table_locks_waited** <br>(게이지) | 테이블 잠금 요청이 즉시 승인되지 않아 대기해야 했던 총 횟수.|
| **mysql.performance.table_locks_waited.rate** <br>(게이지) | 테이블 잠금 요청이 즉시 승인되지 않아 대기해야 했던 횟수의 비율.|
| **mysql.performance.table_open_cache** <br>(게이지) | 전체 스레드의 오픈 테이블 수. 이 값을 늘리면 mysqld에 필요한 파일 디스크립터의 개수가 늘어납니다.|
| **mysql.performance.thread_cache_size** <br>(게이지) | 서버가 재사용을 위해 보관하는 스레드 수. 클라이언트 연결이 끊어지면, 캐시에 저장된 스레드 수가 `thread_cache_size` 스레드 수보다 적을 경우 클라이언트의 스레드가 캐시에 보관됩니다.<br>_byte로 표시됨_ |
| **mysql.performance.threads_cached** <br>(게이지) | 스레드 캐시에 있는 스레드 수.<br>_thread로 표시됨_ |
| **mysql.performance.threads_connected** <br>(게이지) | 현재 열려있는 연결 수.<br>_connection으로 표시됨_ |
| **mysql.performance.threads_created** <br>(개수) | 연결을 처리하기 위해 생성되는 스레드 수. `threads_created`가 큰 경우 `thread_cache_size` 값을 늘리는 것이 좋습니다.<br>_thread로 표시됨_ |
| **mysql.performance.threads_running** <br>(게이지) | 잠들지 않는 스레드의 수.<br>_thread로 표시됨_ |
| **mysql.performance.user_connections** <br>(게이지) | 사용자 연결 수. 태그: `processlist_db`, `processlist_host`, `processlist_state`, `processlist_user`<br>_connection으로 표시됨_ |
| **mysql.performance.user_time** <br>(게이지) | MySQL이 사용자 공간에서 사용한 CPU 시간의 백분율.<br>_percent로 표시됨_ |
| **mysql.queries.count** <br>(개수) | 정규화된 쿼리 및 스키마당 실행된 쿼리의 총 수. (DBM만 해당)<br>_query로 표시됨_ |
| **mysql.queries.errors** <br>(개수) | 정규화된 쿼리 및 스키마당 오류가 발생한 쿼리의 총 수. (DBM만 해당)<br>_error로 표시됨_ |
| **mysql.queries.lock_time** <br>(개수) | 정규화된 쿼리 및 스키마당 잠금 대기에 소요된 총 시간. (DBM만 해당)<br>_nanosecond로 표시됨_ |
| **mysql.queries.no_good_index_used** <br>(개수) | 정규화된 쿼리와 스키마당 비효율적인 인덱스를 사용한 쿼리의 총 횟수. (DBM만 해당)<br>_ query로 표시됨_ |
| **mysql.queries.no_index_used** <br>(개수) | 정규화된 쿼리 및 스키마당 인덱스를 사용하지 않는 쿼리의 총 수. (DBM만 해당)<br>_query로 표시됨_ |
| **mysql.queries.rows_affected** <br>(개수) | 정규화된 쿼리 및 스키마당 변형된 행 수. (DBM만 해당)<br>_row로 표시됨_ |
| **mysql.queries.rows_examined** <br>(개수) | 정규화된 쿼리 및 스키마당 검사되는 행 수. (DBM만 해당)<br>_row로 표시됨_ |
| **mysql.queries.rows_sent** <br>(개수) | 정규화된 쿼리 및 스키마당 전송된 행 수. (DBM만 해당)<br>_ row로 표시됨_ |
| **mysql.queries.select_full_join** <br>(개수) | 정규화된 쿼리 및 스키마당 조인된 테이블에서 발생한 전체 테이블 스캔의 총 횟수. (DBM만 해당)|
| **mysql.queries.select_scan** <br>(개수) | 정규화된 쿼리 및 스키마당 첫 번째 테이블에서 발생한 전체 테이블 스캔의 총 횟수. (DBM만 해당)|
| **mysql.queries.time** <br>(개수) | 정규화된 쿼리 및 스키마당 총 쿼리 실행 시간. (DBM만 해당)<br>_nanosecond로 표시_ |
| **mysql.replication.group.conflicts_detected** <br>(게이지) | 충돌 감지 점검을 통과하지 못한 트랜잭션 수.<br>_transaction으로 표시됨_ |
| **mysql.replication.group.member_status** <br>(게이지) | 그룹 복제 환경의 노드 상태에 대한 정보이며 항상 1입니다.|
| **mysql.replication.group.transactions** <br>(게이지) | 충돌 감지 점검을 보류 중인 대기열의 트랜잭션 수.<br>_transaction으로 표시_ |
| **mysql.replication.group.transactions_applied** <br>(게이지) | 이 멤버가 그룹으로부터 수신하고 적용한 트랜잭션 수.<br>_transaction으로 표시됨_ |
| **mysql.replication.group.transactions_check** <br>(게이지) | 충돌 여부를 확인한 트랜잭션 수.<br>_transaction으로 표시됨_ |
| **mysql.replication.group.transactions_in_applier_queue** <br>(게이지) | 복제 그룹에서 이 멤버가 수신하여 적용을 기다리고 있는 트랜잭션 수.<br>_transaction으로 표시됨_ |
| **mysql.replication.group.transactions_proposed** <br>(게이지) | 이 멤버에서 시작되어 그룹으로 전송된 트랜잭션 수.<br>_transaction으로 표시됨_ |
| **mysql.replication.group.transactions_rollback** <br>(게이지) | 이 멤버에서 시작되어 그룹에 의해 롤백된 트랜잭션 수.<br>_transaction으로 표시됨_ |
| **mysql.replication.group.transactions_validating** <br>(게이지) | 인증에 사용할 수 있으나 아직 가비지 컬렉션되지 않은 트랜잭션 행 수.<br>_transaction으로 표시됨_ |
| **mysql.replication.replicas_connected** <br>(게이지) | 복제 소스에 연결된 복제본의 수.|
| **mysql.replication.seconds_behind_master** <br>(게이지) | 마스터와 슬레이브 간의 지연 시간(초).<br>_second로 표시_ |
| **mysql.replication.seconds_behind_source** <br>(게이지) | 소스와 복제본 사이의 지연 시간(초).<br>_second로 표시됨_ |
| **mysql.replication.slave_running** <br>(게이지) | 더 이상 사용되지 않음. 대신 서비스 점검 mysql.replication.replica_running을 사용하세요. 이 서버가 실행 중인 복제 슬레이브/마스터인지 여부를 나타내는 부울 값입니다.|
| **mysql.replication.slaves_connected** <br>(게이지) | 더 이상 사용되지 않음. 대신 `mysql.replication.replicas_connected`를 사용하세요. 복제 마스터에 연결된 슬레이브의 수입니다.|

점검은 기본적으로 모든 메트릭을 수집하지 않습니다. 다음 부울 설정 옵션을 `true`로 설정하여 각각의 메트릭을 활성화합니다:

`extra_status_metrics`는 다음 메트릭을 추가합니다.

| 메트릭 이름                                  | 메트릭 유형 |
| -------------------------------------------- | ----------- |
| mysql.binlog.cache_disk_use                  | GAUGE       |
| mysql.binlog.cache_use                       | GAUGE       |
| mysql.performance.handler_commit             | 비율(RATE)        |
| mysql.performance.handler_delete             | 비율(RATE)        |
| mysql.performance.handler_prepare            | 비율(RATE)        |
| mysql.performance.handler_read_first         | 비율(RATE)        |
| mysql.performance.handler_read_key           | 비율(RATE)        |
| mysql.performance.handler_read_next          | 비율(RATE)        |
| mysql.performance.handler_read_prev          | 비율(RATE)        |
| mysql.performance.handler_read_rnd           | 비율(RATE)        |
| mysql.performance.handler_read_rnd_next      | 비율(RATE)        |
| mysql.performance.handler_rollback           | 비율(RATE)        |
| mysql.performance.handler_update             | 비율(RATE)        |
| mysql.performance.handler_write              | 비율(RATE)        |
| mysql.performance.opened_tables              | 비율(RATE)        |
| mysql.performance.qcache_total_blocks        | GAUGE       |
| mysql.performance.qcache_free_blocks         | GAUGE       |
| mysql.performance.qcache_free_memory         | GAUGE       |
| mysql.performance.qcache_not_cached          | 비율(RATE)        |
| mysql.performance.qcache_queries_in_cache    | GAUGE       |
| mysql.performance.select_full_join           | 비율(RATE)        |
| mysql.performance.select_full_range_join     | 비율(RATE)        |
| mysql.performance.select_range               | 비율(RATE)        |
| mysql.performance.select_range_check         | 비율(RATE)        |
| mysql.performance.select_scan                | 비율(RATE)        |
| mysql.performance.sort_merge_passes          | 비율(RATE)        |
| mysql.performance.sort_range                 | 비율(RATE)        |
| mysql.performance.sort_rows                  | 비율(RATE)        |
| mysql.performance.sort_scan                  | 비율(RATE)        |
| mysql.performance.table_locks_immediate      | GAUGE       |
| mysql.performance.table_locks_immediate.rate | 비율(RATE)        |
| mysql.performance.threads_cached             | GAUGE       |
| mysql.performance.threads_created            | MONOTONIC   |

`extra_innodb_metrics`는 다음 메트릭을 추가합니다. 

| 메트릭 이름                                 | 메트릭 유형 |
| ------------------------------------------- | ----------- |
| mysql.innodb.active_transactions            | GAUGE       |
| mysql.innodb.buffer_pool_data               | GAUGE       |
| mysql.innodb.buffer_pool_pages_data         | GAUGE       |
| mysql.innodb.buffer_pool_pages_dirty        | GAUGE       |
| mysql.innodb.buffer_pool_pages_flushed      | 비율(RATE)        |
| mysql.innodb.buffer_pool_pages_free         | GAUGE       |
| mysql.innodb.buffer_pool_pages_total        | GAUGE       |
| mysql.innodb.buffer_pool_read_ahead         | 비율(RATE)        |
| mysql.innodb.buffer_pool_read_ahead_evicted | 비율(RATE)        |
| mysql.innodb.buffer_pool_read_ahead_rnd     | GAUGE       |
| mysql.innodb.buffer_pool_wait_free          | MONOTONIC   |
| mysql.innodb.buffer_pool_write_requests     | 비율(RATE)        |
| mysql.innodb.checkpoint_age                 | GAUGE       |
| mysql.innodb.current_transactions           | GAUGE       |
| mysql.innodb.data_fsyncs                    | 비율(RATE)        |
| mysql.innodb.data_pending_fsyncs            | GAUGE       |
| mysql.innodb.data_pending_reads             | GAUGE       |
| mysql.innodb.data_pending_writes            | GAUGE       |
| mysql.innodb.data_read                      | 비율(RATE)        |
| mysql.innodb.data_written                   | 비율(RATE)        |
| mysql.innodb.dblwr_pages_written            | 비율(RATE)        |
| mysql.innodb.dblwr_writes                   | 비율(RATE)        |
| mysql.innodb.hash_index_cells_total         | GAUGE       |
| mysql.innodb.hash_index_cells_used          | GAUGE       |
| mysql.innodb.history_list_length            | GAUGE       |
| mysql.innodb.ibuf_free_list                 | GAUGE       |
| mysql.innodb.ibuf_merged                    | 비율(RATE)        |
| mysql.innodb.ibuf_merged_delete_marks       | 비율(RATE)        |
| mysql.innodb.ibuf_merged_deletes            | 비율(RATE)        |
| mysql.innodb.ibuf_merged_inserts            | 비율(RATE)        |
| mysql.innodb.ibuf_merges                    | 비율(RATE)        |
| mysql.innodb.ibuf_segment_size              | GAUGE       |
| mysql.innodb.ibuf_size                      | GAUGE       |
| mysql.innodb.lock_structures                   | GAUGE       |
| mysql.innodb.locked_tables                  | GAUGE       |
| mysql.innodb.locked_transactions            | GAUGE       |
| mysql.innodb.log_waits                      | 비율(RATE)        |
| mysql.innodb.log_write_requests             | 비율(RATE)        |
| mysql.innodb.log_writes                     | 비율(RATE)        |
| mysql.innodb.lsn_current                    | 비율(RATE)        |
| mysql.innodb.lsn_flushed                    | 비율(RATE)        |
| mysql.innodb.lsn_last_checkpoint            | 비율(RATE)        |
| mysql.innodb.mem_adaptive_hash              | GAUGE       |
| mysql.innodb.mem_additional_pool            | GAUGE       |
| mysql.innodb.mem_dictionary                 | GAUGE       |
| mysql.innodb.mem_file_system                | GAUGE       |
| mysql.innodb.mem_lock_system                | GAUGE       |
| mysql.innodb.mem_page_hash                  | GAUGE       |
| mysql.innodb.mem_recovery_system            | GAUGE       |
| mysql.innodb.mem_thread_hash                | GAUGE       |
| mysql.innodb.mem_total                      | GAUGE       |
| mysql.innodb.os_file_fsyncs                 | 비율(RATE)        |
| mysql.innodb.os_file_reads                  | 비율(RATE)        |
| mysql.innodb.os_file_writes                 | 비율(RATE)        |
| mysql.innodb.os_log_pending_fsyncs          | GAUGE       |
| mysql.innodb.os_log_pending_writes          | GAUGE       |
| mysql.innodb.os_log_written                 | 비율(RATE)        |
| mysql.innodb.pages_created                  | 비율(RATE)        |
| mysql.innodb.pages_read                     | 비율(RATE)        |
| mysql.innodb.pages_written                  | 비율(RATE)        |
| mysql.innodb.pending_aio_log_ios            | GAUGE       |
| mysql.innodb.pending_aio_sync_ios           | GAUGE       |
| mysql.innodb.pending_buffer_pool_flushes    | GAUGE       |
| mysql.innodb.pending_checkpoint_writes      | GAUGE       |
| mysql.innodb.pending_ibuf_aio_reads         | GAUGE       |
| mysql.innodb.pending_log_flushes            | GAUGE       |
| mysql.innodb.pending_log_writes             | GAUGE       |
| mysql.innodb.pending_normal_aio_reads       | GAUGE       |
| mysql.innodb.pending_normal_aio_writes      | GAUGE       |
| mysql.innodb.queries_inside                 | GAUGE       |
| mysql.innodb.queries_queued                 | GAUGE       |
| mysql.innodb.read_views                     | GAUGE       |
| mysql.innodb.rows_deleted                   | 비율(RATE)        |
| mysql.innodb.rows_inserted                  | 비율(RATE)        |
| mysql.innodb.rows_read                      | 비율(RATE)        |
| mysql.innodb.rows_updated                   | 비율(RATE)        |
| mysql.innodb.s_lock_os_waits                | 비율(RATE)        |
| mysql.innodb.s_lock_spin_rounds             | 비율(RATE)        |
| mysql.innodb.s_lock_spin_waits              | 비율(RATE)        |
| mysql.innodb.semaphore_wait_time            | GAUGE       |
| mysql.innodb.semaphore_waits                | GAUGE       |
| mysql.innodb.tables_in_use                  | GAUGE       |
| mysql.innodb.x_lock_os_waits                | 비율(RATE)        |
| mysql.innodb.x_lock_spin_rounds             | 비율(RATE)        |
| mysql.innodb.x_lock_spin_waits              | 비율(RATE)        |

`extra_performance_metrics`는 다음 메트릭을 추가합니다. 

| 메트릭 이름                                     | 메트릭 유형 |
| ----------------------------------------------- | ----------- |
| mysql.performance.query_run_time.avg            | GAUGE       |
| mysql.performance.digest_95th_percentile.avg_us | GAUGE       |

`schema_size_metrics`는 다음 메트릭을 추가합니다.

| 메트릭 이름            | 메트릭 유형 |
| ---------------------- | ----------- |
| mysql.info.schema.size | GAUGE       |

### 이벤트

MySQL 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검

**mysql.can_connect**

Agent가 모니터링되는 MySQL 인스턴스에 연결할 수 없는 경우 `CRITICAL`을 반환합니다. 연결할 수 있으면`OK`를 반환합니다.

_상태: ok, critical_

**mysql.replication.slave_running**

더 이상 사용되지 않음. Slave_IO_Running 또는 Slave_SQL_Running이 실행 중이지 않은 복제본에 대해 CRITICAL을 반환하고, 둘 중 하나가 실행 중이지 않으면 WARNING을 반환합니다. 그 외에는 `OK`를 반환합니다.

_Statuses: ok, warning, critical_

**mysql.replication.replica_running**

Replica_IO_Running 또는 Replica_SQL_Running을 실행하지 않는 복제본에 대해서는 CRITICAL을 반환하고, 둘 중 하나가 실행 중이지 않으면 WARNING을 반환합니다. 그 외에는 `OK`를 반환합니다.

_Statuses: ok, warning, critical_

**mysql.replication.group.status**

호스트 상태가 ONLINE이면 `OK`를 반환하고, 그렇지 않으면 `CRITICAL`을 반환합니다.

_상태: ok, critical_

## 트러블슈팅

- [SQL Server 통합 연결 문제](https://docs.datadoghq.com/integrations/guide/connection-issues-with-the-sql-server-integration/)
- [MySQL Localhost 오류 - Localhost VS 127.0.0.1](https://docs.datadoghq.com/integrations/faq/mysql-localhost-error-localhost-vs-127-0-0-1/)
- [SQL Server 통합에서 특정 이름이 지정된 인스턴스를 사용할 수 있나요?](https://docs.datadoghq.com/integrations/faq/can-i-use-a-named-instance-in-the-sql-server-integration/)
- [Google CloudSQL에서 dd-agent MySQL 점검을 설정할 수 있나요?](https://docs.datadoghq.com/integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/)
- [MySQL 사용자 정의 쿼리](https://docs.datadoghq.com/integrations/faq/how-to-collect-metrics-from-custom-mysql-queries/)
- [더 많은 SQL Server 성능 메트릭 수집을 위해 WMI 사용](https://docs.datadoghq.com/integrations/guide/use-wmi-to-collect-more-sql-server-performance-metrics/)
- [SQL Server 통합에서 더 많은 메트릭을 수집하려면 어떻게 해야 하나요?](https://docs.datadoghq.com/integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration/)
- [데이터베이스 사용자에게 권한이 없음](https://docs.datadoghq.com/integrations/faq/database-user-lacks-privileges/)
- [SQL Stored Procedure를 사용하여 메트릭을 어떻게 수집하나요?](https://docs.datadoghq.com/integrations/guide/collect-sql-server-custom-metrics/#collecting-metrics-from-a-custom-procedure)

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [MySQL 성능 메트릭 모니터링](https://www.datadoghq.com/blog/monitoring-mysql-performance-metrics)