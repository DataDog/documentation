---
aliases:
- /ko/database_monitoring/guide/connect_dbm_and_apm/
further_reading:
- link: https://www.datadoghq.com/blog/link-dbm-and-apm/
  tag: 블로그
  text: DBM 및 APM 텔레메트리 상관관계 분석을 통한 엔드투엔드 쿼리 성능 파악
title: Database Monitoring과 트레이스 상호 연결
---
이 가이드에서는 [Database Monitoring][1]을 이미 구성했고 [APM][2]을 사용하고 있다고 가정합니다. APM과 DBM을 연결하면 APM 트레이스 식별자가 DBM 데이터 수집에 주입되어 두 데이터 소스를 연관지을 수 있습니다. 이로 인해 APM 제품에서 DBM 정보를 표시하고 DBM 제품에서 APM 데이터를 표시하는 제품 기능이 활성화됩니다.

## 시작 전 참고 사항 {#before-you-begin}

지원되는 데이터베이스
: Postgres, MySQL, SQL Server, Oracle, MongoDB

지원되는 Agent 버전
: 7.46 이상

데이터 프라이버시
: 데이터베이스에 저장되어 있고 데이터베이스 액세스 권한이 부여된 기타 타사가 액세스할 수 있는 잠재적인 기밀 데이터(서비스 이름)에서 SQL 주석 전파 결과를 활성화합니다.


Datadog SDK서 통합은 *전파 모드*를 지원하며 전파 모드는 애플리케이션에서 데이터베이스로 전달되는 정보량을 제어합니다.

| 전파 모드 | 설명 |
|:-----------------|:------------|
| `full` | 전체 트레이스 정보를 데이터베이스로 전송합니다. DBM 내 개별 트레이스를 조사할 수 있습니다. 대부분의 통합에 권장되는 솔루션입니다. |
| `service` | 서비스 이름만 전송하여 어떤 서비스가 데이터베이스 부하를 유발하는지 확인할 수 있습니다. |
| `disabled` | 전파를 비활성화하며 애플리케이션에서 어떠한 정보도 전송하지 않습니다. |


**지원되는 데이터베이스**

{{< tabs >}}
{{% tab "Postgres" %}}

| 언어 | 최소 트레이서 버전 | 라이브러리/프레임워크 | 모드 |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `full`<br>`service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) >= 2.35.0 | [Npgsql](https://www.nuget.org/packages/npgsql) | `full`<br>`service` |
| **Node.js** | [dd-trace-js](https://github.com/DataDog/dd-trace-js) >= 3.17.0 | [postgres](https://node-postgres.com/) | `full`<br>`service` |
| **PHP** | [dd-trace-php](https://github.com/DataDog/dd-trace-php) >= 0.86.0 | [pdo](https://www.php.net/manual/en/book.pdo.php) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 1.9.0 | [psycopg2](https://www.psycopg.org/docs/index.html)<br>[psycopg](https://www.psycopg.org/psycopg3/) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 2.9.0 | [asyncpg](https://pypi.org/project/asyncpg/) | `full`<br>`service` |
| **Ruby** | [dd-trace-rb](https://github.com/dataDog/dd-trace-rb) >= 1.8.0 | [pg](https://github.com/ged/ruby-pg) | `full`<br>`service` |

**참고**: [CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set)는 .NET 드라이버에서 지원되지 않습니다.

{{% /tab %}}

{{% tab "MySQL" %}}

| 언어 | 최소 트레이서 버전 | 라이브러리/프레임워크 | 모드 |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `full`<br>`service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) >= 2.35.0 | [MySql.Data](https://www.nuget.org/packages/MySql.Data)<br>[MySqlConnector](https://www.nuget.org/packages/MySqlConnector) | `full`<br>`service` |
| **Node.js** | [dd-trace-js](https://github.com/DataDog/dd-trace-js) >= 3.17.0 | [mysql](https://github.com/mysqljs/mysql)<br>[mysql2](https://github.com/sidorares/node-mysql2) | `full`<br>`service` |
| **PHP** | [dd-trace-php](https://github.com/DataDog/dd-trace-php) >= 0.86.0 | [pdo](https://www.php.net/manual/en/book.pdo.php)<br>[MySQLi](https://www.php.net/manual/en/book.mysqli.php) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 2.9.0 | [aiomysql](https://pypi.org/project/aiomysql/)<br>[mysql-connector-python](https://pypi.org/project/mysql-connector-python/)<br>[mysqlclient](https://pypi.org/project/mysqlclient/)<br>[pymysql](https://github.com/PyMySQL/PyMySQL) | `full`<br>`service` |
| **Ruby** | [dd-trace-rb](https://github.com/dataDog/dd-trace-rb) >= 1.8.0 | [mysql2](https://github.com/brianmario/mysql2) | `full`<br>`service` |

**참고**: [CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set)는 .NET 드라이버에서 지원되지 않습니다.

**참고**: Aurora MySQL에서 전체 전파 모드를 사용하려면 버전 3이 필요합니다.

{{% /tab %}}

{{% tab "SQL 서버" %}}

| 언어 | 최소 트레이서 버전 | 라이브러리/프레임워크 | 모드 |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) >= 2.35.0 | [System.Data.SqlClient](https://learn.microsoft.com/sql/connect/ado-net/microsoft-ado-net-sql-server)<br>[Microsoft.Data.SqlClient](https://learn.microsoft.com/sql/connect/ado-net/introduction-microsoft-data-sqlclient-namespace) | `full`<br>`service` |

**참고**: [CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set)는 .NET 드라이버에서 지원되지 않습니다.

Java 및 .NET의 `full` 모드:

<div class="alert alert-danger">애플리케이션이 <code>context_info</code> 사용하여 계측된 경우 Datadog SDK가 해당 값을 덮어씁니다.</div>

- 계측 기능은 클라이언트가 쿼리를 실행할 때 `SET context_info` 명령을 수행하므로 데이터베이스와 추가 왕복 통신이 발생합니다.
- 전제 조건:
  - Agent 버전 7.55.0 이상
  - Java 트레이서 버전 1.39.0 이상
  - .NET 트레이서 버전 3.3 이상

{{% /tab %}}

{{% tab "Oracle" %}}

| 언어 | 최소 트레이서 버전 | 라이브러리/프레임워크 | 모드 |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |

Java의 `full` 모드:
- 계측 기능이 `V$SESSION.ACTION`을 덮어씁니다.
- 전제 조건: Java 트레이서 1.45 이상

{{% /tab %}}

{{% tab "MongoDB" %}}

| 언어 | 최소 트레이서 버전 | 라이브러리/프레임워크 | 모드 |
|:---------|:-------------------|:------------------|:-----|
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.58.0 | [mongo-java-driver](https://www.mongodb.com/docs/drivers/java/sync/current/) v3.8+ | `full`<br>`service` |
| **Node.js** | [dd-trace-js](https://github.com/DataDog/dd-trace-js) >= 5.80.0 | [mongodb](https://github.com/mongodb/node-mongodb-native) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 3.5.0 | [pymongo](https://pymongo.readthedocs.io/en/stable/) | `full`<br>`service` |

{{% /tab %}}

{{< /tabs >}}

## 설정 {#setup}
애플리케이션에 다음 환경 변수를 설정합니다.

```shell
DD_SERVICE=(application name)
DD_ENV=(application environment)
DD_VERSION=(application version)
```

이 태그는 APM 상관관계 보기 및 DBM 활성 연결 분석 화면에서 서비스를 식별하는 데 사용됩니다.

Datadog는 Agent 버전 `7.63` 이상에서는 SQL 난독화 모드를 `obfuscate_and_normalize`로 설정할 것을 권장합니다. APM Agent 구성 파일의 `apm_config` 섹션에 다음 파라미터를 추가합니다.

```yaml
  sql_obfuscation_mode: "obfuscate_and_normalize"
```

<div class="alert alert-warning">난독화 모드를 변경하면 정규화된 SQL 텍스트가 변경될 수 있습니다. APM 트레이스의 SQL 텍스트를 기준으로 작성된 모니터가 있다면 해당 모니터를 업데이트해야 할 수 있습니다.</div>

{{< tabs >}}
{{% tab "Go" %}}

[dd-trace-go v2][1]를 포함하도록 앱 종속성을 업데이트합니다. {{% tracing-go-v2 %}}

```shell
go get github.com/DataDog/dd-trace-go/v2 # 2.x
```

코드를 업데이트하여 `contrib/database/sql` 패키지를 가져옵니다.

```go
import (
   "database/sql"
   "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
   sqltrace "github.com/DataDog/dd-trace-go/contrib/database/sql/v2"
)
```

다음 방법 중 하나를 사용하여 데이터베이스 모니터링 전파 기능을 활성화합니다.
- 환경 변수:
   `DD_DBM_PROPAGATION_MODE=full`

- 드라이버 등록 시 코드 사용:
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull), sqltrace.WithService("my-db-service"))
   ```

- `sqltrace.Open`에서 코드 사용:
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithService("my-db-service"))

   db, err := sqltrace.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable", sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull))
   if err != nil {
	   log.Fatal(err)
   }
   ```

전체 예시:

```go
import (
	"database/sql"
	"github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
   sqltrace "github.com/DataDog/dd-trace-go/contrib/database/sql/v2"
)

func main() {
	// The first step is to set the dbm propagation mode when registering the driver. Note that this can also
	// be done on sqltrace.Open for more granular control over the feature.
	sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull))

	// Followed by a call to Open.
	db, err := sqltrace.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}

	// Then, we continue using the database/sql package as we normally would, with tracing.
	rows, err := db.Query("SELECT name FROM users WHERE age=?", 27)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
}
```

[1]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2

{{% /tab %}}

{{% tab "Java" %}}

[Java 트레이싱][1] 계측 지침에 따라 Agent의 `1.11.0` 버전 이상을 설치합니다.

또한 `jdbc-datasource` [계측][2]을 활성화해야 합니다.

다음 방법 중 **하나**를 사용하여 데이터베이스 모니터링 전파 기능을 활성화합니다.

- 시스템 속성 설정 `dd.dbm.propagation.mode=full`
- 환경 변수 `DD_DBM_PROPAGATION_MODE=full`을 설정합니다.

전체 예시:

```shell
# Start the Java Agent with the required system properties
java -javaagent:/path/to/dd-java-agent.jar -Ddd.dbm.propagation.mode=full -Ddd.integration.jdbc-datasource.enabled=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
```

애플리케이션에서 기능 테스트:

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

**트레이서 버전 1.44 이상**:
다음 방법 중 **하나**를 사용하여 준비된 Postgres의 문 트레이스를 활성화합니다.
- 시스템 속성 설정 `dd.dbm.trace_prepared_statements=true`
- 환경 변수 설정 `export DD_DBM_TRACE_PREPARED_STATEMENTS=true`

**참고**: 준비한 문 계측은 `Application` 속성을 텍스트 `_DD_overwritten_by_tracer`로 덮어쓰며, 데이터베이스와의 추가 왕복을 발생시킵니다. 이 추가 왕복은 SQL 문 실행 시간에 미치는 영향이 매우 작습니다.

<div class="alert alert-danger">준비된 문 트레이스를 활성화하면 Amazon RDS Proxy를 사용할 때 연결 고정이 증가할 수 있으며, 이는 연결 풀링 효율성을 감소시킵니다. 자세한 내용은 <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-pinning.html">RDS Proxy의 연결 고정</a>을 참조하세요.</div>

**트레이서 버전 1.44 미만**:
Postgres 및 MySQL에서는 준비된 문이 `full` 모드에서 지원되지 않으며, 준비된 문을 사용하는 모든 JDBC API 호출은 자동으로 `service` 모드로 다운그레이드됩니다. 대부분의 Java SQL 라이브러리가 기본적으로 준비된 문을 사용하므로, **대부분**의 Java 애플리케이션은 사실상 `service` 모드만 사용할 수 있습니다.

[1]: /ko/tracing/trace_collection/dd_libraries/java/
[2]: /ko/tracing/trace_collection/compatibility/java/#data-store-compatibility

{{% /tab %}}

{{% tab "Ruby" %}}

Gemfile에서 [dd-trace-rb][1]을 버전 `1.8.0` 이상으로 설치하거나 업데이트합니다.

```rb
source 'https://rubygems.org'
gem 'datadog' # Use `'ddtrace', '>= 1.8.0'` if you're using v1.x

# Depends on your usage
gem 'mysql2'
gem 'pg'
```

다음 방법 중 하나를 사용하여 데이터베이스 모니터링 전파 기능을 활성화합니다.
1. 환경 변수:
   `DD_DBM_PROPAGATION_MODE=full`

2. 옵션 `comment_propagation`(기본값: `ENV['DD_DBM_PROPAGATION_MODE']`), [mysql2][2] 또는 [pg][3]의 경우:
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

[dd-trace-py>=1.9.0][1]을 포함하도록 앱 종속성을 업데이트합니다.

```
pip install "ddtrace>=1.9.0"
```

Postgres의 경우 [psycopg2][2]를 설치합니다.

```
pip install psycopg2
```

MongoDB의 경우 pymongo를 설치합니다.

```
pip install pymongo
```

**참고**: MongoDB 지원에는 `dd-trace-py` >= 3.5.0이 필요합니다. 업그레이드가 필요하면: `pip install "ddtrace>=3.5.0"`.

다음 환경 변수를 설정해 데이터베이스 모니터링 전파 기능을 활성화합니다.
   - `DD_DBM_PROPAGATION_MODE=full`

Postgres 예시:

```python
import psycopg2

POSTGRES_CONFIG = {
    "host": "127.0.0.1",
    "port": 5432,
    "user": "postgres_user",
    "password": "postgres_password",
    "dbname": "postgres_db_name",
}

# connect to postgres db
conn = psycopg2.connect(**POSTGRES_CONFIG)
cursor = conn.cursor()
# execute sql queries
cursor.execute("select 'blah'")
cursor.executemany("select %s", (("foo",), ("bar",)))
```

MongoDB 예시:

```python
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['test_database']
collection = db['test_collection']

# Insert a document
collection.insert_one({"name": "test", "value": 1})

# Query documents
results = collection.find({"name": "test"})
for doc in results:
    print(doc)
```

[1]: https://ddtrace.readthedocs.io/en/stable/release_notes.html
[2]: https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg

{{% /tab %}}

{{% tab ".NET" %}}

<div class="alert alert-danger">
이 기능을 사용하려면 .NET 서비스에서 자동 계측이 활성화되어 있어야 합니다.
</div>

[.NET Framework 추적 지침][1]이나 [.NET Core 추적 지침][2]을 따라 자동 계측 패키지를 설치하고 서비스 추적을 활성화합니다.

지원되는 클라이언트 라이브러리를 사용하고 있는지 확인하세요. 예를 들어, `Npgsql`입니다.

다음 환경 변수를 설정해 데이터베이스 모니터링 전파 기능을 활성화합니다.
   - Postgres 및 MySQL의 경우: `DD_DBM_PROPAGATION_MODE=full`
   - SQL Server의 경우: `DD_DBM_PROPAGATION_MODE=service` 또는 `DD_DBM_PROPAGATION_MODE=full`(Java 및 .NET 트레이서 사용 시)
   - Oracle의 경우: `DD_DBM_PROPAGATION_MODE=service`

[1]: /ko/tracing/trace_collection/dd_libraries/dotnet-framework
[2]: /ko/tracing/trace_collection/dd_libraries/dotnet-core

{{% /tab %}}

{{% tab "PHP" %}}

<div class="alert alert-danger">
이 기능을 사용하려면 PHP 서비스에서 트레이서 확장이 활성화되어 있어야 합니다.
</div>

[PHP 추적 지침][1]을 따라 자동 계측 패키지를 설치하고 서비스 추적을 활성화합니다.

지원되는 클라이언트 라이브러리를 사용하고 있는지 확인하세요. 예를 들어, `PDO`입니다.

다음 환경 변수를 설정해 데이터베이스 모니터링 전파 기능을 활성화합니다.
   - `DD_DBM_PROPAGATION_MODE=full`

[1]: https://docs.datadoghq.com/ko/tracing/trace_collection/dd_libraries/php?tab=containers

{{% /tab %}}

{{% tab "Node.js" %}}

[dd-trace-js][1]를 `3.17.0`(지원이 종료된 Node.js 12 버전을 사용하는 경우에는 `2.30.0`)보다 높은 버전으로 설치하거나 업데이트합니다.

```shell
npm install dd-trace@^3.17.0
```

가져올 코드를 업데이트하고 트레이서를 초기화합니다.

```javascript
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

다음 방법 중 하나를 사용하여 데이터베이스 모니터링 전파 기능을 활성화합니다.
* 다음 환경 변수를 설정합니다.
   ```
   DD_DBM_PROPAGATION_MODE=full
   ```

* SDK를 `dbmPropagationMode` 옵션(기본값: `ENV['DD_DBM_PROPAGATION_MODE']`)을 사용하도록 설정합니다.
   ```javascript
   const tracer = require('dd-trace').init({ dbmPropagationMode: 'full' })
   ```

* 통합 수준에서만 활성화합니다.
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
	// handle result
})
```

[1]: https://github.com/DataDog/dd-trace-js

{{% /tab %}}

{{< /tabs >}}

활성화한 후 전파를 비활성화하려면 `DD_DBM_PROPAGATION_MODE=disabled`를 설정합니다.

## 통합 확인 {#verify-the-integration}

통합이 작동하는지 확인하려면:
1. 계측된 애플리케이션을 실행하고 데이터베이스 쿼리를 실행합니다.
1. Datadog에서 [**Database Monitoring > Query Samples**][37]로 이동합니다.
1. 쿼리 샘플에 **APM** 상관관계 배지가 표시되는지 확인합니다.

## DBM에서 APM 연결 탐색 {#explore-the-apm-connection-in-dbm}

### 활성 데이터베이스 연결을 APM 서비스 호출에 할당{#attribute-active-database-connections-to-the-calling-apm-services}

{{< img src="database_monitoring/dbm_apm_active_connections_breakdown.png" alt="데이터베이스 활성 연결을 호출한 APM 서비스 기준으로 분류하여 확인합니다.">}}

요청을 발생시킨 상위 APM 서비스별로 특정 호스트의 활성 연결을 분석합니다. 데이터베이스에 대한 부하를 개별 서비스에 할당하여 어떤 서비스가 데이터베이스에서 가장 활발한지 이해할 수 있습니다. 조사를 계속하기 위해 가장 활발한 상위 서비스의 서비스 페이지로 이동합니다.

### 호출하는 APM 서비스별로 데이터베이스 호스트 필터링 {#filter-your-database-hosts-by-the-apm-services-that-call-them}

{{< img src="database_monitoring/dbm_filter_by_calling_service.png" alt="호출하는 APM 서비스별로 데이터베이스 호스트를 필터링합니다.">}}

데이터베이스 목록을 필터링하여 특정 APM 서비스가 의존하는 데이터베이스 호스트만 표시합니다. 하위 종속성 중에서 서비스 성능에 영향을 미칠 수 있는 차단 활동이 있는지 확인합니다.

### 쿼리 샘플에 연결된 트레이스 보기 {#view-the-associated-trace-for-a-query-sample}

{{< img src="database_monitoring/dbm_query_sample_trace_preview.png" alt="검사 중인 쿼리 샘플에서 생성된 APM 트레이스를 미리 봅니다.">}}

Database Monitoring에서 [쿼리 샘플][37]을 볼 때 연결된 트레이스를 APM이 샘플링했다면 APM 트레이스 컨텍스트에서 DBM 샘플을 볼 수 있습니다. 이를 통해 실행 계획과 쿼리 성능 내역을 포함한 DBM 텔레메트리를 결합할 수 있습니다. 또한 인프라 내 스팬 계보를 알 수 있어 데이터베이스에 애플리케이션 성능 문제를 일으키는 변화가 있었는지 파악할 수 있습니다.

## APM에서 DBM 연결 탐색 {#explore-the-dbm-connection-in-apm}

### APM 서비스의 다운스트림 데이터베이스 호스트 시각화 {#visualize-the-downstream-database-hosts-of-apm-services}

특정 서비스의 APM 페이지에서 Database Monitoring이 식별한 해당 서비스의 직접적인 다운스트림 데이터베이스 종속성을 확인하고, 다른 워크로드의 영향으로 인해 특정 호스트에 과도한 부하가 집중되어 있는지 파악할 수 있습니다. 서비스의 데이터베이스 종속성을 보려면:
1. [Software Catalog][26]에서 서비스를 선택하여 세부 정보 패널을 엽니다.
1. 패널에서 {{< ui >}}Service Page{{< /ui >}}를 선택합니다.
1. Service 페이지에서 {{< ui >}}Databases{{< /ui >}} 섹션을 선택합니다.
1. Databases 섹션 내에서 {{< ui >}}Databases{{< /ui >}} 탭을 선택합니다.

### 스팬 지속 시간을 시각화하고 쿼리 세부 정보를 확인합니다 {#visualize-span-durations-and-view-query-details}

APM 서비스 페이지의 {{< ui >}}Databases{{< /ui >}} 섹션에서 {{< ui >}}Queries{{< /ui >}} 탭을 선택하면 선택한 시간 범위 내의 지연 시간 이상치와 전체 쿼리 목록을 확인할 수 있습니다. 테이블에서 특정 쿼리를 선택하면 쿼리 패널이 열리며 진단, 오류 세부 정보 및 트레이스 정보를 확인할 수 있습니다.

### 실행 계획을 이용해 트레이스에 있는 데이터베이스 쿼리에서 잠재적 최적화 방법 파악{#identify-potential-optimizations-using-explain-plans-for-database-queries-in-traces}

{{< img src="database_monitoring/explain_plans_in_traces_update.png" alt="실행 계획을 이용해 트레이스에 있는 데이터베이스 쿼리에 대한 비효율성을 파악합니다.">}}

트레이스에서 실행된 유사 쿼리의 과거 성능을 확인하고, 샘플링된 대기 이벤트, 평균 지연 시간, 최근 캡처된 실행 계획을 통해 해당 쿼리의 예상 성능을 파악합니다. 동작이 비정상인지 확인하고, 기본 데이터베이스 호스트에 대한 추가 컨텍스트를 얻기 위해 [Database Monitoring][1]으로 전환하여 조사를 계속합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/database_monitoring/#getting-started
[2]: /ko/tracing/
[3]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2
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
[24]: https://learn.microsoft.com/sql/connect/ado-net/microsoft-ado-net-sql-server
[25]: https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set
[26]: https://app.datadoghq.com/services
[27]: https://pypi.org/project/asyncpg/
[28]: https://pypi.org/project/aiomysql/
[29]: https://pypi.org/project/mysql-connector-python/
[30]: https://pypi.org/project/mysqlclient/
[31]: https://github.com/PyMySQL/PyMySQL
[32]: https://learn.microsoft.com/sql/connect/ado-net/introduction-microsoft-data-sqlclient-namespace
[33]: https://github.com/mongodb/node-mongodb-native
[34]: https://www.psycopg.org/psycopg3/
[35]: https://pymongo.readthedocs.io/en/stable/
[36]: https://www.mongodb.com/docs/drivers/java/sync/current/
[37]: /ko/database_monitoring/query_samples/