---
beta: true
kind: guide
private: true
title: Connecter DBM et APM
---

<div class="alert alert-warning">
Les fonctionnalités décrites sur cette page sont disponibles en version bêta. Contactez votre chargé de compte pour en savoir plus.
</div>

Ce guide part du principe que vous avez configuré la [surveillance Datadog][1] et que vous utilisez [APM][2].

## Avant de commencer

Traceurs pris en charge
: [dd-trace-go][3] 1.42.0 et versions ultérieures (prise en charge des packages [database/sql][4] et [sqlx][5])<br />
[dd-trace-rb][6] 1.6.0 et versions ultérieures (prise en charge des gems [mysql2][7] et [pg][8])

Bases de données prises en charge
: postgres, mysql

Versions de l'Agent prises en charge
: 7.36.1 et versions ultérieures

Confidentialité des données
: l'activation de la propagation des commentaires SQL entraîne le stockage de données potentiellement confidentielles (noms des services) dans les bases de données ; ces données sont alors accessibles aux tierces parties ayant accès à la base de données.

## Configuration

{{< tabs >}}
{{% tab "Go" %}}

Mettez à jour les dépendances de vos applications afin d'inclure [dd-trace-go@v1.42.0][1] ou une version ultérieure :
```
go get gopkg.in/DataDog/dd-trace-go.v1@v1.42.0
```

Mettez à jour votre code afin d'importer le package `contrib/database/sql` :
```go
import (
   "database/sql"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
   sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
)
```

Activez la fonctionnalité de propagation de Database Monitoring en utilisant l'une des méthodes suivantes :
1. Variable d'environnement :
   `DD_TRACE_SQL_COMMENT_INJECTION_MODE=full`

2. Utilisation de code durant l'inscription du pilote :
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithSQLCommentInjection(tracer.SQLInjectionModeFull), sqltrace.WithServiceName("my-db-service"))
   ```

3. Utilisation de code sur `sqltrace.Open` :
   ```go
   sqltrace.Register("postgres", &pq.Driver{}, sqltrace.WithServiceName("my-db-service"))

   db, err := sqltrace.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable", sqltrace.WithSQLCommentInjection(tracer.SQLInjectionModeFull))
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
    // La première étape consiste à définir le mode de propagation DBM lors de l'inscription du pilote. Notez que cela peut également se faire
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

{{< /tabs >}}

{{% tab "Ruby" %}}

Dans votre Gemfile, installez le traceur [dd-trace-rb][1] ou mettez-le à jour vers une version ultérieure à `1.6.0` :

```rb
source 'https://rubygems.org'
gem 'ddtrace', '>= 1.6.0'

# Selon votre utilisation
gem 'mysql2'
gem 'pg'
```

Activez la fonctionnalité de propagation de Database Monitoring en utilisant l'une des méthodes suivantes :
1. Variable d'environnement :
   `DD_DBM_PROPAGATION_MODE=service`

2. Option `comment_propagation` (par défaut : `ENV['DD_DBM_PROPAGATION_MODE']`), pour [mysql2][2] ou [pg][3] :
   ```rb
    Datadog.configure do |c|
        c.tracing.instrument :mysql2, comment_propagation: 'service'
        c.tracing.instrument :pg, comment_propagation: 'disabled'
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

{{< /tabs >}}

{{< /tabs >}}


[1]: /fr/database_monitoring/#getting-started
[2]: /fr/tracing/
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1
[4]: https://pkg.go.dev/database/sql
[5]: https://pkg.go.dev/github.com/jmoiron/sqlx
[6]: https://github.com/dataDog/dd-trace-rb
[7]: https://github.com/brianmario/mysql2
[8]: https://github.com/ged/ruby-pg