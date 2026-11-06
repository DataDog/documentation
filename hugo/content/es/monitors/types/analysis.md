---
description: Alerta sobre el análisis avanzado de registros con monitores de análisis
  que admiten consultar múltiples fuentes de datos, encadenar transformaciones de
  datos y ejecutar consultas SQL complejas.
further_reading:
- link: /notebooks/advanced_analysis/
  tag: Documentación
  text: Análisis avanzado de Notebooks
- link: /monitors/configuration/
  tag: Documentación
  text: Aprenda a configurar monitores
- link: /monitors/notify/
  tag: Documentación
  text: Configure las notificaciones de seguimiento
site_support_id: advanced_analysis
title: Monitor de análisis
---
## Descripción general {#overview}

Los monitores de análisis ofrecen acceso completo a las funciones de análisis de Notebooks y DDSQL, lo que le permite alertar sobre patrones de datos complejos que los monitores estándar podrían pasar por alto. Con los monitores de análisis, usted puede:

- Consultar múltiples fuentes de datos
- Encadenar transformaciones de datos
- Ejecutar consultas SQL complejas
- Crear flujos de trabajo de análisis sofisticados

## Fuentes de datos admitidas {#supported-data-sources}

Los monitores de análisis admiten un subconjunto de las fuentes de datos disponibles en las celdas de análisis de Notebooks y las consultas DDSQL. Debido a que los monitores evalúan sus consultas con frecuencia, cada fuente de datos se habilita solo después de que se valida que puede manejar la carga de consultas a nivel de monitor.

Se admiten las siguientes fuentes de datos:

- Agent Observability
- Auditoría
- CI Pipelines
- Pruebas de CI
- Eventos
- Agent Observability
- Logs
- Métricas
- NetFlow
- Network
- Tablas de referencia
- RUM
- Verificaciones de servicio
- Tramos

Los análisis publicados solo se admiten cuando cada fuente de datos de la que dependen también es compatible.

Los registros almacenados en Flex Logs no son compatibles para el monitoreo. 

Las fuentes de datos no compatibles incluyen: 
- Uso de IA
- Cloud Cost
- Consultas de base de datos
- Métricas DORA
- Errores
- Recursos de infraestructura
- Grupos de monitores, monitores
- Product Analytics
- Hallazgos de seguridad
- Señales de seguridad
- Consulta de Snowflake
- Sintéticos

Si selecciona un análisis publicado basado en una fuente de datos no compatible, Datadog muestra un error que indica la fuente. Por ejemplo:

`This query is not monitorable because it's based on an unsupported data source for monitoring: Infrastructure Resources.`

Si el análisis se basa en registros en almacenamiento Flex, Datadog muestra este error en su lugar:

`Dataset is based on Flex logs, which are not supported for monitoring.`

## Creación de un seguimiento {#monitor-creation}

Puede crear un monitor de análisis de tres maneras:

### Desde la página de Monitores {#from-the-monitors-page}

Para crear un [monitor de análisis][1] en Datadog, utilice la navegación principal: {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Analysis{{< /ui >}}.

### Desde un Notebook {#from-a-notebook}

Para crear un monitor de análisis directamente desde un Notebook:

1. Abra un Notebook con una celda de análisis que contenga su consulta deseada.
2. En la celda de análisis, haga clic en {{< ui >}}Send To{{< /ui >}}.
3. Seleccione {{< ui >}}Monitors{{< /ui >}}.

Esto le permite convertir su análisis exploratorio en un monitor de alertas.

### Desde el editor de DDSQL {#from-the-ddsql-editor}

Para crear un monitor de análisis directamente desde el editor de DDSQL:

1. Abra el [DDSQL Editor][4] y seleccione la consulta que desee.
2. Haga clic en la flecha desplegable junto a {{< ui >}}Save to dashboard{{< /ui >}}.
3. Seleccione {{< ui >}}Create monitor{{< /ui >}}.

## Defina la consulta {#define-the-query}

1. **Seleccione su análisis publicado**: Seleccione entre los análisis publicados de Notebooks o DDSQL disponibles.
2. **Filtre su análisis publicado**: Filtre sus resultados por columna.
3. **Visualice los resultados**: Visualice el resultado de su consulta antes de establecer las condiciones de alerta.

{{< img src="/monitors/monitor_types/analysis/analysis_monitor_config.png" alt="Ejemplo de configuración de monitor de análisis" style="width:100%;" >}}

## Establezca condiciones de alerta {#set-alert-conditions}

Configure los monitores para que se activen cuando el valor de la consulta supere un umbral y personalice las opciones de alerta avanzadas, como los umbrales de recuperación y los retrasos en la evaluación. Para obtener más información, consulte [Configure Monitors][2].

## Notifications {#notifications}

Para obtener instrucciones detalladas sobre la mensajería de alertas, consulte [Notifications][3].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/analysis
[2]: /es/monitors/configuration/
[3]: /es/monitors/notify/
[4]: https://app.datadoghq.com/ddsql/editor