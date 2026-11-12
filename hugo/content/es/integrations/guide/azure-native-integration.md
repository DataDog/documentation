---
aliases:
- /es/integrations/guide/azure-portal/
- /es/integrations/guide/azure-native-programmatic-management/
- /es/integrations/guide/azure-native-manual-setup/
- /es/logs/guide/azure-native-logging-guide/
description: Configure y administre la integración nativa de Datadog Azure a través
  del recurso Datadog Monitor en el portal de Azure.
further_reading:
- link: /integrations/azure/
  tag: Documentación
  text: Integración de Azure
- link: https://www.datadoghq.com/blog/azure-datadog-partnership
  tag: Blog
  text: La asociación con Microsoft integra a Datadog de forma nativa en el portal
    de Azure
- link: https://www.datadoghq.com/blog/monitor-enterprise-azure-environments-with-datadog/
  tag: Blog
  text: Habilite la supervisión para entornos de Azure a escala empresarial en minutos
    con Datadog
title: Configuración y referencia de la integración nativa de Azure
---
{{< site-region region="us3" >}}

Esta guía es para configurar y administrar el recurso Datadog Monitor en Azure, el cual conecta su organización de Datadog y su entorno de Azure. Elija este método de configuración de integración si:

- Está utilizando el [US3 Site][1]
- Desea administrar la Integración de Azure de Datadog desde el portal de Azure

## Requisitos previos {#prerequisites}

- Su cuenta de Datadog debe estar en el [US3 Site][1]
- Debe ser **Owner** en todas las suscripciones de Azure que desee vincular y **Admin** de la organización de Datadog a la que las vinculará

## Descripción general {#overview}

El recurso de Datadog en Azure representa la conexión entre su organización de Datadog y su entorno de Azure. Puede configurar un recurso de Datadog para vincular tantas suscripciones como desee supervisar. 

Con el recurso de Datadog, puede administrar lo siguiente dentro de la suscripción de Azure asociada:
- Ver o modificar el contexto del recurso de Datadog para incluir las suscripciones que se supervisarán
- Configurar la recopilación de métricas y registros de plataforma de Azure
- Verificar los recursos de Azure que envían métricas y registros
- Ver las claves de API y establecer la clave predeterminada para las implementaciones de Agent de su recurso de Datadog
- Implementar Datadog VM Agent en sus VM de Azure y ver detalles sobre los Agents en ejecución
- Implementar la extensión .NET de Datadog en sus aplicaciones web de Azure y ver detalles sobre las extensiones instaladas
- Reconfigurar el inicio de sesión único
- Cambiar el plan de facturación de su organización de Datadog (solo Azure Marketplace)
- Habilitar o deshabilitar la integración de Azure
- Eliminar el recurso de Datadog

Esta página describe la experiencia en el Portal de Azure. Si prefiere usar la CLI, consulte la [CLI de Azure para Datadog][3].

## Funciones no compatibles {#unsupported-features}

Algunas funciones no se pueden administrar a través del recurso de Datadog en Azure. Estas incluyen:

- Filtrado de métricas a nivel de **recurso**
- [Cloud Cost Management][8] (CCM)
- [Data Observability][13]
- [Log Archiving][9]
- [Storage Management][7]

## Configuración {#setup}

{{% collapse-content title="Portal de Azure" level="h3" expanded=false id="azure-portal-setup" %}}
Existen dos opciones al crear un recurso de Datadog en el portal de Azure:

1. Vincular a una organización de Datadog existente. Esta es la acción más común. Utilice esto para configurar su organización de Datadog para supervisar una suscripción de Azure que aún no se ha vinculado. Esta acción no afecta su plan de facturación de Datadog.

2. Crear una nueva organización de Datadog. Este flujo es menos común. Utilice esto si aún no tiene una organización de Datadog y desea comenzar con un plan de pago a través de Azure Marketplace. Este flujo crea una organización de Datadog completamente nueva, le permite seleccionar un plan de facturación y vincula la suscripción de Azure asociada para la supervisión.

**Note**: Las pruebas no están disponibles mediante la opción **Create a new Datadog organization** en Azure. Para comenzar con una prueba gratuita, primero [cree una organización de prueba de Datadog en el sitio US3][1]. Luego, utilice el flujo de vinculación para agregar cualquier suscripción que desee supervisar.

Después de crear un recurso de Datadog, comienza la recopilación de datos para la suscripción asociada.

### Crear un recurso de Datadog {#create-a-datadog-resource}

Para comenzar a supervisar una suscripción de Azure, navegue a la [página del servicio Datadog en Azure][2] y seleccione la opción para crear un nuevo recurso de Datadog:
{{< img src="integrations/azure/azure-us3-dd-service.png" alt="Servicio Datadog de Azure US3" responsive="true" style="width:90%;">}}

Elija **Link Azure subscription to an existing Datadog organization** o **Create a new Datadog organization**. La vinculación es la acción más común. Utilice esto para configurar la supervisión de una suscripción de Azure que aún no se ha vinculado. Elija el flujo **Create** solo si aún no es cliente de Datadog y desea comenzar con un plan nuevo de pago.

{{< img src="integrations/azure/azure-us3-create-dd-resource1.png" alt="Crear un recurso de Datadog en Azure US3" responsive="true" style="width:90%;">}}

**Nota**: Las nuevas organizaciones de Datadog creadas a través del portal de Azure tienen la facturación consolidada automáticamente en su factura de Azure. Este uso cuenta para el [MACC][3] de su organización, si corresponde.

### Configuración de SSO {#sso-configuration}

_(Opcional)_: Puede configurar el inicio de sesión único (SSO) durante el proceso de creación de una nueva organización de Datadog en Azure. También puede configurar el SSO más tarde. Para configurar el SSO durante la creación inicial, primero cree una aplicación de galería empresarial de Datadog.

### Configuración {#configuration-us3}

{{< tabs >}}
{{% tab "Vincular" %}}

#### Basics {#basics-link}

Después de seleccionar vincular a una organización de Datadog existente, el portal muestra un formulario para crear el recurso de Datadog:
{{< img src="integrations/azure/azure-us3-link-sub.png" alt="Vincular la suscripción de Azure a una organización de Datadog existente" responsive="true" style="width:90%;">}}

Proporcione los siguientes valores:

| Property             | Description                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Subscription         | La suscripción de Azure que desea supervisar con Datadog. El recurso de Datadog existe en esta suscripción. Debe tener acceso de propietario.                                                                                       |
| Resource group       | Cree un nuevo grupo de recursos o utilice uno existente. Un [grupo de recursos][2] es un contenedor que almacena recursos relacionados para una solución de Azure.                                                                                 |
| Resource name        | Especifique un nombre para el recurso de Datadog. La convención de nomenclatura recomendada es: `subscription_name-datadog_org_name`.                                                                                                         |
| Location             | La ubicación es West US2; esta es la ubicación donde se aloja el sitio US3 de Datadog en Azure. Esto no tiene impacto en su uso de Datadog. Al igual que todos los [sitios de Datadog][1], el sitio US3 es totalmente SaaS y admite la supervisión de todas las regiones de Azure, así como de otros proveedores de nube y hosts locales. |
| Datadog organization | Una vez completado el paso de autenticación, el nombre de la organización de Datadog se establece en el nombre de la organización de Datadog que se está vinculando. El sitio de Datadog se establece en US3.                                                                                                                                |

Haga clic en **Link to Datadog organization** para abrir una ventana de autenticación de Datadog y, a continuación, inicie sesión en Datadog.

De forma predeterminada, Azure vincula su organización de Datadog actual a su recurso de Datadog. Si desea vincular a una organización diferente, seleccione la organización adecuada en la ventana de autenticación:

{{< img src="integrations/azure/azure-us3-select-org.png" alt="Azure US3: seleccione una organización de Datadog" responsive="true" style="width:90%;">}}

Cuando se complete el flujo de OAuth, verifique que el nombre de la organización de Datadog sea correcto.

[1]: /es/getting_started/site/
[2]: https://docs.microsoft.com/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{% tab "Crear" %}}

#### Basics {#basics-create}

Después de seleccionar la creación de una nueva organización de Datadog, el portal muestra un formulario para crear tanto el recurso de Datadog como la nueva organización de Datadog:
{{< img src="integrations/azure/azure-us3-create-dd-resource2.png" alt="Crear un recurso de Datadog en Azure US3" responsive="true" style="width:90%;">}}

Proporcione los siguientes valores:

| Propiedad             | Descripción                                                                                                                                                                                                                  |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Subscription         | La suscripción de Azure que desea supervisar con Datadog. El recurso de Datadog existe en esta suscripción. Debe tener acceso de propietario.                                                                                       |
| Resource group       | Cree un grupo de recursos o utilice uno existente. Un [grupo de recursos][2] es un contenedor que almacena recursos relacionados para una solución de Azure.                                                                                 |
| Resource name        | El nombre para el recurso de Datadog. Este nombre se asigna a la nueva organización de Datadog.                                                                                                                                    |
| Location             | La ubicación es West US2: esta es la ubicación donde se aloja el sitio US3 de Datadog en Azure. Esto no tiene impacto en su uso de Datadog. Al igual que todos los [sitios de Datadog][1], el sitio US3 funciona íntegramente como software como servicio y permite supervisar todas las regiones de Azure, así como otros proveedores de nube y servidores locales. |
| Datadog organization | El nombre de la organización de Datadog se establece en el nombre del recurso y el sitio de Datadog se establece en US3.                                                                                                                                |
| Pricing plan         | Una lista de los planes de precios de Datadog disponibles. Si tiene una oferta privada, está disponible en este menú desplegable.                                                                                                                 |
| Billing term         | Mensual.                                                                                                                                                                                                                      |
[1]: /es/getting_started/site/
[2]: https://docs.microsoft.com/azure/azure-resource-manager/management/overview#resource-groups
{{% /tab %}}
{{< /tabs >}}

[1]: /es/getting_started/site/
[2]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Datadog%2Fmonitors
[3]: https://learn.microsoft.com/partner-center/marketplace-offers/azure-consumption-commitment-enrollment
{{% /collapse-content %}} 

{{% collapse-content title="Terraform" level="h3" expanded=false id="terraform-setup" %}}
1. Asegúrese de haber configurado el [proveedor de Terraform para Azure][1].

2. Utilice las plantillas a continuación para crear el recurso `azurerm_datadog_monitor` y realizar la asignación de roles `Monitoring Reader` con Terraform:

#### Recurso de Azure Datadog Monitor {#azure-datadog-monitor-resource}

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

resource "azurerm_resource_group" "example" {
  name     = "<NAME>"
  location = "<AZURE_REGION>"
}
resource "azurerm_datadog_monitor" "example" {
  name                = "<NAME>"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  datadog_organization {
    api_key         = "<DATADOG_API_KEY>"
    application_key = "<DATADOG_APPLICATION_KEY>"
  }
  user {
    name  = "<NAME>"
    email = "<EMAIL>"
  }
  sku_name = "Linked"
  identity {
    type = "SystemAssigned"
  }
}

{{< /code-block >}}

#### Rol Monitoring Reader {#monitoring-reader-role}

{{< code-block lang="hcl" filename="" disable_copy="false" collapsible="false" >}}

data "azurerm_subscription" "primary" {}

data "azurerm_role_definition" "monitoring_reader" {
  name = "Monitoring Reader"
}

resource "azurerm_role_assignment" "example" {
  scope              = data.azurerm_subscription.primary.id
  role_definition_id = data.azurerm_role_definition.monitoring_reader.role_definition_id
  principal_id       = azurerm_datadog_monitor.example.identity.0.principal_id
}

{{< /code-block >}}

3. Ejecute `terraform apply`.

[1]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs
{{% /collapse-content %}} 

### Metrics and logs {#metrics-and-logs}

Seleccione **Metrics and logs** en la barra lateral izquierda para cambiar las reglas de configuración de métricas y registros. Todas las reglas se aplican dinámicamente en toda la suscripción a medida que se agregan recursos o cambian las etiquetas.

Los cambios en la configuración de métricas o registros deberían entrar en vigor en unos minutos.

#### Recopilación de métricas {#metric-collection}

De forma predeterminada, Datadog recopila automáticamente métricas para todos los recursos de Azure dentro de cualquier suscripción vinculada.

Opcionalmente, limite la recopilación de métricas para máquinas virtuales de Azure y planes de App Service mediante etiquetas de Azure adjuntas a sus recursos. 

##### Reglas de etiquetas para el envío de métricas {#tag-rules-for-sending-metrics}
 
 * Las máquinas virtuales, los conjuntos de escalado de máquinas virtuales y los planes de App Service con etiquetas `include` envían métricas a Datadog.  
 * Las máquinas virtuales, los conjuntos de escalado de máquinas virtuales y los planes de App Service con etiquetas `exclude` no envían métricas a Datadog.  
 * Si hay un conflicto entre las reglas de inclusión y exclusión, la exclusión tiene prioridad.  
 * No existe una opción para limitar la recopilación de métricas para otros tipos de recursos.

## Recopilación de registros {#log-collection}

Puede administrar la recopilación de tres tipos de registros de Azure. Encuentre instrucciones y detalles adicionales en las secciones a continuación:

   - [Registros de actividad](#activity-logs)
   - [Registros de recursos de Azure](#azure-resource-logs)
   - [Registros de Microsoft Entra ID](#microsoft-entra-id-logs)

**Nota**: El recurso de Datadog en Azure solo está disponible para las organizaciones de Datadog en el sitio Datadog US3. Si utiliza cualquier otro [sitio de Datadog][1], consulte la guía de [Reenvío automatizado de registros de Azure][12] para conocer las opciones de configuración.

## Registros de actividad {#activity-logs}

Proporcionan información sobre las operaciones en sus recursos en el [plano de control][10]. También se incluyen actualizaciones sobre eventos de estado del servicio. Utilice el registro de actividad para determinar el qué, quién y cuándo de cualquier operación de escritura (`PUT`, `POST`, `DELETE`).

Para enviar registros de actividad a Datadog, seleccione **Send subscription activity logs**. Si esta opción se deja sin marcar, no se enviará ninguno de los registros de actividad a Datadog.

<div class="alert alert-danger">Cuando la recopilación de registros está habilitada, el recurso de Datadog modifica automáticamente las configuraciones de registro de <a href="https://learn.microsoft.com/azure/app-service/">App Services</a>. Azure activa un <strong>reinicio</strong> para App Services cuando cambian sus configuraciones de registro.</div>

## Registros de recursos de Azure {#azure-resource-logs}

Proporcionan información sobre las operaciones realizadas en los recursos de Azure en el [plano de datos][10]. Por ejemplo, obtener un secreto de un almacén de claves o realizar una solicitud a una base de datos son operaciones del plano de datos. El contenido de los registros de recursos varía según el servicio de Azure y el tipo de recurso.

Para enviar registros de recursos de Azure a Datadog, seleccione **Send Azure resource logs for all defined resources**. Los tipos de registros de recursos de Azure se enumeran en las [categorías de registros de recursos de Azure Monitor][11]. Cuando se selecciona esta opción, todos los registros de recursos se envían a Datadog, incluidos los nuevos recursos creados en la suscripción.

Opcionalmente, puede filtrar el conjunto de recursos de Azure que envían registros a Datadog mediante etiquetas de recursos de Azure.

### Reglas de etiquetas para enviar registros {#tag-rules-for-sending-logs}

- Los recursos de Azure con etiquetas `include` envían registros a Datadog.
- Los recursos de Azure con etiquetas `exclude` no envían registros a Datadog.
- Si hay un conflicto entre las reglas de inclusión y exclusión, la exclusión tiene prioridad.

Por ejemplo, la captura de pantalla a continuación muestra una regla de etiqueta donde solo aquellas máquinas virtuales, conjuntos de escalado de máquinas virtuales y planes de App Service etiquetados como `Datadog = True` envían métricas y registros a Datadog.

{{< img src="integrations/azure/azure-us3-create-dd-resource3.png" alt="Azure US3: registros al crear un recurso de Datadog" responsive="true" style="width:90%;">}}

## Registros de Microsoft Entra ID {#microsoft-entra-id-logs}

Los registros de Microsoft Entra ID contienen el historial de la actividad de inicio de sesión y un registro de auditoría de los cambios realizados en Microsoft Entra ID para un inquilino en particular. Para enviar estos registros a Datadog, primero complete el proceso para crear un recurso de Datadog. Luego, siga estos pasos:

1. Vaya a Microsoft Entra ID y seleccione **Diagnostic Settings** en **Monitoring** en la barra de navegación izquierda.
2. Haga clic en **Add diagnostic setting**.
3. Seleccione las categorías de registros que desea enviar a Datadog. Datadog recomienda enviar todas las categorías.
4. En **Destination details**, seleccione **Send to a partner solution**.
5. Seleccione una suscripción. Seleccione un recurso de Datadog en el menú desplegable **Destination**.

Todos los registros de Microsoft Entra ID del inquilino se envían a la organización de Datadog vinculada al recurso de Datadog seleccionado. Para los casos en los que tenga más de un recurso de Datadog que vincule suscripciones a la misma organización de Datadog, no importa qué recurso de Datadog se seleccione. Solo necesita configurar esto una vez para cada inquilino de Azure.

## Utilice el recurso de Datadog {#use-the-datadog-resource}

### Overview {#overview-1}

Seleccione **Overview** en la barra lateral izquierda para ver información sobre su recurso de Datadog.

{{< img src="integrations/guide/azure_portal/resource-overview.png" alt="El portal de Azure con Overview resaltado en la barra de navegación izquierda" responsive="true" style="width:100%;">}}

### Aspectos básicos {#essentials}

La página de descripción general muestra información esencial sobre su recurso de Datadog, incluidos el nombre del grupo de recursos, la ubicación (región), las suscripciones, las etiquetas, el enlace a la organización de Datadog, el estado, el plan de precios y el plazo de facturación.

**Nota**: El enlace a la organización de Datadog es un enlace SAML si SSO está habilitado. Si la organización de Datadog se creó con Azure Marketplace, establezca una contraseña la primera vez que utilice este enlace.

### Enlaces {#links}

La página de descripción general proporciona enlaces para ver los Dashboards, los registros y los mapas de servidores de Datadog.

### Resumen de recursos {#resource-summary}

La página de descripción general proporciona una tabla de resumen de los recursos que envían registros y métricas a Datadog. Esta tabla incluye las siguientes columnas:

| Columna             | Descripción                                                               |
|--------------------|---------------------------------------------------------------------------|
| Tipo de recurso      | El tipo de recurso de Azure                                                   |
| Total de recursos    | El recuento de todos los recursos para el tipo de recurso                          |
| Registros a Datadog    | El recuento de recursos que envían registros a Datadog a través de la integración    |
| Métricas a Datadog | El recuento de recursos que envían métricas a Datadog a través de la integración |

### Deshabilitar {#disable}

Para dejar de enviar registros y métricas de Azure a Datadog, seleccione **Disable** en la página de descripción general y luego haga clic en **OK**.

{{< img src="integrations/guide/azure_portal/disable.png" alt="La página del recurso de Datadog dentro del portal de Azure con Overview seleccionado en la barra de navegación izquierda, la pestaña Disable resaltada y el botón OK resaltado" responsive="true" style="width:100%;">}}

**Nota**: Deshabilitar el recurso de Datadog detiene el envío de métricas y registros de plataforma a Datadog para las suscripciones asociadas. Cualquier recurso en las suscripciones que envíe datos directamente a Datadog a través del Agent o la extensión no se verá afectado.

### Habilitar {#enable}

Para comenzar a enviar registros y métricas de Azure a Datadog, seleccione **Enable** en la página de descripción general y luego haga clic en **OK**. Se recupera y habilita cualquier configuración previa para registros y métricas.

{{< img src="integrations/guide/azure_portal/enable.png" alt="La página del recurso de Datadog dentro del portal de Azure, con Overview seleccionado en la barra de navegación izquierda, la pestaña Enable resaltada y el botón OK resaltado" responsive="true" style="width:100%;">}}

### Eliminar {#delete}

Para eliminar el recurso de Datadog, seleccione **Delete** en la página de descripción general. Confirme la eliminación escribiendo `yes` y luego haga clic en **Delete**.

{{< img src="integrations/guide/azure_portal/delete.png" alt="La página del recurso de Datadog dentro del portal de Azure, con Overview seleccionado en la barra de navegación izquierda, la pestaña Delete resaltada y un campo para confirmar la eliminación" responsive="true" style="width:100%;">}}

Para las organizaciones de Datadog facturadas a través de Azure Marketplace:
- Si el recurso de Datadog eliminado es el único recurso de Datadog asignado a su organización de Datadog asociada, los registros y las métricas ya no se envían a Datadog y toda la facturación de Datadog a través de Azure se detiene. El soporte de Datadog se comunicará con usted para confirmar los siguientes pasos con su cuenta.
- Si hay recursos de Datadog adicionales asignados a la organización de Datadog asociada, eliminar un recurso de Datadog solo detiene el envío de registros y métricas para su suscripción de Azure asociada.

Si su organización de Datadog **no** se factura a través de Azure Marketplace, eliminar un recurso de Datadog solo elimina la integración para esa suscripción de Azure.

### Cambiar plan {#change-plan}

Seleccione **Change Plan** en la página de descripción general para cambiar su plan de facturación de Datadog.

{{< img src="integrations/guide/azure_portal/change-plan1.png" alt="La página del recurso de Datadog dentro del portal de Azure, con Overview seleccionado en la barra de navegación izquierda y la pestaña Change Plan resaltada" responsive="true" style="width:100%;">}}

El portal recupera todos los planes de Datadog disponibles para su inquilino, incluidas las ofertas privadas. Seleccione el plan adecuado y haga clic en **Change Plan**.

{{% collapse-content title="Extensiones del Datadog Agent" level="h4" expanded=false id="agent-extensions" %}}

{{< tabs >}}
{{% tab "Extensión de VM" %}}

Para ver una lista de máquinas virtuales (VM) en la suscripción, seleccione **Virtual machine agent** en la barra lateral izquierda. En esta página, puede instalar el Datadog Agent en una VM como una extensión.

{{< img src="integrations/guide/azure_native_manual_setup/azure_native_vm_extension.png" alt="El recurso de Datadog en Azure con Virtual machine agent seleccionado y la opción Install extension resaltada" responsive="true" style="width:90%;">}}

Para cada VM, se muestra la siguiente información:

| Columna               | Descripción                                                                                                                                                    |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Nombre del recurso        | El nombre de la VM                                                                                                                                                  |
| Estado del recurso      | Si la VM está detenida o en ejecución. El Datadog Agent solo se puede instalar en una VM en ejecución. Si la VM está detenida, la instalación del Datadog Agent está deshabilitada. |
| Versión del Agent        | El número de versión del Datadog Agent                                                                                                                               |
| Estado del Agent         | Si el Datadog Agent se está ejecutando en la VM.                                                                                                                |
| Integrations habilitadas | Las métricas clave que recopilan las Integrations habilitadas en el Datadog Agent.                                                                                  |
| Método de instalación       | La herramienta específica utilizada para instalar el Datadog Agent, como Chef, extensión de VM de Azure, etc.                                                                    |
| Envío de registros         | Indica si el Datadog Agent está enviando registros a Datadog.                                                                                                          |

#### Instalar {#install}

Puede instalar el Datadog Agent directamente en Azure con la extensión de VM. Para instalar el Datadog Agent: 

1. Seleccione la VM adecuada.
2. Haga clic en **Install Extension**. 
3. El portal solicita confirmación para instalar el Agent con la clave predeterminada. Seleccione **OK** para comenzar la instalación. Azure muestra el estado como `Installing` hasta que el Agent esté instalado y aprovisionado. Después de que el Datadog Agent esté instalado, el estado cambia a `Installed`.

##### Desinstalar {#uninstall}

Si el Datadog Agent se instaló con la extensión de VM de Azure:

1. Seleccione la VM adecuada.
2. Haga clic en **Uninstall Agent**.

Si el Agent se instaló mediante un método diferente, no puede utilizar el recurso de Datadog para implementar o eliminar el Agent, pero la información sobre el Agent sigue reflejándose en esta página.

{{% /tab %}}
{{% tab "Extensión de clúster de AKS" %}}

La extensión de clúster de AKS de Datadog le permite implementar el Datadog Agent de forma nativa dentro de Azure AKS, evitando la complejidad de las herramientas de gestión de terceros. 

#### Instalar {#install-1}

Para instalar el Datadog Agent con la extensión de clúster de AKS: 

1. Haga clic en su clúster de AKS en la sección **Monitored Resources** en la barra lateral izquierda.
2. Desde la barra lateral izquierda del clúster de AKS, seleccione **Extensions + applications** en **Settings**.
3. Busque y seleccione el `Datadog AKS Cluster Extension`.
4. Haga clic en **Create** y siga las instrucciones del mosaico utilizando sus [credenciales de Datadog][1] y su [sitio de Datadog][2].

#### Desinstalar {#uninstall-1}

1. Haga clic en su clúster de AKS en la sección **Monitored Resources** en la barra lateral izquierda.
2. Desde la barra lateral izquierda del clúster de AKS, seleccione **Extensions + applications** en **Settings**.
3. Seleccione Datadog AKS Cluster Extension (su **Type** es `Datadog.AKSExtension`).
4. Haga clic en **Uninstall**.

[1]: /es/account_management/api-app-keys/
[2]: /es/getting_started/site/
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}

{{% collapse-content title="App Service extension" level="h4" expanded=false id="app-service-extension" %}}

Seleccione **App Service extension** en la barra lateral izquierda para ver una lista de servicios de aplicaciones en la suscripción. En esta página, puede instalar la extensión de Datadog en Azure App Service para habilitar el rastreo de APM y Custom Metrics.

Para cada servicio de aplicación, se muestra la siguiente información:

| Columna            | Descripción                                                                                                                                                                  |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Nombre del recurso     | El nombre de la aplicación                                                                                                                                                                 |
| Estado del recurso   | Si el servicio de aplicación está detenido o en ejecución. El servicio de aplicación debe estar en ejecución para iniciar la instalación. Si el servicio de aplicación está detenido, la instalación del Datadog Agent está deshabilitada. |
| Plan de servicio de aplicación  | El plan específico configurado para el servicio de aplicación                                                                                                                             |
| Versión de la extensión | El número de versión de la extensión de Datadog                                                                                                                                         |

#### Instalar {#install-2}

Para instalar la [extensión de Datadog](#agent-extensions), seleccione la aplicación correspondiente y, a continuación, haga clic en **Install Extension**. El portal solicita confirmación para instalar la extensión. Seleccione **OK** para comenzar la instalación. Esto reinicia su aplicación y agrega la siguiente configuración:

- `DD_API_KEY:<DEFAULT_API_KEY>`
- `DD_SITE:us3.datadoghq.com`

Azure muestra el estado como `Installing` hasta que el Agent esté instalado y aprovisionado. Después de instalar el Datadog Agent, el estado cambia a `Installed`.

**Nota**: Asegúrese de agregar la extensión a aplicaciones con [runtimes compatibles][1]. El recurso de Datadog no limita ni filtra la lista de aplicaciones.

#### Desinstalar {#uninstall-2}

Para desinstalar la extensión de Datadog, seleccione la aplicación correspondiente y, a continuación, haga clic en **Uninstall Extension**.

[1]: /es/serverless/azure_app_services/#requirements
{{% /collapse-content %}} 

## Próximos pasos {#next-steps}

- Consulte el [dashboard de Azure Overview][5] para empezar a obtener información sobre su entorno de Azure
- Consulte las [plantillas de Azure Monitor][6] para empezar a recibir alertas sobre los datos que son importantes para su organización

[1]: /es/getting_started/site/
[3]: https://docs.microsoft.com/cli/azure/datadog?view=azure-cli-latest
[5]: https://app.datadoghq.com/dash/integration/71/azure-overview
[6]: https://app.datadoghq.com/monitors/templates?q=azure
[7]: /es/infrastructure/storage_management/azure_blob_storage
[8]: /es/cloud_cost_management/setup/azure/
[9]: /es/logs/guide/azure-automated-log-forwarding/#log-archiving
[10]: https://docs.microsoft.com/azure/azure-resource-manager/management/control-plane-and-data-plane
[11]: https://docs.microsoft.com/azure/azure-monitor/essentials/resource-logs-categories
[12]: /es/logs/guide/azure-automated-log-forwarding
[13]: /es/data_observability/
{{< /site-region >}}

{{< site-region region="us,eu,us5,gov,gov2,ap1,ap2,uk1" >}}

<div class="alert alert-info">El recurso de Datadog en Azure solo está disponible para organizaciones en el sitio US3 de Datadog. Si está utilizando un sitio de Datadog diferente, consulte la guía <a href="https://docs.datadoghq.com/logs/guide/azure-logging-guide/" target="_blank">Azure Automated Log Forwarding</a> para conocer las opciones de configuración. Si está utilizando el sitio US3 de Datadog, <a href="?site=us3" target="_blank">cambie el selector de sitio</a> a la derecha de esta página.</div>

{{< /site-region >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}