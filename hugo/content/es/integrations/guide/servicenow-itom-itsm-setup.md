---
further_reading:
- link: /integrations/servicenow/
  tag: Documentación
  text: Integración de ServiceNow
title: Configure ServiceNow ITOM e ITSM
---
La integración de ITOM/ITSM de ServiceNow le permite enviar alertas, elementos de trabajo e incidentes generados en Datadog a ServiceNow como registros en las tablas de incidentes o eventos. La integración depende de tablas provisionales y mapas de transformación.

Para usar la integración, siga las instrucciones para instalarla y, luego, configúrela para cada producto:
1. [Configure el mosaico de ServiceNow](#tile)
1. [Instale la integración de ITOM/ITSM](#install)
1. Configure la integración
   1. [Configure las notificaciones de seguimiento con plantilla de Datadog](#monitor-notifications)
   1. [Configure la Gestión de trabajo de Datadog](#case-management)
   1. [Configure la Datadog Incident Management](#incident-management)
1. [Personalice los datos con mapas de transformación](#transform-maps)

## Configure el mosaico de ServiceNow {#tile}

Antes de instalar la integración, asegúrese de tener el [mosaico de ServiceNow configurado][3] con su instancia de ServiceNow en Datadog.

## Instale la integración de ITOM/ITSM {#install}

Hay dos formas de instalar la integración:
- Datadog recomienda instalar la versión más reciente de la integración [ITOM/ITSM Integration for Datadog][1] desde la tienda de ServiceNow.
- Alternativamente, puede descargar el Update Set más reciente ([Datadog-Snow_Update_Set_v2.7.9.xml][2]) y cargarlo manualmente en su instancia de ServiceNow.

## Configure la integración {#configure-the-integration}

### Configure notificaciones de seguimiento con plantillas {#monitor-notifications}

<div class="alert alert-info">Estas funciones requieren la versión 2.6.0 o posterior de la integración de ITOM/ITSM.</a></div>

#### Configure el mapeo de prioridad de instancia {#configure-instance-priority-mapping}

De forma predeterminada, Datadog no incluye los niveles de impacto y urgencia de ServiceNow al enviar eventos a ServiceNow. Para cada configuración de ServiceNow, puede configurar mapeos entre esos niveles de ServiceNow y los niveles de prioridad de seguimiento de Datadog para su inclusión en los eventos generados por Datadog.

1. En Datadog, vaya a la página de [configuración de la integración de ServiceNow][4].
1. Vaya a la pestaña **Configurar**, luego a la pestaña **ITOM/ITSM** y después a la pestaña **Monitores**.
1. En **Mapeo de prioridad de instancia para plantillas**, abra la configuración de su instancia de ServiceNow.
1. Active el interruptor **Usar mapeo de prioridad de instancia**.
1. En **ServiceNow Urgency** y **ServiceNow Impact**, seleccione los niveles que desea que correspondan con los niveles de prioridad de seguimiento de Datadog. Por ejemplo:
   - Impacto: 4
   - Urgencia: 5
1. Haga clic en **Actualizar**.

#### Cree un @-handle de ServiceNow personalizado para notificaciones de seguimiento {#create-a-custom-servicenow-handle-for-monitor-notifications}

Para crear un registro de ServiceNow desde un seguimiento, necesita configurar un @-handle para usar dentro de las reglas de notificación del seguimiento o los destinatarios de la notificación.

1. En Datadog, vaya a la página de [configuración de la integración de ServiceNow][4].
1. Vaya a la pestaña **Configurar**, luego a la pestaña **ITOM/ITSM** y después a la pestaña **Monitores**.
1. Junto a **Plantillas**, haga clic en **+ Nuevo** para crear una plantilla nueva.
1. Defina un **Nombre** de @-handle, **Instancia** y **Tabla de destino** para la notificación de seguimiento que se enviará.
1. (Opcional) Establezca **Grupo de asignación**, **Servicio empresarial** y/o **Usuario** en la plantilla.<br /> **Nota**: Si establece tanto un grupo de asignación como un usuario, el usuario debe pertenecer al grupo de asignación seleccionado para que la creación del registro de ServiceNow se complete correctamente.
1. (Opcional) Expanda la sección **Personalizar carga útil de notificación** y haga clic en **Agregar campo** para añadir más variables de Datadog.
1. Haga clic en **Guardar**.

Para usar la nueva plantilla, agregue `@servicenow-<TEMPLATE_NAME>` en la descripción de un seguimiento. Cuando el seguimiento envía una alerta, ServiceNow también crea un registro correspondiente y lo establece automáticamente en **Resuelto** cuando la alerta subyacente se recupera.

{{% collapse-content title="Configurar notificaciones de seguimiento heredadas" level="h4" expanded=false id="configure-legacy-monitor-notifications" %}}
Para configurar notificaciones de seguimiento heredadas usando `@servicenow-<INSTANCE_NAME>`:

1. En Datadog, vaya a la página de [configuración de la integración de ServiceNow][4].
1. Vaya a la pestaña **Configurar**, luego a la pestaña **ITOM/ITSM** y después a la pestaña **Monitores**.
1. En **Administrar notificaciones de seguimiento heredadas**, seleccione la instancia para la que desea configurar las notificaciones y, a continuación, seleccione la tabla en la que se escribirán las notificaciones de seguimiento heredadas.
1. Para validar que la integración esté configurada correctamente, agregue `@servicenow-<INSTANCE_NAME>` en una notificación de seguimiento o evento. Puede definir los valores `Impact` y `Urgency` para que ServiceNow pueda usarlos para calcular la prioridad del incidente. Los datos sin procesar completan las filas en la tabla provisional y se reenvían a la tabla de ServiceNow especificada por la integración.
   {{< img src="integrations/guide/servicenow/servicenow-priority-field-mapping.png" alt="Ejemplo de monitor heredado con valores de Impacto y Urgencia definidos" style="width:100%;" >}}
1. Use [mapas de transformación](#transform-maps) en ServiceNow para personalizar la transformación de los datos enviados a las tablas provisionales.
1. Personalice la carga útil de la notificación con variables de Datadog disponibles o cadenas personalizadas.

**Nota**: `Impact` y `Urgency` en las descripciones de los monitores solo funcionan para configuraciones de monitores heredadas. Para monitores con plantilla, configure el mapeo de prioridad de instancia. El campo `priority` en los incidentes de ServiceNow es de solo lectura y solo se puede actualizar mediante [reglas de búsqueda de prioridad][8].
{{% /collapse-content %}}

{{% collapse-content title="Campos de tabla de monitor con plantilla y mapas de transformación" level="h4" expanded=false id="templated-monitor-table-fields-transform-maps" %}}
`action`
: **Tipo**: Cadena<br>
La acción que se está realizando en el monitor: `create`, `update`, `acknowledge` o `resolve`

`additional_information`
: **Tipo**: Cadena<br>
**Transformación de ITOM**: `additional_info`<br>
Cadena con formato que contiene todos los detalles del evento

`aggreg_key`
: **Tipo**: Cadena<br>
Clave de agregación que representa un hash del ID del monitor que alerta

`alert_cycle_key`
: **Tipo**: Cadena<br>
Clave que representa un hash del ciclo de alerta de un solo monitor (rastrea Alerta → Advertencia → Resolver)

`alert_id`
: **Tipo**: Cadena<br>
ID del monitor que alerta

`alert_metric`
: **Tipo**: Cadena<br>
**Transformación de ITOM**: `metric_name`<br>
Métrica que activó la alerta

`alert_query`
: **Tipo**: Cadena<br>
Consulta que activó la alerta

`alert_scope`
: **Tipo**: Cadena<br>
Alcance que activó la alerta

`alert_status`
: **Tipo**: Cadena<br>
Estado actual de la alerta

`alert_title`
: **Tipo**: Cadena<br>
Nombre de la alerta

`alert_transition`
: **Tipo**: Cadena<br>
**Transformación ITSM**: (script) -> estado<br>
Estado de transición de la alerta: `Triggered`, `Warn`, o `Recovered`

`assignment_group_sys_id`
: **Tipo**: Referencia<br>
**Transformación ITSM**: `assignment_group`<br>
**Tabla de referencia**: Grupo<br>
sys_id de ServiceNow para el grupo de asignación del identificador con plantilla

`business_service_sys_id`
: **Tipo**: Referencia<br>
**Transformación ITSM**: `business_service`<br>
**Reference Table**: Servicio<br>
sys_id de ServiceNow para el servicio empresarial del templated handle

`custom_fields`
: **Tipo**: Cadena<br>
Campos de clave-valor configurados por el usuario formateados como una cadena convertible a JSON

`datadog_tags`
: **Tipo**: Cadena<br>
Etiquetas de Datadog del seguimiento que genera la alerta

`description`
: **Tipo**: Cadena<br>
**Transformación ITSM**: `description`<br>
**Transformación ITOM**: `description`<br>
Descripción resumida de la alerta del seguimiento

`event_details`
: **Tipo**: Cadena<br>
**Transformación ITSM**: `work_notes`<br>
Detalles del evento con enlaces formateados y en los que se puede hacer clic hacia Datadog

`event_id`
: **Tipo**: Cadena<br>
ID de Datadog del evento

`event_link`
: **Tipo**: Cadena<br>
Enlace al evento creado a partir de la alerta del seguimiento

`event_msg`
: **Tipo**: Cadena<br>
Mensaje del evento

`event_title`
: **Tipo**: Cadena<br>
**Transformación ITSM**: `short_description`<br>
Título del evento

`event_type`
: **Tipo**: Cadena<br>
**Transformación ITOM**: `type`<br>
Tipo de evento

`hostname`
: **Tipo**: Cadena<br>
**Transformación ITSM**: `cmdb_ci`<br>
**Transformación ITOM**: `node`<br>
Servidor del seguimiento afectado

`impact`
: **Tipo**: Entero<br>
**Transformación ITSM**: `impact`<br>
Valor de impacto basado en el mapeo definido por el usuario de la prioridad del seguimiento

`logs_sample`
: **Tipo**: Cadena<br>
Muestra de registros relevantes

`monitor_priority`
: **Tipo**: Entero<br>
**Transformación ITOM**: `severity`<br>
Prioridad del seguimiento que genera la alerta como un entero

`org_name`
: **Tipo**: Cadena<br>
Nombre de la organización del seguimiento que genera la alerta

`sys_created_by`
: **Tipo**: Cadena<br>
**Transformación de ITSM**: `caller_id`<br>
Creador del registro (generalmente la cuenta de servicio de ServiceNow API configurada)

`ticket_state`
: **Tipo**: Cadena<br>
**Transformación de ITSM**: `state`, (script) -> close_code, (script) -> close_notes<br>
**Transformación de ITOM**: (script) -> resolution_notes<br>
Estado del registro de ServiceNow: `new` o `resolved`

`u_correlation_id`
: **Tipo**: Cadena<br>
**Transformación de ITSM**: `correlation_id`<br>
**Transformación de ITOM**: `message_key`<br>
Combinación de alert_cycle_key y aggreg_key utilizada para fusionar registros en el mismo incidente de destino

`urgency`
: **Tipo**: Entero<br>
**Transformación de ITSM**: `urgency`<br>
Urgencia establecida a partir del mapeo definido por el usuario en el mosaico de integración según la prioridad definida por el seguimiento

`user_sys_id`
: **Tipo**: Referencia<br>
**Transformación de ITSM**: `assigned_to`<br>
**Reference Table**: Usuario <br>
sys_id del templated handle proporcionado para el usuario

{{% /collapse-content %}}

### Configurar la Gestión de trabajo de Datadog {#case-management}

{{% site-region region="gov2" %}}
<div class="alert alert-warning">
La integración de Gestión de trabajo no es compatible en el {{< region-param key=dd_datacenter code="true" >}} sitio.
</div>
{{% /site-region %}}

Envíe elementos de trabajo desde Datadog a la tabla Datadog Cases ITSM en ServiceNow. ServiceNow almacena los registros entrantes y utiliza el conjunto de actualizaciones instalado para transformar los registros en la tabla de Incidentes. Datadog no admite cargas útiles personalizadas para esta tabla.

<div class="alert alert-info">El usuario que configure los ajustes en ServiceNow debe tener ambos roles: <code>x_datad_datadog.user</code> y <code>admin</code> roles.</a></div>

1. En Datadog, vaya a la página de [configuración de la integración de ServiceNow][4].
1. Vaya a la pestaña **Configurar**, luego a la pestaña **ITOM/ITSM** y después a la pestaña **Gestión de trabajo**.
1. En **Sincronizar ServiceNow con Gestión de trabajo**, abra la configuración de su instancia de ServiceNow.
1. Junto a **Tabla de casos**, elija enviar elementos de trabajo a **Datadog Cases ITSM**. **Nota**: ITOM no es compatible con la Gestión de trabajo.
1. Navegue a la página [**Gestión de trabajo > Configuración**][5] y expanda su proyecto. Luego, [configure la integración de ServiceNow][6] para ese proyecto.

### Configurar Datadog Incident Management {#incident-management}

La integración de Datadog con ServiceNow le permite crear incidentes en ServiceNow a partir de incidentes de Datadog y [sincronizar datos de forma bidireccional](#sync-bidirectionally) entre ambas plataformas. Esta integración con Datadog Incident Management proporciona una visibilidad mejorada, sincronización bidireccional automática del estado, la gravedad y cualquier actualización de estado del incidente, además de soporte para sus flujos de trabajo existentes en ServiceNow.

Después de instalar la integración, en Datadog, vaya a la página de [Configuración de integración][9]. Haga clic en el mosaico **ServiceNow** para configurar la creación de incidentes en ServiceNow.

Para obtener instrucciones paso a paso sobre cómo configurar esta integración para Incident Management, consulte [Integrar ServiceNow con Datadog Incident Management][12].

## Sincronice datos de forma bidireccional entre ServiceNow y Work/Incident Management {#sync-bidirectionally}

En ServiceNow, puede sincronizar el estado, el impacto y la urgencia de forma bidireccional tanto con Work Management como con Incident Management.

**Nota**: Los datos solo se sincronizan desde ServiceNow hacia Datadog si el cambio lo realiza un usuario con el rol ITIL que **no** sea el usuario configurado en el mosaico de integración de ServiceNow en Datadog.

1. En Datadog, siga las instrucciones para [crear una clave de aplicación de cuenta de servicio][7].<br />**Nota**: Datadog recomienda crear esta clave en lugar de usar una personal, lo cual conlleva el riesgo de interrumpir la sincronización de ServiceNow si la cuenta del usuario se desactiva o si cambian sus permisos.
1. En ServiceNow, haga clic en el icono del globo en la esquina superior derecha, luego asegúrese de que el **Application Scope** esté configurado en **ITOM/ITSM Integration for Datadog**.
1. En el menú de navegación superior izquierdo, haga clic en **All**.
1. Escriba **ITOM/ITSM Integration for Datadog** en el filtro.
1. Haga clic en el enlace **Configuration** de los resultados filtrados y luego ingrese la configuración requerida:
   1. Seleccione su **Datadog Data Center**.
   1. Pegue su **Datadog API Key**.
   1. Pegue la **clave de aplicación de cuenta de servicio** que creó.
   1. Marque la casilla **Enabled**.
1. Haga clic en **Guardar**.
1. (Opcional) Si tiene la versión 2.7.0 o más reciente de la integración ITOM/ITSM, puede usar información de alertas correlacionadas para rellenar valores en ServiceNow.<br /> Las instrucciones sobre cómo hacerlo se pueden encontrar a continuación en **Transformar datos de alertas correlacionadas**.



## Personalice los datos con mapas de transformación {#transform-maps}

La integración de ServiceNow escribe desde Datadog en tablas provisionales, las cuales se transforman en registros en ServiceNow. Para cualquier personalización (por ejemplo, [asignaciones de campos personalizados](#custom-field-mappings)), puede ampliar los mapas de transformación para especificar qué campos desea asignar desde Datadog a ServiceNow.

## Opciones de configuración adicionales {#additional-configuration-options}

{{% collapse-content title="Regla de vaciado automático de servidor de importación de Datadog" level="h3" expanded=false id="import-host-auto-flush" %}}
Para evitar que la tabla de conjunto de importación `x_datad_datadog_import_host` acumule demasiadas filas, se ha agregado una regla de vaciado automático a la herramienta Limpiador de tablas para conservar solo las últimas 24 horas de datos. Esta configuración se puede cambiar según sea necesario navegando a `sys_auto_flush_list.do` en el navegador de filtros y entrando en la regla para la tabla `x_datad_datadog_import_host`. El campo `Age in seconds` se puede actualizar en consecuencia.
{{% /collapse-content %}}

{{% collapse-content title="Crear asignaciones de campos personalizados en ServiceNow" level="h3" expanded=false id="custom-field-mappings" %}}
Para crear una asignación de campo personalizada en ServiceNow:

1. Haga clic en una de las tablas (por ejemplo, **Tablas ITSM de monitores de Datadog**) y desplácese hasta la parte inferior del registro para ver el enlace del mapa de transformación asociado.
1. Haga clic en el nombre del mapa de transformación para ver el registro:
   {{< img src="integrations/guide/servicenow/servicenow-click-transform-map.png" alt="Mapa de transformación de tabla de ServiceNow que muestra la transformación de incidentes de Datadog que asigna la tabla de incidentes de Datadog a la tabla de incidentes." style="width:100%;" >}}
   En la parte superior hay dos campos importantes en el registro de transformación: <code>Source table</code> y <code>Target table</code>:
   {{< img src="integrations/guide/servicenow/servicenow-source-target-fields.png" alt="Mapa de transformación de incidentes de Datadog en ServiceNow que muestra la tabla fuente 'Datadog Incident Table' asignada a la tabla de destino Incidente [incident]" style="width:100%;" >}}
1. Haga clic en **Nuevo**:
   {{< img src="integrations/guide/servicenow/servicenow-click-new.png" alt="Pestaña de asignaciones de campos en ServiceNow que muestra las asignaciones de campos de origen y destino para la transformación de incidentes de Datadog. Una flecha rosa señala el botón Nuevo utilizado para agregar una nueva asignación de campo." style="width:100%;" >}}
1. Seleccione los campos de origen y destino para las asignaciones uno a uno:
   {{< img src="integrations/guide/servicenow/servicenow-select-source-target.png" alt="Configuración de asignación de campos de ServiceNow que muestra el campo de origen PRIORITY asignado al campo de destino Severity en el mapa de transformación de incidentes de Datadog" style="width:100%;" >}}
   O marque la casilla <strong>Usar script de origen</strong> y defina las transformaciones:
   {{< img src="integrations/guide/servicenow/servicenow-script-example.png" alt="Script de asignación de campos de ServiceNow en la Transformación de incidentes de Datadog que muestra un script de origen que asigna valores de source.priority a niveles de gravedad numéricos para el campo Prioridad en la tabla de Incidentes." style="width:100%;" >}}

Para asignar campos personalizados en el mosaico de integración, puede usar el siguiente script para los mapas de transformación Datadog Monitors ITOM y Datadog Monitors ITSM. En este ejemplo, el campo `my_field` se define como un campo personalizado en el mosaico de integración:

```
answer = (function transformEntry(source)
{
    var additional_info = JSON.parse(source.additional_info);
    return additional_info.my_field;
})(source);
```

**Notas**:
- La fuente es la tabla de importación que seleccionó (en este ejemplo, Datadog Monitors ITSM Tables) y el destino es su tabla de incidentes (o tabla de eventos) real donde se almacenan los eventos.
- Las asignaciones de campos se encuentran en la parte inferior del registro. Se incluyen algunas asignaciones básicas. Aquí es donde selecciona los campos a incluir, define el formato y selecciona los campos de destino en su instancia de ServiceNow.
{{% /collapse-content %}}

{{% collapse-content title="Transformar datos de alertas correlacionadas" level="h3" expanded=false id="transform-correlated-alert-data" %}}
Para usar información de alertas correlacionadas para completar valores en ServiceNow, agregue un nuevo script de transformación onBefore bajo el mapa de transformación de la tabla Datadog Cases ITSM/ITOM.

Para completar datos en el incidente de ServiceNow, debe modificar su script para analizar los datos que se han enviado desde Datadog y almacenado en la columna EM Correlated Alert, y especificar a qué campos en el incidente desea enviar los datos analizados. A continuación se muestra un script de ejemplo que puede personalizar según sus necesidades:

```
(function runTransformScript(source, map, log, target /*undefined onStart*/ ) {
    // We do not need to process non-correlated-alert events
    if (!source.em_correlated_alert_id) {
        return;
    }

    // Create a GlideRecord for the table
    var gr = new GlideRecord('x_datad_datadog_case_incident_table');
    gr.addQuery('case_id', source.case_id);
    gr.addNotNullQuery('em_correlated_alert_id');
    gr.orderByDesc('sys_created_on');
    gr.query();

    // Ensure we process each alert_id only once
    var seenAlert = {};

    // Add relevant correlated alert fields here
    var alertNames = [];


    // Loop through list of correlated_alerts associated with the same case_id
    while (gr.next()) {
        var emAlertId = gr.getValue('em_correlated_alert_id');

        if (!seenAlert.hasOwnProperty(emAlertId)) {
            seenAlert[emAlertId] = true;
            var changeType = gr.getValue('em_change_type');
            if (changeType == "added") {
                var correlatedAlert = gr.getValue("em_correlated_alert");
                var jsonAlert = JSON.parse(correlatedAlert);

                // Get relevant fields from the JSON event
                var alertName = jsonAlert['alert_message'];
                alertNames.push(alertName);
            }
        }
    }

    // Set the corresponding value on the incident table
    // target.impact = 1;

})(source, map, log, target);
```

{{% /collapse-content %}}

## Solución de problemas {#troubleshooting}

{{% collapse-content title="Mensaje de error en su integración de Datadog" level="h3" expanded=false id="troubleshooting-error-messages" %}}
Si recibe un mensaje de error en su mosaico de integración de Datadog, o una notificación `Error while trying to post to your ServiceNow instance`:
- Verifique que solo se haya utilizado el subdominio al ingresar el nombre de su instancia.
- Verifique que el usuario que creó tenga los permisos requeridos.
- Verifique que el nombre de usuario y la contraseña sean correctos.
{{% /collapse-content %}}

{{% collapse-content title="No se creó el ticket" level="h3" expanded=false id="troubleshooting-no-ticket" %}}
Si la integración está configurada y se activó una alerta, pero no se crea ningún ticket:
- Confirme que la tabla provisional esté poblada. Si es así, el problema está en las asignaciones y transformaciones. Puede depurar sus asignaciones y scripts aún más navegando a **Errores de transformación** en ServiceNow.
- Confirme que está trabajando con la tabla provisional que especificó en el mosaico.

El usuario de ServiceNow necesita los roles `rest_service` y `x_datad_datadog.user` para que pueda acceder a las tablas de importación. Si está utilizando la forma heredada de enviar notificaciones directamente a la tabla de Incidentes o a la tabla de Eventos, necesita los permisos `itil` y `evt_mgmt_integration`.
{{% /collapse-content %}}

{{% collapse-content title="No hay actualizaciones de ServiceNow a Datadog" level="h3" expanded=false id="troubleshooting-no-updates" %}}
Si ve actualizaciones de Datadog Work Management a ServiceNow, pero no ve actualizaciones de ServiceNow a Datadog, este es el comportamiento esperado para ServiceNow ITOM. La sincronización bidireccional con Work Management solo es compatible con ServiceNow ITSM.
{{% /collapse-content %}}

{{% collapse-content title="Monitor que duplica incidentes" level="h3" expanded=false id="troubleshooting-monitors-duplicating-incidents" %}}
Si un monitor vuelve a abrir el mismo incidente en lugar de crear uno nuevo para cada advertencia, asegúrese de que no esté configurado como una alerta simple. Convierta el monitor en una [alerta múltiple][11] agrupándolo mediante una etiqueta en la métrica. De esta manera, cada alerta activará un incidente independiente.
{{% /collapse-content %}}

¿Necesita ayuda adicional? Comuníquese con el [soporte de Datadog][10].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://store.servicenow.com/store/app/e0e963a21b246a50a85b16db234bcb67
[2]: /es/resources/xml/Datadog-Snow_Update_Set_v2.7.9.xml
[3]: /es/integrations/servicenow/#configure-the-servicenow-tile-in-datadog
[4]: https://app.datadoghq.com/integrations?integrationId=servicenow
[5]: https://app.datadoghq.com/work/settings
[6]: /es/incident_response/work_management/notifications_integrations/#servicenow
[7]: /es/account_management/org_settings/service_accounts/#create-or-revoke-application-keys
[8]: https://docs.servicenow.com/en-US/bundle/sandiego-it-service-management/page/product/incident-management/task/def-prio-lookup-rules.html
[9]: https://app.datadoghq.com/incidents/settings?section=integrations
[10]: /es/help/
[11]: /es/monitors/configuration/?tab=thresholdalert#multi-alert
[12]: /es/incident_response/incident_management/integrations/servicenow