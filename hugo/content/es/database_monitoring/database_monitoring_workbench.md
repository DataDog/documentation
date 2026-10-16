---
description: Desarrolle y pruebe cambios en una base de datos Postgres efímera y similar
  a producción, creada a partir del esquema y las estadísticas que recopila Database
  Monitoring.
further_reading:
- link: /database_monitoring/
  tag: Documentación
  text: Database Monitoring
- link: /database_monitoring/schema_explorer/
  tag: Documentación
  text: Explorador de esquemas
- link: /database_monitoring/recommendations/
  tag: Documentación
  text: Recomendaciones
- link: /mcp_server/
  tag: Documentación
  text: Datadog MCP Server
title: Database Monitoring Workbench
---
{{< callout url="https://app.datadoghq.com/forms/share/45a8d961134a872c7118d345cff413cfd3d88bc1f1558f76bb5067a85ae43118" btn_hidden="false" header="¡Únase a la vista previa!" >}}
El Database Monitoring Workbench está en vista previa. Utilice este formulario para solicitar acceso.
{{< /callout >}}

## Descripción general {#overview}

El Database Monitoring Workbench es una base de datos Postgres efímera y similar a la de producción que puede usar para desarrollar y probar cambios. Está creada a partir del esquema y las estadísticas que recopila Database Monitoring, por lo que coincide con la forma de sus tablas, índices, recuentos de filas y versión principal de producción. Datadog nunca copia ni transmite los datos de sus tablas. El Database Monitoring Workbench se completa automáticamente con datos sintéticos generados a partir de las estadísticas de columnas y tablas que recopila Database Monitoring. Si lo prefiere, puede completarla manualmente con sus propios datos.

Esta página explica cómo:

- Conectarse a una instancia de Workbench con MCP, la API o un cliente SQL
- Comparar planes de consulta y probar cambios de índices y migración
- Detectar regresiones de planes en CI
- Experimentar con cambios en el modelo de datos

## Requisitos {#requirements}

- Una base de datos Postgres monitoreada por [Database Monitoring][5].
- [Recopilación de esquemas][1] habilitada para la base de datos lógica específica, no solo para la instancia.
- El permiso **Database Monitoring Read**. Consulte [Control de acceso basado en roles][6] para saber cómo administrar los permisos.
- Workbench habilitado para su organización. Para solicitar acceso, utilice el formulario de vista previa en la parte superior de esta página.

## Conectar a Workbench {#connect-to-workbench}

### Conectando con el servidor MCP {#connecting-with-the-mcp-server}

Utilice el [servidor Datadog MCP][2] para crear y administrar instancias de Workbench desde un agente de codificación. Para agregarlo a su agente, consulte [Configurar el servidor Datadog MCP][7]. El servidor MCP expone Workbench como tres herramientas:

<table style="width: 100%;">
  <thead>
    <tr>
      <th style="width: 50%;">Herramienta</th>
      <th style="width: 50%;">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="white-space: nowrap;"><code>create_datadog_database_workbench</code></td>
      <td>Crea un entorno aislado (sandbox) a partir de una base de datos monitoreada y espera a que esté listo.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>get_datadog_database_workbench</code></td>
      <td>Comprueba si un entorno aislado (sandbox) está listo.</td>
    </tr>
    <tr>
      <td style="white-space: nowrap;"><code>delete_datadog_database_workbench</code></td>
      <td>Elimina un entorno aislado (sandbox), revocando su cadena de conexión y liberando su cómputo.</td>
    </tr>
  </tbody>
</table>

Después de que el agente crea una instancia, puede leer su esquema, ejecutar sentencias, leer planes de consulta, agregar un índice y volver a leer el plan. Funciona con su esquema, índices y recuentos de filas reales.

{{< img src="database_monitoring/database_monitoring_workbench/workbench_mcp_index_demo.mp4" alt="Un agente de codificación crea un entorno aislado (sandbox) de Workbench a través del servidor Datadog MCP, carga los recuentos de filas de producción, agrega un índice que convierte un escaneo secuencial en un escaneo de índice y elimina el entorno aislado." video="true" >}}

### Conexión con la API {#connecting-with-the-api}

Utilice la API de Workbench para crear una instancia de Workbench desde un script o trabajo de CI.

Para crear una instancia, envíe una solicitud `POST` que nombre la base de datos monitoreada:

```shell
curl -X POST "{{< region-param key="dd_api" >}}/api/unstable/databases/workbench/session" \
  -H "DD-API-KEY: <DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "database_instance": "orders-db-primary",
    "database_name": "shop"
  }'
```

La clave de aplicación debe pertenecer a un usuario o cuenta de servicio con el permiso **Database Monitoring Read**. Si Workbench no está habilitado para su organización, la API devuelve `403`.

| Parámetro | Descripción |
| --------- | ----------- |
| <code style="white-space: nowrap;">database_instance</code> | El nombre de la instancia en Database Monitoring. |
| <code style="white-space: nowrap;">database_name</code> | El nombre de la base de datos lógica dentro de `database_instance`. |
| <code style="white-space: nowrap;">populate</code> | Establezca en `false` para crear la instancia sin datos generados. Para cargar sus propios datos, consulte [Conexión con un cliente SQL](#connecting-with-a-sql-client). |

La solicitud devuelve `202 Accepted` con el ID de la instancia, su estado y una cadena de conexión de Postgres:

{{< code-block lang="json" >}}
{
  "id": "workbench-123",
  "status": "pending",
  "connection": {
    "dsn": "postgres://workbench:<TOKEN>@<WORKBENCH_HOST>:5432/bench?sslmode=require"
  }
}
{{< /code-block >}}

La creación de una instancia es asíncrona. Para verificar la disponibilidad, envíe `GET /api/unstable/databases/workbench/session/{id}` hasta que `status` sea `ready`. La respuesta también incluye `expires_at`.

Las instancias caducan después del número de segundos establecido en `ttl_seconds`, que es de 1,800 segundos (30 minutos) de forma predeterminada. No puede establecer el TTL en la solicitud.

Para eliminar una instancia, envíe `DELETE /api/unstable/databases/workbench/session/{id}`. Una solicitud exitosa devuelve `204`.

<div class="alert alert-danger">La cadena de conexión es una credencial de base de datos activa. Trátela como un secreto: no la confirme, no la registre ni la pegue en un canal compartido. Elimine la instancia cuando termine. La caducidad o eliminación cierra las conexiones y descarta todos los datos.</div>

### Conexión con un cliente SQL {#connecting-with-a-sql-client}

Use la cadena de conexión del servidor MCP o la API con cualquier cliente de Postgres, como `psql`, una interfaz gráfica de usuario o el banco de pruebas de su ORM.
{{< code-block lang="shell" >}}
psql "postgres://workbench:<TOKEN>@<WORKBENCH_HOST>:5432/bench?sslmode=require"
{{< /code-block >}}

La instancia se puede escribir, por lo que puede crear un índice, volver a ejecutar `EXPLAIN` y comparar los planes. Para ver ejemplos, consulte [Cómo usar Workbench](#how-to-use-workbench). Cuando la instancia caduca o usted la elimina, las conexiones abiertas se cierran y las consultas en curso pueden fallar.

De forma predeterminada, Workbench completa la instancia con datos sintéticos. Para usar sus propios datos en su lugar, cree la instancia con `"populate": false` en la solicitud de API. Luego cargue sus datos con `INSERT`, `COPY FROM STDIN` o el comando `psql` `\copy`, y ejecute `ANALYZE` después. Los recursos de la instancia y el TTL limitan la cantidad de datos que puede cargar.

## Cómo usar Workbench {#how-to-use-workbench}

Cree una instancia con el [servidor MCP](#connecting-with-the-mcp-server) o la [API](#connecting-with-the-api), y conéctese a ella con un [cliente SQL](#connecting-with-a-sql-client). Luego úsela para las tareas en esta sección.

### Comparar planes de consulta antes y después de un cambio {#compare-query-plans-before-and-after-a-change}

Revise el plan de una consulta cuando la escriba, antes de abrir una solicitud de extracción. También puede usar estos pasos para probar una reescritura después de encontrar una consulta lenta en Database Monitoring. Cree la instancia para la base de datos en la que se ejecutó la consulta.

Ejecute `EXPLAIN` contra la instancia y lea el plan comparándolo con recuentos de filas y cardinalidades similares a los de producción:

{{< code-block lang="sql" >}}
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders
WHERE customer_id = 42 AND created_at > '2026-01-01'
ORDER BY created_at DESC;
{{< /code-block >}}

Si el plan muestra `Sort -> Seq Scan on orders`, la consulta escanea toda la tabla. Agregue el composite index en la instancia, vuelva a planificar y confirme que el plan cambia a un escaneo de índice:

{{< code-block lang="sql" >}}
CREATE INDEX idx_orders_customer_created ON orders (customer_id, created_at DESC);
{{< /code-block >}}

Luego, envíe el índice con la consulta. Para una consulta lenta, compare los planes antes y después de su reescritura, y lleve el resultado a la solicitud de extracción. Puede probar reescrituras sin tocar la producción ni solicitar acceso a sus datos.

### Verificación de qué consultas dependen de un índice {#check-which-queries-depend-on-an-index}

Eliminar un índice no utilizado ahorra rendimiento de escritura y almacenamiento, pero eliminar uno del que depende una consulta puede causar un incidente. Pruebe la eliminación en una instancia primero. Eliminar un índice allí no afecta a la producción.

1. Obtenga sus consultas principales desde [query metrics][3].
2. Ejecute `EXPLAIN` en cada consulta y guarde el plan.
3. Elimine el índice en la instancia.
4. Ejecute `EXPLAIN` en cada consulta de nuevo y compare los planes.

{{< code-block lang="sql" >}}
EXPLAIN SELECT id, total FROM orders WHERE status = 'pending' ORDER BY created_at;
--  Index Scan using idx_orders_status on orders  (cost=0.42..88.20 rows=312 width=20)

DROP INDEX idx_orders_status;

EXPLAIN SELECT id, total FROM orders WHERE status = 'pending' ORDER BY created_at;
--  Seq Scan on orders  (cost=0.00..14200.00 rows=312 width=20)
{{< /code-block >}}

Una consulta cuyo plan vuelve a un escaneo secuencial depende del índice. Lleve esos planes a su revisión en lugar de confiar en suposiciones subjetivas y no probadas. Para probar un índice nuevo en su lugar, créelo en la instancia y vuelva a planificar sus consultas.

### Pruebe una migración antes de implementarla {#test-a-migration-before-you-deploy-it}

Los problemas de migración a menudo dependen del tamaño de la tabla y del tráfico concurrente, por lo que una base de datos de prueba local puede pasarlos por alto. Por ejemplo:

- Una `CREATE INDEX` que debería haber sido `CREATE INDEX CONCURRENTLY`, y mantiene un bloqueo de escritura durante la duración de la compilación.
- Una `ALTER` que toma un bloqueo más fuerte de lo esperado en una tabla que nunca está inactiva.

Para probar una migración, ejecútela contra la instancia con su herramienta de migración, utilizando la cadena de conexión de la instancia. Mientras se ejecuta el DDL, consulte `pg_locks` para ver qué bloqueos toma. Después, vuelva a planificar sus consultas importantes para ver cómo les afecta el nuevo esquema.

Una migración de prueba toma menos tiempo que la de producción, pero produce el mismo resultado estructural.

### Detecte regresiones de plan en CI {#catch-plan-regressions-in-ci}

Utilice la [API](#connecting-with-the-api) para agregar una verificación de plan a su pipeline. Para cada solicitud de extracción que afecte a SQL o al esquema:

1. Cree una instancia.
2. Realice sondeos hasta que el estado sea `ready`.
3. Prepare los datos.
4. Si compara los planes antes y después del cambio, capture los planes base con `EXPLAIN`.
5. Aplique el cambio.
6. Ejecute `EXPLAIN` en sus consultas principales.
7. Haga que la compilación falle si un plan infringe uno de sus invariantes.
8. Elimine la instancia, incluso si un paso anterior falla.

Ejemplos de invariantes:

- Sin nuevos escaneos secuenciales en una tabla grande.
- Sin cambios en la forma del plan en una consulta en su ruta crítica.
- Ningún índice eliminado que todavía esté en uso.

El siguiente script ejecuta este flujo en un trabajo de CI. Requiere `curl`, `jq` y `psql`, y estas variables de entorno:

- `DD_API_KEY` y `DD_APP_KEY`: su clave de Datadog API y su clave de aplicación de Datadog.
- `DD_SITE`: su sitio de Datadog, como `datadoghq.com` o `us3.datadoghq.com`. El valor predeterminado es `datadoghq.com`.
- `DB_INSTANCE` y `DB_NAME`: el `database_instance` y el `database_name` a partir de los cuales crear la instancia.

```shell
#!/usr/bin/env bash
set -euo pipefail
API="https://api.${DD_SITE:-datadoghq.com}/api/unstable/databases/workbench/session"
AUTH=(-H "DD-API-KEY: ${DD_API_KEY}" -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" -H "Content-Type: application/json")

# Create (returns 202 with id + connection.dsn)
resp=$(curl -sf -X POST "$API" "${AUTH[@]}" \
  -d "{\"database_instance\":\"${DB_INSTANCE}\",\"database_name\":\"${DB_NAME}\"}")
id=$(jq -r .id <<<"$resp")
dsn=$(jq -r .connection.dsn <<<"$resp")
trap 'curl -sf -X DELETE "$API/$id" "${AUTH[@]}" >/dev/null || true' EXIT  # always delete

# Wait for ready
for _ in $(seq 60); do
  status=$(curl -sf "$API/$id" "${AUTH[@]}" | jq -r .status)
  [ "$status" = ready ] && break; sleep 5
done
[ "$status" = ready ] || { echo "Workbench not ready: $status"; exit 1; }

# Apply the change, then EXPLAIN top queries
psql "$dsn" -v ON_ERROR_STOP=1 -f migrations/change.sql
psql "$dsn" -v ON_ERROR_STOP=1 -f ci/explain_top_queries.sql > plans.txt

# Fail on a broken invariant (example)
if grep -q "Seq Scan on orders" plans.txt; then echo "Plan regression"; exit 1; fi
```

En este ejemplo, `migrations/change.sql` contiene su cambio y `ci/explain_top_queries.sql` contiene una declaración `EXPLAIN` para cada una de sus consultas principales. La última verificación hace que el trabajo falle si un plan incluye un escaneo secuencial en `orders`. Reemplácelo con sus propios invariantes.

### Experimente con cambios en el modelo de datos {#experiment-with-data-model-changes}

Cambiar un modelo de datos es una de las operaciones más riesgosas que puede ejecutar en una base de datos. Dividir una tabla, cambiar el tipo de una columna o agregar una clave foránea puede romper consultas, bloquear lecturas y escrituras, o fallar con datos de producción. La mayoría de estos cambios son difíciles de deshacer.

Una instancia de Workbench le brinda su esquema real para experimentar. Pruebe el cambio, ejecute sus joins y consultas contra ella, siga las claves foráneas y vea qué tablas son grandes y cuáles son tablas de búsqueda. Si algo se rompe, elimine la instancia y cree otra.

Con los datos sintéticos predeterminados, no se requiere una revisión de privacidad, porque Workbench no contiene ninguno de sus datos de cliente.

## Limitaciones {#limitations}

Workbench responde preguntas sobre esquemas, planes de consulta y costos relativos. No reproduce hardware de producción, datos ni todos los objetos de esquema.

- **Solo se admite Postgres.** Workbench admite Postgres 12 a 18. No se admiten otros motores de base de datos.
- **Los tiempos pueden variar.** Las instancias son pequeñas y no tienen el tamaño de su hardware de producción. Compare la forma del plan, las estimaciones de filas, el uso de índices y los resultados de antes y después, no los tiempos absolutos como "esta consulta tarda 40ms". Para evaluar una reescritura o un índice, utilice [Bits Database Optimization][4].
- **Los datos generados son aproximados.** De forma predeterminada, Workbench genera filas a partir de estadísticas recopiladas, por lo que los tamaños de las tablas son cercanos a los de producción. El sesgo, la correlación de columnas y las distribuciones de valores pueden diferir, lo que puede cambiar los planes que dependen de ellos. Poblar Workbench con sus propios datos evita esto.
- **Es posible que falten algunos índices y claves foráneas.** Workbench puede omitir un índice o una clave foránea, o descartar una expresión que llame a una función no disponible.
- **Las vistas, funciones, disparadores, roles y permisos no se reconstruyen.** Los cambios que dependen de ellos no se reproducen con precisión.
- **Las instancias son temporales.** Las instancias caducan después de 30 minutos de forma predeterminada, así que vuelva a crear cualquiera que necesite conservar. Los esquemas con más de una cierta cantidad de tablas no se materializan por completo.

Utilice Workbench para verificar la estructura, los planes de consulta y los efectos de orden de magnitud. No cubre otros efectos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/database_monitoring/schema_explorer/
[2]: /es/mcp_server/
[3]: /es/database_monitoring/query_metrics/
[4]: /es/database_monitoring/bits_database_optimization/
[5]: /es/database_monitoring/
[6]: /es/account_management/rbac/permissions/
[7]: /es/mcp_server/setup/