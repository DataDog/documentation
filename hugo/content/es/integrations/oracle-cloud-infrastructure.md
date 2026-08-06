---
aliases:
- /es/integrations/oracle_cloud_infrastructure
app_id: oracle-cloud-infrastructure
categories:
- cloud
- log collection
- network
- oracle
custom_kind: integration
description: OCI es una colección de servicios en la nube diseñada para admitir una
  variedad de aplicaciones en un entorno alojado.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-oci-with-datadog/
  tag: blog
  text: Realice el seguimiento de Oracle Cloud Infrastructure con Datadog
- link: https://www.datadoghq.com/blog/datadog-oci-quickstart/
  tag: blog
  text: Acelere el seguimiento de Oracle Cloud Infrastructure con Datadog OCI QuickStart
integration_version: 1.1.1
media: []
title: Oracle Cloud Infrastructure
---
{{< jqmath-vanilla >}}

## Descripción general {#overview}

Oracle Cloud Infrastructure (OCI) es una infraestructura como servicio (IaaS) y plataforma como servicio (PaaS) utilizada por empresas a escala empresarial. Incluye un conjunto completo de más de 30 servicios administrados para alojamiento, almacenamiento, redes, bases de datos y más.

Utilice la integración de OCI de Datadog para obtener visibilidad completa de su entorno de OCI a través de métricas, registros y datos de recursos. Estos datos le permiten potenciar dashboards, ayudan con la resolución de problemas y pueden ser monitoreados para la postura de seguridad y cumplimiento.

## Configuración {#setup}

Datadog recomienda utilizar el método de configuración QuickStart. Si es necesario, también puede configurar la integración utilizando [Terraform](#oci-terraform-setup).

### Recopilación de datos {#data-collection}

#### Consideraciones {#considerations}

- La recopilación de registros, métricas, datos de recursos y eventos está habilitada de forma predeterminada. Puede optar por no participar en la recopilación de registros o eventos durante la configuración. Después de completar la configuración, puede modificar la recopilación de datos de recursos, la recopilación de eventos y los servicios individuales de registro o métrica desde el [Datadog OCI integration tile](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure).
- Se admiten todas las regiones comerciales de OCI (en el reino OC1) que existían al 1 de enero de 2026. Las regiones de OCI agregadas después de esta fecha no son compatibles.
- La integración de Datadog con OCI está limitada a una integración por tenencia. Si configuró la integración antes de junio de 2025, siguió la configuración manual; cualquier pila de implementación de integración de Datadog OCI resultante debe eliminarse antes de utilizar el método de configuración de OCI QuickStart. Si configuró manualmente el reenvío de registros y elige habilitar la recopilación de registros en el mosaico de OCI QuickStart, también debe eliminar sus recursos de reenvío de registros existentes para evitar enviar registros dos veces. Consulte la sección [de migración manual a QuickStart](#oci-integration-manual-to-quickstart-migration) de esta página para obtener más información.

{{% collapse-content title="QuickStart (recomendado)" level="h4" %}}

OCI QuickStart de Datadog es una experiencia de configuración de flujo único totalmente administrada que le ayuda a realizar el seguimiento de su infraestructura y aplicaciones de OCI en solo unos pocos clics. OCI QuickStart crea la infraestructura necesaria para reenviar métricas, registros y datos de recursos a Datadog, y descubre automáticamente nuevos recursos o compartimentos de OCI para la recopilación de datos.

#### Elija la configuración de QuickStart si... {#choose-quickstart-setup-if}

- Está configurando la integración de OCI por primera vez.
- Prefiere un flujo de trabajo basado en la interfaz de usuario y desea minimizar el tiempo necesario para crear y configurar los recursos necesarios.
- Desea automatizar los pasos de configuración en scripts o pipelines de CI/CD.

#### Requisitos previos de la configuración de QuickStart {#quickstart-setup-prerequisites}

- Su cuenta de usuario de OCI necesita el rol de **Administrador de dominio de identidad** para completar estos pasos.
- Debe haber iniciado sesión en OCI en la tenencia con la que desea realizar la integración.
- Debe haber iniciado sesión en OCI con la Región de origen seleccionada en la parte superior derecha de la pantalla.
- Su cuenta de usuario de OCI debe poder crear un usuario, un grupo de usuarios y un grupo dinámico en el Dominio de identidad en el que ha iniciado sesión, o en el dominio de destino si se especifica. Si proporciona un OCID de dominio de destino, su cuenta de usuario de OCI debe tener privilegios de administrador en ese dominio.
- Su cuenta de usuario de OCI debe poder crear políticas en el compartimento raíz.

#### Instrucciones de configuración de QuickStart {#quickstart-setup-instructions}

Para configurar la infraestructura para el reenvío de registros y a métricas Datadog:

- [Configure el Datadog OCI integration tile](#configure-the-datadog-oci-integration-tile)
- [Implemente la pila ORM de QuickStart](#deploy-the-quickstart-orm-stack)
- [Complete la configuración en Datadog](#complete-the-setup-in-datadog)
- [Valide que las métricas estén fluyendo](#validation)
- [Configure la recopilación de métricas o registros (opcional)](#configuration)
- [Configure la recopilación de recursos (opcional)](#resource-collection)

La integración requiere el uso de Oracle Service Connector Hubs para reenviar datos a Datadog. Se recomienda que [solicite un aumento del límite de servicio](https://docs.oracle.com/iaas/Content/General/Concepts/servicelimits.htm#Requesti) antes de completar la configuración. El número aproximado de Service Connector Hubs que necesita es:

$$\\\\text\"Service Connector Hubs\" = \\\\text\"Número de compartimentos en la tenencia\" / \\\\text\"5\"$$

##### Configure el mosaico de integración de Datadog OCI {#configure-the-datadog-oci-integration-tile}

1. Vaya al [Datadog OCI integration tile](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) y haga clic en **Add New Tenancy**.

1. Seleccione o cree una clave de API de Datadog para usar en la integración.

1. Cree una clave de aplicación de Datadog.

1. Habilite o deshabilite los registros utilizando el toggle.

1. Habilite o deshabilite la recopilación de eventos utilizando el toggle.

1. Haga clic en **Create OCI Stack**. Esto lo lleva a una pila de Oracle Resource Manager (ORM) para finalizar la implementación.<br />
   **Nota**: Implemente esta pila solo una vez por tenencia.

##### Implemente la pila ORM de QuickStart {#deploy-the-quickstart-orm-stack}

1. Acepte los Términos de uso de Oracle.

1. Deje la opción de usar proveedores de Terraform personalizados sin marcar.

1. Use el directorio de trabajo predeterminado para desplegar la pila, o elija opcionalmente uno diferente.

1. Haga clic en **Next**.

1. Datadog recomienda dejar la sección `(Optional) Choose specific subnet(s)` en blanco para crear una nueva Virtual Cloud Network (VCN) y una subnet en cada región de este arrendamiento.

   **Opcionalmente**, puede elegir existing subnets (un máximo de una por región de OCI) para la pila QuickStart de Datadog, en cuyo caso debe proporcionar a la pila los OCID de las subnet. Ingrese un OCID por línea, sin comas. La pila de Datadog QuickStart se despliega entonces en la región correspondiente a cada subnet. Cada OCID de subnet debe tener el formato: `ocid1.subnet.oc[0-9].*`. Por ejemplo, `ocid1.subnet.oc1.iad.abcedfgh`.<br />
   **Nota**: Si utiliza una VCN y existing subnets, asegúrese de que la VCN en cada región:

   - Tenga permitido realizar llamadas de salida HTTP a través de NAT Gateway.
   - Tenga un Service Gateway que admita "All Services In Oracle Services Network".
   - Tenga las reglas de tabla de rutas para permitir NAT Gateway y Service Gateway.
   - Tenga las reglas de seguridad para enviar solicitudes HTTP.

1. Datadog recomienda dejar la sección `(Optional) Choose a User` en blanco para crear un nuevo usuario y grupo. El grupo y el usuario se crean en el dominio de identidad de OCI en el que ha iniciado sesión actualmente (que no necesita ser el dominio predeterminado).<br />
   **Opcionalmente**, puede elegir un usuario y grupo existentes para la pila QuickStart de Datadog. En este caso, Datadog infiere automáticamente el dominio del usuario y del grupo, y lo utiliza para crear grupos dinámicos.<br />
   a. **Group ID**: Proporcione el OCID de un OCI Group existente para la autenticación de Datadog. Si se proporciona, **User ID** no puede dejarse en blanco.<br />
   b. **User ID**: Proporcione el OCID de un OCI User existente para la autenticación de Datadog. El usuario debe ser miembro del grupo especificado. Si se proporciona, **Group ID** no puede dejarse en blanco.

1. Datadog recomienda dejar la sección `(Optional) Advanced configuration` en blanco, ya que estos casos de uso son poco comunes.<br />
   **Opcionalmente**, puede elegir un compartimento y un dominio existentes para la pila QuickStart de Datadog.<br />
   a. **Compartment**: Elija un compartimento existente para colocar todos los recursos creados por Datadog.<br />
   b. **Domain**: Proporcione el OCID de un Identity Domain existente para anular dónde se crean el usuario y el grupo. Este campo solo se muestra si no se especifican un usuario y un grupo existentes en el paso 6. Si se proporciona, **User Email** no puede dejarse en blanco. **Nota**: Su cuenta de usuario de OCI debe tener el rol de **Administrador de dominio de identidad** en el dominio de destino.<br />
   c. **Etiquetas de recurso**: Proporcione una lista de etiquetas definidas que se agregarán a todos los recursos de OCI implementados por la pila de inicio rápido de Datadog. Ingrese una etiqueta por línea. No agregue comas. Cada etiqueta definida debe tener el formato: `namespace.key:value`. Por ejemplo, `CostCenter.Environment:prod`. Si se deja en blanco, no se agregan etiquetas definidas a los recursos de OCI implementados por la pila de inicio rápido de Datadog.<br />

1. Haga clic en **Siguiente**.

1. Haga clic en **Crear** y espere hasta 30 minutos para que se complete la implementación.

##### Complete la configuración en Datadog {#complete-the-setup-in-datadog}

Regrese al [mosaico de integración de Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure) y haga clic en **¡Listo!**

{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h4" id="oci-terraform-setup" %}}

#### Elija la configuración de Terraform si... {#choose-terraform-setup-if}

- Usted administra la infraestructura como código y desea mantener la integración de Datadog OCI bajo control de versiones.
- Usted necesita configurar varias carpetas o proyectos de manera consistente con bloques de proveedor reutilizables.
- Usted desea un proceso de implementación repetible y auditable que se ajuste a su entorno administrado por Terraform.

Puede usar Terraform para aprovisionar la integración de Datadog OCI. Esta guía enumera los requisitos previos, las variables necesarias y los pasos exactos para inicializar, planificar y aplicar.

#### Requisitos previos de la configuración de Terraform {#terraform-setup-prerequisites}

Tenga lo siguiente antes de comenzar:

- Terraform 1.x instalado.
- Una [clave de API de Datadog](https://app.datadoghq.com/organization-settings/api-keys) válida.
- Acceso a OCI con el rol de Administrador de dominio de identidad en el dominio de destino.

#### Instrucciones de configuración de Terraform {#terraform-setup-instructions}

Para configurar la infraestructura para el reenvío de métricas y registros a Datadog:

- [Cree un archivo de configuración de OCI](#create-an-oci-configuration-file)
- [Configure el módulo de Terraform](#configure-the-terraform-module)
- [Implemente con Terraform](#deploy-with-terraform)
- [Valide que las métricas estén fluyendo](#validation)
- [Configure la recopilación de métricas o registros (opcional)](#configuration)
- [Configure la recopilación de recursos (opcional)](#resource-collection)

##### Cree un archivo de configuración de OCI {#create-an-oci-configuration-file}

El archivo `~/.oci/config` otorga a Terraform permisos para crear recursos en OCI. [Cree una clave de API](https://cloud.oracle.com/identity/domains/my-profile/auth-tokens) y agréguela a su configuración, o siga la [documentación de Oracle](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/sdkconfig.htm). Su archivo debería verse así:

```ini
[DEFAULT]
user=<USER_OCID>
fingerprint=<USER_FINGERPRINT>
tenancy=<TENANCY_OCID>
region=<HOME_REGION>
key_file=<PATH_TO_PRIVATE_KEY_FILE>
```

##### Configure el módulo de Terraform {#configure-the-terraform-module}

Las siguientes entradas configuran el módulo de integración de Datadog OCI. Los campos obligatorios están marcados. Para obtener la lista completa de opciones de configuración disponibles, consulte la [página de agregar tenencia](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure/add).

###### 1. Agregue una clave de API de Datadog. {#1-add-a-datadog-api-key}

Haga clic en **Seleccionar clave de API** y seleccione una clave de API para usar.

###### 2. Cree una clave de aplicación de Datadog. {#2-create-a-datadog-application-key}

Haga clic en **Crear**, y se generará una clave de aplicación que se agregará al campo. Asegúrese de copiar este valor y guardarlo en una ubicación segura, ya que no se podrá acceder a él nuevamente después de salir de esta pantalla.

###### 3. Agregue su OCID de tenencia de OCI. {#3-add-your-oci-tenancy-ocid}

1. Ingrese el OCID de la tenencia que será objeto de seguimiento por Datadog. Encuéntrelo en [cloud.oracle.com/tenancy](https://cloud.oracle.com/tenancy).
1. Opcionalmente, elija un compartimento y subredes de OCI específicos. Datadog recomienda dejar esta sección en blanco para crear un nuevo compartimento de OCI y una Virtual Cloud Network (VCN) de OCI en cada región de la tenencia.

###### 4. Agregue su OCID de usuario de OCI. {#4-add-your-oci-user-ocid}

Ingrese su OCID de usuario. Este usuario debe tener el rol de Administrador de dominio de identidad. Encuéntrelo en [cloud.oracle.com/identity/domains/my-profile](https://cloud.oracle.com/identity/domains/my-profile).

###### 5. Configure la recopilación de registros (opcional). {#5-configure-log-collection-optional}

Para deshabilitar toda la recopilación de registros de la tenencia, haga clic en el interruptor. Si desea deshabilitar la recopilación de registros para servicios específicos de OCI, edite la configuración después de la instalación en el [mosaico de integración de Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure).

###### 6. Configure la recopilación de eventos (opcional). {#6-configure-event-collection-optional}

Para deshabilitar toda la recopilación de eventos de la tenencia, haga clic en el interruptor. Para deshabilitar la recopilación de eventos después de la instalación, edite la configuración en el [mosaico de integración de Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure).

###### 7. Confirme los detalles de configuración del módulo de Terraform generado. {#7-confirm-the-configuration-details-of-the-generated-terraform-module}

El módulo de Terraform generado debe seguir el formato que se muestra a continuación:

```hcl
module "datadog_oci" {
  source = "github.com/DataDog/oracle-cloud-integration//datadog-terraform-onboarding"

  datadog_api_key = <API_KEY>
  datadog_app_key = <APP_KEY>
  datadog_site    = <DATADOG_SITE>

  tenancy_ocid      = "<TENANCY_OCID>"
  current_user_ocid = "<CURRENT_USER_OCID>"

  logs_enabled              = true
  events_collection_enabled = true
}
```

#### Implementar con Terraform {#deploy-with-terraform}

1. Copie el módulo de Terraform generado y péguelo en un archivo `.tf`.
1. Ejecute `terraform init && terraform apply` para inicializar Terraform y crear la integración. Si desea obtener una vista previa de los cambios, sustituya `plan` por `apply`.

#### Solución de problemas {#troubleshooting}

##### Tiempos de espera {#timeouts}

Vuelva a ejecutar el comando de Terraform sin cambiar la configuración.

##### Conflictos de proveedor {#provider-conflicts}

Si encuentra conflictos de proveedor desde el comando `terraform init`, actualice su configuración de proveedor local para que coincida con las versiones requeridas del módulo.

##### Advertencias en Datadog inmediatamente después de la configuración {#warnings-in-datadog-immediately-after-setup}

Espere hasta 15 minutos para que las advertencias desaparezcan.

{{% /collapse-content %}}

#### Validación {#validation}

Visualización de las métricas de `oci.*` en el [Dashboard de descripción general de la integración de OCI](https://app.datadoghq.com/dash/integration/31417/oracle-cloud-infrastructure-oci-overview) o en la página [Metrics Explorer](https://app.datadoghq.com/metric/explorer) en Datadog.

<div class="alert alert-warning">Métricas de funciones de OCI (<code>oci.faas</code> espacio de nombres) y las métricas de instancias de Container (<code>oci_computecontainerinstance</code> espacio de nombres) están en versión preliminar.</div>

### Configuración {#configuration}

![La pestaña de configuración de un arrendamiento de OCI en Datadog](images/oci_configuration_tab_2026-02-25.png)

Después de completar la configuración, una pestaña de configuración para el arrendamiento estará disponible en el lado izquierdo del [mosaico de integración de Datadog OCI](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure). Aplique las configuraciones de recopilación de datos para todo el arrendamiento como se describe en las secciones a continuación.

#### Agregar regiones {#add-regions}

En la pestaña **General**, seleccione las regiones para la recopilación de datos de la lista de casillas de verificación **Regiones**. Las selecciones de región se aplican a toda la tenencia, tanto para métricas como para registros.

**Nota**: Si utilizó el método de configuración QuickStart y posteriormente se suscribió a una nueva región de OCI, vuelva a aplicar la pila de configuración inicial en ORM. La nueva región estará entonces disponible en el mosaico de Datadog OCI.

#### Recopilación de métricas y registros {#metric-and-log-collection}

Utilice las pestañas **Recopilación de métricas** y **Recopilación de registros** para configurar qué métricas y registros se envían a Datadog:

##### Habilitar o deshabilitar toda la recopilación de métricas o registros de una tenencia {#enable-or-disable-all-metric-or-log-collection-from-a-tenancy}

Tanto la pestaña de recopilación de métricas como la de registros tienen un interruptor principal que puede utilizar para deshabilitar la recopilación de ese tipo de datos para toda la tenencia. Si recopila un tipo de datos determinado para la tenencia, puede utilizar las secciones a continuación para implementar un filtrado granular por [servicio](#limit-metric-or-log-collection-to-specific-oci-services), [compartimento](#limit-metric-or-log-collection-by-compartment) y [recursos específicos](#limit-metric-or-log-collection-to-specific-resources).

**Nota**: Los filtros se evalúan en orden: **Servicios seleccionados** actúa como el interruptor principal para la recopilación de datos de un servicio, luego se aplican los filtros de etiquetas de compartimento y, finalmente, los filtros de etiquetas de recursos.

##### Limitar la recopilación de métricas o registros a servicios específicos de OCI {#limit-metric-or-log-collection-to-specific-oci-services}

Utilice la sección **Selected Services** para habilitar o deshabilitar la recopilación de servicios individuales de OCI. Deshabilitar un servicio detiene toda la recopilación del mismo, independientemente de cualquier filtro de etiquetas de recursos configurado para él. Cuando un servicio está habilitado, los filtros de etiquetas de recursos pueden restringir aún más la recopilación a recursos específicos dentro de ese servicio; los recursos sin una etiqueta de inclusión coincidente se excluyen.

**Nota**: Después de modificar las etiquetas en OCI, pueden pasar hasta 15 minutos para que los cambios aparezcan en Datadog. Los cambios en el interruptor de servicio pueden tardar hasta 5 minutos en surtir efecto.

{{% collapse-content title="Sintaxis de filtro de etiquetas" level="h6" id="tag-filter-syntax" %}}

Tanto la sección **Etiquetas de compartimento** como la sección **Limitar la recopilación a recursos específicos** aceptan `key:value` etiquetas de OCI separadas por comas. Anteponga `!` a una etiqueta para negarla. El separador de comas se comporta de manera diferente según los tipos de etiquetas utilizados:

- **Solo etiquetas positivas**: lógica OR—se incluye si el objeto OCI (compartimento o recurso específico) tiene **alguna** de las etiquetas enumeradas.
- **Solo etiquetas negativas** (con el prefijo `!`): lógica OR—se excluye si **alguna** de las etiquetas negadas está presente.
- **Etiquetas positivas y negativas mixtas**: lógica AND—debe satisfacer **todas** las condiciones enumeradas para ser incluido.

Por ejemplo:

- `datadog:monitored,env:prod*`: incluir si **alguna** de las etiquetas está presente.
- `!env:staging,!testing:true`: excluir si **alguna** de las etiquetas está presente.
- `datadog:monitored,!region:us-phoenix-1`: incluir solo si la etiqueta `datadog:monitored` está presente **y** la etiqueta `region:us-phoenix-1` está ausente.

**Formato de clave de etiqueta**: Datadog normaliza las claves de etiqueta de OCI a minúsculas `snake_case` antes de realizar la coincidencia. Las claves establecidas en OCI usando camelCase o PascalCase (por ejemplo, `deploymentType` o `DeploymentType`) se almacenan y comparan como su equivalente en minúsculas snake_case (`deployment_type`). Utilice minúsculas `snake_case` al especificar filtros de etiquetas en el mosaico de integración.

{{% /collapse-content %}}

##### Limite la recopilación de métricas o registros por compartimento {#limit-metric-or-log-collection-by-compartment}

Utilice la sección **Etiquetas de compartimento** para incluir o excluir compartimentos específicos según las etiquetas de compartimento de OCI. Consulte [Sintaxis de filtro de etiquetas](#tag-filter-syntax) para obtener una referencia de sintaxis.

**Nota**: En OCI, las etiquetas no son heredadas por los compartimentos secundarios; cada compartimento debe etiquetarse individualmente.

##### Limite la recopilación de métricas o registros a recursos específicos {#limit-metric-or-log-collection-to-specific-resources}

Utilice la sección **Limitar la recopilación a recursos específicos** para definir qué recursos deben enviar sus métricas o registros a Datadog. Seleccione el servicio de OCI en el menú desplegable y luego especifique qué etiquetas de recursos deben seleccionarse para la recopilación de datos. Consulte [Sintaxis de filtro de etiquetas](#tag-filter-syntax) para obtener una referencia de sintaxis.

{{% collapse-content title="Consulte la lista completa de espacios de nombres de métricas" level="h4" id="oci-metric-namespaces" %}}

| Integración                         | Espacio de nombres de métricas                                                                                                                         |
|-------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------- |
| [API Gateway](https://docs.datadoghq.com/es/integrations/oci_api_gateway/)                  | [oci_apigateway](https://docs.oracle.com/iaas/Content/APIGateway/Reference/apigatewaymetrics.htm)                                                                                                                    |
| [Autonomous Database](https://docs.datadoghq.com/es/integrations/oci_autonomous_database/)           | [oci_autonomous_database](https://docs.oracle.com/iaas/autonomous-database-serverless/doc/autonomous-monitor-metrics-list.html)                                                                                                            |
| [Block Storage](https://docs.datadoghq.com/es/integrations/oci_block_storage/)                       | [oci_blockstore](https://docs.oracle.com/iaas/Content/Block/References/volumemetrics.htm)                                                                                                                     |
| [Cloud Events](https://docs.datadoghq.com/es/integrations/oci_cloudevents/)                       | [oci_cloudevents](https://docs.oracle.com/en-us/iaas/Content/Events/Reference/eventsmetrics.htm)                                                                                                                   |
| [Compute](https://docs.datadoghq.com/es/integrations/oci_compute/)                       | [oci_computeagent](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#Availabl), [rdma_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_compute_rdma_network), [gpu_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute), [oci_compute_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/infrastructurehealthmetrics.htm)       |
| [Container Instances (Vista previa)](https://docs.datadoghq.com/es/integrations/oci_container_instances/) | [oci_computecontainerinstance](https://docs.oracle.com/iaas/Content/container-instances/container-instance-metrics.htm)                                                                                                       |
| [Database](https://docs.datadoghq.com/es/integrations/oci_database/)                      | [oci_database](https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-57B7B9B1-288B-4DCB-82AE-D53B2BD9C78F), [oci_database_cluster](https://docs.oracle.com/iaas/base-database/doc/available-metrics-base-database-service-resources.html#DBSCB-GUID-A42CF0E3-EE65-4A66-B8A3-C89B62AFE489)                                                                                           |
| [Dynamic Routing Gateway](https://docs.datadoghq.com/es/integrations/oci-dynamic-routing-gateway/)             | [oci_dynamic_routing_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/drgmetrics.htm)                                                                                                        |
| [E-Business Suite (EBS)](https://docs.datadoghq.com/es/integrations/oci_ebs/)             | [oracle_appmgmt](https://docs.oracle.com/en-us/iaas/stack-monitoring/doc/metric-reference.html)                                                                                                        |
| [FastConnect](https://docs.datadoghq.com/es/integrations/oci_fastconnect/)                         | [oci_fastconnect](https://docs.oracle.com/iaas/Content/Network/Reference/fastconnectmetrics.htm)                                                                                                                    |
| [File Storage](https://docs.datadoghq.com/es/integrations/oci_file_storage/)                        | [oci_filestorage](https://docs.oracle.com/iaas/Content/File/Reference/filemetrics.htm)                                                                                                                    |
| [Functions (Vista previa)](https://docs.datadoghq.com/es/integrations/oci_functions/)           | [oci_faas](https://docs.oracle.com/iaas/Content/Functions/Reference/functionsmetrics.htm)                                                                                                                           |
| [GoldenGate](https://docs.datadoghq.com/es/integrations/oci-goldengate/)           | [oci_goldengate](https://docs.oracle.com/en/cloud/paas/goldengate-service/ofroo/)                                                                                                                           |
| [GPU](https://docs.datadoghq.com/es/integrations/oci_gpu/)           | [gpu_infrastructure_health](https://docs.oracle.com/iaas/Content/Compute/References/computemetrics.htm#computemetrics_topic-Available_Metrics_oci_high_performance_compute)                                                                                                                           |
| [HeatWave MySQL](https://docs.datadoghq.com/es/integrations/oci_mysql_database/)                | [oci_mysql_database](https://docs.oracle.com/iaas/mysql-database/doc/metrics.html)                                                                                                                 |
| [Instance Pools](https://docs.datadoghq.com/es/integrations/oci-instancepools/)                | [oci_instancepools](https://docs.oracle.com/en-us/iaas/Content/Compute/References/instancepoolmetrics.htm)                                                                                                                 |
| [Internet Gateway](https://docs.datadoghq.com/es/integrations/oci-internet-gateway/)                | [oci_internet_gateway](https://docs.oracle.com/en-us/iaas/Content/Network/Reference/IGWmetrics.htm)                                                                                                                 |
| [Kafka](https://docs.datadoghq.com/es/integrations/oci-kafka/)                          | [oci_kafka](https://docs.oracle.com/en-us/iaas/Content/kafka/metrics.htm)                                                                                                                          |
| [Kubernetes Engine](https://docs.datadoghq.com/es/integrations/oke/)                   | [oci_oke](https://docs.oracle.com/iaas/Content/ContEng/Reference/contengmetrics.htm)                                                                                                                            |
| [Load Balancer](https://docs.datadoghq.com/es/integrations/oci_load_balancer/)                 | [oci_lbaas](https://docs.oracle.com/iaas/Content/Balance/Reference/loadbalancermetrics.htm), [oci_nlb](https://docs.oracle.com/iaas/Content/NetworkLoadBalancer/Metrics/metrics.htm)                                                                                                           |
| [Media Streams](https://docs.datadoghq.com/es/integrations/oci_media_streams/)                   | [oci_mediastreams](https://docs.oracle.com/iaas/Content/dms-mediastream/mediastreams_metrics.htm?)                                                                                                                    |
| [NAT Gateway](https://docs.datadoghq.com/es/integrations/oci_nat_gateway/)                   | [oci_nat_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/nat-gateway-metrics.htm)                                                                                                                    |
| [Network Firewall](https://docs.datadoghq.com/es/integrations/oci_network_firewall/)                   | [oci_network_firewall](https://docs.oracle.com/iaas/Content/network-firewall/metrics.htm)                                                                                                                    |
| [Tabla NoSQL](https://docs.datadoghq.com/es/integrations/oci-nosqltable/)                        | [oci_nosql](https://docs.oracle.com/en/cloud/paas/nosql-cloud/mgygg)                                                                                                                         |
| [Almacenamiento de objetos](https://docs.datadoghq.com/es/integrations/oci_object_storage/)                      | [oci_objectstorage](https://docs.oracle.com/iaas/Content/Object/Reference/objectstoragemetrics.htm)                                                                                                                  |
| [Oracle Fusion](https://docs.datadoghq.com/es/integrations/oracle-fusion/)                      | [oci_fusion](https://docs.oracle.com/en-us/iaas/Content/fusion-applications/metrics.htm)                                                                                                                        |
| [Oracle Integration (OIC)](https://docs.datadoghq.com/es/integrations/oci-integration/)                | [oci_integration](https://docs.oracle.com/en-us/iaas/application-integration/doc/modify-charts-and-create-custom-charts.html)                                                                                                                 |
| [PostgreSQL](https://docs.datadoghq.com/es/integrations/oci_postgresql/)                   | [oci_postgresql](https://docs.oracle.com/iaas/Content/postgresql/metrics.htm)                                                                                                                    |
| [Cola](https://docs.datadoghq.com/es/integrations/oci_queue/)                               | [oci_queue](https://docs.oracle.com/iaas/Content/queue/metrics.htm)                                                                                                                          |
| [Servicio de recuperación](https://docs.datadoghq.com/es/integrations/oci-recovery-service/)                   | [oci_recovery_service](https://docs.oracle.com/iaas/recovery-service/doc/available-recovery-service-metrics.html)                                                                                                              |
| [Secretos](https://docs.datadoghq.com/es/integrations/oci-secrets/)                            | [oci_secrets](https://docs.oracle.com/iaas/Content/KeyManagement/Reference/keymgmtmetrics.htm)                                                                                                                       |
| [Centro de conectores de servicio](https://docs.datadoghq.com/es/integrations/oci_service_connector_hub/)               | [oci_service_connector_hub](https://docs.oracle.com/iaas/Content/connector-hub/metrics-reference.htm)                                                                                                          |
| [Puerta de enlace de servicio](https://docs.datadoghq.com/es/integrations/oci_service_gateway/)                     | [oci_service_gateway](https://docs.oracle.com/iaas/Content/Network/Reference/SGWmetrics.htm)                                                                                                                |
| [Stack Monitoring](https://docs.datadoghq.com/es/integrations/oci-stack-monitoring/)                  | [oci_stack_monitoring](https://docs.oracle.com/en-us/iaas/stack-monitoring/doc/metric-reference.html)                                                                                                                 |
| [VCN](https://docs.datadoghq.com/es/integrations/oci_vcn/)                           | [oci_vcn](https://docs.oracle.com/iaas/Content/Network/Reference/vnicmetrics.htm)                                                                                                                            |
| [Visual Builder](https://docs.datadoghq.com/es/integrations/oci_visual_builder/)               | [oci_visual_builder](https://docs.oracle.com/en-us/iaas/visual-builder/doc/view-instance-metrics.html)                                                                                                                |
| [VPN](https://docs.datadoghq.com/es/integrations/oci_vpn/)                           | [oci_vpn](https://docs.oracle.com/iaas/Content/Network/Reference/ipsecmetrics.htm)                                                                                                                            |
| [Firewall de aplicaciones web](https://docs.datadoghq.com/es/integrations/oci_waf/)            | [oci_waf](https://docs.oracle.com/iaas/Content/WAF/Reference/metricsalarms.htm)

{{% /collapse-content %}}

### Resource Collection {#resource-collection}

En la pestaña **Resource Collection** del [Datadog OCI integration tile](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure), haga clic en el interruptor **Enable Resource Collection**. Los recursos son visibles en el [Datadog Resource Catalog](https://docs.datadoghq.com/es/infrastructure/resource_catalog/).

La recopilación de eventos está habilitada de forma predeterminada cuando configura la integración. Si configuró la integración de OCI antes de que la recopilación de eventos de Datadog estuviera disponible, haga clic en el interruptor **Enable Resource Changes Collection** en la pestaña **Resource Collection**. Este interruptor controla la recopilación de todos los eventos de OCI, no solo los eventos de cambio de recursos. Los eventos de OCI aparecen en el [Events Explorer](/event/explorer?query=source%3Aoci_events_service) y se pueden filtrar por `source:oci_events_service`.

## Actualice la integración {#update-the-integration}

Cuando Datadog lanza correcciones de errores, parches de seguridad o nuevas funciones que requieren nuevos recursos de OCI o políticas de IAM, vuelva a aplicar su implementación de integración para aprovisionar la infraestructura actualizada.

**Nota**: Las variables `logs_enabled` y `events_collection_enabled` en la pila ORM o la configuración de Terraform solo se utilizan durante la configuración inicial. En aplicaciones posteriores, estos valores se ignoran. El mosaico de integración de Datadog es la fuente para su configuración de recopilación de datos. Volver a aplicar la pila no anula ninguna configuración de recopilación de registros, métricas o eventos que haya configurado en Datadog.

{{% collapse-content title="Inicio rápido (pila ORM)" level="h3" %}}

**Requisito previo**: Antes de aplicar la actualización, verifique que la [clave de aplicación de Datadog](https://app.datadoghq.com/organization-settings/application-keys) configurada en su pila de OCI siga siendo válida. Si la clave ha caducado o ha sido revocada, el trabajo de destrucción fallará. Para actualizar la clave, edite las variables de pila `datadog_app_key` en la consola de OCI y proporcione una clave de aplicación válida antes de continuar.

Ejecute los siguientes comandos desde [OCI Cloud Shell](https://cloud.oracle.com/resourcemanager/stacks?cloudshell=true) para actualizar su pila a la versión más reciente y aplicar los cambios:

```shell
curl -fL -o datadog-integration.zip \
  "https://github.com/DataDog/oracle-cloud-integration/releases/latest/download/datadog-integration.zip"

export STACK_ID="<YOUR_STACK_OCID>"
export OCI_CLI_REGION="<YOUR_HOME_OR_STACK_REGION>"

oci resource-manager stack update \
  --stack-id "$STACK_ID" \
  --config-source datadog-integration.zip \
  --region "$OCI_CLI_REGION" \
  --force

oci resource-manager job create-apply-job \
  --stack-id "$STACK_ID" \
  --execution-plan-strategy AUTO_APPROVED \
  --region "$OCI_CLI_REGION" \
  --wait-for-state SUCCEEDED
```

Reemplace los valores de marcador de posición:

- `<YOUR_STACK_OCID>`: El OCID de su pila ORM de Datadog. Encuéntrelo en [cloud.oracle.com/resourcemanager/stacks](https://cloud.oracle.com/resourcemanager/stacks).
- `<YOUR_HOME_OR_STACK_REGION>`: La región de origen de su arrendamiento (por ejemplo, us-ashburn-1).

{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h3" %}}

**Requisito previo**: Antes de volver a aplicar Terraform, verifique que la variable `datadog_app_key` en su configuración de Terraform contenga una [clave de aplicación de Datadog](https://app.datadoghq.com/organization-settings/application-keys) válida. Si la clave ha caducado o ha sido revocada, el comando de destrucción fallará. Actualice el valor en su archivo `.tf` o a través de un archivo `terraform.tfvars` antes de continuar.

Vuelva a ejecutar Terraform para inicializar el módulo actualizado y aplicar los cambios más recientes:

```shell
terraform init -upgrade && terraform apply
```

Opcionalmente, ejecute `terraform plan` antes de `apply` para obtener una vista previa de los cambios.

{{% /collapse-content %}}

## Desinstalación de la integración {#uninstalling-the-integration}

Para desinstalar la integración de Datadog OCI, elimine los recursos de integración tanto en Datadog como en OCI:

### En Datadog {#in-datadog}

En el [Datadog OCI integration tile](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure), haga clic en **Delete Configuration**. En este punto, las métricas y los registros ya no se recopilan.

![Eliminar la configuración de integración de OCI en Datadog](images/oci_delete_configuration_2025-11-17.png)

### En OCI {#in-oci}

**Requisito previo**: Complete el paso [En Datadog](#in-datadog) anterior antes de limpiar los recursos de OCI. Eliminar la configuración de Datadog primero asegura que los recursos administrados por el backend de Datadog se eliminen primero.

{{% collapse-content title="Inicio rápido (pila ORM)" level="h3" %}}

**Requisito previo**: Antes de ejecutar el trabajo de destrucción, verifique que la clave de aplicación de Datadog configurada en su pila de OCI siga siendo válida. Si la clave ha caducado o ha sido revocada, el trabajo fallará. Para actualizar la clave, edite las variables de la pila en la consola de OCI y proporcione una clave de aplicación válida antes de continuar.

1. Navegue a Oracle Resource Manager (ORM) en la consola de OCI.

1. Localice la pila QuickStart de Datadog que se creó durante la instalación. De forma predeterminada, la pila está etiquetada como `datadog-integration.zip-<NUMBER>`, pero podría haberse configurado con un nombre personalizado durante la implementación.

1. Ejecute un `Destroy` trabajo en la pila para eliminar todos los recursos creados por la integración en todas las regiones.

   ![Destruir las pilas de integración de Datadog en OCI](images/oci_destroy_stack.png)

1. **Opcionalmente**, elimine la pila de OCI de Datadog una vez que se complete la destrucción.

**Nota**: Ejecutar el trabajo una vez en la pila de QuickStart limpia automáticamente todos los recursos en todas las regiones donde se implementó la integración.

{{% /collapse-content %}}

{{% collapse-content title="Terraform" level="h3" %}}

**Requisito previo**: Antes de ejecutar el comando de destrucción, verifique que la variable `datadog_app_key` en su configuración de Terraform contenga una [clave de aplicación de Datadog](https://app.datadoghq.com/organization-settings/application-keys) válida. Si la clave ha caducado o ha sido revocada, el comando de destrucción fallará. Actualice el valor en su archivo `.tf` o mediante un archivo `terraform.tfvars` antes de continuar.

Asegúrese de que el perfil `DEFAULT` en `~/.oci/config` tenga credenciales de usuario para administrar recursos en el arrendamiento correspondiente, luego ejecute:

```shell
terraform destroy
```

{{% /collapse-content %}}

## Migración manual de la integración de OCI a QuickStart {#oci-integration-manual-to-quickstart-migration}

### ¿Por qué necesito migrar? {#why-do-i-need-to-migrate}

La integración de Datadog con OCI está limitada a una integración por arrendamiento. Si configuró la integración antes de junio de 2025, siguió la configuración manual, y cualquier pila de despliegue de integración de Datadog con OCI anterior debe eliminarse antes de utilizar el método de configuración de OCI QuickStart. Si configuró manualmente el reenvío de registros y decide habilitar la recopilación de registros en el OCI QuickStart tile, también debe eliminar sus recursos de reenvío de registros para evitar enviar registros dos veces.

**Nota**: Habrá una interrupción en la recopilación de métricas y registros desde el momento en que se elimine la integración manual hasta que se complete el despliegue de QuickStart.

### Cómo migrar {#how-to-migrate}

Elimine los recursos de integración anteriores tanto en Datadog como en OCI:

#### En Datadog {#in-datadog-1}

En el [Datadog OCI integration tile](https://app.datadoghq.com/integrations/oracle-cloud-infrastructure), haga clic en **Delete Configuration**. En este punto, las métricas y los registros dejan de recopilarse.

![Eliminar la configuración de integración de OCI en Datadog](images/oci_delete_configuration_2025-11-17.png)

#### En OCI {#in-oci-1}

**Requisito previo**: Antes de ejecutar el trabajo de destrucción, verifique que la clave de aplicación de Datadog configurada en sus pilas de OCI siga siendo válida. Si la clave ha caducado o ha sido revocada, el trabajo de destrucción fallará. Para actualizar la clave, edite las variables de la pila en la consola de OCI y proporcione una clave de aplicación válida antes de continuar.

Complete los siguientes pasos para **cada región** en la que se implementó previamente la integración manual:

1. Ejecute un `Destroy` trabajo en la pila de reenvío de métricas de Datadog OCI, para eliminar todos los recursos creados por la pila. De forma predeterminada, la pila está etiquetada como `datadog-oci-orm-metrics-setup.zip-<NUMBER>`, pero podría haberse configurado con un valor personalizado durante la implementación.

1. Ejecute un `Destroy` trabajo en la pila de políticas de Datadog OCI. De forma predeterminada, la pila está etiquetada como `datadog-oci-orm-policy-setup.zip-<NUMBER>`, pero podría haberse configurado con un valor personalizado durante la implementación.

   ![Destruya las pilas de integración de Datadog en OCI](images/oci_destroy_stack.png)

1. **Opcionalmente**, elimine las pilas de Datadog OCI después de que se complete la destrucción.

1. Si configuró la recopilación de registros, elimine la aplicación, la función y el Service Connector Hub de Datadog OCI.

   ![Elimine logconnector en OCI](images/oci_delete_logconnector.png)

Ahora está listo para implementar OCI QuickStart con las [instrucciones de configuración de QuickStart](#quickstart-setup-instructions) y reanudar la recopilación de datos. La implementación de OCI QuickStart puede tardar hasta 30 minutos en completarse.

## Arquitectura {#architecture}

### Recursos de reenvío de registros y métricas{#metric-and-log-forwarding-resources}

![Un diagrama de los recursos de reenvío de métricas y registros de OCI mencionados para esta opción de configuración y que muestra el flujo de datos](images/oci_quickstart_infrastructure_diagram.png)

Para cada región con seguimiento, esta opción de configuración crea la siguiente infraestructura dentro de esa región para reenviar métricas y registros a Datadog:

- Aplicación de función (`dd-function-app`)
- Dos funciones:
  - Reenviador de métricas (`dd-metrics-forwarder`)
  - Reenviador de logs (`dd-logs-forwarder`)
- VCN (`dd-vcn`) con infraestructura de red segura:
  - Subred privada (`dd-vcn-private-subnet`)
  - NAT Gateway (`dd-vcn-natgateway`) para acceso externo a internet
  - Service Gateway (`dd-vcn-servicegateway`) para acceso interno a los servicios de OCI
- Almacén de Key Management Service (KMS) (`datadog-vault`) para almacenar la clave de API de Datadog
- Compartimento dedicado a **Datadog** (`Datadog`)

Todos los recursos están etiquetados con `ownedby = "datadog"`.

### Recursos de IAM {#iam-resources}

![Un diagrama de los recursos de IAM de OCI mencionados para esta opción de configuración y que muestra el flujo de datos](images/oci_quickstart_iam_diagram.png)

Esta opción de configuración crea los siguientes recursos de IAM para habilitar el reenvío de datos a Datadog:

- Usuario de servicio (`dd-svc`).
- Grupo (`dd-svc-admin`) al que pertenece el usuario de servicio.
- Par de claves RSA para la autenticación de API.
- Clave de API de OCI para el usuario de servicio.
- Grupo dinámico (`dd-dynamic-group-connectorhubs`) que incluye todos los conectores de servicio en el compartimento de Datadog.
- Grupo dinámico (`dd-dynamic-group-function`) que incluye todas las funciones en el compartimento de Datadog.
- Política (`dd-svc-policy`) para otorgar al usuario de servicio acceso de lectura a los recursos del arrendamiento y acceso de administración a la infraestructura de OCI en el compartimento de Datadog necesario para la recopilación y el reenvío de datos.

{{% collapse-content title="Consulte la política" level="h6" %}}

```text
- Allow dd-svc-admin to read all-resources in tenancy
- Allow dd-svc-admin to use tag-namespaces in tenancy
- Allow dd-svc-admin to manage serviceconnectors in Datadog compartment
- Allow dd-svc-admin to manage functions-family in Datadog compartment
- Allow dd-svc-admin to use fn-invocation in Datadog compartment
- Allow dd-svc-admin to manage buckets in Datadog compartment where target.bucket.name=/dd-*/
- Allow dd-svc-admin to manage object-family in Datadog compartment where target.bucket.name=/dd-*/
- Endorse dd-svc-admin to read objects in tenancy usage-report
- Allow dd-svc-admin to manage cloudevents-rules in tenancy where any {request.permission = 'EVENTRULE_CREATE', target.resource.tag.DatadogManaged.marker = 'true'}
- Allow dd-svc-admin to manage streams in Datadog compartment where any {request.permission = 'STREAM_CREATE', target.resource.tag.DatadogManaged.marker = 'true'}
- Allow service objectstorage-<REGION> to manage object-family in Datadog compartment where target.bucket.name=/dd-*/
```

**Nota**: La sentencia `Allow service objectstorage-<REGION>` debe agregarse una vez por región suscrita (por ejemplo, `objectstorage-us-ashburn-1`, `objectstorage-ap-batam-1`). Esto permite a Datadog limpiar automáticamente los datos antiguos en los buckets gestionados por Datadog a través de políticas de ciclo de vida de objetos.

{{% /collapse-content %}}

- Política `dd-dynamic-group-policy` para permitir que los conectores de servicio y las funciones lean y reenvíen datos, con acceso a secretos, buckets y flujos en el compartimento de Datadog.

{{% collapse-content title="Consulte la política" level="h6" %}}

```text
   - Allow dd-dynamic-group-connectorhubs to read log-content in tenancy
   - Allow dd-dynamic-group-connectorhubs to read metrics in tenancy
   - Allow dd-dynamic-group-connectorhubs to use fn-function in Datadog compartment
   - Allow dd-dynamic-group-connectorhubs to use fn-invocation in Datadog compartment
   - Allow dd-dynamic-group-functions to read secret-bundles in Datadog compartment
   - Allow dd-dynamic-group-functions to manage object-family in Datadog compartment where target.bucket.name=/dd-*/
   - Allow dd-dynamic-group-connectorhubs to use stream-pull in Datadog compartment where target.resource.tag.DatadogManaged.marker = 'true'
   - Allow any-user to use stream-push in Datadog compartment where all {request.principal.type = 'eventrule', target.resource.tag.DatadogManaged.marker = 'true'}
```

{{% /collapse-content %}}

<div class="alert alert-warning"><strong>No cambie el nombre de los recursos de integración.</strong> Datadog utiliza nombres de recursos (no OCID) para identificar los recursos que genera para operaciones de mantenimiento críticas, como la actualización de imágenes de funciones. Cambiar el nombre de cualquier recurso enumerado anteriormente (por ejemplo, cambiar el nombre de <code>dd-function-app</code>) puede interrumpir la integración. Si su organización requiere convenciones de nomenclatura personalizadas, comuníquese con <a href="https://www.datadoghq.com/support/">Datadog Support</a>.</div>

## Datos recopilados {#data-collected}

<!-- ### Metrics -->

<!-- See [metadata.csv][12] for a list of metrics provided by this integration. -->

### Métricas {#metrics}

Para obtener una lista detallada de las métricas, seleccione el servicio de OCI adecuado en la [sección de espacios de nombres de métricas](#oci-metric-namespaces).

### Service Checks {#service-checks}

La integración de OCI no incluye Service Checks.

### Events {#events}

Todos los eventos de OCI Events Service se reenvían a su Datadog Events Explorer. Filtre por `source:oci_events_service` para ver los eventos.

## Troubleshooting {#troubleshooting-1}

Consulte la [OCI Integration Troubleshooting Guide](https://docs.datadoghq.com/es/integrations/guide/oci-integration-troubleshooting) para resolver problemas relacionados con la integración de OCI.