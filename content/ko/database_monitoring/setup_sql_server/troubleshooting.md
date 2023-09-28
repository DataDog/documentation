---
description: SQL Server에서 데이터베이스 모니터링 설정 트러블슈팅
kind: 설명서
title: SQL Server에서 DBM 설정 트러블슈팅
---

{{< site-region region="gov" >}}
해당 지역에서는 데이터베이스 모니터링이 지원되지 않습니다
{{< /site-region >}}

이 페이지에서는 SQL Server에서 데이터베이스 모니터링을 설정하고 사용할 때 발생하는 일반적인 문제와 이를 해결하는 방법을 설명합니다. 에이전트 버전에 따라 문제 해결 방법이 다를 수 있기 때문에 Datadog에서는 안정적인 최신 에이전트 버전을 사용하고 최신 [설정 설명서][1]를 참고하기를 권장합니다.

## 일반적인 연결 문제 진단{#common-connection-issues}

### SQL Server에서 'Login Failed for user'로 연결 실패{#login-failed-for-user}

에이전트가 SQL Server 인스턴스에 연결하는 데에는 두 가지 방법이 있습니다.

1. [Windows 인증][2](Windows 호스트에서만 사용 가능)

2. [SQL Server 인증][3]

기본 인증 모드는 Windows 인증이고 SQL Server 인증보다 더 안정적입니다. Windows 인증을 사용하면 도메인 수준에서 Windows 그룹을 생성할 수 있고 SQL Server에서 전체 그룹 로그인을 생성할 수 있습니다. Windows 인증을 사용하려면 다음을 실행하세요.

1. [에이전트를 설치][4]할 때 사용한 서비스 계정을 사용하고, 이 계정에 적절한 SQL Server 접근 권한이 있도록 합니다.

2. `connection_string: "Trusted_Connection=yes"`로 설정하고 `username`과 `password` 필드를 비워둡니다. `Trusted_Connection=yes` 연결 속성에 따라 SQL Server용 OLE DB 드라이버가 로그인 유효성 확인에 Windows 인증을 사용합니다.

SQL Server 인증은 Windows 사용자 계정 기반이 아니고 인스턴스에서 생성되고 SQL Server 자체에 저장됩니다. SQL 인증을 사용하려면 SQL Server 인스터스 구성에서 `username`과 `password`를 설정해야 연결할 수 있습니다.

연결할 때 로그인 오류가 생기면 먼저 Datadog 에이전트 사용자로 인스턴스에 로그인할 수 있는지 확인하는 것이 중요합니다. 이를 확인하는 가장 쉬운 방법은 `sqlcmd`와 같은 cmd 줄을 이용하는 것입니다.

예를 들면 다음과 같습니다.

```bash
# 이 예시에서는 SQL 인증을 사용
sqlcmd -S <INSTANCE_ENDPOINT> -U datadog -P <DATADOG_PASSWORD> -d master

# 이 예시에서는 Windows 인증을 사용
# ddagentuser로 실행하려면 Powershell에서 `run as user...` 옵션을 선택해 이 명령을 실행
sqlcmd -S <INSTANCE_ENDPOINT> -d master -E
```

`datadog` 사용자가 SQL Server 인스턴스에 로그인하지 못하는 경우, [설정 설명서][1]에 따라 사용자가 생성되고 적절한 권한이 부여되었는지 확인하세요.

Microsoft에도 이 같은 문제 유형을 트러블슈팅하는 방법을 안내하는 유용한 문서가 있습니다. [여기][5]를 참고하세요.

### SQL Server TCP 연결 문제{#tcp-connection-error}

에이전트 설정이 잘못되었을 때 일반적으로 TCP 연결 문제가 발생합니다. 드라이버에서 표시하는 오류 메시지가 명확하지 않을 수 있습니다.

예를 들어 다음 오류는 TC 연결이 실패했기 때문에 발생합니다.

```bash
TCP-connection(ERROR: getaddrinfo failed). Exception: unable to connect: could not open database requested by login
```

다음은 몇 가지 일반적인 오류입니다.

**"login failed for user"**: 에이전트가 호스트에는 연결되었으나 어떤 이유로 인해 로그인이 거부되었다는 뜻입니다.

트러블슈팅 방법:

1. 에이전트의 로그인 자격 증명 확인

2. sqlcmd를 사용해 자격 증명으로 수동 로그인을 시도합니다. 예: `sqlcmd -S localhost -U datadog -P ${SQL_PASSWORD} -d master` 

**"could not open database requested for login"**: 이 오류는 네트워크 문제나 알 수 없는 데이터베이스 때문에 발생합니다.

트러블슈팅 방법:

1. 에이전트에서 데이터베이스로 네트워크 연결이 잘 되어 있는지 확인하기 위해 `telnet {host} {port}`을 실행해 에이전트와 호스트 간 TCP 연결을 확인합니다.

2. sqlcmd를 사용해 수동 로그인을 해보고 데이터베이스 설정에 문제가 있는지 살펴봅니다. 예: `sqlcmd -S localhost -U datadog -P ${SQL_PASSWORD} -d master`

####  "Invalid connection string attribute" 문제

Windows에서 지원되는 ADO 공급자에는 `SQLOLEDB`, `MSOLEDBSQL`, `MSOLEDBSQL19`, `SQLNCLI11`이 있습니다.

`SQLOLEDB`와 `SQLNCLI11` 공급자에는 여러 문제로 `Invalid connection string attribute` 오류 메시지가 나타날 수 있습니다. 다음 예를 참고하세요.

```
datadog_checks.sqlserver.connection.SQLConnectionError:
Unable to connect to SQL Server for instance foo.com,1433 - master:
OperationalError(com_error(-2147352567, 'Exception occurred.',
(0, 'Microsoft OLE DB Provider for SQL Server',
'Invalid connection string attribute', None, 0, -2147467259), None),
'Error opening connection to "ConnectRetryCount=2;Provider=SQLOLEDB;Data Source=foo.com,1433;Initial Catalog=master;User ID=datadog;Password=******;"')
```

실패 이유와 관계 없이 이와 동일한 오류 메시지가 나타납니다(예: 알 수 없는 호스트 이름, TCP 미연결, 유효하지 않은 로그인 자격 증명, 알 수 없는 데이터베이스).

HResult 오류 코드 오류 메시지를 살펴보세요. 다음은 몇 가지 알려진 코드 예시입니다.

`-2147217843` **"login failed for user"**: 에이전트가 호스트에는 연결되었으나 어떤 이유로 로그인이 거부되었다는 뜻입니다.

`-2147467259` **"could not open database requested for login"**: 이 오류는 네트워크 문제나 알 수 없는 데이터베이스 때문에 발생합니다.

위 단계로도 문제가 해결되지 않거나 여기에 오류 코드가 나와 있지 않으면 `MSOLEDBSQL` 드라이버나 `Microsoft ODBC Driver for SQL Server`를 사용하기를 권장합니다. 이 드라이버를 사용하면 더 자세한 오류 메시지를 받을 수 있어 연결 실패 원인을 트러블슈팅하는 데 도움이 됩니다.

### SQL Server 'Unable to connect: Adaptive Server is unavailable or does not exist'{#adaptive-server-unavailable}

이 오류는 `host` 필드를 적절히 설정하지 않아 발생하기도 합니다. 통합에서는 `host` 필드를 `host:server,port` 구문으로 설정하세요.

예를 들어, 다음과 같은 방법으로 `host`를 설정했다고 합시다.

```
host: sqlserver-foo.cfxxae8cilce.us-east-1.rds.amazonaws.com
```
포트를 추가해야 하며 다음과 같이 설정하세요.
```
host: sqlserver-foo.cfxxae8cilce.us-east-1.rds.amazonaws.com,1433
```

### SSL 공급자: 인증서 체인이 신뢰할 수 없는 인증 기관에서 발행되었음{#certificate-verify-fail}

이는 최신 [MSOLEDBSQL][6] 드라이버로 업그레이드한 후 [작업을 중단하지 않는 변경][7] 때문에 발생하는 일반적인 오류입니다. 드라이버 최신 버전에서는 기본적으로 SQL 인스턴스 연결 모두가 암호화됩니다.

SQL Server용 Microsoft OLE DB 드라이버 최신 버전을 사용하는 중이고 암호화된 연결이 필요한 SQL Server 인스턴스에 연결하고 싶은 경우에는 다음 방법을 이용하세요.

1. 클라이언트가 암호화되어 연결되도록 하기 위해 자체 서명된 인증서와 서버에서 강제 암호화 설정(AWS에서 `rds.force_ssl=1`)을 사용하고 있는 경우: 

   - 클라이언트 신뢰 체인의 일부로 신뢰할 수 있는 인증서로 변경
   - 자체 서명된 인증서를 클라이언트 측에서 신뢰할 수 있는 인증서로 추가
   - 연결 스트링에 `TrustServerCertificate=yes;` 추가

[Microsoft 설명서][7]에서 더 자세히 알아보세요.

2. SQL Server 인스턴스에 연결할 때 암호화가 필요 없으면(AWS에서 `rds.force_ssl=0`) `Use Encryption for Data=False;`가 포함된 연결 스트링을 업데이트하세요. 다음 예를 참고하세요.

  ```yaml
  # example uses windows authentication
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      connection_string: "Trusted_Connection=yes;Use Encryption for Data=False;"
      connector: adodbapi
      adoprovider: MSOLEDBSQL19
  ```

3. 기본적으로 암호화를 사용하지 않는 [MSOLEDBSQL 드라이버 2018 버전]을 설치합니다. 드라이버 설치 후 `adoprovider`를 `MSOLEDBSQL`로 업데이트합니다. 다음 예를 참고하세요. 

  ```yaml
  # example uses windows authentication
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      connection_string: "Trusted_Connection=yes;"
      connector: adodbapi
      adoprovider: MSOLEDBSQL
  ```

**`MSOLEDBSQL` 2019** 외 다른 드라이버를 사용한다면 이 오류는 연결 스트링에 `TrustServerCertificate=yes`를 설정해 해결할 수 있습니다. 다음은 2017 `ODBC` 드라이버의 예시입니다.

  ```yaml
  # this example uses SQL Server authentication
  instances:
    - host: <INSTANCE_ENDPOINT>,<PORT>
      username: datadog
      password: <DD_AGENT_PASSWORD>
      connection_string: "TrustServerCertificate=yes;"
      connector: odbc
      driver: '{ODBC Driver 17 for SQL Server}'
  ```

### SQL Server가 'SSL Security error (18)'로 연결할 수 없음 {#ssl-security-error}

이 오류는 오래된 SQL Server ODBC 드라이버 때문에 생기는 문제입니다. 오류 메시지에 있는 연결 스트링을 보면 에이전트가 어떤 드라이버 버전을 사용하고 있는지 확인할 수 있습니다.

예를 들어 오류 메시지 연결 스트링에 `Provider=SQL Server`가 있는 경우 ODBC 드라이버를 새 버전으로 업그레이드하면 오류가 해결됩니다.

이 문제와 관련한 더 자세한 내용은 [Microsoft 블로그 포스트][9]를 참고하세요.

### 연결 스트링이 비어 있음{#empty-connection-string}

Datadog SQL Server 점검은 `adodbapi` Python 라이브러리를 사용합니다. 이 때문에 SQL Server에 연결할 시 생성되는 연결 스트링에 사용할 수 있는 문자가 제한적입니다. 에이전트가 SQL Server에 연결할 때 문제가 생기고 에이전트 컬렉터에 다음과 같은 오류가 보이면 `adodbapi`에 문제를 일으키는 문자가 `sqlserver.yaml`에 포함되어 있을 수 있습니다.

```text
OperationalError: (KeyError('Python string format error in connection string->',), 'Error opening connection to ""')
```

현재까지 이 연결 문제를 일으키는 문자는 `%`뿐입니다. `sqlserver.yaml` 파일에 문자 `%`를 사용해야 하는 경우(예: Datadog SQL Server 사용자 암호에 `%`가 포함된 경우), `%` 하나를 사용하지 말고 두 개`%%`를 사용하는 것으로 대체해야 합니다.

## 일반적인 SQL Server 드라이버 문제 진단{#common-driver-issues}

### 데이터 소스 이름 찾을 수 없음, 기본 드라이버 지정되지 않음 {#data-source-name-not-found}

이는 ODBC 드라이버 기본 설정을 사용하는 Linux에서 일반적으로 발생하는 오류입니다. 이 오류는 에이전트 설정에 설정된 드라이버 이름과 일치하지 않는 [DSN][10] 때문에 발생할 수 있고, `/etc/odbcinst.ini` 파일에서 드라이버 설정을 할 수 있습니다.

예를 들어, 에이전트에 기본 ODBC 드라이버를 사용하고 싶은 경우`{ODBC Driver 18 for SQL Server}`), 인스턴스 구성에 다음을 포함해야 합니다.

```yaml
  connector: odbc
```

에이전트가 SQL Server 인스턴스에 연결을 시도할 때 드라이버 이진으로 가는 경로를 찾기 위해 `/etc/odbcinst.ini` 파일을 찾습니다.

다음은 드라이버를 설정하는 `/etc/odbcinst.ini` 파일 예시입니다.

    ```text
    $ cat /etc/odbcinst.ini
    [ODBC Driver 18 for SQL Server]
    Description=Microsoft ODBC Driver 18 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```

위 예에서 DSN은 `[ODBC Driver 18 for SQL Server]`이며, 이는 에이전트가 기본으로 사용하는 드라이버 이름과 동일합니다. 드라이버 DSN 이름이 에이전트가 사용하는 드라이버 이름과 일치하지 않으면 `Data source not found` 오류가 발생합니다.

인스턴스 `dsn`을 `/etc/odbcinst.ini` 파일 설정과 일치하도록 설정할 수 있습니다. 다음 예를 참고하세요.

    ```text
    $ cat /etc/odbcinst.ini
    [Custom]
    Description=Microsoft ODBC Driver 18 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```

그리고 인스턴스 구성에서 `dsn` 필드를 설정합니다.

```yaml
  connector: odbc
  dsn: "Custom"
```

### 공급자 또는 드라이버 찾을 수 없음{#provider-not-found}

이 오류 메시지는 드라이버에 따라 여러 방식으로 표시되는데, 대부분 다음 `ODBC` 예와 유사하게 나타납니다.

1. `Can't open lib .* file not found`
2. `Data source name not found.* and no default driver specified`

공급자 `MSOLEDBSQL`의 경우에는 다음과 같은 오류 메시지가 나타납니다.

  ```text
  Provider cannot be found. It may not be properly installed.
  ```

이는 에이전트를 실행 중인 호스트에 드라이버나 공급자가 제대로 설치되지 않았다는 뜻입니다. 사용하는 드라이버를 지침에 따라 올바로 설치했는지 다시 확인하세요.

에이전트가 드라이버를 찾지 못했을 수 있습니다. 이는 Linux에서 ODBC 드라이버를 사용할 경우에 일반적으로 발생하는 오류입니다. Linux에서 ODBC 드라이버를 설치하는 방법에 관한 지침은 [Linux 호스트에서 SQL Server에 연결하기](#connecting-to-sql-server-on-a-linux-host) 섹션을 참고하세요.

드라이버를 선택하는 데 도움이 필요할 경우 [SQL Server 드라이버 선택 섹션](#picking-a-sql-server-driver)에서 에이전트에 드라이버를 적절히 설정하는 방법을 참고하세요.

### Linux 호스트에서 SQL Server 연결

SQL Server(Linux나 Windows에서 호스팅)를 Linux 호스트에 연결하는 방법:

1. Linux 배포에 [Microsoft ODBC 드라이버][11]를 설치합니다.
   사용할 드라이버 이름이 무엇인지 잘 모르겠다면 `/etc/odbcinst.ini` 상단에 괄호로 표시되어 있습니다.

    ```text
    $ cat /etc/odbcinst.ini
    [ODBC Driver 13 for SQL Server]
    Description=Microsoft ODBC Driver 13 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```
2. `odbc.ini`과 `odbcinst.ini` 파일을 `/opt/datadog-agent/embedded/etc` 폴더에 복사합니다.
3. 필요한 경우 pyodbc 모듈을 설치합니다. 에이전트의 Python 환경에서 pip install pyodbc를 실행해 설치할 수 있습니다. 다음 예시를 참고하세요.

    ```shell
    $ sudo /opt/datadog-agent/embedded/bin/pip install pyodbc
    ```
3. odbc 커넥터를 사용하도록 SQL Server `conf.yaml`을 구성하고 `odbcinst.ini` 파일에 명시된 대로 적절한 드라이버를 지정합니다.

    ```yaml
    init_config:

    instances:
      - host: <HOST>,<PORT>
        # enable the odbc connector
        connector: odbc
        # enable the ODBC driver
        driver: ODBC Driver 13 for SQL Server
        username: <USERNAME>
        password: <PASSWORD>
    ```

### SQL Server 드라이버 선택{#picking-a-driver}

에이전트가 SQL Server 인스턴스에 연결하려면 [Microsoft ODBC 드라이버][12]나 [OLE DB 드라이버][13]를 설치해야 합니다.

선택한 드라이버에 따라 인스턴스 구성 [커넥터][14] 필드를 설정합니다.

다음은 [Microsoft ODBC 드라이버][12]의 예시 입니다.

  ```yaml
  connector: odbc
  driver: '{ODBC Driver 18 for SQL Server}'
  ```

다음은 [OLE DB 드라이버][13]의 예시입니다.

  ```yaml
  connector: adodbapi
  adoprovider: MSOLEDBSQL
  ```

이 값은 연결 스트링 `Provider` 부분을 매핑하는 데 사용됩니다.

예를 들어 `adoprovider: MSOLEDBSQL`을 설정하면 연결 스트링에 `Provider=MSOLEDBSQL`가 포함됩니다. 이는 설치한 드라이버 버전 이름과 일치해야 합니다.

[Microsoft OLE DB 드라이버][13] 최신 버전의 경우, 드라이버 이름이 `MSOLEDBSQL`에서 `MSOLEDBSQL19`로 바뀌었습니다. 이에 따라 인스턴스 구성을 다음과 같이 해야 합니다.

  ```yaml
  connector: adodbapi
  adoprovider: MSOLEDBSQL19
  ```

선택한 드라이버를 최신 버전으로 유지하는 것이 좋습니다.

## 기타 일반적인 문제

### SQL Server 사용자 태그가 Query Metrics와 Plan Samples에서 누락됨

`user` 태그는 Query Metrics와 Plan Samples에서 더 이상 지원되지 않습니다. SQL Server에서 쿼리를 실행하는 사용자 정보를 정확하게 수집하지 못하는 기술적 한계 때문에 지원 중단되었습니다.

Query Activity 이벤트와 Database Load 메트릭에서는 `user` 태그를 사용할 수 있습니다.

### "CREATE PROCEDURE" 쿼리가 많은 이유가 무엇인가요?

에이전트 7.40.0 이전 버전에서 `PROCEDURE` 통계가 초과되는 버그가 있습니다. 이로 인해 데이터베이스 모니터링 Query Metrics UI에 `CREATE PROCEDURE...` 실행이 많은 것으로 나타납니다. 이 문제를 해결하려면 Datadog 에이전트를 최신 버전으로 업그레이드하세요.

[1]: /ko/database_monitoring/setup_sql_server/
[2]: https://learn.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode?view=sql-server-ver16#connecting-through-windows-authentication
[3]: https://learn.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode?view=sql-server-ver16#connecting-through-sql-server-authentication
[4]: https://docs.datadoghq.com/ko/agent/guide/windows-agent-ddagent-user/#installation
[5]: https://learn.microsoft.com/en-us/troubleshoot/sql/connect/login-failed-for-user
[6]: https://learn.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server?view=sql-server-ver16#3-microsoft-ole-db-driver-for-sql-server-msoledbsql
[7]: https://techcommunity.microsoft.com/t5/sql-server-blog/ole-db-driver-19-0-for-sql-server-released/ba-p/3170362
[8]: https://learn.microsoft.com/en-us/sql/connect/oledb/release-notes-for-oledb-driver-for-sql-server?view=sql-server-ver16#1863
[9]: https://community.hostek.com/t/ssl-security-error-for-microsoft-sql-driver/348
[10]: https://learn.microsoft.com/en-us/sql/integration-services/import-export-data/connect-to-an-odbc-data-source-sql-server-import-and-export-wizard?view=sql-server-ver16
[11]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux/installing-the-microsoft-odbc-driver-for-sql-server-on-linux
[12]: https://learn.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server?view=sql-server-ver16
[13]: https://learn.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server?view=sql-server-ver16
[14]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L201-L208