---
aliases:
- /es/database_monitoring/guide/connect_dbm_and_apm/
further_reading:
- link: https://www.datadoghq.com/blog/link-dbm-and-apm/
  tag: Blog
  text: Correlaciona la telemetría de DBM y APM para entender el rendimiento de las
    consultas de extremo a extremo
title: Correlaciona DBM y las trazas
---
Esta guía asume que has configurado DBM [1] y estás utilizando APM [2]. Conectar APM y DBM inyecta identificadores de trazas de APM en la recolección de datos de DBM, lo que permite la correlación de estas dos fuentes de datos. Esto habilita características del producto que muestran información de la base de datos en el producto APM, y datos de APM en el producto DBM.

## Antes de comenzar {#before-you-begin}

Bases de datos soportadas
: Postgres, MySQL, SQL Server, Oracle, MongoDB

Versiones de Agente soportadas
: 7.46+

Privacidad de datos
: Habilitar la propagación de comentarios SQL resulta en datos potencialmente confidenciales (nombres de servicios) que se almacenan en las bases de datos y que pueden ser accedidos por otros terceros que han sido autorizados para acceder a la base de datos.


Las integraciones del SDK de Datadog soportan un *Modo de Propagación*, que controla la cantidad de información que se pasa de las aplicaciones a la base de datos.

| Modo de propagación | Descripción |
|:-----------------|:------------|
| `full` | Envía información completa de trazas a la base de datos, permitiéndote investigar trazas individuales dentro de DBM. Esta es la solución recomendada para la mayoría de las integraciones. |
| `service` | Envía el nombre del servicio, permitiéndote entender qué servicios contribuyen a la carga de la base de datos. |
| `disabled` | Desactiva la propagación y no envía ninguna información desde las aplicaciones. |


**Bases de datos soportadas**

{{< tabs >}}
{{% tab "Postgres" %}}

| Idioma | Versión mínima del rastreador | Biblioteca/Marco | Modo |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `full`<br>`service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) >= 2.35.0 | [Npgsql](https://www.nuget.org/packages/npgsql) | `full`<br>`service` |
| **Node.js** | [dd-trace-js](https://github.com/DataDog/dd-trace-js) >= 3.17.0 | [postgres](https://node-postgres.com/) | `full`<br>`service` |
| **PHP** | [dd-trace-php](https://github.com/DataDog/dd-trace-php) >= 0.86.0 | [pdo](https://www.php.net/manual/en/book.pdo.php) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 1.9.0 | [psycopg2](https://www.psycopg.org/docs/index.html)<br>[psycopg](https://www.psycopg.org/psycopg3/) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 2.9.0 | [asyncpg](https://pypi.org/project/asyncpg/) | `full`<br>`service` |
| **Ruby** | [dd-trace-rb](https://github.com/dataDog/dd-trace-rb) >= 1.8.0 | [pg](https://github.com/ged/ruby-pg) | `full`<br>`service` |

**Nota**: [CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set) no es compatible con el controlador .NET.

{{% /tab %}}

{{% tab "MySQL" %}}

| Idioma | Versión mínima del rastreador | Biblioteca/Marco | Modo |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `full`<br>`service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) >= 2.35.0 | [MySql.Data](https://www.nuget.org/packages/MySql.Data)<br>[MySqlConnector](https://www.nuget.org/packages/MySqlConnector) | `full`<br>`service` |
| **Node.js** | [dd-trace-js](https://github.com/DataDog/dd-trace-js) >= 3.17.0 | [mysql](https://github.com/mysqljs/mysql)<br>[mysql2](https://github.com/sidorares/node-mysql2) | `full`<br>`service` |
| **PHP** | [dd-trace-php](https://github.com/DataDog/dd-trace-php) >= 0.86.0 | [pdo](https://www.php.net/manual/en/book.pdo.php)<br>[MySQLi](https://www.php.net/manual/en/book.mysqli.php) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 2.9.0 | [aiomysql](https://pypi.org/project/aiomysql/)<br>[mysql-connector-python](https://pypi.org/project/mysql-connector-python/)<br>[mysqlclient](https://pypi.org/project/mysqlclient/)<br>[pymysql](https://github.com/PyMySQL/PyMySQL) | `full`<br>`service` |
| **Ruby** | [dd-trace-rb](https://github.com/dataDog/dd-trace-rb) >= 1.8.0 | [mysql2](https://github.com/brianmario/mysql2) | `full`<br>`service` |

**Nota**: [CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set) no es compatible con los controladores .NET.

**Nota**: El modo de propagación completa en Aurora MySQL requiere la versión 3.

{{% /tab %}}

{{% tab "SQL Server" %}}

| Idioma | Versión mínima del rastreador | Biblioteca/Marco | Modo |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) >= 2.35.0 | [System.Data.SqlClient](https://learn.microsoft.com/sql/connect/ado-net/microsoft-ado-net-sql-server)<br>[Microsoft.Data.SqlClient](https://learn.microsoft.com/sql/connect/ado-net/introduction-microsoft-data-sqlclient-namespace) | `full`<br>`service` |

**Nota**: [CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set) no es compatible con los controladores .NET.

Para `full` modo con Java y .NET:

<div class="alert alert-danger">Si su aplicación utiliza <code>context_info</code> para instrumentación, el SDK de Datadog lo sobrescribe.</div>

- La instrumentación ejecuta un `SET context_info` comando cuando el cliente emite una consulta, lo que provoca una ronda adicional de comunicación con la base de datos.
- Requisitos previos:
  - Versión del agente 7.55.0 o superior
  - Versión del rastreador de Java 1.39.0 o superior
  - Versión del rastreador de .NET 3.3 o superior

{{% /tab %}}

{{% tab "Oracle" %}}

| Idioma | Versión mínima del rastreador | Biblioteca/Marco | Modo |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |

Para `full` modo con Java:
- La instrumentación sobrescribe `V$SESSION.ACTION`.
- Requisito previo: rastreador de Java 1.45 o superior

{{% /tab %}}

{{% tab "MongoDB" %}}

| Idioma | Versión mínima del rastreador | Biblioteca/Marco | Modo |
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

Datadog recomienda establecer el modo de ofuscación en `obfuscate_and_normalize` para las versiones del Agente `7.63` y superiores. Agregue el siguiente parámetro en la sección `apm_config` de su archivo de configuración del Agente APM:

```yaml
  sql_obfuscation_mode: "obfuscate_and_normalize"
```

<div class="alert alert-warning">Cambiar el modo de ofuscación puede alterar el texto SQL normalizado. Si tiene monitores basados en texto SQL en los trazos de APM, es posible que necesite actualizarlos.</div>

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

- Usando código durante el registro del controlador:
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull), sqltrace.WithService("my-db-service"))
   ```

- Usando código en `sqltrace.Open`:
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

Siga las instrucciones de instrumentación de [Java tracing][1] e instale la versión `1.11.0` o superior del Agente.

También debe habilitar la instrumentación `jdbc-datasource` [instrumentation][2].

Habilite la función de propagación de DBM utilizando **una** de los siguientes métodos:

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

**Las versiones del Tracer 1.44 y superiores**:
Habilite la traza de declaraciones preparadas para Postgres usando **uno** de los siguientes métodos:
- Establece la propiedad del sistema `dd.dbm.trace_prepared_statements=true`
- Establece la variable de entorno `export DD_DBM_TRACE_PREPARED_STATEMENTS=true`

**Nota**: La instrumentación de declaraciones preparadas sobrescribe la propiedad `Application` con el texto `_DD_overwritten_by_tracer`, y causa un viaje adicional a la base de datos. Este viaje adicional tiene un impacto mínimo en el tiempo de ejecución de las declaraciones SQL.

<div class="alert alert-danger">Habilitar el rastreo de declaraciones preparadas puede causar un aumento del pinning de conexiones cuando se utiliza Amazon RDS Proxy, lo que reduce la eficiencia del agrupamiento de conexiones. Para más información, consulta <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-pinning.html">Pinning de conexiones en RDS Proxy</a>.</div>

**Las versiones del Tracer anteriores a 1.44**:
Las declaraciones preparadas no son compatibles en `full` modo para Postgres y MySQL, y todas las llamadas a la API JDBC que utilizan declaraciones preparadas se degradan automáticamente a `service` modo. Dado que la mayoría de las bibliotecas SQL de Java utilizan declaraciones preparadas por defecto, esto significa que **la mayoría** de las aplicaciones Java solo pueden usar `service` modo.

[1]: /es/tracing/trace_collection/dd_libraries/java/
[2]: /es/tracing/trace_collection/compatibility/java/#data-store-compatibility

{{% /tab %}}

{{% tab "Ruby" %}}

En tu Gemfile, instala o actualiza [dd-trace-rb][1] a la versión `1.8.0` o superior:

```rb
source 'https://rubygems.org'
gem 'datadog' # Use `'ddtrace', '>= 1.8.0'` if you're using v1.x

# Depends on your usage
gem 'mysql2'
gem 'pg'
```

Habilita la función de propagación de Database Monitoring utilizando uno de los siguientes métodos:
1. Variable de entorno:
   `DD_DBM_PROPAGATION_MODE=full`

2. Opción `comment_propagation` (predeterminado: `ENV['DD_DBM_PROPAGATION_MODE']`), para [mysql2][2] o [pg][3]:
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

Actualiza las dependencias de tu aplicación para incluir [dd-trace-py>=1.9.0][1]:

```
pip install "ddtrace>=1.9.0"
```

Para Postgres, instala [psycopg2][2]:

```
pip install psycopg2
```

Para MongoDB, instala pymongo:

```
pip install pymongo
```

**Nota**: El soporte para MongoDB requiere `dd-trace-py` >= 3.5.0. Si necesitas actualizar: `pip install "ddtrace>=3.5.0"`.

Habilita la función de propagación de Database Monitoring configurando la siguiente variable de entorno:
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
Esta función requiere que la instrumentación automática esté habilitada para tu servicio .NET.
</div>

Sigue las [instrucciones de trazado de .NET Framework][1] o las [instrucciones de trazado de .NET Core][2] para instalar el paquete de instrumentación automática y habilitar el trazado para tu servicio.

Asegúrate de que estás utilizando una biblioteca de cliente compatible. Por ejemplo, `Npgsql`.

Habilita la función de propagación de Database Monitoring configurando la siguiente variable de entorno:
   - Para Postgres y MySQL: `DD_DBM_PROPAGATION_MODE=full`
   - Para SQL Server: `DD_DBM_PROPAGATION_MODE=service` o `DD_DBM_PROPAGATION_MODE=full` con rastreadores de Java y .NET
   - Para Oracle: `DD_DBM_PROPAGATION_MODE=service`

[1]: /es/tracing/trace_collection/dd_libraries/dotnet-framework
[2]: /es/tracing/trace_collection/dd_libraries/dotnet-core

{{% /tab %}}

{{% tab "PHP" %}}

<div class="alert alert-danger">
Esta función requiere que la extensión tracer esté habilitada para tu servicio de PHP.
</div>

Siga las [instrucciones de traza de PHP][1] para instalar el paquete de instrumentación automática y habilitar la traza para su servicio.

Asegúrese de que está utilizando una biblioteca de cliente compatible. Por ejemplo, `PDO`.

Habilita la función de propagación de Database Monitoring configurando la siguiente variable de entorno:
   - `DD_DBM_PROPAGATION_MODE=full`

[1]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/php?tab=containers

{{% /tab %}}

{{% tab "Node.js" %}}

Instale o actualice [dd-trace-js][1] a una versión superior a `3.17.0` (o `2.30.0` si utiliza la versión 12 de Node.js que ha llegado al final de su vida útil):

```shell
npm install dd-trace@^3.17.0
```

Actualiza tu código para importar e inicializar el tracer:

```javascript
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

Habilita la función de propagación de Database Monitoring utilizando uno de los siguientes métodos:
* Establece la siguiente variable de entorno:
   ```
   DD_DBM_PROPAGATION_MODE=full
   ```

* Establece el SDK para usar la opción `dbmPropagationMode` (predeterminado: `ENV['DD_DBM_PROPAGATION_MODE']`):
   ```javascript
   const tracer = require('dd-trace').init({ dbmPropagationMode: 'full' })
   ```

* Habilita solo a nivel de integración:
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

Para deshabilitar la propagación después de habilitarla, establece `DD_DBM_PROPAGATION_MODE=disabled`.

## Verifica la integración {#verify-the-integration}

Para confirmar que la integración está funcionando:
1. Ejecuta tu aplicación instrumentada y realiza una consulta a la base de datos.
1. En Datadog, ve a [**Database Monitoring > Muestras de consulta**][37].
1. Confirma que la insignia de correlación **APM** aparece en la muestra de consulta.

## Explore la Conexión APM en DBM {#explore-the-apm-connection-in-dbm}

### Atribuya las conexiones de base de datos activas a los servicios APM que las llaman {#attribute-active-database-connections-to-the-calling-apm-services}

{{< img src="database_monitoring/dbm_apm_active_connections_breakdown.png" alt="Vea las conexiones activas a una base de datos desglosadas por el servicio APM del que provienen.">}}

Desglose las conexiones activas para un servidor dado por los servicios APM ascendentes que realizan las solicitudes. Puede atribuir la carga en una base de datos a servicios individuales para entender cuáles son los servicios más activos en la base de datos. Dirígete a la página del servicio más activo en la parte superior para continuar la investigación.

### Filtra tus hosts de base de datos por los servicios APM que los llaman {#filter-your-database-hosts-by-the-apm-services-that-call-them}

{{< img src="database_monitoring/dbm_filter_by_calling_service.png" alt="Filtra tus hosts de base de datos por los servicios APM que los llaman.">}}

Filtra la lista de bases de datos para mostrar solo los hosts de base de datos de los que dependen tus servicios APM específicos. Identifica si alguna de tus dependencias aguas abajo tiene actividad bloqueante que pueda afectar el rendimiento del servicio.

### Ve la traza asociada para una muestra de consulta {#view-the-associated-trace-for-a-query-sample}

{{< img src="database_monitoring/dbm_query_sample_trace_preview.png" alt="Previsualiza la traza de APM muestreada de la que proviene la muestra de consulta que se está inspeccionando.">}}

Al ver una [Muestra de Consulta][37] en Database Monitoring, si la traza asociada ha sido muestreada por APM, puedes ver la Muestra de DBM en el contexto de la traza de APM. Esto te permite combinar la telemetría de DBM, que incluye el plan de ejecución y el rendimiento histórico de la consulta, junto con el seguimiento del tramo dentro de tu infraestructura, para determinar si un cambio en la base de datos es responsable del bajo rendimiento de la aplicación.

## Explora la Conexión de DBM en APM {#explore-the-dbm-connection-in-apm}

### Visualiza los servidores de base de datos aguas abajo de los servicios APM {#visualize-the-downstream-database-hosts-of-apm-services}

En la página de APM para un servicio dado, visualiza las dependencias directas de base de datos aguas abajo del servicio según lo identificado por DBM, y determina si algún servidor tiene una carga desproporcionada que puede ser causada por vecinos ruidosos. Para ver las dependencias de base de datos de un servicio:
1. Selecciona el servicio en el [Catálogo de Software][26] para abrir un panel de detalles.
1. Selecciona {{< ui >}}Service Page{{< /ui >}} en el panel.
1. En la página del Servicio, selecciona la sección {{< ui >}}Databases{{< /ui >}}.
1. Dentro de la sección de Bases de Datos, selecciona la pestaña {{< ui >}}Databases{{< /ui >}}.

### Visualiza las duraciones de los tramos y ve los detalles de la consulta {#visualize-span-durations-and-view-query-details}

Selecciona la pestaña {{< ui >}}Queries{{< /ui >}} de la sección {{< ui >}}Databases{{< /ui >}} en la página del servicio APM para ver los valores anómalos de latencia y una lista completa de consultas del intervalo de tiempo seleccionado. Selecciona una consulta en la tabla para ver el panel de consulta y acceder a diagnósticos, detalles de errores e información de traza.

### Identifica optimizaciones potenciales utilizando planes de explicación para consultas de base de datos en traza {#identify-potential-optimizations-using-explain-plans-for-database-queries-in-traces}

{{< img src="database_monitoring/explain_plans_in_traces_update.png" alt="Identifica ineficiencias utilizando planes de explicación para consultas de base de datos en traza.">}}

Ve el rendimiento histórico de consultas similares a las ejecutadas en tu traza, incluyendo eventos de espera muestreados, latencia promedio y planes de explicación capturados recientemente, para contextualizar cómo se espera que rinda una consulta. Determina si el comportamiento es anormal y continúa la investigación pivotando hacia [DBM][1] para obtener contexto adicional sobre los servidores de base de datos subyacentes.

## Lectura adicional {#further-reading}

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