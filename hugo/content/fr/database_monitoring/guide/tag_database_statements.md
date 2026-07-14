---
aliases:
- /fr/database_monitoring/tag_database_statements
title: Appliquer des tags aux instructions SQL
---

Ce guide part du principe que vous avez configuré [Database Monitoring][1].

[Datadog Database Monitoring (DBM)][1] vous permet de consulter les plans d'exécution et les échantillons de requêtes s'exécutant sur vos hosts de base de données. Ce guide vous explique comment ajouter des tags sous forme de commentaires SQL à vos requêtes de base de données, qui peuvent ensuite être affichés et exploités dans DBM.

## Avant de commencer

Bases de données prises en charge
: Postgres, MySQL, SQL Server

Versions de l'Agent prises en charge
: 7.36.1 et versions ultérieures

Formats de tags pris en charge
: [sqlcommenter][2], [marginalia][3]


## Injection manuelle de tags
À l'aide de n'importe quelle API de base de données prenant en charge l'exécution d'instructions SQL, ajoutez un commentaire dans votre instruction avec des tags formatés selon les formats [sqlcommenter][2] ou [marginalia][3].

```sql
/*key='val'*/ SELECT * from FOO
```

Séparez plusieurs tags par des virgules :
```sql
/*key1='val1',key2='val2'*/ SELECT * from FOO
```

Exemple complet :
```go
import (
    "database/sql"      
)

func main() {   
    db, err := sql.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable")
    if err != nil {
        log.Fatal(err)
    }

    // Tag SQL statement with key:val
    rows, err := db.Query("/*key='val'*/ SELECT * from FOO")
    if err != nil {
        log.Fatal(err)
    }
    defer rows.Close()
}
```

## Explorer les tags dans DBM

Sur la [page Samples][4], filtrez les vues **Explain Plans** et **Query Samples** par tag personnalisé.

{{< img src="database_monitoring/dbm_filter_explain_plans_by_custom_tag.png" alt="Filter explain plans by custom tag.">}}

Affichez également une série temporelle des coûts des plans d'exécution filtrés par tag.

{{< img src="database_monitoring/dbm_timeseries_by_custom_tag.png" alt="Coût des plans d'exécution par tag personnalisé.">}}

Lorsque vous sélectionnez une requête, les tags personnalisés sont affichés sur la page **Sample Details** sous Propagated Tags.

{{< img src="database_monitoring/dbm_explain_plan_with_custom_tags.png" alt="Afficher les tags personnalisés sur les plans d'exécution.">}}

[1]: /fr/database_monitoring/#getting-started
[2]: https://google.github.io/sqlcommenter
[3]: https://github.com/basecamp/marginalia
[4]: https://app.datadoghq.com/databases/samples