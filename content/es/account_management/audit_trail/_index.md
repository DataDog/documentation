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
- link: /data_security/pci_compliance/
  tag: Documentación
  text: Crear una organización de Datadog que cumpla la normativa PCI
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Mejora el control, la gestión y la transparencia en todos tus equipos con
    Datadog Audit Trail
- link: https://www.datadoghq.com/blog/audit-trail-best-practices/
  tag: Blog
  text: Monitorizar activos y configuraciones críticos de Datadog con Audit Trail
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

**Nota**: Consulta [Cumplimiento DSS de la normativa PCI][2] para obtener información sobre la creación de una organización que cumpla con la normativa PCI de Datadog.

## Python

Para activar Datadog Audit Trail, consulta los [parámetros de tu organización][3], selecciona *Audit Trail Settings* (Configuración de Audit Trail), en *COMPLIANCE* (Cumplimiento), y haz clic en el botón **Enable** (Habilitar).

{{< img src="account_management/audit_logs/audit_trail_settings.png" alt="Página de los parámetros de Audit Trail donde se ve que está deshabilitado" style="width:85%;">}}

Si deseas comprobar quién activó Audit Trail:
1. Ve al [navegador de eventos][4].
2. Introduce `Datadog Audit Trail was enabled by` en la barra de búsqueda. Es posible que debas seleccionar un intervalo de tiempo más amplio para detectar el evento.
3. El evento más reciente con el título "A user enabled Datadog Audit Trail" (Un usuario activó Datadog Audit Trail) muestra quién lo habilitó por última vez.

## Dashboards


### Python
Sólo los usuarios con un permiso `Audit Trail Write` pueden habilitar o deshabilitar Audit Trail. Además, los usuarios necesitan el permiso `Audit Trail Read` para visualizar eventos de auditorías utilizando el navegador de auditorías. 

### Archivar

Archivar es una función opcional de Audit Trail. Puedes usarla para escribir en Amazon S3, Google Cloud Storage o Azure Storage y hacer que el sistema SIEM lea los eventos desde ahí. Después de crear o actualizar las configuraciones de tu archivo, pueden pasar varios minutos antes de que se vuelva a intentar cargar el archivo. Los eventos se cargan en el archivo cada 15 minutos, así que comprueba tu bucket de almacenamiento una vez que haya transcurrido ese tiempo para ver si los archivos se están cargando correctamente desde tu cuenta de Datadog.

Para habilitar el archivado de Audit Trail, ve a los [parámetros de tu organización][3] y selecciona *Audit Trail Settings* (Configuración de Audit Trail), en *Compliance* (Cumplimiento). Desplázate hasta Archiving (Archivado) y haz clic en el conmutador de eventos de almacenes para habilitar la función.

### Retención

Retener eventos es una función opcional de Audit Trail. Para activarla, desplázate hacia abajo hasta llegar a *Retention* (Retención) y haz clic en la opción *Retain Audit Trail Events* (Retener eventos de Audit Trail).

El período de retención predeterminado para un evento de trazas de auditoría es de siete días. Puedes establecer un período de retención de entre tres y 90 días.

{{< img src="account_management/audit_logs/retention_period.png" alt="Configuración de la retención de Audit Trail en Datadog" style="width:80%;">}}

## Explorar eventos de auditoría

Para explorar un evento de auditoría, navega hasta la sección [Audit Trail][1], también accesible desde los [parámetros de tu organización][3] en Datadog.

{{< img src="account_management/audit_logs/audit_side_nav.png" alt="Parámetros de Audit Trail en el menú Organization Settings style="width:30%;">}}

Los eventos de Audit Trail tienen la misma funcionalidad que los logs del [navegador de logs][5]:

- Para examinar los eventos de trazas de auditoría, puedes filtrarlos por nombres de evento (dashboards, monitores, autenticación, etc.), atributos de autenticación (actor, ID de la clave de API, correo electrónico de usuario, etc.), `Status` (`Error`, `Warn`, `Info`), método (`POST`, `GET`, `DELETE`) y otras variables.

- Si quieres examinar eventos de trazas de auditoría relacionados, selecciona un evento y ve a la pestaña de atributos del evento. Selecciona un atributo determinado para aplicarle un filtro o excluirlo de la búsqueda (p. ej., `http.method`, `usr.email`, `client.ip`, etc.).

{{< img src="account_management/audit_logs/attributes.png" alt="Audit Trail en el menú Organization Settings" style="width:50%;">}}


### Vistas guardadas

Para solucionar problemas de forma eficaz, es necesario que los datos estén en el contexto adecuado para poder analizarlos, tener acceso a las opciones de visualización para extraer información relevante y disponer de una lista de las variables adecuadas para poder realizar el análisis. El proceso de resolución de problemas depende del contexto, y las vistas guardadas hacen posible que tanto tú como tus compañeros de equipo podáis pasar de un contexto de resolución de problemas a otro. Las vistas guardadas (Saved Views) se encuentran en la esquina superior izquierda del navegador de Audit Trail.

Todas las vistas guardadas, menos la vista predeterminada, se comparten en toda tu organización:

* Las **vistas guardadas de integración** están incluidas de forma predefinida en Audit Trail. Estas vistas son de solo lectura y se identifican con el logotipo de Datadog.
* Las **vistas guardadas personalizadas** son creadas por los usuarios. Cualquier usuario de tu organización puede editarlas, (excepto los [usuarios de sólo lectura][6]), y están identificadas con el avatar del usuario que las ha creado. Haz clic en el botón **Save** (Guardar) para crear una nueva vista guardada personalizada a partir del contenido actual de tu explorador.

En cualquier momento, desde la entrada de la vista guardada en el panel Views (Vistas), puedes:

* **Cargar** o **recargar** una vista guardada.
* **Actualizar** una vista guardada con la configuración de la vista actual.
* **Cambiar el nombre** o **eliminar** una vista guardada.
* **Compartir** una vista guardada mediante un enlace corto.
* **Marcar con una estrella** (convertir en favorita) una vista guardada para que aparezca en la parte superior de tu lista de vistas guardadas y puedas acceder a ella directamente desde el menú de navegación.

**Nota:** Las acciones de actualizar, renombrar y borrar están deshabilitadas para las vistas guardadas en integraciones y para los [usuarios de sólo lectura][6].


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

### Auditoría de claves de API

<div class="alert alert-warning">La auditoría de claves de API está en fase beta privada.</div>

Los usuarios de Log Management pueden auditar el uso de claves de API utilizando Audit Trail. Para auditar claves de API, los logs tienen una etiqueta (tag) `datadog.api_key_uuid` que contiene el UUID de la clave de API utilizada para recopilar esos logs. Utiliza la siguiente información para determinar:
- Cómo se utilizan las claves de API en tu organización y las fuentes de telemetría.
- Rotación y gestión de claves de API.

## Crear un monitor

Para crear un monitor en un tipo de evento de Audit Trail o a través de atributos específicos de Trail, consulta la [documentación del monitor de Audit Trail][7]. Por ejemplo, configura un monitor que se active cuando un usuario específico inicia sesión o configura un monitor para cada ocasión en que se elimina un dashboard.

## Crear un dashboard o un gráfico

Aporta un contexto más visual a los eventos de trazas de auditoría con los dashboards. Para crear un dashboard de auditoría:

1. Crea un [nuevo dashboard][8] en Datadog.
2. Selecciona tu visualización. Puedes visualizar eventos de auditorías como [listas principales][9], [series temporales][10] y [listas][11].
3. [Grafica tus datos][12]: En Edit (Editar), selecciona *Audit Events* (Auditar eventos) como origen de datos y crea una consulta. Los eventos de auditorías se filtran por recuento y pueden agruparse por diferentes facetas. Selecciona una faceta y limítala.
{{< img src="account_management/audit_logs/audit_graphing.png" alt="Configura Audit Trail como fuente de datos para representar gráficamente tus datos" style="width:100%;">}}
4. Define tus preferencias de visualización y pon un título al gráfico. Haz clic en el botón *Save* (Guardar) para crear el dashboard.

## Crear un informe programado

Con Datadog Audit Trail, puedes enviar vistas de análisis de auditoría de forma periódica mediante correos electrónicos programados. Estos informes resultan útiles para monitorizar con regularidad el uso que se hace de la plataforma de Datadog. Por ejemplo, puedes optar por recibir un informe semanal del número inicios de sesión efectuados por cada usuario de Datadog y clasificados por país. Esta consulta te permite monitorizar los inicios de sesión anómalos o recibir información automatizada sobre el uso.

Para exportar una consulta de análisis de auditoría a modo de informe, crea una cronología, lista principal o consulta de tabla y haz clic en **More…** (Más…) > **Export as scheduled report** (Exportar como informe programado) para iniciar el proceso.

{{< img src="account_management/audit_logs/scheduled_report_export.png" alt="Función para exportar un informe programado del menú desplegable More…" style="width:90%;" >}}

1. Introduce un nombre para el dashboard, que se crea con el widget de consulta. Se creará un nuevo dashboard para cada informe programado. Podrás consultar y modificar este dashboard más adelante en caso de que necesites cambiar el contenido o la programación del informe.
2. Personaliza la frecuencia y la franja horaria del informe para programar su envío por correo electrónico.
3. Añade los destinatarios a los que quieres enviar el correo electrónico.
4. Añade cualquier mensaje personalizado adicional que sea necesario para el informe que envíes por correo electrónico.
5. Haz clic en **Create Dashboard and Schedule Report** (Crear dashboard y programar informe).

{{< img src="account_management/audit_logs/export_workflow.png" alt="Exportar una vista de análisis de auditoría a un correo electrónico programado" style="width:80%;" >}}

## Descargar eventos de auditorías como CSV

Audit Trail de Datadog te permite descargar localmente hasta 100.000 eventos de auditorías en forma de archivos CSV. Estos eventos pueden analizarse localmente, cargarse en otra herramienta para su posterior análisis o compartirse con los miembros adecuados del equipo, como parte de un ejercicio de seguridad y cumplimiento.

Para exportar eventos de auditorías como CSV:
1. Ejecuta la consulta de búsqueda adecuada para capturar los eventos que te interesan en
2. Añade campos de eventos como columnas, en la vista que elijas como parte del CSV
3. Haz clic en Download as CSV (Descargar como CSV)
4. Selecciona el número de eventos para exportar y expórtalos como CSV

## Dashboard predefinido

Audit Trail de Datadog trae un [dashboard listo para utilizar][13] que muestra varios eventos de auditorías, tales como cambios en la retención de índices, cambios en los pipelines de logs, cambios en el dashboard y más. Clona este dashboard para personalizar las consultas y las visualizaciones, según tus necesidades de auditoría.

{{< img src="account_management/audit_logs/audit_dashboard.png" alt="Dashboard de Audit Trail" style="width:100%;">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /es/data_security/pci_compliance/
[3]: https://app.datadoghq.com/organization-settings/
[4]: https://app.datadoghq.com/event/explorer
[5]: /es/logs/explorer/
[6]: https://docs.datadoghq.com/es/account_management/rbac/permissions/?tab=ui#general-permissions
[7]: /es/monitors/types/audit_trail/
[8]: /es/dashboards/
[9]: /es/dashboards/widgets/top_list/
[10]: /es/dashboards/widgets/timeseries/
[11]: /es/dashboards/widgets/list/
[12]: /es/dashboards/querying/#define-the-metric/
[13]: https://app.datadoghq.com/dash/integration/30691/datadog-audit-trail-overview?from_ts=1652452436351&to_ts=1655130836351&live=true