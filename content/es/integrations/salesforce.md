---
categories:
- cloud
- red
custom_kind: integration
dependencies: []
description: Recopila eventos de la plataforma Salesforce en tiempo real como logs
  de Datadog.
doc_link: https://docs.datadoghq.com/integrations/salesforce/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-salesforce-logs-datadog/
  tag: Blog
  text: Monitorización de logs de Salesforce con Datadog
git_integration_title: salesforce
has_logo: true
integration_id: ''
integration_title: Salesforce
integration_version: ''
is_public: true
manifest_version: '1.0'
name: salesforce
public_title: Salesforce
short_description: Recopila eventos de la plataforma Salesforce en tiempo real como
  logs de Datadog.
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/salesforce/salesforce_dashboard.png" alt="Dashboard de Salesforce predefinido en Datadog" popup="true">}}

## Información general

Salesforce ofrece un servicio de gestión de relaciones con los clientes y un conjunto complementario de aplicaciones empresariales centradas en el servicio al cliente, la automatización del marketing, el análisis y el desarrollo de aplicaciones.

Integra Salesforce con Datadog para:

- Ver y analizar la actividad de tus usuarios de Salesforce, la actividad de acceso a la plataforma y los logs de seguridad utilizando [Datadog Log Management][1].
- Configura [monitores][2] en [eventos][3] de tu plataforma Salesforce.
- Aprovecha [Security Platform][4] de Datadog para monitorizar y detectar amenazas en tu plataforma Salesforce.
- Monitoriza tu uu uso de la API Salesforce para asegurarte de que estás operando dentro de los límites de la API.

## Configuración

### Instalación

No requiere instalación.

### Configuración

Para configurar Salesforce para que envíe datos a Datadog debes tener acceso a la [monitorización de eventos Salesforce][5], habilitar el almacenamiento en tus eventos Salesforce y conectar tu organización Salesforce a Datadog.

#### Permisos

Si estás utilizando [Salesforce Shield][6], dispones de los permisos necesarios para todos los eventos. Si no tienes Shield, necesitas el [complemento de monitorización de eventos][7].

#### Habilitar el almacenamiento de eventos

Si tiene previsto utilizar la plataforma o eventos en tiempo real, debes configurarlos en el Gestor de eventos. Este paso no es necesario para eventos de archivos de logs de eventos.

1. [Inicia sesión][8] en tu cuenta de Salesforce (utilizando la interfaz Lightning).
2. Busca el **Gestor de eventos**.
3. En la página del Gestor de eventos, para cada evento que quieras rastrear, haz clic en la flecha de la derecha y selecciona **Enable Storage* (Habilitar almacenamiento). No es necesario **Habilitar la transmisión**. Puedes encontrar la lista
de eventos compatibles en la sección **Platform Events** (Eventos de plataforma), en la pestaña **Configuration** (Configuración) del [cuadro de la integración Salesforce][9].

#### Conexión de tu organización

1. Crea una cuenta de sistema única en tu organización de Salesforce.
2. Haz clic en **New Production Org** (Nueva organización de producción) o **New Sandbox Org** (Nueva organización sandbox) en la pestaña **Configuration** (Configuración) del [cuadro de la integración Salesforce][9].
3. Define cualquier etiqueta (tag) personalizada que quieras adjuntar a estos eventos como una lista separada por comas. Puede elegir cuáles eventos activar.

    {{< img src="integrations/salesforce/salesforce-1.png" alt="Pantalla logrado cuando has configurado con éxito tu organización Salesforce en Datadog" popup="true" style="width:90%" >}}

4. Haz clic en **Save** (Guardar). Se te pedirá que inicies sesión en tu cuenta de Salesforce y que concedas permisos de acceso a Datadog.
5. Una vez que hayas completado el proceso de inicio de sesión, regresa al [cuadro de la integración Salesforce][9] en Datadog. Tu organización incluye etiquetas predeterminadas.

    {{< img src="integrations/salesforce/salesforce-default-tags.png" alt="Pantalla logrado cuando has configurado con éxito tu organización Salesforce en Datadog" popup="true" style="width:90%" >}}

6. Selecciona las etiquetas que quieres utilizar y haz clic en **Connect** (Conectar).
7. Repite estos pasos para conectar tus organizaciones restantes. Debes tener acceso a las organizaciones que estás intentando añadir.

**Nota**: Se añade una etiqueta predeterminada con el ID de tu organización Salesforce, pero puedes editar [las etiquetas][10] con algo que sea más significativo para tu empresa.

#### Adición de objetos personalizados de Salesforce

Los [objetos personalizados de Salesforce][11] pueden ingerirse en Datadog de la siguiente manera:

1. En el cuadro de la integración de Salesforce, abre la sección Custom Objects (Objetos personalizados).
2. Añade uno o más objetos personalizados, en el formato de la API de Salesforce (`CustomObject__c`), separados por comas (`CustomObject1__c, CustomObject2__c`).
3. Activa o desactiva estos objetos personalizados como lo harías con otros eventos de Salesforce.

Los objetos personalizados se ingieren como logs, en función de la fecha de modificación. Todos los logs de objetos personalizados se etiquetan automáticamente con `salesforce_custom_object:true`.

#### Resultados

Transcurrido un tiempo, los [logs][1] aparecen bajo el origen `salesforce`. Salesforce escribe archivos de logs de eventos con poca frecuencia, por lo que puede pasar una hora o más hasta que aparezcan eventos basados en archivos de logs de eventos en Datadog.

{{< img src="integrations/salesforce/salesforce_dashboard_logs.png" alt="Widget del flujo (stream) de logs de Salesforce afuera de la casilla del dashboard de Salesforce" popup="true">}}

## Datos recopilados

### Métricas
{{< get-metrics-from-git "salesforce" >}}


### Logs

Esta integración te permitirá ver los logs generados a partir de la actividad del usuario de Salesforce, la actividad de acceso a la plataforma y la seguridad mediante [Datadog Log Management][1]. Para ver la lista completa de la actividad admitida, consulta [Real-Time Event Monitoring Data Storage][13] (Almacenamiento de datos de monitorización de eventos en tiempo real) y [EventLogFile Events][14] (Eventos de EventLogFile). Esta información también se encuentra disponible en la pestaña **Data Collected** (Datos recopilados) del cuadro de la integración de Salesforce.

### Checks de servicio

La integración Salesforce no incluye checks de servicio.

### Eventos

Esta integración no incluye eventos.

## Resolución de problemas

Si encuentras un error `The authenticated connection does not have access` en la pestaña Configuration (Configuración), es posible que te falten permisos para acceder a los eventos solicitados. Puedes habilitar temporalmente los permisos de administrador para el rol Datadog en Salesforce para confirmar si faltan permisos de acceso.

Como mínimo, el usuario debe tener los siguientes permisos:

* API habilitada
* Vista de instalación y configuración
* Vista de eventos de monitorización en tiempo real
* Vista de archivos de logs de eventos
* Vista de eventos de detección de amenazas

El usuario también debe tener permiso de lectura de cualquier objeto de evento subyacente que esté seleccionado en la configuración.

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][15].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/
[2]: /es/monitors/monitor_types/
[3]: /es/events/
[4]: /es/security_platform/
[5]: https://trailhead.salesforce.com/content/learn/modules/event_monitoring
[6]: https://www.salesforce.com/editions-pricing/platform/shield
[7]: https://help.salesforce.com/s/articleView?id=000339868&type=1
[8]: https://login.salesforce.com/
[9]: https://app.datadoghq.com/integrations/salesforce
[10]: /es/getting_started/tagging/using_tags/
[11]: https://help.salesforce.com/s/articleView?id=platform.dev_objectcreate_task_parent.htm&type=5
[12]: https://github.com/DataDog/integrations-internal-core/blob/main/salesforce/metadata.csv
[13]: https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/real_time_event_monitoring_storage.htm#storage-events
[14]: https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_eventlogfile_supportedeventtypes.htm
[15]: https://docs.datadoghq.com/es/help/