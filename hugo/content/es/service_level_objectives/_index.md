---
aliases:
- /es/monitors/monitor_uptime_widget/
- /es/monitors/slos/
- /es/monitors/service_level_objectives/
- /es/service_management/service_level_objectives/ootb_dashboard
- /es/service_management/service_level_objectives/
description: Haga un seguimiento del estado de sus SLO.
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-slo
  tag: Centro de aprendizaje
  text: Introducción a Service Level Objectives
- link: https://www.datadoghq.com/blog/service-page/
  tag: Blog
  text: Telemetría de servicio, Error Tracking, SLO y más
- link: https://www.datadoghq.com/blog/monitor-service-performance-with-slo-alerts/
  tag: Blog
  text: Haga un seguimiento proactivo del rendimiento del servicio con alertas de
    SLO
- link: https://www.datadoghq.com/blog/slo-key-questions/
  tag: Blog
  text: Preguntas clave que debe hacer al establecer SLO
- link: https://www.datadoghq.com/blog/define-and-manage-slos/
  tag: Blog
  text: Mejores prácticas para administrar sus SLO con Datadog
- link: https://www.datadoghq.com/blog/burn-rate-is-better-error-rate/
  tag: Blog
  text: La tasa de consumo es una mejor tasa de error
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Diseñe dashboards ejecutivos efectivos con Datadog
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: Blog
  text: Haga un seguimiento del estado y del presupuesto de error de sus SLO con Datadog
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_level_objective
  tag: Sitio externo
  text: Cree y administre SLO con Terraform
title: Service Level Objectives
---
{{< jqmath-vanilla >}}

<br />

{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Registrarse" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=SLOs&tags.topics-1=Monitors">}}
  Explore y regístrese en las sesiones de Foundation Enablement. Aprenda cómo puede priorizar y abordar los problemas que más le importan a su negocio con el seguimiento nativo de SLO y SLA.
{{< /learning-center-callout >}}

## Descripción general {#overview}

Service Level Objectives, o SLO, son una parte clave del conjunto de herramientas de ingeniería de confiabilidad del sitio. Los SLO proporcionan un marco para definir objetivos claros en torno al rendimiento de las aplicaciones, lo que en última instancia ayuda a los equipos a brindar una experiencia al cliente consistente, equilibrar el desarrollo de funciones con la estabilidad de la plataforma y mejorar la comunicación con los usuarios internos y externos.

**Consejo**: Para abrir Service Level Objectives desde la búsqueda global de Datadog, presione <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> y busque `slo`.

## Términos clave {#key-terminology}

Indicador de nivel de servicio (SLI)
: Una medición cuantitativa del rendimiento o la confiabilidad de un servicio. En los SLO de Datadog, un SLI es una métrica o una agregación de uno o más monitores.

Objetivo de nivel de servicio (SLO)
: Un porcentaje objetivo para un SLI durante un período de tiempo específico.

Acuerdo de nivel de servicio (SLA)
: Un acuerdo explícito o implícito entre un cliente y un proveedor de servicios que estipula las expectativas de confiabilidad del cliente y las consecuencias para el proveedor de servicios por no cumplirlas.

Presupuesto de error
: La cantidad permitida de falta de confiabilidad derivada del porcentaje objetivo de un SLO (100% - porcentaje objetivo) que está destinada a invertirse en el desarrollo del producto.

## Tipos de SLO {#slo-types}

Al crear SLO, puede elegir entre los siguientes tipos:
- **SLO basados en métricas**: se pueden usar cuando desea que el cálculo del SLI se base en conteos; el SLI se calcula como la suma de eventos buenos dividida por la suma de eventos totales.
- **SLO basados en monitores**: se pueden usar cuando desea que el cálculo del SLI se base en el tiempo; el SLI se basa en el tiempo de actividad del monitor. Los SLO basados en monitores deben basarse en un monitor de Datadog nuevo o existente; cualquier ajuste debe realizarse en el monitor subyacente (no se puede hacer a través de la creación de SLO).
- **SLO de intervalos de tiempo**: se pueden usar cuando usted desea que el cálculo del SLI se base en el tiempo; el SLI se basa en su definición personalizada de tiempo de actividad (cantidad de tiempo que su sistema muestra un buen comportamiento dividida por el tiempo total). Los SLO de intervalos de tiempo no requieren un monitor de Datadog; puede probar diferentes filtros de métricas y umbrales y explorar instantáneamente el tiempo de inactividad durante la creación del SLO.

Para obtener una comparación completa, consulte el gráfico de [comparación de tipos de SLO][1].

## Configuración {#setup}

Utilice la [página de administración de Service Level Objectives][2] de Datadog para crear nuevos SLO o para visualizar y administrar todos sus SLO existentes.

### Configuración {#configuration}

1. En la [página de administración de SLO][2], seleccione {{< ui >}}New SLO +{{< /ui >}}.
2. Seleccione el tipo de SLO. Puede crear un SLO con cualquiera de los siguientes tipos: [basado en métricas][3], [basado en monitores][4] o [intervalos de tiempo][5].
3. Establezca un objetivo y una ventana de tiempo móvil (últimos 7, 30 o 90 días) para el SLO. Datadog recomienda que haga que el objetivo sea más estricto que sus SLA estipulados. Esta ventana de tiempo se muestra en las listas de SLO. De forma predeterminada, se selecciona la ventana de tiempo más corta.
4. Finalmente, asigne un título al SLO, descríbalo con más detalle o agregue enlaces en la descripción, agregue etiquetas y guárdelo.

Después de configurar el SLO, selecciónelo en la [vista de lista de Service Level Objectives][2] para abrir el panel lateral de detalles. El panel lateral muestra el porcentaje de estado general y el presupuesto de error restante para cada uno de los objetivos del SLO, así como barras de estado (SLO basados en monitores) o gráficos de barras (SLO basados en métricas) del historial del SLI. Si creó un SLO agrupado basado en monitores usando un [monitor de alertas múltiples][6] o un SLO agrupado basado en métrica usando la [cláusula `sum by`][7], el porcentaje de estado y el presupuesto de error restante para cada grupo individual se muestran además del porcentaje de estado general y el presupuesto de error restante.

**Ejemplo:** Si crea un SLO basado en monitores para hacer un seguimiento de la latencia por zona de disponibilidad, se muestran los porcentajes de estado y el presupuesto de error restante tanto para el SLO general como para cada zona de disponibilidad individual que el SLO está monitoreando.

**Nota:** El presupuesto de error restante se muestra como un porcentaje y se calcula utilizando la siguiente fórmula:

$$\\text\"presupuesto de error restante\" = 100 * {\\text\"estado actual\" - \\text\" objetivo\"} / { 100 - \\text\"objetivo\"}$$

### Configuración de objetivos de SLO {#setting-slo-targets}

Para aprovechar los beneficios de los presupuestos de error y las alertas de presupuesto de error, debe establecer valores objetivo de SLO estrictamente por debajo del 100%.

Establecer un objetivo del 100% significa tener un presupuesto de error del 0%, ya que el presupuesto de error es igual al 100%—objetivo de SLO. Sin un presupuesto de error que represente un riesgo aceptable, usted enfrentará dificultades para encontrar una alineación entre las prioridades conflictivas de mantener la confiabilidad orientada al cliente e invertir en el desarrollo de funciones. Además, los SLO con valores objetivo del 100% provocan errores de división por cero en la evaluación de alertas de SLO.

**Nota:** La cantidad de decimales que puede especificar para sus SLO varía según el tipo de SLO y las ventanas de tiempo que elija. Consulte los enlaces a continuación para obtener más información sobre cada tipo de SLO respectivo.

[Monitor-based SLOs][8]: Up to two decimal places are allowed for 7-day and 30-day targets, up to three decimal places are allowed for 90-day targets.

[Metric-based SLOs][9]: Up to three decimal places are allowed for all targets.

## Permisos {#permissions}

### Acceso basado en roles {#role-based-access}

Todos los usuarios pueden visualizar los SLO y las [correcciones de estado de SLO](#slo-status-corrections), independientemente de su [rol][10] asociado. Solo los usuarios vinculados a roles con el permiso `slos_write` pueden crear, editar y eliminar SLO.

Para crear, editar y eliminar correcciones de estado, los usuarios requieren los permisos `slos_corrections`. Un usuario con este permiso puede realizar correcciones de estado, incluso si no tiene permiso para editar esos SLO. Para obtener la lista completa de permisos, consulte la [documentación de RBAC][11].

### Controles de acceso granulares {#granular-access-controls}

Restrinja el acceso a SLO individuales especificando una lista de [roles][10] que tienen permitido editarlo.

{{< img src="service_level_objectives/slo_set_permissions.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Opción de permisos de SLO en el menú de configuración">}}

1. Haga clic en el SLO para abrir el panel lateral de detalles.
1. Haga clic en el icono de engranaje en la parte superior derecha del panel.
1. Seleccione {{< ui >}}Permissions{{< /ui >}}.
1. Haga clic en {{< ui >}}Restrict Access{{< /ui >}}.
1. El cuadro de diálogo se actualiza para mostrar que todos en su organización tienen acceso completo de forma predeterminada.
1. Utilice el menú desplegable para seleccionar uno o más roles, equipos o usuarios que puedan editar el SLO.
1. Haga clic en {{< ui >}}Add{{< /ui >}}.
1. El cuadro de diálogo se actualiza para mostrar que el rol que seleccionó tiene el permiso {{< ui >}}Editor{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}

Para mantener su acceso de edición al SLO, el sistema requiere que incluya al menos un rol del que usted sea miembro antes de guardar. Los usuarios en la lista de control de acceso pueden agregar roles y solo pueden eliminar roles que no sean el suyo.

**Nota**: Los usuarios pueden crear SLO en cualquier monitor incluso si no tienen permisos de escritura para el monitor. De manera similar, los usuarios pueden crear alertas de SLO incluso si no tienen permisos de escritura para los SLO. Para obtener más información sobre los permisos de RBAC para Monitors, consulte la [documentación de RBAC][12] o la [guía sobre cómo configurar RBAC para Monitors][13].

## Edición de un SLO {#editing-an-slo}

Para editar un SLO, coloque el cursor sobre la fila del SLO en la lista y haga clic en el icono de lápiz de edición que aparece a la derecha de la fila, o haga clic en la fila para abrir el panel lateral de detalles y seleccione el botón de edición en el icono de engranaje en la parte superior derecha del panel.

## Búsqueda de SLO {#searching-slos}

La [página de administración de Service Level Objectives][2] le permite ejecutar una búsqueda avanzada de todos los SLO para que pueda encontrar, visualizar, editar, clonar o eliminar SLO desde los resultados de búsqueda.

La búsqueda avanzada le permite consultar los SLO mediante cualquier combinación de atributos de SLO:

* `name` y `description` - búsqueda de texto
* `time window` - 7d, 30d, 90d
* `type` - métrica, monitor
* `creator`
* `tags` - centro de datos, entorno, servicio, equipo, etc.

Para ejecutar una búsqueda, use las casillas de verificación de faceta a la izquierda y la barra de búsqueda en la parte superior. Cuando marca las casillas, la barra de búsqueda se actualiza con la consulta equivalente. Del mismo modo, cuando modifica la consulta de la barra de búsqueda (o escribe una desde cero), las casillas de verificación se actualizan para reflejar el cambio. Los resultados de la consulta se actualizan en tiempo real a medida que edita la consulta; no hay ningún botón "Buscar" para hacer clic.

## Recuperación de SLO eliminados {#recovering-deleted-slos}

<div class="alert alert-warning">Los SLO generados automáticamente para las <a href="/synthetics/test_suites/#service-level-objectives">pruebas Synthetic</a> no se pueden restaurar.</div>

Los SLO eliminados se conservan durante 30 días antes de ser eliminados permanentemente. Para restaurar un SLO eliminado recientemente:

1. En la [página de administración de SLO][2], haga clic en el icono de engranaje **Settings** en la esquina superior derecha.
1. Seleccione el o los SLO que desea restaurar.
1. Haga clic en {{< ui >}}Restore{{< /ui >}}.

**Nota**: Las correcciones de estado de SLO eliminadas no se pueden restaurar. Este proceso de recuperación se aplica solo a los SLO eliminados.

## Visualizar SLO {#viewing-slos}

Agrupe sus SLO por *cualquier* etiqueta para obtener una vista de resumen de sus datos. Puede analizar rápidamente cuántos SLO se encuentran en cada estado (incumplido, advertencia, OK y sin datos), agrupados por servicio, equipo, recorrido del usuario, nivel o cualquier otra etiqueta establecida en sus SLO.

{{< img src="service_level_objectives/slo_group_by_new.png" alt="Vista de resumen de SLO agrupados por equipo" style="width:100%;" >}}

Ordene los SLO por las columnas {{< ui >}}status{{< /ui >}} y {{< ui >}}Error Budget Left{{< /ui >}} para priorizar cuáles SLO requieren su atención. La lista de SLO muestra los detalles de los SLO durante la ventana de tiempo principal seleccionada en su [configuración](#configuration). Todas las demás ventanas de tiempo de configuración están disponibles para visualizar en el panel lateral individual. Abra el panel lateral de detalles del SLO haciendo clic en la fila de la tabla correspondiente.

**Nota**: Puede visualizar sus SLO desde la pantalla de inicio de su dispositivo móvil descargando la [aplicación móvil de Datadog][14], disponible en [Apple App Store][15] y [Google Play Store][16].

{{< img src="service_level_objectives/slos-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="SLO en iOS y Android">}}

### Etiquetas de SLO {#slo-tags}

Las etiquetas de SLO se pueden usar para filtrar en la [página de administración de SLO][2], crear [vistas guardadas de SLO][17] o agrupar SLO para visualizar. Las etiquetas se pueden agregar a los SLO de las siguientes maneras:

- Al crear o editar un SLO, puede agregar etiquetas
- Desde la visualización de lista de SLO, puede agregar y actualizar etiquetas de forma masiva usando el {{< ui >}}Edit Tags{{< /ui >}} y las opciones del menú desplegable [{{< ui >}}Edit Teams{{< /ui >}}][18] en la parte superior de la lista de SLO.

{{< img src="service_level_objectives/slo_bulk_tag.png" alt="La página de lista de SLO muestra el menú desplegable \"Edit Tag\" para la edición masiva de etiquetas." >}}

### Indicador de tasa de consumo de SLO {#slo-burn-rate-indicator}

Los indicadores de tasa de consumo utilizan una ventana móvil de 2 horas para evaluar qué SLO están consumiendo su presupuesto de error demasiado rápido. Los indicadores de tasa de consumo aparecen junto a los nombres de los SLO correspondientes en la [página de administración de SLO][2].

{{< img src="service_level_objectives/slo_burn_rate_indicator.png" alt="La página de administración de SLO en Datadog. Un ícono rojo aparece junto al nombre de un SLO en la lista. Al pasar el mouse sobre el ícono rojo se muestra un modal con más información, una visualización de la tasa de consumo y un enlace a la página de servicio correspondiente del SLO." style="width:80%;" >}}

Existen dos tipos de indicadores posibles:
- Un ícono rojo que indica una tasa de consumo crítica superior a 6 en las últimas 2 horas.
- Un ícono amarillo que indica una tasa de consumo elevada entre 1 y 6 en las últimas 2 horas.

Un gráfico visual acompaña a cada indicador para mostrar dónde se ubica la tasa de consumo en relación con los umbrales elevado y crítico, lo que permite una evaluación rápida de la gravedad.

Los SLO se pueden filtrar por estado de tasa de consumo: Crítico, Elevado y Saludable. Para los SLO con una etiqueta de servicio, cada indicador de tasa de consumo incluye un enlace directo a la página de servicio relacionada para una investigación adicional.

### Vista predeterminada de SLO {#slo-default-view}

La vista de SLO predeterminada se carga cuando accede a la vista de lista de SLO.

La vista predeterminada incluye:

- Una consulta de búsqueda vacía
- Una lista de todos los SLO definidos en su organización
- Una lista de facetas disponibles en la lista de facetas del lado izquierdo

### Vistas guardadas {#saved-views}

Las vistas guardadas le permiten guardar y compartir búsquedas personalizadas en la vista de lista de SLO para los SLO que son más relevantes para usted y su equipo mediante el uso compartido de:

- Una consulta de búsqueda
- Un subconjunto seleccionado de facetas

Después de consultar un subconjunto de SLO en la vista de lista, puede agregar esa consulta como una vista guardada.

#### Agregar una vista guardada {#add-a-saved-view}

Para agregar una vista guardada:

1. Consulte sus SLO.
2. Haga clic en {{< ui >}}Save{{< /ui >}} en la parte superior izquierda de la página.
3. Asigne un nombre a su vista y guárdela.

#### Cargar una vista guardada {#load-a-saved-view}

Para cargar una vista guardada, abra el panel {{< ui >}}Saved Views{{< /ui >}} presionando el botón {{< ui >}}Views{{< /ui >}} en la parte superior izquierda de la página y seleccione una vista guardada de la lista. También puede buscar vistas guardadas en el cuadro de búsqueda {{< ui >}}Filter Saved Views{{< /ui >}} en la parte superior de ese mismo panel {{< ui >}}Saved Views{{< /ui >}}.

#### Compartir una vista guardada {#share-a-saved-view}

Coloque el cursor sobre una vista guardada de la lista y seleccione el icono de hipervínculo para copiar el enlace a la vista guardada y compartirlo con los miembros de su equipo.

#### Administrar vistas guardadas {#manage-saved-views}

Una vez que esté usando una vista guardada, puede actualizarla seleccionando esa vista guardada, modificando la consulta y haciendo clic en el botón {{< ui >}}Update{{< /ui >}} debajo de su nombre en el panel {{< ui >}}Saved Views{{< /ui >}}. Para cambiar el nombre de la vista guardada o eliminar una vista guardada, coloque el cursor sobre su fila en el panel {{< ui >}}Saved Views{{< /ui >}} y haga clic en el icono de lápiz o en el icono de papelera, respectivamente.

## Eventos de auditoría de SLO y corrección de estado de SLO {#slo-and-slo-status-correction-audit-events}

Los eventos de auditoría de SLO le permiten realizar un seguimiento del historial de sus configuraciones de SLO mediante el [Event Explorer][27] o la pestaña {{< ui >}}Audit History{{< /ui >}} en los detalles de SLO. Los eventos de auditoría se agregan al Event Explorer cada vez que crea, modifica o elimina un SLO o una corrección de estado de SLO. Cada evento incluye información sobre la configuración de un SLO o una corrección de estado de SLO, y el flujo proporciona un historial de los cambios de configuración a lo largo del tiempo.

### Eventos de auditoría de SLO {#slo-audit-events}

Cada evento incluye la siguiente información de configuración de SLO:

- Nombre
- Descripción
- Porcentajes objetivo y ventanas de tiempo
- Fuentes de datos (ID de monitor o consulta de métricas)

Tres tipos de eventos de auditoría de SLO aparecen en el Event Explorer:

Los eventos - `SLO Created` muestran la información de configuración del SLO en el momento de la creación
Los eventos - `SLO Modified` muestran qué información de configuración cambió durante una modificación
Los eventos - `SLO Deleted` muestran la información de configuración que tenía el SLO antes de ser eliminado

### Eventos de auditoría de corrección de estado {#status-correction-audit-events}

Cada evento incluye la siguiente información de configuración de corrección de estado de SLO:

- Nombre del SLO
- Horas de inicio y finalización de la corrección de estado con zona horaria
- Categoría de corrección de estado

Tres tipos de eventos de auditoría de corrección de estado de SLO aparecen en el Event Explorer:

Los eventos - `SLO Correction Created` muestran la información de configuración de la corrección de estado en el momento de la creación
Los eventos - `SLO Correction Modified` muestran qué información de configuración cambió durante una modificación
Los eventos - `SLO Correction Deleted` muestran la información de configuración que tenía la corrección de estado antes de ser eliminada

Para obtener una lista completa de todos los eventos de auditoría de SLO, ingrese la consulta de búsqueda `tags:(audit AND slo)` en el Event Explorer. Para visualizar la lista de eventos de auditoría para un SLO específico, ingrese `tags:audit,slo_id:<SLO ID>` con el ID del SLO deseado. También puede consultar el Event Explorer mediante programación utilizando la [API de eventos de Datadog][19].

**Nota:** Si no ve que los eventos aparezcan en la UI, asegúrese de establecer el marco de tiempo del Event Explorer en un período más largo, por ejemplo, los últimos 7 días.

{{< img src="service_level_objectives/slo-audit-events.png" alt="Eventos de auditoría de SLO" >}}

También puede usar la pestaña {{< ui >}}Audit History{{< /ui >}} en los detalles del SLO para visualizar todos los eventos de auditoría para un SLO individual:

{{< img src="service_level_objectives/slo_audit_history_tab.png" alt="Pestaña de historial de auditoría de detalles de SLO" >}}

Con los [monitores de eventos][28], puede configurar notificaciones para hacer un seguimiento de los eventos de auditoría de SLO. Por ejemplo, si desea recibir una notificación cuando se modifique la configuración de un SLO específico, configure un monitor de eventos para hacer un seguimiento del texto `[SLO Modified]` sobre las etiquetas `audit,slo_id:<SLO ID>`.

## Widgets de SLO {#slo-widgets}

Después de crear su SLO, puede visualizar los datos a través de tableros y widgets.
  - Utilice el widget de SLO para visualizar el estado de un solo SLO.
  - Utilice el widget de lista de SLO para visualizar un conjunto de SLO.
  - Grafique 15 meses de datos de SLO basados en métricas con la [fuente de datos de SLO][20] tanto en widgets de series temporales como escalares (valor de consulta, lista principal, tabla, cambio).

Para obtener más información sobre los widgets de SLO, consulte las páginas de [widget de SLO][21] y [widget de Lista de SLO][22]. Para obtener más información sobre la fuente de datos de SLO, consulte la guía sobre cómo [graficar datos históricos de SLO en tableros][20].

## Correcciones de estado de SLO {#slo-status-corrections}

Las correcciones de estado le permiten excluir periodos de tiempo específicos de los cálculos del estado de SLO y del presupuesto de error. De esta manera, usted puede:
- Evite que el tiempo de inactividad esperado, como el mantenimiento programado, agote su presupuesto de error.
- Ignore las horas fuera del horario laboral, en las que no se espera que cumpla con sus SLO.
- Asegúrese de que los problemas temporales causados por implementaciones no afecten negativamente sus SLO.

Cuando aplica una corrección, el periodo de tiempo que especifica se elimina del cálculo del SLO.
- Para los SLO basados en monitores, no se cuenta la ventana de tiempo de corrección.
- Para los SLO basados en métricas, no se cuentan todos los eventos buenos y malos en la ventana de corrección.
- Para los SLO de Time Slice, la ventana de tiempo de corrección se trata como tiempo de actividad.

Usted tiene la opción de crear correcciones únicas para ajustes ad hoc, o correcciones recurrentes para ajustes predecibles que ocurren con una frecuencia regular. Las correcciones únicas requieren una hora de inicio y de finalización, mientras que las correcciones recurrentes requieren una hora de inicio, una duración y un intervalo. Las correcciones recurrentes se basan en la [especificación RRULE de iCalendar RFC 5545][24]. Las reglas admitidas son `FREQ`, `INTERVAL`, `COUNT` y `UNTIL`. Especificar una fecha de finalización para las correcciones recurrentes es opcional en caso de que necesite que la corrección se repita indefinidamente.

Para cualquiera de los tipos de corrección, debe seleccionar una categoría de corrección que indique por qué se está realizando la corrección. Las categorías disponibles son {{< ui >}}Scheduled Maintenance{{< /ui >}}, {{< ui >}}Outside Business Hours{{< /ui >}}, {{< ui >}}Deployment{{< /ui >}} y {{< ui >}}Other{{< /ui >}}. Opcionalmente, puede incluir una descripción para proporcionar contexto adicional si es necesario.

Cada SLO tiene un límite máximo de correcciones que se pueden configurar para garantizar el rendimiento de las consultas. Estos límites solo se aplican a los últimos 90 días por SLO, por lo que las correcciones para períodos de tiempo anteriores a los últimos 90 días no cuentan para su límite. Esto significa que:
- Si la hora de finalización de una corrección única es anterior a los últimos 90 días, sí cuenta para su límite.
- Si la hora de finalización de la repetición final de una corrección recurrente es anterior a los últimos 90 días, no cuenta para su límite.

Los límites de 90 días por SLO son los siguientes:

| Tipo de corrección   | Límite por SLO |
| ----------------- | ------------- |
| Única          | 100           |
| Recurrente diaria   | 2             |
| Recurrente semanal  | 3             |
| Recurrente mensual | 5             |

Puede configurar correcciones de estado a través de la interfaz de usuario seleccionando {{< ui >}}Correct status{{< /ui >}} en el panel lateral de su SLO, la [API de correcciones de estado de SLO][25] o un [recurso de Terraform][26].

#### Acceso en la UI {#access-in-the-ui}

Para acceder a las correcciones de estado de SLO en la UI:

1. Cree un nuevo SLO o haga clic en uno existente.
2. Navegue a la vista de detalles del SLO en el panel lateral.
3. Debajo del icono de engranaje, seleccione {{< ui >}}Correct status{{< /ui >}} para abrir el modal de creación de correcciones.
4. Seleccione {{< ui >}}Correction Category{{< /ui >}}.
5. Elija entre {{< ui >}}One-Time{{< /ui >}} y {{< ui >}}Recurring{{< /ui >}} en el {{< ui >}}Select the Time Correction Window{{< /ui >}}, y especifique el período de tiempo que desea corregir.
6. Opcionalmente, agregue {{< ui >}}Notes{{< /ui >}}.
7. Haga clic en {{< ui >}}Apply Correction{{< /ui >}}.

{{< img src="service_level_objectives/slo-corrections-ui.png" alt="Interfaz de usuario de corrección de SLO" style="width:80%;">}}

Para visualizar, editar y eliminar correcciones de estado existentes, haga clic en la pestaña {{< ui >}}Corrections{{< /ui >}} en la parte superior del panel lateral detallado de un SLO.

#### Visualización de correcciones de estado {#visualizing-status-corrections}

Para los SLO con correcciones de estado, hay un interruptor en la vista de detalles del SLO que le permite habilitar o deshabilitar las correcciones en la UI. El interruptor controla los gráficos y los datos en la sección {{< ui >}}Performance{{< /ui >}} de la vista de detalles del SLO. **Nota:** El estado general de su SLO y el presupuesto de error siempre tomarán en cuenta las correcciones de estado.

{{< img src="service_level_objectives/correction-toggle.png" alt="Interfaz de usuario de corrección de SLO" style="width:100%;">}}

## Visualización de calendario de SLO {#slo-calendar-view}

La visualización de calendario de SLO está disponible en la [página de administración de SLO][2]. En la esquina superior derecha, cambie de la vista {{< ui >}}Primary{{< /ui >}} a la vista {{< ui >}}Daily{{< /ui >}}, {{< ui >}}Weekly{{< /ui >}} o {{< ui >}}Monthly{{< /ui >}} para ver 12 meses de datos históricos del estado del SLO. La visualización de calendario es compatible con los SLO basados en métricas y los SLO de Time Slice.

{{< img src="service_level_objectives/slo-calendar-view-2.png" alt="Visualización de calendario de SLO" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_level_objectives/guide/slo_types_comparison/
[2]: https://app.datadoghq.com/slo
[3]: /es/service_level_objectives/metric/
[4]: /es/service_level_objectives/monitor/
[5]: /es/service_level_objectives/time_slice/
[6]: /es/monitors/types/metric/?tab=threshold#alert-grouping
[7]: /es/service_level_objectives/metric/#define-queries
[8]: /es/service_level_objectives/monitor/#set-your-slo-targets
[9]: /es/service_level_objectives/metric/#set-your-slo-targets
[10]: /es/account_management/rbac/
[11]: /es/account_management/rbac/permissions/#service-level-objectives/
[12]: /es/account_management/rbac/permissions/#monitors
[13]: /es/monitors/guide/how-to-set-up-rbac-for-monitors/
[14]: /es/mobile
[15]: https://apps.apple.com/app/datadog/id1391380318
[16]: https://play.google.com/store/apps/details?id=com.datadog.app
[17]: /es/service_level_objectives/#saved-views
[18]: /es/account_management/teams/#associate-resources-with-team-handles
[19]: /es/api/latest/events/
[20]: /es/dashboards/guide/slo_data_source/
[21]: /es/dashboards/widgets/slo/
[22]: /es/dashboards/widgets/slo_list/
[23]: /es/monitors/types/event/
[24]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[25]: /es/api/latest/service-level-objective-corrections/
[26]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/slo_correction
[27]: /es/events/explorer/
[28]: /es/monitors/types/event/