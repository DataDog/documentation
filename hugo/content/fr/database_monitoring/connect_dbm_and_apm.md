---
aliases:
- /fr/database_monitoring/guide/connect_dbm_and_apm/
further_reading:
- link: https://www.datadoghq.com/blog/link-dbm-and-apm/
  tag: Blog
  text: Corrélez la télémétrie DBM et APM pour comprendre les performances des requêtes
    de bout en bout
title: Associer la fonctionnalité Database Monitoring aux traces
---
Ce guide suppose que vous avez configuré [Database Monitoring][1] et que vous utilisez [APM][2]. La connexion entre APM et DBM injecte des identifiants de trace APM dans la collecte de données DBM, ce qui permet la corrélation de ces deux sources de données. Cela active des fonctionnalités produit affichant des informations de base de données dans le produit APM, et des données APM dans le produit DBM.

## Avant de commencer {#before-you-begin}

Bases de données prises en charge
: Postgres, MySQL, SQL Server, Oracle, MongoDB

Versions de l'Agent prises en charge
: 7.46+

Confidentialité des données
: L'activation de la propagation des commentaires SQL entraîne le stockage de données potentiellement confidentielles (noms de service) dans les bases de données, qui peuvent ensuite être consultées par d'autres tiers ayant obtenu un accès à la base de données.


Les intégrations SDK Datadog prennent en charge un *Mode de propagation*, qui contrôle la quantité d'informations transmises des applications à la base de données.

| Mode de propagation | Description |
|:-----------------|:------------|
| `full` | Envoie des informations de trace complètes à la base de données, vous permettant d'examiner des traces individuelles au sein de DBM. Il s'agit de la solution recommandée pour la plupart des intégrations. |
| `service` | Envoie le nom du service, vous permettant de comprendre quels services contribuent à la charge de la base de données. |
| `disabled` | Désactive la propagation et n'envoie aucune information depuis les applications. |


**Bases de données prises en charge**

{{< tabs >}}
{{% tab "Postgres" %}}

| Langage | Version minimale du traceur | Bibliothèque/Framework | Mode |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `full`<br>`service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) >= 2.35.0 | [Npgsql](https://www.nuget.org/packages/npgsql) | `full`<br>`service` |
| **Node.js** | [dd-trace-js](https://github.com/DataDog/dd-trace-js) >= 3.17.0 | [postgres](https://node-postgres.com/) | `full`<br>`service` |
| **PHP** | [dd-trace-php](https://github.com/DataDog/dd-trace-php) >= 0.86.0 | [pdo](https://www.php.net/manual/en/book.pdo.php) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 1.9.0 | [psycopg2](https://www.psycopg.org/docs/index.html)<br>[psycopg](https://www.psycopg.org/psycopg3/) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 2.9.0 | [asyncpg](https://pypi.org/project/asyncpg/) | `full`<br>`service` |
| **Ruby** | [dd-trace-rb](https://github.com/dataDog/dd-trace-rb) >= 1.8.0 | [pg](https://github.com/ged/ruby-pg) | `full`<br>`service` |

**Remarque** : [CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set) n'est pas pris en charge par le pilote .NET.

{{% /tab %}}

{{% tab "MySQL" %}}

| Langage | Version minimale du traceur | Bibliothèque/Framework | Mode |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `full`<br>`service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) >= 2.35.0 | [MySql.Data](https://www.nuget.org/packages/MySql.Data)<br>[MySqlConnector](https://www.nuget.org/packages/MySqlConnector) | `full`<br>`service` |
| **Node.js** | [dd-trace-js](https://github.com/DataDog/dd-trace-js) >= 3.17.0 | [mysql](https://github.com/mysqljs/mysql)<br>[mysql2](https://github.com/sidorares/node-mysql2) | `full`<br>`service` |
| **PHP** | [dd-trace-php](https://github.com/DataDog/dd-trace-php) >= 0.86.0 | [pdo](https://www.php.net/manual/en/book.pdo.php)<br>[MySQLi](https://www.php.net/manual/en/book.mysqli.php) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 2.9.0 | [aiomysql](https://pypi.org/project/aiomysql/)<br>[mysql-connector-python](https://pypi.org/project/mysql-connector-python/)<br>[mysqlclient](https://pypi.org/project/mysqlclient/)<br>[pymysql](https://github.com/PyMySQL/PyMySQL) | `full`<br>`service` |
| **Ruby** | [dd-trace-rb](https://github.com/dataDog/dd-trace-rb) >= 1.8.0 | [mysql2](https://github.com/brianmario/mysql2) | `full`<br>`service` |

**Remarque** : [CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set) n'est pas pris en charge pour les pilotes .NET.

**Remarque** : Le mode de propagation complète sur Aurora MySQL nécessite la version 3.

{{% /tab %}}

{{% tab "SQL Server" %}}

| Langage | Version minimale du traceur | Bibliothèque/Framework | Mode |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service` |
| **.NET** | [dd-trace-dotnet](https://github.com/DataDog/dd-trace-dotnet) >= 2.35.0 | [System.Data.SqlClient](https://learn.microsoft.com/sql/connect/ado-net/microsoft-ado-net-sql-server)<br>[Microsoft.Data.SqlClient](https://learn.microsoft.com/sql/connect/ado-net/introduction-microsoft-data-sqlclient-namespace) | `full`<br>`service` |

**Remarque** : [CommandType.StoredProcedure](https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlcommand.commandtype?view=dotnet-plat-ext-7.0#remarks:~:text=[…]%20should%20set) n'est pas pris en charge pour les pilotes .NET.

Pour le mode `full` avec Java et .NET :

<div class="alert alert-danger">Si votre application utilise <code>context_info</code> pour l'instrumentation, le SDK Datadog l'écrase.</div>

- L'instrumentation exécute une commande `SET context_info` lorsque le client émet une requête, ce qui entraîne un aller-retour supplémentaire vers la base de données.
- Prérequis :
  - Version 7.55.0 ou ultérieure de l'Agent
  - Java tracer version 1.39.0 ou supérieur
  - .NET tracer version 3.3 ou supérieure

{{% /tab %}}

{{% tab "Oracle" %}}

| Langage | Version minimale du traceur | Bibliothèque/Framework | Mode |
|:---------|:-------------------|:------------------|:-----|
| **Go** | [dd-trace-go v2](https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2) | [database/sql](https://pkg.go.dev/database/sql)<br>[sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx) | `service` |
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.11.0 | [jdbc](https://docs.oracle.com/javase/8/docs/technotes/guides/jdbc/) | `full`<br>`service`<br>`dynamic_service` |

Pour le mode `full` avec Java :
- L'instrumentation écrase `V$SESSION.ACTION`.
- Prérequis : Java tracer 1.45 ou supérieur

Pour le mode `dynamic_service` avec Java, vous pouvez propager les informations de service sans modifier le texte de l'instruction SQL. Utilisez cette option si vous dépendez de fonctionnalités qui correspondent au texte SQL exact, telles que les lignes de base SQL Plan Management.
- Définissez `DD_DBM_PROPAGATION_MODE=dynamic_service` et `DD_DBM_PROPAGATION_ORACLE_ACTION_ONLY_ENABLED=true`.
- L'instrumentation écrit le hash de service dans `V$SESSION.ACTION` au lieu d'injecter des commentaires SQL. Ceci écrase toute valeur `V$SESSION.ACTION` existante.
- `V$SESSION.ACTION` est défini une fois par connexion et n'est mis à jour que si le hash de service change.
- Prérequis : Java tracer 1.67.0 ou supérieur

{{% /tab %}}

{{% tab "MongoDB" %}}

| Langage | Version minimale du traceur | Bibliothèque/Framework | Mode |
|:---------|:-------------------|:------------------|:-----|
| **Java** | [dd-trace-java](https://github.com/DataDog/dd-trace-java) >= 1.58.0 | [mongo-java-driver](https://www.mongodb.com/docs/drivers/java/sync/current/) v3.8+ | `full`<br>`service` |
| **Node.js** | [dd-trace-js](https://github.com/DataDog/dd-trace-js) >= 5.80.0 | [mongodb](https://github.com/mongodb/node-mongodb-native) | `full`<br>`service` |
| **Python** | [dd-trace-py](https://github.com/DataDog/dd-trace-py) >= 3.5.0 | [pymongo](https://pymongo.readthedocs.io/en/stable/) | `full`<br>`service` |

{{% /tab %}}

{{< /tabs >}}

## Configuration {#setup}
Définissez les variables d'environnement suivantes dans votre application :

```shell
DD_SERVICE=(application name)
DD_ENV=(application environment)
DD_VERSION=(application version)
```

Ces tags identifient votre service dans les vues de corrélation APM et dans la répartition des connexions actives DBM.

Datadog recommande de définir le mode d'obfuscation sur `obfuscate_and_normalize` pour les versions `7.63` et supérieures de l'Agent. Ajoutez le paramètre suivant dans la section `apm_config` de votre fichier de configuration de l'Agent APM :

```yaml
  sql_obfuscation_mode: "obfuscate_and_normalize"
```

<div class="alert alert-warning">La modification du mode d'obfuscation peut altérer le texte SQL normalisé. Si vous avez des monitors basés sur du texte SQL dans des traces APM, vous devrez peut-être les mettre à jour.</div>

{{< tabs >}}
{{% tab "Go" %}}

Mettez à jour les dépendances de votre application pour inclure [dd-trace-go v2][1]. {{% tracing-go-v2 %}}

```shell
go get github.com/DataDog/dd-trace-go/v2 # 2.x
```

Mettez à jour votre code pour importer le package `contrib/database/sql` :

```go
import (
   "database/sql"
   "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
   sqltrace "github.com/DataDog/dd-trace-go/contrib/database/sql/v2"
)
```

Activez la fonctionnalité de propagation de Database Monitoring via l'une des méthodes suivantes :
- Variable d'environnement :
   `DD_DBM_PROPAGATION_MODE=full`

- Utilisation du code lors de l'enregistrement du pilote :
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull), sqltrace.WithService("my-db-service"))
   ```

- Utilisation du code sur `sqltrace.Open` :
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithService("my-db-service"))

   db, err := sqltrace.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable", sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull))
   if err != nil {
	   log.Fatal(err)
   }
   ```

Exemple complet :

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

Suivez les instructions d'instrumentation du [Java tracing][1] et installez la version `1.11.0`, ou supérieure, de l'Agent.

Vous devez également activer l'`jdbc-datasource` [instrumentation][2].

Activez la fonctionnalité de propagation de la surveillance de base de données en utilisant **l'une** des méthodes suivantes :

- Définissez la propriété système `dd.dbm.propagation.mode=full`
- Définissez la variable d'environnement `DD_DBM_PROPAGATION_MODE=full`

Exemple complet :

```shell
# Start the Java Agent with the required system properties
java -javaagent:/path/to/dd-java-agent.jar -Ddd.dbm.propagation.mode=full -Ddd.integration.jdbc-datasource.enabled=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
```

Testez la fonctionnalité dans votre application :

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

**Oracle sans commentaires SQL (versions du traceur 1.67.0 et supérieures)** :
Pour propager les informations de service vers Oracle sans modifier le texte de l'instruction SQL, définissez **les deux** éléments suivants :
- `DD_DBM_PROPAGATION_MODE=dynamic_service` (ou la propriété système `dd.dbm.propagation.mode=dynamic_service`)
- `DD_DBM_PROPAGATION_ORACLE_ACTION_ONLY_ENABLED=true` (ou la propriété système `dd.dbm.propagation.oracle.action-only.enabled=true`)

Avec cette configuration, le traceur écrit le hash du service dans `V$SESSION.ACTION` au lieu d'injecter des commentaires SQL dans les instructions Oracle, y compris les instructions préparées. Les connexions aux autres bases de données continuent de recevoir des commentaires SQL.

**Versions du traceur 1.44 et supérieures**:
Activez le traçage des instructions préparées pour Postgres en utilisant **l'une** des méthodes suivantes:
- Définissez la propriété système `dd.dbm.trace_prepared_statements=true`
- Définissez la variable d'environnement `export DD_DBM_TRACE_PREPARED_STATEMENTS=true`

**Remarque**: L'instrumentation des instructions préparées écrase la propriété `Application` avec le texte `_DD_overwritten_by_tracer`, et provoque un aller-retour supplémentaire vers la base de données. Cet aller-retour supplémentaire a un impact minimal sur le temps d'exécution des instructions SQL.

<div class="alert alert-danger">L'activation du traçage des instructions préparées peut entraîner une augmentation du verrouillage de connexion lors de l'utilisation d'Amazon RDS Proxy, ce qui réduit l'efficacité du regroupement de connexions. Pour plus d'informations, consultez <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-pinning.html">Épinglage de connexion sur un proxy RDS</a>.</div>

**Versions du traceur inférieures à 1.44**:
Les instructions préparées ne sont pas prises en charge en mode `full` pour Postgres et MySQL, et tous les appels d'API JDBC qui utilisent des instructions préparées sont automatiquement rétrogradés en mode `service`. Comme la plupart des bibliothèques SQL Java utilisent des instructions préparées par défaut, cela signifie que **la plupart** des applications Java ne peuvent utiliser que le mode `service`.

[1]: /fr/tracing/trace_collection/dd_libraries/java/
[2]: /fr/tracing/trace_collection/compatibility/java/#data-store-compatibility

{{% /tab %}}

{{% tab "Ruby" %}}

Dans votre Gemfile, installez ou mettez à jour [dd-trace-rb][1] vers la version `1.8.0` ou supérieure:

```rb
source 'https://rubygems.org'
gem 'datadog' # Use `'ddtrace', '>= 1.8.0'` if you're using v1.x

# Depends on your usage
gem 'mysql2'
gem 'pg'
```

Activez la fonctionnalité de propagation de Database Monitoring via l'une des méthodes suivantes :
1. Variable d'environnement :
   `DD_DBM_PROPAGATION_MODE=full`

2. Option `comment_propagation` (par défaut : `ENV['DD_DBM_PROPAGATION_MODE']`), pour [mysql2][2] ou [pg][3]:
   ```rb
	Datadog.configure do |c|
		c.tracing.instrument :mysql2, comment_propagation: 'full'
		c.tracing.instrument :pg, comment_propagation: 'full'
	end
   ```

Exemple complet :

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
[2]: /fr/tracing/trace_collection/dd_libraries/ruby/#mysql2
[3]: /fr/tracing/trace_collection/dd_libraries/ruby/#postgres

{{% /tab %}}

{{% tab "Python" %}}

Mettez à jour les dépendances de vos applications afin d'inclure [dd-trace-py>=1.9.0][1] :

```
pip install "ddtrace>=1.9.0"
```

Pour Postgres, installez [psycopg2][2] :

```
pip install psycopg2
```

Pour MongoDB, installez pymongo :

```
pip install pymongo
```

**Remarque**: La prise en charge de MongoDB nécessite `dd-trace-py` >= 3.5.0. Si vous devez effectuer une mise à niveau : `pip install "ddtrace>=3.5.0"`.

Activez la fonctionnalité de propagation de Database Monitoring en définissant la variables d'environnement suivante :
   - `DD_DBM_PROPAGATION_MODE=full`

Exemple Postgres :

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

Exemple MongoDB :

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
Cette fonctionnalité nécessite que l'instrumentation automatique soit activée pour votre service .NET.
</div>

Suivez les [instructions de tracing .NET Framework][1] ou les [instructions de tracing .NET Core][2] pour installer le package de l'instrumentation automatique et activer le tracing pour votre service.

Assurez-vous d'utiliser une bibliothèque cliente prise en charge. Par exemple, `Npgsql`.

Activez la fonctionnalité de propagation de Database Monitoring en définissant la variables d'environnement suivante :
   - Pour Postgres et MySQL : `DD_DBM_PROPAGATION_MODE=full`
   - Pour SQL Server : `DD_DBM_PROPAGATION_MODE=service` ou `DD_DBM_PROPAGATION_MODE=full` avec les traceurs Java et .NET
   - Pour Oracle : `DD_DBM_PROPAGATION_MODE=service`

[1]: /fr/tracing/trace_collection/dd_libraries/dotnet-framework
[2]: /fr/tracing/trace_collection/dd_libraries/dotnet-core

{{% /tab %}}

{{% tab "PHP" %}}

<div class="alert alert-danger">
Cette fonctionnalité nécessite que l'extension de traceur soit activée pour votre service PHP.
</div>

Suivez les [instructions de tracing PHP][1] pour installer le package de l'instrumentation automatique et activer le tracing pour votre service.

Assurez-vous d'utiliser une bibliothèque cliente prise en charge. Par exemple, `PDO`.

Activez la fonctionnalité de propagation de Database Monitoring en définissant la variables d'environnement suivante :
   - `DD_DBM_PROPAGATION_MODE=full`

[1]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/php?tab=containers

{{% /tab %}}

{{% tab "Node.js" %}}

Installez ou mettez à jour [dd-trace-js][1] vers une version supérieure à `3.17.0` (ou `2.30.0` si vous utilisez une version 12 de Node.js en fin de vie):

```shell
npm install dd-trace@^3.17.0
```

Mettez à jour votre code pour importer et initialiser le traceur :

```javascript
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

Activez la fonctionnalité de propagation de Database Monitoring via l'une des méthodes suivantes :
* Définissez la variable d'environnement suivante:
   ```
   DD_DBM_PROPAGATION_MODE=full
   ```

* Configurez le SDK pour utiliser l'option `dbmPropagationMode` (par défaut : `ENV['DD_DBM_PROPAGATION_MODE']`):
   ```javascript
   const tracer = require('dd-trace').init({ dbmPropagationMode: 'full' })
   ```

* Activez uniquement au niveau de l'intégration:
   ```javascript
   const tracer = require('dd-trace').init();
   tracer.use('pg', {
      dbmPropagationMode: 'full'
   })
   ```


Exemple complet :

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

Pour désactiver la propagation après l'avoir activée, définissez `DD_DBM_PROPAGATION_MODE=disabled`.

## Vérifiez l'intégration {#verify-the-integration}

Pour confirmer que l'intégration fonctionne :
1. Exécutez votre application instrumentée et effectuez une requête de base de données.
1. Dans Datadog, accédez à [**Database Monitoring > Query Samples**][37].
1. Confirmez que le badge de corrélation **APM** apparaît sur l'échantillon de requête.

## Explorez la connexion APM dans DBM {#explore-the-apm-connection-in-dbm}

### Attribuez les connexions actives à la base de données aux services APM appelants {#attribute-active-database-connections-to-the-calling-apm-services}

{{< img src="database_monitoring/dbm_apm_active_connections_breakdown.png" alt="Affichez les connexions actives à une base de données ventilées par le service APM dont elles proviennent.">}}

Ventilez les connexions actives pour un host donné par les services APM en amont effectuant les requêtes. Vous pouvez attribuer la charge sur une base de données à des services individuels pour comprendre quels services sont les plus actifs sur la base de données. Passez à la page du service en amont le plus actif pour poursuivre l'investigation.

### Filtrez vos hosts de base de données par les services APM qui les appellent {#filter-your-database-hosts-by-the-apm-services-that-call-them}

{{< img src="database_monitoring/dbm_filter_by_calling_service.png" alt="Filtrez vos hosts de base de données par les services APM qui les appellent.">}}

Filtrez la liste des bases de données pour n'afficher que les hosts de base de données dont dépendent vos services APM spécifiques. Identifiez si l'une de vos dépendances en aval présente une activité bloquante susceptible d'affecter les performances du service.

### Affichez la trace associée pour un échantillon de requête {#view-the-associated-trace-for-a-query-sample}

{{< img src="database_monitoring/dbm_query_sample_trace_preview.png" alt="Prévisualisez l'échantillon de trace APM à partir duquel l'échantillon de requête inspecté a été généré.">}}

Lors de la consultation d'un [Query Sample][37] dans Database Monitoring, si la trace associée a été échantillonnée par APM, vous pouvez afficher l'échantillon DBM dans le contexte de la trace APM. Cela vous permet de combiner la télémétrie DBM, y compris le plan d'exécution et les performances historiques de la requête, avec la lignée du span au sein de votre infrastructure pour comprendre si un changement sur la base de données est responsable de mauvaises performances applicatives.

## Explorez la connexion DBM dans APM {#explore-the-dbm-connection-in-apm}

### Visualisez les hosts de base de données en aval des services APM {#visualize-the-downstream-database-hosts-of-apm-services}

Sur la page APM d'un service donné, affichez les dépendances directes de base de données en aval du service telles qu'identifiées par Database Monitoring, et déterminez si certains hosts ont une charge disproportionnée qui pourrait être causée par des voisins bruyants. Pour afficher les dépendances de base de données d'un service :
1. Sélectionnez le service dans le [Catalog][26] pour ouvrir un panneau de détails.
1. Sélectionnez {{< ui >}}Service Page{{< /ui >}} dans le panneau.
1. Sur la page Service, sélectionnez la section {{< ui >}}Databases{{< /ui >}}.
1. Dans la section Databases, sélectionnez l'onglet {{< ui >}}Databases{{< /ui >}}.

### Visualisez les durées des spans et affichez les détails des requêtes {#visualize-span-durations-and-view-query-details}

Sélectionnez l'onglet {{< ui >}}Queries{{< /ui >}} dans la section {{< ui >}}Databases{{< /ui >}} sur la page de service APM pour afficher les valeurs aberrantes de latence et une liste complète des requêtes de l'intervalle de temps sélectionné. Sélectionnez une requête dans le tableau pour afficher le panneau de requête et accéder aux diagnostics, aux détails des erreurs et aux informations de trace.

### Identifiez les optimisations potentielles à l'aide des plans d'exécution pour les requêtes de base de données dans les traces {#identify-potential-optimizations-using-explain-plans-for-database-queries-in-traces}

{{< img src="database_monitoring/explain_plans_in_traces_update.png" alt="Identifiez les inefficacités à l'aide des plans d'exécution pour les requêtes de base de données dans les traces.">}}

Affichez les performances historiques de requêtes similaires à celles exécutées dans votre trace, y compris les événements d'attente échantillonnés, la latence moyenne et les plans d'exécution récemment capturés, afin de contextualiser les performances attendues d'une requête. Déterminez si le comportement est anormal et poursuivez l'investigation en basculant vers [Database Monitoring][1] pour obtenir un contexte supplémentaire sur les hosts de base de données sous-jacents.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/database_monitoring/#getting-started
[2]: /fr/tracing/
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
[37]: /fr/database_monitoring/query_samples/