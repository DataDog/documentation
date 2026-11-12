---
aliases:
- /es/database_monitoring/guide/connect_dbm_and_apm/
further_reading:
- link: https://www.datadoghq.com/blog/link-dbm-and-apm/
  tag: Blog
  text: Correlacione la telemetría de DBM y APM para comprender el rendimiento de
    las consultas de extremo a extremo
title: Correlacione Database Monitoring y las trazas
---
Esta guía asume que ha configurado [Database Monitoring][1] y que está utilizando [APM][2]. Conectar APM y DBM inyecta identificadores de traza de APM en la recopilación de datos de DBM, lo que permite la correlación de estas dos fuentes de datos. Esto habilita funciones del producto que muestran información de la base de datos en el producto APM, y datos de APM en el producto DBM.

## Antes de comenzar {#before-you-begin}

Bases de datos compatibles
: Postgres, MySQL, SQL Server, Oracle, MongoDB

Versiones de Agent compatibles
: 7.46+

Privacidad de datos
: Habilitar la propagación de comentarios SQL provoca que datos potencialmente confidenciales (nombres de servicio) se almacenen en las bases de datos, a los cuales pueden acceder otros terceros a quienes se les haya otorgado acceso a la base de datos.


Las integraciones del SDK de Datadog admiten un *Modo de propagación*, que controla la cantidad de información que se transmite desde las aplicaciones a la base de datos.

| Modo de propagación | Descripción |
|:-----------------|:------------|
| `full` | Envía información completa de traza a la base de datos, lo que le permite investigar trazas individuales dentro de DBM. Esta es la solución recomendada para la mayoría de las integraciones. |
| `service` | Envía el nombre del servicio, lo que le permite comprender qué servicios contribuyen a la carga de la base de datos. |
| `disabled` | Deshabilita la propagación y no envía ninguna información desde las aplicaciones. |


**Bases de datos compatibles**

{{< tabs >}}
{{% tab "Postgres" %}}

| Idioma | Versión mínima del tracer | Biblioteca/Framework | Modo |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `full`<br>`service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) >= 2.35.0 | [Npgsql](https://www.nuget.org/packages/npgsql) | `full`<br>`service` |
| **Node.js** | [dd-trace-js](https://github.com/DataDog/dd-trace-js) >= 3.17.0 | [postgres](https://node-postgres.com/) | `full`<br>`service` |
| **PHP** | [dd-trace-php](https://github.com/DataDog/dd-trace-php) >= 0.86.0 | [pdo](https://www.php.net/manual/en/book.pdo.php) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 1.9.0 | [psycopg2](https://www.psycopg.org/docs/index.html)<br>[psycopg](https://www.psycopg.org/psycopg3/) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 2.9.0 | [asyncpg](https://pypi.org/project/asyncpg/) | `full`<br>`service` |
| **Ruby** | [dd-trace-rb](https://github.com/dataDog/dd-trace-rb) >= 1.8.0 | [pg](https://github.com/ged/ruby-pg) | `full`<br>`service` |

**Nota**: [CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set) no es compatible con el controlador de .NET.

{{% /tab %}}

{{% tab "MySQL" %}}

| Idioma | Versión mínima del tracer | Biblioteca/Framework | Modo |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `full`<br>`service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) >= 2.35.0 | [MySql.Data](https://www.nuget.org/packages/MySql.Data)<br>[MySqlConnector](https://www.nuget.org/packages/MySqlConnector) | `full`<br>`service` |
| **Node.js** | [dd-trace-js](https://github.com/DataDog/dd-trace-js) >= 3.17.0 | [mysql](https://github.com/mysqljs/mysql)<br>[mysql2](https://github.com/sidorares/node-mysql2) | `full`<br>`service` |
| **PHP** | [dd-trace-php](https://github.com/DataDog/dd-trace-php) >= 0.86.0 | [pdo](https://www.php.net/manual/en/book.pdo.php)<br>[MySQLi](https://www.php.net/manual/en/book.mysqli.php) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 2.9.0 | [aiomysql](https://pypi.org/project/aiomysql/)<br>[mysql-connector-python](https://pypi.org/project/mysql-connector-python/)<br>[mysqlclient](https://pypi.org/project/mysqlclient/)<br>[pymysql](https://github.com/PyMySQL/PyMySQL) | `full`<br>`service` |
| **Ruby** | [dd-trace-rb](https://github.com/dataDog/dd-trace-rb) >= 1.8.0 | [mysql2](https://github.com/brianmario/mysql2) | `full`<br>`service` |

**Nota**: [CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set) no es compatible con los controladores de .NET.

**Nota**: El modo de propagación completa en Aurora MySQL requiere la versión 3.

{{% /tab %}}

{{% tab "SQL Server" %}}

| Idioma | Versión mínima del tracer | Biblioteca/Framework | Modo |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) >= 2.35.0 | [System.Data.SqlClient](https://learn.microsoft.com/sql/connect/ado-net/microsoft-ado-net-sql-server)<br>[Microsoft.Data.SqlClient](https://learn.microsoft.com/sql/connect/ado-net/introduction-microsoft-data-sqlclient-namespace) | `full`<br>`service` |

**Nota**: [CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set) no es compatible con los controladores de .NET.

Para el modo `full` con Java y .NET:

<div class="alert alert-danger">Si su aplicación utiliza <code>context_info</code> para la instrumentación, el SDK de Datadog lo sobrescribe.</div>

- La instrumentación ejecuta un comando `SET context_info` cuando el cliente emite una consulta, lo que realiza un viaje de ida y vuelta adicional a la base de datos.
- Requisitos previos:
  - Versión del Agent 7.55.0 o superior
  - Versión del Java tracer 1.39.0 o superior
  - Versión del .NET tracer 3.3 o superior

{{% /tab %}}

{{% tab "Oracle" %}}

| Idioma | Versión mínima del tracer | Biblioteca/Framework | Modo |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service`<br>`dynamic_service` |

Para el modo `full` con Java:
- La instrumentación sobrescribe `V$SESSION.ACTION`.
- Requisito previo: Java tracer 1.45 o superior

Para el modo `dynamic_service` con Java, puede propagar la información del servicio sin cambiar el texto de la sentencia SQL. Utilice esta opción si depende de funciones que coinciden con el texto SQL exacto, como las líneas base de SQL Plan Management.
- Establezca `DD_DBM_PROPAGATION_MODE=dynamic_service` y `DD_DBM_PROPAGATION_ORACLE_ACTION_ONLY_ENABLED=true`.
- La instrumentación escribe el hash del servicio en `V$SESSION.ACTION` en lugar de inyectar comentarios SQL. Esto sobrescribe cualquier valor `V$SESSION.ACTION` existente.
- `V$SESSION.ACTION` se establece una vez por conexión y solo se actualiza si el hash del servicio cambia.
- Requisito previo: Java tracer 1.67.0 o superior

{{% /tab %}}

{{% tab "MongoDB" %}}

| Idioma | Versión mínima del tracer | Biblioteca/Framework | Modo |
|:---------|:-------------------|:------------------|:-----|
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.58.0 | [mongo-java-driver](https://www.mongodb.com/docs/drivers/java/sync/current/) v3.8+ | `full`<br>`service` |
| **Node.js** | [dd-trace-js](https://github.com/DataDog/dd-trace-js) >= 5.80.0 | [mongodb](https://github.com/mongodb/node-mongodb-native) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 3.5.0 | [pymongo](https://pymongo.readthedocs.io/en/stable/) | `full`<br>`service` |

{{% /tab %}}

{{< /tabs >}}

## Configuración {#setup}
Establezca las siguientes variables de entorno en su aplicación:

```shell
DD_SERVICE=(application name)
DD_ENV=(application environment)
DD_VERSION=(application version)
```

Estas etiquetas identifican su servicio en las vistas de correlación de APM y en el desglose de conexiones activas de DBM.

Datadog recomienda configurar el modo de ofuscación en `obfuscate_and_normalize` para las versiones del Agent `7.63` y superiores. Agregue el siguiente parámetro en la sección `apm_config` de su archivo de configuración del APM Agent:

```yaml
  sql_obfuscation_mode: "obfuscate_and_normalize"
```

<div class="alert alert-warning">Cambiar el modo de ofuscación puede alterar el texto SQL normalizado. Si tiene monitores basados en texto SQL en trazas de APM, es posible que deba actualizarlos.</div>

{{< tabs >}}
{{% tab "Go" %}}

Actualice las dependencias de su aplicación para incluir [dd-trace-go v2][1]. {{% tracing-go-v2 %}}

```shell
go get github.com/DataDog/dd-trace-go/v2 # 2.x
```

Actualice su código para importar el paquete `contrib/database/sql`:

```go
import (
   "database/sql"
   "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
   sqltrace "github.com/DataDog/dd-trace-go/contrib/database/sql/v2"
)
```

Habilite la función de propagación de monitoreo de base de datos utilizando uno de los siguientes métodos:
- Variable de entorno:
   `DD_DBM_PROPAGATION_MODE=full`

- Uso de código durante el registro del controlador:
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull), sqltrace.WithService("my-db-service"))
   ```

- Uso de código en `sqltrace.Open`:
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithService("my-db-service"))

   db, err := sqltrace.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable", sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull))
   if err != nil {
	   log.Fatal(err)
   }
   ```

Ejemplo completo:

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

Siga las instrucciones de instrumentación de [rastreo de Java][1] e instale la versión `1.11.0`, o superior, del Agent.

También debe habilitar la [instrumentación][2] `jdbc-datasource`.

Habilite la función de propagación de Database Monitoring utilizando **uno** de los siguientes métodos:

- Establezca la propiedad del sistema `dd.dbm.propagation.mode=full`
- Establezca la variable de entorno `DD_DBM_PROPAGATION_MODE=full`

Ejemplo completo:

```shell
# Start the Java Agent with the required system properties
java -javaagent:/path/to/dd-java-agent.jar -Ddd.dbm.propagation.mode=full -Ddd.integration.jdbc-datasource.enabled=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
```

Pruebe la función en su aplicación:

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

**Oracle sin comentarios SQL (versiones de traza 1.67.0 y superiores)**:
Para propagar la información del servicio a Oracle sin modificar el texto de la sentencia SQL, establezca **ambas** de las siguientes opciones:
- `DD_DBM_PROPAGATION_MODE=dynamic_service` (o la propiedad del sistema `dd.dbm.propagation.mode=dynamic_service`)
- `DD_DBM_PROPAGATION_ORACLE_ACTION_ONLY_ENABLED=true` (o la propiedad del sistema `dd.dbm.propagation.oracle.action-only.enabled=true`)

Con esta configuración, el tracer escribe el hash del servicio en `V$SESSION.ACTION` en lugar de inyectar comentarios SQL en las sentencias de Oracle, incluidas las sentencias preparadas. Las conexiones a otras bases de datos siguen recibiendo comentarios SQL.

**Versiones de tracer 1.44 y superiores**:
Habilite la traza de sentencias preparadas para Postgres utilizando **uno** de los siguientes métodos:
- Establezca la propiedad del sistema `dd.dbm.trace_prepared_statements=true`
- Establezca la variable de entorno `export DD_DBM_TRACE_PREPARED_STATEMENTS=true`

**Nota**: La instrumentación de sentencias preparadas sobrescribe la propiedad `Application` con el texto `_DD_overwritten_by_tracer` y provoca un viaje de ida y vuelta adicional a la base de datos. Este viaje de ida y vuelta adicional tiene un impacto mínimo en el tiempo de ejecución de la sentencia SQL.

<div class="alert alert-danger">Habilitar la traza de sentencias preparadas puede causar un mayor anclaje de conexiones al usar Amazon RDS Proxy, lo que reduce la eficiencia del agrupamiento de conexiones. Para obtener más información, consulte <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-pinning.html">Anclaje de conexiones en RDS Proxy</a>.</div>

**Versiones de la traza anteriores a 1.44**:
Las sentencias preparadas no son compatibles en el modo `full` para Postgres y MySQL, y todas las llamadas API JDBC que utilizan sentencias preparadas se degradan automáticamente al modo `service`. Dado que la mayoría de las bibliotecas SQL de Java utilizan sentencias preparadas de forma predeterminada, esto significa que **la mayoría** de las aplicaciones Java solo pueden utilizar el modo `service`.

[1]: /es/tracing/trace_collection/dd_libraries/java/
[2]: /es/tracing/trace_collection/compatibility/java/#data-store-compatibility

{{% /tab %}}

{{% tab "Ruby" %}}

En su Gemfile, instale o actualice [dd-trace-rb][1] a la versión `1.8.0` o superior:

```rb
source 'https://rubygems.org'
gem 'datadog' # Use `'ddtrace', '>= 1.8.0'` if you're using v1.x

# Depends on your usage
gem 'mysql2'
gem 'pg'
```

Habilite la función de propagación de monitoreo de base de datos utilizando uno de los siguientes métodos:
1. Variable de entorno:
   `DD_DBM_PROPAGATION_MODE=full`

2. Opción `comment_propagation` (predeterminada: `ENV['DD_DBM_PROPAGATION_MODE']`), para [mysql2][2] o [pg][3]:
   ```rb
	Datadog.configure do |c|
		c.tracing.instrument :mysql2, comment_propagation: 'full'
		c.tracing.instrument :pg, comment_propagation: 'full'
	end
   ```

Ejemplo completo:

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
[2]: /es/tracing/trace_collection/dd_libraries/ruby/#mysql2
[3]: /es/tracing/trace_collection/dd_libraries/ruby/#postgres

{{% /tab %}}

{{% tab "Python" %}}

Actualice las dependencias de su aplicación para incluir [dd-trace-py>=1.9.0][1]:

```
pip install "ddtrace>=1.9.0"
```

Para Postgres, instale [psycopg2][2]:

```
pip install psycopg2
```

Para MongoDB, instale pymongo:

```
pip install pymongo
```

**Nota**: El soporte para MongoDB requiere `dd-trace-py` >= 3.5.0. Si necesita actualizar: `pip install "ddtrace>=3.5.0"`.

Habilite la función de propagación de Database Monitoring configurando la siguiente variable de entorno:
   - `DD_DBM_PROPAGATION_MODE=full`

Ejemplo de Postgres:

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

Ejemplo de MongoDB:

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
Esta función requiere que la instrumentación automática esté habilitada para su servicio .NET.
</div>

Siga las [instrucciones de rastreo de .NET Framework][1] o las [instrucciones de rastreo de .NET Core][2] para instalar el paquete de instrumentación automática y habilitar el rastreo para su servicio.

Asegúrese de estar utilizando una biblioteca cliente compatible. Por ejemplo, `Npgsql`.

Habilite la función de propagación de Database Monitoring configurando la siguiente variable de entorno:
   - Para Postgres y MySQL: `DD_DBM_PROPAGATION_MODE=full`
   - Para SQL Server: `DD_DBM_PROPAGATION_MODE=service` o `DD_DBM_PROPAGATION_MODE=full` con tracers de Java y .NET
   - Para Oracle: `DD_DBM_PROPAGATION_MODE=service`

[1]: /es/tracing/trace_collection/dd_libraries/dotnet-framework
[2]: /es/tracing/trace_collection/dd_libraries/dotnet-core

{{% /tab %}}

{{% tab "PHP" %}}

<div class="alert alert-danger">
Esta función requiere que la extensión de tracer esté habilitada para su servicio PHP.
</div>

Siga las [instrucciones de rastreo de PHP][1] para instalar el paquete de instrumentación automática y habilitar el rastreo para su servicio.

Asegúrese de estar utilizando una biblioteca cliente compatible. Por ejemplo, `PDO`.

Habilite la función de propagación de Database Monitoring configurando la siguiente variable de entorno:
   - `DD_DBM_PROPAGATION_MODE=full`

[1]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/php?tab=containers

{{% /tab %}}

{{% tab "Node.js" %}}

Instale o actualice [dd-trace-js][1] a una versión superior a `3.17.0` (o `2.30.0` si utiliza la versión 12 de Node.js, que ya no cuenta con soporte):

```shell
npm install dd-trace@^3.17.0
```

Actualice su código para importar e inicializar el tracer:

```javascript
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

Habilite la función de propagación de monitoreo de base de datos utilizando uno de los siguientes métodos:
* Establezca la siguiente variable de entorno:
   ```
   DD_DBM_PROPAGATION_MODE=full
   ```

* Configure el SDK para usar la opción `dbmPropagationMode` (predeterminado: `ENV['DD_DBM_PROPAGATION_MODE']`):
   ```javascript
   const tracer = require('dd-trace').init({ dbmPropagationMode: 'full' })
   ```

* Habilite solo a nivel de integración:
   ```javascript
   const tracer = require('dd-trace').init();
   tracer.use('pg', {
      dbmPropagationMode: 'full'
   })
   ```


Ejemplo completo:

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

Para deshabilitar la propagación después de habilitarla, establezca `DD_DBM_PROPAGATION_MODE=disabled`.

## Verifique la integración {#verify-the-integration}

Para confirmar que la integración funciona:
1. Ejecute su aplicación instrumentada y realice una consulta a la base de datos.
1. En Datadog, vaya a [**Database Monitoring > Query Samples**][37].
1. Confirme que la insignia de correlación de **APM** aparezca en la muestra de consulta.

## Explore la conexión APM en DBM {#explore-the-apm-connection-in-dbm}

### Atribuya las conexiones activas a la base de datos a los servicios de APM que las llaman {#attribute-active-database-connections-to-the-calling-apm-services}

{{< img src="database_monitoring/dbm_apm_active_connections_breakdown.png" alt="Visualice las conexiones activas a una base de datos desglosadas por el servicio de APM del que provienen.">}}

Desglose las conexiones activas para un servidor determinado por los servicios de APM ascendentes que realizan las solicitudes. Puede atribuir la carga en una base de datos a servicios individuales para comprender qué servicios son los más activos en la base de datos. Cambie a la página de servicio del servicio ascendente más activo para continuar con la investigación.

### Filtre sus servidores de base de datos por los servicios de APM que los llaman {#filter-your-database-hosts-by-the-apm-services-that-call-them}

{{< img src="database_monitoring/dbm_filter_by_calling_service.png" alt="Filtre sus servidores de base de datos por los servicios de APM que los llaman.">}}

Filtre la Database List para mostrar solo los servidores de base de datos de los que dependen sus servicios de APM específicos. Identifique si alguna de sus dependencias descendentes tiene actividad de bloqueo que pueda afectar el rendimiento del servicio.

### Visualice la traza asociada para una muestra de consulta {#view-the-associated-trace-for-a-query-sample}

{{< img src="database_monitoring/dbm_query_sample_trace_preview.png" alt="Obtenga una vista previa de la traza de APM muestreada a partir de la cual se generó la muestra de consulta que se está inspeccionando.">}}

Al ver una [Query Sample][37] en Database Monitoring, si la traza asociada ha sido muestreada por APM, puede visualizar la muestra de DBM en el contexto de la traza de APM. Esto le permite combinar la telemetría de DBM, incluido el plan de explicación y el rendimiento histórico de la consulta, junto con el linaje del span dentro de su infraestructura para comprender si un cambio en la base de datos es responsable del bajo rendimiento de la aplicación.

## Explore la conexión de DBM en APM {#explore-the-dbm-connection-in-apm}

### Visualice los servidores de base de datos descendentes de los servicios de APM {#visualize-the-downstream-database-hosts-of-apm-services}

En la página de APM para un servicio determinado, visualice las dependencias directas de base de datos descendentes del servicio identificadas por Database Monitoring y determine si algún servidor tiene una carga desproporcionada que pueda ser causada por vecinos ruidosos. Para visualizar las dependencias de base de datos de un servicio:
1. Seleccione el servicio en el [Catalog][26] para abrir un panel de detalles.
1. Seleccione {{< ui >}}Service Page{{< /ui >}} en el panel.
1. En la página del servicio, seleccione la sección {{< ui >}}Databases{{< /ui >}}.
1. Dentro de la sección Databases, seleccione la pestaña {{< ui >}}Databases{{< /ui >}}.

### Visualice las duraciones de los spans y vea los detalles de la consulta {#visualize-span-durations-and-view-query-details}

Seleccione la pestaña {{< ui >}}Queries{{< /ui >}} de la sección {{< ui >}}Databases{{< /ui >}} en la página del servicio de APM para ver los valores atípicos de latencia y una lista de consultas del intervalo de tiempo seleccionado. Seleccione una consulta en la tabla para ver el panel de consultas y acceder a diagnósticos, detalles de errores e información de la traza.

### Identifique posibles optimizaciones utilizando planes de explicación para consultas de base de datos en la traza {#identify-potential-optimizations-using-explain-plans-for-database-queries-in-traces}

{{< img src="database_monitoring/explain_plans_in_traces_update.png" alt="Identifique ineficiencias utilizando planes de explicación para consultas de base de datos dentro de la traza.">}}

Visualice el rendimiento histórico de consultas similares a las ejecutadas en su traza, incluidos los eventos de espera muestreados, la latencia promedio y los planes de explicación capturados recientemente, para contextualizar cómo se espera que funcione una consulta. Determine si el comportamiento es anormal y continúe la investigación dirigiéndose a [Database Monitoring][1] para obtener contexto adicional sobre los hosts de base de datos subyacentes.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/database_monitoring/#getting-started
[2]: /es/tracing/
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
[37]: /es/database_monitoring/query_samples/