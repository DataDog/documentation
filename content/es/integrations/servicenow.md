---
categories:
- alerting
- incidents
- issue tracking
- notifications
custom_kind: integración
dependencies: []
description: Haz que tus alertas de Datadog generen y actualicen automáticamente los
  tiques.
doc_link: https://docs.datadoghq.com/integrations/servicenow/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/create-servicenow-tickets-from-datadog-alerts/
  tag: Blog
  text: Crear tiques de ServiceNow a partir de alertas de Datadog
- link: https://www.datadoghq.com/blog/servicenow-cmdb-it-management-datadog/
  tag: Blog
  text: Gestiona tu infraestructura con ServiceNow CMDB y Datadog
git_integration_title: servicenow
has_logo: true
integration_id: ''
integration_title: ServiceNow
integration_version: ''
is_public: true
manifest_version: '1.0'
name: servicenow
public_title: Integración de Datadog y ServiceNow
short_description: Haz que tus alertas de Datadog generen y actualicen automáticamente
  los tiques.
team: integraciones web
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

ServiceNow es una plataforma de servicio de gestión de TI para el registro, seguimiento y gestión de los procesos de TI de nivel empresarial de una empresa en una única localización.

La integración de Datadog y ServiceNow es una integración bidireccional que te permite:

-   Envía eventos generados por Datadog a tiques de ServiceNow, además de gestionar el flujo de trabajo de resolución desde Datadog hasta la gestión de servicios de TI (ITSM) y gestión de operaciones de TI (ITOM)
-   Utiliza Datadog como mecanismo de detección para elementos de configuración (CI) de ServiceNow Configuration Management Database (CMDB) con el conector de gráficos de servicio.
-   Mejora la información específica del negocio almacenada como CIs en ServiceNow CMDB con tu información de hosts, servicios y dispositivos de Datadog, lo que te permite comprender mejor el uso de infraestructura, acelerar la solución de problemas y maximizar el uso de recursos.

Datadog se integra con las siguientes herramientas de ServiceNow:

-   ITOM
-   ITSM
-   CMDB

**Nota**: la integración de Datadog y ServiceNow es compatible con [versiones de ServiceNow][1] que no figuran como finalizadas.

### Configurar el cuadro de ServiceNow en Datadog

1. Navega en Datadog hasta el [cuadro de integración de ServiceNow][2] en la página Integraciones.
2. Haz clic en **Add New Instance** (Añadir nueva instancia).
3. Añade el nombre de la instancia, que es el subdominio de tu dominio de ServiceNow: `<INSTANCE_NAME>.service-now.com`.
4. Añade el nombre de usuario y la contraseña de tu instancia de ServiceNow.

**Nota**: Puedes crear un usuario limitado en ServiceNow sólo para Datadog.

{{< img src="integrations/servicenow/servicenow-configuration-new-instance-12-23.png" alt="nueva instancia de la integración de servicenow" >}}

## Configuración de CMDB

### Conector gráfico de servicio para Datadog

[El conector de gráfico de servicio para la observabilidad de Datadog][3] puede rellenar automáticamente el servidor y los elementos de configuración (CI) de la base de datos en la CMDB para nuevos recursos detectados por Datadog. El conector de gráfico de servicio está disponible a través del [almacén] de ServiceNow[4].

Para la configuración, sigue las instrucciones de configuración guiada del Conector de gráfico de servicio.

Tipos de CI compatibles:

-   Servidor
-   Amazon RDS

Las notas siguientes sólo se aplican si ya has configurado la integración para ServiceNow ITOM/ITSM:

-   El Conector de gráfico de servicio no utiliza los valores `Target table` y `Custom table` del cuadro de configuración. Puedes guardar la integración con los valores por defecto de la tabla de destino.
-   El mismo usuario ITOM/ITSM puede utilizarse para el Conector de gráfico de servicio otorgando a este usuario el rol de cmdb_import_api_admin tal y como se describe en las instrucciones de configuración guiada del Conector de gráfico de servicio.

### Etiquetado de host

Mejora tus hosts de Datadog con metadatos de ServiceNow CMDB a través del etiquetado de host.

Para permitir la ingesta de etiquetas (tags) de host:

1. Configura una consulta del [Query Builder][5] en tu instancia de ServiceNow que devuelva todos los hosts que deseas etiquetar en Datadog.
1. Programa la consulta para que se ejecute en el intervalo de actualización que desees.
1. Una vez guardada la consulta en ServiceNow, ve al cuadro de integración de ServiceNow de Datadog. Selecciona **Host Tagging** (Etiquetado de host) en la pestaña **CMDB Enrichment** (Mejora de la CMBD).
1. En **Query Configuration** (Configuración de consulta), haz clic en el botón **Add New Query** (Añadir nueva consulta).
1. Selecciona la **ServiceNow Instance** (Instancia de ServiceNow) y la **Query** (Consulta) de los menús desplegables.
1. Selecciona un valor para la columna **Hostname** (Nombre de host) que asigne el campo de nombre de host del CI raíz de tu consulta al campo de nombre de host de Datadog.
1. Selecciona cualquier reasignación de nombre de campo opcional con **Column Name Maps** (Asignaciones de nombre de columna).
1. Haz clic en **Guardar**.

Espera que las etiquetas de host se rellenen en Datadog poco después de las ejecuciones programadas de tus consultas.

{{< img src="integrations/servicenow/host-tags.jpg" alt="Captura de pantalla de la pestaña Información del host que muestra las etiquetas de host de ServiceNow" >}}

Monitoriza el proceso de ingesta en el Datadog [Events Explorer][6] mediante el alcance de tu consulta de búsqueda en `source:servicenow`.

{{< img src="integrations/servicenow/ingestion-progress.jpg" alt="Captura de pantalla que muestra una ingesta en ejecución" >}}

#### Solucionar problemas

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

Con el etiquetado de servicio, puedes rellenar tu [Catálogo de servicios][7] de Datadog con servicios de tu CMDB de ServiceNow.

#### Configuración

Para permitir la ingesta de datos de servicio:

1. Configura una consulta del [Query Builder][5] en tu instancia de ServiceNow que devuelva todos los servicios con los que deseas mejorar el Catálogo de servicios.
1. Programa la consulta para que se ejecute en el intervalo de actualización que desees.
1. Una vez guardada la consulta en ServiceNow, ve al cuadro de integración de ServiceNow de Datadog. Selecciona **Service Tagging** (Etiquetado de servicio) en la pestaña **CMDB Enrichment** (Mejora de la CMBD).
1. En **Query Configuration** (Configuración de consulta), haz clic en el botón **Add New Query** (Añadir nueva consulta).
1. Selecciona la **ServiceNow Instance** (Instancia de ServiceNow) y la **Query** (Consulta) de los menús desplegables.
1. Selecciona un valor del menú desplegable **Service Name Column** (Nombre de columna de servicio). El valor coincide con el nombre de la columna en el CI del servicio raíz de tu consulta y rellena el nombre de servicio en el catálogo de servicios.
1. Configurar asignaciones de esquema para introducir metadatos adicionales sobre tu servicio en el catálogo de servicios. Consulta [Definiciones de servicio][8] para obtener más información. Para que Datadog acepte la ingesta, cada campo de la asignación debe ser del tipo correcto para asignarse al esquema de definición de servicio del catálogo de servicios.
1. Haz clic en **Guardar**.

Espera ver los datos de servicio rellenados en Datadog unos minutos después de las ejecuciones programadas de tus consultas. Para ver los errores de ingesta, ve a [Events Explorer][6] y busca eventos con `source:servicenow`.

{{< img src="integrations/servicenow/service-metadata.jpg" alt="Captura de pantalla del panel de Configuración del servicio que muestra los metadatos cargados de ServiceNow" >}}

#### Solucionar problemas

Para que la ingesta de servicio funcione correctamente, asegúrate de que en tu sistema se cumple lo siguiente:

-   El usuario que creó y ejecuta la consulta del Query Builder coincide con un nombre de usuario en tu configuración de Datadog. El usuario en ServiceNow debe tener el rol `cmdb_query_builder_read`.
-   El número de resultados devueltos por la consulta debe ser inferior o igual a la configuración de `glide.cmdb.query.max_results_limit` en ServiceNow. Por defecto, el número máximo de resultados es 10000. Para cambiar la configuración, ve a **Configuration** -> **CMDB Properties** -> **Query Builder Properties** (Configuración -> Propiedades de CMDB -> **Propiedades del Query Builder).
-   Todos los CIs configurados en tu consulta del Query Builder deben tener una etiqueta (label) **1**. Esto garantiza que no has creado ningún CIs duplicado, el analizador no lo admite.

### Etiquetado de dispositivo de red

Añade etiquetas a tus dispositivos de red en Datadog poblados con datos de tu ServiceNow CMDB.

Con el etiquetado de dispositivo, puedes mejorar dinámicamente dispositivos de red monitorizados por Datadog [Network Device Monitoring][9] con metadatos de dispositivos de tu CMDB de ServiceNow.

Para permitir la ingesta de etiquetas de dispositivo:

1. Configura una consulta de [Query Builder][5] en tu instancia de ServiceNow. Asegúrate de que devuelve la dirección IP del dispositivo.
1. Programa la consulta para que se ejecute en el intervalo de actualización que desees.
1. Si utilizas un espacio de nombres de IP personalizada en Datadog, deberás añadirlo a ServiceNow. Crea una columna en el CI del dispositivo de red llamada **u_dd_device_namespace**, poblada por el espacio de nombres correspondiente para cada dispositivo. Si esta columna no está presente, se utiliza el espacio de nombres por defecto.
1. Una vez guardada la consulta en ServiceNow, ve al cuadro de integración de ServiceNow de Datadog. Selecciona **Device Tagging** (Etiquetado de dispositivo) en la pestaña **CMDB Enrichment** (Mejora de la CMBD).
1. En **Query Configuration** (Configuración de consulta), haz clic en el botón **Add New Query** (Añadir nueva consulta).
1. Selecciona la **ServiceNow Instance** (Instancia de ServiceNow) y la **Query** (Consulta) de los menús desplegables.
1. Selecciona la columna IP Address (Dirección IP) que asigna el campo IP Address (Dirección IP) de tu consulta al campo IP Address (Dirección IP) de Datadog.
1. Selecciona cualquier cambio de nombre de campo opcional.
1. Haz clic en **Guardar**.

Puede esperar ver las etiquetas de dispositivo de red pobladas en Datadog unos minutos después de las ejecuciones programadas de tus consultas. Cualquier error de ingesta se notifica a través de eventos visibles en tu Events Explorer.

Monitoriza el proceso de ingesta en el [Events Explorer][6] de Datadog mediante el alcance de tu consulta de búsqueda en `source:servicenow`.

{{< img src="integrations/servicenow/ingestion-progress.jpg" alt="Captura de pantalla que muestra una ingesta en ejecución" >}}

#### Solucionar problemas

-   Verifica que el usuario que creó o está ejecutando la consulta del querybuilder es el mismo usuario en tu configuración de Datadog y tiene el rol `cmdb_query_builder_read`.
-   Comprueba que la consulta no devuelva más resultados de los que permite la configuración de `glide.cmdb.query.max_results_limit` en Servicenow.
    Asegúrate de que todos los CIs configurados en tu consulta del querybuilder tienen una etiqueta (label) '1'. Asegúrate de que no has creado ningún CI duplicado, ya que el analizador no lo admite.

#### Limitaciones

-   La ingesta está limitada a 100000 hosts por ejecución.
-   El etiquetado de dispositivo de red se limita a [dispositivos SNMP][10].
-   Las actualizaciones de los dispositivos se limitan a unos pocos miles por hora. Ten en cuenta este límite al elegir el intervalo de programación.

### Tablas de referencia

Utiliza [Tablas de referencia][11] para mejorar logs y eventos automáticamente con campos adicionales de tus CI de ServiceNow. Con las tablas de referencia, puedes asignar conjuntos de campos de valor a una clave principal, como un nombre de host, y añadir automáticamente estos campos a todos los logs o eventos que contengan la clave especificada.

Para permitir la ingesta de Tablas de referencia:

1. Configurar una consulta de [Query Builder][12] en tu instancia de ServiceNow.
1. Programa la consulta para que se ejecute en el intervalo de actualización que desees.
1. Guarda la consulta.
1. Selecciona **Add New Query** (Añadir nueva consulta) y elige tu consulta en el menú desplegable.
1. En el menú desplegable de clave primaria, selecciona el nombre de la columna que deseas utilizar como clave primaria.
    1. Opcionalmente, crea un [Pipeline de procesamiento][13] con esta clave primaria para mejorar y correlacionar logs y eventos.
1. Introduce un nombre para tu tabla de referencia.
1. Haz clic en **Guardar**.

La [Tabla de referencia][11] se rellenará con los datos de la consulta poco después de guardarla.

#### Advertencias y restricciones

-   El nombre de la tabla de referencia debe ser único.
-   No es posible eliminar ni actualizar el esquema de las tablas existentes.

## Configuración de ITOM e ITSM

{{% site-region region="gov,ap1" %}}

<div class="alert alert-warning">
La integración de la Gestión de casos no es compatible en el sitio de {{< region-param key=dd_datacenter code="true" >}}.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-warning">
La Gestión de incidencias no es compatible en el sitio de {{< region-param key=dd_datacenter code="true" >}}.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}

<div class="alert alert-warning">
Las notificaciones del Monitor predefinido no son compatibles con el sitio de {{< region-param key=dd_datacenter code="true" >}}.
</div>
{{% /site-region %}}

Para usar la integración de Datadog para Monitores, Gestión de casos y Gestión de incidencias, sigue estos pasos

1. [Instala la aplicación](#install-the-app)
2. [Crea una cuenta de ServiceNow Account con los permisos correctos para Datadog](#create-a-servicenow-account-with-correct-permissions-for-datadog)
3. [Configura las aplicaciones de Datadog para usar ITOM e ITSM](#configure-datadog-applications-for-use-with-itom-and-itsm-modules)

### Instala la aplicación

La aplicación se puede instalar de dos maneras:

1. Instala la versión más reciente de la aplicación `ITOM/ITSM Integration for Datadog` en la tienda de ServiceNow.

{{< img src="integrations/servicenow/servicenow-appstore-itxm-integration.png" alt="Integración de ITSM/ITOM en la tienda de aplicaciones de ServiceNow" >}}

2. Descarga el conjunto de actualización más reciente: [`Datadog-Snow_Update_Set_v2.6.1.xml`][14] y cárgalo en tu instancia de ServiceNow de forma manual.

**Changelog**

-   v2.4.0 >= Sincronización unidireccional con la Gestión de casos
-   v2.5.0 >= Sincronización bidireccional con la Gestión de casos y la tabla de ITSM para la integración con la Gestión de casos. Además, la sincronización bidireccional con la Gestión de casos solo es compatible con ServiceNow ITSM.
-   v2.6.0 >= Notificaciones del Monitor predefinido con ITOM/ITSM

Instalar el conjunto de actualización en ServiceNow:

1. Importa de forma manual el archivo XML del conjunto de actualización que descargaste en tu instancia de ServiceNow.
2. Una vez importado el archivo, el estado del conjunto de actualización debería ser `Loaded`. Haz clic en el nombre del conjunto de actualización para obtener una vista previa de los cambios.
3. Una vez previsualizado el conjunto de actualización y confirmado que no haya errores, selecciona **Commit Update Set** (Confirmar el conjunto de actualización) para fusionar la aplicación en tu sistema.

Una vez instalada la aplicación, busca **Datadog** en el menú de navegación de ServiceNow para acceder a todas las tablas y busca la página de Configuración para establecer la sincronización bidireccional.

-   `Configuration`
-   `Datadog Incidents ITSM`
-   `Cases ITOM`, antes `Datadog Cases ITOM`
-   `Cases ITSM`, antes `Datadog Cases ITSM`
-   `Legacy Monitors ITOM`, antes `Datadog Monitors ITOM`
-   `Legacy Monitors ITSM`, antes `Datadog Monitors ITSM`
-   `Templated Monitors ITOM`
-   `Templated Monitors ITSM`

### Crear una cuenta de ServiceNow Account con los permisos correctos para Datadog

Para usar la integración, crea un usuario de ServiceNow (por ejemplo, nombre de usuario “datadog” o "datadog_integration") y asígnalo a los siguientes roles:

-   `x_datad_datadog.user` y
-   `import_set_loader` y
-   `import_transformer`

#### Resolución y cierre de incidencias

<div class="alert alert-info">La sincronización bidireccional con la Gestión de casos solo es compatible con ServiceNow ITSM.</div>

Si deseas sincronizar el estado de la incidencia para su resolución, el usuario de ServiceNow necesita uno de los siguientes roles:

-   `ITIL` o
-   `list_updater` o
-   `sn_incident_write`

Si deseas sincronizar el estado de la incidencia para su cierre, el usuario de ServiceNow necesita el siguiente rol:

-   `ITIL_admin`

#### Enviar notificaciones de monitor directamente a las tablas Incidencia y Evento

Si deseas enviar notificaciones directamente a la tabla **Event** (Evento) del módulo ITOM o a la tabla **Incident** (Incidencia) del módulo ITSM, el usuario de ServiceNow necesita uno de los siguientes roles:

-   `ITIL` para ITSM
-   `evt_mgmt_integration` para ITOM

**Nota**: Las actualizaciones manuales realizadas a un tique en ServiceNow por este usuario de ServiceNow ("Datadog" o "datadog_integration") no se sincronizan con Datadog.

### Notificaciones del Monitor predefinido

**Nota**: Se requiere una versión de la aplicación >= v2.6.0 para esta funcionalidad. También debes añadir una instancia en la página Configuración del cuadro de ServiceNow en Datadog antes de completar los pasos siguientes.

##### Configuración de la Asignación de prioridades de instancia

{{< img src="integrations/servicenow/servicenow-priority-mapping.png" alt="Formulario de asignación de prioridades de ServiceNow en el cuadro de integración" >}}

Para todos los @-handles predefinidos para una instancia en particular, Datadog ahora asigna automáticamente la prioridad del monitor en Impacto y Urgencia en ServiceNow de acuerdo a esta asignación.

Al desactivar `Use Instance Priority Mapping` se desactiva la configuración Impacto y Urgencia en los registros de ServiceNow.

#### Configurar una plantilla de monitor 

{{< img src="integraciones/servicenow/servicenow-integración-cuadro.png" alt="El nuevo cuadro de integración de new ServiceNow" >}}

Para las notificaciones de monitor que utilizan `@servicenow-<TEMPLATE_NAME>` en Datadog, utiliza la nueva interfaz de usuario de creación de plantillas en la pestaña de ITOM/ITSM del cuadro de integración de ServiceNow en Datadog para crear una notificación en ServiceNow.

**Nota**: Esto sólo está disponible para versiones de la aplicación >= 2.6.0.

##### Crea un @handle personalizado de ServiceNow para notificaciones del monitor

{{< img src="integrations/servicenow/servicenow-monitors.png" alt="Instrucciones de notificación del monitor en el nuevo cuadro de integración de ServiceNow" >}}

1. Haz clic en el botón `+ New` para crear una nueva plantilla.
2. Define un @-handle `Name`, `Instance` y `Target Table` al cual se envíe la notificación del monitor. A continuación, selecciona uno de `Assignment Group`, `Business Service`, `User` o `Unassigned` para asignar el registro. El mapa de transformación definido en 2.6.0 rellena automáticamente el registro `INC` de la incidencia con el valor que selecciones aquí.

Para utilizar la nueva plantilla, añade `@servicenow-<TEMPLATE_NAME>` en una descripción de monitor.

Puedes añadir campos personalizados a la carga útil haciendo clic en `Add Field` en la sección `Customize notification payload`.

#### Configuración de la Gestión de casos

{{< img src="integrations/servicenow/servicenow-case-management.png" alt="Instrucciones de la Gestión de casos en el nuevo cuadro de integración de ServiceNow" >}}

En la pestaña del `Case Management`:

1. Selecciona la instancia que deseas configurar para la Gestión de casos.
2. Elige la tabla a la que deseas enviar los casos: `Datadog Cases ITOM` o `Datadog Cases ITSM`.
   **Nota**: Por defecto no se selecciona ninguna tabla.
3. Ve a [Case Management][15] (Gestión de casos) en Datadog.
4. Selecciona Create ServiceNow Incident (Crear incidencia de ServiceNow).
5. Elige la instancia y el grupo de asignación opcional y, a continuación, haz clic en Create (Crear).

##### Sincronización bidireccional del estado y los comentarios con la Gestión de casos

Para permitir que las ediciones en ServiceNow actualicen sus casos asociados en Datadog, un usuario de ServiceNow con el rol `x_datad_datadog.user` y el rol `admin` debe configurar los ajustes de instalación de la aplicación **integración de ITOM/ITSM para Datadog** en ServiceNow:

1. Accede a la página de configuración de la aplicación **integración de ITOM/ITSM para Datadog** haciendo clic en **All** (Todos) en la esquina superior izquierda, escribiendo `ITOM/ITSM Integration for Datadog` en el filtro y haciendo clic en el enlace **Configuration** (Configuración) que aparece en la lista filtrada.
1. Elige la ubicación de tu Centro de datos de Datadog.
1. Pega una clave de API de Datadog, que puedes encontrar en tu **Organization Settings** (Parámetros de organización), en el campo **API Key** (Clave de API).
1. Pega una clave de aplicación de cuenta del servicio de Datadog, que puedes encontrar en tu **Organization Settings** (Parámetros de organización), en el campo **Application Key** (Clave de aplicación).
1. Comprueba la casilla Enabled (Activado) y guarda los cambios de configuración.

Después de configurar los ajustes de instalación en ServiceNow, vuelve a la Gestión de casos de Datadog para [configurar la integración][16].

**Nota**: Es importante utilizar una clave de aplicación de la cuenta de servicio para esta configuración en lugar de la clave de aplicación de un usuario. La clave de aplicación de un usuario está vinculada a los permisos de la cuenta del usuario. Si los permisos del usuario se reducen o si el usuario es desactivado, la sincronización bidireccional entre ServiceNow y Datadog se detendrá. Una clave de aplicación de cuenta de servicio no está vinculada a un usuario individual, por lo que la sincronización bidireccional no se verá afectada por los cambios en la cuenta de usuario.

{{< img src="integrations/servicenow/datadog-sync-configuration.png" alt="Ajustes de configuración en  ServiceNow para sincronizar los cambios de ServiceNow en Datadog" >}}

#### Configuración de la Gestión de incidencias

Después de instalar la aplicación, visita los [ajustes de la integración[17] en la aplicación de incidencias para finalizar la configuración.

#### Notificaciones de monitor legacy

Para las notificaciones de monitor legacy mediante `@servicenow-<INSTANCE_NAME>` en Datadog, selecciona la tabla intermedia a la que enviar notificaciones en la parte inferior del cuadro de ITOM/ITSM titulado: "Manage Legacy Monitor Notifications" (Gestionar notificaciones de monitor legacy).

1. Selecciona la instancia para la que deseas configurar notificaciones y, a continuación, selecciona la tabla en la que escribir notificaciones de monitor legacy.
2. Para validar que la integración está configurada correctamente, añade `@servicenow-<INSTANCE_NAME>` en un monitor o notificación de evento. Los datos sin procesar rellenan las filas de la tabla provisional y se reenvían a la tabla de ServiceNow especificada por la aplicación.
3. [Utiliza mapas de transformación](#customize-data-with-transform-maps) en ServiceNow para personalizar la transformación de los datos enviados a las tablas provisionales.
4. Personaliza la carga útil de notificación con las variables disponibles en Datadog o cadenas personalizadas.

#### Personalizar los datos para monitorizar notificaciones con mapas de transformación

Las tablas **Templated Monitors ITSM**, **Legacy Monitors ITSM** y **Datadog Cases ITSM** utilizan un mapa de transformación para transformar los registros de Datadog en las incidencias de ServiceNow.
De la misma manera, **Datadog Monitors ITOM** y **Datadog Cases ITOM** transforman los registros de Datadog en eventos de ServiceNow.

Las tablas **Templated Monitors ITOM** y **Templated Monitors ITSM** utilizan mapas de transformación para transformar los registros de Datadog en eventos e incidencias de ServiceNow respectivamente. Puedes personalizar la información de eventos e incidencias de ServiceNow en estas tablas personalizando la carga útil de notificación en la interfaz de usuario `New Template` y ampliar los mapas de transformación en ServiceNow.

**Nota**: Las tablas **Datadog Cases ITOM** y **Datadog Cases ITSM** utilizan de forma similar mapas de transformación; sin embargo, la personalización del mapa de transformación no es recomendada para su uso con la Gestión de casos, dado que la carga útil de los casos de Datadog no es personalizable.

## Solucionar problemas

Si no estás viendo eventos en tus tablas de ServiceNow y en su lugar tienes

-   Un mensaje de error en tu cuadro de integración de Datadog o una notificación `Error while trying to post to your ServiceNow instance`:

    -   Comprueba que solo se ha utilizado el subdominio al introducir el nombre de tu instancia.
    -   Comprueba que el usuario que has creado tiene los permisos necesarios.
    -   Comprueba que el nombre de usuario y la contraseña son correctos.

-   Se configura la integración, se activa una alerta y no se crea ningún tique:

    -   Confirma que la tabla intermedia está poblada. Si es así, el problema está en las asignaciones y transformaciones. Puedes depurar aún más tus asignaciones y scripts accediendo a **Transform Errors** (Errores de transformación) en ServiceNow.
    -   Confirma que estás trabajando con la tabla provisional que especificaste en el cuadro.

    El usuario de ServiceNow necesita los roles `rest_service` y `x_datad_datadog.user` para poder acceder a las tablas de importación. Si estás utilizando la forma legacy de enviar notificaciones directamente a la tabla Incident (Incidencias) o a la tabla Event (Event), necesitas los permisos `itil` y `evt_mgmt_integration`.

Si ves actualizaciones de la Gestión de casos de Datadog en ServiceNow, pero no ves actualizaciones de ServiceNow a Datadog, este es el comportamiento esperado para ServiceNow ITOM. La sincronización bidireccional con la Gestión de Casos sólo es compatible con ServiceNow ITSM.

¿Necesitas más ayuda? Ponte en contacto con el [soporte de Datadog][18].

## Base de conocimientos

### Campos de tabla del ITXM de monitores predefinidos y mapas de transformación

`action`
: **Tipo**: string<br>
La acción que se está llevando a cabo en el monitor: `create`, `update`, `acknowledge` o `resolve`

`additional_information`
: **Tipo**: string<br>
**Transformación ITOM**: `additional_info`<br>
Cadena formateada que contiene todos los detalles de evento 

`aggreg_key`
: **Tipo**: string<br>
Clave de agregación que representa un hash del ID del monitor de alerta

`alert_cycle_key`
: **Tipo**: string<br>
Clave que representa un hash de un ciclo de alerta de monitor único (rastrea Alerta → Advertencia → Resolución).

`alert_id`
: **Tipo**: string<br>
ID de monitor de alerta

`alert_metric`
: **Tipo**: string<br>
**Transformación ITOM**: `metric_name`<br>
Métrica que activó la alerta

`alert_query`
: **Tipo**: string<br>
Consulta que activó la alerta

`alert_scope`
: **Tipo**: string<br>
Contexto que activó la alerta

`alert_status`
: **Tipo**: string<br>
Estado actual de la alerta

`alert_title`
: **Tipo**: string<br>
Nombre de la alerta

`alert_transition`
: **Tipo**: string<br>
**Transformación ITSM**: (script) -> estado<br>
Estado de transición de la alerta: `Triggered`, `Warn` o `Recovered`

`assignment_group_sys_id`
: **Tipo**: reference<br>
**Transformación ITSM**: `assignment_group`<br>
**Tabla de referencia**: grupo<br>
ServiceNow sys_id para el grupo de asignación del identificador predefinido

`business_service_sys_id`
: **Tipo**: reference<br>
**Transformación ITSM**: `business_service`<br>
**Tabla de referencia**: servicio<br>
ServiceNow sys_id para el servicio empresarial del identificador predefinido

`custom_fields`
: **Tipo**: string<br>
Campos clave-valor configurados por el usuario formateados como cadena convertible a JSON

`datadog_tags`
: **Tipo**: string<br>
Etiquetas (tags) de Datadog en el monitor de alerta

`description`
: **Tipo**: string<br>
**Transformación ITSM**: `description`<br>
**Transformación ITOM**: `description`<br>
Descripción resumida del monitor de alerta

`event_details`
: **Tipo**: string<br>
**Transformación ITSM**: `work_notes`<br>
Detalles del evento con enlaces formateados y clicables a Datadog

`event_id`
: **Tipo**: string<br>
ID de Datadog del evento

`event_link`
: **Tipo**: string<br>
Enlace al evento creado a partir de la alerta del monitor 

`event_msg`
: **Tipo**: string<br>
Mensaje del evento

`event_title`
: **Tipo**: string<br>
**Transformación ITSM**: `short_description`<br>
Título del evento

`event_type`
: **Tipo**: string<br>
**Transformación ITOM**: `type`<br>
Tipo de evento

`hostname`
: **Tipo**: string<br>
**Transformación ITSM**: `cmdb_ci`<br>
**Transformación ITOM**: `node`<br>
Host del monitor afectado

`impact`
: **Tipo Entero<br>
**Transformación ITSM**: `impact`<br>
Valor de impacto basado en la asignación definida por el usuario de la prioridad del monitor 

`logs_sample`
: **Tipo**: string<br>
Muestra de los logs relevantes

`monitor_priority`
: **Tipo**: integer<br>
**Transformación ITOM**: `severity`<br>
Prioridad del monitor de alerta como un entero

`org_name`
: **Tipo**: string<br>
Nombre de la organización del monitor de alerta

`sys_created_by`
: **Tipo**: string<br>
**Transformación ITSM**: `caller_id`<br>
Creador del registro (normalmente la cuenta de API de ServiceNow configurada).

`ticket_state`
: **Tipo**: string<br>
**Transformación ITSM**: (script) -> state, (script) -> close_code, (script) -> resolution_notes<br>
**ITOM Transform**: (script) -> resolution_notas<br>
Estado del registro de ServiceNow: `new` o `resolved`

`u_correlation_id`
: **Tipo**: string<br>
**Transformación ITSM**: `correlation_id`<br>
**Transformación ITOM**: `message_key`<br>
Combinación de alert_cycle_key y aggreg_key utilizada para agrupar los registros en la misma incidencia de destino

`urgency`
: **Tipo**: integer<br>
**Transformación ITSM**: `urgency`<br>
Urgencia establecida a partir de la asignación definida por el usuario en el cuadro de integración basado en la prioridad definida del monitor 

`user_sys_id`
: **Tipo**: reference<br>
**Transformación ITSM**: `assigned_to`<br>
**Tabla de referencia**: usuario <br>
sys_id del identificador predefinido pasado por el usuario.


### Regla de descarga automática de importación de host de Datadog

Para evitar que la tabla de conjuntos de importación `x_datad_datadog_import_host` acumule demasiadas filas, se ha añadido una regla de descarga automática a la herramienta Table Cleaner para conservar sólo las últimas 24 horas de datos. Esta configuración puede modificarse según sea necesario accediendo a `sys_auto_flush_list.do` en el navegador de filtros y entrando en la regla de la tabla `x_datad_datadog_import_host`. El campo `Age in seconds` puede actualizarse en consecuencia.

{{< img src="integrations/servicenow/servicenow-cmdb-autoflush-rule.png" alt="Configuración de integración" >}}

### Generación automática de tiques de soporte a partir de las alertas de Datadog 

Una vez conectado ServiceNow a tu cuenta de Datadog, las alertas recibidas pueden crear automáticamente tiques de soporte y enviarlos a la cola de tiques de ServiceNow. Desde allí, tu equipo de soporte es notificado de los problemas mediante flujos de trabajo de comunicación que ya has establecido dentro de ServiceNow. Menciona `@servicenow` en el mensaje de alerta o añade `@servicenow` a la lista de notificación para ese monitor.

{{< img src="integrations/servicenow/servicenow-02-monitor-page.png" alt="ServiceNow" >}}

### Utilizar variables en la carga útil del tique y en las asignaciones de campos

Las variables se pueden utilizar en el cuerpo de las alertas o en las asignaciones de campos para asegurar que los detalles de evento se incluyan en ServiceNow. Por ejemplo, puedes incluir el título y la gravedad en el campo apropiado de ServiceNow o puedes incluir un enlace a la incidencia específica en Datadog directamente desde el tique de ServiceNow.

{{< img src="integrations/servicenow/servicenow-variables-form.png" alt="Formulario de entrada de las variables de ServiceNow" >}}

{{< img src="integrations/servicenow/servicenow-variables.png" alt="Variables de ServiceNow" >}}

### Asignación del campo Prioridad de la incidencia

El campo `priority` en las incidencias de ServiceNow es de _sólo lectura_ y sólo se puede actualizar utilizando [reglas de búsqueda de prioridad][19].

Define `Impact` y `Urgency` en monitores para calcular la prioridad de la incidencia de ServiceNow.

{{< img src="integrations/servicenow/servicenow-priority-field-mapping.png" alt="Asignación del campo de prioridad de ServiceNow" >}}

### Automatizar el flujo de trabajo de resolución de incidencias

Una vez que el estado del monitor vuelve a la normalidad, el tique de soporte asociado se marca automáticamente como "resuelto".

{{< img src="integrations/servicenow/servicenow-03-servicenow-resolved.png" alt="ServiceNow resuelto" >}}

### Definir asignaciones personalizadas

Haz clic en una de las tablas, por ejemplo **Datadog Monitors ITSM Tables** y desplázate hasta la parte inferior del registro para ver el enlace de la asignación de transformación asociada.

### Comprender la asignación

Haz clic en el nombre de la asignación de transformación para ver el registro:

{{< img src="integrations/servicenow/servicenow-click-transform-map.png" alt="integración de servicenow" >}}

En la parte superior hay dos campos importantes en el registro de Transformación: `Source table` y `Target table`:

{{< img src="integrations/servicenow/servicenow-source-target-fields.png" alt="integración de servicenow" >}}

**Notas**:

-   El origen es la tabla del conjunto de importaciones que seleccionaste (Datadog Monitors ITSM Tables) y el destino es tu tabla de incidencias real (o tabla de evento) donde se almacenan los eventos.
-   Las asignaciones de campos se encuentran en la parte inferior del registro. Se incluyen algunas asignaciones básicas. Aquí es donde se seleccionan los campos a incluir, se define el formato y se seleccionan los campos de destino en tu instancia de ServiceNow.

### Añadir una nueva asignación de campos

Haz clic en **New** (Nuevo):

{{< img src="integrations/servicenow/servicenow-click-new.png" alt="integración de servicenow" >}}

Selecciona los campos de origen y destino para las asignaciones uno a uno:

{{< img src="integrations/servicenow/servicenow-select-source-target.png" alt="integración de servicenow" >}}

O marca la casilla **Use source script** (Usar script fuente) y define transformaciones:

{{< img src="integrations/servicenow/servicenow-script-example.png" alt="integración de servicenow" >}}

**Nota:** Para asignar cualquier campo personalizado en el cuadro de integración, puedes utilizar el siguiente script de asignación para las asignaciones de Datadog Monitors ITOM y Datadog Monitors ITSM Transform. En este ejemplo, el campo `my_field` se definió como un campo personalizado en el cuadro de integración:

```
answer = (function transformEntry(source)
{
    var additional_info = JSON.parse(source.additional_info);
    return additional_info.custom_my_field;
})(source);
```

### Definir asignaciones múltiples

Utiliza **Mapping Assist** (en enlaces relacionados) para asignar varios campos de origen y destino:

{{< img src="integrations/servicenow/servicenow-mapping-assist.png" alt="integración de servicenow" >}}

### Validación

Para validar que la integración está configurada correctamente, añade `@servicenow` en un monitor o notificación de evento. Los datos sin procesar rellenan las filas de la tabla provisional y se reenvían a la tabla de ServiceNow especificada en las asignaciones y transformaciones que has creado.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.servicenow.com/community/now-platform-articles/servicenow-versions-release/ta-p/2312014
[2]: https://app.datadoghq.com/integrations/servicenow
[3]: https://store.servicenow.com/sn_appstore_store.do#!/store/application/c877cb86687e0050f8774bfad236c950/1.2.1
[4]: https://store.servicenow.com/
[5]: https://docs.servicenow.com/bundle/xanadu-servicenow-platform/page/product/configuration-management/concept/cmdb-query-builder-landing-page.html
[6]: https://app.datadoghq.com/event/explorer
[7]: https://docs.datadoghq.com/es/tracing/service_catalog/
[8]: https://docs.datadoghq.com/es/tracing/service_catalog/adding_metadata/
[9]: https://docs.datadoghq.com/es/network_monitoring/devices/
[10]: https://docs.datadoghq.com/es/network_monitoring/devices/snmp_metrics/
[11]: https://app.datadoghq.com/reference-tables
[12]: https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/configuration-management/task/use-cmdb-query-builder.html
[13]: https://app.datadoghq.com/event/pipelines
[14]: https://docs.datadoghq.com/resources/xml/Datadog-Snow_Update_Set_v2.6.1.xml
[15]: https://app.datadoghq.com/cases
[16]: https://docs.datadoghq.com/es/service_management/case_management/settings#servicenow
[17]: https://app.datadoghq.com/incidents/settings#Integrations
[18]: https://docs.datadoghq.com/es/help/
[19]: https://docs.servicenow.com/en-US/bundle/sandiego-it-service-management/page/product/incident-management/task/def-prio-lookup-rules.html