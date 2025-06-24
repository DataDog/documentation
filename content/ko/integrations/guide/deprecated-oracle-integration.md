---
title: Agent 7.50.1 이전 버전에서 Oracle 통합 구성
---

## 개요

Datadog Agent 7.50.1 이전 버전에서 Oracle 통합을 어떻게 설정하는지 살펴보겠습니다. 최신 Agent 버전에서의 Oracle 통합 설정 등 Oracle 통합에 관한 자세한 정보는 [Oracle 통합 문서][1]에서 확인해 보세요.

## 설정

### 설치

#### 사전 요구 사항

Oracle 통합을 사용하려면 기본 클라이언트(추가 설치 단계 필요 없음)나 Oracle 인스턴트 클라이언트를 사용합니다.

##### Oracle 인스턴트 클라이언트

{{< tabs >}}
{{% tab "Linux" %}}
1. [Linux용 Oracle 인스턴트 클라이언트 설치][1] 지침을 따릅니다.

2. 다음을 확인합니다.
    - *Instant Client Basic*과 *SDK* 패키지가 모두 설치되어 있습니다. Oracle [다운로드 페이지][2]에서 해당 패키지를 찾으세요.

        Instant Client 라이브러리를 설치한 후 런타임 링커가 라이브러리를 찾을 수 있는지 확인합니다. 예를 들어 `ldconfig`를 사용합니다.

       ```shell
       # Put the library location in an ld configuration file.

       sudo sh -c "echo /usr/lib/oracle/12.2/client64/lib > \
           /etc/ld.so.conf.d/oracle-instantclient.conf"

       # Update the bindings.

       sudo ldconfig
       ```

    - 두 패키지 모두 해당 머신에서 모든 사용자가 사용할 수 있는 단일 디렉터리(예: `/opt/oracle`)로 압축 해제됩니다.
       ```shell
       mkdir -p /opt/oracle/ && cd /opt/oracle/
       unzip /opt/oracle/instantclient-basic-linux.x64-12.1.0.2.0.zip
       unzip /opt/oracle/instantclient-sdk-linux.x64-12.1.0.2.0.zip
       ```

[1]: https://docs.oracle.com/en/database/oracle/oracle-database/21/lacli/install-instant-client-using-zip.html
[2]: https://www.oracle.com/technetwork/database/features/instant-client/index.htm
{{% /tab %}}

{{% tab "Windows" %}}
1. [Oracle 윈도우즈(Windows) 설치 지침][1]에 따라 Oracle 인스턴트 클라이언트를 설정합니다.

2. 다음을 확인합니다.
    - [Microsoft Visual Studio 2017 Redistributable][2] 또는 해당 버전이 Oracle 인스턴트 클라이언트에 설치되어 있습니다.

    - Oracle의 [다운로드 페이지][18]에서 *Instant Client Basic* 및 *SDK* 패키지가 모두 설치되었습니다.

    - 두 패키지 모두 해당 머신의 모든 사용자가 사용할 수 있는 단일 디렉터리(예: `C:\oracle`)로 추출됩니다.

[1]: https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html#ic_winx64_inst
[2]: https://support.microsoft.com/en-us/topic/the-latest-supported-visual-c-downloads-2647da03-1eea-4433-9aff-95f26a218cc0
{{% /tab %}}
{{< /tabs >}}

##### JDBC 드라이버

*NOTE*: 이 방법은 Linux에서만 가능합니다.

Agent가 JDBC 드라이버 사용 시 JPype 라이브러리를 사용하려면 시스템에 Java 8 이상이 필요합니다.

설치가 완료되면 다음 단계를 따릅니다.

1. [JDBC Driver][4] JAR 파일을 다운로드합니다.
2. `$CLASSPATH`에서 다운로드한 파일에 경로를 추가하거나 `jdbc_driver_path`의 구성 파일을 확인합니다([샘플 oracle.yaml][5] 참조).

#### Datadog 사용자 생성

{{< tabs >}}
{{% tab "Standalone" %}}
Oracle 데이터베이스 서버에 적절한 접근 권한을 가진 읽기 전용 `datadog` 사용자를 생성합니다. `SYSDBA` 또는 `SYSOPER` 같은 관리자 사용자로 Oracle 데이터베이스에 연결하고 다음을 실행합니다.

```text
-- Oracle Script를 활성화합니다.
ALTER SESSION SET "_ORACLE_SCRIPT"=true;

-- datadog 사용자를 생성하고. 비밀번호 플레이스홀더를 안전한 비밀번호로 바꿉니다.
CREATE USER datadog IDENTIFIED BY <PASSWORD>;

-- datadog 사용자에 접근 권한을 부여합니다.
GRANT CONNECT TO datadog;
GRANT SELECT ON GV_$PROCESS TO datadog;
GRANT SELECT ON gv_$sysmetric TO datadog;
GRANT SELECT ON sys.dba_data_files TO datadog;
GRANT SELECT ON sys.dba_tablespaces TO datadog;
GRANT SELECT ON sys.dba_tablespace_usage_metrics TO datadog;
```

**참고**: Oracle 11g를 사용하는 경우 다음 줄을 실행할 필요가 없습니다.

```text
ALTER SESSION SET "_ORACLE_SCRIPT"=true;
```
{{% /tab %}}

{{% tab "Multi-tenant" %}}
##### Oracle 12c 또는 19c

`datadog` 사용자를 생성하고 권한을 부여하려면 Administrator로 루트 데이터베이스에 로그인하세요.

```text
alter session set container = cdb$root;
CREATE USER c##datadog IDENTIFIED BY password CONTAINER=ALL;
GRANT CREATE SESSION TO c##datadog CONTAINER=ALL;
Grant select any dictionary to c##datadog container=all;
GRANT SELECT ON GV_$PROCESS TO c##datadog CONTAINER=ALL;
GRANT SELECT ON gv_$sysmetric TO c##datadog CONTAINER=ALL;
```
{{% /tab %}}
{{< /tabs >}}

### 구성

{{< tabs >}}
{{% tab "Host" %}}
호스트에서 실행 중인 Agent에 이 점검을 구성하는 방법:

1. [Agent 구성 디렉터리][2] 루트에 있는 `conf.d/` 폴더에서 `oracle.d/conf.yaml` 파일을 편집합니다. `server` 및 `port`를 업데이트하여 주요 항목이 모니터링하도록 설정합니다. 사용 가능한 모든 구성 옵션은 [샘플 oracle.d/conf.yaml][1]을 참고하세요.

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

2. [에이전트를 재시작][3]하세요.


#### 커스텀 쿼리만 해당

인스턴스에 기본 메트릭 점검을 건너뛰고 기존 메트릭 수집 사용자로만 커스텀 쿼리를 실행하려면 `true` 값과 함께 태그 `only_custom_queries`를 삽입합니다. 이렇게 하면 구성된 Oracle 통합 인스턴스에서 시스템, 프로세스, 테이블스페이스 메트릭이 실행되지 않도록 할 수 있으며, [Datadog 사용자 생성](#datadog-user-creation) 섹션에 설명된 권한 없이도 커스텀 쿼리를 실행할 수 있습니다. 이 구성 항목을 생략하면 지정된 사용자에게 커스텀 쿼리 실행을 위한 해당 테이블 권한이 있어야 합니다.

```yaml
init_config:

instances:
  ## @param server - 문자열 - 필수
  ## Oracle 데이터베이스 서버의 IP 주소 또는 호스트 이름.
  #
  - server: localhost:1521

    ## @param service_name - 문자열 - 필수
    ## Oracle 데이터베이스 서비스 이름. 서버에서 사용 가능한 서비스를 보려면
    ## 다음 쿼리를 실행하세요.
    ## `SELECT value FROM v$parameter WHERE name='service_names'`
    #
    service_name: "<SERVICE_NAME>"

    ## @param username - 문자열 - 필수
    ## 사용자 계정 사용자 이름.
    #
    username: <USER>

    ## @param password - 문자열 - 필수
    ## 사용자 계정 비밀번호.
    #
    password: "<PASSWORD>"

    ## @param only_custom_queries - 문자열 - 선택 사항
    ## 이 인스턴스에 대해서만 커스텀 쿼리를 실행하려면 
    ## 이 파라미터를 아무 값으로 설정하세요.
    #
    only_custom_queries: true
```

#### TCPS를 통해 Oracle에 연결

1. TCPS(SSL을 사용한 TCP)를 통해 Oracle에 연결하려면 `protocol` 설정 옵션의 주석을 해제하고 `TCPS`를 선택합니다. `server` 옵션을 업데이트하여 TCPS 서버가 모니터링하도록 설정합니다.

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
        ## `SELECT value FROM v$parameter WHERE name='service_names'`
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
        ## When connecting to Oracle Database via JDBC, `jdbc_truststore` and `jdbc_truststore_type` are required.
        ## More information can be found from Oracle Database's whitepaper:
        ##
        ## https://www.oracle.com/technetwork/topics/wp-oracle-jdbc-thin-ssl-130128.pdf
        #
        protocol: TCPS
    ```

2. Oracle 데이터베이스에서 TCPS 연결을 허용하려면 `sqlnet.ora`, `listener.ora`, `tnsnames.ora`를 업데이트합니다.

##### JDBC 없이 Oracle을 통한 TCPS

JDBC를 사용하지 않는다면 Datadog Agent가 데이터베이스에 연결할 수 있는지 확인합니다. 설정 옵션에 입력한 정보와 함께 `sqlplus` 명령줄 도구를 사용하세요.

```shell
sqlplus <USER>/<PASSWORD>@(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCPS)(HOST=<HOST>)(PORT=<PORT>))(SERVICE_NAME=<SERVICE_NAME>)))
```

[Oracle Instant Client][5] 연결 사용 시 애플리케이션에서 사용하는 클라이언트 라이브러리 `network/admin` 디렉토리로 세 개의 파일을 이동합니다.
  * `tnsnames.ora`: 애플리케이션 연결 문자열에 사용되는 넷 서비스 이름을 데이터베이스 서비스에 매핑합니다.
  * `sqlnet.ora`: Oracle Network 설정을 구성합니다.
  * `cwallet.sso`: SSL 또는 TLS 연결을 활성화합니다. 이 파일을 안전하게 보관하세요.

##### JDBC를 통한 TCPS

JDBC를 사용하여 Oracle Database에 연결 시 truststore에 비밀번호가 있다면 `jdbc_truststore_path`, `jdbc_truststore_type`, `jdbc_truststore_password`(선택 사항)도 지정해야 합니다. 

**참고**: `SSO` truststore에는 비밀번호가 필요하지 않습니다.

```yaml
    # `instances:` 섹션에서
    ...

    ## @param jdbc_truststore_path - 문자열 - 선택 사항
    ## JDBC truststore 파일 경로.
    #
    jdbc_truststore_path: /path/to/truststore

    ## @param jdbc_truststore_type - 문자열 - 선택 사항
    ## JDBC truststore 파일 유형. 지원되는 truststore 유형은 JKS, SSO, PKCS12.
    #
    jdbc_truststore_type: SSO

    ## @param jdbc_truststore_password - 문자열 - 선택 사항
    ## JDBC를 통해 연결할 때 truststore 비밀 번호.
    #
    # jdbc_truststore_password: <JDBC_TRUSTSTORE_PASSWORD>
```

JDBC에서 TCPS를 통해 Oracle Database에 연결하는 방법은 공식 [Oracle 백서][4]를 참고하세요.

[1]: https://github.com/DataDog/integrations-core/blob/master/oracle/datadog_checks/oracle/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://www.oracle.com/technetwork/topics/wp-oracle-jdbc-thin-ssl-130128.pdf
[5]: https://python-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html#install-the-wallet-and-network-configuration-files

{{% /tab %}}

{{% tab "Containerized" %}}
컨테이너화된 환경에서 아래의 파라미터를 적용하려면 [Autodiscovery 통합 템플릿][1]을 참고하세요.

| 파라미터            | 값                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `oracle`                                                                                                  |
| `<INIT_CONFIG>`      | 비어 있음 또는 `{}`                                                                                             |
| `<INSTANCE_CONFIG>`  | `{"server": "%%host%%:1521", "service_name":"<SERVICE_NAME>", "username":"datadog", "password":"<PASSWORD>"}` |

[1]: https://docs.datadoghq.com/ko/agent/kubernetes/integrations/

{{% /tab %}}
{{< /tabs >}}

### 검증

[Agent의 상태 하위 명령을 실행][9]하고 Checks 섹션에서 `oracle`을 찾습니다.

## 커스텀 쿼리

커스텀 쿼리 제공도 지원됩니다. 각 쿼리는 다음과 같이 파라미터 두 개가 있어야 합니다.

| 파라미터       | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `query`         | 실행할 SQL입니다. 간단한 문이나 여러 줄의 스크립트일 수 있습니다. 결과의 모든 행이 평가됩니다.                                                                                                                                                                                                                                                                                                                        |
| `columns`       | 각 열을 나타내는 목록이며, 왼쪽에서 오른쪽으로 순차 정렬됩니다. 다음 두 가지 데이터가 필요합니다. <br> a. `type` - 제출 메소드(`gauge`, `count` 등)입니다. <br> b. 이름 - 전체 메트릭 이름에 사용되는 접미사입니다. `type`가 `tag`인 경우 해당 열은 특정 쿼리에서 수집한 모든 메트릭에 적용되는 태그로 간주됩니다. |

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

사용 가능한 모든 구성 옵션은 [샘플 oracle.d/conf.yaml][5]을 참고하세요.

### 예시

데이터베이스 잠금을 식별하는 데 도움이 되는 쿼리 구성을 만듭니다.

1. 커스텀 쿼리를 포함하려면 `conf.d\oracle.d\conf.yaml`을 수정합니다. `custom_queries` 블록의 주석 처리를 제거하고 필요한 쿼리와 열을 추가한 후 Agent를 다시 시작하세요.

```yaml
  init_config:
  instances:
      - server: localhost:1521
        service_name: orcl11g.us.oracle.com
        username: datadog
        password: xxxxxxx
        jdbc_driver_path: /u01/app/oracle/product/11.2/dbhome_1/jdbc/lib/ojdbc6.jar
        tags:
          - db:oracle
        custom_queries:
          - query: |
              select blocking_session, username, osuser, sid, serial# as serial, wait_class, seconds_in_wait
              from v_$session
              where blocking_session is not NULL order by blocking_session
            columns:
              - name: blocking_session
                type: gauge
              - name: username
                type: tag
              - name: osuser
                type: tag
              - name: sid
                type: tag
              - name: serial
                type: tag
              - name: wait_class
                type: tag
              - name: seconds_in_wait
                type: tag
```

2. `v_$session`에 액세스하려면 `DATADOG`에 권한을 부여하고 권한을 테스트합니다.

```text
SQL> grant select on sys.v_$session to datadog;

##DD 사용자와 연결하여 액세스를 검증합니다.


SQL> show user
USER is "DATADOG"


##동의어를 생성하여 뷰를 표시합니다.
SQL> create synonym datadog.v_$session for sys.v_$session;


Synonym created.


SQL> select blocking_session,username,osuser, sid, serial#, wait_class, seconds_in_wait from v_$session
where blocking_session is not NULL order by blocking_session;
```

3. 구성이 완료되면 `oracle.custom_query.locks` 메트릭을 기반으로 [모니터][10]를 생성할 수 있습니다.

## 트러블슈팅

### 일반적인 문제

#### Oracle Native Client
- `DPY-6000: cannot connect to database`가 발생하는 경우:
  ```text
  Failed to connect to Oracle DB, error: DPY-6000: cannot connect to database. Listener refused connection. (Similar to ORA-12660)
  ```
 - Native Network Encryption 또는 Checksumming이 활성화되어 있는지 확인하세요. 활성화되어 있다면 `use_instant_client: true`를 설정하여 Instant Client 방식을 사용해야 합니다.

Oracle Instant Client 설정에 대한 자세한 내용은 [Oracle 통합 문서][3]를 참고하세요.

#### Oracle 인스턴트 클라이언트
- Oracle Instant Client와 SDK 파일이 모두 같은 디렉터리에 있는지 확인하세요.
디렉터리의 구조는 다음과 유사해야 합니다.
  ```text
  |___ BASIC_LITE_LICENSE
  |___ BASIC_LITE_README
  |___ adrci
  |___ genezi
  |___ libclntsh.so -> libclntsh.so.19.1
  |___ libclntsh.so.10.1 -> libclntsh.so.19.1
  |___ libclntsh.so.11.1 -> libclntsh.so.19.1
  |___ libclntsh.so.12.1 -> libclntsh.so.19.1
  |___ libclntsh.so.18.1 -> libclntsh.so.19.1
  |___ libclntsh.so.19.1
  |___ libclntshcore.so.19.1
  |___ libipc1.so
  |___ libmql1.so
  |___ libnnz19.so
  |___ libocci.so -> libocci.so.19.1
  |___ libocci.so.10.1 -> libocci.so.19.1
  |___ libocci.so.11.1 -> libocci.so.19.1
  |___ libocci.so.12.1 -> libocci.so.19.1
  |___ libocci.so.18.1 -> libocci.so.19.1
  |___ libocci.so.19.1
  |___ libociicus.so
  |___ libocijdbc19.so
  |___ liboramysql19.so
  |___ listener.ora
  |___ network
  |   `___ admin
  |       |___ README
  |       |___ cwallet.sso
  |       |___ sqlnet.ora
  |       `___ tnsnames.ora
  |___ ojdbc8.jar
  |___ ucp.jar
  |___ uidrvci
  `___ xstreams.jar
  ```

#### JDBC 드라이버(Linux만 해당)
- `JVMNotFoundException`가 발생하는 경우:

    ```text
    JVMNotFoundException("No JVM shared library file ({jpype._jvmfinder.JVMNotFoundException: No JVM shared library file (libjvm.so) found. Try setting up the JAVA_HOME environment variable properly.})"
    ```

    - `JAVA_HOME` 환경 변수가 설정되어 있으며, 올바른 디렉터리를 가리키는지 확인합니다.
    - 환경 변수를 `/etc/environment`에 추가합니다.
        ```text
        JAVA_HOME=/path/to/java
        ```
    - 그런 다음 Agent를 다시 시작합니다.

- `Unsupported major.minor version 52.0` 오류가 발생하면 너무 오래된 Java 버전을 사용하고 있다는 뜻입니다. 시스템 Java를 업데이트하거나, 최신 버전을 추가로 설치하고 위에서 설명한 대로 `JAVA_HOME`을 새 버전으로 지정해야 합니다.

- Agent에서 다음 명령을 실행하여 환경 변수가 올바르게 설정되었는지 확인하세요.
표시된 출력이 올바른 값과 일치하는지 확인하세요.

    ```shell script
      sudo -u dd-agent -- /opt/datadog-agent/embedded/bin/python -c "import os; print(\"JAVA_HOME:{}\".format(os.environ.get(\"JAVA_HOME\")))"
    ```

도움이 필요하신가요? [Datadog 지원 팀][14]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/oracle/?tab=linux
[2]: https://oracle.github.io/python-oracledb/
[3]: https://github.com/DataDog/integrations-core/tree/7.41.x/oracle#oracle-instant-client
[4]: https://www.oracle.com/technetwork/database/application-development/jdbc/downloads/index.html
[5]: https://github.com/DataDog/integrations-core/blob/master/oracle/datadog_checks/oracle/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ko/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/ko/monitors/monitor_types/metric/?tab=threshold
[11]: https://github.com/DataDog/integrations-core/blob/master/oracle/metadata.csv
[12]: https://github.com/DataDog/integrations-core/blob/master/oracle/assets/service_checks.json
[14]: https://docs.datadoghq.com/ko/help/
[18]: https://www.oracle.com/technetwork/database/features/instant-client/index.htm