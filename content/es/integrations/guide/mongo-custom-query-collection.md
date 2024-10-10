---
further_reading:
- link: /integrations/mongo/
  tag: Documentación
  text: Más información sobre la integración MongoDB
title: Recopilación de métricas personalizadas de MongoDB
---

## Información general

Para recopilar métricas personalizadas con la [integración MongoDB][8], utiliza la opción `custom_queries` en el archivo `conf.d/mongo.d/conf.yaml` en la raíz del [directorio de configuración de tu Agent][1]. Para ver más detalles, consulta el [mongo.d/conf.yaml][2] de ejemplo.

## Configuración

Estas son las opciones de las `custom_queries`:

* **`metric_prefix`**: Cada métrica comienza con el prefijo elegido.
* **`query`**: Es la consulta [Mongo runCommand][3] a ejecutar como un objeto JSON. **Nota**: El Agent sólo admite las consultas `count`, `find` y `aggregates`.
* **`database`**: Es la base de datos MongoDB de la que recopilar métricas.
* **`fields`: Se ignora en las consultas a `count`. Se trata de una lista que representa cada campo sin un orden específico. Ignora los campos no especificados y los que faltan. Hay tres datos obligatorios para cada `fields`:
  * `field_name`: Es el nombre del campo del que obtener los datos.
  * `name`: Es el sufijo que se añade al prefijo de la métrica para formar el nombre completo de la métrica. Si `type` es `tag`, esta columna se trata como etiqueta (tag) y se aplica a cada métrica recopilada por esta consulta concreta.
  * `type`: Es el método de envío (`gauge`, `count`, `rate` y más). También se puede definir como `tag` para etiquetar cada métrica de la fila con el nombre y el valor del elemento de esta columna. Puedes utilizar el tipo `count` para realizar agregaciones para consultas que devuelven varias filas con la misma etiqueta o ninguna.
* **`tags`**: Una lista de etiquetas para aplicar a cada métrica (según lo especificado anteriormente).
* **`count_type`**: Sólo para consultas `count`, es el método de envío (`gauge`, `count`, `rate` y más) del resultado de recuento. Se ignora para las consultas que no son de recuento.

## Ejemplos

Para los siguientes ejemplos se utiliza la siguiente recopilación `user_collection` de Mongo:

```text
{ name: "foo", id: 12345, active: true, age:45, is_admin: true}
{ name: "bar", id: 67890, active: false, age:25, is_admin: true}
{ name: "foobar", id: 16273, active: true, age:35, is_admin: false}
```

Elige el tipo de consulta de la que quieres ver un ejemplo:

{{< tabs >}}
{{% tab "Recuento" %}}

Para monitorizar cuántos usuarios están activos en un momento dado, tu [comando de recuento de Mongo][1] sería:

```text
db.runCommand( {count: user_collection, query: {active:true}})
```

Que correspondería a la siguiente configuración YAML `custom_queries` dentro de tu archivo `mongo.d/conf.yaml`:

```yaml
custom_queries:
  - metric_prefix: mongo.users
    query: {"count": "user_collection", "query": {"active":"true"}}
    count_type: gauge
    tags:
      - user:active
```

Esto emitiría una métrica `gauge` `mongo.users` con una etiqueta: `user:active`.

**Nota**: El [tipo de métrica][2] definido es `gauge`.

[1]: https://docs.mongodb.com/manual/reference/command/count/#dbcmd.count
[2]: /es/metrics/types/
{{% /tab %}}
{{% tab "Buscar" %}}

Para monitorizar la edad por usuario, tu [comando de búsqueda de Mongo][1] sería:

```text
db.runCommand( {find: user_collection, filter: {active:true} )
```

Que correspondería a la siguiente configuración YAML `custom_queries` dentro de tu archivo `mongo.d/conf.yaml`:

```yaml
custom_queries:
  - metric_prefix: mongo.example2
    query: {"find": "user_collection", "filter": {"active":"true"}}
    fields:
      - field_name: name
        name: name
        type: tag
      - field_name: age
        name: user.age
        type: gauge

```

Esto emitiría una métrica `gauge` `mongo.example2.user.age` con dos etiquetas: `name:foo` y `name:foobar`.

**Nota**: El [tipo de métrica][2] definido es `gauge`.

[1]: https://docs.mongodb.com/manual/reference/command/find/#dbcmd.find
[2]: /es/metrics/types/
{{% /tab %}}
{{% tab "Agregado" %}}

Para monitor el promedio de edad de un usuario administrador y de un usuario no administrador, tu [comando de agregado de Mongo][1] sería:

```text
db.runCommand(
              {
                'aggregate': "user_collection",
                'pipeline': [
                  {"$match": {"active": "true"}},
                  {"$group": {"_id": "$is_admin", "age_avg": {"$avg": "$age"}}}
                ],
                'cursor': {}
              }
            )
```

Que correspondería a la siguiente configuración YAML `custom_queries` dentro de tu archivo `mongo.d/conf.yaml`:

```yaml
custom_queries:
  - metric_prefix: mongo.example3
    query: {"aggregate": "user_collection","pipeline": [{"$match": {"active": "true"}},{"$group": {"_id": "$is_admin", "age_avg": {"$avg": "$age"}}}],"cursor": {}}
    fields:
      - field_name: age_avg
        name: user.age
        type: gauge
      - field_name: _id
        name: is_admin
        type: tag
    tags:
      - test:mongodb
```

Esto emitiría una métrica `gauge` `mongo.example3.user.age` con dos etiquetas: `is_admin:true` y `is_admin:false` que representan el promedio de edad de los usuarios para cada etiqueta.

[1]: https://docs.mongodb.com/manual/reference/command/aggregate/#dbcmd.aggregate
{{% /tab %}}
{{< /tabs >}}

**Nota**: Después de actualizar el archivo YAML de Mongo, [reinicia el Datadog Agent][4].

### Validación

Para verificar el resultado, busca las métricas utilizando el [Explorador de métricas][5].

### Depuración

[Ejecuta el subcomando de estado del Agent][6] y busca `mongo` en la sección Checks. Además, los [logs del Agent][7] pueden proporcionar información útil.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mongo/datadog_checks/mongo/data/conf.yaml.example
[3]: https://docs.mongodb.com/manual/reference/command
[4]: /es/agent/guide/agent-commands/#restart-the-agent
[5]: /es/metrics/explorer/
[6]: /es/agent/guide/agent-commands/#agent-status-and-information
[7]: /es/agent/guide/agent-log-files/
[8]: /es/integrations/mongodb