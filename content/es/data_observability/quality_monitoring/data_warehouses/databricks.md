---
aliases:
- /es/data_observability/datasets/?tab=databricks
description: Conecta Databricks a Datadog Data Observability para la monitorización
  de la calidad de los datos, el seguimiento de su uso y detección de problemas.
further_reading:
- link: /data_observability/
  tag: Documentación
  text: Información general sobre Data Observability
title: Databricks
---

<div class="alert alert-info">La integración de Quality Monitoring con Databricks solo es compatible con Unity Catalog. Ponte en contacto con tu representante de cuenta si utilizas Hive Metastore.</div>

## Información general

La integración de Databricks conecta Datadog a tu espacio de trabajo de Databricks para sincronizar metadatos y métricas a nivel de tabla. Utilízala para monitorizar la actualidad de los datos, detectar anomalías y rastrear el linaje en todo tu stack tenonológico de datos.

**Nota**: Las instrucciones a continuación son para Quality Monitoring. Para Jobs Monitoring, consulta [Activación de Data Observability: Jobs Monitoring para Databricks][1].

## Configura tu cuenta en Databricks

### Paso 1: Conectar el cuadro de integración de Databricks

1. Completa las instrucciones de instalación de la [documentación de integración de Databricks][2] mediante el cuadro de integración de Datadog. Toma nota del ID de la aplicación principal del servicio y guárdalo en un lugar seguro, ya que se hará referencia a él más adelante.

   **Nota**: Los permisos de administrador del espacio de trabajo no son necesarios para Quality Monitoring.

2. Al configurar la integración, activa la casilla **Data Observability**.
3. Haz clic en **Save Databricks Workspace** (Guardar espacio de trabajo de Databricks).

### Paso 2: Conceder acceso

En primer lugar, concede acceso a los esquemas del sistema para el linaje:
```sql
GRANT USE CATALOG ON CATALOG system TO `<application_id>`;
GRANT USE SCHEMA ON CATALOG system TO `<application_id>`;
GRANT SELECT ON CATALOG system TO `<application_id>`;
```

A continuación, concede acceso de solo lectura al ámbito de datos que desees monitorizar:

{{< tabs >}}
{{% tab "Full catalog access" %}}

Utiliza la opción de acceso completo al catálogo para una configuración más sencilla. Incluye automáticamente las tablas futuras sin necesidad de actualizar los permisos.


```sql
GRANT USE_CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
GRANT USE_SCHEMA ON CATALOG <catalog_name> TO `<application_id>`;
GRANT SELECT ON CATALOG <catalog_name> TO `<application_id>`;
```

{{% /tab %}}
{{% tab "Specific tables" %}}

Utiliza la opción de tablas específicas para acceder con menos privilegios o si solo necesitas monitorizar un subconjunto de sus datos. Debes actualizar los permisos cuando añadas nuevas tablas.

```sql
GRANT USE_CATALOG ON CATALOG <catalog_name> TO `<application_id>`;
GRANT USE_SCHEMA ON SCHEMA <catalog_name>.<schema_name> TO `<application_id>`;
GRANT SELECT ON TABLE <catalog_name>.<schema_name>.<table_name> TO `<application_id>`;
```

{{% /tab %}}
{{< /tabs >}}

Estos permisos son necesarios por las siguientes razones:

- `GRANT USE_CATALOG` para navegar por el catálogo y detectar esquemas.
- `GRANT USE_SCHEMA` es necesario para enumerar las tablas y monitorizar el estado a nivel de esquema.
- `GRANT SELECT` para controlar la calidad de los datos, como SQL personalizado o checks de distribución.

## Siguientes pasos

Una vez configurada la integración, Datadog empieza a sincronizar los metadatos y el linaje a nivel de columna en segundo plano. Las sincronizaciones iniciales pueden tardar varias horas, dependiendo del tamaño de tu despliegue de Databricks.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/data_observability/jobs_monitoring/databricks/
[2]: /es/integrations/databricks/