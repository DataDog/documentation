---
aliases:
- /ko/integrations/faq/connection-issues-with-the-sql-server-integration
title: SQL 서버 통합 연결 문제
---

## 일반적인 SQL 서버 연결 문제

[SQL Server 통합 타일][1]의 지침에 따라 Datadog 에이전트를 설정하여 SQL 서버에서 메트릭을 수집합니다. 본 통합은 몇 가지 기본 [SQL 서버 메트릭][2]을 제공하며, [원하는 대로][3] 확장 가능합니다.

그러나 사용자가 본 통합을 설정할 시 흔히 발생하는 연결 오류가 있는데, 이 오류는 원인이 될 수 있는 변수가 많기 때문에 문제 해결이 특히 까다로울 수 있습니다. 전체 오류는 다음과 같습니다.

```text
'Unable to connect to SQL Server for instance 127.0.0.1,1433 - None. \n Traceback (most recent call last):\n File "C:\\Program Files (x86)\\Datadog\\Datadog Agent\\files\\..\\checks.d\\sqlserver.py", line 219, in get_cursor\n File "adodbapi\\adodbapi.pyc", line 116, in connect\nOperationalError: (com_error(-2147352567, \'Exception occurred.\', (0, u\'Microsoft OLE DB Provider for SQL Server\', u\'[DBNETLIB][ConnectionOpen (Connect()).]SQL Server does not exist or access denied.\', None, 0, -2147467259), None), \'Error opening connection to "Provider=SQLOLEDB;Data Source=127.0.0.1,1433;Initial Catalog=master;User ID=datadog;Password=******;"\')\n'
```

본 오류는 에이전트가 SQL 서버에 연결할 수 없어 데이터 수집을 완료하지 못했음을 나타냅니다. 다음 중 하나가 원인일 수 있습니다.

* SQL 서버 `conf.yaml` 호스트, 포트, 사용자 이름 또는 비밀번호의 오타(전부 세 번 확인 권장)
* 비밀번호에 세미콜론(`;`)이 포함된 경우 비밀번호에 중괄호를 사용하여 해결(`password: "{<PASSWORD>}"`)
* SQL 서버의 TCP/IP 연결이 비활성화됨
* SQL 서버의 IPv4 주소가 올바르지 않거나 SQL 서버 `conf.yaml`에 제공한 주소와 일치하지 않습니다.
* SQL 서버의 TCP/IP 포트가 올바르지 않거나 SQL 서버 `conf.yaml`에 제공한 주소와 일치하지 않습니다.
* SQL 서버의 인증 모드가 "SQL 서버 및 윈도우즈(Windows) 인증 모드"나 "윈도우즈(Windows) 인증 모드" 중 적절한 옵션으로 설정되어 있지 않습니다.

올바른 TCP/IP 주소/포트에서 수신 대기하도록 서버를 설정하는 방법을 확신할 수 없다면 Microsoft의 [특정 TCP 포트에서 수신 대기 서버 설정][4] 항목을 참고하세요(IPv4와 IPALL이 구체적으로 관련된 부분이며, 여기서 포트를 "동적" 또는 "정적" 포트로 설정할 수 있지만 사용하지 않는 포트는 공란으로 두어야 합니다). 에이전트가 SQL Server와 동일한 호스에 설치된 경우, 사용자 관점에서 볼 때 해당 호스트가 로컬 호스트가 아니더라도 호스트 옵션을 "127.0.0.1"로 설정하는 것이 적절할 수 있습니다. SQL 서버 연결 표준 포트는 1433입니다.

SQL 서버의 인증 모드를 설정하는 방법을 확신할 수 없다면 Microsoft의 [인증 모드 선택][5] 문서를 참조하세요.

**참고**: SQL 서버를 위와 같이 변경하는 경우 변경 사항을 적용하려면 SQL 서버를 재시작해야 합니다.

다음은 Datadog 테스트 환경(윈도우즈(Windows) 2012 R2, SQL 서버 2014 익스프레스) 중 하나에서 동작하는 일부 SQL 서버 IP/TCP 설정의 예시입니다.
{{< img src="integrations/faq/sql_server_test_1.png" alt="IP 주소 탭이 선택된 TCP/IP 속성 창입니다. IP4 섹션은 활성화 '예'로 설정되며, 활성화된 IP 주소는 127.0.0.1, TCP 동적 포트는 1433으로 설정됩니다. TCP 포트는 공란입니다." >}}

{{< img src="integrations/faq/sql_server_test_2.png" alt="IP 주소 탭이 선택된 TCP/IP 속성 창입니다. IPAll 섹션의 TCP 동적 포트는 1433으로 설정되며 TCP 포트는 공란입니다." >}}

## 빈 연결 문자열

Datadog SQL 서버 점검은 adodbapi 파이썬(Python) 라이브러리를 사용합니다. 이 때문에 SQL 서버에 연결할 시 생성되는 연결 스트링에 사용할 수 있는 문자가 제한적입니다. 에이전트가 SQL 서버에 연결할 때 문제가 발생하고 에이전트 collector.logs에 다음과 같은 오류가 표시되면 `sqlserver.yaml`에 문제의 원인이 되는 문자가 포함되어 있을 수도 있습니다.

```text
OperationalError: (KeyError('Python string format error in connection string->',), 'Error opening connection to ""')
```

현재까지 이 연결 문제를 일으키는 문자는 `%`뿐입니다. `sqlserver.yaml` 파일에 문자 "%"를 사용해야 하는 경우( Datadog SQL 서버 사용자 암호에 `%`가 포함된 경우), `%` 문자를 하나만 사용하지 않고 `%%`로 두 번 사용하여 문제를 해결할 수 있습니다.

## Linux 호스트에서 SQL Server 연결

SQL Server(Linux나 Windows에서 호스팅)를 Linux 호스트에 연결하려면:

1. Linux 배포용 [Microsoft ODBC 드라이버][6]를 설치합니다.
    사용할 드라이버 이름이 무엇인지 잘 모르겠다면 `/etc/odbcinst.ini` 상단에 괄호로 표시되어 있습니다.

    ```text
    $ cat /etc/odbcinst.ini
    [ODBC Driver 13 for SQL Server]
    Description=Microsoft ODBC Driver 13 for SQL Server
    Driver=/opt/microsoft/msodbcsql/lib64/libmsodbcsql-13.1.so.7.0
    UsageCount=1
    ```
2. `odbc.ini`과 `odbcinst.ini` 파일을 `/opt/datadog-agent/embedded/etc` 폴더에 복사합니다.
3. 필요할 경우 pyodbc 모듈을 설치합니다. 에이전트의 Python 환경에서 pip install pyodbc를 실행해 설치할 수 있습니다. 다음 예시를 참고하세요.

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


[1]: https://app.datadoghq.com/account/settings#integrations/sql_server
[2]: /ko/integrations/sqlserver/#metrics
[3]: /ko/integrations/guide/collect-more-metrics-from-the-sql-server-integration/
[4]: https://msdn.microsoft.com/en-us/library/ms177440.aspx
[5]: https://msdn.microsoft.com/en-us/library/ms144284.aspx
[6]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux/installing-the-microsoft-odbc-driver-for-sql-server-on-linux