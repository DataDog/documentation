---
aliases:
- /fr/database_monitoring/guide/connect_dbm_and_apm/
further_reading:
- link: https://www.datadoghq.com/blog/link-dbm-and-apm/
  tag: Blog
  text: Mettez facilement en corrélation les données de télémétrie de DBM et d'APM
    afin d'analyser les performances des requêtes de bout en bout
kind: documentation
title: Associer la fonctionnalité Database Monitoring aux traces
---

Ce guide suppose que vous avez configuré [Database Monitoring][1] et que vous utilisez la solution [APM][2]. En connectant la solution APM et DBM, vous permettez dʼinjecter des identifiants de traces de la solutions APM dans les données collectées par DBM, ce qui permet de corréler ces deux sources de données. Cela permet aux caractéristiques du produit d'afficher les informations relatives à la base de données dans le produit APM et les données de la solution APM dans le produit DBM.

## Avant de commencer

Bases de données prises en charge
: Postgres, MySQL, SQL Server, Oracle

Versions de l'Agent prises en charge
: 7.46 et versions ultérieures

Confidentialité des données
: l'activation de la propagation des commentaires SQL entraîne le stockage de données potentiellement confidentielles (noms des services) dans les bases de données ; ces données sont alors accessibles aux tierces parties ayant accès à la base de données.


Les intégrations du traceur de lʼAPM fonctionnent avec un *mode de propagation*, qui permet de contrôler la quantité de données que les applications transmettent à la base de données.

- Le mode `full` envoie des informations complètes sur les traces à la base de données, ce qui vous permet d'enquêter sur chaque trace dans DBM. C'est la solution conseillée pour la plupart des intégrations.
- Le mode `service` envoie le nom du service, ce qui vous permet de comprendre quels services contribuent à la charge de la base de données. Il sʼagit du seul mode pris en charge pour les applications Oracle et SQL Server.
- Le mode `disabled` désactive la propagation et n'envoie aucune information provenant des applications.

SQL Server et Oracle ne prennent pas en charge le mode de propagation `full` en raison du comportement de mise en cache des instructions, susceptible dʼentraîner des problèmes de performances lors de l'ajout du contexte complet des traces.

| DD_DBM_PROPAGATION_MODE | Postgres  |   MySQL   | SQL Server |  Oracle   |
|:------------------------|:---------:|:---------:|:----------:|:---------:|
| `full`                  | {{< X >}} | {{< X >}} |            |           |
| `service`               | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}} |

**Traceurs et pilotes d'applications pris en charge**

| Langage                                 | Bibliothèque ou framework   | Postgres  |   MySQL   |     SQL Server      |       Oracle        |
|:-----------------------------------------|:-----------------------|:---------:|:---------:|:-------------------:|:-------------------:|
| **Go :** [dd-trace-go][3] >= 1.44.0       |                        |           |           |                     |                     |
|                                          | [database/sql][4]      | {{< X >}} | {{< X >}} | Mode `service` uniquement | Mode `service` uniquement |
|                                          | [sqlx][5]              | {{< X >}} | {{< X >}} | Mode `service` uniquement | Mode `service` uniquement |
| **Java** [dd-trace-java][23] >= 1.11.0   |                        |           |           |                     |                     |
|                                          | [jdbc][22]             | {{< X >}} | {{< X >}} | Mode `service` uniquement | Mode `service` uniquement |
| **Ruby :** [dd-trace-rb][6] >= 1.8.0      |                        |           |           |                     |                     |
|                                          | [pg][8]                | {{< X >}} |           |                     |                     |
|                                          | [mysql2][7]            |           | {{< X >}} |                     |                     |
| **Python :** [dd-trace-py][11] >= 1.9.0   |                        |           |           |                     |                     |
|                                          | [psycopg2][12]         | {{< X >}} |           |                     |                     |
| **.NET** [dd-trace-dotnet][15] >= 2.35.0 |                        |           |           |                     |                     |
|                                          | [Npgsql][16] *         | {{< X >}} |           |                     |                     |
|                                          | [MySql.Data][17] *     |           | {{< X >}} |                     |                     |
|                                          | [MySqlConnector][18] * |           | {{< X >}} |                     |                     |
|                                          | [ADO.NET][24] *        |           |           | Mode `service` uniquement |                     |
| **PHP**  [dd-trace-php][19] >= 0.86.0    |                        |           |           |                     |                     |
|                                          | [pdo][20]              | {{< X >}} | {{< X >}} |                     |                     |
|                                          | [MySQLi][21]           |           | {{< X >}} |                     |                     |
| **Node.js :** [dd-trace-js][9] >= 3.17.0  |                        |           |           |                     |                     |
|                                          | [postgres][10]         | {{< X >}} |           |                     |                     |
|                                          | [mysql][13]            |           | {{< X >}} |                     |                     |
|                                          | [mysql2][14]           |           | {{< X >}} |                     |                     |

\* [CommandType.StoredProcedure][25] nʼest pas pris en charge

## Configuration
Afin de profiter de la meilleure expérience possible, assurez-vous que les variables dʼenvironnement suivantes sont définies dans votre application :

```
DD_SERVICE=(application name)
DD_ENV=(application environment)
DD_VERSION=(application version)
```

{{< tabs >}}
{{% tab "Go" %}}

Mettez à jour les dépendances de vos applications afin d'inclure [dd-trace-go@v1.44.0][1] ou une version ultérieure :
```
go get gopkg.in/DataDog/dd-trace-go.v1@v1.44.0
```

Mettez à jour votre code afin d'importer le package `contrib/database/sql` :
```go
import (
   "database/sql"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
   sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
)
```

Activez la fonctionnalité de propagation de Database Monitoring via l'une des méthodes suivantes :
1. Variable d'environnement :
   `DD_DBM_PROPAGATION_MODE=full`

2. Utilisation de code durant l'enregistrement du pilote :
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull), sqltrace.WithServiceName("my-db-service"))
   ```

3. Utilisation de code sur `sqltrace.Open` :
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithServiceName("my-db-service"))

   db, err := sqltrace.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable", sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull))
   if err != nil {
       log.Fatal(err)
   }
   ```

Exemple complet :
```go
import (
    "database/sql"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
    sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
)

func main() {
    // La première étape consiste à définir le mode de propagation DBM lors de l'enregistrement du pilote. Notez qu'il est également possible de le faire
    // sur sqltrace.Open pour avoir un contrôle plus granulaire sur la fonctionnalité.
    sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithDBMPropagation(tracer.DBMPropagationModeFull))

    // On appelle ensuite Open.
    db, err := sqltrace.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable")
    if err != nil {
        log.Fatal(err)
    }

    // Puis on utilise le package database/sql comme d'habitude, avec tracing.
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

Suivez les instructions d'instrumentation pour le [tracing de Java][1] et installez la version `1.11.0` ou une version ultérieure de lʼAgent.

Vous devez également activer lʼ[instrumentation][2] `jdbc-datasource`.

Activez la fonctionnalité de propagation de Database Monitoring via **l'une** des méthodes suivantes :

- Définir la propriété du système `dd.dbm.propagation.mode=full`
- Définir la variable dʼenvironnement `DD_DBM_PROPAGATION_MODE=full`

Exemple complet :
```
# Démarrer l'Agent Java avec les propriétés système requises
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

**Remarque** : les instructions préparées ne sont pas prises en charge en mode `full`, et tous les appels de lʼAPI JDBC qui utilisent des instructions préparées sont automatiquement rétrogradés en mode `service`. Comme la plupart des bibliothèques Java SQL utilisent des instructions préparées par défaut, cela signifie que **la plupart** des applications Java ne peuvent utiliser que le mode `service`.

[1]: /fr/tracing/trace_collection/dd_libraries/java/
[2]: /fr/tracing/trace_collection/compatibility/java/#data-store-compatibility

{{% /tab %}}

{{% tab "Ruby" %}}

Dans votre Gemfile, installez le traceur [dd-trace-rb][1] ou mettez-le à jour vers la version  `1.6.0` ou ultérieur :

```rb
source 'https://rubygems.org'
gem 'datadog' # Utilisez `'ddtrace', '>= 1.8.0'` avec les versions v1.x

# Selon votre utilisation
gem 'mysql2'
gem 'pg'
```

Activez la fonctionnalité de propagation de Database Monitoring via l'une des méthodes suivantes :
1. Variable d'environnement :
   `DD_DBM_PROPAGATION_MODE=full`

2. Option `comment_propagation` (par défaut : `ENV['DD_DBM_PROPAGATION_MODE']`), pour [mysql2][2] ou [pg][3] :
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

Installez [psycopg2][2] :
```
pip install psycopg2
```

Activez la fonctionnalité de propagation de Database Monitoring en définissant la variable d'environnement suivante :
   - `DD_DBM_PROPAGATION_MODE=full`

Exemple complet :
```python

import psycopg2

POSTGRES_CONFIG = {
    "host": "127.0.0.1",
    "port": 5432,
    "user": "postgres_user",
    "password": "postgres_password",
    "dbname": "postgres_db_name",
}

# connectez-vous à postgres db
conn = psycopg2.connect(**POSTGRES_CONFIG)
cursor = conn.cursor()
# exécutez les requêtes sql
cursor.execute("select 'blah'")
cursor.executemany("select %s", (("foo",), ("bar",)))
```

[1]: https://ddtrace.readthedocs.io/en/stable/release_notes.html
[2]: https://ddtrace.readthedocs.io/en/stable/integrations.html#module-ddtrace.contrib.psycopg

{{% /tab %}}

{{% tab ".NET" %}}

<div class="alert alert-warning">
Cette fonctionnalité nécessite dʼactiver lʼinstrumentation automatique pour votre service .NET.
</div>

Suivez les [instructions relatives au tracing .NET Framework][1] ou [celles relatives au tracing .NET Core][2] afin d'installer le package d'instrumentation automatique et d'activer le tracing pour votre service.

Vérifiez que vous utilisez une bibliothèque client compatible, par exemple `Npgsql`.

Activez la fonctionnalité de propagation de Database Monitoring en définissant la variable d'environnement suivante :
   - Pour Postgres et MySQL : `DD_DBM_PROPAGATION_MODE=full`
   - Pour SQL Server : `DD_DBM_PROPAGATION_MODE=service`

[1]: /fr/tracing/trace_collection/dd_libraries/dotnet-framework
[2]: /fr/tracing/trace_collection/dd_libraries/dotnet-core

{{% /tab %}}

{{% tab "PHP" %}}

<div class="alert alert-warning">
Afin de pouvoir utiliser cette fonctionnalité, l'extension du traceur doit être activée pour votre service PHP.
</div>

Suivez les [instructions relatives au tracing PHP][1] afin d'installer le package d'instrumentation automatique et d'activer le tracing pour votre service.

Vérifiez que vous utilisez une bibliothèque client compatible, par exemple `PDO`.

Activez la fonctionnalité de propagation de Database Monitoring en définissant la variable d'environnement suivante :
   - `DD_DBM_PROPAGATION_MODE=full`

[1]: https://docs.datadoghq.com/fr/tracing/trace_collection/dd_libraries/php?tab=containers

{{% /tab %}}

{{% tab "Node.js" %}}

Installez le traceur [dd-trace-js][1] ou mettez-le à jour vers une version ultérieure à `3.17.0` (ou `2.30.0` en cas d'utilisation de la version 12 de Node.js en fin de vie) :

```
npm install dd-trace@^3.17.0
```

Mettez à jour votre code pour importer et initialiser le traceur :
```javascript
// Cette ligne doit précéder l'importation des modules instrumentés.
const tracer = require('dd-trace').init();
```

Activez la fonctionnalité de propagation de Database Monitoring via l'une des méthodes suivantes :
* En définissant la variable d'environnement suivante :
   ```
   DD_DBM_PROPAGATION_MODE=full
   ```

* En configurant le traceur de façon à utiliser l'option `dbmPropagationMode` (par défaut : `ENV['DD_DBM_PROPAGATION_MODE']`):
   ```javascript
   const tracer = require('dd-trace').init({ dbmPropagationMode: 'full' })
   ```

* En activant le traceur uniquement au niveau de l'intégration :
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
    // traitement du résultat
})
```

[1]: https://github.com/DataDog/dd-trace-js

{{% /tab %}}

{{< /tabs >}}

## Explorer la connexion APM dans DBM

### Attribuer les connexions de base de données actives aux services APM les appelant

{{< img src="database_monitoring/dbm_apm_active_connections_breakdown.png" alt="Visualiser les connexions actives vers une base de données avec le service APM à l'origine de celles-ci.">}}

Obtenez une vue détaillée des connexions actives pour un host donné selon les services APM en amont qui émettent les requêtes. Vous pouvez attribuer la charge d'une base de données à des services individuels afin d'identifier ceux qui sont les plus actifs sur la base de données. Basculez sur la page du service en amont le plus actif pour poursuivre l'examen des données.

### Filtrer les hosts de votre base de données selon les services APM qui les appellent

{{< img src="database_monitoring/dbm_filter_by_calling_service.png" alt="Filtrez les hosts de votre base de données selon les services APM qui les appellent.">}}

Filtrez rapidement la liste des bases de données afin d'afficher uniquement les hosts de base de données dont dépendent vos services APM spécifiques. Identifiez facilement si l'une de vos dépendances en aval connaît un blocage susceptible de nuire aux performances du service.

### Consulter la trace associée à un échantillon de requête

{{< img src="database_monitoring/dbm_query_sample_trace_preview.png" alt="Affichez un aperçu de la trace APM échantillonnée à partir de laquelle la requête inspectée a été générée.">}}

Si vous consultez un échantillon de requête dans Database Monitoring et que la trace associée a été échantillonnée par APM, vous pouvez afficher l'échantillon de requête DBM dans le contexte de la trace APM. Procéder de la sorte permet de combiner les données de télémétrie DBM (notamment le plan d'exécution ainsi que les performances historiques de la requête) et l'historique de la span au sein de votre infrastructure afin de déterminer si une modification apportée à la base données est à l'origine des mauvaises performances de l'application.

## Explorer la connexion DBM dans APM

### Visualiser les hosts de base de données en aval des services APM

{{< img src="database_monitoring/dbm_apm_service_page_db_host_list.png" alt="Visualisez les hosts de base de données en aval dont dépendent vos services APM à partir de la page Service.">}}

Sur la page APM d'un service donné, consultez les dépendances de base de données directement en aval du service identifiées par Database Monitoring. Déterminez rapidement si des hosts présentent une charge disproportionnée pouvant être due à d'autres hosts sollicitant fortement la base de données. Pour afficher la page d'un service, cliquez sur le service de votre choix dans le [Service Catalog][26] pour ouvrir le volet des détails, puis cliquez sur **View Service Page** au sein de celui-ci.

### Identifier de potentielles optimisations à l'aide des plans d'exécution pour les requêtes de base de données dans les traces

{{< img src="database_monitoring/explain_plans_in_traces_update.png" alt="Identifiez les inefficacités à l'aide des plans d'exécution pour les requêtes de base de données au sein de traces.">}}

Consultez les performances historiques de requêtes similaires à celles exécutées dans votre trace, notamment les événements d'attente échantillonnés, la latence moyenne et les plans d'exécution capturés récemment, afin d'apporter du contexte au comportement attendu d'une requête. Déterminez si le comportement est anormal et poursuivez l'examen en basculant sur Database Monitoring pour obtenir encore plus d'informations concernant les hosts de base de données sous-jacents.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/database_monitoring/#getting-started
[2]: /fr/tracing/
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