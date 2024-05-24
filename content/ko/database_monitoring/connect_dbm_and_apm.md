---
aliases:
- /ko/database_monitoring/guide/connect_dbm_and_apm/
further_reading:
- link: https://www.datadoghq.com/blog/link-dbm-and-apm/
  tag: 블로그
  text: DBM과 애플리케이션 성능 모니터링(APM) 텔레메트리를 원활하게 상호 연결하여 엔드 투 엔드 쿼리 성능을 알아봅니다.
kind: 설명서
title: 데이터베이스 모니터링과 트레이스 상호 연결
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">이 사이트에는 데이터베이스 모니터링이 지원되지 않습니다.</div>
{{< /site-region >}}

본 지침에서는 [데이터베이스 모니터링][1]과 [APM][2]을 사용한다고 가정합니다. APM과 DBM에 연결하면 APM 트레이스 식별자가 DBM 데이터 수집에 삽입되고, 두 데이터 소스에 상관 관계가 생성됩니다. 이를 통해 APM 제품에 데이터베이스 정보를 표시하는 제품 기능을 사용할 수 있고, DBM 제품에 APM 데이터를 표시하는 기능을 사용할 수 있습니다.

## 시작 전 확인할 사항

지원되는 데이터베이스
: Postgres, MySQL, SQL Server, Oracle

지원되는 에이전트 버전
: 7.46+

데이터 프라이버시
: SQL 주석 전파를 사용하면 기밀 데이터(서비스 이름)가 데이터베이스에 저장될 수 있고, 데이터베이스에 접근할 수 있는 제3자가 이 데이터에 액세스할 수 있습니다.


APM 트레이서 통합에서는 애플리케이션에 데이터베이스로 전송되는 정보 양을 통제하는 *전파 모드*를 지원합니다.

- `full` 모드에서는 전체 트레이스 정보를 데이터베이스로 전송하며, DBM에서 개별 트레이스를 조사할 수 있습니다. 대부분의 통합에서 사용하기를 권장하는 모드입니다.
- `service` 모드에서는 서비스 이름을 전송하며, 데이터베이스 로드에 기여하는 서비스가 무엇인지 알 수 있습니다. 이 모드는 Oracle 및 SQL Server 애플리케이션에서만 사용할 수 있습니다.
- `disabled` 모드에서는 전파를 비활성화하고 애플리케이션에서 어떤 정보도 전송하지 않습니다.
Oracle 및 SQL Server는 전체 트레이스 텍스트를 포함할 시 성능 문제를 일으킬 수 있는 선언문 캐싱 동작 때문에 `full` 전파 모드를 지원하지 않습니다.
| DD_DBM_PROPAGATION_MODE  | Postgres  |   MySQL   |  SQL Server  | Oracle |
|:------------------------|:---------:|:---------:|:----------:|:---------:|
| `full` | {{< X >}} | {{< X >}} | | |
| `service` | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |

**지원하는 애플리케이션 트레이서 및 드라이버**

| 언어 | 라이브러리 또는 프레임워크 | Postgres | MySQL | SQL Server | Oracle |
|:-----------------------------------------|:-----------------------|:---------:|:---------:|:-------------------:|:-------------------:|
| **Go:** [dd-trace-go][3] >= 1.44.0 | | | | | |
| | [database/sql][4] | {{< X >}} | {{< X >}} | `service` 모드만 지원 | `service` 모드만 지원 |
| | [sqlx][5] | {{< X >}} | {{< X >}} | `service` 모드만 지원 | `service` 모드만 지원 |
| **Java** [dd-trace-java][23] >= 1.11.0 | | | | | |
| | [jdbc][22] | {{< X >}} | {{< X >}} | `service`  모드만 지원 | `service`  모드만 지원 |
| **Ruby:** [dd-trace-rb][6] >= 1.8.0 | | | | | |
| | [pg][8] | {{< X >}} | | | |
| | [mysql2][7] | | {{< X >}} | | |
| **Python:** [dd-trace-py][11] >= 1.9.0 | | | | | |
| | [psycopg2][12] | {{< X >}} | | | |
| **.NET** [dd-trace-dotnet][15] >= 2.35.0 | | | | | |
| | [Npgsql][16] * | {{< X >}} | | | |
| | [MySql.Data][17] * | | {{< X >}} | | |
| | [MySqlConnector][18] * | | {{< X >}} | | |
| | [ADO.NET][24] * | | | `service`  모드만 지원 | |
| **PHP** [dd-trace-php][19] >= 0.86.0 | | | | | |
| | [pdo][20] | {{< X >}} | {{< X >}} | | |
| | [MySQLi][21] | | {{< X >}} | | |
| **Node.js:** [dd-trace-js][9] >= 3.17.0 | | | | | |
| | [postgres][10] | {{< X >}} | | | |
| | [mysql][13] | | {{< X >}} | | |
| | [mysql2][14] | | {{< X >}} | | |
\* [CommandType.StoredProcedure][25]는 지원하지 않음

## 설정
최적의 경험을 하려면 애플리케이션에서 다음을 설정하세요.

```
DD_SERVICE=(application name)
DD_ENV=(application environment)
DD_VERSION=(application version)
```

{{< tabs >}}
{{% tab "Go" %}}

앱 종속성을 [dd-trace-go@v1.44.0][1] 이상으로 업데이트 하세요.
```
go get gopkg.in/DataDog/dd-trace-go.v1@v1.44.0
```

`contrib/database/sql` 패키지를 가져오도록 코드를 업데이트하세요.
```go
import (
   "database/sql"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
   sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
)
```

다음 메서드 중 하나를 사용해 데이터베이스 모니터링 전파 기능을 활성화합니다.
1. 환경 변수:
   `DD_DBM_PROPAGATION_MODE=full`

2. 드라이버 등록 중 코드 사용:
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull), sqltrace.WithServiceName("my-db-service"))
   ```

3. `sqltrace.Open`에서 코드 사용:
 ```go
sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithServiceName("my-db-service"))

db, err := sqltrace.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable", sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull))
if err != nil {
log.Fatal(err)
}
```

전체 예시:
```go
import (
   "database/sql"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
   sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
)

func main() {
// 첫 단계는 드라이버를 등록할 때 dbm 전파 모드를 설정하는 것입니다. 이 단계는
 // sqltrace에서도 가능합니다. 더 세세한 기능 통제를 하려면 오픈하세요.
sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull))

// 다음은 오픈 호출 뒤에 옵니다.
db, err := sqltrace.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable")
if err != nil {
log.Fatal(err)
}

// 그 후 database/sql 패키지를 평소처럼 추적과 함께 사용합니다.
rows, err := db.Query("SELECT name FROM users WHERE age=?", 27)
if err != nil {
log.Fatal(err)
}
defer rows.Close()
}
```

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1

{{% /tab %}}

{{% tab "Java" %}}

[Java 추적][1] 계측 지침에 따라 에이전트 `1.11.0` 버전 이상을 설치합니다.

`jdbc-datasource` [계측][2] 또한 활성화해야 합니다.

다음 메서드 중 **하나**를 선택해 데이터베이스 모니터링 전파 기능을 활성화합니다.

- 시스템 속성 `dd.dbm.propagation.mode=full` 설정
- 환경 변수 `DD_DBM_PROPAGATION_MODE=full` 설정

전체 예시:
```
# 필요한 시스템 속성을 갖춘 자바 에이전트로 시작
java -javaagent:/path/to/dd-java-agent.jar -Ddd.dbm.propagation.mode=full -Ddd.integration.jdbc-datasource.enabled=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
```

애플리케이션 기능 테스트:
```java
public class Application {
    public static void main(String[] args) {
        try {
            Connection connection = DriverManager
                    .getConnection("jdbc:postgresql://127.0.0.1/foobar?preferQueryMode=simple", "user", "password");
            Statement stmt = connection.createStatement();
            String sql = "SELECT * FROM foo";
            stmt.execute(sql);
            stmt.close();
            connection.close();
        } catch (SQLException exception) {
            //  exception logic
        }
    }
}
```


**참고**: 준비된 선언문은 `full` 모드에서 지원되지 않으며, 준비된 선언문을 사용하는 모든 JDBC API 호출은 자동으로 `service` 모드로 다운그레이드됩니다. Java SQL 라이브러리 대부분은 기본값으로 준비된 선언문을 사용하며, 이는 자바 애플리케이션 **대부분**이  `service` 모드만 사용 가능함을 뜻합니다.

[1]: /ko/tracing/trace_collection/dd_libraries/java/
[2]: /ko/tracing/trace_collection/compatibility/java/#data-store-compatibility

{{% /tab %}}

{{% tab "Ruby" %}}


Gemfile에서 [dd-trace-rb][1]를 `1.8.0`이상 버전으로 설치하거나 업데이트합니다.

```rb
source 'https://rubygems.org'
gem 'ddtrace', '>= 1.8.0'

# 사용량에 따라 다름
gem 'mysql2'
gem 'pg'
```

다음 메서드 중 하나를 선택해 데이터베이스 모니터링 전파 기능을 활성화합니다.
1. 환경 변수:
   `DD_DBM_PROPAGATION_MODE=full`

2. [mysql2][2]이나 [pg][3]의 경우 `comment_propagation` 옵션(기본값: `ENV['DD_DBM_PROPAGATION_MODE']`):
   ```rb
    Datadog.configure do |c|
        c.tracing.instrument :mysql2, comment_propagation: 'full'
        c.tracing.instrument :pg, comment_propagation: 'full'
    end
   ```

전체 예시:
```rb
require 'mysql2'
require 'ddtrace'

Datadog.configure do |c|
    c.service = 'billing-api'
    c.env = 'production'
    c.version = '1.3-alpha'

    c.tracing.instrument :mysql2, comment_propagation: ENV['DD_DBM_PROPAGATION_MODE']
end

client = Mysql2::Client.new(:host => "localhost", :username => "root")
client.query("SELECT 1;")
```

[1]: https://github.com/dataDog/dd-trace-rb
[2]: /ko/tracing/trace_collection/dd_libraries/ruby/#mysql2
[3]: /ko/tracing/trace_collection/dd_libraries/ruby/#postgres

{{% /tab %}}

{{% tab "Python" %}}

앱 종속성에 [dd-trace-py>=1.9.0][1]을 포함하도록 업데이트합니다.
```
pip install "ddtrace>=1.9.0"
```

[psycopg2][2]를 설치합니다(**참고**: MySQL 클라이언트에는 DBM과 APM 연결이 지원되지 않습니다).
```
pip install psycopg2
```

다음 환경 변수를 설정해 데이터베이스 모니터링 전파 기능을 활성화합니다.
   - `DD_DBM_PROPAGATION_MODE=full`

전체 예시:
```python

import psycopg2

POSTGRES_CONFIG = {
    "host": "127.0.0.1",
    "port": 5432,
    "user": "postgres_user",
    "password": "postgres_password",
    "dbname": "postgres_db_name",
}

# postgres db에 연결
conn = psycopg2.connect(**POSTGRES_CONFIG)
cursor = conn.cursor()
# sql 쿼리 실행
cursor.execute("select 'blah'")
cursor.executemany("select %s", (("foo",), ("bar",)))
```

[1]: https://ddtrace.readthedocs.io/en/stable/release_notes.html
[2]: https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg

{{% /tab %}}

{{% tab ".NET" %}}

<div class="alert alert-warning">
이 기능을 사용하려면  .NET 서비스에 자동 계측이 활성화되어 있어야 합니다.
</div>

[.NET Framework 추적 지침][1]이나 [.NET Core 추적 지침][2]을 따라 자동 계측 패키지를 설치하고 서비스 추적을 활성화합니다.

지원되는 클라이언트 라이브러리를 사용하고 있는지 확인하세요(예: `Npgsql`).

다음 환경 변수를 설정해 데이터베이스 모니터링 전파 기능을 활성화합니다.
   - Postgres 및 MySQL: `DD_DBM_PROPAGATION_MODE=full`
   - SQL Server: `DD_DBM_PROPAGATION_MODE=service`

[1]: /ko/tracing/trace_collection/dd_libraries/dotnet-framework
[2]: /ko/tracing/trace_collection/dd_libraries/dotnet-core

{{% /tab %}}

{{% tab "PHP" %}}

<div class="alert alert-warning">
이 기능을 사용하려면 PHP 서비스에서 트레이서 기능이 활성화되어 있어야 합니다.
</div>

[PHP 추적 지침][1]을 따라 자동 계측 패키지를 설치하고 서비스 추적을 활성화합니다.

지원되는 클라이언트 라이브러리를 사용하고 있는지 확인하세요(예: `PDO`).

다음 환경 변수를 설정해 데이터베이스 모니터링 전파 기능을 활성화합니다.
   - `DD_DBM_PROPAGATION_MODE=full`

[1]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/php?tab=containers

{{% /tab %}}

{{% tab "Node.js" %}}

[dd-trace-js][1]를 `3.17.0`(또는 서비스 종료된 Node.js 버전 12를 사용하는 경우 `2.30.0`) 이상 버전으로 설치하거나 업데이트합니다.

```
npm install dd-trace@^3.17.0
```

가져올 코드를 업데이트하고 트레이서를 초기화합니다.
```javascript
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

다음 메서드 중 하나를 사용해 데이터베이스 모니터링 전파를 활성화합니다.
* 다음 환경 변수를 설정합니다.
   ```
   DD_DBM_PROPAGATION_MODE=full
   ```

* `dbmPropagationMode` 옵션을 사용하도록 트레이서를 설정합니다(기본값: `ENV['DD_DBM_PROPAGATION_MODE']`).
   ```javascript
   const tracer = require('dd-trace').init({ dbmPropagationMode: 'full' })
   ```

* 통합 수준에서만 활성화하도록 설정합니다.
   ```javascript
   const tracer = require('dd-trace').init();
   tracer.use('pg', {
      dbmPropagationMode: 'full'
   })
   ```


전체 예시:
```javascript
const pg = require('pg')
const tracer = require('dd-trace').init({ dbmPropagationMode: 'full' })

const client = new pg.Client({
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
})

client.connect(err => {
    console.error(err);
    process.exit(1);
});

client.query('SELECT $1::text as message', ['Hello world!'], (err, result) => {
    // 결과 처리
})
```

[1]: https://github.com/DataDog/dd-trace-js

{{% /tab %}}

{{< /tabs >}}

## DBM에서 APM 연결 탐색

### 활성 데이터베이스 연결을 APM 서비스 호출에 할당

{{< img src="database_monitoring/dbm_apm_active_connections_breakdown.png" alt="APM 서비스가 시작된 위치별로 분석된 데이터의 활성 연결 보기">}}

특정  호스트에서 요청을 실행하는 업스트림 APM 서비스별로 분석할 수 있습니다. 데이터베이스에서 개별 서비스에 로드를 할당해 데이터베이스에서 어떤 서비스가 활성화 정도가 가장 높은지 볼 수 있습니다. 활성화 정도가 높은 업스트림 서비스의 서비스 페이지로 이동해 더 조사해 보세요.

### 호출하는 APM 서비스별로 데이터베이스 호스트 필터링

{{< img src="database_monitoring/dbm_filter_by_calling_service.png" alt="호출하는 APM 서비스별로 데이터베이스 호스트 필터링.">}}

데이터베이스 목록을 빠르게 필터링해 특정 APM 서비스가 종속된 데이터베이스 호스트만 표시할 수 있습니다. 차단 활동이 있어 서비스 성능에 문제를 일으키는 다운스트림 종속성이 있는지 쉽게 확인할 수 있습니다.

### 쿼리 샘플에 연결된 트레이스 보기

{{< img src="database_monitoring/dbm_query_sample_trace_preview.png" alt="검사한 쿼리 샘플을 생성한, 샘플된 APM 트레이스 미리 보기">}}

데이터베이스 모니터링에서 쿼리 샘플을 볼 때 연결된 트레이스를 APM이 샘플했다면 APM 트레이스 컨텍스트에서 DBM 샘플을 볼 수 있습니다. 이를 통해 실행 계획과 쿼리 성능 내역을 포함한 DBM 원격 분석을 결합할 수 있습니다. 또한 인프라스트럭처 내 스팬 계보를 알 수 있어 데이터베이스에 애플리케이션 성능 문제를 일으키는 변화가 있었는지 파악할 수 있습니다.

## APM에서 DBM 연결 탐색

### APM 서비스의 다운스트림 데이터베이스 시각화

{{< img src="database_monitoring/dbm_apm_service_page_db_host_list.png" alt="서비스 페이지에서 APM 서비스가 종속된 다운스트림 데이터베이스 호스트 시각화.">}}

애플리케이션 성능 모니터링(APM) 기존 서비스 페이지에서 데이터베이스 모니터링으로 식별한 서비스의 다운스트림 데이터베이스 종속성을 바로 볼 수 있습니다. 오류 요인으로 인해 비정상적 로드가 존재하는 호스트를 빠르게 찾아낼 수 있습니다. 서비스 페이지를 보려면 [서비스 카탈로그][26]에서 해당 서비스를 클릭하여 세부 정보 패널을 연 다음 패널에서 **서비스 페이지 보기**를 클릭합니다.

### 실행 계획을 이용해 트레이스에 있는 데이터베이스 쿼리에서 잠재적 최적화 방법 파악

{{< img src="database_monitoring/explain_plans_in_traces_update.png" alt="트레이스 내부 데이터베이스 쿼리에 관한 실행 계획을 활용하여 비효율성 식별.">}}

샘플된 대기 이벤트, 평균 대기 시간, 최근 캡처된 실행 계획 등 트레이스에서 실행된 쿼리와 유사한 쿼리의 성능 내역을 확인하여 향후 쿼리 성능을 컨텍스트 속에서 파악할 수 있습니다. 비정상적인 동작이 있는지 확인한 후 데이터베이스 모니터링으로 이동해 데이트베이스 호스트와 관련한 추가 컨텍스트를 더 자세히 조사할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/database_monitoring/#getting-started
[2]: /ko/tracing/
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1
[4]: https://pkg.go.dev/database/sql
[5]: https://pkg.go.dev/github.com/jmoiron/sqlx
[6]: https://github.com/dataDog/dd-trace-rb
[7]: https://github.com/brianmario/mysql2
[8]: https://github.com/ged/ruby-pg
[9]: https://github.com/DataDog/dd-trace-js
[10]: https://node-postgres.com/
[11]: https://github.com/DataDog/dd-trace-py
[12]: https://www.psycopg.org/docs/index.html
[13]: https://github.com/mysqljs/mysql
[14]: https://github.com/sidorares/node-mysql2
[15]: https://github.com/DataDog/dd-trace-dotnet
[16]: https://www.nuget.org/packages/npgsql
[17]: https://www.nuget.org/packages/MySql.Data
[18]: https://www.nuget.org/packages/MySqlConnector
[19]: https://github.com/DataDog/dd-trace-php
[20]: https://www.php.net/manual/en/book.pdo.php
[21]: https://www.php.net/manual/en/book.mysqli.php
[22]: https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/
[23]: https://github.com/DataDog/dd-trace-java
[24]: https://learn.microsoft.com/en-us/dotnet/framework/data/adonet/ado-net-overview
[25]: https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[...]%20should%20set
[26]: https://app.datadoghq.com/services