---
aliases:
- /es/account_management/audit_logs/
further_reading:
- link: /account_management/audit_trail/events/
  tag: Documentación
  text: Información sobre los eventos de Audit Trail
- link: /account_management/org_settings/
  tag: Documentación
  text: Información sobre los parámetros de organización
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Mejora el control, la gestión y la transparencia en todos tus equipos con
    Datadog Audit Trail
- link: https://www.datadoghq.com/blog/audit-trail-best-practices/
  tag: Blog
  text: Monitorizar activos y configuraciones críticos de Datadog con Audit Trail
kind: documentación
title: Datadog Audit Trail
---

## Información general

Los usuarios que sean administradores o miembros de un equipo de seguridad, pueden usar [Datadog Audit Trail][1] para ver quién está utilizando Datadog dentro de tu organización y el contexto en el lo está haciendo. Como usuario individual, también puedes ver un flujo (stream) de tus propias acciones.

En una traza de auditoría, pueden producirse dos tipos de eventos: **eventos de solicitud**, que traducen todas las solicitudes realizadas a la API de Datadog en registros de clientes, o **eventos específicos de productos**.

Por ejemplo, realiza un seguimiento de los **eventos de solicitud** para saber qué llamadas de la API hicieron que se produjera el evento. O, si eres administrador de empresa o de facturación, utiliza eventos de trazas de auditoría para hacer un seguimiento de los eventos de usuario que modifican el estado de tu infraestructura.

En este caso, los eventos de auditoría son útiles cuando se desea conocer eventos específicos de un producto, como:

  -  El momento en el que alguien cambió la retención de un índice porque el volumen de logs cambió y, por tanto, la factura mensual se vio alterada.

  - Quién modificó los procesadores o pipelines, y cuándo, porque se ha roto un dashboard o un monitor y hay que arreglarlo.

  - Quién ha modificado un filtro de exclusión porque el volumen de indexación ha aumentado o disminuido y no es posible encontrar los logs o tu factura ha subido.

Desde el punto de vista de los administradores de seguridad o equipos de InfoSec, los eventos de trazas de auditoría ayudan a llevar a cabo los checks de cumplimiento y a mantener las trazas de auditoría para saber quién hizo qué y cuándo en tus recursos de Datadog. Por ejemplo, los eventos conservan trazas de auditoría:

- De cada vez que alguien actualiza o elimina dashboards y monitores críticos, entre otros recursos de Datadog.

- De los inicios de sesión de los usuarios, la cuenta o los cambios de rol en tu organización.

## Configuración

Para activar Datadog Audit Trail, accede a [Organization Settings][2] (Parámetros de organización) y selecciona *Audit Trail Settings* (Parámetros de Audit Trail) en *Security* (Seguridad). Haz clic en el botón **Enable** (Activar).

{{< img src="account_management/audit_logs/audit_trail_settings.png" alt="Página de los parámetros de Audit Trail donde se ve que está deshabilitado" style="width:85%;">}}

Si deseas comprobar quién activó Audit Trail:
1. Accede a [Events Explorer][3] (Navegador de eventos).
2. Introduce `Datadog Audit Trail was enabled by` en la barra de búsqueda. Es posible que debas seleccionar un intervalo de tiempo más amplio para detectar el evento.
3. El evento más reciente con el título "A user enabled Datadog Audit Trail" (Un usuario activó Datadog Audit Trail) muestra quién lo habilitó por última vez.

## Configuración


### Archivar

Archivar es una función opcional de Audit Trail. Puedes usarla para escribir en Amazon S3, Google Cloud Storage o Azure Storage y hacer que el sistema SIEM lea los eventos desde ahí. Después de crear o actualizar las configuraciones de tu archivo, pueden pasar varios minutos antes de que se vuelva a intentar cargar el archivo. Los eventos se cargan en el archivo cada 15 minutos, así que comprueba tu bucket de almacenamiento una vez que haya transcurrido ese tiempo para ver si los archivos se están cargando correctamente desde tu cuenta de Datadog.

Para activar la función de archivar de Audit Trail, accede a [Organization Settings][2] (Parámetros de organización) y selecciona *Audit Trail Settings* (Parámetros de trazas de auditoría) en *Compliance* (Cumplimiento). Desplázate hacia abajo hasta Archiving (Archivar) y habilita la opción Store Events (Almacenar eventos).

### Retención

Retener eventos es una función opcional de Audit Trail. Para activarla, desplázate hacia abajo hasta llegar a *Retention* (Retención) y haz clic en la opción *Retain Audit Trail Events* (Retener eventos de Audit Trail).

El período de retención predeterminado para un evento de trazas de auditoría es de siete días. Puedes establecer un período de retención de entre tres y 90 días.

{{< img src="account_management/audit_logs/retention_period.png" alt="Configuración de la retención de Audit Trail en Datadog" style="width:80%;">}}

## Explorar eventos de auditoría

Para explorar un evento de auditoría, accede a la sección [Audit Trail][1], también accesible desde [Organization Settings][2], donde están tus parámetros de organización en Datadog.

{{< img src="account_management/audit_logs/audit_side_nav.png" alt="Parámetros de Audit Trail en el menú Organization Settings style="width:30%;">}}

Los eventos de Audit Trail tienen la misma función que los logs en el [Navegador de logs][4]:

- Para examinar los eventos de trazas de auditoría, puedes filtrarlos por nombres de evento (dashboards, monitores, autenticación, etc.), atributos de autenticación (actor, ID de la clave de API, correo electrónico de usuario, etc.), `Status` (`Error`, `Warn`, `Info`), método (`POST`, `GET`, `DELETE`) y otras variables.

- Si quieres examinar eventos de trazas de auditoría relacionados, selecciona un evento y ve a la pestaña de atributos del evento. Selecciona un atributo determinado para aplicarle un filtro o excluirlo de la búsqueda (p. ej., `http.method`, `usr.email`, `client.ip`, etc.).

{{< img src="account_management/audit_logs/attributes.png" alt="Audit Trail en el menú Organization Settings" style="width:50%;">}}


### Vistas guardadas

Para solucionar problemas de forma eficaz, es necesario que los datos estén en el contexto adecuado para poder analizarlos, tener acceso a las opciones de visualización para extraer información relevante y disponer de una lista de las variables adecuadas para poder realizar el análisis. El proceso de resolución de problemas depende del contexto, y las vistas guardadas hacen posible que tanto tú como tus compañeros de equipo podáis pasar de un contexto de resolución de problemas a otro. Las vistas guardadas (Saved Views) se encuentran en la esquina superior izquierda del navegador de Audit Trail.

Todas las vistas guardadas, menos la vista predeterminada, se comparten en toda tu organización:

* Las **vistas guardadas de integración** están incluidas de forma predefinida en Audit Trail. Estas vistas son de solo lectura y se identifican con el logotipo de Datadog.
* Las **vistas guardadas personalizadas** las crean los usuarios. Cualquier usuario de tu organización puede editarlas (excepto los [usuarios de solo lectura][5]), y se identifican con el avatar del usuario que las creó. Haz clic en el botón **Save** (Guardar) para crear una nueva vista guardada personalizada a partir del contenido actual de tu navegador.

En cualquier momento, desde la entrada de la vista guardada en el panel Views (Vistas), puedes:

* **Cargar** o **recargar** una vista guardada.
* **Actualizar** una vista guardada con la configuración de la vista actual.
* **Cambiar el nombre** o **eliminar** una vista guardada.
* **Compartir** una vista guardada mediante un enlace corto.
* **Marcar con una estrella** (convertir en favorita) una vista guardada para que aparezca en la parte superior de tu lista de vistas guardadas y puedas acceder a ella directamente desde el menú de navegación.

**Nota:** Las acciones de actualizar, cambiar el nombre y eliminar no están disponibles para las vistas guardadas de integración ni para [usuarios de solo lectura][5].


### Vista predeterminada

{{< img src="logs/explorer/saved_views/default.png" alt="Vista predeterminada" style="width:50%;" >}}

La función de vista predeterminada permite establecer un conjunto predefinido de consultas o filtros que se mostrarán siempre al abrir por primera vez el navegador de Audit Trail. Si en algún momento deseas acceder de nuevo a la vista predeterminada, basta con abrir el panel Views (Vistas) y hacer clic en el botón de recarga.

La vista actual del navegador de Audit Trail es tu vista guardada predeterminada. Solo tú puedes acceder y ver esta configuración y, si la actualizas, no afectará de ningún modo a tu organización. Es posible anular **temporalmente** la vista guardada predeterminada realizando cualquier acción en la IU o abriendo enlaces al navegador de Audit Trail con una configuración diferente.

En cualquier momento, desde la entrada de la vista predeterminada en el panel Views (Vistas), puedes:

* **Recargar** la vista predeterminada haciendo clic en la entrada.
* **Actualizar** tu vista predeterminada con los parámetros actuales.
* **Restablecer** tu vista predeterminada a los valores por defecto de Datadog para reiniciar de nuevo.

### Eventos destacados

Los eventos destacados son un subconjunto de eventos de auditoría que muestran posibles cambios críticos en la configuración que podrían afectar a la facturación o tener repercusiones sobre la seguridad según lo que detecte Datadog. Esto permite que los administradores de la organización puedan centrarse en los eventos más importantes de entre los numerosos eventos que se generan, sin tener que consultar todos los eventos disponibles y sus propiedades.

{{< img src="account_management/audit_logs/notable_events.png" alt="Panel de variables de eventos de auditoría en el que se muestran los eventos destacados que se han comprobado" style="width:30%;">}}

Se marcarán como eventos destacados aquellos que coincidan con las siguientes consultas.

| Descripción del evento de auditoría                                          | Consulta en el navegador de auditorías                           |
| ------------------------------------------------------------------- | --------------------------------------------------|
| Cambios en las métricas basadas en logs | `@evt.name:"Log Management" @asset.type:"custom_metrics"` |
| Cambios en los filtros de exclusión de índices de Log Management | `@evt.name:"Log Management" @asset.type:"exclusion_filter"` |
| Cambios en los índices de Log Management | `@evt.name:"Log Management" @asset.type:index` |
| Cambios en los filtros de retención de APM | `@evt.name:APM @asset.type:retention_filter` |
| Cambios en las métricas personalizadas de APM | `@evt.name:APM @asset.type:custom_metrics` |
| Cambios en las etiquetas (tags) de las métricas | `@evt.name:Metrics @asset.type:metric @action:(created OR modified)` |
| Creación y eliminación de aplicaciones de RUM | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:(created OR deleted)` |
| Cambios en los grupos de análisis del Sensitive Data Scanner | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group` |
| Creación o eliminación de tests Synthetic | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |

### Inspeccionar cambios (diferencias)

En la pestaña Inspect Changes (Diff) (Inspeccionar cambios [diferencias]) del panel de información de eventos de auditoría, se comparan los cambios de configuración realizados con respecto a la configuración previa. Los cambios realizados en las configuraciones del dashboard, el notebook y el monitor se muestran como objetos JSON.

{{< img src="account_management/audit_logs/inspect_changes.png" alt="Panel lateral de eventos de auditoría que muestra los cambios en la configuración de un monitor compuesto, en el que el texto resaltado en verde es lo que se ha cambiado y el texto resaltado en rojo es lo que se ha eliminado." style="width:70%;">}}


## Crear un monitor

Para crear un monitor sobre un tipo de evento de trazas de auditoría o mediante atributos específicos de trazas, consulta la [documentación sobre monitores de Audit Trail][6]. Por ejemplo, puedes establecer un monitor para que se active cuando un usuario específico inicie sesión, o establecerlo para cuando se elimine un dashboard.

## Crear un dashboard o un gráfico

Aporta un contexto más visual a los eventos de trazas de auditoría con los dashboards. Para crear un dashboard de auditoría:

1. Crea un [nuevo dashboard][7] en Datadog.
2. Selecciona el tipo de visualización que deseas. Los eventos de auditoría se pueden visualizar como [listas principales][8], [cronologías][9] y [listas][10].
3. [Representa gráficamente tus datos][11]. Al editar, selecciona *Audit Events* (Eventos de auditoría) como fuente de datos y crea una consulta. Los eventos de auditoría se filtran por número y pueden agruparse por diferentes variables. Selecciona una de ellas y establece un límite.
{{< img src="account_management/audit_logs/audit_graphing.png" alt="Configura Audit Trail como fuente de datos para representar gráficamente tus datos" style="width:100%;">}}
4. Define tus preferencias de visualización y pon un título al gráfico. Haz clic en el botón *Save* (Guardar) para crear el dashboard.

## Crear un informe programado

Con Datadog Audit Trail, puedes enviar vistas de análisis de auditoría de forma periódica mediante correos electrónicos programados. Estos informes resultan útiles para monitorizar con regularidad el uso que se hace de la plataforma de Datadog. Por ejemplo, puedes optar por recibir un informe semanal del número inicios de sesión efectuados por cada usuario de Datadog y clasificados por país. Esta consulta te permite monitorizar los inicios de sesión anómalos o recibir información automatizada sobre el uso.

Para exportar una consulta de análisis de auditoría a modo de informe, crea una cronología, lista principal o consulta de tabla y haz clic en **More…** (Más…) > **Export as scheduled report** (Exportar como informe programado) para iniciar el proceso.

{{< img src="account_management/audit_logs/scheduled_report_export.png" alt="Función para exportar un informe programado del menú deplegable More…" style="width:90%;" >}}

1. Introduce un nombre para el dashboard, que se crea con el widget de consulta. Se creará un nuevo dashboard para cada informe programado. Podrás consultar y modificar este dashboard más adelante en caso de que necesites cambiar el contenido o la programación del informe.
2. Personaliza la frecuencia y la franja horaria del informe para programar su envío por correo electrónico.
3. Añade los destinatarios a los que quieres enviar el correo electrónico.
4. Añade cualquier mensaje personalizado adicional que sea necesario para el informe que envíes por correo electrónico.
5. Haz clic en **Create Dashboard and Schedule Report** (Crear dashboard y programar informe).

{{< img src="account_management/audit_logs/export_workflow.png" alt="Exportar una vista de análisis de auditoría a un correo electrónico programado" style="width:80%;" >}}

## Dashboard predefinido

Datadog Audit Trail cuenta con un [dashboard predefinido][12] que muestra varios eventos de auditoría, como cambios en la retención de índices, en el pipeline de logs, en el dashboard, etc. Clona este dashboard para personalizar las consultas y visualizaciones y adaptarlas a las necesidades de tu auditoría.

{{< img src="account_management/audit_logs/audit_dashboard.png" alt="Dashboard de Audit Trail" style="width:100%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: https://app.datadoghq.com/organization-settings/
[3]: https://app.datadoghq.com/event/explorer
[4]: /es/logs/explorer/
[5]: https://docs.datadoghq.com/es/account_management/rbac/permissions/?tab=ui#general-permissions
[6]: /es/monitors/types/audit_trail/
[7]: /es/dashboards/
[8]: /es/dashboards/widgets/top_list/
[9]: /es/dashboards/widgets/timeseries/
[10]: /es/dashboards/widgets/list/
[11]: /es/dashboards/querying/#define-the-metric/
[12]: https://app.datadoghq.com/dash/integration/30691/datadog-audit-trail-overview?from_ts=1652452436351&to_ts=1655130836351&live=true