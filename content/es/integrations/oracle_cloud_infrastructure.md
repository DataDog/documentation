---
app_id: oracle-cloud-infrastructure
app_uuid: c2b4d38f-dd23-4ca2-8bc4-b70360868e8c
assets:
  dashboards:
    Oracle-Cloud-Infrastructure-Overview-Dashboard: assets/dashboards/oracle-cloud-infrastructure-overview-dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - oci.mediastreams.egress_bytes
      metadata_path: metadata.csv
      prefix: oci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 310
    source_type_name: Oracle Cloud Infrastructure
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- recopilación de logs
- la red
- oracle
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oracle_cloud_infrastructure
integration_id: oracle-cloud-infrastructure
integration_title: Oracle Cloud Infrastructure
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oracle_cloud_infrastructure
public_title: Oracle Cloud Infrastructure
short_description: OCI es una colección de servicios en la nube diseñada para dar
  soporte a una serie de aplicaciones en un entorno alojado.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Log Collection
  - Category::Network
  - Category::Oracle
  - Offering::Integration
  configuration: README.md#Setup
  description: OCI es una colección de servicios en la nube diseñada para dar soporte
    a una serie de aplicaciones en un entorno alojado.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Oracle Cloud Infrastructure
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Oracle Cloud Infrastructure (OCI) es una infraestructura como servicio (IaaS) y plataforma como servicio (PaaS) utilizada por empresas. Con un completo conjunto de servicios gestionados para alojamiento, almacenamiento, redes, bases de datos y mucho más.

Utiliza la integración de OCI de Datadog para reenviar tus logs y métricas a Datadog, donde pueden servir para dashboards, pueden ayudar a solucionar problemas y ser monitorizados para la seguridad y la postura de cumplimiento.

## Configuración

### Recopilación de métricas

Para enviar tus métricas de OCI a Datadog:
   - [Ingresa la información de la tenencia](#enter-tenancy-info).
   - [Crea un stack tecnológico de políticas de OCI](#create-oci-policy-stack) en la región de origen de tu tenencia para crear un usuario de autenticación, un grupo y políticas de Datadog.
   - [Ingresa la información del DatadogAuthUser](#enter-datadogauthuser-info) en Datadog.
   - [Crea un stack tecnológico de reenvío de métricas de OCI](#create-oci-metric-forwarding-stack) para cada región de la tenencia desde la que quieras reenviar métricas.

Para ver una representación visual de esta arquitectura, consulta la sección [Arquitectura](#architecture).

#### Ingresar la información de la tenencia

{{% collapse-content title="Requisitos para esta sección" level="h5" %}}
- Tu cuenta de usuario de OCI necesita el rol **Cloud Administrator** (Administrador de la nube) para completar estos pasos.
- OCID de la tenencia
- Región de origen
{{% /collapse-content %}}

Ingresa el OCID y la región de origen de la tenencia que deseas monitorizar en el [cuadro de integración de Datadog y OCI][1].
   - Puedes encontrar esta información en la [Página de detalles de tenencia][2].
   - Introduce la región de origen utilizando el valor **Region Identifier** (Identificador de región) de la [página Regiones y dominios de disponibilidad][3] de OCI.

#### Crear un stack tecnológico de políticas de OCI

{{% collapse-content title="Requisitos para esta sección" level="h5" %}}
- Tu cuenta de usuario debe poder [crear políticas y grupos dinámicos][4] en el dominio predeterminado.
- Debes estar en la región de origen de la tenencia.
{{% /collapse-content %}}

<div class="alert alert-warning">Asegúrate de que la <strong>región de origen</strong> de la tenencia esté seleccionada en la parte superior derecha de la pantalla.</div>

Este stack tecnológico de políticas solo debe desplegarse una vez por tenencia.

1. Haz clic en el botón **Create Policy Stack** (Crear un stack tecnológico de políticas) en el cuadro de integración de Datadog y OCI.
2. Acepta las Condiciones de uso de Oracle.
3. Deja la opción de utilizar proveedores de Terraform personalizados **desmarcada**.
4. Utiliza el nombre y el compartimento predeterminados para el stack tecnológico. De manera opcional, indica tu propio nombre descriptivo o compartimento.
5. Haz clic en **Next** (Siguiente).
6. Asigna un nombre al grupo dinámico, el grupo de usuarios y a la política que se van a crear, o usa los nombres predeterminados proporcionados.
7. Haz clic en **Next** (Siguiente).
8. Haz clic en **Create** (Crear).

#### Ingresar la información del DatadogAuthUser

{{% collapse-content title="Requisitos para esta sección" level="h5" %}}
- OCID del `DatadogAuthUser`
- Clave de la API de OCI y valor de la huella digital
{{% /collapse-content %}}

1. En la barra de búsqueda de la consola de OCI, busca `DatadogAuthUser` y haz clic en el recurso de usuario que aparece.
2. Copia el valor del OCID del usuario.
3. Pega el valor en el campo **User OCID** (OCID del usuario) del [cuadro de integración de Datadog y OCI][1].
4. Vuelve a la consola de OCI y genera una clave de API con estos pasos:
   a. En la esquina inferior izquierda de la pantalla, en **Resources** (Recursos), haz clic en **API keys** (Claves de API).
   b. Haz clic en **Add API key** (Añadir clave de API).
   c. Haz clic en **Download private key** (Descargar clave privada).
   d. Haz clic en **Add** (Añadir).
   e. Aparece una ventana emergente **Configuration file preview** (Vista previa del archivo de configuración), pero no es necesario realizar ninguna acción; cierra la ventana emergente.

![La página Add API Key (Añadir clave de API) en la consola de OCI][5]

5. Copia el valor de la huella digital y pégalo en el campo **Fingerprint** (Huella digital) del [cuadro de integración de Datadog y OCI][1].
6. Copia el valor de la clave privada con estos pasos:
   a. Abre el archivo de clave privada `.pem` descargado en un editor de texto, o utiliza un comando de terminal como `cat` para mostrar el contenido del archivo.
   b. Copia todo el contenido, incluidos `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`.
7. Pega el valor de la clave privada en el campo **Private Key** (Clave privada) del cuadro de integración de Datadog y OCI.

#### Crear un stack tecnológico de reenvío de métricas de OCI

{{% collapse-content title="Requisitos para esta sección" level="h5" %}}
- Tu cuenta de usuario debe poder crear recursos en el compartimento.
- Valor de la [clave de API de Datadog][6].
- Nombre de usuario y token de autenticación para un usuario con los permisos `REPOSITORY_READ` y `REPOSITORY_UPDATE`, de modo que se puedan extraer y enviar imágenes a un repositorio de Docker.
    - Consulta [Cómo obtener un token de autenticación][7] para saber cómo crear un token de autenticación.
    - Consulta [Políticas para controlar el acceso a repositorios][8] para obtener más información sobre las políticas requeridas.

**Nota**: Para comprobar que el inicio de sesión en el registro de Docker es el correcto, consulta [Inicio de sesión en el registro de Oracle Cloud Infrastructure][9].
{{% /collapse-content %}}

El stack tecnológico de reenvío métricas debe desplegarse para **cada combinación de tenencia y región** que se va a monitorizar. Para la configuración más sencilla, Datadog recomienda crear todos los recursos de OCI necesarios con el stack tecnológico de ORM que se facilita a continuación. Como alternativa, puedes usar tu infraestructura de redes de OCI existente.

Todos los recursos creados a partir del stack tecnológico de ORM de Datadog se despliegan en el compartimento especificado y para la región seleccionada actualmente en la parte superior derecha de la pantalla.

1. Haz clic en el botón **Create Metric Stack** (Crear un stack tecnológico de métricas) en el cuadro de integración de Datadog y OCI.
2. Acepta las Condiciones de uso de Oracle.
3. Deja sin marcar la opción **Custom providers** (Proveedores personalizados).
4. Asigna un nombre al stack tecnológico y selecciona el compartimento en el que se desplegará.
5. Haz clic en **Next** (Siguiente).
6. En el campo **Datadog API Key** (Clave de API de Datadog), ingresa el valor de tu [clave de API de Datadog][6].

{{< tabs >}}
{{% tab "Creaf VCN con ORM (recomendado)" %}}
8. En la sección **Network options** (Opciones de red), deja marcada la opción `Create VCN`.
{{% /tab %}}
{{% tab "Usar una VCN existente" %}}
Si utilizas una VCN existente, debes indicar el OCID de la subred en el stack tecnológico. Asegúrate de que la VCN cumpla los siguientes requisitos:
   - Se le permite hacer llamadas de salida HTTP a través de la gateway NAT.
   - Puede extraer imágenes del registro de contenedores de OCI mediante la gateway de servicio.
   - Tiene las reglas de la tabla de enrutamiento para permitir la gateway NAT y la gateway de servicio.
   - Tiene las reglas de seguridad para enviar solicitudes HTTP.

8. En la sección **Network options** (Opciones de red), desmarca la opción `Create VCN` e ingresa la información de tu VCN:
    a. En el campo **vcnCompartment**, selecciona tu compartimento.
    b. En la sección **existingVcn**, selecciona tu VCN existente.
    c. En la sección **Function Subnet OCID** (OCID de subred de función), ingresa el OCID de la subred que se va a utilizar.
{{% /tab %}}
{{< /tabs >}}

9. De manera opcional, en la sección **Metrics settings** (Parámetros de las métricas), elimina cualquier espacio de nombres de métrica de la colección.
10. En la sección **Metrics compartments** (Compartimentos de las métricas), ingresa una lista separada por comas de los OCID de compartimentos que se van a monitorizar. Los filtros de espacio de nombres de métrica seleccionados en el paso anterior se aplican a cada compartimento.
11. En la sección **Function settings** (Parámetros de la función), indica un nombre de usuario de registro de OCI Docker y un token de autenticación en sus campos respectivos. Consulta [Cómo obtener un token de autenticación][7] para obtener más información.
12. Haz clic en **Next** (Siguiente).
13. Haz clic en **Create** (Crear).
14. Vuelve a la página del [cuadro de integración de Datadog y OCI][1] y haz clic en **Create configuration** (Crear configuración).

**Notas**:
- De forma predeterminada, solo se selecciona el compartimento raíz y se activan todos los espacios de nombres de métrica compatibles con la integración de Datadog y OCI (se admiten hasta 50 espacios de nombres por hub de conectores). Si eliges monitorizar compartimentos adicionales, se aplica cualquier filtro de exclusión de espacio de nombres de métrica a cada compartimento.
- Debes gestionar quién tiene acceso a los archivos de estado de Terraform de los stacks tecnológicos del gestor de recursos. Consulta la sección [Archivos de estado de Terraform][10] de la página Seguridad del gestor de recursos para obtener más información.

#### Validación

Consulta las métricas de `oci.*` en el [dashboard de información general de la integración de OCI][11] o en la [página del explorador de métricas][12] en Datadog.

<div class="alert alert-warning">Las métricas de la función de OCI (espacio de nombres <code>oci.faas</code>) y las métricas de la instancia del contenedor (espacio de nombres <code>oci_computecontainerinstance</code>) se encuentran en versión preliminar.</div>

#### Configuración

##### Añadir regiones

Para monitorizar una región adicional en una tenencia, navega hasta esa tenencia en el cuadro de integración de OCI.
  1. En la sección **Configure an Additional Region** (Configurar una región adicional), haz clic en **Create Metric Stack** (Crear un stack tecnológico de métricas).
  2. Cambia a la región que deseas monitorizar en la parte superior derecha de la pantalla.
  3. Completa los pasos de [Crear un stack tecnológico de reenvío de métricas de OCI](#create-oci-metric-forwarding-stack) en la región nueva.

##### Añadir compartimentos o espacios de nombres de métrica

Para añadir compartimentos o editar la lista de los espacios de nombres de métrica activados, haz clic en **Edit** (Editar) en el [hub de conectores][13] recién creado.
   - Haz clic en **+ Another compartment** (+ otro compartimento) para añadir compartimentos.
   - En la sección **Configure source** (Configurar origen), añade o elimina espacios de nombres del menú desplegable **Namespaces** (Espacios de nombres).

#### Arquitectura

##### Recursos de reenvío de métricas

![Un diagrama de los recursos de OCI mencionados en esta página, en el que se muestra el flujo de datos][14]

Esta integración crea un [hub de conectores][15] de OCI, una [aplicación de función][16] y una infraestructura de redes segura para reenviar métricas de OCI a Datadog. El stack tecnológico de ORM de estos recursos crea un repositorio de contenedores de la función para la región en la tenencia, y la imagen de Docker se envía a él para que la función la utilice.

##### Recursos de IAM

![Un diagrama de los recursos y el flujo de trabajo de OCI utilizados para la autenticación de la integración][17]

Esta integración crea lo siguiente:

 * Un grupo dinámico con `resource.type = 'serviceconnectors'`, para permitir el acceso al hub de conectores.
 * Un usuario llamado **DatadogAuthUser**, que Datadog usa para leer recursos de tenencia.
 * Un grupo al que se añade el usuario creado para acceder a la política.
 * Una política en el compartimento raíz para permitir que los hubs de conectores lean métricas e invoquen funciones. Además, otorga al grupo de usuarios creado acceso de lectura a los recursos de la tenencia. Se añaden las siguientes instrucciones a la política:

```text
Allow dynamic-group <GROUP_NAME> to read metrics in tenancy
Allow dynamic-group <GROUP_NAME> to use fn-function in tenancy
Allow dynamic-group <GROUP_NAME> to use fn-invocation in tenancy
Allow dynamic-group Default/<GROUP_NAME> to read metrics in tenancy
Allow dynamic-group Default/<GROUP_NAME> to use fn-function in tenancy
Allow dynamic-group Default/<GROUP_NAME> to use fn-invocation in tenancy
Allow group Default/<USER_GROUP_NAME> to read all-resources in tenancy
```

### Espacios de nombre de métrica

| Integración                         | Espacio de nombre de métrica                                                                                                                         |
|-------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------- |
| [Base de datos autónoma][18]           | [oci_autonomous_database][19]                                                                                                            |
| Block Storage                       | [oci_blockstore][20]                                                                                                                     |
| [Computación][21]                       | [oci_computeagent][22], [rdma_infrastructure_health][23], [gpu_infrastructure_health][24], [oci_compute_infrastructure_health][25]       |
| [Instancias de contenedor (versión preliminar)][26] | [oci_computecontainerinstance][27]                                                                                                       |
| [Base de datos][28]                      | [oci_database][29], [oci_database_cluster][30]                                                                                           |
| Gateway de enrutamiento dinámico             | [oci_dynamic_routing_gateway][31]                                                                                                        |
| FastConnect                         | [oci_fastconnect][32]                                                                                                                    |
| File Storage                        | [oci_filestorage][33]                                                                                                                    |
| [Funciones (versión preliminar)][34]           | [oci_faas][35]                                                                                                                           |
| [HeatWave MySQL][36]                | [oci_mysql_database][37]                                                                                                                 |
| Motor de Kubernetes                   | [oci_oke][38]                                                                                                                            |
| [Equilibrador de carga][39]                 | [oci_lbaas][40], [oci_nlb][41]                                                                                                           |
| [Gateway NAT][42]                   | [oci_nat_gateway][43]                                                                                                                    |
| Object Storage                      | [oci_objectstorage][44]                                                                                                                  |
| Cola                               | [oci_queue][45]                                                                                                                          |
| Hub de conectores de servicio               | [oci_service_connector_hub][46]                                                                                                          |
| Gateway de servicio                     | [oci_service_gateway][47]                                                                                                                |
| [VCN][48]                           | [oci_vcn][49]                                                                                                                            |
| [VPN][50]                           | [oci_vpn][51]                                                                                                                            |
| Firewall de aplicaciones web            | [oci_waf][52]                                                                                                                            |

### Recopilación de logs

Envía logs desde tu infraestructura en la nube de Oracle a Datadog siguiendo alguno de estos procesos:

{{< tabs >}}
{{% tab "Hub de conectores de servicio" %}}

1. Configura un log de OCI.
2. Crea una función de OCI.
3. Configura un conector de servicio de OCI.

Las siguientes instrucciones utilizan el portal de OCI para configurar la integración.

#### Registro de OCI

1. En el portal de OCI, navega hasta *Logging -> Log Groups* (Registro > Grupos de logs).
2. Selecciona tu compartimento y haz clic en **Create Log Group**. Se abre un panel lateral.
3. Introduce `data_log_group` para el nombre y, opcionalmente, proporciona una descripción y etiquetas (tags).
4. Haz clic en **Create** (Crear) para configurar tu nuevo grupo de logs.
5. En **Resources** (Recursos), haz clic en **Logs**.
6. Haz clic en **Create custom log** (Crear log personalizado) o **Enable service log** (Habilitar log de servicio) según lo desees.
7. Haz clic en **Enable Log** (Habilitar log), para crear tu nuevo log de OCI.

Para más información sobre logs de OCI, consulta [Activación del registro para un recurso][1].

#### Función de OCI

1. En el portal de OCI, ve a *Functions** (Funciones).
2. Selecciona una aplicación existente o haz clic en **Create Application** (Crear aplicación).
3. Crea una nueva función de OCI dentro de tu aplicación. Consulta [Información general de funciones de Oracle][2] para obtener más detalles.
4. Es recomendado para crear una función boilerplate de Python primero y reemplazar los archivos autogenerados con el código fuente de Datadog:
   - Sustituye `func.py` por código del [repositorio de Datadog OCI][3].
   - Sustituye `func.yaml` por el código del [repositorio de Datadog OCI][4]. `DATADOG_TOKEN` y `DATADOG_HOST` deben sustituirse por tu clave de API de Datadog y el enlace de entrada de logs de la región.
   - Sustituye `requirements.txt` por código del [repositorio de Datadog OCI][5].

#### Hub de conectores de servicio de OCI

1. En el portal de OCI, navega hasta *Logging -> Service Connectors* (Registro > Conectores de servicio).
2. Haz clic en **Create Service Connector** (Crear conector de servicio) para ser redireccionado a la página **Create Service Connector** (Crear conector de servicio).
3. Selecciona **Source** (Origen) como Logging (Registro) y **Target** (Destino) como Functions (Funciones).
4. En **Configure Source Connection** (Configurar conexión de origen) selecciona **Compartment name** (Nombre de compartimento), **Log Group** (Grupo de logs) y **Log**. (El **Log Group** (Grupo de logs) y **Log** creados en el primer paso).
5. Si también deseas enviar **Audit Logs** (Logs de auditoría), haz clic en **+Another Log** (+ otro log) y selecciona el mismo **Compartment** (Compartimento) y reemplaza "_Audit" (_Auditoría) como tu **Log Group** (Grupo de logs).
6. En **Configure target** (Configurar destino) selecciona **Compartment** (Compartimento), **Function application** (Aplicación de función) y **Function** (Función). (La **Function Application** (Aplicación de función) y **Function** (Función) creadas en el paso anterior.
7. Si se te pide que crees una política, haz clic en **Create** (Crear) en la pantalla.
8. Haz clic en **Create** (Crear) en la parte inferior para terminar de crear tu conector de servicio.

Para obtener más información sobre OCI Object Storage, consulta [la entrada del blog sobre el conector de servicio de Oracle][6].

[1]: https://docs.oracle.com/iaas/Content/Logging/Task/enabling_logging.htm
[2]: https://docs.cloud.oracle.com/iaas/Content/Functions/Concepts/functionsoverview.htm
[3]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.py
[4]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.yaml
[5]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/requirements.txt
[6]: https://blogs.oracle.com/cloud-infrastructure/oracle-cloud-infrastructure-service-connector-hub-now-generally-available
{{% /tab %}}
{{% tab "Almacén de objectos" %}}

1. Configura un log de OCI.
2. Crea un almacén de objetos de OCI y habilita el acceso de lectura/escritura para logs de OCI.
3. Crea una función de OCI.
4. Configura un evento de OCI.

Las siguientes instrucciones utilizan el portal de OCI para configurar la integración.

#### Registro de OCI

1. En el portal de OCI, ve a *Solutions and Platform -> Logging -> Logs* (Soluciones y plataforma -> Registro -> Logs).
2. Haz clic en **Create Custom Log** (Crear log personalizado) para pasar a la página **Create Custom Log** (Crear log personalizado).
3. Dale un nombre a tu nuevo log de OCI.
4. Selecciona un **Compartment** (Compartimento) y un **Log Group** (Grupo de logs). Estas selecciones se mantienen en toda la instalación.
5. Haz clic en **Create Custom Log** (Crear log personalizado) para acceder a la página **Create Agent Config** (Crear configuración del Agent).
6. Haz clic en **Create new configuration** (Crear nueva configuración).
7. Dale un nombre a tu nueva configuración. Tu compartimento está preseleccionado para ti.
8. Establece el tipo de grupo en **Dynamic Group** (Grupo dinámico) y agrupa a uno de tus grupos existentes.
9. Establece el tipo de entrada en **Log Path** (Ruta de log), introduce el nombre de entrada que prefieras y utiliza "/" para las rutas de los archivos.
10. Haz clic en **Create Custom Log** (Crear log personalizado), entonces tu log de OCI se creará y estará disponible en la página de logs.

Para más información sobre logs de OCI, consulta [Activación del registro para un recurso][1].

#### OCI object storage

1. En el portal de OCI, ve a *Core Infrastructure -> Object Storage -> Object Storage* (Infraestructura central > Object Storage > Object Storage).
2. Haz clic en **Create Bucket** (Crear bucket) para acceder al formulario **Create bucket** (Crear bucket).
3. Selecciona **Standard** (Estándar) para tu nivel de almacenamiento y marca **Emit Object Events** (Emitir eventos de objeto).
4. Rellena el resto del formulario según tus preferencias.
5. Haz clic en **Create Bucket** (Crear bucket), tu bucket se creará y estará disponible en la lista de buckets.
6. Selecciona tu nuevo bucket en la lista de buckets activos y haz clic en **Logs** en recursos.
7. Activa **read** (leer), lo que te lleva al menú lateral **Enable Log** (Habilitar log).
8. Selecciona un **Compartment** (Compartimento) y un **Log Group** (Grupo de logs) (utiliza las mismas selecciones que en tu log de OCI).
9. Introduce un nombre para el **Log Name** (Nombre de log) y selecciona tu retención de log preferida.

Para más información sobre OCI Object Storage, consulta [Poner datos en Object Storage][2].

#### Función de OCI

1. En el portal de OCI, ve a *Solutions and Platform -> Developer Services -> Functions* (Soluciones y plataforma > Servicios de desarrollador > Funciones).
2. Selecciona una aplicación existente o haz clic en **Create Application** (Crear aplicación).
3. Crea una nueva función de OCI dentro de tu aplicación. Para más detalles, consulta [Información general de funciones de Oracle][3].
4. Es recomendado para crear una función boilerplate de Python primero y reemplazar los archivos autogenerados con el código fuente de Datadog:
   - Sustituye `func.py` por código del [repositorio de Datadog OCI][4].
   - Sustituye `func.yaml` por el código del [repositorio de Datadog OCI][5]. `DATADOG_TOKEN` y `DATADOG_HOST` deben sustituirse por tu clave de API de Datadog y el enlace de entrada de logs de la región.
   - Sustituye `requirements.txt` por código del [repositorio de Datadog OCI][6].

#### Evento de OCI

1. En el portal de OCI, ve a *Solutions and Platform -> Application Integration -> Event Service* (Soluciones y plataforma > Integración de aplicaciones > Servicio de eventos).
2. Haz clic en **Create Rule** (Crear regla) para acceder a la página **Create Rule** (Crear regla).
3. Asigna un nombre y una descripción a tu regla de evento.
4. Establece tu condición como **Event Type** (Tipo de evento), el nombre de servicio como **Object Storage** y el tipo de evento como **Object - Create** (Objeto: crear).
5. Establece tu tipo de acción como **Functions** (Funciones).
6. Asegúrate de que tu compartimento de función sea la misma selección que hiciste para Log de OCI, Bucket de OCI y Función de OCI.
7. Selecciona tu aplicación de función y función (según el paso de instalación anterior).
8. Haz clic en **Create Rule** (Crear regla), tu regla se creará y estará disponible en la lista de reglas.

Para más información sobre OCI Object Storage, consulta [Empezando con eventos][7].

[1]: https://docs.oracle.com/iaas/Content/Logging/Task/enabling_logging.htm
[2]: https://docs.cloud.oracle.com/iaas/Content/GSG/Tasks/addingbuckets.htm
[3]: https://docs.cloud.oracle.com/iaas/Content/Functions/Concepts/functionsoverview.htm
[4]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.py
[5]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.yaml
[6]: https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/requirements.txt
[7]: https://docs.cloud.oracle.com/iaas/Content/Events/Concepts/eventsgetstarted.htm
{{% /tab %}}
{{< /tabs >}}

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oracle-cloud-infrastructure" >}}


### Checks de servicio

La integración de OCI no incluye ningún check de servicio.

### Eventos

La integración de OCI no incluye ningún evento.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][53].

## Para leer más

Más enlaces, artículos y documentación útiles:

- [Monitorizar Oracle Cloud Infrastructure con Datadog][54]


[1]: https://app.datadoghq.com/integrations/oracle-cloud-infrastructure
[2]: https://cloud.oracle.com/tenancy
[3]: https://docs.oracle.com/iaas/Content/General/Concepts/regions.htm
[4]: https://docs.oracle.com/en/cloud/paas/weblogic-container/user/create-dynamic-groups-and-policies.html
[5]: images/add_api_key.png
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://docs.oracle.com/iaas/Content/Registry/Tasks/registrygettingauthtoken.htm
[8]: https://docs.oracle.com/en-us/iaas/Content/Registry/Concepts/registrypolicyrepoaccess.htm#Policies_to_Control_Repository_Access
[9]: https://docs.oracle.com/iaas/Content/Functions/Tasks/functionslogintoocir.htm
[10]: https://docs.oracle.com/iaas/Content/Security/Reference/resourcemanager_security.htm#confidentiality__terraform-state
[11]: https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview
[12]: https://app.datadoghq.com/metric/explorer
[13]: https://cloud.oracle.com/connector-hub/service-connectors
[14]: images/OCI_metrics_integration_diagram.png
[15]: https://docs.oracle.com/iaas/Content/connector-hub/home.htm
[16]: https://docs.oracle.com/iaas/Content/Functions/Concepts/functionsconcepts.htm#applications
[17]: images/OCI_auth_workflow_diagram.png
[18]: https://app.datadoghq.com/integrations/oci-autonomous-database
[19]: https://docs.oracle.com/iaas/autonomous-database-serverless/doc/autonomous-monitor-metrics-list.html
[20]: https://docs.oracle.com/iaas/Content/Block/References/volumemetrics.htm
[21]: https://app.datadoghq.com/integrations/oci-compute
[22]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#Availabl
[23]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_compute_rdma_network
[24]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute
[25]: https://docs.oracle.com/iaas/Content/Compute/References/infrastructurehealthmetrics.htm
[26]: https://app.datadoghq.com/integrations/oci-container-instances
[27]: https://docs.oracle.com/iaas/Content/container-instances/container-instance-metrics.htm
[28]: https://app.datadoghq.com/integrations/oci-database
[29]: https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-57B7B9B1-288B-4DCB-82AE-D53B2BD9C78F
[30]: https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-A42CF0E3-EE65-4A66-B8A3-C89B62AFE489
[31]: https://docs.oracle.com/iaas/Content/Network/Reference/drgmetrics.htm
[32]: https://docs.oracle.com/iaas/Content/Network/Reference/fastconnectmetrics.htm
[33]: https://docs.oracle.com/iaas/Content/File/Reference/filemetrics.htm
[34]: https://app.datadoghq.com/integrations/oci-functions
[35]: https://docs.oracle.com/iaas/Content/Functions/Reference/functionsmetrics.htm
[36]: https://app.datadoghq.com/integrations/oci-mysql-database
[37]: https://docs.oracle.com/iaas/mysql-database/doc/metrics.html
[38]: https://docs.oracle.com/iaas/Content/ContEng/Reference/contengmetrics.htm
[39]: https://app.datadoghq.com/integrations/oci-load-balancer
[40]: https://docs.oracle.com/iaas/Content/Balance/Reference/loadbalancermetrics.htm
[41]: https://docs.oracle.com/iaas/Content/NetworkLoadBalancer/Metrics/metrics.htm
[42]: https://app.datadoghq.com/integrations/oci-nat-gateway
[43]: https://docs.oracle.com/iaas/Content/Network/Reference/nat-gateway-metrics.htm
[44]: https://docs.oracle.com/iaas/Content/Object/Reference/objectstoragemetrics.htm
[45]: https://docs.oracle.com/iaas/Content/queue/metrics.htm
[46]: https://docs.oracle.com/iaas/Content/connector-hub/metrics-reference.htm
[47]: https://docs.oracle.com/iaas/Content/Network/Reference/SGWmetrics.htm
[48]: https://app.datadoghq.com/integrations/oci-vcn
[49]: https://docs.oracle.com/iaas/Content/Network/Reference/vnicmetrics.htm
[50]: https://app.datadoghq.com/integrations/oci-vpn
[51]: https://docs.oracle.com/iaas/Content/Network/Reference/ipsecmetrics.htm
[52]: https://docs.oracle.com/iaas/Content/WAF/Reference/metricsalarms.htm
[53]: https://docs.datadoghq.com/es/help/
[54]: https://www.datadoghq.com/blog/monitor-oci-with-datadog/