---
algolia:
  tags:
  - event stream
  - log stream
description: Muestre listas filtrables de eventos y problemas de registros, RUM, eventos
  y otras fuentes en los widgets del tablero.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de tableros mediante JSON
- link: /notebooks/
  tag: Documentación
  text: Notebooks
- link: https://learn.datadoghq.com/courses/discovering-table-list-widgets
  tag: Centro de aprendizaje
  text: Descubrimiento de widgets de Table, listar, SLO y Architecture
title: Widget de listar
widget_type: list_stream
---
El widget de listar muestra una lista de eventos y problemas, que pueden provenir de diversas fuentes como registros, RUM o eventos. Busque y consulte entre fuentes para limitar los eventos que desea que el widget resalte y muestre.

_Widget de listar que muestra problemas de Error Tracking_

{{< img src="dashboards/widgets/list/list_overview.png" alt="Widget de listar que muestra una lista de errores, su recuento de errores y volumen." style="width:50%;">}}

## Configuración {#setup}

{{< img src="dashboards/widgets/list/list_setup.png" alt="Modal de configuración del widget de listar" style="width:100%;">}}

### Configuración {#configuration}

1. Elija el tipo de datos que desea graficar. El widget de listar admite muchas fuentes de datos, dependiendo de qué productos estén habilitados para su organización. Para obtener la lista completa, consulte [Fuentes de datos admitidas](#supported-data-sources).

2. Establezca las preferencias de visualización. En los tableros y cuadernos, elija si su widget tiene un marco de tiempo personalizado o utiliza el marco de tiempo global.

3. Opcional: Asigne un título a su gráfico (o déjelo en blanco para obtener un título sugerido).

### Fuentes de datos admitidas {#supported-data-sources}

Las fuentes de datos disponibles en el menú desplegable de fuentes dependen de qué productos estén habilitados para su organización. La siguiente tabla enumera cada fuente de datos, los datos que muestra y cualquier requisito de producto. Cuando esté disponible, haga clic en una fuente de datos en la tabla para navegar a sus opciones de configuración.

Las fuentes de datos marcadas con _(Vista previa)_ están en Vista previa y podrían no estar disponibles en su organización.

| Fuente de datos | Descripción | Requisitos |
|-------------|-------------|--------------|
| [Audit Trail](#options) | Eventos de auditoría que rastrean la actividad en toda su organización. | Audit Trail |
| [Incidencias](#cases) | Incidencias que rastrean y clasifican el trabajo entre equipos. | Case Management |
| [Implementaciones de CD](#options) _(Vista previa)_ | Ejecuciones de implementación de entrega continua. | CD Visibility |
| [CI Pipeline](#ci-pipeline) | CI pipeline executions. | CI Pipeline Visibility |
| [CI Test](#options) | CI test runs. | Test Optimization |
| [Data Observability](#data-observability-preview) _(Vista previa)_ | Activos de datos, como conjuntos de datos y linaje, de Data Observability. | Data Observability |
| [Database Recommendations](#database-recommendations-preview) _(Vista previa)_ | Recomendaciones de optimización de Database Monitoring. | Database Monitoring |
| [Editor de DDSQL](#notebook-ddsql-editor-reference-tables-and-developer-portal) | Resultados de una consulta DDSQL. | Ninguno |
| [Reglas de detección](#detection-rules-preview) _(Vista previa)_ | Reglas de detección de seguridad. | Cloud SIEM o Cloud Security |
| [Portal para desarrolladores](#notebook-ddsql-editor-reference-tables-and-developer-portal) _(Vista previa)_ | Vistas de entidades de software, incluidos servicios, API y almacenes de datos. | Internal Developer Portal |
| [Eventos](#events) | Eventos del Explorador de eventos. | Ninguno |
| [Incidentes](#incidents) | Incidentes de Incident Management. | Incident Management |
| [Recursos de infraestructura](#infrastructure-resources-preview) _(Vista previa)_ | Recursos de infraestructura, como hosts y contenedores. | Infrastructure Monitoring |
| [Problemas](#issues) | Problemas de Error Tracking en APM, Logs, RUM y otras fuentes. | Error Tracking |
| [Agent Observability](#options) | Trazas y spans de Agent Observability. | Agent Observability |
| [Logs](#logs) | Eventos de log individuales. También puede agrupar registros por patrones o transacciones. | Log Management |
| [Notebook](#notebook-ddsql-editor-reference-tables-and-developer-portal) | Datos de una celda de notebook. | Notebooks |
| [On-Call](#on-call) | Eventos y páginas de On-Call. | Datadog On-Call |
| [Product Analytics](#options) _(Vista previa)_ | Product Analytics events. | Product Analytics |
| [Recommendations](#recommendations) | Recomendaciones de optimización de costos de Cloud Cost Management. | Cloud Cost Management |
| [Tablas de referencia](#notebook-ddsql-editor-reference-tables-and-developer-portal) | Filas de una tabla de referencia. | Tablas de referencia |
| [RUM](#options) | Eventos de Real User Monitoring. | Real User Monitoring |
| [Señales de seguridad](#options) _(Vista previa)_ | Señales de seguridad generadas por reglas de detección. | Cloud SIEM |
| [Spans](#spans-and-watchdog-alerts) | Spans de APM. | APM |
| [Alertas de Watchdog](#spans-and-watchdog-alerts) | Alertas detectadas por Watchdog. | Ninguno |
| [Workload Protection Agent](#workload-protection-agent-preview) _(Vista previa)_ | Eventos de Workload Protection del Datadog Agent. | Workload Protection |

**Nota:** La fuente de datos **Recomendaciones** muestra solo recomendaciones de Cloud Cost Management. Las recomendaciones de APM no están disponibles como fuente de datos del widget de listar. Si Cloud Cost Management no está configurado para su organización, el widget muestra un mensaje de `Not Accessible`. Esto indica que la fuente de datos requiere Cloud Cost Management, en lugar de que usted carezca de permisos.

### Opciones {#options}

Cada fuente de datos tiene su propia configuración. Para la mayoría de las fuentes de datos, usted puede:

- Seleccionar qué **columnas** mostrar.
- **Ordenar** la lista eligiendo una columna y una dirección (ascendente o descendente). Las columnas de ordenación disponibles son las columnas que se muestran en el widget.
- Limitar los resultados con una **consulta de búsqueda**.

Las siguientes fuentes de datos tienen opciones adicionales o diferentes.

{{% collapse-content title="Casos" level="h4" id="cases" expanded=false %}}
Ordenar por (ascendente o descendente):

- Recuento de alertas
- Última creación
- Clave de incidencia
- Última actualización
- Prioridad
- Estado
- Sin asignar
{{% /collapse-content %}}

{{% collapse-content title="CI Pipeline" level="h4" id="ci-pipeline" expanded=false %}}
Seleccione un **Nivel** para mostrar: Pipeline, organizar en etapas, trabajo, definir como pasos o personalizado.
{{% /collapse-content %}}

{{% collapse-content title="Data Observability (Preview)" level="h4" id="data-observability-preview" expanded=false %}}
Seleccione un tipo de entidad (tabla de base de datos o columna de base de datos). Las columnas disponibles y las opciones de ordenamiento dependen del tipo de entidad.
{{% /collapse-content %}}

{{% collapse-content title="Database recommendations (Preview)" level="h4" id="database-recommendations-preview" expanded=false %}}
Ordenar por (ascendente o descendente):

- Gravedad
- Tipo
- Visto por primera vez
- Visto por última vez
{{% /collapse-content %}}

{{% collapse-content title="Reglas de detección (vista previa)" level="h4" id="detection-rules-preview" expanded=false %}}
Las columnas ordenables incluyen Nombre, Fecha de creación, Fecha de última actualización, Habilitado, Gravedad y fuente. También puede seleccionar un producto de regla para filtrar las reglas mostradas.
{{% /collapse-content %}}

{{% collapse-content title="Eventos" level="h4" id="events" expanded=false %}}
Tamaño del formato de informe:

- Pequeño (solo título) (predeterminado)
- Grande (evento completo)
{{% /collapse-content %}}

{{% collapse-content title="Incidentes" level="h4" id="incidents" expanded=false %}}
Ordenar por (ascendente o descendente):

- Creado
- Detectado
- Modificado
- Resuelto
- Gravedad
- Estado
- Título
{{% /collapse-content %}}

{{% collapse-content title="Recursos de infraestructura (Preview)" level="h4" id="infrastructure-resources-preview" expanded=false %}}
Seleccione un **Resource type** para mostrar, como Pods, Containers, Deployments, Services o Nodes. Las columnas disponibles y las opciones de ordenamiento dependen del tipo de recurso.
{{% /collapse-content %}}

{{% collapse-content title="Problemas" level="h4" id="issues" expanded=false %}}
Ordenar por:

- Relevancia (predeterminado)
- Recuento
- Más recientes
- Sesiones afectadas (solo problemas de RUM)

Las columnas disponibles dependen del issue fuente (Logs, APM o RUM).

**Nota:** Cambiar la selección de orden no cambia las columnas mostradas. Para ordenar por sesiones afectadas y verlas en el widget, también debe agregar la columna \"Sesiones afectadas\" en el editor de gráficos.
{{% /collapse-content %}}

{{% collapse-content title="Logs" level="h4" id="logs" expanded=false %}}
Agrupar por:

- Patrones
- Transacciones

Dependiendo de su configuración de logs, también puede seleccionar una ubicación de almacenamiento: Índices estándar, Índices estándar + Flex Logs, o Archivos en línea.

Para la columna de mensaje, puede elegir cuántas líneas mostrar (1, 3 o 10).
{{% /collapse-content %}}

{{% collapse-content title="Notebook, Editor DDSQL, Tablas de referencia y Portal para desarrolladores" level="h4" id="notebook-ddsql-editor-reference-tables-and-developer-portal" expanded=false %}}
Estas fuentes de datos muestran filas de un conjunto de datos o tabla guardado:

- **Notebook** y **DDSQL Editor**: seleccione un conjunto de datos publicado.
- **Tablas de referencia**: seleccione una tabla de referencia.
- **Developer Portal**: seleccione una tabla de entidad de software, como servicios, APIs, o datastores.

Para estas fuentes de datos, puede:

- Establezca **Display first** para limitar el número de filas (10, 25, 50, 100, 500 o 1000, o un valor personalizado).
- Toggle **Show All Columns** o seleccione hasta 12 columnas para mostrar.
- Ordene haciendo clic en el icono de ordenamiento de una columna.
- Filtre las filas con una consulta de búsqueda.
{{% /collapse-content %}}

{{% collapse-content title="On-Call" level="h4" id="on-call" expanded=false %}}
Seleccione un **Equipo** y, opcionalmente, agregue **Etiquetas** para filtrar los eventos mostrados.
{{% /collapse-content %}}

{{% collapse-content title="Recomendaciones " level="h4" id="recommendations" expanded=false %}}
Las columnas para la fuente de datos Recomendaciones son fijas y no se pueden personalizar.
{{% /collapse-content %}}

{{% collapse-content title="Spans y Watchdog Alerts" level="h4" id="spans-and-watchdog-alerts" expanded=false %}}
Estas fuentes de datos admiten una consulta de búsqueda, pero no ofrecen una opción de ordenamiento. Watchdog Alerts muestra un conjunto fijo de campos.
{{% /collapse-content %}}

{{% collapse-content title="Workload Protection Agent (Preview)" level="h4" id="workload-protection-agent-preview" expanded=false %}}
Para la columna Contenido, puede elegir cuántas líneas mostrar (1, 3 o 10).
{{% /collapse-content %}}

## API {#api}

Este widget se puede utilizar con la **[Dashboards API][1]**. Consulte la siguiente tabla para ver la [definición del esquema JSON del widget][2]:

{{< dashboards-widgets-api >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/dashboards/
[2]: /es/dashboards/graphing_json/widget_json/