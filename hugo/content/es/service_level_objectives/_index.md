---
aliases:
- /es/monitors/monitor_uptime_widget/
- /es/monitors/slos/
- /es/monitors/service_level_objectives/
- /es/service_management/service_level_objectives/ootb_dashboard
- /es/service_management/service_level_objectives/
description: Realice un seguimiento del estado de sus SLOs
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-slo
  tag: Centro de Aprendizaje
  text: Introducción a los SLOs
- link: https://www.datadoghq.com/blog/service-page/
  tag: Blog
  text: Telemetría de Servicio, Error Tracking, SLOs y más
- link: https://www.datadoghq.com/blog/monitor-service-performance-with-slo-alerts/
  tag: Blog
  text: Monitoree proactivamente el rendimiento del servicio con alertas de SLO
- link: https://www.datadoghq.com/blog/slo-key-questions/
  tag: Blog
  text: Preguntas clave que hacer al establecer SLOs
- link: https://www.datadoghq.com/blog/define-and-manage-slos/
  tag: Blog
  text: Mejores prácticas para gestionar sus SLOs con Datadog
- link: https://www.datadoghq.com/blog/burn-rate-is-better-error-rate/
  tag: Blog
  text: La Tasa de Quema es una Mejor Tasa de Errores
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Diseña tableros ejecutivos efectivos con Datadog
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: Blog
  text: Realice un seguimiento del estado y del presupuesto de error de sus SLOs con
    Datadog
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_level_objective
  tag: Sitio Externo
  text: Cree y gestione SLOs con Terraform
title: Service Level Objectives
---
{{< jqmath-vanilla >}}

<br />

{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Regístrese" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=SLOs&tags.topics-1=Monitors">}}
  Explore y regístrese para las sesiones de Habilitación de Fundación. Aprenda cómo puede priorizar y abordar los problemas que más importan a su negocio con el seguimiento nativo de SLO y SLA.
{{< /learning-center-callout >}}

## Resumen {#overview}

Los Objetivos de Nivel de Servicio, o SLOs, son una parte clave del conjunto de herramientas de ingeniería de confiabilidad del sitio. Los SLOs proporcionan un marco para definir objetivos claros en torno al rendimiento de la aplicación, lo que ayuda a los equipos a ofrecer una experiencia de cliente consistente, equilibrar el desarrollo de características con la estabilidad de la plataforma y mejorar la comunicación con los usuarios internos y externos.

**Consejo**: Para abrir los SLOs desde la búsqueda global de Datadog, presione <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> y busque `slo`.

## Terminología clave {#key-terminology}

Indicador de Nivel de Servicio (SLI)
: Una medición cuantitativa del rendimiento o la fiabilidad de un servicio. En los SLOs de Datadog, un SLI es una métrica o una agregación de uno o más monitors.

Service Level Objective (SLO)
: Un porcentaje objetivo para un SLI durante un período de tiempo específico.

Acuerdo de Nivel de Servicio (SLA)
: Un acuerdo explícito o implícito entre un cliente y un proveedor de servicios que estipula las expectativas de fiabilidad del cliente y las consecuencias para el proveedor de servicios por no cumplirlas.

Presupuesto de error
: La cantidad permitida de falta de fiabilidad derivada del porcentaje objetivo de un SLO (100% - porcentaje objetivo) que se destina al desarrollo del producto.

## Tipos de SLO {#slo-types}

Al crear SLOs, puede elegir entre los siguientes tipos:
- **SLOs basados en métricas**: se pueden utilizar cuando desea que el cálculo del SLI sea basado en conteo, el SLI se calcula como la suma de eventos buenos dividida por la suma de eventos totales.
- **SLOs basados en monitors**: se pueden utilizar cuando desea que el cálculo del SLI sea basado en tiempo, el SLI se basa en el tiempo de actividad del monitor. Los SLOs basados en monitors deben basarse en un monitor de Datadog nuevo o existente, cualquier ajuste debe hacerse al monitor subyacente (no se puede hacer a través de la creación de SLO).
- **SLOs de Intervalo de Tiempo**: se pueden utilizar cuando desea que el cálculo del SLI sea basado en tiempo, el SLI se basa en su definición personalizada de tiempo de actividad (cantidad de tiempo que su sistema exhibe buen comportamiento dividido por el tiempo total). Los SLOs de Intervalo de Tiempo no requieren un monitor de Datadog, puede probar diferentes filtros de métricas y umbrales y explorar instantáneamente el tiempo de inactividad durante la creación de SLO.

Para una comparación completa, consulte el gráfico de [Comparación de Tipos de SLO][1].

## Configuración {#setup}

Utilice la página de [Service Level Objectives manage page][2] para crear nuevos SLOs o para ver y gestionar todos sus SLOs existentes.

### Configuración {#configuration}

1. En la [SLO manage page][2], seleccione **Nuevo SLO +**.
2. Seleccione el tipo de SLO. Puede crear un SLO con cualquiera de los siguientes tipos: [Basado en métricas][3], [Basado en monitors][4], o [Intervalos de tiempo][5].
3. Establezca un objetivo y una ventana de tiempo móvil (de los últimos 7, 30 o 90 días) para el SLO. Datadog recomienda que haga el objetivo más estricto que sus SLAs estipulados. Esta ventana de tiempo se muestra en las listas de SLO. Por defecto, se selecciona la ventana de tiempo más corta.
4. Finalmente, dele un título al SLO, descríbalo con más detalle o agregue enlaces en la descripción, añada etiquetas y guárdelo.

Después de configurar el SLO, selecciónelo de la [vista de lista de Service Level Objectives][2] para abrir el panel lateral de detalles. El panel lateral muestra el porcentaje de estado general y el presupuesto de error restante para cada uno de los objetivos del SLO, así como barras de estado (SLOs basados en monitors) o gráficos de barras (SLOs basados en métricas) de la historia del SLI. Si creó un SLO basado en monitors agrupados utilizando un [multi alert monitor][6] o un SLO basado en métricas agrupadas utilizando la [`sum by` cláusula][7], el porcentaje de estado y el presupuesto de error restante para cada grupo individual se muestran, además del porcentaje de estado general y el presupuesto de error restante.

**Ejemplo:** Si crea un SLO basado en monitor para rastrear la latencia por Availability Zone, se muestran los porcentajes de estado y el presupuesto de error restante para el SLO general y para cada Availability Zone individual que el SLO esté rastreando.

**Nota:** El presupuesto de error restante se muestra como un porcentaje y se calcula utilizando la siguiente fórmula:

$$\text"presupuesto de error restante" = 100 * {\text"estado actual" - \text" objetivo"} / { 100 - \text"objetivo"}$$

### Estableciendo objetivos de SLO {#setting-slo-targets}

Para aprovechar los beneficios de los presupuestos de error y las alertas de presupuesto de error, debe establecer valores de objetivo de SLO estrictamente por debajo del 100%.

Establecer un objetivo del 100% significa tener un presupuesto de error del 0% ya que el presupuesto de error es igual al 100%—objetivo de SLO. Sin un presupuesto de error que represente un riesgo aceptable, se enfrenta a dificultades para encontrar alineación entre las prioridades conflictivas de mantener la fiabilidad orientada al cliente e invertir en el desarrollo de características. Además, los SLOs con valores objetivo del 100% conducen a errores de división por cero en la evaluación de alertas de SLO.

**Nota:** El número de decimales que puede especificar para sus SLO varía según el tipo de SLO y las ventanas de tiempo que elija. Consulte los enlaces a continuación para obtener más información sobre cada tipo de SLO respectivo.

[Monitor-based SLOs][8]: Up to two decimal places are allowed for 7-day and 30-day targets, up to three decimal places are allowed for 90-day targets.

[Metric-based SLOs][9]: Up to three decimal places are allowed for all targets.

## Editar un SLO {#edit-an-slo}

Para editar un SLO, pase el cursor sobre la fila del SLO en la vista de lista y haga clic en el ícono de edición que aparece a la derecha de la fila, o haga clic en la fila para abrir el panel lateral de detalles y seleccione el botón de edición del icono de engranaje en la parte superior derecha del panel.

## Permisos {#permissions}

### Acceso basado en roles {#role-based-access}

Todos los usuarios pueden ver los SLO y [correcciones de estado de SLO](#slo-status-corrections), independientemente de su [rol][10] asociado. Solo los usuarios asignados a roles con el `slos_write` permiso pueden crear, editar y eliminar SLOs.

Para crear, editar y eliminar correcciones de estado, los usuarios requieren los permisos `slos_corrections`. Un usuario con este permiso puede hacer correcciones de estado, incluso si no tiene permiso para editar esos SLOs. Para la lista completa de permisos, consulte la [documentación de RBAC][11].

### Controles de acceso granulares {#granular-access-controls}

Restringa el acceso a SLOs individuales especificando una lista de [roles][10] que están autorizados a editarlos.

{{< img src="service_level_objectives/slo_set_permissions.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Opción de permisos de SLO en el menú de engranaje">}}

1. Haga clic en el SLO para abrir el panel lateral de detalles.
1. Haga clic en el ícono de engranaje en la parte superior derecha del panel.
1. Seleccione **Permisos**.
1. Haga clic en **Restringir Acceso**.
1. El cuadro de diálogo se actualiza para mostrar que los miembros de su organización tienen acceso de **Viewer** por defecto.
1. Utilice el menú desplegable para seleccionar uno o más roles, equipos o usuarios que puedan editar el SLO.
1. Haga clic en **Agregar**.
1. El cuadro de diálogo se actualiza para mostrar que el rol que seleccionó tiene el permiso de **Editor**.
1. Haga clic en **Guardar**.

Para mantener su acceso de edición al SLO, el sistema requiere que incluya al menos un rol del cual sea miembro antes de guardar. Los usuarios en la lista de control de acceso pueden agregar roles y solo pueden eliminar roles que no sean el suyo.

**Nota**: Los usuarios pueden crear SLOs en cualquier monitor incluso si no tienen permisos de escritura para el monitor. De manera similar, los usuarios pueden crear alertas de SLO incluso si no tienen permisos de escritura para el SLO. Para más información sobre los permisos RBAC para Monitors, consulte la [documentación de RBAC][12] o la [guía sobre cómo configurar RBAC para Monitors][13].

## Buscando SLOs {#searching-slos}

La [página de gestión de Objetivos de Nivel de Servicio][2] le permite realizar una búsqueda avanzada de todos los SLOs para que pueda encontrar, ver, editar, clonar o eliminar SLOs de los resultados de búsqueda.

La búsqueda avanzada le permite consultar SLOs por cualquier combinación de atributos de SLO:

* `name` y `description` - búsqueda de texto
* `time window` - 7d, 30d, 90d
* `type` - métrica, monitor
* `creator`
* `tags` - centro de datos, env, servicio, equipo, etc.

Para realizar una búsqueda, utilice las casillas de verificación de la izquierda y la barra de búsqueda en la parte superior. Cuando marque las casillas, la barra de búsqueda se actualiza con la consulta equivalente. De igual manera, cuando modifique la consulta en la barra de búsqueda (o la escriba desde cero), las casillas de verificación se actualizan para reflejar el cambio. Los resultados de la consulta se actualizan en tiempo real a medida que edita la consulta; no hay un botón de 'Buscar' para hacer clic.

## Viendo SLOs {#viewing-slos}

*Agrupe sus SLOs por *cualquier etiqueta para obtener una vista resumida de sus datos. Puede analizar rápidamente cuántos SLOs hay en cada estado (incumplido, advertencia, OK y sin datos), agrupados por servicio, equipo, recorrido del usuario, nivel o cualquier otra etiqueta establecida en sus SLOs.

{{< img src="service_level_objectives/slo_group_by_new.png" alt="Vista resumida de SLOs agrupados por Teams" style="width:100%;" >}}

Ordene los SLOs por las columnas de *estado* y *presupuesto de error* para priorizar cuáles SLOs necesitan su atención. La lista de SLOs muestra los detalles de los SLOs durante la ventana de tiempo principal seleccionada en su [configuración](#configuration). Todas las demás ventanas de tiempo de configuración están disponibles para ver en el panel lateral individual. Abra el panel lateral de detalles de SLO haciendo clic en la fila de la tabla correspondiente.

**Nota**: Puede ver sus SLOs desde la pantalla de inicio de su dispositivo móvil descargando la [aplicación móvil de Datadog][14], disponible en la [Apple App Store][15] y [Google Play Store][16].

{{< img src="service_level_objectives/slos-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="SLOs en iOS y Android">}}

### Etiquetas de SLO {#slo-tags}

Las etiquetas de SLO se pueden usar para filtrar en la [SLO manage page][2], crear [Saved Views][17] o agrupar SLOs para ver. Las etiquetas se pueden agregar a los SLOs de las siguientes maneras:

- Cuando crea o edita un SLO, puede agregar etiquetas
- Desde la vista de lista de SLOs, puede agregar y actualizar etiquetas en bloque utilizando las opciones desplegables *Editar Etiquetas* y *[Edit Teams][18]* en la parte superior de la lista de SLOs.

{{< img src="service_level_objectives/slo_bulk_tag.png" alt="La página de lista de SLOs muestra el menú desplegable Editar Etiquetas para la edición masiva de etiquetas." >}}

### Indicador de tasa de quema SLO {#slo-burn-rate-indicator}

Los indicadores de tasa de quema utilizan una ventana móvil de 2 horas para evaluar cuáles SLOs están consumiendo su presupuesto de error demasiado rápido. Los indicadores de tasa de quema aparecen junto a los nombres de SLO aplicables en la [SLO manage page][2].

{{< img src="service_level_objectives/slo_burn_rate_indicator.png" alt="La SLO manage page en Datadog. Un ícono rojo aparece junto al nombre de un SLO en la lista. Al pasar el mouse sobre el ícono rojo, se muestra un modal con más información, una visualización de la tasa de quema y un enlace a la página de servicio correspondiente del SLO." style="width:80%;" >}}

Hay dos tipos de indicadores posibles:
- Un ícono rojo que indica una tasa de quema crítica superior a 6 en las últimas 2 horas.
- Un ícono amarillo que indica una tasa de quema elevada entre 1 y 6 en las últimas 2 horas.

Un gráfico visual acompaña a cada indicador para mostrar dónde se encuentra la tasa de quema en relación con los umbrales elevado y crítico, permitiendo una evaluación rápida de la gravedad.

Los SLOs pueden filtrarse por estado de tasa de quema: Crítico, Elevado y Saludable. Para los SLOs con una etiqueta de servicio, cada indicador de tasa de quema incluye un enlace directo a la página del servicio relacionada para una investigación más profunda.

### Vista predeterminada de SLO {#slo-default-view}

La vista predeterminada de SLO se carga cuando accede a la vista de lista de SLO.

La vista predeterminada incluye:

- Una consulta de búsqueda vacía
- Una lista de todos los SLO definidos en su organización
- Una lista de facetas disponibles en la lista de facetas del lado izquierdo

### Saved Views {#saved-views}

Las Saved Views le permiten guardar y compartir búsquedas personalizadas en la vista de lista de SLO para los SLO que son más relevantes para usted y su equipo al compartir:

- Una consulta de búsqueda
- Un subconjunto seleccionado de facetas

Después de consultar un subconjunto de SLOs en la vista de lista, puede agregar esa consulta como una Saved View.

#### Agregar una Saved View {#add-a-saved-view}

Para agregar una Saved View:

1. Consulte sus SLOs.
2. Haga clic en **Guardar Vista +** en la parte superior izquierda de la página.
3. Nombre su vista y guarde.

#### Cargar una Saved View {#load-a-saved-view}

Para cargar una Saved View, abre el panel de *Saved Views* presionando el botón **Show Views** en la parte superior izquierda de la página y selecciona una Saved View de la lista. También puede buscar Saved Views en el cuadro de búsqueda *Filter Saved Views* en la parte superior de ese mismo panel de *Saved Views*.

#### Compartir una Saved View {#share-a-saved-view}

Pase el cursor sobre una Saved View de la lista y seleccione el ícono de hipervínculo para copiar el enlace a la Saved View y compartirlo con sus compañeros de equipo.

#### Manage Saved Views {#manage-saved-views}

Una vez que esté utilizando una Saved View, puede actualizarla seleccionando esa Saved View, modificando la consulta y haciendo clic en el botón *Update* debajo de su nombre en el panel de *Saved Views*. Para cambiar el nombre de la Saved View o eliminar una Saved View, pase el cursor sobre su fila en el panel de *Saved Views* y haga clic en el ícono de lápiz o en el ícono de papelera, respectivamente.

## Eventos de auditoría de corrección de SLO y estado de SLO {#slo-and-slo-status-correction-audit-events}

Los eventos de auditoría de SLO le permiten rastrear el historial de sus configuraciones de SLO utilizando el [Event Explorer][27] o la pestaña de **Historial de Auditoría** en los detalles del SLO. Los eventos de auditoría se agregan a Event Explorer cada vez que se crea, se modifica o se elimina un SLO o una corrección de estado de SLO. Cada evento incluye información sobre la configuración de un SLO o una corrección de estado de SLO, y el flujo proporciona un historial de los cambios de configuración a lo largo del tiempo.

### Eventos de auditoría de SLO {#slo-audit-events}

Cada evento incluye la siguiente información de configuración de SLO:

- Nombre
- Descripción
- Porcentajes objetivo y ventanas de tiempo
- Fuentes de datos (Monitor IDs o consulta de métricas)

Tres tipos de eventos de auditoría de SLO aparecen en Event Explorer:

- `SLO Created` los eventos muestran la información de configuración de SLO en el momento de la creación
- `SLO Modified` los eventos muestran qué información de configuración cambió durante una modificación
- `SLO Deleted` los eventos muestran la información de configuración que tenía el SLO antes de ser eliminado

### Eventos de auditoría de corrección de estado {#status-correction-audit-events}

Cada evento incluye la siguiente información de configuración de corrección de estado de SLO:

- Nombre de SLO
- Tiempos de inicio y fin de la corrección de estado con zona horaria
- Categoría de corrección de estado

Tres tipos de eventos de auditoría de corrección de estado de SLO aparecen en el Explorador de Eventos:

- `SLO Correction Created` los eventos muestran la información de configuración de corrección de estado en el momento de la creación
- `SLO Correction Modified` los eventos muestran qué información de configuración cambió durante una modificación
- `SLO Correction Deleted` los eventos muestran la información de configuración que tenía la corrección de estado antes de ser eliminada

Para obtener una lista completa de todos los eventos de auditoría de SLO, ingrese la consulta de búsqueda `tags:(audit AND slo)` en Event Explorer. Para ver la lista de eventos de auditoría para un SLO específico, ingrese `tags:audit,slo_id:<SLO ID>` con el ID del SLO deseado. También puede consultar Event Explorer programáticamente utilizando la [Datadog Events API][19].

**Nota:** Si no ve eventos aparecer en la interfaz de usuario, asegúrese de establecer el marco de tiempo de Event Explorer a un período más largo, por ejemplo, los últimos 7 días.

{{< img src="service_level_objectives/slo-audit-events.png" alt="Eventos de auditoría de SLO" >}}

También puede usar la pestaña "Historial de Auditoría" en los detalles del SLO para ver todos los eventos de auditoría de un SLO individual:

{{< img src="service_level_objectives/slo_audit_history_tab.png" alt="Pestaña de historial de auditoría de detalles del SLO" >}}

Con [Event Monitors][28], puede configurar notificaciones para rastrear eventos de auditoría de SLO. Por ejemplo, si desea ser notificado cuando se modifique la configuración de un SLO específico, configure un Event Monitor para rastrear el texto `[SLO Modified]` sobre las etiquetas `audit,slo_id:<SLO ID>`.

## Widgets de SLO {#slo-widgets}

{{< learning-center-callout header="Intente crear conocimientos críticos para el negocio utilizando Dashboards y SLOs en el Learning Center" btn_title="Inscríbase ahora" btn_url="https://learn.datadoghq.com/courses/dashboards-slos">}}
  Aprenda sin costo en capacidad de computación en la nube real y una cuenta de prueba de Datadog. Inscríbase hoy para aprender más sobre cómo construir Dashboards para rastrear SLOs.
{{< /learning-center-callout >}}

Después de crear su SLO, puede visualizar los datos a través de Dashboards y widgets.
  - Utilice el widget de SLO para visualizar el estado de un solo SLO
  - Utilice el SLO List widget para visualizar un conjunto de SLOs
  - Grafique 15 meses de datos de SLO basados en métricas con la [SLO data source][20] en widgets tanto de series temporales como escalares (valor de consulta, lista principal, tabla, cambio).

Para más información sobre los SLO widgets, consulte las páginas del [SLO widget][21] y [SLO List widget][22]. Para más información sobre el SLO data source, consulte la guía sobre cómo [Graph historical SLO data on Dashboards][20].

## Correcciones de estado de SLO {#slo-status-corrections}

Las correcciones de estado le permiten excluir períodos de tiempo específicos de los cálculos del estado del SLO y del presupuesto de errores. De esta manera, puede:
- Prevenir que el tiempo de inactividad esperado, como el mantenimiento programado, agote su presupuesto de errores
- Ignorar las horas no laborales, en las que no se espera que cumpla con sus SLOs
- Asegurar que los problemas temporales causados por implementaciones no impacten negativamente sus SLOs

Cuando aplique una corrección, el período de tiempo que especifique se elimina del cálculo del SLO.
- Para los SLOs basados en Monitors, la ventana de tiempo de corrección no se cuenta.
- Para los SLOs basados en métricas, todos los eventos buenos y malos en la ventana de corrección no se cuentan.
- Para los SLOs de Tiempo de Segmento, la ventana de tiempo de corrección se trata como tiempo de actividad.

Tiene la opción de crear correcciones únicas para ajustes ad hoc, o correcciones recurrentes para ajustes predecibles que ocurren de manera regular. Las correcciones únicas requieren una hora de inicio y una hora de finalización, mientras que las correcciones recurrentes requieren una hora de inicio, duración e intervalo. Las correcciones recurrentes se basan en la especificación RRULE de [iCalendar RFC 5545][24]. Las reglas soportadas son `FREQ`, `INTERVAL`, `COUNT` y `UNTIL`. Especificar una fecha de finalización para las correcciones recurrentes es opcional en caso de que necesites que la corrección se repita indefinidamente.

Para cualquiera de los tipos de corrección, debe seleccionar una categoría de corrección que indique por qué se está realizando la corrección. Las categorías disponibles son `Scheduled Maintenance`, `Outside Business Hours`, `Deployment` y `Other`. Puede incluir opcionalmente una descripción para proporcionar contexto adicional si es necesario.

Cada SLO tiene un límite máximo de correcciones que se pueden configurar para asegurar el rendimiento de las consultas. Estos límites solo se aplican a los últimos 90 días por SLO, por lo que las correcciones para períodos de tiempo anteriores a los últimos 90 días no cuentan para su límite. Esto significa que:
- Si el tiempo de finalización de una corrección única es antes de los últimos 90 días, cuenta para su límite.
- Si el tiempo de finalización de la última repetición de una corrección recurrente es antes de los últimos 90 días, no cuenta para su límite.

Los límites de 90 días por SLO son los siguientes:

| Tipo de Corrección   | Límite por SLO |
| ----------------- | ------------- |
| Única          | 100           |
| Diaria recurrente   | 2             |
| Semanal recurrente  | 3             |
| Mensual recurrente | 5             |

Puede configurar correcciones de estado a través de la interfaz de usuario seleccionando `Correct Status` en el panel lateral de su SLO, la [API de correcciones de estado de SLO][25], o un [recurso de Terraform][26].

#### Acceso en la interfaz de usuario {#access-in-the-ui}

Para acceder a las correcciones de estado de SLO en la interfaz de usuario:

1. Cree un nuevo SLO o haga clic en uno existente.
2. Navegue a la vista del panel lateral de detalles de un SLO.
3. Bajo el ícono de engranaje, seleccione **Correct Status** para acceder al modal de creación de **Status Corrections**.
4. Elija entre `One-Time` y `Recurring` en el **Select the Time Correction Window**, y especifique el período de tiempo que desea corregir.
5. Seleccione un **Correction Type**.
6. Opcionalmente, agregue **Notes**.
7. Haga clic en **Apply Correction**.

{{< img src="service_level_objectives/slo-corrections-ui.png" alt="SLO Correction UI" style="width:80%;">}}

Para ver, editar y eliminar correcciones de estado existentes, haga clic en la pestaña **Corrections** en la parte superior del panel lateral detallado de un SLO.

#### Visualizing Status Corrections {#visualizing-status-corrections}

Para SLOs basados en métricas y Time Slice SLOs con Status Corrections, hay un interruptor en la vista de detalles del SLO que le permite habilitar o deshabilitar correcciones en la interfaz de usuario. El interruptor controla los gráficos y los datos en la sección "History" de la vista de detalles del SLO. **Nota:** Su estado general de SLO y presupuesto de errores siempre tomarán en cuenta las correcciones de estado.

{{< img src="service_level_objectives/correction-toggle.png" alt="Interfaz de usuario de corrección de SLO" style="width:100%;">}}

## Visualización del calendario de SLO {#slo-calendar-view}

La Visualización del Calendario de SLO está disponible en la [página de gestión de SLO][2]. En la esquina superior derecha, cambie de la visualización "Principal" a la "Diaria", "Semanal" o "Mensual" para ver 12 meses de datos históricos del estado del SLO. La Visualización del Calendario es compatible con SLOs basados en métricas y SLOs de intervalo de tiempo.

{{< img src="service_level_objectives/slo-calendar-view-2.png" alt="Visualización del calendario de SLO" >}}

## Lectura adicional {#further-reading}

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