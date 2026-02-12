---
app_id: salesforce
app_uuid: 791208ed-fdbb-47ce-bd70-9c3cab7a51ef
assets:
  dashboards:
    salesforce: assets/dashboards/salesforce.json
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check: salesforce.limits.max
      metadata_path: metadata.csv
      prefix: salesforce.limits.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 607
    source_type_name: Salesforce
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- métricas
- seguridad
- colaboración
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: salesforce
integration_id: salesforce
integration_title: Salesforce
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: salesforce
public_title: Salesforce
short_description: Recopila eventos de la plataforma Salesforce en tiempo real como
  logs de Datadog.
supported_os:
- linux
- windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Métricas
  - Categoría::Seguridad
  - Category::Collaboration
  - Categoría::Recopilación de logs
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Logs
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  configuration: README.md#Configuración
  description: Recopila eventos de la plataforma Salesforce en tiempo real como logs
    de Datadog.
  media:
  - caption: Dashboard con información general de Salesforce
    image_url: images/overview-dashboard.png
    media_type: imagen
  - caption: Logs de eventos de Salesforce
    image_url: images/logs-screenshot.png
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-salesforce-logs-datadog/
  - resource_type: documentación
    url: https://docs.datadoghq.com/integrations/salesforce/
  support: README.md#Soporte
  title: Salesforce
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
!["Salesforce dashboard"][1]

## Información general

Salesforce ofrece un servicio de gestión de relaciones con los clientes y un conjunto complementario de aplicaciones empresariales centradas en el servicio al cliente, la automatización del marketing, el análisis y el desarrollo de aplicaciones.

La integración de Salesforce recopila logs de eventos a través de la API de [Event log File (ELF)][2] y el flujo (stream) de [Real-Time Event Monitoring][3] para proporcionar visibilidad de tu entorno Salesforce. Esta integración te ayuda a realizar un seguimiento de las acciones de los usuarios, como inicios de sesión, cierres de sesión y verificación de identidad. Incluye la compatibilidad con una amplia variedad de tipos de eventos, como eventos estándar, archivos de logs y eventos de plataforma personalizados. También puedes ingerir objetos personalizados[21] y eventos de plataforma personalizados[25] como logs. Los objetos personalizados se recopilan mediante sondeos periódicos, mientras que los eventos de plataforma personalizados se transmiten en tiempo real mediante la API Pub/Sub de Salesforce, lo que proporciona una visibilidad casi instantánea de tus eventos empresariales personalizados a medida que se producen. La integración funciona a la perfección tanto con los eventos predeterminados definidos por Salesforce como con los eventos u objetos personalizados que los clientes configuran específicamente en sus propias instancias.

Integra Salesforce con Datadog para:


-   Visualiza y analiza la actividad de tus usuarios de Salesforce, la actividad de acceso a la plataforma y los logs de seguridad utilizando [Datadog Log Management][4].
-   Configura [monitores][5] en [eventos][6] de tu plataforma Salesforce.
-   Monitoriza tu uso de la API Salesforce para asegurarte de que estás operando dentro de los límites de la API y evitar problemas, como por ejemplo alcanzar los límites de la API.
-   Utiliza [Cloud SIEM][7] para correlacionar eventos, detectar amenazas avanzadas e investigar actividades sospechosas de forma más eficaz.
-   Enriquece tu telemetría con metadatos de tu instancia de Salesforce utilizando [Tablas de referencia][8] de Datadog. Al asignar campos de valor a una clave principal, puedes añadir automáticamente estos campos a logs a eventos que contengan esa clave.

Datadog analiza automáticamente logs de Salesforce, por lo que puedes filtrar por ID de usuario, dirección IP o entidad de Salesforce para identificar anomalías, como intentos de inicio de sesión sospechosos o actividad inusual. La integración también incluye un dashboard predefinido para monitorizar la actividad, que puedes personalizar para satisfacer tus necesidades.
Comienza a monitorizar tus logs de Salesforce hoy mismo y aprovecha las herramientas de análisis de Datadog para mejorar la seguridad, el rendimiento y las estrategias operativas.

## Configuración

### Instalación

No requiere instalación.

### Configuración

Para configurar Salesforce para que envíe datos a Datadog debes tener acceso a [Salesforce Event Monitoring][9], habilitar el almacenamiento en tus eventos de Salesforce y conectar tu organización Salesforce a Datadog.

#### Permisos

Si utilizas [Salesforce Shield][10], dispones de los permisos necesarios para todos los eventos. Si no tienes Shield, necesitas el [complemento de monitorización de eventos][11].

#### Habilitar el almacenamiento de eventos

Si tiene previsto utilizar la plataforma o eventos en tiempo real, debes configurarlos en el Gestor de eventos. Este paso no es necesario para eventos de archivos de logs de eventos.

1. [Inicia sesión][12] en tu cuenta de Salesforce (utilizando la interfaz Lightning).
2. Busca el **Gestor de eventos**.
3. En la página del Gestor de eventos, para cada evento que quieras rastrear, haz clic en la flecha derecha y selecciona **Habilitar almacenamiento**. No es necesario **Activar la transmisión**. La lista de eventos compatibles se encuentra en la sección **Eventos de plataforma** de la pestaña **Configuración** del [cuadro de la integración Salesforce][13].

#### Conexión de tu organización

1. Crea una cuenta de sistema única en tu organización de Salesforce.
2. Haz clic en **New Production Org** (Nueva organización de producción) o **New Sandbox Org** (Nueva organización sandbox) en la pestaña **Configuración** del [cuadro de la integración Salesforce][13].
3. Define cualquier etiqueta (tag) personalizada que quieras adjuntar a estos eventos como una lista separada por comas. Puede elegir cuáles eventos activar.

!["Salesforce successfully dashboard"][14]

4. Haz clic en **Save** (Guardar). Se te pedirá que inicies sesión en tu cuenta de Salesforce y que concedas permisos de acceso a Datadog.
5. Una vez que hayas completado el proceso de inicio de sesión, regresa al [cuadro de la integración Salesforce][13] en Datadog. Tu organización incluye etiquetas predefinidas.

!["Salesforce default tags"][15]


6. Selecciona las etiquetas que quieres utilizar y haz clic en **Connect** (Conectar).
7. Repite estos pasos para conectar tus organizaciones restantes. Debes tener acceso a las organizaciones que estás intentando añadir.

**Nota**: Se añade una etiqueta predeterminada con el ID de tu organización Salesforce, pero puedes editar [las etiquetas][16] con algo que sea más significativo para tu empresa.

#### Adición de objetos personalizados de Salesforce

Los [objetos personalizados de Salesforce][17] pueden ingerirse en Datadog:

1. En el cuadro de la integración de Salesforce, abre la sección Custom Objects (Objetos personalizados).
2. Añade uno o más objetos personalizados, en el formato de la API de Salesforce (`CustomObject__c`), separados por comas (`CustomObject1__c, CustomObject2__c`).
3. Activa o desactiva estos objetos personalizados como lo harías con otros eventos de Salesforce.

Los objetos personalizados se ingieren como logs, en función de la fecha de modificación. Todos los logs de objetos personalizados se etiquetan automáticamente con `salesforce_custom_object:true`.

#### Añadir eventos personalizados de la plataforma Salesforce

Los [eventos personalizados de la plataforma de Salesforce][18] pueden transmitirse a Datadog en tiempo real:

1. En el cuadro de la integración Salesforce, abre la sección Eventos personalizados.
2. Añade uno o más eventos personalizados de la plataforma en el formato de la API de Salesforce (`CustomEvent__e`), separado por comas (`CustomEvent1__e, CustomEvent2__e`).
3. Activa o desactiva estos eventos personalizados como lo harías con otros eventos de Salesforce.

Los eventos personalizados se ingieren como logs y se transmiten en tiempo real mediante la API Pub/Sub de Salesforce. Todos los logs de eventos personalizados se etiquetan automáticamente con `salesforce_custom_event:true`.

#### Resultados

Transcurrido un tiempo, los [logs][4] aparecen en la fuente `salesforce`. Salesforce escribe archivos de logs de eventos con poca frecuencia, por lo que puede pasar una hora o más hasta que aparezcan eventos de logs basados en archivos en Datadog.

!["Salesforce Log Stream widget"][19]


#### Activar la ingesta de tablas de referencia

##### Identifica las tablas y los campos que quieres importar.

1. En Salesforce, abre **Object Manager** (Gestor de objetos).
2. Selecciona el objeto que quieres ingerir en Datadog.
3. Selecciona **Campos y relaciones** del objeto.

##### Define y valida tu consulta de Salesforce.

1. Abre la [consola para desarrolladores][20] en Salesforce.
2. Crea y prueba una consulta en la **consola para desarrolladores** seleccionando los campos deseados del objeto.

##### Define t tabla de referencia de Datadog con tu consulta de Salesforce.

1. En Datadog, ve a la pestaña Salesforce y selecciona una cuenta existente o añade una nueva.
2. Haz clic en el botón **Add New Reference Table** (Añadir nueva tabla de referencia).
3. Introduce un nombre único para el **nombre de tabla**.
4. Selecciona un campo en la consulta con valores únicos e introdúcelo como **clave principal**.
5. Copia la consulta de trabajo de la **consola para desarrolladores de Salesforce** en **Consulta de Salesforce**.
6. Haz clic en **Save All Changes** (Guardar todos los cambios).

##### Solucionar problemas

-   Los campos de la **tabla de referencia** no se pueden modificar después de guardarlos. Elimínalos y añade nuevas tablas si es necesario.
-   Puedes esperar ver datos de servicio rellenados en Datadog, varios minutos después de las ejecuciones programadas de tus consultas.
-   Monitoriza el proceso de ingesta en el [Explorador de eventos][21] de Datadog delimitando tu consulta de búsqueda con `source:salesforce`.
-   Ve a [Tablas de referencia][22] y busca la tabla que acabas de crear, utilizando el **nombre de la tabla**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "salesforce" >}}


### Logs

Esta integración te permitirá ver los logs generados a partir de la actividad del usuario de Salesforce, la actividad de acceso a la plataforma y la seguridad mediante [Datadog Log Management][4]. Para ver la lista completa de actividades compatibles, consulta [Almacenamiento de datos de monitorización de eventos en tiempo real][24] y [Eventos de EventLogFile][25]. Esta información también se encuentra disponible en la pestaña **Datos recopilados** del cuadro de la integración Salesforce.

### Checks de servicio

La integración Salesforce no incluye checks de servicio.

### Eventos

Esta integración no incluye eventos.

## Solucionar problemas

Si encuentras un error `The authenticated connection does not have access` en la pestaña Configuration (Configuración), es posible que te falten permisos para acceder a los eventos solicitados. Puedes habilitar temporalmente los permisos de administrador para el rol Datadog en Salesforce para confirmar si faltan permisos de acceso.

Como mínimo, el usuario debe tener los siguientes permisos:

-   API habilitada
-   Vista de instalación y configuración
-   Vista de eventos de monitorización en tiempo real
-   Vista de archivos de logs de eventos
-   Vista de eventos de detección de amenazas

El usuario también debe tener permiso de lectura de cualquier objeto de evento subyacente que esté seleccionado en la configuración.

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][26].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: images/salesforce_dashboard.png
[2]: https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_eventlogfile.htm
[3]: https://help.salesforce.com/s/articleView?id=xcloud.real_time_event_monitoring_overview.htm&type=5
[4]: https://docs.datadoghq.com/es/logs/
[5]: https://docs.datadoghq.com/es/monitors/monitor_types/
[6]: https://docs.datadoghq.com/es/events/
[7]: https://www.datadoghq.com/dg/security/siem-solution/?utm_source=google&utm_medium=paid-search&utm_campaign=dg-security-na-siem&utm_keyword=cloud%20siem&utm_matchtype=p&igaag=132461095403&igaat=&igacm=15832880540&igacr=596304643080&igakw=cloud%20siem&igamt=p&igant=g&utm_campaignid=15832880540&utm_adgroupid=132461095403&gad_source=1&gad_campaignid=15832880540&gbraid=0AAAAADFY9Nk4R9kufMZrEHHWbK5eqZZx2&gclid=CjwKCAjw9anCBhAWEiwAqBJ-c0nfgfSoSTYESZQYWMFFq8d9Rci-lAqvm2nd_v7dFV-xfXHk4XeEiBoCXJ4QAvD_BwE
[8]: https://docs.datadoghq.com/es/reference_tables/?tab=manualupload
[9]: https://trailhead.salesforce.com/content/learn/modules/event_monitoring
[10]: https://www.salesforce.com/editions-pricing/platform/shield
[11]: https://help.salesforce.com/s/articleView?id=000339868&type=1
[12]: https://login.salesforce.com/
[13]: https://app.datadoghq.com/integrations/salesforce
[14]: images/salesforce-config.png
[15]: images/salesforce-default-tags.png
[16]: https://docs.datadoghq.com/es/getting_started/tagging/using_tags/
[17]: https://help.salesforce.com/s/articleView?id=platform.dev_objectcreate_task_parent.htm&type=5
[18]: https://developer.salesforce.com/docs/atlas.en-us.platform_events.meta/platform_events/platform_events_intro.htm
[19]: images/salesforce_dashboard_logs.png
[20]: https://help.salesforce.com/s/articleView?id=platform.code_dev_console_tab_query_editor.htm&type=5
[21]: https://app.datadoghq.com/event/explorer
[22]: https://app.datadoghq.com/reference-tables
[23]: https://github.com/DataDog/integrations-internal-core/blob/main/salesforce/metadata.csv
[24]: https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/real_time_event_monitoring_storage.htm#storage-events
[25]: https://developer.salesforce.com/docs/atlas.en-us.object_reference.meta/object_reference/sforce_api_objects_eventlogfile_supportedeventtypes.htm
[26]: https://docs.datadoghq.com/es/help/