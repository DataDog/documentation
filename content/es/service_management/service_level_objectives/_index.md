---
aliases:
- /es/monitors/monitor_uptime_widget/
- /es/monitors/slos/
- /es/monitors/service_level_objectives/
- /es/service_management/service_level_objectives/ootb_dashboard
description: Seguimiento del estado de tus SLOs
further_reading:
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: Blog
  text: Sigue el estado y el presupuesto para errores de tus SLOs con Datadog
- link: https://learn.datadoghq.com/courses/intro-to-slo
  tag: Centro de aprendizaje
  text: Introducción a Objetivos de nivel de servicio (SLOs)
- link: https://www.datadoghq.com/blog/service-page/
  tag: Blog
  text: Telemetría del servicio, seguimiento de errores, SLOs y más
- link: https://www.datadoghq.com/blog/monitor-service-performance-with-slo-alerts/
  tag: Blog
  text: Supervisa de forma proactiva el rendimiento del servicio con alertas de SLO
- link: https://www.datadoghq.com/blog/slo-key-questions/
  tag: Blog
  text: Preguntas clave a la hora de establecer los SLOs
- link: https://www.datadoghq.com/blog/define-and-manage-slos/
  tag: Blog
  text: Mejores prácticas para gestionar tus SLOs con Datadog
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_level_objective
  tag: Sitio externo
  text: Crear y gestionar SLOs con Terraform
- link: https://www.datadoghq.com/blog/burn-rate-is-better-error-rate/
  tag: Blog
  text: La tasa de consumo es una mejor tasa de errores
title: Objetivos de nivel de servicio (SLOs)
---

{{< jqmath-vanilla >}}

<br />

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Inscribirse" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=SLOs&tags.topics-1=Monitors">}}
  Explora e inscríbete en las sesiones de Foundation Enablement. Descubre cómo puedes priorizar y abordar los problemas más importantes de tu empresa con el seguimiento nativo de SLOs y SLAs.
{{< /learning-center-callout >}}

## Información general

Los objetivos de nivel de servicio (SLOs), son una parte clave del conjunto de herramientas de ingeniería de fiabilidad del sitio. Los SLOs proporcionan un marco para definir objetivos claros en torno al rendimiento de las aplicaciones. Gracias a esto, los equipos pueden ofrecer una experiencia coherente al cliente, equilibrar el desarrollo de funciones con la estabilidad de la plataforma y mejorar la comunicación con los usuarios internos y externos.

**Consejo**: Para abrir Objetivos de nivel de servicio desde la búsqueda global de Datadog, pulsa <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> y busca `slo`.

## Terminología clave

Indicador de nivel de servicio (SLI)
: medida cuantitativa del rendimiento o la fiabilidad de un servicio. En los SLOs de Datadog un SLI es un métrica o una agregación de uno o más monitores.

Objetivos de nivel de servicio (SLOs)
: un porcentaje objetivo para un SLI durante un periodo específico.

Acuerdo de nivel de servicio (SLA)
: acuerdo explícito o implícito entre un cliente y un proveedor de servicio que estipula las expectativas de fiabilidad del cliente y las consecuencias para el proveedor de servicio en caso de no cumplirlas.

Presupuesto para errores
: la cantidad permitida de falta de fiabilidad derivada del porcentaje objetivo de un SLO (100% - porcentaje objetivo) que se pretende invertir en el desarrollo del producto.

## Tipos de SLO

Al crear SLOs, puedes elegir entre los siguientes tipos:
- **SLOs basados en métricas**: puede utilizarse cuando se desea que el cálculo del SLI se base en el recuento, el SLI se calcula como la suma de los eventos correctos dividida por la suma del total de eventos.
- **SLOs basados en monitores**: se puede utilizar cuando deseas que el cálculo del SLI se base en el tiempo, el SLI se basa en el tiempo de actividad del monitor. Estos SLOs deben basarse en un monitor de Datadog nuevo o existente, cualquier ajuste debe hacerse en el monitor subyacente (no puede hacerse a través de la creación de un SLO).
- SLOs **de fragmento de tiempo**: se puede utilizar cuando deseas que el cálculo del SLI se base en el tiempo, el SLI se basa en tu definición personalizada de tiempo de actividad (cantidad de tiempo que el sistema muestra un buen comportamiento dividido por el tiempo total). Los SLOs de fragmento de tiempo no requieren un monitor de Datadog, puedes probar diferentes filtros de métrica y umbrales y explorar instantáneamente la caída del sistema durante la creación de un SLO.

Para una comparación completa, ve el cuadro [Comparación de tipos de SLO][1].

## Configuración

Utiliza la [página de estado de los Objetivos de nivel de servicio (SLOs)][2] de Datadog para crear nuevos SLOs o para ver y gestionar todos tus SLOs existentes. 

### Configuración

1. En la [página de estado de SLO][2], selecciona **New SLO +** (Nuevo SLO +).
2. Selecciona el tipo de SLO. Puedes crear un SLO con cualquiera de los siguientes tipos: [basado en métricas][3], [basado en monitores][4], o [fragmento de tiempo][5].
3. Establece un objetivo y un intervalo de tiempo renovable (pasados 7, 30 o 90 días) para el SLO. Datadog recomienda que el objetivo sea más estricto que tus SLA estipulados. Si configuras más de un intervalo de tiempo, selecciona uno para que sea el intervalo principal. Este intervalo de tiempo se muestra en las listas de SLO. Por defecto, se selecciona el intervalo más corto. 
4. Por último, pon un título al SLO, descríbelo con más detalle o añade enlaces en la descripción, añade etiquetas (tags) y guárdalo.

Una vez configurado el SLO, selecciónalo en la [vista de la lista de Objetivos de nivel de servicio (SLOs)][2] para abrir el panel lateral de detalles. El panel lateral muestra el porcentaje de estado general y el presupuesto para errores restante para cada uno de los objetivos del SLO, así como barras de estado (SLOs basados en monitores) o gráficos de barras (SLOs basados en métricas) del historial del SLI. Si creaste un SLO agrupado basado en monitores con un [monitor de varias alertas][6] o un SLO agrupado basado en métricas con la [cláusula `sum by`][7], el porcentaje de estado y el presupuesto para errores restante para cada grupo individual se muestran además del porcentaje de estado general y el presupuesto para error restante.

**Ejemplo:** si creas un SLO basado en monitores para realizar un seguimiento de la latencia por zona de disponibilidad, se mostrarán los porcentajes de estado y el presupuesto para errores restante para el SLO global y para cada zona de disponibilidad individual que esté siguiendo el SLO.

**Nota:** El presupuesto para errores restante se muestra como un porcentaje y se calcula con la siguiente fórmula:

$$\text"error budget remaining" = 100 * {\text"current status" - \text" target"} / { 100 - \text"target"}$$

### Fijación de objetivos SLO

Para aprovechar las ventajas de los presupuestos para errores y las alertas de presupuestos para errores, debes establecer valores objetivo de SLO estrictamente por debajo del 100%.

Establecer un objetivo del 100% significa tener un presupuesto para errores del 0%, ya que el presupuesto para errores es igual al 100% - el objetivo SLO. Sin un presupuesto para errores que represente un riesgo aceptable, tendrás dificultades para alinear las prioridades contrapuestas de mantener la fiabilidad del cliente e invertir en el desarrollo de funciones. Además, los SLO con valores objetivo del 100% conducen a errores de división por cero en la evaluación de alertas del SLO.

**Nota:** El número de decimales que puedes especificar para tus SLOs difiere según el tipo de SLO y del intervalo de tiempo que elijas. Consulta los enlaces siguientes para obtener más información sobre cada tipo de SLO.

[SLOs basados en monitores][8]: se permiten hasta dos decimales para los objetivos a 7 y 30 días, y hasta tres decimales para los objetivos a 90 días.

[SLOs basados en métricas][9]: se permiten hasta tres decimales para todos los objetivos.

## Editar un SLO

Para editar un SLO, pasa el ratón por encima de la fila del SLO en la vista de lista y haz clic en el icono de lápiz de edición que aparece a la derecha de la fila. Si no, haz clic en la fila para abrir el panel lateral de detalles y selecciona el botón de edición del icono de engranaje en la parte superior derecha del panel.

## Permisos

### Acceso basado en roles

Todos los usuarios pueden ver los SLO y las [correcciones de estado de SLO](#slo-status-corrections), independientemente de su [rol][10] asociado. Solo los usuarios asociados a roles con el permiso `slos_write` pueden crear, editar y eliminar SLOs.

Para crear, editar y eliminar correcciones de estado, los usuarios necesitan los permisos `slos_corrections`. Un usuario con este permiso puede hacer correcciones de estado, incluso si no tiene permiso para editar esos SLOs. Para conocer la lista completa de permisos, consulta la [documentación de RBAC][11].

### Controles de acceso detallados

Restringe el acceso a SLOs individuales especificando un lista de [roles][10] que están autorizados a editarlo. 

{{< img src="service_management/service_level_objectives/slo_set_permissions.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Opción de permisos de SLO en el menú de engranaje">}}

1. Haz clic en el SLO para abrir el panel lateral de detalles. 
1. Haz clic en el icono de engranaje situado en la parte superior derecha del panel. 
1. Selecciona **Permissions** (Permisos).
1. Haz clic en **Restrict Access** (Restringir el acceso).
1. El cuadro de diálogo se actualiza para mostrar que los miembros de tu organización tienen por omisión el permiso de acceso **Viewer** (Visualización).
1. Utiliza el menú desplegable para seleccionar uno o más roles, equipos o usuarios que puedan editar el SLO.
1. Haz clic en **Add** (Añadir).
1. El cuadro de diálogo se actualiza para indicar que el rol que has seleccionado tiene el permiso **Editor** (Edición).
1. Haz clic en **Save** (Guardar).

Para mantener tu acceso de edición al SLO, el sistema requiere que incluyas al menos un rol del que seas miembro antes de guardar. Los usuarios en la lista de control de acceso pueden añadir roles y solo pueden eliminar roles que no sean los suyos.

**Nota**: Los usuarios pueden crear SLOs en cualquier monitor incluso si no tienen permisos de escritura en el monitor. Del mismo modo, los usuarios pueden crear alertas de SLO incluso si no tienen permisos de escritura en el SLO. Para obtener más información sobre los permisos de la RBAC para monitores, consulta la [documentación de RBAC][12] o la [guía sobre cómo establecer la RBAC para monitores][13].

## Buscar SLOs

La [página de estado de los Objetivos de nivel de servicio (SLOs)][2] te permite hacer una búsqueda avanzada de todos los SLOs para que puedas encontrar, ver, editar, clonar o eliminar SLOs de los resultados de búsqueda.

La búsqueda avanzada te permite consultar los SLOs por cualquier combinación de atributos de SLO:

* `name` y `description`: búsqueda de texto
* `time window`: 7d, 30d, 90d
* `type`: métrica, monitor
* `creator`
* `tags`: centro de datos, entorno, servicio, equipo, etc.

Para hacer una búsqueda, utiliza las casillas de faceta de la izquierda y la barra de búsqueda de la parte superior. Cuando marcas las casillas, la barra de búsqueda se actualiza con la consulta equivalente. Del mismo modo, cuando modificas la consulta de la barra de búsqueda (o escribes una desde cero), las casillas se actualizan para reflejar el cambio. Los resultados de la consulta se actualizan en tiempo real a medida que editas la consulta; no hay ningún botón 'Buscar' en el que hacer clic.

## Visualización de los SLO

Agrupa tus SLOs por *cualquier* etiqueta para obtener una vista resumida de tus datos. Puedes analizar rápidamente cuántos SLOs se encuentran en cada estado (infringido, advertencia, correcto y sin datos), agrupados por servicio, equipo, recorrido del usuario, nivel o cualquier otra etiqueta establecida en tus SLOs.

{{< img src="service_management/service_level_objectives/slo_group_by_new.png" alt="Vista de resumen de SLOs agrupados por equipo" style="width:100%;" >}}

Ordena los SLOs por las columnas *estado* y *presupuesto para errores* para priorizar qué SLOs necesitan tu atención. La lista de SLO muestra los detalles de los SLOs durante el intervalo de tiempo principal seleccionado en tu [configuración](#configuration). Todos los demás intervalos de tiempo están disponibles para su visualización en el panel lateral individual. Abre el panel lateral de detalles de SLO haciendo clic en la fila de la tabla respectiva.

**Nota**: Puedes consultar tus SLOs desde la pantalla de inicio de tu dispositivo móvil al descargar la [aplicación móvil de Datadog][14], disponible en [Apple App Store][15] y [Google Play Store][16].

{{< img src="service_management/service_level_objectives/slos-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="SLOs en iOS y Android">}}

### Etiquetas de SLO

Puedes utilizar etiquetas de SLO para filtrar en la [página de estado de SLO][2], crear [vistas guardadas de SLO][17] o agrupar SLOs para visualizar. Pueden añadirse etiquetas a los SLO de las siguientes maneras:

- Al crear o editar un SLO, puedes añadir etiquetas
- Desde la vista de lista de SLO, puedes añadir y actualizar etiquetas en bloque utilizando las opciones desplegables *Editar etiquetas* y *[Editar Teams][18]* de la parte superior de la lista de SLO.

{{< img src="service_management/service_level_objectives/slo_bulk_tag.png" alt="Página de la lista de SLO que muestra el menú desplegable de Editar etiqueta para editar etiquetas en bloque" >}}

### Vista por defecto de SLO

La vista de SLO por defecto se carga cuando se accede a la vista de lista de SLO.

La vista por defecto incluye:

- Una consulta de búsqueda vacía
- Un lista de todos los SLO definidos en tu organización
- Una lista de las facetas disponibles en la lista de facetas a la izquierda

### Vistas guardadas

Las vistas guardadas te permiten guardar y compartir búsquedas personalizadas en la vista de lista de SLO para los SLOs más relevantes para ti y tu equipo al compartir:

- Una consulta de búsqueda
- Un subconjunto seleccionado de facetas

Después de consultar un subconjunto de SLOs en la vista de lista, puedes añadir esa consulta como vista guardada.

#### Añadir una vista guardada

Para añadir una vista guardada:

1. Consulta tus SLOs.
2. Haz clic en **Save View +** (Guardar vista +) en la parte superior izquierda de la página.
3. Dale un nombre a tu vista y guárdala.

#### Cargar una vista guardada

Para cargar una vista guardada, abre el panel *Saved Views* (Vistas guardadas) pulsando el botón **Show Views** (Mostrar vistas) en la parte superior izquierda de la página y selecciona una vista guardada de la lista. También puedes buscar las vistas guardadas en el cuadro de búsqueda *Filter Saved Views* (Filtrar vistas guardadas) en la parte superior de ese mismo panel *Saved Views* (Vistas guardadas).

#### Compartir una vista guardada

Pasa el ratón por encima de una vista guardada en la lista y selecciona el icono de hipervínculo para copiar el enlace a la vista guardada y compartirla con tus compañeros de equipo.

#### Gestionar las vistas guardadas

Una vez que estés utilizando una vista guardada, puedes actualizarla al seleccionar esa vista guardada, modificar la consulta y pulsar el botón *Update* (Actualizar) situado bajo su nombre en el panel  *Saved Views* (Vistas guardadas). Para cambiar el nombre de la vista guardada o eliminar una vista guardada, pasa el ratón por encima de su fila en el panel  *Saved Views* (Vistas guardadas) y haz clic en el icono del lápiz o en el icono de la papelera, respectivamente.

## Eventos de auditoría de corrección del estado de SLOs

Los eventos de auditoría de SLOs te permiten realizar un seguimiento del historial de configuración de tus SLOs mediante el [Explorador de eventos][27]. Los eventos de auditoría se añaden al Explorador de eventos cada vez que creas, modificas o eliminas un SLO. Cada evento incluye información sobre la configuración de un SLO o corrección del estado de un SLO, y el flujo (stream) ofrece un historial de los cambios de configuración del SLO a lo largo del tiempo.

### Eventos de auditoría de SLO

Cada evento incluye la siguiente información de configuración de SLO:

- Nombre
- Descripción
- Porcentajes objetivo e intervalos de tiempo
- Fuentes de datos (identificador de monitor o consulta de métrica)

En Event Explorer aparecen tres tipos de eventos de auditoría de SLO:

- Los eventos `SLO Created` muestran la información de configuración del SLO en el momento de la creación
- Los eventos `SLO Modified` muestran qué información de configuración ha cambiado durante una modificación
- Los eventos `SLO Deleted` muestran la información de configuración que tenía el SLO antes de ser eliminada

### Eventos de auditoría de corrección del estado

Cada evento incluye la siguiente información sobre la configuración de la corrección del estado del SLO:

- Nombre del SLO
- Horas de inicio y fin de la corrección del estado con zona horaria
- Categoría de corrección del estado

En el Explorador de eventos aparecen tres tipos de eventos de auditoría de corrección del estado del SLO:

- Los eventos `SLO Correction Created` muestran la información de configuración de la corrección del estado en el momento de la creación
- Los eventos `SLO Correction Modified` muestran qué información de configuración ha cambiado durante una modificación
- Los eventos `SLO Correction Deleted` muestran la información de configuración que tenía la corrección del estado antes de ser eliminada

Para obtener una lista completa de todos los eventos de auditoría de SLOs, introduce la consulta de búsqueda `tags:(audit AND slo)` en el Explorador de eventos. Para ver la lista de eventos de auditoría de un SLO específico, introduce `tags:audit,slo_id:<SLO ID>` con el ID del SLO deseado. También puedes consultar el Explorador de eventos mediante programación utilizando la [API de eventos de Datadog][19].

**Nota:** Si no aparecen eventos en la interfaz de usuario, asegúrate de establecer el marco temporal de Event Explorer en un periodo más largo, por ejemplo, los últimos 7 días.

{{< img src="service_management/service_level_objectives/slo-audit-events.png" alt="Eventos de auditoría de SLO" >}}

También puedes utilizar la pestaña "Historial de auditorías" en los detalles del SLO para ver todos los eventos de auditoría de un SLO individual:

{{< img src="service_management/service_level_objectives/slo_audit_history_tab.png" alt="Pestaña Historial de auditorías de la información del SLO" >}}

Con los [monitores de eventos][28], puedes configurar notificaciones para realizar un seguimiento de los eventos de auditoría de SLOs. Por ejemplo, si quieres recibir una notificación cuando se modifica la configuración específica de un SLO, configura un monitor de eventos para para realizar un seguimiento del texto `[SLO Modified]` en las etiquetas `audit,slo_id:<SLO ID>`.

## Widgets de SLO

{{< learning-center-callout header="Try Creating Business-Critical Insights Using Dashboards and SLOs in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/dashboards-slos">}}
  Aprende sin coste con la capacidad de cómputo real de la nueve y una cuenta de prueba de Datadog. Inscríbete hoy para obtener más información sobre crear Dashboards para seguir SLOs.
{{< /learning-center-callout >}}

Después de crear tu SLO, puedes visualizar los datos a través de dashboards y widgets. 
  - Uso del widget de SLOs para visualizar el estado de un único SLO
  - Utiliza el widget de lista de SLO para visualizar un conjunto de SLOs
  - Gráfico de 15 meses de datos de SLO basados en métricas con la [fuente de datos de SLO][20] en widgets de series temporales y escalares (valor de consulta, lista de principales, tabla, cambio). 

Para obtener más información sobre los widgets de SLOs, consulta las páginas de [widget de SLOs][21] y [widget de lista de SLOs][22]. Para obtener más información sobre la fuente de datos de SLOs, consulta la guía sobre cómo [Graficar datos históricos de SLOs en dashboards][20].

## Correcciones del estado de SLO

Las correcciones de estado te permiten excluir períodos específicos de los cálculos del estado de SLO y del presupuesto para errores. De este modo, puedes:
- Evitar que las previsiones de caída del sistema, como el mantenimiento programado, agoten tu presupuesto para errores.
- Ignorar las horas no laborables, en las que no se espera que te ajustes a tus SLOs.
- Asegurarte que los problemas temporales causados por los despliegues no repercutan negativamente en tus SLOs.

Al aplicar una corrección, el período que especifiques se elimina del cálculo del SLO.
- Para los SLOs basados en monitores, no se cuenta el intervalo de corrección.
- Para los SLOs basados en métricas, no se cuentan todos los eventos correctos e incorrectos en el intervalo de corrección.
- Para los SLOs de fragmento de tiempo, el intervalo de tiempo de corrección se trata como tiempo de actividad.

Tienes la opción de crear correcciones únicas para ajustes ad hoc, o correcciones recurrentes para ajustes predecibles que se producen con frecuencia. Las correcciones únicas requieren una hora de inicio y de finalización, mientras que las correcciones recurrentes requieren una hora de inicio, una duración y un intervalo. Las correcciones recurrentes se basan en la [especificación RRULE de iCalendar RFC 5545][24]. Las reglas compatibles son `FREQ`, `INTERVAL`, `COUNT` y `UNTIL`. Especificar una fecha final para las correcciones recurrentes es opcional en caso de que necesites que la corrección se repita indefinidamente. 

Para cualquiera de los dos tipos de corrección, debes seleccionar una categoría de corrección que indique el motivo de la corrección. Las categorías disponibles son `Scheduled Maintenance`, `Outside Business Hours`, `Deployment` y `Other`. Opcionalmente, puedes incluir una descripción para proporcionar contexto adicional si es necesario.

Cada SLO tiene un límite máximo de correcciones que puede configurarse para garantizar el rendimiento de la consulta. Estos límites solo se aplican a los últimos 90 días por SLO, por lo que las correcciones para períodos anteriores a los últimos 90 días no cuentan para tu límite. Esto significa que:
- Si la fecha de finalización de una corrección única es anterior a los últimos 90 días, sí cuenta para tu límite.
- Si la fecha de finalización de la última repetición de una corrección periódica es anterior a los últimos 90 días, no cuenta para tu límite.

Los límites de 90 días por SLO son los siguientes:

| Tipo de corrección   | Límite por SLO |
| ----------------- | ------------- |
| Una sola vez          | 100           |
| Diario recurrente   | 2             |
| Semanal recurrente  | 3             |
| Mensual recurrente | 5             |

Puedes configurar correcciones de estado a través de la interfaz de usuario al seleccionar `Correct Status` en el panel lateral de tu SLO, la [API de correcciones de estado de SLO][25] o un [recurso de Terraform][26].

#### Acceso en la interfaz de usuario

Para acceder a las correcciones del estado de SLO en la interfaz de usuario:

1. Crea un nuevo SLO o haz clic en uno existente.
2. Ve a la vista del panel lateral de detalles de un SLO.
3. Bajo el icono de engranaje, selecciona **Correct Status** (Corregir estado) para acceder al modal de creación **Status Corrections** (Correcciones de estado).
4. Elige entre `One-Time` y `Recurring` en **Select the Time Correction Window** (Seleccionar el intervalo de corrección) y especifica el período que deseas corregir.
5. Selecciona un **Tipo de corrección**.
6. Si lo deseas, puede añadir **Notas**.
7. Haz clic en **Apply Correction** (Aplicar corrección).

{{< img src="service_management/service_level_objectives/slo-corrections-ui.png" alt="Interfaz de usuario de corrección de SLOs" style="width:80%;">}}

Para ver, editar y eliminar correcciones de estado existentes, haz clic en la pestaña **Corrections** (Correcciones) en la parte superior de la vista detallada del panel lateral de un SLO.

#### Visualización de las correcciones de estado

Para SLOs basados en métricas y de fracción de tiempo, hay un conmutador en la vista detallada de SLOs que te permite activar o desactivar las correcciones en la interfaz de usuario. El conmutador controla los gráficos y los datos de la sección "Historial" de la vista de los detalles del SLO. **Nota:** Tu estado de SLO general y el presupuesto de errores siempre tendrán en cuenta las correcciones de estado.

{{< img src="service_management/service_level_objectives/correction-toggle.png" alt="Interfaz de usuario de corrección de SLOs" style="width:100%;">}}

## Vista de calendario de SLO

La vista de calendario del SLO está disponible en la [página de estado del SLO][2]. En la esquina superior derecha, cambia de la vista "Principal" a la vista "Diaria", "Semanal" o "Mensual" para ver 12 meses de datos históricos del estado del SLO. La vista de calendario es compatible con los SLOs basados en métricas y los SLOs de fracción de tiempo.

{{< img src="service_management/service_level_objectives/slo-calendar-view-2.png" alt="Vista de calendario del SLO" >}}

## Exportación a CSV de SLOs

{{< callout url="https://forms.gle/GQkcHDqaL5qWMss38" btn_hidden="false" header="Prueba la función de exportación a CSV de SLOs">}}
La función de exportación a CSV está en Vista previa. Rellena el formulario para solicitar acceso.
{{< /callout >}}

La función de exportación a CSV de SLOs está disponible en la [página de estado del SLO][2] cuando cambias a la vista de calendario "Semanal" o "Mensual". En estas vistas, puedes acceder a la nueva opción "Exportar a CSV" para descargar un CSV de los datos históricos de tu SLO con la siguiente información:

- ID, nombre y tipo de SLO
- Etiquetas de SLO
- SLO de destino
- Valores históricos del estado del SLO

{{< img src="service_management/service_level_objectives/slo-csv-export.png" alt="Vista de calendario del SLO" >}}

Los siguientes periodos de tiempo están disponibles para la exportación CSV:

- **Semanal:** Los estados de SLOs se basan en semanas alineadas con el calendario (Domingo 12am - Sábado 11:59pm)
- **Mensual:** Los estados de SLOs se basan en meses alineados con el calendario (primer día del mes 12am - último día del mes 11:59pm)

Estas horas se basan en la configuración de la zona horaria del usuario en Datadog.

Los estados de SLOs se calculan en función del tipo de SLO:
- **SLOs basados en métricas:** Porcentaje de eventos buenos sobre el total de eventos del periodo de tiempo
- **SLOs de fracción de tiempo:** Porcentaje de minutos buenos sobre el total de minutos del periodo de tiempo

**Notas:**

- Los SLOs que se exportan se basa en tu consulta de búsqueda.
- La vista de calendario es compatible con SLOs basados en métricas y de fracción de tiempo. Si exportas cualquier SLO basado en monitores, en el CSV sólo se incluyen el ID y el nombre del SLO (no los datos del historial de estado del SLO).
- Hay un límite de 1000 SLOs por exportación.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/service_level_objectives/guide/slo_types_comparison/
[2]: https://app.datadoghq.com/slo
[3]: /es/service_management/service_level_objectives/metric/
[4]: /es/service_management/service_level_objectives/monitor/
[5]: /es/service_management/service_level_objectives/time_slice/
[6]: /es/monitors/types/metric/?tab=threshold#alert-grouping
[7]: /es/service_management/service_level_objectives/metric/#define-queries
[8]: /es/service_management/service_level_objectives/monitor/#set-your-slo-targets
[9]: /es/service_management/service_level_objectives/metric/#set-your-slo-targets
[10]: /es/account_management/rbac/
[11]: /es/account_management/rbac/permissions/#service-level-objectives/
[12]: /es/account_management/rbac/permissions/#monitors
[13]: /es/monitors/guide/how-to-set-up-rbac-for-monitors/
[14]: /es/mobile
[15]: https://apps.apple.com/app/datadog/id1391380318
[16]: https://play.google.com/store/apps/details?id=com.datadog.app
[17]: /es/service_management/service_level_objectives/#saved-views
[18]: /es/account_management/teams/#associate-resources-with-team-handles
[19]: /es/api/latest/events/
[20]: /es/dashboards/guide/slo_data_source/
[21]: /es/dashboards/widgets/slo/
[22]: /es/dashboards/widgets/slo_list/
[23]: /es/monitors/types/event/
[24]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[25]: /es/api/latest/service-level-objective-corrections/
[26]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/slo_correction
[27]: /es/service_management/events/explorer/
[28]: /es/monitors/types/event/