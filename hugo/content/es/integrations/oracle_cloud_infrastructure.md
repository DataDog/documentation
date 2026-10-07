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
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-oci-with-datadog/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/datadog-oci-quickstart/
  support: README.md#Support
  title: Oracle Cloud Infrastructure
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-internal-core -->
{{% site-region region="gov" %}}
<div class="alert alert-warning">La integración de Oracle Cloud Infrastructure no es compatible con el <a href="/getting_started/site">Datadog site</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

{{< jqmath-vanilla >}}

## Visión general

Oracle Cloud Infrastructure (OCI) es una infraestructura como servicio (IaaS) y plataforma como servicio (PaaS) utilizada por empresas de gran escala. Incluye un conjunto completo de más de 30 servicios gestionados de alojamiento, almacenamiento, redes, bases de datos, etc.

Utilice la integración OCI de Datadog para obtener una visibilidad completa de su entorno OCI a través de métricas, logy datos de recursos. Estos datos le permiten crear cuadros de mando, le ayudan a solucionar problemas y pueden supervisarse para garantizar la seguridad y el cumplimiento de las normativas.

## Configuración

### Recopilación de métricas

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

<div class="alert alert-info"> 
OCI QuickStart está en Vista previa. Utilice <a href="https://docs.google.com/forms/d/1nx4ALq7iwnc2afuRaPNFNzYqGHM6UNJtj-jsVuoybBw/preview?edit_requested=true">este formulario</a> para enviar su solicitud hoy mismo.
</div>

OCI QuickStart de Datadog es una experiencia de configuración totalmente gestionada y de flujo único que te ayuda a monitorizar tu infraestructura y aplicaciones OCI en tan sólo unos clics. OCI QuickStart crea la infraestructura necesaria para reenviar métricas, logs y datos de recursos a Datadog y descubre automáticamente nuevos recursos o compartimentos OCI para la recopilación de datos. 

**Nota**: En forma predeterminada sólo se envían métricas. Habilita la recopilación de logs y de datos de recursos desde el [ícono de integración de OCI de Datadog][1] después de completar esta configuración.

Para configurar la infraestructura de reenvío de métricas y logs a Datadog:
   - [Configura el ícono de integración OCI de Datadog](#datadog-oci-integration-tile)
   - [Despliega el stack tecnológico QuickStart](#orm-stack)
   - [Completa la configuración en Datadog](#complete-the-setup-in-datadog)
   - [Valida las métricas que fluyen](#validation)
   - [Configura la recopilación de métricas (opcional)](#configuration)
   - [Configura la recopilación de logs (opcional)](#log-collection)

La integración requiere el uso de Oracle Service Connector Hubs para reenviar datos a Datadog. Se recomienda [solicitar un aumento del límite del servicio][2] antes de completar la configuración. El número aproximado de Service Connector Hubs que necesitas es:

$$\\text"Service Connector Hubs" = \text"Número de compartimentos en tenencia" / \text"5"\$$

{{% collapse-content title="Requisitos previos para esta configuración" level="h4" %}}
- Tu cuenta de usuario OCI necesita el rol de **Administrador de la nube** para completar estos pasos
- Debes iniciar sesión en OCI en la tenencia con la que deseas integrarte
- Debes iniciar sesión en OCI con la Región de origen seleccionada en la parte superior derecha de la pantalla
- Tu cuenta de usuario OCI debe estar en el <a href="https://docs.oracle.com/iaas/Content/Identity/domains/the_default_domain.htm" target="_blank">Dominio de identidad predeterminado</a>
- Tu cuenta de usuario de OCI debe poder crear un usuario, un grupo de usuarios y un grupo dinámico en el dominio de identidad predeterminado.
- Tu cuenta de usuario OCI debe poder crear políticas en el compartimento raíz
{{% /collapse-content %}}

{{% collapse-content title="Regiones admitidas" level="h4" %}}
- us-ashburn-1
- ap-tokyo-1
- sa-saopaulo-1
- us-phoenix-1
- eu-frankfurt-1
- eu-stockholm-1
- ap-singapur-1
- us-sanjose-1
- ca-toronto-1
- sa-santiago-1
- uk-london-1
- eu-madrid-1
- me-jeddah-1
- us-chicago-1

Ponte en contacto a través de <a href="https://docs.google.com/forms/d/1nx4ALq7iwnc2afuRaPNFNzYqGHM6UNJtj-jsVuoybBw/preview?edit_requested=true">este formulario</a> para solicitar regiones adicionales.

{{% /collapse-content %}}

#### Ícono de integración de OCI de Datadog

1. Ve al [ícono de integración de OCI de Datadog][1] y haz clic en **Añadir nueva tenencia**.
2. Selecciona o crea una clave de la API Datadog para utilizarla para la integración.
3. Crea una clave de la aplicación Datadog.
4. Haz clic en **Crear stack tecnológico de OCI**. Esto te llevará a un stack tecnológico de Oracle Resource Manager (ORM) para finalizar el despliegue.<br />
   **Nota**: Despliega este stack tecnológico sólo una vez por tenencia.

#### Stack tecnológico de ORM

1. Acepta las Condiciones de uso de Oracle.
2. Deja sin marcar la opción de utilizar proveedores personalizados de Terraform.
3. Utiliza el directorio de trabajo predeterminado para desplegar el stack tecnológico u opcionalmente elige uno diferente. 
4. Haz clic en **Siguiente** y **Siguiente** de nuevo.<br />
5. Haz clic en **Crear** y espera hasta 15 minutos a que se complete el despliegue. 

[1]: https://app.datadoghq.com/integrations/oracle-cloud-infrastructure
[2]: https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#Requesti
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

Ingresa el OCID y la región de origen de la tenencia que deseas monitorizar en el [cuadro de integración de Datadog y OCI][1].
   - Puedes encontrar esta información en la [Página de detalles de tenencia][2].
   - Introduce la región de origen utilizando el valor **Region Identifier** (Identificador de región) de la [página Regiones y dominios de disponibilidad][3] de OCI.

#### Crear un stack tecnológico de políticas de OCI

{{% collapse-content title="Requisitos para esta sección" level="h5" %}}
- Tu cuenta de usuario OCI debe poder [crear grupos y políticas dinámicas][4] en el dominio predeterminado
- Debes estar en la región de origen de la tenencia
{{% /collapse-content %}}

<div class="alert alert-warning">Asegúrate de que la <strong>región de origen</strong> de la tenencia esté seleccionada en la parte superior derecha de la pantalla.</div>

Este stack tecnológico de políticas de Oracle Resource Manager (ORM) sólo debe desplegarse una vez por tenencia.

1. Haz clic en el botón **Create Policy Stack** (Crear un stack tecnológico de políticas) en el cuadro de integración de Datadog y OCI.
2. Acepta las Condiciones de uso de Oracle.
3. Deja la opción de utilizar proveedores de Terraform personalizados **sin marcar**.
4. Utiliza el nombre y el compartimento predeterminados para el stack tecnológico. De manera opcional, indica tu propio nombre descriptivo o compartimento.
5. Haz clic en **Siguiente**.
6. Deja el campo de tenencia y el campo de usuario actual como están.
7. Haz clic en **Siguiente**.
8. Haz clic en **Create** (Crear).

#### Introduce DatadogROAuthUser info

{{% collapse-content title="Requisitos para esta sección" level="h5" %}}
- OCID del `DatadogROAuthUser`
- Clave de la API de OCI y valor de la huella digital
{{% /collapse-content %}}

1. En la barra de búsqueda de la consola OCI, busca `DatadogROAuthUser` y haz clic en el recurso de Usuario que aparece.
2. Copia el valor del OCID del usuario.
3. Pega el valor en el campo **User OCID** (OCID del usuario) del [cuadro de integración de Datadog y OCI][1].
4. Al volver a la consola OCI, genera una clave de API con estos pasos:<br />
   a. En la esquina inferior izquierda de la pantalla, en **Recursos**, haz clic en **Claves de API**.<br />
   b. Haz clic en **Añadir clave de API**.<br />
   c. Haz clic en **Descargar clave privada**.<br />
   d. Haz clic en **Añadir**.<br />
   e. Aparece una ventana emergente **Configuration file preview** (Vista previa del archivo de configuración), pero no es necesario realizar ninguna acción; cierra la ventana emergente.

![La página Añadir clave de API en la consola de OCI][5]

5. Copia el valor de la huella digital y pégalo en el campo **Huella digital** del [cuadro de integración de Datadog y OCI][1].
6. Copia el valor de la clave privada con estos pasos:
   a. Abre el archivo de clave privada `.pem` descargado en un editor de texto, o utiliza un comando de terminal como `cat` para mostrar el contenido del archivo.
   b. Copia todo el contenido, incluidos `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`.
7. Pega el valor de la clave privada en el campo **Private Key** (Clave privada) del cuadro de integración de Datadog y OCI.

#### Crea un stack tecnológico de reenvío de métricas de OCI

{{% collapse-content title="Requisitos para esta sección" level="h5" %}}
- Tu cuenta de usuario OCI debe poder crear recursos en el compartimento
- Valor de la [clave de API de Datadog][6].
- Nombre de usuario y token de autenticación para un usuario con los permisos `REPOSITORY_READ` y `REPOSITORY_UPDATE` para extraer e insertar imágenes en un repositorio Docker 
    - Consulta [Cómo obtener un token de autenticación][7] para saber cómo crear un token de autenticación.
    - Consulta [Políticas para controlar el acceso a repositorios][8] para obtener más información sobre las políticas necesarias

**Nota**: Para comprobar que el inicio de sesión en el registro de Docker sea el correcto, consulta [Inicio de sesión en el registro de Oracle Cloud Infrastructure][9].
{{% /collapse-content %}}

El stack tecnológico de reenvío de métricas debe desplegarse para **cada combinación de tenencia y región** que se debe monitorizar. Para la configuración más sencilla, Datadog recomienda crear todos los recursos OCI necesarios con el stack tecnológico de Oracle Resource Manager (ORM) que se proporciona a continuación. Como alternativa, puedes utilizar tu infraestructura de red OCI existente.

Todos los recursos creados a partir del stack tecnológico de ORM de Datadog se despliegan en el compartimento especificado y para la región seleccionada actualmente en la parte superior derecha de la pantalla.

1. Haz clic en el botón **Create Metric Stack** (Crear un stack tecnológico de métricas) en el cuadro de integración de Datadog y OCI.
2. Acepta las Condiciones de uso de Oracle.
3. Deja sin marcar la opción **Custom providers** (Proveedores personalizados).
4. Asigna un nombre al stack tecnológico y selecciona el compartimento en el que se desplegará.
5. Haz clic en **Siguiente**.
6. En el campo **Datadog API Key** (Clave de API de Datadog), ingresa el valor de tu [clave de API de Datadog][6].
7. En la sección **Network options** (Opciones de red), deja marcada la opción `Create VCN`.
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
9. En la sección **Metrics compartments** (Compartimentos de las métricas), ingresa una lista separada por comas de los OCID de compartimentos que se van a monitorizar. Los filtros de espacio de nombres de métrica seleccionados en el paso anterior se aplican a cada compartimento.
10. En la sección **Configuración de funciones**, selecciona `GENERIC_ARM`. Selecciona `GENERIC_X86` si realizas el despliegue en una región de Japón.
11. Haz clic en **Siguiente**.
12. Haz clic en **Create** (Crear).
13. Vuelve a la página del [cuadro de integración de Datadog y OCI][1] y haz clic en **Create configuration** (Crear configuración).

**Notas**:
- En forma predeterminada, sólo se selecciona el compartimento raíz y se activan todos los espacios de nombres de métricas del Paso 8 presentes en el compartimento (se admiten hasta 50 espacios de nombres por concentrador de conectores). Si eliges monitorizar compartimentos adicionales, los espacios de nombres añadidos a ellos son una intersección de los espacios de nombres seleccionados y los espacios de nombres presentes en el compartimento.
- Debes gestionar quién tiene acceso a los archivos de estado de Terraform de los stacks tecnológicos del gestor de recursos. Consulta la [sección Archivos de estado de Terraform][10] de la página Obtener el gestor de recursos para obtener más información.

[1]: https://app.datadoghq.com/integrations/oracle-cloud-infrastructure
[2]: https://cloud.oracle.com/tenancy
[3]: https://docs.oracle.com/iaas/Content/General/Concepts/regions.htm
[4]: https://docs.oracle.com/en/cloud/paas/weblogic-container/user/create-dynamic-groups-and-policies.html
[5]: images/add_api_key.png
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://docs.oracle.com/iaas/Content/Registry/Tasks/registrygettingauthtoken.htm
[8]: https://docs.oracle.com/iaas/Content/Registry/Concepts/registrypolicyrepoaccess.htm#Policies_to_Control_Repository_Access
[9]: https://docs.oracle.com/iaas/Content/Functions/Tasks/functionslogintoocir.htm
[10]: https://docs.oracle.com/iaas/Content/Security/Reference/resourcemanager_security.htm#confidentiality__terraform-state
{{% /tab %}}

{{< /tabs >}}

#### Completar la configuración en Datadog

Vuelve al [ícono de integración de OCI de Datadog][1] y haz clic en **¡Listo!**.

#### Validación

Consulta las métricas de `oci.*` en el [dashboard de información general de integración de OCI][2] o la [página Metrics Explorer][3] en Datadog.

<div class="alert alert-warning">Las métricas de la función de OCI (espacio de nombres <code>oci.faas</code>) y las métricas de la instancia del contenedor (espacio de nombres <code>oci_computecontainerinstance</code>) se encuentran en versión preliminar.</div>

#### Configuración

![La pestaña de configuración de una tenencia de OCI en Datadog][4]!

Una vez completada la configuración, aparecerá una pestaña de configuración para la tenencia en la parte izquierda del [ícono de integración de OCI de Datadog][1]. Aplica las configuraciones de recopilación de datos de toda la tenencia como se indica en las secciones siguientes.

##### Añadir regiones

En la pestaña **General**, selecciona las regiones para la recopilación de datos en la lista de casillas de verificación **Regiones**. Las selecciones de regiones se aplican a toda la tenencia, tanto para las métricas como para logs.

**Nota**: Si has utilizado el método de configuración QuickStart y después te has suscrito a una nueva región OCI, vuelve a aplicar el stack tecnológico de configuración inicial en ORM. La nueva región estará entonces disponible en el ícono de OCI de Datadog.

##### Recopilación de métricas y logs 

Utiliza las pestañas **Recopilación de métricas** y **Recopilación de logs** para configurar qué métricas y logs se envían a Datadog:

- **Activar** o **desactivar** la recopilación de métricas o logs para toda la tenencia.
- **Incluir** o **excluir** compartimentos específicos basándose en las etiquetas (tags) de compartimentos del formato `key:value`. Por ejemplo:
   - `datadog:monitored,env:prod*` incluye compartimentos si **alguna** de estas etiquetas (tags) está presente
   - `!env:staging,!testing` excluye los compartimentos sólo si **ambas** etiquetas (tags) están presentes 
   - `datadog:monitored,!region:us-phoenix-1` incluye los compartimentos que tienen la etiqueta (tag) `datadog:monitored` y los que no tienen la etiqueta (tag) `region:us-phoenix-1`
- **Activar** o **desactivar** la recopilación para servicios OCI específicos.

**Notas**: 
- Tras modificar las etiquetas (tags) en OCI, los cambios pueden tardar hasta 15 minutos en aparecer en Datadog
- En OCI, las etiquetas (tags) no son heredadas por los compartimentos secundarios; cada compartimento se debe etiquetar individualmente.

{{% collapse-content title="Consulta la lista completa de espacios de nombres de métricas" level="h4" %}}
### Espacios de nombre de métricas

| Integración                         | Espacio de nombres de métricas                                                                                                                         |
|-------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------- |
| [Puerta de API][5]                  | [oci_apigateway][6]                                                                                                                    |
| [Base de datos autónoma][7]           | [base de datos_autónoma_oci][8]                                                                                                            |
| [Almacenamiento en bloque][9]                       | [oci_blockstore][10]                                                                                                                     |
| [Cómputo][11]                       | [oci_computeagent][12], [rdma_infraestructura_estado][13], [gpu_infraestructura_estado][14], [oci_cómputo_infraestructura_estado][15]       |
| [Instancias de contenedor (vista previa)][16] | [oci_computecontainerinstance][17]                                                                                                       |
| [Base de datos][18]                      | [oci_base de datos][19], [oci_base de datos_clúster][20]                                                                                           |
| Puerta de enrutamiento dinámico             | [oci_puerta_enrutamiento_dinámico][21]                                                                                                        |
| [E-Business Suite (EBS)][22]             | [oracle_appmgmt][23]                                                                                                        |
| [FastConnect][24]                         | [oci_fastconnect][25]                                                                                                                    |
| [Almacenamiento de archivos][26]                        | [oci_filestorage][27]                                                                                                                    |
| [Funciones (Vista previa)][28]           | [oci_faas][29]                                                                                                                           |
| [GPU][30]           | [gpu_infraestructura_estado][14]                                                                                                                           |
| [HeatWave MySQL][31]                | [oci_mysql_base de datos][32]                                                                                                                 |
| [Motor de Kubernetes][33]                   | [oci_oke][34]                                                                                                                            |
| [Equilibrador de carga][35]                 | [oci_lbaas][36], [oci_nlb][37]                                                                                                           |
| [Flujos de comunicación][38]                   | [oci_mediastreams][39]                                                                                                                    |
| [Puerta NAT][40]                   | [oci_nat_gateway][41]                                                                                                                    |
| [Cortafuegos de red][42]                   | [oci_red_cortafuegos][43]                                                                                                                    |
| [Almacenamiento de objetos][44]                      | [oci_objectstorage][45]                                                                                                                  |
| [PostgreSQL][46]                   | [oci_postgresql][47]                                                                                                                    |
| [Cola] [48]                               | [oci_cola][49]                                                                                                                          |
| [Service Connector Hub][50]               | [oci_service_connector_hub][51]                                                                                                          |
| [Puerta de servicios][52]                     | [oci_puerta_servicios][53]                                                                                                                |
| [VCN][54]                           | [oci_vcn][55]                                                                                                                            |
| [VPN][56]                           | [oci_vpn][57]                                                                                                                            |
| [Web Application Firewall][58]            | [oci_waf][59]
{{% /collapse-content %}}

### Recopilación de logs

Utiliza uno de los siguientes métodos para enviar tus logs de OCI a Datadog:

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

1. Sigue los pasos de la [sección de configuración](#setup) para crear la infraestructura necesaria para reenviar las métricas y los logs a Datadog. 
2. Haz clic en el conmutador **Habilitar Recopilación de logs** en la pestaña **Recopilación de logs** del [ícono de integración de OCI de Datadog][1].

[1]: https://app.datadoghq.com/integrations/oracle-cloud-infrastructure
{{% /tab %}}

{{% tab "Service Connector Hub" %}}

1. Configura un log de OCI.
2. Crea una función de OCI.
3. Configura un conector de servicio de OCI.

Las siguientes instrucciones utilizan el portal de OCI para configurar la integración.

#### Registro de OCI

1. En el portal de OCI, ve a *Logging -> Log Groups* (Registro > Grupos de logs).
2. Selecciona tu compartimento y haz clic en **Crear un grupo de logs**. Se abre un panel lateral.
3. Introduce `data_log_group` para el nombre y, opcionalmente, proporciona una descripción y etiquetas (tags).
4. Haz clic en **Create** (Crear) para configurar tu nuevo grupo de logs.
5. En **Resources** (Recursos), haz clic en **Logs**.
6. Haz clic en **Create custom log** (Crear log personalizado) o **Enable service log** (Habilitar log de servicio) según lo desees.
7. Haz clic en **Enable Log** (Habilitar log), para crear tu nuevo log de OCI.

Para obtener más información sobre logs de OCI, consulta [Activación del registro para un recurso][1].

#### Función de OCI

1. En el portal de OCI, ve a *Functions** (Funciones).
2. Selecciona una aplicación existente o haz clic en **Create Application** (Crear aplicación).
3. Crea una nueva función de OCI dentro de tu aplicación. Consulta [Información general de funciones de Oracle][2] para obtener más detalles.
4. Se recomienda crear primero una función boilerplate en Python y sustituir los archivos generados automáticamente por el código fuente de Datadog:
   - Sustituye `func.py` por el código del [repositorio de OCI de Datadog][3]
   - Sustituye `func.yaml` por el código del [repositorio de OCI de Datadog][4]. `DATADOG_TOKEN` y `DATADOG_HOST` deben sustituirse por tu clave API Datadog y el enlace de admisión de logs de la región
   - Sustituye `requirements.txt` por el código del [repositorio de OCI de Datadog][5]

#### Hub de conectores de servicio de OCI

1. En el portal de OCI, ve a *Logging -> Service Connectors* (Registro > Conectores de servicio).
2. Haz clic en **Create Service Connector** (Crear conector de servicio) para ser redireccionado a la página **Create Service Connector** (Crear conector de servicio).
3. Selecciona **Source** (Origen) como Logging (Registro) y **Target** (Destino) como Functions (Funciones).
4. En **Configure Source Connection** (Configurar conexión de origen) selecciona **Compartment name** (Nombre de compartimento), **Log Group** (Grupo de logs) y **Log**. (El **Log Group** (Grupo de logs) y **Log** creados en el primer paso).
5. Si también deseas enviar **Audit Logs** (Logs de auditoría), haz clic en **+Another Log** (+ otro log) y selecciona el mismo **Compartment** (Compartimento) y sustituye "_Auditoría" como tu **Log Group** (Grupo de logs).
6. En **Configure target** (Configurar destino) selecciona **Compartment** (Compartimento), **Function application** (Aplicación de función) y **Function** (Función). (La **Function Application** (Aplicación de función) y la **Function** (Función) creadas en el paso anterior.)
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

{{% tab "Object store" %}}

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

Para obtener más información sobre logs de OCI, consulta [Activación del registro para un recurso][1].

#### Almacén de objetos de OCI

1. En el portal de OCI, ve a *Core Infrastructure -> Object Storage -> Object Storage* (Infraestructura central > Almacén de objetos > Almacén de objetos).
2. Haz clic en **Create Bucket** (Crear bucket) para acceder al formulario **Create bucket** (Crear bucket).
3. Selecciona **Standard** (Estándar) para tu nivel de almacenamiento y marca **Emit Object Events** (Emitir eventos de objeto).
4. Completa el resto del formulario según tus preferencias.
5. Haz clic en **Create Bucket** (Crear bucket), tu bucket se creará y estará disponible en la lista de buckets.
6. Selecciona tu nuevo bucket en la lista de buckets activos y haz clic en **Logs** en recursos.
7. Activa **leer**, lo que te dirige a un menú lateral **Habilitar log**.
8. Selecciona un **Compartment** (Compartimento) y un **Log Group** (Grupo de logs) (utiliza las mismas selecciones que en tu log de OCI).
9. Introduce un nombre para el **Log Name** (Nombre de log) y selecciona tu retención de log preferida.

Para obtener más información sobre OCI Object Storage, consulta [Poner datos en Object Storage][2].

#### Función de OCI

1. En el portal de OCI, ve a *Solutions and Platform -> Developer Services -> Functions* (Soluciones y plataforma > Servicios de desarrollador > Funciones).
2. Selecciona una aplicación existente o haz clic en **Create Application** (Crear aplicación).
3. Crea una nueva función de OCI dentro de tu aplicación. Para más detalles, consulta [Información general de funciones de Oracle][3].
4. Se recomienda crear primero una función boilerplate en Python y sustituir los archivos generados automáticamente por el código fuente de Datadog:
   - Sustituye `func.py` por el código del [repositorio de OCI de Datadog][4]
   - Sustituye `func.yaml` por el código del [repositorio de OCI de Datadog][5]. `DATADOG_TOKEN` y `DATADOG_HOST` deben sustituirse por tu clave de API Datadog y el enlace de admisión de logs de la región
   - Sustituye `requirements.txt` por el código del [repositorio de OCI de Datadog][6]

#### Evento de OCI

1. En el portal de OCI, ve a *Solutions and Platform -> Application Integration -> Event Service* (Soluciones y plataforma > Integración de aplicaciones > Servicio de eventos).
2. Haz clic en **Create Rule** (Crear regla) para acceder a la página **Create Rule** (Crear regla).
3. Asigna un nombre y una descripción a tu regla de evento.
4. Establece tu condición como **Tipo de evento**, el nombre de servicio como **Almacén de objetos** y el tipo de evento como **Objeto - Crear**.
5. Establece tu tipo de acción como **Functions** (Funciones).
6. Asegúrate de que tu compartimento de función sea la misma selección que hiciste para Log de OCI, Bucket de OCI y Función de OCI.
7. Selecciona tu aplicación y función (según el paso de instalación anterior).
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

### Recopilación de recursos

En la pestaña **Recopilación de recursos** del [ícono de integración de OCI de Datadog][1], haz clic en el conmutador **Habilitar recopilación de recursos**. Los recursos son visibles en el [Catálogo de recursos de Datadog][60].

## Arquitectura

{{< tabs >}}

{{% tab "OCI QuickStart (Preview; recommended)" %}}

### Recursos de reenvío de métricas y logs

![Un diagrama de los recursos de reenvío de métricas y logs de OCI mencionados para esta opción de configuración y que muestra el flujo de datos][1].

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

![Un diagrama de los recursos OCI IAM mencionados para esta opción de configuración y que muestra el flujo de datos][2].

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
- Permitir que dd-svc-admin lea todos los recursos en tenencia
- Permitir que dd-svc-admin gestione conectores de servicios en el compartimento Datadog 
- Permitir que dd-svc-admin gestione una familia de funciones en el compartimento Datadog con permisos específicos:
     * FN_FUNCIÓN_ACTUALIZACIÓN
     * FN_FUNCIÓN_LISTA
     * FN_APLICACIONES_LISTA
- Autorizar a dd-svc-admin a leer objetos en el informe de uso de la tenencia
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

[1]: images/oci_quickstart_infrastructure_diagram.png
[2]: images/oci_quickstart_iam_diagram.png
{{% /tab %}}

{{% tab "Manual setup" %}}

### Recursos de reenvío de métricas

![Diagrama de los recursos OCI mencionados para esta opción de configuración y visualización del flujo de datos][1].

Esta opción de configuración crea un [hub de conectores][2] OCI, una [aplicación de función][3] y una infraestructura de red segura para reenviar métricas OCI a Datadog. El stack tecnológico de ORM para estos recursos crea un repositorio de contenedor de función para la región en la tenencia y la imagen Docker se envía a este para ser utilizada por la función.

### Recursos de IAM

![Diagrama de los recursos OCI y flujo de trabajo utilizados para la autenticación de la integración][4]

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

[1]: images/OCI_metrics_integration_diagram.png
[2]: https://docs.oracle.com/iaas/Content/connector-hub/home.htm
[3]: https://docs.oracle.com/iaas/Content/Functions/Concepts/functionsconcepts.htm#applications
[4]: images/OCI_auth_workflow_diagram.png
{{% /tab %}}

{{< /tabs >}}

## Datos recopilados

### Métricas

Consulta [metadata.csv][61] para obtener una lista de las métricas proporcionadas por esta integración.

### Checks de servicio

La integración de OCI no incluye ningún check de servicio.

### Eventos

La integración de OCI no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [Asistencia técnica de Datadog][62].

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitoriza Oracle Cloud Infrastructure con Datadog][63]
- [Acelerar la monitorización de Oracle Cloud Infrastructure con Datadog OCI QuickStart][64]


[1]: https://app.datadoghq.com/integrations/oracle-cloud-infrastructure
[2]: https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview
[3]: https://app.datadoghq.com/metric/explorer
[4]: images/oci_configuration_tab.png
[5]: https://docs.datadoghq.com/es/integrations/oci_api_gateway/
[6]: https://docs.oracle.com/iaas/Content/APIGateway/Reference/apigatewaymetrics.htm
[7]: https://docs.datadoghq.com/es/integrations/oci_autonomous_database/
[8]: https://docs.oracle.com/iaas/autonomous-database-serverless/doc/autonomous-monitor-metrics-list.html
[9]: https://docs.datadoghq.com/es/integrations/oci_block_storage/
[10]: https://docs.oracle.com/iaas/Content/Block/References/volumemetrics.htm
[11]: https://docs.datadoghq.com/es/integrations/oci_compute/
[12]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#Availabl
[13]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_compute_rdma_network
[14]: https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute
[15]: https://docs.oracle.com/iaas/Content/Compute/References/infrastructurehealthmetrics.htm
[16]: https://docs.datadoghq.com/es/integrations/oci_container_instances/
[17]: https://docs.oracle.com/iaas/Content/container-instances/container-instance-metrics.htm
[18]: https://docs.datadoghq.com/es/integrations/oci_database/
[19]: https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-57B7B9B1-288B-4DCB-82AE-D53B2BD9C78F
[20]: https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-A42CF0E3-EE65-4A66-B8A3-C89B62AFE489
[21]: https://docs.oracle.com/iaas/Content/Network/Reference/drgmetrics.htm
[22]: https://docs.datadoghq.com/es/integrations/oci_ebs/
[23]: https://docs.oracle.com/iaas/stack-monitoring/doc/metric-reference.html#STMON-GUID-4E859CA3-1CAB-43FB-8DC7-0AA17E6B52EC
[24]: https://docs.datadoghq.com/es/integrations/oci_fastconnect/
[25]: https://docs.oracle.com/iaas/Content/Network/Reference/fastconnectmetrics.htm
[26]: https://docs.datadoghq.com/es/integrations/oci_file_storage/
[27]: https://docs.oracle.com/iaas/Content/File/Reference/filemetrics.htm
[28]: https://docs.datadoghq.com/es/integrations/oci_functions/
[29]: https://docs.oracle.com/iaas/Content/Functions/Reference/functionsmetrics.htm
[30]: https://docs.datadoghq.com/es/integrations/oci_gpu/
[31]: https://docs.datadoghq.com/es/integrations/oci_mysql_database/
[32]: https://docs.oracle.com/iaas/mysql-database/doc/metrics.html
[33]: https://docs.datadoghq.com/es/integrations/oke/
[34]: https://docs.oracle.com/iaas/Content/ContEng/Reference/contengmetrics.htm
[35]: https://docs.datadoghq.com/es/integrations/oci_load_balancer/
[36]: https://docs.oracle.com/iaas/Content/Balance/Reference/loadbalancermetrics.htm
[37]: https://docs.oracle.com/iaas/Content/NetworkLoadBalancer/Metrics/metrics.htm
[38]: https://docs.datadoghq.com/es/integrations/oci_media_streams/
[39]: https://docs.oracle.com/iaas/Content/dms-mediastream/mediastreams_metrics.htm?
[40]: https://docs.datadoghq.com/es/integrations/oci_nat_gateway/
[41]: https://docs.oracle.com/iaas/Content/Network/Reference/nat-gateway-metrics.htm
[42]: https://docs.datadoghq.com/es/integrations/oci_network_firewall/
[43]: https://docs.oracle.com/iaas/Content/network-firewall/metrics.htm
[44]: https://docs.datadoghq.com/es/integrations/oci_object_storage/
[45]: https://docs.oracle.com/iaas/Content/Object/Reference/objectstoragemetrics.htm
[46]: https://docs.datadoghq.com/es/integrations/oci_postgresql/
[47]: https://docs.oracle.com/iaas/Content/postgresql/metrics.htm
[48]: https://docs.datadoghq.com/es/integrations/oci_queue/
[49]: https://docs.oracle.com/iaas/Content/queue/metrics.htm
[50]: https://docs.datadoghq.com/es/integrations/oci_service_connector_hub/
[51]: https://docs.oracle.com/iaas/Content/connector-hub/metrics-reference.htm
[52]: https://docs.datadoghq.com/es/integrations/oci_service_gateway/
[53]: https://docs.oracle.com/iaas/Content/Network/Reference/SGWmetrics.htm
[54]: https://docs.datadoghq.com/es/integrations/oci_vcn/
[55]: https://docs.oracle.com/iaas/Content/Network/Reference/vnicmetrics.htm
[56]: https://docs.datadoghq.com/es/integrations/oci_vpn/
[57]: https://docs.oracle.com/iaas/Content/Network/Reference/ipsecmetrics.htm
[58]: https://docs.datadoghq.com/es/integrations/oci_waf/
[59]: https://docs.oracle.com/iaas/Content/WAF/Reference/metricsalarms.htm
[60]: https://docs.datadoghq.com/es/infrastructure/resource_catalog/
[61]: https://github.com/DataDog/integrations-internal-core/blob/main/oracle_cloud_infrastructure/metadata.csv
[62]: https://docs.datadoghq.com/es/help/
[63]: https://www.datadoghq.com/blog/monitor-oci-with-datadog/
[64]: https://www.datadoghq.com/blog/datadog-oci-quickstart/