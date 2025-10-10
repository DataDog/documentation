---
"app_id": "servicenow"
"app_uuid": "5bd1d6c7-614b-4c49-95ad-d200041735c3"
"assets":
  "integration":
    "auto_install": falso
    "events":
      "creates_events": falso
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "105"
    "source_type_name": "ServiceNow"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "alerting"
- "incidents"
- "notifications"
- "network"
- "collaboration"
- "security"
- "event management"
"custom_kind": "integración"
"dependencies": []
"display_on_public_website": verdadero
"draft": falso
"git_integration_title": "servicenow"
"integration_id": "servicenow"
"integration_title": "ServiceNow"
"integration_version": ""
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "servicenow"
"public_title": "ServiceNow"
"short_description": "Crea incidentes de ServiceNow, rellena los CI de la CMDB y enriquece recursos, logs y eventos de Datadog con datos de la CMDB"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Alertas"
  - "Category::Incidents"
  - "Category::Notifications"
  - "Category::Network"
  - "Category::Collaboration"
  - "Category::Security"
  - "Category::Event Management"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "Crea incidentes de ServiceNow, rellena los CI de la CMDB y enriquece recursos, logs y eventos de Datadog con datos de la CMDB"
  "media":
  - "caption": "Enriquece tu host Datadog con metadatos de la CMDB"
    "image_url": "images/carousel_1.png"
    "media_type": "imagen"
  - "caption": "Enriquece tus dispositivos de red Datadog con metadatos de la CMDB"
    "image_url": "images/carousel_2.png"
    "media_type": "imagen"
  - "caption": "Enriquece logs y eventos con tablas de referencia de la CMDB"
    "image_url": "images/carousel_3.png"
    "media_type": "imagen"
  - "caption": "Crea tickets de ServiceNow a partir de alertas de Datadog"
    "image_url": "images/carousel_4.png"
    "media_type": "imagen"
  - "caption": "Crea incidentes de ServiceNow con Datadog Incident Management"
    "image_url": "images/carousel_5.png"
    "media_type": "imagen"
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/servicenow-cmdb-it-management-datadog/"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/create-servicenow-tickets-from-datadog-alerts/"
  - "resource_type": "documentación"
    "url": "https://docs.datadoghq.com/integrations/servicenow/"
  "support": "README.md#Support"
  "title": "ServiceNow"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->

## Información general

ServiceNow es una plataforma de gestión de servicios de TI para el registro, el seguimiento y la gestión de los procesos de TI de nivel empresarial de una compañía en una única localización.
La integración Datadog ServiceNow es una integración bidireccional que te permite:

ITOM/ITSM
- Enviar eventos generados en Datadog a tickets de ServiceNow, así como gestionar el flujo de trabajo de resolución desde dentro de Datadog a través de la gestión de servicios de TI (ITSM) y la gestión de operaciones de TI (ITOM).

Conector de gráficos de servicio
- Utilizar Datadog como mecanismo de detección de elementos de configuración (CI) de la Configuration Management Database (CMDB) de ServiceNow con el conector de gráficos de servicio de Datadog.

Enriquecimiento de la CMDB
- Enriquecer la información específica de la empresa almacenada en forma de CI en la CMDB de ServiceNow con tu información de hosts, servicios y dispositivos de Datadog, lo que te permite comprender mejor el uso de la infraestructura, acelerar la resolución de problemas y maximizar el uso de recursos.
- Crear tablas de referencia de Datadog para enriquecer automáticamente logs y eventos con campos adicionales de tus CI de ServiceNow. Las tablas de referencia te permiten asignar conjuntos de campos de valor a una clave principal (como nombre de host) y añadir automáticamente estos campos a todos los logs o eventos que contengan la clave especificada.


**Nota**: la integración de Datadog y ServiceNow es compatible con [versiones de ServiceNow][1] que no figuran como finalizadas.

### Instalar la aplicación

La aplicación puede instalarse de dos maneras:

1. Instala la última versión de la aplicación `ITOM/ITSM integración for Datadog` desde la tienda de ServiceNow.

![Integración ITSM/ITOM Tienda de aplicaciones ServiceNow][2]

2. Descarga el último conjunto de actualización: [`Datadog-Snow_Update_Set_v2.7.2.xml`][3] y cárgalo en tu instancia ServiceNow manualmente.

**Changelog**
-   v2.4.0 >= Sincronización unidireccional con Case Management
-   v2.5.0 >= Sincronización bidireccional con Case Management y la tabla ITSM de la integración con Incident Management. Además, la sincronización bidireccional con Case Management sólo es compatible con ITSM de ServiceNow.
-   v2.6.0 >= Notificaciones de monitor en formato de plantilla con ITOM/ITSM
-   v2.7.0 >= Case Management mejorado con soporte para incidentes creados manualmente, ingesta de alertas correlacionadas y sincronización unidireccional de atributos adicionales. Incident Management admite ahora la sincronización bidireccional. Por último, una corrección de errores para el estado de resolución del monitor.

**Instalación del conjunto de actualización en ServiceNow:**

**Nota**: Si tienes modificaciones personalizadas en el mapa de transformación, se te informará de cualquier conflicto y podrás elegir los cambios adecuados en función de tus necesidades. Antes de cualquier actualización, se recomienda hacer una copia de seguridad de las personalizaciones existentes del mapa de transformación.

1. Importa manualmente el archivo XML del conjunto de actualización que descargaste, a tu instancia ServiceNow.
2. Una vez importado el archivo XML, el conjunto de actualización debería mostrar un estado `Loaded`. Haz clic en el nombre del conjunto de actualización para obtener una vista previa de los cambios.
3. Después de acceder a la vista previa del conjunto de actualización para asegurarte de que no hay errores, selecciona **Commit Update Set** (Confirmar el conjunto de actualización) para fusionar la aplicación en tu sistema.

Una vez instalada la aplicación, busca **Datadog** en el menú de navegación de ServiceNow para acceder a todas las tablas y a la página de configuración para configurar la sincronización bidireccional.

-   `Configuration`
-   `Datadog Incidents ITSM`
-   `Cases ITOM`, anteriormente `Datadog Cases ITOM`
-   `Cases ITSM`, anteriormente `Datadog Cases ITSM`
-   `legacy Monitors ITOM`, anteriormente `Datadog Monitors ITOM`
-   `legacy Monitors ITSM`, anteriormente `Datadog Monitors ITSM`
-   `Templated Monitors ITOM`
-   `Templated Monitors ITSM`

### Crea una cuenta de ServiceNow con los permisos correctos para Datadog

Para utilizar la integración, crea un usuario de ServiceNow (por ejemplo, con el nombre de usuario "datadog" o "integración_datadog") y asígnale los siguientes roles:

-   `x_datad_datadog.user` y
-   `import_set_loader` y
-   `import_transformer`

#### Resolución de incidentes

<div class="alert alert-info">La sincronización bidireccional con Case Management sólo es compatible con ITSM de ServiceNow.</div>

Si quieres sincronizar el estado del incidente para su resolución, el usuario de ServiceNow necesita tener uno de los siguientes roles:

-   `ITIL` o
-   `list_updater` o
-   `sn_incident_write`

#### Enviar notificaciones de monitor directamente a las tablas Incidentes y Eventos

Si deseas enviar notificaciones directamente a la tabla **Event** (Evento) del módulo de ITOM o a la tabla **Incident** (Incidentes) del módulo de ITSM, el usuario de ServiceNow necesita uno de los siguientes roles:

-   `ITIL` para ITSM
-   `evt_mgmt_integration` para ITOM

**Nota**: Las actualizaciones manuales realizadas a un ticket en ServiceNow por este usuario de ServiceNow ("Datadog" o "datadog_integration") no se sincronizan con Datadog.

## Configurar el cuadro de ServiceNow en Datadog

1. En Datadog, ve al [cuadro de la integración ServiceNow][4] en la página Integraciones.
2. Haz clic en **Add New Instance** (Añadir nueva instancia).
3. Añade el nombre de la instancia, que es el subdominio de tu dominio de ServiceNow: `<INSTANCE_NAME>.service-now.com`.
4. Añade el nombre de usuario y la contraseña de tu instancia de ServiceNow.

**Nota**: Puedes crear un usuario limitado en ServiceNow sólo para Datadog.

![nueva instancia de la integración servicenow][5]

## Configuración de CMDB

### Conector de gráficos de servicio para Datadog

El [conector de gráficos de servicio de observabilidad - Datadog][6] puede rellenar automáticamente los elementos de configuración (CI) del servidor y la base de datos en la CMDB con los nuevos recursos detectados por Datadog. El conector de gráficos de servicios está disponible a través de la [tienda][7] de ServiceNow.

Para la configuración, sigue las instrucciones de configuración guiada del conector de gráficos de servicio.

Tipos de CI compatibles:

-   Servidor
-   Amazon RDS

Las notas siguientes sólo se aplican si ya has configurado la integración para la ITOM/ITSM ServiceNow:

-   El conector de gráficos de servicio no utiliza los valores `Target table` y `Custom table` del cuadro de configuración. Puedes guardar la integración con los valores por defecto de la tabla de destino.
-   El mismo usuario de ITOM/ITSM puede utilizarse para el conector de gráficos de servicio otorgando a este usuario el rol de `cmdb_import_api_admin`, tal y como se describe en las instrucciones de configuración guiada del conector de gráficos de servicio.

### Personalización de los campos CI

En el cuadro de la integración [Datadog ServiceNow][4], haz clic en la pestaña **Configurar** y luego en la pestaña **Conector de gráficos de servicio**. Expande la sección **Personalizar campos CI**. Están disponibles las siguientes opciones:

Tipo CI
: El tipo de CI al que se aplica este campo.

Campo ServiceNow
: El campo en ServiceNow al que aplicarlo.

Etiqueta (tag) Datadog
: La etiqueta para enviar desde recursos de Datadog. (Si se encuentran varias etiquetas con el mismo nombre, se separarán mediante comas).

Por ejemplo, para añadir un campo CI con un tipo CI de `host` y un campo `host Name` de ServiceNow, añade cualquier atributo de etiqueta de _host_ al campo `Datadog etiquetar`.

**Nota**: El campo `Datadog etiquetar` debe ser una etiqueta de _host_ que exista en hosts de Datadog, _no_ una etiqueta de atributo en un host.

![Captura de pantalla del cuadro de la integración ServiceNow que muestra la pestaña Conector de gráficos de servicio][8]


### Etiquetado de host

Mejora tus hosts de Datadog con metadatos de ServiceNow CMDB a través del etiquetado de host.

Para permitir la ingesta de etiquetas de host:

1. Configura una consulta de [Query Builder][9] en tu instancia ServiceNow, que devuelva todos los hosts que quieres etiquetar en Datadog.
1. Programa la consulta para que se ejecute en el intervalo de actualización que desees.
1. Una vez guardada la consulta en ServiceNow, ve al cuadro de la integración ServiceNow de Datadog y selecciona **Host Tagging* (Etiquetado de hosts) en la pestaña **Enriquecimiento de la CMDB** en **Configurar**.
1. En **Query Configuration** (Configuración de consulta), haz clic en el botón **Add New Query** (Añadir nueva consulta).
1. Selecciona la **ServiceNow Instance** (Instancia de ServiceNow) y la **Query** (Consulta) de los menús desplegables.
1. Selecciona un valor para la columna **Hostname** (Nombre de host) que asigne el campo de nombre de host del CI raíz de tu consulta al campo de nombre de host de Datadog.
1. Selecciona cualquier reasignación de nombre de campo opcional con **Column Name Maps** (Asignaciones de nombre de columna).
1. Haz clic en **Save** (Guardar).

Espera que las etiquetas de host se rellenen en Datadog poco después de las ejecuciones programadas de tus consultas.

![Captura de pantalla de la pestaña Información de host, que muestra etiquetas de host de ServiceNow][10]

Monitoriza el proceso de ingesta en el [Explorador de eventos][11] de Datadog delimitando tu consulta de búsqueda con `source:servicenow`.

![Captura de pantalla de una ingesta en ejecución][12]

#### Etiquetado adicional de campos que no son CMDB

Algunas tablas de ServiceNow no son CMDB y no se pueden seleccionar en el Query Builder. Para enriquecer hosts de Datadog con etiquetas de estas tablas, haz clic en **Additional Fields** (Campos adicionales) en el cuadro de configuración y configura una consulta de etiquetado de hosts como se ha descrito anteriormente, proporcionando una ruta completo con recorrido por puntos. Las rutas deben empezar con el primer nombre de atributo de la tabla raíz configurada para la consulta. Por ejemplo, si se introduce `vendor.manufacturer.name` para una consulta con CI raíz `cmdb_ci_server`, se rellenarán los hosts con la etiqueta `cmdb_ci_server_manufacturer_name`.

**Nota**: Sólo las rutas completas con recorrido por puntos compatibles con la API de tablas de ServiceNow están disponibles para su suo en campos adicionales. Es posible que las relaciones de muchos a muchos no funcionen de forma predefinida y requieran una configuración adicional.

#### Solucionar problemas de etiquetado en hosts

Para que el etiquetado de host funcione correctamente, asegúrate de que lo siguiente es cierto en tu sistema:

-   El usuario que creó y ejecuta la consulta del Query Builder coincide con un nombre de usuario en tu configuración de Datadog. El usuario en ServiceNow debe tener el rol `cmdb_query_builder_read`.
-   El número de resultados devueltos por la consulta debe ser inferior o igual a la configuración de `glide.cmdb.query.max_results_limit` en ServiceNow. Por defecto, el número máximo de resultados es 10000. Para cambiar la configuración, ve a **Configuration** -> **CMDB Properties** -> **Query Builder Properties** (Configuración -> Propiedades de CMDB -> **Propiedades del Query Builder).
-   Todos los CIs configurados en tu consulta del Query Builder deben tener una etiqueta (label) **1**. Esto garantiza que no has creado ningún CIs duplicado, el analizador no lo admite.

#### Limitaciones

-   La ingesta está limitada a 100000 hosts por ejecución.
-   Las actualizaciones de host se limitan a unos pocos miles por hora. Ten en cuenta este límite a la hora de elegir el intervalo de programación.
-   El etiquetado no funciona en máquinas de Linux con nombres de host en minúsculas, porque los alias de host en Datadog distinguen entre mayúsculas y minúsculas.

### Etiquetado de servicio

Mejora tu catálogo de servicios de Datadog con metadatos de CMDB de ServiceNow a través de etiquetado de servicios.

Con el etiquetado de servicios, puedes rellenar tu [Catálogo de servicios][13] de Datadog con servicios de tu CMDB de ServiceNow.

## Configuración

Para permitir la ingesta de datos de servicio:

1. Configura una consulta de [Query Builder][9] en tu instancia ServiceNow que devuelva todos los servicios con los que quieres enriquecer el Catálogo de servicios.
1. Programa la consulta para que se ejecute en el intervalo de actualización que desees.
1. Una vez guardada la consulta en ServiceNow, ve al cuadro de la integración ServiceNow de Datadog y selecciona **Service Tagging** (Etiquetado de hosts) en la pestaña **Enriquecimiento de la CMDB** en **Configurar**.
1. En **Query Configuration** (Configuración de consulta), haz clic en el botón **Add New Query** (Añadir nueva consulta).
1. Selecciona la **ServiceNow Instance** (Instancia de ServiceNow) y la **Query** (Consulta) de los menús desplegables.
1. Selecciona un valor del menú desplegable **Service Name Column** (Nombre de columna de servicio). El valor coincide con el nombre de la columna en el CI del servicio raíz de tu consulta y rellena el nombre de servicio en el catálogo de servicios.
1. Configurar asignaciones de esquema para introducir metadatos adicionales sobre tu servicio en el Catálogo de servicios. Consulta [Definiciones de servicio][14] para obtener más información. Para que Datadog acepte la ingesta, cada campo de la asignación debe ser del tipo correcto para asignarse al esquema de definición de servicio del Catálogo de servicios.
1. Haz clic en **Save** (Guardar).

Espera ver los datos de servicio rellenados en Datadog unos minutos después de las ejecuciones programadas de tus consultas. Para ver los errores de ingesta, ve al [Explorador de eventos][11] y busca eventos con `source:servicenow`.

![Captura de pantalla del panel de configuración de servicios, que muestra los metadatos rellenados a partir de ServiceNow][15]

#### Solucionar problemas de configuración

Para que la ingesta de servicio funcione correctamente, asegúrate de que en tu sistema se cumple lo siguiente:

-   El usuario que creó y ejecuta la consulta del Query Builder coincide con un nombre de usuario en tu configuración de Datadog. El usuario en ServiceNow debe tener el rol `cmdb_query_builder_read`.
-   El número de resultados devueltos por la consulta debe ser inferior o igual a la configuración de `glide.cmdb.query.max_results_limit` en ServiceNow. Por defecto, el número máximo de resultados es 10000. Para cambiar la configuración, ve a **Configuration** -> **CMDB Properties** -> **Query Builder Properties** (Configuración -> Propiedades de CMDB -> **Propiedades del Query Builder).
-   Todos los CIs configurados en tu consulta del Query Builder deben tener una etiqueta (label) **1**. Esto garantiza que no has creado ningún CIs duplicado, el analizador no lo admite.

### Etiquetado de dispositivo de red

Añade etiquetas a tus dispositivos de red en Datadog poblados con datos de tu ServiceNow CMDB.

Con el etiquetado de dispositivos, puedes enriquecer dinámicamente dispositivos de red monitorizados por Datadog [Network Device Monitoring][16] con metadatos de dispositivos de tu CMDB de ServiceNow.

Para permitir la ingesta de etiquetas de dispositivo:

1. Configura una consulta de [Query Builder][9] en tu instancia ServiceNow. Asegúrate de que devuelve la dirección IP del dispositivo.
1. Programa la consulta para que se ejecute en el intervalo de actualización que desees.
1. Si utilizas un espacio de nombres de IP personalizada en Datadog, deberás añadirlo a ServiceNow. Crea una columna en el CI del dispositivo de red llamada **u_dd_device_namespace**, poblada por el espacio de nombres correspondiente para cada dispositivo. Si esta columna no está presente, se utiliza el espacio de nombres por defecto.
1. Una vez guardada la consulta en ServiceNow, ve al cuadro de la integración ServiceNow de Datadog y selecciona **Device Tagging** (Etiquetado de hosts) en la pestaña **Enriquecimiento de la CMDB** en **Configurar**.
1. En **Query Configuration** (Configuración de consulta), haz clic en el botón **Add New Query** (Añadir nueva consulta).
1. Selecciona la **ServiceNow Instance** (Instancia de ServiceNow) y la **Query** (Consulta) de los menús desplegables.
1. Selecciona la columna IP Address (Dirección IP) que asigna el campo IP Address (Dirección IP) de tu consulta al campo IP Address (Dirección IP) de Datadog.
1. Selecciona cualquier cambio de nombre de campo opcional.
1. Haz clic en **Save** (Guardar).

Puede esperar ver las etiquetas de dispositivo de red pobladas en Datadog unos minutos después de las ejecuciones programadas de tus consultas. Cualquier error de ingesta se notifica a través de eventos visibles en tu Events Explorer.

Monitoriza el proceso de ingesta en el [Explorador de eventos][11] de Datadog delimitando tu consulta de búsqueda con `source:servicenow`.

![Captura de pantalla de una ingesta en ejecución][12]

#### Solucionar problemas de etiquetado en dispositivos de red

-   Verifica que el usuario que creó o está ejecutando la consulta del querybuilder es el mismo usuario en tu configuración de Datadog y tiene el rol `cmdb_query_builder_read`.
-   Comprueba que la consulta no devuelva más resultados de los que permite la configuración de `glide.cmdb.query.max_results_limit` en Servicenow.
    Asegúrate de que todos los CIs configurados en tu consulta del querybuilder tienen una etiqueta (label) '1'. Asegúrate de que no has creado ningún CI duplicado, ya que el analizador no lo admite.

#### Limitaciones

-   La ingesta está limitada a 100000 hosts por ejecución.
-   El etiquetado de dispositivos de red se limita a [dispositivos SNMP][17].
-   Las actualizaciones de los dispositivos se limitan a unos pocos miles por hora. Ten en cuenta este límite al elegir el intervalo de programación.

### Tablas de referencia

Utiliza [tablas de referencia][18] para enriquecer logs y eventos automáticamente con campos adicionales de tus CI de ServiceNow. Con las tablas de referencia, puedes asignar conjuntos de campos de valor a una clave principal, como un nombre de host, y añadir automáticamente estos campos a todos los logs o eventos que contengan la clave especificada.

Para permitir la ingesta de Tablas de referencia:

1. Configura una consulta de [Query Builder][19] en tu instancia de ServiceNow.
1. Programa la consulta para que se ejecute en el intervalo de actualización que desees.
1. Guarda la consulta.
1. Selecciona **Add New Query** (Añadir nueva consulta) y elige tu consulta en el menú desplegable.
1. En el menú desplegable de clave primaria, selecciona el nombre de la columna que deseas utilizar como clave primaria.
    1. Opcionalmente, crea un [pipeline de procesamiento][20] con esta clave primaria para enriquecer y correlacionar logs y eventos.
1. Introduce un nombre para tu tabla de referencia.
1. Haz clic en **Save** (Guardar).

La [tabla de referencia][18] se rellenará con los datos de la consulta poco después de guardarla.

#### Advertencias y restricciones

-   El nombre de la tabla de referencia debe ser único.
-   No es posible eliminar ni actualizar el esquema de las tablas existentes.

## Configuración de ITOM e ITSM
{{% site-region region="gov" %}}
<div class="alert alert-danger">
La integración Case Management no es compatible con el sitio {{< region-param key=dd_datacenter code="true" >}}.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
La integración Incident Management no es compatible con el sitio {{< region-param key=dd_datacenter code="true" >}}.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
Las notificaciones de monitor en formato de plantilla no son compatibles con el sitio {{< region-param key=dd_datacenter code="true" >}}.
</div>
{{% /site-region %}}

Para utilizar la integración Datadog en monitores, Case Management e Incident Management, sigue las instrucciones de cada producto:
1. [Configurar las notificaciones de monitor en formato de plantilla de Datadog](#configure-templated-monitor-notifications)
2. [Configurar Datadog Case Management](#configure-case-management)
3. [Configurar Datadog Incident Management](#configure-incident-management)

### Configurar notificaciones de monitor en formato de plantilla

**Nota**: Se requiere una versión de la aplicación >= v2.6.0 para esta funcionalidad. También debes añadir una instancia en la página Configuración del cuadro de ServiceNow en Datadog antes de completar los pasos siguientes.

##### Configuración de la Asignación de prioridades de instancia

![Formulario de asignación de prioridades de ServiceNow en el cuadro de la integración][21]

Para todos los @-handles en formato de plantilla para una instancia en particular, Datadog ahora asigna automáticamente la prioridad del monitor a Impacto y Urgencia en ServiceNow de acuerdo a esta asignación.

Al desactivar `Use Instance Priority Mapping` se desactiva la configuración Impacto y Urgencia en los registros de ServiceNow.

##### Configurar una plantilla de monitor 
![Nuevo cuadro de la integración ServiceNow][22]

Para las notificaciones de monitor que utilizan `@servicenow-<TEMPLATE_NAME>` en Datadog, utiliza la nueva interfaz de usuario de creación de plantillas en la pestaña de ITOM/ITSM del cuadro de integración de ServiceNow en Datadog para crear una notificación en ServiceNow.

**Nota**: Esto sólo está disponible para versiones de la aplicación >= 2.6.0.

##### Crea un @handle personalizado de ServiceNow para notificaciones del monitor

![Instrucciones para notificaciones de monitor en el nuevo cuadro de la integración ServiceNow][23]

1. Haz clic en el botón `+ New` para crear una nueva plantilla.
2. Define un @-handle `Name`, `Instance` y `Target Table` al cual se envíe la notificación del monitor. A continuación, selecciona uno de `Assignment Group`, `Business Service`, `User` o `Unassigned` para asignar el registro. El mapa de transformación definido en 2.6.0 rellena automáticamente el registro `INC` del incidente con el valor que selecciones aquí.

Para utilizar la nueva plantilla, añade `@servicenow-<TEMPLATE_NAME>` en una descripción de monitor.

Puedes añadir campos personalizados a la carga útil haciendo clic en `Add Field` en la sección [Uso de variables en asignaciones de campo y carga útil de tickets](#use-variables-in-ticket-payload-and-field-mappings). 

### Configuración de la Gestión de casos

![Instrucciones de Case Management en el nuevo cuadro de la integración ServiceNow][24]

En la pestaña del `Case Management`:
1. Selecciona la instancia que deseas configurar para Case Management.
2. Elige la tabla a la que deseas enviar los casos: `Datadog Cases ITOM` o `Datadog Cases ITSM`.
   **Nota**: Por defecto no se selecciona ninguna tabla.
3. Ve a [Case Management][25] en Datadog.
4. Selecciona Create ServiceNow Incident (Crear incidentes de ServiceNow).
5. Elige la instancia y el grupo de asignación opcional y, a continuación, haz clic en Create (Crear).

##### Sincronización bidireccional del estado y los comentarios con Case Management

Para permitir que las ediciones en ServiceNow actualicen sus casos asociados en Datadog, un usuario de ServiceNow con el rol `x_datad_datadog.user` y el rol `admin` debe configurar los parámetros de instalación de la aplicación **integración ITOM/ITSM para Datadog** en ServiceNow:

**Nota**: Es importante utilizar una clave de aplicación de la cuenta de servicio para esta configuración en lugar de la clave de aplicación de un usuario. La clave de aplicación de un usuario está vinculada a los permisos de la cuenta del usuario. Si los permisos del usuario se reducen o si el usuario es desactivado, la sincronización bidireccional entre ServiceNow y Datadog se detendrá. Una clave de aplicación de cuenta de servicio no está vinculada a un usuario individual, por lo que la sincronización bidireccional no se verá afectada por los cambios en la cuenta de usuario.

1. Accede a la página de configuración de la aplicación **integración ITOM/ITSM para Datadog** haciendo clic en **All** (Todo) en la esquina superior izquierda, escribiendo `ITOM/ITSM Integration for Datadog` en el filtro y haciendo clic en el enlace **Configuration** (Configuración) que aparece en la lista filtrada.
1. Elige la ubicación de tu Centro de datos de Datadog.
1. Pega una clave de API de Datadog, que puedes encontrar en tus **parámetros de organización**, en el campo **Clave de API**.
1. Pega una clave de aplicación de cuenta del servicio de Datadog, que puedes encontrar en tus **parámetros de organización**, en el campo **Clave de API**.
1. Comprueba la casilla Enabled (Activado) y guarda los cambios de configuración.

**Nota**: Asegúrate de que el **contexto de la aplicación** (accesible a través del icono del globo en la parte superior derecha) está configurado en `ITOM/ITSM Integration for Datadog`, no en `Global`. El uso de un contexto incorrecto puede causar errores de permiso al configurar los campos anteriores.
![Contexto de la aplicación][26]

![Parámetros de configuración en ServiceNow para sincronizar los cambios de ServiceNow en Datadog][27]

Después de configurar los parámetros de instalación en ServiceNow, vuelve a Datadog Case Management para [configurar la integración][28].

##### Uso de alertas correlacionadas para personalizar valores en ServiceNow

**Nota**: Se requiere una versión de la aplicación >= v2.7.0 para esta funcionalidad.

Para utilizar información de alertas correlacionadas en el rellenado de valores en ServiceNow, se incluye un script de transformación de ejemplo (ejecuta `onBefore`) en los mapas de transformación para tablas de ITSM y ITOM de casos de Datadog. Por defecto, el script está comentado. Para habilitarlo, **descoméntalo** y **modifícalo** para adaptarlo a tu caso de uso. Las modificaciones son **necesarias** para que el script rellene los valores en el incidente de ServiceNow.

### Configuración de Incident Management

Después de instalar la aplicación, consulta los [parámetros de la integración][29] en Incident Management para finalizar la configuración. Para obtener más información sobre los campos que se sincronizan entre Incident Management y ServiceNow, consulta [Asignaciones de campos de Incident Management](#incident-management-field-mappings).

##### Sincronizar el estado, el impacto y la urgencia bidireccionalmente con Incident Management

Para permitir que las modificaciones en ServiceNow actualicen sus incidentes asociados en Datadog, un usuario de ServiceNow con el rol `x_datad_datadog.user` y el rol `admin` debe configurar los parámetros de instalación de la aplicación **integración ITOM/ITSM para Datadog** en ServiceNow:

**Nota**: Es importante utilizar una clave de aplicación de la cuenta de servicio para esta configuración en lugar de la clave de aplicación de un usuario. La clave de aplicación de un usuario está vinculada a los permisos de la cuenta del usuario. Si los permisos del usuario se reducen o si el usuario es desactivado, la sincronización bidireccional entre ServiceNow y Datadog se detendrá. Una clave de aplicación de cuenta de servicio no está vinculada a un usuario individual, por lo que la sincronización bidireccional no se verá afectada por los cambios en la cuenta de usuario.

1. Accede a la página de configuración de la aplicación **integración ITOM/ITSM para Datadog** haciendo clic en **All** (Todos) en la esquina superior izquierda, escribiendo `ITOM/ITSM Integration for Datadog` en el filtro y haciendo clic en el enlace **Configuration** (Configuración) que aparece en la lista filtrada.
1. Elige la ubicación de tu Centro de datos de Datadog.
1. Pega una clave de API de Datadog, que puedes encontrar en tus **parámetros de organización**, en el campo **Clave de API**.
1. Pega una clave de aplicación de cuenta del servicio de Datadog, que puedes encontrar en tus **parámetros de organización**, en el campo **Clave de API**.
1. Comprueba la casilla Enabled (Activado) y guarda los cambios de configuración.

**Nota**: Asegúrate de que el **contexto de la aplicación** (accesible a través del icono del globo en la parte superior derecha) está configurado en `ITOM/ITSM Integration for Datadog`, no en `Global`. El uso de un contexto incorrecto puede causar errores de permiso al configurar los campos anteriores.
![Contexto de la aplicación][26]

Después de configurar los parámetros de instalación en ServiceNow, vuelve a Datadog Incident Management para [configurar la integración][29].

### Notificaciones de monitor legacy

Para las notificaciones de monitor legacy mediante `@servicenow-<INSTANCE_NAME>` en Datadog, selecciona la tabla intermedia a la que enviar notificaciones en la parte inferior del cuadro de ITOM/ITSM titulado: "Manage Legacy Monitor Notifications" (Gestionar notificaciones de monitor legacy).

1. Selecciona la instancia para la que deseas configurar notificaciones y, a continuación, selecciona la tabla en la que escribir notificaciones de monitor legacy.
2. Para validar que la integración está configurada correctamente, añade `@servicenow-<INSTANCE_NAME>` en un monitor o notificación de evento. Los datos sin procesar rellenan las filas de la tabla provisional y se reenvían a la tabla de ServiceNow especificada por la aplicación.
3. [Utiliza mapas de transformación](#customize-data-for-monitor-notifications-with-transform-maps) en ServiceNow para personalizar la transformación de los datos enviados a las tablas provisorias.
4. Personaliza la carga útil de notificación con las variables disponibles en Datadog o cadenas personalizadas.
5. Para definir la prioridad de los incidentes de ServiceNow, sigue las instrucciones de [asignación de campos de prioridad en incidentes](#incident-priority-field-mapping)

### Personalizar los datos para monitorizar notificaciones con mapas de transformación

Las tablas **ITSM de monitores en formato de plantilla**, **ITSM de monitores legacy** y **ITSM de casos Datadog** utilizan un mapa de transformación para transformar los registros de Datadog en incidentes de ServiceNow.
De la misma manera, **ITOM de monitores Datadog** y **ITOM de casos Datadog** transforman los registros de Datadog en eventos de ServiceNow.

Las tablas **ITOM de monitores en formato de plantilla** y **ITSM de monitores en formato de plantilla** utilizan mapas de transformación para transformar los registros de Datadog en eventos e incidentes de ServiceNow respectivamente. Puedes personalizar la información de eventos e incidentes de ServiceNow en estas tablas personalizando la carga útil de notificación en la interfaz de usuario `New Template` y ampliar los mapas de transformación en ServiceNow.

**Nota**: Las tablas **ITOM de casos Datadog** y **ITSM de casos Datadog** utilizan de forma similar mapas de transformación; sin embargo, no se recomienda la personalización de mapas de transformación para su uso con Case Management dado que la carga útil de los casos Datadog no es personalizable. El único case en el que se recomienda la personalización del mapa de transformación es si se van a utilizar datos de alertas correlacionadas. Hay más instrucciones sobre cómo hacerlo [más arriba](#use-correlated-alerts-to-customize-values-in-servicenow).

## Solucionar problemas

Si no estás viendo eventos en tus tablas de ServiceNow y en su lugar tienes

-   Un mensaje de error en tu cuadro de integración de Datadog o una notificación `Error while trying to post to your ServiceNow instance`:

    -   Comprueba que solo se ha utilizado el subdominio al introducir el nombre de tu instancia.
    -   Comprueba que el usuario que has creado tiene los permisos necesarios.
    -   Comprueba que el nombre de usuario y la contraseña son correctos.

-   Se configura la integración, se activa una alerta y no se crea ningún ticket:

    -   Confirma que la tabla intermedia está poblada. Si es así, el problema está en las asignaciones y transformaciones. Puedes depurar aún más tus asignaciones y scripts accediendo a **Transform Errors** (Errores de transformación) en ServiceNow.
    -   Confirma que estás trabajando con la tabla provisional que especificaste en el cuadro.

    El usuario de ServiceNow necesita los roles `rest_service` y `x_datad_datadog.user` para poder acceder a las tablas de importación. Si estás utilizando la forma legacy de enviar notificaciones directamente a la tabla Incident (Incidentes) o a la tabla Event (Event), necesitas los permisos `itil` y `evt_mgmt_integration`.

Si ves actualizaciones de Case Management de Datadog en ServiceNow, pero no ves actualizaciones de ServiceNow en Datadog, este es el comportamiento esperado de ITOM de ServiceNow. La sincronización bidireccional con Case Management sólo es compatible con ITSM de ServiceNow.

¿Necesitas ayuda adicional? Ponte en contacto con el [servicio de asistencia de Datadog][30].

## Base de conocimientos

### Campos de tablas y mapas de transformación ITMX de monitores en formato de plantilla

`action`
: **Tipo**: cadena<br>
La acción que se está llevando a cabo en el monitor: `create`, `update`, `acknowledge` o `resolve`

`additional_information`
: **Tipo**: cadena<br>
**Transformación ITOM**: `additional_info`<br>
Cadena formateada que contiene todos los detalles del evento 

`aggreg_key`
: **Tipo**: cadena<br>
Clave de agregación que representa un hash del ID del monitor de alerta

`alert_cycle_key`
: **Tipo**: cadena<br>
Clave que representa un hash de un ciclo de alerta de monitor único (rastrea Alerta → Advertencia → Resolución).

`alert_id`
: **Tipo**: cadena<br>
ID de monitor de alerta

`alert_metric`
: **Tipo**: cadena<br>
**Transformación ITOM**: `metric_name`<br>
Métrica que activó la alerta

`alert_query`
: **Tipo**: cadena<br>
Consulta que activó la alerta

`alert_scope`
: **Tipo**: cadena<br>
Contexto que activó la alerta

`alert_status`
: **Tipo**: cadena<br>
Estado actual de la alerta

`alert_title`
: **Tipo**: cadena<br>
Nombre de la alerta

`alert_transition`
: **Tipo**: cadena<br>
**Transformación ITSM**: (script) -> state<br>
Estado de transición de la alerta: `Triggered`, `Warn` o `Recovered`

`assignment_group_sys_id`
: **Tipo**: referencia<br>
**Transformación ITSM**: `assignment_group`<br>
**Tabla de referencia**: grupo<br>
ServiceNow sys_id para el grupo de asignación del identificador en formato de plantilla

`business_service_sys_id`
: **Tipo**: referencia<br>
**Transformación ITSM**: `business_service`<br>
**Tabla de referencia**: servicio<br>
ServiceNow sys_id para el servicio empresarial del identificador en formato de plantilla

`custom_fields`
: **Tipo**: cadena<br>
Campos clave-valor configurados por el usuario formateados como cadena convertible a JSON

`datadog_tags`
: **Tipo**: cadena<br>
Etiquetas de Datadog en el monitor de alerta

`description`
: **Tipo**: cadena<br>
**Transformación ITSM**: `description`<br>
**Transformación ITOM**: `description`<br>
Descripción resumida del monitor de alerta

`event_details`
: **Tipo**: cadena<br>
**Transformación ITSM**: `work_notes`<br>
Detalles del evento con enlaces formateados y seleccionables a Datadog

`event_id`
: **Tipo**: cadena<br>
ID de Datadog del evento

`event_link`
: **Tipo**: cadena<br>
Enlace al evento creado a partir de la alerta del monitor 

`event_msg`
: **Tipo**: cadena<br>
Mensaje del evento

`event_title`
: **Tipo**: cadena<br>
**Transformación ITSM**: `short_description`<br>
Título del evento

`event_type`
: **Tipo**: cadena<br>
**Transformación ITOM**: `type`<br>
Tipo de evento

`hostname`
: **Tipo**: cadena<br>
**Transformación ITSM**: `cmdb_ci`<br>
**Transformación ITOM**: `node`<br>
Host del monitor afectado

`impact`
: **Tipo**: entero<br>
**Transformación ITSM**: `impact`<br>
Valor de impacto basado en la asignación definida por el usuario de la prioridad del monitor 

`logs_sample`
: **Tipo**: cadena<br>
Muestra de los logs relevantes

`monitor_priority`
: **Tipo**: entero<br>
**Transformación ITOM**: `severity`<br>
Prioridad del monitor de alerta como un entero

`org_name`
: **Tipo**: cadena<br>
Nombre de la organización del monitor de alerta

`sys_created_by`
: **Tipo**: cadena<br>
**Transformación ITSM**: `caller_id`<br>
Creador del registro (normalmente la cuenta de API de ServiceNow configurada).

`ticket_state`
: **Tipo**: cadena<br>
**Transformación ITSM**: `state`, (script) -> close_code, (script) -> close_notes<br>
**Transformación ITOM**: (script) -> resolution_notes<br>
Estado del registro ServiceNow: `new` o `resolved`

`u_correlation_id`
: **Tipo**: cadena<br>
**Transformación ITSM**: `correlation_id`<br>
**Transformación ITOM**: `message_key`<br>
Combinación de alert_cycle_key y aggreg_key utilizada para agrupar los registros en el mismo incidente de destino

`urgency`
: **Tipo**: entero<br>
**Transformación ITSM**: `urgency`<br>
Urgencia establecida a partir de la asignación definida por el usuario en el cuadro de integración basado en la prioridad definida del monitor 

`user_sys_id`
: **Tipo**: referencia<br>
**Transformación ITSM**: `assigned_to`<br>
**Tabla de referencia**: usuario <br>
sys_id del identificador predefinido pasado por el usuario.


### Regla de descarga automática de importación de host de Datadog

Para evitar que la tabla de conjuntos de importación `x_datad_datadog_import_host` acumule demasiadas filas, se ha añadido una regla de descarga automática a la herramienta Table Cleaner para conservar sólo las últimas 24 horas de datos. Esta configuración puede modificarse según sea necesario accediendo a `sys_auto_flush_list.do` en el navegador de filtros y entrando en la regla de la tabla `x_datad_datadog_import_host`. El campo `Age in seconds` puede actualizarse en consecuencia.

![Parámetros de configuración de la integración][31]

### Monitorizar la duplicación de incidentes

Para evitar que un monitor vuelva a abrir el mismo incidente, en lugar de crear uno nuevo para cada alerta, asegúrate de que no está configurado con alerta simple. Convierte el monitor en uno con [alerta múltiple][32] agrupándolo mediante una etiqueta en la métrica. De este modo, cada alerta activará un incidente independiente.

### Utilizar variables en la carga útil del ticket y en las asignaciones de campos

Las variables se pueden utilizar en el cuerpo de las alertas o en las asignaciones de campos para asegurar que los detalles de evento se incluyan en ServiceNow. Por ejemplo, puedes incluir el título y la gravedad en el campo apropiado de ServiceNow o puedes incluir un enlace al incidente específico en Datadog directamente desde el ticket de ServiceNow.

![Formulario de entrada de variables de ServiceNow][33]
![Variables de ServiceNow][34]

### Asignación de campos de prioridad de incidentes legacy
**Nota:** En las descripciones de monitor, `Impact` y `Urgency` sólo funcionan para [configuraciones de monitor legacy](#legacy-monitor-notifications). Para [monitores de plantilla](#configure-templated-monitor-notifications), configura la [asignación de prioridades de instancia](#configure-instance-priority-mapping).

El campo `priority` en incidenest de ServiceNow es de _sólo lectura_ y sólo puede actualizarse utilizando [reglas de búsqueda de prioridad][35].

Define `Impact` y `Urgency` en monitores para calcular la prioridad del incidente de ServiceNow.

![Asignación de campos de prioridad de ServiceNow][36]

### Automatizar el flujo de trabajo de resolución de incidencias

Una vez que el estado del monitor vuelve a la normalidad, el ticket de soporte asociado se marca automáticamente como "resuelto".

[ServiceNow resuelto][37]

### Definir asignaciones personalizadas

Haz clic en una de las tablas, por ejemplo **Datadog Monitors ITSM Tables** y desplázate hasta la parte inferior del registro para ver el enlace de la asignación de transformación asociada.

### Comprender la asignación

Haz clic en el nombre de la asignación de transformación para ver el registro:

![Integración servicenow][38]

En la parte superior hay dos campos importantes en el registro de Transformación: `Source table` y `Target table`:

![Integración servicenow][39]

**Notas**:

-   El origen es la tabla del conjunto de importaciones que seleccionaste (Tablas IYSM de monitores de Datadog) y el destino es tu tabla de incidentes real (o tabla de evento) donde se almacenan los eventos.
-   Las asignaciones de campos se encuentran en la parte inferior del registro. Se incluyen algunas asignaciones básicas. Aquí es donde se seleccionan los campos a incluir, se define el formato y se seleccionan los campos de destino en tu instancia de ServiceNow.

### Añadir una nueva asignación de campos

Haz clic en **New** (Nuevo):

![Integración servicenow][40]

Selecciona los campos de origen y destino para las asignaciones uno a uno:

![Integración servicenow][41]

O marca la casilla **Use source script** (Usar script fuente) y define transformaciones:

![Integración servicenow][42]

**Nota:** Para asignar cualquier campo personalizado en el cuadro de integración, puedes utilizar el siguiente script de asignación para las asignaciones de transformaciones ITOM de monitores Datadog e ITSM de monitores Datadog. En este ejemplo, el campo `my_field` se definió como un campo personalizado en el cuadro de integración:

```
answer = (function transformEntry(source)
{
    var additional_info = JSON.parse(source.additional_info);
    return additional_info.my_field;
})(source);
```

### Validación

Para confirmar que la integración está correctamente configurada, añade `@servicenow-<your-template-name>` en un monitor o una notificación de eventos. Los datos sin procesar rellenan las filas de la tabla provisoria y se reenvían a la tabla de ServiceNow especificada en las asignaciones y transformaciones creadas.

### Asignaciones de campos de Incident Management
| **Incident Management**       | **Tabla de casos de ServiceNow**                | **Incidente de ServiceNow**          | **Estado de sincronización**                                            |
|-------------------------------|-------------------------------------------|----------------------------------|------------------------------------------------------------|
| Título                         | Título - Cadena                            | Descripción breve                | Sincronización unidireccional Datadog -> ServiceNow                    |
| Lo que ocurrió                 | Descripción - Cadena                      | Descripción                      | Sincronización unidireccional Datadog -> ServiceNow                    |
| Estado                         | Estado - Cadena                            | Estado                            | Sincronización bidireccional                                    |
| URL del incidente DD               | URL del incidente - Cadena                     | Notas de trabajo                       | Sincronización unidireccional Datadog -> ServiceNow                    |
| Gravedad                      | Urgencia del incidente (int)                    | Urgencia                          | Sincronización bidireccional                                    |
| Gravedad                      | Impacto del incidente (int)                     | Impacto                           | Sincronización bidireccional                                    |

| **Estado del monitor Datadog**                        | **Estado del incidente ServiceNow** |
|--------------------------------------------------|-------------------------------|
| Alerta                                            | En curso                   |
| Advertir                                             | En curso                   |
| OK                                               | Resuelto                      |
| Finalizado *(opcional, configurado en parámetros)*   | Resuelto                      |

| **Gravedad del incidente Datadog** | **Urgencia de ServiceNow** | **Impacto de ServiceNow** | **Prioridad de ServiceNow** |
|-------------------------------|-------------------------|------------------------|--------------------------|
| SEV-1                         | 1                       | 1                      | 1 - Crítico             |
| SEV-2                         | 1                       | 2                      | 2 - Alta                 |
| SEV-2                         | 2                       | 1                      | 2 - Alta                 |
| SEV-3                         | 1                       | 3                      | 3 - Moderada             |
| SEV-3                         | 2                       | 2                      | 3 - Moderada             |
| SEV-3                         | 3                       | 1                      | 3 - Moderada             |
| SEV-4                         | 2                       | 3                      | 4 - Baja                  |
| SEV-4                         | 3                       | 2                      | 4 - Baja                  |
| SEV-5 (Menor)                 | 3                       | 3                      | 5 - Planificación             |
| Unknown (Desconocido)                       | 3                       | 3                      | 5 - Planificación             |

**Nota** Si `Start at SEV-0` está habilitado en los parámetros de Incident Management, los valores de `ServiceNow Urgency`, `ServiceNow Impact` y `ServiceNow Priority` permanecerán iguales, pero la `Datadog incident (incidente) Severity` se desplazará hacia abajo en 1. Por ejemplo, la primera fila será **Gravedad del incidente Datadog: SEV-0; Urgencia de ServiceNow: 1, Impacto de ServiceNow: 1, Prioridad de ServiceNow: 1 - Crítica**.

## Referencias adicionales

- [Crear tickets de ServiceNow a partir de alertas de Datadog][43]
- [Gestionar tu infraestructura con la CMDB de ServiceNow y Datadog][44] 

[1]: https://www.servicenow.com/community/now-platform-articles/servicenow-versions-release/ta-p/2312014
[2]: images/servicenow-appstore-itxm-integration.png
[3]: https://docs.datadoghq.com/resources/xml/Datadog-Snow_Update_Set_v2.7.2.xml
[4]: https://app.datadoghq.com/integrations/servicenow
[5]: images/servicenow-configuration-new-instance-12-23.png
[6]: https://store.servicenow.com/sn_appstore_store.do#!/store/application/c877cb86687e0050f8774bfad236c950/1.2.1
[7]: https://store.servicenow.com/
[8]: images/SGC_datadog_tag.png
[9]: https://docs.servicenow.com/bundle/xanadu-servicenow-platform/page/product/configuration-management/concept/cmdb-query-builder-landing-page.html
[10]: images/host-tags.jpg
[11]: https://app.datadoghq.com/event/explorer
[12]: images/ingestion-progress.jpg
[13]: https://docs.datadoghq.com/tracing/service_catalog/
[14]: https://docs.datadoghq.com/tracing/service_catalog/adding_metadata/
[15]: images/service-metadata.jpg
[16]: https://docs.datadoghq.com/network_monitoring/devices/
[17]: https://docs.datadoghq.com/network_monitoring/devices/snmp_metrics/
[18]: https://app.datadoghq.com/reference-tables
[19]: https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/configuration-management/task/use-cmdb-query-builder.html
[20]: https://app.datadoghq.com/event/pipelines
[21]: images/servicenow-priority-mapping.png
[22]: images/servicenow-integration-tile.png
[23]: images/servicenow-monitors.png
[24]: images/servicenow-case-management.png
[25]: https://app.datadoghq.com/cases
[26]: images/servicenow-application-scope.png
[27]: images/datadog-sync-configuration.png
[28]: https://docs.datadoghq.com/service_management/case_management/settings#servicenow
[29]: https://app.datadoghq.com/incidents/settings#Integrations
[30]: https://docs.datadoghq.com/help/
[31]: images/servicenow-cmdb-autoflush-rule.png
[32]: https://docs.datadoghq.com/monitors/configuration/?tab=thresholdalert#multi-alert
[33]: images/servicenow-variables-form.png
[34]: images/servicenow-variables.png
[35]: https://docs.servicenow.com/en-US/bundle/sandiego-it-service-management/page/product/incident-management/task/def-prio-lookup-rules.html
[36]: images/servicenow-priority-field-mapping.png
[37]: images/servicenow-03-servicenow-resolved.png
[38]: images/servicenow-click-transform-map.png
[39]: images/servicenow-source-target-fields.png
[40]: images/servicenow-click-new.png
[41]: images/servicenow-select-source-target.png
[42]: images/servicenow-script-example.png
[43]: https://www.datadoghq.com/blog/create-servicenow-tickets-from-datadog-alerts
[44]: https://www.datadoghq.com/blog/servicenow-cmdb-it-management-datadog

