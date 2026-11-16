---
aliases:
- /es/data_observability/datasets/?tab=databricks
description: Conecte Databricks a Datadog Data Observability para hacer un seguimiento
  de la calidad de los datos, hacer un seguimiento del uso y detectar problemas.
further_reading:
- link: /data_observability/
  tag: Documentación
  text: Descripción general de Data Observability
- link: /monitors/types/data_observability/
  tag: Documentación
  text: Monitores de Data Observability
title: Databricks
---
## Descripción general {#overview}

La integración de Databricks conecta Datadog a su área de trabajo de Databricks para sincronizar metadatos y métricas a nivel de tabla. Úsela para hacer un seguimiento de la frescura de los datos, detectar anomalías y rastrear el linaje en toda su pila de datos.

**Nota**: Las instrucciones a continuación son para Quality Monitoring. Para Jobs Monitoring, consulte [Habilite Data Observability: Jobs Monitoring para Databricks][1].

## Requisitos previos {#prerequisites}

Si su área de trabajo de Databricks restringe el acceso a la red por IP, agregue las IP del webhook de Datadog a su lista de permitidos. Para obtener la lista de IPs, consulte la sección `webhooks` de {{< region-param key="ip_ranges_url" link="true" text="IP ranges list" >}}.

## Configure su cuenta en Databricks {#set-up-your-account-in-databricks}

### Paso 1 - Conecte el mosaico de integración de Databricks {#step-1-connect-the-databricks-integration-tile}

1. Complete las instrucciones de instalación en la [documentación de integración de Databricks][2] usando el mosaico de integración de Datadog. Tome nota del ID de aplicación de la entidad de servicio y guárdelo en un lugar seguro, ya que se hará referencia a él más adelante.

   **Nota**: No se requieren permisos de administrador del área de trabajo para Quality Monitoring.

2. Al configurar la integración, active el interruptor {{< ui >}}Data Observability{{< /ui >}}.
3. Haga clic en {{< ui >}}Save Databricks Workspace{{< /ui >}}.

### Paso 2 - Otorgue acceso {#step-2-grant-access}

En Databricks, abra {{< ui >}}SQL Editor{{< /ui >}} para ejecutar los siguientes comandos. Use el ID de aplicación (cliente) de la entidad de servicio, no su nombre para mostrar, dondequiera que aparezca `<application_id>`.

Primero, otorgue acceso a los esquemas del sistema para el linaje:

```sql
GRANT USE CATALOG ON CATALOG system TO `<application_id>`;
GRANT USE SCHEMA ON CATALOG system TO `<application_id>`;
GRANT SELECT ON CATALOG system TO `<application_id>`;
```

Estas concesiones cubren todo el catálogo `system`, que incluye la [tabla del sistema de historial de consultas][4] (`system.query.history`). Datadog lee el historial de consultas de esta tabla para crear el linaje entre sus tablas y brindarle visibilidad sobre las consultas que se ejecutan en ellas. Para leer el texto de la consulta en esa tabla, la entidad de servicio también necesita la membresía de grupo descrita en el [Paso 3](#step-3---grant-access-to-query-text).

Luego, otorgue acceso de solo lectura al contexto de los datos que desea monitorear:

{{< tabs >}}
{{% tab "Acceso completo al catálogo" %}}

Utilice la opción de acceso completo al catálogo para una configuración más sencilla. Incluye automáticamente tablas futuras sin necesidad de actualizar los permisos.


```sql
GRANT USE CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
GRANT USE SCHEMA ON CATALOG <catalog_name> TO `<application_id>`;
GRANT SELECT ON CATALOG <catalog_name> TO `<application_id>`;
```

{{% /tab %}}
{{% tab "Tablas específicas" %}}

Utilice la opción de tablas específicas para un acceso de privilegios mínimos o si solo necesita hacer un seguimiento de un subconjunto de sus datos. Debe actualizar los permisos al agregar nuevas tablas.

```sql
GRANT USE CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
GRANT USE SCHEMA ON SCHEMA <catalog_name>.<schema_name> TO `<application_id>`;
GRANT SELECT ON TABLE <catalog_name>.<schema_name>.<table_name> TO `<application_id>`;
```

{{% /tab %}}
{{< /tabs >}}

Estos permisos son necesarios por las siguientes razones:

- `GRANT USE CATALOG` es necesario para navegar por el catálogo y descubrir esquemas.
- `GRANT USE SCHEMA` es necesario para enumerar tablas y hacer un seguimiento del estado a nivel de esquema.
- `GRANT SELECT` es necesario para hacer un seguimiento de la calidad de los datos, como SQL personalizado o comprobaciones de distribución.

### Paso 3 - Otorgar acceso al texto de la consulta {#step-3-grant-access-to-query-text}

Databricks enmascara el texto de la consulta SQL para cualquier principal que no sea un administrador de cuenta o un miembro del grupo a nivel de cuenta `databricks_pii_access`. Para un principal enmascarado, el texto de la consulta se devuelve como `<Redacted>` en la columna `statement_text` de `system.query.history`, la [Query History API][5], la [List Queries API][6] y los eventos de registro de auditoría que capturan el texto de la sentencia SQL.

Agregue la entidad de servicio a `databricks_pii_access` para usar las siguientes capacidades, que leen el texto de la consulta:

- **Linaje de datos**: Complementado mediante el parseo del texto de la consulta desde el historial de consultas de Databricks.
- **Hacer un seguimiento de trabajos sin servidor de Databricks**: Hacer un seguimiento de trabajos que se ejecutan en [cómputo sin servidor][7], donde no se ejecuta ningún Datadog Agent en el clúster.
- **SQL warehouse & query monitoring**: Visibilidad de las consultas que se ejecutan en sus SQL warehouses y recomendaciones de optimización generadas por Datadog.

Las métricas a nivel de tabla, como la frescura, el recuento de filas y las estadísticas de columnas, leen los datos y metadatos de la tabla en lugar del texto de la consulta, por lo que funcionan sin esta membresía.

La membresía al grupo es necesaria además de las concesiones de catálogo `system` en el [Paso 2](#step-2---grant-access). Una entidad que está en el grupo pero carece de `SELECT` en `CATALOG system` aún no puede leer el historial de consultas.

Para crear el grupo y agregar la entidad de servicio:

1. El grupo `databricks_pii_access` no existe en una cuenta de Databricks de forma predeterminada, y los administradores del espacio de trabajo no son miembros de él automáticamente. Créelo con el nombre exacto `databricks_pii_access`, el cual distingue entre mayúsculas y minúsculas.
   - Si no administra grupos con SCIM o un proveedor de identidad externo, vaya a {{< ui >}}Account Console{{< /ui >}} > {{< ui >}}User Management{{< /ui >}} > {{< ui >}}Groups{{< /ui >}} > {{< ui >}}Add Group{{< /ui >}}.
   - Si administra grupos con SCIM o un proveedor de identidad externo, cree el grupo allí en su lugar.
1. Agregue el servicio principal del [Paso 1](#step-1---connect-the-databricks-integration-tile) al grupo.

Para obtener más detalles, consulte la documentación de Databricks sobre [la administración de grupos a nivel de cuenta][8].

## Próximos pasos {#next-steps}

Después de configurar la integración, Datadog comienza a sincronizar sus metadatos y el linaje a nivel de columna en segundo plano. Las sincronizaciones iniciales pueden tardar varias horas dependiendo del tamaño de su implementación de Databricks.

Una vez completada la sincronización inicial, cree un [Data Observability monitor][3] para comenzar a recibir alertas sobre frescura, recuento de filas, métricas a nivel de columna y métricas SQL personalizadas.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/data_observability/jobs_monitoring/databricks/
[2]: /es/integrations/databricks/
[3]: /es/monitors/types/data_observability/
[4]: https://docs.databricks.com/aws/en/admin/system-tables/query-history
[5]: https://docs.databricks.com/api/workspace/queryhistory/list
[6]: https://docs.databricks.com/api/workspace/queries/list
[7]: https://docs.databricks.com/aws/en/compute/serverless/
[8]: https://docs.databricks.com/aws/en/admin/users-groups/groups