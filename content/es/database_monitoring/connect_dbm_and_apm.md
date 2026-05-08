---
aliases:
- /es/database_monitoring/guide/connect_dbm_and_apm/
further_reading:
- link: https://www.datadoghq.com/blog/link-dbm-and-apm/
  tag: Blog
  text: Correlacionar sin problemas los datos de telemetría de DBM y APM para comprender
    el rendimiento de las consultas integrales
title: Correlacionar Database Monitoring y trazas (traces)
---

En esta guía se considera que has configurado [Database Monitoring][1] y usas [APM][2]. La conexión de APM y DBM inyecta identificadores de trazas de APM en la recopilación de datos de DBM, lo que permite la correlación de estas dos fuentes de datos. Esto permite que las funciones del producto muestren información sobre la base de datos en el producto de APM, y datos de APM en el producto de DBM.

## Antes de empezar

Bases de datos compatibles
: Postgres, MySQL, SQL Server, Oracle, MongoDB

Versiones compatibles del Agent 
: 7.46 o posterior

Privacidad de los datos
: Al habilitar la propagación de comentarios de SQL, se almacenan datos potencialmente confidenciales (nombres de servicios) en las bases de datos, a los que luego pueden acceder terceros a los que se les ha otorgado acceso a la base de datos.


Las integraciones del rastreador de APM admiten un *Modo de propagación*, que controla la cantidad de información que pasa de las aplicaciones a la base de datos.

- El modo `full` envía información completa sobre la traza a la base de datos, lo que te permite investigar trazas individuales en DBM. Esta es la solución recomendada para la mayoría de las integraciones.
- `service` envía el nombre del servicio, lo que permite saber qué servicios contribuyen a la carga de la base de datos.
- El modo `disabled` deshabilita la propagación y no envía información desde las aplicaciones.

| DD_DBM_PROPAGATION_MODE | Postgres  |   MySQL     | SQL Server |    Oracle    |  MongoDB   |
|:------------------------|:---------:|:-----------:|:----------:|:------------:|:----------:|
| `full`                  | {{< X >}} | {{< X >}} * | {{< X >}}  | {{< X >}} ** | {{< X >}}  |
| `service`               | {{< X >}} | {{< X >}}   | {{< X >}}  | {{< X >}}    | {{< X >}}  |

\* El modo de propagación completa en Aurora MySQL requiere la versión 3.

\*\* El modo de propagación completa en Oracle solo es compatible con Java.


**Rastreadores y controladores de aplicaciones compatibles**

| Lenguaje                                 | Biblioteca o marco   | Postgres  |   MySQL   |     SQL Server      |       Oracle        |       MongoDB        |
|:-----------------------------------------|:-----------------------|:---------:|:---------:|:-------------------:|:-------------------:|:--------------------:|
| **Go:** [dd-trace-go][3] >= 1.44.0       |                        |           |           |                     |                     |                      |
|                                          | [base de datos/sql][4]      | {{< X >}} | {{< X >}} | solo el modo `service` | solo el modo `service` |                      |
|                                          | [sqlx][5]              | {{< X >}} | {{< X >}} | solo el modo `service` | solo el modo `service` |                      |
| **Java** [dd-trace-java][23] >= 1.11.0   |                        |           |           |                     |                     |                      |
|                                          | [jdbc][22]             | {{< X >}} | {{< X >}} | {{< X >}} **        | {{< X >}} ***       |                      |
| **Ruby:** [dd-trace-rb][6] >= 1.8.0      |                        |           |           |                     |                     |                      |
|                                          | [pg][8]                | {{< X >}} |           |                     |                     |                      |
|                                          | [mysql2][7]            |           | {{< X >}} |                     |                     |                      |
| **Python:** [dd-trace-py][11] >= 1.9.0   |                        |           |           |                     |                     |                      |
|                                          | [psycopg2][12]         | {{< X >}} |           |                     |                     |                      |
|                                          | [psycopg][34]          | {{< X >}} |           |                     |                     |                      |
|             [dd-trace-py][11] >= 2.9.0   |                        |           |           |                     |                     |                      |
|                                          | [asyncpg][27]          | {{< X >}} |           |                     |                     |                      |
|                                          | [aiomysql][28]         |           | {{< X >}} |                     |                     |                      |
|                                          | [mysql-connector-python][29] |     | {{< X >}} |                     |                     |                      |
|                                          | [mysqlclient][30]      |           | {{< X >}} |                     |                     |                      |
|                                          | [pymysql][31]          |           | {{< X >}} |                     |                     |                      |
|                                          | [pymongo][35]          |           |           |                     |                     | {{< X >}} *****      |
| **.NET** [dd-trace-dotnet][15] >= 2.35.0 |                        |           |           |                     |                     |                      |
|                                          | [Npgsql][16] *         | {{< X >}} |           |                     |                     |                      |
|                                          | [MySql.Data][17] *     |           | {{< X >}} |                     |                     |                      |
|                                          | [MySqlConnector][18] * |           | {{< X >}} |                     |                     |                      |
|                                          | [System.Data.SqlClient][24] * |    |           | {{< X >}} **        |                     |                      |
|                                          | [Microsoft.Data.SqlClient][32] * | |           | {{< X >}} **        |                     |                      |
| **PHP**  [dd-trace-php][19] >= 0.86.0    |                        |           |           |                     |                     |                      |
|                                          | [pdo][20]              | {{< X >}} | {{< X >}} |                     |                     |                      |
|                                          | [MySQLi][21]           |           | {{< X >}} |                     |                     |                      |
| **Node.js:** [dd-trace-js][9] >= 3.17.0  |                        |           |           |                     |                     |                      |
|                                          | [postgres][10]         | {{< X >}} |           |                     |                     |                      |
|                                          | [mysql][13]            |           | {{< X >}} |                     |                     |                      |
|                                          | [mysql2][14]           |           | {{< X >}} |                     |                     |                      |
|                                          | [mongodb][33]          |           |           |                     |                     | {{< X >}} ****       |

\* [CommandType.StoredProcedure][25] no compatible

\*\* Modo completo de SQL Server para Java/.NET:

<div class="alert alert-danger">Si tu aplicación utiliza <code>context_info</code> para la instrumentación, el rastreador de APM lo sobrescribe.</div>

  - La instrumentación ejecuta un comando `SET context_info` cuando el cliente emite una consulta, lo que realiza un recorrido completo adicional a la base de datos.
  - Requisitos previos:
    - Versión 7.55.0 o posterior del Agent
    - Versión 1.39.0 o posterior del rastreador de Java
    - Versión del rastreador .NET 3.3 o posterior

\*\*\* Oracle modo completo para Java:
  - La instrumentación sobrescribe `V$SESSION.ACTION`.
  - Requisito previo: rastreador de Java 1.45 o posterior

\*\*\*\* Servicio/Modo completo MongoDB para Node.js:
  - Requisito previo:
    - Rastreador Node.js v5.37.0 o posterior

\*\*\*\*\* Servicio/Modo completo MongoDB para Python:
  - Requisito previo:
    - Rastreador Python v3.5.0 o posterior

## Configuración
Para obtener la mejor experiencia de usuario, asegúrate de que las siguientes variables de entorno se hayan configurado en tu aplicación:

```
DD_SERVICE=(application name)
DD_ENV=(application environment)
DD_VERSION=(application version)
```

Datadog recomienda establecer el modo de enmascaramiento en `obfuscate_and_normalize` para las versiones del Agent `7.63` y posteriores. Añade el siguiente parámetro en la sección `apm_config` de tu archivo de configuración del Agent de APM:

```
  sql_obfuscation_mode: "obfuscate_and_normalize"
```

<div class="alert alert-warning">Cambiar el modo de enmascaramiento puede alterar el texto SQL normalizado. Si tienes monitores basados en texto SQL en trazas de APM, puede que necesites actualizarlos.</div>

{{< tabs >}}
{{% tab "Go" %}}

Actualiza las dependencias de tu aplicación para incluir [dd-trace-go@v1.44.0][1] o posterior. {{% tracing-go-v2 %}}
```shell
go get github.com/DataDog/dd-trace-go/v2 # 2.x
```

Actualiza tu código para importar el paquete `contrib/database/sql`:
```go
import (
   "database/sql"
   "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
   sqltrace "github.com/DataDog/dd-trace-go/contrib/database/sql/v2"
)
```

Habilita la función de propagación de la monitorización de base de datos mediante uno de los siguientes métodos:
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

[1]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1

{{% /tab %}}

{{% tab "Java" %}}

Sigue las instrucciones de instrumentación del [rastreo de Java][1] e instala la versión `1.11.0`, o una posterior, del Agent.

También debes habilitar la [instrumentación][2] `jdbc-datasource`.

Habilita la función de propagación de la monitorización de base de datos mediante **uno** de los siguientes métodos:

- Establecer la propiedad del sistema `dd.dbm.propagation.mode=full`
- Establecer la variable de entorno `DD_DBM_PROPAGATION_MODE=full`

Ejemplo completo:
```
# Start the Java Agent with the required system properties
java -javaagent:/path/to/dd-java-agent.jar -Ddd.dbm.propagation.mode=full -Ddd.integration.jdbc-datasource.enabled=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
```

Realiza un test de la función en tu aplicación:
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

**Versiones 1.44 y posteriores**:
Habilita el rastreo de sentencias preparadas para Postgres mediante **uno** de los siguientes métodos:
- Establece la propiedad del sistema `dd.dbm.trace_prepared_statements=true`
- Establece la variable de entorno `export DD_DBM_TRACE_PREPARED_STATEMENTS=true`

**Nota**: La instrumentación de sentencias preparadas sobrescribe la propiedad `Application` con el texto `_DD_overwritten_by_tracer`, y provocan un viaje de ida y vuelta adicional a la base de datos. Este viaje de ida y vuelta adicional normalmente tiene un impacto insignificante en el tiempo de ejecución de la sentencia SQL.

<div class="alert alert-danger">La activación del rastreo de sentencias preparadas puede provocar un aumento de la asignación de pines de conexión al utilizar Amazon RDS Proxy, lo que reduce la eficacia de la agrupación de conexión. Para obtener más información, consulta <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-pinning.html">asignación de pines de conexión en RDS Proxy</a>.</div>

**Versiones del rastreador inferiores a 1.44**:
Las sentencias preparadas no son compatibles con el modo `full` para Postgres y MySQL, y todas las llamadas a la API de JDBC que utilizan sentencias preparadas se degradan automáticamente al modo `service`. Dado que la mayoría de las bibliotecas SQL de Java utilizan sentencias preparadas por defecto, esto significa que **la mayoría** de las aplicaciones Java solo pueden utilizar el modo `service`.

[1]: /es/tracing/trace_collection/dd_libraries/java/
[2]: /es/tracing/trace_collection/compatibility/java/#data-store-compatibility

{{% /tab %}}

{{% tab "Ruby" %}}

En tu archivo GEM, instala o actualiza [dd-trace-rb][1] a la versión `1.8.0` o una posterior:

```rb
source 'https://rubygems.org'
gem 'datadog' # Use `'ddtrace', '>= 1.8.0'` if you're using v1.x

# Depends on your usage
gem 'mysql2'
gem 'pg'
```

Habilita la función de propagación de la monitorización de base de datos mediante uno de los siguientes métodos:
1. Variable de entorno:
   `DD_DBM_PROPAGATION_MODE=full`

2. La opción `comment_propagation` (de manera predeterminada: `ENV['DD_DBM_PROPAGATION_MODE']`), para [mysql2][2] o [pg][3]:
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

Para MongoDB (requiere dd-trace-py>=3.5.0), instala pymongo:
```
pip install pymongo
```

Habilita la función de propagación de la monitorización de base de datos al establecer la siguiente variable de entorno:
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
Esta función requiere que la instrumentación automática esté activada para tu servicio .NET.
</div>

Sigue las [instrucciones de rastreo de .NET Framework][1] o las [instrucciones de rastreo de .NET Core][2] a fin de instalar el paquete de instrumentación automática y habilitar el rastreo para tu servicio.

Asegúrate de usar una biblioteca de cliente compatible. Por ejemplo, `Npgsql`.

Habilita la función de propagación de la monitorización de base de datos al establecer la siguiente variable de entorno:
   - Para Postgres y MySQL: `DD_DBM_PROPAGATION_MODE=full`
   - Para SQL Server: `DD_DBM_PROPAGATION_MODE=service` o `DD_DBM_PROPAGATION_MODE=full` con Java y rastreadores .NET
   - Para Oracle: `DD_DBM_PROPAGATION_MODE=service`

[1]: /es/tracing/trace_collection/dd_libraries/dotnet-framework
[2]: /es/tracing/trace_collection/dd_libraries/dotnet-core

{{% /tab %}}

{{% tab "PHP" %}}

<div class="alert alert-danger">
Esta función requiere que la extensión de rastreo esté habilitada para tu servicio PHP.
</div>

Sigue las [instrucciones de rastreo de PHP][1] a fin de instalar el paquete de instrumentación automática y habilitar el rastreo para tu servicio.

Asegúrate de usar una biblioteca de cliente compatible. Por ejemplo, `PDO`.

Habilita la función de propagación de la monitorización de base de datos al establecer la siguiente variable de entorno:
   - `DD_DBM_PROPAGATION_MODE=full`

[1]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/php?tab=containers

{{% /tab %}}

{{% tab "Node.js" %}}

Instala o actualiza [dd-trace-js][1] a una versión posterior a la `3.17.0` (o `2.30.0` si usas la versión 12 de Node.js que está al final de su vida útil):

```
npm install dd-trace@^3.17.0
```

Actualiza tu código para importar e inicializar el rastreador:
```javascript
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

Habilita la función de propagación de la monitorización de base de datos mediante uno de los siguientes métodos:
* Establece la siguiente variable de entorno:
   ```
   DD_DBM_PROPAGATION_MODE=full
   ```

* Establece el rastreador para que use la opción `dbmPropagationMode` (de manera predeterminada: `ENV['DD_DBM_PROPAGATION_MODE']`):
   ```javascript
   const tracer = require('dd-trace').init({ dbmPropagationMode: 'full' })
   ```

* Solo habilítalo en el nivel de integración:
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

## Explorar la conexión de APM en DBM

### Atribuir las conexiones de base de datos activas a los servicios de APM que realizan llamadas

{{< img src="database_monitoring/dbm_apm_active_connections_breakdown.png" alt="Visualiza las conexiones activas a una base de datos desglosadas por el servicio de APM del que se originan.">}}

Desglosa las conexiones activas de un host determinado por los servicios de APM ascendentes que realizan las solicitudes. Puedes atribuir la carga de una base de datos a servicios individuales para comprender qué servicios son los más activos en la base de datos. Dirígete a la página de servicios del servicio ascendente más activo para continuar la investigación.

### Filtrar los hosts de bases de datos por los servicios de APM que los llaman

{{< img src="database_monitoring/dbm_filter_by_calling_service.png" alt="Filtra tus host de base de datos por los servicios de APM que los llaman.">}}

Filtra con rapidez la lista de bases de datos para solo visualizar los hosts de bases de datos de los que dependen tus servicios de APM específicos. Identifica de manera sencilla si alguna de tus dependencias descendentes tiene actividad de bloqueo que pueda afectar el rendimiento del servicio.

### Ver la traza asociada a una muestra de consulta

{{< img src="database_monitoring/dbm_query_sample_trace_preview.png" alt="Obtén una vista previa de la traza de APM muestreada a partir del cual se generó la muestra de consulta que se está inspeccionando.">}}

Al visualizar una muestra de consulta en Database Monitoring, si APM ha realizado un muestreo de la traza asociada, puedes ver la muestra de DBM en el contexto de la traza de APM. Esto te permite combinar la telemetría de DBM, incluido el plan de explicación y el rendimiento histórico de la consulta, junto con el linaje del tramo dentro de tu infraestructura para comprender si un cambio en la base de datos es responsable del bajo rendimiento de la aplicación.

## Explorar la conexión de DBM en APM

### Visualizar los hosts de bases de datos descendentes de los servicios de APM

{{< img src="database_monitoring/dbm_apm_service_page_db_host_list.png" alt="Visualiza los hosts de bases de datos descendentes de los que dependen tus servicios de APM desde la Página de servicios.">}}

En la página de APM de un servicio determinado, visualiza las dependencias de bases de datos descendentes directas del servicio identificadas por Database Monitoring. Determina con rapidez si algún host tiene una carga desproporcionada que puede ser causada por hosts vecinos ruidosos. Para ver la página de un servicio, haz clic en el servicio en el [Catálogo de servicios][26] a fin de abrir un panel de detalles y, a continuación, haz clic en **View Service Page** (Ver página de servicios) en el panel.

### Identificar posibles optimizaciones mediante planes de explicación para consultas de bases de datos en trazas

{{< img src="database_monitoring/explain_plans_in_traces_update.png" alt="Identifica ineficiencias mediante planes de explicación para consultas de bases de datos en trazas.">}}

Visualiza el rendimiento histórico de consultas similares a las que se ejecutan en tu traza, incluidos los eventos de espera muestreados, la latencia promedio y los planes de explicación capturados recientemente, para contextualizar cómo se espera que funcione una consulta. Determina si el comportamiento es anormal y continúa la investigación al pasar a Database Monitoring para obtener contexto adicional sobre los hosts de bases de datos subyacentes.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/database_monitoring/#getting-started
[2]: /es/tracing/
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
[24]: https://learn.microsoft.com/sql/connect/ado-net/microsoft-ado-net-sql-server
[25]: https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[...]%20should%20set
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