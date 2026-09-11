---
title: Etiquetado de sentencias de SQL
---

Esta guía asume que has configurado la [Monitorización de base de datos][1].

[La Monitorización de base de datos de Datadog (DBM)][1] te permite ver planes de explicación y ejemplos de consultas que se ejecutan en tus hosts de base de datos. Esta guía te muestra cómo añadir etiquetas (tags) como comentarios SQL a las consultas de tu base de datos, que luego se pueden mostrar y aprovechar en DBM.

## Antes de empezar

Bases de datos compatibles
: Postgres, MySQL, SQL Server

Versiones compatibles del Agent 
: 7.36.1+

Formatos compatibles de etiquetado
: [sqlcommenter][2], [marginalia][3]


## Inyección manual de etiquetas
Con cualquier API de base de datos que soporte la ejecución de sentencias SQL, añade un comentario en tu sentencia con etiquetas formateadas según los formatos [sqlcommenter][2] o [marginalia][3].

```sql
/*key='val'*/ SELECT * from FOO
```

Separa varias etiquetas con comas:
```sql
/*key1='val1',key2='val2'*/ SELECT * from FOO
```

Ejemplo completo:
```go
import (
    "database/sql"      
)

func main() {   
    db, err := sql.Open("postgres", "postgres://pqgotest:password@localhost/pqgotest?sslmode=disable")
    if err != nil {
        log.Fatal(err)
    }

    // Etiqueta sentencias SQL con key:val
    rows, err := db.Query("/*key='val'*/ SELECT * from FOO")
    if err != nil {
        log.Fatal(err)
    }
    defer rows.Close()
}
```

## Explorar etiquetas en DBM

En la [página Muestras][4], filtra las vistas **Explain Plans** (Explicar planes) y **Query Samples** (Muestras de consulta) por etiqueta personalizada.

{{< img src="database_monitoring/dbm_filter_explain_plans_by_custom_tag.png" alt="Filtrar planes de explicación por etiqueta personalizada.">}}

También puedes ver una serie temporal de los costes del plan de explicación filtrados por etiqueta.

{{< img src="database_monitoring/dbm_timeseries_by_custom_tag.png" alt="Coste del plan de explicación por etiqueta personalizada.">}}

Al seleccionar una consulta, las etiquetas personalizadas se muestran en la página **Sample Details** (Detalles de la muestra) en Propagated Tags (Etiquetas propagadas).

{{< img src="database_monitoring/dbm_explain_plan_with_custom_tags.png" alt="Ver etiquetas personalizadas en planes de explicación.">}}

[1]: /es/database_monitoring/#getting-started
[2]: https://google.github.io/sqlcommenter
[3]: https://github.com/basecamp/marginalia
[4]: https://app.datadoghq.com/databases/samples