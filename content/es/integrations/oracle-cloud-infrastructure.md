---
aliases:
- /es/integrations/oracle_cloud_infrastructure
app_id: oracle-cloud-infrastructure
categories:
- nube
- recopilación de logs
- red
- oracle
custom_kind: integración
description: OCI es una colección de servicios en la nube diseñada para dar soporte
  a una serie de aplicaciones en un entorno alojado.
further_reading:
- link: https://www.datadoghq.com/blog/monitor (noun)-oci-con-datadog/
  tag: blog
  text: Monitorizar Oracle Cloud Infrastructure con Datadog
- link: https://www.datadoghq.com/blog/datadog-oci-quickstart/
  tag: blog
  text: Acelerar la monitorización de Oracle Cloud Infrastructure con Datadog OCI
    QuickStart
integration_version: 1.1.0
media: []
title: Oracle Cloud Infrastructure
---
{{% site-region region="gov" %}}

<div class="alert alert-warning">La integración de Oracle Cloud Infrastructure no es compatible con el <a href="/getting_started/site">sitio de Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>

{{% /site-region %}}

{{< jqmath-vanilla >}}

## Información general

Oracle Cloud Infrastructure (OCI) es una infraestructura como servicio (IaaS) y plataforma como servicio (PaaS) utilizada por empresas de gran escala. Incluye un conjunto completo de más de 30 servicios gestionados de alojamiento, almacenamiento, redes, bases de datos y mucho más.

Utiliza la integración de OCI de Datadog para obtener una visibilidad completa de tu entorno de OCI a través de métricas, logs y datos de recursos. Estos datos te permiten crear dashboards, te ayudan a solucionar problemas y pueden monitorizarse para asegurar la seguridad y el cumplimiento de la normativa.

## Configuración

### Recopilación de métricas

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

<div class="alert alert-info"> 
OCI QuickStart está en vista previa. Utiliza <a href="https://docs.google.com/forms/d/1nx4ALq7iwnc2afuRaPNFNzYqGHM6UNJtj-jsVuoybBw/preview?edit_requested=true">este formulario</a> para enviar tu solicitud hoy mismo.
</div>

OCI QuickStart de Datadog es una experiencia de configuración totalmente gestionada y de flujo único que te ayuda a monitorizar tu infraestructura y aplicaciones de OCI en tan solo unos clics. OCI QuickStart crea la infraestructura necesaria para reenviar métricas, logs y datos de recursos a Datadog, y detecta automáticamente nuevos recursos o compartimentos de OCI para la recopilación de datos.

**Notas**:

- Por defecto solo se envían métricas. Habilita la recopilación de logs y la recopilación de datos de recursos desde el [cuadro de integración de Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) después de completar esta configuración.
- Se admiten todas las regiones comerciales de OCI que existían el 15 de julio de 2025. Las regiones de OCI añadidas después de esta fecha no son compatibles actualmente.

Para configurar la infraestructura de reenvío de métricas y logs a Datadog:

- [Configura el ícono de integración OCI de Datadog](#datadog-oci-integration-tile)
- [Despliega el stack tecnológico QuickStart](#orm-stack)
- [Completa la configuración en Datadog](#complete-the-setup-in-datadog)
- [Valida las métricas que fluyen](#validation)
- [Configura la recopilación de métricas (opcional)](#configuration)
- [Configura la recopilación de logs (opcional)](#log-collection)

La integración requiere el uso de Oracle Service Connector Hubs para reenviar datos a Datadog. Se recomienda [solicitar un aumento del límite de servicio](https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#Requesti) antes de completar la configuración. El número aproximado de Service Connector Hubs que necesitas es:

$$\\text"Service Connector Hubs" = \\text"Número de compartimentos en tenencia" / \\text"5"$$

{{% collapse-content title="Requisitos previos para esta configuración" level="h4" %}}

- Tu cuenta de usuario OCI necesita el rol de **Administrador de la nube** para completar estos pasos
- Debes iniciar sesión en OCI en la tenencia con la que deseas integrarte
- Debes iniciar sesión en OCI con la Región de origen seleccionada en la parte superior derecha de la pantalla
- Tu cuenta de usuario OCI debe estar en el <a href="https://docs.oracle.com/iaas/Content/Identity/domains/the_default_domain.htm" target="_blank">Dominio de identidad predeterminado</a>
- Tu cuenta de usuario de OCI debe poder crear un usuario, un grupo de usuarios y un grupo dinámico en el dominio de identidad predeterminado.
- Tu cuenta de usuario OCI debe poder crear políticas en el compartimento raíz

{{% /collapse-content %}}

#### Ícono de integración de OCI de Datadog

1. Ve al [cuadro de integración de Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) y haz clic en **Add New Tenancy** (Añadir nueva tenencia).
1. Selecciona o crea una clave de la API Datadog para utilizarla para la integración.
1. Crea una clave de la aplicación Datadog.
1. Haz clic en **Crear stack tecnológico de OCI**. Esto te llevará a un stack tecnológico de Oracle Resource Manager (ORM) para finalizar el despliegue.<br />
   **Nota**: Despliega este stack tecnológico sólo una vez por tenencia.

#### Stack tecnológico de ORM

1. Acepta las Condiciones de uso de Oracle.
1. Deja sin marcar la opción de utilizar proveedores personalizados de Terraform.
1. Utiliza el directorio de trabajo predeterminado para desplegar el stack tecnológico u, opcionalmente, elige uno diferente. 
1. Haz clic en **Siguiente** y **Siguiente** de nuevo.<br />
1. Haz clic en **Create** (Crear) y espera hasta 15 minutos a que se complete el despliegue. 

#### Completar la configuración en Datadog

Vuelve al [cuadro de integración de Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) y haz clic en **Ready!** (¡Listo!).

#### Validación

Consulta las métricas de `oci.*` en el [dashboard de información general de integración de OCI](https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview) o la [página del Metrics Explorer](https://app.datadoghq.com/metric/explorer) en Datadog.

<div class="alert alert-warning">Las métricas de la función de OCI (espacio de nombres <code>oci.faas</code>) y las métricas de la instancia del contenedor (espacio de nombres <code>oci_computecontainerinstance</code>) se encuentran en versión preliminar.</div>

#### Configuración

![La pestaña de configuración de una tenencia de OCI en Datadog](images/oci_configuration_tab.png)

Una vez completada la configuración, aparecerá una pestaña de configuración para la tenencia en la parte izquierda del [cuadro de integración de Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure). Aplica las configuraciones de recopilación de datos para toda la tenencia, tal y como se indica en las secciones siguientes.

##### Añadir regiones

En la pestaña **General**, selecciona las regiones para la recopilación de datos en la lista de casillas de verificación **Regiones**. Las selecciones de regiones se aplican a toda la tenencia, tanto para las métricas como para logs.

**Nota**: Si has utilizado el método de configuración QuickStart y después te has suscrito a una nueva región OCI, vuelve a aplicar el stack tecnológico de configuración inicial en ORM. La nueva región estará entonces disponible en el ícono de OCI de Datadog.

##### Recopilación de métricas y logs 

Utiliza las pestañas **Recopilación de métricas** y **Recopilación de logs** para configurar qué métricas y logs se envían a Datadog:

- **Activar** o **desactivar** la recopilación de métricas o logs para toda la tenencia.
- **Incluir** o **excluir** compartimentos específicos basándose en las etiquetas (tags) de compartimentos del formato `key:value`. Por ejemplo:
  - `datadog:monitored,env:prod*` incluye compartimentos si **alguna** de estas etiquetas (tags) está presente
  - `!env:staging,!testing` excluye los compartimentos solo si **ambas** etiquetas están presentes
  - `datadog:monitored,!region:us-phoenix-1` incluye los compartimentos que tienen la etiqueta (tag) `datadog:monitored` y los que no tienen la etiqueta (tag) `region:us-phoenix-1`
- **Activar** o **desactivar** la recopilación para servicios OCI específicos.

**Notas**:

- Tras modificar las etiquetas (tags) en OCI, los cambios pueden tardar hasta 15 minutos en aparecer en Datadog
- En OCI, las etiquetas (tags) no son heredadas por los compartimentos secundarios; cada compartimento se debe etiquetar individualmente.

### Recopilación de recursos

En la pestaña **Resource Collection** (Recopilación de recursos) del [cuadro de integración de Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure), haz clic en el conmutador **Enable Resource Collection** (Habilitar la recopilación de recursos). Los recursos son visibles en el [Datadog Resource Catalog](https://docs.datadoghq.com/infrastructure/resource_catalog/).

{{% /tab %}}

{{% tab "Manual setup" %}}

Para reenviar tus métricas de OCI a Datadog:

- [Ingresa la información de la tenencia](#enter-tenancy-info).
- [Despliega el stack tecnológico de políticas OCI (#create-oci-policy-stack) en la región de origen de tu tenencia para crear un usuario, grupo y políticas de sólo lectura en Datadog.
- [Introduce DatadogROAuthUser info](#enter-datadogroauthuser-info) en Datadog
- [Despliega un stack tecnológico de reenvío de métricas OCI (#create-oci-metric-forwarding-stack) para cada región de tenencia desde la que desees reenviar métricas.
- [Completa la configuración en Datadog](#complete-the-setup-in-datadog)
- [Valida las métricas que fluyen](#validation)
- [Configura la recopilación de métricas (opcional)](#configuration)
- [Configura la recopilación de logs (opcional)](#log-collection)

Para ver una representación visual de esta arquitectura, consulta la sección [Arquitectura](#architecture).

#### Ingresar la información de la tenencia

{{% collapse-content title="Requisitos para esta sección" level="h5" %}}

- Tu cuenta de usuario OCI necesita el rol de **Administrador de la nube** para completar estos pasos
- OCID de la tenencia
- Región de origen

{{% /collapse-content %}}

Introduce el OCID y la región de origen de la tenencia que deseas monitorizar en el [cuadro de integración de Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure).

- Encontrarás esta información en la [página de Detalles de tenencia](https://cloud.oracle.com/tenancy).
- Introduce la región de origen utilizando el valor **Region Identifier** (Identificador de región) de la [página Regiones y dominios de disponibilidad](https://docs.oracle.com/iaas/Content/General/Concepts/regions.htm) de OCI.

#### Crear un stack tecnológico de políticas de OCI

{{% collapse-content title="Requisitos para esta sección" level="h5" %}}

- Tu cuenta de usuario de OCI debe ser capaz de [crear grupos y políticas dinámicas](https://docs.oracle.com/en/cloud/paas/weblogic-container/user/create-dynamic-groups-and-policies.html) en el dominio predeterminado.
- Debes estar en la región de origen de la tenencia

{{% /collapse-content %}}

<div class="alert alert-warning">Asegúrate de que la <strong>región de origen</strong> de la tenencia esté seleccionada en la parte superior derecha de la pantalla.</div>

Este stack tecnológico de políticas de Oracle Resource Manager (ORM) sólo debe desplegarse una vez por tenencia.

1. Haz clic en el botón **Create Policy Stack** (Crear un stack tecnológico de políticas) en el cuadro de integración de Datadog y OCI.
1. Acepta las Condiciones de uso de Oracle.
1. Deja la opción de utilizar proveedores de Terraform personalizados **sin marcar**.
1. Utiliza el nombre y el compartimento predeterminados para el stack tecnológico. De manera opcional, indica tu propio nombre descriptivo o compartimento.
1. Haz clic en **Siguiente**.
1. Deja el campo de tenencia y el campo de usuario actual como están.
1. Haz clic en **Siguiente**.
1. Haz clic en **Create** (Crear).

#### Introduce DatadogROAuthUser info

{{% collapse-content title="Requisitos para esta sección" level="h5" %}}

- OCID del `DatadogROAuthUser`
- Clave de la API de OCI y valor de la huella digital

{{% /collapse-content %}}

1. En la barra de búsqueda de la consola OCI, busca `DatadogROAuthUser` y haz clic en el recurso de Usuario que aparece.
1. Copia el valor del OCID del usuario.
1. Pega el valor en el campo **User OCID** (OCID de usuario) del [cuadro de integración de Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure).
1. Al volver a la consola OCI, genera una clave de API con estos pasos:<br />
   a. En la esquina inferior izquierda de la pantalla, en **Recursos**, haz clic en **Claves de API**.<br />
   b. Haz clic en **Añadir clave de API**.<br />
   c. Haz clic en **Descargar clave privada**.<br />
   d. Haz clic en **Añadir**.<br />
   e. Aparece una ventana emergente **Configuration file preview** (Vista previa del archivo de configuración), pero no es necesario realizar ninguna acción; cierra la ventana emergente.

![La página Añadir clave de API en la consola de OCI](images/add_api_key.png)

5. Copia el valor de la huella dactilar y pégalo en el campo **Fingerprint** (Huella dactilar) del [cuadro de integración de Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure).
1. Copia el valor de la clave privada con estos pasos:
   a. Abre el archivo de clave privada `.pem` descargado en un editor de texto, o utiliza un comando de terminal como `cat` para mostrar el contenido del archivo.
   b. Copia todo el contenido, incluidos `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`.
1. Pega el valor de la clave privada en el campo **Private Key** (Clave privada) del cuadro de integración de Datadog y OCI.

#### Crea un stack tecnológico de reenvío de métricas de OCI

{{% collapse-content title="Requisitos para esta sección" level="h5" %}}

- Tu cuenta de usuario OCI debe poder crear recursos en el compartimento
- Valor de la [clave de API de Datadog](https://app.datadoghq.com/organization-settings/api-keys)
- Nombre de usuario y token de autenticación para un usuario con los permisos `REPOSITORY_READ` y `REPOSITORY_UPDATE` para extraer e insertar imágenes en un repositorio Docker 
  - Consulta [Obtener un token de autenticación](https://docs.oracle.com/iaas/Content/Registry/Tasks/registrygettingauthtoken.htm) para saber cómo crear un token de autenticación.
  - Consulta [Políticas para controlar el acceso a repositorios](https://docs.oracle.com/iaas/Content/Registry/Concepts/registrypolicyrepoaccess.htm#Policies_to_Control_Repository_Access) para obtener más información sobre las políticas necesarias.

**Nota**: Para comprobar que el inicio de sesión en el registro de Docker es correcto, consulta [Inicio de sesión en Oracle Cloud Infrastructure Registry](https://docs.oracle.com/iaas/Content/Functions/Tasks/functionslogintoocir.htm).

{{% /collapse-content %}}

El stack tecnológico de reenvío de métricas debe desplegarse para **cada combinación de tenencia y región** que se debe monitorizar. Para la configuración más sencilla, Datadog recomienda crear todos los recursos OCI necesarios con el stack tecnológico de Oracle Resource Manager (ORM) que se proporciona a continuación. Como alternativa, puedes utilizar tu infraestructura de red OCI existente.

Todos los recursos creados a partir del stack tecnológico de ORM de Datadog se despliegan en el compartimento especificado y para la región seleccionada actualmente en la parte superior derecha de la pantalla.

1. Haz clic en el botón **Create Metric Stack** (Crear un stack tecnológico de métricas) en el cuadro de integración de Datadog y OCI.
1. Acepta las Condiciones de uso de Oracle.
1. Deja sin marcar la opción **Custom providers** (Proveedores personalizados).
1. Asigna un nombre al stack tecnológico y selecciona el compartimento en el que se desplegará.
1. Haz clic en **Siguiente**.
1. En el campo **Datadog API Key** (Clave de API de Datadog), introduce el valor de tu [clave de API de Datadog](https://app.datadoghq.com/organization-settings/api-keys).
1. En la sección **Network options** (Opciones de red), deja marcada la opción `Create VCN`.

{{% collapse-content title="(Opcional) Utilizar el VCN existente en su lugar" level="h4" %}}

Si utilizas una Red de Nube Virtual (VCN) existente, debes proporcionar el OCID de la subred al stack tecnológico. Asegúrate de que la VCN:

- Tenga permiso para realizar llamadas de salida HTTP a través de la puerta de NAT
- Sea capaz de extraer imágenes del registro de contenedores OCI mediante la puerta de servicios.
- Tenga las reglas de tabla de rutas para permitir la puerta de NAT y la puerta de servicio
- Tenga las reglas de seguridad para enviar solicitudes HTTP

7. En la sección **Opciones de red**, deja sin marcar la opción `Create VCN` e introduce la información de tu VCN:<br />
   a. En el campo **Compartimento de VCN**, selecciona tu compartimento.<br />
   b. En la sección **VCN existente**, selecciona tu VCN existente.<br />
   c. En la sección **Function Subnet OCID** (OCID de subred de función), introduce el OCID de la subred que se va a utilizar.

{{% /collapse-content %}}

8. De manera opcional, en la sección **Metrics settings** (Parámetros de las métricas), elimina cualquier espacio de nombres de métrica de la recopilación.
1. En la sección **Metrics compartments** (Compartimentos de las métricas), ingresa una lista separada por comas de los OCID de compartimentos que se van a monitorizar. Los filtros de espacio de nombres de métrica seleccionados en el paso anterior se aplican a cada compartimento.
1. En la sección **Configuración de funciones**, selecciona `GENERIC_ARM`. Selecciona `GENERIC_X86` si realizas el despliegue en una región de Japón.
1. Haz clic en **Siguiente**.
1. Haz clic en **Create** (Crear).
1. Vuelve al [cuadro de integración de Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) y haz clic en **Create Configuration** (Crear configuración).

**Notas**:

- En forma predeterminada, sólo se selecciona el compartimento raíz y se activan todos los espacios de nombres de métricas del Paso 8 presentes en el compartimento (se admiten hasta 50 espacios de nombres por concentrador de conectores). Si eliges monitorizar compartimentos adicionales, los espacios de nombres añadidos a ellos son una intersección de los espacios de nombres seleccionados y los espacios de nombres presentes en el compartimento.
- Debes gestionar quién tiene acceso a los archivos de estado de Terraform de los stacks tecnológicos del gestor de recursos. Consulta la [sección Archivos de estado de Terraform](https://docs.oracle.com/iaas/Content/Security/Reference/resourcemanager_security.htm#confidentiality__terraform-state) de la página del Securing Resource Manager para obtener más información.

{{% /tab %}}

{{< /tabs >}}

{{% collapse-content title="Consulta la lista completa de espacios de nombres de métricas" level="h4" %}}

### Espacios de nombre de métricas

| Integración                         | Espacio de nombres de métricas                                                                                                                         |
|-------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------- |
| [API Gateway](https://docs.datadoghq.com/integrations/oci_api_gateway/)                  | [oci_apigateway](https://docs.oracle.com/iaas/Content/APIGateway/Reference/apigatewaymetrics.htm)                                                                                                                    |
| [Autonomous Database](https://docs.datadoghq.com/integrations/oci_autonomous_database/)           | [oci_autonomous_database](https://docs.oracle.com/iaas/autonomous-database-serverless/doc/autonomous-monitor-metrics-list.html)                                                                                                            |
| [Block Storage](https://docs.datadoghq.com/integrations/oci_block_storage/)                       | [oci_blockstore](https://docs.oracle.com/iaas/Content/Block/References/volumemetrics.htm)                                                                                                                     |
| [Compute](https://docs.datadoghq.com/integrations/oci_compute/)                       | [oci_computeagent](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#Availabl), [rdma_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_compute_rdma_network), [gpu_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute), [oci_compute_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/infrastructurehealthmetrics.htm)       |
| [Instancias de contenedor (vista previa)](https://docs.datadoghq.com/integrations/oci_container_instances/) | [oci_computecontainerinstance](https://docs.oracle.com/iaas/Content/container-instances/container-instance-metrics.htm)                                                                                                       |
| [Base de datos](https://docs.datadoghq.com/integrations/oci_database/)                      | [oci_database](https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-57B7B9B1-288B-4DCB-82AE-D53B2BD9C78F), [oci_database_cluster](https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-A42CF0E3-EE65-4A66-B8A3-C89B62AFE489)                                                                                           |
| [Dynamic Routing Gateway](https://docs.datadoghq.com/integrations/oci-dynamic-routing-gateway/)             | [oci_dynamic_routing_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/drgmetrics.htm)                                                                                                        |
| [E-Business Suite (EBS)](https://docs.datadoghq.com/integrations/oci_ebs/)             | [oracle_appmgmt](https://docs.oracle.com/iaas/stack-monitoring/doc/metric-reference.html#STMON-GUID-4E859CA3-1CAB-43FB-8DC7-0AA17E6B52EC)                                                                                                        |
| [FastConnect](https://docs.datadoghq.com/integrations/oci_fastconnect/)                         | [oci_fastconnect](https://docs.oracle.com/iaas/Content/Network/Reference/fastconnectmetrics.htm)                                                                                                                    |
| [File Storage](https://docs.datadoghq.com/integrations/oci_file_storage/)                        | [oci_filestorage](https://docs.oracle.com/iaas/Content/File/Reference/filemetrics.htm)                                                                                                                    |
| [Funciones (vista previa)](https://docs.datadoghq.com/integrations/oci_functions/)           | [oci_faas](https://docs.oracle.com/iaas/Content/Functions/Reference/functionsmetrics.htm)                                                                                                                           |
| [GoldenGate](https://docs.datadoghq.com/integrations/oci-goldengate/)           | [oci_goldengate](https://docs.oracle.com/en/cloud/paas/goldengate-service/ofroo/)                                                                                                                           |
| [GPU](https://docs.datadoghq.com/integrations/oci_gpu/)           | [gpu_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute)                                                                                                                           |
| [HeatWave MySQL](https://docs.datadoghq.com/integrations/oci_mysql_database/)                | [oci_mysql_database](https://docs.oracle.com/iaas/mysql-database/doc/metrics.html)                                                                                                                 |
| [Motor de Kubernetes](https://docs.datadoghq.com/integrations/oke/)                   | [oci_oke](https://docs.oracle.com/iaas/Content/ContEng/Reference/contengmetrics.htm)                                                                                                                            |
| [Equilibrador de carga](https://docs.datadoghq.com/integrations/oci_load_balancer/)                 | [oci_lbaas](https://docs.oracle.com/iaas/Content/Balance/Reference/loadbalancermetrics.htm), [oci_nlb](https://docs.oracle.com/iaas/Content/NetworkLoadBalancer/Metrics/metrics.htm)                                                                                                           |
| [Media Streams](https://docs.datadoghq.com/integrations/oci_media_streams/)                   | [oci_mediastreams](https://docs.oracle.com/iaas/Content/dms-mediastream/mediastreams_metrics.htm?)                                                                                                                    |
| [Gateway NAT](https://docs.datadoghq.com/integrations/oci_nat_gateway/)                   | [oci_nat_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/nat-gateway-metrics.htm)                                                                                                                    |
| [Network Firewall](https://docs.datadoghq.com/integrations/oci_network_firewall/)                   | [oci_network_firewall](https://docs.oracle.com/iaas/Content/network-firewall/metrics.htm)                                                                                                                    |
| [Object Storage](https://docs.datadoghq.com/integrations/oci_object_storage/)                      | [oci_objectstorage](https://docs.oracle.com/iaas/Content/Object/Reference/objectstoragemetrics.htm)                                                                                                                  |
| [PostgreSQL](https://docs.datadoghq.com/integrations/oci_postgresql/)                   | [oci_postgresql](https://docs.oracle.com/iaas/Content/postgresql/metrics.htm)                                                                                                                    |
| [Cola](https://docs.datadoghq.com/integrations/oci_queue/)                               | [oci_queue](https://docs.oracle.com/iaas/Content/queue/metrics.htm)                                                                                                                          |
| [Service Connector Hub](https://docs.datadoghq.com/integrations/oci_service_connector_hub/)               | [oci_service_connector_hub](https://docs.oracle.com/iaas/Content/connector-hub/metrics-reference.htm)                                                                                                          |
| [Service Gateway](https://docs.datadoghq.com/integrations/oci_service_gateway/)                     | [oci_service_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/SGWmetrics.htm)                                                                                                                |
| [VCN](https://docs.datadoghq.com/integrations/oci_vcn/)                           | [oci_vcn](https://docs.oracle.com/iaas/Content/Network/Reference/vnicmetrics.htm)                                                                                                                            |
| [VPN](https://docs.datadoghq.com/integrations/oci_vpn/)                           | [oci_vpn](https://docs.oracle.com/iaas/Content/Network/Reference/ipsecmetrics.htm)                                                                                                                            |
| [Web Application Firewall](https://docs.datadoghq.com/integrations/oci_waf/)            | [oci_waf](https://docs.oracle.com/iaas/Content/WAF/Reference/metricsalarms.htm)

{{% /collapse-content %}}

### Recopilación de logs

Utiliza uno de los siguientes métodos para enviar tus logs de OCI a Datadog:

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

1. Sigue los pasos de la [sección de configuración](#setup) para crear la infraestructura necesaria para reenviar las métricas y los logs a Datadog. 
1. Haz clic en el conmutador **Enable Log Collection** (Habilitar recopilación de logs) de la pestaña **Log Collection** (Recopilación de logs) del [cuadro de integración de Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure).

{{% /tab %}}

{{% tab "Service Connector Hub" %}}

1. Configura un log de OCI.
1. Crea una función de OCI.
1. Configura un conector de servicio de OCI.

Las siguientes instrucciones utilizan el portal de OCI para configurar la integración.

#### Registro de OCI

1. En el portal de OCI, ve a *Logging -> Log Groups* (Registro > Grupos de logs).
1. Selecciona tu compartimento y haz clic en **Crear un grupo de logs**. Se abre un panel lateral.
1. Introduce `data_log_group` para el nombre y, opcionalmente, proporciona una descripción y etiquetas (tags).
1. Haz clic en **Create** (Crear) para configurar tu nuevo grupo de logs.
1. En **Resources** (Recursos), haz clic en **Logs**.
1. Haz clic en **Create custom log** (Crear log personalizado) o **Enable service log** (Habilitar log de servicio) según lo desees.
1. Haz clic en **Enable Log** (Habilitar log), para crear tu nuevo log de OCI.

Para obtener más información sobre los logs de OCI, consulta [Activación del registro de un recurso](https://docs.oracle.com/iaas/Content/Logging/Task/enabling_logging.htm).

#### Función de OCI

1. En el portal de OCI, ve a *Functions** (Funciones).
1. Selecciona una aplicación existente o haz clic en **Create Application** (Crear aplicación).
1. Crea una nueva función de OCI dentro de tu aplicación. Consulta [Información general de las funciones de Oracle](https://docs.cloud.oracle.com/iaas/Content/Functions/Concepts/functionsoverview.htm) para obtener más detalles.
1. Se recomienda crear primero una función boilerplate en Python y sustituir los archivos generados automáticamente por el código fuente de Datadog:
   - Sustituye `func.py` por código del [repositorio de Datadog OCI](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.py)
   - Sustituye `func.yaml` por el código del [repositorio de Datadog OCI](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/func.yaml). `DATADOG_TOKEN` y `DATADOG_HOST` deben sustituirse por tu clave de API de Datadog y el enlace de admisión de logs de región.
   - Sustituye `requirements.txt` por el código del [repositorio de Datadog OCI](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Service%20Connector%20%20Hub/requirements.txt)

#### Hub de conectores de servicio de OCI

1. En el portal de OCI, ve a *Logging -> Service Connectors* (Registro > Conectores de servicio).
1. Haz clic en **Create Service Connector** (Crear conector de servicio) para ser redireccionado a la página **Create Service Connector** (Crear conector de servicio).
1. Selecciona **Source** (Origen) como Logging (Registro) y **Target** (Destino) como Functions (Funciones).
1. En **Configure Source Connection** (Configurar conexión de origen) selecciona **Compartment name** (Nombre de compartimento), **Log Group** (Grupo de logs) y **Log**. (El **Log Group** (Grupo de logs) y **Log** creados en el primer paso).
1. Si también deseas enviar **Audit Logs** (Logs de auditoría), haz clic en **+Another Log** (+ otro log) y selecciona el mismo **Compartment** (Compartimento) y sustituye "\_Audit" (\_Auditoría") como tu **Log Group** (Grupo de logs).
1. En **Configure target** (Configurar destino) selecciona **Compartment** (Compartimento), **Function application** (Aplicación de función) y **Function** (Función). (La **Function Application** (Aplicación de función) y la **Function** (Función) creadas en el paso anterior.)
1. Si se te pide que crees una política, haz clic en **Create** (Crear) en la pantalla.
1. Haz clic en **Create** (Crear) en la parte inferior para terminar de crear tu conector de servicio.

Para obtener más información sobre OCI Object Storage, consulta la [publicación del blog de Service Connector de Oracle](https://blogs.oracle.com/cloud-infrastructure/oracle-cloud-infrastructure-service-connector-hub-now-generally-available).

{{% /tab %}}

{{% tab "Object store" %}}

1. Configura un log de OCI.
1. Crea un almacén de objetos de OCI y habilita el acceso de lectura/escritura para logs de OCI.
1. Crea una función de OCI.
1. Configura un evento de OCI.

Las siguientes instrucciones utilizan el portal de OCI para configurar la integración.

#### Registro de OCI

1. En el portal de OCI, ve a *Solutions and Platform -> Logging -> Logs* (Soluciones y plataforma -> Registro -> Logs).
1. Haz clic en **Create Custom Log** (Crear log personalizado) para pasar a la página **Create Custom Log** (Crear log personalizado).
1. Dale un nombre a tu nuevo log de OCI.
1. Selecciona un **Compartment** (Compartimento) y un **Log Group** (Grupo de logs). Estas selecciones se mantienen en toda la instalación.
1. Haz clic en **Create Custom Log** (Crear log personalizado) para acceder a la página **Create Agent Config** (Crear configuración del Agent).
1. Haz clic en **Create new configuration** (Crear nueva configuración).
1. Dale un nombre a tu nueva configuración. Tu compartimento está preseleccionado para ti.
1. Establece el tipo de grupo en **Dynamic Group** (Grupo dinámico) y agrupa a uno de tus grupos existentes.
1. Establece el tipo de entrada en **Log Path** (Ruta de log), introduce el nombre de entrada que prefieras y utiliza "/" para las rutas de los archivos.
1. Haz clic en **Create Custom Log** (Crear log personalizado), entonces tu log de OCI se creará y estará disponible en la página de logs.

Para obtener más información sobre los logs de OCI, consulta [Activación del registro de un recurso](https://docs.oracle.com/iaas/Content/Logging/Task/enabling_logging.htm).

#### Almacén de objetos de OCI

1. En el portal de OCI, ve a *Core Infrastructure -> Object Storage -> Object Storage* (Infraestructura central > Almacén de objetos > Almacén de objetos).
1. Haz clic en **Create Bucket** (Crear bucket) para acceder al formulario **Create bucket** (Crear bucket).
1. Selecciona **Standard** (Estándar) para tu nivel de almacenamiento y marca **Emit Object Events** (Emitir eventos de objeto).
1. Completa el resto del formulario según tus preferencias.
1. Haz clic en **Create Bucket** (Crear bucket), tu bucket se creará y estará disponible en la lista de buckets.
1. Selecciona tu nuevo bucket en la lista de buckets activos y haz clic en **Logs** en recursos.
1. Activa **leer**, lo que te dirige a un menú lateral **Habilitar log**.
1. Selecciona un **Compartment** (Compartimento) y un **Log Group** (Grupo de logs) (utiliza las mismas selecciones que en tu log de OCI).
1. Introduce un nombre para el **Log Name** (Nombre de log) y selecciona tu retención de log preferida.

Para obtener más información sobre OCI Object Storage, consulta [Poner datos en Object Storage](https://docs.cloud.oracle.com/iaas/Content/GSG/Tasks/addingbuckets.htm).

#### Función de OCI

1. En el portal de OCI, ve a *Solutions and Platform -> Developer Services -> Functions* (Soluciones y plataforma > Servicios de desarrollador > Funciones).
1. Selecciona una aplicación existente o haz clic en **Create Application** (Crear aplicación).
1. Crea una nueva función de OCI dentro de tu aplicación. Consulta [Información general de las funciones de Oracle](https://docs.cloud.oracle.com/iaas/Content/Functions/Concepts/functionsoverview.htm) para obtener detalles.
1. Se recomienda crear primero una función boilerplate en Python y sustituir los archivos generados automáticamente por el código fuente de Datadog:
   - Sustituye `func.py` por el código del [repositorio de Datadog OCI](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.py)
   - Sustituye `func.yaml` por el código del [repositorio de Datadog OCI](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/func.yaml). `DATADOG_TOKEN` y `DATADOG_HOST` deben sustituirse por tu clave de API de Datadog y el enlace de admisión de los logs de región.
   - Sustituye `requirements.txt` por el código del [repositorio de Datadog OCI](https://github.com/DataDog/Oracle_Logs_Integration/blob/master/Object%20Store/requirements.txt)

#### Evento de OCI

1. En el portal de OCI, ve a *Solutions and Platform -> Application Integration -> Event Service* (Soluciones y plataforma > Integración de aplicaciones > Servicio de eventos).
1. Haz clic en **Create Rule** (Crear regla) para acceder a la página **Create Rule** (Crear regla).
1. Asigna un nombre y una descripción a tu regla de evento.
1. Establece tu condición como **Tipo de evento**, el nombre de servicio como **Almacén de objetos** y el tipo de evento como **Objeto - Crear**.
1. Establece tu tipo de acción como **Functions** (Funciones).
1. Asegúrate de que tu compartimento de función sea la misma selección que hiciste para Log de OCI, Bucket de OCI y Función de OCI.
1. Selecciona tu aplicación y función (según el paso de instalación anterior).
1. Haz clic en **Create Rule** (Crear regla), tu regla se creará y estará disponible en la lista de reglas.

Para obtener más información sobre OCI Object Storage, consulta [Introducción a los eventos](https://docs.cloud.oracle.com/iaas/Content/Events/Concepts/eventsgetstarted.htm).

{{% /tab %}}

{{< /tabs >}}

## Arquitectura

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

### Recursos de reenvío de métricas y logs

![Diagrama de la métrica de OCI y de los recursos de reenvío de logs mencionados para esta opción de configuración y visualización del flujo de datos](images/oci_quickstart_infrastructure_diagram.png)

Para cada región monitorizada, esta opción de configuración crea la siguiente infraestructura dentro de esa región para reenviar métricas y logs a Datadog:

- Aplicación de funciones (`dd-function-app`)
- Dos funciones:
  - Reenvío de métricas (`dd-metrics-forwarder`)
  - Reenvío de logs (`dd-logs-forwarder`)
- VCN (`dd-vcn`) con infraestructura de red segura:
  - Subred privada (`dd-vcn-private-subnet`)
  - Puerta NAT (`dd-vcn-natgateway`) para acceso externo a Internet
  - Puerta de servicios (`dd-vcn-servicegateway`) para el acceso interno a los servicios OCI
- Vault del Servicio de Gestión de Claves (KMS) (`datadog-vault`) para almacenar la clave de la API Datadog 
- Compartimento dedicado **Datadog** (`Datadog`)

Todos los recursos están etiquetados con `ownedby = "datadog"`.

### Recursos de IAM

![Diagrama de los recursos de IAM de OCI mencionados para esta opción de configuración y visualización del flujo de datos](images/oci_quickstart_iam_diagram.png)

Esta opción de configuración crea los siguientes recursos IAM para habilitar el reenvío de datos a Datadog:

- Usuario del servicio (`dd-svc`)
- Grupo (`dd-svc-admin`) al que pertenece el usuario del servicio
- Par de claves RSA para la autenticación de la API
- Clave de la API OCI para el usuario del servicio
- Grupo dinámico (`dd-dynamic-group-connectorhubs`) que incluye todos los conectores de servicio del compartimento Datadog 
- Grupo dinámico (`dd-dynamic-group-function`) que incluye todas las funciones del compartimento de Datadog 
- Política (`dd-svc-policy`) para dar al usuario del servicio acceso de lectura a los recursos de la tenencia y acceso para gestionar OCI Service Connector Hubs y OCI Functions en el compartimento creado y gestionado por Datadog

{{% collapse-content title="Consultar la política" level="h6" %}}

```text
- Allow dd-svc-admin to read all-resources in tenancy
- Allow dd-svc-admin to manage serviceconnectors in Datadog compartment
- Allow dd-svc-admin to manage functions-family in Datadog compartment with specific permissions:
     * FN_FUNCTION_UPDATE
     * FN_FUNCTION_LIST
     * FN_APP_LIST
- Endorse dd-svc-admin to read objects in tenancy usage-report
```

{{% /collapse-content %}}

- Política `dd-dynamic-group-policy` para permitir que los conectores de servicio lean datos (logs y métricas) e interactúen con las funciones. Esta política también permite que las funciones lean secretos en el compartimento Datadog (la API Datadog y las claves de aplicaciones almacenadas en el vault de KMS).

{{% collapse-content title="Consultar la política" level="h6" %}}

```text
   - Allow dd-dynamic-group-connectorhubs to read log-content in tenancy
   - Allow dd-dynamic-group-connectorhubs to read metrics in tenancy
   - Allow dd-dynamic-group-connectorhubs to use fn-function in Datadog compartment
   - Allow dd-dynamic-group-connectorhubs to use fn-invocation in Datadog compartment
   - Allow dd-dynamic-group-functions to read secret-bundles in Datadog compartment
```

{{% /collapse-content %}}

{{% /tab %}}

{{% tab "Manual setup" %}}

### Recursos de reenvío de métricas

![Diagrama de los recursos de OCI mencionados para esta opción de configuración y visualización del flujo de datos](images/OCI_metrics_integration_diagram.png)

Esta opción de configuración crea un [centro de conectores] de OCI (https://docs.oracle.com/iaas/Content/connector-hub/home.htm), una [aplicación de función] (https://docs.oracle.com/iaas/Content/Functions/Concepts/functionsconcepts.htm#applications) y una infraestructura de red segura para enviar métricas de OCI a Datadog. El stack tecnológico de ORM para estos recursos crea un repositorio de contenedor de función para la región en la tenencia, y la imagen de Docker se transfiere a él para ser utilizada por la función.

### Recursos de IAM

![Diagrama de los recursos de OCI y el proceso utilizados para la autenticación de la integración](images/OCI_auth_workflow_diagram.png)

Esta opción de configuración crea:

- Grupo dinámico con `resource.type = 'serviceconnectors'`, para permitir el acceso al hub de conectores
- Usuario denominado **DatadogROAuthUser**, que Datadog utiliza para leer los recursos de la tenencia.
- Grupo al que se añade el usuario creado para el acceso a la política
- Usuario llamado **DatadogAuthWriteUser**, que se utiliza para insertar imágenes Docker para la función
- Grupo de acceso de escritura al que se añade `DatadogAuthWriteUser`, para insertar imágenes a través de la política de acceso
- Política en el compartimento raíz para permitir que los hubs de conectores lean métricas e invoquen funciones. Esta política también otorga al grupo de usuarios creado acceso de lectura tanto a los recursos de tenencia como al grupo de acceso de escritura, para insertar imágenes

{{% collapse-content title="Consultar la política" level="h6" %}}

```text
Allow dynamic-group Default/<GROUP_NAME> to read metrics in tenancy
Allow dynamic-group Default/<GROUP_NAME> to use fn-function in tenancy
Allow dynamic-group Default/<GROUP_NAME> to use fn-invocation in tenancy
Allow group Default/<USER_GROUP_NAME> to read all-resources in tenancy
Allow group Default/<WRITE_USER_GROUP_NAME> to manage repos in tenancy where ANY {request.permission = 'REPOSITORY_READ', request.permission = 'REPOSITORY_UPDATE', request.permission = 'REPOSITORY_CREATE'}
```

{{% /collapse-content %}}

{{% /tab %}}

{{< /tabs >}}

## Datos recopilados

<!-- ### Métricas -->

<!-- Consulta [metadata.csv][12] para obtener una lista de métricas de esta integración. -->

### Métricas

Para obtener una lista detallada de las métricas, selecciona el servicio de OCI apropiado en la sección [espacios de nombres de métricas](#metric-namespaces).

### Checks de servicio

La integración de OCI no incluye ningún check de servicio.

### Eventos

La integración de OCI no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorizar Oracle Cloud Infrastructure con Datadog](https://www.datadoghq.com/blog/monitor-oci-with-datadog/)
- [Acelerar la monitorización de Oracle Cloud Infrastructure con Datadog OCI QuickStart](https://www.datadoghq.com/blog/datadog-oci-quickstart/)