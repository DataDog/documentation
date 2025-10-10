---
app_id: oracle
app_uuid: 34835d2b-a812-4aac-8cc2-d298db851b80
assets:
  dashboards:
    DBM Oracle Database Overview: assets/dashboards/dbm_oracle_database_overview.json
    oracle: assets/dashboards/oracle_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: oracle.session_count
      metadata_path: metadata.csv
      prefix: oracle.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10000
    source_type_name: Oracle Database
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- network
- oracle
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/oracle/README.md
display_on_public_website: true
draft: false
git_integration_title: oracle
integration_id: oracle
integration_title: Oracle Database
integration_version: 6.0.0
is_public: true
manifest_version: 2.0.0
name: oracle
public_title: Oracle Database
short_description: 엔터프라이즈 그리드 컴퓨팅을 위해 설계된 Oracle 관계형 데이터베이스 시스템
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::Network
  - Category::Oracle
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: 엔터프라이즈 그리드 컴퓨팅을 위해 설계된 Oracle 관계형 데이터베이스 시스템
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Oracle Database
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Oracle 대시보드][1]

## 개요

Oracle 통합은 Oracle 데이터베이스 상태 및 성능 메트릭을 거의 실시간으로 제공합니다. 제공된 대시보드를 사용하여 이러한 메트릭을 시각화하고 모니터링을 생성하여 팀에 Oracle 데이터베이스 상태를 알릴 수 있습니다.

[데이터베이스 모니터링][2](DBM)을 활성화하면 쿼리 성능 및 데이터베이스 상태에 대한 향상된 인사이트를 얻을 수 있습니다. 표준 통합 기능과 더불어 Datadog DBM은 쿼리 수준 메트릭, 실시간 및 과거 쿼리 스냅샷, 대기 이벤트 분석, 데이터베이스 로드, 쿼리 설명 플랜, 차단 쿼리 인사이트 등을 제공합니다.


## 설정

### 설치

#### 사전 요구 사항

Oracle 통합을 사용하려면 기본 클라이언트(추가 설치 단계 필요 없음)나 Oracle 인스턴트 클라이언트를 사용합니다.

##### Oracle 인스턴트 클라이언트

인스턴트 클라이언트를 사용하지 않는 경우 이 단계를 건너뛰세요.

{{< tabs >}}

{{% tab "Linux" %}}
###### Linux

1. [Linux용 Oracle 인스턴트 클라이언트 설치][1] 지침을 따릅니다.

2. *인스턴트 클라이언트 베이직* 패키지가 설치되어 있는지 확인합니다. Oracle의 [다운로드 페이지][2]에서 찾을 수 있습니다.

    인스턴트 클라이언트 라이브러리를 설치한 후 다음 예시처럼 런타임 링커가 해당 라이브러리를 찾을 수 있는지 확인합니다.

      ```shell
      # Put the library location in the /etc/datadog-agent/environment file.

      echo "LD_LIBRARY_PATH=/u01/app/oracle/product/instantclient_19" \
      >> /etc/datadog-agent/environment
      ```

[1]: https://docs.oracle.com/en/database/oracle/oracle-database/19/mxcli/installing-and-removing-oracle-database-client.html
[2]: https://www.oracle.com/ch-de/database/technologies/instant-client/downloads.html
{{% /tab %}}

{{% tab "Windows" %}}
###### Windows

1. [Oracle 윈도우즈(Windows) 설치 지침][1]에 따라 Oracle 인스턴트 클라이언트를 설정합니다.

2. 다음을 확인합니다.
    - [Microsoft Visual Studio 2017 Redistributable][2] 또는 해당 버전이 Oracle 인스턴트 클라이언트에 설치되어 있습니다.

    - Oracle의 [다운로드 페이지][3]에서 *인스턴트 클라이언트 베이직* 패키지가 설치되어 있으며, 해당 머신의 모든 사용자가 사용할 수 있습니다(예: `C:\oracle\instantclient_19`).

    - `PATH` 환경변수에는 인스턴트 클라이언트(예: `C:\oracle\instantclient_19`)가 있는 디렉토리가 포함됩니다.


[1]: https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html#ic_winx64_inst
[2]: https://support.microsoft.com/en-us/topic/the-latest-supported-visual-c-downloads-2647da03-1eea-4433-9aff-95f26a218cc0
[3]: https://www.oracle.com/ch-de/database/technologies/instant-client/downloads.html
{{% /tab %}}
{{< /tabs >}}

#### Datadog 사용자 생성

{{< tabs >}}
{{% tab "Multi-tenant" %}}
##### Multi-tenant

###### 사용자 생성

읽기 전용 로그인을 생성하여 서버에 연결하고 필요한 권한을 부여하세요.

```SQL
CREATE USER c##datadog IDENTIFIED BY &password CONTAINER = ALL ;

ALTER USER c##datadog SET CONTAINER_DATA=ALL CONTAINER=CURRENT;
```

###### 권한 부여

`sysdba`로 로그온하고, 다음 권한을 부여하세요:


```SQL
grant create session to c##datadog ;
grant select on v_$session to c##datadog ;
grant select on v_$database to c##datadog ;
grant select on v_$containers to c##datadog;
grant select on v_$sqlstats to c##datadog ;
grant select on v_$instance to c##datadog ;
grant select on dba_feature_usage_statistics to c##datadog ;
grant select on V_$SQL_PLAN_STATISTICS_ALL to c##datadog ;
grant select on V_$PROCESS to c##datadog ;
grant select on V_$SESSION to c##datadog ;
grant select on V_$CON_SYSMETRIC to c##datadog ;
grant select on CDB_TABLESPACE_USAGE_METRICS to c##datadog ;
grant select on CDB_TABLESPACES to c##datadog ;
grant select on V_$SQLCOMMAND to c##datadog ;
grant select on V_$DATAFILE to c##datadog ;
grant select on V_$SYSMETRIC to c##datadog ;
grant select on V_$SGAINFO to c##datadog ;
grant select on V_$PDBS to c##datadog ;
grant select on CDB_SERVICES to c##datadog ;
grant select on V_$OSSTAT to c##datadog ;
grant select on V_$PARAMETER to c##datadog ;
grant select on V_$SQLSTATS to c##datadog ;
grant select on V_$CONTAINERS to c##datadog ;
grant select on V_$SQL_PLAN_STATISTICS_ALL to c##datadog ;
grant select on V_$SQL to c##datadog ;
grant select on V_$PGASTAT to c##datadog ;
grant select on v_$asm_diskgroup to c##datadog ;
grant select on v_$rsrcmgrmetric to c##datadog ;
grant select on v_$dataguard_config to c##datadog ;
grant select on v_$dataguard_stats to c##datadog ;
grant select on v_$transaction to c##datadog;
grant select on v_$locked_object to c##datadog;
grant select on dba_objects to c##datadog;
grant select on cdb_data_files to c##datadog;
grant select on dba_data_files to c##datadog;
```

플러그형 데이터베이스(PDB)에서 실행되는 커스텀 쿼리를 설정한 경우 `C##DATADOG` 사용자에게 `set container` 권한을 부여해야 합니다.

```SQL
connect / as sysdba
alter session set container = your_pdb ;
grant set container to c##datadog ;
```

{{% /tab %}}

{{% tab "Non-CDB" %}}
##### Non-CDB

###### 사용자 생성

읽기 전용 로그인을 생성하여 서버에 연결하고 필요한 권한을 부여하세요.

```SQL
CREATE USER datadog IDENTIFIED BY &password ;
```

###### 권한 부여

`sysdba`로 로그온하고, 다음 권한을 부여하세요:


```SQL
grant create session to datadog ;
grant select on v_$session to datadog ;
grant select on v_$database to datadog ;
grant select on v_$containers to datadog;
grant select on v_$sqlstats to datadog ;
grant select on v_$instance to datadog ;
grant select on dba_feature_usage_statistics to datadog ;
grant select on V_$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V_$PROCESS to datadog ;
grant select on V_$SESSION to datadog ;
grant select on V_$CON_SYSMETRIC to datadog ;
grant select on CDB_TABLESPACE_USAGE_METRICS to datadog ;
grant select on CDB_TABLESPACES to datadog ;
grant select on V_$SQLCOMMAND to datadog ;
grant select on V_$DATAFILE to datadog ;
grant select on V_$SYSMETRIC to datadog ;
grant select on V_$SGAINFO to datadog ;
grant select on V_$PDBS to datadog ;
grant select on CDB_SERVICES to datadog ;
grant select on V_$OSSTAT to datadog ;
grant select on V_$PARAMETER to datadog ;
grant select on V_$SQLSTATS to datadog ;
grant select on V_$CONTAINERS to datadog ;
grant select on V_$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V_$SQL to datadog ;
grant select on V_$PGASTAT to datadog ;
grant select on v_$asm_diskgroup to datadog ;
grant select on v_$rsrcmgrmetric to datadog ;
grant select on v_$dataguard_config to datadog ;
grant select on v_$dataguard_stats to datadog ;
grant select on v_$transaction to datadog;
grant select on v_$locked_object to datadog;
grant select on dba_objects to datadog;
grant select on cdb_data_files to datadog;
grant select on dba_data_files to datadog;
```

{{% /tab %}}

{{% tab "RDS" %}}
##### RDS

###### 사용자 생성

읽기 전용 로그인을 생성하여 서버에 연결하고 필요한 권한을 부여하세요.

```SQL
CREATE USER datadog IDENTIFIED BY your_password ;
```

###### 권한 허용

```SQL
grant create session to datadog ;
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SESSION','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$DATABASE','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$CONTAINERS','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQLSTATS','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQL','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$INSTANCE','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQL_PLAN_STATISTICS_ALL','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('DBA_FEATURE_USAGE_STATISTICS','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$PROCESS','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SESSION','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$CON_SYSMETRIC','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('CDB_TABLESPACE_USAGE_METRICS','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('CDB_TABLESPACES','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQLCOMMAND','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$DATAFILE','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SGAINFO','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SYSMETRIC','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$PDBS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('CDB_SERVICES','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$OSSTAT','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$PARAMETER','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQLSTATS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$CONTAINERS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQL_PLAN_STATISTICS_ALL','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQL','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$PGASTAT','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$ASM_DISKGROUP','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$RSRCMGRMETRIC','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$DATAGUARD_CONFIG','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$DATAGUARD_STATS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$TRANSACTION','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$LOCKED_OBJECT','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('DBA_OBJECTS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('CDB_DATA_FILES','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('DBA_DATA_FILES','DATADOG','SELECT',p_grant_option => false);
```

{{% /tab %}}

{{% tab "Oracle Autonomous Database" %}}
##### Oracle 자율형 데이터베이스

###### 사용자 생성

읽기 전용 로그인을 생성하여 서버에 연결하고 필요한 권한을 부여하세요.

```SQL
CREATE USER datadog IDENTIFIED BY your_password ;
```

###### 권한 허용

```SQL
grant create session to datadog ;
grant select on v$session to datadog ;
grant select on v$database to datadog ;
grant select on v$containers to datadog;
grant select on v$sqlstats to datadog ;
grant select on v$instance to datadog ;
grant select on dba_feature_usage_statistics to datadog ;
grant select on V$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V$PROCESS to datadog ;
grant select on V$SESSION to datadog ;
grant select on V$CON_SYSMETRIC to datadog ;
grant select on CDB_TABLESPACE_USAGE_METRICS to datadog ;
grant select on CDB_TABLESPACES to datadog ;
grant select on V$SQLCOMMAND to datadog ;
grant select on V$DATAFILE to datadog ;
grant select on V$SYSMETRIC to datadog ;
grant select on V$SGAINFO to datadog ;
grant select on V$PDBS to datadog ;
grant select on CDB_SERVICES to datadog ;
grant select on V$OSSTAT to datadog ;
grant select on V$PARAMETER to datadog ;
grant select on V$SQLSTATS to datadog ;
grant select on V$CONTAINERS to datadog ;
grant select on V$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V$SQL to datadog ;
grant select on V$PGASTAT to datadog ;
grant select on v$asm_diskgroup to datadog ;
grant select on v$rsrcmgrmetric to datadog ;
grant select on v$dataguard_config to datadog ;
grant select on v$dataguard_stats to datadog ;
grant select on v$transaction to datadog;
grant select on v$locked_object to datadog;
grant select on dba_objects to datadog;
grant select on cdb_data_files to datadog;
grant select on dba_data_files to datadog;
```

{{% /tab %}}

{{< /tabs >}}

### 설정

호스트에서 실행 중인 에이전트에 대해 이 점검을 구성하려면:

1. [에이전트 설정 디렉토리][3]의 루트에 있는 `conf.d/` 폴더에서 `oracle.d/conf.yaml` 파일을 편집합니다. `server` 및 `port`를 업데이트하여 마스터가 모니터링하도록 설정합니다. 사용 가능한 모든 설정 옵션을 확인하려면 [oracle.d/conf.yaml 샘플][4]을 참조하세요.

   ```yaml
   init_config:

   instances:
      ## @param server - string - required
      ## The IP address or hostname of the Oracle Database Server.
      #
      - server: localhost:1521

        ## @param service_name - string - required
        ## The Oracle Database service name. To view the services available on your server,
        ## run the following query: `SELECT value FROM v$parameter WHERE name='service_names'`
        #
        service_name: <SERVICE_NAME>

        ## @param username - string - required
        ## The username for the Datadog user account.
        #
        username: <USERNAME>

        ## @param password - string - required
        ## The password for the Datadog user account.
        #
        password: <PASSWORD>
   ```

**참고:** `7.50.1`(포함)과 `7.53.0`(제외) 사이의 에이전트 릴리즈의 경우 설정 하위 디렉토리는 `oracle-dbm.d`입니다. 다른 모든 에이전트 릴리스의 경우 설정 디렉토리는 `oracle.d`입니다.

**참고**: 에이전트는 `V$` 뷰를 쿼리하여 모든 노드에서 개별적으로 정보를 수집하므로, Oracle Real Application 클러스터(RAC) 고객은 각 RAC 노드에 대해 에이전트를 설정해야 합니다. 에이전트 쿼리는 상호 연결 트래픽을 생성하지 않도록 `GV$` 보기를 쿼리하지 않습니다.

2. [에이전트를 재시작하세요][5].

#### TCPS를 통해 Oracle에 연결

TCPS(SSL을 사용한 TCP)를 통해 Oracle에 연결하려면 `protocol` 설정 옵션의 주석을 해제하고 `TCPS`를 선택합니다. `server` 옵션을 업데이트하여 TCPS 서버가 모니터링하도록 설정합니다.

    ```yaml
    init_config:

    instances:
      ## @param server - string - required
      ## The IP address or hostname of the Oracle Database Server.
      #
      - server: localhost:1522

        ## @param service_name - string - required
        ## The Oracle Database service name. To view the services available on your server,
        ## run the following query:
        #
        service_name: "<SERVICE_NAME>"

        ## @param username - string - required
        ## The username for the user account.
        #
        username: <USER>

        ## @param password - string - required
        ## The password for the user account.
        #
        password: "<PASSWORD>"

        ## @param protocol - string - optional - default: TCP
        ## The protocol to connect to the Oracle Database Server. Valid protocols include TCP and TCPS.
        ##
        #
        protocol: TCPS
    ```

### 검증

[에이전트의 상태 하위 명령을 실행][6]하고 점검 섹션에서 `oracle`를 찾습니다.

### 커스텀 쿼리

커스텀 쿼리 제공도 지원됩니다. 각 쿼리는 다음과 같이 파라미터 두 개가 있어야 합니다.

| 파라미터       | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |                                                                                                                                                                
| `query`         | 실행할 SQL입니다. 간단한 문이나 여러 줄의 스크립트일 수 있습니다. 결과의 모든 행이 평가됩니다.                                                                                                                                                                                                                                                                                                                        |
| `columns`       | 각 열을 나타내는 목록이며, 왼쪽에서 오른쪽으로 순차 정렬됩니다. 다음 두 가지 데이터가 필요합니다. <br> a. `type` - 제출 메소드(`gauge`, `count` 등)입니다. <br> b. 이름 - 전체 메트릭 이름에 사용되는 접미사입니다. `type`가 `tag`인 경우 해당 열은 특정 쿼리에서 수집한 모든 메트릭에 적용되는 태그로 대신 간주됩니다. |

옵션으로 `tags` 파라미터를 사용하여 수집된 각 메트릭에 태그 목록을 적용할 수 있습니다.

다음을 확인합니다.

```python
self.gauge('oracle.custom_query.metric1', value, tags=['tester:oracle', 'tag1:value'])
self.count('oracle.custom_query.metric2', value, tags=['tester:oracle', 'tag1:value'])
```

다음 예제 설정은 아래와 같습니다.

```yaml
- query: | # Use the pipe if you require a multi-line script.
    SELECT columns
    FROM tester.test_table
    WHERE conditions
  columns:
    # Put this for any column you wish to skip:
    - {}
    - name: metric1
      type: gauge
    - name: tag1
      type: tag
    - name: metric2
      type: count
  tags:
    - tester:oracle
```

사용 가능한 모든 설정 옵션은 [oracle.d/conf.yaml 샘플][4]를 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "oracle" >}}


### 이벤트

Oracle 데이터베이스 점검은 이벤트를 포함하지 않습니다.

### 서비스 점검
{{< get-service-checks-from-git "oracle" >}}


## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/oracle/images/oracle_dashboard.png
[2]: https://docs.datadoghq.com/ko/database_monitoring/
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[5]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ko/help/