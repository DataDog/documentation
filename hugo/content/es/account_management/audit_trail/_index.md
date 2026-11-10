---
aliases:
- /es/account_management/audit_logs/
description: Haga un seguimiento de la actividad de usuario de Datadog, las solicitudes
  de API y los cambios en los recursos con un registro de auditoría integral para
  Compliance, seguridad y gobernanza.
further_reading:
- link: /account_management/audit_trail/events/
  tag: Documentación
  text: Obtenga información sobre los eventos de Audit Trail
- link: /account_management/org_settings/
  tag: Documentación
  text: Obtenga más información sobre la configuración de la organización
- link: /data_security/pci_compliance/
  tag: Documentación
  text: Compliance de PCI DSS
- link: https://www.datadoghq.com/blog/compliance-governance-transparency-with-datadog-audit-trail/
  tag: Blog
  text: Genere cumplimiento, gobernanza y transparencia en sus equipos con Datadog
    Audit Trail
- link: https://www.datadoghq.com/blog/audit-trail-best-practices/
  tag: Blog
  text: Haga un seguimiento de los activos y configuraciones críticos de Datadog con
    Audit Trail
- link: /account_management/delete_data/
  tag: Documentación
  text: Eliminar datos de Datadog
title: Datadog Audit Trail
---
## Descripción general {#overview}

Como administrador o miembro del equipo de seguridad, puede usar [Datadog Audit Trail][1] para ver quién está usando Datadog dentro de su organización y el contexto en el que lo están usando. Como individuo, también puede ver un flujo de sus propias acciones.

Existen dos tipos de eventos que pueden ocurrir dentro de un registro de auditoría: **eventos de solicitud**, que traducen todas las solicitudes realizadas a la API de Datadog en registros de clientes, o **eventos específicos del producto**.

Por ejemplo, realice un seguimiento de los **eventos de solicitud** para que pueda ver qué llamadas a la API condujeron al evento. O, si usted es un administrador de empresa o de facturación, utilice los eventos de Audit Trail para hacer un seguimiento de los eventos de usuario que cambian el estado de su infraestructura.

En esta circunstancia, los eventos de auditoría son útiles cuando desea conocer eventos específicos del producto, tales como:

  -  Cuando alguien cambió la retención de un índice porque el volumen de registros cambió y, por lo tanto, la factura mensual ha cambiado.

  - Quién modificó los procesadores o las canalizaciones, y cuándo se modificaron, ya que un dashboard o monitor ahora está roto y necesita ser reparado.

  - Quién modificó un filtro de exclusión porque el volumen de indexación ha aumentado o disminuido y no se pueden encontrar los registros o su factura aumentó.

Para los administradores de seguridad o los equipos de InfoSec, los eventos de Audit Trail ayudan con las verificaciones de Compliance y el mantenimiento de Audit Trail sobre quién hizo qué y cuándo, para sus recursos de Datadog. Por ejemplo, mantener un registro de auditoría:

- De cada vez que alguien actualiza o elimina dashboards, monitors y otros recursos críticos de Datadog.

- Para inicios de sesión de usuario, cambios de cuenta o de rol en su organización.

También puede analizar eventos de Audit Trail con [Cloud SIEM][15] para detectar amenazas y generar señales de seguridad. Consulte [Getting Started with Cloud SIEM][16] para obtener más información.

**Nota**: Las herramientas y políticas de Datadog cumplen con PCI v4.0. Para obtener más información, consulte [PCI DSS Compliance][2].

## Configuración {#setup}

Para habilitar Datadog Audit Trail, navegue a su [Organization Settings][3] y seleccione {{< ui >}}Audit Trail Settings{{< /ui >}} en {{< ui >}}COMPLIANCE{{< /ui >}}. Haga clic en el botón {{< ui >}}Enable{{< /ui >}}.

{{< img src="account_management/audit_logs/audit_trail_settings.png" alt="La página de configuración de Audit Trail que muestra que está deshabilitado" style="width:85%;">}}

Para ver quién habilitó Audit Trail:
1. Navegue a [Events Explorer][4].
2. Ingrese `Datadog Audit Trail was enabled by` en la barra de búsqueda. Es posible que deba seleccionar un rango de tiempo más amplio para capturar el evento.
3. El evento más reciente con el título "A user enabled Datadog Audit Trail" muestra quién habilitó Audit Trail por última vez.

## Configuración {#configuration}


### Permisos{#permissions}
Solo los usuarios con el permiso `Audit Trail Write` pueden habilitar o deshabilitar Audit Trail. Además, los usuarios necesitan el permiso `Audit Trail Read` para ver eventos de auditoría mediante Audit Explorer.

### Archivado {#archiving}

El archivado es una función opcional para Audit Trail. Puede usar el archivado para escribir en Amazon S3, Google Cloud Storage o Azure Storage y hacer que su sistema SIEM lea eventos desde allí. Después de crear o actualizar sus configuraciones de archivo, pueden pasar varios minutos antes de que se intente la siguiente carga de archivo. Los eventos se cargan al archivo cada 15 minutos, así que vuelva a consultar su bucket de almacenamiento en 15 minutos para asegurarse de que los archivos se estén cargando correctamente desde su cuenta de Datadog.

Para habilitar el archivado para Audit Trail, navegue a su [Organization Settings][3] y seleccione {{< ui >}}Audit Trail Settings{{< /ui >}} en {{< ui >}}Compliance{{< /ui >}}. Desplácese hacia abajo hasta Archiving y haga clic en el interruptor {{< ui >}}Store Events{{< /ui >}} para habilitarlo.

### Retención {#retention}

La retención de eventos es una función opcional para Audit Trail. En la sección {{< ui >}}Retention Period{{< /ui >}}, haga clic en {{< ui >}}Change retention period{{< /ui >}} para seleccionar una duración de retención adecuada para su caso de uso.

Cuando Audit Trail está habilitado, el período de retención predeterminado para un evento de Audit Trail es de 90 días. Puede establecer el período de retención en: 3, 7, 15, 30 o 90 días.

Cuando Audit Trail está deshabilitado, el período de retención se restablece a los 7 días predeterminados.

{{< img src="account_management/audit_logs/retention_period.png" alt="Configuración de retención de Audit Trail en Datadog" style="width:80%;">}}

## Explorar eventos de Audit Trail {#explore-audit-events}

Para explorar un evento de Audit Trail, navegue a la sección [Audit Trail][1], también accesible desde sus [Organization Settings][3] en Datadog.

{{< img src="account_management/audit_logs/audit_side_nav.png" alt="Configuración de Audit Trail en el menú de Organization Settings" style="width:30%;">}}

Los eventos de Audit Trail tienen la misma funcionalidad que los registros dentro del [Log Explorer][5]:

- Filtre para inspeccionar eventos de audit trail por nombres de evento (Dashboards, Monitors, Authentication y más), atributos de autenticación (Actor, API Key ID, correo electrónico del usuario y más), `Status` (`Error`, `Warn`, `Info`), método (`POST`, `GET`, `DELETE`) y otras facetas.

- Inspeccione eventos de audit trail relacionados seleccionando un evento y navegando a la pestaña de atributos del evento. Seleccione un atributo específico para filtrar o excluir de su búsqueda, como `http.method`, `usr.email`, `client.ip` y más.

{{< img src="account_management/audit_logs/attributes.png" alt="Audit Trail en el menú de Organization Settings" style="width:50%;">}}


### Consultas en lenguaje natural {#natural-language-queries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">
Esta función no es compatible con el sitio de Datadog seleccionado ({{< region-param key="dd_site_name" >}}).
</div>
{{< /site-region >}}

Utilice Natural Language Queries (NLQ) para describir lo que busca en inglés sencillo. Datadog traduce automáticamente su solicitud a una consulta de audit trail estructurada, lo que facilita la exploración de eventos de auditoría sin necesidad de escribir una sintaxis compleja.

El sistema traduce la entrada en lenguaje natural a consultas de Datadog y comprende el contexto, como usuarios, acciones, recursos y rangos de tiempo. También detecta campos relevantes automáticamente, por ejemplo, "Quién modificó el dashboard de pagos la semana pasada" o "Mostrar todos los cambios de roles en las últimas 24 horas".

{{< img src="account_management/audit_logs/audit_trail_nlq_light.mp4" alt="Consulta en lenguaje natural en Audit Trail que muestra cómo buscar eventos de Audit Trail usando frases en inglés sencillo" video=true >}}

### Vistas guardadas {#saved-views}

La resolución de problemas eficiente requiere que sus datos estén en el contexto adecuado para permitir la exploración, tener acceso a opciones de visualización para mostrar información significativa y tener facetas relevantes listadas para permitir el análisis. La resolución de problemas es contextual, y Saved Views facilitan que usted y su equipo cambien entre diferentes contextos de resolución de problemas. Puede acceder a Saved Views en la esquina superior izquierda del explorador de Audit Trail.

Todas las Saved Views, que no sean su vista predeterminada, se comparten en toda su organización:

* {{< ui >}}Integration saved views{{< /ui >}} vienen listas para usar con Audit Trail. Estas vistas son de solo lectura y se identifican con el logotipo de Datadog.
* {{< ui >}}Custom saved views{{< /ui >}} son creadas por los usuarios. Son editables por cualquier usuario de su organización (excepto [usuarios de solo lectura][6]) y se identifican con el avatar del usuario que las creó. Haga clic en el botón {{< ui >}}Save{{< /ui >}} para crear una nueva vista guardada personalizada a partir del contenido actual de su explorador.

En cualquier momento, desde la entrada de vista guardada en el panel Vistas:

* {{< ui >}}Load{{< /ui >}} o {{< ui >}}reload{{< /ui >}} una vista guardada.
* {{< ui >}}Update{{< /ui >}} una vista guardada con la configuración de la vista actual.
* {{< ui >}}Rename{{< /ui >}} o {{< ui >}}delete{{< /ui >}} una vista guardada.
* {{< ui >}}Share{{< /ui >}} una vista guardada a través de un enlace corto.
* {{< ui >}}Star{{< /ui >}} (convertir en favorito) una vista guardada para que aparezca en la parte superior de su lista y sea accesible directamente desde el menú de navegación.

**Nota:** Las acciones de actualizar, renombrar y eliminar están deshabilitadas para las vistas guardadas de integración y [usuarios de solo lectura][6].


### Vista predeterminada {#default-view}

{{< img src="logs/explorer/saved_views/default.png" alt="Vista predeterminada" style="width:50%;" >}}

La función de vista predeterminada le permite establecer un conjunto predeterminado de consultas o filtros que siempre verá cuando abra por primera vez el explorador de Audit Trail. Puede volver a su vista predeterminada abriendo el panel de Vistas y haciendo clic en el botón de recargar.

Su vista actual del explorador de Audit Trail es su vista guardada predeterminada. Esta configuración solo es accesible y visible para usted, y actualizar esta configuración no tiene ningún impacto en su organización. Puede **temporalmente** anular su vista guardada predeterminada al completar cualquier acción en la interfaz de usuario o al abrir enlaces al explorador de Audit Trail que incorporen una configuración diferente.

En cualquier momento, desde la entrada de vista predeterminada en el panel de Vistas:

* {{< ui >}}Reload{{< /ui >}} su vista predeterminada haciendo clic en la entrada.
* {{< ui >}}Update{{< /ui >}} su vista predeterminada con los parámetros actuales.
* {{< ui >}}Reset{{< /ui >}} su vista predeterminada a los valores predeterminados de Datadog para un reinicio desde cero.

### Eventos notables {#notable-events}

Los eventos notables son un subconjunto de eventos de auditoría que muestran posibles cambios de configuración críticos que podrían afectar la facturación o tener implicaciones de seguridad según lo identificado por Datadog. Esto permite a los administradores de la organización centrarse en los eventos más importantes de entre los muchos eventos generados, sin tener que aprender sobre todos los eventos disponibles y sus propiedades.

{{< img src="account_management/audit_logs/notable_events.png" alt="El panel de facetas de eventos de auditoría que muestra los eventos notables marcados" style="width:30%;">}}

Los eventos que coinciden con las siguientes consultas se marcan como notables. También puede recuperar todos los eventos notables mediante la consulta `is_notable_event:true`.

| Descripción del evento de auditoría                                          | Consulta en el explorador de auditoría                           |
| ------------------------------------------------------------------- | --------------------------------------------------|
| Cambios en las métricas basadas en registros | `@evt.name:"Log Management" @asset.type:"custom_metrics"` |
| Cambios en los filtros de exclusión de índices de Log Management | `@evt.name:"Log Management" @asset.type:"exclusion_filter"` |
| Cambios en los índices de Log Management | `@evt.name:"Log Management" @asset.type:index` |
| Cambios en los filtros de retención de APM | `@evt.name:APM @asset.type:retention_filter` |
| Cambios en las métricas personalizadas de APM | `@evt.name:APM @asset.type:custom_metrics` |
| Cambios en las etiquetas de métricas | `@evt.name:Metrics @asset.type:metric @action:(created OR modified)` |
| Creación y eliminación de aplicaciones RUM | `@evt.name:"Real User Monitoring" @asset.type:rum_application @action:(created OR deleted)` |
| Cambios en los grupos de escaneo de Sensitive Data Scanner | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group` |
| Creación o eliminación de pruebas Synthetic | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |
| Activación, desactivación y modificación de Product Analytics para aplicaciones | `@evt.name:"Product Analytics" @asset.type:product_analytics @action:(enabled OR disabled OR modified)` |

### Visualice la actividad completa de un usuario, incluidas las acciones delegadas al agente {#view-a-users-full-activity-including-agent-delegated-actions}

Cuando un agente de IA de Datadog actúa en nombre de un usuario, la información del agente completa `@usr.*` para ese evento, mientras que la información del usuario original completa `@delegator.*` en su lugar. Buscar solo `@usr.id:<USER_ID>` devuelve las acciones que un usuario realizó directamente y no incluye las acciones que un agente de IA de Datadog realizó en su nombre.

| Descripción del evento de auditoría                                                                        | Consulta en el explorador de auditoría                                     |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Acciones que un usuario realizó directamente                                                                    | `@usr.id:<USER_ID>`                                           |
| Todas las acciones atribuidas a un usuario, incluidas las acciones que un agente de IA de Datadog realizó en su nombre     | `(@usr.id:<USER_ID> OR @delegator.id:<USER_ID>)`               |

Consulte [Track Agentic Usage in Your Organization][18] para obtener más información sobre cómo filtrar y ver los eventos de auditoría generados por agentes.

### Inspeccionar cambios (Diff) {#inspect-changes-diff}

La pestaña Inspeccionar cambios (Diff) en el panel de detalles del evento de auditoría compara los cambios de configuración realizados con lo que estaba establecido anteriormente. Muestra los cambios realizados en las configuraciones de dashboard, notebook y monitor, los cuales se representan como objetos JSON.

{{< img src="account_management/audit_logs/inspect_changes.png" alt="El panel lateral del evento de auditoría que muestra los cambios en una configuración de monitor composite, donde el texto resaltado en verde es lo que se cambió y el texto resaltado en rojo es lo que se eliminó." style="width:70%;">}}

## Filtrar eventos de auditoría según Reference Tables {#filter-audit-events-based-on-reference-tables}

<div class="alert alert-danger">Las Reference Tables que contienen más de 1,000,000 de filas no se pueden utilizar para filtrar eventos. Consulte <a href="https://docs.datadoghq.com/integrations/guide/reference-tables/">Add Custom Metadata with Reference Tables</a> para obtener más información sobre cómo crear y administrar Reference Tables. </div>

Las Reference Tables le permiten combinar metadatos con eventos de auditoría, proporcionando más información para investigar el comportamiento de los usuarios de Datadog. Agregue un filtro de consulta basado en una Reference Table para realizar consultas de búsqueda. Para obtener más información sobre cómo activar y administrar esta función, consulte la guía [Reference Tables][2].

Para aplicar un filtro de consulta con Reference Tables, haga clic en el botón {{< ui >}}\+ Add{{< /ui >}} junto al editor de consultas y seleccione {{< ui >}}Join with Reference Table{{< /ui >}}. En el siguiente ejemplo, el filtro de consulta de Reference Table se utiliza para buscar dashboards modificados por usuarios que acceden a Datadog desde direcciones IP no autorizadas:

{{< img src="account_management/audit_logs/reference_tables.png" alt="El explorador de Datadog Audit Trail con las opciones de búsqueda de Reference Tables resaltadas" border="true" popup="true" style="width:100%;" >}}

### Auditoría de clave de API {#api-key-auditing}

Los usuarios de administración de registros pueden auditar el uso de clave de API con Audit Trail. Para la auditoría de clave de API, los registros tienen una etiqueta `datadog.api_key_uuid` que contiene el UUID de la clave de API utilizada para recopilar esos registros. Utilice esta información para determinar:
- Cómo se utiliza la clave de API en su organización y fuentes de telemetría.
- Rotación y administración de clave de API.

## Crear un monitor {#create-a-monitor}

Para crear un monitor sobre un tipo de evento de Audit Trail o mediante atributos específicos de Audit Trail, consulte la [documentación del monitor de Audit Trail][7]. Por ejemplo, establezca un monitor que se active cuando un usuario específico inicie sesión, o establezca un monitor para cualquier momento en que se elimine un dashboard.

## Cree un dashboard o un gráfico {#create-a-dashboard-or-a-graph}

Brinde más contexto visual a sus eventos de Audit Trail con dashboards. Para crear un Dashboard de auditoría:

1. Cree un [Nuevo Dashboard][8] en Datadog.
2. Seleccione su visualización. Puede visualizar eventos de auditoría como [listas principales][9], [series temporales][10] y [listas][11].
3. [Grafique sus datos][12]: En edición, seleccione *Eventos de auditoría* como fuente de datos y cree una consulta. Los eventos de auditoría se filtran por recuento y se pueden agrupar por diferentes facetas. Seleccione una faceta y un límite.
{{< img src="account_management/audit_logs/audit_graphing.png" alt="Establezca Audit Trail como fuente de datos para graficar sus datos" style="width:100%;">}}
4. Establezca sus preferencias de visualización y dele un título a su gráfico. Haga clic en el botón *Guardar* para crear el Dashboard.

## Envíe un informe programado {#send-out-a-scheduled-report}

Puede guardar su consulta de Audit Trail como un Dashboard y enviar un informe programado. Estos informes pueden ser útiles para el monitoreo regular del uso de la plataforma Datadog. Por ejemplo, puede enviar un correo electrónico semanal con la cantidad de inicios de sesión de usuarios únicos de Datadog por país. Esta consulta le permite monitorear la actividad de inicio de sesión anómala o recibir información automatizada sobre el uso.

Para crear un informe programado:

1. Vaya a [Audit Trail][1], ingrese su consulta para filtrar sus eventos de auditoría.
1. Haga clic en {{< ui >}}More{{< /ui >}} y seleccione {{< ui >}}Save to dashboard{{< /ui >}}.
    - Puede guardar en un Dashboard existente o crear un Dashboard nuevo.
1. En su Dashboard, haga clic en {{< ui >}}Share{{< /ui >}} y seleccione {{< ui >}}Schedule report{{< /ui >}}.
1. Siga las instrucciones en [Programar un informe][17] para configurar su informe.

## Descargar eventos de auditoría como CSV {#download-audit-events-as-csv}

Datadog Audit Trail le permite descargar localmente hasta 100 000 eventos de auditoría como un archivo CSV. Estos eventos pueden analizarse localmente, cargarse en una herramienta diferente para realizar análisis adicionales o compartirse con los miembros del equipo correspondientes como parte de un ejercicio de seguridad y cumplimiento.

Para exportar eventos de auditoría como CSV:
1. Ejecute la consulta de búsqueda adecuada que capture los eventos que le interesan
2. Agregue campos de evento como columnas en la visualizar que desee como parte del CSV
3. Haga clic en {{< ui >}}Download as CSV{{< /ui >}}
4. Seleccione la cantidad de eventos para exportar y exporte como CSV

## Tablero preconfigurado {#out-of-the-box-dashboard}

Datadog Audit Trail incluye un [tablero preconfigurado][13] que muestra varios eventos de auditoría, como cambios en la retención de índices, cambios en la canalización de registros, cambios en tableros y más. Clone este tablero para personalizar las consultas y visualizaciones según sus necesidades de auditoría.

{{< img src="account_management/audit_logs/audit_dashboard.png" alt="Tablero de Audit Trail" style="width:100%;">}}

## Lecturas adicionales {#further-reading}

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
[15]: /es/security/cloud_siem/
[16]: /es/getting_started/cloud_siem/
[17]: /es/dashboards/sharing/scheduled_reports/#schedule-a-report
[18]: /es/account_management/audit_trail/guides/track_agentic_usage_in_your_organization/